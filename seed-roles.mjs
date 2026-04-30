import { createConnection } from 'mysql2/promise';
import { config } from 'dotenv';

config();

const conn = await createConnection(process.env.DATABASE_URL);

// Create role_definitions without DEFAULT on text column (TiDB compatibility)
await conn.query(`
  CREATE TABLE IF NOT EXISTS \`role_definitions\` (
    \`id\` int AUTO_INCREMENT NOT NULL,
    \`slug\` varchar(64) NOT NULL,
    \`label\` varchar(128) NOT NULL,
    \`permissions\` text NOT NULL,
    \`isSystem\` boolean NOT NULL DEFAULT false,
    \`createdAt\` timestamp NOT NULL DEFAULT (now()),
    \`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT \`role_definitions_id\` PRIMARY KEY(\`id\`),
    CONSTRAINT \`role_definitions_slug_unique\` UNIQUE(\`slug\`)
  )
`).then(() => console.log('role_definitions table created'))
  .catch(e => console.log('role_definitions:', e.message));

await conn.query(`CREATE INDEX IF NOT EXISTS \`idx_rd_slug\` ON \`role_definitions\` (\`slug\`)`)
  .catch(() => {});

// All nav items — admin sees all, sales_rep sees all for now
const ALL_PERMS = JSON.stringify({
  "/admin/submissions": true,
  "/admin/quote-leads": true,
  "/admin/daily-pulse": true,
  "/admin/lead-trends": true,
  "/admin/geo-intelligence": true,
  "/admin/csv-import": true,
  "/admin/reminders": true,
  "/admin/opt-out-requests": true,
  "/admin/scheduler": true,
  "/admin/sales-reps": true,
  "/admin/badge-scans": true,
  "/admin/configuration": true,
  "/admin/users": true,
});

const SALES_REP_PERMS = JSON.stringify({
  "/admin/submissions": true,
  "/admin/quote-leads": true,
  "/admin/daily-pulse": true,
  "/admin/lead-trends": true,
  "/admin/geo-intelligence": true,
  "/admin/csv-import": false,
  "/admin/reminders": true,
  "/admin/opt-out-requests": true,
  "/admin/scheduler": true,
  "/admin/sales-reps": false,
  "/admin/badge-scans": true,
  "/admin/configuration": false,
  "/admin/users": false,
});

const roles = [
  { slug: 'admin', label: 'Admin', permissions: ALL_PERMS, isSystem: true },
  { slug: 'sales_rep', label: 'Sales Rep', permissions: SALES_REP_PERMS, isSystem: true },
];

for (const role of roles) {
  await conn.query(
    `INSERT INTO role_definitions (slug, label, permissions, isSystem) VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE label=VALUES(label), permissions=VALUES(permissions)`,
    [role.slug, role.label, role.permissions, role.isSystem]
  ).then(() => console.log('Seeded role:', role.slug))
   .catch(e => console.error('Error seeding role:', role.slug, e.message));
}

await conn.end();
console.log('Done');
