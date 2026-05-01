import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  UserPlus, Search, User, Building2, Phone, Mail, ChevronRight,
  Users, Filter
} from "lucide-react";

const CONTACT_TYPE_LABELS: Record<string, string> = {
  prospect: "Prospect",
  customer: "Customer",
  employee: "Employee",
  vendor: "Vendor",
  other: "Other",
};

const CONTACT_TYPE_COLORS: Record<string, string> = {
  prospect: "bg-blue-100 text-blue-800",
  customer: "bg-green-100 text-green-800",
  employee: "bg-purple-100 text-purple-800",
  vendor: "bg-orange-100 text-orange-800",
  other: "bg-gray-100 text-gray-700",
};

const NAME_PREFIXES = ["mr", "mrs", "ms", "dr", "company", "other"];
const PREFIX_LABELS: Record<string, string> = {
  mr: "Mr.", mrs: "Mrs.", ms: "Ms.", dr: "Dr.", company: "Company", other: "Other"
};

function getDisplayName(c: any) {
  if (c.companyName && c.contactType === "vendor") return c.companyName;
  const prefix = c.namePrefix ? PREFIX_LABELS[c.namePrefix] + " " : "";
  const name = [c.firstName, c.lastName].filter(Boolean).join(" ");
  return (prefix + name).trim() || c.companyName || "—";
}

export default function Contacts() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [page, setPage] = useState(0);
  const [showCreate, setShowCreate] = useState(false);
  const limit = 50;

  const { data, isLoading, refetch } = trpc.contacts.listContacts.useQuery({
    search: search || undefined,
    contactType: typeFilter !== "all" ? (typeFilter as any) : undefined,
    limit,
    offset: page * limit,
  });

  const createMutation = trpc.contacts.createContact.useMutation({
    onSuccess: () => {
      toast.success("Contact created");
      setShowCreate(false);
      refetch();
    },
    onError: (e) => toast.error("Error: " + e.message),
  });

  const [form, setForm] = useState({
    contactType: "prospect" as any,
    namePrefix: "" as any,
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    phone: "",
    secondaryPhone: "",
    mailingAddress: "",
    mailingCity: "",
    mailingState: "OR",
    mailingZip: "",
    notes: "",
  });

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    createMutation.mutate({
      ...form,
      namePrefix: form.namePrefix || undefined,
      email: form.email || undefined,
    });
  }

  const contacts = data?.rows ?? [];
  const total = data?.total ?? 0;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-green-700" />
            Contacts
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {total > 0 ? `${total} contact${total !== 1 ? "s" : ""}` : "No contacts yet"}
          </p>
        </div>
        <Button onClick={() => setShowCreate(true)} className="bg-green-700 hover:bg-green-800 text-white gap-2">
          <UserPlus className="w-4 h-4" />
          New Contact
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search name, email, phone..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            className="pl-9"
          />
        </div>
        <Select value={typeFilter} onValueChange={(v) => { setTypeFilter(v); setPage(0); }}>
          <SelectTrigger className="w-44">
            <Filter className="w-4 h-4 mr-2 text-gray-400" />
            <SelectValue placeholder="All types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            {Object.entries(CONTACT_TYPE_LABELS).map(([k, v]) => (
              <SelectItem key={k} value={k}>{v}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-3">
            {[...Array(8)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
          </div>
        ) : contacts.length === 0 ? (
          <div className="py-20 text-center">
            <User className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No contacts found</p>
            <p className="text-sm text-gray-400 mt-1">
              {search ? "Try a different search" : "Create your first contact to get started"}
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Name</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Type</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Phone</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Email</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">City</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {contacts.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/admin/contacts/${c.id}`}>
                      <span className="font-medium text-gray-900 hover:text-green-700 cursor-pointer flex items-center gap-2">
                        {c.contactType === "vendor" || c.contactType === "other"
                          ? <Building2 className="w-4 h-4 text-gray-400 shrink-0" />
                          : <User className="w-4 h-4 text-gray-400 shrink-0" />
                        }
                        {getDisplayName(c)}
                      </span>
                      {c.companyName && c.contactType !== "vendor" && (
                        <span className="text-xs text-gray-400 ml-6">{c.companyName}</span>
                      )}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${CONTACT_TYPE_COLORS[c.contactType] ?? "bg-gray-100 text-gray-700"}`}>
                      {CONTACT_TYPE_LABELS[c.contactType] ?? c.contactType}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {c.phone ? (
                      <a href={`tel:${c.phone}`} className="hover:text-green-700 flex items-center gap-1">
                        <Phone className="w-3 h-3" />{c.phone}
                      </a>
                    ) : "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {c.email ? (
                      <a href={`mailto:${c.email}`} className="hover:text-green-700 flex items-center gap-1 truncate max-w-[200px]">
                        <Mail className="w-3 h-3 shrink-0" />{c.email}
                      </a>
                    ) : "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{c.mailingCity || "—"}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/contacts/${c.id}`}>
                      <ChevronRight className="w-4 h-4 text-gray-400 hover:text-gray-700 cursor-pointer" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {total > limit && (
        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
          <span>Showing {page * limit + 1}–{Math.min((page + 1) * limit, total)} of {total}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage(p => p - 1)}>Previous</Button>
            <Button variant="outline" size="sm" disabled={(page + 1) * limit >= total} onClick={() => setPage(p => p + 1)}>Next</Button>
          </div>
        </div>
      )}

      {/* Create Contact Dialog */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>New Contact</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Contact Type *</Label>
                <Select value={form.contactType} onValueChange={(v) => setForm(f => ({ ...f, contactType: v as any }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(CONTACT_TYPE_LABELS).map(([k, v]) => (
                      <SelectItem key={k} value={k}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Prefix</Label>
                <Select value={form.namePrefix || "none"} onValueChange={(v) => setForm(f => ({ ...f, namePrefix: v === "none" ? "" : v as any }))}>
                  <SelectTrigger><SelectValue placeholder="Select prefix" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">— None —</SelectItem>
                    {NAME_PREFIXES.map(p => <SelectItem key={p} value={p}>{PREFIX_LABELS[p]}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>First Name</Label>
                <Input value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} />
              </div>
            </div>

            <div>
              <Label>Company Name</Label>
              <Input value={form.companyName} onChange={e => setForm(f => ({ ...f, companyName: e.target.value }))} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Email</Label>
                <Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
              <div>
                <Label>Phone</Label>
                <Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
              </div>
            </div>

            <div>
              <Label>Mailing Address</Label>
              <Input value={form.mailingAddress} onChange={e => setForm(f => ({ ...f, mailingAddress: e.target.value }))} placeholder="Street address" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label>City</Label>
                <Input value={form.mailingCity} onChange={e => setForm(f => ({ ...f, mailingCity: e.target.value }))} />
              </div>
              <div>
                <Label>State</Label>
                <Input value={form.mailingState} onChange={e => setForm(f => ({ ...f, mailingState: e.target.value }))} />
              </div>
              <div>
                <Label>Zip</Label>
                <Input value={form.mailingZip} onChange={e => setForm(f => ({ ...f, mailingZip: e.target.value }))} />
              </div>
            </div>

            <div>
              <Label>Notes</Label>
              <Textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={3} />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
              <Button type="submit" disabled={createMutation.isPending} className="bg-green-700 hover:bg-green-800 text-white">
                {createMutation.isPending ? "Creating..." : "Create Contact"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
