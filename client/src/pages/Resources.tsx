import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "wouter";

const costGuides = [
  { title: "How Much Do Pavers Cost in Bend, Oregon?", href: "/resources/paver-patio-cost-bend-oregon", desc: "Complete 2025 pricing guide for paver patios, walkways, and driveways in Central Oregon." },
  { title: "Sprinkler System Installation Cost in Bend, OR", href: "/resources/sprinkler-system-cost-bend-oregon", desc: "What to budget for a new irrigation system in Bend's high-desert climate." },
  { title: "Xeriscape Landscaping Cost in Bend, Oregon", href: "/resources/xeriscape-cost-bend-oregon", desc: "Full cost breakdown for drought-tolerant xeriscape conversions in Central Oregon." },
  { title: "Landscape Design Cost in Bend, Oregon", href: "/resources/landscape-design-cost-bend-oregon", desc: "Design-only fees, design-build packages, and what's included in a professional plan." },
  { title: "Retaining Wall Cost in Bend, Oregon", href: "/resources/retaining-wall-cost-bend-oregon", desc: "Per-linear-foot pricing for boulder, block, and timber retaining walls in Bend." },
  { title: "Sod Installation Cost in Bend, Oregon", href: "/resources/sod-installation-cost-bend-oregon", desc: "Sod vs. seed cost comparison and best grass types for Central Oregon yards." },
  { title: "Outdoor Lighting Cost in Bend, Oregon", href: "/resources/outdoor-lighting-cost-bend-oregon", desc: "Low-voltage LED landscape lighting pricing for Bend homes and commercial properties." },
  { title: "Water Feature Cost in Bend, Oregon", href: "/resources/water-feature-cost-bend-oregon", desc: "Pricing for ponds, fountains, pondless waterfalls, and dry creek beds in Central Oregon." },
  { title: "Lawn Maintenance Cost in Bend, Oregon", href: "/resources/lawn-maintenance-cost-bend-oregon", desc: "Monthly and annual pricing for lawn mowing, aeration, and full-service maintenance plans." },
  { title: "Fire Pit & Patio Cost in Bend, Oregon", href: "/resources/fire-pit-patio-cost-bend-oregon", desc: "Built-in vs. portable fire pit pricing and patio combination packages in Bend." },
];

const howToGuides = [
  { title: "Best Plants for Xeriscape in Central Oregon", href: "/resources/best-plants-xeriscape-central-oregon", desc: "Native and drought-tolerant plants that thrive in Bend's Zone 6b high-desert climate." },
  { title: "When to Aerate Your Lawn in Bend, Oregon", href: "/resources/when-to-aerate-lawn-bend-oregon", desc: "The best timing for core aeration in Central Oregon's short growing season." },
  { title: "Sprinkler Winterization Guide for Bend, Oregon", href: "/resources/sprinkler-winterization-guide-bend-oregon", desc: "Step-by-step guide to blowing out your irrigation system before Bend's first freeze." },
  { title: "How to Choose a Landscaper in Bend, Oregon", href: "/resources/how-to-choose-landscaper-bend-oregon", desc: "What to look for, questions to ask, and red flags to avoid when hiring in Central Oregon." },
  { title: "Bend Turf Rebate Program: Complete Guide", href: "/resources/bend-turf-rebate-program", desc: "How to qualify for Bend's lawn-to-xeriscape rebate and maximize your payout." },
  { title: "Irrigation Repair in Bend, Oregon", href: "/resources/irrigation-repair-bend-oregon", desc: "Common sprinkler problems in Bend, repair costs, and when to call a professional." },
  { title: "Commercial Landscaping in Bend, Oregon", href: "/resources/commercial-landscaping-bend-oregon", desc: "HOA, retail, and commercial property landscaping services across Central Oregon." },
  { title: "Snow Removal in Bend, Oregon", href: "/resources/snow-removal-bend-oregon", desc: "Residential and commercial snow plowing and de-icing services for Bend's snowy winters." },
  { title: "Landscape Lighting in Bend, Oregon", href: "/resources/landscape-lighting-bend-oregon", desc: "Design ideas, fixture options, and professional installation for Bend outdoor lighting." },
];

const serviceAreas = [
  { title: "Landscaping in Awbrey Butte, Bend", href: "/service-areas/awbrey-butte-bend-landscaping", desc: "Custom landscape design and maintenance for Awbrey Butte's hillside properties." },
  { title: "Landscaping in NorthWest Crossing, Bend", href: "/service-areas/northwest-crossing-bend-landscaping", desc: "Sustainable and xeriscape-friendly landscaping for NorthWest Crossing homes." },
  { title: "Landscaping in Broken Top, Bend", href: "/service-areas/broken-top-bend-landscaping", desc: "Premium landscape installation and maintenance for Broken Top's luxury properties." },
  { title: "Landscaping in Discovery West, Bend", href: "/service-areas/discovery-west-bend-landscaping", desc: "New construction and established home landscaping in Discovery West." },
  { title: "Landscaping in Sunriver, Oregon", href: "/service-areas/sunriver-oregon-landscaping", desc: "Vacation home and full-time residence landscaping services in Sunriver." },
  { title: "Landscaping in Redmond, Oregon", href: "/service-areas/redmond-oregon-landscaping", desc: "Full-service landscaping, irrigation, and maintenance for Redmond homeowners." },
];

