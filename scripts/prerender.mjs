/**
 * scripts/prerender.mjs
 *
 * Build-time static pre-rendering script.
 *
 * After `vite build` and `vite build --ssr`, this script:
 *  1. Imports the SSR bundle (dist/server/entry-server.js)
 *  2. Reads dist/public/index.html as the HTML template
 *  3. For every public route in the sitemap, renders the React tree to HTML
 *  4. Writes dist/public/<route>/index.html with full pre-rendered HTML
 *
 * The Manus hosting platform serves static files from dist/public/ at the CDN
 * edge. By pre-generating per-route index.html files, crawlers and social
 * scrapers receive full HTML (title, meta description, canonical, H1) without
 * needing the Express SSR middleware.
 *
 * Run with: node scripts/prerender.mjs
 * (called automatically as part of pnpm build)
 */

import { writeFileSync, mkdirSync, readFileSync, existsSync } from "fs";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "../dist");
const distPublicDir = resolve(distDir, "public");
const ssrBundlePath = resolve(distDir, "server", "entry-server.js");
const indexHtmlPath = resolve(distPublicDir, "index.html");

// ─── Verify build artifacts exist ────────────────────────────────────────────
if (!existsSync(ssrBundlePath)) {
  console.error(`[prerender] ERROR: SSR bundle not found at ${ssrBundlePath}`);
  console.error("[prerender] Run 'vite build --ssr' first.");
  process.exit(1);
}
if (!existsSync(indexHtmlPath)) {
  console.error(`[prerender] ERROR: index.html not found at ${indexHtmlPath}`);
  console.error("[prerender] Run 'vite build' first.");
  process.exit(1);
}

// ─── All public routes (same list as generate-sitemap.mjs) ───────────────────
const routes = [
  "/",
  "/landscaping-bend-oregon",
  "/paver-patios-bend",
  "/irrigation-bend-oregon",
  "/landscape-design-bend",
  "/commercial-landscaping-bend",
  "/paver-patios-bend/concrete-pavers",
  "/landscape-design-bend/hoa-design",
  "/landscape-design-bend/modern-design",
  "/about",
  "/commercial",
  "/maintenance",
  "/services",
  "/our-work",
  "/contact",
  "/blog",
  "/resources",
  "/service-areas",
  "/bend-neighborhoods",
  "/privacy-policy",
  "/membership",
  "/terms",
  "/careers",
  "/opt-out",
  "/schedule-services",
  // Maintenance sub-pages
  "/services/lawn-service",
  "/services/commercial-maintenance",
  "/maintenance/commercial-hoa",
  "/services/aeration",
  "/services/sprinkler-activation",
  "/services/sprinkler-blowout",
  "/services/snow-removal",
  "/services/lawn-fungus",
  // Installation / service sub-pages
  "/services/landscape-design",
  "/services/irrigation",
  "/services/sprinkler-repair",
  "/services/pavers",
  "/services/water-features",
  "/services/outdoor-living",
  "/services/fire-features",
  "/services/landscape-lighting",
  "/services/xeriscaping",
  "/services/retaining-walls",
  "/services/drainage",
  "/services/firewise-landscaping",
  "/services/water-wise-landscaping",
  // City landing pages
  "/landscaping/bend",
  "/landscaping/redmond",
  "/landscaping/sisters",
  "/landscaping/sunriver",
  "/landscaping/tumalo",
  "/landscaping/prineville",
  "/landscaping/la-pine",
  "/landscaping/madras",
  // Bend neighborhoods
  "/landscaping/bend/northwest-crossing",
  "/landscaping/bend/old-bend",
  "/landscaping/bend/river-west",
  "/landscaping/bend/southeast-bend",
  "/landscaping/bend/northeast-bend",
  "/landscaping/bend/broken-top",
  "/landscaping/bend/tetherow",
  "/landscaping/bend/awbrey-butte",
  "/landscaping/bend/discovery-west",
  "/landscaping/bend/sw-bend",
  "/landscaping/bend/nw-crossing",
  "/landscaping/bend/summit-west",
  // Portfolio pages
  "/our-work",
  "/portfolio/discovery-west-plaza",
  "/portfolio/nines-restaurant",
  "/portfolio/pronghorn-resort",
  "/portfolio/sunriver-estate",
  "/portfolio/northwest-crossing-residence",
  "/portfolio/broken-top-club",
  "/portfolio/river-west-patio",
  "/portfolio/old-bend-xeriscaping",
  "/portfolio/tetherow-fire-feature",
  "/portfolio/bend-full-yard-transformation",
  // Blog posts
  "/blog/climate-change-landscaping-bend",
  "/blog/seasonal-guide-bend",
  // Resource pages (cost guides, how-tos)
  "/resources/paver-patio-cost-bend-oregon",
  "/resources/sprinkler-system-cost-bend",
  "/resources/xeriscape-cost-bend-oregon",
  "/resources/lawn-maintenance-cost-bend",
  "/resources/landscape-design-cost-bend",
  "/resources/retaining-wall-cost-bend",
  "/resources/outdoor-kitchen-cost-bend",
  "/resources/landscape-lighting-cost-bend",
  "/resources/lawn-care-cost-bend",
  "/resources/aeration-cost-bend",
  "/resources/backflow-testing-bend",
  "/resources/natural-stone-vs-concrete-pavers-bend",
  "/resources/lawn-fungus-treatment-bend",
  "/resources/best-grass-bend-oregon",
  "/resources/when-to-plant-bend-oregon",
  "/resources/brown-lawn-bend-oregon",
  "/resources/gas-vs-propane-fire-pit-bend",
  "/resources/water-wise-landscaping-bend",
  "/resources/water-wise-communities-bend",
  "/resources/bend-watering-restrictions",
  "/resources/defensible-space-bend-oregon",
  "/resources/fire-resistant-plants-central-oregon",
  "/resources/deschutes-fire-hardening-r327",
  "/resources/juniper-removal-bend-oregon",
  "/resources/boulder-landscaping-cost-bend-oregon",
  "/resources/bend-landscaping-cost-guide",
  "/resources/bend-turf-replacement-rebate",
  // City-specific service pages
  "/landscaping/bend/lawn-service",
  "/landscaping/bend/irrigation",
  "/landscaping/bend/xeriscaping",
  "/landscaping/bend/landscape-design",
  "/landscaping/bend/snow-removal",
  "/landscaping/redmond/lawn-service",
  "/landscaping/redmond/irrigation",
  "/landscaping/redmond/xeriscaping",
  "/landscaping/redmond/landscape-design",
  "/landscaping/redmond/snow-removal",
  "/landscaping/sisters/lawn-service",
  "/landscaping/sisters/irrigation",
  "/landscaping/sisters/xeriscaping",
  "/landscaping/sisters/landscape-design",
  "/landscaping/sunriver/lawn-service",
  "/landscaping/sunriver/irrigation",
  "/landscaping/sunriver/xeriscaping",
  "/landscaping/sunriver/landscape-design",
  "/landscaping/la-pine/lawn-service",
  "/landscaping/la-pine/irrigation",
  "/landscaping/la-pine/xeriscaping",
  "/landscaping/la-pine/landscape-design",
  "/landscaping/la-pine/snow-removal",
  "/landscaping/prineville/lawn-service",
  "/landscaping/prineville/irrigation",
  "/landscaping/prineville/xeriscaping",
  "/landscaping/prineville/landscape-design",
  "/landscaping/prineville/snow-removal",
  "/landscaping/terrebonne/lawn-service",
  "/landscaping/terrebonne/irrigation",
  "/landscaping/terrebonne/xeriscaping",
  "/landscaping/terrebonne/landscape-design",
  "/landscaping/terrebonne/snow-removal",
];

