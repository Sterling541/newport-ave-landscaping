/* ============================================================
   NAVBAR — Southview-Inspired
   Design: Dark charcoal nav bar. Logo centered as the anchor.
   Nav links split symmetrically left and right of the logo.
   Thin red utility bar at very top with address/phone.
   On scroll: bar stays dark, slight shadow added.
   Mobile: hamburger menu, logo centered.
   ============================================================ */
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";

const LOGO_WHITE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/newport-logo-nav-v3_60ba11f0.png";

const navLeft = [
  { label: "Our Work", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
];

const navRight = [
  { label: "Maintenance", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = href;
    }
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
            Visits by Appointment Only &nbsp;·&nbsp; 1020 SE Paiute Way #100, Bend, OR
          </span>
          <a
            href="tel:5416178873"
            className="font-label text-white flex items-center gap-2"
            style={{ textDecoration: "none" }}
          >
            <span style={{ fontSize: "0.65rem", opacity: 0.85, letterSpacing: "0.05em" }}>For Service Call:</span>
            <span className="flex items-center gap-1.5" style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.04em" }}>
              <Phone size={13} />
              (541) 617-8873
            </span>
          </a>
        </div>
      </div>

      {/* ── Main nav ── */}
      <nav
        className="fixed left-0 right-0 z-40 transition-shadow duration-300"
        style={{
          top: "28px",
          backgroundColor: "oklch(0.15 0.005 0)",
          boxShadow: scrolled ? "0 4px 24px oklch(0 0 0 / 0.35)" : "none",
        }}
      >
        {/* Desktop nav */}
        <div className="hidden md:flex flex-col items-center justify-center px-8" style={{ minHeight: "300px" }}>

          {/* Main nav row: links + logo + links — with border lines above/below the side panels */}
          <div className="flex items-center justify-between w-full" style={{ padding: "0" }}>

            {/* Left links — with top/bottom border lines */}
            <div className="flex items-center gap-8 flex-1" style={{ borderTop: "1px solid rgba(255,255,255,0.3)", borderBottom: "1px solid rgba(255,255,255,0.3)", padding: "14px 0" }}>
              {navLeft.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  className="font-nav transition-colors duration-200"
                  style={{ color: "oklch(0.82 0.003 0)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.72 0.12 25)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.82 0.003 0)")}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Centered logo — shifted up so the text portion aligns with nav links */}
            <div className="flex-shrink-0 mx-8" style={{ width: "340px", display: "flex", justifyContent: "center" }}>
              <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <img
                  src={LOGO_WHITE}
                  alt="Newport Avenue Landscaping"
                  style={{ height: "260px", width: "auto", objectFit: "contain", display: "block", marginTop: "-105px" }}
                />
              </button>
            </div>

            {/* Right links — with top/bottom border lines */}
            <div className="flex items-center gap-8 flex-1 justify-end" style={{ borderTop: "1px solid rgba(255,255,255,0.3)", borderBottom: "1px solid rgba(255,255,255,0.3)", padding: "14px 0" }}>
              {navRight.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  className="font-nav transition-colors duration-200"
                  style={{ color: "oklch(0.82 0.003 0)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.72 0.12 25)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.82 0.003 0)")}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("#contact")}
                className="btn-red"
                style={{ padding: "0.5rem 1.25rem", fontSize: "0.62rem" }}
              >
                Get a Quote
              </button>
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

          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img
              src={LOGO_WHITE}
              alt="Newport Avenue Landscaping"
              style={{ height: "52px", width: "auto", objectFit: "contain" }}
            />
          </button>

          <a
            href="tel:5416178873"
            className="flex items-center gap-1"
            style={{ color: "oklch(0.72 0.12 25)" }}
          >
            <Phone size={18} />
          </a>
        </div>

        {/* Mobile dropdown */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: mobileOpen ? "400px" : "0",
            backgroundColor: "oklch(0.12 0.004 0)",
          }}
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {[...navLeft, ...navRight].map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className="font-nav text-left transition-colors duration-200"
                style={{ color: "oklch(0.80 0.003 0)" }}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#contact")}
              className="btn-red mt-2"
            >
              Start Service
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
