/**
 * Newport Avenue Landscaping — Platform Lead Auto-Importer (Yelp + Houzz)
 * ─────────────────────────────────────────────────────────────────────────────
 * Deploy this script in Google Apps Script (script.google.com) while logged in
 * as the leads@newportavelandscaping.com Google account.
 *
 * It runs automatically every 5 minutes, detects Yelp and Houzz lead
 * notification emails, and forwards them to the Newport website's Lead Center
 * via a secure webhook.
 *
 * SETUP INSTRUCTIONS
 * ──────────────────
 * 1. Go to https://script.google.com and click "New Project"
 * 2. Paste this entire file into the editor (replace any existing code)
 * 3. Fill in the two constants below:
 *      WEBHOOK_URL    — your Newport website URL + /api/inbound/yelp-lead
 *      WEBHOOK_SECRET — the value you set for YELP_WEBHOOK_SECRET in your
 *                       Vercel/server environment variables
 * 4. Click "Save" (floppy disk icon)
 * 5. Click "Run" → select "installTrigger" → authorize when prompted
 *      (grant Gmail read access and external URL fetch access)
 * 6. That's it! The trigger fires automatically every 5 minutes.
 *
 * BACKFILL
 * ────────
 * To re-import any existing unprocessed emails, run "installTrigger" — it
 * automatically calls backfillExistingLeads() after setting up the trigger.
 *
 * MONITORING
 * ──────────
 * View → Executions to see a log of every run and any errors.
 */

// ── Configuration — fill these in ────────────────────────────────────────────
var WEBHOOK_URL    = "https://www.newportavelandscaping.com/api/inbound/yelp-lead";
var WEBHOOK_SECRET = "newport-yelp-2024-xK9mP3qR7vBn";   // must match YELP_WEBHOOK_SECRET env var
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Install a time-driven trigger so processNewEmails() runs every 5 minutes.
 * Also runs a one-time backfill of any existing unprocessed lead emails.
 * Run this function ONCE manually after pasting the script.
 */
function installTrigger() {
  // Remove any existing triggers to avoid duplicates
  ScriptApp.getProjectTriggers().forEach(function(t) {
    if (t.getHandlerFunction() === "processNewEmails") {
      ScriptApp.deleteTrigger(t);
    }
  });

  // Create a time-driven trigger: every 5 minutes
  ScriptApp.newTrigger("processNewEmails")
    .timeBased()
    .everyMinutes(5)
    .create();

  Logger.log("Trigger installed: processNewEmails will run every 5 minutes.");
  Logger.log("Running backfill for existing Yelp and Houzz leads...");
  backfillExistingLeads();
}

/**
 * Main function — scans for unread Yelp and Houzz lead emails and forwards them.
 * Triggered every 5 minutes by the installed time trigger.
 */
function processNewEmails() {
  processYelpEmails();
  processHouzzEmails();
}

/**
 * Process unread Yelp lead notification emails.
 */
function processYelpEmails() {
  var query = 'from:messaging.yelp.com is:unread subject:"New Lead" label:inbox -label:yelp-imported';
  var threads = GmailApp.search(query, 0, 20);

  if (threads.length === 0) return;

  var label = getOrCreateLabel("yelp-imported");

  threads.forEach(function(thread) {
    var messages = thread.getMessages();
    messages.forEach(function(message) {
      if (!message.isUnread()) return;

      var subject = message.getSubject();
      var body    = message.getPlainBody();
      var from    = message.getFrom();
      var msgId   = message.getId();

      if (!isYelpLeadEmail(from, subject)) return;

      sendToWebhook(subject, body, from, msgId, message, thread, label, "Yelp");
    });
  });
}

/**
 * Process unread Houzz lead notification emails.
 */
function processHouzzEmails() {
  // Houzz sends lead notifications from noreply@houzz.com or notifications@houzz.com
  // Subject lines include: "New lead from ...", "sent you a message on Houzz",
  // "You have a new lead on Houzz", "New contact form submission"
  var query = 'from:houzz.com is:unread label:inbox -label:houzz-imported';
  var threads = GmailApp.search(query, 0, 20);

  if (threads.length === 0) return;

  var label = getOrCreateLabel("houzz-imported");

  threads.forEach(function(thread) {
    var messages = thread.getMessages();
    messages.forEach(function(message) {
      if (!message.isUnread()) return;

      var subject = message.getSubject();
      var body    = message.getPlainBody();
      var from    = message.getFrom();
      var msgId   = message.getId();

      if (!isHouzzLeadEmail(from, subject)) return;

      sendToWebhook(subject, body, from, msgId, message, thread, label, "Houzz");
    });
  });
}

/**
 * Backfill function — processes any existing unread Yelp and Houzz emails
 * that haven't been imported yet (no yelp-imported / houzz-imported label).
 * Called automatically by installTrigger().
 */
