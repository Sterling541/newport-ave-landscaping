/* ============================================================
   NAVBAR — Sunlit Craftsman Design
   Sticky, transparent-to-solid on scroll, forest green brand
   ============================================================ */
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";

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
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Top bar */}
      <div
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled
            ? "oklch(0.22 0.06 152)"
            : "oklch(0.22 0.06 152 / 0.85)",
          backdropFilter: scrolled ? "none" : "blur(12px)",
          boxShadow: scrolled ? "0 2px 20px oklch(0 0 0 / 0.2)" : "none",
        }}
      >
        {/* Info bar */}
        <div
          className="text-center py-1.5 text-xs font-body tracking-wide"
          style={{
            backgroundColor: "oklch(0.15 0.05 152)",
            color: "oklch(0.85 0.02 85)",
          }}
        >
          <span>Visits by Appointment Only</span>
          <span className="mx-3" style={{ color: "oklch(0.58 0.12 42)" }}>|</span>
          <span>1020 SE Paiute Way #100, Bend, OR</span>
          <span className="mx-3" style={{ color: "oklch(0.58 0.12 42)" }}>|</span>
          <a
            href="tel:5416178873"
            className="hover:underline transition-opacity"
            style={{ color: "oklch(0.85 0.02 85)" }}
          >
            (541) 617-8873
          </a>
        </div>

        {/* Main nav */}
        <div className="container flex items-center justify-between py-3">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-3 group"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-lg"
              style={{
                backgroundColor: "oklch(0.58 0.12 42)",
                color: "oklch(0.97 0.012 85)",
              }}
            >
              N
            </div>
            <div>
              <div
                className="font-display font-semibold text-lg leading-tight"
                style={{ color: "oklch(0.97 0.012 85)" }}
              >
                Newport Ave
              </div>
              <div
                className="font-label text-xs"
                style={{ color: "oklch(0.72 0.03 75)", letterSpacing: "0.2em" }}
              >
                Landscaping
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="font-label text-xs transition-colors duration-200"
                style={{ color: "oklch(0.85 0.02 85)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.58 0.12 42)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.85 0.02 85)")}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:5416178873"
              className="flex items-center gap-2 font-label text-xs transition-colors"
              style={{ color: "oklch(0.85 0.02 85)" }}
            >
              <Phone size={14} />
              (541) 617-8873
            </a>
            <button
              onClick={() => handleNavClick("#contact")}
              className="btn-terracotta text-xs px-5 py-2.5"
            >
              Start Service
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2"
            style={{ color: "oklch(0.97 0.012 85)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col pt-28"
          style={{ backgroundColor: "oklch(0.22 0.06 152)" }}
        >
          <nav className="flex flex-col items-center gap-6 py-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="font-display text-2xl font-light"
                style={{ color: "oklch(0.97 0.012 85)" }}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("#contact")}
              className="btn-terracotta mt-4"
            >
              Start Service
            </button>
            <a
              href="tel:5416178873"
              className="font-body text-sm"
              style={{ color: "oklch(0.72 0.03 75)" }}
            >
              (541) 617-8873
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
