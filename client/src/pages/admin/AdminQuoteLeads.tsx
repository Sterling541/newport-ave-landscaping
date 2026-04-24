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
  new:       { bg: "oklch(0.92 0.10 145)", text: "oklch(0.30 0.14 145)", label: "New" },
  contacted: { bg: "oklch(0.92 0.08 240)", text: "oklch(0.35 0.12 240)", label: "Contacted" },
  quoted:    { bg: "oklch(0.95 0.10 75)",  text: "oklch(0.40 0.14 75)",  label: "Quoted" },
  converted: { bg: "oklch(0.90 0.12 145)", text: "oklch(0.25 0.16 145)", label: "Converted" },
  lost:      { bg: "oklch(0.93 0.04 0)",   text: "oklch(0.45 0.10 0)",   label: "Lost" },
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

export default function AdminQuoteLeads() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editStatus, setEditStatus] = useState<string>("new");
  const [editNotes, setEditNotes] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const { data, isLoading, refetch } = trpc.quoteLeads.list.useQuery(
    { limit: 200, offset: 0 },
    { refetchOnWindowFocus: false }
  );

  const updateMutation = trpc.quoteLeads.updateStatus.useMutation({
    onSuccess: () => {
      setEditingId(null);
      showToast("Status updated successfully.");
      refetch();
    },
    onError: (err) => showToast(`Error: ${err.message}`),
  });

  const rows = data?.rows ?? [];
  const total = data?.total ?? 0;

  const filtered = rows.filter((r) => {
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

  const openEdit = (row: typeof rows[0]) => {
    setEditingId(row.id);
    setEditStatus(row.status);
    setEditNotes(row.adminNotes ?? "");
  };

  const saveEdit = () => {
    if (!editingId) return;
    updateMutation.mutate({
      id: editingId,
      status: editStatus as "new" | "contacted" | "quoted" | "converted" | "lost",
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
            Quick Quote Leads
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
          {(["all", "new", "contacted", "quoted", "converted"] as const).map((s) => {
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
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "oklch(0.97 0.005 240)", borderBottom: "1.5px solid oklch(0.92 0.01 240)" }}>
                  {["Date", "Name", "Contact", "Address", "Service Interest", "Message", "Status", "Actions"].map((h) => (
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
                          <a href={`mailto:${row.email}`} style={{ color: "oklch(0.4 0.12 240)", textDecoration: "none" }}>
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
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.8rem", color: NAVY, maxWidth: "180px" }}>
                        {row.address || <span style={{ color: "oklch(0.7 0.01 240)" }}>—</span>}
                      </td>
                      {/* Service Interest */}
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.8rem", color: NAVY, maxWidth: "160px" }}>
                        {row.serviceInterest || <span style={{ color: "oklch(0.7 0.01 240)" }}>—</span>}
                      </td>
                      {/* Message */}
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.78rem", color: "oklch(0.5 0.02 240)", maxWidth: "200px" }}>
                        {row.message ? (
                          <span title={row.message}>
                            {row.message.length > 80 ? row.message.slice(0, 80) + "…" : row.message}
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
                      <td style={{ padding: "0.75rem 1rem" }}>
                        {!isEditing && (
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