function backfillExistingLeads() {
  // Backfill Yelp
  var yelpQuery = 'from:messaging.yelp.com subject:"New Lead" label:inbox -label:yelp-imported';
  var yelpThreads = GmailApp.search(yelpQuery, 0, 50);
  Logger.log("Backfill: found " + yelpThreads.length + " Yelp threads.");

  var yelpLabel = getOrCreateLabel("yelp-imported");
  var yelpCount = 0;

  yelpThreads.forEach(function(thread) {
    var messages = thread.getMessages();
    messages.forEach(function(message) {
      var subject = message.getSubject();
      var body    = message.getPlainBody();
      var from    = message.getFrom();
      var msgId   = message.getId();

      if (!isYelpLeadEmail(from, subject)) return;

      var success = sendToWebhook(subject, body, from, msgId, message, thread, yelpLabel, "Yelp");
      if (success) {
        Logger.log("Backfilled: " + subject);
        yelpCount++;
      }
    });
  });

  // Backfill Houzz
  var houzzQuery = 'from:houzz.com label:inbox -label:houzz-imported';
  var houzzThreads = GmailApp.search(houzzQuery, 0, 50);
  Logger.log("Backfill: found " + houzzThreads.length + " Houzz threads.");

  var houzzLabel = getOrCreateLabel("houzz-imported");
  var houzzCount = 0;

  houzzThreads.forEach(function(thread) {
    var messages = thread.getMessages();
    messages.forEach(function(message) {
      var subject = message.getSubject();
      var body    = message.getPlainBody();
      var from    = message.getFrom();
      var msgId   = message.getId();

      if (!isHouzzLeadEmail(from, subject)) return;

      var success = sendToWebhook(subject, body, from, msgId, message, thread, houzzLabel, "Houzz");
      if (success) {
        Logger.log("Backfilled: " + subject);
        houzzCount++;
      }
    });
  });

  Logger.log("Backfill complete. Imported: " + yelpCount + " Yelp, " + houzzCount + " Houzz.");
}

/**
 * Send a single email to the webhook. Returns true on success.
 */
function sendToWebhook(subject, body, from, msgId, message, thread, label, platformName) {
  try {
    var payload = JSON.stringify({
      subject:    subject,
      body:       body,
      from:       from,
      messageId:  msgId,
      receivedAt: message.getDate().toISOString(),
    });

    var options = {
      method:  "post",
      contentType: "application/json",
      payload: payload,
      headers: {
        "X-Webhook-Secret": WEBHOOK_SECRET,
      },
      muteHttpExceptions: true,
    };

    var response = UrlFetchApp.fetch(WEBHOOK_URL, options);
    var code     = response.getResponseCode();
    var result   = response.getContentText();

    if (code === 200) {
      Logger.log(platformName + " lead imported: " + subject + " → " + result);
      message.markRead();
      thread.addLabel(label);
      return true;
    } else {
      Logger.log(platformName + " webhook error " + code + " for: " + subject + " → " + result);
      return false;
    }
  } catch (e) {
    Logger.log("Exception processing " + platformName + " message " + msgId + ": " + e.toString());
    return false;
  }
}

/**
 * Returns true if the email looks like a Yelp lead notification.
 */
function isYelpLeadEmail(from, subject) {
  var fromLower    = (from    || "").toLowerCase();
  var subjectLower = (subject || "").toLowerCase();
  return (
    fromLower.indexOf("yelp.com") !== -1 ||
    fromLower.indexOf("yelp-inc") !== -1 ||
    fromLower.indexOf("messaging.yelp") !== -1
  );
}

/**
 * Returns true if the email looks like a Houzz lead notification.
 * Filters out non-lead Houzz emails (newsletters, billing, etc.)
 */
function isHouzzLeadEmail(from, subject) {
  var fromLower    = (from    || "").toLowerCase();
  var subjectLower = (subject || "").toLowerCase();

  if (fromLower.indexOf("houzz.com") === -1 && fromLower.indexOf("houzz-inc") === -1) {
    return false;
  }

  // Only process lead-related subjects; skip newsletters, billing, etc.
  return (
    subjectLower.indexOf("new lead") !== -1 ||
    subjectLower.indexOf("sent you a message") !== -1 ||
    subjectLower.indexOf("on houzz") !== -1 ||
    subjectLower.indexOf("contact form submission") !== -1 ||
    subjectLower.indexOf("project request") !== -1 ||
    subjectLower.indexOf("quote request") !== -1
  );
}

/**
 * Gets the Gmail label with the given name, creating it if it doesn't exist.
 */
function getOrCreateLabel(name) {
  var existing = GmailApp.getUserLabelByName(name);
  if (existing) return existing;
  return GmailApp.createLabel(name);
}

/**
 * Manual test run — processes any unread Yelp and Houzz emails currently in the inbox.
 */
function testRun() {
  Logger.log("Running manual test...");
  processNewEmails();
  Logger.log("Done.");
}
