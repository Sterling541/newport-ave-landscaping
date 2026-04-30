import { toast } from "sonner";
/**
 * /admin/badge-scans — Badge scan leads management page
 * List all scans grouped by month, filter by date range / status / service.
 * Convert any scan to a Scheduled Service submission (same flow as Quick Forms).
 */
import { useState, useMemo, useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { QrCode, Search, Phone, Mail, Calendar, User, ChevronRight, SlidersHorizontal, ArrowLeft, CalendarRange } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";

// ── Constants ─────────────────────────────────────────────────────────────────

const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "scheduled", label: "Scheduled" },
  { value: "converted", label: "Converted" },
  { value: "lost_price", label: "Lost — Price" },
  { value: "lost_other", label: "Lost — Other" },
  { value: "no_response", label: "No Response" },
];

const SERVICE_OPTIONS = [
  { value: "all", label: "All Services" },
  { value: "maintenance", label: "Maintenance" },
  { value: "landscape_construction", label: "Landscape Construction" },
  { value: "irrigation_sprinkler", label: "Irrigation / Sprinkler" },
  { value: "other", label: "Other" },
];

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  scheduled: "bg-purple-100 text-purple-800",
  converted: "bg-green-100 text-green-800",
  lost_price: "bg-red-100 text-red-800",
  lost_other: "bg-red-100 text-red-800",
  no_response: "bg-gray-100 text-gray-700",
};

const SERVICE_LABELS: Record<string, string> = {
  maintenance: "Maintenance",
  landscape_construction: "Landscape Const.",
  irrigation_sprinkler: "Irrigation",
  other: "Other",
};

const CONVERT_SERVICE_OPTIONS = [
  "Lawn & Maintenance",
  "Irrigation / Sprinklers",
  "Landscape Design & Installation",
  "Paver Patios & Walkways",
  "Water Features",
  "Outdoor Kitchens & Living",
  "Fire Pits & Fireplaces",
  "Landscape Lighting",
  "Xeriscaping / Water-Wise",
  "Retaining Walls",
  "Drainage Solutions",
  "Snow Removal",
  "Firewise Landscaping",
  "Other / Not Sure",
];

const BUDGET_OPTIONS = [
  "Under $5,000",
  "$5,000 – $10,000",
  "$10,000 – $25,000",
  "$25,000 – $50,000",
  "$50,000 – $100,000",
  "$100,000+",
  "Not sure / flexible",
  "Other",
];

const HOW_HEARD_OPTIONS = [
  "Google Search",
  "Google Local Services Ad",
  "Referral from friend/neighbor",
  "Drove by a job site",
  "Social media",
  "Nextdoor",
  "Yelp",
  "Other",
];

const DATE_RANGE_OPTIONS = [
  { value: "this_month", label: "This Month" },
  { value: "last_month", label: "Last Month" },
  { value: "last_90_days", label: "Last 90 Days" },
  { value: "this_year", label: "This Year" },
  { value: "last_year", label: "Last Year" },
  { value: "all_time", label: "All Time" },
];

// ── Types ─────────────────────────────────────────────────────────────────────

type Scan = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceType: string;
  serviceTypeOther: string | null;
  message: string | null;
  status: string;
  notes: string | null;
  submittedAt: Date;
  employeeId: number | null;
  employeeCodeRaw: string | null;
  employeeName?: string | null;
  employeeNameFirst?: string | null;
  employeeNameLast?: string | null;
};

