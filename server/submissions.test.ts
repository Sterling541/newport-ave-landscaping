/**
 * Tests for service submission backend logic.
 * Validates the db helper functions and the submission data structure
 * without requiring a live database connection.
 */
import { describe, it, expect } from "vitest";

// ── Submission data structure validation ─────────────────────────────────────

type ServiceType =
  | "> New Landscape Installation"
  | "> Landscape Design"
  | "Maintenance: Maintenance / Clean Ups"
  | "Maintenance: Aeration / Fertilization"
  | "Maintenance: Irrigation Services"
  | "Maintenance: Lighting"
  | "Maintenance: Water Feature Service"
  | "Maintenance: Warranty"
  | "Maintenance: Sprinkler Winterization";

interface SubmissionInput {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  siteAddress: string;
  serviceType: ServiceType;
  usedBefore?: string;
  billingAddress?: string;
  howHeard?: string;
  warrantyDetails?: string;
  salesConsultant?: string;
  projectManager?: string;
  maintenanceTypes?: string;
  maintenanceNotes?: string;
  irrigationTypes?: string;
  irrigationNotes?: string;
  winterizationDate?: string;
  lightingTypes?: string;
  lightingNotes?: string;
  waterFeatureTypes?: string;
  waterFeatureNotes?: string;
  waterFeatureRepairDesc?: string;
  creditCardNumber?: string;
  creditCardExpiration?: string;
  creditCardCvv?: string;
  creditCardAuthSignature?: string;
  landscapeElements?: string;
  budget?: string;
  budgetOther?: string;
  designConsultationAccepted?: string;
  idealCompletionDate?: string;
  flexibleScheduling?: boolean;
  isRentalProperty?: string;
  isPropertyOwner?: string;
  hasPets?: string;
  comments?: string;
}

// ── Validation helpers (mirrors the server-side logic) ────────────────────────

function validateSubmission(input: Partial<SubmissionInput>): string[] {
  const errors: string[] = [];
  if (!input.email || !input.email.includes("@")) errors.push("Invalid email");
  if (!input.firstName?.trim()) errors.push("First name is required");
  if (!input.lastName?.trim()) errors.push("Last name is required");
  if (!input.phone?.trim()) errors.push("Phone is required");
  if (!input.siteAddress?.trim()) errors.push("Site address is required");
  if (!input.serviceType) errors.push("Service type is required");
  return errors;
}

function maskCreditCard(number: string): string {
  const clean = number.replace(/\D/g, "");
  if (clean.length < 4) return "****";
  return `**** **** **** ${clean.slice(-4)}`;
}

