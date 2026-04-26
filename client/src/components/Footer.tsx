/* ============================================================
   FOOTER — Brand Refresh
   Deep charcoal background, brand red accents, real logo
   All links use real <a href> tags for SEO crawlability
   ============================================================ */
import { Link } from "wouter";

const LOGO_STACKED =
  "/manus-storage/logo-transparent-stacked_ff350b79_44beae36.webp";

const maintenanceLinks = [
  { label: "Lawn Service", href: "/services/lawn-service" },
  { label: "Commercial Maintenance", href: "/commercial" },
  { label: "Aeration Services", href: "/services/aeration" },
  { label: "Sprinkler Activation", href: "/services/sprinkler-activation" },
  { label: "Sprinkler Blowout", href: "/services/sprinkler-blowout" },
  { label: "Sprinkler Repair", href: "/services/sprinkler-repair" },
  { label: "Snow Removal", href: "/services/snow-removal" },
  { label: "Lawn Fungus Treatment", href: "/services/lawn-fungus" },
  { label: "Spray & Prune Opt-Out", href: "/opt-out" },
];

const landscapingLinks = [
  { label: "Irrigation Installation", href: "/services/irrigation" },
  { label: "Pavers & Walkways", href: "/services/pavers" },
  { label: "Fire Pits & Fireplaces", href: "/services/fire-features" },
  { label: "Outdoor Living Spaces", href: "/services/outdoor-living" },
  { label: "Water Features", href: "/services/water-features" },
  { label: "Landscape Design", href: "/services/landscape-design" },
  { label: "Landscape Lighting", href: "/services/landscape-lighting" },
  { label: "Xeriscaping", href: "/services/xeriscaping" },
  { label: "Retaining Walls", href: "/services/retaining-walls" },
  { label: "Drainage Solutions", href: "/services/drainage" },
  { label: "Firewise Landscaping", href: "/services/firewise-landscaping" },
  { label: "Water-Wise Landscaping", href: "/services/water-wise-landscaping" },
];

const cityLinks = [
  { label: "Landscaping in Bend, OR", href: "/landscaping/bend" },
  { label: "Landscaping in Redmond, OR", href: "/landscaping/redmond" },
  { label: "Landscaping in Sisters, OR", href: "/landscaping/sisters" },
  { label: "Landscaping in Sunriver, OR", href: "/landscaping/sunriver" },
  { label: "Landscaping in Tumalo, OR", href: "/landscaping/tumalo" },
  { label: "Landscaping in Prineville, OR", href: "/landscaping/prineville" },
  { label: "Landscaping in La Pine, OR", href: "/landscaping/la-pine" },
  { label: "Landscaping in Madras, OR", href: "/landscaping/madras" },
  { label: "Landscaping in Powell Butte, OR", href: "/landscaping/powell-butte" },
  { label: "Landscaping at Eagle Crest, OR", href: "/landscaping/eagle-crest" },
  { label: "All Service Areas", href: "/service-areas" },
  { label: "Bend Neighborhoods", href: "/bend-neighborhoods" },
];

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Work", href: "/our-work" },
  { label: "Services", href: "/services" },
  { label: "Landscaping Bend Oregon", href: "/landscaping-bend-oregon" },
  { label: "Paver Patios Bend", href: "/paver-patios-bend" },
  { label: "Irrigation Bend Oregon", href: "/irrigation-bend-oregon" },
  { label: "Landscape Design Bend", href: "/landscape-design-bend" },
  { label: "Commercial Landscaping Bend", href: "/commercial-landscaping-bend" },
  { label: "Maintenance", href: "/maintenance" },
  { label: "Blog", href: "/blog" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Contact Us", href: "/contact" },
  { label: "Get a Free Quote", href: "/schedule-services" },
  { label: "Careers", href: "/careers" },
  // { label: "🎮 Lawn Mower Dash (Game)", href: "/game" }, // hidden
];

