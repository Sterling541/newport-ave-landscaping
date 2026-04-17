import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const s = {
  bg1: { background: "oklch(0.15 0.005 0)", padding: "5rem 0 3rem" },
  bg2: { background: "oklch(0.97 0.012 85)", padding: "3rem 0" },
  bg3: { background: "oklch(1 0 0)", padding: "3rem 0" },
  wrap: { maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem" },
  h1: { fontFamily: "var(--font-display)", fontWeight: 300, color: "#fff", fontSize: "clamp(1.8rem, 4vw, 3rem)", lineHeight: 1.1, marginBottom: "1rem" },
  h2: { fontFamily: "var(--font-display)", fontWeight: 300, color: "oklch(0.15 0.005 0)", fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)", marginBottom: "1.2rem" },
  h3: { fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.1rem", marginBottom: "0.5rem", marginTop: "1.5rem" },
  p: { color: "oklch(0.38 0.008 0)", lineHeight: 1.8, fontWeight: 300, marginBottom: "1rem" },
  accent: { color: "oklch(0.72 0.12 25)", fontWeight: 300, fontSize: "1rem", maxWidth: "640px", lineHeight: 1.7 },
  li: { marginBottom: "0.5rem", paddingLeft: "1rem", borderLeft: "2px solid oklch(0.46 0.20 25)" },
  ul: { listStyle: "none", padding: 0, margin: "1rem 0 0" } as React.CSSProperties,
  crumb: { color: "oklch(0.72 0.12 25)", textDecoration: "none", fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.08em" },
  crumbSep: { color: "oklch(0.55 0.008 0)", fontFamily: "var(--font-label)", fontSize: "0.65rem" },
  table: { width: "100%", borderCollapse: "collapse" as const, marginTop: "1rem", fontSize: "0.9rem" },
  th: { background: "oklch(0.15 0.005 0)", color: "#fff", padding: "0.6rem 0.8rem", textAlign: "left" as const, fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.08em" },
  td: { padding: "0.6rem 0.8rem", borderBottom: "1px solid oklch(0.88 0.012 85)", color: "oklch(0.38 0.008 0)", verticalAlign: "top" as const },
  cta: { display: "inline-block", background: "oklch(0.46 0.20 25)", color: "#fff", padding: "0.75rem 2rem", fontFamily: "var(--font-label)", fontSize: "0.7rem", letterSpacing: "0.1em", textDecoration: "none", marginTop: "1.5rem" },
};

export default function WhenToPlantBendOregon() {
  return (
    <div style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
      <Helmet>
        <title>When to Plant in Bend Oregon | Planting Calendar for Central Oregon | Newport Avenue</title>
        <meta name="description" content="Bend Oregon planting calendar: when to plant trees, shrubs, perennials, grass seed, and vegetables in Central Oregon's Zone 6a high-desert climate. Last frost dates and seasonal timing." />
        <link rel="canonical" href="https://newportavelandscaping.com/resources/when-to-plant-bend-oregon" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "When is the last frost in Bend, Oregon?",
              acceptedAnswer: { "@type": "Answer", text: "Bend's average last frost date is around May 15–20, though late frosts can occur into early June in some years. The first fall frost typically arrives in late September to mid-October. This gives Bend a relatively short frost-free growing season of approximately 100–130 days. Always check the 10-day forecast before planting frost-sensitive annuals or vegetables." }
            },
            {
              "@type": "Question",
              name: "When should I plant trees and shrubs in Bend?",
              acceptedAnswer: { "@type": "Answer", text: "The best time to plant trees and shrubs in Bend is early fall (September–October) or early spring (April–May). Fall planting allows roots to establish during the cool, moist months before summer heat stress. Spring planting is also effective but requires more attentive irrigation through the first summer. Container-grown plants can be planted any time the ground isn't frozen, but avoid planting during July and August heat." }
            },
            {
              "@type": "Question",
              name: "When should I plant grass seed in Bend?",
              acceptedAnswer: { "@type": "Answer", text: "The best time to seed a lawn in Bend is late August through mid-September. Soil temperatures are still warm enough for germination (above 50°F), but cooling air temperatures reduce heat stress on new seedlings. Spring seeding (April–May) is a secondary option but competes with weed germination. Always pair seeding with aeration for best results." }
            },
            {
              "@type": "Question",
              name: "What hardiness zone is Bend, Oregon?",
              acceptedAnswer: { "@type": "Answer", text: "Bend, Oregon is in USDA Plant Hardiness Zone 6a, with average annual minimum temperatures of -10°F to -5°F. This means most Zone 5 and Zone 6 plants are reliably hardy in Bend. Zone 7 plants may survive mild winters but can be killed in severe cold years. Always verify zone ratings before purchasing plants for a permanent landscape installation." }
            }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://newportavelandscaping.com/" },
            { "@type": "ListItem", position: 2, name: "Resources", item: "https://newportavelandscaping.com/resources" },
            { "@type": "ListItem", position: 3, name: "When to Plant in Bend Oregon", item: "https://newportavelandscaping.com/resources/when-to-plant-bend-oregon" }
          ]
        })}</script>
      </Helmet>
      <Navbar />

      <section style={s.bg1}>
        <div style={s.wrap}>
          <nav style={{ marginBottom: "1.5rem" }}>
            <a href="/" style={s.crumb}>Home</a>
            <span style={s.crumbSep}> / </span>
            <a href="/resources" style={s.crumb}>Resources</a>
            <span style={s.crumbSep}> / When to Plant in Bend Oregon</span>
          </nav>
          <p style={{ ...s.accent, marginBottom: "0.75rem" }}>PLANTING GUIDE · BEND, OREGON · ZONE 6A</p>
          <h1 style={s.h1}>When to Plant in Bend, Oregon</h1>
          <p style={s.accent}>
            Bend's high-desert climate — Zone 6a, last frost around May 15, first frost in late September — requires careful timing for successful planting. This guide covers trees, shrubs, perennials, grass seed, and vegetables.
          </p>
        </div>
      </section>

      <section style={s.bg2}>
        <div style={s.wrap}>
          <h2 style={s.h2}>Bend's Frost Dates and Growing Season</h2>
          <p style={s.p}>Bend, Oregon sits at 3,623 feet elevation in USDA Plant Hardiness Zone 6a. The city's average last spring frost is around May 15–20, though late frosts can occur into early June in some years. The first fall frost typically arrives in late September to mid-October.</p>
          <p style={s.p}>This gives Bend a frost-free growing season of approximately 100–130 days — shorter than lower-elevation Oregon cities like Portland (Zone 8b) or Medford (Zone 8a). Planning around these frost dates is essential for successful planting, especially for frost-sensitive annuals and vegetables.</p>
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>Frost Event</th>
                <th style={s.th}>Average Date</th>
                <th style={s.th}>Safe Planning Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={s.td}>Last spring frost</td>
                <td style={s.td}>May 15–20</td>
                <td style={s.td}>After June 1 for frost-sensitive plants</td>
              </tr>
              <tr>
                <td style={s.td}>First fall frost</td>
                <td style={s.td}>Late September – mid-October</td>
                <td style={s.td}>Protect tender plants after September 20</td>
              </tr>
              <tr>
                <td style={s.td}>Frost-free season</td>
                <td style={s.td}>~100–130 days</td>
                <td style={s.td}>June 1 – September 20 (conservative)</td>
              </tr>
              <tr>
                <td style={s.td}>Hardiness zone</td>
                <td style={s.td}>USDA Zone 6a</td>
                <td style={s.td}>Min. temp -10°F to -5°F</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section style={s.bg3}>
        <div style={s.wrap}>
          <h2 style={s.h2}>Monthly Planting Calendar for Bend</h2>
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>Month</th>
                <th style={s.th}>What to Plant / Do</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["January–February", "Plan and order plants. Prune dormant trees and shrubs. Do not plant outdoors."],
                ["March", "Start vegetable seeds indoors. Apply pre-emergent weed control to lawn. Prune roses."],
                ["April", "Plant cool-season vegetables (lettuce, spinach, peas) outdoors after April 15. Plant bare-root trees and shrubs. Begin spring lawn fertilization."],
                ["May", "Plant warm-season vegetables after May 20. Plant container trees, shrubs, and perennials. Overseed thin lawn areas. Last chance for spring grass seeding."],
                ["June", "Plant annuals and frost-sensitive perennials after June 1. Establish new irrigation schedules. Mulch planting beds."],
                ["July–August", "Avoid planting trees and shrubs in peak heat. Maintain irrigation. Deadhead perennials."],
                ["September", "Best month for grass seeding and overseeding. Plant trees, shrubs, and perennials for fall establishment. Plant spring bulbs (tulips, daffodils)."],
                ["October", "Continue planting trees and shrubs until ground freezes. Plant garlic. Winterize irrigation systems by mid-October."],
                ["November–December", "Apply winter mulch to protect perennials. Dormant prune deciduous trees. Plan for next season."],
              ].map(([month, task]) => (
                <tr key={month}>
                  <td style={{ ...s.td, fontWeight: 500, whiteSpace: "nowrap" as const }}>{month}</td>
                  <td style={s.td}>{task}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section style={s.bg2}>
        <div style={s.wrap}>
          <h2 style={s.h2}>When to Plant Trees and Shrubs in Bend</h2>
          <p style={s.p}>The best times to plant trees and shrubs in Bend are early fall (September–October) and early spring (April–May). Fall planting is often superior because the soil is still warm from summer, encouraging root establishment before the ground freezes. The cool, moist fall and winter months allow roots to grow without the stress of summer heat and irrigation demands.</p>
          <p style={s.p}>Spring planting is also effective but requires more attentive irrigation through the first summer. Container-grown plants can technically be planted any time the ground isn't frozen, but planting during July and August heat puts significant stress on new plants and requires very frequent irrigation to prevent establishment failure.</p>
          <ul style={s.ul}>
            <li style={s.li}><strong>Best window:</strong> September 1 – October 31 (fall) or April 1 – May 31 (spring)</li>
            <li style={s.li}><strong>Avoid:</strong> July and August for large trees and shrubs</li>
            <li style={s.li}><strong>Water requirement:</strong> 1–2 times per week for the first full growing season</li>
            <li style={s.li}><strong>Mulch:</strong> Apply 3–4 inches of mulch around new plantings to retain moisture and regulate soil temperature</li>
          </ul>
        </div>
      </section>

      <section style={s.bg3}>
        <div style={s.wrap}>
          <h2 style={s.h2}>When to Plant Perennials in Bend</h2>
          <p style={s.p}>Hardy perennials (those rated Zone 6 or colder) can be planted in Bend from April through October. Spring planting (April–June) gives perennials a full growing season to establish before winter. Fall planting (September–October) is also excellent — perennials planted in fall often establish faster because they focus energy on root growth rather than top growth.</p>
          <p style={s.p}>The best perennials for Bend's climate include Russian sage, salvia, catmint, yarrow, sedum, coneflower (Echinacea), black-eyed Susan, and ornamental grasses. These plants are drought-tolerant once established and handle Bend's cold winters reliably.</p>
        </div>
      </section>

      <section style={s.bg2}>
        <div style={s.wrap}>
          <h2 style={s.h2}>When to Plant Grass Seed in Bend</h2>
          <p style={s.p}>The best time to seed a lawn in Bend is late August through mid-September. Soil temperatures are still warm enough for germination (above 50°F), but cooling air temperatures and shorter days reduce heat stress on new seedlings. Fall-seeded lawns have time to establish before winter and emerge strong in spring.</p>
          <p style={s.p}>Spring seeding (April–May) is a secondary option but faces two challenges: competition from weed seeds germinating at the same time, and the approaching summer heat that stresses young seedlings before they're fully established. If you must seed in spring, use a turf-type tall fescue which establishes faster and tolerates heat better than Kentucky bluegrass.</p>
          <ul style={s.ul}>
            <li style={s.li}><strong>Best window:</strong> August 20 – September 20</li>
            <li style={s.li}><strong>Secondary window:</strong> April 15 – May 15</li>
            <li style={s.li}><strong>Soil temperature needed:</strong> Above 50°F for germination</li>
            <li style={s.li}><strong>Pair with:</strong> Core aeration for best seed-to-soil contact</li>
          </ul>
          <a href="/services/aeration" style={s.cta}>LEARN ABOUT AERATION & OVERSEEDING →</a>
        </div>
      </section>

      <section style={{ background: "oklch(0.15 0.005 0)", padding: "3rem 0" }}>
        <div style={{ ...s.wrap, textAlign: "center" as const }}>
          <p style={{ color: "oklch(0.72 0.12 25)", fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>LANDSCAPE INSTALLATION · BEND, OREGON</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "#fff", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", marginBottom: "1rem" }}>Ready to Plant? We'll Handle the Timing.</h2>
          <p style={{ color: "oklch(0.72 0.12 25)", fontWeight: 300, maxWidth: "520px", margin: "0 auto 1.5rem", lineHeight: 1.7 }}>Newport Avenue Landscaping designs and installs landscapes throughout Bend, Redmond, Sisters, and all of Central Oregon. We know the local climate and will plant at the right time for maximum establishment success.</p>
          <a href="/contact" style={s.cta}>SCHEDULE A FREE CONSULTATION →</a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
