import { and, asc, between, desc, eq, gte, inArray, isNull, lte, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertCsvImportJob, InsertInsight, InsertLeadFollowUp, InsertServiceSubmission, InsertUser, InsertWeatherDaily,
  LeadFollowUp, csvImportJobs, insights, leadFollowUps, serviceSubmissions, users, weatherDaily,
  optOutRequests, type InsertOptOutRequest,
  quoteLeads, type InsertQuoteLead,
  gamePlays, type InsertGamePlay,
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

export async function listServiceSubmissions(limit = 200, offset = 0, year?: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  if (year) {
    const start = new Date(`${year}-01-01T00:00:00.000Z`);
    const end = new Date(`${year + 1}-01-01T00:00:00.000Z`);
    return db.select().from(serviceSubmissions)
      .where(and(gte(serviceSubmissions.createdAt, start), lte(serviceSubmissions.createdAt, end)))
      .orderBy(desc(serviceSubmissions.createdAt)).limit(limit).offset(offset);
  }
  return db.select().from(serviceSubmissions).orderBy(desc(serviceSubmissions.createdAt)).limit(limit).offset(offset);
}

export async function getServiceSubmissionById(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db.select().from(serviceSubmissions).where(eq(serviceSubmissions.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function updateSubmissionStatus(id: number, status: "new" | "contacted" | "scheduled" | "cancelled" | "closed" | "lost", adminNotes?: string) {
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

export async function countServiceSubmissions(year?: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  if (year) {
    const start = new Date(`${year}-01-01T00:00:00.000Z`);
    const end = new Date(`${year + 1}-01-01T00:00:00.000Z`);
    const rows = await db.select({ count: sql<number>`count(*)` }).from(serviceSubmissions)
      .where(and(gte(serviceSubmissions.createdAt, start), lte(serviceSubmissions.createdAt, end)));
    return Number(rows[0]?.count ?? 0);
  }
  const rows = await db.select({ count: sql<number>`count(*)` }).from(serviceSubmissions);
  return Number(rows[0]?.count ?? 0);
}

/** Get daily submission counts for a date range, optionally filtered by service type */
export async function getSubmissionCountsByDay(startDate: Date, endDate: Date, serviceType?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const conditions = [between(serviceSubmissions.createdAt, startDate, endDate)];
  if (serviceType && serviceType !== "all") {
    conditions.push(eq(serviceSubmissions.serviceType, serviceType));
  }
  const rows = await db
    .select({
      date: sql<string>`DATE(createdAt)`,
      count: sql<number>`count(*)`,
    })
    .from(serviceSubmissions)
    .where(and(...conditions))
    .groupBy(sql`DATE(createdAt)`)
    .orderBy(sql`DATE(createdAt)`);
  return rows.map(r => ({ date: String(r.date), count: Number(r.count) }));
}

/** Get submission counts by service type, optionally filtered by a specific service type */
export async function getSubmissionsByServiceType(startDate?: Date, endDate?: Date, serviceType?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const conditions: ReturnType<typeof eq>[] = [];
  if (startDate && endDate) conditions.push(between(serviceSubmissions.createdAt, startDate, endDate) as ReturnType<typeof eq>);
  if (serviceType && serviceType !== "all") conditions.push(eq(serviceSubmissions.serviceType, serviceType));
  let query = db
    .select({
      serviceType: serviceSubmissions.serviceType,
      count: sql<number>`count(*)`,
    })
    .from(serviceSubmissions);
  if (conditions.length > 0) query = query.where(and(...conditions)) as typeof query;
  const rows = await query.groupBy(serviceSubmissions.serviceType).orderBy(desc(sql`count(*)`));
  return rows.map(r => ({ serviceType: r.serviceType, count: Number(r.count) }));
}

/** Get submission counts by source (howHeard), optionally filtered by service type */
export async function getSubmissionsBySource(startDate?: Date, endDate?: Date, serviceType?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const conditions: ReturnType<typeof eq>[] = [];
  if (startDate && endDate) conditions.push(between(serviceSubmissions.createdAt, startDate, endDate) as ReturnType<typeof eq>);
  if (serviceType && serviceType !== "all") conditions.push(eq(serviceSubmissions.serviceType, serviceType));
  let query = db
    .select({
      howHeard: serviceSubmissions.howHeard,
      count: sql<number>`count(*)`,
    })
    .from(serviceSubmissions);
  if (conditions.length > 0) query = query.where(and(...conditions)) as typeof query;
  const rows = await query.groupBy(serviceSubmissions.howHeard).orderBy(desc(sql`count(*)`));
  return rows.map(r => ({ howHeard: r.howHeard ?? "Unknown", count: Number(r.count) }));
}

/** Get submission counts by budget tier, optionally filtered by service type */
export async function getSubmissionsByBudget(startDate?: Date, endDate?: Date, serviceType?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const conditions: ReturnType<typeof eq>[] = [];
  if (startDate && endDate) conditions.push(between(serviceSubmissions.createdAt, startDate, endDate) as ReturnType<typeof eq>);
  if (serviceType && serviceType !== "all") conditions.push(eq(serviceSubmissions.serviceType, serviceType));
  let query = db
    .select({
      budget: serviceSubmissions.budget,
      count: sql<number>`count(*)`,
    })
    .from(serviceSubmissions);
  if (conditions.length > 0) query = query.where(and(...conditions)) as typeof query;
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

/** Get submission count for a specific date, optionally filtered by service type */
export async function getSubmissionCountForDate(date: Date, serviceType?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const dateStr = date.toISOString().slice(0, 10);
  let query = db
    .select({ count: sql<number>`count(*)` })
    .from(serviceSubmissions)
    .where(sql`DATE(createdAt) = ${dateStr}`);
  if (serviceType && serviceType !== "all") {
    query = db
      .select({ count: sql<number>`count(*)` })
      .from(serviceSubmissions)
      .where(and(sql`DATE(createdAt) = ${dateStr}`, eq(serviceSubmissions.serviceType, serviceType)));
  }
  const rows = await query;
  return Number(rows[0]?.count ?? 0);
}

/** Get rolling average submissions per day over N days ending at a date, optionally filtered by service type */
export async function getRollingAvgSubmissions(endDate: Date, days: number, serviceType?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - days);
  const conditions: ReturnType<typeof eq>[] = [between(serviceSubmissions.createdAt, startDate, endDate) as ReturnType<typeof eq>];
  if (serviceType && serviceType !== "all") conditions.push(eq(serviceSubmissions.serviceType, serviceType));
  const rows = await db
    .select({ count: sql<number>`count(*)` })
    .from(serviceSubmissions)
    .where(and(...conditions));
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

// ── Geo-Intelligence ──────────────────────────────────────────────────────────

/** Get all geocoded submissions for the map view, optionally filtered by service type and date range */
export async function getGeocodedSubmissions(options?: {
  serviceType?: string;
  startDate?: Date;
  endDate?: Date;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const conditions: ReturnType<typeof eq>[] = [
    // Only return rows that have been geocoded
    sql`lat IS NOT NULL AND lng IS NOT NULL` as unknown as ReturnType<typeof eq>,
  ];

  if (options?.serviceType && options.serviceType !== "all") {
    conditions.push(eq(serviceSubmissions.serviceType, options.serviceType));
  }
  if (options?.startDate && options?.endDate) {
    conditions.push(between(serviceSubmissions.createdAt, options.startDate, options.endDate) as ReturnType<typeof eq>);
  }

  return db
    .select({
      id: serviceSubmissions.id,
      firstName: serviceSubmissions.firstName,
      lastName: serviceSubmissions.lastName,
      siteAddress: serviceSubmissions.siteAddress,
      serviceType: serviceSubmissions.serviceType,
      budget: serviceSubmissions.budget,
      lat: serviceSubmissions.lat,
      lng: serviceSubmissions.lng,
      neighborhood: serviceSubmissions.neighborhood,
      city: serviceSubmissions.city,
      createdAt: serviceSubmissions.createdAt,
      leadStatus: serviceSubmissions.leadStatus,
    })
    .from(serviceSubmissions)
    .where(and(...conditions))
    .orderBy(desc(serviceSubmissions.createdAt));
}

/** Get neighborhood-level aggregates for the geo-intelligence sidebar */
export async function getNeighborhoodClusters(options?: {
  serviceType?: string;
  startDate?: Date;
  endDate?: Date;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const conditions: ReturnType<typeof eq>[] = [
    sql`lat IS NOT NULL AND neighborhood IS NOT NULL` as unknown as ReturnType<typeof eq>,
  ];

  if (options?.serviceType && options.serviceType !== "all") {
    conditions.push(eq(serviceSubmissions.serviceType, options.serviceType));
  }
  if (options?.startDate && options?.endDate) {
    conditions.push(between(serviceSubmissions.createdAt, options.startDate, options.endDate) as ReturnType<typeof eq>);
  }

  const rows = await db
    .select({
      neighborhood: serviceSubmissions.neighborhood,
      city: serviceSubmissions.city,
      serviceType: serviceSubmissions.serviceType,
      count: sql<number>`count(*)`,
      avgLat: sql<number>`AVG(CAST(lat AS DECIMAL(10,7)))`,
      avgLng: sql<number>`AVG(CAST(lng AS DECIMAL(10,7)))`,
    })
    .from(serviceSubmissions)
    .where(and(...conditions))
    .groupBy(serviceSubmissions.neighborhood, serviceSubmissions.city, serviceSubmissions.serviceType)
    .orderBy(desc(sql`count(*)`));

  // Aggregate by neighborhood across service types
  const neighborhoodMap = new Map<string, {
    neighborhood: string;
    city: string;
    lat: number;
    lng: number;
    total: number;
    byServiceType: Record<string, number>;
  }>();

  for (const row of rows) {
    const key = `${row.neighborhood}|${row.city}`;
    if (!neighborhoodMap.has(key)) {
      neighborhoodMap.set(key, {
        neighborhood: row.neighborhood ?? "Unknown",
        city: row.city ?? "Unknown",
        lat: Number(row.avgLat),
        lng: Number(row.avgLng),
        total: 0,
        byServiceType: {},
      });
    }
    const entry = neighborhoodMap.get(key)!;
    const count = Number(row.count);
    entry.total += count;
    entry.byServiceType[row.serviceType ?? "Unknown"] = (entry.byServiceType[row.serviceType ?? "Unknown"] ?? 0) + count;
  }

  return Array.from(neighborhoodMap.values()).sort((a, b) => b.total - a.total);
}

/** Count submissions that still need geocoding */
export async function countUngeocodedSubmissions(): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db
    .select({ count: sql<number>`count(*)` })
    .from(serviceSubmissions)
    .where(sql`lat IS NULL AND geocodedAt IS NULL`);
  return Number(rows[0]?.count ?? 0);
}

// ── Budget helpers ─────────────────────────────────────────────────────────────

/**
 * Canonical budget bands used across the UI filter.
 * Maps raw budget strings from the form to a normalized label.
 */
export const BUDGET_BANDS = [
  { label: "Under $7,500",      key: "under_7500",    patterns: ["$5,000 and Under", "$5,000-$10,000", "Under"] },
  { label: "$7,500–$15,000",    key: "7500_15000",    patterns: ["$7,500-$10,000", "$10,000-$15,000"] },
  { label: "$15,000–$25,000",   key: "15000_25000",   patterns: ["$15,000-$25,000", "$10,000-$20,000", "$10,000–$20,000", "$10,000-$25,000", "$20,000-$35,000"] },
  { label: "$25,000–$60,000",   key: "25000_60000",   patterns: ["$25,000-$50,000", "$35,000-$60,000", "$50,000-$75,000"] },
  { label: "$60,000+",          key: "60000_plus",    patterns: ["$75,000+", "$60,000–$100,000"] },
] as const;

export type BudgetBandKey = typeof BUDGET_BANDS[number]["key"] | "all" | "other";

/** Return the SQL IN-list for a given budget band key */
function budgetPatternsForKey(key: BudgetBandKey): string[] | null {
  if (key === "all" || !key) return null;
  if (key === "other") return ["Other"];
  const band = BUDGET_BANDS.find(b => b.key === key);
  return band ? [...band.patterns] : null;
}

/**
 * Get service type popularity for a given budget band.
 * Returns each service type with count and percentage share.
 */
export async function getServicePopularityByBudget(
  budgetKey: BudgetBandKey,
  startDate?: Date,
  endDate?: Date,
): Promise<Array<{ serviceType: string; count: number; pct: number }>> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const conditions: ReturnType<typeof eq>[] = [];
  if (startDate && endDate) {
    conditions.push(between(serviceSubmissions.createdAt, startDate, endDate) as ReturnType<typeof eq>);
  }

  const patterns = budgetPatternsForKey(budgetKey);
  if (patterns && patterns.length > 0) {
    // Build OR condition for all matching budget strings
    const budgetCond = sql`budget IN (${sql.join(patterns.map(p => sql`${p}`), sql`, `)})`;
    conditions.push(budgetCond as unknown as ReturnType<typeof eq>);
  }

  let query = db
    .select({
      serviceType: serviceSubmissions.serviceType,
      count: sql<number>`count(*)`,
    })
    .from(serviceSubmissions);

  if (conditions.length > 0) query = query.where(and(...conditions)) as typeof query;

  const rows = await query
    .groupBy(serviceSubmissions.serviceType)
    .orderBy(desc(sql`count(*)`));

  const total = rows.reduce((sum, r) => sum + Number(r.count), 0);
  return rows.map(r => ({
    serviceType: r.serviceType ?? "Unknown",
    count: Number(r.count),
    pct: total > 0 ? Math.round((Number(r.count) / total) * 100) : 0,
  }));
}

/**
 * Get submission counts by day, filtered by both service type and budget band.
 */
export async function getSubmissionCountsByDayFiltered(
  startDate: Date,
  endDate: Date,
  serviceType?: string,
  budgetKey?: BudgetBandKey,
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const conditions: ReturnType<typeof eq>[] = [
    between(serviceSubmissions.createdAt, startDate, endDate) as ReturnType<typeof eq>,
  ];
  if (serviceType && serviceType !== "all") {
    conditions.push(eq(serviceSubmissions.serviceType, serviceType));
  }
  if (budgetKey && budgetKey !== "all") {
    const patterns = budgetPatternsForKey(budgetKey);
    if (patterns && patterns.length > 0) {
      const budgetCond = sql`budget IN (${sql.join(patterns.map(p => sql`${p}`), sql`, `)})`;
      conditions.push(budgetCond as unknown as ReturnType<typeof eq>);
    }
  }

  const rows = await db
    .select({
      date: sql<string>`DATE(createdAt)`,
      count: sql<number>`count(*)`,
    })
    .from(serviceSubmissions)
    .where(and(...conditions))
    .groupBy(sql`DATE(createdAt)`)
    .orderBy(sql`DATE(createdAt)`);

  return rows.map(r => ({ date: String(r.date), count: Number(r.count) }));
}

/**
 * Budget trend by year — returns, for each year, the count of submissions
 * in each canonical budget band (normalized). Used for the "Budget Trend Over Time" chart.
 */
export const BUDGET_BAND_LABELS = [
  "Under $7,500",
  "$7,500–$15K",
  "$15K–$25K",
  "$25K–$60K",
  "$60K+",
  "Other / Custom",
] as const;

/** Map a raw budget string to a canonical band label for trend charting */
function normalizeBudgetToBandLabel(raw: string): string {
  const s = (raw || "").toLowerCase().replace(/[\s,]/g, "");
  if (s.includes("under") || s.includes("andunder") ||
      (s.includes("5000") && !s.includes("50000") && !s.includes("15000") && !s.includes("25000")))
    return "Under $7,500";
  if (s.includes("7500") || s.includes("7,500") ||
      (s.includes("10000") && !s.includes("100000")) ||
      (s.includes("15000") && s.includes("10000")))
    return "$7,500–$15K";
  if (s.includes("15000") || s.includes("15,000") ||
      s.includes("20000") || s.includes("20,000") ||
      s.includes("25000") || s.includes("25,000"))
    return "$15K–$25K";
  if (s.includes("35000") || s.includes("35,000") ||
      s.includes("50000") || s.includes("50,000") ||
      s.includes("60000") || s.includes("60,000"))
    return "$25K–$60K";
  if (s.includes("75000") || s.includes("75,000") ||
      s.includes("100000") || s.includes("100,000") ||
      s.includes("75000+") || s.includes("+"))
    return "$60K+";
  return "Other / Custom";
}

export async function getBudgetTrendByYear() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const rows = await db
    .select({
      year: sql<number>`YEAR(createdAt)`,
      budget: serviceSubmissions.budget,
      count: sql<number>`count(*)`,
    })
    .from(serviceSubmissions)
    .where(
      and(
        sql`budget IS NOT NULL`,
        sql`budget != ''`,
        sql`YEAR(createdAt) >= 2022`,
      )
    )
    .groupBy(sql`YEAR(createdAt)`, serviceSubmissions.budget)
    .orderBy(sql`YEAR(createdAt)`);

  // Aggregate by year + canonical band
  const byYear: Record<number, Record<string, number>> = {};
  for (const row of rows) {
    const yr = Number(row.year);
    const band = normalizeBudgetToBandLabel(String(row.budget || ""));
    if (!byYear[yr]) byYear[yr] = {};
    byYear[yr][band] = (byYear[yr][band] || 0) + Number(row.count);
  }

  // Convert to chart-friendly array: [{ year, "Under $7,500": n, "$7,500–$15K": n, ... }]
  return Object.entries(byYear)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([year, bands]) => ({
      year: Number(year),
      ...Object.fromEntries(BUDGET_BAND_LABELS.map(b => [b, bands[b] || 0])),
    }));
}

// ── Lead Follow-Up Helpers ─────────────────────────────────────────────────

// leadFollowUps, InsertLeadFollowUp, LeadFollowUp — imported at top of file

/** Get the latest follow-up status for a submission */
export async function getLatestFollowUp(submissionId: number): Promise<LeadFollowUp | null> {
  const db = await getDb();
  if (!db) return null;
  const rows = await db
    .select()
    .from(leadFollowUps)
    .where(eq(leadFollowUps.submissionId, submissionId))
    .orderBy(desc(leadFollowUps.createdAt))
    .limit(1);
  return rows[0] ?? null;
}

/** Get all follow-up history for a submission */
export async function getFollowUpHistory(submissionId: number): Promise<LeadFollowUp[]> {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(leadFollowUps)
    .where(eq(leadFollowUps.submissionId, submissionId))
    .orderBy(desc(leadFollowUps.createdAt));
}

/** Create a new follow-up entry */
export async function createFollowUp(data: InsertLeadFollowUp) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(leadFollowUps).values(data);
}

/** Get all leads with pending reminders (remindAt <= now, not acked) */
export async function getPendingCallbacks() {
  const db = await getDb();
  if (!db) return [];
  const now = new Date();
  // Get latest follow-up per submission that has a pending reminder
  const rows = await db
    .select({
      followUp: leadFollowUps,
      submission: {
        id: serviceSubmissions.id,
        firstName: serviceSubmissions.firstName,
        lastName: serviceSubmissions.lastName,
        phone: serviceSubmissions.phone,
        email: serviceSubmissions.email,
        serviceType: serviceSubmissions.serviceType,
        siteAddress: serviceSubmissions.siteAddress,
        createdAt: serviceSubmissions.createdAt,
      },
    })
    .from(leadFollowUps)
    .innerJoin(serviceSubmissions, eq(leadFollowUps.submissionId, serviceSubmissions.id))
    .where(
      and(
        sql`${leadFollowUps.remindAt} IS NOT NULL`,
        sql`${leadFollowUps.remindAt} <= ${now}`,
        eq(leadFollowUps.reminderAcked, false),
      )
    )
    .orderBy(leadFollowUps.remindAt);
  return rows;
}

/** Acknowledge a reminder */
export async function ackReminder(followUpId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db
    .update(leadFollowUps)
    .set({ reminderAcked: true })
    .where(eq(leadFollowUps.id, followUpId));
}

/** Get follow-up status summary for all submissions (latest status per submission) */
export async function getFollowUpStatusSummary() {
  const db = await getDb();
  if (!db) return [];
  // Get the latest follow-up per submission
  const rows = await db
    .select({
      submissionId: leadFollowUps.submissionId,
      status: leadFollowUps.status,
      remindAt: leadFollowUps.remindAt,
      reminderAcked: leadFollowUps.reminderAcked,
      createdAt: leadFollowUps.createdAt,
    })
    .from(leadFollowUps)
    .orderBy(desc(leadFollowUps.createdAt));
  // Deduplicate: keep only the latest per submissionId
  const seen = new Set<number>();
  const latest: typeof rows = [];
  for (const row of rows) {
    if (!seen.has(row.submissionId)) {
      seen.add(row.submissionId);
      latest.push(row);
    }
  }
  return latest;
}

/** Get ALL upcoming reminders (not just overdue) for the Reminders page */
export async function getAllUpcomingReminders() {
  const db = await getDb();
  if (!db) return [];
  const rows = await db
    .select({
      followUp: leadFollowUps,
      submission: {
        id: serviceSubmissions.id,
        firstName: serviceSubmissions.firstName,
        lastName: serviceSubmissions.lastName,
        phone: serviceSubmissions.phone,
        email: serviceSubmissions.email,
        serviceType: serviceSubmissions.serviceType,
        createdAt: serviceSubmissions.createdAt,
      },
    })
    .from(leadFollowUps)
    .innerJoin(serviceSubmissions, eq(leadFollowUps.submissionId, serviceSubmissions.id))
    .where(
      and(
        sql`${leadFollowUps.remindAt} IS NOT NULL`,
        eq(leadFollowUps.reminderAcked, false),
      )
    )
    .orderBy(leadFollowUps.remindAt);
  return rows;
}

/** Snooze a reminder by N days */
export async function snoozeReminder(followUpId: number, days: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  // Get current remindAt
  const [row] = await db.select().from(leadFollowUps).where(eq(leadFollowUps.id, followUpId)).limit(1);
  if (!row) throw new Error("Follow-up not found");
  const base = row.remindAt ? new Date(row.remindAt) : new Date();
  base.setDate(base.getDate() + days);
  // Skip weekends
  if (base.getDay() === 0) base.setDate(base.getDate() + 1);
  if (base.getDay() === 6) base.setDate(base.getDate() + 2);
  base.setHours(9, 0, 0, 0);
  return db.update(leadFollowUps).set({ remindAt: base }).where(eq(leadFollowUps.id, followUpId));
}

/**
 * Lost-lead breakdown by reason and month.
 * Returns one row per (year-month, status) with a count.
 * Only includes "lost" statuses: not_interested, closed_lost,
 * below_minimum_budget, price_too_high.
 */
export async function getLostLeadsByMonth(months = 12) {
  const db = await getDb();
  if (!db) return [];
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - months);

  // Get the latest follow-up per submission within the window
  const rows = await db
    .select({
      submissionId: leadFollowUps.submissionId,
      status: leadFollowUps.status,
      createdAt: leadFollowUps.createdAt,
    })
    .from(leadFollowUps)
    .where(gte(leadFollowUps.createdAt, cutoff))
    .orderBy(desc(leadFollowUps.createdAt));

  // Deduplicate: keep only the latest follow-up per submission
  const seen = new Set<number>();
  const latest: typeof rows = [];
  for (const row of rows) {
    if (!seen.has(row.submissionId)) {
      seen.add(row.submissionId);
      latest.push(row);
    }
  }

  // Filter to lost statuses only
  const lostStatuses = new Set([
    "not_interested",
    "closed_lost",
    "below_minimum_budget",
    "price_too_high",
  ]);
  const lostRows = latest.filter(r => lostStatuses.has(r.status));

  // Aggregate by month + status
  const buckets: Record<string, Record<string, number>> = {};
  for (const row of lostRows) {
    const d = new Date(row.createdAt);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    if (!buckets[key]) buckets[key] = {};
    buckets[key][row.status] = (buckets[key][row.status] ?? 0) + 1;
  }

  // Build sorted array
  return Object.entries(buckets)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, counts]) => ({
      month,
      not_interested: counts["not_interested"] ?? 0,
      closed_lost: counts["closed_lost"] ?? 0,
      below_minimum_budget: counts["below_minimum_budget"] ?? 0,
      price_too_high: counts["price_too_high"] ?? 0,
    }));
}

