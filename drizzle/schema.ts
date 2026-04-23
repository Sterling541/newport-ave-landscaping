import { boolean, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
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
 * All fields are nullable unless explicitly required by the form.
 */
export const serviceSubmissions = mysqlTable("service_submissions", {
  id: int("id").autoincrement().primaryKey(),

  // ── Page 1: Contact Info ──────────────────────────────────────────────────
  email: varchar("email", { length: 320 }).notNull(),
  usedBefore: varchar("usedBefore", { length: 8 }),           // 'Yes' | 'No'
  firstName: varchar("firstName", { length: 128 }).notNull(),
  lastName: varchar("lastName", { length: 128 }).notNull(),
  phone: varchar("phone", { length: 32 }).notNull(),
  siteAddress: text("siteAddress").notNull(),
  billingAddress: text("billingAddress"),
  /** Comma-separated list of referral sources */
  howHeard: text("howHeard"),

  // ── Page 2: Service Type ─────────────────────────────────────────────────
  serviceType: varchar("serviceType", { length: 128 }).notNull(),

  // ── Warranty fields ───────────────────────────────────────────────────────
  warrantyDetails: text("warrantyDetails"),
  salesConsultant: varchar("salesConsultant", { length: 128 }),
  projectManager: varchar("projectManager", { length: 128 }),

  // ── Maintenance fields ────────────────────────────────────────────────────
  /** Comma-separated maintenance service types */
  maintenanceTypes: text("maintenanceTypes"),
  maintenanceNotes: text("maintenanceNotes"),

  // ── Irrigation fields ─────────────────────────────────────────────────────
  /** Comma-separated irrigation service types */
  irrigationTypes: text("irrigationTypes"),
  irrigationNotes: text("irrigationNotes"),
  winterizationDate: varchar("winterizationDate", { length: 32 }),

  // ── Lighting fields ───────────────────────────────────────────────────────
  /** Comma-separated lighting service types */
  lightingTypes: text("lightingTypes"),
  lightingNotes: text("lightingNotes"),

  // ── Water Feature fields ──────────────────────────────────────────────────
  /** Comma-separated water feature service types */
  waterFeatureTypes: text("waterFeatureTypes"),
  waterFeatureNotes: text("waterFeatureNotes"),
  waterFeatureRepairDesc: text("waterFeatureRepairDesc"),

  // ── Credit Card Info (shown for maintenance/irrigation/lighting/water feature)
  creditCardNumber: varchar("creditCardNumber", { length: 32 }),
  creditCardExpiration: varchar("creditCardExpiration", { length: 16 }),
  creditCardCvv: varchar("creditCardCvv", { length: 8 }),
  creditCardAuthSignature: text("creditCardAuthSignature"),

  // ── Concrete fields ───────────────────────────────────────────────────────
  concreteServiceType: varchar("concreteServiceType", { length: 64 }),
  /** Comma-separated concrete elements */
  concreteElements: text("concreteElements"),
  concreteDimensions: text("concreteDimensions"),
  concreteHasStairs: varchar("concreteHasStairs", { length: 8 }),
  concreteAttachedToBuilding: varchar("concreteAttachedToBuilding", { length: 16 }),

  // ── Landscape Design fields ───────────────────────────────────────────────
  hasExistingDesign: varchar("hasExistingDesign", { length: 8 }),
  needsHoaApproval: varchar("needsHoaApproval", { length: 16 }),
  /** Comma-separated landscape elements */
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

  // ── Metadata ─────────────────────────────────────────────────────────────
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ServiceSubmission = typeof serviceSubmissions.$inferSelect;
export type InsertServiceSubmission = typeof serviceSubmissions.$inferInsert;
