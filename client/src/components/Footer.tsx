/* ============================================================
   FOOTER — Brand Refresh
   Deep charcoal background, brand red accents, real logo
   ============================================================ */

const LOGO_WHITE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/LogoNewportAvenueLandscapingBGRed_367837c1.png";

const maintenanceServices = [
  "Lawn Service",
  "Commercial Landscape Maintenance",
  "Aeration Services",
  "Sprinkler System Activation",
  "Sprinkler Blowout Service",
  "Sprinkler Repair",
  "Snow Removal",
];

const landscapingServices = [
  "Patios & Pavers",
  "Fire Features",
  "Outdoor Kitchens",
  "Water Features",
  "Landscape Design",
  "Retaining Walls",
  "Xeriscaping",
  "Landscape Lighting",
  "Drainage Solutions",
];

export default function Footer() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ backgroundColor: "oklch(0.14 0.005 0)" }}>
      {/* Main footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img
                src={LOGO_WHITE}
                alt="Newport Avenue Landscaping"
                className="h-14 w-auto"
              />
            </div>
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
                1020 SE Paiute Way #100
                <br />
                Bend, OR 97702
              </p>
            </div>
          </div>

          {/* Maintenance Services */}
          <div>
            <div
              className="font-label mb-5"
              style={{ color: "oklch(0.72 0.12 25)" }}
            >
              Maintenance Services
            </div>
            <ul className="space-y-2">
              {maintenanceServices.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollTo("#contact")}
                    className="font-body text-sm transition-colors text-left"
                    style={{ color: "oklch(0.55 0.005 0)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.85 0.005 0)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.55 0.005 0)")}
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Landscaping Services */}
          <div>
            <div
              className="font-label mb-5"
              style={{ color: "oklch(0.72 0.12 25)" }}
            >
              Landscaping Services
            </div>
            <ul className="space-y-2">
              {landscapingServices.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollTo("#contact")}
                    className="font-body text-sm transition-colors text-left"
                    style={{ color: "oklch(0.55 0.005 0)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.85 0.005 0)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.55 0.005 0)")}
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links & CTA */}
          <div>
            <div
              className="font-label mb-5"
              style={{ color: "oklch(0.72 0.12 25)" }}
            >
              Quick Links
            </div>
            <ul className="space-y-2 mb-8">
              {[
                { label: "Our Work", id: "#portfolio" },
                { label: "Services", id: "#services" },
                { label: "About Us", id: "#about" },
                { label: "Reviews", id: "#reviews" },
                { label: "Contact", id: "#contact" },
                { label: "Careers", id: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.id)}
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
              onClick={() => scrollTo("#contact")}
              className="btn-red w-full text-center"
            >
              Start Service
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: "oklch(0.25 0.005 0)" }}
      >
        <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="font-body text-xs"
            style={{ color: "oklch(0.42 0.005 0)" }}
          >
            © 2025 Newport Avenue Landscaping. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms & Conditions"].map((item) => (
              <button
                key={item}
                className="font-body text-xs transition-colors"
                style={{ color: "oklch(0.42 0.005 0)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.72 0.12 25)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.42 0.005 0)")}
              >
                {item}
              </button>
            ))}
          </div>
          <p
            className="font-body text-xs"
            style={{ color: "oklch(0.38 0.005 0)" }}
          >
            LCB #9153 — Licensed, Bonded & Insured
          </p>
        </div>
      </div>
    </footer>
  );
}
