/**
 * Newport Smart Scheduler — server-side logic
 *
 * Handles:
 *  - Rep eligibility: any staffUser with role='sales_rep' is an assignable rep
 *  - Load balancing (Nathan/William rotate for install_design; Danny for enhancement)
 *  - Slot suggestion engine (8am–5pm, 1-hour blocks, scored by drive time)
 *  - Google Calendar stub (logs to console, returns mock event ID)
 *  - Google Maps drive-time via Manus proxy
 *
 * appointments.repId now references staffUsers.id directly.
 */

import { getDb } from "./db";
import { staffUsers, appointments } from "../drizzle/schema";
import { eq, and, ne, asc, sql } from "drizzle-orm";
import { makeRequest } from "./_core/map";

// ─── Constants ────────────────────────────────────────────────────────────────

/** Newport HQ address (used as origin for drive-time estimates) */
const NEWPORT_HQ = "Newport Avenue, Bend, OR 97701";

/** Business hours: 8am–5pm */
const SLOT_START_HOUR = 8;
const SLOT_END_HOUR = 17;
const SLOT_DURATION_MINUTES = 60;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SlotSuggestion {
  repId: number;
  repName: string;
  repRole: "install_design" | "enhancement";
  date: string;       // YYYY-MM-DD
  startTime: string;  // HH:MM
  endTime: string;    // HH:MM
  driveTimeMinutes: number;
  score: number;      // 0–100, higher is better
  scoreReason: string;
}

export interface CreateAppointmentInput {
  submissionId?: number;
  repId: number;
  appointmentDate: string;   // YYYY-MM-DD
  startTime: string;         // HH:MM
  endTime: string;           // HH:MM
  appointmentType: "install_design" | "enhancement" | "follow_up" | "other";
  customerName?: string;
  customerAddress?: string;
  customerPhone?: string;
  notes?: string;
}

// ─── Staff User Rep Helpers ───────────────────────────────────────────────────

/**
 * Returns all staffUsers with role='sales_rep' as the assignable rep list.
 * This is the single source of truth — no salesReps table needed.
 */
export async function listSalesReps(includeInactive = false) {
  const dbConn = await getDb();
  if (!dbConn) return [];
  const rows = includeInactive
    ? await dbConn.select().from(staffUsers).where(eq(staffUsers.role, "sales_rep"))
    : await dbConn.select().from(staffUsers).where(
        and(eq(staffUsers.role, "sales_rep"), eq(staffUsers.isActive, true))
      );
  return rows.map((u) => ({
    id: u.id,
    name: `${u.firstName} ${u.lastName}`.trim(),
    email: u.email,
    effectiveEmail: u.email,
    phone: u.phone ?? null,
    role: "install_design" as const, // default; UI can override per appointment type
    isActive: u.isActive,
    googleCalendarId: null as string | null,
    calendarColor: null as string | null,
  }));
}

export async function getSalesRepById(id: number) {
  const dbConn = await getDb();
  if (!dbConn) return null;
  const rows = await dbConn.select().from(staffUsers).where(eq(staffUsers.id, id));
  if (!rows[0]) return null;
  const u = rows[0];
  return {
    id: u.id,
    name: `${u.firstName} ${u.lastName}`.trim(),
    email: u.email,
    effectiveEmail: u.email,
    phone: u.phone ?? null,
    role: u.role,
    isActive: u.isActive,
    googleCalendarId: null as string | null,
    calendarColor: null as string | null,
  };
}

// ─── Load Balancing ───────────────────────────────────────────────────────────

/**
 * Returns the suggested rep for a given appointment type.
 * - install_design / follow_up / other: rotates among all sales_rep users
 * - enhancement: prefers the first sales_rep alphabetically (Danny)
 */
export async function getSuggestedRep(
  appointmentType: "install_design" | "enhancement" | "follow_up" | "other"
): Promise<{ repId: number; repName: string } | null> {
  const reps = await listSalesReps(false);
  if (reps.length === 0) return null;

  const sorted = [...reps].sort((a, b) => a.name.localeCompare(b.name));

  if (appointmentType === "enhancement") {
    // Use first rep alphabetically for enhancement (Danny Sheffield)
    return { repId: sorted[0].id, repName: sorted[0].name };
  }

  // For install_design/follow_up/other: rotate based on last assigned
  const dbConn = await getDb();
  if (!dbConn) return { repId: sorted[0].id, repName: sorted[0].name };

  const lastAppt = await dbConn
    .select({ repId: appointments.repId })
    .from(appointments)
    .where(
      and(
        eq(appointments.appointmentType, "install_design"),
        ne(appointments.status, "cancelled")
      )
    )
    .orderBy(sql`${appointments.createdAt} DESC`)
    .limit(1);

  if (lastAppt.length === 0) {
    return { repId: sorted[0].id, repName: sorted[0].name };
  }

  const lastRepId = lastAppt[0].repId;
  const currentIdx = sorted.findIndex((r) => r.id === lastRepId);
  const nextIdx = (currentIdx + 1) % sorted.length;
  const next = sorted[nextIdx];
  return { repId: next.id, repName: next.name };
}

