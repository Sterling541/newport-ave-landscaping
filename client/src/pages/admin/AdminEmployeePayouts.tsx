import { toast } from "sonner";
/**
 * /admin/employee-payouts — Monthly payout report for badge scan leads
 * Shows each employee's converted leads per month, payout amount, and mark-paid status.
 */
import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DollarSign, Download, CheckCircle, Clock, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";

const PAYOUT_PER_CONVERSION = 75; // $75 per converted lead (matches router)

function getMonthOptions() {
  const options = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    options.push({ value, label });
  }
  return options;
}

export default function AdminEmployeePayouts() {
  const utils = trpc.useUtils();
  const monthOptions = useMemo(() => getMonthOptions(), []);
  const [selectedMonth, setSelectedMonth] = useState(monthOptions[0].value);
  const [expandedEmployee, setExpandedEmployee] = useState<number | null>(null);

  const [year, month] = selectedMonth.split("-").map(Number);

  const { data, isLoading } = trpc.badgeScan.adminPayoutReport.useQuery({ year, month });

  const markPaidMutation = trpc.badgeScan.adminMarkPayoutPaid.useMutation({
    onSuccess: () => {
      utils.badgeScan.adminPayoutReport.invalidate();
      toast("Payout marked as paid");
    },
    onError: (err) => toast.error("Error: " + String(err.message)),
  });

  function downloadCSV() {
    if (!data?.summary) return;
    const rows = data.summary;
    const header = ["Employee", "Code", "Role", "Converted Leads", "Payout Amount", "Status", "Paid At"];
    const csvRows = rows.map(r => [
      `${r.employee.firstName} ${r.employee.lastName}`,
      r.employee.employeeCode,
      r.employee.role,
      r.conversionCount,
      `$${r.amountOwed.toFixed(2)}`,
      r.paidAt ? "Paid" : "Unpaid",
      r.paidAt ? new Date(r.paidAt).toLocaleDateString() : "",
    ]);
    const csv = [header, ...csvRows].map(r => r.map(v => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `badge-scan-payouts-${selectedMonth}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const totalUnpaid = (data?.summary ?? [])
    .filter(r => !r.paidAt && r.conversionCount > 0)
    .reduce((sum, r) => sum + r.amountOwed, 0);

  const totalPaid = (data?.summary ?? [])
    .filter(r => r.paidAt)
    .reduce((sum, r) => sum + r.amountOwed, 0);

  return (
    <AdminLayout>
    <div className="p-6 max-w-5xl mx-auto">
      {/* Back button */}
      <a href="/admin/submissions" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-4 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Admin
      </a>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employee Payouts</h1>
          <p className="text-sm text-gray-500 mt-1">${PAYOUT_PER_CONVERSION} per converted badge scan lead</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {monthOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={downloadCSV} className="gap-2">
            <Download className="w-4 h-4" /> CSV
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Total Conversions</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{data?.totals?.totalConversions ?? 0}</p>
          <p className="text-xs text-gray-400 mt-0.5">converted this month</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Unpaid</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">${totalUnpaid.toFixed(2)}</p>
          <p className="text-xs text-gray-400 mt-0.5">pending payout</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Paid Out</p>
          <p className="text-2xl font-bold text-green-700 mt-1">${totalPaid.toFixed(2)}</p>
          <p className="text-xs text-gray-400 mt-0.5">this month</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-400">Loading...</div>
        ) : !data?.summary?.length ? (
          <div className="p-12 text-center">
            <DollarSign className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No payout data for this month</p>
            <p className="text-sm text-gray-400 mt-1">Payouts are generated from converted badge scan leads</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Employee</TableHead>
                <TableHead className="font-semibold text-center">Conversions</TableHead>
                <TableHead className="font-semibold text-right">Payout</TableHead>
                <TableHead className="font-semibold text-center">Status</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.summary.map(row => {
                const isExpanded = expandedEmployee === row.employee.id;
                return (
                  <>
                    <TableRow
                      key={row.employee.id}
                      className={row.conversionCount === 0 ? "opacity-50" : ""}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#2d5a27] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {row.employee.firstName[0]}{row.employee.lastName[0]}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{row.employee.firstName} {row.employee.lastName}</div>
                            <div className="text-xs text-gray-500">{row.employee.role} · <code className="font-mono bg-gray-100 px-1 rounded">{row.employee.employeeCode}</code></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <span className="font-semibold text-gray-900">{row.conversionCount}</span>
                          {row.conversionCount > 0 && (
                            <button
                              onClick={() => setExpandedEmployee(isExpanded ? null : row.employee.id)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                            </button>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-semibold text-gray-900">
                        {row.amountOwed > 0 ? `$${row.amountOwed.toFixed(2)}` : "—"}
                      </TableCell>
                      <TableCell className="text-center">
                        {row.conversionCount === 0 ? (
                          <span className="text-xs text-gray-400">No conversions</span>
                        ) : row.paidAt ? (
                          <div className="flex items-center justify-center gap-1.5">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-xs text-green-700 font-medium">
                              Paid {new Date(row.paidAt).toLocaleDateString()}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-1.5">
                            <Clock className="w-4 h-4 text-orange-500" />
                            <span className="text-xs text-orange-600 font-medium">Unpaid</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {row.conversionCount > 0 && !row.paidAt && (
                          <Button
                            size="sm"
                            onClick={() => markPaidMutation.mutate({ employeeId: row.employee.id, year, month })}
                            disabled={markPaidMutation.isPending}
                            className="bg-[#2d5a27] hover:bg-[#1a3a1a] text-xs h-7"
                          >
                            Mark Paid
                          </Button>
                        )}
                        {row.paidAt && (
                          <span className="text-xs text-gray-400">Paid</span>
                        )}
                      </TableCell>
                    </TableRow>
                    {/* Expanded scans list */}
                    {isExpanded && row.scans && row.scans.length > 0 && (
                      <TableRow key={`${row.employee.id}-expanded`} className="bg-gray-50">
                        <TableCell colSpan={5} className="py-3 px-6">
                          <div className="space-y-1.5">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Converted Leads</p>
                            {row.scans.map((scan) => (
                              <div key={scan.id} className="flex items-center justify-between text-sm bg-white rounded-lg border border-gray-100 px-3 py-2">
                                <div>
                                  <span className="font-medium text-gray-900">{scan.customerName}</span>
                                  <span className="text-gray-400 mx-2">·</span>
                                  <span className="text-gray-600">{scan.serviceType}</span>
                                </div>
                                <span className="text-xs text-gray-400">
                                  {scan.convertedAt ? new Date(scan.convertedAt).toLocaleDateString() : ""}
                                </span>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
    </AdminLayout>
  );
}
