/* ============================================================
   NAVBAR — White/Bright Editorial
   
   Design language:
   - Bright white/cream bar — high contrast against dark hero
   - Huge centered logo that bleeds above the bar
   - Nav links in deep forest green, bold
   - "Get a Quote" pill in deep green with cream text
   - On hover over "Maintenance" or "Services", a full-width
     MEGA MENU drops down with editorial photo + massive type
   - Scroll: bar gains slight shadow, stays white
   ============================================================ */
import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Menu, X, Phone, ArrowRight, ChevronDown } from "lucide-react";

const LOGO_NAV =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/logo-nav-tight_c562b49c.png";

const maintenanceItems = [
  { label: "Lawn Service", href: "/services/lawn-service", num: "01" },
  { label: "Commercial & HOA", href: "/commercial", num: "02" },
  { label: "Aeration Services", href: "/services/aeration", num: "03" },
  { label: "Spring Activation", href: "/services/sprinkler-activation", num: "04" },
  { label: "Sprinkler Blowout", href: "/services/sprinkler-blowout", num: "05" },
  { label: "Snow Removal", href: "/services/snow-removal", num: "06" },
  { label: "Lawn Fungus Treatment", href: "/services/lawn-fungus", num: "07" },
];

const servicesItems = [
  { label: "Landscape Design", href: "/services/landscape-design", num: "01" },
  { label: "Irrigation Installation", href: "/services/irrigation", num: "02" },
  { label: "Sprinkler Repair", href: "/services/sprinkler-repair", num: "03" },
  { label: "Paver Patios & Walkways", href: "/services/pavers", num: "04" },
  { label: "Water Features", href: "/services/water-features", num: "05" },
  { label: "Outdoor Kitchens", href: "/services/outdoor-living", num: "06" },
  { label: "Fire Pits & Fireplaces", href: "/services/fire-features", num: "07" },
  { label: "Landscape Lighting", href: "/services/landscape-lighting", num: "08" },
  { label: "Xeriscaping", href: "/services/xeriscaping", num: "09" },
];

// Maintenance mega menu — lush residential lawn maintenance photo
const MEGA_PHOTO_MAINTENANCE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/maintenance-hero-bg_a7f3c2e1.jpg";
// Services mega menu — Discovery West Plaza commercial installation (polished hardscape)
const MEGA_PHOTO_SERVICES =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/DiscoveryWestPlazaHiResPhotos55_79ba9dd5.jpg";

