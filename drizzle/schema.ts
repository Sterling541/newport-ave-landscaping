import {
  boolean, decimal, float, int, index, mysqlEnum, mysqlTable,
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
}, (t) => ({
  // Fast list query: ORDER BY createdAt DESC WHERE isSpam = false
  idxCreatedAt: index("idx_ss_created_at").on(t.createdAt),
  idxIsSpam: index("idx_ss_is_spam").on(t.isSpam),
  idxCreatedAtIsSpam: index("idx_ss_created_spam").on(t.isSpam, t.createdAt),
  idxServiceType: index("idx_ss_service_type").on(t.serviceType),
  idxLeadStatus: index("idx_ss_lead_status").on(t.leadStatus),
}));

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
  /** Lead platform source: 'quick_form' (website), 'yelp', 'google', 'houzz', 'angi', 'homeadvisor', 'thumbtack', 'nextdoor', 'facebook', 'other' */
  source: varchar("source", { length: 64 }).default("quick_form").notNull(),
  /** Optional display label for the source (e.g. 'Yelp', 'Google Business Profile') */
  sourceLabel: varchar("sourceLabel", { length: 128 }),
  /** Admin workflow status */
  status: mysqlEnum("quoteLeadStatus", ["new", "left_voicemail", "contacted", "quoted", "converted", "lost"]).default("new").notNull(),
  adminNotes: text("adminNotes"),
  /** Spam flag — set by admin to hide junk submissions */
  isSpam: boolean("isSpam").default(false).notNull(),
  /** Sales consultant assigned when lead is converted to a scheduled service */
  assignedConsultant: varchar("assignedConsultant", { length: 128 }),
  /** Timestamp when lead was converted */
  convertedAt: timestamp("convertedAt"),
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

/**
 * Tracks which install sales consultant was last assigned so we can rotate
 * Nathan Kooy and William Miller evenly on install/design leads.
 * Danny Sheffield always handles enhancement work (no rotation needed).
 * One row per rotationGroup — upserted on each assignment.
 */
export const consultantRotation = mysqlTable("consultant_rotation", {
  id: int("id").autoincrement().primaryKey(),
  /** The rotation group: 'install' (Nathan/William) */
  rotationGroup: varchar("rotationGroup", { length: 32 }).notNull().unique(),
  /** The consultant who was last assigned */
  lastAssigned: varchar("lastAssigned", { length: 128 }).notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().onUpdateNow(),
});
export type ConsultantRotation = typeof consultantRotation.$inferSelect;

// ═══════════════════════════════════════════════════════════════════════════
// NEWPORT SMART SCHEDULER
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Sales representatives for the Newport Smart Scheduler.
 * Nathan Kooy and William Miller handle install/design (rotating).
 * Danny Sheffield handles enhancement only.
 */
