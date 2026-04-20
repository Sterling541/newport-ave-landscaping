/* ============================================================
   CORE SEO LANDING PAGE — Landscape Design Bend Oregon
   Target keyword: "landscape design Bend" / "landscape designer Bend Oregon"
   ============================================================ */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";

const HERO_IMG = "/manus-storage/brokentop-xeriscape-01_064e5008.jpg";

const SERVICES = [
  { title: "Residential Landscape Design", desc: "Custom design plans for Bend homes — from concept sketches through full installation-ready drawings.", href: "/services/landscape-design" },
  { title: "HOA & Community Design", desc: "Cohesive landscape design for HOA common areas, entry features, and community green spaces.", href: "/landscape-design-bend/hoa-design" },
  { title: "Modern & Contemporary Design", desc: "Clean lines, native plants, and architectural hardscape elements for Bend's newer neighborhoods.", href: "/landscape-design-bend/modern-design" },
  { title: "Xeriscape Design", desc: "Water-wise landscape plans using drought-tolerant plants, efficient irrigation, and rock mulch.", href: "/services/xeriscaping" },
  { title: "Firewise Design", desc: "Defensible space planning integrated into beautiful landscape designs for WUI properties.", href: "/services/firewise-landscaping" },
  { title: "Commercial Landscape Design", desc: "Professional landscape design for commercial properties, office parks, and retail centers.", href: "/commercial" },
];

const PROCESS = [
  { step: "01", title: "Site Consultation", desc: "We visit your property, assess the site conditions, discuss your goals, and review your budget." },
  { step: "02", title: "Design Concept", desc: "We develop a concept plan showing plant placement, hardscape layout, and irrigation zones." },
  { step: "03", title: "Design Review", desc: "We review the plan with you, incorporate feedback, and finalize the design." },
  { step: "04", title: "Installation", desc: "Our crews install the design exactly as planned — plants, hardscape, irrigation, and lighting." },
  { step: "05", title: "Walkthrough & Care Guide", desc: "We walk you through the completed project and provide a plant care and irrigation guide." },
];

const FAQS = [
  { q: "How much does landscape design cost in Bend, Oregon?", a: "Landscape design fees in Bend typically range from $500–$3,000 for a residential design plan, depending on property size and complexity. For full design-build projects, the design fee is often applied toward the installation cost. Prices shown are typical market ranges for planning purposes only and are not a binding quote. Contact us for a free consultation." },
  { q: "What landscape design styles work best in Bend?", a: "Bend's high-desert climate and mountain setting favor naturalistic designs using native and drought-tolerant plants, natural stone, and organic forms. Contemporary designs with clean lines and low-water plantings are also popular in Bend's newer neighborhoods. We design in all styles but always prioritize plant selections that thrive in Bend's Zone 6b climate." },
  { q: "Do you design and install, or just design?", a: "Newport Avenue Landscaping is a full-service design-build firm. We handle the entire process from initial design through installation and ongoing maintenance. You work with one team from start to finish." },
  { q: "How long does a landscape design project take?", a: "A typical residential design consultation and concept plan takes 2–4 weeks. Installation timing depends on the project scope and our current schedule — most residential projects are installed within 4–12 weeks of design approval." },
  { q: "Do you design for HOA communities in Bend?", a: "Yes. We have extensive experience designing and installing landscapes for HOA communities throughout Bend, Redmond, and Central Oregon. We understand HOA approval processes and design within community guidelines." },
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Landscape Design — Bend, Oregon",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Newport Avenue Landscaping",
    "telephone": "(541) 604-1337",
    "address": { "@type": "PostalAddress", "addressLocality": "Bend", "addressRegion": "OR" }
  },
  "areaServed": ["Bend", "Redmond", "Sisters", "Sunriver", "Tumalo", "La Pine"],
  "description": "Professional landscape design services in Bend, Oregon. Residential, HOA, commercial, xeriscape, and firewise landscape design.",
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

