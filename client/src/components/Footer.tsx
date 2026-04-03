/* ============================================================
   FOOTER — Brand Refresh
   Deep charcoal background, brand red accents, real logo
   All links wired to real page routes
   ============================================================ */
import { useLocation } from "wouter";

const LOGO_STACKED =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/logo-transparent-stacked_ff350b79.png";

const maintenanceLinks = [
  { label: "Lawn Service", href: "/services/lawn-service" },
  { label: "Commercial Maintenance", href: "/services/commercial-maintenance" },
  { label: "Aeration Services", href: "/services/aeration" },
  { label: "Sprinkler Activation", href: "/services/sprinkler-activation" },
  { label: "Sprinkler Blowout", href: "/services/sprinkler-blowout" },
  { label: "Sprinkler Repair", href: "/services/sprinkler-repair" },
  { label: "Snow Removal", href: "/services/snow-removal" },
  { label: "Lawn Fungus", href: "/services/lawn-fungus" },
];

const landscapingLinks = [
  { label: "Irrigation Installation", href: "/services/irrigation" },
  { label: "Pavers & Walkways", href: "/services/pavers" },
  { label: "Fire Pits & Fireplaces", href: "/services/fire-features" },
  { label: "Outdoor Living Spaces", href: "/services/outdoor-living" },
  { label: "Water Features", href: "/services/water-features" },
  { label: "Landscape Design", href: "/services/landscape-design" },
  { label: "Landscape Lighting", href: "/services/landscape-lighting" },
];

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Work", href: "/our-work" },
  { label: "Services", href: "/services" },
  { label: "Maintenance", href: "/maintenance" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const [, navigate] = useLocation();

  const go = (href: string) => {
    navigate(href);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer style={{ backgroundColor: "oklch(0.14 0.005 0)" }}>
      {/* Main footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <button onClick={() => go("/")} className="mb-5 block">
              <img
                src={LOGO_STACKED}
                alt="Newport Avenue Landscaping"
                className="h-24 w-auto"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </button>
            <p
              className="font-body text-sm leading-relaxed mb-6"
              style={{ color: "oklch(0.55 0.005 0)" }}
            >
              Central Oregon's premier landscaping company, serving Bend and
              surrounding communities for over 21 years.
            </p>
            <div className="space-y-2">
              <a
                href="tel:5416178873"
                className="font-body text-sm block transition-colors"
                style={{ color: "oklch(0.72 0.005 0)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.72 0.12 25)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.72 0.005 0)")}
              >
                (541) 617-8873
              </a>
              <a
                href="mailto:info@newportavelandscaping.com"
                className="font-body text-sm block transition-colors"
                style={{ color: "oklch(0.72 0.005 0)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.72 0.12 25)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.72 0.005 0)")}
              >
                info@newportavelandscaping.com
              </a>
              <p
                className="font-body text-sm"
                style={{ color: "oklch(0.55 0.005 0)" }}
              >
                64625 N. HWY 97
                <br />
                Bend, OR 97701
              </p>
            </div>
          </div>

          {/* Maintenance Services */}
          <div>
            <div className="font-label mb-5" style={{ color: "oklch(0.72 0.12 25)" }}>
              Maintenance Services
            </div>
            <ul className="space-y-2">
              {maintenanceLinks.map((s) => (
                <li key={s.label}>
                  <button
                    onClick={() => go(s.href)}
                    className="font-body text-sm transition-colors text-left"
                    style={{ color: "oklch(0.55 0.005 0)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.85 0.005 0)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.55 0.005 0)")}
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Landscaping Services */}
          <div>
            <div className="font-label mb-5" style={{ color: "oklch(0.72 0.12 25)" }}>
              Landscaping Services
            </div>
            <ul className="space-y-2">
              {landscapingLinks.map((s) => (
                <li key={s.label}>
                  <button
                    onClick={() => go(s.href)}
                    className="font-body text-sm transition-colors text-left"
                    style={{ color: "oklch(0.55 0.005 0)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.85 0.005 0)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.55 0.005 0)")}
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links & CTA */}
          <div>
            <div className="font-label mb-5" style={{ color: "oklch(0.72 0.12 25)" }}>
              Quick Links
            </div>
            <ul className="space-y-2 mb-8">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => go(link.href)}
                    className="font-body text-sm transition-colors text-left"
                    style={{ color: "oklch(0.55 0.005 0)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.85 0.005 0)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.55 0.005 0)")}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            <button
              onClick={() => go("/contact")}
              className="btn-red w-full text-center"
            >
              Start Service
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t" style={{ borderColor: "oklch(0.25 0.005 0)" }}>
        <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs" style={{ color: "oklch(0.42 0.005 0)" }}>
            © 2025 Newport Avenue Landscaping. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <button
              onClick={() => go("/privacy-policy")}
              className="font-body text-xs transition-colors"
              style={{ color: "oklch(0.42 0.005 0)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.72 0.12 25)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.42 0.005 0)")}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => go("/terms")}
              className="font-body text-xs transition-colors"
              style={{ color: "oklch(0.42 0.005 0)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.72 0.12 25)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.42 0.005 0)")}
            >
              Terms &amp; Conditions
            </button>
          </div>
          <p className="font-body text-xs" style={{ color: "oklch(0.38 0.005 0)" }}>
            LCB #9153 — Licensed, Bonded &amp; Insured
          </p>
        </div>
      </div>
    </footer>
  );
}
