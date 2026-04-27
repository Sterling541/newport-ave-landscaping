import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { BreadcrumbSchema, FAQSchema } from "@/components/SchemaMarkup";

const faqs = [
  {
    question: "How much does a deck cost in Bend, Oregon?",
    answer: "Deck costs in Bend range from $8,000 for a basic 200 sq ft pressure-treated deck to $60,000+ for a large multi-level composite deck with pergola, built-in seating, and lighting. The most common project — a 300–400 sq ft composite deck with cable railing — typically runs $18,000–$32,000 installed.",
  },
  {
    question: "Is composite or wood decking better for Bend's climate?",
    answer: "Composite decking (Trex, TimberTech, Fiberon) is generally the better choice for Bend's climate. It handles UV exposure, freeze-thaw cycles, and occasional snow without warping, fading, or splintering. Cedar is a beautiful natural alternative that performs well but requires periodic staining every 2–3 years. Pressure-treated lumber is the most affordable option but requires the most maintenance.",
  },
  {
    question: "How much does a pergola cost to add to a deck in Bend?",
    answer: "Adding a pergola to a deck in Bend typically adds $6,000–$25,000 to the project cost, depending on size, material, and complexity. A basic open-lattice cedar pergola runs $6,000–$12,000. A solid-roof patio cover runs $10,000–$20,000. A motorized louvered pergola system runs $15,000–$30,000.",
  },
  {
    question: "Do I need a permit to build a deck in Bend?",
    answer: "Yes — decks over 30 inches above grade require a building permit through the City of Bend's Building Division. Newport Avenue Landscaping pulls all required permits as a standard part of every deck project. Unpermitted decks can cause problems at resale and may void homeowner's insurance.",
  },
  {
    question: "How long does it take to build a deck in Bend?",
    answer: "Most residential deck projects in Bend take 1–3 weeks from start to finish. A simple 200–300 sq ft deck takes about 1 week. A large multi-level deck with pergola takes 2–4 weeks. Permit approval from the City of Bend typically adds 1–2 weeks to the overall timeline.",
  },
  {
    question: "What is the most expensive part of building a deck?",
    answer: "The decking material itself (composite vs. wood) and the railing system are typically the two largest cost drivers. Composite decking costs $8–$15 per sq ft for materials vs. $3–$6 for pressure-treated wood. Cable railing costs $150–$250 per linear foot vs. $30–$80 for wood railing. Pergolas and covered structures add significant cost but also significant value.",
  },
];

