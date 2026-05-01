/* ============================================================
   ADMIN SMART SCHEDULER PAGE
   Newport Avenue Landscaping
   View and manage all appointments. Shows a weekly calendar
   grid and a list view with status management.
   ============================================================ */
import { useState, useMemo, useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  User,
  Phone,
  Check,
  X,
  Edit2,
  AlertCircle,
  List,
  LayoutGrid,
  ExternalLink,
  FileText,
  Mail,
  Tag,
  StickyNote,
  Trash2,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function toYMD(d: Date) {
  return d.toISOString().split("T")[0];
}

function addDays(d: Date, n: number) {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + n);
  return copy;
}

function getWeekStart(d: Date) {
  const copy = new Date(d);
  const dow = copy.getDay(); // 0=Sun
  copy.setDate(copy.getDate() - dow);
  return copy;
}

const HOURS = Array.from({ length: 12 }, (_, i) => i + 7); // 7am–6pm

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  scheduled:  { bg: "oklch(0.92 0.08 240)", text: "oklch(0.28 0.12 240)", label: "Scheduled" },
  confirmed:  { bg: "oklch(0.92 0.10 145)", text: "oklch(0.28 0.14 145)", label: "Confirmed" },
  completed:  { bg: "oklch(0.93 0.05 155)", text: "oklch(0.35 0.08 155)", label: "Completed" },
  cancelled:  { bg: "oklch(0.93 0.04 0)",   text: "oklch(0.45 0.10 0)",   label: "Cancelled" },
  no_show:    { bg: "oklch(0.93 0.06 75)",  text: "oklch(0.40 0.12 75)",  label: "No Show" },
};

const TYPE_COLORS: Record<string, string> = {
  install_design: "oklch(0.55 0.15 240)",
  enhancement:    "oklch(0.50 0.15 145)",
  follow_up:      "oklch(0.55 0.15 75)",
  other:          "oklch(0.55 0.08 155)",
};

// Cycling palette for rep calendar colors — new reps auto-pick the next color
const REP_PALETTE = [
  { bg: "oklch(0.55 0.18 240)", light: "oklch(0.92 0.08 240)", label: "Blue" },
  { bg: "oklch(0.50 0.16 145)", light: "oklch(0.92 0.10 145)", label: "Green" },
  { bg: "oklch(0.58 0.18 55)",  light: "oklch(0.93 0.10 55)",  label: "Amber" },
  { bg: "oklch(0.52 0.18 310)", light: "oklch(0.93 0.08 310)", label: "Purple" },
  { bg: "oklch(0.55 0.18 20)",  light: "oklch(0.93 0.08 20)",  label: "Red" },
  { bg: "oklch(0.52 0.16 195)", light: "oklch(0.92 0.08 195)", label: "Teal" },
];

function getRepColor(index: number) {
  return REP_PALETTE[index % REP_PALETTE.length];
}

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

// ─── Appointment Detail Side Panel ──────────────────────────────────────────────

type ApptDetailAppt = {
  id: number;
  submissionId?: number | null;
  repId: number;
  appointmentDate: string | Date;
  startTime: string;
  endTime: string;
  appointmentType: string;
  status: string;
  customerName?: string | null;
  customerAddress?: string | null;
  customerPhone?: string | null;
  notes?: string | null;
};

const TYPE_LABELS: Record<string, string> = {
  install_design: "Install / Design",
  enhancement: "Enhancement",
  follow_up: "Follow-Up",
  other: "Other",
};

