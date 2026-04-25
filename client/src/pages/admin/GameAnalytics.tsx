/* ============================================================
   GAME ANALYTICS — Lawn Mower Dash Admin Dashboard
   Tracks plays, level funnel, wins, boss wins, device breakdown
   ============================================================ */
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend,
} from "recharts";
import { RefreshCw, Gamepad2, Trophy, Skull, Smartphone, Monitor, Tablet } from "lucide-react";

const BRAND_RED = "#c0392b";
const BRAND_GREEN = "#1a5c2a";
const BRAND_GOLD = "#c8a84b";

export default function GameAnalytics() {
  const { data, isLoading, refetch, dataUpdatedAt } = trpc.game.getStats.useQuery(undefined, {
    refetchInterval: 60_000,
  });

  const lastUpdated = dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : "—";

  const levelFunnelData = data ? [1, 2, 3, 4].map(lvl => ({
    level: `Level ${lvl}`,
    players: data.levelFunnel[lvl] ?? 0,
  })) : [];

  const playsPerDayData = data?.playsPerDay?.map(r => ({
    date: r.date,
    plays: Number(r.count),
  })) ?? [];

  const deviceData = data?.deviceBreakdown?.map(r => ({
    device: r.device,
    count: Number(r.count),
  })) ?? [];

  const winRate = data && data.totalPlays > 0
    ? ((data.totalWins / data.totalPlays) * 100).toFixed(2)
    : "0.00";

  const bossWinRate = data && data.totalWins > 0
    ? ((data.bossWins / data.totalWins) * 100).toFixed(2)
    : "0.00";

  return (
    <AdminLayout>
      <div className="p-6 space-y-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Gamepad2 className="w-7 h-7" style={{ color: BRAND_RED }} />
              Lawn Mower Dash Analytics
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Last updated: {lastUpdated}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs text-slate-500 font-medium uppercase tracking-wide">Total Plays</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" style={{ color: BRAND_GREEN }}>
                {isLoading ? "…" : (data?.totalPlays ?? 0).toLocaleString()}
              </div>
              <div className="text-xs text-slate-400 mt-1">game sessions started</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs text-slate-500 font-medium uppercase tracking-wide">All-4-Level Wins</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" style={{ color: BRAND_GOLD }}>
                {isLoading ? "…" : (data?.totalWins ?? 0).toLocaleString()}
              </div>
              <div className="text-xs text-slate-400 mt-1">{winRate}% win rate</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs text-slate-500 font-medium uppercase tracking-wide flex items-center gap-1">
                <Trophy className="w-3 h-3" style={{ color: BRAND_GOLD }} />
                Boss Wins
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" style={{ color: BRAND_RED }}>
                {isLoading ? "…" : (data?.bossWins ?? 0).toLocaleString()}
              </div>
              <div className="text-xs text-slate-400 mt-1">{bossWinRate}% of winners beat Sterling</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs text-slate-500 font-medium uppercase tracking-wide flex items-center gap-1">
                <Skull className="w-3 h-3 text-slate-400" />
                $200 Codes Earned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-700">
                {isLoading ? "…" : (data?.bossWins ?? 0).toLocaleString()}
              </div>
              <div className="text-xs text-slate-400 mt-1">MOWMONEY200 unlocked</div>
            </CardContent>
          </Card>
        </div>

        {/* Level Funnel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Level Completion Funnel</CardTitle>
            <p className="text-xs text-slate-500">Unique sessions that completed each level</p>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-48 flex items-center justify-center text-slate-400">Loading…</div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={levelFunnelData} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="level" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="players" fill={BRAND_GREEN} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
            {/* Funnel drop-off percentages */}
            {data && (
              <div className="flex gap-3 mt-3 flex-wrap">
                {[1, 2, 3, 4].map(lvl => {
                  const count = data.levelFunnel[lvl] ?? 0;
                  const prev = lvl === 1 ? data.totalPlays : (data.levelFunnel[lvl - 1] ?? 0);
                  const pct = prev > 0 ? ((count / prev) * 100).toFixed(0) : "0";
                  return (
                    <div key={lvl} className="flex items-center gap-1.5 text-xs">
                      <Badge variant="outline" className="text-xs px-2 py-0.5">Level {lvl}</Badge>
                      <span className="font-semibold">{count.toLocaleString()}</span>
                      <span className="text-slate-400">({pct}% of {lvl === 1 ? "starts" : `L${lvl - 1} completions`})</span>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Plays Per Day */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Daily Plays (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-48 flex items-center justify-center text-slate-400">Loading…</div>
            ) : playsPerDayData.length === 0 ? (
              <div className="h-48 flex items-center justify-center text-slate-400 text-sm">
                No play data yet — share the game link to start tracking!
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={playsPerDayData} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="plays" stroke={BRAND_RED} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Device Breakdown + Top Scores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Device Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Device Breakdown</CardTitle>
              <p className="text-xs text-slate-500">Where players are playing from</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {isLoading ? (
                <div className="text-slate-400 text-sm">Loading…</div>
              ) : deviceData.length === 0 ? (
                <div className="text-slate-400 text-sm">No data yet</div>
              ) : deviceData.map(d => {
                const icon = d.device === "mobile" ? <Smartphone className="w-4 h-4" /> :
                             d.device === "tablet" ? <Tablet className="w-4 h-4" /> :
                             <Monitor className="w-4 h-4" />;
                const total = deviceData.reduce((s, r) => s + r.count, 0);
                const pct = total > 0 ? ((d.count / total) * 100).toFixed(0) : "0";
                return (
                  <div key={d.device} className="flex items-center gap-3">
                    <div className="text-slate-500">{icon}</div>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="capitalize font-medium">{d.device}</span>
                        <span className="text-slate-500">{d.count.toLocaleString()} ({pct}%)</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: BRAND_GREEN }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Top 10 Scores */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Trophy className="w-4 h-4" style={{ color: BRAND_GOLD }} />
                Top 10 All-Time Scores
              </CardTitle>
              <p className="text-xs text-slate-500">Players who beat all 4 levels</p>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-slate-400 text-sm">Loading…</div>
              ) : !data?.topScores?.length ? (
                <div className="text-slate-400 text-sm">No winners yet — be the first!</div>
              ) : (
                <div className="space-y-2">
                  {data.topScores.map((entry, i) => (
                    <div key={i} className="flex items-center gap-3 py-1.5 border-b border-slate-50 last:border-0">
                      <div className="w-6 text-center font-bold text-sm" style={{
                        color: i === 0 ? "#f59e0b" : i === 1 ? "#94a3b8" : i === 2 ? "#b45309" : "#64748b"
                      }}>
                        #{i + 1}
                      </div>
                      <div className="font-mono font-bold text-base tracking-widest" style={{ color: BRAND_RED }}>
                        {entry.initials ?? "???"}
                      </div>
                      <div className="flex-1 text-right">
                        <span className="font-semibold text-sm">{(entry.score ?? 0).toLocaleString()}</span>
                        <span className="text-xs text-slate-400 ml-1">ft</span>
                      </div>
                      <div className="text-xs text-slate-400">
                        {entry.createdAt ? new Date(entry.createdAt).toLocaleDateString() : ""}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Discount Code Usage Hint */}
        <Card className="border-dashed">
          <CardContent className="pt-4">
            <div className="flex items-start gap-3">
              <div className="text-2xl">💡</div>
              <div>
                <div className="font-semibold text-sm mb-1">Discount Code Tracking</div>
                <p className="text-xs text-slate-500">
                  <strong>MOWMONEY100</strong> ($100 off) is revealed after beating all 4 levels.
                  <strong> MOWMONEY200</strong> ($200 off) is revealed only after beating Giant Sterling — roughly 1 in 500 odds.
                  Track redemptions in your quoting system by watching for these codes on incoming quote requests.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
