import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { BreadcrumbSchema } from "@/components/SchemaMarkup";
import { Link } from "wouter";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/northwest-crossing-hero-QrqsGH69m29uDesjwDk8W8.webp";

export default function NorthwestCrossingNeighborhood() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.985 0.006 80)" }}>
      <SEO
        title="NorthWest Crossing Landscaping — Bend, Oregon | Newport Avenue Landscaping"
        description="Expert landscaping for NorthWest Crossing homes in Bend, OR. ARC approval assistance, HOA-compliant designs, drought-tolerant plantings, and irrigation. LCB #9153. Free consultation."
        canonical="https://newportavelandscaping.com/service-areas/northwest-crossing-landscaping"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Service Areas", url: "/service-areas" },
        { name: "NorthWest Crossing Landscaping", url: "/service-areas/northwest-crossing-landscaping" },
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
            backgroundPosition: "center 45%",
          }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "oklch(0 0 0 / 0.48)" }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.7rem", letterSpacing: "0.18em" }}>
              NEIGHBORHOOD LANDSCAPING &middot; BEND, OREGON
            </p>
            <h1 className="font-display text-white" style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", maxWidth: "760px", margin: "0 auto", lineHeight: 1.15 }}>
              NorthWest Crossing Landscaping
            </h1>
            <p className="mt-4 font-body" style={{ color: "oklch(0.88 0.006 75)", fontSize: "1.05rem", maxWidth: "560px", margin: "1rem auto 0" }}>
              ARC-compliant designs, drought-tolerant plantings &amp; year-round maintenance for Bend's most walkable neighborhood.
            </p>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="container py-16 max-w-3xl mx-auto">
        <div style={{ color: "oklch(0.25 0.005 0)" }}>

          {/* Intro */}
          <p className="mb-8" style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "oklch(0.35 0.005 0)" }}>
            NorthWest Crossing is Bend's most intentionally designed neighborhood — craftsman and modern homes, wide sidewalks, mature street trees, and a community culture that takes outdoor aesthetics seriously. The NWX Architectural Review Committee (ARC) enforces those standards with a detailed approval process for any landscape change. Newport Avenue Landscaping has navigated the NWX ARC hundreds of times. We handle the design, the documentation, and the submission so you don't have to.
          </p>

          {/* Services */}
          <h2 className="text-3xl font-bold mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>Services We Provide in NorthWest Crossing</h2>
          <ul className="list-disc pl-5 mb-8 space-y-1">
            <li>ARC design review preparation and submission support</li>
            <li>Drought-tolerant and native plant installation</li>
            <li>Landscape design and full-yard installation</li>
            <li>Smart irrigation system design, installation, and repair</li>
            <li>Custom paver patios, walkways, and outdoor living spaces</li>
            <li>Seasonal color programs and annual bed rotations</li>
            <li>Year-round maintenance — mowing, pruning, fertilization</li>
            <li>Spring and fall cleanups</li>
          </ul>

          {/* ARC section */}
          <h2 className="text-3xl font-bold mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>Navigating the NWX ARC Approval Process</h2>
          <p className="mb-4">
            The NorthWest Crossing ARC requires detailed plans before any significant landscape change — botanical plant lists, irrigation diagrams, material samples, and site drawings. Incomplete submissions get rejected, which delays your project by weeks. Our design team prepares complete, ARC-ready packages that get approved the first time.
          </p>
          <p className="mb-8">
            We've worked with the NWX ARC long enough to know exactly what reviewers look for and what triggers a rejection. That experience saves you time and money before a single shovel hits the ground.
          </p>

          {/* Pro tip */}
          <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: "oklch(0.46 0.20 25)" }}>
            <p className="font-bold text-lg mb-2" style={{ color: "oklch(0.25 0.005 0)" }}>PRO TIP: ARC Submissions</p>
            <p>
              Always include both botanical and common names in your NWX plant list — the ARC requires both. Also submit a scaled site plan showing setbacks from property lines and existing trees. Newport Avenue handles all of this as part of our standard design process.
            </p>
          </div>

          {/* Plant selection */}
          <h2 className="text-3xl font-bold mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>Plant Selection for NWX's High Desert Climate</h2>
          <p className="mb-8">
            NorthWest Crossing sits at 3,600 feet in USDA Zone 6b — hot, dry summers and cold winters with limited rainfall. The NWX ARC also favors water-wise, native-compatible plantings that blend with the high desert surroundings. Our go-to palette for NWX includes Blue Fescue, various sages, Lavender, Kinnikinnick, Serviceberry, and drought-tolerant ornamental grasses — all ARC-approved and proven in Bend's climate.
          </p>

          {/* Why Newport */}
          <h2 className="text-3xl font-bold mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>Why NWX Homeowners Choose Newport Avenue</h2>
          <p className="mb-4">
            We maintain more properties in NorthWest Crossing than any other landscaping company in Bend. Our crews work in the neighborhood every week — they know the streets, the soil, and the neighbors. We show up on schedule, communicate throughout the project, and back every hardscape installation with a 5-year warranty.
          </p>
          <p className="mb-8">
            We're licensed with the Oregon Landscape Contractors Board (LCB #9153), fully insured, and have a team of 150+ employees. Large enough to handle any scope, local enough to care about every detail.
          </p>

          {/* CTA block */}
          <div className="p-8 text-center mt-12" style={{ backgroundColor: "oklch(0.18 0.008 0)" }}>
            <p className="font-label text-xs mb-3" style={{ color: "oklch(0.46 0.20 25)", letterSpacing: "0.18em" }}>GET STARTED TODAY</p>
            <h3 className="font-display text-white mb-4" style={{ fontSize: "1.6rem" }}>Free Consultation for NWX Homeowners</h3>
            <p className="font-body mb-6" style={{ color: "oklch(0.72 0.005 0)", lineHeight: 1.7 }}>
              Our design team will walk your property, assess your landscape, and deliver a complete ARC-ready proposal — no pressure, no obligation.
            </p>
            <Link href="/contact"><span className="btn-red inline-block">Schedule Your Free Consultation →</span></Link>
            <p className="mt-4 text-sm" style={{ color: "oklch(0.60 0.005 0)" }}>Or call us: (541) 617-8873</p>
          </div>

          {/* Related links */}
          <div className="mt-12 pt-10" style={{ borderTop: "1px solid oklch(0.88 0.005 0)" }}>
            <p className="font-label mb-2" style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.62rem", letterSpacing: "0.18em" }}>YOU MIGHT ALSO LIKE</p>
            <h2 className="font-display font-light mb-6" style={{ fontSize: "clamp(1.3rem, 2vw, 1.8rem)", color: "oklch(0.15 0.005 0)" }}>More Neighborhood Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/service-areas/awbrey-butte-landscaping">
                <span style={{ display: "block", padding: "1.1rem 1.25rem", backgroundColor: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none" }}>
                  <div className="font-body" style={{ color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.3rem" }}>Awbrey Butte</div>
                  <div className="font-body" style={{ color: "oklch(0.50 0.008 30)", fontSize: "0.75rem", fontWeight: 300, lineHeight: 1.5 }}>Hillside design, fire-wise solutions, and HOA compliance.</div>
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
