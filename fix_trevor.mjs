import mysql from 'mysql2/promise';

const conn = await mysql.createConnection(process.env.DATABASE_URL);

// First get Trevor's quote lead data
const [leads] = await conn.query(
  "SELECT * FROM quote_leads WHERE email LIKE '%trevm%' OR (firstName = 'Trevor' AND lastName = 'McClintock')"
);
console.log('Trevor quote lead:', JSON.stringify(leads, null, 2));

// Check if he's already in service_submissions
const [existing] = await conn.query(
  "SELECT id FROM service_submissions WHERE email LIKE '%trevm%'"
);
console.log('Existing service submissions for Trevor:', JSON.stringify(existing));

if (leads.length > 0 && existing.length === 0) {
  const lead = leads[0];
  // Insert Trevor's service submission manually
  await conn.query(
    `INSERT INTO service_submissions 
     (firstName, lastName, email, phone, siteAddress, serviceType, dataSource, schemaVersion, leadStatus, comments)
     VALUES (?, ?, ?, ?, ?, ?, 'converted_lead', '1.0', 'new', ?)`,
    [
      lead.firstName,
      lead.lastName,
      lead.email,
      lead.phone,
      lead.address || '',
      lead.serviceInterest || 'Landscape Design',
      lead.message || ''
    ]
  );
  console.log('Inserted Trevor into service_submissions!');
} else if (existing.length > 0) {
  console.log('Trevor already exists in service_submissions, no action needed.');
} else {
  console.log('Trevor not found in quote_leads either.');
}

await conn.end();
