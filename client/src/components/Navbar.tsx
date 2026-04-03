/* ============================================================
   NAVBAR — Southview-Inspired with Dropdown Menus
   Design: Dark charcoal nav bar. Logo centered as the anchor.
   Nav links split symmetrically left and right of the logo.
   Thin red utility bar at very top with address/phone.
   Dropdowns under Services and Maintenance.
   ============================================================ */
import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

const LOGO_NAV =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/newport-logo-nav-v3_456c5ad6.png";

const maintenanceItems = [
  { label: "Lawn Service", href: "/services/lawn-service" },
  { label: "Commercial & HOA Maintenance", href: "/services/commercial-maintenance" },
  { label: "Aeration Services", href: "/services/aeration" },
  { label: "Spring Activation", href: "/services/sprinkler-activation" },
  { label: "Sprinkler Blowout", href: "/services/sprinkler-blowout" },
  { label: "Snow Removal", href: "/services/snow-removal" },
  { label: "Lawn Fungus Treatment", href: "/services/lawn-fungus" },
];

const servicesItems = [
  { label: "Landscape Architecture & Design", href: "/services/landscape-design" },
  { label: "Irrigation Installation", href: "/services/irrigation" },
  { label: "Sprinkler Repair & Backflow", href: "/services/sprinkler-repair" },
  { label: "Paver Patios & Walkways", href: "/services/pavers" },
  { label: "Water Features", href: "/services/water-features" },
  { label: "Outdoor Kitchens & Living", href: "/services/outdoor-living" },
  { label: "Fire Pits & Fireplaces", href: "/services/fire-features" },
  { label: "Landscape Lighting", href: "/services/landscape-lighting" },
  { label: "Xeriscaping", href: "/services/xeriscaping" },
];

