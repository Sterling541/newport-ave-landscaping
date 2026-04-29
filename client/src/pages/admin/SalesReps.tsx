/* ============================================================
   ADMIN SALES REPS PAGE
   Newport Avenue Landscaping Smart Scheduler
   Manage sales consultants: Nathan Kooy, William Miller, Danny Sheffield.
   ============================================================ */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import {
  UserCheck,
  Plus,
  Edit2,
  Check,
  X,
  RefreshCw,
  Calendar,
  Mail,
  Phone,
  AlertCircle,
} from "lucide-react";

const ROLE_LABELS: Record<string, string> = {
  install_design: "Install / Design",
  enhancement: "Enhancement",
};

const ROLE_COLORS: Record<string, { bg: string; text: string }> = {
  install_design: { bg: "oklch(0.92 0.08 240)", text: "oklch(0.30 0.12 240)" },
  enhancement:    { bg: "oklch(0.92 0.10 145)", text: "oklch(0.30 0.14 145)" },
};

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium"
      style={{ background: "oklch(0.18 0.04 155)", color: "white", maxWidth: 360 }}
    >
      <Check className="w-4 h-4 text-green-400 shrink-0" />
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

interface RepFormData {
  name: string;
  role: "install_design" | "enhancement";
  googleCalendarId: string;
  email: string;
  phone: string;
  calendarColor: string;
}

const EMPTY_FORM: RepFormData = {
  name: "",
  role: "install_design",
  googleCalendarId: "",
  email: "",
  phone: "",
  calendarColor: "",
};

const COLOR_SWATCHES = [
  { value: "#3b82f6", label: "Blue" },
  { value: "#22c55e", label: "Green" },
  { value: "#f59e0b", label: "Amber" },
  { value: "#a855f7", label: "Purple" },
  { value: "#ef4444", label: "Red" },
  { value: "#14b8a6", label: "Teal" },
  { value: "#f97316", label: "Orange" },
  { value: "#ec4899", label: "Pink" },
];

