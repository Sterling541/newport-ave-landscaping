/* ============================================================
   NAVBAR — Premium Dark Forest Green
   - Thin red bottom border line (brand signature)
   - Animated slide-in underline on nav link hover
   - SVG noise texture overlay for depth
   - Logo with subtle drop shadow glow
   - Frosted glass-style dropdown with red top accent
   - Teal used NOWHERE — red + off-white only
   ============================================================ */
import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

const LOGO_NAV =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/newport-logo-nav-v3_456c5ad6.png";

const maintenanceItems = [
  { label: "Lawn Service", href: "/services/lawn-service" },
  { label: "Commercial & HOA Maintenance", href: "/commercial" },
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
];

const navRight = [
  { label: "Maintenance", href: "/maintenance", dropdown: maintenanceItems },
  { label: "Install", href: "/install" },
  { label: "Services", href: "/services", dropdown: servicesItems },
  { label: "Commercial", href: "/commercial" },
];

// Animated underline nav link
function NavLink({
  label,
  active,
  onClick,
  children,
}: {
  label?: string;
  active?: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "none",
        border: "none",
        padding: "0.25rem 0",
        cursor: "pointer",
        position: "relative",
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "0.62rem",
        fontWeight: 600,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: active ? "oklch(0.85 0.12 28)" : "oklch(0.82 0.003 0)",
        transition: "color 0.2s ease",
      }}
    >
      {children ?? label}
      {/* Animated underline */}
      <span
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "1px",
          backgroundColor: "oklch(0.46 0.20 25)",
          width: active ? "100%" : hovered ? "100%" : "0%",
          transition: "width 0.25s ease",
        }}
      />
    </button>
  );
}

function DropdownMenu({
  items,
  onNavigate,
}: {
  items: { label: string; href: string }[];
  onNavigate: (href: string) => void;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: "calc(100% + 14px)",
        left: "50%",
        transform: "translateX(-50%)",
        minWidth: "260px",
        zIndex: 50,
        backgroundColor: "oklch(0.13 0.022 155)",
        borderTop: "2px solid oklch(0.46 0.20 25)",
        borderBottom: "1px solid oklch(0.20 0.018 155)",
        borderLeft: "1px solid oklch(0.20 0.018 155)",
        borderRight: "1px solid oklch(0.20 0.018 155)",
        boxShadow:
          "0 20px 60px oklch(0 0 0 / 0.6), 0 4px 16px oklch(0 0 0 / 0.4)",
        backdropFilter: "blur(12px)",
        padding: "0.5rem 0",
      }}
    >
      {/* Tiny red dot row at top */}
      <div
        style={{
          display: "flex",
          gap: "4px",
          padding: "0.4rem 1.2rem 0.6rem",
          borderBottom: "1px solid oklch(0.18 0.018 155)",
          marginBottom: "0.25rem",
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              backgroundColor:
                i === 0
                  ? "oklch(0.46 0.20 25)"
                  : "oklch(0.25 0.008 200)",
            }}
          />
        ))}
      </div>

      {items.map((item) => (
        <DropdownItem key={item.href} item={item} onNavigate={onNavigate} />
      ))}
    </div>
  );
}

