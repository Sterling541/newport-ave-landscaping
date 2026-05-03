/**
 * Platform Lead Ingest (Yelp + Houzz)
 * ─────────────────────────────────────────────────────────────────────────────
 * Receives a POST from Google Apps Script when a new Yelp or Houzz lead email
 * arrives in the leads@newportavelandscaping.com Gmail inbox, parses the email
 * body, and creates a quoteLeads record in the Lead Center.
 *
 * Security: requests must include the header  X-Webhook-Secret: <YELP_WEBHOOK_SECRET>
 *
 * Supported platforms:
 *   - Yelp  (from: messaging.yelp.com, Q&A format)
 *   - Houzz (from: houzz.com, labeled-field format)
 */
import type { Express, Request, Response } from "express";
import { createQuoteLead } from "./db";
import { ENV } from "./_core/env";

// ── Shared lead data shape ────────────────────────────────────────────────────
export interface PlatformLeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  siteAddress: string;
  serviceType: string;
  comments: string;
  rawSubject: string;
  rawBody: string;
  platform: "yelp" | "houzz";
}

// ─────────────────────────────────────────────────────────────────────────────
// YELP PARSER
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Parse a Yelp lead notification email.
 *
 * Yelp uses a Q&A format:
 *
 *   You have a new <service type> request.
 *   Sent to Newport Avenue Landscaping
 *   1020 SE Paiute Way Bend, OR 97702
 *
 *   What part of your landscape needs maintenance?
 *   Irrigation
 *
 *   When do you require this service?
 *   As soon as possible
 *
 *   Are there any other details you'd like to share?
 *   I'm unable to get my system to work properly...
 *
 *   In what location do you need the service?
 *   97701
 *
 *   Jennifer S.
 *   @0 ★5 ✉0
 */
