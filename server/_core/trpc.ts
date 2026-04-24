import { NOT_ADMIN_ERR_MSG, UNAUTHED_ERR_MSG } from '@shared/const';
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { TrpcContext } from "./context";

// Admin PIN — stored server-side so it never ships to the browser bundle
const ADMIN_PIN = process.env.ADMIN_PIN || "4132";

const t = initTRPC.context<TrpcContext>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

const requireUser = t.middleware(async opts => {
  const { ctx, next } = opts;

  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

export const protectedProcedure = t.procedure.use(requireUser);

export const adminProcedure = t.procedure.use(
  t.middleware(async opts => {
    const { ctx, next } = opts;

    if (!ctx.user || ctx.user.role !== 'admin') {
      throw new TRPCError({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }

    return next({
      ctx: {
        ...ctx,
        user: ctx.user,
      },
    });
  }),
);

/**
 * PIN-protected procedure — works without Manus OAuth.
 * The client sends the PIN in the x-admin-pin header.
 * Falls back to OAuth user check so logged-in owners also pass.
 */
export const pinProcedure = t.procedure.use(
  t.middleware(async opts => {
    const { ctx, next } = opts;
    const pin = ctx.req.headers['x-admin-pin'] as string | undefined;
    const pinValid = pin === ADMIN_PIN;
    const oauthValid = !!ctx.user;
    if (!pinValid && !oauthValid) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
    }
    return next({ ctx });
  }),
);
