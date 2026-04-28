/* ============================================================
   ADMIN SUBMISSIONS PAGE
   Google-Sheets-style view of all Schedule Services form
   submissions. Owner / admin access only.
   ============================================================ */
import { useState, useMemo, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { isAdminAuthenticated, adminLogin } from "@/hooks/useAdminAuth";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check } from "lucide-react";
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
  EyeOff,
  Loader2,
  RefreshCw,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Shield,
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
  MessageSquare,
  Send,
  Flag,
} from "lucide-react";
import { AIChatBox, type Message as ChatMessage } from "@/components/AIChatBox";
import AdminLayout from "@/components/AdminLayout";
// getLoginUrl removed — using PIN auth instead
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
  adminNotes?: string | null;
  leadStatus?: string | null;
  isSpam?: boolean | null;
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
      <dt className="text-xs font-semibold text-stone-600 uppercase tracking-wide mb-0.5">{label}</dt>
      <dd className="text-sm text-stone-950 font-medium break-words">{value}</dd>
    </div>
  );
}

function CreditCardSection({
  cardNumber, expiration, cvv, authSignature,
}: {
  cardNumber: string | null | undefined;
  expiration: string | null | undefined;
  cvv: string | null | undefined;
  authSignature: string | null | undefined;
}) {
  const [revealed, setRevealed] = useState(false);
  return (
    <>
      <div className="pt-3 pb-1 flex items-center justify-between">
        <p className="text-xs font-bold text-stone-700 uppercase tracking-widest bg-stone-100 px-2 py-1 rounded">Credit Card</p>
        <button
          onClick={() => setRevealed(r => !r)}
          className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800 transition-colors px-2 py-1 rounded hover:bg-stone-100"
          title={revealed ? "Hide card details" : "Reveal card details"}
        >
          {revealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          {revealed ? "Hide" : "Reveal"}
        </button>
      </div>
      <div className="py-2 border-b border-stone-100">
        <dt className="text-xs font-semibold text-stone-600 uppercase tracking-wide mb-0.5">Card Number</dt>
        <dd className="text-sm text-stone-950 font-medium font-mono">
          {revealed ? (cardNumber || "—") : maskCC(cardNumber)}
        </dd>
      </div>
      <div className="py-2 border-b border-stone-100">
        <dt className="text-xs font-semibold text-stone-600 uppercase tracking-wide mb-0.5">Expiration</dt>
        <dd className="text-sm text-stone-950 font-medium">{expiration || "—"}</dd>
      </div>
      {cvv && (
        <div className="py-2 border-b border-stone-100">
          <dt className="text-xs font-semibold text-stone-600 uppercase tracking-wide mb-0.5">CVV</dt>
          <dd className="text-sm text-stone-950 font-medium font-mono">
            {revealed ? cvv : "•••"}
          </dd>
        </div>
      )}
      {authSignature && (
        <div className="py-2 border-b border-stone-100">
          <dt className="text-xs font-semibold text-stone-600 uppercase tracking-wide mb-0.5">Auth Signature</dt>
          <dd className="text-sm text-stone-950 font-medium">{authSignature}</dd>
        </div>
      )}
    </>
  );
}

function SubmissionDetail({
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
          <DetailRow label="Email" value={<a href={`mailto:${s.email}`} className="text-red-700 underline font-medium">{s.email}</a>} />
          <DetailRow label="Phone" value={<a href={`tel:${s.phone}`} className="text-red-700 underline font-medium">{s.phone}</a>} />
          <DetailRow label="Site Address" value={s.siteAddress} />
          <DetailRow label="Billing Address" value={s.billingAddress} />
          <DetailRow label="Used Before" value={s.usedBefore} />
          <DetailRow label="How Heard" value={s.howHeard} />
          <DetailRow label="Service Type" value={s.serviceType} />

          {s.warrantyDetails && (
            <>
              <div className="pt-3 pb-1"><p className="text-xs font-bold text-stone-600 uppercase tracking-widest">Warranty</p></div>
              <DetailRow label="Details" value={s.warrantyDetails} />
              <DetailRow label="Sales Consultant" value={s.salesConsultant} />
              <DetailRow label="Project Manager" value={s.projectManager} />
            </>
          )}

          {s.maintenanceTypes && (
            <>
              <div className="pt-3 pb-1"><p className="text-xs font-bold text-stone-600 uppercase tracking-widest">Maintenance</p></div>
              <DetailRow label="Service Types" value={s.maintenanceTypes} />
              <DetailRow label="Notes" value={s.maintenanceNotes} />
            </>
          )}

          {s.irrigationTypes && (
            <>
              <div className="pt-3 pb-1"><p className="text-xs font-bold text-stone-600 uppercase tracking-widest">Irrigation</p></div>
              <DetailRow label="Service Types" value={s.irrigationTypes} />
              <DetailRow label="Notes" value={s.irrigationNotes} />
              <DetailRow label="Winterization Date" value={s.winterizationDate} />
            </>
          )}

          {s.lightingTypes && (
            <>
              <div className="pt-3 pb-1"><p className="text-xs font-bold text-stone-600 uppercase tracking-widest">Lighting</p></div>
              <DetailRow label="Service Types" value={s.lightingTypes} />
              <DetailRow label="Notes" value={s.lightingNotes} />
            </>
          )}

          {s.waterFeatureTypes && (
            <>
              <div className="pt-3 pb-1"><p className="text-xs font-bold text-stone-600 uppercase tracking-widest">Water Feature</p></div>
              <DetailRow label="Service Types" value={s.waterFeatureTypes} />
              <DetailRow label="Notes" value={s.waterFeatureNotes} />
              <DetailRow label="Repair Description" value={s.waterFeatureRepairDesc} />
            </>
          )}

          {s.creditCardNumber && (
            <CreditCardSection
              cardNumber={s.creditCardNumber}
              expiration={s.creditCardExpiration}
              cvv={s.creditCardCvv}
              authSignature={s.creditCardAuthSignature}
            />
          )}

          {s.landscapeElements && (
            <>
              <div className="pt-3 pb-1"><p className="text-xs font-bold text-stone-600 uppercase tracking-widest">Landscape Design</p></div>
              <DetailRow label="Has Existing Design" value={s.hasExistingDesign} />
              <DetailRow label="Needs HOA Approval" value={s.needsHoaApproval} />
              <DetailRow label="Elements" value={s.landscapeElements} />
              <DetailRow label="Budget" value={s.budget} />
              <DetailRow label="Budget (Other)" value={s.budgetOther} />
              <DetailRow label="Design Consultation" value={s.designConsultationAccepted} />
              <DetailRow label="Ideal Completion" value={s.idealCompletionDate} />
            </>
          )}

          <div className="pt-3 pb-1"><p className="text-xs font-bold text-stone-600 uppercase tracking-widest">Scheduling</p></div>
          <DetailRow label="Flexible Scheduling" value={s.flexibleScheduling ? "Yes" : "No"} />
          <DetailRow label="Rental Property" value={s.isRentalProperty} />
          <DetailRow label="Property Owner" value={s.isPropertyOwner} />
          <DetailRow label="Pets on Property" value={s.hasPets} />

          {s.comments && (
            <>
              <div className="pt-3 pb-1"><p className="text-xs font-bold text-stone-600 uppercase tracking-widest">Comments</p></div>
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
  { value: "no_answer",         label: "No Answer",           icon: PhoneMissed,   color: "bg-slate-100 text-slate-600 border-slate-200" },
  { value: "not_interested",    label: "Not Interested",      icon: ThumbsDown,    color: "bg-red-100 text-red-700 border-red-200" },
  { value: "follow_up_needed",  label: "Follow-Up Needed",    icon: Clock,         color: "bg-orange-100 text-orange-800 border-orange-200" },
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

// ── Deep Dive AI Chat Component ────────────────────────────────────────────
function DeepDiveTab() {
  const [question, setQuestion] = useState("");
  const [conversation, setConversation] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const deepDiveMutation = trpc.submissions.deepDive.useMutation({
    onSuccess: (data) => {
      setConversation(prev => [...prev, { role: "assistant", content: data.answer }]);
      setIsLoading(false);
    },
    onError: () => {
      setConversation(prev => [...prev, { role: "assistant", content: "Sorry, I couldn't process that question. Please try again." }]);
      setIsLoading(false);
    },
  });

  const handleSend = () => {
    if (!question.trim() || isLoading) return;
    const q = question.trim();
    setConversation(prev => [...prev, { role: "user", content: q }]);
    setQuestion("");
    setIsLoading(true);
    deepDiveMutation.mutate({ question: q });
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const SUGGESTIONS = [
    "Are things trending up this year vs last year?",
    "How did April this year compare to April last year?",
    "What's our most popular service type?",
    "Which lead source brings in the most inquiries?",
    "What months are our busiest?",
    "How is irrigation trending year over year?",
  ];

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-xl border border-stone-200 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-stone-100 bg-stone-50">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-stone-700" />
          <h3 className="font-semibold text-stone-900">AI Deep Dive</h3>
        </div>
        <p className="text-xs text-stone-500 mt-0.5">Ask any question about your submission data — trends, comparisons, breakdowns.</p>
      </div>

      {/* Conversation */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.length === 0 && (
          <div className="space-y-3">
            <p className="text-sm text-stone-500 text-center py-4">Try asking a question, or pick one below:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => { setQuestion(s); }}
                  className="text-left text-sm px-3 py-2 rounded-lg border border-stone-200 hover:border-stone-400 hover:bg-stone-50 transition-colors text-stone-700"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {conversation.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
              msg.role === "user"
                ? "bg-stone-800 text-white rounded-br-sm"
                : "bg-stone-100 text-stone-800 rounded-bl-sm"
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-stone-100 rounded-xl rounded-bl-sm px-4 py-3">
              <Loader2 className="w-4 h-4 animate-spin text-stone-500" />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-stone-100 bg-stone-50">
        <div className="flex gap-2">
          <Input
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder="Ask about your data..."
            className="flex-1 bg-white border-stone-200"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={!question.trim() || isLoading}
            className="bg-stone-800 hover:bg-stone-700 text-white px-3"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function AdminSubmissions() {
  const [pinAuthed, setPinAuthed] = useState(() => isAdminAuthenticated());
  // Alias user to pinAuthed for downstream code that checks !!user
  const user = pinAuthed ? { role: "admin" } : null;
  const authLoading = false;
  const [search, setSearch] = useState("");
  const [serviceFilters, setServiceFilters] = useState<string[]>([]);
  const [yearFilter, setYearFilter] = useState<number | undefined>(undefined);
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [selected, setSelected] = useState<Submission | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("submissions");
  const [insightsEnabled, setInsightsEnabled] = useState(false);
  const [monthFilter, setMonthFilter] = useState<number | undefined>(undefined);
  // Deep Dive chat state
  const [deepDiveMessages, setDeepDiveMessages] = useState<ChatMessage[]>([
    { role: "system", content: "You are a business analyst for Newport Avenue Landscaping. Answer questions about their lead data." },
  ]);

  const { data, isLoading, refetch } = trpc.submissions.list.useQuery(
    { limit: 2000, offset: 0, year: yearFilter },
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

    const { data: yoyData, isLoading: yoyLoading } = trpc.submissions.yoyStats.useQuery(
    { serviceTypes: serviceFilters.length > 0 ? serviceFilters : undefined },
    { enabled: !!user }
  );

  // Next Up consultant banner
  const { data: nextUpData } = trpc.quoteLeads.getSuggestedConsultant.useQuery(
    { serviceType: "install" },
    { enabled: !!user, refetchOnWindowFocus: false }
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

  // Unique service types for filter dropdown — normalize by stripping "> " prefix to deduplicate
  const markSpamMutation = trpc.submissions.markSpam.useMutation({
    onSuccess: (_, variables) => {
      toast.success(variables.isSpam ? 'Marked as spam' : 'Unmarked as spam');
      refetch();
    },
    onError: (err) => toast.error(`Failed: ${err.message}`),
  });
  const updateServiceTypeMutation = trpc.submissions.updateServiceType.useMutation({
    onSuccess: () => { toast.success("Service type updated."); refetch(); },
    onError: (err) => toast.error(`Failed: ${err.message}`),
  });

  const serviceTypes = useMemo(() => {
    if (!data?.rows) return [];
    const map = new Map<string, string>(); // normalized label -> first raw value
    for (const r of data.rows) {
      if (!r.serviceType) continue;
      const normalized = r.serviceType.replace(/^> /, "").replace(/^Maintenance: /, "").trim();
      if (!map.has(normalized)) map.set(normalized, r.serviceType);
    }
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [data]);

  // Filter + search + sort
  const filtered = useMemo(() => {
    if (!data?.rows) return [];
    let rows = [...data.rows] as Submission[];

    if (serviceFilters.length > 0) {
      // Match against normalized service type label to handle "> " prefix variants
      rows = rows.filter(r => {
        const normalized = (r.serviceType || "").replace(/^> /, "").replace(/^Maintenance: /, "").trim();
        return serviceFilters.some(f => f.replace(/^> /, "").replace(/^Maintenance: /, "").trim() === normalized);
      });
    }

    if (monthFilter !== undefined && yearFilter !== undefined) {
      rows = rows.filter(r => {
        const d = new Date(r.createdAt);
        return d.getMonth() + 1 === monthFilter;
      });
    } else if (monthFilter !== undefined) {
      rows = rows.filter(r => {
        const d = new Date(r.createdAt);
        return d.getMonth() + 1 === monthFilter;
      });
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
  }, [data, search, serviceFilters, monthFilter, yearFilter, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  }

  // ── Auth gate (PIN-based) ─────────────────────────────────────────────────
  if (!pinAuthed) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="max-w-sm w-full text-center px-6 py-10 bg-white rounded-2xl shadow-xl border border-stone-100">
          <ShieldAlert className="w-12 h-12 text-green-700 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-stone-900 mb-2">Admin Access</h1>
          <p className="text-stone-500 mb-6 text-sm">Enter your admin PIN to continue.</p>
          <form onSubmit={(e) => {
            e.preventDefault();
            const pin = (e.currentTarget.elements.namedItem("pin") as HTMLInputElement).value;
            if (adminLogin(pin)) {
              setPinAuthed(true);
            } else {
              alert("Incorrect PIN. Please try again.");
            }
          }} className="flex flex-col gap-3">
            <input
              name="pin"
              type="password"
              maxLength={6}
              placeholder="Enter PIN"
              autoFocus
              className="w-full border border-stone-300 rounded-lg px-4 py-3 text-center text-xl tracking-widest focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <Button type="submit" className="bg-green-700 hover:bg-green-800 text-white w-full">
              Unlock
            </Button>
          </form>
        </div>
      </div>
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
            <TabsTrigger value="deepdive">
              <MessageSquare className="w-3.5 h-3.5 mr-1.5" /> Deep Dive
            </TabsTrigger>
          </TabsList>

          {/* ── Submissions Tab ── */}
          <TabsContent value="submissions">
        {/* Next Up Consultant Banner */}
        {nextUpData && (
          <div
            style={{
              background: "oklch(0.97 0.04 240)",
              border: "1.5px solid oklch(0.80 0.10 240)",
              borderRadius: "0.75rem",
              padding: "0.75rem 1.25rem",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <span style={{ fontSize: "1.1rem" }}>★</span>
            <div>
              <span style={{ fontWeight: 700, color: "oklch(0.22 0.055 240)", fontSize: "0.875rem" }}>
                Next install lead: {nextUpData.consultant}
              </span>
              <span style={{ color: "oklch(0.5 0.03 240)", fontSize: "0.8rem", marginLeft: "0.5rem" }}>
                (based on rotation — Nathan Kooy &amp; William Miller alternate for installs/design)
              </span>
            </div>
          </div>
        )}
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
          {/* Month filter */}
          <Select
            value={monthFilter !== undefined ? String(monthFilter) : "all"}
            onValueChange={v => setMonthFilter(v === "all" ? undefined : Number(v))}
          >
            <SelectTrigger className="w-full sm:w-36 bg-white border-stone-300">
              <SelectValue placeholder="All months" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All months</SelectItem>
              {["January","February","March","April","May","June","July","August","September","October","November","December"].map((m, i) => (
                <SelectItem key={i+1} value={String(i+1)}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full sm:w-64 bg-white border-stone-300 justify-between font-normal"
              >
                <span className="truncate">
                  {serviceFilters.length === 0
                    ? "All service types"
                    : serviceFilters.length === 1
                    ? serviceLabel(serviceFilters[0])
                    : `${serviceFilters.length} types selected`}
                </span>
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-2" align="start">
              <div className="space-y-1">
                <button
                  className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-stone-100 cursor-pointer"
                  onClick={() => setServiceFilters([])}
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center ${serviceFilters.length === 0 ? "bg-green-700 border-green-700" : "border-stone-300"}`}>
                    {serviceFilters.length === 0 && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="font-medium">All service types</span>
                </button>
                <div className="border-t border-stone-100 my-1" />
                {serviceTypes.map(([label, rawValue]) => {
                  const checked = serviceFilters.includes(rawValue);
                  return (
                    <button
                      key={label}
                      className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-stone-100 cursor-pointer"
                      onClick={() => {
                        setServiceFilters(prev =>
                          prev.includes(rawValue) ? prev.filter(x => x !== rawValue) : [...prev, rawValue]
                        );
                      }}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${checked ? "bg-stone-800 border-stone-800" : "border-stone-300"}`}>
                        {checked && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span>{label}</span>
                    </button>
                  );
                })}
                {serviceFilters.length > 0 && (
                  <>
                    <div className="border-t border-stone-100 my-1" />
                    <button
                      className="flex w-full items-center justify-center gap-1 rounded px-2 py-1.5 text-xs text-stone-500 hover:bg-stone-100 cursor-pointer"
                      onClick={() => setServiceFilters([])}
                    >
                      Clear selection
                    </button>
                  </>
                )}
              </div>
            </PopoverContent>
          </Popover>
          <Select
            value={yearFilter ? String(yearFilter) : "all"}
            onValueChange={v => setYearFilter(v === "all" ? undefined : Number(v))}
          >
            <SelectTrigger className="w-full sm:w-36 bg-white border-stone-300">
              <SelectValue placeholder="All years" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All years</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* ── Year-over-Year Comparison Widget ── */}
        {yoyData && (
          <div className="mb-4 bg-white rounded-xl border border-stone-200 shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-green-700" />
              <span className="text-xs font-semibold text-stone-600 uppercase tracking-wide">
                {serviceFilters.length === 0 ? "All Services" : serviceFilters.length === 1 ? serviceLabel(serviceFilters[0]) : `${serviceFilters.length} Service Types`} — Year-over-Year
              </span>
              <span className="text-xs text-stone-400 ml-auto">as of {new Date(yoyData.asOfDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {/* This Year YTD */}
              <div className="rounded-lg bg-green-50 border border-green-100 p-3 text-center">
                <div className="text-2xl font-bold text-green-800">{yoyLoading ? "…" : yoyData.thisYtd}</div>
                <div className="text-xs font-medium text-green-700 mt-0.5">{yoyData.thisYear} YTD</div>
                <div className="text-xs text-green-600 mt-1">Jan 1 – today</div>
              </div>
              {/* Last Year Same Period */}
              <div className="rounded-lg bg-stone-50 border border-stone-200 p-3 text-center">
                <div className="text-2xl font-bold text-stone-700">{yoyLoading ? "…" : yoyData.lastYearSamePeriod}</div>
                <div className="text-xs font-medium text-stone-600 mt-0.5">{yoyData.lastYear} Same Period</div>
                <div className="text-xs text-stone-400 mt-1">
                  {yoyData.lastYearSamePeriod > 0
                    ? (() => {
                        const diff = yoyData.thisYtd - yoyData.lastYearSamePeriod;
                        const pct = Math.round((diff / yoyData.lastYearSamePeriod) * 100);
                        return (
                          <span className={diff >= 0 ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}>
                            {diff >= 0 ? "▲" : "▼"} {Math.abs(pct)}% vs last year
                          </span>
                        );
                      })()
                    : "No data"}
                </div>
              </div>
              {/* Last Year Full */}
              <div className="rounded-lg bg-blue-50 border border-blue-100 p-3 text-center">
                <div className="text-2xl font-bold text-blue-800">{yoyLoading ? "…" : yoyData.lastYearFull}</div>
                <div className="text-xs font-medium text-blue-700 mt-0.5">{yoyData.lastYear} Full Year</div>
                <div className="text-xs text-blue-500 mt-1">Jan 1 – Dec 31</div>
              </div>
            </div>
            {/* Monthly sparkline bars */}
            <div className="mt-4">
              <div className="text-xs text-stone-400 mb-1.5">Monthly submissions (Jan–Dec)</div>
              <div className="flex items-end gap-1 h-10">
                {["01","02","03","04","05","06","07","08","09","10","11","12"].map(mo => {
                  const thisVal = yoyData.monthlyThisYear[mo] ?? 0;
                  const lastVal = yoyData.monthlyLastYear[mo] ?? 0;
                  const maxVal = Math.max(...Object.values(yoyData.monthlyThisYear), ...Object.values(yoyData.monthlyLastYear), 1);
                  const monthName = new Date(2024, parseInt(mo) - 1, 1).toLocaleString("en-US", { month: "short" });
                  return (
                    <div key={mo} className="flex-1 flex flex-col items-center gap-0.5" title={`${monthName}: ${yoyData.thisYear}=${thisVal}, ${yoyData.lastYear}=${lastVal}`}>
                      <div className="w-full flex items-end gap-px justify-center">
                        <div
                          className="flex-1 rounded-t bg-stone-300 transition-all"
                          style={{ height: `${Math.round((lastVal / maxVal) * 32)}px`, minHeight: lastVal > 0 ? "2px" : "0" }}
                        />
                        <div
                          className="flex-1 rounded-t bg-green-500 transition-all"
                          style={{ height: `${Math.round((thisVal / maxVal) * 32)}px`, minHeight: thisVal > 0 ? "2px" : "0" }}
                        />
                      </div>
                      <span className="text-[9px] text-stone-400">{monthName.slice(0,1)}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-3 mt-1.5">
                <span className="flex items-center gap-1 text-[10px] text-stone-500"><span className="w-2 h-2 rounded-sm bg-green-500 inline-block" />{yoyData.thisYear}</span>
                <span className="flex items-center gap-1 text-[10px] text-stone-500"><span className="w-2 h-2 rounded-sm bg-stone-300 inline-block" />{yoyData.lastYear}</span>
              </div>
            </div>
          </div>
        )}

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
                    <th className="px-4 py-3 text-left text-xs font-semibold text-stone-600 uppercase tracking-wide whitespace-nowrap">Scheduled With</th>
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
                      <td className="px-4 py-3 max-w-[200px]">
                        <select
                          value={row.serviceType ?? ""}
                          onChange={(e) => updateServiceTypeMutation.mutate({ id: row.id, serviceType: e.target.value })}
                          className="w-full text-xs border border-stone-200 rounded px-1.5 py-1 text-green-800 bg-green-50 cursor-pointer hover:border-green-400 focus:outline-none focus:border-green-600"
                          title="Click to change service type"
                        >
                          {[
                            "Landscape Design & Installation",
                            "Landscape Enhancement",
                            "Lawn & Maintenance",
                            "Irrigation / Sprinklers",
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
                            "Concrete",
                            "Other / Not Sure",
                          ].map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                          {/* Keep raw value if not in list */}
                          {row.serviceType && ![
                            "Landscape Design & Installation","Landscape Enhancement","Lawn & Maintenance",
                            "Irrigation / Sprinklers","Paver Patios & Walkways","Water Features",
                            "Outdoor Kitchens & Living","Fire Pits & Fireplaces","Landscape Lighting",
                            "Xeriscaping / Water-Wise","Retaining Walls","Drainage Solutions",
                            "Snow Removal","Firewise Landscaping","Concrete","Other / Not Sure",
                          ].includes(row.serviceType) && (
                            <option value={row.serviceType}>{serviceLabel(row.serviceType)}</option>
                          )}
                        </select>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {row.salesConsultant ? (
                          <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                            {row.salesConsultant}
                          </span>
                        ) : (
                          <span className="text-stone-300 text-xs">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-stone-600 max-w-[200px] truncate">{row.siteAddress}</td>
                      <td className="px-4 py-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="focus:outline-none" aria-label="Change follow-up status">
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
                            onClick={() => markSpamMutation.mutate({ id: row.id, isSpam: !row.isSpam })}
                            className={`h-7 w-7 p-0 ${row.isSpam ? 'text-orange-500 hover:text-orange-700' : 'text-stone-400 hover:text-orange-500'}`}
                            title={row.isSpam ? 'Unmark spam' : 'Mark as spam'}
                          >
                            <Flag className="w-4 h-4" />
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

          {/* ── Deep Dive Tab ── */}
          <TabsContent value="deepdive">
            <DeepDiveTab />
          </TabsContent>
        </Tabs>
      </div>

      {/* Detail drawer */}
      <SubmissionDetail submission={selected} onClose={() => setSelected(null)} />

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
