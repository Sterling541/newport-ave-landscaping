/**
 * CSV Import Processor for Newport Ave Landscaping historical inquiry data.
 * Handles 2024–2025 Google Form export format.
 *
 * SCHEMA VERSIONING RULE: Never modify existing columns. Mark deprecated fields
 * with a comment and add new fields alongside them.
 */

import { InsertServiceSubmission } from "../drizzle/schema";

export interface CsvRow {
  [key: string]: string;
}

export interface ImportResult {
  imported: InsertServiceSubmission[];
  skipped: { row: number; reason: string }[];
  errors: { row: number; error: string }[];
}

/**
 * Normalize a column header from the CSV to a consistent key.
 * Handles variations in Google Form export column names.
 */
function normalizeHeader(header: string): string {
  return header
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
}

/**
 * Try to parse a date string into a JS Date.
 * Handles MM/DD/YYYY, YYYY-MM-DD, and ISO formats.
 */
function parseDate(dateStr: string): Date | null {
  if (!dateStr || dateStr.trim() === "") return null;
  const s = dateStr.trim();

  // MM/DD/YYYY HH:MM:SS or MM/DD/YYYY
  const mdyMatch = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?/);
  if (mdyMatch) {
    const [, m, d, y, h = "0", min = "0", sec = "0"] = mdyMatch;
    const dt = new Date(`${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}T${h.padStart(2, "0")}:${min}:${sec}`);
    if (!isNaN(dt.getTime())) return dt;
  }

  // ISO or YYYY-MM-DD
  const dt = new Date(s);
  if (!isNaN(dt.getTime())) return dt;

  return null;
}

/**
 * Extract ZIP code from an address string.
 */
function extractZip(address: string): string | null {
  const match = address.match(/\b(\d{5})(?:-\d{4})?\b/);
  return match ? match[1] : null;
}

/**
 * Map a CSV row (from Google Form export) to an InsertServiceSubmission.
 * Returns null if the row is invalid/incomplete.
 */
export function mapCsvRowToSubmission(
  row: CsvRow,
  normalizedHeaders: Record<string, string>,
  rowIndex: number
): { submission: InsertServiceSubmission | null; skipReason?: string; error?: string } {
  // Helper to get a value by trying multiple possible column names
  const get = (...keys: string[]): string => {
    for (const key of keys) {
      const normalized = normalizeHeader(key);
      const colName = normalizedHeaders[normalized];
      if (colName && row[colName] !== undefined && row[colName].trim() !== "") {
        return row[colName].trim();
      }
      // Also try direct key lookup
      if (row[key] !== undefined && row[key].trim() !== "") return row[key].trim();
    }
    return "";
  };

  // Required fields
  const email = get("Email Address", "Email", "email");
  const firstName = get("First Name", "First name", "first_name", "firstName");
  const lastName = get("Last Name", "Last name", "last_name", "lastName");
  const phone = get("Best Phone Number", "Phone", "phone", "Phone Number");
  const siteAddress = get("Site Address (Full Address)", "Site Address", "Address", "address", "siteAddress");
  const serviceType = get("Service Type", "What service", "service_type", "serviceType", "Service");

  // Timestamp
  const timestampStr = get("Timestamp", "timestamp", "Date", "Submitted", "submitted_at", "created_at");
  const createdAt = parseDate(timestampStr) ?? new Date();

  // Validate required fields
  if (!email && !firstName && !phone) {
    return { submission: null, skipReason: `Row ${rowIndex}: Missing required contact fields (email, name, phone)` };
  }
  if (!email) return { submission: null, skipReason: `Row ${rowIndex}: Missing email` };

  const submission: InsertServiceSubmission = {
    email,
    firstName: firstName || "Unknown",
    lastName: lastName || "",
    phone: phone || "",
    siteAddress: siteAddress || "",
    serviceType: serviceType || "Unknown",

    // Optional fields
    usedBefore: get("Have you used Newport", "usedBefore") || undefined,
    billingAddress: get("Billing Address", "billingAddress") || undefined,
    howHeard: get("How did you hear", "howHeard", "Source", "source") || undefined,

    // Warranty
    warrantyDetails: get("Warranty Details", "warrantyDetails") || undefined,
    salesConsultant: get("Sales Consultant", "salesConsultant") || undefined,
    projectManager: get("Project Manager", "projectManager") || undefined,

    // Maintenance
    maintenanceTypes: get("Type of Maintenance", "maintenanceTypes") || undefined,
    maintenanceNotes: get("Maintenance Notes", "maintenanceNotes") || undefined,

    // Irrigation
    irrigationTypes: get("Type of Irrigation", "irrigationTypes") || undefined,
    irrigationNotes: get("Irrigation Notes", "irrigationNotes") || undefined,
    winterizationDate: get("Winterization Date", "winterizationDate") || undefined,

    // Lighting
    lightingTypes: get("Type of Lighting", "lightingTypes") || undefined,
    lightingNotes: get("Lighting Notes", "lightingNotes") || undefined,

    // Water feature
    waterFeatureTypes: get("Type of Water Feature", "waterFeatureTypes") || undefined,
    waterFeatureNotes: get("Water Feature Notes", "waterFeatureNotes") || undefined,
    waterFeatureRepairDesc: get("Water Feature Repair", "waterFeatureRepairDesc") || undefined,

    // Design
    hasExistingDesign: get("existing design", "hasExistingDesign") || undefined,
    needsHoaApproval: get("HOA", "hoa", "needsHoaApproval") || undefined,
    landscapeElements: get("landscape elements", "landscapeElements") || undefined,
    budget: get("Preliminary Budget", "Budget", "budget") || undefined,
    budgetOther: get("Other Budget", "budgetOther") || undefined,
    designConsultationAccepted: get("Design Consultation", "designConsultationAccepted") || undefined,
    idealCompletionDate: get("Ideal Completion", "idealCompletionDate") || undefined,

    // Scheduling
    flexibleScheduling: get("flexible", "flexibleScheduling").toLowerCase().includes("yes") || false,
    isRentalProperty: get("rental property", "isRentalProperty") || undefined,
    isPropertyOwner: get("property owner", "isPropertyOwner") || undefined,
    hasPets: get("pets", "hasPets") || undefined,

    // Final
    comments: get("Comments", "comments", "Notes", "notes") || undefined,

    // Analytics fields
    zipCode: siteAddress ? (extractZip(siteAddress) ?? undefined) : undefined,
    dataSource: "csv_import",
    schemaVersion: "1.0",
    leadStatus: "new",

    // Override timestamp with the original submission date
    createdAt,
  };

  return { submission };
}

