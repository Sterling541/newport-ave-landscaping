/**
 * Batch geocoding script for service_submissions
 * Uses the same Manus Maps proxy as the server-side geocoder
 * Run: node geocode_batch.mjs
 */
import { createConnection } from 'mysql2/promise';

const DB_URL = process.env.DATABASE_URL;
const FORGE_API_URL = process.env.BUILT_IN_FORGE_API_URL;
const FORGE_API_KEY = process.env.BUILT_IN_FORGE_API_KEY;

if (!DB_URL || !FORGE_API_URL || !FORGE_API_KEY) {
  console.error('Missing required env vars: DATABASE_URL, BUILT_IN_FORGE_API_URL, BUILT_IN_FORGE_API_KEY');
  process.exit(1);
}

// Parse DB URL
const dbMatch = DB_URL.match(/mysql:\/\/([^:]+):([^@]+)@([^:/]+)(?::(\d+))?\/([^?]+)/);
const [, user, password, host, port, database] = dbMatch;

const db = await createConnection({
  host, port: parseInt(port || '3306'), user, password, database,
  ssl: { rejectUnauthorized: false }
});

async function geocodeAddress(address) {
  const baseUrl = FORGE_API_URL.replace(/\/+$/, '');
  const url = new URL(`${baseUrl}/v1/maps/proxy/maps/api/geocode/json`);
  url.searchParams.set('address', address);
  url.searchParams.set('region', 'us');

  const resp = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${FORGE_API_KEY}` },
    signal: AbortSignal.timeout(10000),
  });

  if (!resp.ok) {
    throw new Error(`HTTP ${resp.status}`);
  }

  return resp.json();
}

// Get all un-geocoded rows
const [rows] = await db.execute(
  `SELECT id, siteAddress FROM service_submissions WHERE lat IS NULL AND siteAddress IS NOT NULL AND siteAddress != '' ORDER BY id`
);

console.log(`Found ${rows.length} rows to geocode\n`);

let geocoded = 0, skipped = 0, failed = 0;

for (let i = 0; i < rows.length; i++) {
  const row = rows[i];
  const addr = row.siteAddress.trim();

  if (!addr || addr.length < 5 || addr.toLowerCase().includes('site address')) {
    skipped++;
    continue;
  }

  // Add Bend, OR context if no city/state
  const hasCity = /bend|redmond|sisters|sunriver|tumalo|prineville|la pine|madras|eagle crest|powell butte|oregon|\bor\b/i.test(addr);
  const fullAddr = hasCity ? addr : `${addr}, Bend, OR`;

  try {
    const data = await geocodeAddress(fullAddr);

    if (data.status === 'OK' && data.results?.length > 0) {
      const result = data.results[0];
      const lat = result.geometry.location.lat;
      const lng = result.geometry.location.lng;

      let neighborhood = null;
      let city = null;

      for (const comp of result.address_components || []) {
        const types = comp.types || [];
        if (types.includes('neighborhood') || types.includes('sublocality_level_1')) {
          neighborhood = comp.long_name;
        }
        if (types.includes('locality')) {
          city = comp.long_name;
        }
      }

      await db.execute(
        `UPDATE service_submissions SET lat = ?, lng = ?, neighborhood = ?, city = ?, geocodedAt = NOW() WHERE id = ?`,
        [lat, lng, neighborhood, city, row.id]
      );

      geocoded++;

      if (geocoded % 25 === 0) {
        console.log(`  Progress: ${geocoded} geocoded, ${i + 1}/${rows.length} processed — latest: ${fullAddr.slice(0, 40)} → ${lat.toFixed(4)},${lng.toFixed(4)}`);
      }
    } else {
      if (data.status !== 'ZERO_RESULTS') {
        console.log(`  WARN [${data.status}] id=${row.id}: ${fullAddr.slice(0, 50)}`);
      }
      skipped++;
    }
  } catch (err) {
    console.log(`  ERROR id=${row.id}: ${err.message}`);
    failed++;
  }

  // Small delay to avoid rate limiting
  await new Promise(r => setTimeout(r, 60));
}

console.log(`\n=== Geocoding complete ===`);
console.log(`  Geocoded: ${geocoded}`);
console.log(`  Skipped/no result: ${skipped}`);
console.log(`  Errors: ${failed}`);

// Show city breakdown
const [cities] = await db.execute(`
  SELECT 
    COALESCE(city, 'Unknown') as city,
    COUNT(*) as total,
    SUM(CASE WHEN serviceType LIKE '%Design%' THEN 1 ELSE 0 END) as design,
    SUM(CASE WHEN serviceType LIKE '%Install%' THEN 1 ELSE 0 END) as install,
    SUM(CASE WHEN serviceType LIKE '%Enhancement%' THEN 1 ELSE 0 END) as enhancements,
    SUM(CASE WHEN serviceType LIKE '%Irrigation%' THEN 1 ELSE 0 END) as irrigation,
    SUM(CASE WHEN serviceType LIKE '%Lighting%' THEN 1 ELSE 0 END) as lighting
  FROM service_submissions
  WHERE lat IS NOT NULL
  GROUP BY city
  ORDER BY total DESC
  LIMIT 20
`);

console.log(`\n=== City breakdown (geocoded rows) ===`);
console.log(`${'City'.padEnd(25)} ${'Total'.padStart(6)} ${'Design'.padStart(8)} ${'Install'.padStart(8)} ${'Enh'.padStart(5)} ${'Irr'.padStart(5)} ${'Lit'.padStart(5)}`);
console.log('-'.repeat(65));
for (const c of cities) {
  console.log(`${String(c.city).padEnd(25)} ${String(c.total).padStart(6)} ${String(c.design).padStart(8)} ${String(c.install).padStart(8)} ${String(c.enhancements).padStart(5)} ${String(c.irrigation).padStart(5)} ${String(c.lighting).padStart(5)}`);
}

await db.end();
