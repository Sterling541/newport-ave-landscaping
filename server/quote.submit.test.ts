import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the notifyOwner function so no real HTTP calls are made
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

// Mock Resend so no real emails are sent during tests
vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: vi.fn().mockResolvedValue({ id: "test-email-id" }),
    },
  })),
}));

import { notifyOwner } from "./_core/notification";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("quote.submit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns success and calls notifyOwner with correct title", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.quote.submit({
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "(541) 555-1234",
      service: "Irrigation Installation",
      message: "I need a new irrigation system for my backyard.",
    });

    expect(result).toEqual({ success: true });
    expect(notifyOwner).toHaveBeenCalledOnce();
    const call = vi.mocked(notifyOwner).mock.calls[0]![0];
    expect(call.title).toBe("New Quote Request from Jane Smith");
    expect(call.content).toContain("jane@example.com");
    expect(call.content).toContain("Irrigation Installation");
    expect(call.content).toContain("I need a new irrigation system");
  });

  it("works without optional phone and service fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.quote.submit({
      name: "Bob",
      email: "bob@example.com",
      message: "Just a general inquiry.",
    });

    expect(result).toEqual({ success: true });
    expect(notifyOwner).toHaveBeenCalledOnce();
    const call = vi.mocked(notifyOwner).mock.calls[0]![0];
    expect(call.content).not.toContain("Phone");
    expect(call.content).not.toContain("Service Requested");
  });

  it("rejects empty name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.quote.submit({ name: "", email: "a@b.com", message: "Hello" })
    ).rejects.toThrow();
  });

  it("rejects invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.quote.submit({ name: "Alice", email: "not-an-email", message: "Hello" })
    ).rejects.toThrow();
  });

  it("rejects empty message", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.quote.submit({ name: "Alice", email: "a@b.com", message: "" })
    ).rejects.toThrow();
  });
});
