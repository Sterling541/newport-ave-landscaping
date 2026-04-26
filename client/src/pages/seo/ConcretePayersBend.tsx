/* ============================================================
   SUB-PAGE — Concrete Pavers Bend Oregon
   Target keyword: "concrete pavers Bend Oregon" / "concrete paver patio Bend"
   ============================================================ */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";

const HERO_IMG = "/manus-storage/GLLPatio1_90e2e0c4_166b9312.webp";

const BENEFITS = [
  { title: "Freeze-Thaw Rated", desc: "ASTM C936-certified concrete pavers are engineered for Bend's hard-freeze winters — they expand and contract without cracking." },
  { title: "Hundreds of Styles", desc: "Available in dozens of colors, textures, and sizes — from tumbled cobblestone to sleek modern rectangles." },
  { title: "Easy Repair", desc: "Individual pavers can be removed and replaced without disturbing the surrounding surface — unlike poured concrete." },
  { title: "Permeable Options", desc: "Permeable concrete pavers allow stormwater infiltration, reducing runoff and meeting Bend's stormwater requirements." },
  { title: "Low Maintenance", desc: "Concrete pavers require no sealing (though sealing is optional) and resist staining better than poured concrete." },
  { title: "Long Lifespan", desc: "Properly installed concrete pavers last 25–50+ years with minimal maintenance." },
];

const APPLICATIONS = [
  { title: "Patio & Outdoor Living", href: "/services/outdoor-living" },
  { title: "Driveway Pavers", href: "/services/pavers" },
  { title: "Pool Deck", href: "/services/pavers" },
  { title: "Walkways & Paths", href: "/services/pavers" },
  { title: "Retaining Wall Caps", href: "/services/retaining-walls" },
  { title: "Fire Pit Surrounds", href: "/services/outdoor-living" },
];

const FAQS = [
  { q: "Are concrete pavers good for Bend's climate?", a: "Yes — concrete pavers rated for ASTM C936 freeze-thaw cycling are an excellent choice for Bend's climate. Unlike poured concrete slabs, individual pavers flex slightly with freeze-thaw cycles and can be individually replaced if damaged. Proper base preparation (6–8 inches of compacted crushed rock) is critical in Bend's pumice soils." },
  { q: "How much do concrete pavers cost in Bend?", a: "Concrete paver installation in Bend typically costs $18–$35 per square foot installed, depending on paver style, base depth, and site conditions. A 300 sq ft patio runs approximately $5,400–$10,500. Prices shown are typical market ranges for planning purposes only and are not a binding quote. Contact us for a free written estimate." },
  { q: "How long do concrete pavers last in Bend?", a: "Properly installed concrete pavers in Bend last 25–50+ years. The key factors are quality base preparation, proper edge restraints, and using freeze-thaw rated pavers. We use commercial-grade pavers from Belgard, Pavestone, and Basalite on all our projects." },
  { q: "Do concrete pavers need to be sealed in Bend?", a: "Sealing is optional but recommended for patios and driveways in Bend. A penetrating sealer helps resist staining from pine sap, bird droppings, and road salt, and can enhance the color. We recommend sealing every 3–5 years." },
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Concrete Paver Installation — Bend, Oregon",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Newport Avenue Landscaping",
    "telephone": "(541) 604-1337",
    "address": { "@type": "PostalAddress", "addressLocality": "Bend", "addressRegion": "OR" }
  },
  "areaServed": ["Bend", "Redmond", "Sisters", "Sunriver", "Tumalo", "La Pine"],
  "description": "Professional concrete paver installation in Bend, Oregon. Patios, driveways, walkways, and pool decks. Freeze-thaw rated pavers for Bend's climate.",
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

