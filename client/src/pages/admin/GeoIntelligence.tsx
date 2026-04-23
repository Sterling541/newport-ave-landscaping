/* ============================================================
   GEO-INTELLIGENCE MAP — Admin View
   Google Maps with color-coded inquiry pins, neighborhood
   clustering sidebar, AI postcard recommendations, and
   date-range filtering with comparison mode.
   ============================================================ */
import { useState, useCallback, useRef, useMemo } from "react";
import AdminLayout from "@/components/AdminLayout";
import { MapView } from "@/components/Map";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin, Flame, RefreshCw, Sparkles, ChevronRight, X, Mail,
  TrendingUp, Users, Loader2, AlertCircle, CheckCircle2,
  Calendar, GitCompare,
} from "lucide-react";
import { toast } from "sonner";

// ── Service type colors ───────────────────────────────────────────────────────
const SERVICE_COLORS: Record<string, { hex: string; label: string; pill: string }> = {
  "Landscape Design":          { hex: "#2d6a4f", label: "Design",       pill: "bg-emerald-700 text-white" },
  "New Landscape Installation":{ hex: "#1d4ed8", label: "Installation", pill: "bg-blue-700 text-white" },
  "Enhancements":              { hex: "#d97706", label: "Enhancements", pill: "bg-amber-600 text-white" },
  "Lighting":                  { hex: "#ca8a04", label: "Lighting",     pill: "bg-yellow-600 text-white" },
  "Irrigation":                { hex: "#0e7490", label: "Irrigation",   pill: "bg-cyan-700 text-white" },
  "default":                   { hex: "#6b7280", label: "Other",        pill: "bg-slate-500 text-white" },
};
function getServiceColor(serviceType: string) {
  return SERVICE_COLORS[serviceType] ?? SERVICE_COLORS["default"];
}

// ── Inquiry type filter options ───────────────────────────────────────────────
const INQUIRY_TYPES = [
  { value: "all",                          label: "All",         pill: "bg-slate-700 text-white" },
  { value: "Landscape Design",             label: "Design",      pill: "bg-emerald-700 text-white" },
  { value: "New Landscape Installation",   label: "Install",     pill: "bg-blue-700 text-white" },
  { value: "Enhancements",                 label: "Enhance",     pill: "bg-amber-600 text-white" },
  { value: "Lighting",                     label: "Lighting",    pill: "bg-yellow-600 text-white" },
  { value: "Irrigation",                   label: "Irrigation",  pill: "bg-cyan-700 text-white" },
];

// ── Date range presets ────────────────────────────────────────────────────────
type DatePreset = "all_time" | "this_month" | "last_month" | "this_year" | "last_year" | "this_season" | "last_season" | "custom";

interface DateRange {
  startDate: string | undefined;
  endDate: string | undefined;
}

function toISO(d: Date) {
  return d.toISOString().slice(0, 10);
}

function getPresetRange(preset: DatePreset): DateRange {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  switch (preset) {
    case "all_time": return { startDate: undefined, endDate: undefined };
    case "this_month":
      return { startDate: toISO(new Date(year, month, 1)), endDate: toISO(new Date(year, month + 1, 0)) };
    case "last_month":
      return { startDate: toISO(new Date(year, month - 1, 1)), endDate: toISO(new Date(year, month, 0)) };
    case "this_year": return { startDate: `${year}-01-01`, endDate: `${year}-12-31` };
    case "last_year": return { startDate: `${year - 1}-01-01`, endDate: `${year - 1}-12-31` };
    case "this_season": {
      const seasons = [
        { start: new Date(year - 1, 11, 1), end: new Date(year, 1, 28) },
        { start: new Date(year, 2, 1),  end: new Date(year, 4, 31) },
        { start: new Date(year, 5, 1),  end: new Date(year, 7, 31) },
        { start: new Date(year, 8, 1),  end: new Date(year, 10, 30) },
      ];
      const current = seasons.find(s => now >= s.start && now <= s.end) ?? seasons[1];
      return { startDate: toISO(current.start), endDate: toISO(current.end) };
    }
    case "last_season": {
      const seasonMonths = [[11, 1], [2, 4], [5, 7], [8, 10]];
      const idx = seasonMonths.findIndex(([s, e]) => month >= s && month <= e);
      const cur = idx >= 0 ? idx : 1;
      const prev = (cur - 1 + 4) % 4;
      const [ps, pe] = seasonMonths[prev];
      const prevYear = ps > pe ? year - 1 : year;
      return { startDate: toISO(new Date(prevYear, ps, 1)), endDate: toISO(new Date(prevYear, pe + 1, 0)) };
    }
    default: return { startDate: undefined, endDate: undefined };
  }
}

