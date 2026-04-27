import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { BreadcrumbSchema } from "@/components/SchemaMarkup";

export default function DecksRedmond() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.99 0.002 90)" }}>
      <Helmet>
        <title>Deck Builder Redmond Oregon | Custom Decks & Pergolas | Newport Avenue Landscaping</title>
        <meta name="description" content="Custom deck building and pergola installation in Redmond, Oregon. Composite, Trex, cedar, and pressure-treated decks. Licensed deck contractor LCB #9153. Free estimates. Serving Redmond since 2005." />
        <link rel="canonical" href="https://www.newportavelandscaping.com/service-areas/decks-redmond-oregon" />
      </Helmet>
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Service Areas", url: "/service-areas" },
        { name: "Deck Builder in Redmond, Oregon", url: "/service-areas/decks-redmond-oregon" },
      ]} />
      <Navbar />
      <div style={{ paddingTop: "204px" }}>
        {/* Hero */}
        <div
          className="relative flex items-center justify-center"
          style={{
            height: "380px",
            backgroundImage: "url(https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/deck-mountain-view-bend-bu7EENGPccec6cNSaQroxL.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
          }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "oklch(0 0 0 / 0.55)" }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.7rem", letterSpacing: "0.18em" }}>
              REDMOND · CENTRAL OREGON · SINCE 2005
            </p>
            <h1 className="font-display text-white" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", maxWidth: "700px", margin: "0 auto" }}>
              Deck Builder in Redmond, Oregon
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: "oklch(0.25 0.005 0)" }}>
            <p className="mb-8" style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "oklch(0.35 0.005 0)" }}>
              Newport Avenue Landscaping builds custom decks throughout Redmond, Oregon. Redmond's rapid growth has brought a wave of new construction — and with it, homeowners who want to make the most of their outdoor spaces. We build composite, cedar, and pressure-treated decks that stand up to Redmond's high-desert climate and complement everything from newer subdivisions to established Redmond neighborhoods.
            </p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>Deck Building in Redmond's Climate</h2>
            <p className="mb-4">
              Redmond sits at 3,077 feet elevation and experiences more extreme temperature swings than Bend — colder winters and hotter summers. This makes material selection especially important. Composite decking handles Redmond's freeze-thaw cycles without the warping and cracking that affects lower-quality wood decks. We recommend Trex or TimberTech composite for most Redmond projects.
            </p>
            <p className="mb-8">
              For homeowners who prefer natural wood, western red cedar is the best choice for Redmond's climate. It's naturally rot-resistant and handles temperature extremes well, though it requires periodic staining or sealing to maintain its appearance.
            </p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>Popular Deck Projects in Redmond</h2>
            <ul className="list-disc pl-5 mb-8 space-y-2">
              <li><strong>Backyard decks with pergolas</strong> — the most requested project in Redmond; a composite deck with an attached pergola creates a shaded outdoor room perfect for Redmond's sunny summers</li>
              <li><strong>Front porch decks</strong> — many Redmond homes have small or nonexistent front porches; we build welcoming covered front decks that add curb appeal and usable outdoor space</li>
              <li><strong>Multi-level decks</strong> — for Redmond properties with grade changes, tiered decks maximize usable outdoor space</li>
              <li><strong>Hot tub platforms</strong> — structural decks designed to support hot tub weight, with proper drainage and access panels</li>
              <li><strong>Deck replacements</strong> — Redmond has many older homes with deteriorating pressure-treated decks; we replace them with low-maintenance composite</li>
            </ul>

            <h2 className="text-3xl font-bold mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>Deck Cost in Redmond, Oregon</h2>
            <p className="mb-4">
              Deck projects in Redmond range from $7,500 for a basic 200 sq ft pressure-treated deck to $55,000+ for a large composite deck with pergola and built-in features. A typical 300 sq ft composite deck with railing runs $16,000–$28,000 installed in Redmond.
            </p>
            <p className="mb-8">
              We provide free, itemized proposals after an on-site consultation. See our full pricing breakdown at <Link href="/resources/deck-cost-bend-oregon"><span style={{ color: "oklch(0.46 0.20 25)", textDecoration: "underline" }}>Deck Cost in Central Oregon</span></Link>.
            </p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>Permits in Redmond</h2>
            <p className="mb-8">
              Decks over 30 inches above grade require a building permit through the City of Redmond's Building Department. Newport Avenue Landscaping handles all permitting as part of every project. We build to code and all work is inspected before completion.
            </p>

            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: "oklch(0.46 0.20 25)" }}>
              <p className="font-bold text-lg mb-2" style={{ color: "oklch(0.25 0.005 0)" }}>PRO TIP FOR REDMOND HOMEOWNERS</p>
              <p>
                Redmond's afternoon sun is intense from May through September. A pergola with a solid or louvered roof makes the difference between a deck you use every day and one that sits empty during the best months. We always recommend discussing shade options during the design phase.
              </p>
            </div>

            {/* CTA */}
            <div className="p-8 text-center mt-12" style={{ backgroundColor: "oklch(0.18 0.008 0)" }}>
              <p className="font-label text-xs mb-3" style={{ color: "oklch(0.46 0.20 25)", letterSpacing: "0.18em" }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize: "1.6rem" }}>Get a Free Deck Quote in Redmond</h3>
              <p className="font-body mb-6" style={{ color: "oklch(0.72 0.005 0)", lineHeight: 1.7 }}>
                We serve Redmond and all of Central Oregon. Our design team will visit your property and provide a detailed proposal at no cost.
              </p>
              <Link href="/contact"><span className="btn-red inline-block">Schedule Your Free Consultation →</span></Link>
              <p className="mt-4 text-sm" style={{ color: "oklch(0.60 0.005 0)" }}>Or call us: (541) 617-8873</p>
            </div>

            {/* Related links */}
            <div className="mt-12 pt-10" style={{ borderTop: "1px solid oklch(0.88 0.005 0)" }}>
              <p className="font-label mb-2" style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.62rem", letterSpacing: "0.18em" }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: "clamp(1.3rem, 2vw, 1.8rem)", color: "oklch(0.15 0.005 0)" }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/deck-cost-bend-oregon">
                  <span style={{ display: "block", padding: "1.1rem 1.25rem", backgroundColor: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none" }}>
                    <div className="font-body" style={{ color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.3rem" }}>Deck Cost in Central Oregon</div>
                    <div className="font-body" style={{ color: "oklch(0.50 0.008 30)", fontSize: "0.75rem", fontWeight: 300, lineHeight: 1.5 }}>Detailed pricing guide for composite and wood decks.</div>
                  </span>
                </Link>
                <Link href="/services/decks">
                  <span style={{ display: "block", padding: "1.1rem 1.25rem", backgroundColor: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none" }}>
                    <div className="font-body" style={{ color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.3rem" }}>Decks & Pergolas Service</div>
                    <div className="font-body" style={{ color: "oklch(0.50 0.008 30)", fontSize: "0.75rem", fontWeight: 300, lineHeight: 1.5 }}>Full overview of our deck building services.</div>
                  </span>
                </Link>
                <Link href="/service-areas/redmond">
                  <span style={{ display: "block", padding: "1.1rem 1.25rem", backgroundColor: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none" }}>
                    <div className="font-body" style={{ color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.3rem" }}>All Redmond Services</div>
                    <div className="font-body" style={{ color: "oklch(0.50 0.008 30)", fontSize: "0.75rem", fontWeight: 300, lineHeight: 1.5 }}>Full landscaping services in Redmond, OR.</div>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
