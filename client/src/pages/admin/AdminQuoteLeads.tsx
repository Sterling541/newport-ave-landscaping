/* ============================================================
   ADMIN QUOTE LEADS PAGE
   Newport Avenue Landscaping
   Displays all Quick Quote / Get a Quote submissions with
   status management, filtering, and notes.
   ============================================================ */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";

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
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState<string>("all");
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
    { limit: 200, offset: 0, includeSpam: showSpam },
    { refetchOnWindowFocus: false }
  );
  const markSpamMutation = trpc.quoteLeads.markSpam.useMutation({
    onSuccess: (_, variables) => {
      showToast(variables.isSpam ? "Marked as spam" : "Unmarked as spam");
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
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      `${r.firstName} ${r.lastName}`.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.phone.toLowerCase().includes(q) ||
      (r.address ?? "").toLowerCase().includes(q) ||
      (r.serviceInterest ?? "").toLowerCase().includes(q) ||
      (r.message ?? "").toLowerCase().includes(q);
    return matchStatus && matchService && matchSearch;
  });

  const hasActiveFilters = search !== "" || statusFilter !== "all" || serviceFilter !== "all";

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setServiceFilter("all");
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
                        Sales Consultant
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
                        <option value="Nathan Kooy">Nathan Kooy (Install/Design)</option>
                        <option value="William Miller">William Miller (Install/Design)</option>
                        <option value="Danny Sheffield">Danny Sheffield (Enhancements)</option>
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

        {/* Header */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.75rem",
              fontWeight: 700,
              color: NAVY,
              margin: 0,
            }}
          >
            Quick Forms
          </h1>
          <p style={{ color: "oklch(0.5 0.02 240)", fontSize: "0.875rem", marginTop: "0.25rem" }}>
            Submissions from the Get a Quote / Quick Quote form on the website.
          </p>
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
              overflow: "hidden",
            }}
          >
            <table style={{ width: "100%", minWidth: "1100px", borderCollapse: "collapse", tableLayout: "fixed" }}>
              <thead>
                <tr style={{ background: "oklch(0.97 0.005 240)", borderBottom: "1.5px solid oklch(0.92 0.01 240)" }}>
                  {[["Date","90px"], ["Name","130px"], ["Contact","200px"], ["Address","200px"], ["Service Interest","160px"], ["Message","220px"], ["Status","110px"], ["Actions","130px"]].map(([h, w]) => (
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
                            {!row.isSpam && row.status === "converted" && (
                              <span style={{ fontSize: "0.75rem", color: "oklch(0.35 0.14 145)", fontWeight: 600 }}>
                                ✓ Converted
                              </span>
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
              Showing {filtered.length} of {total} quote leads
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
