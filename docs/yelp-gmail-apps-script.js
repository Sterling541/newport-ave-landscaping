/**
 * Newport Avenue Landscaping — Yelp Lead Auto-Importer
 * ─────────────────────────────────────────────────────────────────────────────
 * Deploy this script in Google Apps Script (script.google.com) while logged in
 * as the leads@newportavelandscaping.com Google account.
 *
 * It runs automatically every time a new email arrives in the inbox, detects
 * Yelp lead notifications, and forwards them to the Newport website's Lead
 * Center via a secure webhook.
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
 * 6. That's it! The trigger fires automatically on every new email.
 *
 * TESTING
 * ───────
 * After setup, click "Run" → select "testRun" to manually process any
 * unread Yelp emails already in the inbox.
 *
 * MONITORING
 * ──────────
 * View → Executions to see a log of every run and any errors.
 */

// ── Configuration — fill these in ────────────────────────────────────────────
var WEBHOOK_URL    = "https://www.newportavelandscaping.com/api/inbound/yelp-lead";
var WEBHOOK_SECRET = "REPLACE_WITH_YOUR_SECRET";   // must match YELP_WEBHOOK_SECRET env var
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Install a Gmail push trigger so processNewEmails() runs on every new message.
 * Run this function ONCE manually after pasting the script.
 */
function installTrigger() {
  // Remove any existing triggers to avoid duplicates
  ScriptApp.getProjectTriggers().forEach(function(t) {
    if (t.getHandlerFunction() === "processNewEmails") {
      ScriptApp.deleteTrigger(t);
    }
  });

  // Create a time-driven trigger: every 5 minutes is the minimum for Gmail
  // (Gmail doesn't support true push triggers in Apps Script without Pub/Sub)
  ScriptApp.newTrigger("processNewEmails")
    .timeBased()
    .everyMinutes(5)
    .create();

  Logger.log("Trigger installed: processNewEmails will run every 5 minutes.");
}

/**
 * Main function — scans for unread Yelp lead emails and forwards them.
 * Triggered every 5 minutes by the installed time trigger.
 */
function processNewEmails() {
  // Search for unread Yelp lead emails not yet labelled as processed
  var query = 'from:yelp.com is:unread subject:"New Lead" label:inbox -label:yelp-imported';
  var threads = GmailApp.search(query, 0, 20);

  if (threads.length === 0) return;

  // Ensure the tracking label exists
  var label = getOrCreateLabel("yelp-imported");

  threads.forEach(function(thread) {
    var messages = thread.getMessages();
    messages.forEach(function(message) {
      if (!message.isUnread()) return;

      var subject = message.getSubject();
      var body    = message.getPlainBody();
      var from    = message.getFrom();
      var msgId   = message.getId();

      // Double-check: only process Yelp lead notifications
      if (!isYelpLeadEmail(from, subject)) return;

      try {
        var payload = JSON.stringify({
          subject:   subject,
          body:      body,
          from:      from,
          messageId: msgId,
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
          Logger.log("Lead imported: " + subject + " → " + result);
          // Mark as read and apply the tracking label
          message.markRead();
          thread.addLabel(label);
        } else {
          Logger.log("Webhook error " + code + " for: " + subject + " → " + result);
        }
      } catch (e) {
        Logger.log("Exception processing message " + msgId + ": " + e.toString());
      }
    });
  });
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
    subjectLower.indexOf("new lead") !== -1
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
 * Manual test run — processes any unread Yelp emails currently in the inbox.
 * Run this once after setup to import any leads that arrived before the trigger
 * was installed.
 */
function testRun() {
  Logger.log("Running manual test...");
  processNewEmails();
  Logger.log("Done.");
}
