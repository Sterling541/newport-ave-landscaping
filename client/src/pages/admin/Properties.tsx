import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Home, Plus, Search, MapPin, ChevronRight, Filter, Building2 } from "lucide-react";

const PROPERTY_TYPES = ["residential", "commercial", "hoa", "multi_family", "builder", "other"];
const PROPERTY_TYPE_LABELS: Record<string, string> = {
  residential: "Residential", commercial: "Commercial", hoa: "HOA",
  multi_family: "Multi-Family", builder: "Builder", other: "Other"
};
const PROPERTY_TYPE_COLORS: Record<string, string> = {
  residential: "bg-green-100 text-green-800",
  commercial: "bg-blue-100 text-blue-800",
  hoa: "bg-purple-100 text-purple-800",
  multi_family: "bg-orange-100 text-orange-800",
  builder: "bg-yellow-100 text-yellow-800",
  other: "bg-gray-100 text-gray-700",
};

export default function Properties() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [showCreate, setShowCreate] = useState(false);
  const limit = 50;

  const { data, isLoading, refetch } = trpc.contacts.listProperties.useQuery({
    search: search || undefined,
    propertyType: typeFilter !== "all" ? (typeFilter as any) : undefined,
    limit,
    offset: page * limit,
  });

  const createMutation = trpc.contacts.createProperty.useMutation({
    onSuccess: () => { toast({ title: "Property created" }); setShowCreate(false); refetch(); },
    onError: (e) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const [form, setForm] = useState({
    propertyName: "", address: "", city: "", state: "OR", zip: "",
    propertyType: "residential" as any, notes: ""
  });

  const properties = data?.rows ?? [];
  const total = data?.total ?? 0;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Home className="w-6 h-6 text-green-700" />
            Properties
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {total > 0 ? `${total} propert${total !== 1 ? "ies" : "y"}` : "No properties yet"}
          </p>
        </div>
        <Button onClick={() => setShowCreate(true)} className="bg-green-700 hover:bg-green-800 text-white gap-2">
          <Plus className="w-4 h-4" />
          New Property
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search address, name, zip..."
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
            {PROPERTY_TYPES.map(t => <SelectItem key={t} value={t}>{PROPERTY_TYPE_LABELS[t]}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-3">
            {[...Array(8)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
          </div>
        ) : properties.length === 0 ? (
          <div className="py-20 text-center">
            <Home className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No properties found</p>
            <p className="text-sm text-gray-400 mt-1">
              {search ? "Try a different search" : "Create your first property to get started"}
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Property</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Type</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">City</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Zip</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {properties.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/admin/properties/${p.id}`}>
                      <span className="font-medium text-gray-900 hover:text-green-700 cursor-pointer flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gray-400 shrink-0" />
                        {p.propertyName || p.address}
                      </span>
                      {p.propertyName && (
                        <span className="text-xs text-gray-400 ml-6">{p.address}</span>
                      )}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${PROPERTY_TYPE_COLORS[p.propertyType] ?? "bg-gray-100 text-gray-700"}`}>
                      {PROPERTY_TYPE_LABELS[p.propertyType] ?? p.propertyType}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{p.city || "—"}</td>
                  <td className="px-4 py-3 text-gray-600">{p.zip || "—"}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/properties/${p.id}`}>
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

      {/* Create Property Dialog */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>New Property</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); createMutation.mutate(form); }} className="space-y-4">
            <div>
              <Label>Property Name (optional)</Label>
              <Input value={form.propertyName} onChange={e => setForm(f => ({ ...f, propertyName: e.target.value }))} placeholder="e.g. Smith Residence" />
            </div>
            <div>
              <Label>Address *</Label>
              <Input required value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="Street address" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label>City</Label>
                <Input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} />
              </div>
              <div>
                <Label>State</Label>
                <Input value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))} />
              </div>
              <div>
                <Label>Zip</Label>
                <Input value={form.zip} onChange={e => setForm(f => ({ ...f, zip: e.target.value }))} />
              </div>
            </div>
            <div>
              <Label>Property Type</Label>
              <Select value={form.propertyType} onValueChange={v => setForm(f => ({ ...f, propertyType: v as any }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PROPERTY_TYPES.map(t => <SelectItem key={t} value={t}>{PROPERTY_TYPE_LABELS[t]}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Notes</Label>
              <Textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={3} />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
              <Button type="submit" disabled={createMutation.isPending} className="bg-green-700 hover:bg-green-800 text-white">
                {createMutation.isPending ? "Creating..." : "Create Property"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
