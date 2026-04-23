/* ============================================================
   ADMIN LAYOUT
   Standalone dark-sidebar layout for all /admin/* pages.
   Completely isolated from the public site navbar.
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
} from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  {
    label: "Leads",
    href: "/admin/submissions",
    icon: Users,
    description: "All inquiries",
  },
  {
    label: "Daily Pulse",
    href: "/admin/daily-pulse",
    icon: BarChart2,
    description: "Today's insights",
  },
  {
    label: "Lead Trends",
    href: "/admin/lead-trends",
    icon: TrendingUp,
    description: "Volume over time",
  },
  {
    label: "Geo Map",
    href: "/admin/geo-intelligence",
    icon: Map,
    description: "Inquiry map",
  },
  {
    label: "CSV Import",
    href: "/admin/csv-import",
    icon: Upload,
    description: "Import data",
  },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [location] = useLocation();
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen bg-[oklch(0.97_0.005_120)] overflow-hidden">
      {/* ── Sidebar ── */}
      <aside
        className={`flex flex-col bg-[oklch(0.18_0.04_155)] text-white transition-all duration-200 shrink-0 ${
          collapsed ? "w-16" : "w-56"
        }`}
      >
        {/* Logo / Brand */}
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

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-0.5 px-2 overflow-y-auto">
          {NAV_ITEMS.map(({ label, href, icon: Icon, description }) => {
            const active = location === href || location.startsWith(href + "/");
            return (
              <Link key={href} href={href}>
                <a
                  className={`flex items-center gap-3 px-2 py-2.5 rounded-lg text-sm transition-colors group ${
                    active
                      ? "bg-[oklch(0.55_0.15_145)] text-white"
                      : "text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                  title={collapsed ? label : undefined}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!collapsed && (
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

        {/* Footer: user + logout */}
        <div className="border-t border-white/10 p-3 space-y-1">
          {/* Back to site */}
          <a
            href="/"
            className="flex items-center gap-2 px-2 py-2 rounded-lg text-xs text-white/40 hover:text-white/70 hover:bg-white/10 transition-colors"
            title={collapsed ? "Public site" : undefined}
          >
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            {!collapsed && <span>Back to site</span>}
          </a>

          {/* User info + logout */}
          {user && (
            <button
              onClick={() => logout()}
              className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-xs text-white/40 hover:text-white/70 hover:bg-white/10 transition-colors text-left"
              title={collapsed ? "Sign out" : undefined}
            >
              <LogOut className="w-3.5 h-3.5 shrink-0" />
              {!collapsed && (
                <span className="truncate">Sign out {user.name?.split(" ")[0]}</span>
              )}
            </button>
          )}

          {/* Collapse toggle */}
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
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