const PRESET_LABELS: Record<DatePreset, string> = {
  all_time: "All Time",
  this_month: "This Month",
  last_month: "Last Month",
  this_year: "This Year",
  last_year: "Last Year",
  this_season: "This Season",
  last_season: "Last Season",
  custom: "Custom",
};

function getComparisonRange(preset: DatePreset, customStart?: string, customEnd?: string): DateRange {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  switch (preset) {
    case "this_month":
      return { startDate: toISO(new Date(year, month - 1, 1)), endDate: toISO(new Date(year, month, 0)) };
    case "last_month":
      return { startDate: toISO(new Date(year, month - 2, 1)), endDate: toISO(new Date(year, month - 1, 0)) };
    case "this_year": return { startDate: `${year - 1}-01-01`, endDate: `${year - 1}-12-31` };
    case "last_year": return { startDate: `${year - 2}-01-01`, endDate: `${year - 2}-12-31` };
    case "this_season": {
      const seasonMonths = [[11,1],[2,4],[5,7],[8,10]];
      const idx = seasonMonths.findIndex(([s,e]) => month >= s && month <= e);
      const cur = idx >= 0 ? idx : 1;
      const prev = (cur - 1 + 4) % 4;
      const [ps, pe] = seasonMonths[prev];
      const prevYear = ps > pe ? year - 1 : year;
      return { startDate: toISO(new Date(prevYear, ps, 1)), endDate: toISO(new Date(prevYear, pe + 1, 0)) };
    }
    case "last_season": {
      const seasonMonths = [[11,1],[2,4],[5,7],[8,10]];
      const idx = seasonMonths.findIndex(([s,e]) => month >= s && month <= e);
      const cur = idx >= 0 ? idx : 1;
      const prev2 = (cur - 2 + 4) % 4;
      const [ps, pe] = seasonMonths[prev2];
      const prevYear = ps > pe ? year - 1 : year;
      return { startDate: toISO(new Date(prevYear, ps, 1)), endDate: toISO(new Date(prevYear, pe + 1, 0)) };
    }
    case "custom": {
      if (customStart && customEnd) {
        const start = new Date(customStart);
        const end = new Date(customEnd);
        const days = Math.round((end.getTime() - start.getTime()) / 86400000);
        const cStart = new Date(start); cStart.setDate(cStart.getDate() - days - 1);
        const cEnd = new Date(start); cEnd.setDate(cEnd.getDate() - 1);
        return { startDate: toISO(cStart), endDate: toISO(cEnd) };
      }
      return { startDate: undefined, endDate: undefined };
    }
    default: return { startDate: undefined, endDate: undefined };
  }
}

const COMPARISON_LABELS: Partial<Record<DatePreset, string>> = {
  this_month: "Last Month",
  last_month: "2 Months Ago",
  this_year: "Last Year",
  last_year: "2 Years Ago",
  this_season: "Last Season",
  last_season: "2 Seasons Ago",
  custom: "Prior Period",
};

// ── Types ─────────────────────────────────────────────────────────────────────
interface Pin {
  id: number;
  name: string;
  address: string;
  serviceType: string;
  budget: string | null;
  lat: number;
  lng: number;
  neighborhood: string | null;
  city: string | null;
  createdAt: Date;
  leadStatus: string;
}
interface Cluster {
  neighborhood: string;
  city: string;
  lat: number;
  lng: number;
  total: number;
  byServiceType: Record<string, number>;
}
interface PostcardRec {
  bestMonths: string[];
  featuredService: string;
  postcardHeadline: string;
  targetingRationale: string;
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function GeoIntelligence() {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCluster, setSelectedCluster] = useState<Cluster | null>(null);
  const [postcardRec, setPostcardRec] = useState<PostcardRec | null>(null);
  const [loadingRec, setLoadingRec] = useState(false);
  const [geocodingBatch, setGeocodingBatch] = useState(false);

