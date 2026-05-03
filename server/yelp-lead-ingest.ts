/**
 * Yelp Lead Ingest
 * ─────────────────────────────────────────────────────────────────────────────
 * Receives a POST from Google Apps Script when a new Yelp lead email arrives
 * in the leads@newportavelandscaping.com Gmail inbox, parses the email body,
 * and creates a serviceSubmission record in the Lead Center.
 *
 * Security: requests must include the header  X-Webhook-Secret: <YELP_WEBHOOK_SECRET>
 *
 * Apps Script fires this endpoint — see /docs/yelp-gmail-apps-script.js for
 * the script to deploy in Google Apps Script.
 */

import type { Express, Request, Response } from "express";
import { createServiceSubmission } from "./db";
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
 * Parse a plain-text Yelp lead notification email body.
 *
 * Yelp sends two common formats:
 *
 * Format A — "New Lead" notification:
 *   Subject: New Lead: Reply to <Name>'s <service> request
 *   Body contains lines like:
 *     Name: Jennifer Smith
 *     Phone: (541) 555-1234
 *     Email: jennifer@example.com
 *     Location: 123 Main St, Bend, OR 97701
 *     Details: I need my sprinklers checked...
 *
 * Format B — "Request a Quote" notification:
 *   Subject: New Lead: Reply to <Name>'s <service> request
 *   Body may use different labels (Customer, Address, Message, etc.)
 *
 * We use a flexible regex approach to handle both.
 */
export function parseYelpEmail(subject: string, body: string): YelpLeadData {
  const text = body.replace(/\r\n/g, "\n");

  // ── Helper: extract a field value by one or more label patterns ──────────
  function extract(patterns: RegExp[]): string {
    for (const re of patterns) {
      const m = text.match(re);
      if (m && m[1]) return m[1].trim();
    }
    return "";
  }

  // ── Name ─────────────────────────────────────────────────────────────────
  // Try "Name: John Smith" first, then fall back to subject line parsing
  let fullName = extract([
    /^Name:\s*(.+)$/im,
    /^Customer(?:\s+Name)?:\s*(.+)$/im,
    /^Contact:\s*(.+)$/im,
  ]);

  // If not found in body, try to extract from subject:
  // "New Lead: Reply to Jennifer's irrigation repair or maintenance request"
  if (!fullName) {
    const subjectMatch = subject.match(/Reply to ([^']+)'s/i);
    if (subjectMatch) fullName = subjectMatch[1].trim();
  }

  const nameParts = fullName.split(/\s+/);
  const firstName = nameParts[0] ?? "Yelp";
  const lastName = nameParts.slice(1).join(" ") || "Lead";

  // ── Phone ─────────────────────────────────────────────────────────────────
  const phone = extract([
    /^Phone(?:\s+Number)?:\s*(.+)$/im,
    /^Mobile:\s*(.+)$/im,
    /^Tel(?:ephone)?:\s*(.+)$/im,
    // Bare phone number on its own line
    /^\(?(\d{3})\)?[\s.\-](\d{3})[\s.\-](\d{4})$/im,
  ]);

  // ── Email ─────────────────────────────────────────────────────────────────
  const email = extract([
    /^Email(?:\s+Address)?:\s*(.+)$/im,
    /^E-mail:\s*(.+)$/im,
    // Bare email on its own line
    /^([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})$/im,
  ]);

  // ── Address / Location ────────────────────────────────────────────────────
  const siteAddress = extract([
    /^(?:Service\s+)?(?:Location|Address):\s*(.+)$/im,
    /^Property(?:\s+Address)?:\s*(.+)$/im,
    /^Site(?:\s+Address)?:\s*(.+)$/im,
    /^Where(?:\s+do you need the service)?:\s*(.+)$/im,
  ]) || "Bend, OR";

  // ── Service Type ──────────────────────────────────────────────────────────
  // Try body first, then fall back to subject
  let serviceType = extract([
    /^Service(?:\s+Type)?(?:\s+Requested)?:\s*(.+)$/im,
    /^(?:Type of\s+)?(?:Work|Job|Service):\s*(.+)$/im,
    /^Category:\s*(.+)$/im,
  ]);

  if (!serviceType) {
    // Extract from subject: "Reply to Jennifer's irrigation repair or maintenance request"
    const svcMatch = subject.match(/Reply to [^']+'\s*s\s+(.+?)\s+request/i);
    if (svcMatch) serviceType = svcMatch[1].trim();
  }
  if (!serviceType) serviceType = "Yelp Lead";

  // ── Comments / Message ────────────────────────────────────────────────────
  const comments = extract([
    /^(?:Details|Message|Notes?|Comments?|Description|Request|What do you need):\s*([\s\S]+?)(?=\n[A-Z][a-z]+:|$)/im,
    /^(?:Project\s+)?Description:\s*([\s\S]+?)(?=\n[A-Z][a-z]+:|$)/im,
  ]);

  return {
    firstName,
    lastName,
    email: email || "noreply@yelp.com",
    phone: phone || "",
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
      // Not a Yelp lead — ignore silently
      res.json({ ok: true, skipped: true, reason: "not_yelp_lead" });
      return;
    }

    try {
      const lead = parseYelpEmail(subject, body);

      await createServiceSubmission({
        firstName: lead.firstName,
        lastName: lead.lastName,
        email: lead.email,
        phone: lead.phone,
        siteAddress: lead.siteAddress,
        serviceType: lead.serviceType,
        comments: lead.comments
          ? `${lead.comments}\n\n[Yelp Lead — original subject: ${lead.rawSubject}]`
          : `[Yelp Lead — original subject: ${lead.rawSubject}]`,
        howHeard: "Yelp",
        dataSource: "yelp_email",
        leadStatus: "new",
        schemaVersion: "1.0",
        adminNotes: messageId ? `Gmail Message-ID: ${messageId}` : undefined,
      });

      console.log(`[yelp-ingest] Created lead from Yelp email: ${lead.firstName} ${lead.lastName} — ${lead.serviceType}`);
      res.json({ ok: true, lead: `${lead.firstName} ${lead.lastName}` });
    } catch (err) {
      console.error("[yelp-ingest] Failed to create submission:", err);
      res.status(500).json({ error: "Failed to save lead" });
    }
  });
}
