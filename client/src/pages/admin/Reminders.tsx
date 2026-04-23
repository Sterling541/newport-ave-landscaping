/* ============================================================
   REMINDERS — Admin Tickler / Callback Queue
   Shows all pending callback reminders with snooze + dismiss.
   ============================================================ */
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Bell, Phone, Clock, CheckCircle, AlarmClock, ChevronDown, Briefcase, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  called_scheduled: { label: "Called & Scheduled", color: "bg-emerald-100 text-emerald-800" },
  left_voicemail: { label: "Left Voicemail", color: "bg-amber-100 text-amber-800" },
  appointment_set: { label: "Appointment Set", color: "bg-blue-100 text-blue-800" },
  no_answer: { label: "No Answer", color: "bg-gray-100 text-gray-700" },
  not_interested: { label: "Not Interested", color: "bg-red-100 text-red-700" },
  follow_up_needed: { label: "Follow-Up Needed", color: "bg-orange-100 text-orange-800" },
  closed_won: { label: "Closed Won", color: "bg-green-100 text-green-800" },
  closed_lost: { label: "Closed Lost", color: "bg-slate-100 text-slate-600" },
};

function formatRemindAt(date: Date | string | null) {
  if (!date) return "—";
  const d = new Date(date);
  const now = new Date();
  const isOverdue = d < now;
  const isToday = d.toDateString() === now.toDateString();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const isTomorrow = d.toDateString() === tomorrow.toDateString();

  const timeStr = d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  if (isOverdue) return `Overdue — ${d.toLocaleDateString([], { month: "short", day: "numeric" })} at ${timeStr}`;
  if (isToday) return `Today at ${timeStr}`;
  if (isTomorrow) return `Tomorrow at ${timeStr}`;
  return `${d.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })} at ${timeStr}`;
}

function isOverdue(date: Date | string | null) {
  if (!date) return false;
  return new Date(date) < new Date();
}

