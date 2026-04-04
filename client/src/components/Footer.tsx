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
  { label: "Commercial Maintenance", href: "/commercial" },
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
  { label: "Contact Us", href: "/contact" },
];
const resourceArticleLinks = [
  { label: 'HOA Landscaping in Bend, Oregon', href: '/resources/hoa-landscaping-bend-oregon' },
  { label: 'Landscape Transformations in Bend, Oregon', href: '/resources/landscape-transformation-bend-oregon' },
  { label: 'Landscape Design Ideas for Bend, Oregon', href: '/resources/landscape-design-ideas-bend-oregon' },
  { label: 'Landscape Maintenance Plans in Bend, OR', href: '/resources/landscape-maintenance-plan-bend-oregon' },
  { label: 'Landscape Warranty in Bend, Oregon', href: '/resources/landscape-warranty-bend-oregon' },
  { label: 'Landscaping Companies in Bend, OR', href: '/resources/landscaping-company-bend-oregon' },
  { label: 'Landscaping Cost Guide for Bend, Oregon', href: '/resources/landscaping-cost-guide-bend-oregon' },
  { label: 'Landscaping Seasons in Bend, Oregon', href: '/resources/landscaping-seasons-bend-oregon' },
  { label: 'Landscaping Tips for Bend, Oregon Homeowners', href: '/resources/landscaping-tips-bend-oregon' },
  { label: 'New Construction Landscaping in Bend, OR', href: '/resources/new-construction-landscaping-bend-oregon' },
  { label: 'Does Landscaping Increase Home Value in Bend, OR?', href: '/resources/landscaping-home-value-bend-oregon' },
  { label: 'Bend Turf Rebate Program', href: '/resources/bend-turf-rebate-program' },
  { label: 'Best Plants for Xeriscaping in Central Oregon', href: '/resources/best-plants-xeriscape-central-oregon' },
  { label: 'Boulder Landscaping Cost in Bend, OR', href: '/resources/boulder-landscaping-cost-bend-oregon' },
  { label: 'Central Oregon Landscaping Guide', href: '/resources/central-oregon-landscaping-guide' },
  { label: 'Commercial Landscaping Bend Oregon', href: '/resources/commercial-landscaping-bend-oregon' },
  { label: 'Commercial Landscaping in Bend, OR', href: '/resources/commercial-landscaping-bend-oregon' },
  { label: 'Drainage Solutions Cost in Bend, OR', href: '/resources/drainage-solutions-cost-bend-oregon' },
  { label: 'Drip vs. Spray Irrigation in Bend, OR', href: '/resources/drip-vs-spray-irrigation-bend-oregon' },
  { label: 'Paver Driveway Cost in Bend, OR', href: '/resources/driveway-paver-cost-bend-oregon' },
  { label: 'Fall Landscaping Guide for Bend, Oregon', href: '/resources/fall-landscaping-guide-bend-oregon' },
  { label: 'Sprinkler System FAQ — Bend, Oregon', href: '/resources/faq-irrigation-bend-oregon' },
  { label: 'Lawn Care FAQ — Bend, Oregon', href: '/resources/faq-lawn-care-bend-oregon' },
  { label: 'Outdoor Lighting FAQ — Bend, Oregon', href: '/resources/faq-outdoor-lighting-bend-oregon' },
  { label: 'Paver Patio FAQ — Bend, Oregon', href: '/resources/faq-paver-patio-bend-oregon' },
  { label: 'Retaining Wall FAQ — Bend, Oregon', href: '/resources/faq-retaining-wall-bend-oregon' },
  { label: 'Snow Removal FAQ — Bend, Oregon', href: '/resources/faq-snow-removal-bend-oregon' },
  { label: 'Water Feature FAQ — Bend, Oregon', href: '/resources/faq-water-feature-bend-oregon' },
  { label: 'Xeriscape FAQ — Bend, Oregon', href: '/resources/faq-xeriscape-bend-oregon' },
  { label: 'Fencing Cost in Bend, OR', href: '/resources/fencing-cost-bend-oregon' },
  { label: 'Fire Pit & Patio Cost in Bend, OR', href: '/resources/fire-pit-patio-cost-bend-oregon' },
  { label: 'How to Choose a Landscaper in Bend, OR', href: '/resources/how-to-choose-landscaper-bend-oregon' },
  { label: 'How to Install Drip Irrigation in Bend, OR', href: '/resources/how-to-install-drip-irrigation-bend-oregon' },
  { label: 'How to Maintain a Paver Patio in Bend, OR', href: '/resources/how-to-maintain-paver-patio-bend-oregon' },
  { label: 'How to Plant Trees in Bend, Oregon', href: '/resources/how-to-plant-trees-bend-oregon' },
  { label: 'How to Prevent Lawn Fungus in Bend, Oregon', href: '/resources/how-to-prevent-lawn-fungus-bend-oregon' },
  { label: 'How to Read a Landscape Proposal in Bend, OR', href: '/resources/how-to-read-landscape-proposal-bend-oregon' },
  { label: 'Understanding Soil in Bend, Oregon', href: '/resources/understanding-soil-bend-oregon' },
  { label: 'How to Select Pavers for Your Bend, OR Patio', href: '/resources/how-to-select-pavers-bend-oregon' },
  { label: 'How to Water Your Lawn in Bend, Oregon', href: '/resources/how-to-water-lawn-bend-oregon' },
  { label: 'How to Xeriscape in Bend, Oregon', href: '/resources/how-to-xeriscape-bend-oregon' },
  { label: 'Irrigation Repair Bend Oregon', href: '/resources/irrigation-repair-bend-oregon' },
  { label: 'Irrigation Repair Cost in Bend, OR', href: '/resources/irrigation-repair-bend-oregon' },
  { label: 'Landscape Design Cost in Bend, OR', href: '/resources/landscape-design-cost-bend-oregon' },
  { label: 'Landscape Lighting Bend Oregon', href: '/resources/landscape-lighting-bend-oregon' },
  { label: 'Landscape Lighting Cost in Bend, OR', href: '/resources/landscape-lighting-cost-bend-oregon' },
  { label: 'Landscaping in Bend, Oregon: The Complete Guide', href: '/resources/landscaping-bend-oregon' },
  { label: 'Lawn Maintenance Cost in Bend, OR', href: '/resources/lawn-maintenance-cost-bend-oregon' },
  { label: 'Mulch Installation Cost in Bend, OR', href: '/resources/mulch-installation-cost-bend-oregon' },
  { label: 'Native vs. Adapted Plants for Bend, OR', href: '/resources/native-vs-adapted-plants-bend-oregon' },
  { label: 'Outdoor Kitchen Cost in Bend, OR', href: '/resources/outdoor-kitchen-cost-bend-oregon' },
  { label: 'Landscape Lighting Ideas for Bend, OR', href: '/resources/landscape-lighting-bend-oregon' },
  { label: 'Outdoor Lighting Cost in Bend, OR', href: '/resources/outdoor-lighting-cost-bend-oregon' },
  { label: 'Paver Patio Cost in Bend Oregon', href: '/resources/paver-patio-cost-bend-oregon' },
  { label: 'Paver Walkway Cost in Bend, OR', href: '/resources/paver-walkway-cost-bend-oregon' },
  { label: 'Pavers vs. Concrete Patio in Bend, OR', href: '/resources/pavers-vs-concrete-bend-oregon' },
  { label: 'Perennial Garden Installation Cost in Bend, OR', href: '/resources/perennial-garden-cost-bend-oregon' },
  { label: 'Pergola Cost in Bend, OR', href: '/resources/pergola-cost-bend-oregon' },
  { label: 'Professional vs. DIY Landscaping in Bend, OR', href: '/resources/professional-vs-diy-landscaping-bend-oregon' },
  { label: 'Retaining Wall Cost in Bend, OR', href: '/resources/retaining-wall-cost-bend-oregon' },
  { label: 'Snow Removal Services in Bend, Oregon', href: '/resources/snow-removal-bend-oregon' },
  { label: 'Snow Removal Cost in Bend, OR', href: '/resources/snow-removal-bend-oregon' },
  { label: 'Sod Installation Cost in Bend, OR', href: '/resources/sod-installation-cost-bend-oregon' },
  { label: 'Sod vs. Seed for Lawns in Bend, OR', href: '/resources/sod-vs-seed-bend-oregon' },
  { label: 'Spring Landscaping Guide for Bend, Oregon', href: '/resources/spring-landscaping-guide-bend-oregon' },
  { label: 'Sprinkler System Cost in Bend, OR', href: '/resources/sprinkler-system-cost-bend-oregon' },
  { label: 'Sprinkler Winterization Guide for Bend, OR', href: '/resources/sprinkler-winterization-guide-bend-oregon' },
  { label: 'Summer Landscaping Guide for Bend, Oregon', href: '/resources/summer-landscaping-guide-bend-oregon' },
  { label: 'Tree Removal Cost in Bend, OR', href: '/resources/tree-removal-cost-bend-oregon' },
  { label: 'Water Feature Cost in Bend, OR', href: '/resources/water-feature-cost-bend-oregon' },
  { label: 'When to Aerate Your Lawn in Bend, Oregon', href: '/resources/when-to-aerate-lawn-bend-oregon' },
  { label: 'Winter Landscaping Guide for Bend, Oregon', href: '/resources/winter-landscaping-guide-bend-oregon' },
  { label: 'Xeriscape Cost in Bend, OR', href: '/resources/xeriscape-cost-bend-oregon' },
  { label: 'Xeriscape vs. Traditional Lawn in Bend, OR', href: '/resources/xeriscape-vs-traditional-lawn-bend-oregon' },
];
const blogArticleLinks = [
  { label: 'Lawn Care in Bend Oregon — Complete Seasonal Guide', href: '/blog/lawn-care-bend-oregon' },
  { label: 'Paver Patio Ideas Bend Oregon — Design Inspiration', href: '/blog/paver-patio-ideas-bend-oregon' },
  { label: 'Sprinkler Winterization Bend Oregon — When & Why', href: '/blog/sprinkler-winterization-bend-oregon' },
  { label: 'Xeriscape Landscaping Bend Oregon — Complete Guide', href: '/blog/xeriscape-landscaping-bend-oregon' },
];


