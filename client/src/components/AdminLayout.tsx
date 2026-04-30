/* ============================================================
   ADMIN LAYOUT
   Standalone dark-sidebar layout for all /admin/* pages.
   Completely isolated from the public site navbar.
   Mobile-responsive: hamburger menu on small screens.
   Role-based sidebar visibility via staff permissions.
   Staff auth redirect: unauthenticated users → /admin/login
   ============================================================ */
import { useState, useEffect } from "react";
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
  ChevronDown,
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

// A nav item can be a simple link or a group with sub-items
type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  permissionKey: string;
  adminOnly?: boolean;
  subItems?: never;
} | {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  permissionKey: string;
  adminOnly?: boolean;
  subItems: {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
    permissionKey: string;
  }[];
};

const NAV_ITEMS: NavItem[] = [
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
    label: "Lead Trends",
    href: "/admin/lead-trends",
    icon: TrendingUp,
    description: "Volume over time",
    permissionKey: "lead_trends",
    subItems: [
      {
        label: "Daily Pulse",
        href: "/admin/daily-pulse",
        icon: BarChart2,
        description: "Today's insights",
        permissionKey: "daily_pulse",
      },
      {
        label: "Geo Map",
        href: "/admin/geo-intelligence",
        icon: Map,
        description: "Inquiry map",
        permissionKey: "geo_map",
      },
    ],
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
    label: "Configuration",
    href: "/admin/configuration",
    icon: Settings,
    description: "CSV import, sales reps, users",
    permissionKey: "configuration",
    adminOnly: true,
  },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location, navigate] = useLocation();
  const { user: oauthUser, loading: oauthLoading, logout } = useAuth();
  const staffLogout = trpc.staff.logout.useMutation({
    onSettled: () => { window.location.href = "/admin/login"; },
  });

  // Track which groups are expanded (default: Lead Trends open if on a sub-page)
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() => {
    const isLeadTrendsSubPage =
      location.startsWith("/admin/daily-pulse") ||
      location.startsWith("/admin/geo-intelligence");
    return { lead_trends: isLeadTrendsSubPage };
  });

  // Fetch staff session
  const { data: staffUser, isLoading: staffLoading } = trpc.staff.me.useQuery(undefined, {
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  // Fetch staff permissions — ONLY after staffUser is known to exist.
  // This prevents the race condition where permissions refetch before staffUser resolves,
  // causing Configuration to flash-then-disappear.
  const { data: permissions, isLoading: permissionsLoading } = trpc.staff.myPermissions.useQuery(undefined, {
    retry: false,
    // Only fetch after we know there is a staff session — prevents premature fetches
    enabled: !staffLoading && !!staffUser,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  // Redirect to /admin/login only if NEITHER staff session NOR Manus OAuth owner session exists
  const authLoading = staffLoading || oauthLoading;
  const isAuthenticated = !!staffUser || !!oauthUser;
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/admin/login");
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Owner = Manus OAuth user with no staff session (sees everything)
  const isOwner = !!oauthUser && !staffUser;
  // Staff admin role: always show all items regardless of permissions query result
  const isStaffAdmin = staffUser?.role === "admin";

  const isItemVisible = (permissionKey: string, adminOnly?: boolean) => {
    // Manus OAuth owner sees everything
    if (isOwner) return true;
    // Admin role staff sees everything — no permissions query needed
    if (isStaffAdmin) return true;
    // While staffUser or permissions are still loading, show everything (no flash-hide)
    if (staffLoading || permissionsLoading || !staffUser) return true;
    // permissions === null means the role had no permissions row — show all as fallback
    if (!permissions) return true;
    const perms = permissions as Record<string, boolean>;
    // adminOnly items require explicit true
    if (adminOnly) return perms[permissionKey] === true;
    // Regular items: hidden only if explicitly set to false
    return perms[permissionKey] !== false;
  };

  const toggleGroup = (key: string) => {
    setExpandedGroups(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <nav className="flex-1 py-4 space-y-0.5 px-2 overflow-y-auto">
      {NAV_ITEMS.map((item) => {
        if (!isItemVisible(item.permissionKey, item.adminOnly)) return null;

        // Item with sub-items: render as collapsible group
        if (item.subItems && item.subItems.length > 0) {
          const isGroupActive =
            location === item.href ||
            location.startsWith(item.href + "/") ||
            item.subItems.some(
              (sub) => location === sub.href || location.startsWith(sub.href + "/")
            );
          const isExpanded = expandedGroups[item.permissionKey] ?? isGroupActive;

          // Visible sub-items
          const visibleSubs = item.subItems.filter((sub) =>
            isItemVisible(sub.permissionKey)
          );

          return (
            <div key={item.href}>
              {/* Parent row: clicking navigates AND toggles sub-items */}
              <div className="flex items-center gap-1">
                <Link href={item.href}>
                  <a
                    onClick={() => mobile && setMobileOpen(false)}
                    className={`flex-1 flex items-center gap-3 px-2 py-2.5 rounded-lg text-sm transition-colors group ${
                      isGroupActive
                        ? "bg-[oklch(0.55_0.15_145)] text-white"
                        : "text-white/60 hover:bg-white/10 hover:text-white"
                    }`}
                    title={collapsed && !mobile ? item.label : undefined}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    {(!collapsed || mobile) && (
                      <div className="overflow-hidden flex-1">
                        <p className="font-medium leading-tight truncate">{item.label}</p>
                        <p className="text-[10px] text-white/40 leading-tight truncate group-hover:text-white/60">
                          {item.description}
                        </p>
                      </div>
                    )}
                  </a>
                </Link>
                {/* Expand/collapse chevron — only show when sidebar is expanded */}
                {(!collapsed || mobile) && visibleSubs.length > 0 && (
                  <button
                    onClick={() => toggleGroup(item.permissionKey)}
                    className="p-1.5 rounded text-white/40 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                    title={isExpanded ? "Collapse" : "Expand"}
                  >
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isExpanded ? "rotate-0" : "-rotate-90"
                      }`}
                    />
                  </button>
                )}
              </div>
              {/* Sub-items */}
              {isExpanded && (!collapsed || mobile) && visibleSubs.map((sub) => {
                const subActive = location === sub.href || location.startsWith(sub.href + "/");
                return (
                  <Link key={sub.href} href={sub.href}>
                    <a
                      onClick={() => mobile && setMobileOpen(false)}
                      className={`flex items-center gap-3 pl-7 pr-2 py-2 rounded-lg text-sm transition-colors group ml-1 mt-0.5 ${
                        subActive
                          ? "bg-[oklch(0.45_0.12_145)] text-white"
                          : "text-white/50 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <sub.icon className="w-3.5 h-3.5 shrink-0" />
                      <div className="overflow-hidden">
                        <p className="font-medium leading-tight truncate text-xs">{sub.label}</p>
                        <p className="text-[10px] text-white/30 leading-tight truncate group-hover:text-white/50">
                          {sub.description}
                        </p>
                      </div>
                    </a>
                  </Link>
                );
              })}
              {/* Collapsed state: show sub-items as icon-only */}
              {collapsed && !mobile && visibleSubs.map((sub) => {
                const subActive = location === sub.href || location.startsWith(sub.href + "/");
                return (
                  <Link key={sub.href} href={sub.href}>
                    <a
                      className={`flex items-center justify-center py-2 rounded-lg transition-colors mt-0.5 ${
                        subActive
                          ? "bg-[oklch(0.45_0.12_145)] text-white"
                          : "text-white/40 hover:bg-white/10 hover:text-white"
                      }`}
                      title={sub.label}
                    >
                      <sub.icon className="w-3.5 h-3.5" />
                    </a>
                  </Link>
                );
              })}
            </div>
          );
        }

        // Simple nav item
        const active = location === item.href || location.startsWith(item.href + "/");
        return (
          <Link key={item.href} href={item.href}>
            <a
              onClick={() => mobile && setMobileOpen(false)}
              className={`flex items-center gap-3 px-2 py-2.5 rounded-lg text-sm transition-colors group ${
                active
                  ? "bg-[oklch(0.55_0.15_145)] text-white"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
              title={collapsed && !mobile ? item.label : undefined}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {(!collapsed || mobile) && (
                <div className="overflow-hidden">
                  <p className="font-medium leading-tight truncate">{item.label}</p>
                  <p className="text-[10px] text-white/40 leading-tight truncate group-hover:text-white/60">
                    {item.description}
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
      {staffUser ? (
        <button
          onClick={() => staffLogout.mutate()}
          className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-xs text-white/40 hover:text-white/70 hover:bg-white/10 transition-colors text-left"
          title={collapsed && !mobile ? "Sign out" : undefined}
        >
          <LogOut className="w-3.5 h-3.5 shrink-0" />
          {(!collapsed || mobile) && (
            <span className="truncate">Sign out {staffUser.firstName}</span>
          )}
        </button>
      ) : oauthUser ? (
        <button
          onClick={() => logout()}
          className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-xs text-white/40 hover:text-white/70 hover:bg-white/10 transition-colors text-left"
          title={collapsed && !mobile ? "Sign out" : undefined}
        >
          <LogOut className="w-3.5 h-3.5 shrink-0" />
          {(!collapsed || mobile) && (
            <span className="truncate">Sign out {oauthUser.name?.split(" ")[0]}</span>
          )}
        </button>
      ) : null}
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

  // Show nothing while checking auth (avoids flash)
  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[oklch(0.18_0.04_155)]">
        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

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
