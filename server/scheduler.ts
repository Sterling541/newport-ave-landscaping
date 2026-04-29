/**
 * Newport Smart Scheduler — server-side logic
 *
 * Handles:
 *  - Load balancing (Nathan/William rotate for install_design; Danny for enhancement)
 *  - Slot suggestion engine (8am–5pm, 1-hour blocks, scored by drive time)
 *  - Google Calendar stub (logs to console, returns mock event ID)
 *  - Google Maps drive-time stub (returns 15min default, logs that real API pending)
 */

import { getDb } from "./db";
import { salesReps, appointments } from "../drizzle/schema";
import { eq, and, ne, asc, sql } from "drizzle-orm";

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

// ─── Load Balancing ───────────────────────────────────────────────────────────

/**
 * Returns the suggested rep for a given appointment type.
 * - install_design: rotates Nathan Kooy / William Miller based on who was last assigned
 * - enhancement: always Danny Sheffield
 */
export async function getSuggestedRep(
  appointmentType: "install_design" | "enhancement" | "follow_up" | "other"
): Promise<{ repId: number; repName: string } | null> {
  const dbConn = await getDb();
  if (!dbConn) return null;

  const role = appointmentType === "enhancement" ? "enhancement" : "install_design";

  const reps = await dbConn
    .select()
    .from(salesReps)
    .where(and(eq(salesReps.role, role), eq(salesReps.isActive, true)));

  if (reps.length === 0) return null;

  if (role === "enhancement") {
    // Danny is the only enhancement rep — return him directly
    return { repId: reps[0].id, repName: reps[0].name };
  }

  // For install_design: find who was last assigned by looking at the most recent appointment
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
    // No history — start with first rep alphabetically
    const sorted = [...reps].sort((a, b) => a.name.localeCompare(b.name));
    return { repId: sorted[0].id, repName: sorted[0].name };
  }

  const lastRepId = lastAppt[0].repId;
  const lastRep = reps.find((r) => r.id === lastRepId);

  if (!lastRep) {
    return { repId: reps[0].id, repName: reps[0].name };
  }

  // Rotate to the next rep
  const sorted = [...reps].sort((a, b) => a.name.localeCompare(b.name));
  const currentIdx = sorted.findIndex((r) => r.id === lastRepId);
  const nextIdx = (currentIdx + 1) % sorted.length;
  const next = sorted[nextIdx];
  return { repId: next.id, repName: next.name };
}

// ─── Drive-Time Stub ──────────────────────────────────────────────────────────

/**
 * Returns estimated drive time in minutes from Newport HQ to the customer address.
 * STUB: returns 15 minutes by default and logs that real API is pending.
 * Replace with Google Distance Matrix API call once credentials are available.
 */
