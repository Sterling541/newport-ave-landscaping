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
import { listAppointments, getSalesRepById } from "../scheduler";
import { sendAppointmentReminderEmail } from "../emailNotifications";

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

// ---------------------------------------------------------------------------
// In-memory rate limiter — no external dependency required
// ---------------------------------------------------------------------------
type RateBucket = { count: number; resetAt: number };
const rateBuckets = new Map<string, RateBucket>();

function makeRateLimiter(opts: { windowMs: number; max: number; message: string }) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const ip =
      (req.headers["x-forwarded-for"] as string | undefined)?.split(",")[0].trim() ||
      req.socket.remoteAddress ||
      "unknown";
    const key = `${opts.windowMs}:${ip}`;
    const now = Date.now();
    let bucket = rateBuckets.get(key);
    if (!bucket || now > bucket.resetAt) {
      bucket = { count: 0, resetAt: now + opts.windowMs };
    }
    bucket.count++;
    rateBuckets.set(key, bucket);
    // Prune stale entries every ~1000 requests to prevent memory growth
    if (rateBuckets.size > 5000) {
      Array.from(rateBuckets.entries()).forEach(([k, v]) => {
        if (now > v.resetAt) rateBuckets.delete(k);
      });
    }
    if (bucket.count > opts.max) {
      res.status(429).json({ error: opts.message });
      return;
    }
    next();
  };
}

// 10 form submissions per IP per 15 minutes
const formSubmitLimiter = makeRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many submissions from this IP, please try again later.",
});

// 5 admin PIN attempts per IP per 5 minutes (brute-force guard)
const adminPinLimiter = makeRateLimiter({
  windowMs: 5 * 60 * 1000,
  max: 5,
  message: "Too many admin attempts, please wait before trying again.",
});

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Security headers — applied to every response
  app.use((_req, res, next) => {
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com https://maps.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' https:; frame-src 'none';"
    );
    next();
  });
  // Rate limiting on public form submissions
  app.use("/api/trpc/serviceSubmissions.create", formSubmitLimiter);
  app.use("/api/trpc/quoteLeads.create", formSubmitLimiter);
  // Rate limiting on admin PIN auth attempts
  app.use((req, res, next) => {
    if (req.headers["x-admin-pin"]) return adminPinLimiter(req, res, next);
    next();
  });
  // Configure body parser — 10mb is sufficient; 50mb was unnecessarily large
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ limit: "10mb", extended: true }));
  // 301 redirects from old WordPress site URLs — must be before OAuth and tRPC
  registerRedirects(app);

  // Storage proxy for /manus-storage/* paths
  registerStorageProxy(app);
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);

  // ── Scheduled task endpoint ─────────────────────────────────────────────────
  // POST /api/scheduled/reminders
  // Protected by CRON_SECRET (Bearer token). No cookie auth needed.
  // The Manus scheduled task calls: curl -X POST ... -H "Authorization: Bearer $CRON_SECRET"
  app.post("/api/scheduled/reminders", async (req, res) => {
    const secret = process.env.CRON_SECRET;
    const authHeader = req.headers.authorization ?? "";
    const provided = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
    if (!secret || provided !== secret) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    try {
      const now = new Date();
      const windowStart = new Date(now.getTime() + 28 * 60 * 1000);
      const windowEnd   = new Date(now.getTime() + 32 * 60 * 1000);
      const toHHMM = (d: Date) =>
        `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
      const todayStr = now.toISOString().slice(0, 10);
      const windowStartTime = toHHMM(windowStart);
      const windowEndTime   = toHHMM(windowEnd);
      const allToday = await listAppointments({ dateFrom: todayStr, dateTo: todayStr });
      const upcoming = allToday.filter((appt: any) =>
        appt.status !== "cancelled" &&
        appt.status !== "completed" &&
        appt.startTime >= windowStartTime &&
        appt.startTime <= windowEndTime
      );
      let sent = 0;
      for (const appt of upcoming) {
        const rep = await getSalesRepById((appt as any).repId);
        const email = (rep as any)?.effectiveEmail ?? rep?.email;
        if (email) {
          await sendAppointmentReminderEmail({
            repName: rep.name,
            repEmail: email,
            customerName: (appt as any).customerName,
            customerAddress: (appt as any).customerAddress,
            customerPhone: (appt as any).customerPhone,
            appointmentDate: (appt as any).appointmentDate,
            startTime: (appt as any).startTime,
            endTime: (appt as any).endTime,
            appointmentType: (appt as any).appointmentType,
            notes: (appt as any).notes,
          });
          sent++;
        }
      }
      res.json({ ok: true, sent, checked: upcoming.length });
    } catch (err: any) {
      console.error("[reminders] Error:", err);
      res.status(500).json({ error: err?.message ?? "Unknown error" });
    }
  });

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
    // registerSSR is async — it awaits the SSR bundle import before
    // registering the middleware, ensuring renderFn is ready for all requests.
    await registerSSR(app);
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
