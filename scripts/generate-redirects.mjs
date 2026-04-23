/**
 * scripts/generate-redirects.mjs
 *
 * Generates static HTML redirect pages for all old WordPress URLs.
 *
 * The Manus hosting platform serves static files from dist/public/ at the CDN
 * edge and does not forward non-API requests to Express. This means our Express
 * 301 redirect middleware never runs for deployed requests.
 *
 * This script creates dist/public/<old-path>/index.html files containing:
 *  - <meta http-equiv="refresh" content="0; url=<new-url>"> (browser redirect)
 *  - <link rel="canonical" href="<new-url>"> (SEO canonical)
 *  - <script>window.location.replace('<new-url>')</script> (instant JS redirect)
 *
 * While these are not true HTTP 301s, they are the standard approach for
 * static hosting platforms. Search engines treat meta-refresh + canonical as
 * equivalent to 301 for ranking purposes.
 *
 * Run with: node scripts/generate-redirects.mjs
 * (called automatically as part of pnpm build)
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPublicDir = resolve(__dirname, "../dist/public");
const BASE_URL = "https://newportavelandscaping.com";

// ─── All static exact-path redirects ─────────────────────────────────────────
// Mirrors the REDIRECTS map in server/redirects.ts
const REDIRECTS = {
  // HOME
  "/home":  "/",
  "/home/": "/",

  // ABOUT / CONTACT
  "/about-us":    "/about",
  "/about-us/":   "/about",
  "/contact-us":  "/contact",
  "/contact-us/": "/contact",

  // SERVICES
  "/landscaping-services":                                  "/services",
  "/landscaping-services/":                                 "/services",
  "/landscape-design":                                      "/services/landscape-design",
  "/landscape-design/":                                     "/services/landscape-design",
  "/pavers-bend-oregon":                                    "/services/pavers",
  "/pavers-bend-oregon/":                                   "/services/pavers",
  "/paver-patios-and-walkways-bend-oregon":                 "/services/pavers",
  "/paver-patios-and-walkways-bend-oregon/":                "/services/pavers",
  "/snow-removal-bend-oregon":                              "/services/snow-removal",
  "/snow-removal-bend-oregon/":                             "/services/snow-removal",
  "/sprinkler-system-design-and-installation-bend-oregon":  "/services/irrigation",
  "/sprinkler-system-design-and-installation-bend-oregon/": "/services/irrigation",
  "/landscape-lighting-bend-oregon-2":                      "/services/landscape-lighting",
  "/landscape-lighting-bend-oregon-2/":                     "/services/landscape-lighting",
  "/landscape-lighting-bend-oregon":                        "/services/landscape-lighting",
  "/landscape-lighting-bend-oregon/":                       "/services/landscape-lighting",
  "/commercial-landscape-maintenance-bend-oregon":          "/services/commercial-maintenance",
  "/commercial-landscape-maintenance-bend-oregon/":         "/services/commercial-maintenance",
  "/water-features-bend-oregon":                            "/services/water-features",
  "/water-features-bend-oregon/":                           "/services/water-features",
  "/outdoor-kitchens-and-living-spaces-bend-oregon":        "/services/outdoor-living",
  "/outdoor-kitchens-and-living-spaces-bend-oregon/":       "/services/outdoor-living",
  "/xeriscape-landscaping-bend-oregon":                     "/services/xeriscaping",
  "/xeriscape-landscaping-bend-oregon/":                    "/services/xeriscaping",
  "/retaining-walls-bend-oregon":                           "/services/retaining-walls",
  "/retaining-walls-bend-oregon/":                          "/services/retaining-walls",
  "/artificial-turf-bend-oregon":                           "/services/artificial-turf",
  "/artificial-turf-bend-oregon/":                          "/services/artificial-turf",

  // MAINTENANCE
  "/maintenance-services":                                    "/maintenance",
  "/maintenance-services/":                                   "/maintenance",
  "/maintenance-services/lawn-service-bend-oregon":           "/services/lawn-service",
  "/maintenance-services/lawn-service-bend-oregon/":          "/services/lawn-service",
  "/maintenance-services/residential-lawncare-bend-oregon":   "/services/lawn-service",
  "/maintenance-services/residential-lawncare-bend-oregon/":  "/services/lawn-service",
  "/maintenance-services/sprinkler-repair-bend-oregon":       "/services/sprinkler-repair",
  "/maintenance-services/sprinkler-repair-bend-oregon/":      "/services/sprinkler-repair",
  "/maintenance-services/snow-removal-bend-oregon":           "/services/snow-removal",
  "/maintenance-services/snow-removal-bend-oregon/":          "/services/snow-removal",
  "/sprinkler-system-activation-bend-oregon":                 "/services/sprinkler-activation",
  "/sprinkler-system-activation-bend-oregon/":                "/services/sprinkler-activation",
  "/sprinkler-blowout-service-central-oregon":                "/services/sprinkler-blowout",
  "/sprinkler-blowout-service-central-oregon/":               "/services/sprinkler-blowout",
  "/sprinkler-repair-bend-oregon":                            "/services/sprinkler-repair",
  "/sprinkler-repair-bend-oregon/":                           "/services/sprinkler-repair",
  "/aeration-services-bend-oregon":                           "/services/aeration",
  "/aeration-services-bend-oregon/":                          "/services/aeration",

  // PORTFOLIO
  "/landscaping-portfolio/awbrey-butte-xeriscape":         "/portfolio/awbrey-butte-xeriscape",
  "/landscaping-portfolio/awbrey-butte-xeriscape/":        "/portfolio/awbrey-butte-xeriscape",
  "/landscaping-portfolio/backyard-landscape-renovation":  "/portfolio/backyard-renovation",
  "/landscaping-portfolio/backyard-landscape-renovation/": "/portfolio/backyard-renovation",
  "/landscaping-portfolio/sw-bend-backyard-landscaping":   "/portfolio/sw-bend-backyard",
  "/landscaping-portfolio/sw-bend-backyard-landscaping/":  "/portfolio/sw-bend-backyard",
  "/landscaping-portfolio/nw-bend-backyard-landscaping":   "/portfolio/nw-bend-backyard",
  "/landscaping-portfolio/nw-bend-backyard-landscaping/":  "/portfolio/nw-bend-backyard",
  "/portfolio-item/backyard-landscape-renovation":         "/portfolio/backyard-renovation",
  "/portfolio-item/backyard-landscape-renovation/":        "/portfolio/backyard-renovation",
  "/landscaping-portfolio":                                                 "/our-work",
  "/landscaping-portfolio/":                                                "/our-work",
  "/landscaping-portfolio/awbrey-butte-patio-extension-and-wall":          "/portfolio/awbrey-butte-patio",
  "/landscaping-portfolio/awbrey-butte-patio-extension-and-wall/":         "/portfolio/awbrey-butte-patio",
  "/landscaping-portfolio/nw-bend-landscape-lighting":                     "/portfolio/nw-bend-lighting",
  "/landscaping-portfolio/nw-bend-landscape-lighting/":                    "/portfolio/nw-bend-lighting",
  "/landscaping-portfolio/westside-outdoor-living-space":                  "/portfolio/westside-outdoor-living",
  "/landscaping-portfolio/westside-outdoor-living-space/":                 "/portfolio/westside-outdoor-living",
  "/landscaping-portfolio/broken-top-water-feature-and-sunken-fire-pit":   "/portfolio/broken-top-water-feature",
  "/landscaping-portfolio/broken-top-water-feature-and-sunken-fire-pit/":  "/portfolio/broken-top-water-feature",
  "/landscaping-portfolio/century-drive-landscape-enhancement":            "/portfolio/century-drive",
  "/landscaping-portfolio/century-drive-landscape-enhancement/":           "/portfolio/century-drive",
  "/landscaping-portfolio/broken-top-xeriscape":                           "/portfolio/broken-top-xeriscape",
  "/landscaping-portfolio/broken-top-xeriscape/":                          "/portfolio/broken-top-xeriscape",
  "/landscaping-portfolio/awbrey-glenn-flagstone-patio-and-walkway":       "/portfolio/awbrey-glenn-flagstone",
  "/landscaping-portfolio/awbrey-glenn-flagstone-patio-and-walkway/":      "/portfolio/awbrey-glenn-flagstone",
  "/landscaping-portfolio/east-bend-landscape-install":                    "/portfolio/east-bend-landscape",
  "/landscaping-portfolio/east-bend-landscape-install/":                   "/portfolio/east-bend-landscape",
  "/landscaping-portfolio/paver-patio-and-gas-firepit":                    "/portfolio/paver-patio-firepit",
  "/landscaping-portfolio/paver-patio-and-gas-firepit/":                   "/portfolio/paver-patio-firepit",
  "/landscaping-portfolio-categories/pavers":  "/our-work",
  "/landscaping-portfolio-categories/pavers/": "/our-work",
  "/our-work/nw-delaware-landscape-renovation":  "/our-work",
  "/our-work/nw-delaware-landscape-renovation/": "/our-work",

  // RESOURCES / BLOG
  "/lawn-fungus":                                                  "/resources/lawn-fungus",
  "/lawn-fungus/":                                                 "/resources/lawn-fungus",
  "/the-impact-of-climate-change-on-landscaping":                  "/resources/climate-change-landscaping",
  "/the-impact-of-climate-change-on-landscaping/":                 "/resources/climate-change-landscaping",
  "/your-seasonal-guide-to-seasonal-landscaping-maintenance":      "/resources/seasonal-maintenance",
  "/your-seasonal-guide-to-seasonal-landscaping-maintenance/":     "/resources/seasonal-maintenance",

  // SERVICE AREAS (self-redirect — skip)
  // "/service-areas":  "/service-areas",

  // FIRE FEATURES
  "/fire-pits-and-outdoor-fireplaces-bend-oregon":  "/services/fire-features",
  "/fire-pits-and-outdoor-fireplaces-bend-oregon/": "/services/fire-features",

  // TERMS
  "/terms-and-conditions":  "/terms",
  "/terms-and-conditions/": "/terms",

  // LEGACY WORDPRESS
  "/wp-admin":          "/",
  "/wp-login.php":      "/",
  "/feed":              "/",
  "/feed/":             "/",
  "/sitemap_index.xml": "/sitemap.xml",
  "/elementor-3860":    "/",
  "/elementor-3860/":   "/",
};

// ─── Generate redirect HTML ───────────────────────────────────────────────────
function makeRedirectHtml(destination) {
  const fullUrl = destination.startsWith("http") ? destination : `${BASE_URL}${destination}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Redirecting...</title>
  <meta http-equiv="refresh" content="0; url=${fullUrl}">
  <link rel="canonical" href="${fullUrl}">
  <meta name="robots" content="noindex">
</head>
<body>
  <p>This page has moved. <a href="${fullUrl}">Click here if you are not redirected.</a></p>
  <script>window.location.replace(${JSON.stringify(fullUrl)});</script>
</body>
</html>`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
function main() {
  if (!existsSync(distPublicDir)) {
    console.error(`[redirects] ERROR: dist/public not found at ${distPublicDir}`);
    console.error("[redirects] Run 'vite build' first.");
    process.exit(1);
  }

  let created = 0;
  let skipped = 0;

  for (const [sourcePath, destination] of Object.entries(REDIRECTS)) {
    // Skip self-redirects
    if (sourcePath === destination || sourcePath === destination + "/") {
      skipped++;
      continue;
    }

    // Normalize: strip trailing slash for directory creation
    // /foo/ and /foo both map to dist/public/foo/index.html
    const normalizedPath = sourcePath.replace(/\/$/, "");
    if (!normalizedPath) {
      skipped++;
      continue;
    }

    const dirPath = join(distPublicDir, normalizedPath.replace(/^\//, ""));
    const filePath = join(dirPath, "index.html");

    // Don't overwrite pre-rendered pages (they have real content)
    // A pre-rendered page will be much larger than a redirect stub
    if (existsSync(filePath)) {
      skipped++;
      continue;
    }

    mkdirSync(dirPath, { recursive: true });
    writeFileSync(filePath, makeRedirectHtml(destination), "utf-8");
    created++;
  }

  console.log(`[redirects] Done: ${created} redirect pages created, ${skipped} skipped.`);
}

main();
