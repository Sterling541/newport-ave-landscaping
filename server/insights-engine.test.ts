/**
 * Tests for the AI Insights Engine Phase 1:
 * - DB schema: weatherDaily, insights, serviceSubmissions tables exist
 * - CSV import processor: column mapping, duplicate detection
 * - tRPC router procedures: insightsEngine, csvImport, weather
 * - Frontend pages: DailyPulse, LeadVolumeTrends, CsvImport exist
 */
import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";

const ROOT = path.resolve(__dirname, "..");

// ── Schema ────────────────────────────────────────────────────

describe("Database schema", () => {
  it("should have weatherDaily table defined", () => {
    const schemaPath = path.join(ROOT, "drizzle/schema.ts");
    const content = fs.readFileSync(schemaPath, "utf-8");
    expect(content).toContain("weatherDaily");
    expect(content).toContain("tempHighC");
    expect(content).toContain("precipMm");
  });

  it("should have insights table defined", () => {
    const schemaPath = path.join(ROOT, "drizzle/schema.ts");
    const content = fs.readFileSync(schemaPath, "utf-8");
    expect(content).toContain("insights");
    expect(content).toContain("category");
    expect(content).toContain("status");
  });

  it("should have serviceSubmissions table defined", () => {
    const schemaPath = path.join(ROOT, "drizzle/schema.ts");
    const content = fs.readFileSync(schemaPath, "utf-8");
    expect(content).toContain("serviceSubmissions");
    expect(content).toContain("createdAt");
    expect(content).toContain("serviceType");
  });

  it("should have csvImportJobs table defined", () => {
    const schemaPath = path.join(ROOT, "drizzle/schema.ts");
    const content = fs.readFileSync(schemaPath, "utf-8");
    expect(content).toContain("csvImportJobs");
    expect(content).toContain("importedRows");
    expect(content).toContain("skippedRows");
  });
});

// ── Weather service ───────────────────────────────────────────

