import { useState, useRef } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { MapView } from "@/components/Map";
import {
  ArrowLeft, Edit2, Save, X, Trash2, Home, User, Phone, Mail,
  MapPin, Plus, Link2, Upload, FileText, Image, File, ChevronRight, Download, Calendar, Clock
} from "lucide-react";

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
const FILE_CATEGORIES = ["photo", "design", "document", "contract", "plan", "permit", "note", "other"];
const FILE_CATEGORY_LABELS: Record<string, string> = {
  photo: "Photo", design: "Design", document: "Document", contract: "Contract",
  plan: "Plan", permit: "Permit", note: "Note", other: "Other"
};
const FILE_CATEGORY_ICONS: Record<string, any> = {
  photo: Image, design: FileText, document: FileText, contract: FileText,
  plan: FileText, permit: FileText, note: FileText, other: File
};

const NAME_PREFIXES: Record<string, string> = {
  mr: "Mr.", mrs: "Mrs.", ms: "Ms.", dr: "Dr.", company: "Company", other: ""
};

function getContactDisplayName(c: any) {
  const prefix = c.namePrefix ? (NAME_PREFIXES[c.namePrefix] ?? "") + " " : "";
  const name = [c.firstName, c.lastName].filter(Boolean).join(" ");
  return (prefix + name).trim() || c.companyName || "Unnamed Contact";
}

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const propertyId = parseInt(id ?? "0");
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showLinkContact, setShowLinkContact] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [contactSearch, setContactSearch] = useState("");
  const [selectedContactId, setSelectedContactId] = useState<number | null>(null);
  const [linkRelType, setLinkRelType] = useState("primary_contact");
  const [linkIsPrimary, setLinkIsPrimary] = useState(false);
  const [linkIsBilling, setLinkIsBilling] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadCategory, setUploadCategory] = useState("photo");
  const [uploadDescription, setUploadDescription] = useState("");
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  const { data: property, isLoading, refetch } = trpc.contacts.getProperty.useQuery({ id: propertyId });
  const { data: links, refetch: refetchLinks } = trpc.contacts.getLinksForProperty.useQuery({ propertyId });
  const { data: files, refetch: refetchFiles } = trpc.contacts.getFilesForProperty.useQuery({ propertyId });
  const { data: appointmentsData } = trpc.contacts.appointmentsByProperty.useQuery({ propertyId });
  const { data: contactsData } = trpc.contacts.listContacts.useQuery({
    search: contactSearch || undefined,
    limit: 20,
  });

  const [editForm, setEditForm] = useState<any>(null);

  function startEdit() {
    if (!property) return;
    setEditForm({ ...property });
    setEditing(true);
  }

  const updateMutation = trpc.contacts.updateProperty.useMutation({
    onSuccess: () => { toast({ title: "Property updated" }); setEditing(false); refetch(); },
    onError: (e) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const deleteMutation = trpc.contacts.deleteProperty.useMutation({
    onSuccess: () => { toast({ title: "Property deleted" }); navigate("/admin/properties"); },
    onError: (e) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const linkMutation = trpc.contacts.createLink.useMutation({
    onSuccess: () => {
      toast({ title: "Contact linked" });
      setShowLinkContact(false);
      setSelectedContactId(null);
      setContactSearch("");
      refetchLinks();
    },
    onError: (e) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const unlinkMutation = trpc.contacts.deleteLink.useMutation({
    onSuccess: () => { toast({ title: "Contact unlinked" }); refetchLinks(); },
    onError: (e) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const uploadMutation = trpc.contacts.uploadPropertyFile.useMutation({
    onSuccess: () => {
      toast({ title: "File uploaded" });
      setShowUpload(false);
      setUploadFile(null);
      setUploadDescription("");
      refetchFiles();
    },
    onError: (e) => toast({ title: "Upload failed", description: e.message, variant: "destructive" }),
  });

  const deleteFileMutation = trpc.contacts.deletePropertyFile.useMutation({
    onSuccess: () => { toast({ title: "File deleted" }); refetchFiles(); },
    onError: (e) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  async function handleUpload() {
    if (!uploadFile) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1];
      uploadMutation.mutate({
        propertyId,
        fileName: uploadFile.name,
        fileBase64: base64,
        mimeType: uploadFile.type || "application/octet-stream",
        fileSizeBytes: uploadFile.size,
        category: uploadCategory as any,
        description: uploadDescription || undefined,
      });
    };
    reader.readAsDataURL(uploadFile);
  }

  // Show map when property has address
  function handleMapReady(map: google.maps.Map) {
    setMapInstance(map);
    if (property?.address) {
      const geocoder = new google.maps.Geocoder();
      const fullAddress = [property.address, property.city, property.state, property.zip].filter(Boolean).join(", ");
      geocoder.geocode({ address: fullAddress }, (results, status) => {
        if (status === "OK" && results?.[0]) {
          const loc = results[0].geometry.location;
          map.setCenter(loc);
          map.setZoom(17);
          new google.maps.Marker({ position: loc, map, title: property.propertyName || property.address });
        }
      });
    }
  }

  if (isLoading) {
    return (
      <div className="p-6 max-w-5xl mx-auto space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Property not found.</p>
        <Link href="/admin/properties"><Button variant="outline" className="mt-4">Back to Properties</Button></Link>
      </div>
    );
  }

  const fullAddress = [property.address, property.city, property.state, property.zip].filter(Boolean).join(", ");

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link href="/admin/properties">
          <span className="hover:text-green-700 cursor-pointer flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Properties
          </span>
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-800 font-medium">{property.propertyName || property.address}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <Home className="w-6 h-6 text-green-700" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{property.propertyName || property.address}</h1>
            {property.propertyName && <p className="text-sm text-gray-500">{property.address}</p>}
            <p className="text-sm text-gray-500">{[property.city, property.state, property.zip].filter(Boolean).join(", ")}</p>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1 bg-green-100 text-green-800 capitalize">
              {PROPERTY_TYPE_LABELS[property.propertyType] ?? property.propertyType}
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
              <Button size="sm" onClick={() => updateMutation.mutate({ id: propertyId, ...editForm })} disabled={updateMutation.isPending} className="bg-green-700 hover:bg-green-800 text-white gap-1">
                <Save className="w-4 h-4" /> {updateMutation.isPending ? "Saving..." : "Save"}
              </Button>
              <Button variant="outline" size="sm" onClick={() => setEditing(false)} className="gap-1">
                <X className="w-4 h-4" /> Cancel
              </Button>
            </>
          )}
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="contacts">Contacts ({links?.length ?? 0})</TabsTrigger>
          <TabsTrigger value="files">Files ({files?.length ?? 0})</TabsTrigger>
          <TabsTrigger value="appointments">Appointments ({appointmentsData?.length ?? 0})</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Address / Edit */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-700" /> Property Details
              </h3>
              {editing ? (
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs">Property Name</Label>
                    <Input className="h-8 text-sm" value={editForm.propertyName ?? ""} onChange={e => setEditForm((f: any) => ({ ...f, propertyName: e.target.value }))} />
                  </div>
                  <div>
                    <Label className="text-xs">Address *</Label>
                    <Input className="h-8 text-sm" value={editForm.address ?? ""} onChange={e => setEditForm((f: any) => ({ ...f, address: e.target.value }))} />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <Label className="text-xs">City</Label>
                      <Input className="h-8 text-sm" value={editForm.city ?? ""} onChange={e => setEditForm((f: any) => ({ ...f, city: e.target.value }))} />
                    </div>
                    <div>
                      <Label className="text-xs">State</Label>
                      <Input className="h-8 text-sm" value={editForm.state ?? ""} onChange={e => setEditForm((f: any) => ({ ...f, state: e.target.value }))} />
                    </div>
                    <div>
                      <Label className="text-xs">Zip</Label>
                      <Input className="h-8 text-sm" value={editForm.zip ?? ""} onChange={e => setEditForm((f: any) => ({ ...f, zip: e.target.value }))} />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs">Property Type</Label>
                    <Select value={editForm.propertyType} onValueChange={v => setEditForm((f: any) => ({ ...f, propertyType: v }))}>
                      <SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {PROPERTY_TYPES.map(t => <SelectItem key={t} value={t}>{PROPERTY_TYPE_LABELS[t]}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs">Notes</Label>
                    <Textarea className="text-sm" value={editForm.notes ?? ""} onChange={e => setEditForm((f: any) => ({ ...f, notes: e.target.value }))} rows={3} />
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-gray-800">{property.address}</p>
                      <p className="text-gray-600">{[property.city, property.state, property.zip].filter(Boolean).join(", ")}</p>
                    </div>
                  </div>
                  {property.notes && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs font-medium text-gray-500 mb-1">Notes</p>
                      <p className="text-gray-700 whitespace-pre-wrap">{property.notes}</p>
                    </div>
                  )}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-green-700 hover:underline mt-2"
                  >
                    <MapPin className="w-3 h-3" /> Open in Google Maps
                  </a>
                </div>
              )}
            </div>

            {/* Map */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden" style={{ minHeight: 280 }}>
              <MapView
                className="w-full h-full"
                style={{ minHeight: 280 }}
                onMapReady={handleMapReady}
                initialCenter={{ lat: 44.0582, lng: -121.3153 }}
                initialZoom={13}
              />
            </div>
          </div>
        </TabsContent>

        {/* Contacts Tab */}
        <TabsContent value="contacts">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Linked Contacts</h3>
            <Button size="sm" onClick={() => setShowLinkContact(true)} className="bg-green-700 hover:bg-green-800 text-white gap-1">
              <Link2 className="w-4 h-4" /> Link Contact
            </Button>
          </div>

          {!links || links.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 py-16 text-center">
              <User className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No contacts linked</p>
              <p className="text-sm text-gray-400 mt-1">Link a contact to this property</p>
            </div>
          ) : (
            <div className="space-y-3">
              {links.map((link) => (
                <LinkedContactCard key={link.id} link={link} onUnlink={() => unlinkMutation.mutate({ id: link.id })} />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Files Tab */}
        <TabsContent value="files">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Files & Attachments</h3>
            <Button size="sm" onClick={() => setShowUpload(true)} className="bg-green-700 hover:bg-green-800 text-white gap-1">
              <Upload className="w-4 h-4" /> Upload File
            </Button>
          </div>

          {!files || files.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 py-16 text-center">
              <File className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No files uploaded</p>
              <p className="text-sm text-gray-400 mt-1">Upload photos, designs, contracts, and more</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {files.map((file) => {
                const Icon = FILE_CATEGORY_ICONS[file.category] ?? File;
                const isImage = file.mimeType?.startsWith("image/");
                return (
                  <div key={file.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    {isImage ? (
                      <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">
                        <img src={file.fileUrl} alt={file.fileName} className="w-full h-40 object-cover hover:opacity-90 transition-opacity" />
                      </a>
                    ) : (
                      <div className="w-full h-40 bg-gray-50 flex items-center justify-center">
                        <Icon className="w-12 h-12 text-gray-300" />
                      </div>
                    )}
                    <div className="p-3">
                      <p className="font-medium text-sm text-gray-800 truncate">{file.fileName}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">
                          {FILE_CATEGORY_LABELS[file.category] ?? file.category}
                        </span>
                        <div className="flex gap-1">
                          <a href={file.fileUrl} target="_blank" rel="noopener noreferrer" download={file.fileName}>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Download className="w-3.5 h-3.5 text-gray-500" />
                            </Button>
                          </a>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-400 hover:text-red-600 hover:bg-red-50"
                            onClick={() => deleteFileMutation.mutate({ id: file.id })}>
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                      {file.description && <p className="text-xs text-gray-500 mt-1 truncate">{file.description}</p>}
                      {file.uploadedByName && <p className="text-xs text-gray-400 mt-0.5">by {file.uploadedByName}</p>}
                    </div>
                  </div>
                );
              })}
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
              <p className="text-sm text-gray-400 mt-1">Appointments will appear here once linked to this property in the Smart Scheduler</p>
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
                        <span className="font-medium text-gray-800">{appt.customerName || "Unnamed"}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[appt.status] ?? "bg-gray-100 text-gray-600"}`}>{appt.status}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{typeLabels[appt.appointmentType] ?? appt.appointmentType}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-sm text-gray-500 flex-wrap">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{appt.appointmentDate}{appt.startTime ? ` · ${appt.startTime}` : ""}</span>
                        {appt.salesRepName && <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{appt.salesRepName}</span>}
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
          <DialogHeader><DialogTitle>Delete Property</DialogTitle></DialogHeader>
          <p className="text-sm text-gray-600">
            Are you sure you want to delete <strong>{property.propertyName || property.address}</strong>? This cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDelete(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => deleteMutation.mutate({ id: propertyId })} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Link Contact Dialog */}
      <Dialog open={showLinkContact} onOpenChange={setShowLinkContact}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Link Contact to Property</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Search Contacts</Label>
              <Input placeholder="Search by name, email, phone..." value={contactSearch} onChange={e => setContactSearch(e.target.value)} />
            </div>
            <div className="max-h-48 overflow-y-auto border rounded-lg divide-y">
              {contactsData?.rows.map(c => (
                <button key={c.id} type="button" onClick={() => setSelectedContactId(c.id)}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${selectedContactId === c.id ? "bg-green-50 border-l-2 border-green-600" : ""}`}>
                  <p className="font-medium text-gray-800">{getContactDisplayName(c)}</p>
                  <p className="text-gray-500 text-xs">{c.email || c.phone || ""}</p>
                </button>
              ))}
              {(!contactsData?.rows || contactsData.rows.length === 0) && (
                <p className="px-3 py-4 text-sm text-gray-400 text-center">No contacts found</p>
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
            <Button variant="outline" onClick={() => setShowLinkContact(false)}>Cancel</Button>
            <Button
              onClick={() => selectedContactId && linkMutation.mutate({ contactId: selectedContactId, propertyId, relationshipType: linkRelType as any, isPrimary: linkIsPrimary, isBillingContact: linkIsBilling })}
              disabled={!selectedContactId || linkMutation.isPending}
              className="bg-green-700 hover:bg-green-800 text-white"
            >
              {linkMutation.isPending ? "Linking..." : "Link Contact"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload File Dialog */}
      <Dialog open={showUpload} onOpenChange={setShowUpload}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Upload File</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>File *</Label>
              <div
                className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-green-400 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                {uploadFile ? (
                  <p className="text-sm font-medium text-green-700">{uploadFile.name}</p>
                ) : (
                  <p className="text-sm text-gray-500">Click to select a file</p>
                )}
                <p className="text-xs text-gray-400 mt-1">Photos, PDFs, designs, contracts</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt,.dwg,.dxf"
                onChange={e => setUploadFile(e.target.files?.[0] ?? null)}
              />
            </div>
            <div>
              <Label>Category</Label>
              <Select value={uploadCategory} onValueChange={setUploadCategory}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {FILE_CATEGORIES.map(c => <SelectItem key={c} value={c}>{FILE_CATEGORY_LABELS[c]}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Description (optional)</Label>
              <Input value={uploadDescription} onChange={e => setUploadDescription(e.target.value)} placeholder="Brief description..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUpload(false)}>Cancel</Button>
            <Button onClick={handleUpload} disabled={!uploadFile || uploadMutation.isPending} className="bg-green-700 hover:bg-green-800 text-white">
              {uploadMutation.isPending ? "Uploading..." : "Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Linked contact card — fetches contact details inline
function LinkedContactCard({ link, onUnlink }: { link: any; onUnlink: () => void }) {
  const { data: contact } = trpc.contacts.getContact.useQuery({ id: link.contactId });

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center shrink-0">
          <User className="w-5 h-5 text-green-700" />
        </div>
        <div>
          <Link href={`/admin/contacts/${link.contactId}`}>
            <p className="font-medium text-gray-900 hover:text-green-700 cursor-pointer">
              {contact ? getContactDisplayName(contact) : `Contact #${link.contactId}`}
            </p>
          </Link>
          {contact?.phone && (
            <a href={`tel:${contact.phone}`} className="text-xs text-gray-500 hover:text-green-700 flex items-center gap-1">
              <Phone className="w-3 h-3" />{contact.phone}
            </a>
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
        <Link href={`/admin/contacts/${link.contactId}`}>
          <Button variant="outline" size="sm">View</Button>
        </Link>
        <Button variant="ghost" size="sm" onClick={onUnlink} className="text-red-500 hover:text-red-700 hover:bg-red-50">
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
