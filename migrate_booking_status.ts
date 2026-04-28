/**
 * migrate_booking_status.ts
 *
 * Reads the install appointments spreadsheet, determines booking status from
 * row color (dominant color = green → 'scheduled', yellow → 'cancelled'),
 * then matches each row to a DB record by email + approximate timestamp
 * and issues UPDATE-only SQL statements via drizzle.
 *
 * SAFE: No DELETEs, no INSERTs, no overwrites of any field except leadStatus.
 * Records not in the spreadsheet are left completely untouched.
 *
 * Usage:
 *   DRY_RUN=true  npx tsx migrate_booking_status.ts   ← shows matches, no writes
 *   DRY_RUN=false npx tsx migrate_booking_status.ts   ← executes updates
 */

import * as XLSX from 'xlsx';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { eq, sql } from 'drizzle-orm';
import { serviceSubmissions } from './drizzle/schema';
import * as fs from 'fs';

const DRY_RUN = process.env.DRY_RUN !== 'false';
const XLSX_PATH = '/home/ubuntu/upload/Untitled_spreadsheet__11_.xlsx';

// ── Color constants (ARGB format as stored in xlsx) ──────────────────────────
const GREEN  = 'FF00FF00';
const YELLOW = 'FFFFFF00';

// ── Read spreadsheet using xlsx (already in project deps) ────────────────────
interface SheetEntry {
  rowNumber: number;
  name: string;
  email: string;
  ts: Date | null;
  status: 'scheduled' | 'cancelled';
  dominantColor: string;
}

