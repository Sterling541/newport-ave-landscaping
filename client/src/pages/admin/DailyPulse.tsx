/* ============================================================
   DAILY PULSE — View 1
   Morning briefing: yesterday's volume, weather, AI summary,
   active insights, and 7-day forecast.
   ============================================================ */

import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp, TrendingDown, Minus, Cloud, Snowflake, Droplets, Wind,
  Sparkles, RefreshCw, CheckCheck, BellOff, Star, X, ChevronRight,
  Thermometer, Calendar, BarChart2, Zap, DollarSign, Brain, Lightbulb,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { toast } from "sonner";

// ── Helpers ──────────────────────────────────────────────────────────────────

function trendIcon(current: number, baseline: number) {
  const diff = current - baseline;
  const pct = baseline > 0 ? (diff / baseline) * 100 : 0;
  if (pct > 10) return <TrendingUp className="w-4 h-4 text-emerald-500" />;
  if (pct < -10) return <TrendingDown className="w-4 h-4 text-red-500" />;
  return <Minus className="w-4 h-4 text-slate-400" />;
}

function trendBadge(current: number, baseline: number, label: string) {
  if (baseline === 0) return null;
  const pct = ((current - baseline) / baseline) * 100;
  const sign = pct >= 0 ? "+" : "";
  const color = pct > 10 ? "text-emerald-700 bg-emerald-50" : pct < -10 ? "text-red-700 bg-red-50" : "text-slate-600 bg-slate-100";
  return (
    <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${color}`}>
      {sign}{pct.toFixed(0)}% vs {label}
    </span>
  );
}

function weatherIcon(code: number, size = "w-6 h-6") {
  if (code === 0) return <span className={`${size} flex items-center justify-center text-xl`}>☀️</span>;
  if (code <= 2) return <span className={`${size} flex items-center justify-center text-xl`}>🌤️</span>;
  if (code === 3) return <span className={`${size} flex items-center justify-center text-xl`}>☁️</span>;
  if (code <= 48) return <span className={`${size} flex items-center justify-center text-xl`}>🌫️</span>;
  if (code <= 67) return <span className={`${size} flex items-center justify-center text-xl`}>🌧️</span>;
  if (code <= 77) return <span className={`${size} flex items-center justify-center text-xl`}>❄️</span>;
  if (code <= 82) return <span className={`${size} flex items-center justify-center text-xl`}>🌦️</span>;
  if (code <= 86) return <span className={`${size} flex items-center justify-center text-xl`}>🌨️</span>;
  return <span className={`${size} flex items-center justify-center text-xl`}>⛈️</span>;
}

function priorityColor(priority: string) {
  switch (priority) {
    case "critical": return "border-l-red-500 bg-red-50";
    case "high": return "border-l-amber-500 bg-amber-50";
    case "medium": return "border-l-blue-500 bg-blue-50";
    default: return "border-l-slate-300 bg-slate-50";
  }
}

function priorityBadge(priority: string) {
  const map: Record<string, string> = {
    critical: "bg-red-100 text-red-800",
    high: "bg-amber-100 text-amber-800",
    medium: "bg-blue-100 text-blue-800",
    low: "bg-slate-100 text-slate-600",
  };
  return <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${map[priority] ?? map.low}`}>{priority}</span>;
}

// ── Main Component ────────────────────────────────────────────────────────────

// ── Budget band options ─────────────────────────────────────────────────────
const BUDGET_BANDS_UI = [
  { key: "all",          label: "All Budgets" },
  { key: "under_7500",   label: "Under $7,500" },
  { key: "7500_15000",   label: "$7,500–$15K" },
  { key: "15000_25000",  label: "$15K–$25K" },
  { key: "25000_60000",  label: "$25K–$60K" },
  { key: "60000_plus",   label: "$60K+" },
  { key: "other",        label: "Other / Custom" },
];

// ── Inquiry type options ─────────────────────────────────────────────────────
const INQUIRY_TYPES = [
  { value: "all", label: "All Inquiries", color: "bg-slate-700 text-white" },
  { value: "Landscape Design", label: "Design", color: "bg-emerald-700 text-white" },
  { value: "New Landscape Installation", label: "Installation", color: "bg-blue-700 text-white" },
  { value: "Enhancements", label: "Enhancements", color: "bg-amber-600 text-white" },
  { value: "Lighting", label: "Lighting", color: "bg-yellow-600 text-white" },
  { value: "Irrigation", label: "Irrigation", color: "bg-cyan-700 text-white" },
];