export default function DeckCostBend() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.99 0.002 90)" }}>
      <Helmet>
        <title>How Much Does a Deck Cost in Bend, Oregon? (2025 Guide)</title>
        <meta name="description" content="2025 deck cost guide for Bend, Oregon. Composite vs. wood, pergola costs, permit fees, and what affects your total. Real pricing from a licensed Bend deck builder." />
        <link rel="canonical" href="https://www.newportavelandscaping.com/resources/deck-cost-bend-oregon" />
      </Helmet>
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Resources", url: "/resources" },
        { name: "Deck Cost in Bend, Oregon", url: "/resources/deck-cost-bend-oregon" },
      ]} />
      <FAQSchema faqs={faqs} />
      <Navbar />
      <div style={{ paddingTop: "204px" }}>
        {/* Hero */}
        <div
          className="relative flex items-center justify-center"
          style={{
            height: "320px",
            backgroundImage: "url(https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/pergola-shade-structure-bend-TqAHbBrJUWJhu6uKRfv8h3.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
          }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "oklch(0 0 0 / 0.60)" }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.7rem", letterSpacing: "0.18em" }}>
              COST GUIDE · BEND, OREGON · 2025
            </p>
            <h1 className="font-display text-white" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", maxWidth: "700px", margin: "0 auto" }}>
              How Much Does a Deck Cost in Bend, Oregon?
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: "oklch(0.25 0.005 0)" }}>
            <p className="mb-8" style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "oklch(0.35 0.005 0)" }}>
              Deck costs in Bend, Oregon range from <strong>$8,000 to $60,000+</strong>, depending on size, materials, railing type, and whether you add a pergola or other features. This guide breaks down real pricing from Newport Avenue Landscaping — a licensed Bend deck builder with 21+ years of experience — so you can budget accurately for your project.
            </p>

            {/* Price table */}
            <div className="mb-10 overflow-x-auto">
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.92rem" }}>
                <thead>
                  <tr style={{ backgroundColor: "oklch(0.18 0.008 0)", color: "oklch(1 0 0)" }}>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left" }}>Project Type</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left" }}>Typical Range</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left" }}>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Basic pressure-treated deck (200 sq ft)", "$8,000 – $14,000", "Simple platform, wood railing"],
                    ["Composite deck (200–300 sq ft)", "$14,000 – $22,000", "Trex/TimberTech, aluminum railing"],
                    ["Composite deck with cable railing (300 sq ft)", "$18,000 – $32,000", "Most popular Bend project"],
                    ["Multi-level composite deck (400+ sq ft)", "$28,000 – $50,000", "Tiered design, cable railing"],
                    ["Deck + open pergola", "$22,000 – $40,000", "Composite deck + cedar pergola"],
                    ["Deck + solid-roof patio cover", "$28,000 – $50,000", "Full weather protection"],
                    ["Deck + motorized louvered pergola", "$35,000 – $65,000+", "Premium outdoor room"],
                    ["Deck repair / refinishing", "$2,000 – $8,000", "Board replacement, staining, railing repair"],
                  ].map(([type, range, notes], i) => (
                    <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "oklch(0.97 0.002 90)" : "oklch(1 0 0)", borderBottom: "1px solid oklch(0.90 0.002 90)" }}>
                      <td style={{ padding: "0.75rem 1rem", fontWeight: 500 }}>{type}</td>
                      <td style={{ padding: "0.75rem 1rem", color: "oklch(0.46 0.20 25)", fontWeight: 600 }}>{range}</td>
                      <td style={{ padding: "0.75rem 1rem", color: "oklch(0.45 0.005 0)", fontSize: "0.85rem" }}>{notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-bold mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>What Drives Deck Cost in Bend</h2>

            <h3 className="text-xl font-bold mb-3 mt-6" style={{ color: "oklch(0.25 0.005 0)" }}>1. Decking Material</h3>
            <p className="mb-4">
              The decking material is the single biggest cost driver. Here's how the main options compare:
            </p>
            <ul className="list-disc pl-5 mb-6 space-y-2">
              <li><strong>Pressure-treated lumber:</strong> $3–$6 per sq ft for materials. Most affordable upfront, but requires staining every 2–3 years and board replacement over time. Best for secondary decks or budget-conscious projects.</li>
              <li><strong>Western red cedar:</strong> $5–$9 per sq ft for materials. Beautiful natural look, naturally rot-resistant, requires periodic maintenance. Popular for Bend homes with a rustic or craftsman aesthetic.</li>
              <li><strong>Composite (Trex, TimberTech, Fiberon):</strong> $8–$15 per sq ft for materials. The most popular choice in Bend. Handles UV, freeze-thaw, and heavy use without maintenance. 25–30 year warranties. Higher upfront cost, lower lifetime cost.</li>
              <li><strong>Hardwood (Ipe, Cumaru):</strong> $12–$22 per sq ft for materials. Premium tropical hardwoods with exceptional durability and a rich appearance. 40+ year lifespan with proper maintenance.</li>
            </ul>

            <h3 className="text-xl font-bold mb-3 mt-6" style={{ color: "oklch(0.25 0.005 0)" }}>2. Railing System</h3>
            <p className="mb-4">
              Railing is the second-largest cost variable and has a major impact on the deck's appearance:
            </p>
            <ul className="list-disc pl-5 mb-6 space-y-2">
              <li><strong>Wood railing:</strong> $30–$80 per linear foot installed. Most affordable, requires maintenance, traditional look.</li>
              <li><strong>Aluminum railing:</strong> $60–$120 per linear foot installed. Low maintenance, durable, clean modern look.</li>
              <li><strong>Cable railing:</strong> $150–$250 per linear foot installed. The most popular choice in Bend for view preservation. Stainless steel cables with aluminum or wood posts.</li>
              <li><strong>Glass panel railing:</strong> $200–$350 per linear foot installed. Maximum view preservation, premium appearance, requires occasional cleaning.</li>
            </ul>

            <h3 className="text-xl font-bold mb-3 mt-6" style={{ color: "oklch(0.25 0.005 0)" }}>3. Deck Size & Complexity</h3>
            <p className="mb-6">
              Larger decks cost more in total but less per square foot. Multi-level decks cost more than single-level decks of the same total area due to the additional structural work, stairs, and railing. Decks on sloped lots require more structural work than flat-lot decks.
            </p>

            <h3 className="text-xl font-bold mb-3 mt-6" style={{ color: "oklch(0.25 0.005 0)" }}>4. Pergola & Shade Structures</h3>
            <p className="mb-6">
              Adding a pergola or patio cover is one of the most popular upgrades in Bend, where afternoon sun makes shade essential from May through September. A basic open-lattice cedar pergola adds $6,000–$12,000. A solid-roof patio cover adds $10,000–$20,000. A motorized louvered pergola system adds $15,000–$30,000.
            </p>

            <h3 className="text-xl font-bold mb-3 mt-6" style={{ color: "oklch(0.25 0.005 0)" }}>5. Built-In Features</h3>
            <p className="mb-6">
              Built-in bench seating adds $800–$2,500 per section. Integrated planters add $500–$1,500 each. Deck lighting (post caps, step lights, under-rail LED) adds $1,500–$5,000. Hot tub structural reinforcement adds $1,500–$4,000.
            </p>

            <h3 className="text-xl font-bold mb-3 mt-6" style={{ color: "oklch(0.25 0.005 0)" }}>6. Permits & Inspections</h3>
            <p className="mb-6">
              Building permits for decks in Bend typically cost $400–$1,200 depending on project value. Newport Avenue Landscaping includes permit fees in our project quotes and handles all permitting as part of the project.
            </p>

            {/* FAQ */}
            <h2 className="text-3xl font-bold mb-6 mt-12" style={{ color: "oklch(0.25 0.005 0)" }}>Frequently Asked Questions</h2>
            <div className="space-y-6 mb-12">
              {faqs.map((faq, i) => (
                <div key={i} style={{ borderLeft: "3px solid oklch(0.46 0.20 25)", paddingLeft: "1.25rem" }}>
                  <h3 className="font-bold mb-2" style={{ color: "oklch(0.22 0.008 30)", fontSize: "1rem" }}>{faq.question}</h3>
                  <p style={{ color: "oklch(0.40 0.005 0)", lineHeight: 1.75, fontSize: "0.95rem" }}>{faq.answer}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="p-8 text-center mt-12" style={{ backgroundColor: "oklch(0.18 0.008 0)" }}>
              <p className="font-label text-xs mb-3" style={{ color: "oklch(0.46 0.20 25)", letterSpacing: "0.18em" }}>GET A REAL NUMBER</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize: "1.6rem" }}>Get a Free Deck Estimate in Bend</h3>
              <p className="font-body mb-6" style={{ color: "oklch(0.72 0.005 0)", lineHeight: 1.7 }}>
                Every deck is different. The best way to get an accurate number is a free on-site consultation — we'll measure your space, discuss materials and features, and provide a detailed written estimate.
              </p>
              <Link href="/contact"><span className="btn-red inline-block">Schedule Your Free Consultation →</span></Link>
              <p className="mt-4 text-sm" style={{ color: "oklch(0.60 0.005 0)" }}>Or call us: (541) 617-8873</p>
            </div>

            {/* Related links */}
            <div className="mt-12 pt-10" style={{ borderTop: "1px solid oklch(0.88 0.005 0)" }}>
              <p className="font-label mb-2" style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.62rem", letterSpacing: "0.18em" }}>RELATED GUIDES</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: "clamp(1.3rem, 2vw, 1.8rem)", color: "oklch(0.15 0.005 0)" }}>More Cost Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/paver-patio-cost-bend-oregon">
                  <span style={{ display: "block", padding: "1.1rem 1.25rem", backgroundColor: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none" }}>
                    <div className="font-body" style={{ color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.3rem" }}>Paver Patio Cost in Bend</div>
                    <div className="font-body" style={{ color: "oklch(0.50 0.008 30)", fontSize: "0.75rem", fontWeight: 300, lineHeight: 1.5 }}>Compare paver patios vs. decks for your outdoor space.</div>
                  </span>
                </Link>
                <Link href="/resources/fire-pit-patio-cost-bend-oregon">
                  <span style={{ display: "block", padding: "1.1rem 1.25rem", backgroundColor: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none" }}>
                    <div className="font-body" style={{ color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.3rem" }}>Fire Pit & Patio Cost Guide</div>
                    <div className="font-body" style={{ color: "oklch(0.50 0.008 30)", fontSize: "0.75rem", fontWeight: 300, lineHeight: 1.5 }}>Budgeting for fire features alongside your deck.</div>
                  </span>
                </Link>
                <Link href="/services/decks">
                  <span style={{ display: "block", padding: "1.1rem 1.25rem", backgroundColor: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none" }}>
                    <div className="font-body" style={{ color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.3rem" }}>Decks & Pergolas Service</div>
                    <div className="font-body" style={{ color: "oklch(0.50 0.008 30)", fontSize: "0.75rem", fontWeight: 300, lineHeight: 1.5 }}>Full overview of our deck building services.</div>
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
