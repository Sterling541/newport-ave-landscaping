import { createConnection } from "mysql2/promise";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
dotenv.config();

const conn = await createConnection(process.env.DATABASE_URL);

const pin = "4132";
const pinHash = await bcrypt.hash(pin, 12);
const email = "info@newportavelandscaping.com";

// Check if user already exists
const [existing] = await conn.execute(
  "SELECT id FROM staff_users WHERE email = ?",
  [email]
);

if (existing.length > 0) {
  // Update existing
  await conn.execute(
    "UPDATE staff_users SET pinHash = ?, role = 'admin', firstName = 'Newport', lastName = 'Admin', isActive = 1 WHERE email = ?",
    [pinHash, email]
  );
  console.log("✅ Updated existing admin user:", email);
} else {
  // Insert new
  await conn.execute(
    `INSERT INTO staff_users (email, pinHash, role, firstName, lastName, title, isActive, createdAt)
     VALUES (?, ?, 'admin', 'Newport', 'Admin', 'System Administrator', 1, NOW())`,
    [email, pinHash]
  );
  console.log("✅ Created admin user:", email);
}

await conn.end();
console.log("Done.");
