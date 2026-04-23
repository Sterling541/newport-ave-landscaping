/**
 * AI Insights Generator for Newport Ave Landscaping.
 * Uses Claude (via invokeLLM) to analyze submission + weather data
 * and produce structured, actionable insights.
 *
 * PRIVACY: All PII (name, email, phone) is stripped before sending to Claude.
 * Only structural/categorical data is included in analysis prompts.
 */

import { invokeLLM } from "./_core/llm";
import { InsertInsight } from "../drizzle/schema";

export interface InsightData {
  // Submission stats
  yesterdayCount: number;
  avg7day: number;
  avg30day: number;
  sameWeekLastYear: number;
  totalThisMonth: number;
  totalLastMonth: number;
  serviceTypeCounts: Record<string, number>;
  sourceCounts: Record<string, number>;
  budgetCounts: Record<string, number>;
  dayOfWeekCounts: Record<string, number>;
  hourCounts: Record<string, number>;
  // Weather
  yesterdayWeather?: {
    tempHighF: number;
    tempLowF: number;
    precipMm: number;
    snowMm: number;
    description: string;
  };
  forecastNext7?: Array<{
    date: string;
    tempHighF: number;
    tempLowF: number;
    precipMm: number;
    snowMm: number;
    description: string;
  }>;
  // Anomalies
  zeroSubmissionDaysThisMonth: number;
  maxDailyCountThisMonth: number;
}

interface StructuredInsight {
  category: string;
  priority: "critical" | "high" | "medium" | "low";
  title: string;
  observation: string;
  dataPoints: string;
  recommendedAction: string;
  confidence: number;
}

/**
 * Generate AI insights from aggregated (PII-free) data.
 * Returns an array of InsertInsight objects ready to save to DB.
 */
export async function generateInsights(data: InsightData): Promise<InsertInsight[]> {
  const today = new Date();
  const periodStart = new Date(today);
  periodStart.setDate(today.getDate() - 30);

  const prompt = buildInsightPrompt(data);

  let rawResponse: string;
  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `You are a sharp business analyst for Newport Avenue Landscaping, a premium landscaping company in Bend, Oregon (~$13M revenue, 110 employees). You analyze lead inquiry data and weather to produce specific, actionable insights. You never hedge unnecessarily. You speak directly to the business owner (Sterling). You always cite the specific numbers behind your observations. Return ONLY valid JSON — no markdown, no explanation.`,
        },
        { role: "user", content: prompt },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "insights_array",
          strict: true,
          schema: {
            type: "object",
            properties: {
              insights: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    category: { type: "string", description: "volume | weather | source | budget | anomaly | advertising | messaging | sales | competitive" },
                    priority: { type: "string", description: "critical | high | medium | low" },
                    title: { type: "string", description: "Short, specific title (max 80 chars)" },
                    observation: { type: "string", description: "What the data shows — specific numbers, no fluff" },
                    dataPoints: { type: "string", description: "JSON string of the key data points used" },
                    recommendedAction: { type: "string", description: "Specific, actionable recommendation" },
                    confidence: { type: "number", description: "0.0 to 1.0 — be honest about uncertainty" },
                  },
                  required: ["category", "priority", "title", "observation", "dataPoints", "recommendedAction", "confidence"],
                  additionalProperties: false,
                },
              },
            },
            required: ["insights"],
            additionalProperties: false,
          },
        },
      },
    });

    rawResponse = (rawResponse = (response as { choices: { message: { content: string } }[] }).choices[0]?.message?.content ?? "{}");
  } catch (err) {
    console.error("[InsightsGenerator] LLM call failed:", err);
    return [];
  }

  try {
    const parsed = JSON.parse(rawResponse) as { insights: StructuredInsight[] };
    const insightRows = (parsed.insights ?? []).map((ins): InsertInsight => ({
      category: ins.category,
      priority: (["critical", "high", "medium", "low"].includes(ins.priority) ? ins.priority : "medium") as InsertInsight["priority"],
      title: ins.title.slice(0, 255),
      observation: ins.observation,
      dataPoints: ins.dataPoints,
      recommendedAction: ins.recommendedAction,
      confidence: Math.min(1, Math.max(0, ins.confidence)),
      status: "active",
      periodStart: periodStart,
      periodEnd: today,
    }));
    return insightRows;
  } catch (err) {
    console.error("[InsightsGenerator] Failed to parse LLM response:", err, rawResponse);
    return [];
  }
}

