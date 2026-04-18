/* ============================================================
   CORE SEO LANDING PAGE — Paver Patios Bend Oregon
   Target keyword: "paver patios Bend" / "paver patio Bend Oregon"
   ============================================================ */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";

const HERO_IMG = "https://newportavelandscaping.com/wp-content/uploads/2022/08/paver-patio-fire-pit-bend-oregon.jpg";

const TYPES = [
  { title: "Concrete Pavers", desc: "Durable, versatile, and available in dozens of colors and textures. Ideal for patios, driveways, and pool decks.", href: "/paver-patios-bend/concrete-pavers" },
  { title: "Natural Stone", desc: "Flagstone, basalt, and slate for a timeless, organic look that complements Bend's high-desert aesthetic.", href: "/services/pavers" },
  { title: "Outdoor Kitchens & Fire Pits", desc: "Complete outdoor living spaces with built-in grills, fire pits, seating walls, and pergolas.", href: "/services/outdoor-living" },
  { title: "Walkways & Driveways", desc: "Permeable and decorative paver systems for paths, driveways, and entry courts.", href: "/services/pavers" },
  { title: "Pool Decks", desc: "Slip-resistant paver surfaces around pools and spas — beautiful and safe.", href: "/services/pavers" },
  { title: "Retaining Walls", desc: "Integrated boulder and block walls that create level patio areas on sloped lots.", href: "/services/retaining-walls" },
];

const PRICING = [
  { item: "Basic Concrete Paver Patio (200–400 sq ft)", range: "$8,000–$16,000" },
  { item: "Mid-Size Patio with Fire Pit (400–800 sq ft)", range: "$16,000–$35,000" },
  { item: "Full Outdoor Living Space (800+ sq ft)", range: "$35,000–$80,000+" },
  { item: "Paver Walkway (per linear foot)", range: "$45–$90/ft" },
  { item: "Paver Driveway (per sq ft)", range: "$18–$35/sq ft" },
];

const FAQS = [
  { q: "How much does a paver patio cost in Bend, Oregon?", a: "A typical paver patio in Bend costs between $8,000 and $35,000 depending on size, material, and complexity. A basic 200–400 sq ft concrete paver patio runs $8,000–$16,000. A full outdoor living space with fire pit, seating walls, and pergola can reach $35,000–$80,000+. Prices shown are typical market ranges for planning purposes only and are not a binding quote. Contact us for a free written estimate." },
  { q: "What type of pavers work best in Bend's climate?", a: "Concrete pavers and natural basalt/flagstone both perform well in Bend's freeze-thaw climate. We recommend pavers rated for ASTM C936 freeze-thaw cycling. Proper base preparation (6–8 inches of compacted crushed rock) is critical in Bend's pumice soils to prevent settling." },
  { q: "How long does paver patio installation take?", a: "A typical residential paver patio takes 3–7 days to install depending on size and complexity. Larger outdoor living spaces with walls, fire pits, and pergolas may take 2–4 weeks." },
  { q: "Do you need a permit for a paver patio in Bend?", a: "Most paver patios in Bend do not require a permit if they are at grade level and not attached to the structure. Raised patios, retaining walls over 4 feet, and structures like pergolas may require a City of Bend building permit. We handle the permit process for projects that require it." },
  { q: "Do you offer financing for paver patio projects?", a: "We can connect you with third-party financing options for larger projects. Contact us to discuss your project and financing options." },
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Paver Patio Installation — Bend, Oregon",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Newport Avenue Landscaping",
    "telephone": "(541) 604-1337",
    "address": { "@type": "PostalAddress", "addressLocality": "Bend", "addressRegion": "OR" }
  },
  "areaServed": ["Bend", "Redmond", "Sisters", "Sunriver", "Tumalo", "La Pine"],
  "description": "Professional paver patio installation in Bend, Oregon. Concrete pavers, natural stone, outdoor living spaces, fire pits, and retaining walls.",
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQS.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a }
  }))
};