export function parseYelpEmail(subject: string, body: string): PlatformLeadData {
  const text = body.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const lines = text.split("\n").map(l => l.trim()).filter(l => l.length > 0);

  // ── Extract service type from subject ─────────────────────────────────────
  // Subject: "New Lead: Reply to Jennifer's irrigation repair or maintenance request"
  let serviceType = "";
  const subjectSvcMatch = subject.match(/Reply to [^']+'\s*s\s+(.+?)\s+request/i);
  if (subjectSvcMatch) serviceType = subjectSvcMatch[1].trim();

  // Also try "You have a new X request" from body
  const bodyTypeMatch = text.match(/You have a new (.+?)\s+request/i);
  if (bodyTypeMatch && !serviceType) serviceType = bodyTypeMatch[1].trim();

  if (!serviceType) serviceType = "Yelp Lead";

  // ── Extract Q&A answers ───────────────────────────────────────────────────
  // Build a map of question → answer by finding lines that look like questions
  // (end with ?) and taking the next non-empty line as the answer
  const qa: Record<string, string> = {};
  for (let i = 0; i < lines.length - 1; i++) {
    if (lines[i].endsWith("?")) {
      qa[lines[i].toLowerCase()] = lines[i + 1];
    }
  }

  // Service category from Q&A
  const serviceCategory =
    qa["what part of your landscape needs maintenance?"] ||
    qa["what type of service do you need?"] ||
    qa["what services are you looking for?"] ||
    qa["what type of work do you need done?"] ||
    "";

  if (serviceCategory) {
    serviceType = serviceCategory;
  }

  // Timing
  const timing =
    qa["when do you require this service?"] ||
    qa["when do you need this service?"] ||
    qa["when do you need the work done?"] ||
    "";

  // Details / comments
  const details =
    qa["are there any other details you'd like to share?"] ||
    qa["are there any other details you would like to share?"] ||
    qa["please describe your project"] ||
    qa["describe your project"] ||
    qa["additional details"] ||
    "";

  // Location (zip code or address)
  const location =
    qa["in what location do you need the service?"] ||
    qa["where do you need the service?"] ||
    qa["what is your address?"] ||
    qa["location"] ||
    "";

  // Build address — Yelp only gives zip code, so format it nicely
  let siteAddress = "";
  if (location) {
    // If it's just a zip code, add "Bend, OR"
    if (/^\d{5}$/.test(location)) {
      siteAddress = `Bend, OR ${location}`;
    } else {
      siteAddress = location;
    }
  } else {
    siteAddress = "Bend, OR";
  }

  // Build comments
  const commentParts: string[] = [];
  if (serviceCategory) commentParts.push(`Service: ${serviceCategory}`);
  if (timing) commentParts.push(`Timing: ${timing}`);
  if (details) commentParts.push(`Details: ${details}`);
  const comments = commentParts.join("\n");

  // ── Extract customer name ─────────────────────────────────────────────────
  // Yelp puts the customer name as a standalone line near the bottom,
  // just before the "@N ★N ✉N" rating line.
  // Pattern: a line that looks like "Jennifer S." or "John Smith"
  // (1-3 words, possibly with a trailing period on the last name initial)
  let fullName = "";

  // Try to find name from subject first: "Reply to Jennifer's"
  const subjectNameMatch = subject.match(/Reply to ([^']+)'/i);
  if (subjectNameMatch) {
    fullName = subjectNameMatch[1].trim();
  }

  // If subject only gave first name, look for full name in body
  if (!fullName || !fullName.includes(" ")) {
    for (let i = lines.length - 1; i >= 0; i--) {
      const line = lines[i];
      if (line.includes("@") || line.includes("http") || line.includes("©")) continue;
      if (line.startsWith("Or ") || line.startsWith("Don't") || line.startsWith("Having")) continue;
      if (line.includes("yelp") || line.includes("Yelp")) continue;
      if (/^\d/.test(line)) continue;
      if (line.endsWith("?")) continue;
      if (/^[A-Z][a-z]+ [A-Z][a-z.]+\.?$/.test(line)) {
        fullName = line;
        break;
      }
    }
  }

  if (!fullName) fullName = "Yelp Lead";

  const nameParts = fullName.trim().split(/\s+/);
  const firstName = nameParts[0] ?? "Yelp";
  const lastName = nameParts.slice(1).join(" ") || "Lead";

  return {
    firstName,
    lastName,
    email: "noreply@yelp.com",
    phone: "",
    siteAddress,
    serviceType,
    comments,
    rawSubject: subject,
    rawBody: body,
    platform: "yelp",
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// HOUZZ PARSER
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Parse a Houzz lead notification email.
 *
 * Houzz sends labeled-field emails in two main formats:
 *
 * FORMAT 1 — Project Match / Direct Message (most common):
 *   Subject: "New lead from [Name] on Houzz"  OR  "[Name] sent you a message on Houzz"
 *
 *   Name: John Smith
 *   Email: john@example.com
 *   Phone: (541) 555-1234
 *   Zip Code: 97701
 *   Project Type: Landscape Design
 *   Message: I'm looking for help with my backyard...
 *
 * FORMAT 2 — Houzz Pro website contact form:
 *   Subject: "New contact form submission from [Name]"
 *
 *   You have a new contact form submission from [Name].
 *   Name: John Smith
 *   Email: john@example.com
 *   Phone: (541) 555-1234
 *   Address: 123 Main St, Bend, OR 97701
 *   Message: I need help with...
 *
 * FORMAT 3 — Project Match questionnaire:
 *   Subject: "You have a new lead on Houzz"
 *
 *   A homeowner in [City, State] is looking for help with [service].
 *   Name: [may be masked as "Homeowner" until you respond]
 *   Zip Code: 97701
 *   Project: Lawn Care
 *   Details: ...
 */
export function parseHouzzEmail(subject: string, body: string): PlatformLeadData {
  const text = body.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const lines = text.split("\n").map(l => l.trim()).filter(l => l.length > 0);

  // ── Extract labeled fields (e.g. "Name: John Smith") ─────────────────────
  const fields: Record<string, string> = {};
  for (const line of lines) {
    const match = line.match(/^([A-Za-z][A-Za-z\s]{1,30}):\s*(.+)$/);
    if (match) {
      const key = match[1].trim().toLowerCase();
      const val = match[2].trim();
      fields[key] = val;
    }
  }

  // ── Name ──────────────────────────────────────────────────────────────────
  let fullName =
    fields["name"] ||
    fields["full name"] ||
    fields["customer name"] ||
    "";

  // Try extracting from subject: "New lead from John Smith on Houzz"
  if (!fullName) {
    const subjectNameMatch =
      subject.match(/New lead from (.+?) on Houzz/i) ||
      subject.match(/^(.+?) sent you a message/i) ||
      subject.match(/submission from (.+?)$/i);
    if (subjectNameMatch) fullName = subjectNameMatch[1].trim();
  }

  // Houzz sometimes masks the name as "Homeowner" for Project Match leads
  if (!fullName || fullName.toLowerCase() === "homeowner") fullName = "Houzz Lead";

  const nameParts = fullName.trim().split(/\s+/);
  const firstName = nameParts[0] ?? "Houzz";
  const lastName = nameParts.slice(1).join(" ") || "Lead";

  // ── Contact info ──────────────────────────────────────────────────────────
  const email =
    fields["email"] ||
    fields["email address"] ||
    "noreply@houzz.com";

  const phone =
    fields["phone"] ||
    fields["phone number"] ||
    fields["mobile"] ||
    "";

  // ── Address / location ────────────────────────────────────────────────────
  let siteAddress =
    fields["address"] ||
    fields["street address"] ||
    "";

  const zipCode =
    fields["zip code"] ||
    fields["zip"] ||
    fields["postal code"] ||
    "";

  if (!siteAddress && zipCode) {
    siteAddress = /^\d{5}$/.test(zipCode) ? `Bend, OR ${zipCode}` : zipCode;
  }

  if (!siteAddress) {
    // Try to extract city/state from body: "A homeowner in Bend, OR is looking for..."
    const locationMatch = text.match(/homeowner in ([A-Za-z\s]+,\s*[A-Z]{2})/i);
    if (locationMatch) siteAddress = locationMatch[1].trim();
  }

  if (!siteAddress) siteAddress = "Bend, OR";

  // ── Service type ──────────────────────────────────────────────────────────
  let serviceType =
    fields["project type"] ||
    fields["project"] ||
    fields["service type"] ||
    fields["service"] ||
    fields["type of work"] ||
    fields["category"] ||
    "";

  // Try subject: "New lead for Lawn Care on Houzz"
  if (!serviceType) {
    const subjectSvcMatch =
      subject.match(/New lead for (.+?) on Houzz/i) ||
      subject.match(/looking for help with (.+?)[\.\,]/i);
    if (subjectSvcMatch) serviceType = subjectSvcMatch[1].trim();
  }

  // Try body: "is looking for help with lawn care"
  if (!serviceType) {
    const bodyMatch = text.match(/looking for (?:help with|a pro for|someone to help with)\s+(.+?)[\.\n]/i);
    if (bodyMatch) serviceType = bodyMatch[1].trim();
  }

  if (!serviceType) serviceType = "Houzz Lead";

  // ── Message / details ─────────────────────────────────────────────────────
  const message =
    fields["message"] ||
    fields["details"] ||
    fields["project details"] ||
    fields["description"] ||
    fields["notes"] ||
    "";

  // Build a structured comment block
  const commentParts: string[] = [];
  if (message) commentParts.push(`Message: ${message}`);

  // Include any extra Q&A fields that aren't already captured
  const skipKeys = new Set([
    "name", "full name", "customer name",
    "email", "email address",
    "phone", "phone number", "mobile",
    "address", "street address", "zip code", "zip", "postal code",
    "project type", "project", "service type", "service", "type of work", "category",
    "message", "details", "project details", "description", "notes",
  ]);
  for (const [key, val] of Object.entries(fields)) {
    if (!skipKeys.has(key)) {
      commentParts.push(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${val}`);
    }
  }

  const comments = commentParts.join("\n");

  return {
    firstName,
    lastName,
    email,
    phone,
    siteAddress,
    serviceType,
    comments,
    rawSubject: subject,
    rawBody: body,
    platform: "houzz",
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// PLATFORM DETECTION
// ─────────────────────────────────────────────────────────────────────────────
export function detectPlatform(from: string, subject: string): "yelp" | "houzz" | null {
  const fromLower = (from || "").toLowerCase();
  const subjectLower = (subject || "").toLowerCase();

  if (
    fromLower.includes("yelp.com") ||
    fromLower.includes("yelp-inc") ||
    fromLower.includes("messaging.yelp")
  ) {
    return "yelp";
  }

  if (
    fromLower.includes("houzz.com") ||
    fromLower.includes("houzz-inc") ||
    subjectLower.includes("on houzz") ||
    subjectLower.includes("from houzz") ||
    subjectLower.includes("houzz lead") ||
    subjectLower.includes("contact form submission")
  ) {
    return "houzz";
  }

  // Fallback: if subject says "new lead" and no platform identified, try Yelp heuristic
  if (subjectLower.includes("new lead")) {
    return "yelp";
  }

  return null;
}

// ── Express route registration ────────────────────────────────────────────────
export function registerYelpLeadWebhook(app: Express) {
  app.post("/api/inbound/yelp-lead", async (req: Request, res: Response) => {
    // ── Auth: shared secret header ─────────────────────────────────────────
    const secret = ENV.yelpWebhookSecret ?? process.env.YELP_WEBHOOK_SECRET ?? "";
    if (secret) {
      const provided = req.headers["x-webhook-secret"] as string | undefined;
      if (!provided || provided !== secret) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
    }

    const { subject, body, from, messageId } = req.body as {
      subject?: string;
      body?: string;
      from?: string;
      messageId?: string;
    };

    if (!subject || !body) {
      res.status(400).json({ error: "Missing subject or body" });
      return;
    }

    // ── Detect platform ───────────────────────────────────────────────────
    const platform = detectPlatform(from ?? "", subject);

    if (!platform) {
      res.json({ ok: true, skipped: true, reason: "not_recognized_platform" });
      return;
    }

    try {
      let lead: PlatformLeadData;
      if (platform === "houzz") {
        lead = parseHouzzEmail(subject, body);
      } else {
        lead = parseYelpEmail(subject, body);
      }

      // Build a rich message that includes all parsed data
      const message = [
        lead.comments,
        `\n[${platform === "houzz" ? "Houzz" : "Yelp"} Lead — original subject: ${lead.rawSubject}]`,
      ].filter(Boolean).join("\n");

      const sourceLabel = platform === "houzz" ? "Houzz" : "Yelp";

      await createQuoteLead({
        firstName: lead.firstName,
        lastName: lead.lastName,
        email: lead.email,
        phone: lead.phone,
        address: lead.siteAddress,
        serviceInterest: lead.serviceType,
        message,
        source: platform,
        sourceLabel,
        status: "new",
        adminNotes: messageId ? `Gmail Message-ID: ${messageId}` : undefined,
      });

      console.log(`[platform-ingest] Created ${sourceLabel} lead: ${lead.firstName} ${lead.lastName} — ${lead.serviceType}`);
      res.json({ ok: true, lead: `${lead.firstName} ${lead.lastName}`, platform });
    } catch (err) {
      console.error("[platform-ingest] Failed to create submission:", err);
      res.status(500).json({ error: "Failed to save lead" });
    }
  });
}
