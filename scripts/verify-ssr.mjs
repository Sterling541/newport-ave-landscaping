#!/usr/bin/env node
/**
 * SSR Proof Verification Script
 * Tests that 5 key URLs return per-page meta tags and H1 in raw HTML.
 * 
 * Checks:
 * - Title, meta description, canonical, og:title, og:image are in <head> (before </head>)
 * - H1 is present in the full HTML (in the body content)
 * - Root div has server-rendered content (not empty)
 * - Per-page titles are unique (not all the same homepage title)
 */
const BASE = 'http://localhost:3001';
const URLS = [
  '/',
  '/services/pavers',
  '/landscaping/bend',
  '/resources/paver-patio-cost-bend-oregon',
  '/our-work',
];

let allPass = true;
const titles = [];

for (const url of URLS) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`URL: ${url}`);
  console.log('-'.repeat(60));

  let html;
  try {
    const res = await fetch(`${BASE}${url}`);
    html = await res.text();
  } catch (e) {
    console.log(`❌ FETCH ERROR: ${e.message}`);
    allPass = false;
    continue;
  }

  // Extract head section (everything between <head> and </head>)
  const headEnd = html.indexOf('</head>');
  const headSection = headEnd > 0 ? html.slice(0, headEnd) : '';

  console.log(`Head section length: ${headSection.length} chars`);

  // Check title in head
  const titleMatch = headSection.match(/<title[^>]*>([^<]+)<\/title>/);
  if (titleMatch) {
    console.log(`✅ TITLE (in <head>): ${titleMatch[1].trim().slice(0, 80)}`);
    titles.push({ url, title: titleMatch[1].trim() });
  } else {
    console.log(`❌ TITLE: NOT FOUND in <head>`);
    allPass = false;
  }

  // Check meta description in head
  const metaDescMatch = headSection.match(/name="description"\s+content="([^"]{10,})"/);
  if (metaDescMatch) {
    console.log(`✅ META DESC (in <head>): ${metaDescMatch[1].slice(0, 70)}...`);
  } else {
    console.log(`❌ META DESC: NOT FOUND in <head>`);
    allPass = false;
  }

  // Check canonical in head
  const canonicalMatch = headSection.match(/rel="canonical"\s+href="([^"]+)"/);
  if (canonicalMatch) {
    console.log(`✅ CANONICAL (in <head>): ${canonicalMatch[1]}`);
  } else {
    console.log(`❌ CANONICAL: NOT FOUND in <head>`);
    allPass = false;
  }

  // Check og:title in head
  const ogTitleMatch = headSection.match(/property="og:title"\s+content="([^"]+)"/);
  if (ogTitleMatch) {
    console.log(`✅ OG:TITLE (in <head>): ${ogTitleMatch[1].slice(0, 70)}`);
  } else {
    console.log(`❌ OG:TITLE: NOT FOUND in <head>`);
    allPass = false;
  }

  // Check og:image in head
  const ogImageMatch = headSection.match(/property="og:image"\s+content="([^"]+)"/);
  if (ogImageMatch) {
    console.log(`✅ OG:IMAGE (in <head>): present`);
  } else {
    console.log(`❌ OG:IMAGE: NOT FOUND in <head>`);
    allPass = false;
  }

  // Check H1 in full HTML (it's in the body content)
  const h1Count = (html.match(/<h1/g) || []).length;
  if (h1Count > 0) {
    const h1Match = html.match(/<h1[^>]*>([^<]+)/);
    console.log(`✅ H1 (${h1Count} found in body): ${h1Match ? h1Match[1].trim().slice(0, 60) : 'present'}`);
  } else {
    console.log(`❌ H1: NOT FOUND in full HTML`);
    allPass = false;
  }

  // Check root div has content (not empty)
  const rootEmpty = html.includes('<div id="root"></div>');
  if (!rootEmpty) {
    console.log(`✅ ROOT DIV: has server-rendered content`);
  } else {
    console.log(`❌ ROOT DIV: empty (SSR not working)`);
    allPass = false;
  }
}

// Check that titles are unique per page
console.log(`\n${'='.repeat(60)}`);
console.log('TITLE UNIQUENESS CHECK:');
const uniqueTitles = new Set(titles.map(t => t.title));
if (uniqueTitles.size === titles.length) {
  console.log(`✅ All ${titles.length} pages have unique titles`);
  titles.forEach(({ url, title }) => console.log(`  ${url}: ${title.slice(0, 60)}`));
} else {
  console.log(`❌ DUPLICATE TITLES DETECTED:`);
  titles.forEach(({ url, title }) => console.log(`  ${url}: ${title.slice(0, 60)}`));
  allPass = false;
}

console.log(`\n${'='.repeat(60)}`);
if (allPass) {
  console.log('✅ ALL SSR CHECKS PASSED');
} else {
  console.log('❌ SOME SSR CHECKS FAILED');
  process.exit(1);
}
