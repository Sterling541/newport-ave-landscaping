import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { BreadcrumbSchema } from "@/components/SchemaMarkup";
import { Link } from "wouter";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/broken-top-hero-K9hQidnQKaurF2BVLXVpdL.webp";

export default function BrokenTopNeighborhood() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.985 0.006 80)" }}>
      <SEO
        title="Broken Top Landscaping — Bend, Oregon | Newport Avenue Landscaping"
        description="Luxury landscaping for Broken Top homes in Bend, OR. Estate design, water features, outdoor living, HOA compliance, and year-round maintenance inside Bend's premier gated community. LCB #9153."
        canonical="https://www.newportavelandscaping.com/service-areas/broken-top-landscaping"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Service Areas", url: "/service-areas" },
        { name: "Broken Top Landscaping", url: "/service-areas/broken-top-landscaping" },
      ]} />
      <Navbar />

      <div style={{ paddingTop: "204px" }}>
        <div
          className="relative flex items-center justify-center"
          style={{
            height: "420px",
            backgroundImage: `url(${HERO_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center 35%",
          }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "oklch(0 0 0 / 0.45)" }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.7rem", letterSpacing: "0.18em" }}>
              NEIGHBORHOOD LANDSCAPING &middot; BEND, OREGON
            </p>
            <h1 className="font-display text-white" style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", maxWidth: "760px", margin: "0 auto", lineHeight: 1.15 }}>
              Broken Top Landscaping
            </h1>
            <p className="mt-4 font-body" style={{ color: "oklch(0.88 0.006 75)", fontSize: "1.05rem", maxWidth: "560px", margin: "1rem auto 0" }}>
              Luxury estate design, water features &amp; year-round maintenance inside Bend's most prestigious gated community.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-16 max-w-3xl mx-auto">
        <div style={{ color: "oklch(0.25 0.005 0)" }}>

          <p className="mb-8" style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "oklch(0.35 0.005 0)" }}>
            Broken Top is Bend's most exclusive address — a gated community surrounding a private golf course with views of the Broken Top volcanic peak and the Three Sisters. The homes here demand landscaping that matches their scale and quality. Newport Avenue Landscaping has maintained and transformed some of Broken Top's most prominent estates for over two decades. We understand the community's standards, the HOA requirements, and the level of craftsmanship these properties require.
          </p>

          <h2 className="text-3xl font-bold mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>Services We Provide at Broken Top</h2>
          <ul className="list-disc pl-5 mb-8 space-y-1">
            <li>Luxury estate landscape design and full installation</li>
            <li>Custom water features — ponds, streams, and fountains</li>
            <li>Outdoor living spaces — patios, fire features, pergolas</li>
            <li>HOA design review and compliance documentation</li>
            <li>High-end hardscaping — natural stone, pavers, retaining walls</li>
            <li>Smart irrigation systems with remote monitoring</li>
            <li>Landscape lighting — architectural and accent</li>
            <li>Year-round maintenance programs for estate properties</li>
            <li>Snow removal and winter services</li>
          </ul>

          <h2 className="text-3xl font-bold mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>Estate-Scale Landscape Design</h2>
          <p className="mb-4">
            Broken Top properties are large, and the landscaping has to work at that scale. That means thoughtful sight lines from inside the home, seamless transitions between indoor and outdoor living spaces, and planting compositions that look intentional from every angle — including from the golf course.
          </p>
          <p className="mb-8">
            Our design process for Broken Top starts with a full site analysis: sun exposure, drainage patterns, existing vegetation, and the home's architectural style. We then develop a master plan that addresses the entire property — not just the front yard — before any installation begins.
          </p>

          <h2 className="text-3xl font-bold mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>Broken Top HOA Requirements</h2>
          <p className="mb-8">
            The Broken Top HOA has specific guidelines governing plant palettes, hardscape materials, lighting, and the overall design aesthetic. New installations and significant modifications require HOA approval before work begins. Our team handles the full submission process — design drawings, material specifications, and plant lists — so your project moves forward without delays.
          </p>

          <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: "oklch(0.46 0.20 25)" }}>
            <p className="font-bold text-lg mb-2" style={{ color: "oklch(0.25 0.005 0)" }}>PRO TIP: Water Features at Elevation</p>
            <p>
              Broken Top sits at approximately 3,700 feet. Water features here require freeze-resistant construction — recirculating pumps rated for cold climates, proper drainage to prevent ice damage, and winterization protocols. We design and install every water feature at Broken Top to handle Central Oregon winters without damage.
            </p>
          </div>

          <h2 className="text-3xl font-bold mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>Why Broken Top Homeowners Choose Newport Avenue</h2>
          <p className="mb-4">
            We've worked inside Broken Top long enough to have a relationship with the HOA, the gate staff, and many of the homeowners. Our crews are professional, discreet, and experienced with the access and scheduling requirements of a gated community.
          </p>
          <p className="mb-8">
            We're licensed with the Oregon Landscape Contractors Board (LCB #9153), fully insured, and back every hardscape installation with a 1-year workmanship warranty on hardscape installations and a 90-day plant warranty on all plantings. For estate-scale properties, we assign a dedicated project manager who stays with your project from design through final walkthrough.
          </p>

          <div className="p-8 text-center mt-12" style={{ backgroundColor: "oklch(0.18 0.008 0)" }}>
            <p className="font-label text-xs mb-3" style={{ color: "oklch(0.46 0.20 25)", letterSpacing: "0.18em" }}>GET STARTED TODAY</p>
            <h3 className="font-display text-white mb-4" style={{ fontSize: "1.6rem" }}>Free Consultation for Broken Top Homeowners</h3>
            <p className="font-body mb-6" style={{ color: "oklch(0.72 0.005 0)", lineHeight: 1.7 }}>
              Our design team will walk your property and deliver a detailed estate landscape proposal — no pressure, no obligation.
            </p>
            <Link href="/contact"><span className="btn-red inline-block">Schedule Your Free Consultation →</span></Link>
            <p className="mt-4 text-sm" style={{ color: "oklch(0.60 0.005 0)" }}>Or call us: (541) 617-8873</p>
          </div>

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
              <Link href="/service-areas/northwest-crossing-landscaping">
                <span style={{ display: "block", padding: "1.1rem 1.25rem", backgroundColor: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none" }}>
                  <div className="font-body" style={{ color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.3rem" }}>NorthWest Crossing</div>
                  <div className="font-body" style={{ color: "oklch(0.50 0.008 30)", fontSize: "0.75rem", fontWeight: 300, lineHeight: 1.5 }}>Modern craftsman homes with ARC-compliant landscaping.</div>
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
