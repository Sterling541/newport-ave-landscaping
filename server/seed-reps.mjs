/**
 * Seed script: insert the three default Newport sales reps.
 * Run once: node server/seed-reps.mjs
 *
 * Uses the DATABASE_URL env variable (loaded from .env if present).
 */
import "dotenv/config";
import mysql from "mysql2/promise";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

const conn = await mysql.createConnection(DATABASE_URL);

const reps = [
  { name: "Nathan Kooy",       email: "nathan@newportavelandscaping.com",   phone: null, repRole: "install_design", isActive: 1 },
  { name: "William Miller",    email: "william@newportavelandscaping.com",  phone: null, repRole: "install_design", isActive: 1 },
  { name: "Danny Sheffield",   email: "danny@newportavelandscaping.com",    phone: null, repRole: "enhancement",    isActive: 1 },
];

for (const rep of reps) {
  // Check if already exists
  const [rows] = await conn.execute(
    "SELECT id FROM sales_reps WHERE name = ?",
    [rep.name]
  );
  if (rows.length > 0) {
    console.log(`  ⏭  ${rep.name} already exists (id=${rows[0].id})`);
    continue;
  }
  const [result] = await conn.execute(
    `INSERT INTO sales_reps (name, email, phone, repRole, isActive, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
    [rep.name, rep.email, rep.phone, rep.repRole, rep.isActive]
  );
  console.log(`  ✓  Inserted ${rep.name} (id=${result.insertId})`);
}

await conn.end();
console.log("Done.");
