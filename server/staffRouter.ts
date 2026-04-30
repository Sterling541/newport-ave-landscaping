/**
 * Staff Users Router
 * Handles PIN-based staff login, user management, and role/permission management.
 * Staff sessions are stored as a separate JWT cookie (staff_session_id).
 */
import { z } from "zod";
import bcrypt from "bcryptjs";
import { TRPCError } from "@trpc/server";
import { router, publicProcedure, pinProcedure as protectedProcedure } from "./_core/trpc";
import { getDb } from "./db";
import { staffUsers, roleDefinitions } from "../drizzle/schema";
import { eq, desc, and, asc } from "drizzle-orm";
import { SignJWT, jwtVerify } from "jose";
import { ENV } from "./_core/env";

const STAFF_COOKIE = "staff_session_id";
const JWT_ALG = "HS256";

function getJwtSecret() {
  return new TextEncoder().encode(ENV.cookieSecret);
}

async function signStaffToken(staffUserId: number, role: string) {
  return new SignJWT({ sub: String(staffUserId), role, type: "staff" })
    .setProtectedHeader({ alg: JWT_ALG })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(getJwtSecret());
}

async function verifyStaffToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    if (payload.type !== "staff") return null;
    return { id: Number(payload.sub), role: payload.role as string };
  } catch {
    return null;
  }
}

