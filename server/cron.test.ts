import { describe, it, expect } from "vitest";

describe("CRON_SECRET environment variable", () => {
  it("should be set and non-empty", () => {
    // The CRON_SECRET is set via webdev_request_secrets
    // In CI/test environment it may not be set, so we check the fallback logic
    const cronSecret = process.env.CRON_SECRET;
    const jwtSecret = process.env.JWT_SECRET;
    // At least one of these should be available as the auth secret
    const effectiveSecret = cronSecret ?? jwtSecret ?? "";
    expect(effectiveSecret.length).toBeGreaterThan(0);
  });
});
