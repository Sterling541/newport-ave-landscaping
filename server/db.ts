import { and, asc, between, desc, eq, gte, lte, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertCsvImportJob, InsertInsight, InsertServiceSubmission, InsertUser, InsertWeatherDaily,
  csvImportJobs, insights, serviceSubmissions, users, weatherDaily,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ── Users ─────────────────────────────────────────────────────────────────────

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot upsert user: database not available"); return; }

  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};
    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];
    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
    if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
    else if (user.openId === ENV.ownerOpenId) { values.role = 'admin'; updateSet.role = 'admin'; }
    if (!values.lastSignedIn) values.lastSignedIn = new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot get user: database not available"); return undefined; }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ── Service Submissions ───────────────────────────────────────────────────────

export async function createServiceSubmission(data: InsertServiceSubmission) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(serviceSubmissions).values(data);
  return result[0];
}

export async function bulkInsertServiceSubmissions(rows: InsertServiceSubmission[]) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  if (rows.length === 0) return;
  // Insert in batches of 100 to avoid query size limits
  for (let i = 0; i < rows.length; i += 100) {
    await db.insert(serviceSubmissions).values(rows.slice(i, i + 100));
  }
}

export async function listServiceSubmissions(limit = 200, offset = 0) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(serviceSubmissions).orderBy(desc(serviceSubmissions.createdAt)).limit(limit).offset(offset);
}

export async function getServiceSubmissionById(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db.select().from(serviceSubmissions).where(eq(serviceSubmissions.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function updateSubmissionStatus(id: number, status: "new" | "contacted" | "scheduled" | "closed" | "lost", adminNotes?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const updateData: Record<string, unknown> = { leadStatus: status };
  if (adminNotes !== undefined) updateData.adminNotes = adminNotes;
  await db.update(serviceSubmissions).set(updateData).where(eq(serviceSubmissions.id, id));
}

export async function deleteServiceSubmission(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(serviceSubmissions).where(eq(serviceSubmissions.id, id));
}

export async function countServiceSubmissions() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db.select({ count: sql<number>`count(*)` }).from(serviceSubmissions);
  return Number(rows[0]?.count ?? 0);
}

/** Get daily submission counts for a date range */
export async function getSubmissionCountsByDay(startDate: Date, endDate: Date) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db
    .select({
      date: sql<string>`DATE(createdAt)`,
      count: sql<number>`count(*)`,
    })
    .from(serviceSubmissions)
    .where(between(serviceSubmissions.createdAt, startDate, endDate))
    .groupBy(sql`DATE(createdAt)`)
    .orderBy(sql`DATE(createdAt)`);
  return rows.map(r => ({ date: String(r.date), count: Number(r.count) }));
}

/** Get submission counts by service type */
export async function getSubmissionsByServiceType(startDate?: Date, endDate?: Date) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  let query = db
    .select({
      serviceType: serviceSubmissions.serviceType,
      count: sql<number>`count(*)`,
    })
    .from(serviceSubmissions);
  if (startDate && endDate) {
    query = query.where(between(serviceSubmissions.createdAt, startDate, endDate)) as typeof query;
  }
  const rows = await query.groupBy(serviceSubmissions.serviceType).orderBy(desc(sql`count(*)`));
  return rows.map(r => ({ serviceType: r.serviceType, count: Number(r.count) }));
}

/** Get submission counts by source (howHeard) */
export async function getSubmissionsBySource(startDate?: Date, endDate?: Date) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  let query = db
    .select({
      howHeard: serviceSubmissions.howHeard,
      count: sql<number>`count(*)`,
    })
    .from(serviceSubmissions);
  if (startDate && endDate) {
    query = query.where(between(serviceSubmissions.createdAt, startDate, endDate)) as typeof query;
  }
  const rows = await query.groupBy(serviceSubmissions.howHeard).orderBy(desc(sql`count(*)`));
  return rows.map(r => ({ howHeard: r.howHeard ?? "Unknown", count: Number(r.count) }));
}

/** Get submission counts by budget tier */
export async function getSubmissionsByBudget(startDate?: Date, endDate?: Date) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  let query = db
    .select({
      budget: serviceSubmissions.budget,
      count: sql<number>`count(*)`,
    })
    .from(serviceSubmissions);
  if (startDate && endDate) {
    query = query.where(between(serviceSubmissions.createdAt, startDate, endDate)) as typeof query;
  }
  const rows = await query.groupBy(serviceSubmissions.budget).orderBy(desc(sql`count(*)`));
  return rows.map(r => ({ budget: r.budget ?? "Not specified", count: Number(r.count) }));
}

