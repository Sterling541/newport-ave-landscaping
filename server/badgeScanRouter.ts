// @ts-nocheck
/**
 * Badge Scan Router
 * Handles employee badge QR code scans, employee management, and payout reporting.
 */
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { router, publicProcedure, pinProcedure as protectedProcedure } from "./_core/trpc";
import { ENV } from "./_core/env";
import { notifyOwner } from "./_core/notification";
import { getDb, createServiceSubmission, recordConsultantAssignment, getSuggestedConsultant } from "./db";
import {
  employees,
  badgeScans,
  payoutRecords,
  quoteLeads,
} from "../drizzle/schema";
import { eq, and, desc, sql, isNull, isNotNull, gte, lte } from "drizzle-orm";
import { createHash } from "crypto";

// ── Admin guard ───────────────────────────────────────────────────────────────
function requireAdmin(ctx: { user: { openId: string; role: string } | null }) {
  if (!ctx.user) return; // PIN-authenticated
  if (ctx.user.openId !== ENV.ownerOpenId && ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
}

// ── Phone normalizer (E.164 US) ───────────────────────────────────────────────
function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return raw; // return as-is if can't normalize
}

// ── IP hash ───────────────────────────────────────────────────────────────────
function hashIp(ip: string): string {
  return createHash("sha256").update(ip + "newport-salt-2025").digest("hex").substring(0, 32);
}

// ── Service type label ────────────────────────────────────────────────────────
function serviceTypeLabel(type: string, other?: string | null): string {
  const map: Record<string, string> = {
    maintenance: "Maintenance Services",
    landscape_construction: "Landscape Construction",
    irrigation_sprinkler: "Irrigation / Sprinkler Service",
    other: other ? `Other: ${other}` : "Other",
  };
  return map[type] ?? type;
}

