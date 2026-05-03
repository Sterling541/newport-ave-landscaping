/**
 * Vercel Entry Point
 *
 * Vercel's @vercel/node runtime requires the server to export the Express app
 * as the default export rather than calling server.listen(). This file creates
 * the full Express app and exports it for Vercel to handle.
 */
import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./_core/oauth";
import { registerYelpLeadWebhook } from "./yelp-lead-ingest";
import { registerStorageProxy } from "./_core/storageProxy";
import { registerRedirects } from "./redirects";
import { appRouter } from "./routers";
import { createContext } from "./_core/context";
import { serveStatic } from "./_core/vite";
import { registerSSR } from "./ssr";

const app = express();
const server = createServer(app);

// Security headers — applied to every response
app.use((_req, res, next) => {
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  next();
});

// Configure body parser with larger size limit for file uploads
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// 301 redirects from old WordPress site URLs — must be before OAuth and tRPC
registerRedirects(app);

// Storage proxy for /manus-storage/* paths
registerStorageProxy(app);

// OAuth callback under /api/oauth/callback
registerOAuthRoutes(app);

// Yelp inbound lead webhook
registerYelpLeadWebhook(app);

// tRPC API
app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// SSR + static serving — initialized asynchronously
// Set SSR_DIST_DIR to the api/ directory so ssr.ts can find the SSR bundle
// and index.html that were copied there by build-vercel-api.mjs.
// import.meta.dirname resolves to the api/ directory in the compiled output.
process.env.SSR_DIST_DIR = import.meta.dirname;

// We export a promise that resolves to the app once SSR is ready
const appReady = (async () => {
  await registerSSR(app);
  serveStatic(app);
  return app;
})();

// Vercel expects a default export of the request handler
// We wrap in an async handler that waits for SSR initialization
export default async function handler(req: express.Request, res: express.Response) {
  const readyApp = await appReady;
  readyApp(req, res);
}
