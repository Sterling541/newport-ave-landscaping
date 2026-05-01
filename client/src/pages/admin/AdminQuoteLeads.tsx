/* ============================================================
   ADMIN QUOTE LEADS PAGE
   Newport Avenue Landscaping
   Displays all Quick Quote / Get a Quote submissions with
   status management, filtering, and notes.
   ============================================================ */
import React, { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";

/* ── Source logo / badge component ──────────────────────────────────────── */
const NEWPORT_LOGO = "/manus-storage/logo-nav-tight_c562b49c_88ff2608.webp";

const SOURCE_CONFIG: Record<string, { label: string; logo?: string; color: string; textColor: string; svgLogo?: React.ReactNode }> = {
  quick_form: {
    label: "Newport Website",
    logo: NEWPORT_LOGO,
    color: "oklch(0.92 0.08 145)",
    textColor: "oklch(0.28 0.14 145)",
  },
  yelp: {
    label: "Yelp",
    color: "oklch(0.95 0.08 25)",
    textColor: "oklch(0.42 0.22 25)",
    svgLogo: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="#d32323">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14.5c-.28.28-.65.44-1.04.44-.39 0-.76-.16-1.04-.44l-3.46-3.46c-.28-.28-.44-.65-.44-1.04 0-.39.16-.76.44-1.04l1.06-1.06c.28-.28.65-.44 1.04-.44.39 0 .76.16 1.04.44l1.36 1.36 3.86-3.86c.28-.28.65-.44 1.04-.44.39 0 .76.16 1.04.44l1.06 1.06c.28.28.44.65.44 1.04 0 .39-.16.76-.44 1.04L10.5 16.5z"/>
      </svg>
    ),
  },
  google: {
    label: "Google",
    color: "oklch(0.97 0.01 240)",
    textColor: "oklch(0.35 0.05 240)",
    svgLogo: (
      <svg viewBox="0 0 24 24" width="52" height="18">
        <text x="0" y="16" fontFamily="'Product Sans', Arial, sans-serif" fontSize="15" fontWeight="500">
          <tspan fill="#4285F4">G</tspan>
          <tspan fill="#EA4335">o</tspan>
          <tspan fill="#FBBC05">o</tspan>
          <tspan fill="#4285F4">g</tspan>
          <tspan fill="#34A853">l</tspan>
          <tspan fill="#EA4335">e</tspan>
        </text>
      </svg>
    ),
  },
  houzz: {
    label: "Houzz",
    color: "oklch(0.95 0.04 30)",
    textColor: "oklch(0.35 0.08 30)",
    svgLogo: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="#7ac142">
        <path d="M12 2L4 7v15h6v-7h4v7h6V7L12 2z"/>
      </svg>
    ),
  },
  angi: {
    label: "Angi",
    color: "oklch(0.94 0.06 15)",
    textColor: "oklch(0.38 0.18 15)",
    svgLogo: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="#FF6153">
        <circle cx="12" cy="12" r="10"/>
        <text x="12" y="16" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="Arial">Angi</text>
      </svg>
    ),
  },
  homeadvisor: {
    label: "HomeAdvisor",
    color: "oklch(0.94 0.06 200)",
    textColor: "oklch(0.30 0.12 200)",
    svgLogo: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="#F68B1F">
        <path d="M12 2L2 7l2 13h16L22 7 12 2zm0 3l7 3.5-1.5 10h-11L5 8.5 12 5z"/>
      </svg>
    ),
  },
  thumbtack: {
    label: "Thumbtack",
    color: "oklch(0.94 0.08 220)",
    textColor: "oklch(0.30 0.14 220)",
    svgLogo: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="#009FD9">
        <circle cx="12" cy="12" r="10"/>
        <text x="12" y="16" textAnchor="middle" fill="white" fontSize="8" fontWeight="700" fontFamily="Arial">TT</text>
      </svg>
    ),
  },
  nextdoor: {
    label: "Nextdoor",
    color: "oklch(0.93 0.08 145)",
    textColor: "oklch(0.28 0.14 145)",
    svgLogo: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="#00B246">
        <circle cx="12" cy="12" r="10"/>
        <text x="12" y="16" textAnchor="middle" fill="white" fontSize="8" fontWeight="700" fontFamily="Arial">ND</text>
      </svg>
    ),
  },
  facebook: {
    label: "Facebook",
    color: "oklch(0.93 0.08 250)",
    textColor: "oklch(0.28 0.14 250)",
    svgLogo: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="#1877F2">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  badge_scan: {
    label: "Badge Scan",
    color: "oklch(0.93 0.05 280)",
    textColor: "oklch(0.28 0.14 280)",
    svgLogo: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1" stroke="oklch(0.28 0.14 280)" strokeWidth="1.5"/>
        <rect x="4.5" y="4.5" width="4" height="4" fill="oklch(0.28 0.14 280)" rx="0.5"/>
        <rect x="14" y="3" width="7" height="7" rx="1" stroke="oklch(0.28 0.14 280)" strokeWidth="1.5"/>
        <rect x="15.5" y="4.5" width="4" height="4" fill="oklch(0.28 0.14 280)" rx="0.5"/>
        <rect x="3" y="14" width="7" height="7" rx="1" stroke="oklch(0.28 0.14 280)" strokeWidth="1.5"/>
        <rect x="4.5" y="15.5" width="4" height="4" fill="oklch(0.28 0.14 280)" rx="0.5"/>
        <rect x="14" y="14" width="3" height="3" fill="oklch(0.28 0.14 280)"/>
        <rect x="18.5" y="14" width="2.5" height="2.5" fill="oklch(0.28 0.14 280)"/>
        <rect x="14" y="18.5" width="2.5" height="2.5" fill="oklch(0.28 0.14 280)"/>
        <rect x="18.5" y="18.5" width="2.5" height="2.5" fill="oklch(0.28 0.14 280)"/>
      </svg>
    ),
  },
  other: {
    label: "Other",
    color: "oklch(0.93 0.01 240)",
    textColor: "oklch(0.45 0.03 240)",
  },
};

