#!/usr/bin/env python3
"""Replace the OAuth auth gate in AdminSubmissions.tsx with PIN-based auth."""

filepath = '/home/ubuntu/newport-ave-landscaping/client/src/pages/AdminSubmissions.tsx'

with open(filepath, 'r') as f:
    content = f.read()

# 1. Replace useAuth import with useAdminAuth
content = content.replace(
    'import { useAuth } from "@/_core/hooks/useAuth";',
    'import { isAdminAuthenticated } from "@/hooks/useAdminAuth";'
)

# 2. Remove getLoginUrl import
content = content.replace(
    'import { getLoginUrl } from "@/const";',
    '// getLoginUrl removed — using PIN auth instead'
)

# 3. Replace the useAuth hook call
content = content.replace(
    '  const { user, loading: authLoading } = useAuth();',
    '''  const [pinAuthed, setPinAuthed] = useState(() => isAdminAuthenticated());
  // Alias user to pinAuthed for downstream code that checks !!user
  const user = pinAuthed ? { role: "admin" } : null;
  const authLoading = false;'''
)

# 4. Find and replace the entire auth gate block
auth_gate_start = '  // ── Auth gate ─'
render_marker = '  // ── Render ─'

start_idx = content.find(auth_gate_start)
end_idx = content.find(render_marker)

if start_idx == -1:
    print("ERROR: Could not find auth gate start")
    exit(1)
if end_idx == -1:
    print("ERROR: Could not find render marker")
    exit(1)

new_auth_gate = '''  // ── Auth gate (PIN-based) ─────────────────────────────────────────────────
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
            if (pin === "4132") {
              try { sessionStorage.setItem("nal_admin_v1", "true"); } catch {}
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

'''

content = content[:start_idx] + new_auth_gate + content[end_idx:]

with open(filepath, 'w') as f:
    f.write(content)

print("Done! Auth gate replaced successfully.")