function DropdownItem({
  item,
  onNavigate,
}: {
  item: { label: string; href: string };
  onNavigate: (href: string) => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={() => onNavigate(item.href)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        textAlign: "left",
        padding: "0.55rem 1.2rem",
        background: hovered ? "oklch(0.18 0.022 155)" : "transparent",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
        transition: "background 0.15s ease",
      }}
    >
      {/* Red dash accent on hover */}
      <span
        style={{
          width: hovered ? "12px" : "0px",
          height: "1px",
          backgroundColor: "oklch(0.46 0.20 25)",
          flexShrink: 0,
          transition: "width 0.2s ease",
        }}
      />
      <span
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.62rem",
          fontWeight: 500,
          letterSpacing: "0.08em",
          color: hovered ? "oklch(0.93 0.003 0)" : "oklch(0.68 0.003 0)",
          transition: "color 0.15s ease",
        }}
      >
        {item.label}
      </span>
    </button>
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
        className="fixed top-0 left-0 right-0 z-30"
        style={{
          backgroundColor: "oklch(0.11 0.018 155)",
          borderBottom: "1px solid oklch(0.18 0.018 155)",
        }}
      >
        <div className="container flex items-center justify-between" style={{ padding: "0.45rem 0" }}>
          {/* Left: address */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
            <span
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.55rem",
                fontWeight: 500,
                letterSpacing: "0.12em",
                color: "oklch(0.50 0.003 0)",
                textTransform: "uppercase",
              }}
            >
              64625 N. HWY 97, Bend, OR
            </span>
            <span style={{ width: "1px", height: "10px", backgroundColor: "oklch(0.22 0.018 155)", display: "block" }} />
            <span
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.55rem",
                fontWeight: 500,
                letterSpacing: "0.12em",
                color: "oklch(0.50 0.003 0)",
                textTransform: "uppercase",
              }}
            >
              Visits by Appointment Only
            </span>
          </div>

          {/* Right: phone */}
          <a
            href="tel:5416178873"
            style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <Phone size={11} style={{ color: "oklch(0.46 0.20 25)" }} />
            <span
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "oklch(0.78 0.003 0)",
              }}
            >
              (541) 617-8873
            </span>
          </a>
        </div>
      </div>

      {/* ── Main nav ── */}
      <nav
        ref={navRef}
        className="fixed left-0 right-0 z-40 transition-all duration-300"
        style={{
          top: "28px",
          backgroundColor: scrolled
            ? "oklch(0.14 0.022 155 / 0.98)"
            : "oklch(0.16 0.022 155)",
          boxShadow: scrolled
            ? "0 4px 32px oklch(0 0 0 / 0.5)"
            : "none",
          borderBottom: "1px solid oklch(0.46 0.20 25 / 0.35)",
          overflow: "visible",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        {/* SVG noise texture overlay */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            opacity: 0.04,
            zIndex: 0,
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="navNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#navNoise)" />
        </svg>

        {/* Thin red bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: "linear-gradient(90deg, transparent 0%, oklch(0.46 0.20 25) 20%, oklch(0.55 0.22 25) 50%, oklch(0.46 0.20 25) 80%, transparent 100%)",
            zIndex: 1,
          }}
        />

        {/* Desktop nav */}
        <div
          className="hidden md:flex items-center justify-between px-8"
          style={{ minHeight: "88px", overflow: "visible", position: "relative", zIndex: 2 }}
        >
          {/* Left links */}
          <div className="flex items-center gap-10 flex-1">
            {navLeft.map((item) => (
              <NavLink
                key={item.label}
                label={item.label}
                active={location === item.href}
                onClick={() => goTo(item.href)}
              />
            ))}
          </div>

          {/* Centered logo */}
          <div
            style={{
              flexShrink: 0,
              width: "320px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => goTo("/")}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              <img
                src={LOGO_NAV}
                alt="Newport Avenue Landscaping"
                style={{
                  height: "190px",
                  width: "auto",
                  objectFit: "contain",
                  display: "block",
                  marginTop: "-55px",
                  position: "relative",
                  zIndex: 60,
                  filter: "drop-shadow(0 4px 20px oklch(0 0 0 / 0.6))",
                }}
              />
            </button>
          </div>

          {/* Right links */}
          <div className="flex items-center gap-10 flex-1 justify-end">
            {navRight.map((item) => (
              <div key={item.label} style={{ position: "relative" }}>
                {item.dropdown ? (
                  <>
                    <NavLink
                      active={openDropdown === item.label || location.startsWith(item.href)}
                      onClick={() =>
                        setOpenDropdown(openDropdown === item.label ? null : item.label)
                      }
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                        {item.label}
                        <ChevronDown
                          size={10}
                          style={{
                            transition: "transform 0.2s",
                            transform:
                              openDropdown === item.label
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                            marginTop: "1px",
                          }}
                        />
                      </span>
                    </NavLink>
                    {openDropdown === item.label && (
                      <div
                        onMouseEnter={() => setOpenDropdown(item.label)}
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        <DropdownMenu items={item.dropdown} onNavigate={goTo} />
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink
                    label={item.label}
                    active={location === item.href}
                    onClick={() => goTo(item.href)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile nav bar */}
        <div
          className="flex md:hidden items-center justify-between px-4"
          style={{ minHeight: "68px", position: "relative", zIndex: 2 }}
        >
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: "oklch(0.82 0.003 0)", background: "none", border: "none", cursor: "pointer" }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <button
            onClick={() => goTo("/")}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            <img
              src={LOGO_NAV}
              alt="Newport Avenue Landscaping"
              style={{ height: "42px", width: "auto", objectFit: "contain" }}
            />
          </button>

          <a
            href="tel:5416178873"
            style={{ color: "oklch(0.46 0.20 25)", display: "flex", alignItems: "center" }}
          >
            <Phone size={18} />
          </a>
        </div>

        {/* Mobile dropdown */}
        <div
          className="md:hidden"
          style={{
            maxHeight: mobileOpen ? "80vh" : "0",
            overflow: "hidden",
            transition: "max-height 0.35s ease",
            backgroundColor: "oklch(0.12 0.018 155)",
            borderTop: mobileOpen ? "1px solid oklch(0.20 0.018 155)" : "none",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div style={{ padding: "1rem 1.5rem 2rem" }}>
            {([...navLeft, ...navRight] as Array<{ label: string; href: string; dropdown?: { label: string; href: string }[] }>).map((item) => (
              <div key={item.label}>
                <button
                  onClick={() => {
                    if ("dropdown" in item && item.dropdown) {
                      setMobileExpanded(mobileExpanded === item.label ? null : item.label);
                    } else {
                      goTo(item.href);
                    }
                  }}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "0.9rem 0",
                    background: "none",
                    border: "none",
                    borderBottom: "1px solid oklch(0.18 0.018 155)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "oklch(0.80 0.003 0)",
                  }}
                >
                  {item.label}
                  {"dropdown" in item && item.dropdown && (
                    <ChevronDown
                      size={14}
                      style={{
                        transition: "transform 0.2s",
                        transform:
                          mobileExpanded === item.label
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        color: "oklch(0.46 0.20 25)",
                      }}
                    />
                  )}
                </button>

                {"dropdown" in item && item.dropdown && mobileExpanded === item.label && (
                  <div style={{ paddingLeft: "1rem", paddingBottom: "0.5rem" }}>
                    {item.dropdown.map((sub) => (
                      <button
                        key={sub.href}
                        onClick={() => goTo(sub.href)}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          padding: "0.6rem 0",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontFamily: "'Montserrat', sans-serif",
                          fontSize: "0.62rem",
                          fontWeight: 500,
                          letterSpacing: "0.08em",
                          color: "oklch(0.58 0.003 0)",
                          borderBottom: "1px solid oklch(0.16 0.018 155)",
                        }}
                      >
                        — {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile CTA */}
            <a
              href="tel:5416178873"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                marginTop: "1.5rem",
                padding: "0.9rem",
                backgroundColor: "oklch(0.46 0.20 25)",
                textDecoration: "none",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: "oklch(0.97 0.012 75)",
                textTransform: "uppercase",
              }}
            >
              <Phone size={14} />
              Call (541) 617-8873
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
