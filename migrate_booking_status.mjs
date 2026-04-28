/**
 * migrate_booking_status.mjs
 *
 * Reads the install appointments spreadsheet, determines booking status from
 * row color (dominant color = green → 'scheduled', yellow → 'cancelled'),
 * then matches each row to a DB record by email + approximate timestamp
 * and issues UPDATE-only SQL statements.
 *
 * SAFE: No DELETEs, no INSERTs, no overwrites of any field except leadStatus.
 * Records not in the spreadsheet are left completely untouched.
 *
 * Usage:
 *   DRY_RUN=true  node migrate_booking_status.mjs   ← shows matches, no writes
 *   DRY_RUN=false node migrate_booking_status.mjs   ← executes updates
 */

import mysql from 'mysql2/promise';
import ExcelJS from 'exceljs';
import { fileURLToPath } from 'url';
import path from 'path';

const DRY_RUN = process.env.DRY_RUN !== 'false';
const XLSX_PATH = '/home/ubuntu/upload/Untitled_spreadsheet__11_.xlsx';

const GREEN  = 'FF00FF00';
const YELLOW = 'FFFFFF00';

// ── Color helpers ────────────────────────────────────────────────────────────
function getDominantColor(row) {
  const counts = {};
  for (const cell of row.values) {
    if (!cell) continue;
    const rgb = cell.style?.fill?.fgColor?.argb;
    if (rgb && rgb !== 'FFFFFFFF' && rgb !== '00000000' && rgb !== 'FF000000') {
      counts[rgb] = (counts[rgb] || 0) + 1;
    }
  }
  if (!Object.keys(counts).length) return 'FFFFFFFF';
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

function colorToStatus(argb) {
  if (argb === GREEN) return 'scheduled';
  if (argb === YELLOW) return 'cancelled';
  return null; // light green, pink, etc — treat as scheduled if dominant is green
}

// ── Read spreadsheet ─────────────────────────────────────────────────────────
async function readSpreadsheet() {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(XLSX_PATH);
  const ws = wb.worksheets[0];

  const entries = [];

  ws.eachRow((row, rowNumber) => {
    if (rowNumber < 8) return; // skip header rows

    const timestamp = row.getCell(2).value; // Col B
    const email     = row.getCell(3).value; // Col C
    const lastName  = row.getCell(5).value; // Col E
    const firstName = row.getCell(6).value; // Col F

    if (!timestamp && !firstName && !lastName) return; // empty row

    const dominant = getDominantColor(row);
    let status = colorToStatus(dominant);

    // If dominant is not green/yellow but majority of cells are green → scheduled
    if (!status && dominant !== 'FFFFFFFF') {
      // Check if the row has any green cells at all
      let greenCount = 0;
      for (const cell of row.values) {
        if (!cell) continue;
        const rgb = cell.style?.fill?.fgColor?.argb;
        if (rgb === GREEN) greenCount++;
      }
      if (greenCount > 0) status = 'scheduled';
    }

    if (!status) return; // uncolored row — skip

    const name = `${firstName || ''} ${lastName || ''}`.trim();
    let ts = null;
    if (timestamp instanceof Date) ts = timestamp;
    else if (timestamp && typeof timestamp === 'object' && timestamp.result instanceof Date) ts = timestamp.result;

    entries.push({ rowNumber, name, email: (email || '').toString().trim().toLowerCase(), ts, status });
  });

  return entries;
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n=== Booking Status Migration (DRY_RUN=${DRY_RUN}) ===\n`);

  const entries = await readSpreadsheet();
  console.log(`Spreadsheet entries with color status: ${entries.length}`);
  const scheduled = entries.filter(e => e.status === 'scheduled').length;
  const cancelled = entries.filter(e => e.status === 'cancelled').length;
  console.log(`  scheduled: ${scheduled}`);
  console.log(`  cancelled: ${cancelled}`);

  const conn = await mysql.createConnection(process.env.DATABASE_URL);

  // Load all DB records (id, email, createdAt, leadStatus)
  const [dbRows] = await conn.execute(
    'SELECT id, email, createdAt, leadStatus FROM service_submissions ORDER BY createdAt ASC'
  );
  console.log(`\nDB records total: ${dbRows.length}`);

  // Match: email + timestamp within ±5 minutes
  let matched = 0;
  let alreadyCorrect = 0;
  let willUpdate = 0;
  let unmatched = 0;
  const updates = [];

  for (const entry of entries) {
    if (!entry.email || !entry.ts) {
      unmatched++;
      continue;
    }

    // Find DB row with same email and timestamp within 5 minutes
    const candidates = dbRows.filter(r => {
      const dbEmail = (r.email || '').toLowerCase().trim();
      if (dbEmail !== entry.email) return false;
      const diff = Math.abs(new Date(r.createdAt).getTime() - entry.ts.getTime());
      return diff < 5 * 60 * 1000; // 5 minutes
    });

    if (candidates.length === 0) {
      // Try email-only match (in case timestamp differs more)
      const emailOnly = dbRows.filter(r => (r.email || '').toLowerCase().trim() === entry.email);
      if (emailOnly.length === 1) {
        // Single email match — use it
        const dbRow = emailOnly[0];
        if (dbRow.leadStatus === entry.status) {
          alreadyCorrect++;
        } else {
          willUpdate++;
          updates.push({ id: dbRow.id, status: entry.status, name: entry.name, current: dbRow.leadStatus });
        }
        matched++;
      } else {
        unmatched++;
      }
      continue;
    }

    const dbRow = candidates[0];
    matched++;
    if (dbRow.leadStatus === entry.status) {
      alreadyCorrect++;
    } else {
      willUpdate++;
      updates.push({ id: dbRow.id, status: entry.status, name: entry.name, current: dbRow.leadStatus });
    }
  }

  console.log(`\nMatch results:`);
  console.log(`  Matched:          ${matched}`);
  console.log(`  Unmatched:        ${unmatched}`);
  console.log(`  Already correct:  ${alreadyCorrect}`);
  console.log(`  Will update:      ${willUpdate}`);

  if (updates.length > 0 && !DRY_RUN) {
    console.log(`\nExecuting ${updates.length} UPDATE statements...`);
    let done = 0;
    for (const u of updates) {
      await conn.execute(
        'UPDATE service_submissions SET leadStatus = ? WHERE id = ?',
        [u.status, u.id]
      );
      done++;
      if (done % 50 === 0) console.log(`  ${done}/${updates.length} done`);
    }
    console.log(`\n✓ All ${done} updates complete. No records were deleted or inserted.`);
  } else if (updates.length > 0 && DRY_RUN) {
    console.log(`\nDRY RUN — sample of updates that would be applied (first 20):`);
    for (const u of updates.slice(0, 20)) {
      console.log(`  id=${u.id} | ${u.name} | ${u.current} → ${u.status}`);
    }
    console.log(`\nRun with DRY_RUN=false to apply.`);
  } else {
    console.log(`\nNothing to update.`);
  }

  // Verify: count records that would NOT be touched (new bookings since spreadsheet)
  const touchedIds = new Set(updates.map(u => u.id));
  const untouched = dbRows.filter(r => !touchedIds.has(r.id));
  console.log(`\nRecords left untouched: ${untouched.length} (includes all new bookings since spreadsheet date)`);

  await conn.end();
}

main().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