  // Date range state
  const [datePreset, setDatePreset] = useState<DatePreset>("all_time");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [showCustomPicker, setShowCustomPicker] = useState(false);

  // Comparison mode
  const [compareMode, setCompareMode] = useState(false);

  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const compareMarkersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const heatmapRef = useRef<google.maps.visualization.HeatmapLayer | null>(null);
  const compareHeatmapRef = useRef<google.maps.visualization.HeatmapLayer | null>(null);
  const [mapMode, setMapMode] = useState<"pins" | "heatmap">("pins");

  // Compute active date range
  const activeDateRange = useMemo((): DateRange => {
    if (datePreset === "custom") return { startDate: customStart || undefined, endDate: customEnd || undefined };
    return getPresetRange(datePreset);
  }, [datePreset, customStart, customEnd]);

  // Compute comparison date range
  const comparisonDateRange = useMemo((): DateRange => {
    return getComparisonRange(datePreset, customStart || undefined, customEnd || undefined);
  }, [datePreset, customStart, customEnd]);

  // ── tRPC queries ──────────────────────────────────────────────────────────
  const pinsQuery = trpc.geoIntelligence.pins.useQuery(
    { serviceType: selectedType, startDate: activeDateRange.startDate, endDate: activeDateRange.endDate },
    { refetchOnWindowFocus: false }
  );
  const comparePinsQuery = trpc.geoIntelligence.pins.useQuery(
    { serviceType: selectedType, startDate: comparisonDateRange.startDate, endDate: comparisonDateRange.endDate },
    { refetchOnWindowFocus: false, enabled: compareMode && datePreset !== "all_time" }
  );
  const clustersQuery = trpc.geoIntelligence.clusters.useQuery(
    { serviceType: selectedType, startDate: activeDateRange.startDate, endDate: activeDateRange.endDate },
    { refetchOnWindowFocus: false }
  );
  const geocodeStatusQuery = trpc.geoIntelligence.geocodeStatus.useQuery(undefined, { refetchInterval: 30000 });
  const geocodeBatchMutation = trpc.geoIntelligence.geocodeBatch.useMutation();
  const neighborhoodInsightsMutation = trpc.geoIntelligence.neighborhoodInsights.useMutation();

  const pins: Pin[] = (pinsQuery.data ?? []) as Pin[];
  const comparePins: Pin[] = (comparePinsQuery.data ?? []) as Pin[];
  const clusters: Cluster[] = (clustersQuery.data ?? []) as Cluster[];

