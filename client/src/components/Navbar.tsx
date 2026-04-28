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
import { Menu, X, Phone, ArrowRight, ChevronDown, Calendar, Leaf } from "lucide-react";

const LOGO_NAV =
  "/manus-storage/logo-nav-tight_c562b49c_e4c4ae0c.webp";

const maintenanceItems = [
  { label: "Lawn Service", href: "/services/lawn-service", num: "01" },
  { label: "Commercial & HOA", href: "/maintenance/commercial-hoa", num: "02" },
  { label: "Aeration Services", href: "/services/aeration", num: "03" },
  { label: "Spring Activation", href: "/services/sprinkler-activation", num: "04" },
  { label: "Sprinkler Blowout", href: "/services/sprinkler-blowout", num: "05" },
  { label: "Snow Removal", href: "/services/snow-removal", num: "06" },
  { label: "Lawn Fungus Treatment", href: "/services/lawn-fungus", num: "07" },
  { label: "Spray & Prune Opt-Out", href: "/opt-out", num: "08" },
];

const servicesItems = [
  { label: "Landscape Design", href: "/services/landscape-design", num: "01" },
  { label: "Irrigation Installation", href: "/services/irrigation", num: "02" },
  { label: "Sprinkler Repair", href: "/services/sprinkler-repair", num: "03" },
  { label: "Paver Patios & Walkways", href: "/services/pavers", num: "04" },
  { label: "Water Features", href: "/services/water-features", num: "05" },
  { label: "Outdoor Kitchens", href: "/services/outdoor-living", num: "06" },
  { label: "Decks & Pergolas", href: "/services/decks", num: "07" },
  { label: "Fire Pits & Fireplaces", href: "/services/fire-features", num: "08" },
  { label: "Landscape Lighting", href: "/services/landscape-lighting", num: "09" },
  { label: "Xeriscaping", href: "/services/xeriscaping", num: "10" },
  { label: "Retaining Walls", href: "/services/retaining-walls", num: "11" },
  { label: "Drainage Solutions", href: "/services/drainage", num: "12" },
  { label: "Firewise Landscaping", href: "/firewise-landscaping-bend-oregon", num: "13" },
  { label: "Water-Wise Landscaping", href: "/services/water-wise-landscaping", num: "14" },
];

// Resources mega menu — featured fire-wise and water-wise guides
const resourcesItems = [
  { label: "Defensible Space Guide — Bend, OR", href: "/resources/defensible-space-bend-oregon", num: "01" },
  { label: "Deschutes County R327 Requirements", href: "/resources/deschutes-county-fire-hardening-requirements", num: "02" },
  { label: "Fire-Resistant Plants — Central Oregon", href: "/resources/fire-resistant-plants-central-oregon", num: "03" },
  { label: "Juniper Removal Guide — Bend", href: "/resources/juniper-removal-bend-oregon", num: "04" },
  { label: "Bend Watering Restrictions", href: "/resources/bend-watering-restrictions", num: "05" },
  { label: "Water-Wise Landscaping — Bend", href: "/resources/water-wise-landscaping-bend-oregon", num: "06" },
  { label: "Bend Turf Replacement Rebate ($3/sqft)", href: "/resources/bend-turf-replacement-rebate", num: "07" },
  { label: "WaterWise Communities — HOA Rebates", href: "/resources/waterwise-communities-bend-hoa", num: "08" },
  { label: "Sprinkler System Cost — Bend", href: "/resources/sprinkler-system-cost-bend-oregon", num: "09" },
  { label: "Lawn Care Cost — Bend", href: "/resources/lawn-care-cost-bend-oregon", num: "10" },
  { label: "Paver Patio Cost — Bend", href: "/resources/paver-patio-cost-bend-oregon", num: "11" },
  { label: "All 100 Guides →", href: "/resources", num: "→" },
];
const MEGA_PHOTO_RESOURCES =
  "/manus-storage/NewportAveLandcaping-9_97b731b0_1204d3ca.webp";

// Maintenance mega menu — Newport Ave residential lawn & maintenance photo
const MEGA_PHOTO_MAINTENANCE =
  "/manus-storage/NewportAveLandcaping-9_97b731b0_1204d3ca.webp";
