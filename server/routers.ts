import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createServiceSubmission,
  listServiceSubmissions,
  getServiceSubmissionById,
  deleteServiceSubmission,
  countServiceSubmissions,
  updateSubmissionStatus,
  getSubmissionCountsByDay,
  getSubmissionsByServiceType,
  getSubmissionsBySource,
  getSubmissionsByBudget,
  getSubmissionCountForDate,
  getRollingAvgSubmissions,
  getRecentSubmissions,
  upsertWeatherDay,
  getWeatherForDate,
  getWeatherRange,
  getWeatherForecast,
  getLatestWeatherDate,
  countWeatherRows,
  createInsight,
  listInsights,
  updateInsightStatus,
  getActiveInsights,
  createCsvImportJob,
  updateCsvImportJob,
  listCsvImportJobs,
  bulkInsertServiceSubmissions,
} from "./db";
import { invokeLLM } from "./_core/llm";
import { ENV } from "./_core/env";
import { fetchHistoricalWeather, fetchWeatherForecast, describeWeatherCode } from "./weather";
import { processCsvImport } from "./csvImport";
import { generateInsights, generateDailyPulseSummary } from "./insightsGenerator";
import { batchGeocodeSubmissions } from "./geocoder";
import {
  getGeocodedSubmissions,
  getNeighborhoodClusters,
  countUngeocodedSubmissions,
  getServicePopularityByBudget,
  getBudgetTrendByYear,
  BUDGET_BANDS,
  BUDGET_BAND_LABELS,
  type BudgetBandKey,
  getLatestFollowUp,
  getFollowUpHistory,
  createFollowUp,
  getPendingCallbacks,
  ackReminder,
  getFollowUpStatusSummary,
  getAllUpcomingReminders,
  snoozeReminder,
  getLostLeadsByMonth,
} from "./db";

