/**
 * ssr.ts
 * Server-Side Rendering middleware for production.
 *
 * For every non-admin GET request, this middleware:
 * 1. Loads the pre-built SSR bundle (dist/server/entry-server.js)
 * 2. Calls render(url) to get the React HTML string
 * 3. Splits the HTML into head tags + body HTML
 *    - react-helmet-async renders <title>, <meta>, <link> tags at the START
 *      of the renderToString output (before the first <div>)
 * 4. Injects head tags into the <head> section of index.html
 *    (replacing the default <title> with the per-page one)
 * 5. Injects the body HTML into <div id="root">
 * 6. Returns the fully-rendered HTML to the client
 *
 * Admin routes (/admin/*) are excluded — they stay client-rendered.
 * Static assets (/assets/*, /manus-storage/*, etc.) are excluded.
 */

import fs from "fs";
import path from "path";
import { Express, Request, Response, NextFunction } from "express";

// Patterns that should NOT be SSR-rendered (serve as static files or skip)
const SKIP_SSR_PATTERNS = [
  /^\/admin\//,           // Admin routes — client-rendered
  /^\/api\//,             // API routes
  /^\/assets\//,          // Vite build assets
  /^\/manus-storage\//,   // CDN proxy
  /\.[a-z0-9]+$/i,        // Any file with an extension (js, css, png, etc.)
];

function shouldSkipSSR(pathname: string): boolean {
  return SKIP_SSR_PATTERNS.some(pattern => pattern.test(pathname));
}

/**
 * Split the renderToString output into:
 * - headTags: <title>, <meta>, <link>, etc. rendered by react-helmet-async
 *   (these appear before the first <div> in the output)
 * - bodyHtml: the actual React component tree starting from the first <div>
 */
function splitRenderedHtml(appHtml: string): { headTags: string; bodyHtml: string } {
  const firstDivIdx = appHtml.indexOf("<div");
  if (firstDivIdx <= 0) {
    return { headTags: "", bodyHtml: appHtml };
  }
  return {
    headTags: appHtml.slice(0, firstDivIdx).trim(),
    bodyHtml: appHtml.slice(firstDivIdx),
  };
}

export function registerSSR(app: Express): void {
  // Resolve paths relative to the compiled server bundle
  // In production: dist/index.js is in dist/, so:
  //   - dist/public/index.html
  //   - dist/server/entry-server.js
  const distDir = path.resolve(import.meta.dirname, "..");
  const distPublicPath = path.join(distDir, "public");
  const ssrBundlePath = path.join(distDir, "server", "entry-server.js");
  const indexHtmlPath = path.join(distPublicPath, "index.html");

  // Only register SSR if the SSR bundle exists (i.e., production build)
  if (!fs.existsSync(ssrBundlePath)) {
    console.log("[SSR] SSR bundle not found — skipping SSR middleware (dev mode or build not run)");
    return;
  }

  if (!fs.existsSync(indexHtmlPath)) {
    console.log("[SSR] index.html not found — skipping SSR middleware");
    return;
  }

  // Read the index.html template once at startup
  const indexHtmlTemplate = fs.readFileSync(indexHtmlPath, "utf-8");

  // Dynamically import the SSR bundle (built by vite build --ssr)
  type RenderFn = (url: string) => { html: string; helmetContext: unknown };
  let renderFn: RenderFn | null = null;

  import(ssrBundlePath)
    .then((mod) => {
      renderFn = mod.render as RenderFn;
      console.log("[SSR] SSR bundle loaded successfully");
    })
    .catch((err) => {
      console.error("[SSR] Failed to load SSR bundle:", err);
    });

  app.use((req: Request, res: Response, next: NextFunction) => {
    // Only handle GET requests
    if (req.method !== "GET") return next();

    const pathname = req.path;

    // Skip SSR for admin routes, API, static assets
    if (shouldSkipSSR(pathname)) return next();

    // If SSR bundle isn't loaded yet, fall through to static serving
    if (!renderFn) return next();

    try {
      const url = req.originalUrl;
      const { html: appHtml } = renderFn(url);

      // Split rendered HTML: head tags (title, meta, etc.) + body HTML
      const { headTags, bodyHtml } = splitRenderedHtml(appHtml);

      let page = indexHtmlTemplate;

      if (headTags) {
        // Remove the default <title> from the template (Helmet provides the per-page one)
        page = page.replace(/<title>[^<]*<\/title>/, "");
        // Inject per-page head tags before </head>
        page = page.replace("</head>", `  ${headTags}\n  </head>`);
      }

      // Inject the rendered React body HTML into the root div
      page = page.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);

      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (err) {
      // On SSR error, fall through to static serving (graceful degradation)
      console.error(`[SSR] Render error for ${req.originalUrl}:`, err);
      next();
    }
  });
}