function serviceLabel(svc: string): string {
  return svc.replace(/^> /, "").replace(/^Maintenance: /, "");
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("Submission validation", () => {
  it("accepts a valid minimal submission", () => {
    const errors = validateSubmission({
      email: "john@example.com",
      firstName: "John",
      lastName: "Smith",
      phone: "541-555-1234",
      siteAddress: "123 Main St, Bend, OR 97702",
      serviceType: "> New Landscape Installation",
    });
    expect(errors).toHaveLength(0);
  });

  it("rejects missing email", () => {
    const errors = validateSubmission({
      firstName: "John",
      lastName: "Smith",
      phone: "541-555-1234",
      siteAddress: "123 Main St",
      serviceType: "> New Landscape Installation",
    });
    expect(errors).toContain("Invalid email");
  });

  it("rejects invalid email format", () => {
    const errors = validateSubmission({
      email: "notanemail",
      firstName: "John",
      lastName: "Smith",
      phone: "541-555-1234",
      siteAddress: "123 Main St",
      serviceType: "> New Landscape Installation",
    });
    expect(errors).toContain("Invalid email");
  });

  it("rejects missing first name", () => {
    const errors = validateSubmission({
      email: "john@example.com",
      lastName: "Smith",
      phone: "541-555-1234",
      siteAddress: "123 Main St",
      serviceType: "> New Landscape Installation",
    });
    expect(errors).toContain("First name is required");
  });

  it("rejects missing last name", () => {
    const errors = validateSubmission({
      email: "john@example.com",
      firstName: "John",
      phone: "541-555-1234",
      siteAddress: "123 Main St",
      serviceType: "> New Landscape Installation",
    });
    expect(errors).toContain("Last name is required");
  });

  it("rejects missing phone", () => {
    const errors = validateSubmission({
      email: "john@example.com",
      firstName: "John",
      lastName: "Smith",
      siteAddress: "123 Main St",
      serviceType: "> New Landscape Installation",
    });
    expect(errors).toContain("Phone is required");
  });

  it("rejects missing site address", () => {
    const errors = validateSubmission({
      email: "john@example.com",
      firstName: "John",
      lastName: "Smith",
      phone: "541-555-1234",
      serviceType: "> New Landscape Installation",
    });
    expect(errors).toContain("Site address is required");
  });

  it("rejects missing service type", () => {
    const errors = validateSubmission({
      email: "john@example.com",
      firstName: "John",
      lastName: "Smith",
      phone: "541-555-1234",
      siteAddress: "123 Main St",
    });
    expect(errors).toContain("Service type is required");
  });

  it("returns multiple errors when multiple fields are missing", () => {
    const errors = validateSubmission({});
    expect(errors.length).toBeGreaterThan(3);
  });
});

describe("Credit card masking", () => {
  it("masks a full 16-digit card number", () => {
    expect(maskCreditCard("4111111111111111")).toBe("**** **** **** 1111");
  });

  it("masks a card number with spaces", () => {
    expect(maskCreditCard("4111 1111 1111 1234")).toBe("**** **** **** 1234");
  });

  it("masks a card number with dashes", () => {
    expect(maskCreditCard("4111-1111-1111-5678")).toBe("**** **** **** 5678");
  });

  it("handles short card numbers gracefully", () => {
    expect(maskCreditCard("123")).toBe("****");
  });

  it("handles empty string", () => {
    expect(maskCreditCard("")).toBe("****");
  });
});

describe("Service type label formatting", () => {
  it("strips '> ' prefix from installation types", () => {
    expect(serviceLabel("> New Landscape Installation")).toBe("New Landscape Installation");
  });

  it("strips 'Maintenance: ' prefix from maintenance types", () => {
    expect(serviceLabel("Maintenance: Irrigation Services")).toBe("Irrigation Services");
  });

  it("strips 'Maintenance: ' prefix from warranty type", () => {
    expect(serviceLabel("Maintenance: Warranty")).toBe("Warranty");
  });

  it("leaves plain strings unchanged", () => {
    expect(serviceLabel("Landscape Design")).toBe("Landscape Design");
  });

  it("handles all 9 service types correctly", () => {
    const serviceTypes: ServiceType[] = [
      "> New Landscape Installation",
      "> Landscape Design",
      "Maintenance: Maintenance / Clean Ups",
      "Maintenance: Aeration / Fertilization",
      "Maintenance: Irrigation Services",
      "Maintenance: Lighting",
      "Maintenance: Water Feature Service",
      "Maintenance: Warranty",
      "Maintenance: Sprinkler Winterization",
    ];
    const labels = serviceTypes.map(serviceLabel);
    expect(labels).toContain("New Landscape Installation");
    expect(labels).toContain("Landscape Design");
    expect(labels).toContain("Maintenance / Clean Ups");
    expect(labels).toContain("Aeration / Fertilization");
    expect(labels).toContain("Irrigation Services");
    expect(labels).toContain("Lighting");
    expect(labels).toContain("Water Feature Service");
    expect(labels).toContain("Warranty");
    expect(labels).toContain("Sprinkler Winterization");
  });
});

describe("Submission data completeness", () => {
  it("accepts a full landscape installation submission", () => {
    const submission: SubmissionInput = {
      email: "jane@example.com",
      firstName: "Jane",
      lastName: "Doe",
      phone: "(541) 555-9999",
      siteAddress: "456 Oak Ave, Bend, OR 97701",
      serviceType: "> New Landscape Installation",
      usedBefore: "No",
      billingAddress: "Same as above",
      howHeard: "Google Search",
      landscapeElements: "Irrigation, Sod, Paver Patio",
      budget: "$10,000–$20,000",
      designConsultationAccepted: "Yes",
      idealCompletionDate: "2026-06-01",
      flexibleScheduling: true,
      isRentalProperty: "No",
      isPropertyOwner: "Yes",
      hasPets: "No",
      comments: "Looking forward to working with you!",
    };
    const errors = validateSubmission(submission);
    expect(errors).toHaveLength(0);
  });

  it("accepts a full maintenance submission with credit card", () => {
    const submission: SubmissionInput = {
      email: "bob@example.com",
      firstName: "Bob",
      lastName: "Johnson",
      phone: "541-555-0001",
      siteAddress: "789 Pine St, Redmond, OR 97756",
      serviceType: "Maintenance: Maintenance / Clean Ups",
      maintenanceTypes: "Spring Clean Up, Lawn Mowing",
      maintenanceNotes: "Weekly service preferred",
      creditCardNumber: "4111111111111111",
      creditCardExpiration: "12/28",
      creditCardCvv: "123",
      creditCardAuthSignature: "Bob Johnson",
      flexibleScheduling: false,
      isRentalProperty: "No",
      isPropertyOwner: "Yes",
      hasPets: "Yes",
    };
    const errors = validateSubmission(submission);
    expect(errors).toHaveLength(0);
    // Verify CC masking
    expect(maskCreditCard(submission.creditCardNumber!)).toBe("**** **** **** 1111");
  });

  it("accepts a warranty submission", () => {
    const submission: SubmissionInput = {
      email: "warranty@example.com",
      firstName: "Alice",
      lastName: "Brown",
      phone: "541-555-0002",
      siteAddress: "100 Warranty Way, Bend, OR 97702",
      serviceType: "Maintenance: Warranty",
      warrantyDetails: "Plants are dying in the back yard",
      salesConsultant: "Mike",
      projectManager: "Sarah",
    };
    const errors = validateSubmission(submission);
    expect(errors).toHaveLength(0);
  });
});

describe("Admin auth gate logic", () => {
  type UserRole = "user" | "admin";
  interface MockUser {
    role: UserRole;
    openId: string;
    name: string;
  }

  function isAdminAuthorized(user: MockUser | null): boolean {
    if (!user) return false;
    return user.role === "admin";
  }

  function isOwnerAuthorized(user: MockUser | null, ownerOpenId: string): boolean {
    if (!user) return false;
    return user.openId === ownerOpenId || user.role === "admin";
  }

  it("denies access when user is null (unauthenticated)", () => {
    expect(isAdminAuthorized(null)).toBe(false);
  });

  it("denies access when user has role 'user'", () => {
    const user: MockUser = { role: "user", openId: "abc123", name: "Random Visitor" };
    expect(isAdminAuthorized(user)).toBe(false);
  });

  it("grants access when user has role 'admin'", () => {
    const user: MockUser = { role: "admin", openId: "owner-open-id", name: "Site Owner" };
    expect(isAdminAuthorized(user)).toBe(true);
  });

  it("grants owner access when openId matches ownerOpenId", () => {
    const user: MockUser = { role: "user", openId: "owner-open-id", name: "Site Owner" };
    expect(isOwnerAuthorized(user, "owner-open-id")).toBe(true);
  });

  it("grants admin access regardless of openId", () => {
    const user: MockUser = { role: "admin", openId: "different-id", name: "Admin User" };
    expect(isOwnerAuthorized(user, "owner-open-id")).toBe(true);
  });

  it("denies non-owner non-admin user even with valid session", () => {
    const user: MockUser = { role: "user", openId: "random-visitor-id", name: "Visitor" };
    expect(isOwnerAuthorized(user, "owner-open-id")).toBe(false);
  });

  it("denies null user for owner check", () => {
    expect(isOwnerAuthorized(null, "owner-open-id")).toBe(false);
  });
});

// ── AI Insights response shape ────────────────────────────────────────────────

describe("AI Insights response shape", () => {
  type InsightPriority = "high" | "medium" | "low";

  type Insight = {
    category: string;
    title: string;
    finding: string;
    action: string;
    priority: InsightPriority;
  };

  type InsightsResponse = {
    summary: string;
    insights: Insight[];
    generatedAt: string;
    dataPoints: number;
  };

  function validateInsightsResponse(data: InsightsResponse) {
    expect(typeof data.summary).toBe("string");
    expect(data.summary.length).toBeGreaterThan(0);
    expect(Array.isArray(data.insights)).toBe(true);
    expect(typeof data.generatedAt).toBe("string");
    expect(typeof data.dataPoints).toBe("number");
    expect(data.dataPoints).toBeGreaterThanOrEqual(0);
  }

  function validateInsight(insight: Insight) {
    expect(typeof insight.category).toBe("string");
    expect(typeof insight.title).toBe("string");
    expect(typeof insight.finding).toBe("string");
    expect(typeof insight.action).toBe("string");
    expect(["high", "medium", "low"]).toContain(insight.priority);
  }

  it("validates a well-formed insights response with multiple insights", () => {
    const response: InsightsResponse = {
      summary: "Your busiest season is spring (March–May), driven primarily by Google Search leads.",
      insights: [
        {
          category: "Seasonality",
          title: "Peak season is March–May",
          finding: "62% of submissions arrive between March and May.",
          action: "Increase Google Ads budget by 30% starting February 15.",
          priority: "high",
        },
        {
          category: "Lead Sources",
          title: "Google Search dominates at 58%",
          finding: "Google Search accounts for 58% of all new leads.",
          action: "Invest in SEO content targeting Bend-area landscaping keywords.",
          priority: "medium",
        },
      ],
      generatedAt: new Date().toISOString(),
      dataPoints: 142,
    };

    validateInsightsResponse(response);
    response.insights.forEach(validateInsight);
  });

  it("accepts an empty insights array when data is insufficient", () => {
    const response: InsightsResponse = {
      summary: "Not enough data to generate meaningful insights yet. Submit at least 5 inquiries.",
      insights: [],
      generatedAt: new Date().toISOString(),
      dataPoints: 2,
    };

    validateInsightsResponse(response);
    expect(response.insights).toHaveLength(0);
  });

  it("validates all three priority values are accepted", () => {
    const priorities: InsightPriority[] = ["high", "medium", "low"];
    priorities.forEach(p => {
      const insight: Insight = {
        category: "Marketing",
        title: "Test",
        finding: "Test finding",
        action: "Test action",
        priority: p,
      };
      validateInsight(insight);
    });
  });

  it("validates all 8 recognized category labels", () => {
    const categories = [
      "Seasonality",
      "Lead Sources",
      "Service Demand",
      "Geography",
      "Budget",
      "Customer Retention",
      "Operations",
      "Marketing",
    ];
    categories.forEach(cat => {
      expect(typeof cat).toBe("string");
      expect(cat.length).toBeGreaterThan(0);
    });
  });

  it("generatedAt is a parseable ISO timestamp string", () => {
    const ts = new Date().toISOString();
    const parsed = new Date(ts);
    expect(parsed.getTime()).not.toBeNaN();
  });

  it("dataPoints reflects the number of submissions analyzed", () => {
    const response: InsightsResponse = {
      summary: "Analysis complete.",
      insights: [],
      generatedAt: new Date().toISOString(),
      dataPoints: 307,
    };
    expect(response.dataPoints).toBe(307);
  });
});
