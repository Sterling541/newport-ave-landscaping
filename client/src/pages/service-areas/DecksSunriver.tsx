import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { BreadcrumbSchema } from "@/components/SchemaMarkup";

export default function DecksSunriver() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.99 0.002 90)" }}>
      <Helmet>
        <title>Deck Builder Sunriver Oregon | Custom Decks & Pergolas | Newport Avenue Landscaping</title>
        <meta name="description" content="Custom deck building and pergola installation in Sunriver, Oregon. Composite, Trex, cedar, and pressure-treated decks for Sunriver vacation homes and full-time residences. Licensed LCB #9153. Free estimates." />
        <link rel="canonical" href="https://newportavelandscaping.com/service-areas/decks-sunriver-oregon" />
      </Helmet>
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Service Areas", url: "/service-areas" },
        { name: "Deck Builder in Sunriver, Oregon", url: "/service-areas/decks-sunriver-oregon" },
      ]} />
      <Navbar />
      <div style={{ paddingTop: "204px" }}>
        {/* Hero */}
        <div
          className="relative flex items-center justify-center"
          style={{
            height: "380px",
            backgroundImage: "url(https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/deck-fire-pit-bend-oregon-NfZzbGm3vaJF3QeUvUKvhu.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
          }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "oklch(0 0 0 / 0.55)" }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.7rem", letterSpacing: "0.18em" }}>
              SUNRIVER · CENTRAL OREGON · SINCE 2005
            </p>
            <h1 className="font-display text-white" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", maxWidth: "700px", margin: "0 auto" }}>
              Deck Builder in Sunriver, Oregon
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: "oklch(0.25 0.005 0)" }}>
            <p className="mb-8" style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "oklch(0.35 0.005 0)" }}>
              Sunriver is one of Central Oregon's premier resort communities — and a deck is one of the most impactful upgrades you can make to a Sunriver vacation home or full-time residence. Newport Avenue Landscaping builds custom decks throughout Sunriver that maximize the community's stunning natural setting, from forest views to Cascade Mountain vistas. We understand Sunriver's HOA requirements and work within them to deliver decks that enhance your property's value and enjoyment.
            </p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>Decks for Sunriver Vacation Homes</h2>
            <p className="mb-4">
              Many Sunriver properties are vacation rentals or second homes — which means the deck needs to be durable, low-maintenance, and attractive to guests. Composite decking is the clear choice for Sunriver vacation properties: it requires no staining or sealing, handles heavy use from renters, and looks great year after year without maintenance.
            </p>
            <p className="mb-8">
              We also build decks for full-time Sunriver residents who want a premium outdoor space for year-round enjoyment. Whether you want a simple deck off the back door or a full outdoor living space with pergola, outdoor kitchen rough-in, and landscape lighting, we design and build to your specifications.
            </p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>Sunriver HOA Compliance</h2>
            <p className="mb-4">
              Sunriver is governed by the Sunriver Owners Association (SROA), which has architectural review requirements for exterior modifications including decks. Newport Avenue Landscaping is familiar with SROA's design guidelines and can help you navigate the approval process.
            </p>
            <p className="mb-8">
              We prepare the documentation required for SROA architectural review and work with you to ensure your deck design meets community standards before construction begins. This prevents costly changes after approval is denied.
            </p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>Popular Deck Features in Sunriver</h2>
            <ul className="list-disc pl-5 mb-8 space-y-2">
              <li><strong>Forest-view decks</strong> — Sunriver's ponderosa pine forest setting calls for decks that frame the trees; we design railings and layouts that maximize the natural view</li>
              <li><strong>Covered pergolas</strong> — essential for afternoon shade and extending the usable season; popular for vacation rental properties where guest comfort is a priority</li>
              <li><strong>Hot tub platforms</strong> — one of the most popular requests for Sunriver vacation homes; we build structural platforms with proper drainage and access</li>
              <li><strong>Outdoor kitchen integration</strong> — combining a deck with an outdoor kitchen dramatically increases vacation rental appeal and nightly rates</li>
              <li><strong>Deck lighting</strong> — post cap lights, step lights, and under-rail LED strips that make the deck usable after dark and enhance the forest atmosphere</li>
            </ul>

            <h2 className="text-3xl font-bold mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>Deck Cost in Sunriver, Oregon</h2>
            <p className="mb-4">
              Deck projects in Sunriver range from $9,000 for a basic 200 sq ft pressure-treated deck to $65,000+ for a large composite deck with pergola and outdoor kitchen rough-in. A typical 300 sq ft composite deck with railing runs $18,000–$32,000 installed in Sunriver.
            </p>
            <p className="mb-8">
              We provide free, itemized proposals after an on-site consultation. See our full pricing breakdown at <Link href="/resources/deck-cost-bend-oregon"><span style={{ color: "oklch(0.46 0.20 25)", textDecoration: "underline" }}>Deck Cost in Central Oregon</span></Link>.
            </p>

            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: "oklch(0.46 0.20 25)" }}>
              <p className="font-bold text-lg mb-2" style={{ color: "oklch(0.25 0.005 0)" }}>PRO TIP FOR SUNRIVER VACATION RENTAL OWNERS</p>
              <p>
                A well-designed composite deck with a pergola and hot tub platform can increase your Sunriver vacation rental's nightly rate by $50–$150 and significantly improve your Airbnb or VRBO listing's appeal. The ROI on a quality deck in Sunriver is typically 3–5 years for active rental properties.
              </p>
            </div>

            {/* CTA */}
            <div className="p-8 text-center mt-12" style={{ backgroundColor: "oklch(0.18 0.008 0)" }}>
              <p className="font-label text-xs mb-3" style={{ color: "oklch(0.46 0.20 25)", letterSpacing: "0.18em" }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize: "1.6rem" }}>Get a Free Deck Quote in Sunriver</h3>
              <p className="font-body mb-6" style={{ color: "oklch(0.72 0.005 0)", lineHeight: 1.7 }}>
                We serve Sunriver and all of Central Oregon. Our design team will visit your property and provide a detailed proposal at no cost.
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
                <Link href="/service-areas/sunriver">
                  <span style={{ display: "block", padding: "1.1rem 1.25rem", backgroundColor: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none" }}>
                    <div className="font-body" style={{ color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.3rem" }}>All Sunriver Services</div>
                    <div className="font-body" style={{ color: "oklch(0.50 0.008 30)", fontSize: "0.75rem", fontWeight: 300, lineHeight: 1.5 }}>Full landscaping services in Sunriver, OR.</div>
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
