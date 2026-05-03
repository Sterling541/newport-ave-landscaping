# Yelp Lead Auto-Import — Setup Guide

This system automatically detects Yelp lead notification emails in the **leads@newportavelandscaping.com** Gmail inbox and creates entries in the Newport Lead Center — no manual copy-paste required.

## How It Works

```
Yelp sends email → leads@newport Gmail inbox
       ↓ (every 5 min, free Google Apps Script)
Google Apps Script detects the email
       ↓
POST /api/inbound/yelp-lead  (your website server)
       ↓
Lead Center entry created (source: "Yelp")
```

---

## Step 1 — Add the Environment Variable

In your **Vercel project settings** (or `.env` file for local dev), add:

```
YELP_WEBHOOK_SECRET=choose-a-strong-random-secret-here
```

Pick any long random string (e.g., `newport-yelp-2024-xK9mP3qR`). You'll use this same value in the Apps Script.

---

## Step 2 — Deploy the Google Apps Script

1. Go to [script.google.com](https://script.google.com) **while logged in as leads@newportavelandscaping.com**
2. Click **"New Project"**
3. Paste the entire contents of `docs/yelp-gmail-apps-script.js` into the editor
4. Update the two constants at the top of the script:
   ```js
   var WEBHOOK_URL    = "https://www.newportavelandscaping.com/api/inbound/yelp-lead";
   var WEBHOOK_SECRET = "your-secret-from-step-1";
   ```
5. Click **Save** (Ctrl+S / Cmd+S)

---

## Step 3 — Authorize and Install the Trigger

1. In the Apps Script editor, select the function **`installTrigger`** from the dropdown
2. Click **Run**
3. When prompted, click **"Review permissions"** → **"Allow"**
   - Grant: Gmail (read/modify) and external URL fetch
4. You should see: `"Trigger installed: processNewEmails will run every 5 minutes."`

---

## Step 4 — Import Existing Yelp Leads (Optional)

To import any Yelp leads that arrived **before** the trigger was installed:

1. In the Apps Script editor, select **`testRun`** from the dropdown
2. Click **Run**
3. Check **View → Executions** to see what was imported

---

## What Gets Created in the Lead Center

Each Yelp lead email creates a new Lead Center entry with:

| Field | Value |
|---|---|
| **Source** | `Yelp` |
| **Data Source** | `yelp_email` |
| **Status** | `New` |
| **Name** | Parsed from email body |
| **Phone** | Parsed from email body |
| **Email** | Parsed from email body |
| **Address** | Parsed from email body |
| **Service Type** | Parsed from email subject/body |
| **Comments** | Customer's message + original subject line |

---

## Monitoring

- **View → Executions** in Apps Script shows every run and any errors
- Successfully imported emails are marked as read and labelled `yelp-imported` in Gmail
- Errors are logged but do not mark the email — the next run will retry

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Leads not appearing | Check Apps Script Executions log for errors |
| `401 Unauthorized` in logs | Verify `WEBHOOK_SECRET` matches `YELP_WEBHOOK_SECRET` env var |
| `500` error in logs | Check Vercel function logs for database errors |
| Trigger not firing | Re-run `installTrigger` to reinstall |