export default function Footer() {
  const [, navigate] = useLocation();

  const go = (href: string) => {
    navigate(href);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer style={{ backgroundColor: "oklch(0.14 0.006 30)" }}>
      {/* Main footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-10">
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
                onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.85 0.12 28)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.72 0.005 0)")}
              >
                (541) 617-8873
              </a>
              <a
                href="mailto:info@newportavelandscaping.com"
                className="font-body text-sm block transition-colors"
                style={{ color: "oklch(0.72 0.005 0)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.85 0.12 28)")}
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
            <div className="font-label mb-5" style={{ color: "oklch(0.85 0.12 28)" }}>
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
            <div className="font-label mb-5" style={{ color: "oklch(0.85 0.12 28)" }}>
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
            <div className="font-label mb-5" style={{ color: "oklch(0.85 0.12 28)" }}>
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
          {/* Resource Articles */}
          <div>
            <div className="font-label mb-5" style={{ color: "oklch(0.85 0.12 28)" }}>
              Guides &amp; Cost Estimates
            </div>
            <ul className="space-y-2">
              {resourceArticleLinks.map((s) => (
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
          {/* Blog Articles */}
          <div>
            <div className="font-label mb-5" style={{ color: "oklch(0.85 0.12 28)" }}>
              Blog &amp; Insights
            </div>
            <ul className="space-y-2">
              {blogArticleLinks.map((s) => (
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
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t" style={{ borderColor: "oklch(0.25 0.008 30)" }}>
        <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs" style={{ color: "oklch(0.45 0.008 30)" }}>
            © 2025 Newport Avenue Landscaping. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <button
              onClick={() => go("/privacy-policy")}
              className="font-body text-xs transition-colors"
              style={{ color: "oklch(0.42 0.005 0)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.85 0.12 28)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.42 0.005 0)")}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => go("/terms")}
              className="font-body text-xs transition-colors"
              style={{ color: "oklch(0.42 0.005 0)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.85 0.12 28)")}
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
