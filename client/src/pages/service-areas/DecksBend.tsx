import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { BreadcrumbSchema } from "@/components/SchemaMarkup";

export default function DecksBend() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.99 0.002 90)" }}>
      <Helmet>
        <title>Deck Builder Bend Oregon | Custom Decks & Pergolas | Newport Avenue Landscaping</title>
        <meta name="description" content="Custom deck building and pergola installation in Bend, Oregon. Composite, Trex, cedar, and pressure-treated decks. Licensed deck contractor LCB #9153. Free estimates. 21+ years serving Bend." />
        <link rel="canonical" href="https://www.newportavelandscaping.com/service-areas/decks-bend-oregon" />
      </Helmet>
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Service Areas", url: "/service-areas" },
        { name: "Deck Builder in Bend, Oregon", url: "/service-areas/decks-bend-oregon" },
      ]} />
      <Navbar />
      <div style={{ paddingTop: "204px" }}>
        {/* Hero */}
        <div
          className="relative flex items-center justify-center"
          style={{
            height: "380px",
            backgroundImage: "url(https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/deck-cedar-bend-oregon-MrnxE2kAUV87BoHRiq5byv.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
          }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "oklch(0 0 0 / 0.55)" }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.7rem", letterSpacing: "0.18em" }}>
              BEND · CENTRAL OREGON · SINCE 2005
            </p>
            <h1 className="font-display text-white" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", maxWidth: "700px", margin: "0 auto" }}>
              Deck Builder in Bend, Oregon
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: "oklch(0.25 0.005 0)" }}>
            <p className="mb-8" style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "oklch(0.35 0.005 0)" }}>
              Newport Avenue Landscaping has been building custom decks throughout Bend for over 21 years. From simple pressure-treated platforms to multi-level composite decks with pergolas, built-in seating, and integrated lighting, we design and build outdoor spaces that stand up to Central Oregon's demanding climate and complement Bend's distinctive architectural styles — from craftsman homes in NW Crossing to contemporary builds in Tetherow and Broken Top.
            </p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>Why Bend Homeowners Choose Composite Decking</h2>
            <p className="mb-4">
              Bend's high-desert climate is hard on outdoor materials. Intense UV exposure, significant temperature swings, and occasional heavy snow loads take a toll on lower-quality decking. Composite decking — particularly Trex, TimberTech, and Fiberon — is the most popular choice among Bend homeowners because it handles all of these conditions without warping, fading, or splintering.
            </p>
            <p className="mb-8">
              Most composite manufacturers offer 25–30 year warranties, and the material requires virtually no maintenance beyond occasional washing. The upfront cost is higher than pressure-treated wood, but the lifetime cost is typically lower when you factor in the elimination of staining, sealing, and board replacement.
            </p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>Deck Styles Popular in Bend</h2>
            <ul className="list-disc pl-5 mb-8 space-y-2">
              <li><strong>Single-level decks</strong> — the most common request, typically 200–400 sq ft off the back door, with composite decking and cable or glass railing for mountain views</li>
              <li><strong>Multi-level decks</strong> — popular on sloped Bend lots, especially in Awbrey Butte, Tetherow, and Broken Top where grade changes create natural opportunities for tiered outdoor spaces</li>
              <li><strong>Covered decks with pergolas</strong> — essential for afternoon shade during Bend's sunny summers; we build open-lattice, solid-roof, and motorized louvered pergola systems</li>
              <li><strong>Wraparound decks</strong> — popular on larger homes and properties with multiple outdoor views</li>
              <li><strong>Pool and hot tub decks</strong> — structural platforms designed to support the weight of hot tubs and spas, with proper drainage and slip-resistant decking</li>
            </ul>

            <h2 className="text-3xl font-bold mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>Decking Materials We Install in Bend</h2>
            <ul className="list-disc pl-5 mb-8 space-y-1">
              <li>Trex Transcend, Select, and Enhance composite decking</li>
              <li>TimberTech AZEK and PRO composite decking</li>
              <li>Fiberon composite decking</li>
              <li>Western red cedar and redwood</li>
              <li>Pressure-treated lumber (framing and decking)</li>
              <li>Ipe and other hardwood decking</li>
            </ul>

            <h2 className="text-3xl font-bold mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>Permits & Inspections in Bend</h2>
            <p className="mb-4">
              Decks over 30 inches above grade require a building permit through the City of Bend's Building Division. Newport Avenue Landscaping pulls all required permits as a standard part of every deck project — we work with the City of Bend's permit office regularly and know exactly what inspectors require.
            </p>
            <p className="mb-8">
              Unpermitted decks can cause serious problems at resale and may void homeowner's insurance coverage. We build every deck to code, and all work is inspected before final completion.
            </p>

            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: "oklch(0.46 0.20 25)" }}>
              <p className="font-bold text-lg mb-2" style={{ color: "oklch(0.25 0.005 0)" }}>PRO TIP FOR BEND HOMEOWNERS</p>
              <p>
                If your lot has a significant grade change — common in Awbrey Butte, Tetherow, and the NW hills — a multi-level deck can turn a challenging slope into one of your property's best features. We specialize in tiered deck designs that maximize usable outdoor space on sloped Bend lots.
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>Deck Cost in Bend, Oregon</h2>
            <p className="mb-4">
              Deck projects in Bend typically range from $8,000 for a basic 200 sq ft pressure-treated deck to $60,000+ for a large composite deck with pergola, built-in seating, and lighting. The most common project — a 300–400 sq ft composite deck with cable railing — runs $18,000–$32,000 installed.
            </p>
            <p className="mb-8">
              We provide free, itemized proposals after an on-site consultation. See our full pricing breakdown at <Link href="/resources/deck-cost-bend-oregon"><span style={{ color: "oklch(0.46 0.20 25)", textDecoration: "underline" }}>Deck Cost in Bend, Oregon</span></Link>.
            </p>

            {/* CTA */}
            <div className="p-8 text-center mt-12" style={{ backgroundColor: "oklch(0.18 0.008 0)" }}>
              <p className="font-label text-xs mb-3" style={{ color: "oklch(0.46 0.20 25)", letterSpacing: "0.18em" }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize: "1.6rem" }}>Get a Free Deck Quote in Bend</h3>
              <p className="font-body mb-6" style={{ color: "oklch(0.72 0.005 0)", lineHeight: 1.7 }}>
                We serve Bend and all of Central Oregon. Our design team will visit your property and provide a detailed proposal at no cost.
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
                    <div className="font-body" style={{ color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.3rem" }}>Deck Cost in Bend</div>
                    <div className="font-body" style={{ color: "oklch(0.50 0.008 30)", fontSize: "0.75rem", fontWeight: 300, lineHeight: 1.5 }}>Detailed pricing guide for composite and wood decks.</div>
                  </span>
                </Link>
                <Link href="/services/decks">
                  <span style={{ display: "block", padding: "1.1rem 1.25rem", backgroundColor: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none" }}>
                    <div className="font-body" style={{ color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.3rem" }}>Decks & Pergolas Service</div>
                    <div className="font-body" style={{ color: "oklch(0.50 0.008 30)", fontSize: "0.75rem", fontWeight: 300, lineHeight: 1.5 }}>Full overview of our deck building services.</div>
                  </span>
                </Link>
                <Link href="/services/outdoor-living">
                  <span style={{ display: "block", padding: "1.1rem 1.25rem", backgroundColor: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none" }}>
                    <div className="font-body" style={{ color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.3rem" }}>Outdoor Kitchens & Living</div>
                    <div className="font-body" style={{ color: "oklch(0.50 0.008 30)", fontSize: "0.75rem", fontWeight: 300, lineHeight: 1.5 }}>Combine your deck with an outdoor kitchen.</div>
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
