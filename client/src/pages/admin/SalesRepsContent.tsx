/**
 * Sales Reps are now managed via Users & Roles.
 * Any staff user with role = 'sales_rep' automatically appears as an assignable rep
 * in the Smart Scheduler and receives appointment notification emails.
 */
import { trpc } from "@/lib/trpc";
import { Users, Mail, CheckCircle, ArrowRight } from "lucide-react";

export default function SalesRepsContent() {
  const { data: reps = [], isLoading } = trpc.scheduler.listReps.useQuery({ includeInactive: false });

  return (
    <div className="p-6 max-w-2xl">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Sales Reps</h2>
        <p className="text-sm text-gray-500">
          Sales reps are managed through <strong>Users &amp; Roles</strong>. Any user with the{" "}
          <strong>Sales Rep</strong> role is automatically eligible to be assigned appointments
          and will receive email notifications for new, rescheduled, and cancelled appointments.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex gap-3">
        <Users className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-amber-800">To add or remove a sales rep:</p>
          <p className="text-sm text-amber-700 mt-1">
            Go to <strong>Users &amp; Roles</strong> → find or create the user → set their role to{" "}
            <strong>Sales Rep</strong>. They will immediately appear in the Smart Scheduler.
          </p>
          <a
            href="/admin/configuration?tab=users"
            className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-amber-800 underline underline-offset-2"
          >
            Go to Users &amp; Roles <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Active Sales Reps ({reps.length})
        </h3>
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-14 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : reps.length === 0 ? (
          <div className="text-center py-10 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
            <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p className="text-sm">No active sales reps found.</p>
            <p className="text-xs mt-1">Go to Users &amp; Roles and assign the Sales Rep role to a user.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {reps.map((rep: any) => (
              <div
                key={rep.id}
                className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg"
              >
                <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <span className="text-sm font-semibold text-green-700">
                    {rep.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{rep.name}</p>
                  {rep.effectiveEmail ? (
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <Mail className="w-3 h-3" />
                      {rep.effectiveEmail}
                    </p>
                  ) : (
                    <p className="text-xs text-amber-600 mt-0.5">No email — notifications won't send</p>
                  )}
                </div>
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