const resourceArticleLinks = [
  { label: "HOA Landscaping in Bend, Oregon", href: "/resources/hoa-landscaping-bend-oregon" },
  { label: "Landscape Design Ideas for Bend, Oregon", href: "/resources/landscape-design-ideas-bend-oregon" },
  { label: "Landscaping Cost Guide for Bend, Oregon", href: "/resources/landscaping-cost-guide-bend-oregon" },
  { label: "Landscaping Companies in Bend, OR", href: "/resources/landscaping-company-bend-oregon" },
  { label: "New Construction Landscaping in Bend, OR", href: "/resources/new-construction-landscaping-bend-oregon" },
  { label: "Best Plants for Xeriscaping in Central Oregon", href: "/resources/best-plants-xeriscape-central-oregon" },
  { label: "Central Oregon Landscaping Guide", href: "/resources/central-oregon-landscaping-guide" },
  { label: "Paver Patio Cost in Bend Oregon", href: "/resources/paver-patio-cost-bend-oregon" },
  { label: "Sprinkler System Cost in Bend, OR", href: "/resources/sprinkler-system-cost-bend-oregon" },
  { label: "Xeriscape Cost in Bend, OR", href: "/resources/xeriscape-cost-bend-oregon" },
  { label: "Landscape Lighting Cost in Bend, OR", href: "/resources/landscape-lighting-cost-bend-oregon" },
  { label: "Lawn Maintenance Cost in Bend, OR", href: "/resources/lawn-maintenance-cost-bend-oregon" },
  { label: "Retaining Wall Cost in Bend, OR", href: "/resources/retaining-wall-cost-bend-oregon" },
  { label: "Snow Removal Cost in Bend, OR", href: "/resources/snow-removal-bend-oregon" },
  { label: "Outdoor Kitchen Cost in Bend, OR", href: "/resources/outdoor-kitchen-cost-bend-oregon" },
  { label: "Drip vs. Spray Irrigation in Bend, OR", href: "/resources/drip-vs-spray-irrigation-bend-oregon" },
  { label: "Sprinkler Winterization Guide for Bend, OR", href: "/resources/sprinkler-winterization-guide-bend-oregon" },
  { label: "Spring Landscaping Guide for Bend, Oregon", href: "/resources/spring-landscaping-guide-bend-oregon" },
  { label: "Fall Landscaping Guide for Bend, Oregon", href: "/resources/fall-landscaping-guide-bend-oregon" },
  { label: "Winter Landscaping Guide for Bend, Oregon", href: "/resources/winter-landscaping-guide-bend-oregon" },
  { label: "Does Landscaping Increase Home Value?", href: "/resources/landscaping-home-value-bend-oregon" },
  { label: "How to Choose a Landscaper in Bend, OR", href: "/resources/how-to-choose-landscaper-bend-oregon" },
  { label: "Sod vs. Seed for Lawns in Bend, OR", href: "/resources/sod-vs-seed-bend-oregon" },
  { label: "Pavers vs. Concrete Patio in Bend, OR", href: "/resources/pavers-vs-concrete-bend-oregon" },
  { label: "Irrigation Repair Cost in Bend, OR", href: "/resources/irrigation-repair-bend-oregon" },
  { label: "Lawn Care FAQ — Bend, Oregon", href: "/resources/faq-lawn-care-bend-oregon" },
  { label: "Sprinkler System FAQ — Bend, Oregon", href: "/resources/faq-irrigation-bend-oregon" },
  { label: "Paver Patio FAQ — Bend, Oregon", href: "/resources/faq-paver-patio-bend-oregon" },
  { label: "Xeriscape FAQ — Bend, Oregon", href: "/resources/faq-xeriscape-bend-oregon" },
  { label: "Snow Removal FAQ — Bend, Oregon", href: "/resources/faq-snow-removal-bend-oregon" },
];

const blogArticleLinks = [
  { label: "Lawn Care in Bend Oregon — Complete Seasonal Guide", href: "/blog/lawn-care-bend-oregon" },
  { label: "Paver Patio Ideas Bend Oregon — Design Inspiration", href: "/blog/paver-patio-ideas-bend-oregon" },
  { label: "Sprinkler Winterization Bend Oregon — When & Why", href: "/blog/sprinkler-winterization-bend-oregon" },
  { label: "Xeriscape Landscaping Bend Oregon — Complete Guide", href: "/blog/xeriscape-landscaping-bend-oregon" },
];