export default function ConcretePaversBend() {
  return (
    <div style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
      <Helmet>
        <title>Concrete Pavers Bend Oregon | Patio, Driveway & Walkway Pavers | Newport Avenue</title>
        <meta name="description" content="Expert concrete paver installation in Bend, Oregon. Freeze-thaw rated pavers for patios, driveways, walkways & pool decks. Licensed & insured. Free estimates." />
        <link rel="canonical" href="https://newportavelandscaping.com/paver-patios-bend/concrete-pavers" />
        <script type="application/ld+json">{JSON.stringify(SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>
      <Navbar />

      {/* BREADCRUMB */}
      <div style={{ background: "oklch(0.97 0.012 85)", padding: "0.75rem 0", borderBottom: "1px solid oklch(0.90 0.008 0)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "var(--font-label)", fontSize: "0.6rem", letterSpacing: "0.12em", color: "oklch(0.55 0.008 0)" }}>
            <Link href="/">HOME</Link> &nbsp;/&nbsp; <Link href="/paver-patios-bend">PAVER PATIOS BEND</Link> &nbsp;/&nbsp; <span style={{ color: "oklch(0.46 0.20 25)" }}>CONCRETE PAVERS</span>
          </p>
        </div>
      </div>

      {/* HERO */}
      <section style={{
        background: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${HERO_IMG}) center/cover no-repeat`,
        padding: "5rem 0 3.5rem",
      }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "oklch(0.72 0.12 25)", marginBottom: "1rem" }}>
            BEND, OREGON · FREEZE-THAW RATED · FREE ESTIMATES
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "#fff", fontSize: "clamp(1.8rem, 4.5vw, 3rem)", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            Concrete Pavers in Bend, Oregon
          </h1>
          <p style={{ color: "oklch(0.88 0.008 0)", fontWeight: 300, fontSize: "1.05rem", maxWidth: "600px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Newport Avenue Landscaping installs freeze-thaw rated concrete pavers for patios, driveways, walkways, and pool decks throughout Bend and Central Oregon. Built to last in Bend's climate.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact">
              <span style={{ display: "inline-block", background: "oklch(0.46 0.20 25)", color: "#fff", padding: "0.85rem 2rem", fontFamily: "var(--font-label)", fontSize: "0.7rem", letterSpacing: "0.14em", cursor: "pointer", textDecoration: "none" }}>
                GET A FREE ESTIMATE →
              </span>
            </Link>
            <Link href="/paver-patios-bend">
              <span style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.4)", color: "#fff", padding: "0.85rem 2rem", fontFamily: "var(--font-label)", fontSize: "0.7rem", letterSpacing: "0.14em", cursor: "pointer", textDecoration: "none" }}>
                ALL PAVER SERVICES
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section style={{ background: "oklch(1 0 0)", padding: "4rem 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "oklch(0.46 0.20 25)", marginBottom: "0.75rem" }}>WHY CONCRETE PAVERS</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "oklch(0.15 0.005 0)", fontSize: "clamp(1.4rem, 3vw, 2rem)", marginBottom: "2.5rem" }}>
            Why Concrete Pavers Work in Bend
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {BENEFITS.map(b => (
              <div key={b.title} style={{ background: "oklch(0.97 0.012 85)", padding: "1.5rem", borderLeft: "3px solid oklch(0.46 0.20 25)" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "oklch(0.15 0.005 0)", fontSize: "1rem", marginBottom: "0.4rem" }}>{b.title}</h3>
                <p style={{ color: "oklch(0.45 0.008 0)", fontSize: "0.87rem", lineHeight: 1.6, fontWeight: 300 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section style={{ background: "oklch(0.12 0.005 0)", padding: "3.5rem 0" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "oklch(0.72 0.12 25)", marginBottom: "0.75rem" }}>APPLICATIONS</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "#fff", fontSize: "clamp(1.4rem, 3vw, 2rem)", marginBottom: "1.5rem" }}>
            Where We Install Concrete Pavers
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {APPLICATIONS.map(a => (
              <Link key={a.title} href={a.href}>
                <span style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.2)", color: "oklch(0.80 0.008 0)", padding: "0.5rem 1.25rem", fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.12em", cursor: "pointer", transition: "border-color 0.2s" }}>
                  {a.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "oklch(0.97 0.012 85)", padding: "4rem 0" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "oklch(0.46 0.20 25)", marginBottom: "0.75rem" }}>FAQ</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "oklch(0.15 0.005 0)", fontSize: "clamp(1.4rem, 3vw, 2rem)", marginBottom: "2rem" }}>
            Concrete Pavers in Bend — Common Questions
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
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "#fff", fontSize: "clamp(1.4rem, 3vw, 2.2rem)", marginBottom: "1rem" }}>
            Ready to Install Concrete Pavers in Bend?
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