export default function Reminders() {
  const utils = trpc.useUtils();
  const { data: reminders, isLoading } = trpc.followUp.allReminders.useQuery();
  const ackMutation = trpc.followUp.ackReminder.useMutation({
    onSuccess: () => {
      utils.followUp.allReminders.invalidate();
      utils.followUp.pendingCallbacks.invalidate();
    },
  });
  const snoozeMutation = trpc.followUp.snooze.useMutation({
    onSuccess: () => {
      utils.followUp.allReminders.invalidate();
    },
  });

  const [snoozeOpen, setSnoozeOpen] = useState<number | null>(null);

  const overdueItems = reminders?.filter(r => isOverdue(r.followUp.remindAt)) ?? [];
  const upcomingItems = reminders?.filter(r => !isOverdue(r.followUp.remindAt)) ?? [];

  return (
    <AdminLayout>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
            <Bell className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Reminders</h1>
            <p className="text-sm text-gray-500">Callback tickler — leads awaiting follow-up</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            {overdueItems.length > 0 && (
              <Badge className="bg-red-100 text-red-700 border-red-200">
                {overdueItems.length} overdue
              </Badge>
            )}
            {upcomingItems.length > 0 && (
              <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                {upcomingItems.length} upcoming
              </Badge>
            )}
          </div>
        </div>

        {isLoading && (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        )}

        {!isLoading && reminders?.length === 0 && (
          <div className="text-center py-20">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-gray-700 mb-1">All clear!</h2>
            <p className="text-sm text-gray-400">No pending reminders. Log a "Left Voicemail" on any lead to create one.</p>
          </div>
        )}

        {/* Overdue section */}
        {overdueItems.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <AlarmClock className="w-4 h-4 text-red-500" />
              <h2 className="text-sm font-semibold text-red-600 uppercase tracking-wide">Overdue</h2>
            </div>
            <div className="space-y-3">
              {overdueItems.map(item => (
                <ReminderCard
                  key={item.followUp.id}
                  item={item}
                  overdue
                  snoozeOpen={snoozeOpen}
                  setSnoozeOpen={setSnoozeOpen}
                  onDismiss={() => ackMutation.mutate({ followUpId: item.followUp.id })}
                  onSnooze={(days) => snoozeMutation.mutate({ followUpId: item.followUp.id, days })}
                />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming section */}
        {upcomingItems.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-blue-500" />
              <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Upcoming</h2>
            </div>
            <div className="space-y-3">
              {upcomingItems.map(item => (
                <ReminderCard
                  key={item.followUp.id}
                  item={item}
                  overdue={false}
                  snoozeOpen={snoozeOpen}
                  setSnoozeOpen={setSnoozeOpen}
                  onDismiss={() => ackMutation.mutate({ followUpId: item.followUp.id })}
                  onSnooze={(days) => snoozeMutation.mutate({ followUpId: item.followUp.id, days })}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

function ReminderCard({
  item,
  overdue,
  snoozeOpen,
  setSnoozeOpen,
  onDismiss,
  onSnooze,
}: {
  item: {
    followUp: {
      id: number;
      status: string;
      remindAt: Date | string | null;
      notes: string | null;
      createdAt: Date | string | null;
    };
    submission: {
      id: number;
      firstName: string;
      lastName: string;
      phone: string | null;
      email: string | null;
      serviceType: string | null;
      createdAt: Date | string | null;
    };
  };
  overdue: boolean;
  snoozeOpen: number | null;
  setSnoozeOpen: (id: number | null) => void;
  onDismiss: () => void;
  onSnooze: (days: number) => void;
}) {
  const statusInfo = STATUS_LABELS[item.followUp.status] ?? { label: item.followUp.status, color: "bg-gray-100 text-gray-700" };
  const isThisSnoozeOpen = snoozeOpen === item.followUp.id;

  return (
    <div
      className={`rounded-xl border p-4 transition-all ${
        overdue
          ? "border-red-200 bg-red-50/60"
          : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold ${overdue ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>
          {item.submission.firstName?.[0]}{item.submission.lastName?.[0]}
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-gray-900">
              {item.submission.firstName} {item.submission.lastName}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusInfo.color}`}>
              {statusInfo.label}
            </span>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-xs text-gray-500">
            {item.submission.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {item.submission.phone}
              </span>
            )}
            {item.submission.serviceType && (
              <span className="flex items-center gap-1">
                <Briefcase className="w-3 h-3" />
                {item.submission.serviceType}
              </span>
            )}
            <span className={`flex items-center gap-1 font-medium ${overdue ? "text-red-600" : "text-blue-600"}`}>
              <Calendar className="w-3 h-3" />
              {formatRemindAt(item.followUp.remindAt)}
            </span>
          </div>

          {item.followUp.notes && (
            <p className="mt-1.5 text-xs text-gray-600 bg-gray-50 rounded px-2 py-1 border border-gray-100">
              {item.followUp.notes}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {item.submission.phone && (
            <a
              href={`tel:${item.submission.phone.replace(/\D/g, "")}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              Call
            </a>
          )}

          {/* Snooze dropdown */}
          <div className="relative">
            <button
              onClick={() => setSnoozeOpen(isThisSnoozeOpen ? null : item.followUp.id)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-xs font-medium hover:bg-gray-50 transition-colors"
            >
              <AlarmClock className="w-3.5 h-3.5" />
              Snooze
              <ChevronDown className={`w-3 h-3 transition-transform ${isThisSnoozeOpen ? "rotate-180" : ""}`} />
            </button>
            {isThisSnoozeOpen && (
              <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[130px]">
                {[1, 2, 3, 7, 14].map(days => (
                  <button
                    key={days}
                    onClick={() => { onSnooze(days); setSnoozeOpen(null); }}
                    className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    {days === 1 ? "Tomorrow" : days === 7 ? "1 week" : days === 14 ? "2 weeks" : `${days} days`}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onDismiss}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 text-gray-500 text-xs hover:bg-gray-50 transition-colors"
            title="Dismiss reminder"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
