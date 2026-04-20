import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import { BreadcrumbSchema } from "@/components/SchemaMarkup";
import { Link } from "wouter";

export default function XeriscapeBend() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.97 0.003 0)" }}>
      <SEO
        title="Xeriscape Landscaping Bend Oregon — Complete Guide | Newport Ave"
        description="Everything you need to know about xeriscape landscaping in Bend, Oregon. Drought-tolerant plants, design principles & cost savings for Central Oregon's high desert climate."
        canonical="https://newportavelandscaping.com/blog/xeriscape-landscaping-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: "Xeriscape Landscaping in Bend, Oregon", url: "/blog/xeriscape-landscaping-bend-oregon" },
      ]} />
      <Navbar />
      <div style={{ paddingTop: "204px" }}>
        <div
          className="relative flex items-center justify-center"
          style={{
            height: "380px",
            backgroundImage: "url(https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/brokentop-xeriscape-01_064e5008.jpg",
            backgroundSize: "cover",
            backgroundPosition: "center 50%",
          }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "oklch(0 0 0 / 0.55)" }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.7rem", letterSpacing: "0.18em" }}>
              XERISCAPE & WATER CONSERVATION &nbsp;·&nbsp; MARCH 2024
            </p>
            <h1 className="font-display text-white" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", maxWidth: "700px", margin: "0 auto" }}>
              Xeriscape Landscaping in Bend, Oregon: The Complete Guide
            </h1>
          </div>
        </div>

        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: "oklch(0.25 0.005 0)" }}>
            <p className="font-body mb-8" style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "oklch(0.35 0.005 0)" }}>
              Bend, Oregon sits at 3,600 feet in the high desert — a climate defined by low annual precipitation (around 12 inches), intense summer UV, alkaline soils, and dramatic temperature swings. For homeowners, a traditional grass-heavy landscape is expensive to maintain and constantly fighting the environment. Xeriscape landscaping works with Bend's natural conditions rather than against them, delivering a beautiful yard that uses up to 60% less water.
            </p>

            <h2 className="font-display mb-4" style={{ fontSize: "1.8rem", color: "oklch(0.15 0.005 0)" }}>
              What Is Xeriscape — and Why Is It Perfect for Bend?
            </h2>
            <p className="font-body mb-6" style={{ lineHeight: 1.8 }}>
              Xeriscape (from the Greek <em>xeros</em>, meaning dry) is a landscaping philosophy built around seven core principles: planning and design, soil improvement, practical turf areas, appropriate plant selection, efficient irrigation, mulching, and proper maintenance. It does not mean a yard full of rocks and cacti — done well, a xeriscape in Bend can be lush, colorful, and full of texture from spring through fall.
            </p>
            <p className="font-body mb-8" style={{ lineHeight: 1.8 }}>
              Central Oregon's high desert climate makes xeriscape the logical choice. The Deschutes Basin is already under water stress, and Bend's municipal water rates have risen steadily. A well-designed xeriscape can reduce outdoor water use by 50–70%, translating to real savings — often $80–$150 per month during peak summer irrigation season.
            </p>

            <h2 className="font-display mb-4" style={{ fontSize: "1.8rem", color: "oklch(0.15 0.005 0)" }}>
              Best Drought-Tolerant Plants for Central Oregon
            </h2>
            <p className="font-body mb-4" style={{ lineHeight: 1.8 }}>
              Plant selection is the heart of any xeriscape. The goal is to choose species adapted to Bend's USDA Zone 6b climate — plants that handle hard freezes in winter and dry, hot summers.
            </p>
            <ul className="space-y-3 pl-6 list-disc font-body mb-8" style={{ lineHeight: 1.8 }}>
              <li><strong>Lavender (Lavandula angustifolia):</strong> Thrives in alkaline, well-drained soil. Blooms June–August, attracts pollinators. 'Hidcote' and 'Munstead' are the most cold-hardy varieties for Bend.</li>
              <li><strong>Ornamental Grasses:</strong> Blue oat grass, Karl Foerster feather reed grass, and Blue Grama provide year-round structure and require almost no supplemental water once established.</li>
              <li><strong>Sagebrush (Artemisia tridentata):</strong> Native to Central Oregon. Virtually zero water once established. Provides a strong, silvery-gray architectural element.</li>
              <li><strong>Sedum (Stonecrop):</strong> Low-growing succulent groundcover. 'Autumn Joy' adds late-season color when most plants are fading.</li>
              <li><strong>Yarrow (Achillea millefolium):</strong> Native to the region. Blooms in white, yellow, and red. Tolerates poor soil and supports beneficial insects.</li>
              <li><strong>Russian Sage (Perovskia atriplicifolia):</strong> Tall, airy, silver-blue spikes from July through September. One of the best performers in Bend's climate.</li>
            </ul>

            <div
              className="p-6 mb-8"
              style={{ borderLeft: "3px solid oklch(0.46 0.20 25)", backgroundColor: "oklch(0.94 0.003 0)" }}
            >
              <p className="font-label text-xs mb-2" style={{ color: "oklch(0.46 0.20 25)", letterSpacing: "0.15em" }}>PRO TIP</p>
              <p className="font-body" style={{ lineHeight: 1.8 }}>
                Group plants by water need — a technique called "hydrozoning." Put your highest-water plants closest to the house where they're easy to hand-water, and your drought-tolerant perennials and shrubs in the outer zones. This single design decision can cut your irrigation runtime by 30%.
              </p>
            </div>

            <h2 className="font-display mb-4" style={{ fontSize: "1.8rem", color: "oklch(0.15 0.005 0)" }}>
              Xeriscape Design Principles That Work in Bend
            </h2>
            <p className="font-body mb-4" style={{ lineHeight: 1.8 }}>
              A successful xeriscape in Central Oregon starts with soil. Bend's native soil is volcanic pumice — fast-draining and low in organic matter. Before planting, we amend beds with 3–4 inches of compost worked in to 8 inches deep. This improves water retention while still draining well enough to prevent root rot.
            </p>
            <p className="font-body mb-8" style={{ lineHeight: 1.8 }}>
              Mulch is the second critical element. A 3-inch layer of wood chip mulch over planting beds reduces evaporation by up to 70%, suppresses weeds, and moderates soil temperature. Efficient drip irrigation completes the system — delivering water directly to root zones with minimal evaporation, far more efficient than spray heads in Bend's low-humidity, often-windy conditions.
            </p>

            <h2 className="font-display mb-4" style={{ fontSize: "1.8rem", color: "oklch(0.15 0.005 0)" }}>
              What a Xeriscape Transformation Costs in Bend
            </h2>
            <p className="font-body mb-8" style={{ lineHeight: 1.8 }}>
              A full front yard xeriscape in Bend typically ranges from $8,000 to $25,000 depending on square footage, design complexity, hardscape elements, and whether existing turf needs removal. The investment pays back through water savings — most clients see irrigation bills drop by $600–$1,500 per year. Bend also offers rebates through the City's water conservation program for turf removal and conversion to water-wise landscaping.
            </p>

            <div
              className="p-8 text-center mt-12"
              style={{ backgroundColor: "oklch(0.18 0.008 0)" }}
            >
              <p className="font-label text-xs mb-3" style={{ color: "oklch(0.46 0.20 25)", letterSpacing: "0.18em" }}>
                READY TO TRANSFORM YOUR YARD?
              </p>
              <h3 className="font-display text-white mb-4" style={{ fontSize: "1.6rem" }}>
                Get a Free Xeriscape Design Consultation
              </h3>
              <p className="font-body mb-6" style={{ color: "oklch(0.72 0.005 0)", lineHeight: 1.7 }}>
                Our design team has completed hundreds of xeriscape transformations across Bend, Redmond, and Sisters. We'll assess your property, discuss your vision, and provide a detailed proposal — at no cost.
              </p>
              <Link href="/contact">
                <span className="btn-red inline-block">Schedule Your Free Consultation →</span>
              </Link>
            </div>
          {/* ── You might also like / Related Services ── */}
            <div className="mt-12 pt-10" style={{ borderTop: "1px solid oklch(0.88 0.005 0)" }}>
              <p className="font-label mb-2" style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.62rem", letterSpacing: "0.18em" }}>
                RELATED SERVICES
              </p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: "clamp(1.3rem, 2vw, 1.8rem)", color: "oklch(0.15 0.005 0)" }}>
                Explore Our Services
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/services/xeriscaping">
                  <span
                    style={{
                      display: "block",
                      padding: "1.1rem 1.25rem",
                      backgroundColor: "oklch(1 0 0)",
                      borderLeft: "3px solid oklch(0.46 0.20 25)",
                      textDecoration: "none",
                    }}
                  >
                    <div className="font-body" style={{ color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.3rem" }}>
                      Xeriscaping Services
                    </div>
                    <div className="font-body" style={{ color: "oklch(0.50 0.008 30)", fontSize: "0.75rem", fontWeight: 300, lineHeight: 1.5 }}>
                      Our full xeriscape design and installation service in Central Oregon.
                    </div>
                  </span>
                </Link>
                <Link href="/services/landscape-design">
                  <span
                    style={{
                      display: "block",
                      padding: "1.1rem 1.25rem",
                      backgroundColor: "oklch(1 0 0)",
                      borderLeft: "3px solid oklch(0.46 0.20 25)",
                      textDecoration: "none",
                    }}
                  >
                    <div className="font-body" style={{ color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.3rem" }}>
                      Landscape Design
                    </div>
                    <div className="font-body" style={{ color: "oklch(0.50 0.008 30)", fontSize: "0.75rem", fontWeight: 300, lineHeight: 1.5 }}>
                      Custom landscape architecture and design for Bend homes.
                    </div>
                  </span>
                </Link>
                <Link href="/services/irrigation">
                  <span
                    style={{
                      display: "block",
                      padding: "1.1rem 1.25rem",
                      backgroundColor: "oklch(1 0 0)",
                      borderLeft: "3px solid oklch(0.46 0.20 25)",
                      textDecoration: "none",
                    }}
                  >
                    <div className="font-body" style={{ color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.3rem" }}>
                      Irrigation Installation
                    </div>
                    <div className="font-body" style={{ color: "oklch(0.50 0.008 30)", fontSize: "0.75rem", fontWeight: 300, lineHeight: 1.5 }}>
                      Water-efficient drip and sprinkler systems for xeriscape landscapes.
                    </div>
                  </span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