// Services mega menu — Discovery West Plaza commercial installation (polished hardscape)
const MEGA_PHOTO_SERVICES =
  "/manus-storage/DiscoveryWestPlazaHiResPhotos55_79ba9dd5_e0d97b76.webp";

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
        padding: "0.5rem 0",
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
        top: "calc(44px + 160px)",
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: "oklch(0.98 0.005 90)",
        borderBottom: "3px solid oklch(0.46 0.20 25)",
        boxShadow: "0 24px 80px oklch(0 0 0 / 0.18)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        overflow: "visible",
        animation: "megaMenuIn 0.25s ease forwards",
      }}
    >
      {/* Left: editorial photo panel */}
      <div style={{ position: "relative", minHeight: "380px", overflow: "hidden" }}>
        <img
          src={photo}
          alt={`Newport Avenue Landscaping — ${subline}`}
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
          <h2
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
          </h2>
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
          padding: "1.5rem 3rem",
          borderLeft: "1px solid oklch(0.90 0.006 75)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "oklch(0.98 0.005 90)",
          overflowY: "auto",
        }}
      >
        <div style={{ marginBottom: "0.5rem" }}>
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

// ── Time-of-day color palettes ──
function getTimeOfDayTheme() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 9) {
    // Dawn / early morning: soft peach-gold sky
    return {
      bg: "oklch(0.38 0.10 55)",          // warm amber-brown
      border: "oklch(0.62 0.18 55)",       // golden amber
      addressColor: "oklch(0.92 0.06 55)", // warm cream
      phoneColor: "oklch(0.97 0.02 75)",   // bright white
      phoneIcon: "oklch(0.82 0.14 55)",    // gold
      btnBg: "oklch(0.72 0.18 55)",        // golden amber button
      btnText: "oklch(0.18 0.04 55)",      // dark brown text
      btnHover: "oklch(0.62 0.18 55)",
      label: "Good Morning",
    };
  } else if (hour >= 9 && hour < 12) {
    // Mid-morning: crisp sky blue
    return {
      bg: "oklch(0.30 0.08 240)",          // deep sky blue
      border: "oklch(0.55 0.16 240)",      // bright blue
      addressColor: "oklch(0.85 0.04 240)",
      phoneColor: "oklch(0.97 0.01 75)",
      phoneIcon: "oklch(0.75 0.14 240)",
      btnBg: "oklch(0.65 0.16 240)",       // sky blue button
      btnText: "oklch(0.12 0.04 240)",
      btnHover: "oklch(0.55 0.16 240)",
      label: "Good Morning",
    };
  } else if (hour >= 12 && hour < 15) {
    // Midday: bright warm terracotta/copper — matches brand
    return {
      bg: "oklch(0.32 0.10 30)",           // deep copper-brown
      border: "oklch(0.55 0.20 30)",       // copper accent
      addressColor: "oklch(0.88 0.05 30)",
      phoneColor: "oklch(0.97 0.01 75)",
      phoneIcon: "oklch(0.72 0.18 30)",
      btnBg: "oklch(0.62 0.20 30)",        // copper button
      btnText: "oklch(0.15 0.04 30)",
      btnHover: "oklch(0.52 0.20 30)",
      label: "Good Afternoon",
    };
  } else if (hour >= 15 && hour < 18) {
    // Afternoon: warm sage green — outdoors, nature
    return {
      bg: "oklch(0.28 0.08 145)",          // deep sage
      border: "oklch(0.50 0.18 145)",      // sage green
      addressColor: "oklch(0.85 0.04 145)",
      phoneColor: "oklch(0.97 0.01 75)",
      phoneIcon: "oklch(0.70 0.16 145)",
      btnBg: "oklch(0.60 0.18 145)",       // sage green button
      btnText: "oklch(0.12 0.04 145)",
      btnHover: "oklch(0.50 0.18 145)",
      label: "Good Afternoon",
    };
  } else if (hour >= 18 && hour < 21) {
    // Evening: sunset orange-rose
    return {
      bg: "oklch(0.28 0.10 20)",           // deep sunset red-brown
      border: "oklch(0.52 0.22 20)",       // sunset orange
      addressColor: "oklch(0.88 0.06 20)",
      phoneColor: "oklch(0.97 0.01 75)",
      phoneIcon: "oklch(0.72 0.20 20)",
      btnBg: "oklch(0.62 0.22 20)",        // sunset orange button
      btnText: "oklch(0.14 0.04 20)",
      btnHover: "oklch(0.52 0.22 20)",
      label: "Good Evening",
    };
  } else {
    // Night: deep navy/midnight
    return {
      bg: "oklch(0.18 0.06 260)",          // deep midnight navy
      border: "oklch(0.40 0.14 260)",      // indigo
      addressColor: "oklch(0.75 0.04 260)",
      phoneColor: "oklch(0.97 0.01 75)",
      phoneIcon: "oklch(0.65 0.14 260)",
      btnBg: "oklch(0.55 0.16 260)",       // indigo button
      btnText: "oklch(0.97 0.01 75)",
      btnHover: "oklch(0.45 0.16 260)",
      label: "Good Evening",
    };
  }
}

