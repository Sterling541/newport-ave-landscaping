/* ============================================================
   ADMIN SUBMISSIONS PAGE
   Google-Sheets-style view of all Schedule Services form
   submissions. Owner / admin access only.
   ============================================================ */
import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Search,
  Trash2,
  Eye,
  Loader2,
  RefreshCw,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  MapPin,
  DollarSign,
  Users,
  Calendar,
  Megaphone,
  Wrench,
  BarChart3,
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";
import {
  PhoneCall, PhoneOff, PhoneMissed, CalendarCheck, ThumbsDown, Clock, Trophy, XCircle,
} from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ── Types ─────────────────────────────────────────────────────────────────────

type Submission = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  siteAddress: string;
  serviceType: string;
  createdAt: Date;
  usedBefore?: string | null;
  billingAddress?: string | null;
  howHeard?: string | null;
  warrantyDetails?: string | null;
  salesConsultant?: string | null;
  projectManager?: string | null;
  maintenanceTypes?: string | null;
  maintenanceNotes?: string | null;
  irrigationTypes?: string | null;
  irrigationNotes?: string | null;
  winterizationDate?: string | null;
  lightingTypes?: string | null;
  lightingNotes?: string | null;
  waterFeatureTypes?: string | null;
  waterFeatureNotes?: string | null;
  waterFeatureRepairDesc?: string | null;
  creditCardNumber?: string | null;
  creditCardExpiration?: string | null;
  creditCardCvv?: string | null;
  creditCardAuthSignature?: string | null;
  concreteServiceType?: string | null;
  concreteElements?: string | null;
  concreteDimensions?: string | null;
  concreteHasStairs?: string | null;
  concreteAttachedToBuilding?: string | null;
  hasExistingDesign?: string | null;
  needsHoaApproval?: string | null;
  landscapeElements?: string | null;
  budget?: string | null;
  budgetOther?: string | null;
  designConsultationAccepted?: string | null;
  idealCompletionDate?: string | null;
  flexibleScheduling?: boolean | null;
  isRentalProperty?: string | null;
  isPropertyOwner?: string | null;
  hasPets?: string | null;
  comments?: string | null;
};

type SortKey = "id" | "createdAt" | "lastName" | "serviceType";
type SortDir = "asc" | "desc";

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmt(d: Date | string | null | undefined) {
  if (!d) return "—";
  return new Date(d).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "numeric", minute: "2-digit",
  });
}

function fmtDate(d: Date | string | null | undefined) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

function maskCC(n: string | null | undefined) {
  if (!n) return "—";
  const clean = n.replace(/\D/g, "");
  return clean.length >= 4 ? `**** **** **** ${clean.slice(-4)}` : "****";
}

function serviceLabel(svc: string | null | undefined) {
  if (!svc) return "(Unknown)";
  return svc.replace(/^> /, "").replace(/^Maintenance: /, "");
}

