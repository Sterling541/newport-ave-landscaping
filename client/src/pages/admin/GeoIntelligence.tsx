/* ============================================================
   GEO-INTELLIGENCE MAP — Admin View
   Google Maps with color-coded inquiry pins, neighborhood
   clustering sidebar, and AI postcard recommendations.
   ============================================================ */

import { useState, useCallback, useRef } from "react";
import AdminLayout from "@/components/AdminLayout";
import { MapView } from "@/components/Map";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin, RefreshCw, Sparkles, ChevronRight, X, Mail,
  TrendingUp, Users, Loader2, AlertCircle, CheckCircle2,
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
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);

  // ── tRPC queries ──────────────────────────────────────────────────────────

  const pinsQuery = trpc.geoIntelligence.pins.useQuery(
    { serviceType: selectedType },
    { refetchOnWindowFocus: false }
  );

  const clustersQuery = trpc.geoIntelligence.clusters.useQuery(
    { serviceType: selectedType },
    { refetchOnWindowFocus: false }
  );

  const geocodeStatusQuery = trpc.geoIntelligence.geocodeStatus.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const geocodeBatchMutation = trpc.geoIntelligence.geocodeBatch.useMutation();
  const neighborhoodInsightsMutation = trpc.geoIntelligence.neighborhoodInsights.useMutation();

  const pins: Pin[] = (pinsQuery.data ?? []) as Pin[];
  const clusters: Cluster[] = (clustersQuery.data ?? []) as Cluster[];

  // ── Map initialization ────────────────────────────────────────────────────

  const handleMapReady = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    renderMarkers(map, pins);
  }, [pins]); // eslint-disable-line react-hooks/exhaustive-deps

  function renderMarkers(map: google.maps.Map, pinData: Pin[]) {
    // Clear existing markers
    markersRef.current.forEach(m => { m.map = null; });
    markersRef.current = [];

    if (!pinData.length) return;

    pinData.forEach(pin => {
      const color = getServiceColor(pin.serviceType).hex;

      // Create SVG pin element
      const pinEl = document.createElement("div");
      pinEl.style.cssText = `
        width: 20px; height: 20px; border-radius: 50% 50% 50% 0;
        background: ${color}; border: 2px solid white;
        transform: rotate(-45deg); cursor: pointer;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        transition: transform 0.15s ease;
      `;
      pinEl.addEventListener("mouseenter", () => {
        pinEl.style.transform = "rotate(-45deg) scale(1.3)";
      });
      pinEl.addEventListener("mouseleave", () => {
        pinEl.style.transform = "rotate(-45deg) scale(1)";
      });

      const marker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat: pin.lat, lng: pin.lng },
        content: pinEl,
        title: `${pin.name} — ${pin.serviceType}`,
      });

      // Info window on click
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="font-family: sans-serif; font-size: 13px; max-width: 200px; padding: 4px;">
            <strong style="color: #1a1a1a;">${pin.name}</strong><br/>
            <span style="color: ${color}; font-weight: 600;">${pin.serviceType}</span><br/>
            <span style="color: #555; font-size: 11px;">${pin.address}</span><br/>
            ${pin.budget ? `<span style="color: #888; font-size: 11px;">Budget: ${pin.budget}</span><br/>` : ""}
            <span style="color: #aaa; font-size: 11px;">${new Date(pin.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          </div>
        `,
      });

      marker.addListener("click", () => {
        infoWindow.open({ anchor: marker, map });
      });

      markersRef.current.push(marker);
    });
  }

  // Re-render markers when pins or filter changes
  const prevPinsRef = useRef<Pin[]>([]);
  if (mapRef.current && pins !== prevPinsRef.current) {
    prevPinsRef.current = pins;
    renderMarkers(mapRef.current, pins);
  }

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handleGeocodeBatch = async () => {
    setGeocodingBatch(true);
    try {
      const result = await geocodeBatchMutation.mutateAsync({ limit: 200 });
      toast.success(`Geocoded ${result.geocoded} addresses (${result.failed} failed, ${result.skipped} skipped)`);
      pinsQuery.refetch();
      clustersQuery.refetch();
      geocodeStatusQuery.refetch();
    } catch (err) {
      toast.error(`Geocoding failed: ${String(err)}`);
    } finally {
      setGeocodingBatch(false);
    }
  };

  const handleClusterClick = (cluster: Cluster) => {
    setSelectedCluster(cluster);
    setPostcardRec(null);
    // Pan map to cluster center
    if (mapRef.current) {
      mapRef.current.panTo({ lat: cluster.lat, lng: cluster.lng });
      mapRef.current.setZoom(14);
    }
  };

  const handleGenerateRec = async () => {
    if (!selectedCluster) return;
    setLoadingRec(true);
    try {
      const result = await neighborhoodInsightsMutation.mutateAsync({
        neighborhood: selectedCluster.neighborhood,
        city: selectedCluster.city,
        serviceType: selectedType !== "all" ? selectedType : undefined,
      });
      setPostcardRec(result.recommendation);
    } catch (err) {
      toast.error(`Failed to generate recommendation: ${String(err)}`);
    } finally {
      setLoadingRec(false);
    }
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setSelectedCluster(null);
    setPostcardRec(null);
  };

  // ── Geocode status ────────────────────────────────────────────────────────

  const geoStatus = geocodeStatusQuery.data;

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
              {pins.length} geocoded inquiries across {clusters.length} neighborhoods
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Geocode status badge */}
            {geoStatus && (
              <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
                {geoStatus.ungeocoded > 0
                  ? <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                  : <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                }
                {geoStatus.geocoded}/{geoStatus.total} geocoded ({geoStatus.pct}%)
              </div>
            )}

            {/* Geocode batch button */}
            {geoStatus && geoStatus.ungeocoded > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleGeocodeBatch}
                disabled={geocodingBatch}
                className="text-xs"
              >
                {geocodingBatch
                  ? <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />Geocoding…</>
                  : <><RefreshCw className="w-3.5 h-3.5 mr-1.5" />Geocode {geoStatus.ungeocoded} remaining</>
                }
              </Button>
            )}
          </div>
        </div>

        {/* Filter pills */}
        <div className="max-w-screen-2xl mx-auto mt-3 flex flex-wrap gap-2 items-center">
          <span className="text-xs font-medium text-slate-500 mr-1">Filter:</span>
          {INQUIRY_TYPES.map(t => (
            <button
              key={t.value}
              onClick={() => handleTypeChange(t.value)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
                selectedType === t.value
                  ? `${t.pill} border-transparent shadow-sm scale-105`
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main layout: map + sidebar */}
      <div className="flex-1 flex overflow-hidden" style={{ height: "calc(100vh - 140px)" }}>

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
          <MapView
            className="w-full h-full"
            initialCenter={{ lat: 44.0582, lng: -121.3153 }} // Bend, OR
            initialZoom={11}
            onMapReady={handleMapReady}
          />

          {/* Legend overlay */}
          <div className="absolute bottom-6 left-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200 p-3 text-xs">
            <p className="font-semibold text-slate-700 mb-2">Service Type</p>
            {Object.entries(SERVICE_COLORS).filter(([k]) => k !== "default").map(([key, val]) => (
              <div key={key} className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: val.hex }} />
                <span className="text-slate-600">{val.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-white border-l border-slate-200 flex flex-col overflow-hidden">

          {/* Neighborhood list */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                Top Neighborhoods
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Click to zoom and get AI recommendations</p>
            </div>

            {clustersQuery.isLoading ? (
              <div className="p-4 flex items-center gap-2 text-slate-400 text-sm">
                <Loader2 className="w-4 h-4 animate-spin" /> Loading clusters…
              </div>
            ) : clusters.length === 0 ? (
              <div className="p-4 text-center text-slate-400 text-sm">
                <MapPin className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p>No geocoded data yet.</p>
                <p className="text-xs mt-1">Click "Geocode remaining" above to start.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {clusters.slice(0, 20).map((cluster, i) => {
                  const topService = Object.entries(cluster.byServiceType)
                    .sort((a, b) => b[1] - a[1])[0];
                  const topColor = topService ? getServiceColor(topService[0]) : SERVICE_COLORS["default"];
                  const isSelected = selectedCluster?.neighborhood === cluster.neighborhood && selectedCluster?.city === cluster.city;

                  return (
                    <button
                      key={`${cluster.neighborhood}-${cluster.city}-${i}`}
                      onClick={() => handleClusterClick(cluster)}
                      className={`w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors ${
                        isSelected ? "bg-emerald-50 border-l-2 border-l-emerald-500" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">{cluster.neighborhood}</p>
                          <p className="text-xs text-slate-400 truncate">{cluster.city}</p>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: topColor.hex }} />
                          <span className="text-sm font-bold text-slate-700">{cluster.total}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                        </div>
                      </div>
                      {/* Service type mini-bars */}
                      <div className="mt-1.5 flex gap-0.5 h-1.5">
                        {Object.entries(cluster.byServiceType)
                          .sort((a, b) => b[1] - a[1])
                          .map(([svc, cnt]) => (
                            <div
                              key={svc}
                              className="rounded-full"
                              style={{
                                backgroundColor: getServiceColor(svc).hex,
                                width: `${(cnt / cluster.total) * 100}%`,
                                minWidth: "4px",
                              }}
                              title={`${svc}: ${cnt}`}
                            />
                          ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Selected neighborhood detail + AI recommendation */}
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

              {/* Service breakdown */}
              <div className="space-y-1">
                {Object.entries(selectedCluster.byServiceType)
                  .sort((a, b) => b[1] - a[1])
                  .map(([svc, cnt]) => {
                    const color = getServiceColor(svc);
                    return (
                      <div key={svc} className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color.hex }} />
                        <span className="text-slate-600 flex-1 truncate">{svc}</span>
                        <span className="font-semibold text-slate-700">{cnt}</span>
                        <span className="text-slate-400">({Math.round((cnt / selectedCluster.total) * 100)}%)</span>
                      </div>
                    );
                  })}
              </div>

              {/* AI recommendation */}
              {!postcardRec ? (
                <Button
                  size="sm"
                  onClick={handleGenerateRec}
                  disabled={loadingRec}
                  className="w-full text-xs bg-[oklch(0.35_0.1_150)] hover:bg-[oklch(0.3_0.1_150)] text-white"
                >
                  {loadingRec
                    ? <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />Generating…</>
                    : <><Sparkles className="w-3.5 h-3.5 mr-1.5" />Generate Postcard Recommendation</>
                  }
                </Button>
              ) : (
                <div className="bg-white rounded-lg border border-emerald-200 p-3 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                    <Mail className="w-3.5 h-3.5" />
                    AI Postcard Recommendation
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-0.5">Headline</p>
                    <p className="text-sm font-semibold text-slate-800 leading-snug">"{postcardRec.postcardHeadline}"</p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-0.5">Feature Service</p>
                    <Badge className={`text-xs ${getServiceColor(postcardRec.featuredService).pill}`}>
                      {postcardRec.featuredService}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-0.5">Best Send Months</p>
                    <div className="flex flex-wrap gap-1">
                      {postcardRec.bestMonths.map(m => (
                        <span key={m} className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-medium">{m}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-0.5">Why This Neighborhood</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{postcardRec.targetingRationale}</p>
                  </div>

                  <button
                    onClick={() => setPostcardRec(null)}
                    className="text-xs text-slate-400 hover:text-slate-600 underline"
                  >
                    Regenerate
                  </button>
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
