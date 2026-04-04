import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

export default function Resources() {
  return (
    <div style={{ backgroundColor: "oklch(0.97 0.012 85)", minHeight: "100vh" }}>
      <Helmet>
        <title>Landscaping Resources &amp; Guides for Bend, Oregon | Newport Avenue Landscaping</title>
        <meta name="description" content="Free landscaping guides, cost estimates, how-tos, and seasonal tips for Bend, Oregon homeowners. 88 articles covering irrigation, pavers, xeriscape, lawn care, and more from Newport Avenue Landscaping — 21 years of Central Oregon expertise." />
        <link rel="canonical" href="https://newportavelandscaping.com/resources" />
        <script type="application/ld+json">{`{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Landscaping Resources for Bend, Oregon",
          "description": "Free landscaping guides, cost estimates, and how-tos for Central Oregon homeowners.",
          "url": "https://newportavelandscaping.com/resources",
          "publisher": {
            "@type": "LocalBusiness",
            "@id": "https://newportavelandscaping.com/#business",
            "name": "Newport Avenue Landscaping"
          }
        }`}</script>
      </Helmet>
      <Navbar />

      {/* ── Hero ── */}
      <section style={{ background: "oklch(0.15 0.005 0)", padding: "5rem 0 3rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ fontFamily: "var(--font-label)", color: "oklch(0.72 0.12 25)", fontSize: "0.62rem", letterSpacing: "0.1em", marginBottom: "1rem" }}>RESOURCES &amp; GUIDES</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "#fff", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.05, marginBottom: "1rem" }}>
            Landscaping Knowledge<br />for Central Oregon
          </h1>
          <p style={{ color: "oklch(0.72 0.12 25)", fontWeight: 300, fontSize: "1rem", maxWidth: "600px", lineHeight: 1.7, marginBottom: "2rem" }}>
            88 free guides, cost estimates, how-tos, and seasonal tips written by Newport Avenue Landscaping — 21 years of Central Oregon expertise in one place.
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
            
              <a href="/resources/boulder-landscaping-cost-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Boulder Landscaping Cost in Bend, OR
              </a>
              <a href="/resources/drainage-solutions-cost-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Drainage Solutions Cost in Bend, OR
              </a>
              <a href="/resources/fencing-cost-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Fencing Cost in Bend, OR
              </a>
              <a href="/resources/fire-pit-patio-cost-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Fire Pit & Patio Cost in Bend, OR
              </a>
              <a href="/resources/lawn-care-cost-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                How Much Does Lawn Care Cost in Bend, Oregon? (2024 Pricing Guide)
              </a>
              <a href="/resources/irrigation-repair-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Irrigation Repair Cost in Bend, OR
              </a>
              <a href="/resources/landscape-design-cost-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Landscape Design Cost in Bend, OR
              </a>
              <a href="/resources/landscape-lighting-cost-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Landscape Lighting Cost in Bend, OR
              </a>
              <a href="/resources/landscape-lighting-cost-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Landscape Lighting Cost in Bend, Oregon (2024 Pricing Guide)
              </a>
              <a href="/resources/landscaping-cost-guide-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Landscaping Cost Guide for Bend, Oregon | Newport Ave
              </a>
              <a href="/resources/lawn-aeration-cost-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Lawn Aeration Cost in Bend, Oregon (2024 Pricing Guide)
              </a>
              <a href="/resources/lawn-maintenance-cost-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Lawn Maintenance Cost in Bend, OR
              </a>
              <a href="/resources/mulch-installation-cost-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Mulch Installation Cost in Bend, OR
              </a>
              <a href="/resources/outdoor-kitchen-cost-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Outdoor Kitchen Cost in Bend, OR
              </a>
              <a href="/resources/outdoor-lighting-cost-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Outdoor Lighting Cost in Bend, OR
              </a>
              <a href="/resources/driveway-paver-cost-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Paver Driveway Cost in Bend, OR
              </a>
              <a href="/resources/paver-patio-cost-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Paver Patio Cost in Bend Oregon
              </a>
              <a href="/resources/paver-walkway-cost-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Paver Walkway Cost in Bend, OR
              </a>
              <a href="/resources/perennial-garden-cost-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Perennial Garden Installation Cost in Bend, OR | Newport Ave
              </a>
              <a href="/resources/pergola-cost-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Pergola Cost in Bend, OR
              </a>
              <a href="/resources/retaining-wall-cost-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Retaining Wall Cost in Bend, OR
              </a>
              <a href="/resources/snow-removal-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Snow Removal Cost in Bend, OR
              </a>
              <a href="/resources/sod-installation-cost-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Sod Installation Cost in Bend, OR
              </a>
              <a href="/resources/sprinkler-system-cost-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Sprinkler System Cost in Bend, OR
              </a>
              <a href="/resources/tree-removal-cost-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Tree Removal Cost in Bend, OR
              </a>
              <a href="/resources/water-feature-cost-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Water Feature Cost in Bend, OR
              </a>
              <a href="/resources/xeriscape-cost-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Xeriscape Cost in Bend, OR
              </a>
          </div>
        </div>
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "1rem", borderBottom: "1px solid oklch(0.88 0.008 0)", paddingBottom: "0.6rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "oklch(0.15 0.005 0)", fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)", margin: 0 }}>
              How-To Guides
            </h2>
            <span style={{ fontFamily: "var(--font-label)", fontSize: "0.62rem", color: "oklch(0.55 0.008 0)", letterSpacing: "0.06em" }}>10 ARTICLES</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0.75rem" }}>
            
              <a href="/resources/how-to-choose-landscaper-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                How to Choose a Landscaper in Bend, OR | Newport Ave
              </a>
              <a href="/resources/how-to-install-drip-irrigation-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                How to Install Drip Irrigation in Bend, OR | Newport Ave
              </a>
              <a href="/resources/how-to-maintain-paver-patio-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                How to Maintain a Paver Patio in Bend, OR | Newport Ave
              </a>
              <a href="/resources/how-to-plant-trees-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                How to Plant Trees in Bend, Oregon
              </a>
              <a href="/resources/how-to-prevent-lawn-fungus-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                How to Prevent Lawn Fungus in Bend, Oregon | Newport Ave
              </a>
              <a href="/resources/how-to-read-landscape-proposal-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                How to Read a Landscape Proposal in Bend, OR | Newport Ave
              </a>
              <a href="/resources/how-to-select-pavers-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                How to Select Pavers for Your Bend, OR Patio | Newport Ave
              </a>
              <a href="/resources/how-to-water-lawn-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                How to Water Your Lawn in Bend, Oregon | Newport Ave
              </a>
              <a href="/resources/how-to-xeriscape-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                How to Xeriscape in Bend, Oregon
              </a>
              <a href="/resources/professional-vs-diy-landscaping-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Professional vs. DIY Landscaping in Bend, OR | Newport Ave
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
            
              <a href="/resources/central-oregon-landscaping-guide" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Central Oregon Landscaping Guide
              </a>
              <a href="/resources/fall-landscaping-guide-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Fall Landscaping Guide for Bend, Oregon | Newport Ave
              </a>
              <a href="/resources/landscaping-tips-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Landscaping Tips for Bend, Oregon Homeowners | Newport Ave
              </a>
              <a href="/resources/landscaping-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Landscaping in Bend, Oregon: The Complete Guide | Newport Ave
              </a>
              <a href="/resources/lawn-fungus-treatment-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Lawn Fungus Treatment in Bend, Oregon — Identification and Treatment Guide
              </a>
              <a href="/resources/spring-landscaping-guide-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Spring Landscaping Guide for Bend, Oregon | Newport Ave
              </a>
              <a href="/resources/sprinkler-winterization-guide-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Sprinkler Winterization Guide for Bend, OR | Newport Ave
              </a>
              <a href="/resources/summer-landscaping-guide-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Summer Landscaping Guide for Bend, Oregon | Newport Ave
              </a>
              <a href="/resources/winter-landscaping-guide-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
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
            
              <a href="/resources/drip-vs-spray-irrigation-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Drip vs. Spray Irrigation in Bend, OR
              </a>
              <a href="/resources/gas-vs-propane-fire-pit-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Gas vs. Propane Fire Pit in Bend, Oregon — Which Should You Choose?
              </a>
              <a href="/resources/native-vs-adapted-plants-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Native vs. Adapted Plants for Bend, OR
              </a>
              <a href="/resources/natural-stone-vs-concrete-pavers-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Natural Stone vs. Concrete Pavers in Bend, Oregon — Which Is Better?
              </a>
              <a href="/resources/pavers-vs-concrete-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Pavers vs. Concrete Patio in Bend, OR
              </a>
              <a href="/resources/sod-vs-seed-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Sod vs. Seed for Lawns in Bend, OR
              </a>
              <a href="/resources/xeriscape-vs-traditional-lawn-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
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
            
              <a href="/resources/irrigation-faq-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Irrigation FAQ for Bend, Oregon Homeowners — Common Questions Answered
              </a>
              <a href="/resources/faq-lawn-care-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Lawn Care FAQ — Bend, Oregon
              </a>
              <a href="/resources/faq-outdoor-lighting-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Outdoor Lighting FAQ — Bend, Oregon
              </a>
              <a href="/resources/paver-patio-faq-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Paver Patio FAQ for Bend, Oregon Homeowners — Common Questions Answered
              </a>
              <a href="/resources/faq-paver-patio-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Paver Patio FAQ — Bend, Oregon
              </a>
              <a href="/resources/faq-retaining-wall-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Retaining Wall FAQ — Bend, Oregon
              </a>
              <a href="/resources/faq-snow-removal-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Snow Removal FAQ — Bend, Oregon
              </a>
              <a href="/resources/faq-irrigation-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Sprinkler System FAQ — Bend, Oregon
              </a>
              <a href="/resources/faq-water-feature-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Water Feature FAQ — Bend, Oregon
              </a>
              <a href="/resources/xeriscape-faq-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Xeriscape FAQ for Bend, Oregon Homeowners — Common Questions Answered
              </a>
              <a href="/resources/faq-xeriscape-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
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
            
              <a href="/resources/backflow-preventer-testing-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Backflow Preventer Testing in Bend, Oregon — Annual Testing Requirements
              </a>
              <a href="/resources/bend-turf-rebate-program" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Bend Turf Rebate Program
              </a>
              <a href="/resources/best-plants-xeriscape-central-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Best Plants for Xeriscaping in Central Oregon | Newport Ave
              </a>
              <a href="/resources/commercial-landscaping-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Commercial Landscaping Bend Oregon
              </a>
              <a href="/resources/commercial-landscaping-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Commercial Landscaping in Bend, OR
              </a>
              <a href="/resources/landscaping-home-value-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Does Landscaping Increase Home Value in Bend, OR? | Newport Ave
              </a>
              <a href="/resources/hoa-landscaping-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                HOA Landscaping in Bend, Oregon
              </a>
              <a href="/resources/irrigation-repair-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Irrigation Repair Bend Oregon
              </a>
              <a href="/resources/landscape-design-ideas-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Landscape Design Ideas for Bend, Oregon | Newport Ave
              </a>
              <a href="/resources/landscape-lighting-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Landscape Lighting Bend Oregon
              </a>
              <a href="/resources/landscape-lighting-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Landscape Lighting Ideas for Bend, OR
              </a>
              <a href="/resources/landscape-maintenance-plan-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Landscape Maintenance Plans in Bend, OR | Newport Ave
              </a>
              <a href="/resources/landscape-transformation-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Landscape Transformations in Bend, Oregon | Newport Ave
              </a>
              <a href="/resources/landscape-warranty-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Landscape Warranty in Bend, Oregon
              </a>
              <a href="/resources/landscaping-company-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Landscaping Companies in Bend, OR
              </a>
              <a href="/resources/landscaping-seasons-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Landscaping Seasons in Bend, Oregon
              </a>
              <a href="/resources/new-construction-landscaping-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                New Construction Landscaping in Bend, OR | Newport Ave
              </a>
              <a href="/resources/snow-removal-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Snow Removal Services in Bend, Oregon
              </a>
              <a href="/resources/understanding-soil-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                Understanding Soil in Bend, Oregon
              </a>
              <a href="/resources/when-to-aerate-lawn-bend-oregon" style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1.25rem", background: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none", color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.4, gap: "0.25rem", transition: "transform 0.15s, box-shadow 0.15s" }}>
                When to Aerate Your Lawn in Bend, Oregon | Newport Ave
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