export const badgeScanRouter = router({
  // ── PUBLIC: look up employee by code ────────────────────────────────────────
  lookupEmployee: publicProcedure
    .input(z.object({ code: z.string().max(8) }))
    .query(async ({ input }) => {
      const [emp] = await (await getDb())
        .select({
          id: employees.id,
          firstName: employees.firstName,
          lastName: employees.lastName,
          employeeCode: employees.employeeCode,
          role: employees.role,
        })
        .from(employees)
        .where(and(
          eq(employees.employeeCode, input.code.toUpperCase()),
          eq(employees.isActive, true)
        ))
        .limit(1);
      return emp ?? null;
    }),

  // ── PUBLIC: list active employees for dropdown (no codes exposed) ─────────
  listActiveEmployees: publicProcedure.query(async () => {
    return (await getDb())
      .select({
        id: employees.id,
        firstName: employees.firstName,
        lastName: employees.lastName,
        role: employees.role,
      })
      .from(employees)
      .where(eq(employees.isActive, true))
      .orderBy(employees.lastName, employees.firstName);
  }),

  // ── PUBLIC: submit a badge scan ──────────────────────────────────────────────
  submitScan: publicProcedure
    .input(z.object({
      employeeCode: z.string().max(8).optional(),
      employeeId: z.number().optional(),
      email: z.string().email().max(320),
      firstName: z.string().min(1).max(128),
      lastName: z.string().min(1).max(128),
      phone: z.string().min(7).max(32),
      /** Employee name as typed by the customer */
      employeeFirstName: z.string().min(1).max(128).optional(),
      employeeLastName: z.string().min(1).max(128).optional(),
      serviceType: z.enum(["maintenance", "landscape_construction", "irrigation_sprinkler", "other"]),
      serviceTypeOther: z.string().max(200).optional(),
      message: z.string().max(500).optional(),
      userAgent: z.string().max(512).optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      // Resolve employee
      let resolvedEmployeeId: number | null = null;
      let resolvedEmployeeCode: string | null = input.employeeCode ?? null;

      if (input.employeeCode) {
        const [emp] = await (await getDb())
          .select({ id: employees.id })
          .from(employees)
          .where(and(
            eq(employees.employeeCode, input.employeeCode.toUpperCase()),
            eq(employees.isActive, true)
          ))
          .limit(1);
        if (emp) resolvedEmployeeId = emp.id;
      } else if (input.employeeId) {
        resolvedEmployeeId = input.employeeId;
      }

      // Rate limit: max 5 submissions per IP per hour
      const rawIp = (ctx.req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim()
        ?? ctx.req.socket?.remoteAddress
        ?? "unknown";
      const ipHash = hashIp(rawIp);

      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      const [rateCheck] = await (await getDb())
        .select({ count: sql<number>`count(*)` })
        .from(badgeScans)
        .where(and(
          eq(badgeScans.submittedIpHash, ipHash),
          gte(badgeScans.submittedAt, oneHourAgo)
        ));
      if ((rateCheck?.count ?? 0) >= 5) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "Too many submissions. Please try again later.",
        });
      }

      // Insert scan
      const [result] = await (await getDb()).insert(badgeScans).values({
        employeeId: resolvedEmployeeId,
        employeeCodeRaw: resolvedEmployeeCode,
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
        phone: normalizePhone(input.phone),
        serviceType: input.serviceType,
        serviceTypeOther: input.serviceTypeOther ?? null,
        employeeNameFirst: input.employeeFirstName ?? null,
        employeeNameLast: input.employeeLastName ?? null,
        message: input.message ?? null,
        submittedUserAgent: input.userAgent ?? null,
        submittedIpHash: ipHash,
      });

      // Dual-write to quoteLeads so badge scans appear in Lead Center
      try {
        let empNameForLabel: string | null = null;
        if (resolvedEmployeeId) {
          const [emp] = await (await getDb())
            .select({ firstName: employees.firstName, lastName: employees.lastName })
            .from(employees)
            .where(eq(employees.id, resolvedEmployeeId))
            .limit(1);
          if (emp) empNameForLabel = `${emp.firstName} ${emp.lastName}`;
        } else if (input.employeeFirstName || input.employeeLastName) {
          empNameForLabel = `${input.employeeFirstName ?? ''} ${input.employeeLastName ?? ''}`.trim();
        }
        const svcLabelMap: Record<string, string> = {
          maintenance: 'Maintenance',
          landscape_construction: 'Landscape Design',
          irrigation_sprinkler: 'Irrigation / Sprinklers',
          other: input.serviceTypeOther || 'Other',
        };
        await (await getDb()).insert(quoteLeads).values({
          firstName: input.firstName.trim(),
          lastName: input.lastName.trim(),
          email: input.email,
          phone: normalizePhone(input.phone),
          serviceInterest: svcLabelMap[input.serviceType] || 'Other',
          message: input.message ?? null,
          source: 'badge_scan',
          sourceLabel: empNameForLabel,
          status: 'new',
        });
      } catch (e) {
        console.error("Badge scan quoteLeads dual-write failed:", e);
      }

      // Notify admin
      try {
        let empName = "Unknown Employee";
        if (resolvedEmployeeId) {
          const [emp] = await (await getDb())
            .select({ firstName: employees.firstName, lastName: employees.lastName })
            .from(employees)
            .where(eq(employees.id, resolvedEmployeeId))
            .limit(1);
          if (emp) empName = `${emp.firstName} ${emp.lastName}`;
        }

        const scanId = (result as any).insertId;
        const adminUrl = `https://www.newportavelandscaping.com/admin/badge-scans`;
        const serviceLabel = serviceTypeLabel(input.serviceType, input.serviceTypeOther);

        await notifyOwner({
          title: `New Badge Scan from ${empName} — ${input.firstName} ${input.lastName} for ${serviceLabel}`,
          content: [
            `**Customer:** ${input.firstName} ${input.lastName}`,
            `**Email:** ${input.email}`,
            `**Phone:** ${normalizePhone(input.phone)}`,
            `**Service:** ${serviceLabel}`,
            `**Employee:** ${empName}`,
            input.message ? `**Message:** ${input.message}` : null,
            ``,
            `[View in Admin](${adminUrl})`,
          ].filter(Boolean).join("\n"),
        });
      } catch (e) {
        // Don't fail the submission if notification fails
        console.error("Badge scan notification failed:", e);
      }

      return { success: true };
    }),

  // ── ADMIN: list all employees ─────────────────────────────────────────────
  adminListEmployees: protectedProcedure.query(async ({ ctx }) => {
    requireAdmin(ctx);
    const emps = await (await getDb())
      .select()
      .from(employees)
      .orderBy(employees.lastName, employees.firstName);

    // Attach scan counts
    const counts = await (await getDb())
      .select({
        employeeId: badgeScans.employeeId,
        totalScans: sql<number>`count(*)`,
        totalConversions: sql<number>`sum(case when ${badgeScans.status} = 'converted' then 1 else 0 end)`,
      })
      .from(badgeScans)
      .where(isNotNull(badgeScans.employeeId))
      .groupBy(badgeScans.employeeId);

    const countMap = new Map(counts.map(c => [c.employeeId, c]));

    return emps.map(emp => ({
      ...emp,
      totalScans: countMap.get(emp.id)?.totalScans ?? 0,
      totalConversions: countMap.get(emp.id)?.totalConversions ?? 0,
    }));
  }),

  // ── ADMIN: create employee ────────────────────────────────────────────────
  adminCreateEmployee: protectedProcedure
    .input(z.object({
      firstName: z.string().min(1).max(128),
      lastName: z.string().min(1).max(128),
      employeeCode: z.string().min(2).max(8).regex(/^[A-Z0-9]+$/, "Code must be uppercase alphanumeric"),
      role: z.string().min(1).max(64),
      email: z.string().email().max(320).optional(),
      phone: z.string().max(32).optional(),
      isActive: z.boolean().default(true),
    }))
    .mutation(async ({ ctx, input }) => {
      requireAdmin(ctx);
      // Check uniqueness
      const [existing] = await (await getDb())
        .select({ id: employees.id })
        .from(employees)
        .where(eq(employees.employeeCode, input.employeeCode))
        .limit(1);
      if (existing) {
        throw new TRPCError({ code: "CONFLICT", message: `Employee code "${input.employeeCode}" is already taken.` });
      }
      await (await getDb()).insert(employees).values({
        firstName: input.firstName,
        lastName: input.lastName,
        employeeCode: input.employeeCode,
        role: input.role,
        email: input.email ?? null,
        phone: input.phone ?? null,
        isActive: input.isActive,
      });
      return { success: true };
    }),

  // ── ADMIN: update employee ────────────────────────────────────────────────
  adminUpdateEmployee: protectedProcedure
    .input(z.object({
      id: z.number(),
      firstName: z.string().min(1).max(128).optional(),
      lastName: z.string().min(1).max(128).optional(),
      employeeCode: z.string().min(2).max(8).regex(/^[A-Z0-9]+$/).optional(),
      role: z.string().min(1).max(64).optional(),
      email: z.string().email().max(320).nullable().optional(),
      phone: z.string().max(32).nullable().optional(),
      isActive: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      requireAdmin(ctx);
      const { id, ...data } = input;
      if (data.employeeCode) {
        const [existing] = await (await getDb())
          .select({ id: employees.id })
          .from(employees)
          .where(and(eq(employees.employeeCode, data.employeeCode), sql`${employees.id} != ${id}`))
          .limit(1);
        if (existing) {
          throw new TRPCError({ code: "CONFLICT", message: `Employee code "${data.employeeCode}" is already taken.` });
        }
      }
      await (await getDb()).update(employees).set(data).where(eq(employees.id, id));
      return { success: true };
    }),

  // ── ADMIN: get badge URL for QR code (QR rendered client-side) ─────────────
  adminGetBadgeUrl: protectedProcedure
    .input(z.object({ employeeCode: z.string().max(8) }))
    .query(async ({ ctx, input }) => {
      requireAdmin(ctx);
      const url = `https://www.newportavelandscaping.com/badge-scan?emp=${input.employeeCode}`;
      return { url };
    }),

  // ── ADMIN: list badge scans with filters ──────────────────────────────────
  adminListScans: protectedProcedure
    .input(z.object({
      status: z.enum(["all", "new", "contacted", "scheduled", "converted", "lost_price", "lost_other", "no_response"]).default("all"),
      employeeId: z.number().optional(),
      serviceType: z.enum(["all", "maintenance", "landscape_construction", "irrigation_sprinkler", "other"]).default("all"),
      dateRange: z.enum(["this_month", "last_month", "last_90_days", "all_time"]).default("all_time"),
      dateFrom: z.string().optional(), // ISO date string for custom range
      dateTo: z.string().optional(),
      converted: z.enum(["all", "converted_only", "not_converted"]).default("all"),
      limit: z.number().min(1).max(200).default(100),
      offset: z.number().min(0).default(0),
    }))
    .query(async ({ ctx, input }) => {
      requireAdmin(ctx);

      const conditions = [];

      if (input.status !== "all") {
        conditions.push(eq(badgeScans.status, input.status as any));
      }
      if (input.employeeId) {
        conditions.push(eq(badgeScans.employeeId, input.employeeId));
      }
      if (input.serviceType !== "all") {
        conditions.push(eq(badgeScans.serviceType, input.serviceType as any));
      }
      if (input.converted === "converted_only") {
        conditions.push(isNotNull(badgeScans.convertedAppointmentId));
      } else if (input.converted === "not_converted") {
        conditions.push(isNull(badgeScans.convertedAppointmentId));
      }

      // Date range
      const now = new Date();
      if (input.dateRange === "this_month") {
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        conditions.push(gte(badgeScans.submittedAt, start));
      } else if (input.dateRange === "last_month") {
        const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const end = new Date(now.getFullYear(), now.getMonth(), 1);
        conditions.push(gte(badgeScans.submittedAt, start));
        conditions.push(lte(badgeScans.submittedAt, end));
      } else if (input.dateRange === "last_90_days") {
        const start = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
        conditions.push(gte(badgeScans.submittedAt, start));
      } else if (input.dateFrom) {
        conditions.push(gte(badgeScans.submittedAt, new Date(input.dateFrom)));
        if (input.dateTo) conditions.push(lte(badgeScans.submittedAt, new Date(input.dateTo)));
      }

      const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

      const [rawScans, [{ total }]] = await Promise.all([
        (await getDb())
          .select({
            scan: badgeScans,
            employee: {
              id: employees.id,
              firstName: employees.firstName,
              lastName: employees.lastName,
              employeeCode: employees.employeeCode,
              role: employees.role,
            },
          })
          .from(badgeScans)
          .leftJoin(employees, eq(badgeScans.employeeId, employees.id))
          .where(whereClause)
          .orderBy(desc(badgeScans.submittedAt))
          .limit(input.limit)
          .offset(input.offset),
        (await getDb())
          .select({ total: sql<number>`count(*)` })
          .from(badgeScans)
          .where(whereClause),
      ]);

      const scans = rawScans.map(({ scan, employee }) => ({
        id: scan.id,
        employeeId: scan.employeeId,
        employeeCodeRaw: scan.employeeCodeRaw,
        firstName: scan.firstName,
        lastName: scan.lastName,
        email: scan.email,
        phone: scan.phone,
        serviceType: (scan as any).badgeScanServiceType ?? scan.serviceType,
        serviceTypeOther: scan.serviceTypeOther,
        message: scan.message,
        status: (scan as any).badgeScanStatus ?? scan.status,
        notes: scan.notes,
        convertedAppointmentId: scan.convertedAppointmentId,
        convertedAt: scan.convertedAt,
        submittedAt: scan.submittedAt,
        employeeNameFirst: scan.employeeNameFirst,
        employeeNameLast: scan.employeeNameLast,
        employeeName: employee ? `${employee.firstName} ${employee.lastName}` : null,
        employeeCode: employee?.employeeCode ?? null,
      }));

      return { scans, total };
    }),

  // ── ADMIN: get single scan detail ─────────────────────────────────────────
  adminGetScan: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      requireAdmin(ctx);
      const [row] = await (await getDb())
        .select({
          scan: badgeScans,
          employee: {
            id: employees.id,
            firstName: employees.firstName,
            lastName: employees.lastName,
            employeeCode: employees.employeeCode,
            role: employees.role,
          },
        })
        .from(badgeScans)
        .leftJoin(employees, eq(badgeScans.employeeId, employees.id))
        .where(eq(badgeScans.id, input.id))
        .limit(1);
      if (!row) throw new TRPCError({ code: "NOT_FOUND" });
      const { scan, employee } = row;
      return {
        id: scan.id,
        employeeId: scan.employeeId,
        employeeCodeRaw: scan.employeeCodeRaw,
        firstName: scan.firstName,
        lastName: scan.lastName,
        email: scan.email,
        phone: scan.phone,
        serviceType: (scan as any).badgeScanServiceType ?? scan.serviceType,
        serviceTypeOther: scan.serviceTypeOther,
        message: scan.message,
        status: (scan as any).badgeScanStatus ?? scan.status,
        notes: scan.notes,
        convertedAppointmentId: scan.convertedAppointmentId,
        convertedAt: scan.convertedAt,
        submittedAt: scan.submittedAt,
        submittedUserAgent: scan.submittedUserAgent,
        submittedIpHash: scan.submittedIpHash,
        employeeNameFirst: scan.employeeNameFirst,
        employeeNameLast: scan.employeeNameLast,
        employeeName: employee ? `${employee.firstName} ${employee.lastName}` : null,
        employeeCode: employee?.employeeCode ?? null,
      };
    }),

  // ── ADMIN: update scan status/notes ──────────────────────────────────────
  adminUpdateScan: protectedProcedure
    .input(z.object({
      id: z.number(),
      status: z.enum(["new", "contacted", "scheduled", "converted", "lost_price", "lost_other", "no_response"]).optional(),
      notes: z.string().max(2000).optional(),
      convertedAppointmentId: z.number().nullable().optional(),
      convertedAt: z.date().nullable().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      requireAdmin(ctx);
      const { id, ...data } = input;
      const updateData: Record<string, any> = {};
      if (data.status !== undefined) updateData.status = data.status;
      if (data.notes !== undefined) updateData.notes = data.notes;
      if (data.convertedAppointmentId !== undefined) updateData.convertedAppointmentId = data.convertedAppointmentId;
      if (data.convertedAt !== undefined) updateData.convertedAt = data.convertedAt;
      if (data.status === "converted" && !updateData.convertedAt) {
        updateData.convertedAt = new Date();
      }
      await (await getDb()).update(badgeScans).set(updateData).where(eq(badgeScans.id, id));
      return { success: true };
    }),

  // ── ADMIN: payout report ──────────────────────────────────────────────────
  adminPayoutReport: protectedProcedure
    .input(z.object({
      year: z.number().min(2020).max(2100),
      month: z.number().min(1).max(12),
    }))
    .query(async ({ ctx, input }) => {
      requireAdmin(ctx);

      const monthStart = new Date(input.year, input.month - 1, 1);
      const monthEnd = new Date(input.year, input.month, 1);

      // Get all employees
      const emps = await (await getDb())
        .select()
        .from(employees)
        .orderBy(employees.lastName, employees.firstName);

      // Get converted scans for this month
      const convertedScans = await (await getDb())
        .select({
          scan: badgeScans,
          employee: {
            id: employees.id,
            firstName: employees.firstName,
            lastName: employees.lastName,
          },
        })
        .from(badgeScans)
        .leftJoin(employees, eq(badgeScans.employeeId, employees.id))
        .where(and(
          eq(badgeScans.status, "converted"),
          isNotNull(badgeScans.convertedAt),
          gte(badgeScans.convertedAt, monthStart),
          lte(badgeScans.convertedAt, monthEnd),
        ))
        .orderBy(desc(badgeScans.convertedAt));

      // Get existing payout records for this month
      const existingPayouts = await (await getDb())
        .select()
        .from(payoutRecords)
        .where(and(
          eq(payoutRecords.periodYear, input.year),
          eq(payoutRecords.periodMonth, input.month),
        ));

      const payoutMap = new Map(existingPayouts.map(p => [p.employeeId, p]));

      // Build per-employee summary
      const scansByEmployee = new Map<number, typeof convertedScans>();
      for (const row of convertedScans) {
        if (!row.employee?.id) continue;
        const empId = row.employee.id;
        if (!scansByEmployee.has(empId)) scansByEmployee.set(empId, []);
        scansByEmployee.get(empId)!.push(row);
      }

      const summary = emps
        .filter(emp => (scansByEmployee.get(emp.id)?.length ?? 0) > 0 || payoutMap.has(emp.id))
        .map(emp => {
          const scans = scansByEmployee.get(emp.id) ?? [];
          const payout = payoutMap.get(emp.id);
          const conversionCount = scans.length;
          const amountOwed = conversionCount * 75;
          return {
            employee: emp,
            conversionCount,
            amountOwed,
            paidAt: payout?.paidAt ?? null,
            payoutRecordId: payout?.id ?? null,
            scans: scans.map(s => ({
              id: s.scan.id,
              customerName: `${s.scan.firstName} ${s.scan.lastName}`,
              convertedAt: s.scan.convertedAt,
              serviceType: (s.scan as any).badgeScanServiceType ?? s.scan.serviceType,
            })),
          };
        });

      const totals = {
        totalScans: convertedScans.length,
        totalConversions: convertedScans.length,
        totalPayout: summary.reduce((sum, s) => sum + s.amountOwed, 0),
      };

      return { summary, totals };
    }),

  // ── ADMIN: mark payout paid ───────────────────────────────────────────────
  adminMarkPayoutPaid: protectedProcedure
    .input(z.object({
      employeeId: z.number(),
      year: z.number(),
      month: z.number(),
      notes: z.string().max(500).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      requireAdmin(ctx);

      // Get conversion count for this period
      const monthStart = new Date(input.year, input.month - 1, 1);
      const monthEnd = new Date(input.year, input.month, 1);

      const [{ count }] = await (await getDb())
        .select({ count: sql<number>`count(*)` })
        .from(badgeScans)
        .where(and(
          eq(badgeScans.employeeId, input.employeeId),
          eq(badgeScans.status, "converted"),
          isNotNull(badgeScans.convertedAt),
          gte(badgeScans.convertedAt, monthStart),
          lte(badgeScans.convertedAt, monthEnd),
        ));

      const amount = (count ?? 0) * 75;
      const userId = (ctx.user as any)?.id ?? null;

      // Upsert payout record
      const existing = await (await getDb())
        .select({ id: payoutRecords.id })
        .from(payoutRecords)
        .where(and(
          eq(payoutRecords.employeeId, input.employeeId),
          eq(payoutRecords.periodYear, input.year),
          eq(payoutRecords.periodMonth, input.month),
        ))
        .limit(1);

      if (existing.length > 0) {
        await (await getDb()).update(payoutRecords)
          .set({ paidAt: new Date(), paidByUserId: userId, notes: input.notes ?? null })
          .where(eq(payoutRecords.id, existing[0].id));
      } else {
        await (await getDb()).insert(payoutRecords).values({
          employeeId: input.employeeId,
          periodYear: input.year,
          periodMonth: input.month,
          conversionCount: count ?? 0,
          amountUsd: amount.toFixed(2),
          paidAt: new Date(),
          paidByUserId: userId,
          notes: input.notes ?? null,
        });
      }

      return { success: true };
    }),

  // ── ADMIN: convert badge scan to scheduled service ───────────────────────
  adminConvertToScheduled: protectedProcedure
    .input(z.object({
      scanId: z.number(),
      firstName: z.string().min(1).max(128),
      lastName: z.string().min(1).max(128),
      email: z.string().email().max(320),
      phone: z.string().min(1).max(32),
      siteAddress: z.string().min(1).max(500),
      serviceType: z.string().min(1).max(128),
      salesConsultant: z.string().max(128).optional(),
      projectManager: z.string().max(128).optional(),
      budget: z.string().max(32).optional(),
      budgetOther: z.string().max(64).optional(),
      idealCompletionDate: z.string().max(32).optional(),
      howHeard: z.string().max(500).optional(),
      comments: z.string().max(5000).optional(),
      usedBefore: z.string().max(8).optional(),
      flexibleScheduling: z.boolean().optional(),
      isPropertyOwner: z.string().max(8).optional(),
      hasPets: z.string().max(8).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      requireAdmin(ctx);
      const { scanId, ...submissionData } = input;
      const zipMatch = submissionData.siteAddress.match(/\b(\d{5})(?:-\d{4})?\b/);
      const zipCode = zipMatch ? zipMatch[1] : undefined;
      const submission = await createServiceSubmission({
        ...submissionData,
        flexibleScheduling: submissionData.flexibleScheduling ?? false,
        zipCode,
        dataSource: "badge_scan_converted",
        schemaVersion: "1.0",
        leadStatus: "new",
      });
      if (submissionData.salesConsultant) {
        await recordConsultantAssignment(submissionData.salesConsultant);
      }
      // Mark the badge scan as converted
      await (await getDb()).update(badgeScans).set({
        status: "converted",
        convertedAt: new Date(),
        notes: `Converted to scheduled service form.${submissionData.salesConsultant ? ` Assigned to ${submissionData.salesConsultant}.` : ""}`,
      }).where(eq(badgeScans.id, scanId));
      return { success: true, submissionId: (submission as { insertId?: number }).insertId };
    }),

  // ── ADMIN: get suggested consultant for badge scan ────────────────────────
  adminGetSuggestedConsultant: protectedProcedure
    .input(z.object({ serviceType: z.string() }))
    .query(async ({ ctx, input }) => {
      requireAdmin(ctx);
      return getSuggestedConsultant(input.serviceType);
    }),

  // ── ADMIN: export payout CSV ──────────────────────────────────────────────
  adminExportPayoutCsv: protectedProcedure
    .input(z.object({
      year: z.number(),
      month: z.number(),
    }))
    .query(async ({ ctx, input }) => {
      requireAdmin(ctx);

      const monthStart = new Date(input.year, input.month - 1, 1);
      const monthEnd = new Date(input.year, input.month, 1);

      const rows = await (await getDb())
        .select({
          scan: badgeScans,
          employee: {
            firstName: employees.firstName,
            lastName: employees.lastName,
            employeeCode: employees.employeeCode,
            role: employees.role,
          },
        })
        .from(badgeScans)
        .leftJoin(employees, eq(badgeScans.employeeId, employees.id))
        .where(and(
          eq(badgeScans.status, "converted"),
          isNotNull(badgeScans.convertedAt),
          gte(badgeScans.convertedAt, monthStart),
          lte(badgeScans.convertedAt, monthEnd),
        ))
        .orderBy(employees.lastName, desc(badgeScans.convertedAt));

      const lines = [
        "Employee,Code,Role,Customer,Service,Converted At,Payout",
        ...rows.map(r => [
          `"${r.employee?.firstName ?? ""} ${r.employee?.lastName ?? ""}"`,
          r.employee?.employeeCode ?? "",
          r.employee?.role ?? "",
          `"${r.scan.firstName} ${r.scan.lastName}"`,
          (r.scan as any).badgeScanServiceType ?? r.scan.serviceType,
          r.scan.convertedAt?.toISOString().split("T")[0] ?? "",
          "$75.00",
        ].join(",")),
      ];

      return { csv: lines.join("\n") };
    }),
});
