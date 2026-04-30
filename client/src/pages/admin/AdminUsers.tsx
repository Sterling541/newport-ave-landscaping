/* ============================================================
   ADMIN USERS & ROLES PAGE
   Manage staff users (email + PIN login) and role permissions.
   ============================================================ */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Users, Plus, Edit2, Trash2, Shield, Eye, EyeOff, ArrowLeft, Key,
  CheckSquare, Square, ChevronDown, ChevronRight,
} from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";

// All admin sidebar sections that can be toggled per role
const SIDEBAR_SECTIONS = [
  { key: "submissions", label: "Completed Scheduled" },
  { key: "quote_leads", label: "Quick Forms" },
  { key: "daily_pulse", label: "Daily Pulse" },
  { key: "lead_trends", label: "Lead Trends" },
  { key: "geo_map", label: "Geo Map" },
  { key: "smart_scheduler", label: "Smart Scheduler" },
  { key: "sales_reps", label: "Sales Reps" },
  { key: "badge_scans", label: "Badge Scans" },
  { key: "employees", label: "Employees" },
  { key: "reminders", label: "Reminders" },
  { key: "opt_out", label: "Opt-Out Requests" },
  { key: "configuration", label: "Configuration" },
  { key: "users", label: "Users & Roles" },
];

interface StaffUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phone?: string | null;
  title?: string | null;
  isActive: boolean;
  lastLoginAt?: Date | null;
}

interface RoleDef {
  id: number;
  slug: string;
  label: string;
  permissions: string;
  isSystem: boolean;
}

function parsePermissions(raw: string): Record<string, boolean> {
  try { return JSON.parse(raw) || {}; } catch { return {}; }
}