export default function DailyPulse() {
  const [refreshingWeather, setRefreshingWeather] = useState(false);
  const [generatingInsights, setGeneratingInsights] = useState(false);
  const [generatingBudgetAI, setGeneratingBudgetAI] = useState(false);
  const [budgetAiResult, setBudgetAiResult] = useState<null | {
    insights: Array<{ title: string; finding: string; action: string; priority: string }>;
    summary: string;
  }>(null);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedBudget, setSelectedBudget] = useState("all");

  const pulseQuery = trpc.insightsEngine.dailyPulse.useQuery(
    { serviceType: selectedType },
    { refetchInterval: 5 * 60 * 1000 }
  );

  const budgetInsightsQuery = trpc.insightsEngine.budgetInsights.useQuery(
    { budgetKey: selectedBudget },
  );
  const budgetTrendQuery = trpc.insightsEngine.budgetTrend.useQuery();
  const generateBudgetInsightsMutation = trpc.insightsEngine.generateBudgetInsights.useMutation();

  const refreshWeatherMutation = trpc.weather.refreshForecast.useMutation();
  const generateInsightsMutation = trpc.insightsEngine.generateInsights.useMutation();
  const updateInsightMutation = trpc.insightsEngine.updateInsightStatus.useMutation();

  const data = pulseQuery.data;

  const handleRefreshWeather = async () => {
    setRefreshingWeather(true);
    try {
      const result = await refreshWeatherMutation.mutateAsync();
      toast.success(`Weather updated: ${result.count} days loaded`);
      pulseQuery.refetch();
    } catch (err) {
      toast.error(`Weather refresh failed: ${String(err)}`);
    } finally {
      setRefreshingWeather(false);
    }
  };

  const handleGenerateInsights = async () => {
    setGeneratingInsights(true);
    try {
      const result = await generateInsightsMutation.mutateAsync({ serviceType: selectedType });
      toast.success(`Generated ${result.count} new insights`);
      pulseQuery.refetch();
    } catch (err) {
      toast.error(`Insight generation failed: ${String(err)}`);
    } finally {
      setGeneratingInsights(false);
    }
  };

  const handleGenerateBudgetAI = async () => {
    setGeneratingBudgetAI(true);
    try {
      const result = await generateBudgetInsightsMutation.mutateAsync({});
      setBudgetAiResult(result);
      toast.success("Budget insights generated");
    } catch (err) {
      toast.error(`Failed: ${String(err)}`);
    } finally {
      setGeneratingBudgetAI(false);
    }
  };

  const handleInsightAction = async (id: number, status: "read" | "snoozed" | "valuable" | "dismissed") => {
    await updateInsightMutation.mutateAsync({ id, status });
    pulseQuery.refetch();
  };

  // ── Loading state ─────────────────────────────────────────────────────────

  if (pulseQuery.isLoading) {
    return (
      <AdminLayout>
      <div className="min-h-screen bg-[oklch(0.97_0.005_120)] p-6 flex items-center justify-center">
        <div className="text-center space-y-3">
          <RefreshCw className="w-8 h-8 animate-spin text-emerald-600 mx-auto" />
          <p className="text-slate-500">Loading Daily Pulse…</p>
        </div>
      </div>
      </AdminLayout>
    );
  }

  if (pulseQuery.error) {
    return (
      <AdminLayout>
      <div className="min-h-screen bg-[oklch(0.97_0.005_120)] p-6 flex items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-red-600 font-medium">Failed to load Daily Pulse</p>
          <p className="text-slate-500 text-sm">{pulseQuery.error.message}</p>
          <Button onClick={() => pulseQuery.refetch()} variant="outline" size="sm">Retry</Button>
        </div>
      </div>
      </AdminLayout>
    );
  }

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayLabel = yesterday.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <AdminLayout>
    <div className="min-h-screen bg-[oklch(0.97_0.005_120)] p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[oklch(0.25_0.05_150)]">Daily Pulse</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              {today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefreshWeather}
              disabled={refreshingWeather}
              className="text-xs"
            >
              <Cloud className={`w-3.5 h-3.5 mr-1.5 ${refreshingWeather ? "animate-pulse" : ""}`} />
              {refreshingWeather ? "Updating…" : "Refresh Weather"}
            </Button>
            <Button
              size="sm"
              onClick={handleGenerateInsights}
              disabled={generatingInsights}
              className="text-xs bg-[oklch(0.35_0.1_150)] hover:bg-[oklch(0.3_0.1_150)] text-white"
            >
              <Sparkles className={`w-3.5 h-3.5 mr-1.5 ${generatingInsights ? "animate-pulse" : ""}`} />
              {generatingInsights ? "Generating…" : "Generate Insights"}
            </Button>
          </div>
        </div>

        {/* Inquiry Type Filter Pills */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-medium text-slate-500 mr-1">Filter by type:</span>
          {INQUIRY_TYPES.map(t => (
            <button
              key={t.value}
              onClick={() => setSelectedType(t.value)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
                selectedType === t.value
                  ? `${t.color} border-transparent shadow-sm scale-105`
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
              }`}
            >
              {t.label}
            </button>
          ))}
          {selectedType !== "all" && (
            <span className="text-xs text-slate-400 ml-1">
              Showing data for <strong className="text-slate-600">{selectedType}</strong> only
            </span>
          )}
        </div>

        {/* AI Summary */}
        {data?.aiSummary && (
          <Card className="bg-[oklch(0.25_0.08_150)] text-white shadow-lg border-0">
            <CardContent className="p-5">
              <div className="flex gap-3">
                <Sparkles className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-1.5">AI Morning Briefing</p>
                  <p className="text-sm leading-relaxed text-slate-100">{data.aiSummary}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Volume Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Yesterday */}
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Yesterday</p>
                {data && trendIcon(data.yesterdayCount, data.avg7day)}
              </div>
              <p className="text-3xl font-bold text-[oklch(0.25_0.05_150)]">{data?.yesterdayCount ?? 0}</p>
              <p className="text-xs text-slate-400 mt-1">{yesterdayLabel}</p>
              {data && trendBadge(data.yesterdayCount, data.avg7day, "7-day avg")}
            </CardContent>
          </Card>

          {/* 7-day avg */}
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">7-Day Avg</p>
                <BarChart2 className="w-4 h-4 text-slate-300" />
              </div>
              <p className="text-3xl font-bold text-[oklch(0.25_0.05_150)]">{data?.avg7day?.toFixed(1) ?? "—"}</p>
              <p className="text-xs text-slate-400 mt-1">per day</p>
            </CardContent>
          </Card>

          {/* This month */}
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">This Month</p>
                <Calendar className="w-4 h-4 text-slate-300" />
              </div>
              <p className="text-3xl font-bold text-[oklch(0.25_0.05_150)]">{data?.totalThisMonth ?? 0}</p>
              <p className="text-xs text-slate-400 mt-1">submissions</p>
              {data && trendBadge(data.totalThisMonth, data.totalLastMonth, "last month")}
            </CardContent>
          </Card>

          {/* Same week last year */}
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Same Week LY</p>
                <TrendingUp className="w-4 h-4 text-slate-300" />
              </div>
              <p className="text-3xl font-bold text-[oklch(0.25_0.05_150)]">{data?.sameWeekLastYearTotal ?? "—"}</p>
              <p className="text-xs text-slate-400 mt-1">±3 days last year</p>
            </CardContent>
          </Card>
        </div>

        {/* Weather + Forecast */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Yesterday's weather */}
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-slate-400" />
                Yesterday's Weather
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data?.yesterdayWeather ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{weatherIcon(0, "w-10 h-10")}</div>
                    <div>
                      <p className="text-2xl font-bold text-slate-800">
                        {data.yesterdayWeather.tempHighF}° / {data.yesterdayWeather.tempLowF}°F
                      </p>
                      <p className="text-xs text-slate-500">{data.yesterdayWeather.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs text-slate-600">
                    <div className="flex items-center gap-1">
                      <Droplets className="w-3 h-3 text-blue-400" />
                      {data.yesterdayWeather.precipMm}mm
                    </div>
                    <div className="flex items-center gap-1">
                      <Snowflake className="w-3 h-3 text-blue-300" />
                      {data.yesterdayWeather.snowMm}mm snow
                    </div>
                    <div className="flex items-center gap-1">
                      <Wind className="w-3 h-3 text-slate-400" />
                      —
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-slate-400 py-2">
                  No weather data. Click "Refresh Weather" to load.
                </div>
              )}
            </CardContent>
          </Card>

          {/* 7-day forecast */}
          <Card className="bg-white shadow-sm md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Cloud className="w-4 h-4 text-slate-400" />
                7-Day Forecast — Bend, OR
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data?.forecastNext7 && data.forecastNext7.length > 0 ? (
                <div className="grid grid-cols-7 gap-1">
                  {data.forecastNext7.map((day, i) => {
                    const d = new Date(day.date + "T12:00:00");
                    const dayLabel = i === 0 ? "Today" : d.toLocaleDateString("en-US", { weekday: "short" });
                    return (
                      <div key={day.date} className={`flex flex-col items-center gap-1 p-2 rounded-lg text-center ${i === 0 ? "bg-emerald-50 border border-emerald-200" : "hover:bg-slate-50"}`}>
                        <p className="text-xs font-medium text-slate-600">{dayLabel}</p>
                        <div className="text-lg">{day.snowMm > 5 ? "❄️" : day.precipMm > 5 ? "🌧️" : day.tempHighF > 85 ? "☀️" : day.tempHighF > 65 ? "🌤️" : "☁️"}</div>
                        <p className="text-xs font-bold text-slate-800">{day.tempHighF}°</p>
                        <p className="text-xs text-slate-400">{day.tempLowF}°</p>
                        {day.precipMm > 0.5 && <p className="text-xs text-blue-500">{day.precipMm}mm</p>}
                        {day.snowMm > 0.5 && <p className="text-xs text-blue-300">{day.snowMm}mm ❄️</p>}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-sm text-slate-400 py-4 text-center">
                  No forecast data. Click "Refresh Weather" to load 14-day forecast.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Budget Range Filter + Service Popularity Panel */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <CardTitle className="text-sm font-semibold text-slate-700">Service Popularity by Budget Range</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {BUDGET_BANDS_UI.map(b => (
                <button
                  key={b.key}
                  onClick={() => setSelectedBudget(b.key)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
                    selectedBudget === b.key
                      ? "bg-emerald-700 text-white border-transparent shadow-sm scale-105"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
            {budgetInsightsQuery.isLoading ? (
              <div className="flex items-center gap-2 text-slate-400 text-sm py-4">
                <RefreshCw className="w-4 h-4 animate-spin" /> Loading…
              </div>
            ) : budgetInsightsQuery.data && budgetInsightsQuery.data.servicePopularity.length > 0 ? (
              <div className="space-y-2.5">
                <p className="text-xs text-slate-400 mb-3">
                  {budgetInsightsQuery.data.total} inquiries in{" "}
                  <strong className="text-slate-600">{budgetInsightsQuery.data.budgetLabel}</strong>
                </p>
                {budgetInsightsQuery.data.servicePopularity.map((item) => (
                  <div key={item.serviceType} className="flex items-center gap-3">
                    <div className="w-36 text-xs text-slate-600 truncate flex-shrink-0">{item.serviceType || "Unknown"}</div>
                    <div className="flex-1 bg-slate-100 rounded-full h-2.5">
                      <div
                        className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                    <div className="w-20 text-right text-xs text-slate-500 flex-shrink-0">
                      {item.count} ({item.pct}%)
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-sm py-4 text-center">No data for this budget range.</p>
            )}
          </CardContent>
        </Card>

        {/* Budget Trend Over Time Chart */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-emerald-600" />
                <CardTitle className="text-sm font-semibold text-slate-700">Budget Range Trend by Year</CardTitle>
              </div>
              <span className="text-xs text-slate-400">How your client base is shifting over time</span>
            </div>
          </CardHeader>
          <CardContent>
            {budgetTrendQuery.isLoading ? (
              <div className="flex items-center gap-2 text-slate-400 text-sm py-8 justify-center">
                <RefreshCw className="w-4 h-4 animate-spin" /> Loading trend data…
              </div>
            ) : budgetTrendQuery.data && budgetTrendQuery.data.rows.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={budgetTrendQuery.data.rows} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ fontSize: 11 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  {(budgetTrendQuery.data.bands ?? []).map((band, i) => {
                    const colors = ["#059669","#2563eb","#d97706","#7c3aed","#dc2626","#0891b2","#64748b"];
                    return (
                      <Area
                        key={band}
                        type="monotone"
                        dataKey={band}
                        stackId="1"
                        stroke={colors[i % colors.length]}
                        fill={colors[i % colors.length]}
                        fillOpacity={0.6}
                      />
                    );
                  })}
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-slate-400 text-sm py-8 text-center">No trend data available yet.</p>
            )}
          </CardContent>
        </Card>

        {/* AI Budget Insights */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-600" />
                <CardTitle className="text-sm font-semibold text-slate-700">AI Budget Insights</CardTitle>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={handleGenerateBudgetAI}
                disabled={generatingBudgetAI}
                className="text-xs h-7 border-purple-200 text-purple-700 hover:bg-purple-50"
              >
                <Brain className={`w-3 h-3 mr-1.5 ${generatingBudgetAI ? "animate-pulse" : ""}`} />
                {generatingBudgetAI ? "Analyzing…" : "Generate Budget Insights"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {!budgetAiResult ? (
              <div className="text-center py-8">
                <Lightbulb className="w-8 h-8 text-slate-200 mx-auto mb-3" />
                <p className="text-slate-400 text-sm">Click "Generate Budget Insights" to analyze cross-budget patterns.</p>
                <p className="text-slate-300 text-xs mt-1">The AI will compare service preferences across all budget bands and identify trends.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-purple-50 border border-purple-100 rounded-lg p-3">
                  <p className="text-sm text-purple-800 leading-relaxed">{budgetAiResult.summary}</p>
                </div>
                <div className="space-y-3">
                  {budgetAiResult.insights.map((insight, i) => (
                    <div key={i} className={`border-l-4 pl-3 py-1 ${
                      insight.priority === "high" ? "border-l-amber-500" :
                      insight.priority === "medium" ? "border-l-blue-400" : "border-l-slate-300"
                    }`}>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${
                          insight.priority === "high" ? "bg-amber-100 text-amber-800" :
                          insight.priority === "medium" ? "bg-blue-100 text-blue-800" : "bg-slate-100 text-slate-600"
                        }`}>{insight.priority}</span>
                        <p className="text-sm font-semibold text-slate-800">{insight.title}</p>
                      </div>
                      <p className="text-xs text-slate-600 mb-1">{insight.finding}</p>
                      <div className="flex items-start gap-1.5">
                        <ChevronRight className="w-3 h-3 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-emerald-700 font-medium">{insight.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Service Type Breakdown */}
        {data?.serviceTypeCounts && data.serviceTypeCounts.length > 0 && (
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-slate-700">This Month — Service Type Mix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {data.serviceTypeCounts.slice(0, 8).map((item) => {
                  const total = data.serviceTypeCounts.reduce((s, r) => s + r.count, 0);
                  const pct = total > 0 ? (item.count / total) * 100 : 0;
                  return (
                    <div key={item.serviceType} className="flex items-center gap-3">
                      <div className="w-32 text-xs text-slate-600 truncate">{item.serviceType}</div>
                      <div className="flex-1 bg-slate-100 rounded-full h-2">
                        <div
                          className="bg-[oklch(0.45_0.12_150)] h-2 rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="w-16 text-right text-xs text-slate-500">
                        {item.count} ({pct.toFixed(0)}%)
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Active Insights */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              Active Insights
              {data?.activeInsights && data.activeInsights.length > 0 && (
                <span className="text-xs font-medium bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                  {data.activeInsights.length}
                </span>
              )}
            </h2>
          </div>

          {!data?.activeInsights || data.activeInsights.length === 0 ? (
            <Card className="bg-white shadow-sm">
              <CardContent className="p-8 text-center">
                <Sparkles className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 text-sm">No active insights yet.</p>
                <p className="text-slate-400 text-xs mt-1">Click "Generate Insights" to analyze your data.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {data.activeInsights.map((insight) => (
                <Card key={insight.id} className={`shadow-sm border-l-4 ${priorityColor(insight.priority)}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {priorityBadge(insight.priority)}
                          <span className="text-xs text-slate-500 capitalize">{insight.category}</span>
                        </div>
                        <p className="font-semibold text-slate-800 text-sm">{insight.title}</p>
                        <p className="text-sm text-slate-600 mt-1">{insight.observation}</p>
                        {insight.recommendedAction && (
                          <div className="mt-2 flex items-start gap-1.5">
                            <ChevronRight className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-emerald-700 font-medium">{insight.recommendedAction}</p>
                          </div>
                        )}
                        {insight.confidence !== null && insight.confidence !== undefined && (
                          <p className="text-xs text-slate-400 mt-2">
                            Confidence: {Math.round(insight.confidence * 100)}%
                          </p>
                        )}
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <button
                          onClick={() => handleInsightAction(insight.id, "valuable")}
                          className="p-1.5 rounded hover:bg-amber-100 text-slate-400 hover:text-amber-600 transition-colors"
                          title="Mark as valuable"
                        >
                          <Star className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleInsightAction(insight.id, "snoozed")}
                          className="p-1.5 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
                          title="Snooze"
                        >
                          <BellOff className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleInsightAction(insight.id, "read")}
                          className="p-1.5 rounded hover:bg-emerald-100 text-slate-400 hover:text-emerald-600 transition-colors"
                          title="Mark as read"
                        >
                          <CheckCheck className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleInsightAction(insight.id, "dismissed")}
                          className="p-1.5 rounded hover:bg-red-100 text-slate-400 hover:text-red-600 transition-colors"
                          title="Dismiss"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
    </AdminLayout>
  );
}