function SourceBadge({ source, sourceLabel }: { source: string; sourceLabel?: string | null }) {
  const cfg = SOURCE_CONFIG[source] ?? SOURCE_CONFIG.other;
  const displayLabel = sourceLabel || cfg.label;

  if (source === "quick_form") {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
        <img
          src={NEWPORT_LOGO}
          alt="Newport Ave"
          style={{ height: "22px", width: "auto", objectFit: "contain" }}
        />
        <span style={{
          fontSize: "0.68rem", fontWeight: 700, color: cfg.textColor,
          background: cfg.color, borderRadius: "0.3rem", padding: "0.1rem 0.4rem",
          textTransform: "uppercase", letterSpacing: "0.04em",
        }}>
          Newport Website
        </span>
      </div>
    );
  }

  if (source === "google") {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {cfg.svgLogo}
      </div>
    );
  }

  if (cfg.svgLogo) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
        {cfg.svgLogo}
        <span style={{
          fontSize: "0.72rem", fontWeight: 700, color: cfg.textColor,
        }}>
          {displayLabel}
        </span>
      </div>
    );
  }

  return (
    <span style={{
      display: "inline-block",
      fontSize: "0.72rem", fontWeight: 700, color: cfg.textColor,
      background: cfg.color, borderRadius: "0.3rem", padding: "0.2rem 0.5rem",
      textTransform: "uppercase", letterSpacing: "0.04em",
    }}>
      {displayLabel}
    </span>
  );
}

const STATUS_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  new:            { bg: "oklch(0.92 0.10 145)", text: "oklch(0.30 0.14 145)", label: "New" },
  left_voicemail: { bg: "oklch(0.94 0.10 75)",  text: "oklch(0.38 0.14 75)",  label: "Left Voicemail" },
  contacted:      { bg: "oklch(0.92 0.08 240)", text: "oklch(0.35 0.12 240)", label: "Contacted" },
  quoted:         { bg: "oklch(0.95 0.10 75)",  text: "oklch(0.40 0.14 75)",  label: "Quoted" },
  converted:      { bg: "oklch(0.90 0.12 145)", text: "oklch(0.25 0.16 145)", label: "Converted" },
  lost:           { bg: "oklch(0.93 0.04 0)",   text: "oklch(0.45 0.10 0)",   label: "Lost" },
};

