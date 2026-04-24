import { Express, Request, Response, NextFunction } from "express";

/**
 * 301 Permanent Redirects
 * Maps all old WordPress site URLs to the new site structure.
 * These preserve Google rankings and prevent 404s for indexed pages.
 *
 * Rules:
 * - All redirects are HTTP 301 (permanent)
 * - No redirect chains — each source goes directly to final destination
 * - Both slashed and unslashed variants are listed explicitly
 * - Wildcard slug patterns handled separately below the static map
 */

// ─── Static exact-path redirects ────────────────────────────────────────────
const REDIRECTS: Record<string, string> = {

  // === HOME ===
  "/home":  "/",
  "/home/": "/",

  // === ABOUT / CONTACT ===
  "/about-us":    "/about",
  "/about-us/":   "/about",
  "/contact-us":  "/contact",
  "/contact-us/": "/contact",

  // === SERVICES (old slugs → new /services/* paths) ===
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

  // === MAINTENANCE (old slugs → new /services/* paths) ===
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

  // === PORTFOLIO (specific old slugs → new /portfolio/* paths) ===
  // Explicit entries from the user-provided redirect spec (no chains):
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

  // Additional explicit portfolio entries (no chains):
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

  // Old /landscaping-portfolio-categories/* → /our-work (no chain)
  "/landscaping-portfolio-categories/pavers":  "/our-work",
  "/landscaping-portfolio-categories/pavers/": "/our-work",

  // Old /our-work/:slug entries that map to /our-work (no portfolio page exists for these)
  "/our-work/nw-delaware-landscape-renovation":  "/our-work",
  "/our-work/nw-delaware-landscape-renovation/": "/our-work",

  // === RESOURCES / BLOG ===
  "/lawn-fungus":                                                  "/resources/lawn-fungus",
  "/lawn-fungus/":                                                 "/resources/lawn-fungus",
  "/the-impact-of-climate-change-on-landscaping":                  "/resources/climate-change-landscaping",
  "/the-impact-of-climate-change-on-landscaping/":                 "/resources/climate-change-landscaping",
  "/your-seasonal-guide-to-seasonal-landscaping-maintenance":      "/resources/seasonal-maintenance",
  "/your-seasonal-guide-to-seasonal-landscaping-maintenance/":     "/resources/seasonal-maintenance",

  // === SERVICE AREAS ===
  "/service-areas":  "/service-areas",
  "/service-areas/": "/service-areas",
  // Canonical city URLs: /landscaping/[city] is canonical.
  // Redirect /service-areas/[city]-landscaping for the 4 cities that have both patterns
  // to consolidate ranking signal and prevent duplicate content.
  "/service-areas/redmond-landscaping":      "/landscaping/redmond",
  "/service-areas/redmond-landscaping/":     "/landscaping/redmond",
  "/service-areas/sunriver-landscaping":     "/landscaping/sunriver",
  "/service-areas/sunriver-landscaping/":    "/landscaping/sunriver",
  "/service-areas/eagle-crest-landscaping":  "/landscaping/eagle-crest",
  "/service-areas/eagle-crest-landscaping/": "/landscaping/eagle-crest",
  "/service-areas/powell-butte-landscaping": "/landscaping/powell-butte",
  "/service-areas/powell-butte-landscaping/":"/landscaping/powell-butte",

  // === FIRE FEATURES (old slug) ===
  "/fire-pits-and-outdoor-fireplaces-bend-oregon":  "/services/fire-features",
  "/fire-pits-and-outdoor-fireplaces-bend-oregon/": "/services/fire-features",

  // === TERMS (old slug) ===
  "/terms-and-conditions":  "/terms",
  "/terms-and-conditions/": "/terms",

  // === LEGACY WORDPRESS PATHS ===
  "/wp-admin":          "/",
  "/wp-login.php":      "/",
  "/feed":              "/",
  "/feed/":             "/",
  "/sitemap_index.xml": "/sitemap.xml",
  "/elementor-3860":    "/",
  "/elementor-3860/":   "/",
};

// ─── Wildcard slug patterns ──────────────────────────────────────────────────
// These handle any /landscaping-portfolio/:slug, /portfolio-item/:slug, or
// /our-work/:slug that wasn't caught by the exact-match map above.
// The slug is extracted and forwarded to /portfolio/:slug (no chain).

const WILDCARD_PREFIXES: Array<{ prefix: string; destination: string }> = [
  { prefix: "/landscaping-portfolio/", destination: "/portfolio/" },
  { prefix: "/portfolio-item/",        destination: "/portfolio/" },
  { prefix: "/our-work/",              destination: "/portfolio/" },
];

export function registerRedirects(app: Express): void {
  app.use((req: Request, res: Response, next: NextFunction) => {
    const path = req.path;

    // 1. Exact-match static redirects
    const exactDestination = REDIRECTS[path];
    if (exactDestination) {
      const qs = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
      return res.redirect(301, exactDestination + qs);
    }

    // 2. Wildcard slug patterns — strip trailing slash from slug before forwarding
    for (const { prefix, destination } of WILDCARD_PREFIXES) {
      if (path.startsWith(prefix)) {
        const slug = path.slice(prefix.length).replace(/\/$/, "");
        if (slug) {
          const qs = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
          return res.redirect(301, destination + slug + qs);
        }
      }
    }

    next();
  });
}