// ── Admin guard helper ────────────────────────────────────────────────────────
function requireAdmin(ctx: { user: { openId: string; role: string } }) {
  if (ctx.user.openId !== ENV.ownerOpenId && ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
}

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ── Quote / contact form ────────────────────────────────────────────────────
  quote: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1).max(200),
          email: z.string().email().max(320),
          phone: z.string().max(30).optional(),
          service: z.string().max(200).optional(),
          message: z.string().min(1).max(5000),
        })
      )
      .mutation(async ({ input }) => {
        const lines = [
          `**Name:** ${input.name}`,
          `**Email:** ${input.email}`,
          input.phone ? `**Phone:** ${input.phone}` : null,
          input.service ? `**Service Requested:** ${input.service}` : null,
          ``,
          `**Message:**`,
          input.message,
        ].filter(Boolean).join("\n");

        await notifyOwner({ title: `New Quote Request from ${input.name}`, content: lines });
        return { success: true };
      }),
  }),

  // ── Service Submissions ─────────────────────────────────────────────────────
  submissions: router({
    create: publicProcedure
      .input(
        z.object({
          email: z.string().email().max(320),
          usedBefore: z.string().max(8).optional(),
          firstName: z.string().min(1).max(128),
          lastName: z.string().min(1).max(128),
          phone: z.string().min(1).max(32),
          siteAddress: z.string().min(1).max(500),
          billingAddress: z.string().max(500).optional(),
          howHeard: z.string().max(500).optional(),
          serviceType: z.string().min(1).max(128),
          warrantyDetails: z.string().max(5000).optional(),
          salesConsultant: z.string().max(128).optional(),
          projectManager: z.string().max(128).optional(),
          maintenanceTypes: z.string().max(500).optional(),
          maintenanceNotes: z.string().max(5000).optional(),
          irrigationTypes: z.string().max(500).optional(),
          irrigationNotes: z.string().max(5000).optional(),
          winterizationDate: z.string().max(32).optional(),
          lightingTypes: z.string().max(500).optional(),
          lightingNotes: z.string().max(5000).optional(),
          waterFeatureTypes: z.string().max(500).optional(),
          waterFeatureNotes: z.string().max(5000).optional(),
          waterFeatureRepairDesc: z.string().max(5000).optional(),
          creditCardNumber: z.string().max(32).optional(),
          creditCardExpiration: z.string().max(16).optional(),
          creditCardCvv: z.string().max(8).optional(),
          creditCardAuthSignature: z.string().max(500).optional(),
          concreteServiceType: z.string().max(64).optional(),
          concreteElements: z.string().max(500).optional(),
          concreteDimensions: z.string().max(500).optional(),
          concreteHasStairs: z.string().max(8).optional(),
          concreteAttachedToBuilding: z.string().max(16).optional(),
          hasExistingDesign: z.string().max(8).optional(),
          needsHoaApproval: z.string().max(16).optional(),
          landscapeElements: z.string().max(500).optional(),
          budget: z.string().max(32).optional(),
          budgetOther: z.string().max(64).optional(),
          designConsultationAccepted: z.string().max(64).optional(),
          idealCompletionDate: z.string().max(32).optional(),
          flexibleScheduling: z.boolean().optional(),
          isRentalProperty: z.string().max(8).optional(),
          isPropertyOwner: z.string().max(8).optional(),
          hasPets: z.string().max(8).optional(),
          comments: z.string().max(5000).optional(),
          // Analytics fields
          formCompletionSeconds: z.number().optional(),
          ipHash: z.string().max(64).optional(),
        })
      )
      .mutation(async ({ input }) => {
        // Extract ZIP from address
        const zipMatch = input.siteAddress.match(/\b(\d{5})(?:-\d{4})?\b/);
        const zipCode = zipMatch ? zipMatch[1] : undefined;

        const submission = await createServiceSubmission({
          ...input,
          flexibleScheduling: input.flexibleScheduling ?? false,
          zipCode,
          dataSource: "form",
          schemaVersion: "1.0",
          leadStatus: "new",
        });

        const notifLines = [
          `**Name:** ${input.firstName} ${input.lastName}`,
          `**Email:** ${input.email}`,
          `**Phone:** ${input.phone}`,
          `**Service:** ${input.serviceType}`,
          `**Site Address:** ${input.siteAddress}`,
          input.budget ? `**Budget:** ${input.budget}` : null,
          input.howHeard ? `**How Heard:** ${input.howHeard}` : null,
          input.comments ? `\n**Comments:** ${input.comments}` : null,
        ].filter(Boolean).join("\n");

        await notifyOwner({
          title: `New Service Request — ${input.serviceType} (${input.firstName} ${input.lastName})`,
          content: notifLines,
        });

        return { success: true, id: (submission as { insertId?: number }).insertId };
      }),

    list: protectedProcedure
      .input(z.object({ limit: z.number().min(1).max(500).default(100), offset: z.number().min(0).default(0) }))
      .query(async ({ ctx, input }) => {
        requireAdmin(ctx);
        const rows = await listServiceSubmissions(input.limit, input.offset);
        const total = await countServiceSubmissions();
        return { rows, total };
      }),

    get: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        requireAdmin(ctx);
        const row = await getServiceSubmissionById(input.id);
        if (!row) throw new TRPCError({ code: "NOT_FOUND" });
        return row;
      }),

    updateStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["new", "contacted", "scheduled", "closed", "lost"]),
        adminNotes: z.string().max(5000).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx);
        await updateSubmissionStatus(input.id, input.status, input.adminNotes);
        return { success: true };
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx);
        await deleteServiceSubmission(input.id);
        return { success: true };
      }),

    // Legacy insights endpoint (kept for backward compatibility)
    insights: protectedProcedure
      .query(async ({ ctx }) => {
        requireAdmin(ctx);
        const rows = await listServiceSubmissions(500, 0);
        const total = await countServiceSubmissions();
        if (rows.length === 0) return { insights: [], summary: "No submissions yet.", generatedAt: new Date().toISOString() };

        const serviceTypeCounts: Record<string, number> = {};
        const howHeardCounts: Record<string, number> = {};
        const budgetCounts: Record<string, number> = {};
        const monthCounts: Record<string, number> = {};

        for (const row of rows) {
          const svc = row.serviceType || "Unknown";
          serviceTypeCounts[svc] = (serviceTypeCounts[svc] || 0) + 1;
          if (row.howHeard) {
            row.howHeard.split(",").map((s: string) => s.trim()).filter(Boolean).forEach((src: string) => {
              howHeardCounts[src] = (howHeardCounts[src] || 0) + 1;
            });
          }
          if (row.budget) budgetCounts[row.budget] = (budgetCounts[row.budget] || 0) + 1;
          if (row.createdAt) {
            const d = new Date(row.createdAt);
            const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
            monthCounts[k] = (monthCounts[k] || 0) + 1;
          }
        }

        const dataSummary = JSON.stringify({ totalSubmissions: total, serviceTypeBreakdown: serviceTypeCounts, leadSourceBreakdown: howHeardCounts, budgetBreakdown: budgetCounts, submissionsByMonth: monthCounts }, null, 2);
        const llmResponse = await invokeLLM({
          messages: [
            { role: "system", content: "You are a marketing analyst for Newport Avenue Landscaping in Bend, Oregon. Analyze submission data and provide 6-10 actionable insights. Return JSON: {insights:[{category,title,finding,action,priority}], summary}." },
            { role: "user", content: `Data:\n${dataSummary}` },
          ],
          response_format: { type: "json_schema", json_schema: { name: "insights_response", strict: true, schema: { type: "object", properties: { insights: { type: "array", items: { type: "object", properties: { category: { type: "string" }, title: { type: "string" }, finding: { type: "string" }, action: { type: "string" }, priority: { type: "string" } }, required: ["category", "title", "finding", "action", "priority"], additionalProperties: false } }, summary: { type: "string" } }, required: ["insights", "summary"], additionalProperties: false } } },
        });
        const parsed = JSON.parse(llmResponse.choices[0].message.content as string);
        return { insights: parsed.insights, summary: parsed.summary, generatedAt: new Date().toISOString(), dataPoints: total };
      }),
  }),

  // ── Insights Engine ─────────────────────────────────────────────────────────
  insightsEngine: router({
    /** Daily Pulse — the morning briefing view */
    dailyPulse: protectedProcedure
      .input(z.object({ serviceType: z.string().optional() }).optional())
      .query(async ({ ctx, input }) => {
      requireAdmin(ctx);
      const svcFilter = input?.serviceType || "all";

      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().slice(0, 10);

      // Submission stats
      const yesterdayCount = await getSubmissionCountForDate(yesterday, svcFilter);
      const avg7day = await getRollingAvgSubmissions(today, 7, svcFilter);
      const avg30day = await getRollingAvgSubmissions(today, 30, svcFilter);

      // Same week last year
      const sameWeekLastYear = new Date(today);
      sameWeekLastYear.setFullYear(today.getFullYear() - 1);
      const sameWeekStart = new Date(sameWeekLastYear);
      sameWeekStart.setDate(sameWeekLastYear.getDate() - 3);
      const sameWeekEnd = new Date(sameWeekLastYear);
      sameWeekEnd.setDate(sameWeekLastYear.getDate() + 3);
      const sameWeekCounts = await getSubmissionCountsByDay(sameWeekStart, sameWeekEnd, svcFilter);
      const sameWeekLastYearTotal = sameWeekCounts.reduce((s, r) => s + r.count, 0);

      // This month vs last month
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
      const thisMonthCounts = await getSubmissionCountsByDay(monthStart, today, svcFilter);
      const lastMonthCounts = await getSubmissionCountsByDay(lastMonthStart, lastMonthEnd, svcFilter);
      const totalThisMonth = thisMonthCounts.reduce((s, r) => s + r.count, 0);
      const totalLastMonth = lastMonthCounts.reduce((s, r) => s + r.count, 0);

      // Zero-submission days this month
      const zeroSubmissionDaysThisMonth = thisMonthCounts.filter(r => r.count === 0).length;
      const maxDailyCountThisMonth = Math.max(0, ...thisMonthCounts.map(r => r.count));

      // Service type, source, budget counts for this month
      const serviceTypeCounts = await getSubmissionsByServiceType(monthStart, today, svcFilter);
      const sourceCounts = await getSubmissionsBySource(monthStart, today, svcFilter);
      const budgetCounts = await getSubmissionsByBudget(monthStart, today, svcFilter);

      // Weather
      const yesterdayWeatherRow = await getWeatherForDate(yesterdayStr);
      const forecastRows = await getWeatherForecast();

      const yesterdayWeather = yesterdayWeatherRow ? {
        tempHighF: yesterdayWeatherRow.tempHighF ?? 0,
        tempLowF: yesterdayWeatherRow.tempLowF ?? 0,
        precipMm: yesterdayWeatherRow.precipMm ?? 0,
        snowMm: yesterdayWeatherRow.snowMm ?? 0,
        description: describeWeatherCode(yesterdayWeatherRow.weatherCode ?? 0),
      } : undefined;

      const forecastNext7 = forecastRows.slice(0, 7).map(r => ({
        date: String(r.date),
        tempHighF: r.tempHighF ?? 0,
        tempLowF: r.tempLowF ?? 0,
        precipMm: r.precipMm ?? 0,
        snowMm: r.snowMm ?? 0,
        description: describeWeatherCode(r.weatherCode ?? 0),
      }));

      // Active insights
      const activeInsights = await getActiveInsights();

      // AI summary
      const insightData = {
        yesterdayCount, avg7day, avg30day, sameWeekLastYear: sameWeekLastYearTotal,
        totalThisMonth, totalLastMonth, zeroSubmissionDaysThisMonth, maxDailyCountThisMonth,
        serviceTypeCounts: Object.fromEntries(serviceTypeCounts.map(r => [r.serviceType, r.count])),
        sourceCounts: Object.fromEntries(sourceCounts.map(r => [r.howHeard, r.count])),
        budgetCounts: Object.fromEntries(budgetCounts.map(r => [r.budget, r.count])),
        dayOfWeekCounts: {}, hourCounts: {},
        yesterdayWeather, forecastNext7,
      };

      let aiSummary = "";
      try {
        aiSummary = await generateDailyPulseSummary(insightData);
      } catch { aiSummary = "AI summary unavailable."; }

      return {
        yesterdayCount, avg7day, avg30day, sameWeekLastYearTotal,
        totalThisMonth, totalLastMonth, zeroSubmissionDaysThisMonth, maxDailyCountThisMonth,
        serviceTypeCounts, sourceCounts, budgetCounts,
        yesterdayWeather, forecastNext7,
        activeInsights,
        aiSummary,
        generatedAt: new Date(),
      };
    }),

    /** Lead Volume Trends — daily/weekly/monthly charts */
    volumeTrends: protectedProcedure
      .input(z.object({
        startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        serviceType: z.string().optional(),
      }))
      .query(async ({ ctx, input }) => {
        requireAdmin(ctx);
        const svcFilter = input.serviceType || "all";
        const start = new Date(input.startDate + "T00:00:00");
        const end = new Date(input.endDate + "T23:59:59");
        const dailyCounts = await getSubmissionCountsByDay(start, end, svcFilter);

        // Build rolling 7-day and 28-day averages
        const withRolling = dailyCounts.map((row, i) => {
          const window7 = dailyCounts.slice(Math.max(0, i - 6), i + 1);
          const window28 = dailyCounts.slice(Math.max(0, i - 27), i + 1);
          const avg7 = window7.reduce((s, r) => s + r.count, 0) / window7.length;
          const avg28 = window28.reduce((s, r) => s + r.count, 0) / window28.length;
          return { ...row, avg7: Math.round(avg7 * 10) / 10, avg28: Math.round(avg28 * 10) / 10 };
        });

        // Day-of-week heatmap
        const dowCounts: Record<string, number> = { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 };
        const dowLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        dailyCounts.forEach(r => {
          const dow = new Date(r.date + "T12:00:00").getDay();
          dowCounts[dowLabels[dow]] += r.count;
        });

        // Monthly totals
        const monthlyMap: Record<string, number> = {};
        dailyCounts.forEach(r => {
          const month = r.date.slice(0, 7);
          monthlyMap[month] = (monthlyMap[month] ?? 0) + r.count;
        });
        const monthlyCounts = Object.entries(monthlyMap).map(([month, count]) => ({ month, count })).sort((a, b) => a.month.localeCompare(b.month));

        return { dailyCounts: withRolling, dowCounts, monthlyCounts };
      }),

    /** Source Attribution */
    sourceAttribution: protectedProcedure
      .input(z.object({
        startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        serviceType: z.string().optional(),
      }))
      .query(async ({ ctx, input }) => {
        requireAdmin(ctx);
        const svcFilter = input.serviceType || "all";
        const start = new Date(input.startDate + "T00:00:00");
        const end = new Date(input.endDate + "T23:59:59");
        const sourceCounts = await getSubmissionsBySource(start, end, svcFilter);
        const total = sourceCounts.reduce((s, r) => s + r.count, 0);
        return {
          sources: sourceCounts.map(r => ({
            ...r,
            pct: total > 0 ? Math.round((r.count / total) * 1000) / 10 : 0,
          })),
          total,
        };
      }),

    /** Generate and save new AI insights */
    generateInsights: protectedProcedure
      .input(z.object({ serviceType: z.string().optional() }).optional())
      .mutation(async ({ ctx, input }) => {
      const svcFilter = input?.serviceType || "all";
      requireAdmin(ctx);

      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

      const yesterdayCount = await getSubmissionCountForDate(yesterday, svcFilter);
      const avg7day = await getRollingAvgSubmissions(today, 7, svcFilter);
      const avg30day = await getRollingAvgSubmissions(today, 30, svcFilter);
      const thisMonthCounts = await getSubmissionCountsByDay(monthStart, today, svcFilter);
      const lastMonthCounts = await getSubmissionCountsByDay(lastMonthStart, lastMonthEnd, svcFilter);
      const totalThisMonth = thisMonthCounts.reduce((s, r) => s + r.count, 0);
      const totalLastMonth = lastMonthCounts.reduce((s, r) => s + r.count, 0);
      const zeroSubmissionDaysThisMonth = thisMonthCounts.filter(r => r.count === 0).length;
      const maxDailyCountThisMonth = Math.max(0, ...thisMonthCounts.map(r => r.count));
      const serviceTypeCounts = await getSubmissionsByServiceType(monthStart, today, svcFilter);
      const sourceCounts = await getSubmissionsBySource(monthStart, today, svcFilter);
      const budgetCounts = await getSubmissionsByBudget(monthStart, today, svcFilter);
      const yesterdayWeatherRow = await getWeatherForDate(yesterday.toISOString().slice(0, 10));
      const forecastRows = await getWeatherForecast();

      const insightData = {
        yesterdayCount, avg7day, avg30day,
        sameWeekLastYear: 0, // Would need prior year data
        totalThisMonth, totalLastMonth, zeroSubmissionDaysThisMonth, maxDailyCountThisMonth,
        serviceTypeCounts: Object.fromEntries(serviceTypeCounts.map(r => [r.serviceType, r.count])),
        sourceCounts: Object.fromEntries(sourceCounts.map(r => [r.howHeard, r.count])),
        budgetCounts: Object.fromEntries(budgetCounts.map(r => [r.budget, r.count])),
        dayOfWeekCounts: {}, hourCounts: {},
        yesterdayWeather: yesterdayWeatherRow ? {
          tempHighF: yesterdayWeatherRow.tempHighF ?? 0, tempLowF: yesterdayWeatherRow.tempLowF ?? 0,
          precipMm: yesterdayWeatherRow.precipMm ?? 0, snowMm: yesterdayWeatherRow.snowMm ?? 0,
          description: describeWeatherCode(yesterdayWeatherRow.weatherCode ?? 0),
        } : undefined,
        forecastNext7: forecastRows.slice(0, 7).map(r => ({
          date: String(r.date), tempHighF: r.tempHighF ?? 0, tempLowF: r.tempLowF ?? 0,
          precipMm: r.precipMm ?? 0, snowMm: r.snowMm ?? 0,
          description: describeWeatherCode(r.weatherCode ?? 0),
        })),
      };

      const newInsights = await generateInsights(insightData);
      for (const ins of newInsights) {
        await createInsight(ins);
      }

      return { success: true, count: newInsights.length };
    }),

    /** List saved insights */
    listInsights: protectedProcedure
      .input(z.object({ status: z.string().optional(), limit: z.number().min(1).max(100).default(50) }))
      .query(async ({ ctx, input }) => {
        requireAdmin(ctx);
        return listInsights(input.limit, input.status);
      }),

    /** Update insight status */
    updateInsightStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["active", "read", "snoozed", "valuable", "dismissed"]),
        feedback: z.string().optional(),
      }))
       .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx);
        await updateInsightStatus(input.id, input.status, input.feedback);
        return { success: true };
      }),

    /** Budget trend by year — how budget distribution has shifted over time */
    budgetTrend: protectedProcedure
      .query(async ({ ctx }) => {
        requireAdmin(ctx);
        const rows = await getBudgetTrendByYear();
        return { rows, bands: [...BUDGET_BAND_LABELS] };
      }),

    /** AI-powered cross-budget pattern analysis */
    generateBudgetInsights: protectedProcedure
      .input(z.object({
        budgetKey: z.string().optional(),
        startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
        endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
      }).optional())
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx);

        // Gather data for all budget bands
        const allBands = await Promise.all(
          BUDGET_BANDS.map(async (band) => {
            const pop = await getServicePopularityByBudget(band.key as BudgetBandKey);
            const total = pop.reduce((s, r) => s + r.count, 0);
            return { band: band.label, key: band.key, total, services: pop };
          })
        );

        const trendRows = await getBudgetTrendByYear();

        // Build context for AI
        const bandSummaries = allBands
          .filter(b => b.total > 0)
          .map(b => {
            const topService = b.services[0];
            const topPct = topService ? topService.pct : 0;
            const topSvc = topService ? topService.serviceType : "N/A";
            return `${b.band} (${b.total} inquiries): top service = ${topSvc} (${topPct}%)`;
          })
          .join("\n");

        const yearTrend = trendRows
          .map(r => {
            const top = BUDGET_BAND_LABELS
              .map(label => ({ label, count: (r as Record<string, number>)[label] || 0 }))
              .sort((a, b) => b.count - a.count)[0];
            return `${r.year}: most common band = ${top?.label ?? "N/A"} (${top?.count ?? 0} inquiries)`;
          })
          .join("\n");

        const prompt = `You are a marketing analyst for Newport Avenue Landscaping in Bend, Oregon.

Analyze this budget distribution data and provide 4-6 specific, actionable insights about cross-budget patterns:

Service popularity by budget band:
${bandSummaries}

Budget trend by year:
${yearTrend}

Focus on:
1. Which budget segments prefer which services
2. How the client base is shifting up-market or down-market over time
3. Specific marketing or pricing recommendations based on the data
4. Any surprising patterns worth investigating

Return JSON with: { insights: [{ title: string, finding: string, action: string, priority: "high"|"medium"|"low" }], summary: string }`;

        const response = await invokeLLM({
          messages: [
            { role: "system", content: "You are a data-driven marketing analyst. Always respond with valid JSON." },
            { role: "user", content: prompt },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "budget_insights",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  insights: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        title: { type: "string" },
                        finding: { type: "string" },
                        action: { type: "string" },
                        priority: { type: "string", enum: ["high", "medium", "low"] },
                      },
                      required: ["title", "finding", "action", "priority"],
                      additionalProperties: false,
                    },
                  },
                  summary: { type: "string" },
                },
                required: ["insights", "summary"],
                additionalProperties: false,
              },
            },
          },
        });

        const content = response.choices[0]?.message?.content;
        if (!content) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "AI response empty" });

        return JSON.parse(content as string) as {
          insights: Array<{ title: string; finding: string; action: string; priority: string }>;
          summary: string;
        };
      }),

    /** Budget breakdown — service popularity for a given budget band */
    budgetInsights: protectedProcedure
      .input(z.object({
        budgetKey: z.string().optional(),
        startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
        endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
      }).optional())
      .query(async ({ ctx, input }) => {
        requireAdmin(ctx);
        const budgetKey = (input?.budgetKey || "all") as BudgetBandKey;
        const startDate = input?.startDate ? new Date(input.startDate + "T00:00:00") : undefined;
        const endDate = input?.endDate ? new Date(input.endDate + "T23:59:59") : undefined;
        const servicePopularity = await getServicePopularityByBudget(budgetKey, startDate, endDate);
        const total = servicePopularity.reduce((s, r) => s + r.count, 0);
        return {
          budgetKey,
          budgetLabel: budgetKey === "all" ? "All Budgets" :
            budgetKey === "other" ? "Other / Custom" :
            BUDGET_BANDS.find(b => b.key === budgetKey)?.label ?? budgetKey,
          servicePopularity,
          total,
          bands: BUDGET_BANDS.map(b => ({ key: b.key, label: b.label })),
        };
      }),
  }),
  // ── Weather ─────────────────────────────────────────────────────────────────
  weather: router({
    /** Fetch and store weather forecast */
    refreshForecast: protectedProcedure.mutation(async ({ ctx }) => {
      requireAdmin(ctx);
      const rows = await fetchWeatherForecast();
      for (const row of rows) {
        await upsertWeatherDay({ ...row, date: new Date(row.date + "T12:00:00"), fetchedAt: new Date() });
      }
      return { success: true, count: rows.length };
    }),

    /** Backfill historical weather for a date range */
    backfillHistorical: protectedProcedure
      .input(z.object({
        startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      }))
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx);
        const rows = await fetchHistoricalWeather(input.startDate, input.endDate);
        for (const row of rows) {
          await upsertWeatherDay({ ...row, date: new Date(row.date + "T12:00:00"), fetchedAt: new Date() });
        }
        return { success: true, count: rows.length };
      }),

    /** Get weather status */
    status: protectedProcedure.query(async ({ ctx }) => {
      requireAdmin(ctx);
      const totalRows = await countWeatherRows();
      const latestDate = await getLatestWeatherDate();
      const forecast = await getWeatherForecast();
      return { totalRows, latestDate, forecastDays: forecast.length };
    }),

    /** Get weather for a date range (for correlation charts) */
    range: protectedProcedure
      .input(z.object({
        startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      }))
      .query(async ({ ctx, input }) => {
        requireAdmin(ctx);
        return getWeatherRange(input.startDate, input.endDate);
      }),
    /** Get combined weather + lead volume by day for correlation chart */
    correlation: protectedProcedure
      .input(z.object({
        days: z.number().min(7).max(90).default(30),
      }))
      .query(async ({ ctx, input }) => {
        requireAdmin(ctx);
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - input.days);
        const startStr = startDate.toISOString().slice(0, 10);
        const endStr = endDate.toISOString().slice(0, 10);
        // Get weather rows
        const weatherRows = await getWeatherRange(startStr, endStr);
        // Get lead counts per day
        const leadRows = await getSubmissionCountsByDay(startDate, endDate);
        const leadMap = new Map(leadRows.map(r => [r.date, r.count]));
        // Merge by date
        const merged = weatherRows.map(w => ({
          date: String(w.date),
          tempHighF: w.tempHighF ?? null,
          tempLowF: w.tempLowF ?? null,
          precipMm: w.precipMm ?? null,
          weatherCode: w.weatherCode ?? 0,
          leads: leadMap.get(String(w.date)) ?? 0,
        }));
        // Fill in any lead-only days (no weather data)
        const weatherDates = new Set(merged.map(r => r.date));
        for (const lr of leadRows) {
          if (!weatherDates.has(lr.date)) {
            merged.push({ date: lr.date, tempHighF: null, tempLowF: null, precipMm: null, weatherCode: 0, leads: lr.count });
          }
        }
        merged.sort((a, b) => a.date.localeCompare(b.date));
        return merged;
      }),
  }),

  // ── Geo-Intelligence ─────────────────────────────────────────────────────────────────────────────
  geoIntelligence: router({
    /** Get all geocoded submission pins for the map */
    pins: protectedProcedure
      .input(z.object({
        serviceType: z.string().optional(),
        startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
        endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
      }).optional())
      .query(async ({ ctx, input }) => {
        requireAdmin(ctx);
        const opts = {
          serviceType: input?.serviceType || "all",
          startDate: input?.startDate ? new Date(input.startDate + "T00:00:00") : undefined,
          endDate: input?.endDate ? new Date(input.endDate + "T23:59:59") : undefined,
        };
        const rows = await getGeocodedSubmissions(opts);
        return rows.map(r => ({
          id: r.id,
          name: `${r.firstName} ${r.lastName}`,
          address: r.siteAddress,
          serviceType: r.serviceType,
          budget: r.budget,
          lat: Number(r.lat),
          lng: Number(r.lng),
          neighborhood: r.neighborhood,
          city: r.city,
          createdAt: r.createdAt,
          leadStatus: r.leadStatus,
        }));
      }),

    /** Get neighborhood-level clusters for the sidebar */
    clusters: protectedProcedure
      .input(z.object({
        serviceType: z.string().optional(),
        startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
        endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
      }).optional())
      .query(async ({ ctx, input }) => {
        requireAdmin(ctx);
        const opts = {
          serviceType: input?.serviceType || "all",
          startDate: input?.startDate ? new Date(input.startDate + "T00:00:00") : undefined,
          endDate: input?.endDate ? new Date(input.endDate + "T23:59:59") : undefined,
        };
        return getNeighborhoodClusters(opts);
      }),

    /** Trigger geocoding batch job */
    geocodeBatch: protectedProcedure
      .input(z.object({ limit: z.number().min(1).max(500).default(100) }).optional())
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx);
        const result = await batchGeocodeSubmissions(input?.limit ?? 100);
        return result;
      }),

    /** Get geocoding status */
    geocodeStatus: protectedProcedure.query(async ({ ctx }) => {
      requireAdmin(ctx);
      const ungeocoded = await countUngeocodedSubmissions();
      const total = await countServiceSubmissions();
      const geocoded = total - ungeocoded;
      return { total, geocoded, ungeocoded, pct: total > 0 ? Math.round((geocoded / total) * 100) : 0 };
    }),

    /** Generate AI postcard/marketing recommendations for a neighborhood */
    neighborhoodInsights: protectedProcedure
      .input(z.object({
        neighborhood: z.string(),
        city: z.string().optional(),
        serviceType: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx);

        // Get clusters to find data for this neighborhood
        const clusters = await getNeighborhoodClusters();
        const cluster = clusters.find(c =>
          c.neighborhood === input.neighborhood && (!input.city || c.city === input.city)
        );

        if (!cluster) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Neighborhood not found" });
        }

        // Get recent submissions for this neighborhood
        const allPins = await getGeocodedSubmissions();
        const neighborhoodPins = allPins.filter(p =>
          p.neighborhood === input.neighborhood && (!input.city || p.city === input.city)
        );

        // Build context for AI
        const serviceBreakdown = Object.entries(cluster.byServiceType)
          .sort((a, b) => b[1] - a[1])
          .map(([svc, cnt]) => `${svc}: ${cnt}`)
          .join(", ");

        const recentMonths = neighborhoodPins
          .slice(0, 20)
          .map(p => new Date(p.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }))
          .join(", ");

        const prompt = `You are a marketing strategist for Newport Avenue Landscaping, a premium landscaping company in Bend, OR.

Analyze this neighborhood data and generate specific, actionable postcard marketing recommendations:

Neighborhood: ${input.neighborhood}, ${cluster.city}
Total inquiries: ${cluster.total}
Service breakdown: ${serviceBreakdown}
Recent inquiry months: ${recentMonths}

Provide:
1. The best 2-3 months to send postcards to this neighborhood (based on when they historically inquire)
2. Which service(s) to feature on the postcard
3. A specific headline/hook for the postcard (1-2 sentences)
4. Why this neighborhood is a good target (1 sentence)

Be specific, data-driven, and actionable. Format as JSON with keys: bestMonths (array of month names), featuredService (string), postcardHeadline (string), targetingRationale (string).`;

        const response = await invokeLLM({
          messages: [
            { role: "system", content: "You are a data-driven marketing strategist. Always respond with valid JSON." },
            { role: "user", content: prompt },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "postcard_recommendation",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  bestMonths: { type: "array", items: { type: "string" } },
                  featuredService: { type: "string" },
                  postcardHeadline: { type: "string" },
                  targetingRationale: { type: "string" },
                },
                required: ["bestMonths", "featuredService", "postcardHeadline", "targetingRationale"],
                additionalProperties: false,
              },
            },
          },
        });

        const content = response.choices[0]?.message?.content;
        if (!content) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "AI response empty" });

        return {
          neighborhood: input.neighborhood,
          city: cluster.city,
          total: cluster.total,
          byServiceType: cluster.byServiceType,
          recommendation: JSON.parse(content as string) as {
            bestMonths: string[];
            featuredService: string;
            postcardHeadline: string;
            targetingRationale: string;
          },
        };
      }),
  }),

  // ── Lead Follow-Up ──────────────────────────────────────────────────────────────────────────
  followUp: router({
    /** Get the latest follow-up status for a submission */
    getLatest: protectedProcedure
      .input(z.object({ submissionId: z.number() }))
      .query(async ({ ctx, input }) => {
        requireAdmin(ctx);
        return getLatestFollowUp(input.submissionId);
      }),
    /** Get full follow-up history for a submission */
    getHistory: protectedProcedure
      .input(z.object({ submissionId: z.number() }))
      .query(async ({ ctx, input }) => {
        requireAdmin(ctx);
        return getFollowUpHistory(input.submissionId);
      }),
    /** Log a new follow-up action */
    logAction: protectedProcedure
      .input(z.object({
        submissionId: z.number(),
        status: z.enum([
          "called_scheduled",
          "left_voicemail",
          "appointment_set",
          "no_answer",
          "not_interested",
          "follow_up_needed",
          "closed_won",
          "closed_lost",
          "below_minimum_budget",
          "price_too_high",
        ]),
        notes: z.string().max(2000).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx);
        // For left_voicemail: auto-set remindAt to next business day at 9am
        let remindAt: Date | undefined;
        if (input.status === "left_voicemail") {
          const d = new Date();
          d.setDate(d.getDate() + 1);
          if (d.getDay() === 0) d.setDate(d.getDate() + 1); // Sunday -> Monday
          if (d.getDay() === 6) d.setDate(d.getDate() + 2); // Saturday -> Monday
          d.setHours(9, 0, 0, 0);
          remindAt = d;
        }
        await createFollowUp({
          submissionId: input.submissionId,
          status: input.status,
          notes: input.notes ?? null,
          remindAt: remindAt ?? null,
          reminderAcked: false,
        });
        return { success: true, remindAt: remindAt ?? null };
      }),
    /** Get all leads with pending callbacks (remindAt <= now) */
    pendingCallbacks: protectedProcedure.query(async ({ ctx }) => {
      requireAdmin(ctx);
      return getPendingCallbacks();
    }),
    /** Acknowledge a reminder (dismiss it) */
    ackReminder: protectedProcedure
      .input(z.object({ followUpId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx);
        await ackReminder(input.followUpId);
        return { success: true };
      }),
    /** Get latest follow-up status for all submissions (for badges) */
    statusSummary: protectedProcedure.query(async ({ ctx }) => {
      requireAdmin(ctx);
      return getFollowUpStatusSummary();
    }),
    /** Get ALL upcoming reminders for the Reminders page */
    allReminders: protectedProcedure.query(async ({ ctx }) => {
      requireAdmin(ctx);
      return getAllUpcomingReminders();
    }),
    /** Snooze a reminder by N days */
    snooze: protectedProcedure
      .input(z.object({ followUpId: z.number(), days: z.number().int().min(1).max(30) }))
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx);
        await snoozeReminder(input.followUpId, input.days);
        return { success: true };
      }),
  }),

  // ── CSV Import ──────────────────────────────────────────────────────────────────────────────
  csvImport: router({
    /** Process a CSV string and import submissions */
    import: protectedProcedure
      .input(z.object({
        csvText: z.string().min(1).max(10_000_000), // 10MB max
        filename: z.string().max(256),
      }))
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx);

        // Create import job record
        const jobResult = await createCsvImportJob({
          filename: input.filename,
          status: "processing",
          importedBy: ctx.user.id,
        });
        const jobId = (jobResult as { insertId?: number }).insertId;

        try {
          const result = processCsvImport(input.csvText);

          // Bulk insert
          await bulkInsertServiceSubmissions(result.imported);

          // Update job record
          if (jobId) {
            await updateCsvImportJob(jobId, {
              status: "completed",
              totalRows: result.imported.length + result.skipped.length + result.errors.length,
              importedRows: result.imported.length,
              skippedRows: result.skipped.length,
              errorLog: result.errors.length > 0 ? JSON.stringify(result.errors.slice(0, 50)) : null,
              completedAt: new Date(),
            });
          }

          return {
            success: true,
            imported: result.imported.length,
            skipped: result.skipped.length,
            errors: result.errors.length,
            errorSamples: result.errors.slice(0, 10),
            skippedSamples: result.skipped.slice(0, 10),
          };
        } catch (err) {
          if (jobId) {
            await updateCsvImportJob(jobId, {
              status: "failed",
              errorLog: String(err),
              completedAt: new Date(),
            });
          }
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: String(err) });
        }
      }),

    /** List import job history */
    history: protectedProcedure.query(async ({ ctx }) => {
      requireAdmin(ctx);
      return listCsvImportJobs();
    }),
  }),

  // ── Lost-lead breakdown analytics ──────────────────────────────────────────
  lostLeads: router({
    byMonth: protectedProcedure
      .input(z.object({ months: z.number().min(1).max(24).default(12) }))
      .query(async ({ ctx, input }) => {
        requireAdmin(ctx);
        return getLostLeadsByMonth(input.months);
      }),
  }),
});

export type AppRouter = typeof appRouter;
