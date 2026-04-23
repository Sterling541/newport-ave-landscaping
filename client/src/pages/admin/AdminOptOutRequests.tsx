/* ============================================================
   ADMIN OPT-OUT REQUESTS PAGE
   Newport Avenue Landscaping
   Displays all Spray & Prune opt-out submissions with
   status management, filtering, and notes.
   ============================================================ */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";

const STATUS_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  pending:   { bg: "oklch(0.95 0.06 75)",  text: "oklch(0.45 0.12 75)",  label: "Pending" },
  scheduled: { bg: "oklch(0.92 0.08 240)", text: "oklch(0.35 0.12 240)", label: "Scheduled" },
  installed: { bg: "oklch(0.92 0.10 145)", text: "oklch(0.35 0.14 145)", label: "Installed" },
  cancelled: { bg: "oklch(0.93 0.04 0)",   text: "oklch(0.45 0.10 0)",   label: "Cancelled" },
};

const OPT_TYPE_LABELS: Record<string, string> = {
  no_spray: "No Spray",
  no_prune: "No Prune",
};

function formatOptTypes(raw: string): string {
  return raw
    .split(",")
    .map((t) => OPT_TYPE_LABELS[t.trim()] ?? t.trim())
    .join(" + ");
}

function formatDate(ts: Date | number | null | undefined): string {
  if (!ts) return "—";
  return new Date(ts).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function AdminOptOutRequests() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editStatus, setEditStatus] = useState<string>("pending");
  const [editNotes, setEditNotes] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const { data, isLoading, refetch } = trpc.optOut.list.useQuery(
    { limit: 200, offset: 0 },
    { refetchOnWindowFocus: false }
  );

  const updateMutation = trpc.optOut.updateStatus.useMutation({
    onSuccess: () => {
      setEditingId(null);
      showToast("Status updated successfully.");
      refetch();
    },
    onError: (err) => showToast(`Error: ${err.message}`),
  });

  const rows = data?.rows ?? [];
  const total = data?.total ?? 0;

  // Filter
  const filtered = rows.filter((r) => {
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      r.fullName.toLowerCase().includes(q) ||
      r.serviceAddress.toLowerCase().includes(q) ||
      r.neighborhood.toLowerCase().includes(q) ||
      (r.email ?? "").toLowerCase().includes(q) ||
      (r.phone ?? "").toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const openEdit = (row: typeof rows[0]) => {
    setEditingId(row.id);
    setEditStatus(row.status);
    setEditNotes(row.adminNotes ?? "");
  };

  const saveEdit = () => {
    if (!editingId) return;
    updateMutation.mutate({
      id: editingId,
      status: editStatus as "pending" | "scheduled" | "installed" | "cancelled",
      adminNotes: editNotes || undefined,
    });
  };

  const NAVY = "oklch(0.22 0.055 240)";

  return (
    <AdminLayout>
      <div style={{ padding: "2rem", maxWidth: "1400px", margin: "0 auto" }}>
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
            Opt-Out Requests
          </h1>
          <p style={{ color: "oklch(0.5 0.02 240)", fontSize: "0.875rem", marginTop: "0.25rem" }}>
            Spray &amp; Prune opt-out submissions from maintenance customers.
          </p>
        </div>

        {/* Stats bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          {(["all", "pending", "scheduled", "installed"] as const).map((s) => {
            const count =
              s === "all" ? total : rows.filter((r) => r.status === s).length;
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
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            marginBottom: "1.25rem",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder="Search by name, address, neighborhood, email, or phone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: "1 1 300px",
              padding: "0.5rem 0.875rem",
              border: "1.5px solid oklch(0.88 0.01 240)",
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
              outline: "none",
              color: NAVY,
            }}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: "0.5rem 0.875rem",
              border: "1.5px solid oklch(0.88 0.01 240)",
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
              color: NAVY,
              background: "white",
              cursor: "pointer",
            }}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="scheduled">Scheduled</option>
            <option value="installed">Installed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Table */}
        {isLoading ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "oklch(0.6 0.02 240)" }}>
            Loading opt-out requests…
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
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📋</div>
            <p style={{ fontWeight: 600 }}>No opt-out requests found</p>
            <p style={{ fontSize: "0.85rem" }}>
              {search || statusFilter !== "all"
                ? "Try adjusting your search or filter."
                : "Opt-out submissions will appear here once customers submit the form."}
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
                  {["Date", "Name", "Address / Neighborhood", "Contact", "Opt-Out Types", "Status", "Notes", "Actions"].map((h) => (
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
                  const sc = STATUS_COLORS[row.status] ?? STATUS_COLORS.pending;
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
                        <span style={{ fontWeight: 600, fontSize: "0.875rem", color: NAVY }}>{row.fullName}</span>
                      </td>
                      {/* Address / Neighborhood */}
                      <td style={{ padding: "0.75rem 1rem", maxWidth: "220px" }}>
                        <div style={{ fontSize: "0.8rem", color: NAVY, fontWeight: 500 }}>{row.serviceAddress}</div>
                        <div style={{ fontSize: "0.72rem", color: "oklch(0.55 0.02 240)" }}>{row.neighborhood}</div>
                      </td>
                      {/* Contact */}
                      <td style={{ padding: "0.75rem 1rem" }}>
                        {row.email && (
                          <div style={{ fontSize: "0.78rem", color: "oklch(0.4 0.12 240)" }}>
                            <a href={`mailto:${row.email}`} style={{ color: "inherit", textDecoration: "none" }}>{row.email}</a>
                          </div>
                        )}
                        {row.phone && (
                          <div style={{ fontSize: "0.78rem", color: "oklch(0.4 0.10 155)" }}>
                            <a href={`tel:${row.phone}`} style={{ color: "inherit", textDecoration: "none" }}>{row.phone}</a>
                          </div>
                        )}
                        {!row.email && !row.phone && (
                          <span style={{ fontSize: "0.75rem", color: "oklch(0.7 0.01 240)" }}>—</span>
                        )}
                      </td>
                      {/* Opt-Out Types */}
                      <td style={{ padding: "0.75rem 1rem" }}>
                        <span
                          style={{
                            display: "inline-block",
                            background: "oklch(0.22 0.055 240)",
                            color: "white",
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            padding: "0.2rem 0.6rem",
                            borderRadius: "0.3rem",
                            letterSpacing: "0.04em",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {formatOptTypes(row.optOutTypes)}
                        </span>
                      </td>
                      {/* Status */}
                      <td style={{ padding: "0.75rem 1rem" }}>
                        {isEditing ? (
                          <select
                            value={editStatus}
                            onChange={(e) => setEditStatus(e.target.value)}
                            style={{
                              padding: "0.3rem 0.5rem",
                              border: "1.5px solid oklch(0.80 0.02 240)",
                              borderRadius: "0.4rem",
                              fontSize: "0.78rem",
                              color: NAVY,
                              background: "white",
                            }}
                          >
                            <option value="pending">Pending</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="installed">Installed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        ) : (
                          <span
                            style={{
                              display: "inline-block",
                              background: sc.bg,
                              color: sc.text,
                              fontSize: "0.7rem",
                              fontWeight: 700,
                              padding: "0.2rem 0.6rem",
                              borderRadius: "0.3rem",
                              letterSpacing: "0.04em",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {sc.label}
                          </span>
                        )}
                      </td>
                      {/* Notes */}
                      <td style={{ padding: "0.75rem 1rem", maxWidth: "200px" }}>
                        {isEditing ? (
                          <textarea
                            value={editNotes}
                            onChange={(e) => setEditNotes(e.target.value)}
                            rows={2}
                            placeholder="Admin notes…"
                            style={{
                              width: "100%",
                              padding: "0.3rem 0.5rem",
                              border: "1.5px solid oklch(0.80 0.02 240)",
                              borderRadius: "0.4rem",
                              fontSize: "0.78rem",
                              color: NAVY,
                              resize: "vertical",
                              minWidth: "160px",
                            }}
                          />
                        ) : (
                          <span style={{ fontSize: "0.78rem", color: "oklch(0.5 0.02 240)" }}>
                            {row.adminNotes || <span style={{ color: "oklch(0.75 0.01 240)" }}>—</span>}
                          </span>
                        )}
                      </td>
                      {/* Actions */}
                      <td style={{ padding: "0.75rem 1rem", whiteSpace: "nowrap" }}>
                        {isEditing ? (
                          <div style={{ display: "flex", gap: "0.4rem" }}>
                            <button
                              onClick={saveEdit}
                              disabled={updateMutation.isPending}
                              style={{
                                padding: "0.3rem 0.7rem",
                                background: "oklch(0.55 0.15 145)",
                                color: "white",
                                border: "none",
                                borderRadius: "0.4rem",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                cursor: "pointer",
                              }}
                            >
                              {updateMutation.isPending ? "Saving…" : "Save"}
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              style={{
                                padding: "0.3rem 0.7rem",
                                background: "oklch(0.93 0.01 240)",
                                color: "oklch(0.4 0.02 240)",
                                border: "none",
                                borderRadius: "0.4rem",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                cursor: "pointer",
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => openEdit(row)}
                            style={{
                              padding: "0.3rem 0.7rem",
                              background: "oklch(0.93 0.01 240)",
                              color: "oklch(0.35 0.04 240)",
                              border: "1px solid oklch(0.85 0.01 240)",
                              borderRadius: "0.4rem",
                              fontSize: "0.75rem",
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
                fontSize: "0.78rem",
                color: "oklch(0.55 0.02 240)",
                background: "oklch(0.98 0.002 240)",
              }}
            >
              Showing {filtered.length} of {total} opt-out request{total !== 1 ? "s" : ""}
            </div>
          </div>
        )}
      </div>

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
            fontWeight: 500,
            boxShadow: "0 8px 32px oklch(0.18 0.04 240 / 0.3)",
            zIndex: 9999,
          }}
        >
          {toast}
        </div>
      )}
    </AdminLayout>
  );
}