function MegaMenuItem({
  item,
  onNavigate,
}: {
  item: { label: string; href: string; num: string };
  onNavigate: (href: string) => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={item.href}
      onClick={(e) => { e.preventDefault(); onNavigate(item.href); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        textAlign: "left",
        background: "none",
        border: "none",
        borderBottom: "1px solid oklch(0.92 0.006 75)",
        padding: "0.7rem 0",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        transition: "padding-left 0.2s ease",
        paddingLeft: hovered ? "0.5rem" : "0",
        textDecoration: "none",
      }}
    >
      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontSize: "0.65rem",
          color: "oklch(0.40 0.008 30)",
          minWidth: "24px",
          flexShrink: 0,
        }}
      >
        {item.num}
      </span>
      <span
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.68rem",
          fontWeight: hovered ? 700 : 500,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: hovered ? "oklch(0.18 0.008 30)" : "oklch(0.38 0.008 30)",
          transition: "color 0.15s ease, font-weight 0.15s ease",
          flex: 1,
        }}
      >
        {item.label}
      </span>
      <ArrowRight
        size={12}
        style={{
          color: "oklch(0.40 0.008 30)",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(0)" : "translateX(-6px)",
          transition: "opacity 0.2s ease, transform 0.2s ease",
        }}
       />
    </a>
  );
}
function MegaMenu({
  items,
  photo,
  headline,
  subline,
  onNavigate,
}: {
  items: { label: string; href: string; num: string }[];
  photo: string;
  headline: string;
  subline: string;
  onNavigate: (href: string) => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: "calc(28px + 96px)",
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: "oklch(0.98 0.005 90)",
        borderBottom: "3px solid oklch(0.46 0.20 25)",
        boxShadow: "0 24px 80px oklch(0 0 0 / 0.18)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        overflow: "hidden",
        animation: "megaMenuIn 0.25s ease forwards",
      }}
    >
      {/* Left: editorial photo panel */}
      <div style={{ position: "relative", minHeight: "360px", overflow: "hidden" }}>
        <img
          src={photo}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.65) saturate(0.85)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, oklch(0.10 0.006 30 / 0.75) 0%, transparent 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "2.5rem",
            right: "2rem",
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              color: "oklch(0.92 0.06 25)",
              textTransform: "uppercase",
              marginBottom: "0.5rem",
            }}
          >
            {subline}
          </p>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              lineHeight: 0.9,
              color: "oklch(0.97 0.01 75)",
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              whiteSpace: "pre-line",
            }}
          >
            {headline}
          </h3>
        </div>
        {/* Green corner accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "4px",
            height: "100%",
            background: "linear-gradient(180deg, oklch(0.46 0.20 25) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Right: numbered list */}
      <div
        style={{
          padding: "2rem 3rem",
          borderLeft: "1px solid oklch(0.90 0.006 75)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "oklch(0.98 0.005 90)",
        }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <div
            style={{
              display: "flex",
              gap: "4px",
              marginBottom: "1.5rem",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  width: i === 0 ? "24px" : "6px",
                  height: "2px",
                  backgroundColor: i === 0 ? "oklch(0.46 0.20 25)" : "oklch(0.88 0.006 75)",
                  display: "block",
                }}
              />
            ))}
          </div>
          {items.map((item) => (
            <MegaMenuItem key={item.href} item={item} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [location, navigate] = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const megaTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const inNav = navRef.current?.contains(e.target as Node);
      const inMega = megaMenuRef.current?.contains(e.target as Node);
      if (!inNav && !inMega) {
        setOpenMega(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goTo = (href: string) => {
    setMobileOpen(false);
    setOpenMega(null);
    navigate(href);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMegaEnter = (name: string) => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    setOpenMega(name);
  };

  const handleMegaLeave = () => {
    // 600ms gives users ample time to move mouse from nav trigger into the dropdown
    megaTimeoutRef.current = setTimeout(() => setOpenMega(null), 600);
  };

  const isActive = (href: string) =>
    location === href || location.startsWith(href + "/");

  return (
    <>
      <style>{`
        @keyframes megaMenuIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Utility bar — bright cream strip at very top ── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: "oklch(0.97 0.006 75)",
          borderBottom: "1px solid oklch(0.90 0.006 75)",
          height: "28px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.52rem",
              fontWeight: 500,
              letterSpacing: "0.14em",
              color: "oklch(0.38 0.008 30)",
              textTransform: "uppercase",
            }}
          >
            64625 N. HWY 97, Bend, OR &nbsp;·&nbsp; Visits by Appointment Only
          </span>
          <a
            href="tel:5416178873"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <Phone size={10} style={{ color: "oklch(0.46 0.20 25)" }} />
            <span
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.58rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "oklch(0.18 0.008 30)",
              }}
            >
              (541) 617-8873
            </span>
          </a>
        </div>
      </div>

      {/* ── Main nav — bright white/cream ── */}
      <nav
        ref={navRef}
        style={{
          position: "fixed",
          top: "28px",
          left: 0,
          right: 0,
          zIndex: 49,
          backgroundColor: scrolled
            ? "oklch(1 0 0 / 0.97)"
            : "oklch(1 0 0)",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          boxShadow: scrolled
            ? "0 4px 32px oklch(0.18 0.008 30 / 0.14)"
            : "0 2px 0 oklch(0.90 0.006 75 / 0.5)",
          borderBottom: "1.5px solid oklch(0.90 0.006 75)",
          transition: "background-color 0.3s ease, box-shadow 0.3s ease",
          overflow: "visible",
        }}
      >
        {/* Desktop nav */}
        <div
          className="hidden md:flex"
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: "160px",
            padding: "0 2.5rem",
            position: "relative",
            zIndex: 2,
            overflow: "visible",
          }}
        >
          {/* ── Left cluster ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "2.5rem", flex: 1 }}>
            <NavTextLink
              label="About"
              href="/about"
              active={isActive("/about")}
              onClick={() => goTo("/about")}
            />
            <NavTextLink
              label="Our Work"
              href="/our-work"
              active={isActive("/our-work")}
              onClick={() => goTo("/our-work")}
            />
            <div
              onMouseEnter={() => handleMegaEnter("maintenance")}
              onMouseLeave={handleMegaLeave}
              style={{ position: "relative" }}
            >
              <NavTextLink
                label="Maintenance"
                href="/maintenance"
                active={openMega === "maintenance" || isActive("/maintenance")}
                onClick={() => goTo("/maintenance")}
                hasArrow
                arrowOpen={openMega === "maintenance"}
              />
            </div>
          </div>

          {/* ── Centered logo — HUGE, bleeds above bar ── */}
          <div
            style={{
              flexShrink: 0,
              width: "320px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); goTo("/"); }}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "block", textDecoration: "none" }}
            >
              <img
                src={LOGO_NAV}
                alt="Newport Avenue Landscaping — Bend, Oregon Landscaping Company"
                style={{
                  height: "150px",
                  width: "auto",
                  objectFit: "contain",
                  display: "block",
                  position: "relative",
                  zIndex: 60,
                  filter: "drop-shadow(0 4px 18px oklch(0.18 0.008 30 / 0.15))",
                }}
              />
            </a>
          </div>

          {/* ── Right cluster ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "2.5rem", flex: 1, justifyContent: "flex-end" }}>
            <div
              onMouseEnter={() => handleMegaEnter("services")}
              onMouseLeave={handleMegaLeave}
              style={{ position: "relative" }}
            >
              <NavTextLink
                label="Services"
                href="/services"
                active={openMega === "services" || isActive("/services")}
                onClick={() => goTo("/services")}
                hasArrow
                arrowOpen={openMega === "services"}
              />
            </div>
            <NavTextLink
              label="Commercial"
              href="/commercial"
              active={isActive("/commercial")}
              onClick={() => goTo("/commercial")}
            />
            <NavTextLink
              label="Resources"
              href="/resources"
              active={isActive("/resources")}
              onClick={() => goTo("/resources")}
            />
            <NavTextLink
              label="Service Areas"
              href="/service-areas"
              active={isActive("/service-areas")}
              onClick={() => goTo("/service-areas")}
            />
            {/* Get a Quote — pill CTA, brand red */}
            <a
              href="/contact"
              onClick={(e) => { e.preventDefault(); goTo("/contact"); }}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.58rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "oklch(1 0 0)",
                backgroundColor: "oklch(0.46 0.20 25)",
                padding: "0.65rem 1.6rem",
                borderRadius: "1.8rem 0.2rem 1.8rem 0.2rem",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                transition: "background-color 0.2s ease, transform 0.15s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "oklch(0.36 0.18 25)";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "oklch(0.46 0.20 25)";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              }}
            >
              GET A QUOTE
              <ArrowRight size={11} />
            </a>
          </div>
        </div>

        {/* Mobile nav bar */}
        <div
          className="flex md:hidden"
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: "68px",
            padding: "0 1.25rem",
            position: "relative",
            zIndex: 2,
          }}
        >
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: "oklch(0.22 0.008 30)", background: "none", border: "none", cursor: "pointer", padding: "0.25rem" }}
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
              style={{ height: "44px", width: "auto", objectFit: "contain" }}
            />
          </button>

          <a
            href="tel:5416178873"
            style={{ color: "oklch(0.22 0.008 30)", display: "flex", alignItems: "center" }}
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
            backgroundColor: "oklch(0.98 0.005 90)",
            borderTop: mobileOpen ? "1px solid oklch(0.90 0.006 75)" : "none",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div style={{ padding: "1rem 1.5rem 2rem" }}>
            {(
              [
                { label: "About", href: "/about" },
                { label: "Our Work", href: "/our-work" },
                { label: "Maintenance", href: "/maintenance", dropdown: maintenanceItems },
                { label: "Services", href: "/services", dropdown: servicesItems },
                { label: "Commercial", href: "/commercial" },
                { label: "Resources", href: "/resources" },
                { label: "Service Areas", href: "/service-areas" },
              ] as Array<{ label: string; href: string; dropdown?: { label: string; href: string; num: string }[] }>
            ).map((item) => (
              <div key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    if (item.dropdown) {
                      e.preventDefault();
                      setMobileExpanded(mobileExpanded === item.label ? null : item.label);
                    } else {
                      e.preventDefault();
                      goTo(item.href);
                    }
                  }}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "0.9rem 0",
                    background: "none",
                    border: "none",
                    borderBottom: "1px solid oklch(0.90 0.006 75)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "oklch(0.22 0.008 30)",
                    textDecoration: "none",
                  }}
                >
                  {item.label}
                  {item.dropdown && (
                    <ChevronDown
                      size={14}
                      style={{
                        color: "oklch(0.40 0.008 30)",
                        transform: mobileExpanded === item.label ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s",
                      }}
                    />
                  )}
                </a>

                {item.dropdown && mobileExpanded === item.label && (
                  <div style={{ paddingLeft: "1rem", paddingBottom: "0.5rem" }}>
                    {item.dropdown.map((sub) => (
                      <a
                        key={sub.href}
                        href={sub.href}
                        onClick={(e) => { e.preventDefault(); goTo(sub.href); }}
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
                          color: "oklch(0.38 0.008 30)",
                          borderBottom: "1px solid oklch(0.92 0.006 75)",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          textDecoration: "none",
                        }}
                      >
                        <span style={{ color: "oklch(0.40 0.008 30)", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
                          {sub.num}
                        </span>
                        {sub.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

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
            borderRadius: "8px",
            textDecoration: "none",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            color: "oklch(1 0 0)",
                textTransform: "uppercase",
              }}
            >
              <Phone size={14} />
              Call (541) 617-8873
            </a>
          </div>
        </div>
      </nav>

      {/* ── Mega menus ── */}
      {/* Single stable overlay: pointerEvents none on full screen, auto only on
          a tall invisible strip from nav bar top through menu bottom. This eliminates
          the gap that caused glitchy close-on-mouse-move behavior. */}
      {openMega && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 48,
            pointerEvents: "none",
          }}
        >
          {/* Tall interactive zone: from page top through nav bar + full menu height */}
          <div
            ref={megaMenuRef}
            onMouseEnter={() => handleMegaEnter(openMega)}
            onMouseLeave={handleMegaLeave}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "calc(28px + 96px + 400px)",
              pointerEvents: "auto",
            }}
          >
            {/* Menu panel rendered inside the interactive zone — no gap possible */}
            {openMega === "maintenance" && (
              <MegaMenu
                items={maintenanceItems}
                photo={MEGA_PHOTO_MAINTENANCE}
                headline={"Year-Round\nCare"}
                subline="Maintenance Programs"
                onNavigate={goTo}
              />
            )}
            {openMega === "services" && (
              <MegaMenu
                items={servicesItems}
                photo={MEGA_PHOTO_SERVICES}
                headline={"Transform\nYour Space"}
                subline="Installation Services"
                onNavigate={goTo}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

/* ── Reusable nav text link ── */
function NavTextLink({
  label,
  href,
  active,
  onClick,
  hasArrow,
  arrowOpen,
}: {
  label: string;
  href?: string;
  active?: boolean;
  onClick: () => void;
  hasArrow?: boolean;
  arrowOpen?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const sharedStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    padding: "0.25rem 0",
    cursor: "pointer",
    position: "relative",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.6rem",
    fontWeight: 700,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: active
      ? "oklch(0.22 0.008 30)"
      : hovered
      ? "oklch(0.22 0.008 30)"
      : "oklch(0.35 0.008 30)",
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
    transition: "color 0.15s ease",
    textDecoration: "none",
  };
  const inner = (
    <>
      {label}
      {hasArrow && (
        <ChevronDown
          size={11}
          style={{
            transform: arrowOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        />
      )}
      {/* Underline indicator */}
      <span
        style={{
          position: "absolute",
          bottom: "-2px",
          left: 0,
          right: 0,
          height: "2px",
          backgroundColor: "oklch(0.40 0.008 30)",
          transform: active || hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.2s ease",
        }}
      />
    </>
  );
  if (href) {
    return (
      <a
        href={href}
        onClick={(e) => { e.preventDefault(); onClick(); }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={sharedStyle}
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={sharedStyle}
    >
      {inner}
    </button>
  );
}
