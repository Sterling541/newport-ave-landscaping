import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { registerRedirects } from "../redirects";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { registerSSR } from "../ssr";
import { batchGeocodeSubmissions } from "../geocoder";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // Temporary SSR diagnostic endpoint — remove after deployment verification
  app.get("/api/ssr-diag", (_req, res) => {
    const path = require("path");
    const fs = require("fs");
    const argv1 = process.argv[1] ?? "";
    const distDir = path.dirname(argv1);
    const ssrPath = path.join(distDir, "server", "entry-server.js");
    const indexPath = path.join(distDir, "public", "index.html");
    res.json({
      argv1,
      distDir,
      ssrPath,
      ssrExists: fs.existsSync(ssrPath),
      indexExists: fs.existsSync(indexPath),
      cwd: process.cwd(),
      nodeEnv: process.env.NODE_ENV,
    });
  });

  // 301 redirects from old WordPress site URLs — must be before OAuth and tRPC
  registerRedirects(app);

  // Storage proxy for /manus-storage/* paths
  registerStorageProxy(app);
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    // SSR middleware must be registered BEFORE static serving
    // so pre-rendered HTML is returned for public routes
    registerSSR(app);
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    // Background geocoding job: process all un-geocoded submissions in batches
    scheduleGeocoding();
  });
}

async function scheduleGeocoding() {
  // Wait 5 seconds after server start before beginning
  await new Promise(res => setTimeout(res, 5000));
  let totalGeocoded = 0;
  let batchNum = 0;
  while (true) {
    try {
      const result = await batchGeocodeSubmissions(50);
      totalGeocoded += result.geocoded;
      batchNum++;
      if (result.geocoded > 0) {
        console.log(`[geocoder] Batch ${batchNum}: geocoded=${result.geocoded} skipped=${result.skipped} failed=${result.failed} total=${totalGeocoded}`);
      }
      // If nothing was geocoded in this batch, we're done (or all remaining failed)
      if (result.geocoded === 0 && result.skipped === 0) {
        console.log(`[geocoder] All submissions geocoded. Total: ${totalGeocoded}`);
        break;
      }
      // Small pause between batches
      await new Promise(res => setTimeout(res, 2000));
    } catch (err) {
      console.error("[geocoder] Batch error:", err);
      // Wait 30 seconds before retrying on error
      await new Promise(res => setTimeout(res, 30000));
    }
  }
}

startServer().catch(console.error);
