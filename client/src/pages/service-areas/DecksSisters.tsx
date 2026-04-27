import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { BreadcrumbSchema } from "@/components/SchemaMarkup";

export default function DecksSisters() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.99 0.002 90)" }}>
      <Helmet>
        <title>Deck Builder Sisters Oregon | Custom Decks & Pergolas | Newport Avenue Landscaping</title>
        <meta name="description" content="Custom deck building and pergola installation in Sisters, Oregon. Composite, Trex, cedar, and pressure-treated decks for Sisters' mountain homes. Licensed LCB #9153. Free estimates." />
        <link rel="canonical" href="https://newportavelandscaping.com/service-areas/decks-sisters-oregon" />
      </Helmet>
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Service Areas", url: "/service-areas" },
        { name: "Deck Builder in Sisters, Oregon", url: "/service-areas/decks-sisters-oregon" },
      ]} />
      <Navbar />
      <div style={{ paddingTop: "204px" }}>
        {/* Hero */}
        <div
          className="relative flex items-center justify-center"
          style={{
            height: "380px",
            backgroundImage: "url(https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/pergola-outdoor-living-bend-oQ5DnPzw7n46WR7M2L4nxF.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
          }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "oklch(0 0 0 / 0.55)" }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.7rem", letterSpacing: "0.18em" }}>
              SISTERS · CENTRAL OREGON · SINCE 2005
            </p>
            <h1 className="font-display text-white" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", maxWidth: "700px", margin: "0 auto" }}>
              Deck Builder in Sisters, Oregon
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: "oklch(0.25 0.005 0)" }}>
            <p className="mb-8" style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "oklch(0.35 0.005 0)" }}>
              Sisters, Oregon offers some of the most spectacular outdoor settings in Central Oregon — views of the Three Sisters peaks, ponderosa pine forests, and wide-open high-desert skies. Newport Avenue Landscaping builds decks in Sisters that frame these views and create outdoor spaces worthy of the surroundings. Whether you're in Black Butte Ranch, Tollgate, or the Sisters city core, we design and build decks that complement Sisters' rustic-mountain aesthetic.
            </p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>Deck Design for Sisters' Mountain Setting</h2>
            <p className="mb-4">
              Sisters sits at 3,182 feet elevation and receives more snowfall than Bend — structural design and material selection are especially important. We engineer deck framing to handle Sisters' snow loads and use materials that perform in freeze-thaw conditions. Composite decking is the most popular choice for Sisters homeowners because it handles the climate without maintenance.
            </p>
            <p className="mb-8">
              Many Sisters homes have a rustic or mountain-lodge aesthetic that calls for natural materials. Western red cedar is a beautiful choice that complements Sisters' architectural character, and we also build with pressure-treated lumber for budget-conscious projects. For premium builds, hardwood decking in ipe or cumaru offers exceptional durability with a rich, warm appearance.
            </p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>View Decks & Multi-Level Designs</h2>
            <p className="mb-4">
              Many Sisters properties have grade changes and elevated positions that create natural opportunities for view decks. We specialize in multi-level deck designs that maximize the Three Sisters views and create distinct outdoor zones — a dining area on one level, a lounging area on another, with stairs connecting them.
            </p>
            <p className="mb-8">
              Elevated decks in Sisters also need proper structural engineering for wind loads — the Sisters area can experience significant wind events, and we build to withstand them.
            </p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>Firewise Deck Design in Sisters</h2>
            <p className="mb-4">
              Sisters is in a high-risk wildfire area. Deck materials and design choices can significantly affect your home's fire resistance. We recommend composite decking over wood for fire-prone areas — composite does not ignite as readily as wood and doesn't accumulate the debris that fuels deck fires.
            </p>
            <p className="mb-8">
              We also recommend non-combustible fascia boards, metal flashing at the deck-house connection, and keeping the area under the deck clear of combustible materials. Our team is familiar with Deschutes County's R327 fire hardening requirements and can help you design a deck that meets them.
            </p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>Deck Cost in Sisters, Oregon</h2>
            <p className="mb-4">
              Deck projects in Sisters range from $9,000 for a basic 200 sq ft pressure-treated deck to $65,000+ for a large composite deck with pergola and mountain-view railing. A typical 300 sq ft composite deck with cable railing runs $20,000–$35,000 installed in Sisters.
            </p>
            <p className="mb-8">
              We provide free, itemized proposals after an on-site consultation. See our full pricing breakdown at <Link href="/resources/deck-cost-bend-oregon"><span style={{ color: "oklch(0.46 0.20 25)", textDecoration: "underline" }}>Deck Cost in Central Oregon</span></Link>.
            </p>

            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: "oklch(0.46 0.20 25)" }}>
              <p className="font-bold text-lg mb-2" style={{ color: "oklch(0.25 0.005 0)" }}>PRO TIP FOR SISTERS HOMEOWNERS</p>
              <p>
                Cable railing is the most popular railing choice in Sisters because it preserves mountain views while meeting code requirements. Glass panel railing is another excellent option for unobstructed views. Both are significantly more expensive than wood or aluminum railing, but the view preservation is worth it for most Sisters homeowners.
              </p>
            </div>

            {/* CTA */}
            <div className="p-8 text-center mt-12" style={{ backgroundColor: "oklch(0.18 0.008 0)" }}>
              <p className="font-label text-xs mb-3" style={{ color: "oklch(0.46 0.20 25)", letterSpacing: "0.18em" }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize: "1.6rem" }}>Get a Free Deck Quote in Sisters</h3>
              <p className="font-body mb-6" style={{ color: "oklch(0.72 0.005 0)", lineHeight: 1.7 }}>
                We serve Sisters and all of Central Oregon. Our design team will visit your property and provide a detailed proposal at no cost.
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
                <Link href="/service-areas/sisters">
                  <span style={{ display: "block", padding: "1.1rem 1.25rem", backgroundColor: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none" }}>
                    <div className="font-body" style={{ color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.3rem" }}>All Sisters Services</div>
                    <div className="font-body" style={{ color: "oklch(0.50 0.008 30)", fontSize: "0.75rem", fontWeight: 300, lineHeight: 1.5 }}>Full landscaping services in Sisters, OR.</div>
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
