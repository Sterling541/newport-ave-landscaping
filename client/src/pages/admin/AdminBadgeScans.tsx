// @ts-nocheck
import { toast } from "sonner";
/**
 * /admin/badge-scans — Badge scan leads management page
 * List all scans, filter by status/employee/service, view detail panel, update status/notes.
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { QrCode, Search, Phone, Mail, Calendar, User, ChevronRight, SlidersHorizontal } from "lucide-react";


const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "scheduled", label: "Scheduled" },
  { value: "converted", label: "Converted" },
  { value: "lost_price", label: "Lost — Price" },
  { value: "lost_other", label: "Lost — Other" },
  { value: "no_response", label: "No Response" },
];

const SERVICE_OPTIONS = [
  { value: "all", label: "All Services" },
  { value: "maintenance", label: "Maintenance" },
  { value: "landscape_construction", label: "Landscape Construction" },
  { value: "irrigation_sprinkler", label: "Irrigation / Sprinkler" },
  { value: "other", label: "Other" },
];

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  scheduled: "bg-purple-100 text-purple-800",
  converted: "bg-green-100 text-green-800",
  lost_price: "bg-red-100 text-red-800",
  lost_other: "bg-red-100 text-red-800",
  no_response: "bg-gray-100 text-gray-700",
};

const SERVICE_LABELS: Record<string, string> = {
  maintenance: "Maintenance",
  landscape_construction: "Landscape Const.",
  irrigation_sprinkler: "Irrigation",
  other: "Other",
};

type Scan = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceType: string;
  serviceTypeOther: string | null;
  message: string | null;
  status: string;
  notes: string | null;
  submittedAt: Date;
  employeeId: number | null;
  employeeCodeRaw: string | null;
  employeeName?: string;
};

export default function AdminBadgeScans() {
  
  const utils = trpc.useUtils();

  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedScan, setSelectedScan] = useState<Scan | null>(null);
  const [editNotes, setEditNotes] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading } = trpc.badgeScan.adminListScans.useQuery({
    status: statusFilter === "all" ? undefined : statusFilter,
    serviceType: serviceFilter === "all" ? undefined : serviceFilter,
    search: search || undefined,
    limit: 100,
    offset: 0,
  });

  const updateMutation = trpc.badgeScan.adminUpdateScan.useMutation({
    onSuccess: () => {
      utils.badgeScan.adminListScans.invalidate();
      if (selectedScan) {
        setSelectedScan(prev => prev ? { ...prev, status: editStatus, notes: editNotes } : null);
      }
      toast("Scan updated");
    },
    onError: (err) => toast.error("Error: " + String(err.message)),
  });

  function openDetail(scan: Scan) {
    setSelectedScan(scan);
    setEditStatus(scan.status);
    setEditNotes(scan.notes ?? "");
  }

  function saveDetail() {
    if (!selectedScan) return;
    updateMutation.mutate({
      id: selectedScan.id,
      status: editStatus as any,
      notes: editNotes || undefined,
    });
  }

  const scans: Scan[] = data?.scans ?? [];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Badge Scan Leads</h1>
          <p className="text-sm text-gray-500 mt-1">
            {data?.total ?? 0} total leads
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(f => !f)}
          className="gap-2"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </Button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search name, email, phone..."
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={serviceFilter} onValueChange={setServiceFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Service" />
            </SelectTrigger>
            <SelectContent>
              {SERVICE_OPTIONS.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Quick status pills */}
      <div className="flex gap-2 flex-wrap mb-4">
        {STATUS_OPTIONS.slice(1).map(s => {
          const count = (data?.scans ?? []).filter(sc => sc.status === s.value).length;
          return (
            <button
              key={s.value}
              onClick={() => setStatusFilter(statusFilter === s.value ? "all" : s.value)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                statusFilter === s.value
                  ? "bg-[#2d5a27] text-white border-[#2d5a27]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
              }`}
            >
              {s.label} {count > 0 && <span className="ml-1 opacity-70">({count})</span>}
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-400">Loading...</div>
        ) : scans.length === 0 ? (
          <div className="p-12 text-center">
            <QrCode className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No badge scan leads yet</p>
            <p className="text-sm text-gray-400 mt-1">Leads will appear here when customers scan employee badges</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Customer</TableHead>
                  <TableHead className="font-semibold">Service</TableHead>
                  <TableHead className="font-semibold">Employee</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Submitted</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {scans.map(scan => (
                  <TableRow
                    key={scan.id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => openDetail(scan)}
                  >
                    <TableCell>
                      <div className="font-medium text-gray-900">{scan.firstName} {scan.lastName}</div>
                      <div className="text-xs text-gray-500">{scan.email}</div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-700">
                        {SERVICE_LABELS[scan.serviceType] ?? scan.serviceType}
                        {scan.serviceType === "other" && scan.serviceTypeOther && (
                          <span className="text-gray-400"> — {scan.serviceTypeOther}</span>
                        )}
                      </span>
                    </TableCell>
                    <TableCell>
                      {scan.employeeName ? (
                        <span className="text-sm text-gray-700">{scan.employeeName}</span>
                      ) : scan.employeeCodeRaw ? (
                        <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{scan.employeeCodeRaw}</code>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[scan.status] ?? "bg-gray-100 text-gray-700"}`}>
                        {STATUS_OPTIONS.find(s => s.value === scan.status)?.label ?? scan.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500 whitespace-nowrap">
                      {new Date(scan.submittedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Detail Sheet */}
      <Sheet open={!!selectedScan} onOpenChange={open => { if (!open) setSelectedScan(null); }}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selectedScan && (
            <>
              <SheetHeader className="mb-6">
                <SheetTitle className="text-xl">
                  {selectedScan.firstName} {selectedScan.lastName}
                </SheetTitle>
                <span className={`inline-flex w-fit items-center px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[selectedScan.status] ?? "bg-gray-100 text-gray-700"}`}>
                  {STATUS_OPTIONS.find(s => s.value === selectedScan.status)?.label ?? selectedScan.status}
                </span>
              </SheetHeader>

              {/* Contact info */}
              <div className="space-y-3 mb-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Contact</h3>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <a href={`mailto:${selectedScan.email}`} className="text-[#2d5a27] hover:underline">{selectedScan.email}</a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <a href={`tel:${selectedScan.phone}`} className="text-[#2d5a27] hover:underline">{selectedScan.phone}</a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-700">Submitted {new Date(selectedScan.submittedAt).toLocaleString()}</span>
                </div>
                {selectedScan.employeeName && (
                  <div className="flex items-center gap-3 text-sm">
                    <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-700">Badge employee: <strong>{selectedScan.employeeName}</strong></span>
                  </div>
                )}
                {((selectedScan as any).employeeNameFirst || (selectedScan as any).employeeNameLast) && (
                  <div className="flex items-center gap-3 text-sm">
                    <User className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span className="text-gray-700">Customer said: <strong>{[(selectedScan as any).employeeNameFirst, (selectedScan as any).employeeNameLast].filter(Boolean).join(" ")}</strong></span>
                  </div>
                )}
              </div>

              {/* Service info */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Service Request</h3>
                <p className="text-sm font-medium text-gray-900">
                  {SERVICE_LABELS[selectedScan.serviceType] ?? selectedScan.serviceType}
                  {selectedScan.serviceType === "other" && selectedScan.serviceTypeOther && (
                    <span className="font-normal text-gray-600"> — {selectedScan.serviceTypeOther}</span>
                  )}
                </p>
                {selectedScan.message && (
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">{selectedScan.message}</p>
                )}
              </div>

              {/* Edit status */}
              <div className="space-y-4 mb-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Update Status</h3>
                <Select value={editStatus} onValueChange={setEditStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.slice(1).map(o => (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Notes */}
              <div className="space-y-2 mb-6">
                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Internal Notes</Label>
                <Textarea
                  value={editNotes}
                  onChange={e => setEditNotes(e.target.value)}
                  placeholder="Add notes about this lead..."
                  className="resize-none h-28"
                />
              </div>

              {/* Save */}
              <Button
                onClick={saveDetail}
                disabled={updateMutation.isPending}
                className="w-full bg-[#2d5a27] hover:bg-[#1a3a1a]"
              >
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