export default function SalesReps() {
  const [toast, setToast] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<RepFormData>(EMPTY_FORM);
  const [editForm, setEditForm] = useState<RepFormData>(EMPTY_FORM);
  const [showInactive, setShowInactive] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const { data: reps = [], isLoading, refetch } = trpc.scheduler.listReps.useQuery(
    { includeInactive: showInactive },
    { refetchOnWindowFocus: false }
  );

  const seedMutation = trpc.scheduler.seedReps.useMutation({
    onSuccess: () => {
      showToast("Default reps seeded: Nathan Kooy, William Miller, Danny Sheffield.");
      refetch();
    },
    onError: (err) => showToast(`Error: ${err.message}`),
  });

  const createMutation = trpc.scheduler.createRep.useMutation({
    onSuccess: () => {
      showToast("Sales rep created.");
      setShowAddForm(false);
      setForm(EMPTY_FORM);
      refetch();
    },
    onError: (err) => showToast(`Error: ${err.message}`),
  });

  const updateMutation = trpc.scheduler.updateRep.useMutation({
    onSuccess: () => {
      showToast("Sales rep updated.");
      setEditingId(null);
      refetch();
    },
    onError: (err) => showToast(`Error: ${err.message}`),
  });

  function startEdit(rep: typeof reps[0]) {
    setEditingId(rep.id);
    setEditForm({
      name: rep.name,
      role: rep.role as "install_design" | "enhancement",
      googleCalendarId: rep.googleCalendarId ?? "",
      email: rep.email ?? "",
      phone: rep.phone ?? "",
      calendarColor: rep.calendarColor ?? "",
    });
  }

  function submitCreate() {
    if (!form.name.trim()) return;
    createMutation.mutate({
      name: form.name.trim(),
      role: form.role,
      googleCalendarId: form.googleCalendarId.trim() || undefined,
      email: form.email.trim() || undefined,
      phone: form.phone.trim() || undefined,
      calendarColor: form.calendarColor || undefined,
    });
  }

  function submitEdit(id: number) {
    updateMutation.mutate({
      id,
      name: editForm.name.trim(),
      role: editForm.role,
      googleCalendarId: editForm.googleCalendarId.trim() || null,
      email: editForm.email.trim() || null,
      phone: editForm.phone.trim() || null,
      calendarColor: editForm.calendarColor || null,
    });
  }

  function toggleActive(rep: typeof reps[0]) {
    updateMutation.mutate({
      id: rep.id,
      isActive: !rep.isActive,
    });
  }

  return (
    <AdminLayout>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "oklch(0.92 0.10 145)" }}
            >
              <UserCheck className="w-5 h-5" style={{ color: "oklch(0.30 0.14 145)" }} />
            </div>
            <div>
              <h1 className="text-xl font-bold" style={{ color: "oklch(0.18 0.04 155)" }}>
                Sales Reps
              </h1>
              <p className="text-sm" style={{ color: "oklch(0.50 0.05 155)" }}>
                Manage sales consultants for the Smart Scheduler
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowInactive(!showInactive)}
              className="px-3 py-1.5 rounded-lg text-sm border transition-colors"
              style={{
                borderColor: showInactive ? "oklch(0.55 0.15 145)" : "oklch(0.85 0.02 155)",
                color: showInactive ? "oklch(0.30 0.14 145)" : "oklch(0.50 0.05 155)",
                background: showInactive ? "oklch(0.95 0.04 145)" : "white",
              }}
            >
              {showInactive ? "Showing All" : "Show Inactive"}
            </button>
            <button
              onClick={() => seedMutation.mutate()}
              disabled={seedMutation.isPending}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border transition-colors"
              style={{
                borderColor: "oklch(0.85 0.02 155)",
                color: "oklch(0.50 0.05 155)",
              }}
              title="Seed Nathan Kooy, William Miller, Danny Sheffield if not already present"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${seedMutation.isPending ? "animate-spin" : ""}`} />
              Seed Defaults
            </button>
            <button
              onClick={() => { setShowAddForm(!showAddForm); setForm(EMPTY_FORM); }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium text-white transition-colors"
              style={{ background: "oklch(0.45 0.15 145)" }}
            >
              <Plus className="w-4 h-4" />
              Add Rep
            </button>
          </div>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div
            className="mb-6 p-5 rounded-2xl border"
            style={{ background: "oklch(0.97 0.01 145)", borderColor: "oklch(0.88 0.04 145)" }}
          >
            <h3 className="font-semibold mb-4" style={{ color: "oklch(0.25 0.08 155)" }}>
              Add New Sales Rep
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "oklch(0.45 0.05 155)" }}>
                  Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Full name"
                  className="w-full px-3 py-2 rounded-lg border text-sm outline-none focus:ring-2"
                  style={{ borderColor: "oklch(0.82 0.03 155)" }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "oklch(0.45 0.05 155)" }}>
                  Role *
                </label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value as "install_design" | "enhancement" })}
                  className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                  style={{ borderColor: "oklch(0.82 0.03 155)" }}
                >
                  <option value="install_design">Install / Design</option>
                  <option value="enhancement">Enhancement</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "oklch(0.45 0.05 155)" }}>
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="email@example.com"
                  className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                  style={{ borderColor: "oklch(0.82 0.03 155)" }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "oklch(0.45 0.05 155)" }}>
                  Phone
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="(541) 555-0100"
                  className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                  style={{ borderColor: "oklch(0.82 0.03 155)" }}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium mb-1" style={{ color: "oklch(0.45 0.05 155)" }}>
                  Google Calendar ID
                  <span className="ml-1 font-normal opacity-60">(optional — set after Google Cloud setup)</span>
                </label>
                <input
                  type="text"
                  value={form.googleCalendarId}
                  onChange={(e) => setForm({ ...form, googleCalendarId: e.target.value })}
                  placeholder="example@group.calendar.google.com"
                  className="w-full px-3 py-2 rounded-lg border text-sm outline-none font-mono"
                  style={{ borderColor: "oklch(0.82 0.03 155)" }}
                />
              </div>
              {/* Calendar Color Picker */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium mb-2" style={{ color: "oklch(0.45 0.05 155)" }}>
                  Calendar Color
                  <span className="ml-1 font-normal opacity-60">(shown on the scheduler calendar)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {COLOR_SWATCHES.map((swatch) => (
                    <button
                      key={swatch.value}
                      type="button"
                      onClick={() => setForm({ ...form, calendarColor: swatch.value })}
                      title={swatch.label}
                      className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110"
                      style={{
                        background: swatch.value,
                        borderColor: form.calendarColor === swatch.value ? "oklch(0.18 0.04 155)" : "transparent",
                        boxShadow: form.calendarColor === swatch.value ? "0 0 0 2px white, 0 0 0 4px oklch(0.18 0.04 155)" : undefined,
                      }}
                    />
                  ))}
                  {form.calendarColor && (
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, calendarColor: "" })}
                      className="w-7 h-7 rounded-full border-2 text-xs flex items-center justify-center"
                      style={{ borderColor: "oklch(0.82 0.03 155)", color: "oklch(0.60 0.04 155)" }}
                      title="Clear color (use auto)"
                    >✕</button>
                  )}
                </div>
                {!form.calendarColor && (
                  <p className="text-xs mt-1 opacity-50" style={{ color: "oklch(0.50 0.05 155)" }}>
                    No color selected — auto-assigned by position
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={submitCreate}
                disabled={createMutation.isPending || !form.name.trim()}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white disabled:opacity-50"
                style={{ background: "oklch(0.45 0.15 145)" }}
              >
                {createMutation.isPending ? "Saving…" : "Save Rep"}
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 rounded-lg text-sm border"
                style={{ borderColor: "oklch(0.82 0.03 155)", color: "oklch(0.50 0.05 155)" }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Google Calendar Notice */}
        <div
          className="mb-5 flex items-start gap-3 p-4 rounded-xl border"
          style={{ background: "oklch(0.97 0.04 75)", borderColor: "oklch(0.88 0.08 75)" }}
        >
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "oklch(0.55 0.15 75)" }} />
          <div className="text-sm" style={{ color: "oklch(0.40 0.10 75)" }}>
            <strong>Google Calendar integration is pending setup.</strong> Once you complete the Google Cloud setup
            (create a service account, enable Calendar API, share each rep's calendar), paste each rep's
            Calendar ID in the field below. Appointments will then sync automatically.
          </div>
        </div>

        {/* Reps Table */}
        {isLoading ? (
          <div className="text-center py-12 text-sm" style={{ color: "oklch(0.60 0.04 155)" }}>
            Loading reps…
          </div>
        ) : reps.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border border-dashed" style={{ borderColor: "oklch(0.82 0.03 155)" }}>
            <UserCheck className="w-10 h-10 mx-auto mb-3 opacity-20" />
            <p className="font-medium mb-1" style={{ color: "oklch(0.40 0.05 155)" }}>No sales reps yet</p>
            <p className="text-sm mb-4" style={{ color: "oklch(0.60 0.04 155)" }}>
              Click "Seed Defaults" to add Nathan Kooy, William Miller, and Danny Sheffield.
            </p>
            <button
              onClick={() => seedMutation.mutate()}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white"
              style={{ background: "oklch(0.45 0.15 145)" }}
            >
              Seed Default Reps
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {reps.map((rep) => (
              <div
                key={rep.id}
                className="rounded-2xl border p-5 transition-shadow hover:shadow-sm"
                style={{
                  background: rep.isActive ? "white" : "oklch(0.97 0.005 155)",
                  borderColor: rep.isActive ? "oklch(0.88 0.02 155)" : "oklch(0.90 0.01 155)",
                  opacity: rep.isActive ? 1 : 0.7,
                }}
              >
                {editingId === rep.id ? (
                  /* Edit Mode */
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-medium mb-1" style={{ color: "oklch(0.45 0.05 155)" }}>Name</label>
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                          style={{ borderColor: "oklch(0.82 0.03 155)" }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1" style={{ color: "oklch(0.45 0.05 155)" }}>Role</label>
                        <select
                          value={editForm.role}
                          onChange={(e) => setEditForm({ ...editForm, role: e.target.value as "install_design" | "enhancement" })}
                          className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                          style={{ borderColor: "oklch(0.82 0.03 155)" }}
                        >
                          <option value="install_design">Install / Design</option>
                          <option value="enhancement">Enhancement</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1" style={{ color: "oklch(0.45 0.05 155)" }}>Email</label>
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                          style={{ borderColor: "oklch(0.82 0.03 155)" }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1" style={{ color: "oklch(0.45 0.05 155)" }}>Phone</label>
                        <input
                          type="tel"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                          style={{ borderColor: "oklch(0.82 0.03 155)" }}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium mb-1" style={{ color: "oklch(0.45 0.05 155)" }}>
                          Google Calendar ID
                        </label>
                        <input
                          type="text"
                          value={editForm.googleCalendarId}
                          onChange={(e) => setEditForm({ ...editForm, googleCalendarId: e.target.value })}
                          placeholder="example@group.calendar.google.com"
                          className="w-full px-3 py-2 rounded-lg border text-sm outline-none font-mono"
                          style={{ borderColor: "oklch(0.82 0.03 155)" }}
                        />
                      </div>
                      {/* Calendar Color Picker */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium mb-2" style={{ color: "oklch(0.45 0.05 155)" }}>
                          Calendar Color
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {COLOR_SWATCHES.map((swatch) => (
                            <button
                              key={swatch.value}
                              type="button"
                              onClick={() => setEditForm({ ...editForm, calendarColor: swatch.value })}
                              title={swatch.label}
                              className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110"
                              style={{
                                background: swatch.value,
                                borderColor: editForm.calendarColor === swatch.value ? "oklch(0.18 0.04 155)" : "transparent",
                                boxShadow: editForm.calendarColor === swatch.value ? "0 0 0 2px white, 0 0 0 4px oklch(0.18 0.04 155)" : undefined,
                              }}
                            />
                          ))}
                          {editForm.calendarColor && (
                            <button
                              type="button"
                              onClick={() => setEditForm({ ...editForm, calendarColor: "" })}
                              className="w-7 h-7 rounded-full border-2 text-xs flex items-center justify-center"
                              style={{ borderColor: "oklch(0.82 0.03 155)", color: "oklch(0.60 0.04 155)" }}
                              title="Clear (use auto)"
                            >✕</button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => submitEdit(rep.id)}
                        disabled={updateMutation.isPending}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-white"
                        style={{ background: "oklch(0.45 0.15 145)" }}
                      >
                        <Check className="w-3.5 h-3.5" />
                        {updateMutation.isPending ? "Saving…" : "Save"}
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border"
                        style={{ borderColor: "oklch(0.82 0.03 155)", color: "oklch(0.50 0.05 155)" }}
                      >
                        <X className="w-3.5 h-3.5" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  /* View Mode */
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                        style={{
                          background: ROLE_COLORS[rep.role]?.bg ?? "oklch(0.92 0.05 155)",
                          color: ROLE_COLORS[rep.role]?.text ?? "oklch(0.30 0.10 155)",
                        }}
                      >
                        {rep.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm" style={{ color: "oklch(0.20 0.05 155)" }}>
                            {rep.name}
                          </span>
                          <span
                            className="px-2 py-0.5 rounded-full text-xs font-medium"
                            style={{
                              background: ROLE_COLORS[rep.role]?.bg ?? "oklch(0.92 0.05 155)",
                              color: ROLE_COLORS[rep.role]?.text ?? "oklch(0.30 0.10 155)",
                            }}
                          >
                            {ROLE_LABELS[rep.role] ?? rep.role}
                          </span>
                          {!rep.isActive && (
                            <span
                              className="px-2 py-0.5 rounded-full text-xs font-medium"
                              style={{ background: "oklch(0.93 0.03 0)", color: "oklch(0.45 0.10 0)" }}
                            >
                              Inactive
                            </span>
                          )}
                        </div>
                        <div className="mt-1.5 space-y-0.5">
                          {rep.email && (
                            <div className="flex items-center gap-1.5 text-xs" style={{ color: "oklch(0.55 0.04 155)" }}>
                              <Mail className="w-3 h-3" />
                              {rep.email}
                            </div>
                          )}
                          {rep.phone && (
                            <div className="flex items-center gap-1.5 text-xs" style={{ color: "oklch(0.55 0.04 155)" }}>
                              <Phone className="w-3 h-3" />
                              {rep.phone}
                            </div>
                          )}
                          {rep.googleCalendarId ? (
                            <div className="flex items-center gap-1.5 text-xs" style={{ color: "oklch(0.40 0.12 145)" }}>
                              <Calendar className="w-3 h-3" />
                              <span className="font-mono">{rep.googleCalendarId}</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 text-xs" style={{ color: "oklch(0.60 0.08 75)" }}>
                              <Calendar className="w-3 h-3" />
                              <span>No Calendar ID — set after Google Cloud setup</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => startEdit(rep)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-colors hover:bg-gray-50"
                        style={{ borderColor: "oklch(0.85 0.02 155)", color: "oklch(0.50 0.05 155)" }}
                      >
                        <Edit2 className="w-3 h-3" />
                        Edit
                      </button>
                      <button
                        onClick={() => toggleActive(rep)}
                        disabled={updateMutation.isPending}
                        className="px-3 py-1.5 rounded-lg text-xs border transition-colors"
                        style={{
                          borderColor: rep.isActive ? "oklch(0.88 0.06 0)" : "oklch(0.82 0.03 155)",
                          color: rep.isActive ? "oklch(0.45 0.12 0)" : "oklch(0.40 0.12 145)",
                          background: rep.isActive ? "oklch(0.97 0.03 0)" : "oklch(0.95 0.04 145)",
                        }}
                      >
                        {rep.isActive ? "Deactivate" : "Activate"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </AdminLayout>
  );
}
