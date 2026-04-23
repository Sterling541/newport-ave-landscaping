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
  leadStatus: mysqlEnum("leadStatus", ["new", "contacted", "scheduled", "closed", "lost"]).default("new").notNull(),
  /** Admin notes */
  adminNotes: text("adminNotes"),

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