// Shared link style
const linkStyle: React.CSSProperties = {
  color: "oklch(0.55 0.005 0)",
  textDecoration: "none",
  fontSize: "0.875rem",
  fontFamily: "'Source Serif 4', serif",
  lineHeight: 1.5,
  display: "block",
  transition: "color 0.15s ease",
};

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        style={linkStyle}
        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.60 0.14 185)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.55 0.005 0)")}
      >
        {label}
      </Link>
    </li>
  );
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "oklch(0.14 0.006 30)" }}>
      {/* Main footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-10">

          {/* Brand */}
          <div className="xl:col-span-1">
            <Link href="/" className="mb-5 block" style={{ display: "inline-block" }}>
              <img
                src={LOGO_STACKED}
                alt="Newport Avenue Landscaping — Bend, Oregon"
                className="h-40 w-auto"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </Link>
            <p
              className="font-body text-sm leading-relaxed mb-6"
              style={{ color: "oklch(0.55 0.005 0)" }}
            >
              Central Oregon's premier landscaping company, serving Bend and
              surrounding communities since 2005. Licensed &amp; Bonded LCB #9153.
            </p>
            <div className="space-y-2">
              <a
                href="tel:5416178873"
                className="font-body text-sm block transition-colors"
                style={{ color: "oklch(0.72 0.005 0)", textDecoration: "none" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.60 0.14 185)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.72 0.005 0)")}
              >
                (541) 617-8873
              </a>
              <a
                href="mailto:info@newportavelandscaping.com"
                className="font-body text-sm block transition-colors"
                style={{ color: "oklch(0.72 0.005 0)", textDecoration: "none" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.60 0.14 185)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.72 0.005 0)")}
              >
                info@newportavelandscaping.com
              </a>
              <p className="font-body text-sm" style={{ color: "oklch(0.42 0.005 0)" }}>
                61535 S Hwy 97
                <br />
                Bend, OR 97702
              </p>
            </div>
          </div>

          {/* Maintenance Services */}
          <div>
            <div className="font-label mb-5" style={{ color: "oklch(0.62 0.12 240)", fontSize: "0.62rem", letterSpacing: "0.1em" }}>
              Maintenance Services
            </div>
            <ul className="space-y-2">
              {maintenanceLinks.map((s) => <FooterLink key={s.href} href={s.href} label={s.label} />)}
            </ul>
          </div>

          {/* Landscaping Services */}
          <div>
            <div className="font-label mb-5" style={{ color: "oklch(0.62 0.12 240)", fontSize: "0.62rem", letterSpacing: "0.1em" }}>
              Landscaping Services
            </div>
            <ul className="space-y-2">
              {landscapingLinks.map((s) => <FooterLink key={s.href} href={s.href} label={s.label} />)}
            </ul>
          </div>

          {/* Cities We Serve */}
          <div>
            <div className="font-label mb-5" style={{ color: "oklch(0.62 0.12 240)", fontSize: "0.62rem", letterSpacing: "0.1em" }}>
              Cities We Serve
            </div>
            <ul className="space-y-2">
              {cityLinks.map((s) => <FooterLink key={s.href} href={s.href} label={s.label} />)}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <div className="font-label mb-5" style={{ color: "oklch(0.62 0.12 240)", fontSize: "0.62rem", letterSpacing: "0.1em" }}>
              Quick Links
            </div>
            <ul className="space-y-2 mb-8">
              {quickLinks.map((link) => <FooterLink key={link.href + link.label} href={link.href} label={link.label} />)}
            </ul>
            <Link href="/schedule-services" style={{ display: "inline-block", textDecoration: "none", padding: "0.6rem 1.2rem", backgroundColor: "oklch(0.30 0.08 240)", color: "oklch(1 0 0)", fontFamily: "'Montserrat', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em" }}>
              Get a Free Quote
            </Link>
          </div>

          {/* Resource Articles */}
          <div>
            <div className="font-label mb-5" style={{ color: "oklch(0.62 0.12 240)", fontSize: "0.62rem", letterSpacing: "0.1em" }}>
              Guides &amp; Cost Estimates
            </div>
            <ul className="space-y-2">
              {resourceArticleLinks.map((s) => <FooterLink key={s.href + s.label} href={s.href} label={s.label} />)}
            </ul>
          </div>

          {/* Blog Articles */}
          <div>
            <div className="font-label mb-5" style={{ color: "oklch(0.62 0.12 240)", fontSize: "0.62rem", letterSpacing: "0.1em" }}>
              Blog &amp; Insights
            </div>
            <ul className="space-y-2">
              {blogArticleLinks.map((s) => <FooterLink key={s.href} href={s.href} label={s.label} />)}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t" style={{ borderColor: "oklch(0.25 0.008 30)" }}>
        <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <p className="font-body text-xs" style={{ color: "oklch(0.45 0.008 30)" }}>
              © 2026 Newport Avenue Landscaping. All Rights Reserved.
            </p>


          </div>
          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="font-body text-xs transition-colors"
              style={{ color: "oklch(0.42 0.005 0)", textDecoration: "none" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.60 0.14 185)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.42 0.005 0)")}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-body text-xs transition-colors"
              style={{ color: "oklch(0.42 0.005 0)", textDecoration: "none" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.60 0.14 185)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.42 0.005 0)")}
            >
              Terms &amp; Conditions
            </Link>
          </div>
          <p className="font-body text-xs" style={{ color: "oklch(0.38 0.005 0)" }}>
            LCB #9153 — Licensed, Bonded &amp; Insured
          </p>
        </div>
      </div>
    </footer>
  );
}
