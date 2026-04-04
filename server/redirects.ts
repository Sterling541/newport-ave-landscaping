import { Express, Request, Response, NextFunction } from "express";

/**
 * 301 Permanent Redirects
 * Maps all old WordPress site URLs to the new site structure.
 * These preserve Google rankings and prevent 404s for indexed pages.
 */
const REDIRECTS: Record<string, string> = {
  // === HOME ===
  "/home": "/",

  // === SERVICES (old slugs → new paths) ===
  "/landscape-design": "/services/landscape-design",
  "/landscape-design/": "/services/landscape-design",
  "/landscaping-services": "/services",
  "/landscaping-services/": "/services",
  "/paver-patios-and-walkways-bend-oregon": "/services/hardscaping",
  "/paver-patios-and-walkways-bend-oregon/": "/services/hardscaping",
  "/pavers-bend-oregon": "/services/hardscaping",
  "/pavers-bend-oregon/": "/services/hardscaping",
  "/water-features-bend-oregon": "/services/water-features",
  "/water-features-bend-oregon/": "/services/water-features",
  "/outdoor-kitchens-and-living-spaces-bend-oregon": "/services/outdoor-living",
  "/outdoor-kitchens-and-living-spaces-bend-oregon/": "/services/outdoor-living",
  "/landscape-lighting-bend-oregon": "/services/landscape-lighting",
  "/landscape-lighting-bend-oregon/": "/services/landscape-lighting",
  "/xeriscape-landscaping-bend-oregon": "/services/xeriscaping",
  "/xeriscape-landscaping-bend-oregon/": "/services/xeriscaping",
  "/retaining-walls-bend-oregon": "/services/retaining-walls",
  "/retaining-walls-bend-oregon/": "/services/retaining-walls",
  "/artificial-turf-bend-oregon": "/services/artificial-turf",
  "/artificial-turf-bend-oregon/": "/services/artificial-turf",

  // === MAINTENANCE (old slugs → new paths) ===
  "/maintenance-services": "/maintenance",
  "/maintenance-services/": "/maintenance",
  "/maintenance-services/lawn-service-bend-oregon": "/maintenance/lawn-care",
  "/maintenance-services/lawn-service-bend-oregon/": "/maintenance/lawn-care",
  "/maintenance-services/residential-lawncare-bend-oregon": "/maintenance/lawn-care",
  "/maintenance-services/residential-lawncare-bend-oregon/": "/maintenance/lawn-care",
  "/sprinkler-system-design-and-installation-bend-oregon": "/maintenance/irrigation",
  "/sprinkler-system-design-and-installation-bend-oregon/": "/maintenance/irrigation",
  "/sprinkler-system-activation-bend-oregon": "/maintenance/sprinkler-activation",
  "/sprinkler-system-activation-bend-oregon/": "/maintenance/sprinkler-activation",
  "/sprinkler-blowout-service-central-oregon": "/maintenance/sprinkler-blowout",
  "/sprinkler-blowout-service-central-oregon/": "/maintenance/sprinkler-blowout",
  "/sprinkler-repair-bend-oregon": "/maintenance/sprinkler-repair",
  "/sprinkler-repair-bend-oregon/": "/maintenance/sprinkler-repair",
  "/snow-removal-bend-oregon": "/maintenance/snow-removal",
  "/snow-removal-bend-oregon/": "/maintenance/snow-removal",
  "/aeration-services-bend-oregon": "/maintenance/aeration",
  "/aeration-services-bend-oregon/": "/maintenance/aeration",

  // === PORTFOLIO (old WordPress slugs → new paths) ===
  "/landscaping-portfolio": "/our-work",
  "/landscaping-portfolio/": "/our-work",
  "/our-work/": "/our-work",
  "/landscaping-portfolio/awbrey-butte-patio-extension-and-wall": "/portfolio/awbrey-butte-patio",
  "/landscaping-portfolio/awbrey-butte-patio-extension-and-wall/": "/portfolio/awbrey-butte-patio",
  "/landscaping-portfolio/nw-bend-landscape-lighting": "/portfolio/nw-bend-lighting",
  "/landscaping-portfolio/nw-bend-landscape-lighting/": "/portfolio/nw-bend-lighting",
  "/landscaping-portfolio/westside-outdoor-living-space": "/portfolio/westside-outdoor-living",
  "/landscaping-portfolio/westside-outdoor-living-space/": "/portfolio/westside-outdoor-living",
  "/landscaping-portfolio/broken-top-water-feature-and-sunken-fire-pit": "/portfolio/broken-top-water-feature",
  "/landscaping-portfolio/broken-top-water-feature-and-sunken-fire-pit/": "/portfolio/broken-top-water-feature",
  "/landscaping-portfolio/century-drive-landscape-enhancement": "/portfolio/century-drive",
  "/landscaping-portfolio/century-drive-landscape-enhancement/": "/portfolio/century-drive",
  "/landscaping-portfolio/backyard-landscape-renovation": "/portfolio/backyard-renovation",
  "/landscaping-portfolio/backyard-landscape-renovation/": "/portfolio/backyard-renovation",
  "/landscaping-portfolio/broken-top-xeriscape": "/portfolio/broken-top-xeriscape",
  "/landscaping-portfolio/broken-top-xeriscape/": "/portfolio/broken-top-xeriscape",
  "/landscaping-portfolio/awbrey-butte-xeriscape": "/portfolio/awbrey-butte-xeriscape",
  "/landscaping-portfolio/awbrey-butte-xeriscape/": "/portfolio/awbrey-butte-xeriscape",
  "/landscaping-portfolio/awbrey-glenn-flagstone-patio-and-walkway": "/portfolio/awbrey-glenn-flagstone",
  "/landscaping-portfolio/awbrey-glenn-flagstone-patio-and-walkway/": "/portfolio/awbrey-glenn-flagstone",
  "/landscaping-portfolio/nw-bend-backyard-landscaping": "/portfolio/nw-bend-backyard",
  "/landscaping-portfolio/nw-bend-backyard-landscaping/": "/portfolio/nw-bend-backyard",
  "/landscaping-portfolio/east-bend-landscape-install": "/portfolio/east-bend-landscape",
  "/landscaping-portfolio/east-bend-landscape-install/": "/portfolio/east-bend-landscape",
  "/landscaping-portfolio/sw-bend-backyard-landscaping": "/portfolio/sw-bend-backyard",
  "/landscaping-portfolio/sw-bend-backyard-landscaping/": "/portfolio/sw-bend-backyard",
  "/landscaping-portfolio/paver-patio-and-gas-firepit": "/portfolio/paver-patio-firepit",
  "/landscaping-portfolio/paver-patio-and-gas-firepit/": "/portfolio/paver-patio-firepit",

  // === ABOUT / CONTACT ===
  "/about-us": "/about",
  "/about-us/": "/about",
  "/contact-us": "/contact",
  "/contact-us/": "/contact",
  "/careers": "/about",
  "/careers/": "/about",

  // === RESOURCES / BLOG ===
  "/lawn-fungus": "/resources/lawn-fungus",
  "/lawn-fungus/": "/resources/lawn-fungus",
  "/the-impact-of-climate-change-on-landscaping": "/resources/climate-change-landscaping",
  "/the-impact-of-climate-change-on-landscaping/": "/resources/climate-change-landscaping",
  "/your-seasonal-guide-to-seasonal-landscaping-maintenance": "/resources/seasonal-maintenance",
  "/your-seasonal-guide-to-seasonal-landscaping-maintenance/": "/resources/seasonal-maintenance",

  // === SERVICE AREAS ===
  "/service-areas": "/service-areas",
  "/service-areas/": "/service-areas",

  // === LEGACY WORDPRESS PATHS ===
  "/wp-admin": "/",
  "/wp-login.php": "/",
  "/feed": "/",
  "/feed/": "/",
  "/sitemap_index.xml": "/sitemap.xml",
};

export function registerRedirects(app: Express): void {
  app.use((req: Request, res: Response, next: NextFunction) => {
    const path = req.path;
    const destination = REDIRECTS[path];
    if (destination) {
      // Preserve query string if any
      const qs = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
      return res.redirect(301, destination + qs);
    }
    next();
  });
}