export const salesReps = mysqlTable("sales_reps", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  /** Role determines which appointment types this rep handles */
  role: mysqlEnum("repRole", ["install_design", "enhancement"]).notNull(),
  /** FK to staffUsers — links this rep to their staff login account.
   * When set, appointment reminder emails are sent to the linked staffUser's email. */
  staffUserId: int("staffUserId"),
  /** Google Calendar ID for this rep — set after Google Cloud setup */
  googleCalendarId: varchar("googleCalendarId", { length: 256 }),
  /** Email for display / notifications (fallback if no staffUserId linked) */
  email: varchar("email", { length: 320 }),
  /** Phone for display */
  phone: varchar("phone", { length: 32 }),
  /** Whether this rep is currently active */
  isActive: boolean("isActive").default(true).notNull(),
  /** Hex or OKLCH color string for this rep's calendar blocks — e.g. "#3b82f6" */
  calendarColor: varchar("calendarColor", { length: 64 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SalesRep = typeof salesReps.$inferSelect;
export type InsertSalesRep = typeof salesReps.$inferInsert;

/**
 * Appointments scheduled through the Newport Smart Scheduler.
 * Each appointment links a service submission (or standalone lead) to a sales rep
 * on a specific date/time slot.
 */
export const appointments = mysqlTable("appointments", {
  id: int("id").autoincrement().primaryKey(),
  /** Optional FK to service_submissions — null for standalone appointments */
  submissionId: int("submissionId"),
  /** FK to sales_reps */
  repId: int("repId").notNull(),
  /** Date of the appointment (YYYY-MM-DD) */
  appointmentDate: mysqlDate("appointmentDate").notNull(),
  /** Start time as HH:MM (24h) */
  startTime: varchar("startTime", { length: 8 }).notNull(),
  /** End time as HH:MM (24h) */
  endTime: varchar("endTime", { length: 8 }).notNull(),
  /** Type of appointment */
  appointmentType: mysqlEnum("appointmentType", [
    "install_design",
    "enhancement",
    "follow_up",
    "other",
  ]).notNull(),
  /** Workflow status */
  status: mysqlEnum("appointmentStatus", [
    "scheduled",
    "confirmed",
    "completed",
    "cancelled",
    "no_show",
  ])
    .default("scheduled")
    .notNull(),
  /** Google Calendar event ID — populated after real API integration */
  googleEventId: varchar("googleEventId", { length: 256 }),
  /** Estimated drive time in minutes from Newport HQ to job site */
  driveTimeMinutes: int("driveTimeMinutes"),
  /** Customer name (denormalized for quick display) */
  customerName: varchar("customerName", { length: 256 }),
  /** Customer address (denormalized for quick display) */
  customerAddress: text("customerAddress"),
  /** Customer phone */
  customerPhone: varchar("customerPhone", { length: 32 }),
  /** Admin / scheduler notes */
  notes: text("notes"),
  /** Optional FK to contacts CRM table */
  contactId: int("contactId"),
  /** Optional FK to properties CRM table */
  propertyId: int("propertyId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Appointment = typeof appointments.$inferSelect;
export type InsertAppointment = typeof appointments.$inferInsert;

// ═══════════════════════════════════════════════════════════════════════════
// BADGE SCAN SYSTEM
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Newport employees who carry badges with QR codes.
 * Separate from salesReps — covers field crew, designers, office staff too.
 */
export const employees = mysqlTable("employees", {
  id: int("id").autoincrement().primaryKey(),
  firstName: varchar("firstName", { length: 128 }).notNull(),
  lastName: varchar("lastName", { length: 128 }).notNull(),
  /** Short unique code on badge QR: e.g. "NK", "WM", "DS" */
  employeeCode: varchar("employeeCode", { length: 8 }).notNull().unique(),
  /** Role label: Sales, Designer, Field Crew, Office, Other */
  role: varchar("role", { length: 64 }).notNull().default("Field Crew"),
  isActive: boolean("isActive").default(true).notNull(),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 32 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (t) => ({
  idxCode: index("idx_emp_code").on(t.employeeCode),
  idxActive: index("idx_emp_active").on(t.isActive),
}));

export type Employee = typeof employees.$inferSelect;
export type InsertEmployee = typeof employees.$inferInsert;

/**
 * Badge scan leads — submitted when a customer scans an employee's badge QR code.
 */
export const badgeScans = mysqlTable("badge_scans", {
  id: int("id").autoincrement().primaryKey(),
  /** FK to employees — null if employee_code_raw didn't match any employee */
  employeeId: int("employeeId"),
  /** Raw URL param value, kept for audit */
  employeeCodeRaw: varchar("employeeCodeRaw", { length: 16 }),
  /** Customer contact info */
  email: varchar("email", { length: 320 }).notNull(),
  firstName: varchar("firstName", { length: 128 }).notNull(),
  lastName: varchar("lastName", { length: 128 }).notNull(),
  phone: varchar("phone", { length: 32 }).notNull(),
  /** Employee name as typed by the customer (first + last) — required on form */
  employeeNameFirst: varchar("employeeNameFirst", { length: 128 }),
  employeeNameLast: varchar("employeeNameLast", { length: 128 }),
  /** Service type selected */
  serviceType: mysqlEnum("badgeScanServiceType", [
    "maintenance",
    "landscape_construction",
    "irrigation_sprinkler",
    "other",
  ]).notNull(),
  /** Populated when serviceType = 'other' */
  serviceTypeOther: text("serviceTypeOther"),
  /** Optional message from customer */
  message: text("message"),
  /** Admin workflow status */
  status: mysqlEnum("badgeScanStatus", [
    "new",
    "contacted",
    "scheduled",
    "converted",
    "lost_price",
    "lost_other",
    "no_response",
  ]).default("new").notNull(),
  /** Internal admin notes */
  notes: text("notes"),
  /** FK to appointments — set when scan converts to a scheduled appointment */
  convertedAppointmentId: int("convertedAppointmentId"),
  convertedAt: timestamp("convertedAt"),
  convertedByUserId: int("convertedByUserId"),
  submittedAt: timestamp("submittedAt").defaultNow().notNull(),
  /** User agent string for audit */
  submittedUserAgent: text("submittedUserAgent"),
  /** Hashed IP for rate limiting — never raw IP */
  submittedIpHash: varchar("submittedIpHash", { length: 64 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (t) => ({
  idxEmployeeId: index("idx_bs_employee_id").on(t.employeeId),
  idxStatus: index("idx_bs_status").on(t.status),
  idxSubmittedAt: index("idx_bs_submitted_at").on(t.submittedAt),
  idxServiceType: index("idx_bs_service_type").on(t.serviceType),
}));

export type BadgeScan = typeof badgeScans.$inferSelect;
export type InsertBadgeScan = typeof badgeScans.$inferInsert;

/**
 * Monthly payout records for employee badge scan conversions.
 * $75 per conversion. Aggregated per employee per month.
 */
export const payoutRecords = mysqlTable("payout_records", {
  id: int("id").autoincrement().primaryKey(),
  employeeId: int("employeeId").notNull(),
  periodYear: int("periodYear").notNull(),
  periodMonth: int("periodMonth").notNull(),
  conversionCount: int("conversionCount").notNull().default(0),
  /** conversionCount × 75 */
  amountUsd: decimal("amountUsd", { precision: 10, scale: 2 }).notNull().default("0.00"),
  paidAt: timestamp("paidAt"),
  paidByUserId: int("paidByUserId"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (t) => ({
  idxEmployeePeriod: index("idx_pr_employee_period").on(t.employeeId, t.periodYear, t.periodMonth),
  idxPaidAt: index("idx_pr_paid_at").on(t.paidAt),
}));

export type PayoutRecord = typeof payoutRecords.$inferSelect;
export type InsertPayoutRecord = typeof payoutRecords.$inferInsert;

/**
 * Staff users — employees/users who can log into the admin backend
 * using their work email + a 4–8 digit PIN (stored as bcrypt hash).
 * Separate from the Manus OAuth `users` table.
 */
export const staffUsers = mysqlTable("staff_users", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  firstName: varchar("firstName", { length: 128 }).notNull(),
  lastName: varchar("lastName", { length: 128 }).notNull(),
  /** bcrypt hash of their 4–8 digit PIN */
  pinHash: varchar("pinHash", { length: 256 }).notNull(),
  /** Role slug — matches a row in role_definitions */
  role: varchar("role", { length: 64 }).notNull().default("sales_rep"),
  isActive: boolean("isActive").notNull().default(true),
  phone: varchar("phone", { length: 32 }),
  title: varchar("title", { length: 128 }),
  lastLoginAt: timestamp("lastLoginAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (t) => ({
  idxEmail: index("idx_su_email").on(t.email),
  idxRole: index("idx_su_role").on(t.role),
}));
export type StaffUser = typeof staffUsers.$inferSelect;
export type InsertStaffUser = typeof staffUsers.$inferInsert;

/**
 * Role definitions — each role has a name and a JSON blob of
 * nav-item visibility flags (keyed by href).
 */
export const roleDefinitions = mysqlTable("role_definitions", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 64 }).notNull().unique(),
  label: varchar("label", { length: 128 }).notNull(),
  /** JSON: { "/admin/submissions": true, "/admin/csv-import": false, ... } */
  permissions: text("permissions").notNull().default("{}"),
  isSystem: boolean("isSystem").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (t) => ({
  idxSlug: index("idx_rd_slug").on(t.slug),
}));
export type RoleDefinition = typeof roleDefinitions.$inferSelect;
export type InsertRoleDefinition = typeof roleDefinitions.$inferInsert;

/**
 * PIN reset tokens — one-time tokens sent via email to allow staff to reset their PIN.
 * Tokens expire after 30 minutes and are single-use.
 */
export const pinResetTokens = mysqlTable("pin_reset_tokens", {
  id: int("id").autoincrement().primaryKey(),
  /** FK to staff_users */
  staffUserId: int("staffUserId").notNull(),
  /** Secure random token (hex string) */
  token: varchar("token", { length: 128 }).notNull().unique(),
  /** When the token expires */
  expiresAt: timestamp("expiresAt").notNull(),
  /** Whether the token has been used */
  usedAt: timestamp("usedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (t) => ({
  idxToken: index("idx_prt_token").on(t.token),
  idxStaffUser: index("idx_prt_staff_user").on(t.staffUserId),
}));
export type PinResetToken = typeof pinResetTokens.$inferSelect;
export type InsertPinResetToken = typeof pinResetTokens.$inferInsert;
/**
 * Login attempt tracking — enforces 5-attempt lockout per email.
 * Attempts reset on successful login. Lockout lasts 15 minutes.
 */
export const loginAttempts = mysqlTable("login_attempts", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  attempts: int("attempts").notNull().default(0),
  lockedUntil: timestamp("lockedUntil"),
  lastAttemptAt: timestamp("lastAttemptAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (t) => ({
  idxEmail: index("idx_la_email").on(t.email),
}));
export type LoginAttempt = typeof loginAttempts.$inferSelect;
export type InsertLoginAttempt = typeof loginAttempts.$inferInsert;

/**
 * Contacts — permanent business records for people/companies.
 * Separate from leads (serviceSubmissions). Only created intentionally.
 */
export const contacts = mysqlTable("contacts", {
  id: int("id").autoincrement().primaryKey(),

  // Type & prefix
  contactType: mysqlEnum("contactType", [
    "prospect", "customer", "employee", "vendor", "other"
  ]).default("prospect").notNull(),
  namePrefix: mysqlEnum("namePrefix", [
    "mr", "mrs", "ms", "dr", "company", "other"
  ]),

  // Name
  firstName: varchar("firstName", { length: 128 }),
  lastName: varchar("lastName", { length: 128 }),
  companyName: varchar("companyName", { length: 256 }),

  // Contact info
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 32 }),
  secondaryPhone: varchar("secondaryPhone", { length: 32 }),

  // Addresses
  mailingAddress: text("mailingAddress"),
  mailingCity: varchar("mailingCity", { length: 128 }),
  mailingState: varchar("mailingState", { length: 64 }),
  mailingZip: varchar("mailingZip", { length: 16 }),

  billingAddress: text("billingAddress"),
  billingCity: varchar("billingCity", { length: 128 }),
  billingState: varchar("billingState", { length: 64 }),
  billingZip: varchar("billingZip", { length: 16 }),
  billingAddressSameAsMailing: boolean("billingAddressSameAsMailing").default(true).notNull(),

  // Notes
  notes: text("notes"),

  // Employee-specific: link to a staffUser
  isSystemUser: boolean("isSystemUser").default(false),
  linkedStaffUserId: int("linkedStaffUserId"),

  // Source tracking
  /** Lead that originated this contact, if converted */
  sourceLeadId: int("sourceLeadId"),

  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  createdByUserId: int("createdByUserId"),
}, (t) => ({
  idxContactType: index("idx_c_contact_type").on(t.contactType),
  idxEmail: index("idx_c_email").on(t.email),
  idxLastName: index("idx_c_last_name").on(t.lastName),
  idxCreatedAt: index("idx_c_created_at").on(t.createdAt),
}));

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = typeof contacts.$inferInsert;

/**
 * Properties — permanent records for physical locations/sites.
 * Separate from contacts. A property can have many contacts over time.
 */
export const properties = mysqlTable("properties", {
  id: int("id").autoincrement().primaryKey(),

  propertyName: varchar("propertyName", { length: 256 }),

  // Address
  address: text("address").notNull(),
  city: varchar("city", { length: 128 }),
  state: varchar("state", { length: 64 }),
  zip: varchar("zip", { length: 16 }),

  // Geocoded coordinates for map display
  lat: decimal("lat", { precision: 10, scale: 7 }),
  lng: decimal("lng", { precision: 10, scale: 7 }),
  geocodedAt: timestamp("geocodedAt"),

  propertyType: mysqlEnum("propertyType", [
    "residential", "commercial", "hoa", "multi_family", "builder", "other"
  ]).default("residential").notNull(),

  notes: text("notes"),

  // Source tracking
  sourceLeadId: int("sourceLeadId"),

  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  createdByUserId: int("createdByUserId"),
}, (t) => ({
  idxPropertyType: index("idx_p_property_type").on(t.propertyType),
  idxCity: index("idx_p_city").on(t.city),
  idxCreatedAt: index("idx_p_created_at").on(t.createdAt),
  idxZip: index("idx_p_zip").on(t.zip),
}));

export type Property = typeof properties.$inferSelect;
export type InsertProperty = typeof properties.$inferInsert;

/**
 * Contact ↔ Property links — many-to-many with relationship type.
 * A contact can be linked to many properties and vice versa.
 */
export const contactPropertyLinks = mysqlTable("contact_property_links", {
  id: int("id").autoincrement().primaryKey(),
  contactId: int("contactId").notNull(),
  propertyId: int("propertyId").notNull(),

  relationshipType: mysqlEnum("relationshipType", [
    "owner", "tenant", "primary_contact", "billing_contact",
    "property_manager", "employee", "other"
  ]).default("primary_contact").notNull(),

  isPrimary: boolean("isPrimary").default(false).notNull(),
  isBillingContact: boolean("isBillingContact").default(false).notNull(),

  notes: text("notes"),

  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (t) => ({
  idxContactId: index("idx_cpl_contact_id").on(t.contactId),
  idxPropertyId: index("idx_cpl_property_id").on(t.propertyId),
  idxContactProperty: index("idx_cpl_contact_property").on(t.contactId, t.propertyId),
}));

export type ContactPropertyLink = typeof contactPropertyLinks.$inferSelect;
export type InsertContactPropertyLink = typeof contactPropertyLinks.$inferInsert;

/**
 * Property files — photos, designs, documents, contracts, etc.
 * Bytes stored in S3; only metadata stored here.
 */
export const propertyFiles = mysqlTable("property_files", {
  id: int("id").autoincrement().primaryKey(),
  propertyId: int("propertyId").notNull(),

  // Optional link to a contact (e.g. a signed contract from a specific contact)
  linkedContactId: int("linkedContactId"),

  fileName: varchar("fileName", { length: 256 }).notNull(),
  fileKey: varchar("fileKey", { length: 512 }).notNull(),
  fileUrl: text("fileUrl").notNull(),
  mimeType: varchar("mimeType", { length: 128 }),
  fileSizeBytes: int("fileSizeBytes"),

  category: mysqlEnum("category", [
    "photo", "design", "document", "contract", "plan", "permit", "note", "other"
  ]).default("other").notNull(),

  description: text("description"),

  uploadedByUserId: int("uploadedByUserId"),
  uploadedByName: varchar("uploadedByName", { length: 256 }),

  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (t) => ({
  idxPropertyId: index("idx_pf_property_id").on(t.propertyId),
  idxCategory: index("idx_pf_category").on(t.category),
  idxCreatedAt: index("idx_pf_created_at").on(t.createdAt),
}));

export type PropertyFile = typeof propertyFiles.$inferSelect;
export type InsertPropertyFile = typeof propertyFiles.$inferInsert;
