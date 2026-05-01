/**
 * One-time migration: re-tag all existing leads that have source="other"
 * (the old default) to source="quick_form" since they all came from the
 * Newport Avenue Landscaping website form.
 */
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, "../.env") });

const db = await mysql.createConnection(process.env.DATABASE_URL);

const [result] = await db.execute(
  `UPDATE quote_leads SET source = 'quick_form' WHERE source = 'other'`
);

console.log(`Updated ${result.affectedRows} leads from "other" → "quick_form"`);
await db.end();
