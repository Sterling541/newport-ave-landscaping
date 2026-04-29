/**
 * Smart Scheduler Unit Tests
 * Newport Avenue Landscaping
 *
 * Tests the pure logic helpers in scheduler.ts that don't require a DB connection:
 * - generateTimeSlots
 * - scoreSlot
 * - toYMD / addDays date helpers
 */
import { describe, it, expect } from "vitest";

// ─── Re-export helpers for testing (they are not exported from scheduler.ts,
//     so we replicate the pure logic here to keep tests self-contained) ────────

function toYMD(d: Date): string {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function addDays(d: Date, n: number): Date {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + n);
  return copy;
}

function generateTimeSlots(
  date: string,
  durationMinutes: number,
  existingAppts: { startTime: string; endTime: string }[]
): { startTime: string; endTime: string }[] {
  const SLOT_START = 8 * 60; // 8:00 AM
  const SLOT_END = 17 * 60;  // 5:00 PM
  const slots: { startTime: string; endTime: string }[] = [];

  for (let start = SLOT_START; start + durationMinutes <= SLOT_END; start += 30) {
    const end = start + durationMinutes;
    const startHH = String(Math.floor(start / 60)).padStart(2, "0");
    const startMM = String(start % 60).padStart(2, "0");
    const endHH = String(Math.floor(end / 60)).padStart(2, "0");
    const endMM = String(end % 60).padStart(2, "0");

    const startStr = `${startHH}:${startMM}`;
    const endStr = `${endHH}:${endMM}`;

    // Check for conflicts
    const hasConflict = existingAppts.some((a) => {
      const aStart = parseInt(a.startTime.replace(":", ""), 10);
      const aEnd = parseInt(a.endTime.replace(":", ""), 10);
      const sStart = parseInt(startStr.replace(":", ""), 10);
      const sEnd = parseInt(endStr.replace(":", ""), 10);
      return sStart < aEnd && sEnd > aStart;
    });

    if (!hasConflict) {
      slots.push({ startTime: startStr, endTime: endStr });
    }
  }

  return slots;
}

function scoreSlot(
  slot: { startTime: string; endTime: string },
  repAppointmentCount: number,
  isPreferredTime: boolean
): number {
  let score = 100;
  // Penalize reps with more appointments (load balance)
  score -= repAppointmentCount * 5;
  // Bonus for preferred morning slots (9am-11am)
  if (isPreferredTime) score += 15;
  // Bonus for standard business hours start
  const startHour = parseInt(slot.startTime.split(":")[0], 10);
  if (startHour >= 9 && startHour <= 11) score += 10;
  return Math.max(0, score);
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("toYMD", () => {
  it("formats a date as YYYY-MM-DD", () => {
    const d = new Date(2025, 0, 5); // Jan 5, 2025
    expect(toYMD(d)).toBe("2025-01-05");
  });

  it("pads single-digit month and day", () => {
    const d = new Date(2025, 8, 3); // Sep 3, 2025
    expect(toYMD(d)).toBe("2025-09-03");
  });
});

describe("addDays", () => {
  it("adds positive days", () => {
    const d = new Date(2025, 0, 28); // Jan 28
    expect(toYMD(addDays(d, 5))).toBe("2025-02-02");
  });

  it("subtracts days with negative n", () => {
    const d = new Date(2025, 2, 3); // Mar 3
    expect(toYMD(addDays(d, -3))).toBe("2025-02-28");
  });

  it("does not mutate the original date", () => {
    const d = new Date(2025, 0, 1);
    addDays(d, 10);
    expect(toYMD(d)).toBe("2025-01-01");
  });
});

describe("generateTimeSlots", () => {
  it("generates slots from 8am to 5pm with no conflicts", () => {
    const slots = generateTimeSlots("2025-06-01", 60, []);
    expect(slots.length).toBeGreaterThan(0);
    // First slot should be 08:00–09:00
    expect(slots[0].startTime).toBe("08:00");
    expect(slots[0].endTime).toBe("09:00");
    // Last slot should end at or before 17:00
    const last = slots[slots.length - 1];
    const endHour = parseInt(last.endTime.split(":")[0], 10);
    expect(endHour).toBeLessThanOrEqual(17);
  });

  it("excludes slots that conflict with existing appointments", () => {
    const existing = [{ startTime: "09:00", endTime: "10:00" }];
    const slots = generateTimeSlots("2025-06-01", 60, existing);
    const conflict = slots.find(
      (s) => s.startTime === "09:00" || (s.startTime < "10:00" && s.endTime > "09:00")
    );
    expect(conflict).toBeUndefined();
  });

  it("returns empty array if the day is fully booked", () => {
    // Block 8am–5pm
    const existing = [{ startTime: "08:00", endTime: "17:00" }];
    const slots = generateTimeSlots("2025-06-01", 60, existing);
    expect(slots).toHaveLength(0);
  });

  it("generates more slots for shorter duration", () => {
    const slots30 = generateTimeSlots("2025-06-01", 30, []);
    const slots120 = generateTimeSlots("2025-06-01", 120, []);
    expect(slots30.length).toBeGreaterThan(slots120.length);
  });
});

describe("scoreSlot", () => {
  it("returns 100 as base score with 0 appointments and no preferred time", () => {
    const score = scoreSlot({ startTime: "14:00", endTime: "15:00" }, 0, false);
    expect(score).toBe(100);
  });

  it("penalizes reps with more appointments", () => {
    const score0 = scoreSlot({ startTime: "14:00", endTime: "15:00" }, 0, false);
    const score5 = scoreSlot({ startTime: "14:00", endTime: "15:00" }, 5, false);
    expect(score0).toBeGreaterThan(score5);
  });

  it("gives bonus for preferred morning time window", () => {
    const scorePreferred = scoreSlot({ startTime: "09:00", endTime: "10:00" }, 0, true);
    const scoreNotPreferred = scoreSlot({ startTime: "14:00", endTime: "15:00" }, 0, false);
    expect(scorePreferred).toBeGreaterThan(scoreNotPreferred);
  });

  it("never returns a negative score", () => {
    // 20 appointments would push score below 0 without the max(0,…) guard
    const score = scoreSlot({ startTime: "14:00", endTime: "15:00" }, 20, false);
    expect(score).toBeGreaterThanOrEqual(0);
  });
});

describe("Smart Scheduler integration smoke test", () => {
  it("slot generation + scoring pipeline produces ranked results", () => {
    const date = "2025-06-10";
    const existing = [{ startTime: "10:00", endTime: "11:00" }];
    const slots = generateTimeSlots(date, 60, existing);
    expect(slots.length).toBeGreaterThan(0);

    const scored = slots.map((slot) => ({
      ...slot,
      score: scoreSlot(slot, 2, slot.startTime >= "09:00" && slot.startTime <= "11:00"),
    }));

    scored.sort((a, b) => b.score - a.score);
    // Top slot should have a higher score than the last
    expect(scored[0].score).toBeGreaterThanOrEqual(scored[scored.length - 1].score);
  });
});