// ─── Helper: extract helmet tags and inject into index.html ──────────────────
function extractHelmetTags(appHtml) {
  // react-helmet-async renders tags with data-loc attributes inline in the body
  // We extract them and move them to the <head> section
  const helmetTagRegex = /<(?:title|meta|link)[^>]*data-loc="[^"]*"[^>]*(?:\/>|>(?:[^<]*)<\/(?:title|meta|link)>)/g;
  const headTags = [];
  let match;
  while ((match = helmetTagRegex.exec(appHtml)) !== null) {
    headTags.push(match[0]);
  }
  // Remove helmet tags from body HTML
  const bodyHtml = appHtml.replace(helmetTagRegex, "");
  return { headTags: headTags.join("\n    "), bodyHtml };
}

function buildPage(indexHtmlTemplate, appHtml) {
  const { headTags, bodyHtml } = extractHelmetTags(appHtml);

  let page = indexHtmlTemplate;

  if (headTags) {
    // Remove overridable homepage meta tags from the template
    page = page
      .replace(/<title[^>]*>[^<]*<\/title>/, "")
      .replace(/<link[^>]+rel="canonical"[^>]*\/>/g, "")
      .replace(/<meta[^>]+property="og:title"[^>]*\/>/g, "")
      .replace(/<meta[^>]+property="og:description"[^>]*\/>/g, "")
      .replace(/<meta[^>]+property="og:url"[^>]*\/>/g, "")
      .replace(/<meta[^>]+property="og:image"[^>]*\/>/g, "")
      .replace(/<meta[^>]+name="twitter:title"[^>]*\/>/g, "")
      .replace(/<meta[^>]+name="twitter:description"[^>]*\/>/g, "")
      .replace(/<meta[^>]+name="twitter:image"[^>]*\/>/g, "")
      .replace(/<meta[^>]+name="description"[^>]*\/>/g, "");

    // Inject SSR head tags before </head>
    page = page.replace("</head>", `    ${headTags}\n  </head>`);
  }

  // Inject pre-rendered body HTML into root div
  page = page.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);

  return page;
}

// ─── Main pre-rendering loop ──────────────────────────────────────────────────
async function main() {
  console.log("[prerender] Loading SSR bundle...");
  const { render } = await import(ssrBundlePath);
  const indexHtmlTemplate = readFileSync(indexHtmlPath, "utf-8");

  console.log(`[prerender] Pre-rendering ${routes.length} routes...`);
  let success = 0;
  let failed = 0;

  for (const route of routes) {
    try {
      const { html: appHtml, notFound } = render(route);

      if (notFound) {
        // Don't generate a file for 404 routes
        continue;
      }

      const page = buildPage(indexHtmlTemplate, appHtml);

      // Determine output path: / → index.html, /about → about/index.html
      let outPath;
      if (route === "/") {
        outPath = join(distPublicDir, "index.html");
      } else {
        // Strip leading slash, create directory
        const routeDir = join(distPublicDir, route.replace(/^\//, ""));
        mkdirSync(routeDir, { recursive: true });
        outPath = join(routeDir, "index.html");
      }

      writeFileSync(outPath, page, "utf-8");
      success++;
    } catch (err) {
      console.error(`[prerender] ERROR rendering ${route}:`, err.message);
      failed++;
    }
  }

  console.log(`[prerender] Done: ${success} pages pre-rendered, ${failed} failed.`);
  if (failed > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("[prerender] Fatal error:", err);
  process.exit(1);
});
