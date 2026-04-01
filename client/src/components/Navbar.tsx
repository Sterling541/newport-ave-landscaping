/* ============================================================
   NAVBAR — Brand Refresh
   White background on scroll, transparent over hero, brand red CTA
   Real logo image integrated
   ============================================================ */
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";

const LOGO_WHITE_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/newport-logo-white_75ad8884.png";

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
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Top info bar */}
      <div
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={{
          backgroundColor: scrolled
            ? "oklch(1 0 0)"
            : "oklch(1 0 0 / 0.92)",
          backdropFilter: scrolled ? "none" : "blur(12px)",
          boxShadow: scrolled
            ? "0 2px 24px oklch(0 0 0 / 0.10)"
            : "0 1px 0 oklch(0 0 0 / 0.06)",
        }}
      >
        {/* Info bar */}
        <div
          className="text-center py-1.5 text-xs font-body tracking-wide"
          style={{
            backgroundColor: "oklch(0.46 0.20 25)",
            color: "oklch(1 0 0)",
          }}
        >
          <span>Visits by Appointment Only</span>
          <span className="mx-3 opacity-50">|</span>
          <span>1020 SE Paiute Way #100, Bend, OR</span>
          <span className="mx-3 opacity-50">|</span>
          <a
            href="tel:5416178873"
            className="hover:underline font-semibold"
            style={{ color: "oklch(1 0 0)" }}
          >
            (541) 617-8873
          </a>
        </div>

        {/* Main nav */}
        <div className="container flex items-center justify-between py-2">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center"
          >
            <img
              src={LOGO_WHITE_BG}
              alt="Newport Avenue Landscaping"
              className="h-12 w-auto object-contain"
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="font-label text-xs transition-colors duration-200"
                style={{ color: "oklch(0.38 0.005 0)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "oklch(0.46 0.20 25)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "oklch(0.38 0.005 0)")
                }
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:5416178873"
              className="flex items-center gap-2 font-label text-xs transition-colors"
              style={{ color: "oklch(0.38 0.005 0)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "oklch(0.46 0.20 25)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "oklch(0.38 0.005 0)")
              }
            >
              <Phone size={13} />
              (541) 617-8873
            </a>
            <button
              onClick={() => handleNavClick("#contact")}
              className="btn-red text-xs px-5 py-2.5"
            >
              Start Service
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2"
            style={{ color: "oklch(0.22 0.005 0)" }}
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
          style={{ backgroundColor: "oklch(1 0 0)" }}
        >
          <nav className="flex flex-col items-center gap-6 py-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="font-display text-2xl font-light"
                style={{ color: "oklch(0.22 0.005 0)" }}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("#contact")}
              className="btn-red mt-4"
            >
              Start Service
            </button>
            <a
              href="tel:5416178873"
              className="font-body text-sm"
              style={{ color: "oklch(0.60 0.005 0)" }}
            >
              (541) 617-8873
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
