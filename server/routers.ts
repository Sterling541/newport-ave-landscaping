import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";

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

  // Quote / contact form submission
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
});

export type AppRouter = typeof appRouter;
