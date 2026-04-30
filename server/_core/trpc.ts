import { NOT_ADMIN_ERR_MSG, UNAUTHED_ERR_MSG } from '@shared/const';
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { TrpcContext } from "./context";
import { jwtVerify } from "jose";
import { ENV } from "./env";

// Admin PIN — stored server-side so it never ships to the browser bundle
const ADMIN_PIN = process.env.ADMIN_PIN || "4132";

const STAFF_COOKIE = "staff_session_id";

/** Verify the staff_session_id cookie and return the payload if valid */
async function verifyStaffCookie(cookieHeader: string): Promise<{ id: number; role: string } | null> {
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${STAFF_COOKIE}=([^;]+)`));
  if (!match) return null;
  try {
    const secret = new TextEncoder().encode(ENV.cookieSecret);
    const { payload } = await jwtVerify(match[1], secret);
    if (payload.type !== "staff") return null;
    return { id: Number(payload.sub), role: payload.role as string };
  } catch {
    return null;
  }
}

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
 * PIN-protected procedure — accepts any of three auth methods:
 * 1. x-admin-pin header (legacy hardcoded PIN)
 * 2. Manus OAuth session (ctx.user)
 * 3. Staff session cookie (staff_session_id JWT) — for PIN-logged-in staff
 *
 * This is the correct procedure type for all staff-accessible admin operations.
 */
export const pinProcedure = t.procedure.use(
  t.middleware(async opts => {
    const { ctx, next } = opts;
    const pin = ctx.req.headers['x-admin-pin'] as string | undefined;
    const pinValid = pin === ADMIN_PIN;
    const oauthValid = !!ctx.user;

    // Check staff session cookie
    const cookieHeader = ctx.req.headers.cookie ?? "";
    const staffPayload = await verifyStaffCookie(cookieHeader);
    const staffValid = !!staffPayload;

    if (!pinValid && !oauthValid && !staffValid) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
    }
    return next({ ctx });
  }),
);
