/**
 * test-ssr.mjs
 * Quick smoke test for the SSR bundle.
 * Verifies that render() returns HTML with expected content for key routes.
 */
import { render } from "../dist/server/entry-server.js";

const testRoutes = [
  { url: "/", expectedContent: ["Newport", "Landscaping"] },
  { url: "/services/pavers", expectedContent: ["Paver", "Bend"] },
  { url: "/landscaping/bend", expectedContent: ["Bend"] },
  { url: "/resources/paver-patio-cost-bend-oregon", expectedContent: ["Cost", "Bend"] },
  { url: "/our-work", expectedContent: ["Work", "Portfolio"] },
];

let passed = 0;
let failed = 0;

for (const { url, expectedContent } of testRoutes) {
  try {
    const { html, helmetContext } = render(url);

    // Check HTML is non-empty
    if (!html || html.length < 100) {
      console.error(`❌ ${url}: HTML too short (${html?.length ?? 0} chars)`);
      failed++;
      continue;
    }

    // Check for expected content
    const missing = expectedContent.filter(term => !html.includes(term));
    if (missing.length > 0) {
      console.error(`❌ ${url}: Missing content: ${missing.join(", ")}`);
      failed++;
      continue;
    }

    // Check helmet context has title
    const helmet = helmetContext?.helmet;
    const title = helmet?.title?.toString() || "";
    if (!title.includes("Newport")) {
      console.warn(`⚠️  ${url}: Helmet title may be missing: "${title.slice(0, 80)}"`);
    }

    console.log(`✅ ${url}: ${html.length} chars, title: "${title.replace(/<[^>]+>/g, "").trim().slice(0, 60)}"`);
    passed++;
  } catch (err) {
    console.error(`❌ ${url}: Error: ${err.message}`);
    failed++;
  }
}

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