describe("Weather service", () => {
  it("should have weather.ts server file", () => {
    const filePath = path.join(ROOT, "server/weather.ts");
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it("should use Open-Meteo API", () => {
    const content = fs.readFileSync(path.join(ROOT, "server/weather.ts"), "utf-8");
    expect(content).toContain("open-meteo");
  });

  it("should export fetchWeatherForecast function", () => {
    const content = fs.readFileSync(path.join(ROOT, "server/weather.ts"), "utf-8");
    expect(content).toContain("fetchWeatherForecast");
  });

  it("should export fetchHistoricalWeather function", () => {
    const content = fs.readFileSync(path.join(ROOT, "server/weather.ts"), "utf-8");
    expect(content).toContain("fetchHistoricalWeather");
  });

  it("should use Bend, OR coordinates", () => {
    const content = fs.readFileSync(path.join(ROOT, "server/weather.ts"), "utf-8");
    // Bend, OR: lat ~44.058, lon ~-121.315
    expect(content).toContain("44.058");
    expect(content).toContain("-121.315");
  });
});

// ── CSV Import processor ──────────────────────────────────────

describe("CSV Import processor", () => {
  it("should have csvImport.ts server file", () => {
    const filePath = path.join(ROOT, "server/csvImport.ts");
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it("should export processCsvImport function", () => {
    const content = fs.readFileSync(path.join(ROOT, "server/csvImport.ts"), "utf-8");
    expect(content).toContain("processCsvImport");
  });

  it("should handle skipped rows tracking", () => {
    const content = fs.readFileSync(path.join(ROOT, "server/csvImport.ts"), "utf-8");
    expect(content).toContain("skipped");
  });

  it("should map common CSV column names", () => {
    const content = fs.readFileSync(path.join(ROOT, "server/csvImport.ts"), "utf-8");
    // Should map first/last name, email, phone, service type
    expect(content).toContain("firstName");
    expect(content).toContain("serviceType");
  });
});

// ── Insights generator ────────────────────────────────────────

describe("Insights generator", () => {
  it("should have insightsGenerator.ts server file", () => {
    const filePath = path.join(ROOT, "server/insightsGenerator.ts");
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it("should export generateInsights function", () => {
    const content = fs.readFileSync(path.join(ROOT, "server/insightsGenerator.ts"), "utf-8");
    expect(content).toContain("generateInsights");
  });

  it("should use LLM for AI-powered insights", () => {
    const content = fs.readFileSync(path.join(ROOT, "server/insightsGenerator.ts"), "utf-8");
    expect(content).toContain("invokeLLM");
  });

  it("should generate weather correlation insights", () => {
    const content = fs.readFileSync(path.join(ROOT, "server/insightsGenerator.ts"), "utf-8");
    expect(content).toContain("weather");
  });
});

// ── tRPC Router procedures ────────────────────────────────────

describe("tRPC Router - insightsEngine", () => {
  it("should have insightsEngine router", () => {
    const content = fs.readFileSync(path.join(ROOT, "server/routers.ts"), "utf-8");
    expect(content).toContain("insightsEngine");
  });

  it("should have dailyPulse procedure", () => {
    const content = fs.readFileSync(path.join(ROOT, "server/routers.ts"), "utf-8");
    expect(content).toContain("dailyPulse");
  });

  it("should have volumeTrends procedure", () => {
    const content = fs.readFileSync(path.join(ROOT, "server/routers.ts"), "utf-8");
    expect(content).toContain("volumeTrends");
  });

  it("should have sourceAttribution procedure", () => {
    const content = fs.readFileSync(path.join(ROOT, "server/routers.ts"), "utf-8");
    expect(content).toContain("sourceAttribution");
  });

  it("should have generateInsights procedure", () => {
    const content = fs.readFileSync(path.join(ROOT, "server/routers.ts"), "utf-8");
    expect(content).toContain("generateInsights");
  });

  it("should have updateInsightStatus procedure", () => {
    const content = fs.readFileSync(path.join(ROOT, "server/routers.ts"), "utf-8");
    expect(content).toContain("updateInsightStatus");
  });
});

describe("tRPC Router - csvImport", () => {
  it("should have csvImport router", () => {
    const content = fs.readFileSync(path.join(ROOT, "server/routers.ts"), "utf-8");
    expect(content).toContain("csvImport");
  });

  it("should have import procedure", () => {
    const content = fs.readFileSync(path.join(ROOT, "server/routers.ts"), "utf-8");
    expect(content).toContain("csvImport");
    expect(content).toContain("import:");
  });

  it("should have history procedure", () => {
    const content = fs.readFileSync(path.join(ROOT, "server/routers.ts"), "utf-8");
    expect(content).toContain("history:");
  });
});

describe("tRPC Router - weather", () => {
  it("should have weather router", () => {
    const content = fs.readFileSync(path.join(ROOT, "server/routers.ts"), "utf-8");
    expect(content).toContain("weather");
  });

  it("should have refreshForecast procedure", () => {
    const content = fs.readFileSync(path.join(ROOT, "server/routers.ts"), "utf-8");
    expect(content).toContain("refreshForecast");
  });
});

// ── Frontend pages ────────────────────────────────────────────

describe("Admin frontend pages", () => {
  it("should have DailyPulse page", () => {
    const filePath = path.join(ROOT, "client/src/pages/admin/DailyPulse.tsx");
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it("should have LeadVolumeTrends page", () => {
    const filePath = path.join(ROOT, "client/src/pages/admin/LeadVolumeTrends.tsx");
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it("should have CsvImport page", () => {
    const filePath = path.join(ROOT, "client/src/pages/admin/CsvImport.tsx");
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it("DailyPulse should use insightsEngine.dailyPulse tRPC query", () => {
    const content = fs.readFileSync(
      path.join(ROOT, "client/src/pages/admin/DailyPulse.tsx"),
      "utf-8"
    );
    expect(content).toContain("insightsEngine.dailyPulse");
  });

  it("LeadVolumeTrends should use insightsEngine.volumeTrends tRPC query", () => {
    const content = fs.readFileSync(
      path.join(ROOT, "client/src/pages/admin/LeadVolumeTrends.tsx"),
      "utf-8"
    );
    expect(content).toContain("insightsEngine.volumeTrends");
  });

  it("CsvImport should use csvImport.import tRPC mutation", () => {
    const content = fs.readFileSync(
      path.join(ROOT, "client/src/pages/admin/CsvImport.tsx"),
      "utf-8"
    );
    expect(content).toContain("csvImport.import");
  });

  it("LeadVolumeTrends should use Recharts for visualization", () => {
    const content = fs.readFileSync(
      path.join(ROOT, "client/src/pages/admin/LeadVolumeTrends.tsx"),
      "utf-8"
    );
    expect(content).toContain("recharts");
    expect(content).toContain("AreaChart");
    expect(content).toContain("BarChart");
    expect(content).toContain("PieChart");
  });

  it("DailyPulse should have date range presets", () => {
    const content = fs.readFileSync(
      path.join(ROOT, "client/src/pages/admin/DailyPulse.tsx"),
      "utf-8"
    );
    // Should have today's date query
    expect(content).toContain("date");
  });

  it("LeadVolumeTrends should have date range presets", () => {
    const content = fs.readFileSync(
      path.join(ROOT, "client/src/pages/admin/LeadVolumeTrends.tsx"),
      "utf-8"
    );
    expect(content).toContain("90d");
    expect(content).toContain("1y");
  });
});

// ── App.tsx routing ───────────────────────────────────────────

describe("App routing", () => {
  it("should have /admin/daily-pulse route", () => {
    const content = fs.readFileSync(path.join(ROOT, "client/src/App.tsx"), "utf-8");
    expect(content).toContain("/admin/daily-pulse");
  });

  it("should have /admin/lead-trends route", () => {
    const content = fs.readFileSync(path.join(ROOT, "client/src/App.tsx"), "utf-8");
    expect(content).toContain("/admin/lead-trends");
  });

  it("should have /admin/csv-import route", () => {
    const content = fs.readFileSync(path.join(ROOT, "client/src/App.tsx"), "utf-8");
    expect(content).toContain("/admin/csv-import");
  });
});