/**
 * Parse a CSV string into rows.
 * Handles quoted fields with commas and newlines.
 */
export function parseCsvString(csvText: string): { headers: string[]; rows: CsvRow[] } {
  const lines = csvText.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const records: string[][] = [];
  let current: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < lines.length; i++) {
    const ch = lines[i];
    if (ch === '"') {
      if (inQuotes && lines[i + 1] === '"') { field += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      current.push(field);
      field = "";
    } else if (ch === "\n" && !inQuotes) {
      current.push(field);
      records.push(current);
      current = [];
      field = "";
    } else {
      field += ch;
    }
  }
  if (field || current.length > 0) {
    current.push(field);
    records.push(current);
  }

  if (records.length === 0) return { headers: [], rows: [] };

  const headers = records[0].map(h => h.trim());
  const rows = records.slice(1).map(record => {
    const row: CsvRow = {};
    headers.forEach((h, i) => { row[h] = (record[i] ?? "").trim(); });
    return row;
  });

  // Filter out completely empty rows
  const nonEmptyRows = rows.filter(r => Object.values(r).some(v => v !== ""));

  return { headers, rows: nonEmptyRows };
}

/**
 * Process a full CSV text and return import results.
 */
export function processCsvImport(csvText: string): ImportResult {
  const { headers, rows } = parseCsvString(csvText);

  // Build normalized header map: normalizedKey -> originalHeader
  const normalizedHeaders: Record<string, string> = {};
  headers.forEach(h => {
    normalizedHeaders[normalizeHeader(h)] = h;
  });

  const imported: InsertServiceSubmission[] = [];
  const skipped: { row: number; reason: string }[] = [];
  const errors: { row: number; error: string }[] = [];

  rows.forEach((row, i) => {
    try {
      const result = mapCsvRowToSubmission(row, normalizedHeaders, i + 2);
      if (result.submission) {
        imported.push(result.submission);
      } else if (result.skipReason) {
        skipped.push({ row: i + 2, reason: result.skipReason });
      }
    } catch (err) {
      errors.push({ row: i + 2, error: String(err) });
    }
  });

  return { imported, skipped, errors };
}