const navLeft = [
  { label: "About", href: "/about" },
  { label: "Our Work", href: "/our-work" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const navRight = [
  { label: "Maintenance", href: "/maintenance", dropdown: maintenanceItems },
  { label: "Install", href: "/install" },
  { label: "Services", href: "/services", dropdown: servicesItems },
];

function DropdownMenu({ items, onNavigate }: { items: { label: string; href: string }[]; onNavigate: (href: string) => void }) {
  return (
    <div
      className="absolute top-full left-1/2 min-w-[240px] py-2 z-50"
      style={{
        transform: "translateX(-50%)",
        backgroundColor: "oklch(0.12 0.004 0)",
        borderTop: "2px solid oklch(0.46 0.20 25)",
        boxShadow: "0 12px 32px oklch(0 0 0 / 0.5)",
      }}
    >
      {items.map((item) => (
        <button
          key={item.href}
          onClick={() => onNavigate(item.href)}
          className="w-full text-left px-5 py-2.5 font-nav transition-colors duration-150"
          style={{ color: "oklch(0.78 0.003 0)", fontSize: "0.68rem", letterSpacing: "0.08em" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "oklch(0.72 0.12 25)";
            e.currentTarget.style.backgroundColor = "oklch(0.18 0.004 0)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "oklch(0.78 0.003 0)";
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [location, navigate] = useLocation();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goTo = (href: string) => {
    setMobileOpen(false);
    setOpenDropdown(null);
    navigate(href);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* ── Utility bar ── */}
      <div
        className="fixed top-0 left-0 right-0 z-50"
        style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
      >
        <div className="container flex items-center justify-between py-2">
          <span className="font-label text-white" style={{ fontSize: "0.65rem", opacity: 0.85 }}>
            Visits by Appointment Only &nbsp;·&nbsp; 64625 N. HWY 97, Bend, OR
          </span>
          <a
            href="tel:5416178873"
            className="font-label text-white flex items-center gap-2 group"
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            <span style={{ fontSize: "0.65rem", opacity: 0.85, letterSpacing: "0.05em" }}>For Service Call:</span>
            <span
              className="flex items-center gap-1.5"
              style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.04em", textDecoration: "underline", textUnderlineOffset: "3px", textDecorationColor: "rgba(255,255,255,0.5)" }}
            >
              <Phone size={13} />
              (541) 617-8873
            </span>
          </a>
        </div>
      </div>

      {/* ── Main nav ── */}
      <nav
        ref={navRef}
        className="fixed left-0 right-0 z-40 transition-shadow duration-300"
        style={{
          top: "28px",
          backgroundColor: "oklch(0.15 0.005 0)",
          boxShadow: scrolled ? "0 4px 24px oklch(0 0 0 / 0.35)" : "none",
        }}
      >
        {/* Desktop nav */}
        <div className="hidden md:flex flex-col items-center justify-center px-8" style={{ minHeight: "300px" }}>
          <div className="flex items-center justify-between w-full">

            {/* Left links */}
            <div
              className="flex items-center gap-8 flex-1"
              style={{ borderTop: "1px solid rgba(255,255,255,0.3)", borderBottom: "1px solid rgba(255,255,255,0.3)", padding: "14px 0" }}
            >
              {navLeft.map((item) => (
                <button
                  key={item.label}
                  onClick={() => goTo(item.href)}
                  className="font-nav transition-colors duration-200"
                  style={{ color: location === item.href ? "oklch(0.72 0.12 25)" : "oklch(0.82 0.003 0)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.72 0.12 25)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = location === item.href ? "oklch(0.72 0.12 25)" : "oklch(0.82 0.003 0)")}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => goTo("/contact")}
                className="btn-red ml-auto"
                style={{ fontSize: "0.62rem", padding: "0.45rem 1.1rem" }}
              >
                Get a Quote
              </button>
            </div>

            {/* Centered logo */}
            <div className="flex-shrink-0 mx-8" style={{ width: "340px", display: "flex", justifyContent: "center" }}>
              <button onClick={() => goTo("/")}>
                <img
                  src={LOGO_NAV}
                  alt="Newport Avenue Landscaping"
                  style={{ height: "260px", width: "auto", objectFit: "contain", display: "block", marginTop: "-105px" }}
                />
              </button>
            </div>

            {/* Right links with dropdowns */}
            <div
              className="flex items-center gap-8 flex-1 justify-end"
              style={{ borderTop: "1px solid rgba(255,255,255,0.3)", borderBottom: "1px solid rgba(255,255,255,0.3)", padding: "14px 0" }}
            >
              {navRight.map((item) => (
                <div key={item.label} className="relative">
                  {item.dropdown ? (
                    <button
                      className="font-nav transition-colors duration-200 flex items-center gap-1"
                      style={{ color: openDropdown === item.label || location.startsWith(item.href) ? "oklch(0.72 0.12 25)" : "oklch(0.82 0.003 0)" }}
                      onMouseEnter={(e) => {
                        setOpenDropdown(item.label);
                        (e.currentTarget as HTMLElement).style.color = "oklch(0.72 0.12 25)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color = openDropdown === item.label || location.startsWith(item.href) ? "oklch(0.72 0.12 25)" : "oklch(0.82 0.003 0)";
                      }}
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    >
                      {item.label}
                      <ChevronDown
                        size={11}
                        style={{
                          transition: "transform 0.2s",
                          transform: openDropdown === item.label ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      />
                    </button>
                  ) : (
                    <button
                      onClick={() => goTo(item.href)}
                      className="font-nav transition-colors duration-200"
                      style={{ color: location === item.href ? "oklch(0.72 0.12 25)" : "oklch(0.82 0.003 0)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.72 0.12 25)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = location === item.href ? "oklch(0.72 0.12 25)" : "oklch(0.82 0.003 0)")}
                    >
                      {item.label}
                    </button>
                  )}

                  {/* Dropdown panel */}
                  {item.dropdown && openDropdown === item.label && (
                    <div
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <DropdownMenu items={item.dropdown} onNavigate={goTo} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile nav bar */}
        <div className="flex md:hidden items-center justify-between px-4" style={{ minHeight: "72px" }}>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: "oklch(0.85 0.003 0)" }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <button onClick={() => goTo("/")}>
            <img
              src={LOGO_NAV}
              alt="Newport Avenue Landscaping"
              style={{ height: "44px", width: "auto", objectFit: "contain" }}
            />
          </button>

          <a href="tel:5416178873" className="flex items-center gap-1" style={{ color: "oklch(0.72 0.12 25)" }}>
            <Phone size={18} />
          </a>
        </div>

        {/* Mobile dropdown */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: mobileOpen ? "700px" : "0",
            backgroundColor: "oklch(0.12 0.004 0)",
          }}
        >
          <div className="px-6 py-4 flex flex-col gap-1">
            {navLeft.map((item) => (
              <button
                key={item.label}
                onClick={() => goTo(item.href)}
                className="font-nav text-left py-2.5 transition-colors duration-200"
                style={{ color: "oklch(0.80 0.003 0)" }}
              >
                {item.label}
              </button>
            ))}

            {/* Maintenance mobile group */}
            <button
              className="font-nav text-left py-2.5 flex items-center justify-between"
              style={{ color: "oklch(0.80 0.003 0)" }}
              onClick={() => setMobileExpanded(mobileExpanded === "Maintenance" ? null : "Maintenance")}
            >
              Maintenance
              <ChevronDown size={13} style={{ transform: mobileExpanded === "Maintenance" ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
            </button>
            {mobileExpanded === "Maintenance" && (
              <div className="pl-4 flex flex-col gap-1 mb-1">
                {maintenanceItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => goTo(item.href)}
                    className="font-nav text-left py-1.5"
                    style={{ color: "oklch(0.65 0.003 0)", fontSize: "0.68rem" }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={() => goTo("/install")}
              className="font-nav text-left py-2.5"
              style={{ color: "oklch(0.80 0.003 0)" }}
            >
              Install
            </button>

            {/* Services mobile group */}
            <button
              className="font-nav text-left py-2.5 flex items-center justify-between"
              style={{ color: "oklch(0.80 0.003 0)" }}
              onClick={() => setMobileExpanded(mobileExpanded === "Services" ? null : "Services")}
            >
              Services
              <ChevronDown size={13} style={{ transform: mobileExpanded === "Services" ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
            </button>
            {mobileExpanded === "Services" && (
              <div className="pl-4 flex flex-col gap-1 mb-1">
                {servicesItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => goTo(item.href)}
                    className="font-nav text-left py-1.5"
                    style={{ color: "oklch(0.65 0.003 0)", fontSize: "0.68rem" }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={() => goTo("/contact")}
              className="btn-red mt-3"
            >
              Start Service
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