function exportCsv(rows: Submission[]) {
  const headers = [
    "ID", "Submitted", "First Name", "Last Name", "Email", "Phone",
    "Site Address", "Billing Address", "Used Before", "How Heard",
    "Service Type",
    "Warranty Details", "Sales Consultant", "Project Manager",
    "Maintenance Types", "Maintenance Notes",
    "Irrigation Types", "Irrigation Notes", "Winterization Date",
    "Lighting Types", "Lighting Notes",
    "Water Feature Types", "Water Feature Notes", "Water Feature Repair",
    "CC Number", "CC Expiration", "CC CVV", "CC Auth Signature",
    "Concrete Service", "Concrete Elements", "Concrete Dimensions", "Has Stairs", "Attached to Building",
    "Has Existing Design", "Needs HOA Approval", "Landscape Elements",
    "Budget", "Budget Other", "Design Consultation", "Ideal Completion Date",
    "Flexible Scheduling", "Is Rental", "Is Owner", "Has Pets",
    "Comments",
  ];

  const escape = (v: unknown) => {
    const s = v == null ? "" : String(v);
    return `"${s.replace(/"/g, '""')}"`;
  };

  const csvRows = rows.map(r => [
    r.id, fmt(r.createdAt), r.firstName, r.lastName, r.email, r.phone,
    r.siteAddress, r.billingAddress, r.usedBefore, r.howHeard,
    r.serviceType,
    r.warrantyDetails, r.salesConsultant, r.projectManager,
    r.maintenanceTypes, r.maintenanceNotes,
    r.irrigationTypes, r.irrigationNotes, r.winterizationDate,
    r.lightingTypes, r.lightingNotes,
    r.waterFeatureTypes, r.waterFeatureNotes, r.waterFeatureRepairDesc,
    r.creditCardNumber, r.creditCardExpiration, r.creditCardCvv, r.creditCardAuthSignature,
    r.concreteServiceType, r.concreteElements, r.concreteDimensions, r.concreteHasStairs, r.concreteAttachedToBuilding,
    r.hasExistingDesign, r.needsHoaApproval, r.landscapeElements,
    r.budget, r.budgetOther, r.designConsultationAccepted, r.idealCompletionDate,
    r.flexibleScheduling ? "Yes" : "No", r.isRentalProperty, r.isPropertyOwner, r.hasPets,
    r.comments,
  ].map(escape).join(","));

  const csv = [headers.map(h => `"${h}"`).join(","), ...csvRows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `newport-submissions-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Detail drawer ─────────────────────────────────────────────────────────────

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  if (!value || value === "—") return null;
  return (
    <div className="py-2 border-b border-stone-100 last:border-0">
      <dt className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-0.5">{label}</dt>
      <dd className="text-sm text-stone-900 break-words">{value}</dd>
    </div>
  );
}

function SubmissionDrawer({
  submission,
  onClose,
}: {
  submission: Submission | null;
  onClose: () => void;
}) {
  if (!submission) return null;
  const s = submission;
  return (
    <Sheet open={!!submission} onOpenChange={open => !open && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-lg font-bold text-stone-900">
            {s.firstName} {s.lastName}
          </SheetTitle>
          <p className="text-sm text-stone-500">{serviceLabel(s.serviceType)} · #{s.id}</p>
        </SheetHeader>

        <dl className="space-y-0">
          <DetailRow label="Submitted" value={fmt(s.createdAt)} />
          <DetailRow label="Email" value={<a href={`mailto:${s.email}`} className="text-green-700 underline">{s.email}</a>} />
          <DetailRow label="Phone" value={<a href={`tel:${s.phone}`} className="text-green-700 underline">{s.phone}</a>} />
          <DetailRow label="Site Address" value={s.siteAddress} />
          <DetailRow label="Billing Address" value={s.billingAddress} />
          <DetailRow label="Used Before" value={s.usedBefore} />
          <DetailRow label="How Heard" value={s.howHeard} />
          <DetailRow label="Service Type" value={s.serviceType} />

          {s.warrantyDetails && (
            <>
              <div className="pt-3 pb-1"><p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Warranty</p></div>
              <DetailRow label="Details" value={s.warrantyDetails} />
              <DetailRow label="Sales Consultant" value={s.salesConsultant} />
              <DetailRow label="Project Manager" value={s.projectManager} />
            </>
          )}

          {s.maintenanceTypes && (
            <>
              <div className="pt-3 pb-1"><p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Maintenance</p></div>
              <DetailRow label="Service Types" value={s.maintenanceTypes} />
              <DetailRow label="Notes" value={s.maintenanceNotes} />
            </>
          )}

          {s.irrigationTypes && (
            <>
              <div className="pt-3 pb-1"><p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Irrigation</p></div>
              <DetailRow label="Service Types" value={s.irrigationTypes} />
              <DetailRow label="Notes" value={s.irrigationNotes} />
              <DetailRow label="Winterization Date" value={s.winterizationDate} />
            </>
          )}

          {s.lightingTypes && (
            <>
              <div className="pt-3 pb-1"><p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Lighting</p></div>
              <DetailRow label="Service Types" value={s.lightingTypes} />
              <DetailRow label="Notes" value={s.lightingNotes} />
            </>
          )}

          {s.waterFeatureTypes && (
            <>
              <div className="pt-3 pb-1"><p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Water Feature</p></div>
              <DetailRow label="Service Types" value={s.waterFeatureTypes} />
              <DetailRow label="Notes" value={s.waterFeatureNotes} />
              <DetailRow label="Repair Description" value={s.waterFeatureRepairDesc} />
            </>
          )}

          {s.creditCardNumber && (
            <>
              <div className="pt-3 pb-1"><p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Credit Card</p></div>
              <DetailRow label="Card Number" value={maskCC(s.creditCardNumber)} />
              <DetailRow label="Expiration" value={s.creditCardExpiration} />
              <DetailRow label="CVV" value={s.creditCardCvv ? "***" : undefined} />
              <DetailRow label="Auth Signature" value={s.creditCardAuthSignature} />
            </>
          )}

          {s.landscapeElements && (
            <>
              <div className="pt-3 pb-1"><p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Landscape Design</p></div>
              <DetailRow label="Has Existing Design" value={s.hasExistingDesign} />
              <DetailRow label="Needs HOA Approval" value={s.needsHoaApproval} />
              <DetailRow label="Elements" value={s.landscapeElements} />
              <DetailRow label="Budget" value={s.budget} />
              <DetailRow label="Budget (Other)" value={s.budgetOther} />
              <DetailRow label="Design Consultation" value={s.designConsultationAccepted} />
              <DetailRow label="Ideal Completion" value={s.idealCompletionDate} />
            </>
          )}

          <div className="pt-3 pb-1"><p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Scheduling</p></div>
          <DetailRow label="Flexible Scheduling" value={s.flexibleScheduling ? "Yes" : "No"} />
          <DetailRow label="Rental Property" value={s.isRentalProperty} />
          <DetailRow label="Property Owner" value={s.isPropertyOwner} />
          <DetailRow label="Pets on Property" value={s.hasPets} />

          {s.comments && (
            <>
              <div className="pt-3 pb-1"><p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Comments</p></div>
              <DetailRow label="Comments" value={s.comments} />
            </>
          )}
        </dl>
      </SheetContent>
    </Sheet>
  );
}

// ── Sort icon ─────────────────────────────────────────────────────────────────

function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (col !== sortKey) return <ChevronsUpDown className="w-3 h-3 text-stone-400 ml-1" />;
  return sortDir === "asc"
    ? <ChevronUp className="w-3 h-3 text-green-700 ml-1" />
    : <ChevronDown className="w-3 h-3 text-green-700 ml-1" />;
}

// ── Main Component ────────────────────────────────────────────────────────────

// ── Category icon map ─────────────────────────────────────────────────────────

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Seasonality": <Calendar className="w-4 h-4" />,
  "Lead Sources": <Megaphone className="w-4 h-4" />,
  "Service Demand": <Wrench className="w-4 h-4" />,
  "Geography": <MapPin className="w-4 h-4" />,
  "Budget": <DollarSign className="w-4 h-4" />,
  "Customer Retention": <Users className="w-4 h-4" />,
  "Operations": <BarChart3 className="w-4 h-4" />,
  "Marketing": <TrendingUp className="w-4 h-4" />,
};

const PRIORITY_COLORS: Record<string, string> = {
  high: "bg-red-100 text-red-700 border-red-200",
  medium: "bg-amber-100 text-amber-700 border-amber-200",
  low: "bg-stone-100 text-stone-600 border-stone-200",
};


// ── Follow-up status config ──────────────────────────────────────────────────
const FOLLOW_UP_STATUSES = [
  { value: "called_scheduled",  label: "Called & Scheduled",  icon: PhoneCall,     color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  { value: "left_voicemail",    label: "Left Voicemail",      icon: PhoneOff,      color: "bg-amber-100 text-amber-800 border-amber-200" },
  { value: "appointment_set",   label: "Appt. Confirmed",     icon: CalendarCheck, color: "bg-blue-100 text-blue-800 border-blue-200" },
  { value: "no_answer",         label: "No Answer",           icon: PhoneMissed,   color: "bg-slate-100 text-slate-600 border-slate-200" },
  { value: "not_interested",    label: "Not Interested",      icon: ThumbsDown,    color: "bg-red-100 text-red-700 border-red-200" },
  { value: "follow_up_needed",  label: "Follow-Up Needed",    icon: Clock,         color: "bg-orange-100 text-orange-800 border-orange-200" },
  { value: "closed_won",           label: "Closed — Won",            icon: Trophy,        color: "bg-green-100 text-green-800 border-green-200" },
  { value: "closed_lost",          label: "Closed — Lost",           icon: XCircle,       color: "bg-rose-100 text-rose-700 border-rose-200" },
  { value: "below_minimum_budget", label: "Below Min. Budget",        icon: DollarSign,    color: "bg-slate-100 text-slate-500 border-slate-200" },
  { value: "price_too_high",       label: "Didn't Like Price",        icon: TrendingUp,    color: "bg-purple-100 text-purple-700 border-purple-200" },
] as const;
type FollowUpStatus = typeof FOLLOW_UP_STATUSES[number]["value"];

function FollowUpBadge({ status }: { status: string | null | undefined }) {
  if (!status) return <span className="text-xs text-slate-400 italic">No contact</span>;
  const cfg = FOLLOW_UP_STATUSES.find(s => s.value === status);
  if (!cfg) return <span className="text-xs text-slate-400">{status}</span>;
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${cfg.color}`}>
      <Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
}

