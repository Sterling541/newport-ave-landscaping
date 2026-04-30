import { toast } from "sonner";
/**
 * /admin/employees — Employee management page
 * List employees, add/edit/deactivate, generate badge URLs, show QR codes.
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { QrCode, Plus, Pencil, UserX, UserCheck, ExternalLink, Copy, Check } from "lucide-react";
// QR code rendered via Google Charts API (no npm package needed)


const ROLES = ["Sales", "Designer", "Field Crew", "Office", "Other"];

type EmployeeForm = {
  firstName: string;
  lastName: string;
  employeeCode: string;
  role: string;
  email: string;
  phone: string;
};

const EMPTY_FORM: EmployeeForm = {
  firstName: "",
  lastName: "",
  employeeCode: "",
  role: "Field Crew",
  email: "",
  phone: "",
};

export default function AdminEmployees() {
  
  const utils = trpc.useUtils();

  const { data: employees, isLoading } = trpc.badgeScan.adminListEmployees.useQuery();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<EmployeeForm>(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [qrEmployee, setQrEmployee] = useState<{ name: string; code: string; role: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const createMutation = trpc.badgeScan.adminCreateEmployee.useMutation({
    onSuccess: () => {
      utils.badgeScan.adminListEmployees.invalidate();
      setShowForm(false);
      setForm(EMPTY_FORM);
      toast("Employee created");
    },
    onError: (err) => setFormErrors({ submit: err.message }),
  });

  const updateMutation = trpc.badgeScan.adminUpdateEmployee.useMutation({
    onSuccess: () => {
      utils.badgeScan.adminListEmployees.invalidate();
      setShowForm(false);
      setEditingId(null);
      setForm(EMPTY_FORM);
      toast("Employee updated");
    },
    onError: (err) => setFormErrors({ submit: err.message }),
  });

  function openCreate() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormErrors({});
    setShowForm(true);
  }

  function openEdit(emp: NonNullable<typeof employees>[0]) {
    setEditingId(emp.id);
    setForm({
      firstName: emp.firstName,
      lastName: emp.lastName,
      employeeCode: emp.employeeCode,
      role: emp.role,
      email: emp.email ?? "",
      phone: emp.phone ?? "",
    });
    setFormErrors({});
    setShowForm(true);
  }

  function validateForm() {
    const errs: Record<string, string> = {};
    if (!form.firstName.trim()) errs.firstName = "Required";
    if (!form.lastName.trim()) errs.lastName = "Required";
    if (!form.employeeCode.trim()) errs.employeeCode = "Required";
    if (!/^[A-Z0-9]{1,8}$/.test(form.employeeCode.toUpperCase())) errs.employeeCode = "1–8 uppercase letters/numbers";
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateForm();
    if (Object.keys(errs).length > 0) { setFormErrors(errs); return; }
    setFormErrors({});
    const payload = { ...form, employeeCode: form.employeeCode.toUpperCase() };
    if (editingId !== null) {
      updateMutation.mutate({ id: editingId, ...payload });
    } else {
      createMutation.mutate(payload);
    }
  }

  function toggleActive(emp: NonNullable<typeof employees>[0]) {
    updateMutation.mutate({
      id: emp.id,
      firstName: emp.firstName,
      lastName: emp.lastName,
      employeeCode: emp.employeeCode,
      role: emp.role,
      email: emp.email ?? "",
      phone: emp.phone ?? "",
      isActive: !emp.isActive,
    });
  }

  function getBadgeUrl(code: string) {
    return `https://www.newportavelandscaping.com/badge-scan?emp=${code}`;
  }

  function copyUrl(code: string) {
    navigator.clipboard.writeText(getBadgeUrl(code));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
          <p className="text-sm text-gray-500 mt-1">Manage badge QR codes and employee info</p>
        </div>
        <Button onClick={openCreate} className="bg-[#2d5a27] hover:bg-[#1a3a1a] gap-2">
          <Plus className="w-4 h-4" /> Add Employee
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-400">Loading...</div>
        ) : !employees?.length ? (
          <div className="p-12 text-center">
            <QrCode className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No employees yet</p>
            <p className="text-sm text-gray-400 mt-1">Add your first employee to generate badge QR codes</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Code</TableHead>
                <TableHead className="font-semibold">Role</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Contact</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map(emp => (
                <TableRow key={emp.id} className={!emp.isActive ? "opacity-50" : ""}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#2d5a27] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {emp.firstName[0]}{emp.lastName[0]}
                      </div>
                      {emp.firstName} {emp.lastName}
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono">{emp.employeeCode}</code>
                  </TableCell>
                  <TableCell className="text-gray-600">{emp.role}</TableCell>
                  <TableCell>
                    <Badge variant={emp.isActive ? "default" : "secondary"} className={emp.isActive ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}>
                      {emp.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {emp.email && <div>{emp.email}</div>}
                    {emp.phone && <div>{emp.phone}</div>}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setQrEmployee({ name: `${emp.firstName} ${emp.lastName}`, code: emp.employeeCode, role: emp.role })}
                        title="View QR Code"
                      >
                        <QrCode className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEdit(emp)}
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleActive(emp)}
                        title={emp.isActive ? "Deactivate" : "Reactivate"}
                      >
                        {emp.isActive ? <UserX className="w-4 h-4 text-red-500" /> : <UserCheck className="w-4 h-4 text-green-600" />}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={showForm} onOpenChange={open => { if (!open) { setShowForm(false); setEditingId(null); } }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Employee" : "Add Employee"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>First Name *</Label>
                <Input value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} />
                {formErrors.firstName && <p className="text-xs text-red-500">{formErrors.firstName}</p>}
              </div>
              <div className="space-y-1.5">
                <Label>Last Name *</Label>
                <Input value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} />
                {formErrors.lastName && <p className="text-xs text-red-500">{formErrors.lastName}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Badge Code *</Label>
                <Input
                  value={form.employeeCode}
                  onChange={e => setForm(f => ({ ...f, employeeCode: e.target.value.toUpperCase() }))}
                  placeholder="e.g. NK"
                  maxLength={8}
                  className="font-mono"
                />
                {formErrors.employeeCode && <p className="text-xs text-red-500">{formErrors.employeeCode}</p>}
              </div>
              <div className="space-y-1.5">
                <Label>Role</Label>
                <Select value={form.role} onValueChange={v => setForm(f => ({ ...f, role: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {ROLES.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label>Phone</Label>
              <Input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
            </div>
            {formErrors.submit && <p className="text-sm text-red-500 bg-red-50 p-2 rounded">{formErrors.submit}</p>}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="bg-[#2d5a27] hover:bg-[#1a3a1a]">
                {editingId ? "Save Changes" : "Create Employee"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* QR Code Dialog */}
      <Dialog open={!!qrEmployee} onOpenChange={open => { if (!open) setQrEmployee(null); }}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Badge QR Code</DialogTitle>
          </DialogHeader>
          {qrEmployee && (
            <div className="flex flex-col items-center gap-4 py-2">
              <div className="text-center mb-2">
                <p className="font-semibold text-gray-900">{qrEmployee.name}</p>
                <p className="text-sm text-gray-500">{qrEmployee.role} · Code: <code className="font-mono bg-gray-100 px-1 rounded">{qrEmployee.code}</code></p>
              </div>
              {/* QR Code */}
              <div className="bg-white p-4 rounded-xl border-2 border-gray-200 shadow-sm">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(getBadgeUrl(qrEmployee.code))}&color=1a3a1a&bgcolor=ffffff&margin=2`}
                  alt={`QR code for ${qrEmployee.name}`}
                  width={200}
                  height={200}
                  loading="lazy"
                />
              </div>
              {/* Badge URL */}
              <div className="w-full">
                <p className="text-xs text-gray-500 mb-1.5 font-medium">Badge URL</p>
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg border px-3 py-2">
                  <p className="text-xs text-gray-700 flex-1 truncate font-mono">{getBadgeUrl(qrEmployee.code)}</p>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0 flex-shrink-0" onClick={() => copyUrl(qrEmployee.code)}>
                    {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </Button>
                  <a href={getBadgeUrl(qrEmployee.code)} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0 flex-shrink-0">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Button>
                  </a>
                </div>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Print this QR code on the employee's badge. Customers scan it to request a free estimate.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