function AppointmentDetailPanel({
  appt,
  repName,
  repBg,
  onClose,
  onEdit,
  onCancel,
  onDelete,
  onStatusChange,
  isCancelling,
  isDeleting,
}: {
  appt: ApptDetailAppt;
  repName: string;
  repBg: string;
  onClose: () => void;
  onEdit: () => void;
  onCancel: () => void;
  onDelete: () => void;
  onStatusChange: (status: string) => void;
  isCancelling: boolean;
  isDeleting: boolean;
}) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const displayDate = (() => {
    const d = typeof appt.appointmentDate === "string"
      ? new Date(appt.appointmentDate + "T12:00:00")
      : new Date(appt.appointmentDate as any);
    return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  })();

  const ss = STATUS_STYLES[appt.status] ?? STATUS_STYLES.scheduled;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/20"
        onClick={onClose}
      />
      {/* Panel */}
      <div
        className="fixed right-0 top-0 h-full z-50 flex flex-col shadow-2xl overflow-y-auto"
        style={{
          width: "min(420px, 100vw)",
          background: "oklch(0.99 0.005 155)",
          borderLeft: "1px solid oklch(0.88 0.03 155)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b"
          style={{ borderColor: "oklch(0.90 0.02 155)", background: "oklch(0.97 0.01 155)" }}
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" style={{ color: repBg }} />
            <span className="font-semibold text-sm" style={{ color: "oklch(0.20 0.05 155)" }}>
              Appointment Details
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            style={{ color: "oklch(0.50 0.04 155)" }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 p-5 space-y-5">
          {/* Status badge + type */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="px-2.5 py-1 rounded-full text-xs font-semibold"
              style={{ background: ss.bg, color: ss.text }}
            >
              {ss.label}
            </span>
            <span
              className="px-2.5 py-1 rounded-full text-xs font-medium"
              style={{ background: repBg + "22", color: repBg, border: `1px solid ${repBg}44` }}
            >
              {TYPE_LABELS[appt.appointmentType] ?? appt.appointmentType}
            </span>
          </div>

          {/* Customer name */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "oklch(0.60 0.04 155)" }}>Customer</div>
            <div className="text-lg font-bold" style={{ color: "oklch(0.18 0.05 155)" }}>
              {appt.customerName ?? <span className="italic font-normal text-base" style={{ color: "oklch(0.65 0.03 155)" }}>No name</span>}
            </div>
          </div>

          {/* Info rows */}
          <div className="space-y-2.5">
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "oklch(0.55 0.05 155)" }} />
              <div>
                <div className="text-sm font-medium" style={{ color: "oklch(0.25 0.05 155)" }}>{displayDate}</div>
                <div className="text-xs" style={{ color: "oklch(0.55 0.04 155)" }}>{appt.startTime} – {appt.endTime}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 shrink-0" style={{ color: repBg }} />
              <span className="text-sm font-medium" style={{ color: repBg }}>{repName}</span>
            </div>
            {appt.customerPhone && (
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0" style={{ color: "oklch(0.55 0.05 155)" }} />
                <a
                  href={`tel:${appt.customerPhone}`}
                  className="text-sm hover:underline"
                  style={{ color: "oklch(0.35 0.12 240)" }}
                >
                  {appt.customerPhone}
                </a>
              </div>
            )}
            {appt.customerAddress && (
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "oklch(0.55 0.05 155)" }} />
                <span className="text-sm" style={{ color: "oklch(0.35 0.05 155)" }}>{appt.customerAddress}</span>
              </div>
            )}
            {appt.notes && (
              <div className="flex items-start gap-3">
                <StickyNote className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "oklch(0.55 0.05 155)" }} />
                <p className="text-sm leading-relaxed" style={{ color: "oklch(0.40 0.04 155)" }}>{appt.notes}</p>
              </div>
            )}
          </div>

          {/* Quick status change */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "oklch(0.60 0.04 155)" }}>Change Status</div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(STATUS_STYLES).map(([key, style]) => (
                <button
                  key={key}
                  onClick={() => onStatusChange(key)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all"
                  style={{
                    background: appt.status === key ? style.bg : "transparent",
                    color: appt.status === key ? style.text : "oklch(0.55 0.04 155)",
                    borderColor: appt.status === key ? style.text + "44" : "oklch(0.88 0.02 155)",
                    fontWeight: appt.status === key ? 700 : 400,
                  }}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {/* Link to submission */}
          {appt.submissionId && (
            <div
              className="rounded-xl p-4 border"
              style={{ background: "oklch(0.95 0.03 145)", borderColor: "oklch(0.88 0.06 145)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4" style={{ color: "oklch(0.40 0.12 145)" }} />
                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "oklch(0.40 0.12 145)" }}>Linked Form Submission</span>
              </div>
              <p className="text-xs mb-3" style={{ color: "oklch(0.45 0.08 145)" }}>
                This appointment was booked from a form submission. View the full submission details, contact history, and notes.
              </p>
              <a
                href={`/admin/submissions?highlight=${appt.submissionId}`}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors hover:opacity-80"
                style={{ background: "oklch(0.40 0.12 145)", color: "white" }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Open Submission #{appt.submissionId}
              </a>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div
          className="px-5 py-4 border-t flex gap-2"
          style={{ borderColor: "oklch(0.90 0.02 155)", background: "oklch(0.97 0.01 155)" }}
        >
          <button
            onClick={onEdit}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors hover:bg-gray-50"
            style={{ borderColor: "oklch(0.85 0.03 155)", color: "oklch(0.30 0.06 155)" }}
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
          {appt.status !== "cancelled" && (
            <button
              onClick={onCancel}
              disabled={isCancelling}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
              style={{
                background: "oklch(0.97 0.03 0)",
                color: "oklch(0.45 0.12 0)",
                border: "1px solid oklch(0.88 0.06 0)",
                opacity: isCancelling ? 0.6 : 1,
              }}
            >
              <X className="w-4 h-4" />
              {isCancelling ? "Cancelling…" : "Cancel Appt"}
            </button>
          )}
          <button
            onClick={() => setShowDeleteConfirm(true)}
            disabled={isDeleting}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors"
            style={{
              background: "oklch(0.25 0.08 0)",
              color: "oklch(0.95 0.01 0)",
              border: "1px solid oklch(0.35 0.10 0)",
              opacity: isDeleting ? 0.6 : 1,
            }}
            title="Permanently delete this appointment"
          >
            <Trash2 className="w-4 h-4" />
            {isDeleting ? "Deleting…" : "Delete"}
          </button>
        </div>

        {/* Delete confirmation dialog */}
        <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Appointment?</AlertDialogTitle>
              <AlertDialogDescription>
                This will <strong>permanently remove</strong> the appointment for{" "}
                <strong>{appt.customerName}</strong> from the database. This cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep It</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  onDelete();
                }}
              >
                Yes, Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}

// ─── Create Appointment Modal ─────────────────────────────────────────────────

interface CreateModalProps {
  reps: { id: number; name: string; role: string }[];
  onClose: () => void;
  onCreated: () => void;
  prefillDate?: string;
  prefillHour?: number;
  prefillRepId?: number;
  rescheduleAppt?: { id: number; customerName: string; customerAddress: string; customerPhone: string; appointmentType: string; notes: string } | null;
}

function CreateModal({ reps, onClose, onCreated, prefillDate, prefillHour, prefillRepId, rescheduleAppt }: CreateModalProps) {
  const startHour = prefillHour ?? 9;
  const startStr = `${startHour.toString().padStart(2, "0")}:00`;
  const endStr   = `${(startHour + 1).toString().padStart(2, "0")}:00`;
  const [form, setForm] = useState({
    repId: prefillRepId ?? reps[0]?.id ?? 0,
    appointmentDate: prefillDate ?? toYMD(new Date()),
    startTime: startStr,
    endTime: endStr,
    appointmentType: (rescheduleAppt?.appointmentType ?? "install_design") as "install_design" | "enhancement" | "follow_up" | "other",
    customerName: rescheduleAppt?.customerName ?? "",
    customerAddress: rescheduleAppt?.customerAddress ?? "",
    customerPhone: rescheduleAppt?.customerPhone ?? "",
    notes: rescheduleAppt?.notes ?? "",
  });
  const [toast, setToast] = useState<string | null>(null);

  const cancelOldMutation = trpc.scheduler.cancelAppointment.useMutation();

  const createMutation = trpc.scheduler.createAppointment.useMutation({
    onSuccess: () => {
      onCreated();
      onClose();
    },
    onError: (err) => setToast(`Error: ${err.message}`),
  });

  async function handleSubmit() {
    // If rescheduling: cancel the old appointment first, then create new one
    if (rescheduleAppt) {
      await cancelOldMutation.mutateAsync({ id: rescheduleAppt.id });
    }
    createMutation.mutate(form);
  }

  const suggestionsQuery = trpc.scheduler.getSuggestions.useQuery(
    {
      appointmentType: form.appointmentType,
      customerAddress: form.customerAddress || undefined,
      daysAhead: 7,
    },
    { enabled: true, refetchOnWindowFocus: false }
  );

  const suggestions = suggestionsQuery.data ?? [];

  function applySuggestion(s: typeof suggestions[0]) {
    setForm((f) => ({
      ...f,
      repId: s.repId,
      appointmentDate: s.date,
      startTime: s.startTime,
      endTime: s.endTime,
    }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        className="w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden"
        style={{ background: "white" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"

        >
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" style={{ color: "oklch(0.45 0.15 145)" }} />
            <h2 className="font-semibold text-base" style={{ color: "oklch(0.20 0.05 155)" }}>
              {rescheduleAppt ? `Reschedule: ${rescheduleAppt.customerName}` : "Schedule Appointment"}
            </h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4" style={{ color: "oklch(0.50 0.05 155)" }} />
          </button>
        </div>

        <div className="flex divide-x divide-[oklch(0.90_0.02_155)]">
          {/* Form */}
          <div className="flex-1 p-5 space-y-4 overflow-y-auto max-h-[70vh]">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "oklch(0.45 0.05 155)" }}>
                  Appointment Type
                </label>
                <select
                  value={form.appointmentType}
                  onChange={(e) => setForm({ ...form, appointmentType: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                  style={{ borderColor: "oklch(0.82 0.03 155)" }}
                >
                  <option value="install_design">Install / Design</option>
                  <option value="enhancement">Enhancement</option>
                  <option value="follow_up">Follow-Up</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "oklch(0.45 0.05 155)" }}>
                  Sales Rep
                </label>
                <select
                  value={form.repId}
                  onChange={(e) => setForm({ ...form, repId: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                  style={{ borderColor: "oklch(0.82 0.03 155)" }}
                >
                  {reps.map((r) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "oklch(0.45 0.05 155)" }}>
                  Date
                </label>
                <input
                  type="date"
                  value={form.appointmentDate}
                  onChange={(e) => setForm({ ...form, appointmentDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                  style={{ borderColor: "oklch(0.82 0.03 155)" }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "oklch(0.45 0.05 155)" }}>
                  Start
                </label>
                <input
                  type="time"
                  value={form.startTime}
                  onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                  style={{ borderColor: "oklch(0.82 0.03 155)" }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "oklch(0.45 0.05 155)" }}>
                  End
                </label>
                <input
                  type="time"
                  value={form.endTime}
                  onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                  style={{ borderColor: "oklch(0.82 0.03 155)" }}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "oklch(0.45 0.05 155)" }}>
                Customer Name
              </label>
              <input
                type="text"
                value={form.customerName}
                onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                placeholder="Full name"
                className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                style={{ borderColor: "oklch(0.82 0.03 155)" }}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "oklch(0.45 0.05 155)" }}>
                Customer Address
              </label>
              <input
                type="text"
                value={form.customerAddress}
                onChange={(e) => setForm({ ...form, customerAddress: e.target.value })}
                placeholder="Site address (used for drive time estimate)"
                className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                style={{ borderColor: "oklch(0.82 0.03 155)" }}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "oklch(0.45 0.05 155)" }}>
                Customer Phone
              </label>
              <input
                type="tel"
                value={form.customerPhone}
                onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
                placeholder="(541) 555-0100"
                className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                style={{ borderColor: "oklch(0.82 0.03 155)" }}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "oklch(0.45 0.05 155)" }}>
                Notes
              </label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={2}
                placeholder="Internal notes…"
                className="w-full px-3 py-2 rounded-lg border text-sm outline-none resize-none"
                style={{ borderColor: "oklch(0.82 0.03 155)" }}
              />
            </div>

            {toast && (
              <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{toast}</div>
            )}

            <div className="flex gap-2 pt-1">
              <button
                onClick={handleSubmit}
                disabled={createMutation.isPending || cancelOldMutation.isPending || !form.repId}
                className="flex-1 py-2 rounded-lg text-sm font-medium text-white disabled:opacity-50"
                style={{ background: "oklch(0.45 0.15 145)" }}
              >
                {createMutation.isPending || cancelOldMutation.isPending
                  ? (rescheduleAppt ? "Rescheduling…" : "Scheduling…")
                  : (rescheduleAppt ? "Move to This Slot" : "Schedule Appointment")}
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-sm border"
                style={{ borderColor: "oklch(0.82 0.03 155)", color: "oklch(0.50 0.05 155)" }}
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Suggestions Panel */}
          <div className="w-56 p-4 overflow-y-auto max-h-[70vh]" style={{ background: "oklch(0.97 0.01 145)" }}>
            <p className="text-xs font-semibold mb-3" style={{ color: "oklch(0.35 0.08 145)" }}>
              Suggested Slots
            </p>
            {suggestionsQuery.isLoading ? (
              <p className="text-xs" style={{ color: "oklch(0.60 0.04 155)" }}>Loading…</p>
            ) : suggestions.length === 0 ? (
              <p className="text-xs" style={{ color: "oklch(0.60 0.04 155)" }}>No suggestions available.</p>
            ) : (
              <div className="space-y-2">
                {suggestions.slice(0, 8).map((s, i) => (
                  <button
                    key={i}
                    onClick={() => applySuggestion(s)}
                    className="w-full text-left p-2.5 rounded-xl border transition-colors hover:border-green-400"
                    style={{
                      background: "white",
                      borderColor: "oklch(0.88 0.04 145)",
                    }}
                  >
                    <div className="text-xs font-semibold" style={{ color: "oklch(0.25 0.08 155)" }}>
                      {new Date(s.date + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "oklch(0.50 0.05 155)" }}>
                      {s.startTime} – {s.endTime}
                    </div>
                    <div className="text-xs mt-0.5 font-medium" style={{ color: "oklch(0.40 0.12 145)" }}>
                      {s.repName}
                    </div>
                    <div className="text-[10px] mt-0.5" style={{ color: "oklch(0.60 0.04 155)" }}>
                      Score {s.score} · {s.scoreReason}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SmartScheduler() {
  // Read optional ?date=YYYY-MM-DD param from URL (set by Suggestions modal "Pick another time")
  const urlDate = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const d = params.get("date");
    if (d && /^\d{4}-\d{2}-\d{2}$/.test(d)) return new Date(d + "T12:00:00");
    return null;
  }, []);

  const [view, setView] = useState<"list" | "week" | "day">(urlDate ? "week" : "list");
  const [dayDate, setDayDate] = useState<Date>(() => urlDate ?? new Date());
  const [weekStart, setWeekStart] = useState(() => getWeekStart(urlDate ?? new Date()));
  const [showCreate, setShowCreate] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editStatus, setEditStatus] = useState<string>("scheduled");
  const [editNotes, setEditNotes] = useState("");

  // Detail side panel state
  const [detailAppt, setDetailAppt] = useState<ApptDetailAppt | null>(null);

  // Drag-and-drop state
  const [dragApptId, setDragApptId] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState<{ date: string; hour: number } | null>(null);

  // Right-click context menu state
  const [ctxMenu, setCtxMenu] = useState<{
    x: number; y: number;
    date: string; hour: number;
    existingAppt: null | { id: number; customerName: string; customerAddress: string; customerPhone: string; appointmentType: string; notes: string };
  } | null>(null);
  type RescheduleAppt = { id: number; customerName: string; customerAddress: string; customerPhone: string; appointmentType: string; notes: string } | null;
  const [createPrefill, setCreatePrefill] = useState<{ date: string; hour: number; rescheduleAppt: RescheduleAppt } | null>(null);
  const ctxRef = useRef<HTMLDivElement>(null);

  // Dismiss context menu on outside click
  useEffect(() => {
    if (!ctxMenu) return;
    function dismiss(e: MouseEvent) {
      if (ctxRef.current && !ctxRef.current.contains(e.target as Node)) {
        setCtxMenu(null);
      }
    }
    document.addEventListener("mousedown", dismiss);
    return () => document.removeEventListener("mousedown", dismiss);
  }, [ctxMenu]);

  // Rep calendar toggles — null means "all selected" (default), Set means explicit selection
  const [selectedRepIds, setSelectedRepIds] = useState<Set<number> | null>(null);

  function toggleRep(repId: number) {
    setSelectedRepIds((prev) => {
      // If null (all selected), clicking one rep isolates it
      const base = prev ?? new Set(reps.map((r: { id: number }) => r.id));
      const next = new Set(base);
      if (next.has(repId)) {
        next.delete(repId);
        // If all deselected, reset to all
        if (next.size === 0) return null;
      } else {
        next.add(repId);
        // If all selected again, reset to null
        if (next.size === reps.length) return null;
      }
      return next;
    });
  }

  function isRepSelected(repId: number) {
    return selectedRepIds === null || selectedRepIds.has(repId);
  }

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const weekEnd = addDays(weekStart, 6);

  const { data: reps = [] } = trpc.scheduler.listReps.useQuery(
    { includeInactive: false },
    { refetchOnWindowFocus: false }
  );

  const { data: appointments = [], isLoading, refetch } = trpc.scheduler.listAppointments.useQuery(
    {
      dateFrom: toYMD(view === "week" ? weekStart : view === "day" ? dayDate : addDays(new Date(), -30)),
      dateTo: toYMD(view === "week" ? weekEnd : view === "day" ? dayDate : addDays(new Date(), 60)),
      limit: 300,
    },
    { refetchOnWindowFocus: false }
  );

  const updateMutation = trpc.scheduler.updateAppointment.useMutation({
    onSuccess: () => {
      showToast("Appointment updated.");
      setEditingId(null);
      refetch();
    },
    onError: (err) => showToast(`Error: ${err.message}`),
  });

   const cancelMutation = trpc.scheduler.cancelAppointment.useMutation({
    onSuccess: () => {
      showToast("Appointment cancelled.");
      refetch();
    },
    onError: (err) => showToast(`Error: ${err.message}`),
  });
  const deleteMutation = trpc.scheduler.deleteAppointment.useMutation({
    onSuccess: () => {
      showToast("Appointment permanently deleted.");
      setDetailAppt(null);
      setEditingId(null);
      refetch();
    },
    onError: (err) => showToast(`Error deleting: ${err.message}`),
  });
  const rescheduleMutation = trpc.scheduler.updateAppointment.useMutation({
    onSuccess: () => {
      showToast("Appointment rescheduled.");
      refetch();
    },
    onError: (err) => showToast(`Error rescheduling: ${err.message}`),
  });

  function handleDrop(targetDate: string, targetHour: number) {
    if (dragApptId === null) return;
    const appt = appointments.find((a: (typeof appointments)[0]) => a.id === dragApptId);
    if (!appt) return;
    // Calculate duration from original start/end
    const [sh, sm] = appt.startTime.split(":").map(Number);
    const [eh, em] = appt.endTime.split(":").map(Number);
    const durationMins = (eh * 60 + em) - (sh * 60 + sm);
    const newStartH = targetHour.toString().padStart(2, "0");
    const newEndTotalMins = targetHour * 60 + durationMins;
    const newEndH = Math.floor(newEndTotalMins / 60).toString().padStart(2, "0");
    const newEndM = (newEndTotalMins % 60).toString().padStart(2, "0");
    rescheduleMutation.mutate({
      id: dragApptId,
      appointmentDate: targetDate,
      startTime: `${newStartH}:00`,
      endTime: `${newEndH}:${newEndM}`,
    });
    setDragApptId(null);
    setDragOver(null);
  }

  // Build week days (Mon–Fri)
  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  }, [weekStart]);

  // Group appointments by date for week view
  const apptsByDate = useMemo(() => {
    const map: Record<string, typeof appointments> = {};
    for (const a of appointments) {
      const d = typeof a.appointmentDate === "string"
        ? a.appointmentDate
        : toYMD(new Date(a.appointmentDate as any));
      if (!map[d]) map[d] = [];
      map[d].push(a);
    }
    return map;
  }, [appointments]);

  function startEdit(appt: (typeof appointments)[0]) {
    // Open detail panel (week/day view) — inline edit still used in list view
    setDetailAppt(appt as ApptDetailAppt);
    setEditingId(appt.id);
    setEditStatus(appt.status);
    setEditNotes(appt.notes ?? "");
  }

  function submitEdit(id: number) {
    updateMutation.mutate({
      id,
      status: editStatus as any,
      notes: editNotes || null,
    });
  }

  const repMap = useMemo(() => {
    const m: Record<number, string> = {};
    for (const r of reps) m[r.id] = r.name;
    return m;
  }, [reps]);

  // Map repId -> color palette entry — uses rep's custom calendarColor if set, else auto-palette
  const repColorMap = useMemo(() => {
    const m: Record<number, { bg: string; light: string; label: string }> = {};
    reps.forEach((r: { id: number; calendarColor?: string | null }, i: number) => {
      if (r.calendarColor) {
        m[r.id] = { bg: r.calendarColor, light: r.calendarColor + "33", label: r.calendarColor };
      } else {
        m[r.id] = getRepColor(i);
      }
    });
    return m;
  }, [reps]);

  // Filtered appointments for the week view (respects rep toggles)
  const filteredApptsByDate = useMemo(() => {
    const map: Record<string, typeof appointments> = {};
    for (const a of appointments) {
      if (a.status === "cancelled") continue; // hide cancelled from calendar
      if (!isRepSelected(a.repId)) continue;
      const d = typeof a.appointmentDate === "string"
        ? a.appointmentDate
        : toYMD(new Date(a.appointmentDate as any));
      if (!map[d]) map[d] = [];
      map[d].push(a);
    }
    return map;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointments, selectedRepIds]);

  return (
    <AdminLayout>
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "oklch(0.92 0.08 240)" }}
            >
              <Calendar className="w-5 h-5" style={{ color: "oklch(0.28 0.12 240)" }} />
            </div>
            <div>
              <h1 className="text-xl font-bold" style={{ color: "oklch(0.18 0.04 155)" }}>
                Smart Scheduler
              </h1>
              <p className="text-sm" style={{ color: "oklch(0.50 0.05 155)" }}>
                {appointments.length} appointment{appointments.length !== 1 ? "s" : ""} in view
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* View toggle */}
            <div
              className="flex rounded-lg border overflow-hidden"
              style={{ borderColor: "oklch(0.85 0.02 155)" }}
            >
              <button
                onClick={() => setView("list")}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm transition-colors"
                style={{
                  background: view === "list" ? "oklch(0.18 0.04 155)" : "white",
                  color: view === "list" ? "white" : "oklch(0.50 0.05 155)",
                }}
              >
                <List className="w-3.5 h-3.5" />
                List
              </button>
              <button
                onClick={() => setView("week")}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm transition-colors"
                style={{
                  background: view === "week" ? "oklch(0.18 0.04 155)" : "white",
                  color: view === "week" ? "white" : "oklch(0.50 0.05 155)",
                }}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                Week
              </button>
              <button
                onClick={() => setView("day")}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm transition-colors"
                style={{
                  background: view === "day" ? "oklch(0.18 0.04 155)" : "white",
                  color: view === "day" ? "white" : "oklch(0.50 0.05 155)",
                }}
              >
                <Calendar className="w-3.5 h-3.5" />
                Day
              </button>
            </div>

            {/* Week navigation (only in week view) */}
            {view === "week" && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setWeekStart(addDays(weekStart, -7))}
                  className="p-1.5 rounded-lg border hover:bg-gray-50 transition-colors"
                  style={{ borderColor: "oklch(0.85 0.02 155)" }}
                >
                  <ChevronLeft className="w-4 h-4" style={{ color: "oklch(0.50 0.05 155)" }} />
                </button>
                <span className="text-sm px-2" style={{ color: "oklch(0.40 0.05 155)" }}>
                  {formatDate(weekStart)} – {formatDate(weekEnd)}
                </span>
                <button
                  onClick={() => setWeekStart(addDays(weekStart, 7))}
                  className="p-1.5 rounded-lg border hover:bg-gray-50 transition-colors"
                  style={{ borderColor: "oklch(0.85 0.02 155)" }}
                >
                  <ChevronRight className="w-4 h-4" style={{ color: "oklch(0.50 0.05 155)" }} />
                </button>
              </div>
            )}
            {/* Day navigation */}
            {view === "day" && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setDayDate(addDays(dayDate, -1))}
                  className="p-1.5 rounded-lg border hover:bg-gray-50 transition-colors"
                  style={{ borderColor: "oklch(0.85 0.02 155)" }}
                >
                  <ChevronLeft className="w-4 h-4" style={{ color: "oklch(0.50 0.05 155)" }} />
                </button>
                <span className="text-sm px-2" style={{ color: "oklch(0.40 0.05 155)" }}>
                  {dayDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                </span>
                <button
                  onClick={() => setDayDate(addDays(dayDate, 1))}
                  className="p-1.5 rounded-lg border hover:bg-gray-50 transition-colors"
                  style={{ borderColor: "oklch(0.85 0.02 155)" }}
                >
                  <ChevronRight className="w-4 h-4" style={{ color: "oklch(0.50 0.05 155)" }} />
                </button>
                <button
                  onClick={() => setDayDate(new Date())}
                  className="px-2.5 py-1.5 rounded-lg border text-xs hover:bg-gray-50 transition-colors"
                  style={{ borderColor: "oklch(0.85 0.02 155)", color: "oklch(0.50 0.05 155)" }}
                >
                  Today
                </button>
              </div>
            )}

            <button
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium text-white"
              style={{ background: "oklch(0.45 0.15 145)" }}
            >
              <Plus className="w-4 h-4" />
              New Appointment
            </button>
          </div>
        </div>

        {/* Google Calendar Notice */}
        <div
          className="mb-5 flex items-start gap-3 p-4 rounded-xl border"
          style={{ background: "oklch(0.97 0.04 75)", borderColor: "oklch(0.88 0.08 75)" }}
        >
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "oklch(0.55 0.15 75)" }} />
          <div className="text-sm" style={{ color: "oklch(0.40 0.10 75)" }}>
            <strong>Google Calendar sync is pending setup.</strong> Appointments are stored in the database now.
            Once you complete Google Cloud setup and add Calendar IDs in Sales Reps, appointments will sync automatically.
          </div>
        </div>

        {/* ── Rep Calendar Toggles ── */}
        {reps.length > 0 && (
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium mr-1" style={{ color: "oklch(0.55 0.05 155)" }}>Show:</span>
            {/* "All" shortcut */}
            <button
              onClick={() => setSelectedRepIds(null)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all"
              style={{
                background: selectedRepIds === null ? "oklch(0.18 0.04 155)" : "white",
                color: selectedRepIds === null ? "white" : "oklch(0.45 0.05 155)",
                borderColor: selectedRepIds === null ? "oklch(0.18 0.04 155)" : "oklch(0.85 0.02 155)",
              }}
            >
              All
            </button>
            {reps.map((rep: { id: number; name: string; calendarColor?: string | null }, i: number) => {
              const color = repColorMap[rep.id] ?? getRepColor(i);
              const active = isRepSelected(rep.id);
              // Count appointments for this rep in the current view window
              const repCount = appointments.filter((a: { repId: number }) => a.repId === rep.id).length;
              return (
                <button
                  key={rep.id}
                  onClick={() => toggleRep(rep.id)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all"
                  style={{
                    background: active ? color.bg : "white",
                    color: active ? "white" : "oklch(0.45 0.05 155)",
                    borderColor: active ? color.bg : "oklch(0.85 0.02 155)",
                    opacity: active ? 1 : 0.65,
                  }}
                  title={active ? `Hide ${rep.name}'s appointments` : `Show ${rep.name}'s appointments`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: active ? "rgba(255,255,255,0.7)" : color.bg }}
                  />
                  {rep.name.split(" ")[0]}
                  {repCount > 0 && (
                    <span
                      className="ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold leading-none"
                      style={{
                        background: active ? "rgba(255,255,255,0.25)" : color.bg + "22",
                        color: active ? "white" : color.bg,
                      }}
                    >
                      {repCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* ── LIST VIEW ── */}
        {view === "list" && (
          <div>
            {isLoading ? (
              <div className="text-center py-12 text-sm" style={{ color: "oklch(0.60 0.04 155)" }}>
                Loading appointments…
              </div>
            ) : appointments.length === 0 ? (
              <div
                className="text-center py-16 rounded-2xl border border-dashed"
                style={{ borderColor: "oklch(0.82 0.03 155)" }}
              >
                <Calendar className="w-10 h-10 mx-auto mb-3 opacity-20" />
                <p className="font-medium mb-1" style={{ color: "oklch(0.40 0.05 155)" }}>
                  No appointments yet
                </p>
                <p className="text-sm mb-4" style={{ color: "oklch(0.60 0.04 155)" }}>
                  Click "New Appointment" to schedule one.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {appointments.filter((appt: (typeof appointments)[0]) => appt.status !== "cancelled").map((appt: (typeof appointments)[0]) => {
                  const dateStr = typeof appt.appointmentDate === "string"
                    ? appt.appointmentDate
                    : toYMD(new Date(appt.appointmentDate as any));
                  const displayDate = new Date(dateStr + "T12:00:00").toLocaleDateString("en-US", {
                    weekday: "short", month: "short", day: "numeric", year: "numeric",
                  });
                  const ss = STATUS_STYLES[appt.status] ?? STATUS_STYLES.scheduled;

                  return (
                    <div
                      key={appt.id}
                      className="rounded-2xl border p-5 transition-shadow hover:shadow-sm"
                      style={{
                        background: appt.status === "cancelled" ? "oklch(0.97 0.005 155)" : "white",
                        borderColor: "oklch(0.88 0.02 155)",
                        opacity: appt.status === "cancelled" ? 0.65 : 1,
                      }}
                    >
                      {editingId === appt.id ? (
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium mb-1" style={{ color: "oklch(0.45 0.05 155)" }}>
                                Status
                              </label>
                              <select
                                value={editStatus}
                                onChange={(e) => setEditStatus(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                                style={{ borderColor: "oklch(0.82 0.03 155)" }}
                              >
                                <option value="scheduled">Scheduled</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="no_show">No Show</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-medium mb-1" style={{ color: "oklch(0.45 0.05 155)" }}>
                                Notes
                              </label>
                              <input
                                type="text"
                                value={editNotes}
                                onChange={(e) => setEditNotes(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                                style={{ borderColor: "oklch(0.82 0.03 155)" }}
                              />
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => submitEdit(appt.id)}
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
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div
                              className="w-2 self-stretch rounded-full shrink-0"
                              style={{ background: TYPE_COLORS[appt.appointmentType] ?? "oklch(0.55 0.08 155)" }}
                            />
                            <div>
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <span className="font-semibold text-sm" style={{ color: "oklch(0.20 0.05 155)" }}>
                                  {appt.customerName ?? "Customer"}
                                </span>
                                <span
                                  className="px-2 py-0.5 rounded-full text-xs font-medium"
                                  style={{ background: ss.bg, color: ss.text }}
                                >
                                  {ss.label}
                                </span>
                              </div>
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-1.5 text-xs" style={{ color: "oklch(0.45 0.05 155)" }}>
                                  <Clock className="w-3 h-3" />
                                  {displayDate} · {appt.startTime} – {appt.endTime}
                                </div>
                                <div className="flex items-center gap-1.5 text-xs" style={{ color: "oklch(0.45 0.05 155)" }}>
                                  <User className="w-3 h-3" />
                                  {repMap[appt.repId] ?? `Rep #${appt.repId}`}
                                  {appt.driveTimeMinutes && (
                                    <span className="opacity-60">· {appt.driveTimeMinutes} min from office</span>
                                  )}
                                </div>
                                {appt.customerAddress && (
                                  <div className="flex items-center gap-1.5 text-xs" style={{ color: "oklch(0.45 0.05 155)" }}>
                                    <MapPin className="w-3 h-3" />
                                    {appt.customerAddress}
                                  </div>
                                )}
                                {appt.customerPhone && (
                                  <div className="flex items-center gap-1.5 text-xs" style={{ color: "oklch(0.45 0.05 155)" }}>
                                    <Phone className="w-3 h-3" />
                                    {appt.customerPhone}
                                  </div>
                                )}
                                {appt.notes && (
                                  <div className="text-xs mt-1 italic" style={{ color: "oklch(0.55 0.04 155)" }}>
                                    {appt.notes}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => startEdit(appt)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border hover:bg-gray-50 transition-colors"
                              style={{ borderColor: "oklch(0.85 0.02 155)", color: "oklch(0.50 0.05 155)" }}
                            >
                              <Edit2 className="w-3 h-3" />
                              Edit
                            </button>
                            {appt.status !== "cancelled" && (
                              <button
                                onClick={() => cancelMutation.mutate({ id: appt.id })}
                                disabled={cancelMutation.isPending}
                                className="px-3 py-1.5 rounded-lg text-xs border transition-colors"
                                style={{
                                  borderColor: "oklch(0.88 0.06 0)",
                                  color: "oklch(0.45 0.12 0)",
                                  background: "oklch(0.97 0.03 0)",
                                }}
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── WEEK VIEW ── */}
        {view === "week" && (
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ borderColor: "oklch(0.88 0.02 155)" }}
          >
            {/* Day headers */}
            <div className="grid grid-cols-8 border-b" style={{ borderColor: "oklch(0.88 0.02 155)" }}>
              <div className="p-2 text-xs" style={{ color: "oklch(0.60 0.04 155)" }} />
              {weekDays.map((day) => {
                const isToday = toYMD(day) === toYMD(new Date());
                return (
                  <div
                    key={toYMD(day)}
                    className="p-2 text-center border-l cursor-pointer select-none group"
                    style={{
                      borderColor: "oklch(0.88 0.02 155)",
                      background: isToday ? "oklch(0.95 0.05 145)" : "white",
                      transition: "background 0.15s",
                    }}
                    onClick={() => { setDayDate(day); setView("day"); }}
                    title={`View ${day.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}`}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = isToday ? "oklch(0.90 0.08 145)" : "oklch(0.96 0.03 155)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = isToday ? "oklch(0.95 0.05 145)" : "white"; }}
                  >
                    <div className="text-xs font-medium" style={{ color: isToday ? "oklch(0.35 0.12 145)" : "oklch(0.50 0.05 155)" }}>
                      {day.toLocaleDateString("en-US", { weekday: "short" })}
                    </div>
                    <div
                      className="text-sm font-bold group-hover:underline"
                      style={{ color: isToday ? "oklch(0.30 0.14 145)" : "oklch(0.25 0.05 155)" }}
                    >
                      {day.getDate()}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Hour rows */}
            {HOURS.map((hour) => (
              <div
                key={hour}
                className="grid grid-cols-8 border-b"
                style={{ borderColor: "oklch(0.92 0.01 155)", minHeight: 56 }}
              >
                <div
                  className="p-2 text-xs text-right pr-3 pt-1 shrink-0"
                  style={{ color: "oklch(0.65 0.04 155)" }}
                >
                  {hour === 12 ? "12pm" : hour < 12 ? `${hour}am` : `${hour - 12}pm`}
                </div>
                {weekDays.map((day) => {
                  const dateStr = toYMD(day);
                  const dayAppts = (filteredApptsByDate[dateStr] ?? []).filter(
                    (a: (typeof appointments)[0]) => a.startTime.startsWith(`${hour.toString().padStart(2, "0")}:`)
                  );
                  const isDropTarget =
                    dragApptId !== null &&
                    dragOver?.date === dateStr &&
                    dragOver?.hour === hour;
                  return (
                    <div
                      key={dateStr}
                      className="border-l p-1 space-y-1 transition-colors"
                      style={{
                        borderColor: "oklch(0.92 0.01 155)",
                        background: isDropTarget
                          ? "oklch(0.92 0.10 145)"
                          : undefined,
                        outline: isDropTarget ? "2px dashed oklch(0.45 0.15 145)" : undefined,
                        outlineOffset: "-2px",
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver({ date: dateStr, hour });
                      }}
                      onDragLeave={() => setDragOver(null)}
                      onDrop={(e) => {
                        e.preventDefault();
                        handleDrop(dateStr, hour);
                      }}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        // Find if there's an existing appointment in this cell to reschedule
                        const existing = dayAppts[0] ?? null;
                        setCtxMenu({
                          x: e.clientX,
                          y: e.clientY,
                          date: dateStr,
                          hour,
                          existingAppt: existing ? {
                            id: existing.id,
                            customerName: existing.customerName ?? "",
                            customerAddress: existing.customerAddress ?? "",
                            customerPhone: existing.customerPhone ?? "",
                            appointmentType: existing.appointmentType,
                            notes: existing.notes ?? "",
                          } : null,
                        });
                      }}
                    >
                      {dayAppts.map((a: (typeof appointments)[0]) => (
                        <div
                          key={a.id}
                          draggable={a.status !== "cancelled"}
                          className="rounded px-1.5 py-1 text-[10px] leading-tight cursor-grab active:cursor-grabbing select-none"
                          style={{
                            background: repColorMap[a.repId]?.bg ?? TYPE_COLORS[a.appointmentType] ?? "oklch(0.55 0.08 155)",
                            color: "white",
                            opacity: dragApptId === a.id ? 0.4 : a.status === "cancelled" ? 0.5 : 1,
                            transition: "opacity 0.15s",
                            borderLeft: `3px solid ${TYPE_COLORS[a.appointmentType] ?? "rgba(255,255,255,0.4)"}`,
                          }}
                          onDragStart={(e) => {
                            setDragApptId(a.id);
                            e.dataTransfer.effectAllowed = "move";
                            // Ghost image: use the element itself
                            e.dataTransfer.setDragImage(e.currentTarget, 0, 0);
                          }}
                          onDragEnd={() => {
                            setDragApptId(null);
                            setDragOver(null);
                          }}
                          onClick={() => startEdit(a)}
                          title={`${a.customerName ?? "Customer"} · ${a.startTime}–${a.endTime} — drag to reschedule`}
                        >
                          <div className="font-medium truncate">{a.customerName ?? "Customer"}</div>
                          <div className="opacity-80">{repMap[a.repId] ?? "Rep"} · {a.startTime}</div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>

        {/* ── DAY VIEW ── */}
        {view === "day" && (() => {
          const dayStr = toYMD(dayDate);
          const dayAppts = (filteredApptsByDate[dayStr] ?? []).sort((a: (typeof appointments)[0], b: (typeof appointments)[0]) => a.startTime.localeCompare(b.startTime));
          const isToday = toYMD(new Date()) === dayStr;
          return (
            <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "oklch(0.88 0.03 155)" }}>
              {/* Day header */}
              <div
                className="px-6 py-4 flex items-center justify-between"
                style={{ background: isToday ? "oklch(0.92 0.08 145)" : "oklch(0.96 0.02 155)" }}
              >
                <div>
                  <div className="text-lg font-bold" style={{ color: "oklch(0.18 0.04 155)" }}>
                    {dayDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                    {isToday && <span className="ml-2 text-sm font-medium px-2 py-0.5 rounded-full" style={{ background: "oklch(0.45 0.15 145)", color: "white" }}>Today</span>}
                  </div>
                  <div className="text-sm mt-0.5" style={{ color: "oklch(0.50 0.05 155)" }}>
                    {dayAppts.length} appointment{dayAppts.length !== 1 ? "s" : ""}
                  </div>
                </div>
              </div>
              {/* Hour grid */}
              <div className="divide-y" style={{ borderColor: "oklch(0.92 0.02 155)" }}>
                {HOURS.map((hour) => {
                  const hourStr = `${hour.toString().padStart(2, "0")}:00`;
                  const halfStr = `${hour.toString().padStart(2, "0")}:30`;
                  const hourAppts = dayAppts.filter((a: (typeof appointments)[0]) => {
                    const h = parseInt(a.startTime.split(":")[0], 10);
                    return h === hour;
                  });
                  return (
                    <div key={hour} className="flex min-h-[72px]">
                      {/* Time label */}
                      <div
                        className="w-20 shrink-0 px-4 py-3 text-xs font-medium border-r"
                        style={{ color: "oklch(0.60 0.04 155)", borderColor: "oklch(0.92 0.02 155)", background: "oklch(0.98 0.01 155)" }}
                      >
                        {hour === 12 ? "12pm" : hour > 12 ? `${hour - 12}pm` : `${hour}am`}
                      </div>
                      {/* Appointment slots */}
                      <div className="flex-1 p-2 flex flex-col gap-1.5">
                        {hourAppts.length === 0 ? (
                          <div
                            className="h-full min-h-[56px] rounded-lg border border-dashed flex items-center justify-center text-xs cursor-context-menu"
                            style={{ borderColor: "oklch(0.90 0.02 155)", color: "oklch(0.75 0.03 155)" }}
                            onContextMenu={(e) => {
                              e.preventDefault();
                              setCtxMenu({ x: e.clientX, y: e.clientY, date: dayStr, hour, existingAppt: null });
                            }}
                          >
                            Available
                          </div>
                        ) : (
                          hourAppts.map((a: (typeof appointments)[0]) => {
                            const repColor = repColorMap[a.repId];
                            const bg = repColor?.bg ?? TYPE_COLORS[a.appointmentType] ?? "oklch(0.55 0.08 155)";
                            const statusStyle = STATUS_STYLES[a.status] ?? STATUS_STYLES.scheduled;
                            return (
                              <div
                                key={a.id}
                                className="rounded-xl p-3 cursor-pointer hover:opacity-90 transition-opacity"
                                style={{ background: bg + "22", borderLeft: `4px solid ${bg}` }}
                                onClick={() => startEdit(a)}
                                onContextMenu={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setCtxMenu({
                                    x: e.clientX, y: e.clientY,
                                    date: dayStr, hour,
                                    existingAppt: {
                                      id: a.id,
                                      customerName: a.customerName ?? "",
                                      customerAddress: a.customerAddress ?? "",
                                      customerPhone: a.customerPhone ?? "",
                                      appointmentType: a.appointmentType,
                                      notes: a.notes ?? "",
                                    },
                                  });
                                }}
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <div className="font-semibold text-sm" style={{ color: "oklch(0.18 0.04 155)" }}>
                                      {a.customerName ?? "Customer"}
                                    </div>
                                    <div className="text-xs mt-0.5 flex items-center gap-2" style={{ color: "oklch(0.50 0.05 155)" }}>
                                      <span>{a.startTime} – {a.endTime}</span>
                                      <span>·</span>
                                      <span style={{ color: bg }}>{repMap[a.repId] ?? "Rep"}</span>
                                      {a.customerAddress && <><span>·</span><span className="truncate max-w-[200px]">{a.customerAddress}</span></>}
                                    </div>
                                  </div>
                                  <span
                                    className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-medium"
                                    style={{ background: statusStyle.bg, color: statusStyle.text }}
                                  >
                                    {statusStyle.label}
                                  </span>
                                </div>
                                {a.notes && (
                                  <div className="text-xs mt-1.5 opacity-70 italic" style={{ color: "oklch(0.40 0.05 155)" }}>
                                    {a.notes}
                                  </div>
                                )}
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}
      {/* Create Modal (from + New Appointment button) */}
      {showCreate && (
        <CreateModal
          reps={reps}
          onClose={() => setShowCreate(false)}
          onCreated={() => { refetch(); showToast("Appointment scheduled."); }}
        />
      )}

      {/* Context menu right-click popup */}
      {ctxMenu && (
        <div
          ref={ctxRef}
          className="fixed z-50 rounded-xl shadow-2xl border overflow-hidden"
          style={{
            left: Math.min(ctxMenu.x, window.innerWidth - 220),
            top: Math.min(ctxMenu.y, window.innerHeight - 120),
            background: "white",
            borderColor: "oklch(0.88 0.03 155)",
            minWidth: 200,
          }}
        >
          <div
            className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wide"
            style={{ background: "oklch(0.96 0.02 155)", color: "oklch(0.50 0.05 155)" }}
          >
            {new Date(ctxMenu.date + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
            {" "}{ctxMenu.hour === 12 ? "12pm" : ctxMenu.hour > 12 ? `${ctxMenu.hour - 12}pm` : `${ctxMenu.hour}am`}
          </div>
          <button
            className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-2"
            style={{ color: "oklch(0.25 0.08 145)" }}
            onClick={() => {
              setCreatePrefill({ date: ctxMenu.date, hour: ctxMenu.hour, rescheduleAppt: null });
              setCtxMenu(null);
            }}
          >
            <span>+</span> Add Appointment
          </button>
          {ctxMenu.existingAppt && (
            <button
              className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-2 border-t"
              style={{ color: "oklch(0.45 0.12 240)", borderColor: "oklch(0.92 0.02 155)" }}
              onClick={() => {
                setCreatePrefill({ date: ctxMenu!.date, hour: ctxMenu!.hour, rescheduleAppt: ctxMenu!.existingAppt });
                setCtxMenu(null);
              }}
            >
              <span>↕</span> Move {ctxMenu.existingAppt.customerName} Here
            </button>
          )}
          <button
            className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 border-t"
            style={{ color: "oklch(0.55 0.05 155)", borderColor: "oklch(0.92 0.02 155)" }}
            onClick={() => setCtxMenu(null)}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Prefill Create/Reschedule Modal (from right-click) */}
      {createPrefill && (
        <CreateModal
          reps={reps}
          prefillDate={createPrefill.date}
          prefillHour={createPrefill.hour}
          rescheduleAppt={createPrefill.rescheduleAppt}
          onClose={() => setCreatePrefill(null)}
          onCreated={() => {
            refetch();
            showToast(createPrefill.rescheduleAppt ? "Appointment rescheduled." : "Appointment scheduled.");
            setCreatePrefill(null);
          }}
        />
      )}

      {/* Appointment Detail Side Panel */}
      {detailAppt && (() => {
        const repBg = repColorMap[detailAppt.repId]?.bg ?? TYPE_COLORS[detailAppt.appointmentType] ?? "oklch(0.55 0.08 155)";
        const repName = repMap[detailAppt.repId] ?? `Rep #${detailAppt.repId}`;
        return (
          <AppointmentDetailPanel
            appt={detailAppt}
            repName={repName}
            repBg={repBg}
            onClose={() => { setDetailAppt(null); setEditingId(null); }}
            onEdit={() => {
              // Keep inline edit open in list view; for week/day view just close panel
              setDetailAppt(null);
            }}
            onCancel={() => {
              cancelMutation.mutate({ id: detailAppt.id });
              setDetailAppt(null);
              setEditingId(null);
            }}
            onDelete={() => {
              deleteMutation.mutate({ id: detailAppt.id });
            }}
            onStatusChange={(status) => {
              updateMutation.mutate({ id: detailAppt.id, status: status as any });
              setDetailAppt((prev) => prev ? { ...prev, status } : null);
            }}
            isCancelling={cancelMutation.isPending}
            isDeleting={deleteMutation.isPending}
          />
        );
      })()}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </AdminLayout>
  );
}