// ── Opt-Out Requests ──────────────────────────────────────────────────────────

export async function createOptOutRequest(data: Omit<InsertOptOutRequest, "id" | "createdAt" | "updatedAt">) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(optOutRequests).values(data);
}

export async function listOptOutRequests(limit = 100, offset = 0) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(optOutRequests).orderBy(desc(optOutRequests.createdAt)).limit(limit).offset(offset);
}

export async function countOptOutRequests() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db.select({ count: sql<number>`count(*)` }).from(optOutRequests);
  return Number(rows[0]?.count ?? 0);
}

export async function updateOptOutRequestStatus(
  id: number,
  status: "pending" | "scheduled" | "installed" | "cancelled",
  adminNotes?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(optOutRequests).set({ status, ...(adminNotes !== undefined ? { adminNotes } : {}) }).where(eq(optOutRequests.id, id));
}

// ── Quote Leads ───────────────────────────────────────────────────────────────
export async function createQuoteLead(data: Omit<InsertQuoteLead, "id" | "createdAt" | "updatedAt">) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(quoteLeads).values(data);
}
export async function listQuoteLeads(limit = 100, offset = 0) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(quoteLeads).orderBy(desc(quoteLeads.createdAt)).limit(limit).offset(offset);
}
export async function countQuoteLeads() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db.select({ count: sql<number>`count(*)` }).from(quoteLeads);
  return Number(rows[0]?.count ?? 0);
}
export async function updateQuoteLeadStatus(
  id: number,
  status: "new" | "left_voicemail" | "contacted" | "quoted" | "converted" | "lost",
  adminNotes?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(quoteLeads).set({ status, ...(adminNotes !== undefined ? { adminNotes } : {}) }).where(eq(quoteLeads.id, id));
}

