import { createConnection } from 'mysql2/promise';
import { readFileSync } from 'fs';
import { config } from 'dotenv';

config();

const sql = readFileSync('./drizzle/0020_keen_siren.sql', 'utf8');
const statements = sql.split('--> statement-breakpoint').map(s => s.trim()).filter(Boolean);

const conn = await createConnection(process.env.DATABASE_URL);
for (const stmt of statements) {
  if (!stmt) continue;
  try {
    await conn.query(stmt);
    console.log('OK:', stmt.substring(0, 60));
  } catch (e) {
    if (e.code === 'ER_TABLE_EXISTS_ERROR' || e.message.includes('already exists')) {
      console.log('SKIP (already exists):', stmt.substring(0, 60));
    } else {
      console.error('ERROR:', e.message, '\nSQL:', stmt.substring(0, 100));
    }
  }
}
await conn.end();
console.log('Done');