/** Get recent submissions (last N days) for anomaly detection */
export async function getRecentSubmissions(days = 7) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const since = new Date();
  since.setDate(since.getDate() - days);
  return db.select().from(serviceSubmissions).where(gte(serviceSubmissions.createdAt, since)).orderBy(desc(serviceSubmissions.createdAt));
}

/** Get submission count for a specific date */
export async function getSubmissionCountForDate(date: Date) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const dateStr = date.toISOString().slice(0, 10);
  const rows = await db
    .select({ count: sql<number>`count(*)` })
    .from(serviceSubmissions)
    .where(sql`DATE(createdAt) = ${dateStr}`);
  return Number(rows[0]?.count ?? 0);
}

/** Get rolling average submissions per day over N days ending at a date */
export async function getRollingAvgSubmissions(endDate: Date, days: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - days);
  const rows = await db
    .select({ count: sql<number>`count(*)` })
    .from(serviceSubmissions)
    .where(between(serviceSubmissions.createdAt, startDate, endDate));
  const total = Number(rows[0]?.count ?? 0);
  return total / days;
}

// ── Weather ───────────────────────────────────────────────────────────────────

export async function upsertWeatherDay(data: InsertWeatherDaily) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(weatherDaily).values(data).onDuplicateKeyUpdate({
    set: {
      tempHighC: data.tempHighC, tempLowC: data.tempLowC,
      tempHighF: data.tempHighF, tempLowF: data.tempLowF,
      precipMm: data.precipMm, snowMm: data.snowMm,
      windAvgKph: data.windAvgKph, cloudCoverPct: data.cloudCoverPct,
      weatherCode: data.weatherCode, dataType: data.dataType,
      fetchedAt: new Date(),
    },
  });
}

export async function getWeatherForDate(date: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db.select().from(weatherDaily).where(eq(weatherDaily.date, date as unknown as Date)).limit(1);
  return rows[0] ?? null;
}

export async function getWeatherRange(startDate: string, endDate: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db
    .select()
    .from(weatherDaily)
    .where(and(gte(weatherDaily.date, startDate as unknown as Date), lte(weatherDaily.date, endDate as unknown as Date)))
    .orderBy(asc(weatherDaily.date));
}

export async function getWeatherForecast() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const today = new Date().toISOString().slice(0, 10);
  return db
    .select()
    .from(weatherDaily)
    .where(and(gte(weatherDaily.date, today as unknown as Date), eq(weatherDaily.dataType, "forecast")))
    .orderBy(asc(weatherDaily.date))
    .limit(14);
}

export async function getLatestWeatherDate() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db
    .select({ date: weatherDaily.date })
    .from(weatherDaily)
    .where(eq(weatherDaily.dataType, "historical"))
    .orderBy(desc(weatherDaily.date))
    .limit(1);
  return rows[0]?.date ?? null;
}

export async function countWeatherRows() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db.select({ count: sql<number>`count(*)` }).from(weatherDaily);
  return Number(rows[0]?.count ?? 0);
}

// ── Insights ──────────────────────────────────────────────────────────────────

export async function createInsight(data: InsertInsight) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(insights).values(data);
  return result[0];
}

export async function listInsights(limit = 50, status?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  let query = db.select().from(insights);
  if (status) {
    query = query.where(eq(insights.status, status as "active" | "read" | "snoozed" | "valuable" | "dismissed")) as typeof query;
  }
  return query.orderBy(desc(insights.generatedAt)).limit(limit);
}

export async function updateInsightStatus(id: number, status: "active" | "read" | "snoozed" | "valuable" | "dismissed", feedback?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const updateData: Record<string, unknown> = { status };
  if (feedback) updateData.userFeedback = feedback;
  await db.update(insights).set(updateData).where(eq(insights.id, id));
}

export async function getActiveInsights() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(insights).where(eq(insights.status, "active")).orderBy(desc(insights.generatedAt)).limit(20);
}

// ── CSV Import Jobs ───────────────────────────────────────────────────────────

export async function createCsvImportJob(data: InsertCsvImportJob) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(csvImportJobs).values(data);
  return result[0];
}

export async function updateCsvImportJob(id: number, updates: Partial<InsertCsvImportJob>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(csvImportJobs).set(updates).where(eq(csvImportJobs.id, id));
}

export async function listCsvImportJobs() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(csvImportJobs).orderBy(desc(csvImportJobs.startedAt)).limit(20);
}