function formatDate(ts: Date | number | null | undefined): string {
  if (!ts) return "—";
  return new Date(ts).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const SERVICE_OPTIONS = [
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

type ConvertForm = {
  firstName: string; lastName: string; email: string; phone: string;
  siteAddress: string; serviceType: string;
  salesConsultant: string; projectManager: string;
  budget: string; budgetOther: string;
  idealCompletionDate: string; howHeard: string;
  comments: string; usedBefore: string;
  flexibleScheduling: boolean; isPropertyOwner: string; hasPets: string;
};

export default function AdminQuoteLeads() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showSpam, setShowSpam] = useState(false);
  const [showConverted, setShowConverted] = useState(false);
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [showAddLead, setShowAddLead] = useState(false);
  const [addLeadForm, setAddLeadForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", serviceInterest: "", message: "",
    source: "yelp", sourceLabel: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editStatus, setEditStatus] = useState<string>("new");
  const [editNotes, setEditNotes] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  // Convert modal state
  const [convertLeadId, setConvertLeadId] = useState<number | null>(null);
  const [convertForm, setConvertForm] = useState<ConvertForm>({
    firstName: "", lastName: "", email: "", phone: "",
    siteAddress: "", serviceType: "",
    salesConsultant: "", projectManager: "",
    budget: "", budgetOther: "",
    idealCompletionDate: "", howHeard: "",
    comments: "", usedBefore: "",
    flexibleScheduling: false, isPropertyOwner: "", hasPets: "",
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const { data, isLoading, refetch } = trpc.quoteLeads.list.useQuery(
    { limit: 200, offset: 0, includeSpam: showSpam, showConverted },
    { refetchOnWindowFocus: false }
  );

  const markSpamMutation = trpc.quoteLeads.markSpam.useMutation({
    onSuccess: (_, variables) => {
      showToast(variables.isSpam ? "Marked as spam" : "Unmarked as spam");
      refetch();
    },
    onError: (err) => showToast(`Error: ${err.message}`),
  });

  const addLeadMutation = trpc.quoteLeads.submit.useMutation({
    onSuccess: () => {
      setShowAddLead(false);
      setAddLeadForm({ firstName: "", lastName: "", email: "", phone: "", address: "", serviceInterest: "", message: "", source: "yelp", sourceLabel: "" });
      showToast("Lead added successfully!");
      refetch();
    },
    onError: (err) => showToast(`Error: ${err.message}`),
  });

  const updateMutation = trpc.quoteLeads.updateStatus.useMutation({
    onSuccess: () => {
      setEditingId(null);
      showToast("Status updated successfully.");
      refetch();
    },
    onError: (err) => showToast(`Error: ${err.message}`),
  });

  const convertMutation = trpc.quoteLeads.convertToScheduled.useMutation({
    onSuccess: () => {
      refetch();
      setConvertLeadId(null);
      showToast("Lead converted to Scheduled Service successfully!");
    },
    onError: (err) => showToast(`Error converting: ${err.message}`),
  });
  // Smart consultant suggestion based on service type
  const { data: consultantSuggestion, refetch: refetchSuggestion } = trpc.quoteLeads.getSuggestedConsultant.useQuery(
    { serviceType: convertForm.serviceType },
    { enabled: convertLeadId !== null && convertForm.serviceType.trim().length > 0 }
  );
  const { data: activeSalesReps } = trpc.staff.listActiveSalesReps.useQuery(
    undefined,
    { staleTime: 5 * 60 * 1000 }
  );

  const [, navigate] = useLocation();

  const saveAsContactMutation = trpc.contacts.createContact.useMutation({
    onSuccess: (data) => {
      showToast("Contact created! Opening contact page…");
      setTimeout(() => navigate(`/admin/contacts/${data.id}`), 800);
    },
    onError: (err) => showToast(`Error creating contact: ${err.message}`),
  });

  const saveAsPropertyMutation = trpc.contacts.createProperty.useMutation({
    onSuccess: (data) => {
      showToast("Property created! Opening property page…");
      setTimeout(() => navigate(`/admin/properties/${data.id}`), 800);
    },
    onError: (err) => showToast(`Error creating property: ${err.message}`),
  });

  const handleSaveAsProperty = (row: typeof rows[0]) => {
    const addrParts = (row.address ?? "").split(",").map((s: string) => s.trim());
    const address = addrParts[0] ?? "";
    const city = addrParts[1] ?? "";
    const stateZip = (addrParts[2] ?? "").trim().split(" ");
    const state = stateZip[0] ?? "";
    const zip = stateZip[1] ?? "";
    saveAsPropertyMutation.mutate({
      address,
      city,
      state,
      zip,
      propertyType: "residential",
      notes: row.message ? `Lead message: ${row.message}` : undefined,
      sourceLeadId: row.id,
    });
  };

  const handleSaveAsContact = (row: typeof rows[0]) => {
    // Parse address into parts (best-effort: "123 Main St, Bend, OR 97701")
    const addrParts = (row.address ?? "").split(",").map(s => s.trim());
    const mailingAddress = addrParts[0] ?? "";
    const mailingCity = addrParts[1] ?? "";
    const stateZip = (addrParts[2] ?? "").trim().split(" ");
    const mailingState = stateZip[0] ?? "";
    const mailingZip = stateZip[1] ?? "";
    saveAsContactMutation.mutate({
      contactType: "prospect",
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email || undefined,
      phone: row.phone || undefined,
      mailingAddress,
      mailingCity,
      mailingState,
      mailingZip,
      notes: row.message ? `Lead message: ${row.message}` : undefined,
      sourceLeadId: row.id,
    });
  };

  const updateServiceInterestMutation = trpc.quoteLeads.updateServiceInterest.useMutation({
    onSuccess: () => { refetch(); showToast("Service type updated."); },
    onError: (err) => showToast(`Error: ${err.message}`),
  });

  const openConvert = (row: typeof rows[0]) => {
    setConvertForm({
      firstName: row.firstName, lastName: row.lastName,
      email: row.email, phone: row.phone,
      siteAddress: row.address ?? "",
      serviceType: row.serviceInterest ?? "",
      salesConsultant: "", projectManager: "", // will be auto-filled by suggestion query
      budget: "", budgetOther: "",
      idealCompletionDate: "", howHeard: "",
      comments: row.message ?? "", usedBefore: "",
      flexibleScheduling: false, isPropertyOwner: "", hasPets: "",
    });
    setConvertLeadId(row.id);
  };

  const submitConvert = () => {
    if (!convertLeadId) return;
    if (!convertForm.siteAddress.trim()) { showToast("Site address is required."); return; }
    if (!convertForm.serviceType.trim()) { showToast("Service type is required."); return; }
    convertMutation.mutate({
      quoteLeadId: convertLeadId,
      firstName: convertForm.firstName, lastName: convertForm.lastName,
      email: convertForm.email, phone: convertForm.phone,
      siteAddress: convertForm.siteAddress, serviceType: convertForm.serviceType,
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
  };

  const setField = (key: keyof ConvertForm, value: string | boolean) =>
    setConvertForm(f => ({ ...f, [key]: value }));

  const rows = data?.rows ?? [];
  const total = data?.total ?? 0;

  const filtered = rows.filter((r) => {
    if (!showSpam && r.isSpam) return false;
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    const matchService = serviceFilter === "all" || (r.serviceInterest ?? "") === serviceFilter;
    const matchSource = sourceFilter === "all" || (r.source ?? "quick_form") === sourceFilter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      `${r.firstName} ${r.lastName}`.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.phone.toLowerCase().includes(q) ||
      (r.address ?? "").toLowerCase().includes(q) ||
      (r.serviceInterest ?? "").toLowerCase().includes(q) ||
      (r.message ?? "").toLowerCase().includes(q);
    return matchStatus && matchService && matchSource && matchSearch;
  });

  const hasActiveFilters = search !== "" || statusFilter !== "all" || serviceFilter !== "all" || sourceFilter !== "all";

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setServiceFilter("all");
    setSourceFilter("all");
  };
  const spamCount = rows.filter(r => r.isSpam).length;

  const openEdit = (row: typeof rows[0]) => {
    setEditingId(row.id);
    setEditStatus(row.status);
    setEditNotes(row.adminNotes ?? "");
  };

  const saveEdit = () => {
    if (!editingId) return;
    updateMutation.mutate({
      id: editingId,
      status: editStatus as "new" | "left_voicemail" | "contacted" | "quoted" | "converted" | "lost",
      adminNotes: editNotes || undefined,
    });
  };

  const NAVY = "oklch(0.22 0.055 240)";

  return (
    <AdminLayout>
      <div style={{ padding: "2rem", maxWidth: "1400px", margin: "0 auto" }}>
        {/* Toast */}
        {toast && (
          <div
            style={{
              position: "fixed",
              bottom: "1.5rem",
              right: "1.5rem",
              background: "oklch(0.22 0.055 240)",
              color: "white",
              padding: "0.75rem 1.25rem",
              borderRadius: "0.75rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              zIndex: 9999,
              boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
            }}
          >
            {toast}
          </div>
        )}

        {/* Convert to Scheduled Service Modal */}
        {convertLeadId !== null && (
          <div
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 1000,
              display: "flex", alignItems: "flex-start", justifyContent: "center",
              padding: "2rem 1rem", overflowY: "auto" }}
            onClick={(e) => { if (e.target === e.currentTarget) setConvertLeadId(null); }}
          >
            <div style={{ background: "white", borderRadius: "1rem", width: "100%", maxWidth: "680px",
              boxShadow: "0 8px 40px rgba(0,0,0,0.22)", overflow: "hidden" }}>
              {/* Modal header */}
              <div style={{ background: NAVY, padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <h2 style={{ color: "white", margin: 0, fontSize: "1.1rem", fontWeight: 700 }}>Convert to Scheduled Service</h2>
                  <p style={{ color: "oklch(0.75 0.04 240)", margin: "0.25rem 0 0", fontSize: "0.8rem" }}>
                    Pre-filled from the quote lead. Complete the missing details below.
                  </p>
                </div>
                <button onClick={() => setConvertLeadId(null)}
                  style={{ background: "none", border: "none", color: "white", fontSize: "1.4rem", cursor: "pointer", lineHeight: 1 }}>×</button>
              </div>
              {/* Modal body */}
              <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                {/* Customer Info */}
                <div style={{ background: "oklch(0.97 0.005 240)", borderRadius: "0.6rem", padding: "1rem" }}>
                  <p style={{ fontSize: "0.72rem", fontWeight: 700, color: NAVY, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>Customer Information</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    {[["First Name *", "firstName"], ["Last Name *", "lastName"], ["Email *", "email"], ["Phone *", "phone"]].map(([lbl, key]) => (
                      <div key={key}>
                        <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "oklch(0.45 0.04 240)", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "0.3rem" }}>{lbl}</label>
                        <input type={key === "email" ? "email" : "text"}
                          style={{ width: "100%", padding: "0.45rem 0.65rem", border: "1.5px solid oklch(0.82 0.01 240)", borderRadius: "0.4rem", fontSize: "0.85rem", color: NAVY, background: "white", boxSizing: "border-box" }}
                          value={convertForm[key as keyof ConvertForm] as string}
                          onChange={e => setField(key as keyof ConvertForm, e.target.value)} />
                      </div>
                    ))}
                    <div style={{ gridColumn: "1 / -1" }}>
                      <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "oklch(0.45 0.04 240)", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "0.3rem" }}>Site Address *</label>
                      <input style={{ width: "100%", padding: "0.45rem 0.65rem", border: "1.5px solid oklch(0.82 0.01 240)", borderRadius: "0.4rem", fontSize: "0.85rem", color: NAVY, background: "white", boxSizing: "border-box" }}
                        value={convertForm.siteAddress} onChange={e => setField("siteAddress", e.target.value)} />
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
                        {SERVICE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
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
                        placeholder="Any additional notes from the call…" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Modal footer */}
              <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid oklch(0.92 0.005 240)", display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
                <button onClick={() => setConvertLeadId(null)}
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

        {/* Add Lead Modal */}
        {showAddLead && (
          <div
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 1000,
              display: "flex", alignItems: "flex-start", justifyContent: "center",
              padding: "2rem 1rem", overflowY: "auto" }}
            onClick={(e) => { if (e.target === e.currentTarget) setShowAddLead(false); }}
          >
            <div style={{ background: "white", borderRadius: "1rem", width: "100%", maxWidth: "560px",
              boxShadow: "0 8px 40px rgba(0,0,0,0.22)", overflow: "hidden" }}>
              {/* Modal header */}
              <div style={{ background: NAVY, padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <h2 style={{ color: "white", margin: 0, fontSize: "1.1rem", fontWeight: 700 }}>Add Lead Manually</h2>
                  <p style={{ color: "oklch(0.75 0.04 240)", margin: "0.25rem 0 0", fontSize: "0.8rem" }}>
                    Enter a lead from Yelp, Google, Houzz, Angi, or any other platform.
                  </p>
                </div>
                <button onClick={() => setShowAddLead(false)}
                  style={{ background: "none", border: "none", color: "white", fontSize: "1.4rem", cursor: "pointer", lineHeight: 1 }}>×</button>
              </div>
              {/* Modal body */}
              <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                {/* Source selector */}
                <div style={{ background: "oklch(0.97 0.005 240)", borderRadius: "0.6rem", padding: "1rem" }}>
                  <p style={{ fontSize: "0.72rem", fontWeight: 700, color: NAVY, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>Lead Source</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    <div>
                      <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "oklch(0.45 0.04 240)", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "0.3rem" }}>Platform *</label>
                      <select
                        value={addLeadForm.source}
                        onChange={e => setAddLeadForm(f => ({ ...f, source: e.target.value }))}
                        style={{ width: "100%", padding: "0.45rem 0.65rem", border: "1.5px solid oklch(0.82 0.01 240)", borderRadius: "0.4rem", fontSize: "0.85rem", color: NAVY, background: "white", boxSizing: "border-box" }}
                      >
                        <option value="quick_form">Newport Website</option>
                        <option value="badge_scan">Badge Scan</option>
                        <option value="yelp">Yelp</option>
                        <option value="google">Google</option>
                        <option value="houzz">Houzz</option>
                        <option value="angi">Angi</option>
                        <option value="homeadvisor">HomeAdvisor</option>
                        <option value="thumbtack">Thumbtack</option>
                        <option value="nextdoor">Nextdoor</option>
                        <option value="facebook">Facebook</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "oklch(0.45 0.04 240)", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "0.3rem" }}>Source Label (optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. Yelp Request a Quote"
                        value={addLeadForm.sourceLabel}
                        onChange={e => setAddLeadForm(f => ({ ...f, sourceLabel: e.target.value }))}
                        style={{ width: "100%", padding: "0.45rem 0.65rem", border: "1.5px solid oklch(0.82 0.01 240)", borderRadius: "0.4rem", fontSize: "0.85rem", color: NAVY, background: "white", boxSizing: "border-box" }}
                      />
                    </div>
                  </div>
                </div>
                {/* Contact info */}
                <div style={{ background: "oklch(0.97 0.005 240)", borderRadius: "0.6rem", padding: "1rem" }}>
                  <p style={{ fontSize: "0.72rem", fontWeight: 700, color: NAVY, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>Contact Information</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    {([["First Name *", "firstName"], ["Last Name *", "lastName"], ["Email *", "email"], ["Phone *", "phone"]] as const).map(([lbl, key]) => (
                      <div key={key}>
                        <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "oklch(0.45 0.04 240)", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "0.3rem" }}>{lbl}</label>
                        <input
                          type={key === "email" ? "email" : "text"}
                          value={addLeadForm[key]}
                          onChange={e => setAddLeadForm(f => ({ ...f, [key]: e.target.value }))}
                          style={{ width: "100%", padding: "0.45rem 0.65rem", border: "1.5px solid oklch(0.82 0.01 240)", borderRadius: "0.4rem", fontSize: "0.85rem", color: NAVY, background: "white", boxSizing: "border-box" }}
                        />
                      </div>
                    ))}
                    <div style={{ gridColumn: "1 / -1" }}>
                      <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "oklch(0.45 0.04 240)", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "0.3rem" }}>Address (optional)</label>
                      <input
                        type="text"
                        value={addLeadForm.address}
                        onChange={e => setAddLeadForm(f => ({ ...f, address: e.target.value }))}
                        placeholder="123 Main St, Bend, OR 97701"
                        style={{ width: "100%", padding: "0.45rem 0.65rem", border: "1.5px solid oklch(0.82 0.01 240)", borderRadius: "0.4rem", fontSize: "0.85rem", color: NAVY, background: "white", boxSizing: "border-box" }}
                      />
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "oklch(0.45 0.04 240)", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "0.3rem" }}>Service Interest</label>
                      <select
                        value={addLeadForm.serviceInterest}
                        onChange={e => setAddLeadForm(f => ({ ...f, serviceInterest: e.target.value }))}
                        style={{ width: "100%", padding: "0.45rem 0.65rem", border: "1.5px solid oklch(0.82 0.01 240)", borderRadius: "0.4rem", fontSize: "0.85rem", color: NAVY, background: "white", boxSizing: "border-box" }}
                      >
                        <option value="">— Not set —</option>
                        {SERVICE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "oklch(0.45 0.04 240)", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "0.3rem" }}>Message / Notes</label>
                      <textarea
                        value={addLeadForm.message}
                        onChange={e => setAddLeadForm(f => ({ ...f, message: e.target.value }))}
                        placeholder="What did they say on Yelp / Google?"
                        rows={3}
                        style={{ width: "100%", padding: "0.45rem 0.65rem", border: "1.5px solid oklch(0.82 0.01 240)", borderRadius: "0.4rem", fontSize: "0.85rem", color: NAVY, background: "white", boxSizing: "border-box", resize: "vertical" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Modal footer */}
              <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid oklch(0.92 0.005 240)", display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
                <button onClick={() => setShowAddLead(false)}
                  style={{ background: "white", color: "oklch(0.5 0.02 240)", border: "1.5px solid oklch(0.88 0.01 240)", borderRadius: "0.5rem", padding: "0.5rem 1.25rem", fontSize: "0.875rem", cursor: "pointer", fontWeight: 500 }}>
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (!addLeadForm.firstName.trim()) { showToast("First name is required."); return; }
                    if (!addLeadForm.lastName.trim()) { showToast("Last name is required."); return; }
                    if (!addLeadForm.email.trim()) { showToast("Email is required."); return; }
                    if (!addLeadForm.phone.trim()) { showToast("Phone is required."); return; }
                    addLeadMutation.mutate({
                      firstName: addLeadForm.firstName.trim(),
                      lastName: addLeadForm.lastName.trim(),
                      email: addLeadForm.email.trim(),
                      phone: addLeadForm.phone.trim(),
                      address: addLeadForm.address.trim() || undefined,
                      serviceInterest: addLeadForm.serviceInterest || undefined,
                      message: addLeadForm.message.trim() || undefined,
                      source: addLeadForm.source,
                      sourceLabel: addLeadForm.sourceLabel.trim() || undefined,
                    });
                  }}
                  disabled={addLeadMutation.isPending}
                  style={{ background: NAVY, color: "white", border: "none", borderRadius: "0.5rem", padding: "0.5rem 1.5rem", fontSize: "0.875rem", fontWeight: 700, cursor: addLeadMutation.isPending ? "not-allowed" : "pointer", opacity: addLeadMutation.isPending ? 0.7 : 1 }}>
                  {addLeadMutation.isPending ? "Saving…" : "+ Add Lead"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.75rem",
                fontWeight: 700,
                color: NAVY,
                margin: 0,
              }}
            >
              Lead Center
            </h1>
            <p style={{ color: "oklch(0.5 0.02 240)", fontSize: "0.875rem", marginTop: "0.25rem" }}>
              All incoming leads — website quick forms, Yelp, Google, Houzz, Angi, and more.
            </p>
          </div>
          <button
            onClick={() => setShowAddLead(true)}
            style={{
              background: NAVY,
              color: "white",
              border: "none",
              borderRadius: "0.5rem",
              padding: "0.6rem 1.25rem",
              fontSize: "0.875rem",
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            + Add Lead
          </button>
        </div>

        {/* Stats bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          {(["all", "new", "left_voicemail", "contacted", "quoted", "converted"] as const).map((s) => {
            const count = s === "all" ? total : rows.filter((r) => r.status === s).length;
            const cfg = s === "all"
              ? { bg: "oklch(0.22 0.055 240)", text: "white", label: "Total" }
              : STATUS_COLORS[s];
            return (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                style={{
                  background: statusFilter === s ? cfg.bg : "white",
                  color: statusFilter === s ? cfg.text : "oklch(0.4 0.02 240)",
                  border: `2px solid ${statusFilter === s ? cfg.bg : "oklch(0.88 0.01 240)"}`,
                  borderRadius: "0.75rem",
                  padding: "1rem",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>{count}</div>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {cfg.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* Search + filter bar */}
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
          {/* Search input with icon */}
          <div style={{ position: "relative", flex: "1 1 280px" }}>
            <svg
              viewBox="0 0 20 20"
              fill="none"
              stroke="oklch(0.6 0.02 240)"
              strokeWidth="1.8"
              style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", width: "16px", height: "16px", pointerEvents: "none" }}
            >
              <circle cx="8.5" cy="8.5" r="5.5" />
              <path d="M14 14l3 3" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, email, phone, or message…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem 0.875rem 0.5rem 2.25rem",
                border: `1.5px solid ${search ? "oklch(0.55 0.14 240)" : "oklch(0.88 0.01 240)"}`,
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                outline: "none",
                color: NAVY,
                background: "white",
                transition: "border-color 0.15s ease",
                boxSizing: "border-box",
              }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{
                  position: "absolute",
                  right: "0.6rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "oklch(0.6 0.02 240)",
                  fontSize: "1rem",
                  lineHeight: 1,
                  padding: "0.1rem 0.25rem",
                }}
                title="Clear search"
              >
                ×
              </button>
            )}
          </div>

          {/* Service type filter */}
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            style={{
              padding: "0.5rem 0.875rem",
              border: `1.5px solid ${serviceFilter !== "all" ? "oklch(0.55 0.14 240)" : "oklch(0.88 0.01 240)"}`,
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
              color: NAVY,
              background: "white",
              cursor: "pointer",
              minWidth: "180px",
            }}
          >
            <option value="all">All Services</option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* Source filter */}
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            style={{
              padding: "0.5rem 0.875rem",
              border: `1.5px solid ${sourceFilter !== "all" ? "oklch(0.55 0.14 240)" : "oklch(0.88 0.01 240)"}`,
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
              color: NAVY,
              background: "white",
              cursor: "pointer",
              minWidth: "150px",
            }}
          >
            <option value="all">All Sources</option>
            <option value="quick_form">Newport Website</option>
            <option value="badge_scan">Badge Scan</option>
            <option value="google">Google</option>
            <option value="yelp">Yelp</option>
            <option value="houzz">Houzz</option>
            <option value="angi">Angi</option>
            <option value="homeadvisor">HomeAdvisor</option>
            <option value="thumbtack">Thumbtack</option>
            <option value="nextdoor">Nextdoor</option>
            <option value="facebook">Facebook</option>
            <option value="other">Other</option>
          </select>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: "0.5rem 0.875rem",
              border: `1.5px solid ${statusFilter !== "all" ? "oklch(0.55 0.14 240)" : "oklch(0.88 0.01 240)"}`,
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
              color: NAVY,
              background: "white",
              cursor: "pointer",
              minWidth: "140px",
            }}
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="left_voicemail">Left Voicemail</option>
            <option value="contacted">Contacted</option>
            <option value="quoted">Quoted</option>
            <option value="converted">Converted</option>
            <option value="lost">Lost</option>
          </select>

          {/* Clear all filters button */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              style={{
                padding: "0.5rem 0.875rem",
                border: "1.5px solid oklch(0.75 0.12 25)",
                borderRadius: "0.5rem",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "oklch(0.46 0.20 25)",
                background: "oklch(0.98 0.02 25)",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Clear Filters
            </button>
          )}
          {/* Show Converted toggle */}
          <button
            onClick={() => setShowConverted(s => !s)}
            style={{
              padding: "0.5rem 0.875rem",
              border: showConverted ? "1.5px solid oklch(0.75 0.12 145)" : "1.5px solid oklch(0.88 0.01 240)",
              borderRadius: "0.5rem",
              fontSize: "0.8rem",
              fontWeight: 600,
              color: showConverted ? "oklch(0.30 0.14 145)" : "oklch(0.55 0.02 240)",
              background: showConverted ? "oklch(0.95 0.05 145)" : "white",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {showConverted ? "✓ Hide Converted" : "✓ Show Converted"}
          </button>
          {/* Spam toggle */}
          <button
            onClick={() => setShowSpam(s => !s)}
            style={{
              padding: "0.5rem 0.875rem",
              border: showSpam ? "1.5px solid oklch(0.75 0.12 30)" : "1.5px solid oklch(0.88 0.01 240)",
              borderRadius: "0.5rem",
              fontSize: "0.8rem",
              fontWeight: 600,
              color: showSpam ? "oklch(0.45 0.18 30)" : "oklch(0.55 0.02 240)",
              background: showSpam ? "oklch(0.95 0.05 30)" : "white",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {showSpam ? "🚫 Hide Spam" : `🚫 Show Spam${spamCount > 0 ? ` (${spamCount})` : ""}`}
          </button>
        </div>

        {/* Active filter result count */}
        {hasActiveFilters && (
          <p style={{ fontSize: "0.8rem", color: "oklch(0.5 0.02 240)", marginBottom: "1rem" }}>
            Showing <strong>{filtered.length}</strong> of {total} leads
            {search && <> matching <em>"{search}"</em></>}
            {serviceFilter !== "all" && <> in <em>{serviceFilter}</em></>}
            {statusFilter !== "all" && <> with status <em>{STATUS_COLORS[statusFilter]?.label}</em></>}
          </p>
        )}

        {/* Table */}
        {isLoading ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "oklch(0.6 0.02 240)" }}>
            Loading quote leads…
          </div>
        ) : filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "4rem",
              background: "white",
              borderRadius: "1rem",
              border: "1.5px solid oklch(0.92 0.01 240)",
              color: "oklch(0.6 0.02 240)",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>💬</div>
            <p style={{ fontWeight: 600 }}>No quote leads found</p>
            <p style={{ fontSize: "0.85rem" }}>
              {search || statusFilter !== "all"
                ? "Try adjusting your search or filter."
                : "Quote requests submitted via the website will appear here."}
            </p>
          </div>
        ) : (
          <div
            style={{
              background: "white",
              borderRadius: "1rem",
              border: "1.5px solid oklch(0.92 0.01 240)",
              overflowX: "auto",
            }}
          >
            <table style={{ width: "100%", minWidth: "1100px", borderCollapse: "collapse", tableLayout: "fixed" }}>
              <thead>
                <tr style={{ background: "oklch(0.97 0.005 240)", borderBottom: "1.5px solid oklch(0.92 0.01 240)" }}>
                  {[["Source","130px"], ["Date","90px"], ["Name","130px"], ["Contact","200px"], ["Address","180px"], ["Service Interest","160px"], ["Message","200px"], ["Status","110px"], ["Actions","180px"]].map(([h, w]) => (
                    <th
                      key={h}
                      style={{
                        padding: "0.75rem 1rem",
                        textAlign: "left",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "oklch(0.5 0.03 240)",
                        whiteSpace: "nowrap",
                        width: w,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => {
                  const sc = STATUS_COLORS[row.status] ?? STATUS_COLORS.new;
                  const isEditing = editingId === row.id;
                  return (
                    <tr
                      key={row.id}
                      style={{
                        borderBottom: i < filtered.length - 1 ? "1px solid oklch(0.94 0.005 240)" : "none",
                        background: i % 2 === 0 ? "white" : "oklch(0.99 0.002 240)",
                      }}
                    >
                      {/* Source */}
                      <td style={{ padding: "0.75rem 1rem" }}>
                        <SourceBadge source={row.source ?? "quick_form"} sourceLabel={(row as any).sourceLabel} />
                      </td>
                      {/* Date */}
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.8rem", color: "oklch(0.55 0.02 240)", whiteSpace: "nowrap" }}>
                        {formatDate(row.createdAt)}
                      </td>
                      {/* Name */}
                      <td style={{ padding: "0.75rem 1rem" }}>
                        <span style={{ fontWeight: 600, fontSize: "0.875rem", color: NAVY }}>
                          {row.firstName} {row.lastName}
                        </span>
                      </td>
                      {/* Contact */}
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.8rem" }}>
                        <div>
                          <a href={`mailto:${row.email}`} style={{ color: "oklch(0.4 0.12 240)", textDecoration: "none", wordBreak: "break-all" }}>
                            {row.email}
                          </a>
                        </div>
                        <div style={{ color: "oklch(0.5 0.02 240)" }}>
                          <a href={`tel:${row.phone}`} style={{ color: "inherit", textDecoration: "none" }}>
                            {row.phone}
                          </a>
                        </div>
                      </td>
                      {/* Address */}
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.8rem", color: NAVY }}>
                        {row.address || <span style={{ color: "oklch(0.7 0.01 240)" }}>—</span>}
                      </td>
                      {/* Service Interest — inline editable */}
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.8rem", color: NAVY }}>
                        <select
                          value={row.serviceInterest ?? ""}
                          onChange={(e) => updateServiceInterestMutation.mutate({ id: row.id, serviceInterest: e.target.value })}
                          style={{
                            padding: "0.25rem 0.5rem",
                            border: "1.5px solid oklch(0.88 0.01 240)",
                            borderRadius: "0.35rem",
                            fontSize: "0.78rem",
                            color: NAVY,
                            background: "white",
                            cursor: "pointer",
                            width: "100%",
                          }}
                        >
                          <option value="">— Not set —</option>
                          {SERVICE_OPTIONS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      {/* Message */}
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.78rem", color: "oklch(0.5 0.02 240)" }}>
                        {row.message ? (
                          <span title={row.message}>
                            {row.message.length > 100 ? row.message.slice(0, 100) + "…" : row.message}
                          </span>
                        ) : (
                          <span style={{ color: "oklch(0.7 0.01 240)" }}>—</span>
                        )}
                      </td>
                      {/* Status */}
                      <td style={{ padding: "0.75rem 1rem" }}>
                        {isEditing ? (
                          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <select
                              value={editStatus}
                              onChange={(e) => setEditStatus(e.target.value)}
                              style={{
                                padding: "0.35rem 0.6rem",
                                border: "1.5px solid oklch(0.75 0.08 240)",
                                borderRadius: "0.4rem",
                                fontSize: "0.8rem",
                                color: NAVY,
                                background: "white",
                              }}
                            >
                              {Object.entries(STATUS_COLORS).map(([k, v]) => (
                                <option key={k} value={k}>{v.label}</option>
                              ))}
                            </select>
                            <textarea
                              value={editNotes}
                              onChange={(e) => setEditNotes(e.target.value)}
                              placeholder="Admin notes…"
                              rows={2}
                              style={{
                                padding: "0.35rem 0.6rem",
                                border: "1.5px solid oklch(0.75 0.08 240)",
                                borderRadius: "0.4rem",
                                fontSize: "0.78rem",
                                color: NAVY,
                                resize: "vertical",
                              }}
                            />
                            <div style={{ display: "flex", gap: "0.4rem" }}>
                              <button
                                onClick={saveEdit}
                                disabled={updateMutation.isPending}
                                style={{
                                  background: "oklch(0.35 0.14 145)",
                                  color: "white",
                                  border: "none",
                                  borderRadius: "0.4rem",
                                  padding: "0.3rem 0.7rem",
                                  fontSize: "0.78rem",
                                  fontWeight: 600,
                                  cursor: "pointer",
                                }}
                              >
                                {updateMutation.isPending ? "Saving…" : "Save"}
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                style={{
                                  background: "white",
                                  color: "oklch(0.5 0.02 240)",
                                  border: "1.5px solid oklch(0.88 0.01 240)",
                                  borderRadius: "0.4rem",
                                  padding: "0.3rem 0.7rem",
                                  fontSize: "0.78rem",
                                  cursor: "pointer",
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <span
                            style={{
                              display: "inline-block",
                              background: sc.bg,
                              color: sc.text,
                              borderRadius: "999px",
                              padding: "0.2rem 0.7rem",
                              fontSize: "0.72rem",
                              fontWeight: 700,
                              letterSpacing: "0.04em",
                              textTransform: "uppercase",
                            }}
                          >
                            {sc.label}
                          </span>
                        )}
                      </td>
                      {/* Actions */}
                      <td style={{ padding: "0.75rem 1rem", whiteSpace: "nowrap" }}>
                        {!isEditing && (
                          <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                            <button
                              onClick={() => openEdit(row)}
                              style={{
                                background: "white",
                                color: NAVY,
                                border: "1.5px solid oklch(0.88 0.01 240)",
                                borderRadius: "0.4rem",
                                padding: "0.3rem 0.7rem",
                                fontSize: "0.78rem",
                                fontWeight: 600,
                                cursor: "pointer",
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => markSpamMutation.mutate({ id: row.id, isSpam: !row.isSpam })}
                              title={row.isSpam ? "Unmark spam" : "Mark as spam"}
                              style={{
                                background: row.isSpam ? "oklch(0.92 0.10 30)" : "white",
                                color: row.isSpam ? "oklch(0.45 0.18 30)" : "oklch(0.60 0.02 240)",
                                border: row.isSpam ? "1.5px solid oklch(0.80 0.12 30)" : "1.5px solid oklch(0.88 0.01 240)",
                                borderRadius: "0.4rem",
                                padding: "0.3rem 0.5rem",
                                fontSize: "0.78rem",
                                fontWeight: 600,
                                cursor: "pointer",
                              }}
                            >
                              {row.isSpam ? "🚫 Spam" : "⚑"}
                            </button>
                            {!row.isSpam && row.status !== "converted" && (
                              <button
                                onClick={() => openConvert(row)}
                                style={{
                                  background: "oklch(0.35 0.14 145)",
                                  color: "white",
                                  border: "none",
                                  borderRadius: "0.4rem",
                                  padding: "0.3rem 0.75rem",
                                  fontSize: "0.78rem",
                                  fontWeight: 700,
                                  cursor: "pointer",
                                  whiteSpace: "nowrap",
                                }}
                                title="Convert this lead to a Scheduled Service form"
                              >
                                → Schedule
                              </button>
                            )}
                            {!row.isSpam && row.status !== "converted" && (
                              <button
                                onClick={() => handleSaveAsContact(row)}
                                disabled={saveAsContactMutation.isPending}
                                style={{
                                  background: "oklch(0.92 0.06 240)",
                                  color: "oklch(0.28 0.10 240)",
                                  border: "1.5px solid oklch(0.78 0.10 240)",
                                  borderRadius: "0.4rem",
                                  padding: "0.3rem 0.6rem",
                                  fontSize: "0.78rem",
                                  fontWeight: 700,
                                  cursor: saveAsContactMutation.isPending ? "not-allowed" : "pointer",
                                  whiteSpace: "nowrap",
                                  opacity: saveAsContactMutation.isPending ? 0.6 : 1,
                                }}
                                title="Save this lead as a Contact in the CRM"
                              >
                                + Contact
                              </button>
                            )}
                            {!row.isSpam && row.status === "converted" && (
                              <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                                {/* + Contact and + Property buttons */}
                                <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                                  <button
                                    onClick={() => handleSaveAsContact(row)}
                                    disabled={saveAsContactMutation.isPending}
                                    style={{
                                      background: "oklch(0.92 0.06 240)",
                                      color: "oklch(0.28 0.10 240)",
                                      border: "1.5px solid oklch(0.78 0.10 240)",
                                      borderRadius: "0.4rem",
                                      padding: "0.3rem 0.6rem",
                                      fontSize: "0.75rem",
                                      fontWeight: 700,
                                      cursor: saveAsContactMutation.isPending ? "not-allowed" : "pointer",
                                      whiteSpace: "nowrap",
                                      opacity: saveAsContactMutation.isPending ? 0.6 : 1,
                                    }}
                                    title="Save this lead as a Contact in the CRM"
                                  >
                                    + Contact
                                  </button>
                                  <button
                                    onClick={() => handleSaveAsProperty(row)}
                                    disabled={saveAsPropertyMutation.isPending}
                                    style={{
                                      background: "oklch(0.92 0.10 145)",
                                      color: "oklch(0.28 0.14 145)",
                                      border: "1.5px solid oklch(0.72 0.14 145)",
                                      borderRadius: "0.4rem",
                                      padding: "0.3rem 0.6rem",
                                      fontSize: "0.75rem",
                                      fontWeight: 700,
                                      cursor: saveAsPropertyMutation.isPending ? "not-allowed" : "pointer",
                                      whiteSpace: "nowrap",
                                      opacity: saveAsPropertyMutation.isPending ? 0.6 : 1,
                                    }}
                                    title="Create a Property record from this lead's address"
                                  >
                                    + Property
                                  </button>
                                </div>
                                {/* Converted metadata */}
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.1rem" }}>
                                  <span style={{ fontSize: "0.72rem", color: "oklch(0.35 0.14 145)", fontWeight: 600 }}>
                                    ✓ Converted
                                  </span>
                                  {(row as any).assignedConsultant && (
                                    <span style={{ fontSize: "0.68rem", color: "oklch(0.5 0.02 240)" }}>
                                      {(row as any).assignedConsultant}
                                    </span>
                                  )}
                                  {(row as any).convertedAt && (
                                    <span style={{ fontSize: "0.66rem", color: "oklch(0.6 0.01 240)" }}>
                                      {formatDate((row as any).convertedAt)}
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div
              style={{
                padding: "0.75rem 1rem",
                borderTop: "1px solid oklch(0.94 0.005 240)",
                fontSize: "0.8rem",
                color: "oklch(0.55 0.02 240)",
                textAlign: "right",
              }}
            >
              Showing {filtered.length} of {total} leads
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