function readSpreadsheet(): SheetEntry[] {
  const buf = fs.readFileSync(XLSX_PATH);
  const wb = XLSX.read(buf, { type: 'buffer', cellStyles: true, dense: false });
  const ws = wb.Sheets[wb.SheetNames[0]];

  const entries: SheetEntry[] = [];

  // Get the range
  const range = XLSX.utils.decode_range(ws['!ref'] || 'A1');

  for (let r = 7; r <= range.e.r; r++) { // row index 7 = row 8 (0-indexed)
    // Get color from each cell in the row
    const colorCounts: Record<string, number> = {};
    let hasData = false;

    for (let c = 0; c <= Math.min(range.e.c, 19); c++) {
      const cellAddr = XLSX.utils.encode_cell({ r, c });
      const cell = ws[cellAddr];
      if (!cell) continue;
      if (cell.v !== undefined && cell.v !== null && cell.v !== '') hasData = true;

      // Get fill color
      const style = (cell as any).s;
      if (style?.fgColor?.argb) {
        const argb = style.fgColor.argb;
        if (argb !== 'FFFFFFFF' && argb !== '00000000' && argb !== 'FF000000') {
          colorCounts[argb] = (colorCounts[argb] || 0) + 1;
        }
      }
    }

    if (!hasData) continue;

    // Find dominant color
    let dominant = 'FFFFFFFF';
    let maxCount = 0;
    for (const [color, count] of Object.entries(colorCounts)) {
      if (count > maxCount) { maxCount = count; dominant = color; }
    }

    // Determine status
    let status: 'scheduled' | 'cancelled' | null = null;
    if (dominant === GREEN) status = 'scheduled';
    else if (dominant === YELLOW) status = 'cancelled';
    else if (colorCounts[GREEN] && colorCounts[GREEN] > 0) status = 'scheduled'; // green cells present

    if (!status) continue; // uncolored row — skip

    // Get values
    const tsCell = ws[XLSX.utils.encode_cell({ r, c: 1 })]; // Col B (index 1)
    const emailCell = ws[XLSX.utils.encode_cell({ r, c: 2 })]; // Col C
    const lastCell = ws[XLSX.utils.encode_cell({ r, c: 4 })]; // Col E
    const firstCell = ws[XLSX.utils.encode_cell({ r, c: 5 })]; // Col F

    let ts: Date | null = null;
    if (tsCell?.v) {
      if (tsCell.t === 'd') {
        ts = tsCell.v as Date;
      } else if (typeof tsCell.v === 'number') {
        // Excel serial date
        ts = XLSX.SSF.parse_date_code(tsCell.v) as unknown as Date;
        const d = XLSX.SSF.parse_date_code(tsCell.v);
        if (d) ts = new Date(d.y, d.m - 1, d.d, d.H || 0, d.M || 0, d.S || 0);
      }
    }

    const email = (emailCell?.v || '').toString().trim().toLowerCase();
    const name = `${firstCell?.v || ''} ${lastCell?.v || ''}`.trim();

    entries.push({ rowNumber: r + 1, name, email, ts, status, dominantColor: dominant });
  }

  return entries;
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n=== Booking Status Migration (DRY_RUN=${DRY_RUN}) ===\n`);

  const entries = readSpreadsheet();
  console.log(`Spreadsheet entries with color status: ${entries.length}`);
  const scheduled = entries.filter(e => e.status === 'scheduled').length;
  const cancelled = entries.filter(e => e.status === 'cancelled').length;
  console.log(`  scheduled: ${scheduled}`);
  console.log(`  cancelled: ${cancelled}`);

  if (!process.env.DATABASE_URL) {
    console.error('ERROR: DATABASE_URL not set');
    process.exit(1);
  }

  const conn = await mysql.createConnection(process.env.DATABASE_URL);
  const db = drizzle(conn);

  // Load all DB records
  const dbRows = await db
    .select({
      id: serviceSubmissions.id,
      email: serviceSubmissions.email,
      createdAt: serviceSubmissions.createdAt,
      leadStatus: serviceSubmissions.leadStatus,
    })
    .from(serviceSubmissions)
    .orderBy(serviceSubmissions.createdAt);

  console.log(`\nDB records total: ${dbRows.length}`);

  // Match by email + timestamp (within 5 minutes), or email-only if unique
  let matched = 0;
  let alreadyCorrect = 0;
  let willUpdate = 0;
  let unmatched = 0;
  const updates: Array<{ id: number; status: string; name: string; current: string }> = [];

  for (const entry of entries) {
    if (!entry.email) { unmatched++; continue; }

    // Try email + timestamp match first
    let dbRow = null;
    if (entry.ts) {
      const candidates = dbRows.filter(r => {
        const dbEmail = (r.email || '').toLowerCase().trim();
        if (dbEmail !== entry.email) return false;
        const diff = Math.abs(new Date(r.createdAt).getTime() - entry.ts!.getTime());
        return diff < 10 * 60 * 1000; // 10 minutes
      });
      if (candidates.length > 0) dbRow = candidates[0];
    }

    // Fall back to email-only if unique
    if (!dbRow) {
      const emailOnly = dbRows.filter(r => (r.email || '').toLowerCase().trim() === entry.email);
      if (emailOnly.length === 1) dbRow = emailOnly[0];
    }

    if (!dbRow) { unmatched++; continue; }

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

  if (DRY_RUN) {
    console.log(`\nDRY RUN — sample of updates that would be applied (first 20):`);
    for (const u of updates.slice(0, 20)) {
      console.log(`  id=${u.id} | ${u.name} | ${u.current} → ${u.status}`);
    }
    console.log(`\nRun with DRY_RUN=false to apply.`);
  } else if (updates.length > 0) {
    console.log(`\nExecuting ${updates.length} UPDATE statements...`);
    let done = 0;
    for (const u of updates) {
      await db
        .update(serviceSubmissions)
        .set({ leadStatus: u.status as any })
        .where(eq(serviceSubmissions.id, u.id));
      done++;
      if (done % 50 === 0) console.log(`  ${done}/${updates.length} done`);
    }
    console.log(`\n✓ All ${done} updates complete. No records were deleted or inserted.`);
  } else {
    console.log(`\nNothing to update.`);
  }

  const touchedIds = new Set(updates.map(u => u.id));
  const untouched = dbRows.filter(r => !touchedIds.has(r.id));
  console.log(`\nRecords left untouched: ${untouched.length} (includes all new bookings since spreadsheet date)`);

  await conn.end();
}

main().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
