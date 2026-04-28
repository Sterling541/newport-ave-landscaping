import {
  boolean, decimal, float, int, mysqlEnum, mysqlTable,
  text, timestamp, varchar, date as mysqlDate,
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Service submission table — mirrors the Newport Ave Landscaping Google Form.
 * Extended with analytics/insights fields for the AI Insights Engine.
 * SCHEMA VERSIONING: Never remove or rename existing columns — mark deprecated instead.
 */
export const serviceSubmissions = mysqlTable("service_submissions", {
  id: int("id").autoincrement().primaryKey(),

  // ── Page 1: Contact Info ──────────────────────────────────────────────────
  email: varchar("email", { length: 320 }).notNull(),
  usedBefore: varchar("usedBefore", { length: 8 }),
  firstName: varchar("firstName", { length: 128 }).notNull(),
  lastName: varchar("lastName", { length: 128 }).notNull(),
  phone: varchar("phone", { length: 32 }).notNull(),
  siteAddress: text("siteAddress").notNull(),
  billingAddress: text("billingAddress"),
  howHeard: text("howHeard"),

  // ── Page 2: Service Type ─────────────────────────────────────────────────
  serviceType: varchar("serviceType", { length: 128 }).notNull(),

  // ── Warranty fields ───────────────────────────────────────────────────────
  warrantyDetails: text("warrantyDetails"),
  salesConsultant: varchar("salesConsultant", { length: 128 }),
  projectManager: varchar("projectManager", { length: 128 }),

  // ── Maintenance fields ────────────────────────────────────────────────────
  maintenanceTypes: text("maintenanceTypes"),
  maintenanceNotes: text("maintenanceNotes"),

  // ── Irrigation fields ─────────────────────────────────────────────────────
  irrigationTypes: text("irrigationTypes"),
  irrigationNotes: text("irrigationNotes"),
  winterizationDate: varchar("winterizationDate", { length: 32 }),

  // ── Lighting fields ───────────────────────────────────────────────────────
  lightingTypes: text("lightingTypes"),
  lightingNotes: text("lightingNotes"),

  // ── Water Feature fields ──────────────────────────────────────────────────
  waterFeatureTypes: text("waterFeatureTypes"),
  waterFeatureNotes: text("waterFeatureNotes"),
  waterFeatureRepairDesc: text("waterFeatureRepairDesc"),

  // ── Credit Card Info ──────────────────────────────────────────────────────
  creditCardNumber: varchar("creditCardNumber", { length: 32 }),
  creditCardExpiration: varchar("creditCardExpiration", { length: 16 }),
  creditCardCvv: varchar("creditCardCvv", { length: 8 }),
  creditCardAuthSignature: text("creditCardAuthSignature"),

  // ── Concrete fields ───────────────────────────────────────────────────────
  concreteServiceType: varchar("concreteServiceType", { length: 64 }),
  concreteElements: text("concreteElements"),
  concreteDimensions: text("concreteDimensions"),
  concreteHasStairs: varchar("concreteHasStairs", { length: 8 }),
  concreteAttachedToBuilding: varchar("concreteAttachedToBuilding", { length: 16 }),

  // ── Landscape Design fields ───────────────────────────────────────────────
  hasExistingDesign: varchar("hasExistingDesign", { length: 8 }),
  needsHoaApproval: varchar("needsHoaApproval", { length: 16 }),
  landscapeElements: text("landscapeElements"),
  budget: varchar("budget", { length: 32 }),
  budgetOther: varchar("budgetOther", { length: 64 }),
  designConsultationAccepted: varchar("designConsultationAccepted", { length: 64 }),
  idealCompletionDate: varchar("idealCompletionDate", { length: 32 }),

  // ── Scheduling ────────────────────────────────────────────────────────────
  flexibleScheduling: boolean("flexibleScheduling").default(false),
  isRentalProperty: varchar("isRentalProperty", { length: 8 }),
  isPropertyOwner: varchar("isPropertyOwner", { length: 8 }),
  hasPets: varchar("hasPets", { length: 8 }),

  // ── Final ─────────────────────────────────────────────────────────────────
  comments: text("comments"),

  // ── Geo-Intelligence fields ─────────────────────────────────────────────
  /** WGS84 latitude from geocoding siteAddress */
  lat: decimal("lat", { precision: 10, scale: 7 }),
  /** WGS84 longitude from geocoding siteAddress */
  lng: decimal("lng", { precision: 10, scale: 7 }),
  /** Neighborhood or district name from reverse geocoding */
  neighborhood: varchar("neighborhood", { length: 128 }),
  /** City name from reverse geocoding */
  city: varchar("city", { length: 128 }),
  /** When geocoding was last attempted */
  geocodedAt: timestamp("geocodedAt"),

  // ── Analytics / Insights Engine fields ───────────────────────────────────
  /** Hashed IP address for anomaly detection (never store raw IP) */
  ipHash: varchar("ipHash", { length: 64 }),
  /** ZIP code extracted from siteAddress for geographic analysis */
  zipCode: varchar("zipCode", { length: 16 }),
  /** Seconds taken to complete the form (for quality scoring) */
  formCompletionSeconds: int("formCompletionSeconds"),
  /** Data source: 'form' | 'csv_import' | 'manual' */
  dataSource: varchar("dataSource", { length: 32 }).default("form").notNull(),
  /** Schema version for forward compatibility */
  schemaVersion: varchar("schemaVersion", { length: 8 }).default("1.0").notNull(),
  /** Lead status for admin tracking */
  leadStatus: mysqlEnum("leadStatus", ["new", "contacted", "scheduled", "cancelled", "closed", "lost"]).default("new").notNull(),
  /** Admin notes */
  adminNotes: text("adminNotes"),
  /** Spam flag — set by admin to hide junk submissions */
  isSpam: boolean("isSpam").default(false).notNull(),

  // ── Metadata ─────────────────────────────────────────────────────────────
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ServiceSubmission = typeof serviceSubmissions.$inferSelect;
export type InsertServiceSubmission = typeof serviceSubmissions.$inferInsert;

/**
 * Daily weather data for Bend, OR — pulled from Open-Meteo API.
 * Used for weather correlation analysis.
 */
export const weatherDaily = mysqlTable("weather_daily", {
  id: int("id").autoincrement().primaryKey(),
  date: mysqlDate("date").notNull().unique(),
  tempHighC: float("tempHighC"),
  tempLowC: float("tempLowC"),
  tempHighF: float("tempHighF"),
  tempLowF: float("tempLowF"),
  precipMm: float("precipMm"),
  snowMm: float("snowMm"),
  windAvgKph: float("windAvgKph"),
  cloudCoverPct: float("cloudCoverPct"),
  weatherCode: int("weatherCode"),   // WMO weather code
  /** 'historical' | 'forecast' */
  dataType: varchar("dataType", { length: 16 }).default("historical").notNull(),
  fetchedAt: timestamp("fetchedAt").defaultNow().notNull(),
});

export type WeatherDaily = typeof weatherDaily.$inferSelect;
export type InsertWeatherDaily = typeof weatherDaily.$inferInsert;

/**
 * AI-generated insights and alerts.
 */
export const insights = mysqlTable("insights", {
  id: int("id").autoincrement().primaryKey(),
  generatedAt: timestamp("generatedAt").defaultNow().notNull(),
  /** Category: volume | weather | source | budget | anomaly | advertising | messaging | sales | competitive | strategic */
  category: varchar("category", { length: 64 }).notNull(),
  /** Priority: critical | high | medium | low */
  priority: mysqlEnum("priority", ["critical", "high", "medium", "low"]).default("medium").notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  observation: text("observation").notNull(),
  /** JSON string of data points used */
  dataPoints: text("dataPoints"),
  recommendedAction: text("recommendedAction"),
  /** 0.0–1.0 */
  confidence: float("confidence"),
  /** Status: active | read | snoozed | valuable | dismissed */
  status: mysqlEnum("status", ["active", "read", "snoozed", "valuable", "dismissed"]).default("active").notNull(),
  /** User feedback for model training */
  userFeedback: varchar("userFeedback", { length: 16 }),
  /** Date range this insight covers */
  periodStart: mysqlDate("periodStart"),
  periodEnd: mysqlDate("periodEnd"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Insight = typeof insights.$inferSelect;
export type InsertInsight = typeof insights.$inferInsert;

/**
 * CSV import job log — tracks historical data imports.
 */
export const csvImportJobs = mysqlTable("csv_import_jobs", {
  id: int("id").autoincrement().primaryKey(),
  filename: varchar("filename", { length: 256 }).notNull(),
  status: mysqlEnum("status", ["pending", "processing", "completed", "failed"]).default("pending").notNull(),
  totalRows: int("totalRows"),
  importedRows: int("importedRows"),
  skippedRows: int("skippedRows"),
  errorLog: text("errorLog"),
  importedBy: int("importedBy"),
  startedAt: timestamp("startedAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
});

export type CsvImportJob = typeof csvImportJobs.$inferSelect;
export type InsertCsvImportJob = typeof csvImportJobs.$inferInsert;

/**
 * Lead follow-up tracking — logs every status change on a submission.
 * Supports voicemail reminders, appointment scheduling, etc.
 */
export const leadFollowUps = mysqlTable("lead_follow_ups", {
  id: int("id").autoincrement().primaryKey(),
  submissionId: int("submissionId").notNull(),
  /**
   * Status options:
   *   called_scheduled   — Called and scheduled an appointment
   *   left_voicemail     — Left a voicemail; remindAt set to next business day
   *   appointment_set    — Appointment confirmed in calendar
   *   no_answer          — No answer; no auto-reminder
   *   not_interested     — Lead declined / not interested
   *   follow_up_needed   — Generic flag: needs follow-up
   *   closed_won             — Job won
   *   closed_lost            — Job lost
   *   below_minimum_budget   — Lead didn't meet minimum budget
   *   price_too_high         — Lead didn't like the price / too expensive
   */
  status: mysqlEnum("followUpStatus", [
    "called_scheduled",
    "left_voicemail",
    "appointment_set",
    "no_answer",
    "not_interested",
    "follow_up_needed",
    "closed_won",
    "closed_lost",
    "below_minimum_budget",
    "price_too_high",
  ]).notNull(),
  notes: text("notes"),
  /** When to remind — set automatically for left_voicemail (next business day) */
  remindAt: timestamp("remindAt"),
  /** Whether the reminder has been acknowledged */
  reminderAcked: boolean("reminderAcked").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type LeadFollowUp = typeof leadFollowUps.$inferSelect;
export type InsertLeadFollowUp = typeof leadFollowUps.$inferInsert;

/**
 * Spray & Prune Opt-Out Program requests submitted by customers.
 */
export const optOutRequests = mysqlTable("opt_out_requests", {
  id: int("id").autoincrement().primaryKey(),
  fullName: varchar("fullName", { length: 200 }).notNull(),
  neighborhood: varchar("neighborhood", { length: 200 }).notNull(),
  serviceAddress: varchar("serviceAddress", { length: 500 }).notNull(),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 30 }),
  /** Comma-separated: "no_spray", "no_prune", or "no_spray,no_prune" */
  optOutTypes: varchar("optOutTypes", { length: 50 }).notNull(),
  acknowledged: boolean("acknowledged").default(false).notNull(),
  /** Admin workflow status */
  status: mysqlEnum("optOutStatus", ["pending", "scheduled", "installed", "cancelled"])
    .default("pending")
    .notNull(),
  adminNotes: text("adminNotes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type OptOutRequest = typeof optOutRequests.$inferSelect;
export type InsertOptOutRequest = typeof optOutRequests.$inferInsert;

/**
 * Quick Quote leads — submitted when a visitor clicks "Get a Quote" or "Quick Quote".
 * Lighter-weight than the full service submission form.
 */
export const quoteLeads = mysqlTable("quote_leads", {
  id: int("id").autoincrement().primaryKey(),
  firstName: varchar("firstName", { length: 128 }).notNull(),
  lastName: varchar("lastName", { length: 128 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 32 }).notNull(),
  address: text("address"),
  serviceInterest: varchar("serviceInterest", { length: 128 }),
  message: text("message"),
  /** Where they clicked from: 'hero', 'navbar', 'floating_cta', 'cta_banner', 'services', 'other' */
  source: varchar("source", { length: 64 }).default("other").notNull(),
  /** Admin workflow status */
  status: mysqlEnum("quoteLeadStatus", ["new", "left_voicemail", "contacted", "quoted", "converted", "lost"]).default("new").notNull(),
  adminNotes: text("adminNotes"),
  /** Spam flag — set by admin to hide junk submissions */
  isSpam: boolean("isSpam").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type QuoteLead = typeof quoteLeads.$inferSelect;
export type InsertQuoteLead = typeof quoteLeads.$inferInsert;

/**
 * Game analytics — tracks every Lawn Mower Dash play event.
 * Used in the admin dashboard to see engagement, funnel, and top scores.
 */
export const gamePlays = mysqlTable("game_plays", {
  id: int("id").autoincrement().primaryKey(),
  /** Session ID (random UUID generated client-side per game session) */
  sessionId: varchar("sessionId", { length: 64 }).notNull(),
  /** Event type: 'start' | 'level_complete' | 'death' | 'win' | 'double_or_nothing' | 'boss_win' | 'boss_loss' */
  event: varchar("event", { length: 32 }).notNull(),
  /** Level number (1-4), null for start/win events */
  level: int("level"),
  /** Score at time of event */
  score: int("score").default(0).notNull(),
  /** Player initials (3 chars) entered on leaderboard */
  initials: varchar("initials", { length: 3 }),
  /** Device type: 'desktop' | 'mobile' | 'tablet' */
  device: varchar("device", { length: 16 }).default("desktop").notNull(),
  /** User agent string (truncated) */
  userAgent: varchar("userAgent", { length: 256 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type GamePlay = typeof gamePlays.$inferSelect;
export type InsertGamePlay = typeof gamePlays.$inferInsert;