// ─── Drive-Time ───────────────────────────────────────────────────────────────

export async function getDriveTimeMinutes(
  customerAddress: string | null | undefined
): Promise<number> {
  if (!customerAddress) return 15;
  try {
    const result = await makeRequest<{
      rows: Array<{ elements: Array<{ status: string; duration: { value: number } }> }>;
    }>("/maps/api/distancematrix/json", {
      origins: NEWPORT_HQ,
      destinations: customerAddress,
      mode: "driving",
    });
    const element = result?.rows?.[0]?.elements?.[0];
    if (element?.status === "OK" && element.duration?.value) {
      return Math.round(element.duration.value / 60);
    }
  } catch (err) {
    console.warn("[Scheduler] Drive-time API error, using fallback:", err);
  }
  const lower = (customerAddress ?? "").toLowerCase();
  if (
    lower.includes("sisters") ||
    lower.includes("redmond") ||
    lower.includes("sunriver") ||
    lower.includes("la pine") ||
    lower.includes("lapine")
  ) {
    return 30;
  }
  return 15;
}

// ─── Slot Suggestion Engine ───────────────────────────────────────────────────

export async function getSlotSuggestions(params: {
  appointmentType: "install_design" | "enhancement" | "follow_up" | "other";
  customerAddress?: string;
  daysAhead?: number;
  repId?: number;
}): Promise<SlotSuggestion[]> {
  const { appointmentType, customerAddress, daysAhead = 7, repId } = params;

  const allReps = await listSalesReps(false);
  const targetReps = repId ? allReps.filter((r) => r.id === repId) : allReps;
  if (targetReps.length === 0) return [];

  const dbConn = await getDb();
  if (!dbConn) return [];

  const driveTime = await getDriveTimeMinutes(customerAddress);
  const suggestions: SlotSuggestion[] = [];
  const today = new Date();

  for (let dayOffset = 0; dayOffset < daysAhead; dayOffset++) {
    const date = new Date(today);
    date.setDate(today.getDate() + dayOffset);
    const dow = date.getDay();
    if (dow === 0 || dow === 6) continue;
    const dateStr = date.toISOString().split("T")[0];

    for (const rep of targetReps) {
      const existingAppts = await dbConn
        .select()
        .from(appointments)
        .where(
          and(
            eq(appointments.repId, rep.id),
            sql`DATE(${appointments.appointmentDate}) = ${dateStr}`,
            ne(appointments.status, "cancelled")
          )
        );

      const bookedSlots = new Set(existingAppts.map((a) => a.startTime));

      for (let hour = SLOT_START_HOUR; hour < SLOT_END_HOUR; hour++) {
        const startTime = `${hour.toString().padStart(2, "0")}:00`;
        const endHour = hour + SLOT_DURATION_MINUTES / 60;
        const endTime = `${endHour.toString().padStart(2, "0")}:00`;

        if (bookedSlots.has(startTime)) continue;

        let score = 100;
        const reasons: string[] = [];

        const driveTimePenalty = Math.max(0, driveTime - 10);
        score -= driveTimePenalty;
        if (driveTimePenalty > 0) reasons.push(`${driveTime} min from office`);
        if (hour >= 8 && hour <= 10) { score += 10; reasons.push("morning slot"); }
        if (hour >= 13 && hour <= 14) { score += 5; reasons.push("early afternoon"); }
        if (dayOffset <= 1) { score += 5; reasons.push("soon available"); }

        score = Math.max(0, Math.min(100, score));

        suggestions.push({
          repId: rep.id,
          repName: rep.name,
          repRole: appointmentType === "enhancement" ? "enhancement" : "install_design",
          date: dateStr,
          startTime,
          endTime,
          driveTimeMinutes: driveTime,
          score,
          scoreReason: reasons.length > 0 ? reasons.join(", ") : "standard slot",
        });
      }
    }
  }

  suggestions.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return a.startTime.localeCompare(b.startTime);
  });

  return suggestions.slice(0, 20);
}

// ─── Google Calendar Stub ─────────────────────────────────────────────────────

