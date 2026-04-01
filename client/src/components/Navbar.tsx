/* ============================================================
   NAVBAR — Transformed Header
   Design: Slim red utility bar on top, transparent nav with links only.
   The large logo lives inside HeroSection overlapping the photo.
   On scroll: nav gets white background + shadow for readability.
   Mobile: hamburger opens full-screen overlay with logo + links.
   ============================================================ */
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";

const LOGO_WHITE_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/newport-logo-white_75ad8884.png";

const LOGO_RED_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/LogoNewportAvenueLandscapingBGRed_367837c1.png";

const navLinks = [
  { label: "Our Work", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Fixed header wrapper */}
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* ── Red utility bar ── */}
        <div
          className="text-center py-1.5 font-body tracking-wide"
          style={{
            backgroundColor: "oklch(0.46 0.20 25)",
            color: "oklch(1 0 0)",
            fontSize: "0.72rem",
          }}
        >
          <span className="hidden sm:inline">Visits by Appointment Only</span>
          <span className="hidden sm:inline mx-3 opacity-50">|</span>
          <span className="hidden sm:inline">1020 SE Paiute Way #100, Bend, OR</span>
          <span className="hidden sm:inline mx-3 opacity-50">|</span>
          <a
            href="tel:5416178873"
            className="hover:underline font-semibold"
            style={{ color: "oklch(1 0 0)" }}
          >
            (541) 617-8873
          </a>
          <span className="sm:hidden">Bend, OR · (541) 617-8873</span>
        </div>

        {/* ── Main nav bar ── */}
        <div
          className="transition-all duration-300"
          style={{
            backgroundColor: scrolled ? "oklch(1 0 0)" : "transparent",
            backdropFilter: scrolled ? "none" : "blur(2px)",
            boxShadow: scrolled ? "0 2px 20px oklch(0 0 0 / 0.12)" : "none",
          }}
        >
          <div className="container flex items-center justify-between py-3">
            {/* Scrolled-state logo (small, left-aligned) */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex items-center transition-all duration-300"
              style={{
                opacity: scrolled ? 1 : 0,
                pointerEvents: scrolled ? "auto" : "none",
                transform: scrolled ? "translateX(0)" : "translateX(-10px)",
              }}
            >
              <img
                src={LOGO_WHITE_BG}
                alt="Newport Avenue Landscaping"
                className="h-10 w-auto object-contain"
              />
            </a>

            {/* Spacer when not scrolled (logo is in hero) */}
            {!scrolled && <div className="flex-1" />}

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="font-label text-xs transition-colors duration-200"
                  style={{ color: scrolled ? "oklch(0.38 0.005 0)" : "oklch(0.97 0.003 0)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.46 0.20 25)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = scrolled ? "oklch(0.38 0.005 0)" : "oklch(0.97 0.003 0)")}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4 ml-6">
              <a
                href="tel:5416178873"
                className="flex items-center gap-1.5 font-label text-xs transition-colors"
                style={{ color: scrolled ? "oklch(0.38 0.005 0)" : "oklch(0.97 0.003 0)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.46 0.20 25)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = scrolled ? "oklch(0.38 0.005 0)" : "oklch(0.97 0.003 0)")}
              >
                <Phone size={12} />
                (541) 617-8873
              </a>
              <button
                onClick={() => handleNavClick("#contact")}
                className="btn-red"
                style={{ padding: "0.5rem 1.25rem", fontSize: "0.72rem" }}
              >
                Start Service
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 ml-auto"
              style={{ color: scrolled ? "oklch(0.22 0.005 0)" : "oklch(1 0 0)" }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile full-screen overlay ── */}
      <div
        className="fixed inset-0 z-40 flex flex-col transition-all duration-300"
        style={{
          backgroundColor: "oklch(1 0 0)",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          transform: mobileOpen ? "translateY(0)" : "translateY(-8px)",
        }}
      >
        {/* Logo centered in mobile menu */}
        <div className="flex justify-center pt-24 pb-6">
          <img
            src={LOGO_WHITE_BG}
            alt="Newport Avenue Landscaping"
            className="h-24 w-auto object-contain"
          />
        </div>

        {/* Divider */}
        <div
          className="mx-8 mb-6"
          style={{ height: "1px", backgroundColor: "oklch(0.90 0.003 0)" }}
        />

        <nav className="flex flex-col items-center gap-5 px-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="font-display text-2xl font-light w-full text-center py-2"
              style={{ color: "oklch(0.22 0.005 0)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.46 0.20 25)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.22 0.005 0)")}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex flex-col items-center gap-3 px-8 mt-8">
          <button
            onClick={() => handleNavClick("#contact")}
            className="btn-red w-full text-center"
          >
            Start Service
          </button>
          <a
            href="tel:5416178873"
            className="font-label text-xs flex items-center gap-2"
            style={{ color: "oklch(0.60 0.005 0)" }}
          >
            <Phone size={12} />
            (541) 617-8873
          </a>
        </div>
      </div>
    </>
  );
}