export default function AdminSubmissions() {
  const { user, loading: authLoading } = useAuth();
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [selected, setSelected] = useState<Submission | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("submissions");
  const [insightsEnabled, setInsightsEnabled] = useState(false);

  const { data, isLoading, refetch } = trpc.submissions.list.useQuery(
    { limit: 500, offset: 0 },
    { enabled: !!user }
  );

  const {
    data: insightsData,
    isLoading: insightsLoading,
    refetch: refetchInsights,
    error: insightsError,
  } = trpc.submissions.insights.useQuery(
    undefined,
    { enabled: !!user && insightsEnabled, staleTime: 5 * 60 * 1000 }
  );

  const followUpMutation = trpc.followUp.logAction.useMutation({
    onSuccess: (result, variables) => {
      const statusCfg = FOLLOW_UP_STATUSES.find(s => s.value === variables.status);
      if (variables.status === "left_voicemail" && result.remindAt) {
        const remindDate = new Date(result.remindAt).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
        toast.success(`Voicemail logged — reminder set for ${remindDate} at 9am`);
      } else {
        toast.success(`Status updated: ${statusCfg?.label ?? variables.status}`);
      }
      statusSummaryQuery.refetch();
    },
    onError: (err) => toast.error(`Failed to log status: ${err.message}`),
  });
  const statusSummaryQuery = trpc.followUp.statusSummary.useQuery(undefined, { enabled: !!user });
  // Build a map of submissionId -> latest follow-up status
  const followUpMap = new Map<number, string>(
    (statusSummaryQuery.data ?? []).map(r => [r.submissionId, r.status])
  );
  const deleteMutation = trpc.submissions.delete.useMutation({
    onSuccess: () => {
      setDeleteId(null);
      refetch();
    },
  });

  // Unique service types for filter dropdown
  const serviceTypes = useMemo(() => {
    if (!data?.rows) return [];
    const set = new Set(
      data.rows
        .map(r => r.serviceType)
        .filter((s): s is string => !!s)  // exclude null/empty
    );
    return Array.from(set).sort();
  }, [data]);

  // Filter + search + sort
  const filtered = useMemo(() => {
    if (!data?.rows) return [];
    let rows = [...data.rows] as Submission[];

    if (serviceFilter !== "all") {
      rows = rows.filter(r => r.serviceType === serviceFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(r =>
        `${r.firstName ?? ""} ${r.lastName ?? ""} ${r.email ?? ""} ${r.phone ?? ""} ${r.siteAddress ?? ""} ${r.serviceType ?? ""}`
          .toLowerCase()
          .includes(q)
      );
    }

    rows.sort((a, b) => {
      let av: string | number, bv: string | number;
      if (sortKey === "createdAt") {
        av = new Date(a.createdAt).getTime();
        bv = new Date(b.createdAt).getTime();
      } else if (sortKey === "id") {
        av = a.id; bv = b.id;
      } else if (sortKey === "lastName") {
        av = (a.lastName ?? "").toLowerCase(); bv = (b.lastName ?? "").toLowerCase();
      } else {
        av = (a.serviceType ?? "").toLowerCase(); bv = (b.serviceType ?? "").toLowerCase();
      }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return rows;
  }, [data, search, serviceFilter, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  }

  // ── Auth gate ───────────────────────────────────────────────────────────────

  if (authLoading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-700" />
      </div>
    );
  }

  if (!user) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full min-h-screen">
          <div className="max-w-md text-center px-4">
            <ShieldAlert className="w-12 h-12 text-stone-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-stone-900 mb-2">Sign In Required</h1>
            <p className="text-stone-500 mb-6">Please sign in with your Newport Ave Landscaping account to access the admin area.</p>
            <Button
              onClick={() => window.location.href = getLoginUrl("/admin/submissions")}
              className="bg-green-700 hover:bg-green-800 text-white"
            >
              Sign In
            </Button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // Logged in but not owner/admin
  const isAuthorized = (user as { role?: string }).role === "admin";
  if (!isAuthorized) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full min-h-screen">
          <div className="max-w-md text-center px-4">
            <ShieldAlert className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-stone-900 mb-2">Access Denied</h1>
            <p className="text-stone-500 mb-6">
              This page is restricted to Newport Ave Landscaping administrators.
              If you believe this is an error, please contact the site owner.
            </p>
            <Button
              variant="outline"
              onClick={() => window.location.href = "/"}
              className="border-stone-300 text-stone-700"
            >
              Return to Home
            </Button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <AdminLayout>
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-stone-900">Admin Dashboard</h1>
            <p className="text-sm text-stone-500 mt-0.5">
              {data?.total ?? 0} total submissions
            </p>
          </div>
          <div className="flex gap-2">
            {activeTab === "submissions" && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => refetch()}
                  className="gap-2 border-stone-300"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Refresh
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => exportCsv(filtered)}
                  disabled={filtered.length === 0}
                  className="gap-2 border-stone-300"
                >
                  <Download className="w-3.5 h-3.5" /> Export CSV
                </Button>
              </>
            )}
            {activeTab === "insights" && insightsData && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetchInsights()}
                className="gap-2 border-stone-300"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Regenerate
              </Button>
            )}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger
              value="insights"
              onClick={() => setInsightsEnabled(true)}
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5" /> AI Insights
            </TabsTrigger>
          </TabsList>

          {/* ── Submissions Tab ── */}
          <TabsContent value="submissions">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search name, email, phone, address…"
              className="pl-9 border-stone-300 bg-white"
            />
          </div>
          <Select value={serviceFilter} onValueChange={setServiceFilter}>
            <SelectTrigger className="w-full sm:w-64 bg-white border-stone-300">
              <SelectValue placeholder="All service types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All service types</SelectItem>
              {serviceTypes.map(s => (
                <SelectItem key={s} value={s}>{serviceLabel(s)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-green-700" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-stone-400">
              <p className="text-lg font-medium">No submissions found</p>
              <p className="text-sm mt-1">Try adjusting your search or filter.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200">
                    {([
                      { key: "id" as SortKey, label: "#" },
                      { key: "createdAt" as SortKey, label: "Submitted" },
                      { key: "lastName" as SortKey, label: "Name" },
                    ] as { key: SortKey; label: string }[]).map(col => (
                      <th
                        key={col.key}
                        className="px-4 py-3 text-left text-xs font-semibold text-stone-600 uppercase tracking-wide cursor-pointer hover:text-stone-900 select-none whitespace-nowrap"
                        onClick={() => toggleSort(col.key)}
                      >
                        <span className="flex items-center">
                          {col.label}
                          <SortIcon col={col.key} sortKey={sortKey} sortDir={sortDir} />
                        </span>
                      </th>
                    ))}
                    <th className="px-4 py-3 text-left text-xs font-semibold text-stone-600 uppercase tracking-wide whitespace-nowrap">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-stone-600 uppercase tracking-wide whitespace-nowrap">Phone</th>
                    <th
                      className="px-4 py-3 text-left text-xs font-semibold text-stone-600 uppercase tracking-wide cursor-pointer hover:text-stone-900 select-none whitespace-nowrap"
                      onClick={() => toggleSort("serviceType")}
                    >
                      <span className="flex items-center">
                        Service <SortIcon col="serviceType" sortKey={sortKey} sortDir={sortDir} />
                      </span>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-stone-600 uppercase tracking-wide whitespace-nowrap">Address</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-stone-600 uppercase tracking-wide whitespace-nowrap">Follow-Up</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-stone-600 uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row, i) => (
                    <tr
                      key={row.id}
                      className={`border-b border-stone-100 hover:bg-stone-50 transition-colors ${i % 2 === 0 ? "" : "bg-stone-50/40"}`}
                    >
                      <td className="px-4 py-3 text-stone-400 font-mono text-xs">{row.id}</td>
                      <td className="px-4 py-3 text-stone-600 whitespace-nowrap">{fmtDate(row.createdAt)}</td>
                      <td className="px-4 py-3 font-medium text-stone-900 whitespace-nowrap">
                        {row.firstName} {row.lastName}
                      </td>
                      <td className="px-4 py-3">
                        <a href={`mailto:${row.email}`} className="text-green-700 hover:underline">{row.email}</a>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <a href={`tel:${row.phone}`} className="text-stone-700 hover:text-green-700">{row.phone}</a>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 whitespace-nowrap max-w-[200px] truncate">
                          {serviceLabel(row.serviceType)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-stone-600 max-w-[200px] truncate">{row.siteAddress}</td>
                      <td className="px-4 py-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="focus:outline-none">
                              <FollowUpBadge status={followUpMap.get(row.id) ?? null} />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="w-52">
                            {FOLLOW_UP_STATUSES.map(s => {
                              const Icon = s.icon;
                              return (
                                <DropdownMenuItem
                                  key={s.value}
                                  className="gap-2 cursor-pointer"
                                  onClick={() => followUpMutation.mutate({ submissionId: row.id, status: s.value as FollowUpStatus })}
                                >
                                  <Icon className="w-3.5 h-3.5" />
                                  {s.label}
                                  {s.value === "left_voicemail" && (
                                    <span className="ml-auto text-xs text-amber-600">+reminder</span>
                                  )}
                                </DropdownMenuItem>
                              );
                            })}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelected(row)}
                            className="h-7 w-7 p-0 text-stone-500 hover:text-green-700"
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeleteId(row.id)}
                            className="h-7 w-7 p-0 text-stone-400 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-xs text-stone-400 mt-3 text-right">
          Showing {filtered.length} of {data?.total ?? 0} submissions
        </p>
          </TabsContent>

          {/* ── AI Insights Tab ── */}
          <TabsContent value="insights">
            {insightsLoading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-green-700" />
                <p className="text-stone-500 text-sm">Analyzing your submission data…</p>
                <p className="text-stone-400 text-xs">This may take 10–20 seconds</p>
              </div>
            ) : insightsError ? (
              <div className="py-20 text-center">
                <p className="text-red-600 font-medium mb-2">Failed to generate insights</p>
                <p className="text-stone-500 text-sm mb-4">There was an error analyzing your data. Please try again.</p>
                <Button variant="outline" size="sm" onClick={() => refetchInsights()} className="gap-2">
                  <RefreshCw className="w-3.5 h-3.5" /> Try Again
                </Button>
              </div>
            ) : !insightsData ? (
              <div className="flex flex-col items-center justify-center py-24 gap-6">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-green-700" />
                </div>
                <div className="text-center max-w-sm">
                  <h3 className="text-lg font-semibold text-stone-900 mb-2">AI-Powered Marketing Insights</h3>
                  <p className="text-stone-500 text-sm">
                    Analyze your submission data to discover seasonal patterns, top lead sources,
                    service demand trends, and actionable recommendations for your marketing and intake team.
                  </p>
                </div>
                <Button
                  onClick={() => { setInsightsEnabled(true); refetchInsights(); }}
                  className="bg-green-700 hover:bg-green-800 text-white gap-2"
                >
                  <Sparkles className="w-4 h-4" /> Generate Insights
                </Button>
              </div>
            ) : insightsData.insights.length === 0 ? (
              <div className="py-20 text-center">
                <Sparkles className="w-10 h-10 text-stone-300 mx-auto mb-3" />
                <p className="text-stone-500">{insightsData.summary}</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Executive Summary */}
                <Card className="bg-green-50 border-green-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold text-green-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" /> Executive Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-green-800 leading-relaxed">{insightsData.summary}</p>
                    <p className="text-xs text-green-600 mt-3">
                      Based on {(insightsData as { dataPoints?: number }).dataPoints ?? 0} submissions ·
                      Generated {new Date(insightsData.generatedAt).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>

                {/* Insight Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {insightsData.insights.map((insight: {
                    category: string;
                    title: string;
                    finding: string;
                    action: string;
                    priority: string;
                  }, i: number) => (
                    <Card key={i} className="bg-white border-stone-200 hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2 text-stone-700">
                            {CATEGORY_ICONS[insight.category] ?? <BarChart3 className="w-4 h-4" />}
                            <span className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                              {insight.category}
                            </span>
                          </div>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${PRIORITY_COLORS[insight.priority] ?? PRIORITY_COLORS.low}`}>
                            {insight.priority}
                          </span>
                        </div>
                        <CardTitle className="text-sm font-semibold text-stone-900 mt-1">
                          {insight.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="text-sm text-stone-600 leading-relaxed">{insight.finding}</p>
                        <div className="pt-2 border-t border-stone-100">
                          <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-1">Recommended Action</p>
                          <p className="text-sm text-stone-700 leading-relaxed">{insight.action}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Detail drawer */}
      <SubmissionDrawer submission={selected} onClose={() => setSelected(null)} />

      {/* Delete confirmation */}
      <AlertDialog open={deleteId !== null} onOpenChange={open => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Submission #{deleteId}?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The submission will be permanently removed from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && deleteMutation.mutate({ id: deleteId })}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {deleteMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </AdminLayout>
  );
}