// ── Game Analytics ─────────────────────────────────────────────────────────────
export async function insertGamePlay(data: Omit<InsertGamePlay, 'id' | 'createdAt'>) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.insert(gamePlays).values(data);
}

export async function getGameStats() {
  const db = await getDb();
  if (!db) throw new Error('Database not available');

  // Total plays (start events)
  const totalPlaysRows = await db.select({ count: sql<number>`count(*)` }).from(gamePlays).where(eq(gamePlays.event, 'start'));
  const totalPlays = Number(totalPlaysRows[0]?.count ?? 0);

  // Level completion funnel
  const levelFunnel: Record<number, number> = {};
  for (let lvl = 1; lvl <= 4; lvl++) {
    const rows = await db.select({ count: sql<number>`count(distinct sessionId)` }).from(gamePlays)
      .where(and(eq(gamePlays.event, 'level_complete'), eq(gamePlays.level, lvl)));
    levelFunnel[lvl] = Number(rows[0]?.count ?? 0);
  }

  // Total wins
  const winsRows = await db.select({ count: sql<number>`count(*)` }).from(gamePlays).where(eq(gamePlays.event, 'win'));
  const totalWins = Number(winsRows[0]?.count ?? 0);

  // Boss wins
  const bossWinsRows = await db.select({ count: sql<number>`count(*)` }).from(gamePlays).where(eq(gamePlays.event, 'boss_win'));
  const bossWins = Number(bossWinsRows[0]?.count ?? 0);

  // Device breakdown
  const deviceRows = await db.select({ device: gamePlays.device, count: sql<number>`count(*)` })
    .from(gamePlays).where(eq(gamePlays.event, 'start')).groupBy(gamePlays.device);
  const deviceBreakdown = deviceRows.map(r => ({ device: r.device, count: Number(r.count) }));

  // Top 10 scores
  const topScores = await db.select({ initials: gamePlays.initials, score: gamePlays.score, createdAt: gamePlays.createdAt })
    .from(gamePlays).where(eq(gamePlays.event, 'win')).orderBy(desc(gamePlays.score)).limit(10);

  // Plays per day (last 30 days)
  const playsPerDay = await db.select({
    date: sql<string>`DATE(createdAt)`,
    count: sql<number>`count(*)`,
  }).from(gamePlays).where(and(eq(gamePlays.event, 'start'), gte(gamePlays.createdAt, new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))))
    .groupBy(sql`DATE(createdAt)`).orderBy(sql`DATE(createdAt)`);

  return { totalPlays, levelFunnel, totalWins, bossWins, deviceBreakdown, topScores, playsPerDay };
}

