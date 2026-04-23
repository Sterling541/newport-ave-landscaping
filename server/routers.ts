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
} from "./db";
import { invokeLLM } from "./_core/llm";
import { ENV } from "./_core/env";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Quote / contact form submission (existing simple form)
  quote: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required").max(200),
          email: z.string().email("Valid email required").max(320),
          phone: z.string().max(30).optional(),
          service: z.string().max(200).optional(),
          message: z.string().min(1, "Message is required").max(5000),
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
        ]
          .filter((l) => l !== null)
          .join("\n");

        await notifyOwner({
          title: `New Quote Request from ${input.name}`,
          content: lines,
        });

        return { success: true };
      }),
  }),

  // Full Schedule Services form (replaces Google Form)
  submissions: router({
    create: publicProcedure
      .input(
        z.object({
          // Contact Info
          email: z.string().email().max(320),
          usedBefore: z.string().max(8).optional(),
          firstName: z.string().min(1).max(128),
          lastName: z.string().min(1).max(128),
          phone: z.string().min(1).max(32),
          siteAddress: z.string().min(1).max(500),
          billingAddress: z.string().max(500).optional(),
          howHeard: z.string().max(500).optional(),

          // Service Type
          serviceType: z.string().min(1).max(128),

          // Warranty
          warrantyDetails: z.string().max(5000).optional(),
          salesConsultant: z.string().max(128).optional(),
          projectManager: z.string().max(128).optional(),

          // Maintenance
          maintenanceTypes: z.string().max(500).optional(),
          maintenanceNotes: z.string().max(5000).optional(),

          // Irrigation
          irrigationTypes: z.string().max(500).optional(),
          irrigationNotes: z.string().max(5000).optional(),
          winterizationDate: z.string().max(32).optional(),

          // Lighting
          lightingTypes: z.string().max(500).optional(),
          lightingNotes: z.string().max(5000).optional(),

          // Water Feature
          waterFeatureTypes: z.string().max(500).optional(),
          waterFeatureNotes: z.string().max(5000).optional(),
          waterFeatureRepairDesc: z.string().max(5000).optional(),

          // Credit Card
          creditCardNumber: z.string().max(32).optional(),
          creditCardExpiration: z.string().max(16).optional(),
          creditCardCvv: z.string().max(8).optional(),
          creditCardAuthSignature: z.string().max(500).optional(),

          // Concrete
          concreteServiceType: z.string().max(64).optional(),
          concreteElements: z.string().max(500).optional(),
          concreteDimensions: z.string().max(500).optional(),
          concreteHasStairs: z.string().max(8).optional(),
          concreteAttachedToBuilding: z.string().max(16).optional(),

          // Landscape Design
          hasExistingDesign: z.string().max(8).optional(),
          needsHoaApproval: z.string().max(16).optional(),
          landscapeElements: z.string().max(500).optional(),
          budget: z.string().max(32).optional(),
          budgetOther: z.string().max(64).optional(),
          designConsultationAccepted: z.string().max(64).optional(),
          idealCompletionDate: z.string().max(32).optional(),

          // Scheduling
          flexibleScheduling: z.boolean().optional(),
          isRentalProperty: z.string().max(8).optional(),
          isPropertyOwner: z.string().max(8).optional(),
          hasPets: z.string().max(8).optional(),

          // Final
          comments: z.string().max(5000).optional(),
        })
      )
      .mutation(async ({ input }) => {
        const submission = await createServiceSubmission({
          ...input,
          flexibleScheduling: input.flexibleScheduling ?? false,
        });

        // Notify owner
        const notifLines = [
          `**Name:** ${input.firstName} ${input.lastName}`,
          `**Email:** ${input.email}`,
          `**Phone:** ${input.phone}`,
          `**Service:** ${input.serviceType}`,
          `**Site Address:** ${input.siteAddress}`,
          input.comments ? `\n**Comments:** ${input.comments}` : null,
        ]
          .filter((l) => l !== null)
          .join("\n");

        await notifyOwner({
          title: `New Service Request — ${input.serviceType} (${input.firstName} ${input.lastName})`,
          content: notifLines,
        });

        return { success: true, id: submission.insertId };
      }),

    list: protectedProcedure
      .input(
        z.object({
          limit: z.number().min(1).max(500).default(100),
          offset: z.number().min(0).default(0),
        })
      )
      .query(async ({ ctx, input }) => {
        if (ctx.user.openId !== ENV.ownerOpenId && ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        const rows = await listServiceSubmissions(input.limit, input.offset);
        const total = await countServiceSubmissions();
        return { rows, total };
      }),

    get: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        if (ctx.user.openId !== ENV.ownerOpenId && ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        const row = await getServiceSubmissionById(input.id);
        if (!row) throw new TRPCError({ code: "NOT_FOUND" });
        return row;
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.openId !== ENV.ownerOpenId && ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        await deleteServiceSubmission(input.id);
        return { success: true };
      }),

    insights: protectedProcedure
      .query(async ({ ctx }) => {
        if (ctx.user.openId !== ENV.ownerOpenId && ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }

        // Fetch all submissions for analysis (up to 500)
        const rows = await listServiceSubmissions(500, 0);
        const total = await countServiceSubmissions();

        if (rows.length === 0) {
          return {
            insights: [],
            summary: "No submissions yet. Insights will appear once you have data.",
            generatedAt: new Date().toISOString(),
          };
        }

        // Build a compact data summary for the LLM
        const serviceTypeCounts: Record<string, number> = {};
        const howHeardCounts: Record<string, number> = {};
        const budgetCounts: Record<string, number> = {};
        const monthCounts: Record<string, number> = {};
        const cityPatterns: Record<string, number> = {};
        const usedBeforeCounts: Record<string, number> = {};
        const rentalCounts: Record<string, number> = {};
        const petsCounts: Record<string, number> = {};

        for (const row of rows) {
          // Service type
          const svc = row.serviceType || "Unknown";
          serviceTypeCounts[svc] = (serviceTypeCounts[svc] || 0) + 1;

          // How heard
          if (row.howHeard) {
            const sources = row.howHeard.split(",").map((s: string) => s.trim());
            for (const src of sources) {
              if (src) howHeardCounts[src] = (howHeardCounts[src] || 0) + 1;
            }
          }

          // Budget
          if (row.budget) {
            budgetCounts[row.budget] = (budgetCounts[row.budget] || 0) + 1;
          }

          // Month of submission
          if (row.createdAt) {
            const d = new Date(row.createdAt);
            const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
            monthCounts[monthKey] = (monthCounts[monthKey] || 0) + 1;
          }

          // City from address
          if (row.siteAddress) {
            const cityMatch = row.siteAddress.match(/,\s*([^,]+),\s*OR/);
            if (cityMatch) {
              const city = cityMatch[1].trim();
              cityPatterns[city] = (cityPatterns[city] || 0) + 1;
            }
          }

          // Used before
          if (row.usedBefore) {
            usedBeforeCounts[row.usedBefore] = (usedBeforeCounts[row.usedBefore] || 0) + 1;
          }

          // Rental property
          if (row.isRentalProperty) {
            rentalCounts[row.isRentalProperty] = (rentalCounts[row.isRentalProperty] || 0) + 1;
          }

          // Pets
          if (row.hasPets) {
            petsCounts[row.hasPets] = (petsCounts[row.hasPets] || 0) + 1;
          }
        }

        const dataSummary = JSON.stringify({
          totalSubmissions: total,
          dateRange: {
            earliest: rows[rows.length - 1]?.createdAt,
            latest: rows[0]?.createdAt,
          },
          serviceTypeBreakdown: serviceTypeCounts,
          leadSourceBreakdown: howHeardCounts,
          budgetBreakdown: budgetCounts,
          submissionsByMonth: monthCounts,
          cityBreakdown: cityPatterns,
          returningVsNew: usedBeforeCounts,
          rentalProperties: rentalCounts,
          petsAtProperty: petsCounts,
        }, null, 2);

        const llmResponse = await invokeLLM({
          messages: [
            {
              role: "system",
              content: `You are a marketing and operations analyst for Newport Avenue Landscaping, a landscaping company in Bend, Oregon. 
Analyze the provided submission data and generate 6-10 specific, actionable insights for the marketing and intake team.
Each insight should be concrete, data-driven, and immediately actionable.
Focus on: seasonal patterns, top lead sources, service demand trends, geographic patterns, budget ranges, customer retention, and operational recommendations.
Respond with a JSON object in this exact format:
{
  "insights": [
    {
      "category": "Seasonality" | "Lead Sources" | "Service Demand" | "Geography" | "Budget" | "Customer Retention" | "Operations" | "Marketing",
      "title": "Short title (max 8 words)",
      "finding": "What the data shows (1-2 sentences)",
      "action": "Specific recommended action (1-2 sentences)",
      "priority": "high" | "medium" | "low"
    }
  ],
  "summary": "2-3 sentence executive summary of the most important patterns"
}`,
            },
            {
              role: "user",
              content: `Here is the submission data for Newport Avenue Landscaping:\n\n${dataSummary}\n\nPlease analyze this data and provide actionable insights for our marketing and intake team.`,
            },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "insights_response",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  insights: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        category: { type: "string" },
                        title: { type: "string" },
                        finding: { type: "string" },
                        action: { type: "string" },
                        priority: { type: "string" },
                      },
                      required: ["category", "title", "finding", "action", "priority"],
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

        const content = llmResponse.choices[0].message.content as string;
        const parsed = JSON.parse(content);

        return {
          insights: parsed.insights,
          summary: parsed.summary,
          generatedAt: new Date().toISOString(),
          dataPoints: total,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