function buildInsightPrompt(data: InsightData): string {
  const weatherSummary = data.yesterdayWeather
    ? `Yesterday's weather: High ${data.yesterdayWeather.tempHighF}°F, Low ${data.yesterdayWeather.tempLowF}°F, Precip ${data.yesterdayWeather.precipMm}mm, Snow ${data.yesterdayWeather.snowMm}mm (${data.yesterdayWeather.description})`
    : "No weather data for yesterday.";

  const forecastSummary = data.forecastNext7
    ? `7-day forecast: ${data.forecastNext7.map(f => `${f.date}: High ${f.tempHighF}°F, ${f.description}`).join(" | ")}`
    : "No forecast data available.";

  return `
Analyze this Newport Avenue Landscaping lead inquiry data and generate 4–8 specific, actionable insights.

## Submission Volume
- Yesterday: ${data.yesterdayCount} submissions
- 7-day rolling average: ${data.avg7day.toFixed(1)}/day
- 30-day rolling average: ${data.avg30day.toFixed(1)}/day
- Same week last year: ${data.sameWeekLastYear} total
- This month total: ${data.totalThisMonth}
- Last month total: ${data.totalLastMonth}
- Zero-submission days this month: ${data.zeroSubmissionDaysThisMonth}
- Peak day this month: ${data.maxDailyCountThisMonth} submissions

## Service Type Breakdown (this month)
${JSON.stringify(data.serviceTypeCounts, null, 2)}

## Lead Source Breakdown (this month)
${JSON.stringify(data.sourceCounts, null, 2)}

## Budget Distribution (this month)
${JSON.stringify(data.budgetCounts, null, 2)}

## Day-of-Week Pattern (this month)
${JSON.stringify(data.dayOfWeekCounts, null, 2)}

## Hour-of-Day Pattern (this month)
${JSON.stringify(data.hourCounts, null, 2)}

## Weather Context
${weatherSummary}
${forecastSummary}

## Context
- Business: Newport Avenue Landscaping, Bend OR, ~$13M revenue
- Sales team: Will and Nathan (design-build), Ryan (commercial), Paul (business development)
- Normal lead volume: 350–400/year (roughly 1/day average)
- Google is ~60% of leads, referrals ~20%
- Premium leads are $35K+ budget, commercial, or design-build

Generate insights covering: volume trends, weather correlation, source quality, budget mix, anomalies, and any operational flags. Be specific with numbers. Include a confidence score based on sample size.
`.trim();
}

/**
 * Generate a daily pulse AI summary paragraph.
 * This is the narrative text shown at the top of the Daily Pulse dashboard.
 */
export async function generateDailyPulseSummary(data: InsightData): Promise<string> {
  const prompt = `
Write a 2–3 sentence morning briefing for Sterling (owner of Newport Avenue Landscaping, Bend OR).
Be direct, specific, and business-focused. No fluff.

Data:
- Yesterday: ${data.yesterdayCount} submissions (7-day avg: ${data.avg7day.toFixed(1)}/day, 30-day avg: ${data.avg30day.toFixed(1)}/day)
- Same week last year: ${data.sameWeekLastYear} total
- Yesterday's weather: ${data.yesterdayWeather ? `High ${data.yesterdayWeather.tempHighF}°F, ${data.yesterdayWeather.description}` : "No data"}
- Today's forecast: ${data.forecastNext7?.[0] ? `High ${data.forecastNext7[0].tempHighF}°F, ${data.forecastNext7[0].description}` : "No data"}
- Top service this month: ${Object.entries(data.serviceTypeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "N/A"}

Example tone: "Yesterday you received 4 inquiries, down from the 6/day average. Weather was clear and 72°F — conditions typically associated with higher volume. Worth checking if the Google ad campaign ran."
`.trim();

  try {
    const response = await invokeLLM({
      messages: [
        { role: "system", content: "You are a sharp business analyst writing a morning briefing. Be direct and specific. 2–3 sentences max." },
        { role: "user", content: prompt },
      ],
    });
    return (response as { choices: { message: { content: string } }[] }).choices[0]?.message?.content ?? "No summary available.";
  } catch (err) {
    console.error("[InsightsGenerator] Daily pulse summary failed:", err);
    return "Unable to generate AI summary at this time.";
  }
}
