/* ============================================================
   CORE SEO LANDING PAGE — Irrigation Bend Oregon
   Target keyword: "irrigation Bend Oregon" / "sprinkler system Bend"
   ============================================================ */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";

const HERO_IMG = "/manus-storage/landscaping-native_fa3d1cfe.jpg";

const SERVICES = [
  { title: "New Sprinkler System Installation", desc: "Full design and installation of residential and commercial irrigation systems — rotors, spray heads, drip zones, and smart controllers.", href: "/services/irrigation" },
  { title: "Drip Irrigation", desc: "Efficient drip systems for planting beds, trees, and shrubs. Ideal for Bend's water-wise landscaping requirements.", href: "/services/irrigation" },
  { title: "Smart Irrigation Controllers", desc: "Wi-Fi enabled controllers with weather-based scheduling to reduce water waste and comply with Bend's watering restrictions.", href: "/services/irrigation" },
  { title: "Spring Activation", desc: "Professional spring startup — system inspection, head adjustment, controller programming, and leak detection.", href: "/services/sprinkler-activation" },
  { title: "Fall Blowout", desc: "Compressed-air winterization to prevent pipe damage during Bend's hard freezes. Scheduled August–November.", href: "/services/sprinkler-blowout" },
  { title: "Sprinkler Repair", desc: "Same-season repair of broken heads, leaking valves, damaged pipes, and controller failures.", href: "/services/sprinkler-repair" },
];

const PRICING = [
  { item: "New System Installation (avg. residential)", range: "$3,500–$8,000" },
  { item: "Spring Activation", range: "$85–$150" },
  { item: "Fall Blowout / Winterization", range: "$85–$150" },
  { item: "Sprinkler Repair (per visit)", range: "$95–$250+" },
  { item: "Smart Controller Upgrade", range: "$250–$600 installed" },
];

const FAQS = [
  { q: "How much does a sprinkler system cost in Bend, Oregon?", a: "A new residential irrigation system in Bend typically costs $3,500–$8,000 installed, depending on lot size, number of zones, and system type. Drip-only systems for smaller properties can be less. Prices shown are typical market ranges for planning purposes only and are not a binding quote. Contact us for a free written estimate." },
  { q: "When should I schedule sprinkler activation in Bend?", a: "Most Bend homeowners schedule spring activation between late March and early May, after the last hard freeze risk has passed. We recommend booking early — our activation schedule fills quickly in April." },
  { q: "When should I schedule sprinkler blowout in Bend?", a: "Bend's first hard freeze typically arrives in October. We recommend scheduling your blowout between late September and mid-October. We offer blowout service from August through November." },
  { q: "Does Bend have watering restrictions?", a: "Yes. The City of Bend enforces seasonal watering schedules and odd/even watering day restrictions during summer months. Our smart controller installations are programmed to comply with current Bend Water restrictions automatically." },
  { q: "Do you service irrigation systems you didn't install?", a: "Yes — we repair and service all brands of irrigation systems regardless of who installed them. We service Rainbird, Hunter, Toro, Orbit, and all major brands." },
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Irrigation System Installation & Service — Bend, Oregon",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Newport Avenue Landscaping",
    "telephone": "(541) 604-1337",
    "address": { "@type": "PostalAddress", "addressLocality": "Bend", "addressRegion": "OR" }
  },
  "areaServed": ["Bend", "Redmond", "Sisters", "Sunriver", "Tumalo", "La Pine", "Prineville", "Madras"],
  "description": "Professional irrigation system installation, spring activation, fall blowout, and repair services in Bend, Oregon and Central Oregon.",
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

export default function IrrigationBendOregon() {
  return (
    <div style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
      <Helmet>
        <title>Irrigation Bend Oregon | Sprinkler Systems | Newport Avenue Landscaping</title>
        <meta name="description" content="Expert irrigation system installation, spring activation, fall blowout & repair in Bend, Oregon. Smart controllers, drip systems & sprinkler repair. Licensed & insured." />
        <link rel="canonical" href="https://newportavelandscaping.com/irrigation-bend-oregon" />
        <script type="application/ld+json">{JSON.stringify(SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>
      <Navbar />

      {/* HERO */}
      <section style={{
        background: `linear-gradient(rgba(0,0,0,0.58), rgba(0,0,0,0.58)), url(${HERO_IMG}) center/cover no-repeat`,
        padding: "6rem 0 4rem",
      }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "oklch(0.72 0.12 25)", marginBottom: "1rem" }}>
            BEND, OREGON · LICENSED & INSURED · FREE ESTIMATES
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "#fff", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            Irrigation Systems in Bend, Oregon
          </h1>
          <p style={{ color: "oklch(0.88 0.008 0)", fontWeight: 300, fontSize: "1.1rem", maxWidth: "620px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Newport Avenue Landscaping installs, activates, winterizes, and repairs irrigation systems throughout Bend and Central Oregon. Smart controllers, drip systems, and full sprinkler installations — all built for Bend's climate.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact">
              <span style={{ display: "inline-block", background: "oklch(0.46 0.20 25)", color: "#fff", padding: "0.85rem 2rem", fontFamily: "var(--font-label)", fontSize: "0.7rem", letterSpacing: "0.14em", cursor: "pointer", textDecoration: "none" }}>
                SCHEDULE SERVICE →
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
          <p style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "oklch(0.46 0.20 25)", marginBottom: "0.75rem" }}>IRRIGATION SERVICES</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "oklch(0.15 0.005 0)", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", marginBottom: "2.5rem" }}>
            What We Offer
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

      {/* PRICING */}
      <section style={{ background: "oklch(0.12 0.005 0)", padding: "4rem 0" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "oklch(0.72 0.12 25)", marginBottom: "0.75rem" }}>PRICING GUIDE</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "#fff", fontSize: "clamp(1.4rem, 3vw, 2rem)", marginBottom: "2rem" }}>
            Irrigation Costs in Bend
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
            Irrigation in Bend — Common Questions
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
            Schedule Irrigation Service in Bend
          </h2>
          <p style={{ color: "oklch(0.72 0.008 0)", fontWeight: 300, marginBottom: "2rem", lineHeight: 1.7 }}>
            Call <a href="tel:5416041337" style={{ color: "oklch(0.72 0.12 25)", textDecoration: "none" }}>(541) 604-1337</a> or request service online. We serve Bend, Redmond, Sisters, Sunriver, and all of Central Oregon.
          </p>
          <Link href="/contact">
            <span style={{ display: "inline-block", background: "oklch(0.46 0.20 25)", color: "#fff", padding: "0.9rem 2.5rem", fontFamily: "var(--font-label)", fontSize: "0.7rem", letterSpacing: "0.14em", cursor: "pointer", textDecoration: "none" }}>
              REQUEST SERVICE →
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