export async function getDriveTimeMinutes(
  customerAddress: string | null | undefined
): Promise<number> {
  if (!customerAddress) return 15;

  console.log(
    `[Scheduler] Drive-time stub: ${NEWPORT_HQ} → ${customerAddress}. ` +
      "Real Google Distance Matrix API pending credentials. Returning estimate."
  );

  // Simple heuristic: Bend addresses get 15min, outlying areas get 30min
  const lower = customerAddress.toLowerCase();
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

/**
 * Returns scored slot suggestions for the next N business days.
 * Filters out slots that already have appointments for the given rep.
 */
export async function getSlotSuggestions(params: {
  appointmentType: "install_design" | "enhancement" | "follow_up" | "other";
  customerAddress?: string;
  daysAhead?: number;
  repId?: number;
}): Promise<SlotSuggestion[]> {
  const { appointmentType, customerAddress, daysAhead = 7, repId } = params;

  const role = appointmentType === "enhancement" ? "enhancement" : "install_design";

  const dbConn = await getDb();
  if (!dbConn) return [];

  const eligibleReps = await dbConn
    .select()
    .from(salesReps)
    .where(and(eq(salesReps.role, role), eq(salesReps.isActive, true)));

  const targetReps = repId
    ? eligibleReps.filter((r) => r.id === repId)
    : eligibleReps;

  if (targetReps.length === 0) return [];

  const driveTime = await getDriveTimeMinutes(customerAddress);

  const suggestions: SlotSuggestion[] = [];
  const today = new Date();

  for (let dayOffset = 0; dayOffset < daysAhead; dayOffset++) {
    const date = new Date(today);
    date.setDate(today.getDate() + dayOffset);

    // Skip weekends
    const dow = date.getDay();
    if (dow === 0 || dow === 6) continue;

    const dateStr = date.toISOString().split("T")[0];

    for (const rep of targetReps) {
      // Get existing appointments for this rep on this date
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

      // Generate available slots
      for (let hour = SLOT_START_HOUR; hour < SLOT_END_HOUR; hour++) {
        const startTime = `${hour.toString().padStart(2, "0")}:00`;
        const endHour = hour + SLOT_DURATION_MINUTES / 60;
        const endTime = `${endHour.toString().padStart(2, "0")}:00`;

        if (bookedSlots.has(startTime)) continue;

        // Score the slot (0–100)
        let score = 100;
        const reasons: string[] = [];

        // Drive time penalty: -1 point per minute over 10
        const driveTimePenalty = Math.max(0, driveTime - 10);
        score -= driveTimePenalty;
        if (driveTimePenalty > 0) {
          reasons.push(`${driveTime}min drive`);
        }

        // Morning preference: 8am–10am gets +10
        if (hour >= 8 && hour <= 10) {
          score += 10;
          reasons.push("morning slot");
        }

        // Early afternoon preference: 1pm–2pm gets +5
        if (hour >= 13 && hour <= 14) {
          score += 5;
          reasons.push("early afternoon");
        }

        // Day proximity: sooner is better (+5 for today/tomorrow)
        if (dayOffset <= 1) {
          score += 5;
          reasons.push("soon available");
        }

        score = Math.max(0, Math.min(100, score));

        suggestions.push({
          repId: rep.id,
          repName: rep.name,
          repRole: rep.role as "install_design" | "enhancement",
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

  // Sort by score descending, then by date, then by time
  suggestions.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return a.startTime.localeCompare(b.startTime);
  });

  return suggestions.slice(0, 20);
}

// ─── Google Calendar Stub ─────────────────────────────────────────────────────

/**
 * Creates a Google Calendar event for an appointment.
 * STUB: logs to console and returns a mock event ID.
 * Replace with real Google Calendar API call once credentials are available.
 */
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
    console.log(
      "[Scheduler] Google Calendar stub: no calendarId set for rep. " +
        "Set googleCalendarId in rep management UI after completing Google Cloud setup."
    );
    return null;
  }

  console.log(
    `[Scheduler] Google Calendar stub: would create event on calendar ${params.repGoogleCalendarId}:`,
    {
      title: params.title,
      date: params.date,
      startTime: params.startTime,
      endTime: params.endTime,
      location: params.location,
    }
  );

  // Return a mock event ID
  return `mock-event-${Date.now()}`;
}

/**
 * Deletes/cancels a Google Calendar event.
 * STUB: logs to console.
 */
export async function deleteCalendarEvent(params: {
  repGoogleCalendarId: string | null | undefined;
  googleEventId: string | null | undefined;
}): Promise<void> {
  if (!params.repGoogleCalendarId || !params.googleEventId) {
    console.log("[Scheduler] Google Calendar stub: deleteCalendarEvent called but no calendarId or eventId.");
    return;
  }

  console.log(
    `[Scheduler] Google Calendar stub: would delete event ${params.googleEventId} from calendar ${params.repGoogleCalendarId}`
  );
}

// ─── DB Helpers ───────────────────────────────────────────────────────────────

export async function listSalesReps(includeInactive = false) {
  const dbConn = await getDb();
  if (!dbConn) return [];
  if (includeInactive) {
    return dbConn.select().from(salesReps);
  }
  return dbConn.select().from(salesReps).where(eq(salesReps.isActive, true));
}

export async function getSalesRepById(id: number) {
  const dbConn = await getDb();
  if (!dbConn) return null;
  const rows = await dbConn.select().from(salesReps).where(eq(salesReps.id, id));
  return rows[0] ?? null;
}

export async function createSalesRep(data: {
  name: string;
  role: "install_design" | "enhancement";
  googleCalendarId?: string;
  email?: string;
  phone?: string;
  calendarColor?: string;
}) {
  const dbConn = await getDb();
  if (!dbConn) throw new Error("Database not available");
  const result = await dbConn.insert(salesReps).values({
    name: data.name,
    role: data.role,
    googleCalendarId: data.googleCalendarId ?? null,
    email: data.email ?? null,
    phone: data.phone ?? null,
    calendarColor: data.calendarColor ?? null,
    isActive: true,
  });
  return result;
}

export async function updateSalesRep(
  id: number,
  data: Partial<{
    name: string;
    role: "install_design" | "enhancement";
    googleCalendarId: string | null;
    email: string | null;
    phone: string | null;
    isActive: boolean;
    calendarColor: string | null;
  }>
) {
  const dbConn = await getDb();
  if (!dbConn) throw new Error("Database not available");
  return dbConn.update(salesReps).set(data).where(eq(salesReps.id, id));
}

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

  // Apply date filters via raw SQL to avoid type issues with mysqlDate
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

  // Create Google Calendar event (stub)
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
        await dbConn
          .update(appointments)
          .set({ googleEventId: eventId })
          .where(eq(appointments.id, insertId));
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

  // Cancel Google Calendar event (stub)
  if (appt.googleEventId) {
    const rep = await getSalesRepById(appt.repId);
    await deleteCalendarEvent({
      repGoogleCalendarId: rep?.googleCalendarId,
      googleEventId: appt.googleEventId,
    });
  }

  return dbConn
    .update(appointments)
    .set({ status: "cancelled" })
    .where(eq(appointments.id, id));
}

/** Seed the three default reps if they don't already exist */
export async function seedDefaultReps() {
  const dbConn = await getDb();
  if (!dbConn) return;
  const existing = await dbConn.select().from(salesReps);
  if (existing.length > 0) return; // Already seeded

  await dbConn.insert(salesReps).values([
    {
      name: "Nathan Kooy",
      role: "install_design",
      isActive: true,
    },
    {
      name: "William Miller",
      role: "install_design",
      isActive: true,
    },
    {
      name: "Danny Sheffield",
      role: "enhancement",
      isActive: true,
    },
  ]);

  console.log("[Scheduler] Seeded default sales reps: Nathan Kooy, William Miller, Danny Sheffield");
}