export default function Navbar() {
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adminCode, setAdminCode] = useState("");
  const [adminError, setAdminError] = useState(false);
  const [adminShake, setAdminShake] = useState(false);

  function handleAdminSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (adminCode === "4132") {
      setAdminModalOpen(false);
      setAdminCode("");
      setAdminError(false);
      window.location.href = "/admin/submissions";
    } else {
      setAdminError(true);
      setAdminShake(true);
      setAdminCode("");
      setTimeout(() => setAdminShake(false), 600);
    }
  }
  const [scrolled, setScrolled] = useState(false);
  const [timeTheme, setTimeTheme] = useState(getTimeOfDayTheme);
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
  // Refresh time-of-day theme every minute so it transitions as hours change
  useEffect(() => {
    const interval = setInterval(() => setTimeTheme(getTimeOfDayTheme()), 60_000);
    return () => clearInterval(interval);
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
    // 150ms grace period — enough to cross from nav trigger to menu panel
    megaTimeoutRef.current = setTimeout(() => setOpenMega(null), 150);
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

      {/* ── Utility bar — permanent sky blue strip ── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: "oklch(0.30 0.08 240)",
          borderBottom: "2px solid oklch(0.55 0.16 240)",
          height: "44px",
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
            gap: "1rem",
          }}
        >
          {/* Left: star admin button + address */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            {/* Secret admin star */}
            <button
              onClick={() => setAdminModalOpen(true)}
              style={{
                background: "none",
                border: "none",
                padding: "0 2px",
                color: "oklch(0.72 0.18 85)",
                opacity: 0.35,
                fontSize: "15px",
                lineHeight: 1,
                cursor: "pointer",
                transition: "opacity 0.2s",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "44px",
                minHeight: "44px",
                WebkitTapHighlightColor: "transparent",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.35")}
              aria-label="Admin access"
            >
              ★
            </button>
            <span
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 500,
                letterSpacing: "0.12em",
                color: "oklch(0.85 0.04 240)",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
              className="hidden sm:block"
            >
              61535 S Hwy 97, Bend, OR &nbsp;·&nbsp; Visits by Appointment Only
            </span>
          </div>
          {/* Right: phone + schedule button */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginLeft: "auto" }}>
            <a
              href="tel:5416178873"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Phone size={13} style={{ color: "oklch(0.75 0.14 240)" }} />
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  color: "oklch(0.97 0.01 75)",
                  whiteSpace: "nowrap",
                }}
              >
                (541) 617-8873
              </span>
            </a>
            {/* Opt-Out — hidden on mobile to prevent overflow */}
            <a
              href="/opt-out"
              onClick={(e) => { e.preventDefault(); navigate("/opt-out"); }}
              className="hidden md:flex"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "oklch(0.97 0.01 75)",
                backgroundColor: "transparent",
                border: "1px solid oklch(0.97 0.01 75 / 0.5)",
                padding: "0.35rem 0.9rem",
                borderRadius: "1.8rem 0.2rem 1.8rem 0.2rem",
                textDecoration: "none",
                alignItems: "center",
                gap: "0.35rem",
                whiteSpace: "nowrap",
                transition: "background-color 0.2s ease, border-color 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "oklch(0.97 0.01 75 / 0.15)"; e.currentTarget.style.borderColor = "oklch(0.97 0.01 75)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = "oklch(0.97 0.01 75 / 0.5)"; }}
            >
              Opt-Out Program
            </a>
            {/* Schedule Services — hidden on mobile to prevent overflow */}
            <a
              href="/schedule-services"
              onClick={(e) => { e.preventDefault(); navigate("/schedule-services"); }}
              className="hidden md:flex"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "oklch(0.12 0.04 240)",
                backgroundColor: "oklch(0.65 0.16 240)",
                padding: "0.35rem 1rem",
                borderRadius: "1.8rem 0.2rem 1.8rem 0.2rem",
                textDecoration: "none",
                alignItems: "center",
                gap: "0.35rem",
                whiteSpace: "nowrap",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "oklch(0.55 0.16 240)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "oklch(0.65 0.16 240)")}
            >
              Schedule Services
              <ArrowRight size={10} />
            </a>
          </div>
        </div>
      </div>

      {/* ── Main nav — bright white/cream ── */}
      <nav
        ref={navRef}
        style={{
          position: "fixed",
          top: "44px",
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
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              width: "320px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 10,
              pointerEvents: "none",
            }}
          >
            <div style={{ pointerEvents: "auto" }}>
            <a
              href="/" aria-label="Newport Avenue Landscaping — Home"
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
          </div>

          {/* ── Right cluster ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "2.5rem", flex: 1, justifyContent: "flex-end", paddingLeft: "180px" }}>
            <NavTextLink
              label="Commercial"
              href="/commercial"
              active={isActive("/commercial")}
              onClick={() => goTo("/commercial")}
            />
            <div
              onMouseEnter={() => handleMegaEnter("resources")}
              onMouseLeave={handleMegaLeave}
              style={{ position: "relative" }}
            >
              <NavTextLink
                label="Resources"
                href="/resources"
                active={openMega === "resources" || isActive("/resources")}
                onClick={() => goTo("/resources")}
                hasArrow
                arrowOpen={openMega === "resources"}
              />
            </div>
            <NavTextLink
              label="Service Areas"
              href="/service-areas"
              active={isActive("/service-areas")}
              onClick={() => goTo("/service-areas")}
            />

            {/* Get a Quote — pill CTA, brand red */}
            <a
              href="/quote"
              onClick={(e) => { e.preventDefault(); goTo("/quote"); }}
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

        {/* Mobile nav bar — hidden at md+ via navbar-mobile-bar CSS class */}
        <div
          className="navbar-mobile-bar"
          style={{
            display: "flex",
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
            aria-label="Newport Avenue Landscaping — Home"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            <img
              src={LOGO_NAV}
              alt=""
              aria-hidden="true"
              style={{ height: "44px", width: "auto", objectFit: "contain" }}
            />
          </button>

          <a
            href="tel:5416178873"
            aria-label="Call Newport Avenue Landscaping at (541) 617-8873"
            style={{ color: "oklch(0.22 0.008 30)", display: "flex", alignItems: "center" }}
          >
            <Phone size={18} aria-hidden="true" />
          </a>
        </div>

      </nav>

      {/* Mobile dropdown — rendered OUTSIDE the fixed nav so it can scroll freely on iOS */}
      <div
        className="md:hidden"
        style={{
          position: "fixed",
          top: mobileOpen ? "112px" : "-100vh",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 48,
          backgroundColor: "oklch(0.98 0.005 90)",
          overflowY: "auto",
          overflowX: "hidden",
          WebkitOverflowScrolling: "touch",
          transition: "top 0.35s ease",
          borderTop: "1px solid oklch(0.90 0.006 75)",
          display: mobileOpen ? "block" : "none",
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
                // { label: "🎮 Play: Lawn Mower Dash", href: "/game" }, // hidden
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

            {/* Schedule Services & Opt-Out — mobile CTA buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginTop: "1rem" }}>
              <a
                href="/schedule-services"
                onClick={(e) => { e.preventDefault(); goTo("/schedule-services"); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  padding: "0.85rem 1rem",
                  backgroundColor: "oklch(0.42 0.18 250)",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  color: "oklch(1 0 0)",
                  textTransform: "uppercase",
                  boxShadow: "0 2px 12px oklch(0.42 0.18 250 / 0.35)",
                }}
              >
                <Calendar size={14} />
                Schedule Services
              </a>
              {/* Opt-Out — prominent full-width red button */}
              <a
                href="/opt-out"
                onClick={(e) => { e.preventDefault(); goTo("/opt-out"); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  padding: "0.85rem 1rem",
                  backgroundColor: "oklch(0.46 0.20 25)",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  color: "oklch(1 0 0)",
                  textTransform: "uppercase",
                  boxShadow: "0 2px 12px oklch(0.46 0.20 25 / 0.35)",
                }}
              >
                <Leaf size={14} />
                Opt-Out Program
              </a>
            </div>

            <a
              href="tel:5416178873"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                marginTop: "0.75rem",
                padding: "0.9rem",
            backgroundColor: "oklch(0.38 0.14 145)",
            borderRadius: "8px",
            textDecoration: "none",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            color: "oklch(1 0 0)",
            boxShadow: "0 2px 12px oklch(0.38 0.14 145 / 0.35)",
                textTransform: "uppercase",
              }}
            >
              <Phone size={14} />
              Call (541) 617-8873
            </a>
          </div>
      </div>

      {/* ── Mega menus ── */}
      {/* The menu panel itself handles mouse leave — no large invisible zone needed.
          A 150ms grace delay lets the mouse cross from nav trigger into the panel. */}
      {openMega && (
        <div
          ref={megaMenuRef}
          onMouseEnter={() => handleMegaEnter(openMega)}
          onMouseLeave={handleMegaLeave}
          style={{
            position: "fixed",
            top: "calc(44px + 160px)",
            left: 0,
            right: 0,
            zIndex: 200,
          }}
        >
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
            {openMega === "resources" && (
              <MegaMenu
                items={resourcesItems}
                photo={MEGA_PHOTO_RESOURCES}
                headline={"Know Before\nYou Grow"}
                subline="Free Guides & Cost Estimates"
                onNavigate={goTo}
              />
            )}
        </div>
      )}
      {/* Admin code modal */}
      {adminModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => { setAdminModalOpen(false); setAdminCode(""); setAdminError(false); }}
        >
          <div
            style={{
              background: "oklch(0.98 0.005 75)",
              borderRadius: "0.75rem",
              padding: "2rem 2.25rem",
              width: "min(340px, 90vw)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => { setAdminModalOpen(false); setAdminCode(""); setAdminError(false); }}
              aria-label="Close admin login"
              style={{
                position: "absolute",
                top: "0.75rem",
                right: "0.75rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "oklch(0.6 0.005 0)",
                fontSize: "1.1rem",
                lineHeight: 1,
                padding: "4px",
                minWidth: "32px",
                minHeight: "32px",
              }}
            >
              ✕
            </button>
            <p style={{ fontSize: "0.65rem", fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.15em", color: "oklch(0.50 0.18 25)", textTransform: "uppercase", marginBottom: "0.5rem" }}>
              Team Access
            </p>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: "oklch(0.14 0.005 0)", marginBottom: "0.25rem" }}>
              Admin Login
            </h2>
            <p style={{ fontSize: "0.85rem", color: "oklch(0.45 0.005 0)", marginBottom: "1.25rem" }}>
              Enter your access code to continue.
            </p>
            <form onSubmit={handleAdminSubmit}>
              <div style={{ animation: adminShake ? "adminShake 0.5s ease" : "none" }}>
                <input
                  type="password"
                  inputMode="numeric"
                  aria-label="Admin access code"
                  placeholder="Enter code"
                  value={adminCode}
                  onChange={(e) => { setAdminCode(e.target.value); setAdminError(false); }}
                  autoFocus
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    background: "oklch(0.97 0.004 75)",
                    border: adminError ? "1.5px solid oklch(0.55 0.20 25)" : "1.5px solid oklch(0.88 0.005 75)",
                    borderRadius: "0.4rem",
                    color: "oklch(0.14 0.005 0)",
                    fontSize: "1.1rem",
                    textAlign: "center",
                    letterSpacing: "0.35em",
                    outline: "none",
                    marginBottom: adminError ? "0.35rem" : "0.75rem",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                />
                {adminError && (
                  <p style={{ color: "oklch(0.50 0.20 25)", fontSize: "0.75rem", marginBottom: "0.75rem", fontFamily: "'Montserrat', sans-serif" }}>
                    Incorrect code — please try again.
                  </p>
                )}
              </div>
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "0.8rem",
                  background: "oklch(0.50 0.18 25)",
                  border: "none",
                  borderRadius: "0.4rem",
                  color: "oklch(1 0 0)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  fontFamily: "'Montserrat', sans-serif",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.background = "oklch(0.44 0.20 25)")}
                onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.background = "oklch(0.50 0.18 25)")}
              >
                Enter →
              </button>
            </form>
          </div>
        </div>
      )}
      <style>{`
        @keyframes adminShake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-8px); }
          40%       { transform: translateX(8px); }
          60%       { transform: translateX(-5px); }
          80%       { transform: translateX(5px); }
        }
      `}</style>
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