/** Get the current staff user from the request cookie */
async function getStaffUserFromCtx(ctx: { req: { headers: { cookie?: string } } }) {
  const cookieHeader = ctx.req.headers.cookie ?? "";
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${STAFF_COOKIE}=([^;]+)`));
  if (!match) return null;
  const payload = await verifyStaffToken(match[1]);
  if (!payload) return null;
  const db = await getDb();
  const [user] = await db.select().from(staffUsers).where(
    and(eq(staffUsers.id, payload.id), eq(staffUsers.isActive, true))
  );
  return user ?? null;
}

export const staffRouter = router({
  /** PIN login — returns a staff session cookie */
  login: publicProcedure
    .input(z.object({
      email: z.string().email(),
      pin: z.string().min(4).max(8),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      const [user] = await db.select().from(staffUsers).where(
        and(eq(staffUsers.email, input.email.toLowerCase()), eq(staffUsers.isActive, true))
      );
      if (!user) throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or PIN" });

      const valid = await bcrypt.compare(input.pin, user.pinHash);
      if (!valid) throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or PIN" });

      // Update last login
      await db.update(staffUsers).set({ lastLoginAt: new Date() }).where(eq(staffUsers.id, user.id));

      const token = await signStaffToken(user.id, user.role);
      const res = (ctx as any).res;
      res.cookie(STAFF_COOKIE, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 8 * 60 * 60 * 1000,
        path: "/",
      });

      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        title: user.title,
      };
    }),

  /** Get current staff session */
  me: publicProcedure.query(async ({ ctx }) => {
    const user = await getStaffUserFromCtx(ctx as any);
    if (!user) return null;
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      title: user.title,
    };
  }),

  /** Logout — clear cookie */
  logout: publicProcedure.mutation(async ({ ctx }) => {
    const res = (ctx as any).res;
    res.clearCookie(STAFF_COOKIE, { path: "/", secure: process.env.NODE_ENV === "production" });
    return { ok: true };
  }),

  // ── Admin-only procedures (require Manus owner auth) ──────────────────────

  /** List all staff users */
  listUsers: protectedProcedure.query(async () => {
    const db = await getDb();
    return db.select({
      id: staffUsers.id,
      email: staffUsers.email,
      firstName: staffUsers.firstName,
      lastName: staffUsers.lastName,
      role: staffUsers.role,
      isActive: staffUsers.isActive,
      phone: staffUsers.phone,
      title: staffUsers.title,
      lastLoginAt: staffUsers.lastLoginAt,
      createdAt: staffUsers.createdAt,
    }).from(staffUsers).orderBy(desc(staffUsers.createdAt));
  }),

  /** Create a new staff user */
  createUser: protectedProcedure
    .input(z.object({
      email: z.string().email(),
      firstName: z.string().min(1).max(128),
      lastName: z.string().min(1).max(128),
      pin: z.string().min(4).max(8).regex(/^\d+$/, "PIN must be digits only"),
      role: z.string().min(1).max(64),
      phone: z.string().max(32).optional(),
      title: z.string().max(128).optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      const pinHash = await bcrypt.hash(input.pin, 12);
      const [existing] = await db.select({ id: staffUsers.id }).from(staffUsers)
        .where(eq(staffUsers.email, input.email.toLowerCase()));
      if (existing) throw new TRPCError({ code: "CONFLICT", message: "Email already in use" });

      const [result] = await db.insert(staffUsers).values({
        email: input.email.toLowerCase(),
        firstName: input.firstName,
        lastName: input.lastName,
        pinHash,
        role: input.role,
        phone: input.phone ?? null,
        title: input.title ?? null,
        isActive: true,
      });
      return { id: (result as any).insertId };
    }),

  /** Update a staff user */
  updateUser: protectedProcedure
    .input(z.object({
      id: z.number(),
      firstName: z.string().min(1).max(128).optional(),
      lastName: z.string().min(1).max(128).optional(),
      email: z.string().email().optional(),
      role: z.string().min(1).max(64).optional(),
      phone: z.string().max(32).optional().nullable(),
      title: z.string().max(128).optional().nullable(),
      isActive: z.boolean().optional(),
      newPin: z.string().min(4).max(8).regex(/^\d+$/).optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      const { id, newPin, ...rest } = input;
      const updates: Record<string, unknown> = { ...rest };
      if (newPin) {
        updates.pinHash = await bcrypt.hash(newPin, 12);
      }
      if (updates.email) updates.email = (updates.email as string).toLowerCase();
      await db.update(staffUsers).set(updates).where(eq(staffUsers.id, id));
      return { ok: true };
    }),

  /** Delete a staff user */
  deleteUser: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      await db.delete(staffUsers).where(eq(staffUsers.id, input.id));
      return { ok: true };
    }),

  // ── Role management ───────────────────────────────────────────────────────

  /** List all roles */
  listRoles: protectedProcedure.query(async () => {
    const db = await getDb();
    return db.select().from(roleDefinitions).orderBy(roleDefinitions.slug);
  }),

  /** Create a custom role */
  createRole: protectedProcedure
    .input(z.object({
      slug: z.string().min(1).max(64).regex(/^[a-z0-9_]+$/),
      label: z.string().min(1).max(128),
      permissions: z.record(z.boolean()),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      const [existing] = await db.select({ id: roleDefinitions.id }).from(roleDefinitions)
        .where(eq(roleDefinitions.slug, input.slug));
      if (existing) throw new TRPCError({ code: "CONFLICT", message: "Role slug already exists" });
      await db.insert(roleDefinitions).values({
        slug: input.slug,
        label: input.label,
        permissions: JSON.stringify(input.permissions),
        isSystem: false,
      });
      return { ok: true };
    }),

  /** Update role permissions */
  updateRole: protectedProcedure
    .input(z.object({
      id: z.number(),
      label: z.string().min(1).max(128).optional(),
      permissions: z.record(z.boolean()).optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      const { id, permissions, ...rest } = input;
      const updates: Record<string, unknown> = { ...rest };
      if (permissions !== undefined) {
        updates.permissions = JSON.stringify(permissions);
      }
      await db.update(roleDefinitions).set(updates).where(eq(roleDefinitions.id, id));
      return { ok: true };
    }),

  /** Delete a custom role */
  deleteRole: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      const [role] = await db.select().from(roleDefinitions).where(eq(roleDefinitions.id, input.id));
      if (!role) throw new TRPCError({ code: "NOT_FOUND" });
      if (role.isSystem) throw new TRPCError({ code: "FORBIDDEN", message: "Cannot delete system roles" });
      await db.delete(roleDefinitions).where(eq(roleDefinitions.id, input.id));
      return { ok: true };
    }),

  /** List active sales reps — used to populate Scheduled With dropdowns */
  listActiveSalesReps: publicProcedure.query(async () => {
    const db = await getDb();
    return db.select({
      id: staffUsers.id,
      firstName: staffUsers.firstName,
      lastName: staffUsers.lastName,
      title: staffUsers.title,
    }).from(staffUsers).where(
      and(eq(staffUsers.role, "sales_rep"), eq(staffUsers.isActive, true))
    ).orderBy(asc(staffUsers.firstName));
  }),

  /** Toggle a user's active status */
  toggleUserActive: protectedProcedure
    .input(z.object({ id: z.number(), isActive: z.boolean() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      await db.update(staffUsers).set({ isActive: input.isActive }).where(eq(staffUsers.id, input.id));
      return { ok: true };
    }),

  /** Debug: returns raw DB values for the current staff session — used to diagnose permission issues */
  debugPermissions: publicProcedure.query(async ({ ctx }) => {
    const cookieHeader = (ctx as any).req.headers.cookie ?? "";
    const match = cookieHeader.match(/(?:^|;\s*)staff_session_id=([^;]+)/);
    const rawToken = match ? match[1] : null;
    const user = await getStaffUserFromCtx(ctx as any);
    if (!user) return { cookiePresent: !!rawToken, user: null, role: null, permissions: null };
    const db = await getDb();
    const [role] = await db.select().from(roleDefinitions).where(eq(roleDefinitions.slug, user.role));
    let parsed: unknown = null;
    try { parsed = role ? JSON.parse(role.permissions) : null; } catch { parsed = "PARSE_ERROR"; }
    return {
      cookiePresent: !!rawToken,
      user: { id: user.id, email: user.email, role: user.role, isActive: user.isActive },
      role: role ? { id: role.id, slug: role.slug, rawPermissions: role.permissions } : null,
      permissions: parsed,
    };
  }),

  /** Get role permissions for the current staff user (used by sidebar) */
  myPermissions: publicProcedure.query(async ({ ctx }) => {
    const user = await getStaffUserFromCtx(ctx as any);
    if (!user) return null;
    const db = await getDb();
    const [role] = await db.select().from(roleDefinitions).where(eq(roleDefinitions.slug, user.role));
    if (!role) return null;
    try {
      return JSON.parse(role.permissions) as Record<string, boolean>;
    } catch {
      return null;
    }
  }),
});
