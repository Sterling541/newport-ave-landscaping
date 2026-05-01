import { useState } from "react";
import { useParams, Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  ArrowLeft, Edit2, Save, X, Trash2, Building2, User, Phone, Mail,
  MapPin, Plus, Link2, Home, ChevronRight, Calendar, Clock
} from "lucide-react";

const CONTACT_TYPE_LABELS: Record<string, string> = {
  prospect: "Prospect", customer: "Customer", employee: "Employee", vendor: "Vendor", other: "Other",
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
const PROPERTY_TYPES = ["residential", "commercial", "hoa", "multi_family", "builder", "other"];
const PROPERTY_TYPE_LABELS: Record<string, string> = {
  residential: "Residential", commercial: "Commercial", hoa: "HOA",
  multi_family: "Multi-Family", builder: "Builder", other: "Other"
};
const RELATIONSHIP_TYPES = [
  "owner", "tenant", "primary_contact", "billing_contact", "property_manager", "employee", "other"
];
const RELATIONSHIP_LABELS: Record<string, string> = {
  owner: "Owner", tenant: "Tenant", primary_contact: "Primary Contact",
  billing_contact: "Billing Contact", property_manager: "Property Manager",
  employee: "Employee", other: "Other"
};

function getDisplayName(c: any) {
  const prefix = c.namePrefix ? PREFIX_LABELS[c.namePrefix] + " " : "";
  const name = [c.firstName, c.lastName].filter(Boolean).join(" ");
  return (prefix + name).trim() || c.companyName || "Unnamed Contact";
}

export default function ContactDetail() {
  const { id } = useParams<{ id: string }>();
  const contactId = parseInt(id ?? "0");
  const [, navigate] = useLocation();
  const [editing, setEditing] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showLinkProperty, setShowLinkProperty] = useState(false);
  const [showCreateProperty, setShowCreateProperty] = useState(false);
  const [propertySearch, setPropertySearch] = useState("");
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  const [linkRelType, setLinkRelType] = useState("primary_contact");
  const [linkIsPrimary, setLinkIsPrimary] = useState(false);
  const [linkIsBilling, setLinkIsBilling] = useState(false);

  const { data: contact, isLoading, refetch } = trpc.contacts.getContact.useQuery({ id: contactId });
  const { data: links, refetch: refetchLinks } = trpc.contacts.getLinksForContact.useQuery({ contactId });
  const { data: appointmentsData } = trpc.contacts.appointmentsByContact.useQuery({ contactId });
  const { data: propertiesData } = trpc.contacts.listProperties.useQuery({
    search: propertySearch || undefined,
    limit: 20,
  });

  const [editForm, setEditForm] = useState<any>(null);

  function startEdit() {
    if (!contact) return;
    setEditForm({ ...contact });
    setEditing(true);
  }

  const updateMutation = trpc.contacts.updateContact.useMutation({
    onSuccess: () => { toast.success("Contact updated"); setEditing(false); refetch(); },
    onError: (e) => toast.error("Error: " + e.message),
  });

  const deleteMutation = trpc.contacts.deleteContact.useMutation({
    onSuccess: () => { toast.success("Contact deleted"); navigate("/admin/contacts"); },
    onError: (e) => toast.error("Error: " + e.message),
  });

  const linkMutation = trpc.contacts.createLink.useMutation({
    onSuccess: () => {
      toast.success("Property linked");
      setShowLinkProperty(false);
      setSelectedPropertyId(null);
      setPropertySearch("");
      refetchLinks();
    },
    onError: (e) => toast.error("Error: " + e.message),
  });

  const unlinkMutation = trpc.contacts.deleteLink.useMutation({
    onSuccess: () => { toast.success("Property unlinked"); refetchLinks(); },
    onError: (e) => toast.error("Error: " + e.message),
  });

  // New property form state
  const [newPropForm, setNewPropForm] = useState({
    address: "", city: "", state: "OR", zip: "", propertyType: "residential" as any, propertyName: "", notes: ""
  });

  const createPropertyAndLinkMutation = trpc.contacts.createProperty.useMutation({
    onSuccess: async (data) => {
      await linkMutation.mutateAsync({
        contactId,
        propertyId: data.id,
        relationshipType: linkRelType as any,
        isPrimary: linkIsPrimary,
        isBillingContact: linkIsBilling,
      });
      setShowCreateProperty(false);
      setNewPropForm({ address: "", city: "", state: "OR", zip: "", propertyType: "residential", propertyName: "", notes: "" });
    },
    onError: (e) => toast.error("Error: " + e.message),
  });

  if (isLoading) {
    return (
      <div className="p-6 max-w-5xl mx-auto space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Contact not found.</p>
        <Link href="/admin/contacts"><Button variant="outline" className="mt-4">Back to Contacts</Button></Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link href="/admin/contacts">
          <span className="hover:text-green-700 cursor-pointer flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Contacts
          </span>
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-800 font-medium">{getDisplayName(contact)}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            {contact.contactType === "vendor" ? <Building2 className="w-6 h-6 text-green-700" /> : <User className="w-6 h-6 text-green-700" />}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{getDisplayName(contact)}</h1>
            {contact.companyName && contact.contactType !== "vendor" && (
              <p className="text-sm text-gray-500">{contact.companyName}</p>
            )}
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${CONTACT_TYPE_COLORS[contact.contactType] ?? "bg-gray-100 text-gray-700"}`}>
              {CONTACT_TYPE_LABELS[contact.contactType] ?? contact.contactType}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          {!editing && (
            <>
              <Button variant="outline" size="sm" onClick={startEdit} className="gap-1">
                <Edit2 className="w-4 h-4" /> Edit
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowDelete(true)} className="gap-1 text-red-600 border-red-200 hover:bg-red-50">
                <Trash2 className="w-4 h-4" /> Delete
              </Button>
            </>
          )}
          {editing && (
            <>
              <Button size="sm" onClick={() => updateMutation.mutate({ id: contactId, ...editForm })} disabled={updateMutation.isPending} className="bg-green-700 hover:bg-green-800 text-white gap-1">
                <Save className="w-4 h-4" /> {updateMutation.isPending ? "Saving..." : "Save"}
              </Button>
              <Button variant="outline" size="sm" onClick={() => setEditing(false)} className="gap-1">
                <X className="w-4 h-4" /> Cancel
              </Button>
            </>
          )}
        </div>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="mb-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="properties">Properties ({links?.length ?? 0})</TabsTrigger>
          <TabsTrigger value="appointments">Appointments ({appointmentsData?.length ?? 0})</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <User className="w-4 h-4 text-green-700" /> Contact Information
              </h3>
              {editing ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">Type</Label>
                      <Select value={editForm.contactType} onValueChange={v => setEditForm((f: any) => ({ ...f, contactType: v }))}>
                        <SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {Object.entries(CONTACT_TYPE_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs">Prefix</Label>
                      <Select value={editForm.namePrefix || "none"} onValueChange={v => setEditForm((f: any) => ({ ...f, namePrefix: v === "none" ? null : v }))}>
                        <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="None" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">— None —</SelectItem>
                          {NAME_PREFIXES.map(p => <SelectItem key={p} value={p}>{PREFIX_LABELS[p]}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">First Name</Label>
                      <Input className="h-8 text-sm" value={editForm.firstName ?? ""} onChange={e => setEditForm((f: any) => ({ ...f, firstName: e.target.value }))} />
                    </div>
                    <div>
                      <Label className="text-xs">Last Name</Label>
                      <Input className="h-8 text-sm" value={editForm.lastName ?? ""} onChange={e => setEditForm((f: any) => ({ ...f, lastName: e.target.value }))} />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs">Company</Label>
                    <Input className="h-8 text-sm" value={editForm.companyName ?? ""} onChange={e => setEditForm((f: any) => ({ ...f, companyName: e.target.value }))} />
                  </div>
                  <div>
                    <Label className="text-xs">Email</Label>
                    <Input className="h-8 text-sm" type="email" value={editForm.email ?? ""} onChange={e => setEditForm((f: any) => ({ ...f, email: e.target.value }))} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">Phone</Label>
                      <Input className="h-8 text-sm" value={editForm.phone ?? ""} onChange={e => setEditForm((f: any) => ({ ...f, phone: e.target.value }))} />
                    </div>
                    <div>
                      <Label className="text-xs">Secondary Phone</Label>
                      <Input className="h-8 text-sm" value={editForm.secondaryPhone ?? ""} onChange={e => setEditForm((f: any) => ({ ...f, secondaryPhone: e.target.value }))} />
                    </div>
                  </div>
                </div>
              ) : (
                <dl className="space-y-2 text-sm">
                  {contact.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                      <a href={`mailto:${contact.email}`} className="text-green-700 hover:underline">{contact.email}</a>
                    </div>
                  )}
                  {contact.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                      <a href={`tel:${contact.phone}`} className="text-gray-700 hover:text-green-700">{contact.phone}</a>
                    </div>
                  )}
                  {contact.secondaryPhone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                      <span className="text-gray-600">{contact.secondaryPhone} <span className="text-gray-400">(secondary)</span></span>
                    </div>
                  )}
                  {!contact.email && !contact.phone && (
                    <p className="text-gray-400 italic">No contact info on file</p>
                  )}
                </dl>
              )}
            </div>

            {/* Mailing Address */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-700" /> Mailing Address
              </h3>
              {editing ? (
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs">Street</Label>
                    <Input className="h-8 text-sm" value={editForm.mailingAddress ?? ""} onChange={e => setEditForm((f: any) => ({ ...f, mailingAddress: e.target.value }))} />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-1">
                      <Label className="text-xs">City</Label>
                      <Input className="h-8 text-sm" value={editForm.mailingCity ?? ""} onChange={e => setEditForm((f: any) => ({ ...f, mailingCity: e.target.value }))} />
                    </div>
                    <div>
                      <Label className="text-xs">State</Label>
                      <Input className="h-8 text-sm" value={editForm.mailingState ?? ""} onChange={e => setEditForm((f: any) => ({ ...f, mailingState: e.target.value }))} />
                    </div>
                    <div>
                      <Label className="text-xs">Zip</Label>
                      <Input className="h-8 text-sm" value={editForm.mailingZip ?? ""} onChange={e => setEditForm((f: any) => ({ ...f, mailingZip: e.target.value }))} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-700">
                  {contact.mailingAddress || contact.mailingCity ? (
                    <>
                      {contact.mailingAddress && <p>{contact.mailingAddress}</p>}
                      <p>{[contact.mailingCity, contact.mailingState, contact.mailingZip].filter(Boolean).join(", ")}</p>
                    </>
                  ) : (
                    <p className="text-gray-400 italic">No mailing address on file</p>
                  )}
                </div>
              )}
            </div>

            {/* Notes */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 md:col-span-2">
              <h3 className="font-semibold text-gray-800 mb-3">Notes</h3>
              {editing ? (
                <Textarea
                  value={editForm.notes ?? ""}
                  onChange={e => setEditForm((f: any) => ({ ...f, notes: e.target.value }))}
                  rows={4}
                  className="text-sm"
                />
              ) : (
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {contact.notes || <span className="text-gray-400 italic">No notes</span>}
                </p>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Properties Tab */}
        <TabsContent value="properties">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Linked Properties</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowLinkProperty(true)} className="gap-1">
                <Link2 className="w-4 h-4" /> Link Existing
              </Button>
              <Button size="sm" onClick={() => setShowCreateProperty(true)} className="bg-green-700 hover:bg-green-800 text-white gap-1">
                <Plus className="w-4 h-4" /> New Property
              </Button>
            </div>
          </div>

          {!links || links.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 py-16 text-center">
              <Home className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No properties linked</p>
              <p className="text-sm text-gray-400 mt-1">Link an existing property or create a new one</p>
            </div>
          ) : (
            <div className="space-y-3">
              {links.map((link) => (
                <LinkedPropertyCard key={link.id} link={link} onUnlink={() => unlinkMutation.mutate({ id: link.id })} />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Appointments Tab */}
        <TabsContent value="appointments">
          <h3 className="font-semibold text-gray-800 mb-4">Appointment History</h3>
          {!appointmentsData || appointmentsData.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 py-16 text-center">
              <Calendar className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No appointments linked</p>
              <p className="text-sm text-gray-400 mt-1">Appointments will appear here once linked to this contact in the Smart Scheduler</p>
            </div>
          ) : (
            <div className="space-y-3">
              {appointmentsData.map((appt) => {
                const isPast = appt.appointmentDate < new Date().toISOString().slice(0, 10);
                const statusColors: Record<string, string> = {
                  scheduled: "bg-blue-100 text-blue-700",
                  completed: "bg-green-100 text-green-700",
                  cancelled: "bg-red-100 text-red-700",
                  no_show: "bg-orange-100 text-orange-700",
                };
                const typeLabels: Record<string, string> = {
                  install_design: "Install / Design",
                  enhancement: "Enhancement",
                  follow_up: "Follow-Up",
                  other: "Other",
                };
                return (
                  <div key={appt.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-start gap-4">
                    <div className={`mt-0.5 w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${isPast ? "bg-gray-100" : "bg-blue-50"}`}>
                      <Calendar className={`w-4 h-4 ${isPast ? "text-gray-400" : "text-blue-600"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-gray-800">{typeLabels[appt.appointmentType] ?? appt.appointmentType}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[appt.status] ?? "bg-gray-100 text-gray-600"}`}>{appt.status}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-sm text-gray-500 flex-wrap">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{appt.appointmentDate}{appt.startTime ? ` · ${appt.startTime}` : ""}</span>
                        {appt.customerAddress && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{appt.customerAddress}</span>}
                      </div>
                      {appt.notes && <p className="text-xs text-gray-400 mt-1 truncate">{appt.notes}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
      {/* Delete Confirmation */}
      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Contact</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600">
            Are you sure you want to delete <strong>{getDisplayName(contact)}</strong>? This cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDelete(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => deleteMutation.mutate({ id: contactId })} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Link Existing Property Dialog */}
      <Dialog open={showLinkProperty} onOpenChange={setShowLinkProperty}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Link Existing Property</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Search Properties</Label>
              <Input
                placeholder="Search by address or name..."
                value={propertySearch}
                onChange={e => setPropertySearch(e.target.value)}
              />
            </div>
            <div className="max-h-48 overflow-y-auto border rounded-lg divide-y">
              {propertiesData?.rows.map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPropertyId(p.id)}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${selectedPropertyId === p.id ? "bg-green-50 border-l-2 border-green-600" : ""}`}
                >
                  <p className="font-medium text-gray-800">{p.propertyName || p.address}</p>
                  <p className="text-gray-500 text-xs">{[p.city, p.state, p.zip].filter(Boolean).join(", ")}</p>
                </button>
              ))}
              {(!propertiesData?.rows || propertiesData.rows.length === 0) && (
                <p className="px-3 py-4 text-sm text-gray-400 text-center">No properties found</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Relationship</Label>
                <Select value={linkRelType} onValueChange={setLinkRelType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {RELATIONSHIP_TYPES.map(r => <SelectItem key={r} value={r}>{RELATIONSHIP_LABELS[r]}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2 pt-5">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={linkIsPrimary} onChange={e => setLinkIsPrimary(e.target.checked)} className="rounded" />
                  Primary Contact
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={linkIsBilling} onChange={e => setLinkIsBilling(e.target.checked)} className="rounded" />
                  Billing Contact
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLinkProperty(false)}>Cancel</Button>
            <Button
              onClick={() => selectedPropertyId && linkMutation.mutate({ contactId, propertyId: selectedPropertyId, relationshipType: linkRelType as any, isPrimary: linkIsPrimary, isBillingContact: linkIsBilling })}
              disabled={!selectedPropertyId || linkMutation.isPending}
              className="bg-green-700 hover:bg-green-800 text-white"
            >
              {linkMutation.isPending ? "Linking..." : "Link Property"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create New Property Dialog */}
      <Dialog open={showCreateProperty} onOpenChange={setShowCreateProperty}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Property</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Property Name (optional)</Label>
              <Input value={newPropForm.propertyName} onChange={e => setNewPropForm(f => ({ ...f, propertyName: e.target.value }))} placeholder="e.g. Smith Residence" />
            </div>
            <div>
              <Label>Address *</Label>
              <Input value={newPropForm.address} onChange={e => setNewPropForm(f => ({ ...f, address: e.target.value }))} placeholder="Street address" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label>City</Label>
                <Input value={newPropForm.city} onChange={e => setNewPropForm(f => ({ ...f, city: e.target.value }))} />
              </div>
              <div>
                <Label>State</Label>
                <Input value={newPropForm.state} onChange={e => setNewPropForm(f => ({ ...f, state: e.target.value }))} />
              </div>
              <div>
                <Label>Zip</Label>
                <Input value={newPropForm.zip} onChange={e => setNewPropForm(f => ({ ...f, zip: e.target.value }))} />
              </div>
            </div>
            <div>
              <Label>Property Type</Label>
              <Select value={newPropForm.propertyType} onValueChange={v => setNewPropForm(f => ({ ...f, propertyType: v as any }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PROPERTY_TYPES.map(t => <SelectItem key={t} value={t}>{PROPERTY_TYPE_LABELS[t]}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Relationship</Label>
                <Select value={linkRelType} onValueChange={setLinkRelType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {RELATIONSHIP_TYPES.map(r => <SelectItem key={r} value={r}>{RELATIONSHIP_LABELS[r]}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2 pt-5">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={linkIsPrimary} onChange={e => setLinkIsPrimary(e.target.checked)} className="rounded" />
                  Primary Contact
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={linkIsBilling} onChange={e => setLinkIsBilling(e.target.checked)} className="rounded" />
                  Billing Contact
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateProperty(false)}>Cancel</Button>
            <Button
              onClick={() => createPropertyAndLinkMutation.mutate({ ...newPropForm, sourceLeadId: undefined })}
              disabled={!newPropForm.address || createPropertyAndLinkMutation.isPending || linkMutation.isPending}
              className="bg-green-700 hover:bg-green-800 text-white"
            >
              {createPropertyAndLinkMutation.isPending || linkMutation.isPending ? "Creating..." : "Create & Link"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Linked property card — fetches property details inline
function LinkedPropertyCard({ link, onUnlink }: { link: any; onUnlink: () => void }) {
  const { data: property } = trpc.contacts.getProperty.useQuery({ id: link.propertyId });

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
          <Home className="w-5 h-5 text-green-700" />
        </div>
        <div>
          <Link href={`/admin/properties/${link.propertyId}`}>
            <p className="font-medium text-gray-900 hover:text-green-700 cursor-pointer">
              {property?.propertyName || property?.address || `Property #${link.propertyId}`}
            </p>
          </Link>
          {property && (
            <p className="text-xs text-gray-500">
              {[property.city, property.state, property.zip].filter(Boolean).join(", ")}
            </p>
          )}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">
              {link.relationshipType?.replace(/_/g, " ")}
            </span>
            {link.isPrimary && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Primary</span>}
            {link.isBillingContact && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Billing</span>}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link href={`/admin/properties/${link.propertyId}`}>
          <Button variant="outline" size="sm">View</Button>
        </Link>
        <Button variant="ghost" size="sm" onClick={onUnlink} className="text-red-500 hover:text-red-700 hover:bg-red-50">
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
