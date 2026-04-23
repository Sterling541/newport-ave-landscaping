/* ============================================================
   LEAD VOLUME TRENDS — View 2
   Daily/weekly/monthly volume charts, day-of-week heatmap,
   source attribution, and weather correlation.
   ============================================================ */

import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  ReferenceLine,
} from "recharts";
import { Calendar, TrendingUp, Users, RefreshCw, DollarSign } from "lucide-react";

// ── Constants ─────────────────────────────────────────────────────────────────

const BRAND_GREEN = "oklch(0.45 0.12 150)";
const BRAND_GREEN_HEX = "#2d6a4f";
const BRAND_AMBER = "#d97706";
const CHART_COLORS = ["#2d6a4f", "#52b788", "#d97706", "#f59e0b", "#6366f1", "#ec4899", "#14b8a6"];

const DOW_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// ── Date range presets ────────────────────────────────────────────────────────

function getPresetRange(preset: string): { start: string; end: string } {
  const today = new Date();
  const end = today.toISOString().slice(0, 10);
  const start = new Date(today);

  switch (preset) {
    case "30d": start.setDate(today.getDate() - 30); break;
    case "90d": start.setDate(today.getDate() - 90); break;
    case "6m": start.setMonth(today.getMonth() - 6); break;
    case "1y": start.setFullYear(today.getFullYear() - 1); break;
    case "2y": start.setFullYear(today.getFullYear() - 2); break;
    default: start.setDate(today.getDate() - 90);
  }

  return { start: start.toISOString().slice(0, 10), end };
}

// ── Tooltip formatters ────────────────────────────────────────────────────────

const CustomDailyTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string; color: string }[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  const d = new Date(label + "T12:00:00");
  const dateStr = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-xs">
      <p className="font-semibold text-slate-700 mb-1">{dateStr}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>{p.name}: <strong>{typeof p.value === "number" ? p.value.toFixed(p.name.includes("avg") ? 1 : 0) : p.value}</strong></p>
      ))}
    </div>
  );
};

const CustomBarTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string }[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-xs">
      <p className="font-semibold text-slate-700 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-slate-600">{p.name}: <strong>{p.value}</strong></p>
      ))}
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────

const INQUIRY_TYPES_LVT = [
  { value: "all", label: "All Inquiries", color: "bg-slate-700 text-white" },
  { value: "Landscape Design", label: "Design", color: "bg-emerald-700 text-white" },
  { value: "New Landscape Installation", label: "Installation", color: "bg-blue-700 text-white" },
  { value: "Enhancements", label: "Enhancements", color: "bg-amber-600 text-white" },
  { value: "Lighting", label: "Lighting", color: "bg-yellow-600 text-white" },
  { value: "Irrigation", label: "Irrigation", color: "bg-cyan-700 text-white" },
];