function ResourceCard({ title, href, desc }: { title: string; href: string; desc: string }) {
  return (
    <Link href={href}>
      <a className="block p-5 rounded-lg border transition-all hover:shadow-md" style={{ borderColor: "oklch(0.85 0.005 0)", backgroundColor: "white" }}>
        <h3 className="font-semibold mb-2" style={{ color: "oklch(0.15 0.005 0)", fontSize: "0.95rem" }}>{title}</h3>
        <p className="text-sm" style={{ color: "oklch(0.45 0.005 0)" }}>{desc}</p>
        <span className="inline-block mt-3 text-xs font-semibold" style={{ color: "oklch(0.45 0.12 145)" }}>Read guide →</span>
      </a>
    </Link>
  );
}

export default function Resources() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.97 0.003 0)" }}>
      <SEO
        title="Landscaping Resources & Cost Guides | Newport Ave Landscaping Bend, OR"
        description="Free landscaping cost guides, how-to articles, and neighborhood service area pages for Bend, Redmond, Sunriver, and Central Oregon. Written by Newport Ave Landscaping — 21+ years local experience."
        canonical="https://newportavelandscaping.com/resources"
      />
      <Navbar />
      <div style={{ paddingTop: "328px" }}>
        {/* Hero */}
        <div
          className="relative flex items-center justify-center"
          style={{
            height: "320px",
            backgroundImage: "url(https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/ITP_7404_28389405.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
          }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "oklch(0 0 0 / 0.6)" }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.7rem", letterSpacing: "0.18em" }}>
              CENTRAL OREGON LANDSCAPING
            </p>
            <h1 className="font-display text-white mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
              Landscaping Resources & Cost Guides
            </h1>
            <p className="text-white/80 max-w-xl mx-auto" style={{ fontSize: "1.05rem" }}>
              Honest pricing guides, how-to articles, and neighborhood service pages — written by Newport Avenue Landscaping, Central Oregon's most experienced landscape contractor.
            </p>
          </div>
        </div>

        {/* Cost Guides */}
        <div className="container py-16 max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="font-label mb-2" style={{ color: "oklch(0.55 0.12 25)", fontSize: "0.65rem", letterSpacing: "0.18em" }}>PRICING GUIDES</p>
            <h2 className="font-display text-3xl mb-2" style={{ color: "oklch(0.15 0.005 0)" }}>Cost Guides for Bend, Oregon</h2>
            <p className="mb-8" style={{ color: "oklch(0.4 0.005 0)" }}>Real pricing data from 21+ years of installations in Central Oregon — not national averages.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {costGuides.map(g => <ResourceCard key={g.href} {...g} />)}
            </div>
          </div>

          {/* How-To Guides */}
          <div className="mb-12">
            <p className="font-label mb-2" style={{ color: "oklch(0.55 0.12 25)", fontSize: "0.65rem", letterSpacing: "0.18em" }}>HOW-TO GUIDES</p>
            <h2 className="font-display text-3xl mb-2" style={{ color: "oklch(0.15 0.005 0)" }}>Landscaping Guides for Central Oregon</h2>
            <p className="mb-8" style={{ color: "oklch(0.4 0.005 0)" }}>Expert advice specific to Bend's high-desert climate, Zone 6b growing conditions, and volcanic pumice soil.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {howToGuides.map(g => <ResourceCard key={g.href} {...g} />)}
            </div>
          </div>

          {/* Service Areas */}
          <div className="mb-12">
            <p className="font-label mb-2" style={{ color: "oklch(0.55 0.12 25)", fontSize: "0.65rem", letterSpacing: "0.18em" }}>SERVICE AREAS</p>
            <h2 className="font-display text-3xl mb-2" style={{ color: "oklch(0.15 0.005 0)" }}>Neighborhoods & Communities We Serve</h2>
            <p className="mb-8" style={{ color: "oklch(0.4 0.005 0)" }}>Newport Ave Landscaping serves Bend, Redmond, Sisters, Sunriver, and the broader Central Oregon region.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {serviceAreas.map(g => <ResourceCard key={g.href} {...g} />)}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center p-10 rounded-xl mt-8" style={{ backgroundColor: "oklch(0.15 0.005 0)" }}>
            <h3 className="font-display text-2xl text-white mb-3">Ready to Start Your Project?</h3>
            <p className="text-white/70 mb-6 max-w-lg mx-auto">Newport Avenue Landscaping — Licensed &amp; Bonded (LCB #9153) · 21+ Years in Central Oregon · Free Estimates</p>
            <Link href="/contact">
              <a className="inline-block px-8 py-3 font-semibold rounded-md text-white" style={{ backgroundColor: "oklch(0.45 0.12 145)" }}>
                Get a Free Estimate
              </a>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
