import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

export default function Resources() {
  return (
    <div style={{ backgroundColor: "oklch(0.97 0.012 85)", minHeight: "100vh" }}>
      <Helmet>
        <title>Landscaping Resources &amp; Guides for Bend, Oregon | Newport Avenue Landscaping</title>
        <meta name="description" content="Free landscaping guides, cost estimates, how-tos, and seasonal tips for Bend, Oregon homeowners. 100 articles covering irrigation, pavers, xeriscape, lawn care, and more from Newport Avenue Landscaping — 21 years of Central Oregon expertise." />
        <link rel="canonical" href="https://www.newportavelandscaping.com/resources" />
        <script type="application/ld+json">{`{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Landscaping Resources for Bend, Oregon",
          "description": "Free landscaping guides, cost estimates, and how-tos for Central Oregon homeowners.",
          "url": "https://www.newportavelandscaping.com/resources",
          "publisher": {
            "@type": "LocalBusiness",
            "@id": "https://www.newportavelandscaping.com/#business",
            "name": "Newport Avenue Landscaping"
          }
        }`}</script>
      </Helmet>
      <Navbar />

      {/* ── Hero ── */}
      <section style={{ background: `linear-gradient(rgba(0,0,0,0.68), rgba(0,0,0,0.68)), url(/manus-storage/hero-blog-resources_f6cb1354.jpg) center/cover no-repeat`, padding: "5rem 0 3rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ fontFamily: "var(--font-label)", color: "oklch(0.72 0.12 25)", fontSize: "0.62rem", letterSpacing: "0.1em", marginBottom: "1rem" }}>RESOURCES &amp; GUIDES</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "#fff", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.05, marginBottom: "1rem" }}>
            Landscaping Knowledge<br />for Central Oregon
          </h1>
          <p style={{ color: "oklch(0.72 0.12 25)", fontWeight: 300, fontSize: "1rem", maxWidth: "600px", lineHeight: 1.7, marginBottom: "2rem" }}>
            100 free guides, cost estimates, how-tos, and seasonal tips written by Newport Avenue Landscaping — 21 years of Central Oregon expertise in one place.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <a href="#cost-guides" style={{ fontFamily: "var(--font-label)", fontSize: "0.68rem", color: "oklch(0.72 0.12 25)", textDecoration: "none", letterSpacing: "0.08em", borderBottom: "1px solid oklch(0.46 0.20 25)", paddingBottom: "2px" }}>COST GUIDES</a>
            <a href="#how-to" style={{ fontFamily: "var(--font-label)", fontSize: "0.68rem", color: "oklch(0.72 0.12 25)", textDecoration: "none", letterSpacing: "0.08em", borderBottom: "1px solid oklch(0.46 0.20 25)", paddingBottom: "2px" }}>HOW-TO GUIDES</a>
            <a href="#seasonal" style={{ fontFamily: "var(--font-label)", fontSize: "0.68rem", color: "oklch(0.72 0.12 25)", textDecoration: "none", letterSpacing: "0.08em", borderBottom: "1px solid oklch(0.46 0.20 25)", paddingBottom: "2px" }}>SEASONAL GUIDES</a>
            <a href="#comparisons" style={{ fontFamily: "var(--font-label)", fontSize: "0.68rem", color: "oklch(0.72 0.12 25)", textDecoration: "none", letterSpacing: "0.08em", borderBottom: "1px solid oklch(0.46 0.20 25)", paddingBottom: "2px" }}>COMPARISONS</a>
            <a href="#faq" style={{ fontFamily: "var(--font-label)", fontSize: "0.68rem", color: "oklch(0.72 0.12 25)", textDecoration: "none", letterSpacing: "0.08em", borderBottom: "1px solid oklch(0.46 0.20 25)", paddingBottom: "2px" }}>FAQ HUBS</a>
          </div>
        </div>
      </section>

      {/* ── Articles ── */}
      <section style={{ padding: "3rem 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
          
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "1rem", borderBottom: "1px solid oklch(0.88 0.008 0)", paddingBottom: "0.6rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "oklch(0.15 0.005 0)", fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)", margin: 0 }}>
              Cost Guides
            </h2>
            <span style={{ fontFamily: "var(--font-label)", fontSize: "0.62rem", color: "oklch(0.55 0.008 0)", letterSpacing: "0.06em" }}>27 ARTICLES</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0.75rem" }}>
            
              <a href="/resources/boulder-landscaping-cost-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Boulder Landscaping Cost in Bend, OR
              </a>
              <a href="/resources/drainage-solutions-cost-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Drainage Solutions Cost in Bend, OR
              </a>
              <a href="/resources/fencing-cost-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Fencing Cost in Bend, OR
              </a>
              <a href="/resources/fire-pit-patio-cost-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Fire Pit & Patio Cost in Bend, OR
              </a>
              <a href="/resources/lawn-care-cost-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                How Much Does Lawn Care Cost in Bend, Oregon? (2024 Pricing Guide)
              </a>
              <a href="/resources/irrigation-repair-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Irrigation Repair Cost in Bend, OR
              </a>
              <a href="/resources/landscape-design-cost-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Landscape Design Cost in Bend, OR
              </a>
              <a href="/resources/landscape-lighting-cost-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Landscape Lighting Cost in Bend, OR
              </a>
              <a href="/resources/landscape-lighting-cost-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Landscape Lighting Cost in Bend, Oregon (2024 Pricing Guide)
              </a>
              <a href="/resources/landscaping-cost-guide-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Landscaping Cost Guide for Bend, Oregon | Newport Ave
              </a>
              <a href="/resources/lawn-aeration-cost-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Lawn Aeration Cost in Bend, Oregon (2024 Pricing Guide)
              </a>
              <a href="/resources/lawn-maintenance-cost-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Lawn Maintenance Cost in Bend, OR
              </a>
              <a href="/resources/mulch-installation-cost-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Mulch Installation Cost in Bend, OR
              </a>
              <a href="/resources/outdoor-kitchen-cost-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Outdoor Kitchen Cost in Bend, OR
              </a>
              <a href="/resources/outdoor-lighting-cost-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Outdoor Lighting Cost in Bend, OR
              </a>
              <a href="/resources/driveway-paver-cost-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Paver Driveway Cost in Bend, OR
              </a>
              <a href="/resources/paver-patio-cost-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Paver Patio Cost in Bend Oregon
              </a>
              <a href="/resources/paver-walkway-cost-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Paver Walkway Cost in Bend, OR
              </a>
              <a href="/resources/perennial-garden-cost-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Perennial Garden Installation Cost in Bend, OR | Newport Ave
              </a>
              <a href="/resources/pergola-cost-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Pergola Cost in Bend, OR
              </a>
              <a href="/resources/retaining-wall-cost-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Retaining Wall Cost in Bend, OR
              </a>
              <a href="/resources/snow-removal-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Snow Removal Cost in Bend, OR
              </a>
              <a href="/resources/sod-installation-cost-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Sod Installation Cost in Bend, OR
              </a>
              <a href="/resources/sprinkler-system-cost-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Sprinkler System Cost in Bend, OR
              </a>
              <a href="/resources/tree-removal-cost-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Tree Removal Cost in Bend, OR
              </a>
              <a href="/resources/water-feature-cost-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Water Feature Cost in Bend, OR
              </a>
              <a href="/resources/xeriscape-cost-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Xeriscape Cost in Bend, OR
              </a>
          </div>
        </div>
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "1rem", borderBottom: "1px solid oklch(0.88 0.008 0)", paddingBottom: "0.6rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "oklch(0.15 0.005 0)", fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)", margin: 0 }}>
              How-To Guides
            </h2>
            <span style={{ fontFamily: "var(--font-label)", fontSize: "0.62rem", color: "oklch(0.55 0.008 0)", letterSpacing: "0.06em" }}>13 ARTICLES</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0.75rem" }}>
            
              <a href="/resources/how-to-choose-landscaper-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                How to Choose a Landscaper in Bend, OR | Newport Ave
              </a>
              <a href="/resources/how-to-install-drip-irrigation-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                How to Install Drip Irrigation in Bend, OR | Newport Ave
              </a>
              <a href="/resources/how-to-maintain-paver-patio-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                How to Maintain a Paver Patio in Bend, OR | Newport Ave
              </a>
              <a href="/resources/how-to-plant-trees-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                How to Plant Trees in Bend, Oregon
              </a>
              <a href="/resources/how-to-prevent-lawn-fungus-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                How to Prevent Lawn Fungus in Bend, Oregon | Newport Ave
              </a>
              <a href="/resources/how-to-read-landscape-proposal-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                How to Read a Landscape Proposal in Bend, OR | Newport Ave
              </a>
              <a href="/resources/how-to-select-pavers-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                How to Select Pavers for Your Bend, OR Patio | Newport Ave
              </a>
              <a href="/resources/how-to-water-lawn-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                How to Water Your Lawn in Bend, Oregon | Newport Ave
              </a>
              <a href="/resources/how-to-xeriscape-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                How to Xeriscape in Bend, Oregon
              </a>
              <a href="/resources/best-grass-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Best Grass for Bend, Oregon | What Grows in Central Oregon
              </a>
              <a href="/resources/when-to-plant-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                When to Plant in Bend, Oregon | Planting Calendar for Zone 6a
              </a>
              <a href="/resources/brown-lawn-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Why Is My Lawn Turning Brown in Bend? | Diagnosis &amp; Fix
              </a>
              <a href="/resources/professional-vs-diy-landscaping-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Professional vs. DIY Landscaping in Bend, OR | Newport Ave
              </a>
          </div>
        </div>
        {/* ── Fire-Wise Landscaping Section ── */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "1rem", borderBottom: "3px solid oklch(0.55 0.20 25)", paddingBottom: "0.6rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "oklch(0.15 0.005 0)", fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)", margin: 0 }}>
              🔥 Fire-Wise Landscaping & Defensible Space
            </h2>
            <span style={{ fontFamily: "var(--font-label)", fontSize: "0.62rem", color: "oklch(0.55 0.008 0)", letterSpacing: "0.06em" }}>4 GUIDES — NEW 2026</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0.75rem" }}>
            <a href="/resources/defensible-space-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.55 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
              The Ultimate Defensible Space Guide for Bend, Oregon
            </a>
            <a href="/resources/deschutes-county-fire-hardening-requirements" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.55 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
              Deschutes County Fire Hardening Requirements R327 (2026)
            </a>
            <a href="/resources/fire-resistant-plants-central-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.55 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
              Fire-Resistant Plants for Central Oregon Landscaping
            </a>
            <a href="/resources/juniper-removal-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.55 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
              Juniper Removal in Bend, Oregon | Fire Risk &amp; Replacement Guide
            </a>
          </div>
        </div>
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "1rem", borderBottom: "1px solid oklch(0.88 0.008 0)", paddingBottom: "0.6rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "oklch(0.15 0.005 0)", fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)", margin: 0 }}>
              Seasonal & Maintenance Guides
            </h2>
            <span style={{ fontFamily: "var(--font-label)", fontSize: "0.62rem", color: "oklch(0.55 0.008 0)", letterSpacing: "0.06em" }}>9 ARTICLES</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0.75rem" }}>
            
              <a href="/resources/central-oregon-landscaping-guide" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Central Oregon Landscaping Guide
              </a>
              <a href="/resources/fall-landscaping-guide-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Fall Landscaping Guide for Bend, Oregon | Newport Ave
              </a>
              <a href="/resources/landscaping-tips-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Landscaping Tips for Bend, Oregon Homeowners | Newport Ave
              </a>
              <a href="/resources/landscaping-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Landscaping in Bend, Oregon: The Complete Guide | Newport Ave
              </a>
              <a href="/resources/lawn-fungus-treatment-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Lawn Fungus Treatment in Bend, Oregon — Identification and Treatment Guide
              </a>
              <a href="/resources/spring-landscaping-guide-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Spring Landscaping Guide for Bend, Oregon | Newport Ave
              </a>
              <a href="/resources/sprinkler-winterization-guide-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Sprinkler Winterization Guide for Bend, OR | Newport Ave
              </a>
              <a href="/resources/summer-landscaping-guide-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Summer Landscaping Guide for Bend, Oregon | Newport Ave
              </a>
              <a href="/resources/winter-landscaping-guide-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Winter Landscaping Guide for Bend, Oregon | Newport Ave
              </a>
          </div>
        </div>
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "1rem", borderBottom: "1px solid oklch(0.88 0.008 0)", paddingBottom: "0.6rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "oklch(0.15 0.005 0)", fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)", margin: 0 }}>
              Comparisons
            </h2>
            <span style={{ fontFamily: "var(--font-label)", fontSize: "0.62rem", color: "oklch(0.55 0.008 0)", letterSpacing: "0.06em" }}>7 ARTICLES</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0.75rem" }}>
            
              <a href="/resources/drip-vs-spray-irrigation-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Drip vs. Spray Irrigation in Bend, OR
              </a>
              <a href="/resources/gas-vs-propane-fire-pit-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Gas vs. Propane Fire Pit in Bend, Oregon — Which Should You Choose?
              </a>
              <a href="/resources/native-vs-adapted-plants-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Native vs. Adapted Plants for Bend, OR
              </a>
              <a href="/resources/natural-stone-vs-concrete-pavers-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Natural Stone vs. Concrete Pavers in Bend, Oregon — Which Is Better?
              </a>
              <a href="/resources/pavers-vs-concrete-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Pavers vs. Concrete Patio in Bend, OR
              </a>
              <a href="/resources/sod-vs-seed-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Sod vs. Seed for Lawns in Bend, OR
              </a>
              <a href="/resources/xeriscape-vs-traditional-lawn-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Xeriscape vs. Traditional Lawn in Bend, OR | Newport Ave
              </a>
          </div>
        </div>
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "1rem", borderBottom: "1px solid oklch(0.88 0.008 0)", paddingBottom: "0.6rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "oklch(0.15 0.005 0)", fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)", margin: 0 }}>
              FAQ Hubs
            </h2>
            <span style={{ fontFamily: "var(--font-label)", fontSize: "0.62rem", color: "oklch(0.55 0.008 0)", letterSpacing: "0.06em" }}>11 ARTICLES</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0.75rem" }}>
            
              <a href="/resources/irrigation-faq-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Irrigation FAQ for Bend, Oregon Homeowners — Common Questions Answered
              </a>
              <a href="/resources/faq-lawn-care-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Lawn Care FAQ — Bend, Oregon
              </a>
              <a href="/resources/faq-outdoor-lighting-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Outdoor Lighting FAQ — Bend, Oregon
              </a>
              <a href="/resources/paver-patio-faq-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Paver Patio FAQ for Bend, Oregon Homeowners — Common Questions Answered
              </a>
              <a href="/resources/faq-paver-patio-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Paver Patio FAQ — Bend, Oregon
              </a>
              <a href="/resources/faq-retaining-wall-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Retaining Wall FAQ — Bend, Oregon
              </a>
              <a href="/resources/faq-snow-removal-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Snow Removal FAQ — Bend, Oregon
              </a>
              <a href="/resources/faq-irrigation-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Sprinkler System FAQ — Bend, Oregon
              </a>
              <a href="/resources/faq-water-feature-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Water Feature FAQ — Bend, Oregon
              </a>
              <a href="/resources/xeriscape-faq-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Xeriscape FAQ for Bend, Oregon Homeowners — Common Questions Answered
              </a>
              <a href="/resources/faq-xeriscape-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Xeriscape FAQ — Bend, Oregon
              </a>
          </div>
        </div>
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "1rem", borderBottom: "1px solid oklch(0.88 0.008 0)", paddingBottom: "0.6rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "oklch(0.15 0.005 0)", fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)", margin: 0 }}>
              Landscaping Guides
            </h2>
            <span style={{ fontFamily: "var(--font-label)", fontSize: "0.62rem", color: "oklch(0.55 0.008 0)", letterSpacing: "0.06em" }}>20 ARTICLES</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0.75rem" }}>
            
              <a href="/resources/backflow-preventer-testing-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Backflow Preventer Testing in Bend, Oregon — Annual Testing Requirements
              </a>
              <a href="/resources/bend-turf-rebate-program" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Bend Turf Rebate Program
              </a>
              <a href="/resources/best-plants-xeriscape-central-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Best Plants for Xeriscaping in Central Oregon | Newport Ave
              </a>
              <a href="/resources/commercial-landscaping-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Commercial Landscaping Bend Oregon
              </a>
              <a href="/resources/commercial-landscaping-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Commercial Landscaping in Bend, OR
              </a>
              <a href="/resources/landscaping-home-value-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Does Landscaping Increase Home Value in Bend, OR? | Newport Ave
              </a>
              <a href="/resources/hoa-landscaping-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                HOA Landscaping in Bend, Oregon
              </a>
              <a href="/resources/irrigation-repair-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Irrigation Repair Bend Oregon
              </a>
              <a href="/resources/landscape-design-ideas-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Landscape Design Ideas for Bend, Oregon | Newport Ave
              </a>
              <a href="/resources/landscape-lighting-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Landscape Lighting Bend Oregon
              </a>
              <a href="/resources/landscape-lighting-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Landscape Lighting Ideas for Bend, OR
              </a>
              <a href="/resources/landscape-maintenance-plan-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Landscape Maintenance Plans in Bend, OR | Newport Ave
              </a>
              <a href="/resources/landscape-transformation-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Landscape Transformations in Bend, Oregon | Newport Ave
              </a>
              <a href="/resources/landscape-warranty-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Landscape Warranty in Bend, Oregon
              </a>
              <a href="/resources/landscaping-company-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Landscaping Companies in Bend, OR
              </a>
              <a href="/resources/landscaping-seasons-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Landscaping Seasons in Bend, Oregon
              </a>
              <a href="/resources/new-construction-landscaping-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                New Construction Landscaping in Bend, OR | Newport Ave
              </a>
              <a href="/resources/snow-removal-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Snow Removal Services in Bend, Oregon
              </a>
              <a href="/resources/understanding-soil-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                Understanding Soil in Bend, Oregon
              </a>
              <a href="/resources/when-to-aerate-lawn-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
                When to Aerate Your Lawn in Bend, Oregon | Newport Ave
              </a>
          </div>
        </div>
          
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "1rem", borderBottom: "1px solid oklch(0.88 0.008 0)", paddingBottom: "0.6rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "oklch(0.15 0.005 0)", fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)", margin: 0 }}>
              Water Conservation &amp; Rebates
            </h2>
            <span style={{ fontFamily: "var(--font-label)", fontSize: "0.62rem", color: "oklch(0.55 0.008 0)", letterSpacing: "0.06em" }}>5 GUIDES</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0.75rem" }}>
            <a href="/resources/bend-watering-restrictions" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
              Bend Watering Restrictions — Odd/Even Rules & Hours
              <span style={{ fontWeight: 400, fontSize: "0.75rem", color: "oklch(0.50 0.008 30)" }}>City of Bend official watering schedule</span>
            </a>
            <a href="/resources/bend-turf-replacement-rebate" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
              Bend Turf Replacement Rebate — $3/sq ft (2026 Season Open)
              <span style={{ fontWeight: 400, fontSize: "0.75rem", color: "oklch(0.50 0.008 30)" }}>Get up to $3,000 to replace your lawn</span>
            </a>
            <a href="/resources/water-wise-landscaping-bend-oregon" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
              Water-Wise Landscaping in Bend, Oregon
              <span style={{ fontWeight: 400, fontSize: "0.75rem", color: "oklch(0.50 0.008 30)" }}>Design strategies for Central Oregon's dry climate</span>
            </a>
            <a href="/resources/waterwise-communities-bend-hoa" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
              WaterWise Communities — HOA &amp; Commercial Rebates
              <span style={{ fontWeight: 400, fontSize: "0.75rem", color: "oklch(0.50 0.008 30)" }}>50% match up to $10,000 for HOAs</span>
            </a>
            <a href="/services/water-wise-landscaping" className="resource-card" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem" }}>
              Water-Wise Landscaping Services — Bend, OR
              <span style={{ fontWeight: 400, fontSize: "0.75rem", color: "oklch(0.50 0.008 30)" }}>Drought-tolerant design &amp; irrigation upgrades</span>
            </a>
          </div>
        </div>

        <div style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "1rem", borderBottom: "1px solid oklch(0.88 0.008 0)", paddingBottom: "0.6rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "oklch(0.15 0.005 0)", fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)", margin: 0 }}>
              Blog Posts
            </h2>
            <span style={{ fontFamily: "var(--font-label)", fontSize: "0.62rem", color: "oklch(0.55 0.008 0)", letterSpacing: "0.06em" }}>4 POSTS</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0.75rem" }}>
            
              <a href="/blog/lawn-care-bend-oregon" style={{ display: "block", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.72 0.12 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4 }}>
                Lawn Care in Bend Oregon — Complete Seasonal Guide | Newport Ave
              </a>
              <a href="/blog/paver-patio-ideas-bend-oregon" style={{ display: "block", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.72 0.12 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4 }}>
                Paver Patio Ideas Bend Oregon — Design Inspiration | Newport Ave
              </a>
              <a href="/blog/sprinkler-winterization-bend-oregon" style={{ display: "block", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.72 0.12 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4 }}>
                Sprinkler Winterization Bend Oregon — When & Why | Newport Ave
              </a>
              <a href="/blog/xeriscape-landscaping-bend-oregon" style={{ display: "block", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.72 0.12 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4 }}>
                Xeriscape Landscaping Bend Oregon — Complete Guide | Newport Ave
              </a>
          </div>
        </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "oklch(0.46 0.20 25)", padding: "4rem 0", textAlign: "center" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 1.5rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "#fff", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", marginBottom: "1rem" }}>
            Ready to Start Your Project?
          </h2>
          <p style={{ color: "oklch(0.92 0.05 25)", marginBottom: "2rem", fontWeight: 300 }}>
            Call us at <a href="tel:+15416178873" style={{ color: "#fff", fontWeight: 600 }}>(541) 617-8873</a> or request a free quote online.
          </p>
          <a href="/contact" style={{ display: "inline-block", background: "#fff", color: "oklch(0.46 0.20 25)", padding: "0.85rem 2.2rem", fontFamily: "var(--font-label)", fontSize: "0.75rem", letterSpacing: "0.1em", textDecoration: "none", fontWeight: 700 }}>
            GET A FREE QUOTE
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