type ConvertForm = {
  firstName: string; lastName: string; email: string; phone: string;
  siteAddress: string; serviceType: string;
  salesConsultant: string; projectManager: string;
  budget: string; budgetOther: string;
  idealCompletionDate: string; howHeard: string;
  comments: string; usedBefore: string;
  flexibleScheduling: boolean; isPropertyOwner: string; hasPets: string;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function getDateRange(range: string): { dateFrom?: string; dateTo?: string } {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const fmt = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

  if (range === "this_month") {
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    return { dateFrom: fmt(start) };
  }
  if (range === "last_month") {
    const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const end = new Date(now.getFullYear(), now.getMonth(), 0);
    return { dateFrom: fmt(start), dateTo: fmt(end) };
  }
  if (range === "last_90_days") {
    const start = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
    return { dateFrom: fmt(start) };
  }
  if (range === "this_year") {
    const start = new Date(now.getFullYear(), 0, 1);
    return { dateFrom: fmt(start) };
  }
  if (range === "last_year") {
    const start = new Date(now.getFullYear() - 1, 0, 1);
    const end = new Date(now.getFullYear() - 1, 11, 31);
    return { dateFrom: fmt(start), dateTo: fmt(end) };
  }
  return {}; // all_time
}

function groupByMonth(scans: Scan[]): { label: string; scans: Scan[] }[] {
  const groups = new Map<string, Scan[]>();
  for (const scan of scans) {
    const d = new Date(scan.submittedAt);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(scan);
  }
  return Array.from(groups.entries())
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([key, scans]) => {
      const [year, month] = key.split("-");
      const label = new Date(Number(year), Number(month) - 1, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
      return { label, scans };
    });
}

const NAVY = "oklch(0.22 0.055 240)";

// ── Component ─────────────────────────────────────────────────────────────────

export default function AdminBadgeScans() {
  const utils = trpc.useUtils();

  // Filters
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState("this_month");
  const [showFilters, setShowFilters] = useState(false);

  // Detail sheet
  const [selectedScan, setSelectedScan] = useState<Scan | null>(null);
  const [editNotes, setEditNotes] = useState("");
  const [editStatus, setEditStatus] = useState("");

  // Convert modal
  const [convertScanId, setConvertScanId] = useState<number | null>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);

  // Google Maps Places autocomplete on the address field
  useEffect(() => {
    if (convertScanId === null) return;
    let destroyed = false;

    const initAutocomplete = () => {
      if (destroyed || !addressInputRef.current) return;
      const autocomplete = new window.google!.maps.places.Autocomplete(addressInputRef.current, {
        types: ["address"],
        componentRestrictions: { country: "us" },
        fields: ["formatted_address"],
      });
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.formatted_address) {
          setConvertForm(f => ({ ...f, siteAddress: place.formatted_address! }));
        }
      });
    };

    const waitAndInit = () => {
      if (window.google?.maps?.places) {
        initAutocomplete();
        return;
      }
      // Load the script if not already loading
      const existing = document.querySelector('script[data-maps-autocomplete]');
      if (!existing) {
        const apiKey = import.meta.env.VITE_FRONTEND_FORGE_API_KEY;
        const forgeBase = import.meta.env.VITE_FRONTEND_FORGE_API_URL || "https://forge.butterfly-effect.dev";
        const script = document.createElement("script");
        script.src = `${forgeBase}/v1/maps/proxy/maps/api/js?key=${apiKey}&v=weekly&libraries=places`;
        script.async = true;
        script.setAttribute("data-maps-autocomplete", "1");
        script.onload = () => { if (!destroyed) initAutocomplete(); };
        document.head.appendChild(script);
      } else {
        // Script already loading — poll
        const interval = setInterval(() => {
          if (window.google?.maps?.places) { clearInterval(interval); if (!destroyed) initAutocomplete(); }
        }, 200);
        return () => clearInterval(interval);
      }
    };

    // Small delay to let the modal DOM render before attaching
    const timer = setTimeout(waitAndInit, 50);
    return () => { destroyed = true; clearTimeout(timer); };
  }, [convertScanId]);
  const [convertForm, setConvertForm] = useState<ConvertForm>({
    firstName: "", lastName: "", email: "", phone: "",
    siteAddress: "", serviceType: "",
    salesConsultant: "", projectManager: "",
    budget: "", budgetOther: "",
    idealCompletionDate: "", howHeard: "",
    comments: "", usedBefore: "",
    flexibleScheduling: false, isPropertyOwner: "", hasPets: "",
  });

  // Build date params
  const { dateFrom, dateTo } = useMemo(() => getDateRange(dateRange), [dateRange]);

  const { data, isLoading } = trpc.badgeScan.adminListScans.useQuery({
    status: statusFilter === "all" ? "all" : (statusFilter as any),
    serviceType: serviceFilter === "all" ? "all" : (serviceFilter as any),
    dateRange: "all_time",
    dateFrom,
    dateTo,
    limit: 200,
    offset: 0,
  });

  const updateMutation = trpc.badgeScan.adminUpdateScan.useMutation({
    onSuccess: () => {
      utils.badgeScan.adminListScans.invalidate();
      if (selectedScan) {
        setSelectedScan(prev => prev ? { ...prev, status: editStatus, notes: editNotes } : null);
      }
      toast("Scan updated");
    },
    onError: (err) => toast.error("Error: " + String(err.message)),
  });

  const convertMutation = trpc.badgeScan.adminConvertToScheduled.useMutation({
    onSuccess: () => {
      utils.badgeScan.adminListScans.invalidate();
      setConvertScanId(null);
      setSelectedScan(null);
      toast.success("Converted to Scheduled Service successfully!");
    },
    onError: (err) => toast.error("Error converting: " + String(err.message)),
  });

  const { data: consultantSuggestion } = trpc.badgeScan.adminGetSuggestedConsultant.useQuery(
    { serviceType: convertForm.serviceType },
    { enabled: convertScanId !== null && convertForm.serviceType.trim().length > 0 }
  );

  const { data: activeSalesReps } = trpc.staff.listActiveSalesReps.useQuery(
    undefined,
    { staleTime: 5 * 60 * 1000 }
  );

  function openDetail(scan: Scan) {
    setSelectedScan(scan);
    setEditStatus(scan.status);
    setEditNotes(scan.notes ?? "");
  }

  function saveDetail() {
    if (!selectedScan) return;
    updateMutation.mutate({
      id: selectedScan.id,
      status: editStatus as any,
      notes: editNotes || undefined,
    });
  }

  function openConvert(scan: Scan) {
    // Map badge scan service type to the full service label
    const serviceMap: Record<string, string> = {
      maintenance: "Lawn & Maintenance",
      landscape_construction: "Landscape Design & Installation",
      irrigation_sprinkler: "Irrigation / Sprinklers",
      other: "",
    };
    setConvertForm({
      firstName: scan.firstName,
      lastName: scan.lastName,
      email: scan.email,
      phone: scan.phone,
      siteAddress: "",
      serviceType: serviceMap[scan.serviceType] ?? "",
      salesConsultant: "",
      projectManager: "",
      budget: "",
      budgetOther: "",
      idealCompletionDate: "",
      howHeard: "Drove by a job site",
      comments: scan.message ?? "",
      usedBefore: "",
      flexibleScheduling: false,
      isPropertyOwner: "",
      hasPets: "",
    });
    setConvertScanId(scan.id);
  }

  function submitConvert() {
    if (!convertScanId) return;
    if (!convertForm.siteAddress.trim()) { toast.error("Site address is required."); return; }
    if (!convertForm.serviceType.trim()) { toast.error("Service type is required."); return; }
    convertMutation.mutate({
      scanId: convertScanId,
      firstName: convertForm.firstName,
      lastName: convertForm.lastName,
      email: convertForm.email,
      phone: convertForm.phone,
      siteAddress: convertForm.siteAddress,
      serviceType: convertForm.serviceType,
      salesConsultant: convertForm.salesConsultant || undefined,
      projectManager: convertForm.projectManager || undefined,
      budget: convertForm.budget || undefined,
      budgetOther: convertForm.budgetOther || undefined,
      idealCompletionDate: convertForm.idealCompletionDate || undefined,
      howHeard: convertForm.howHeard || undefined,
      comments: convertForm.comments || undefined,
      usedBefore: convertForm.usedBefore || undefined,
      flexibleScheduling: convertForm.flexibleScheduling,
      isPropertyOwner: convertForm.isPropertyOwner || undefined,
      hasPets: convertForm.hasPets || undefined,
    });
  }

  const setField = (key: keyof ConvertForm, value: string | boolean) =>
    setConvertForm(f => ({ ...f, [key]: value }));

  // Filter client-side by search
  const allScans: Scan[] = useMemo(() => {
    const raw = data?.scans ?? [];
    if (!search.trim()) return raw;
    const q = search.toLowerCase();
    return raw.filter(s =>
      `${s.firstName} ${s.lastName}`.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.phone.toLowerCase().includes(q) ||
      (s.employeeName ?? "").toLowerCase().includes(q) ||
      ([s.employeeNameFirst, s.employeeNameLast].filter(Boolean).join(" ")).toLowerCase().includes(q)
    );
  }, [data?.scans, search]);

  const monthGroups = useMemo(() => groupByMonth(allScans), [allScans]);

  const totalCount = data?.total ?? 0;

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">

        {/* Convert to Scheduled Service Modal */}
        {convertScanId !== null && (
          <div
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 1000,
              display: "flex", alignItems: "flex-start", justifyContent: "center",
              padding: "2rem 1rem", overflowY: "auto" }}
            onClick={(e) => { if (e.target === e.currentTarget) setConvertScanId(null); }}
          >
            <div style={{ background: "white", borderRadius: "1rem", width: "100%", maxWidth: "680px",
              boxShadow: "0 8px 40px rgba(0,0,0,0.22)", overflow: "hidden" }}>
              {/* Modal header */}
              <div style={{ background: NAVY, padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <h2 style={{ color: "white", margin: 0, fontSize: "1.1rem", fontWeight: 700 }}>Convert to Scheduled Service</h2>
                  <p style={{ color: "oklch(0.75 0.04 240)", margin: "0.25rem 0 0", fontSize: "0.8rem" }}>
                    Pre-filled from the badge scan. Complete the missing details below.
                  </p>
                </div>
                <button onClick={() => setConvertScanId(null)}
                  style={{ background: "none", border: "none", color: "white", fontSize: "1.4rem", cursor: "pointer", lineHeight: 1 }}>×</button>
              </div>
              {/* Modal body */}
              <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem", maxHeight: "70vh", overflowY: "auto" }}>
                {/* Customer Info */}
                <div style={{ background: "oklch(0.97 0.005 240)", borderRadius: "0.6rem", padding: "1rem" }}>
                  <p style={{ fontSize: "0.72rem", fontWeight: 700, color: NAVY, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>Customer Information</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    {([["First Name *", "firstName"], ["Last Name *", "lastName"], ["Email *", "email"], ["Phone *", "phone"]] as [string, keyof ConvertForm][]).map(([lbl, key]) => (
                      <div key={key}>
                        <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "oklch(0.45 0.04 240)", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "0.3rem" }}>{lbl}</label>
                        <input type={key === "email" ? "email" : "text"}
                          style={{ width: "100%", padding: "0.45rem 0.65rem", border: "1.5px solid oklch(0.82 0.01 240)", borderRadius: "0.4rem", fontSize: "0.85rem", color: NAVY, background: "white", boxSizing: "border-box" }}
                          value={convertForm[key] as string}
                          onChange={e => setField(key, e.target.value)} />
                      </div>
                    ))}
                    <div style={{ gridColumn: "1 / -1" }}>
                      <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "oklch(0.45 0.04 240)", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "0.3rem" }}>Site Address *</label>
                      <input
                        ref={addressInputRef}
                        style={{ width: "100%", padding: "0.45rem 0.65rem", border: "1.5px solid oklch(0.82 0.01 240)", borderRadius: "0.4rem", fontSize: "0.85rem", color: NAVY, background: "white", boxSizing: "border-box" }}
                        value={convertForm.siteAddress}
                        onChange={e => setField("siteAddress", e.target.value)}
                        placeholder="Start typing address…" />
                    </div>
                  </div>
                </div>

                {/* Service Details */}
                <div style={{ background: "oklch(0.97 0.005 240)", borderRadius: "0.6rem", padding: "1rem" }}>
                  <p style={{ fontSize: "0.72rem", fontWeight: 700, color: NAVY, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>Service Details</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "oklch(0.45 0.04 240)", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "0.3rem" }}>Service Type *</label>
                      <select style={{ width: "100%", padding: "0.45rem 0.65rem", border: "1.5px solid oklch(0.82 0.01 240)", borderRadius: "0.4rem", fontSize: "0.85rem", color: NAVY, background: "white", boxSizing: "border-box" }}
                        value={convertForm.serviceType} onChange={e => setField("serviceType", e.target.value)}>
                        <option value="">— Select service —</option>
                        {CONVERT_SERVICE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "oklch(0.45 0.04 240)", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "0.3rem" }}>Budget</label>
                      <select style={{ width: "100%", padding: "0.45rem 0.65rem", border: "1.5px solid oklch(0.82 0.01 240)", borderRadius: "0.4rem", fontSize: "0.85rem", color: NAVY, background: "white", boxSizing: "border-box" }}
                        value={convertForm.budget} onChange={e => setField("budget", e.target.value)}>
                        <option value="">— Select —</option>
                        {BUDGET_OPTIONS.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                    {convertForm.budget === "Other" && (
                      <div>
                        <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "oklch(0.45 0.04 240)", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "0.3rem" }}>Budget (specify)</label>
                        <input style={{ width: "100%", padding: "0.45rem 0.65rem", border: "1.5px solid oklch(0.82 0.01 240)", borderRadius: "0.4rem", fontSize: "0.85rem", color: NAVY, background: "white", boxSizing: "border-box" }}
                          value={convertForm.budgetOther} onChange={e => setField("budgetOther", e.target.value)} placeholder="e.g. $15,000" />
                      </div>
                    )}
                    <div>
                      <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "oklch(0.45 0.04 240)", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "0.3rem" }}>Ideal Completion Date</label>
                      <input type="date" style={{ width: "100%", padding: "0.45rem 0.65rem", border: "1.5px solid oklch(0.82 0.01 240)", borderRadius: "0.4rem", fontSize: "0.85rem", color: NAVY, background: "white", boxSizing: "border-box" }}
                        value={convertForm.idealCompletionDate} onChange={e => setField("idealCompletionDate", e.target.value)} />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "oklch(0.45 0.04 240)", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "0.3rem" }}>How Did They Hear About Us?</label>
                      <select style={{ width: "100%", padding: "0.45rem 0.65rem", border: "1.5px solid oklch(0.82 0.01 240)", borderRadius: "0.4rem", fontSize: "0.85rem", color: NAVY, background: "white", boxSizing: "border-box" }}
                        value={convertForm.howHeard} onChange={e => setField("howHeard", e.target.value)}>
                        <option value="">— Select —</option>
                        {HOW_HEARD_OPTIONS.map(h => <option key={h} value={h}>{h}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "oklch(0.45 0.04 240)", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "0.3rem" }}>Used Newport Before?</label>
                      <select style={{ width: "100%", padding: "0.45rem 0.65rem", border: "1.5px solid oklch(0.82 0.01 240)", borderRadius: "0.4rem", fontSize: "0.85rem", color: NAVY, background: "white", boxSizing: "border-box" }}
                        value={convertForm.usedBefore} onChange={e => setField("usedBefore", e.target.value)}>
                        <option value="">— Select —</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Staff Assignment */}
                <div style={{ background: "oklch(0.97 0.005 240)", borderRadius: "0.6rem", padding: "1rem" }}>
                  <p style={{ fontSize: "0.72rem", fontWeight: 700, color: NAVY, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>Staff Assignment</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    <div>
                      <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "oklch(0.45 0.04 240)", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "0.3rem" }}>
                        Scheduled With
                        {consultantSuggestion && (
                          <span style={{ marginLeft: "0.4rem", fontSize: "0.65rem", background: consultantSuggestion.isRotating ? "oklch(0.92 0.08 145)" : "oklch(0.92 0.08 220)", color: consultantSuggestion.isRotating ? "oklch(0.3 0.12 145)" : "oklch(0.3 0.12 220)", borderRadius: "0.25rem", padding: "0.1rem 0.35rem", fontWeight: 700 }}>
                            ★ Suggested: {consultantSuggestion.consultant}
                          </span>
                        )}
                      </label>
                      <select style={{ width: "100%", padding: "0.45rem 0.65rem", border: "1.5px solid oklch(0.82 0.01 240)", borderRadius: "0.4rem", fontSize: "0.85rem", color: NAVY, background: "white", boxSizing: "border-box" }}
                        value={convertForm.salesConsultant || (consultantSuggestion?.consultant ?? "")}
                        onChange={e => setField("salesConsultant", e.target.value)}>
                        <option value="">— Select consultant —</option>
                        {(activeSalesReps && activeSalesReps.length > 0
                          ? activeSalesReps
                          : [
                              { id: -1, firstName: "Nathan", lastName: "Kooy", title: "Install/Design" },
                              { id: -2, firstName: "William", lastName: "Miller", title: "Install/Design" },
                              { id: -3, firstName: "Danny", lastName: "Sheffield", title: "Enhancements" },
                            ]
                        ).map(rep => (
                          <option key={rep.id} value={`${rep.firstName} ${rep.lastName}`}>
                            {rep.firstName} {rep.lastName}{rep.title ? ` (${rep.title})` : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "oklch(0.45 0.04 240)", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "0.3rem" }}>Project Manager</label>
                      <input style={{ width: "100%", padding: "0.45rem 0.65rem", border: "1.5px solid oklch(0.82 0.01 240)", borderRadius: "0.4rem", fontSize: "0.85rem", color: NAVY, background: "white", boxSizing: "border-box" }}
                        value={convertForm.projectManager} onChange={e => setField("projectManager", e.target.value)} placeholder="e.g. Maria" />
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div style={{ background: "oklch(0.97 0.005 240)", borderRadius: "0.6rem", padding: "1rem" }}>
                  <p style={{ fontSize: "0.72rem", fontWeight: 700, color: NAVY, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>Additional Info</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    <div>
                      <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "oklch(0.45 0.04 240)", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "0.3rem" }}>Property Owner?</label>
                      <select style={{ width: "100%", padding: "0.45rem 0.65rem", border: "1.5px solid oklch(0.82 0.01 240)", borderRadius: "0.4rem", fontSize: "0.85rem", color: NAVY, background: "white", boxSizing: "border-box" }}
                        value={convertForm.isPropertyOwner} onChange={e => setField("isPropertyOwner", e.target.value)}>
                        <option value="">— Select —</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "oklch(0.45 0.04 240)", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "0.3rem" }}>Has Pets?</label>
                      <select style={{ width: "100%", padding: "0.45rem 0.65rem", border: "1.5px solid oklch(0.82 0.01 240)", borderRadius: "0.4rem", fontSize: "0.85rem", color: NAVY, background: "white", boxSizing: "border-box" }}
                        value={convertForm.hasPets} onChange={e => setField("hasPets", e.target.value)}>
                        <option value="">— Select —</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <label style={{ fontSize: "0.85rem", color: NAVY, display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer" }}>
                        <input type="checkbox" checked={convertForm.flexibleScheduling}
                          onChange={e => setField("flexibleScheduling", e.target.checked)} />
                        Flexible with scheduling
                      </label>
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "oklch(0.45 0.04 240)", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "0.3rem" }}>Notes / Comments</label>
                      <textarea style={{ width: "100%", padding: "0.45rem 0.65rem", border: "1.5px solid oklch(0.82 0.01 240)", borderRadius: "0.4rem", fontSize: "0.85rem", color: NAVY, background: "white", boxSizing: "border-box", minHeight: "80px", resize: "vertical" }}
                        value={convertForm.comments} onChange={e => setField("comments", e.target.value)}
                        placeholder="Any additional notes…" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal footer */}
              <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid oklch(0.92 0.005 240)", display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
                <button onClick={() => setConvertScanId(null)}
                  style={{ background: "white", color: "oklch(0.5 0.02 240)", border: "1.5px solid oklch(0.88 0.01 240)", borderRadius: "0.5rem", padding: "0.5rem 1.25rem", fontSize: "0.875rem", cursor: "pointer", fontWeight: 500 }}>
                  Cancel
                </button>
                <button onClick={submitConvert} disabled={convertMutation.isPending}
                  style={{ background: "oklch(0.35 0.14 145)", color: "white", border: "none", borderRadius: "0.5rem", padding: "0.5rem 1.5rem", fontSize: "0.875rem", fontWeight: 700, cursor: convertMutation.isPending ? "not-allowed" : "pointer", opacity: convertMutation.isPending ? 0.7 : 1 }}>
                  {convertMutation.isPending ? "Converting…" : "✓ Convert to Scheduled Service"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Back button */}
        <a href="/admin/submissions" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Admin
        </a>

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Badge Scan Leads</h1>
            <p className="text-sm text-gray-500 mt-1">{totalCount} total leads</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowFilters(f => !f)} className="gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </Button>
        </div>

        {/* Date range + search bar — always visible */}
        <div className="flex flex-wrap gap-3 mb-4 items-center">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
            <CalendarRange className="w-4 h-4 text-gray-400 ml-2" />
            {DATE_RANGE_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => setDateRange(opt.value)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  dateRange === opt.value
                    ? "bg-[#2d5a27] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search name, email, phone, employee..."
              className="pl-9"
            />
          </div>
        </div>

        {/* Additional filters */}
        {showFilters && (
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Service" />
              </SelectTrigger>
              <SelectContent>
                {SERVICE_OPTIONS.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Quick status pills */}
        <div className="flex gap-2 flex-wrap mb-4">
          {STATUS_OPTIONS.slice(1).map(s => {
            const count = (data?.scans ?? []).filter(sc => sc.status === s.value).length;
            return (
              <button
                key={s.value}
                onClick={() => setStatusFilter(statusFilter === s.value ? "all" : s.value)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                  statusFilter === s.value
                    ? "bg-[#2d5a27] text-white border-[#2d5a27]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                }`}
              >
                {s.label} {count > 0 && <span className="ml-1 opacity-70">({count})</span>}
              </button>
            );
          })}
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="p-8 text-center text-gray-400">Loading...</div>
        ) : allScans.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-xl border border-gray-200">
            <QrCode className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No badge scan leads for this period</p>
            <p className="text-sm text-gray-400 mt-1">Try selecting a different date range above</p>
          </div>
        ) : (
          <div className="space-y-6">
            {monthGroups.map(group => (
              <div key={group.label}>
                {/* Month header */}
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-sm font-semibold text-gray-700">{group.label}</h2>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{group.scans.length} lead{group.scans.length !== 1 ? "s" : ""}</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="font-semibold">Customer</TableHead>
                          <TableHead className="font-semibold">Service</TableHead>
                          <TableHead className="font-semibold">Employee</TableHead>
                          <TableHead className="font-semibold">Status</TableHead>
                          <TableHead className="font-semibold">Submitted</TableHead>
                          <TableHead />
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {group.scans.map(scan => (
                          <TableRow
                            key={scan.id}
                            className="cursor-pointer hover:bg-gray-50"
                            onClick={() => openDetail(scan)}
                          >
                            <TableCell>
                              <div className="font-medium text-gray-900">{scan.firstName} {scan.lastName}</div>
                              <div className="text-xs text-gray-500">{scan.email}</div>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm text-gray-700">
                                {SERVICE_LABELS[scan.serviceType] ?? scan.serviceType}
                                {scan.serviceType === "other" && scan.serviceTypeOther && (
                                  <span className="text-gray-400"> — {scan.serviceTypeOther}</span>
                                )}
                              </span>
                            </TableCell>
                            <TableCell>
                              {scan.employeeNameFirst || scan.employeeNameLast ? (
                                <span className="text-sm text-gray-700">{[scan.employeeNameFirst, scan.employeeNameLast].filter(Boolean).join(" ")}</span>
                              ) : scan.employeeName ? (
                                <span className="text-sm text-gray-700">{scan.employeeName}</span>
                              ) : scan.employeeCodeRaw ? (
                                <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{scan.employeeCodeRaw}</code>
                              ) : (
                                <span className="text-xs text-gray-400">—</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[scan.status] ?? "bg-gray-100 text-gray-700"}`}>
                                {STATUS_OPTIONS.find(s => s.value === scan.status)?.label ?? scan.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-sm text-gray-500 whitespace-nowrap">
                              {new Date(scan.submittedAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detail Sheet */}
        <Sheet open={!!selectedScan} onOpenChange={open => { if (!open) setSelectedScan(null); }}>
          <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
            {selectedScan && (
              <>
                <SheetHeader className="mb-6">
                  <SheetTitle className="text-xl">
                    {selectedScan.firstName} {selectedScan.lastName}
                  </SheetTitle>
                  <span className={`inline-flex w-fit items-center px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[selectedScan.status] ?? "bg-gray-100 text-gray-700"}`}>
                    {STATUS_OPTIONS.find(s => s.value === selectedScan.status)?.label ?? selectedScan.status}
                  </span>
                </SheetHeader>

                {/* Contact info */}
                <div className="space-y-3 mb-6">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Contact</h3>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <a href={`mailto:${selectedScan.email}`} className="text-[#2d5a27] hover:underline">{selectedScan.email}</a>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <a href={`tel:${selectedScan.phone}`} className="text-[#2d5a27] hover:underline">{selectedScan.phone}</a>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-700">Submitted {new Date(selectedScan.submittedAt).toLocaleString()}</span>
                  </div>
                  {(selectedScan.employeeNameFirst || selectedScan.employeeNameLast) && (
                    <div className="flex items-center gap-3 text-sm">
                      <User className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <span className="text-gray-700">Employee's Name: <strong>{[selectedScan.employeeNameFirst, selectedScan.employeeNameLast].filter(Boolean).join(" ")}</strong></span>
                    </div>
                  )}
                  {selectedScan.employeeName && (
                    <div className="flex items-center gap-3 text-sm">
                      <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-700">Badge ID employee: <strong>{selectedScan.employeeName}</strong></span>
                    </div>
                  )}
                </div>

                {/* Service info */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Service Request</h3>
                  <p className="text-sm font-medium text-gray-900">
                    {SERVICE_LABELS[selectedScan.serviceType] ?? selectedScan.serviceType}
                    {selectedScan.serviceType === "other" && selectedScan.serviceTypeOther && (
                      <span className="font-normal text-gray-600"> — {selectedScan.serviceTypeOther}</span>
                    )}
                  </p>
                  {selectedScan.message && (
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">{selectedScan.message}</p>
                  )}
                </div>

                {/* Convert button — only show if not already converted */}
                {selectedScan.status !== "converted" && (
                  <div className="mb-6">
                    <Button
                      onClick={() => openConvert(selectedScan)}
                      className="w-full bg-[#2d5a27] hover:bg-[#1a3a1a] gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      Convert to Scheduled Service
                    </Button>
                    <p className="text-xs text-gray-400 mt-1.5 text-center">Creates a full service submission in the Admin Dashboard</p>
                  </div>
                )}

                {/* Edit status */}
                <div className="space-y-4 mb-6">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Update Status</h3>
                  <Select value={editStatus} onValueChange={setEditStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.slice(1).map(o => (
                        <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Notes */}
                <div className="space-y-2 mb-6">
                  <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Internal Notes</Label>
                  <Textarea
                    value={editNotes}
                    onChange={e => setEditNotes(e.target.value)}
                    placeholder="Add notes about this lead..."
                    className="resize-none h-28"
                  />
                </div>

                {/* Save */}
                <Button
                  onClick={saveDetail}
                  disabled={updateMutation.isPending}
                  className="w-full bg-[#2d5a27] hover:bg-[#1a3a1a]"
                >
                  {updateMutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </AdminLayout>
  );
}
