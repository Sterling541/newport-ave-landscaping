/**
 * Yelp Lead Ingest
 * ─────────────────────────────────────────────────────────────────────────────
 * Receives a POST from Google Apps Script when a new Yelp lead email arrives
 * in the leads@newportavelandscaping.com Gmail inbox, parses the email body,
 * and creates a quoteLeads record in the Lead Center.
 *
 * Security: requests must include the header  X-Webhook-Secret: <YELP_WEBHOOK_SECRET>
 */
import type { Express, Request, Response } from "express";
import { createQuoteLead } from "./db";
import { ENV } from "./_core/env";

// ── Yelp email body parser ────────────────────────────────────────────────────
export interface YelpLeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  siteAddress: string;
  serviceType: string;
  comments: string;
  rawSubject: string;
  rawBody: string;
}

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
export function parseYelpEmail(subject: string, body: string): YelpLeadData {
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
  // Look for a line that matches "FirstName LastName" or "FirstName L." pattern
  // that appears after the Q&A section (after the last "?" answer)
  if (!fullName || !fullName.includes(" ")) {
    // Find the line that looks like a name (2 words, not a question, not a URL)
    for (let i = lines.length - 1; i >= 0; i--) {
      const line = lines[i];
      // Skip lines that are clearly not names
      if (line.includes("@") || line.includes("http") || line.includes("©")) continue;
      if (line.startsWith("Or ") || line.startsWith("Don't") || line.startsWith("Having")) continue;
      if (line.includes("yelp") || line.includes("Yelp")) continue;
      if (/^\d/.test(line)) continue; // starts with digit
      if (line.endsWith("?")) continue; // question
      // Match "Word Word" or "Word W." pattern (a name)
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
  };
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

    const { subject, body, messageId } = req.body as {
      subject?: string;
      body?: string;
      messageId?: string;
    };

    if (!subject || !body) {
      res.status(400).json({ error: "Missing subject or body" });
      return;
    }

    // ── Verify this is actually a Yelp lead email ─────────────────────────
    const isYelpLead =
      /yelp/i.test(req.body.from ?? "") ||
      /new lead/i.test(subject) ||
      /yelp/i.test(subject);

    if (!isYelpLead) {
      res.json({ ok: true, skipped: true, reason: "not_yelp_lead" });
      return;
    }

    try {
      const lead = parseYelpEmail(subject, body);

      // Build a rich message that includes all parsed Q&A data
      const message = [
        lead.comments,
        `\n[Yelp Lead — original subject: ${lead.rawSubject}]`,
      ].filter(Boolean).join("\n");

      await createQuoteLead({
        firstName: lead.firstName,
        lastName: lead.lastName,
        email: lead.email,
        phone: lead.phone,
        address: lead.siteAddress,
        serviceInterest: lead.serviceType,
        message,
        source: "yelp",
        sourceLabel: "Yelp",
        status: "new",
        adminNotes: messageId ? `Gmail Message-ID: ${messageId}` : undefined,
      });

      console.log(`[yelp-ingest] Created lead: ${lead.firstName} ${lead.lastName} — ${lead.serviceType}`);
      res.json({ ok: true, lead: `${lead.firstName} ${lead.lastName}` });
    } catch (err) {
      console.error("[yelp-ingest] Failed to create submission:", err);
      res.status(500).json({ error: "Failed to save lead" });
    }
  });
}