export default function LeadVolumeTrends() {
  const [preset, setPreset] = useState("90d");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedBudget, setSelectedBudget] = useState("all");
  const { start, end } = useMemo(() => getPresetRange(preset), [preset]);

  const trendsQuery = trpc.insightsEngine.volumeTrends.useQuery({ startDate: start, endDate: end, serviceType: selectedType });
  const sourceQuery = trpc.insightsEngine.sourceAttribution.useQuery({ startDate: start, endDate: end, serviceType: selectedType });
  const budgetInsightsQuery = trpc.insightsEngine.budgetInsights.useQuery(
    { budgetKey: selectedBudget, startDate: start, endDate: end },
  );

  const data = trendsQuery.data;
  const sourceData = sourceQuery.data;

  // ── Derived data ─────────────────────────────────────────────────────────

  const dailyChartData = useMemo(() => {
    if (!data?.dailyCounts) return [];
    return data.dailyCounts.map(r => ({
      date: r.date,
      count: r.count,
      avg7: r.avg7,
      avg28: r.avg28,
    }));
  }, [data]);

  const dowChartData = useMemo(() => {
    if (!data?.dowCounts) return [];
    return DOW_LABELS.map(day => ({ day, count: data.dowCounts[day] ?? 0 }));
  }, [data]);

  const monthlyChartData = useMemo(() => {
    if (!data?.monthlyCounts) return [];
    return data.monthlyCounts.map(r => {
      const [year, month] = r.month.split("-");
      const label = new Date(Number(year), Number(month) - 1, 1).toLocaleDateString("en-US", { month: "short", year: "2-digit" });
      return { month: label, count: r.count };
    });
  }, [data]);

  const pieData = useMemo(() => {
    if (!sourceData?.sources) return [];
    return sourceData.sources
      .filter(s => s.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 8)
      .map(s => ({ name: s.howHeard || "Unknown", value: s.count, pct: s.pct }));
  }, [sourceData]);

  // ── Stats ─────────────────────────────────────────────────────────────────

  const totalInRange = useMemo(() => dailyChartData.reduce((s, r) => s + r.count, 0), [dailyChartData]);
  const peakDay = useMemo(() => dailyChartData.reduce((best, r) => r.count > best.count ? r : best, { date: "", count: 0 }), [dailyChartData]);
  const avgPerDay = useMemo(() => dailyChartData.length > 0 ? totalInRange / dailyChartData.length : 0, [totalInRange, dailyChartData]);

  // ── Loading ───────────────────────────────────────────────────────────────

  if (trendsQuery.isLoading) {
    return (
      <div className="min-h-screen bg-[oklch(0.97_0.005_120)] p-6 flex items-center justify-center">
        <div className="text-center space-y-3">
          <RefreshCw className="w-8 h-8 animate-spin text-emerald-600 mx-auto" />
          <p className="text-slate-500">Loading trend data…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.005_120)] p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-[oklch(0.25_0.05_150)]">Lead Volume Trends</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              {new Date(start + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} —{" "}
              {new Date(end + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </p>
          </div>
          {/* Date range presets */}
          <div className="flex gap-1.5 flex-wrap">
            {[
              { key: "30d", label: "30 Days" },
              { key: "90d", label: "90 Days" },
              { key: "6m", label: "6 Months" },
              { key: "1y", label: "1 Year" },
              { key: "2y", label: "2 Years" },
            ].map(p => (
              <Button
                key={p.key}
                variant={preset === p.key ? "default" : "outline"}
                size="sm"
                onClick={() => setPreset(p.key)}
                className={`text-xs ${preset === p.key ? "bg-[oklch(0.35_0.1_150)] text-white" : ""}`}
              >
                {p.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Inquiry Type Filter Pills */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-medium text-slate-500 mr-1">Filter by type:</span>
          {INQUIRY_TYPES_LVT.map(t => (
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
              Showing <strong className="text-slate-600">{selectedType}</strong> only
            </span>
          )}
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
              {[
                { key: "all",         label: "All Budgets" },
                { key: "under_7500",  label: "Under $7,500" },
                { key: "7500_15000",  label: "$7,500–$15K" },
                { key: "15000_25000", label: "$15K–$25K" },
                { key: "25000_60000", label: "$25K–$60K" },
                { key: "60000_plus",  label: "$60K+" },
                { key: "other",       label: "Other / Custom" },
              ].map(b => (
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
                  {" "}— within selected date range
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

        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Total Submissions</p>
              <p className="text-3xl font-bold text-[oklch(0.25_0.05_150)]">{totalInRange}</p>
              <p className="text-xs text-slate-400 mt-1">in selected range</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Daily Average</p>
              <p className="text-3xl font-bold text-[oklch(0.25_0.05_150)]">{avgPerDay.toFixed(1)}</p>
              <p className="text-xs text-slate-400 mt-1">per day</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Peak Day</p>
              <p className="text-3xl font-bold text-[oklch(0.25_0.05_150)]">{peakDay.count}</p>
              <p className="text-xs text-slate-400 mt-1">
                {peakDay.date ? new Date(peakDay.date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Daily volume area chart */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-slate-400" />
              Daily Submission Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            {dailyChartData.length === 0 ? (
              <div className="h-48 flex items-center justify-center text-slate-400 text-sm">No data in this range</div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={dailyChartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={BRAND_GREEN_HEX} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={BRAND_GREEN_HEX} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 10, fill: "#94a3b8" }}
                    tickFormatter={(d) => {
                      const dt = new Date(d + "T12:00:00");
                      return dt.toLocaleDateString("en-US", { month: "short", day: "numeric" });
                    }}
                    interval="preserveStartEnd"
                  />
                  <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} allowDecimals={false} />
                  <Tooltip content={<CustomDailyTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="count"
                    name="Submissions"
                    stroke={BRAND_GREEN_HEX}
                    strokeWidth={2}
                    fill="url(#colorCount)"
                  />
                  <Line
                    type="monotone"
                    dataKey="avg7"
                    name="7-day avg"
                    stroke={BRAND_AMBER}
                    strokeWidth={1.5}
                    dot={false}
                    strokeDasharray="4 2"
                  />
                  <Line
                    type="monotone"
                    dataKey="avg28"
                    name="28-day avg"
                    stroke="#94a3b8"
                    strokeWidth={1}
                    dot={false}
                    strokeDasharray="2 4"
                  />
                  <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Monthly totals + Day-of-week */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Monthly bar chart */}
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                Monthly Totals
              </CardTitle>
            </CardHeader>
            <CardContent>
              {monthlyChartData.length === 0 ? (
                <div className="h-40 flex items-center justify-center text-slate-400 text-sm">No data</div>
              ) : (
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={monthlyChartData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} />
                    <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} allowDecimals={false} />
                    <Tooltip content={<CustomBarTooltip />} />
                    <Bar dataKey="count" name="Submissions" fill={BRAND_GREEN_HEX} radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Day-of-week heatmap */}
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                Day-of-Week Pattern
              </CardTitle>
            </CardHeader>
            <CardContent>
              {dowChartData.every(d => d.count === 0) ? (
                <div className="h-40 flex items-center justify-center text-slate-400 text-sm">No data</div>
              ) : (
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={dowChartData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94a3b8" }} />
                    <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} allowDecimals={false} />
                    <Tooltip content={<CustomBarTooltip />} />
                    <Bar dataKey="count" name="Total submissions" radius={[3, 3, 0, 0]}>
                      {dowChartData.map((entry, index) => {
                        const maxCount = Math.max(...dowChartData.map(d => d.count));
                        const intensity = maxCount > 0 ? entry.count / maxCount : 0;
                        const opacity = 0.3 + intensity * 0.7;
                        return <Cell key={index} fill={BRAND_GREEN_HEX} fillOpacity={opacity} />;
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Source Attribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pie chart */}
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-400" />
                Lead Source Attribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              {pieData.length === 0 ? (
                <div className="h-48 flex items-center justify-center text-slate-400 text-sm">No source data</div>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieData.map((_, index) => (
                        <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [`${value} (${pieData.find(d => d.name === name)?.pct ?? 0}%)`, name]}
                      contentStyle={{ fontSize: 11, borderRadius: 8 }}
                    />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Source table */}
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-slate-700">Source Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              {!sourceData?.sources || sourceData.sources.length === 0 ? (
                <div className="text-sm text-slate-400 py-4 text-center">No source data</div>
              ) : (
                <div className="space-y-2">
                  {sourceData.sources.slice(0, 10).map((s, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-700 truncate">{s.howHeard || "Unknown"}</span>
                          <span className="text-xs font-medium text-slate-800 ml-2">{s.count}</span>
                        </div>
                        <div className="mt-0.5 bg-slate-100 rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full"
                            style={{ width: `${s.pct}%`, backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }}
                          />
                        </div>
                      </div>
                      <span className="text-xs text-slate-400 w-10 text-right">{s.pct}%</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-slate-100 flex justify-between text-xs text-slate-500">
                    <span>Total</span>
                    <span className="font-semibold text-slate-700">{sourceData.total}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