  // ── Map rendering ─────────────────────────────────────────────────────────
  const handleMapReady = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    renderMarkers(map, pins, false);
  }, [pins]); // eslint-disable-line react-hooks/exhaustive-deps

  function renderMarkers(map: google.maps.Map, pinData: Pin[], isComparison: boolean) {
    const ref = isComparison ? compareMarkersRef : markersRef;
    ref.current.forEach(m => { m.map = null; });
    ref.current = [];
    if (!pinData.length) return;
    pinData.forEach(pin => {
      const color = isComparison ? "#94a3b8" : getServiceColor(pin.serviceType).hex;
      const size = isComparison ? "14px" : "20px";
      const opacity = isComparison ? "0.55" : "1";
      const pinEl = document.createElement("div");
      pinEl.style.cssText = `
        width: ${size}; height: ${size}; border-radius: 50% 50% 50% 0;
        background: ${color}; border: 2px solid white;
        transform: rotate(-45deg); cursor: pointer;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        transition: transform 0.15s ease;
        opacity: ${opacity};
      `;
      pinEl.addEventListener("mouseenter", () => { pinEl.style.transform = "rotate(-45deg) scale(1.3)"; });
      pinEl.addEventListener("mouseleave", () => { pinEl.style.transform = "rotate(-45deg) scale(1)"; });
      const marker = new google.maps.marker.AdvancedMarkerElement({
        map, position: { lat: pin.lat, lng: pin.lng }, content: pinEl,
        title: `${isComparison ? "[PRIOR] " : ""}${pin.name} — ${pin.serviceType}`,
      });
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="font-family: sans-serif; font-size: 13px; max-width: 200px; padding: 4px;">
            ${isComparison ? '<div style="font-size:10px;color:#94a3b8;font-weight:600;margin-bottom:4px;">PRIOR PERIOD</div>' : ""}
            <strong style="color: #1a1a1a;">${pin.name}</strong><br/>
            <span style="color: ${color}; font-weight: 600;">${pin.serviceType}</span><br/>
            <span style="color: #555; font-size: 11px;">${pin.address}</span><br/>
            ${pin.budget ? `<span style="color: #888; font-size: 11px;">Budget: ${pin.budget}</span><br/>` : ""}
            <span style="color: #aaa; font-size: 11px;">${new Date(pin.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          </div>
        `,
      });
      marker.addListener("click", () => { infoWindow.open({ anchor: marker, map }); });
      ref.current.push(marker);
    });
  }

  function showHeatmap(map: google.maps.Map, pinData: Pin[], isComparison: boolean) {
    const ref = isComparison ? compareMarkersRef : markersRef;
    const hRef = isComparison ? compareHeatmapRef : heatmapRef;
    ref.current.forEach(m => { m.map = null; }); ref.current = [];
    if (hRef.current) { hRef.current.setMap(null); hRef.current = null; }
    if (!pinData.length) return;
    const points = pinData.map(p => ({ location: new google.maps.LatLng(p.lat, p.lng), weight: 1 }));
    const gradient = isComparison
      ? ["rgba(0,0,0,0)", "rgba(148,163,184,0.4)", "rgba(100,116,139,0.7)", "rgba(71,85,105,1)"]
      : ["rgba(0,255,255,0)","rgba(0,255,255,1)","rgba(0,191,255,1)","rgba(0,127,255,1)","rgba(0,63,255,1)","rgba(0,0,255,1)","rgba(63,0,91,1)","rgba(127,0,63,1)","rgba(191,0,31,1)","rgba(255,0,0,1)"];
    hRef.current = new google.maps.visualization.HeatmapLayer({
      data: points, map, radius: isComparison ? 30 : 40, opacity: isComparison ? 0.5 : 0.75, gradient,
    });
  }

  function clearComparison() {
    compareMarkersRef.current.forEach(m => { m.map = null; }); compareMarkersRef.current = [];
    if (compareHeatmapRef.current) { compareHeatmapRef.current.setMap(null); compareHeatmapRef.current = null; }
  }

  // Re-render when data changes
  const prevPinsRef = useRef<Pin[]>([]);
  const prevComparePinsRef = useRef<Pin[]>([]);
  if (mapRef.current && pins !== prevPinsRef.current) {
    prevPinsRef.current = pins;
    if (mapMode === "heatmap") showHeatmap(mapRef.current, pins, false);
    else {
      if (heatmapRef.current) { heatmapRef.current.setMap(null); heatmapRef.current = null; }
      renderMarkers(mapRef.current, pins, false);
    }
  }
  if (mapRef.current && comparePins !== prevComparePinsRef.current) {
    prevComparePinsRef.current = comparePins;
    if (compareMode) {
      if (mapMode === "heatmap") showHeatmap(mapRef.current, comparePins, true);
      else {
        if (compareHeatmapRef.current) { compareHeatmapRef.current.setMap(null); compareHeatmapRef.current = null; }
        renderMarkers(mapRef.current, comparePins, true);
      }
    } else { clearComparison(); }
  }

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleToggleMapMode = () => {
    const newMode = mapMode === "pins" ? "heatmap" : "pins";
    setMapMode(newMode);
    if (!mapRef.current) return;
    if (newMode === "heatmap") {
      showHeatmap(mapRef.current, pins, false);
      if (compareMode) showHeatmap(mapRef.current, comparePins, true);
    } else {
      if (heatmapRef.current) { heatmapRef.current.setMap(null); heatmapRef.current = null; }
      if (compareHeatmapRef.current) { compareHeatmapRef.current.setMap(null); compareHeatmapRef.current = null; }
      renderMarkers(mapRef.current, pins, false);
      if (compareMode) renderMarkers(mapRef.current, comparePins, true);
    }
  };

  const handleToggleCompare = () => {
    const next = !compareMode;
    setCompareMode(next);
    if (!next && mapRef.current) clearComparison();
  };

  const handlePresetChange = (preset: DatePreset) => {
    setDatePreset(preset);
    setShowCustomPicker(preset === "custom");
    setSelectedCluster(null); setPostcardRec(null);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type); setSelectedCluster(null); setPostcardRec(null);
  };

  const handleGeocodeBatch = async () => {
    setGeocodingBatch(true);
    try {
      const result = await geocodeBatchMutation.mutateAsync({ limit: 200 });
      toast.success(`Geocoded ${result.geocoded} addresses (${result.failed} failed, ${result.skipped} skipped)`);
      pinsQuery.refetch(); clustersQuery.refetch(); geocodeStatusQuery.refetch();
    } catch (err) { toast.error(`Geocoding failed: ${String(err)}`); }
    finally { setGeocodingBatch(false); }
  };

  const handleClusterClick = (cluster: Cluster) => {
    setSelectedCluster(cluster); setPostcardRec(null);
    if (mapRef.current) { mapRef.current.panTo({ lat: cluster.lat, lng: cluster.lng }); mapRef.current.setZoom(14); }
  };

  const handleGenerateRec = async () => {
    if (!selectedCluster) return;
    setLoadingRec(true);
    try {
      const result = await neighborhoodInsightsMutation.mutateAsync({
        neighborhood: selectedCluster.neighborhood, city: selectedCluster.city,
        serviceType: selectedType !== "all" ? selectedType : undefined,
      });
      setPostcardRec(result.recommendation);
    } catch (err) { toast.error(`Failed to generate recommendation: ${String(err)}`); }
    finally { setLoadingRec(false); }
  };

  const geoStatus = geocodeStatusQuery.data;
  const compLabel = COMPARISON_LABELS[datePreset] ?? "Prior Period";
  const pctChange = pins.length > 0 && comparePins.length > 0
    ? Math.round(((pins.length - comparePins.length) / comparePins.length) * 100)
    : null;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <AdminLayout>
    <div className="min-h-screen bg-[oklch(0.97_0.005_120)] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-[oklch(0.25_0.05_150)] flex items-center gap-2">
              <MapPin className="w-6 h-6 text-emerald-600" />
              Geo-Intelligence Map
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              {pins.length} geocoded inquiries
              {compareMode && comparePins.length > 0 && <span className="ml-1 text-slate-400">vs. {comparePins.length} in prior period</span>}
              {" "}across {clusters.length} neighborhoods
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {geoStatus && (
              <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
                {geoStatus.ungeocoded > 0 ? <AlertCircle className="w-3.5 h-3.5 text-amber-500" /> : <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                {geoStatus.geocoded}/{geoStatus.total} geocoded ({geoStatus.pct}%)
              </div>
            )}
            {geoStatus && geoStatus.ungeocoded > 0 && (
              <Button variant="outline" size="sm" onClick={handleGeocodeBatch} disabled={geocodingBatch} className="text-xs">
                {geocodingBatch
                  ? <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />Geocoding…</>
                  : <><RefreshCw className="w-3.5 h-3.5 mr-1.5" />Geocode {geoStatus.ungeocoded} remaining</>}
              </Button>
            )}
          </div>
        </div>

        {/* ── Date range filter row ── */}
        <div className="max-w-screen-2xl mx-auto mt-3 space-y-2">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-medium text-slate-500 flex items-center gap-1 mr-1">
              <Calendar className="w-3.5 h-3.5" /> Period:
            </span>
            {(["all_time", "this_month", "last_month", "this_season", "last_season", "this_year", "last_year", "custom"] as DatePreset[]).map(preset => (
              <button
                key={preset}
                onClick={() => handlePresetChange(preset)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
                  datePreset === preset
                    ? "bg-emerald-700 text-white border-transparent shadow-sm scale-105"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                }`}
              >
                {PRESET_LABELS[preset]}
              </button>
            ))}
            <button
              onClick={handleToggleCompare}
              disabled={datePreset === "all_time"}
              className={`ml-1 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
                compareMode
                  ? "bg-violet-700 text-white border-transparent shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-400 disabled:opacity-40 disabled:cursor-not-allowed"
              }`}
              title={datePreset === "all_time" ? "Select a time period first" : "Compare with prior period"}
            >
              <GitCompare className="w-3.5 h-3.5" /> Compare
            </button>
          </div>

          {/* Custom date picker */}
          {datePreset === "custom" && showCustomPicker && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-500">From:</span>
              <input type="date" value={customStart} onChange={e => setCustomStart(e.target.value)}
                className="text-xs border border-slate-200 rounded-lg px-2 py-1 text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              <span className="text-xs text-slate-500">To:</span>
              <input type="date" value={customEnd} onChange={e => setCustomEnd(e.target.value)}
                className="text-xs border border-slate-200 rounded-lg px-2 py-1 text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
          )}

          {/* Comparison summary bar */}
          {compareMode && datePreset !== "all_time" && (
            <div className="flex items-center gap-3 text-xs bg-violet-50 border border-violet-200 rounded-lg px-3 py-2">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-emerald-600" />
                <span className="font-medium text-slate-700">{PRESET_LABELS[datePreset]}</span>
                <span className="text-slate-400 bg-white border border-slate-200 rounded-full px-2 py-0.5">{pins.length} leads</span>
              </div>
              <span className="text-slate-300">vs.</span>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-400" />
                <span className="font-medium text-slate-600">{compLabel}</span>
                <span className="text-slate-400 bg-white border border-slate-200 rounded-full px-2 py-0.5">{comparePins.length} leads</span>
              </div>
              {pctChange !== null && (
                <span className={`font-bold text-sm ${pctChange >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                  {pctChange >= 0 ? "▲" : "▼"}{Math.abs(pctChange)}%
                </span>
              )}
            </div>
          )}
        </div>

        {/* ── Service type filter + map mode toggle ── */}
        <div className="max-w-screen-2xl mx-auto mt-3 flex flex-wrap gap-2 items-center justify-between">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-medium text-slate-500 mr-1">Service:</span>
            {INQUIRY_TYPES.map(t => (
              <button key={t.value} onClick={() => handleTypeChange(t.value)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
                  selectedType === t.value ? `${t.pill} border-transparent shadow-sm scale-105` : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                }`}
              >{t.label}</button>
            ))}
          </div>
          <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5">
            <button onClick={() => { if (mapMode !== "pins") handleToggleMapMode(); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${mapMode === "pins" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
              <MapPin className="w-3.5 h-3.5" /> Pins
            </button>
            <button onClick={() => { if (mapMode !== "heatmap") handleToggleMapMode(); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${mapMode === "heatmap" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
              <Flame className="w-3.5 h-3.5" /> Heatmap
            </button>
          </div>
        </div>
      </div>

      {/* Main layout: map + sidebar */}
      <div className="flex-1 flex overflow-hidden" style={{ height: "calc(100vh - 230px)" }}>
        {/* Map */}
        <div className="flex-1 relative">
          {pinsQuery.isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
              <div className="text-center space-y-2">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto" />
                <p className="text-sm text-slate-500">Loading map data…</p>
              </div>
            </div>
          )}
          <MapView className="w-full h-full" initialCenter={{ lat: 44.0582, lng: -121.3153 }} initialZoom={11} onMapReady={handleMapReady} />

          {/* Service type legend */}
          {!compareMode && (
            <div className="absolute bottom-6 left-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200 p-3 text-xs">
              <p className="font-semibold text-slate-700 mb-2">Service Type</p>
              {Object.entries(SERVICE_COLORS).filter(([k]) => k !== "default").map(([key, val]) => (
                <div key={key} className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: val.hex }} />
                  <span className="text-slate-600">{val.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Comparison legend */}
          {compareMode && (
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl border border-slate-200 shadow-lg p-3 text-xs space-y-1.5 z-10">
              <p className="font-semibold text-slate-700 mb-2">Comparison Legend</p>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-600 border-2 border-white shadow" />
                <span className="text-slate-600">{PRESET_LABELS[datePreset]} <span className="text-slate-400">({pins.length})</span></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-400 border-2 border-white shadow opacity-60" />
                <span className="text-slate-500">{compLabel} <span className="text-slate-400">({comparePins.length})</span></span>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-80 flex-shrink-0 border-l border-slate-200 bg-white flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" /> Top Neighborhoods
              </h2>
            </div>
            {clustersQuery.isLoading ? (
              <div className="p-4 space-y-2">{[1,2,3].map(i => <div key={i} className="h-12 bg-slate-100 rounded-lg animate-pulse" />)}</div>
            ) : clusters.length === 0 ? (
              <div className="p-6 text-center text-sm text-slate-400">No geocoded data for this period.</div>
            ) : (
              <div className="divide-y divide-slate-50">
                {clusters.slice(0, 15).map(cluster => (
                  <button key={`${cluster.neighborhood}-${cluster.city}`} onClick={() => handleClusterClick(cluster)}
                    className={`w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors ${selectedCluster?.neighborhood === cluster.neighborhood ? "bg-emerald-50 border-l-2 border-emerald-500" : ""}`}>
                    <div className="flex items-center justify-between">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-800 truncate">{cluster.neighborhood}</p>
                        <p className="text-xs text-slate-400 truncate">{cluster.city}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                        <span className="text-sm font-bold text-emerald-700">{cluster.total}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                      </div>
                    </div>
                    <div className="flex gap-0.5 mt-1.5 h-1.5 rounded-full overflow-hidden">
                      {Object.entries(cluster.byServiceType).sort((a,b) => b[1]-a[1]).map(([svc, cnt]) => (
                        <div key={svc} style={{ width: `${(cnt/cluster.total)*100}%`, backgroundColor: getServiceColor(svc).hex }} />
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Selected neighborhood detail */}
          {selectedCluster && (
            <div className="border-t border-slate-200 bg-slate-50 p-4 space-y-3 max-h-96 overflow-y-auto">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">{selectedCluster.neighborhood}</h3>
                  <p className="text-xs text-slate-500">{selectedCluster.city} · {selectedCluster.total} inquiries</p>
                </div>
                <button onClick={() => { setSelectedCluster(null); setPostcardRec(null); }} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-1">
                {Object.entries(selectedCluster.byServiceType).sort((a,b) => b[1]-a[1]).map(([svc, cnt]) => {
                  const color = getServiceColor(svc);
                  return (
                    <div key={svc} className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color.hex }} />
                      <span className="text-slate-600 flex-1 truncate">{svc}</span>
                      <span className="font-semibold text-slate-700">{cnt}</span>
                      <span className="text-slate-400">({Math.round((cnt/selectedCluster.total)*100)}%)</span>
                    </div>
                  );
                })}
              </div>
              {!postcardRec ? (
                <Button size="sm" onClick={handleGenerateRec} disabled={loadingRec}
                  className="w-full text-xs bg-[oklch(0.35_0.1_150)] hover:bg-[oklch(0.3_0.1_150)] text-white">
                  {loadingRec
                    ? <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />Generating…</>
                    : <><Sparkles className="w-3.5 h-3.5 mr-1.5" />Generate Postcard Recommendation</>}
                </Button>
              ) : (
                <div className="bg-white rounded-lg border border-emerald-200 p-3 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                    <Mail className="w-3.5 h-3.5" /> AI Postcard Recommendation
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-0.5">Headline</p>
                    <p className="text-sm font-semibold text-slate-800 leading-snug">"{postcardRec.postcardHeadline}"</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-0.5">Feature Service</p>
                    <Badge className={`text-xs ${getServiceColor(postcardRec.featuredService).pill}`}>{postcardRec.featuredService}</Badge>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-0.5">Best Send Months</p>
                    <div className="flex flex-wrap gap-1">
                      {postcardRec.bestMonths.map(m => <span key={m} className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-medium">{m}</span>)}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-0.5">Why This Neighborhood</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{postcardRec.targetingRationale}</p>
                  </div>
                  <button onClick={() => setPostcardRec(null)} className="text-xs text-slate-400 hover:text-slate-600 underline">Regenerate</button>
                </div>
              )}
            </div>
          )}

          {/* Summary footer */}
          <div className="border-t border-slate-200 p-3 bg-white">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                {pins.length} pins shown
                {compareMode && comparePins.length > 0 && <span className="text-slate-400">· {comparePins.length} prior</span>}
              </div>
              <div>{clusters.length} neighborhoods</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
}
