/* ============================================================
   SUB-PAGE — HOA Landscape Design Bend Oregon
   Target keyword: "HOA landscape design Bend Oregon" / "HOA landscaping Bend"
   ============================================================ */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";

const HERO_IMG = "/manus-storage/maintenance-hero-bg_3219f29e_7ba0517e.webp";

const SERVICES = [
  { title: "Common Area Maintenance", desc: "Scheduled maintenance for HOA common areas, entry features, medians, and community green spaces." },
  { title: "Entry & Monument Landscaping", desc: "Distinctive entry feature design and installation that creates a strong first impression for your community." },
  { title: "Irrigation Management", desc: "Full irrigation management including spring activation, seasonal adjustments, and fall winterization for all HOA zones." },
  { title: "Annual Color Programs", desc: "Seasonal color rotation for planters, beds, and entry features — keeping the community looking fresh year-round." },
  { title: "Tree & Shrub Care", desc: "Pruning, fertilization, and health monitoring for all HOA trees and shrubs." },
  { title: "Snow & Ice Management", desc: "Priority snow removal and ice control for HOA parking lots, walkways, and entry areas." },
];

const FAQS = [
  { q: "Do you work with HOA communities in Bend?", a: "Yes — HOA community management is a core part of our commercial business. We currently manage common areas and amenity landscapes for multiple HOA communities throughout Bend, Redmond, and Central Oregon. We understand HOA approval processes, board dynamics, and the importance of consistent, reliable service." },
  { q: "How do HOA landscape contracts work?", a: "We offer annual maintenance contracts that include all scheduled services, seasonal programs, and priority response. Contracts are typically structured on a monthly billing basis with a defined scope of services. We provide detailed monthly service reports to HOA boards." },
  { q: "Can you help our HOA redesign aging common areas?", a: "Yes. We provide full design-build services for HOA common area renovations, including design, plant selection, irrigation upgrades, and hardscape improvements. We work within HOA budgets and can phase projects over multiple seasons." },
  { q: "Are you familiar with Bend's HOA landscaping requirements?", a: "Yes. We are familiar with the landscaping requirements and CC&Rs of many Bend-area HOA communities. We design and maintain landscapes that comply with HOA standards and help communities maintain property values." },
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "HOA Landscape Design & Management — Bend, Oregon",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Newport Avenue Landscaping",
    "telephone": "(541) 604-1337",
    "address": { "@type": "PostalAddress", "addressLocality": "Bend", "addressRegion": "OR" }
  },
  "areaServed": ["Bend", "Redmond", "Sisters", "Sunriver", "Tumalo"],
  "description": "HOA landscape design and management services in Bend, Oregon. Common area maintenance, entry features, irrigation management, and annual color programs.",
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

export default function HOALandscapeDesignBend() {
  return (
    <div style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
      <Helmet>
        <title>HOA Landscape Design Bend Oregon | Newport Avenue Landscaping | (541) 604-1337</title>
        <meta name="description" content="HOA landscape design and management in Bend, Oregon. Common area maintenance, entry features, irrigation management & annual color programs. Licensed & insured." />
        <link rel="canonical" href="https://newportavelandscaping.com/landscape-design-bend/hoa-design" />
        <script type="application/ld+json">{JSON.stringify(SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>
      <Navbar />

      {/* BREADCRUMB */}
      <div style={{ background: "oklch(0.97 0.012 85)", padding: "0.75rem 0", borderBottom: "1px solid oklch(0.90 0.008 0)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "var(--font-label)", fontSize: "0.6rem", letterSpacing: "0.12em", color: "oklch(0.55 0.008 0)" }}>
            <Link href="/">HOME</Link> &nbsp;/&nbsp; <Link href="/landscape-design-bend">LANDSCAPE DESIGN BEND</Link> &nbsp;/&nbsp; <span style={{ color: "oklch(0.46 0.20 25)" }}>HOA DESIGN</span>
          </p>
        </div>
      </div>

      {/* HERO */}
      <section style={{
        background: `linear-gradient(rgba(0,0,0,0.58), rgba(0,0,0,0.58)), url(${HERO_IMG}) center/cover no-repeat`,
        padding: "5rem 0 3.5rem",
      }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "oklch(0.72 0.12 25)", marginBottom: "1rem" }}>
            BEND, OREGON · HOA SPECIALISTS · FREE CONSULTATION
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "#fff", fontSize: "clamp(1.8rem, 4.5vw, 3rem)", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            HOA Landscape Design in Bend, Oregon
          </h1>
          <p style={{ color: "oklch(0.88 0.008 0)", fontWeight: 300, fontSize: "1.05rem", maxWidth: "600px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Newport Avenue Landscaping designs and manages HOA community landscapes throughout Bend and Central Oregon. Reliable, professional, and built for the long term.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact">
              <span style={{ display: "inline-block", background: "oklch(0.46 0.20 25)", color: "#fff", padding: "0.85rem 2rem", fontFamily: "var(--font-label)", fontSize: "0.7rem", letterSpacing: "0.14em", cursor: "pointer", textDecoration: "none" }}>
                REQUEST HOA PROPOSAL →
              </span>
            </Link>
            <a href="tel:5416041337" style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.4)", color: "#fff", padding: "0.85rem 2rem", fontFamily: "var(--font-label)", fontSize: "0.7rem", letterSpacing: "0.14em", textDecoration: "none" }}>
              CALL (541) 604-1337
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ background: "oklch(1 0 0)", padding: "4rem 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "oklch(0.46 0.20 25)", marginBottom: "0.75rem" }}>HOA SERVICES</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "oklch(0.15 0.005 0)", fontSize: "clamp(1.4rem, 3vw, 2rem)", marginBottom: "2.5rem" }}>
            What We Offer HOA Communities
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {SERVICES.map(s => (
              <div key={s.title} style={{ background: "oklch(0.97 0.012 85)", padding: "1.5rem", borderLeft: "3px solid oklch(0.46 0.20 25)" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "oklch(0.15 0.005 0)", fontSize: "1.05rem", marginBottom: "0.5rem" }}>{s.title}</h3>
                <p style={{ color: "oklch(0.45 0.008 0)", fontSize: "0.88rem", lineHeight: 1.6, fontWeight: 300 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "oklch(0.97 0.012 85)", padding: "4rem 0" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "oklch(0.46 0.20 25)", marginBottom: "0.75rem" }}>FAQ</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "oklch(0.15 0.005 0)", fontSize: "clamp(1.4rem, 3vw, 2rem)", marginBottom: "2rem" }}>
            HOA Landscaping in Bend — Common Questions
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
            Get an HOA Landscaping Proposal
          </h2>
          <p style={{ color: "oklch(0.72 0.008 0)", fontWeight: 300, marginBottom: "2rem", lineHeight: 1.7 }}>
            Call <a href="tel:5416041337" style={{ color: "oklch(0.72 0.12 25)", textDecoration: "none" }}>(541) 604-1337</a> or submit a request online. We provide detailed written proposals for HOA communities throughout Bend and Central Oregon.
          </p>
          <Link href="/contact">
            <span style={{ display: "inline-block", background: "oklch(0.46 0.20 25)", color: "#fff", padding: "0.9rem 2.5rem", fontFamily: "var(--font-label)", fontSize: "0.7rem", letterSpacing: "0.14em", cursor: "pointer", textDecoration: "none" }}>
              REQUEST HOA PROPOSAL →
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
