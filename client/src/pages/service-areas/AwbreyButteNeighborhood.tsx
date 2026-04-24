import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { BreadcrumbSchema } from "@/components/SchemaMarkup";
import { Link } from "wouter";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/awbrey-butte-hero-KAx3sqK4wSeVZyqPrSPZMP.webp";

export default function AwbreyButteNeighborhood() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.985 0.006 80)" }}>
      <SEO
        title="Awbrey Butte Landscaping — Bend, Oregon | Newport Avenue Landscaping"
        description="Expert landscaping for Awbrey Butte homes in Bend, OR. Hillside design, fire-wise solutions, HOA compliance, drought-tolerant plantings, and irrigation. LCB #9153. Free consultation."
        canonical="https://newportavelandscaping.com/service-areas/awbrey-butte-landscaping"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Service Areas", url: "/service-areas" },
        { name: "Awbrey Butte Landscaping", url: "/service-areas/awbrey-butte-landscaping" },
      ]} />
      <Navbar />

      {/* ── HERO ── */}
      <div style={{ paddingTop: "204px" }}>
        <div
          className="relative flex items-center justify-center"
          style={{
            height: "420px",
            backgroundImage: `url(${HERO_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
          }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "oklch(0 0 0 / 0.52)" }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.7rem", letterSpacing: "0.18em" }}>
              NEIGHBORHOOD LANDSCAPING &middot; BEND, OREGON
            </p>
            <h1 className="font-display text-white" style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", maxWidth: "760px", margin: "0 auto", lineHeight: 1.15 }}>
              Awbrey Butte Landscaping
            </h1>
            <p className="mt-4 font-body" style={{ color: "oklch(0.88 0.006 75)", fontSize: "1.05rem", maxWidth: "560px", margin: "1rem auto 0" }}>
              Hillside design, fire-wise solutions &amp; HOA-compliant landscapes for Bend's most dramatic neighborhood.
            </p>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="container py-16 max-w-3xl mx-auto">
        <div style={{ color: "oklch(0.25 0.005 0)" }}>

          {/* Intro */}
          <p className="mb-8" style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "oklch(0.35 0.005 0)" }}>
            Awbrey Butte sits at 3,600 feet above Bend with panoramic views of the Cascades and the Deschutes River canyon below. The dramatic terrain — steep volcanic slopes, pumice soil, and native juniper — makes it one of the most rewarding and technically demanding landscapes in Central Oregon. Newport Avenue Landscaping has worked on Awbrey Butte for over 21 years. We know the HOA covenants, the fire-wise requirements, and the soil conditions that define every project here.
          </p>

          {/* Services */}
          <h2 className="text-3xl font-bold mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>Services We Provide on Awbrey Butte</h2>
          <ul className="list-disc pl-5 mb-8 space-y-1">
            <li>Hillside &amp; slope design — terracing, retaining walls, erosion control</li>
            <li>Fire-wise landscaping &amp; defensible space creation</li>
            <li>Drought-tolerant and native plant installation</li>
            <li>Custom paver patios, walkways, and outdoor living spaces</li>
            <li>Smart irrigation systems designed for volcanic pumice soil</li>
            <li>Landscape lighting for safety and dramatic effect</li>
            <li>HOA design review and CC&amp;R compliance</li>
            <li>Seasonal maintenance and spring/fall cleanups</li>
          </ul>

          {/* Why Awbrey Butte is unique */}
          <h2 className="text-3xl font-bold mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>Understanding Awbrey Butte's Unique Landscape</h2>
          <p className="mb-4">
            The volcanic pumice soil on Awbrey Butte drains extremely fast — a blessing for some plants, a challenge for others. Nutrient-poor and rocky, it requires careful soil amendment and species selection. The steep grades demand engineered retaining solutions and erosion-resistant plantings. And because much of the butte sits within Bend's Wildland-Urban Interface (WUI) zone, fire-wise design isn't optional — it's essential.
          </p>
          <p className="mb-8">
            Our design team accounts for all of these factors before a single plant goes in the ground. We start with a site assessment, review your HOA's CC&amp;Rs, and build a plan that works with the land rather than against it.
          </p>

          {/* HOA section */}
          <h2 className="text-3xl font-bold mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>Navigating Awbrey Butte HOA Requirements</h2>
          <p className="mb-8">
            Most Awbrey Butte properties fall under HOA covenants that govern plant palettes, hardscape materials, and overall design aesthetics. We've worked with these requirements for over two decades and handle the full review and approval process as part of every project. You won't need to navigate the paperwork alone.
          </p>

          {/* Pro tip */}
          <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: "oklch(0.46 0.20 25)" }}>
            <p className="font-bold text-lg mb-2" style={{ color: "oklch(0.25 0.005 0)" }}>PRO TIP: Fire-Wise Defensible Space</p>
            <p>
              Oregon's WUI requirements mandate a 30-foot defensible space zone around structures in fire-prone areas. On Awbrey Butte, this means removing flammable juniper and dry grasses within that zone and replacing them with fire-resistant natives like Oregon grape, kinnikinnick, and low-growing sage. We include a compliant defensible space plan with every Awbrey Butte project.
            </p>
          </div>

          {/* Why Newport */}
          <h2 className="text-3xl font-bold mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>Why Awbrey Butte Homeowners Choose Newport Avenue</h2>
          <p className="mb-4">
            We've completed hundreds of projects on Awbrey Butte — from small irrigation repairs to full hillside landscape transformations. Our crews know the terrain, the soil, and the neighborhood. We show up on schedule, communicate throughout the project, and back every hardscape installation with a 90-day plant warranty and 1-year irrigation warranty.
          </p>
          <p className="mb-8">
            We're licensed with the Oregon Landscape Contractors Board (LCB #9153), fully insured, and have a team of 150+ employees. Large enough to handle any scope, local enough to care about every detail.
          </p>

          {/* CTA block */}
          <div className="p-8 text-center mt-12" style={{ backgroundColor: "oklch(0.18 0.008 0)" }}>
            <p className="font-label text-xs mb-3" style={{ color: "oklch(0.46 0.20 25)", letterSpacing: "0.18em" }}>GET STARTED TODAY</p>
            <h3 className="font-display text-white mb-4" style={{ fontSize: "1.6rem" }}>Free Consultation for Awbrey Butte Homeowners</h3>
            <p className="font-body mb-6" style={{ color: "oklch(0.72 0.005 0)", lineHeight: 1.7 }}>
              Our design team will walk your property, assess your slope and soil, and deliver a detailed proposal — no pressure, no obligation.
            </p>
            <Link href="/contact"><span className="btn-red inline-block">Schedule Your Free Consultation →</span></Link>
            <p className="mt-4 text-sm" style={{ color: "oklch(0.60 0.005 0)" }}>Or call us: (541) 617-8873</p>
          </div>

          {/* Related links */}
          <div className="mt-12 pt-10" style={{ borderTop: "1px solid oklch(0.88 0.005 0)" }}>
            <p className="font-label mb-2" style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.62rem", letterSpacing: "0.18em" }}>YOU MIGHT ALSO LIKE</p>
            <h2 className="font-display font-light mb-6" style={{ fontSize: "clamp(1.3rem, 2vw, 1.8rem)", color: "oklch(0.15 0.005 0)" }}>More Neighborhood Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/service-areas/northwest-crossing-landscaping">
                <span style={{ display: "block", padding: "1.1rem 1.25rem", backgroundColor: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none" }}>
                  <div className="font-body" style={{ color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.3rem" }}>NorthWest Crossing</div>
                  <div className="font-body" style={{ color: "oklch(0.50 0.008 30)", fontSize: "0.75rem", fontWeight: 300, lineHeight: 1.5 }}>Modern craftsman homes with ARC-compliant landscaping.</div>
                </span>
              </Link>
              <Link href="/service-areas/broken-top-landscaping">
                <span style={{ display: "block", padding: "1.1rem 1.25rem", backgroundColor: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none" }}>
                  <div className="font-body" style={{ color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.3rem" }}>Broken Top</div>
                  <div className="font-body" style={{ color: "oklch(0.50 0.008 30)", fontSize: "0.75rem", fontWeight: 300, lineHeight: 1.5 }}>Luxury estate landscaping inside Bend's premier gated community.</div>
                </span>
              </Link>
              <Link href="/service-areas/bend-westside-landscaping">
                <span style={{ display: "block", padding: "1.1rem 1.25rem", backgroundColor: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none" }}>
                  <div className="font-body" style={{ color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.3rem" }}>Bend's Westside</div>
                  <div className="font-body" style={{ color: "oklch(0.50 0.008 30)", fontSize: "0.75rem", fontWeight: 300, lineHeight: 1.5 }}>Full-service landscaping across Bend's west side neighborhoods.</div>
                </span>
              </Link>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