export default function PaverPatiosBend() {
  return (
    <div style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
      <Helmet>
        <title>Paver Patios Bend Oregon | Newport Avenue Landscaping | (541) 604-1337</title>
        <meta name="description" content="Expert paver patio installation in Bend, Oregon. Concrete pavers, natural stone, outdoor kitchens, fire pits & retaining walls. Licensed & insured. Free estimates." />
        <link rel="canonical" href="https://newportavelandscaping.com/paver-patios-bend" />
        <script type="application/ld+json">{JSON.stringify(SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>
      <Navbar />

      {/* HERO */}
      <section style={{
        background: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${HERO_IMG}) center/cover no-repeat`,
        padding: "6rem 0 4rem",
      }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "oklch(0.72 0.12 25)", marginBottom: "1rem" }}>
            BEND, OREGON · LICENSED & INSURED · FREE ESTIMATES
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "#fff", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            Paver Patios in Bend, Oregon
          </h1>
          <p style={{ color: "oklch(0.88 0.008 0)", fontWeight: 300, fontSize: "1.1rem", maxWidth: "620px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Newport Avenue Landscaping designs and installs beautiful paver patios, outdoor living spaces, fire pits, and walkways throughout Bend and Central Oregon. Built to last in Bend's freeze-thaw climate.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact">
              <span style={{ display: "inline-block", background: "oklch(0.46 0.20 25)", color: "#fff", padding: "0.85rem 2rem", fontFamily: "var(--font-label)", fontSize: "0.7rem", letterSpacing: "0.14em", cursor: "pointer", textDecoration: "none" }}>
                GET A FREE ESTIMATE →
              </span>
            </Link>
            <a href="tel:5416041337" style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.4)", color: "#fff", padding: "0.85rem 2rem", fontFamily: "var(--font-label)", fontSize: "0.7rem", letterSpacing: "0.14em", textDecoration: "none" }}>
              CALL (541) 604-1337
            </a>
          </div>
        </div>
      </section>

      {/* TYPES */}
      <section style={{ background: "oklch(1 0 0)", padding: "4rem 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "oklch(0.46 0.20 25)", marginBottom: "0.75rem" }}>PAVER SERVICES</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "oklch(0.15 0.005 0)", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", marginBottom: "2.5rem" }}>
            What We Build
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {TYPES.map(t => (
              <Link key={t.title} href={t.href}>
                <div style={{ background: "oklch(0.97 0.012 85)", padding: "1.5rem", cursor: "pointer", borderLeft: "3px solid oklch(0.46 0.20 25)", transition: "transform 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "translateX(4px)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "translateX(0)")}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "oklch(0.15 0.005 0)", fontSize: "1.05rem", marginBottom: "0.5rem" }}>{t.title}</h3>
                  <p style={{ color: "oklch(0.45 0.008 0)", fontSize: "0.88rem", lineHeight: 1.6, fontWeight: 300 }}>{t.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ background: "oklch(0.12 0.005 0)", padding: "4rem 0" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "oklch(0.72 0.12 25)", marginBottom: "0.75rem" }}>PRICING GUIDE</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "#fff", fontSize: "clamp(1.4rem, 3vw, 2rem)", marginBottom: "2rem" }}>
            Paver Patio Costs in Bend
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {PRICING.map(p => (
              <div key={p.item} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "1rem", gap: "1rem", flexWrap: "wrap" }}>
                <span style={{ color: "oklch(0.80 0.008 0)", fontWeight: 300, fontSize: "0.95rem" }}>{p.item}</span>
                <span style={{ fontFamily: "var(--font-display)", color: "#fff", fontSize: "1.1rem", whiteSpace: "nowrap" }}>{p.range}</span>
              </div>
            ))}
          </div>
          <p style={{ color: "oklch(0.55 0.008 0)", fontSize: "0.78rem", marginTop: "1.5rem", lineHeight: 1.6 }}>
            <em>Prices shown are typical market ranges for planning purposes only and are not a binding quote. Actual costs depend on site conditions, project scope, and materials. Contact us for a free written estimate.</em>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "oklch(0.97 0.012 85)", padding: "4rem 0" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "oklch(0.46 0.20 25)", marginBottom: "0.75rem" }}>FAQ</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "oklch(0.15 0.005 0)", fontSize: "clamp(1.4rem, 3vw, 2rem)", marginBottom: "2rem" }}>
            Paver Patios in Bend — Common Questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {FAQS.map(f => (
              <div key={f.q} style={{ borderLeft: "3px solid oklch(0.46 0.20 25)", paddingLeft: "1.25rem" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "oklch(0.15 0.005 0)", fontSize: "1rem", marginBottom: "0.5rem" }}>{f.q}</h3>
                <p style={{ color: "oklch(0.38 0.008 0)", lineHeight: 1.7, fontWeight: 300, fontSize: "0.92rem" }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "oklch(0.15 0.005 0)", padding: "3.5rem 0", textAlign: "center" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "oklch(0.46 0.20 25)", marginBottom: "0.75rem" }}>FREE CONSULTATION · NO OBLIGATION</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "#fff", fontSize: "clamp(1.4rem, 3vw, 2.2rem)", marginBottom: "1rem" }}>
            Ready to Build Your Dream Patio?
          </h2>
          <p style={{ color: "oklch(0.72 0.008 0)", fontWeight: 300, marginBottom: "2rem", lineHeight: 1.7 }}>
            Call <a href="tel:5416041337" style={{ color: "oklch(0.72 0.12 25)", textDecoration: "none" }}>(541) 604-1337</a> or request a free on-site estimate. We serve Bend, Redmond, Sisters, Sunriver, and all of Central Oregon.
          </p>
          <Link href="/contact">
            <span style={{ display: "inline-block", background: "oklch(0.46 0.20 25)", color: "#fff", padding: "0.9rem 2.5rem", fontFamily: "var(--font-label)", fontSize: "0.7rem", letterSpacing: "0.14em", cursor: "pointer", textDecoration: "none" }}>
              REQUEST FREE ESTIMATE →
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