function RolePermissionsEditor({
  role, onSave, onCancel,
}: { role: RoleDef; onSave: (slug: string, label: string, perms: Record<string, boolean>) => void; onCancel: () => void }) {
  const [label, setLabel] = useState(role.label);
  const [perms, setPerms] = useState<Record<string, boolean>>(() => {
    const p = parsePermissions(role.permissions);
    // Default: all true for admin/sales_rep system roles
    const defaults: Record<string, boolean> = {};
    SIDEBAR_SECTIONS.forEach(s => { defaults[s.key] = p[s.key] !== false; });
    return defaults;
  });

  const allOn = SIDEBAR_SECTIONS.every(s => perms[s.key]);

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-xs font-medium text-slate-600">Role Label</Label>
        <Input value={label} onChange={e => setLabel(e.target.value)} className="mt-1" disabled={role.isSystem} />
        {role.isSystem && <p className="text-xs text-slate-400 mt-1">System roles cannot be renamed.</p>}
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-xs font-medium text-slate-600">Sidebar Access</Label>
          <button className="text-xs text-emerald-700 hover:underline flex items-center gap-1"
            onClick={() => { const v = !allOn; const next: Record<string, boolean> = {}; SIDEBAR_SECTIONS.forEach(s => { next[s.key] = v; }); setPerms(next); }}>
            {allOn ? <><CheckSquare className="w-3 h-3" /> Deselect all</> : <><Square className="w-3 h-3" /> Select all</>}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {SIDEBAR_SECTIONS.map(s => (
            <label key={s.key} className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-50 cursor-pointer text-sm">
              <input type="checkbox" checked={!!perms[s.key]} onChange={e => setPerms({ ...perms, [s.key]: e.target.checked })}
                className="rounded border-slate-300 text-emerald-600" />
              <span className="text-slate-700">{s.label}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex gap-2 pt-2">
        <Button size="sm" onClick={() => onSave(role.slug, label, perms)} className="bg-emerald-700 hover:bg-emerald-800 text-white">Save Permissions</Button>
        <Button size="sm" variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
}

export default function AdminUsers() {
  const [activeTab, setActiveTab] = useState<"users" | "roles">("users");
  const [showAddUser, setShowAddUser] = useState(false);
  const [editUser, setEditUser] = useState<StaffUser | null>(null);
  const [editingRoleId, setEditingRoleId] = useState<number | null>(null);
  const [showAddRole, setShowAddRole] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const [userForm, setUserForm] = useState({
    email: "", firstName: "", lastName: "", role: "sales_rep",
    phone: "", title: "", pin: "",
  });
  const [newRoleForm, setNewRoleForm] = useState({ slug: "", label: "" });

  const usersQuery = trpc.staff.listUsers.useQuery();
  const rolesQuery = trpc.staff.listRoles.useQuery();

  const createUser = trpc.staff.createUser.useMutation({
    onSuccess: () => { toast.success("User created."); setShowAddUser(false); resetUserForm(); usersQuery.refetch(); },
    onError: (e) => toast.error(e.message),
  });

  const updateUser = trpc.staff.updateUser.useMutation({
    onSuccess: () => { toast.success("User updated."); setEditUser(null); usersQuery.refetch(); },
    onError: (e) => toast.error(e.message),
  });

  const deleteUser = trpc.staff.deleteUser.useMutation({
    onSuccess: () => { toast.success("User deleted."); setDeleteConfirm(null); usersQuery.refetch(); },
    onError: (e) => toast.error(e.message),
  });

  const createRole = trpc.staff.createRole.useMutation({
    onSuccess: () => { toast.success("Role created."); setShowAddRole(false); setNewRoleForm({ slug: "", label: "" }); rolesQuery.refetch(); },
    onError: (e) => toast.error(e.message),
  });

  const updateRole = trpc.staff.updateRole.useMutation({
    onSuccess: () => { toast.success("Permissions saved."); setEditingRoleId(null); rolesQuery.refetch(); },
    onError: (e) => toast.error(e.message),
  });

  function resetUserForm() {
    setUserForm({ email: "", firstName: "", lastName: "", role: "sales_rep", phone: "", title: "", pin: "" });
  }

  function openEditUser(u: StaffUser) {
    setEditUser(u);
    setUserForm({ email: u.email, firstName: u.firstName, lastName: u.lastName,
      role: u.role, phone: u.phone ?? "", title: u.title ?? "", pin: "" });
  }

  function handleCreateUser() {
    if (!userForm.email || !userForm.firstName || !userForm.lastName || !userForm.pin) {
      toast.error("Email, first name, last name, and PIN are required."); return;
    }
    if (userForm.pin.length < 4) { toast.error("PIN must be at least 4 characters."); return; }
    createUser.mutate({ email: userForm.email, firstName: userForm.firstName, lastName: userForm.lastName,
      role: userForm.role, phone: userForm.phone || undefined, title: userForm.title || undefined, pin: userForm.pin });
  }

  function handleUpdateUser() {
    if (!editUser) return;
    updateUser.mutate({ id: editUser.id, email: userForm.email, firstName: userForm.firstName,
      lastName: userForm.lastName, role: userForm.role, phone: userForm.phone || null,
      title: userForm.title || null, pin: userForm.pin || undefined });
  }

  function handleSavePermissions(slug: string, label: string, perms: Record<string, boolean>) {
    const role = (rolesQuery.data ?? []).find(r => r.slug === slug);
    if (!role) return;
    updateRole.mutate({ id: role.id, label, permissions: JSON.stringify(perms) });
  }

  const users: StaffUser[] = (usersQuery.data ?? []) as StaffUser[];
  const roles: RoleDef[] = (rolesQuery.data ?? []) as RoleDef[];

  const getRoleLabel = (slug: string) => roles.find(r => r.slug === slug)?.label ?? slug;

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/admin/submissions">
            <a className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Admin
            </a>
          </Link>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-100">
              <Users className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Users & Roles</h1>
              <p className="text-sm text-slate-500">Manage staff accounts and access permissions</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-slate-200">
          {(["users", "roles"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors capitalize -mb-px ${
                activeTab === tab ? "border-emerald-600 text-emerald-700" : "border-transparent text-slate-500 hover:text-slate-700"
              }`}>
              {tab === "users" ? "Staff Users" : "Roles & Permissions"}
            </button>
          ))}
        </div>

        {/* USERS TAB */}
        {activeTab === "users" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-slate-500">{users.length} staff user{users.length !== 1 ? "s" : ""}</p>
              <Button size="sm" onClick={() => { resetUserForm(); setShowAddUser(true); }}
                className="bg-emerald-700 hover:bg-emerald-800 text-white gap-1.5">
                <Plus className="w-4 h-4" /> Add User
              </Button>
            </div>

            <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="text-xs font-semibold text-slate-600">Name</TableHead>
                    <TableHead className="text-xs font-semibold text-slate-600">Email</TableHead>
                    <TableHead className="text-xs font-semibold text-slate-600">Role</TableHead>
                    <TableHead className="text-xs font-semibold text-slate-600">Title</TableHead>
                    <TableHead className="text-xs font-semibold text-slate-600">Status</TableHead>
                    <TableHead className="text-xs font-semibold text-slate-600">Last Login</TableHead>
                    <TableHead className="text-xs font-semibold text-slate-600 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usersQuery.isLoading ? (
                    <TableRow><TableCell colSpan={7} className="text-center py-8 text-slate-400">Loading…</TableCell></TableRow>
                  ) : users.length === 0 ? (
                    <TableRow><TableCell colSpan={7} className="text-center py-12 text-slate-400">
                      <Users className="w-8 h-8 mx-auto mb-2 opacity-30" />
                      No staff users yet. Add your first user to get started.
                    </TableCell></TableRow>
                  ) : users.map(u => (
                    <TableRow key={u.id} className="hover:bg-slate-50">
                      <TableCell className="font-medium text-slate-800">{u.firstName} {u.lastName}</TableCell>
                      <TableCell className="text-slate-600 text-sm">{u.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs capitalize bg-emerald-50 text-emerald-700 border-emerald-200">
                          {getRoleLabel(u.role)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-500 text-sm">{u.title ?? "—"}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-xs ${u.isActive ? "bg-green-50 text-green-700 border-green-200" : "bg-slate-100 text-slate-500 border-slate-200"}`}>
                          {u.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-400 text-xs">
                        {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Never"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button size="sm" variant="ghost" onClick={() => openEditUser(u)} className="h-7 w-7 p-0 text-slate-500 hover:text-slate-800">
                            <Edit2 className="w-3.5 h-3.5" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => setDeleteConfirm(u.id)} className="h-7 w-7 p-0 text-red-400 hover:text-red-600">
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800 flex items-start gap-2">
              <Key className="w-4 h-4 mt-0.5 shrink-0" />
              <div>
                <strong>PIN Login:</strong> Staff members log in at <code className="bg-blue-100 px-1 rounded">/admin/login</code> using their email and PIN. Each PIN must be at least 4 characters. Admins can reset PINs by editing the user.
              </div>
            </div>
          </div>
        )}

        {/* ROLES TAB */}
        {activeTab === "roles" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-slate-500">Control what each role can see in the admin sidebar</p>
              <Button size="sm" onClick={() => setShowAddRole(true)} className="bg-emerald-700 hover:bg-emerald-800 text-white gap-1.5">
                <Plus className="w-4 h-4" /> Add Role
              </Button>
            </div>

            <div className="space-y-3">
              {rolesQuery.isLoading ? (
                <div className="text-center py-8 text-slate-400">Loading…</div>
              ) : roles.map(role => (
                <div key={role.id} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-emerald-700" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{role.label}</p>
                        <p className="text-xs text-slate-400 font-mono">{role.slug}{role.isSystem ? " · system" : ""}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {editingRoleId === role.id ? (
                        <Button size="sm" variant="ghost" onClick={() => setEditingRoleId(null)} className="text-slate-500">
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => setEditingRoleId(role.id)} className="text-sm gap-1.5">
                          <Edit2 className="w-3.5 h-3.5" /> Edit Permissions
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Button>
                      )}
                    </div>
                  </div>
                  {editingRoleId === role.id && (
                    <div className="border-t border-slate-100 px-5 py-4 bg-slate-50">
                      <RolePermissionsEditor
                        role={role}
                        onSave={handleSavePermissions}
                        onCancel={() => setEditingRoleId(null)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADD USER DIALOG */}
        <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Staff User</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">First Name *</Label>
                  <Input value={userForm.firstName} onChange={e => setUserForm({ ...userForm, firstName: e.target.value })} placeholder="Jane" className="mt-1" />
                </div>
                <div>
                  <Label className="text-xs">Last Name *</Label>
                  <Input value={userForm.lastName} onChange={e => setUserForm({ ...userForm, lastName: e.target.value })} placeholder="Smith" className="mt-1" />
                </div>
              </div>
              <div>
                <Label className="text-xs">Work Email *</Label>
                <Input type="email" value={userForm.email} onChange={e => setUserForm({ ...userForm, email: e.target.value })} placeholder="jane@newportavelandscaping.com" className="mt-1" />
              </div>
              <div>
                <Label className="text-xs">Role *</Label>
                <select value={userForm.role} onChange={e => setUserForm({ ...userForm, role: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-md border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-emerald-500">
                  {roles.map(r => <option key={r.slug} value={r.slug}>{r.label}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Title</Label>
                  <Input value={userForm.title} onChange={e => setUserForm({ ...userForm, title: e.target.value })} placeholder="Sales Rep" className="mt-1" />
                </div>
                <div>
                  <Label className="text-xs">Phone</Label>
                  <Input type="tel" value={userForm.phone} onChange={e => setUserForm({ ...userForm, phone: e.target.value })} placeholder="(541) 555-0100" className="mt-1" />
                </div>
              </div>
              <div>
                <Label className="text-xs">PIN * (min 4 characters)</Label>
                <div className="relative mt-1">
                  <Input type={showPin ? "text" : "password"} value={userForm.pin} onChange={e => setUserForm({ ...userForm, pin: e.target.value })} placeholder="••••" className="pr-10" />
                  <button type="button" onClick={() => setShowPin(!showPin)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-1">Staff will use this PIN to log in at /admin/login</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddUser(false)}>Cancel</Button>
              <Button onClick={handleCreateUser} disabled={createUser.isPending} className="bg-emerald-700 hover:bg-emerald-800 text-white">
                {createUser.isPending ? "Creating…" : "Create User"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* EDIT USER DIALOG */}
        <Dialog open={!!editUser} onOpenChange={() => setEditUser(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Staff User</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">First Name *</Label>
                  <Input value={userForm.firstName} onChange={e => setUserForm({ ...userForm, firstName: e.target.value })} className="mt-1" />
                </div>
                <div>
                  <Label className="text-xs">Last Name *</Label>
                  <Input value={userForm.lastName} onChange={e => setUserForm({ ...userForm, lastName: e.target.value })} className="mt-1" />
                </div>
              </div>
              <div>
                <Label className="text-xs">Work Email *</Label>
                <Input type="email" value={userForm.email} onChange={e => setUserForm({ ...userForm, email: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label className="text-xs">Role *</Label>
                <select value={userForm.role} onChange={e => setUserForm({ ...userForm, role: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-md border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-emerald-500">
                  {roles.map(r => <option key={r.slug} value={r.slug}>{r.label}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Title</Label>
                  <Input value={userForm.title} onChange={e => setUserForm({ ...userForm, title: e.target.value })} className="mt-1" />
                </div>
                <div>
                  <Label className="text-xs">Phone</Label>
                  <Input type="tel" value={userForm.phone} onChange={e => setUserForm({ ...userForm, phone: e.target.value })} className="mt-1" />
                </div>
              </div>
              <div>
                <Label className="text-xs">New PIN (leave blank to keep current)</Label>
                <div className="relative mt-1">
                  <Input type={showPin ? "text" : "password"} value={userForm.pin} onChange={e => setUserForm({ ...userForm, pin: e.target.value })} placeholder="Enter new PIN to change" className="pr-10" />
                  <button type="button" onClick={() => setShowPin(!showPin)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditUser(null)}>Cancel</Button>
              <Button onClick={handleUpdateUser} disabled={updateUser.isPending} className="bg-emerald-700 hover:bg-emerald-800 text-white">
                {updateUser.isPending ? "Saving…" : "Save Changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* DELETE CONFIRM DIALOG */}
        <Dialog open={deleteConfirm !== null} onOpenChange={() => setDeleteConfirm(null)}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Delete User</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-slate-600 py-2">Are you sure you want to delete this user? They will no longer be able to log in. This cannot be undone.</p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
              <Button variant="destructive" onClick={() => deleteConfirm !== null && deleteUser.mutate({ id: deleteConfirm })} disabled={deleteUser.isPending}>
                {deleteUser.isPending ? "Deleting…" : "Delete User"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* ADD ROLE DIALOG */}
        <Dialog open={showAddRole} onOpenChange={setShowAddRole}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Add Custom Role</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <div>
                <Label className="text-xs">Role Label *</Label>
                <Input value={newRoleForm.label} onChange={e => setNewRoleForm({ ...newRoleForm, label: e.target.value })} placeholder="Office Manager" className="mt-1" />
              </div>
              <div>
                <Label className="text-xs">Slug * (lowercase, no spaces)</Label>
                <Input value={newRoleForm.slug} onChange={e => setNewRoleForm({ ...newRoleForm, slug: e.target.value.toLowerCase().replace(/\s+/g, "_") })} placeholder="office_manager" className="mt-1 font-mono" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddRole(false)}>Cancel</Button>
              <Button onClick={() => {
                if (!newRoleForm.slug || !newRoleForm.label) { toast.error("Both fields are required."); return; }
                createRole.mutate({ slug: newRoleForm.slug, label: newRoleForm.label, permissions: JSON.stringify({}) });
              }} disabled={createRole.isPending} className="bg-emerald-700 hover:bg-emerald-800 text-white">
                {createRole.isPending ? "Creating…" : "Create Role"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