/** Year-over-year comparison stats for a given service type (or all types) */
export async function getYoyStats(serviceTypes?: string | string[]) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const now = new Date();
  const thisYear = now.getFullYear();
  const lastYear = thisYear - 1;

  // This year: Jan 1 → today
  const thisYearStart = new Date(`${thisYear}-01-01T00:00:00.000Z`);
  const thisYearEnd = now;

  // Last year same period: Jan 1 → same day/month last year
  const lastYearSamePeriodStart = new Date(`${lastYear}-01-01T00:00:00.000Z`);
  const lastYearSamePeriodEnd = new Date(now);
  lastYearSamePeriodEnd.setFullYear(lastYear);

  // Last year full year
  const lastYearStart = new Date(`${lastYear}-01-01T00:00:00.000Z`);
  const lastYearEnd = new Date(`${thisYear}-01-01T00:00:00.000Z`);

  function buildWhere(start: Date, end: Date) {
    const conditions = [
      gte(serviceSubmissions.createdAt, start),
      lte(serviceSubmissions.createdAt, end),
    ];
    if (serviceTypes) {
      const arr = Array.isArray(serviceTypes) ? serviceTypes : [serviceTypes];
      if (arr.length === 1) {
        conditions.push(eq(serviceSubmissions.serviceType, arr[0]));
      } else if (arr.length > 1) {
        conditions.push(inArray(serviceSubmissions.serviceType, arr));
      }
    }
    return and(...conditions);
  }

  const [thisYtd, lastYearSame, lastYearFull] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(serviceSubmissions).where(buildWhere(thisYearStart, thisYearEnd)),
    db.select({ count: sql<number>`count(*)` }).from(serviceSubmissions).where(buildWhere(lastYearSamePeriodStart, lastYearSamePeriodEnd)),
    db.select({ count: sql<number>`count(*)` }).from(serviceSubmissions).where(buildWhere(lastYearStart, lastYearEnd)),
  ]);

  // Monthly breakdown for this year and last year (for sparkline)
  const allRows = await db.select({ createdAt: serviceSubmissions.createdAt })
    .from(serviceSubmissions)
    .where(buildWhere(lastYearStart, thisYearEnd));

  const monthlyThisYear: Record<string, number> = {};
  const monthlyLastYear: Record<string, number> = {};
  for (const row of allRows) {
    if (!row.createdAt) continue;
    const d = new Date(row.createdAt);
    const yr = d.getFullYear();
    const mo = String(d.getMonth() + 1).padStart(2, "0");
    if (yr === thisYear) {
      monthlyThisYear[mo] = (monthlyThisYear[mo] || 0) + 1;
    } else if (yr === lastYear) {
      monthlyLastYear[mo] = (monthlyLastYear[mo] || 0) + 1;
    }
  }

  return {
    thisYear,
    lastYear,
    thisYtd: Number(thisYtd[0]?.count ?? 0),
    lastYearSamePeriod: Number(lastYearSame[0]?.count ?? 0),
    lastYearFull: Number(lastYearFull[0]?.count ?? 0),
    monthlyThisYear,
    monthlyLastYear,
    asOfDate: now.toISOString(),
  };
}