export default function LandscapeDesignBend() {
  return (
    <div style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
      <Helmet>
        <title>Landscape Design Bend Oregon | Newport Avenue Landscaping | (541) 604-1337</title>
        <meta name="description" content="Expert landscape design in Bend, Oregon. Residential, HOA, xeriscape & firewise design. Full design-build service. Licensed & insured. Free consultation." />
        <link rel="canonical" href="https://newportavelandscaping.com/landscape-design-bend" />
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
            BEND, OREGON · DESIGN-BUILD · FREE CONSULTATION
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "#fff", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            Landscape Design in Bend, Oregon
          </h1>
          <p style={{ color: "oklch(0.88 0.008 0)", fontWeight: 300, fontSize: "1.1rem", maxWidth: "620px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Newport Avenue Landscaping designs and builds custom landscapes for Bend homes, HOA communities, and commercial properties. From xeriscape to modern outdoor living — we bring your vision to life.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact">
              <span style={{ display: "inline-block", background: "oklch(0.46 0.20 25)", color: "#fff", padding: "0.85rem 2rem", fontFamily: "var(--font-label)", fontSize: "0.7rem", letterSpacing: "0.14em", cursor: "pointer", textDecoration: "none" }}>
                FREE CONSULTATION →
              </span>
            </Link>
            <Link href="/our-work">
              <span style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.4)", color: "#fff", padding: "0.85rem 2rem", fontFamily: "var(--font-label)", fontSize: "0.7rem", letterSpacing: "0.14em", cursor: "pointer", textDecoration: "none" }}>
                SEE OUR WORK
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ background: "oklch(1 0 0)", padding: "4rem 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "oklch(0.46 0.20 25)", marginBottom: "0.75rem" }}>DESIGN SERVICES</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "oklch(0.15 0.005 0)", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", marginBottom: "2.5rem" }}>
            Landscape Design Services in Bend
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {SERVICES.map(s => (
              <Link key={s.title} href={s.href}>
                <div style={{ background: "oklch(0.97 0.012 85)", padding: "1.5rem", cursor: "pointer", borderLeft: "3px solid oklch(0.46 0.20 25)", transition: "transform 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "translateX(4px)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "translateX(0)")}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "oklch(0.15 0.005 0)", fontSize: "1.05rem", marginBottom: "0.5rem" }}>{s.title}</h3>
                  <p style={{ color: "oklch(0.45 0.008 0)", fontSize: "0.88rem", lineHeight: 1.6, fontWeight: 300 }}>{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ background: "oklch(0.97 0.012 85)", padding: "4rem 0" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "oklch(0.46 0.20 25)", marginBottom: "0.75rem" }}>OUR PROCESS</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "oklch(0.15 0.005 0)", fontSize: "clamp(1.4rem, 3vw, 2rem)", marginBottom: "2.5rem" }}>
            How We Work
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {PROCESS.map(p => (
              <div key={p.step} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", color: "oklch(0.88 0.008 0)", lineHeight: 1, flexShrink: 0, width: "3rem" }}>{p.step}</span>
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "oklch(0.15 0.005 0)", fontSize: "1.05rem", marginBottom: "0.4rem" }}>{p.title}</h3>
                  <p style={{ color: "oklch(0.45 0.008 0)", fontSize: "0.9rem", lineHeight: 1.6, fontWeight: 300 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "oklch(1 0 0)", padding: "4rem 0" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "oklch(0.46 0.20 25)", marginBottom: "0.75rem" }}>FAQ</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "oklch(0.15 0.005 0)", fontSize: "clamp(1.4rem, 3vw, 2rem)", marginBottom: "2rem" }}>
            Landscape Design in Bend — Common Questions
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
            Start Your Bend Landscape Design
          </h2>
          <p style={{ color: "oklch(0.72 0.008 0)", fontWeight: 300, marginBottom: "2rem", lineHeight: 1.7 }}>
            Call <a href="tel:5416041337" style={{ color: "oklch(0.72 0.12 25)", textDecoration: "none" }}>(541) 604-1337</a> or request a free consultation. We serve Bend, Redmond, Sisters, Sunriver, and all of Central Oregon.
          </p>
          <Link href="/contact">
            <span style={{ display: "inline-block", background: "oklch(0.46 0.20 25)", color: "#fff", padding: "0.9rem 2.5rem", fontFamily: "var(--font-label)", fontSize: "0.7rem", letterSpacing: "0.14em", cursor: "pointer", textDecoration: "none" }}>
              REQUEST CONSULTATION →
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