export async function createCalendarEvent(params: {
  repGoogleCalendarId: string | null | undefined;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location?: string;
  description?: string;
}): Promise<string | null> {
  if (!params.repGoogleCalendarId) {
    console.log("[Scheduler] Google Calendar stub: no calendarId set for rep.");
    return null;
  }
  console.log(`[Scheduler] Google Calendar stub: would create event on calendar ${params.repGoogleCalendarId}:`, {
    title: params.title, date: params.date, startTime: params.startTime,
    endTime: params.endTime, location: params.location,
  });
  return `mock-event-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function deleteCalendarEvent(params: {
  repGoogleCalendarId: string | null | undefined;
  googleEventId: string | null | undefined;
}): Promise<void> {
  if (!params.repGoogleCalendarId || !params.googleEventId) {
    console.log("[Scheduler] Google Calendar stub: deleteCalendarEvent called but no calendarId or eventId.");
    return;
  }
  console.log(`[Scheduler] Google Calendar stub: would delete event ${params.googleEventId} from calendar ${params.repGoogleCalendarId}`);
}

// ─── DB Helpers ───────────────────────────────────────────────────────────────

export async function listAppointments(params: {
  repId?: number;
  dateFrom?: string;
  dateTo?: string;
  status?: string;
  limit?: number;
}) {
  const dbConn = await getDb();
  if (!dbConn) return [];
  const { repId, dateFrom, dateTo, status, limit = 100 } = params;

  const conditions: ReturnType<typeof eq>[] = [];
  if (repId) conditions.push(eq(appointments.repId, repId));
  if (status) conditions.push(eq(appointments.status, status as "scheduled" | "confirmed" | "completed" | "cancelled" | "no_show"));

  let query = conditions.length > 0
    ? dbConn.select().from(appointments).where(and(...conditions))
    : dbConn.select().from(appointments);

  if (dateFrom || dateTo) {
    const dateConditions: any[] = [...conditions];
    if (dateFrom) dateConditions.push(sql`${appointments.appointmentDate} >= ${dateFrom}`);
    if (dateTo) dateConditions.push(sql`${appointments.appointmentDate} <= ${dateTo}`);
    query = dbConn.select().from(appointments).where(and(...dateConditions)) as any;
  }

  return (query as any)
    .orderBy(asc(appointments.appointmentDate), asc(appointments.startTime))
    .limit(limit);
}

export async function getAppointmentById(id: number) {
  const dbConn = await getDb();
  if (!dbConn) return null;
  const rows = await dbConn.select().from(appointments).where(eq(appointments.id, id));
  return rows[0] ?? null;
}

export async function createAppointment(data: CreateAppointmentInput) {
  const dbConn = await getDb();
  if (!dbConn) throw new Error("Database not available");
  const rep = await getSalesRepById(data.repId);

  const result = await dbConn.insert(appointments).values({
    submissionId: data.submissionId ?? null,
    repId: data.repId,
    appointmentDate: data.appointmentDate as any,
    startTime: data.startTime,
    endTime: data.endTime,
    appointmentType: data.appointmentType,
    status: "scheduled",
    customerName: data.customerName ?? null,
    customerAddress: data.customerAddress ?? null,
    customerPhone: data.customerPhone ?? null,
    notes: data.notes ?? null,
    driveTimeMinutes: await getDriveTimeMinutes(data.customerAddress),
  });

  // Google Calendar stub
  if (rep?.googleCalendarId) {
    const eventId = await createCalendarEvent({
      repGoogleCalendarId: rep.googleCalendarId,
      title: `Newport Appt — ${data.customerName ?? "Customer"}`,
      date: data.appointmentDate,
      startTime: data.startTime,
      endTime: data.endTime,
      location: data.customerAddress ?? undefined,
      description: data.notes ?? undefined,
    });
    if (eventId) {
      const insertId = (result as any).insertId;
      if (insertId) {
        await dbConn.update(appointments).set({ googleEventId: eventId }).where(eq(appointments.id, insertId));
      }
    }
  }

  return result;
}

export async function updateAppointment(
  id: number,
  data: {
    repId?: number;
    appointmentDate?: string;
    startTime?: string;
    endTime?: string;
    appointmentType?: "install_design" | "enhancement" | "follow_up" | "other";
    status?: "scheduled" | "confirmed" | "completed" | "cancelled" | "no_show";
    customerName?: string | null;
    customerAddress?: string | null;
    customerPhone?: string | null;
    notes?: string | null;
  }
) {
  const dbConn = await getDb();
  if (!dbConn) throw new Error("Database not available");
  return dbConn.update(appointments).set(data as any).where(eq(appointments.id, id));
}

export async function cancelAppointment(id: number) {
  const dbConn = await getDb();
  if (!dbConn) throw new Error("Database not available");
  const appt = await getAppointmentById(id);
  if (!appt) return null;

  if (appt.googleEventId) {
    const rep = await getSalesRepById(appt.repId);
    await deleteCalendarEvent({
      repGoogleCalendarId: rep?.googleCalendarId ?? null,
      googleEventId: appt.googleEventId,
    });
  }

  return dbConn.update(appointments).set({ status: "cancelled" }).where(eq(appointments.id, id));
}

export async function deleteAppointment(id: number) {
  const dbConn = await getDb();
  if (!dbConn) throw new Error("Database not available");
  const appt = await getAppointmentById(id);
  if (!appt) return null;

  // Remove from Google Calendar if linked
  if (appt.googleEventId) {
    const rep = await getSalesRepById(appt.repId);
    await deleteCalendarEvent({
      repGoogleCalendarId: rep?.googleCalendarId ?? null,
      googleEventId: appt.googleEventId,
    });
  }

  return dbConn.delete(appointments).where(eq(appointments.id, id));
}

/** No-op: kept for backward compatibility — reps are now managed via Users & Roles */
export async function seedDefaultReps() {
  // Reps are now staffUsers with role='sales_rep'. No seeding needed.
  console.log("[Scheduler] seedDefaultReps: reps are now managed via Users & Roles (staffUsers with role=sales_rep).");
}
