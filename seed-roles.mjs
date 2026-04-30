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

// Keys MUST match the permissionKey values in AdminLayout NAV_ITEMS
// submissions, quote_leads, lead_trends, daily_pulse, geo_map, reminders,
// opt_out, smart_scheduler, badge_scans, configuration
const ALL_PERMS = JSON.stringify({
  submissions: true,
  quote_leads: true,
  lead_trends: true,
  daily_pulse: true,
  geo_map: true,
  reminders: true,
  opt_out: true,
  smart_scheduler: true,
  sales_reps: true,
  badge_scans: true,
  configuration: true,
  users: true,
});

const SALES_REP_PERMS = JSON.stringify({
  submissions: true,
  quote_leads: true,
  lead_trends: true,
  daily_pulse: true,
  geo_map: true,
  reminders: true,
  opt_out: true,
  smart_scheduler: true,
  sales_reps: false,
  badge_scans: true,
  configuration: false,
  users: false,
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
