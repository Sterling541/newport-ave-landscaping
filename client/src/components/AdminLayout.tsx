/* ============================================================
   ADMIN LAYOUT
   Standalone dark-sidebar layout for all /admin/* pages.
   Completely isolated from the public site navbar.
   Mobile-responsive: hamburger menu on small screens.
   Role-based sidebar visibility via staff permissions.
   ============================================================ */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  BarChart2,
  FileSpreadsheet,
  Map,
  TrendingUp,
  Upload,
  Users,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Bell,
  ClipboardList,
  MessageSquare,
  Calendar,
  UserCheck,
  ScanLine,
  Settings,
  UserCog,
  DollarSign,
} from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";

const NAV_ITEMS = [
  {
    label: "Completed Scheduled Service Forms",
    href: "/admin/submissions",
    icon: Users,
    description: "Scheduled service submissions",
    permissionKey: "submissions",
  },
  {
    label: "Quick Forms",
    href: "/admin/quote-leads",
    icon: MessageSquare,
    description: "Get a Quote inquiries",
    permissionKey: "quote_leads",
  },
  {
    label: "Daily Pulse",
    href: "/admin/daily-pulse",
    icon: BarChart2,
    description: "Today's insights",
    permissionKey: "daily_pulse",
  },
  {
    label: "Lead Trends",
    href: "/admin/lead-trends",
    icon: TrendingUp,
    description: "Volume over time",
    permissionKey: "lead_trends",
  },
  {
    label: "Geo Map",
    href: "/admin/geo-intelligence",
    icon: Map,
    description: "Inquiry map",
    permissionKey: "geo_map",
  },

  {
    label: "Reminders",
    href: "/admin/reminders",
    icon: Bell,
    description: "Callback tickler",
    permissionKey: "reminders",
  },
  {
    label: "Opt-Out Requests",
    href: "/admin/opt-out-requests",
    icon: ClipboardList,
    description: "Spray & prune opt-outs",
    permissionKey: "opt_out",
  },
  {
    label: "Smart Scheduler",
    href: "/admin/scheduler",
    icon: Calendar,
    description: "Appointments & calendar",
    permissionKey: "smart_scheduler",
  },

  {
    label: "Badge Scans",
    href: "/admin/badge-scans",
    icon: ScanLine,
    description: "Scan leads & CRM",
    permissionKey: "badge_scans",
  },
  {
    label: "Employees",
    href: "/admin/employees",
    icon: Users,
    description: "Employee management",
    permissionKey: "employees",
  },
  {
    label: "Users & Roles",
    href: "/admin/users",
    icon: UserCog,
    description: "Staff accounts & permissions",
    permissionKey: "users",
  },
  {
    label: "Configuration",
    href: "/admin/configuration",
    icon: Settings,
    description: "CSV import, sales reps",
    permissionKey: "configuration",
  },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const { user, logout } = useAuth();

  // Fetch staff permissions — if not a staff user, returns null (owner sees all)
  const { data: permissions } = trpc.staff.myPermissions.useQuery(undefined, {
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  // Filter nav items based on permissions
  // If permissions is null/undefined (owner via Manus OAuth), show everything
  // If permissions is an object, only show items where the permission key is true
  const visibleNavItems = NAV_ITEMS.filter(item => {
    if (!permissions) return true; // owner sees all
    const perms = permissions as Record<string, boolean>;
    return perms[item.permissionKey] !== false;
  });

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <nav className="flex-1 py-4 space-y-0.5 px-2 overflow-y-auto">
      {visibleNavItems.map(({ label, href, icon: Icon, description }) => {
        const active = location === href || location.startsWith(href + "/");
        return (
          <Link key={href} href={href}>
            <a
              onClick={() => mobile && setMobileOpen(false)}
              className={`flex items-center gap-3 px-2 py-2.5 rounded-lg text-sm transition-colors group ${
                active
                  ? "bg-[oklch(0.55_0.15_145)] text-white"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
              title={collapsed && !mobile ? label : undefined}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {(!collapsed || mobile) && (
                <div className="overflow-hidden">
                  <p className="font-medium leading-tight truncate">{label}</p>
                  <p className="text-[10px] text-white/40 leading-tight truncate group-hover:text-white/60">
                    {description}
                  </p>
                </div>
              )}
            </a>
          </Link>
        );
      })}
    </nav>
  );

  const SidebarFooter = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="border-t border-white/10 p-3 space-y-1">
      <a
        href="/"
        className="flex items-center gap-2 px-2 py-2 rounded-lg text-xs text-white/40 hover:text-white/70 hover:bg-white/10 transition-colors"
        title={collapsed && !mobile ? "Public site" : undefined}
      >
        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
        {(!collapsed || mobile) && <span>Back to site</span>}
      </a>
      {user && (
        <button
          onClick={() => logout()}
          className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-xs text-white/40 hover:text-white/70 hover:bg-white/10 transition-colors text-left"
          title={collapsed && !mobile ? "Sign out" : undefined}
        >
          <LogOut className="w-3.5 h-3.5 shrink-0" />
          {(!collapsed || mobile) && (
            <span className="truncate">Sign out {user.name?.split(" ")[0]}</span>
          )}
        </button>
      )}
      {!mobile && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-2 py-2 rounded-lg text-xs text-white/30 hover:text-white/60 hover:bg-white/10 transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="w-3.5 h-3.5" />
          ) : (
            <>
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Collapse</span>
            </>
          )}
        </button>
      )}
    </div>
  );

  return (
    <div className="flex h-screen bg-[oklch(0.97_0.005_120)] overflow-hidden">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-[oklch(0.18_0.04_155)] text-white w-64 transition-transform duration-200 md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
          <div className="w-8 h-8 rounded-md bg-[oklch(0.55_0.15_145)] flex items-center justify-center shrink-0">
            <FileSpreadsheet className="w-4 h-4 text-white" />
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-xs font-bold text-white leading-tight truncate">Newport Ave</p>
            <p className="text-[10px] text-white/50 leading-tight">Admin Dashboard</p>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded text-white/40 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <NavLinks mobile />
        <SidebarFooter mobile />
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-[oklch(0.18_0.04_155)] text-white transition-all duration-200 shrink-0 ${
          collapsed ? "w-16" : "w-56"
        }`}
      >
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
          <div className="w-8 h-8 rounded-md bg-[oklch(0.55_0.15_145)] flex items-center justify-center shrink-0">
            <FileSpreadsheet className="w-4 h-4 text-white" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white leading-tight truncate">Newport Ave</p>
              <p className="text-[10px] text-white/50 leading-tight">Admin Dashboard</p>
            </div>
          )}
        </div>
        <NavLinks />
        <SidebarFooter />
      </aside>

      {/* Main content */}
      <main className="admin-main-content flex-1 overflow-x-auto overflow-y-auto flex flex-col">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 bg-[oklch(0.18_0.04_155)] text-white sticky top-0 z-30 shrink-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-1.5 rounded text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="w-6 h-6 rounded bg-[oklch(0.55_0.15_145)] flex items-center justify-center">
            <FileSpreadsheet className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm font-semibold text-white">Newport Ave Admin</span>
        </div>
        <div className="flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
