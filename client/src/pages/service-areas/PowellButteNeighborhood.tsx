import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { BreadcrumbSchema, FAQSchema } from "@/components/SchemaMarkup";
import { Link } from "wouter";

const HERO_IMG = "/manus-storage/NewportLandscapingRVParkPhotos16_5e801b45_fc8ec8ea.webp";

const FAQ_ITEMS = [
  {
    question: "Do you serve Powell Butte, Oregon for landscaping and irrigation?",
    answer: "Yes — Newport Avenue Landscaping serves Powell Butte and the surrounding Crook County area. We provide irrigation installation, lawn care, xeriscape design, retaining walls, and seasonal maintenance for rural acreage properties and hobby farms throughout the Powell Butte community.",
  },
  {
    question: "What makes landscaping in Powell Butte different from Bend?",
    answer: "Powell Butte sits at higher elevation with colder winters, more wind exposure, and larger lot sizes than most Bend neighborhoods. Properties here often have well water, acreage irrigation needs, and a mix of pasture, juniper, and sagebrush that requires a different approach than urban landscaping. We design for the rural high-desert environment, not against it.",
  },
  {
    question: "Can you install irrigation systems on acreage properties in Powell Butte?",
    answer: "Absolutely. We specialize in large-lot and acreage irrigation in Powell Butte, including drip systems for orchards and gardens, pasture irrigation, and smart controllers that manage water efficiently across multiple zones. We work with both well water and municipal supply systems.",
  },
  {
    question: "What drought-tolerant plants work well in Powell Butte?",
    answer: "The high-desert climate of Powell Butte is ideal for native sagebrush, rabbitbrush, bitterbrush, and native grasses like Idaho fescue and blue grama. For gardens, lavender, yarrow, penstemon, and ornamental grasses all thrive with minimal irrigation once established. We design low-water landscapes that look intentional and beautiful year-round.",
  },
  {
    question: "How far does Newport Avenue Landscaping travel for projects?",
    answer: "We serve the entire Central Oregon region including Powell Butte, Prineville, Redmond, Sisters, Tumalo, Sunriver, La Pine, and Madras. For larger installation projects, there is no travel surcharge within our standard service area. Call us at (541) 617-8873 to confirm availability for your specific location.",
  },
  {
    question: "Do you offer seasonal maintenance contracts in Powell Butte?",
    answer: "Yes. We offer seasonal maintenance agreements for Powell Butte properties including spring and fall cleanups, irrigation activation and winterization, and ongoing lawn care. Our Everything Residential Maintenance Plan covers comprehensive year-round service for qualifying properties.",
  },
];

export default function PowellButteNeighborhood() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.985 0.006 80)" }}>
      <SEO
        title="Powell Butte Landscaping & Irrigation | Newport Avenue Landscaping"
        description="Expert landscaping and irrigation for Powell Butte, Oregon acreage properties. Drought-tolerant design, large-lot irrigation, retaining walls, and seasonal maintenance. LCB #9153. Free consultation."
        canonical="https://newportavelandscaping.com/service-areas/powell-butte-landscaping"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Service Areas", url: "/service-areas" },
        { name: "Powell Butte Landscaping", url: "/service-areas/powell-butte-landscaping" },
      ]} />
      <FAQSchema faqs={FAQ_ITEMS} />
      <Navbar />

      {/* ── HERO ── */}
      <div style={{ paddingTop: "204px" }}>
        <div
          className="relative flex items-center justify-center"
          style={{
            height: "420px",
            backgroundImage: `url(${HERO_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
          }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "oklch(0 0 0 / 0.55)" }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.7rem", letterSpacing: "0.18em" }}>
              RURAL ACREAGE LANDSCAPING &middot; CENTRAL OREGON
            </p>
            <h1 className="font-display text-white" style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", maxWidth: "760px", margin: "0 auto", lineHeight: 1.15 }}>
              Powell Butte Landscaping
            </h1>
            <p className="mt-4 font-body" style={{ color: "oklch(0.88 0.006 75)", fontSize: "1.05rem", maxWidth: "580px", margin: "1rem auto 0" }}>
              Acreage irrigation, drought-tolerant design &amp; high-desert landscaping for Powell Butte&apos;s rural properties.
            </p>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="container py-16 max-w-3xl mx-auto">
        <div style={{ color: "oklch(0.25 0.005 0)" }}>

          {/* Intro */}
          <p className="mb-6" style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "oklch(0.35 0.005 0)" }}>
            Powell Butte is a rural community east of Bend in Crook County, sitting at roughly 3,400 feet elevation on the high desert plateau between the Cascade foothills and the Ochoco Mountains. Properties here range from half-acre ranchettes to multi-acre hobby farms, and the landscape is defined by juniper, sagebrush, native bunchgrasses, and sweeping views of the Cascades. Newport Avenue Landscaping has served Powell Butte and the surrounding region for over 21 years.
          </p>
          <p className="mb-8" style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "oklch(0.35 0.005 0)" }}>
            Landscaping in Powell Butte requires a fundamentally different approach than urban Bend. Lots are larger, water is often from wells, wind exposure is significant, and the native plant community is the baseline for any good design. We don't try to impose a suburban aesthetic on a high-desert ranch — we work with the land, the climate, and the character of the community.
          </p>

          {/* Services */}
          <h2 className="font-display font-light mb-4" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "oklch(0.15 0.005 0)" }}>Services We Provide in Powell Butte</h2>
          <ul className="list-disc pl-5 mb-8 space-y-2" style={{ lineHeight: 1.8 }}>
            <li>Acreage irrigation design and installation — drip, spray, and pasture systems</li>
            <li>Well water irrigation systems and pump integration</li>
            <li>Drought-tolerant and native plant landscaping</li>
            <li>Xeriscape design for low-water, low-maintenance properties</li>
            <li>Retaining walls and erosion control on sloped terrain</li>
            <li>Gravel and decomposed granite pathways and driveways</li>
            <li>Seasonal maintenance, spring activation, and fall winterization</li>
            <li>Sprinkler blowout and irrigation system winterization</li>
            <li>Landscape lighting for rural properties</li>
          </ul>

          {/* What makes Powell Butte unique */}
          <h2 className="font-display font-light mb-4" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "oklch(0.15 0.005 0)" }}>Designing for Powell Butte's High-Desert Climate</h2>
          <p className="mb-4" style={{ lineHeight: 1.8 }}>
            Powell Butte receives roughly 11–13 inches of precipitation per year — slightly more than Bend due to its elevation, but still firmly in high-desert territory. Winters are cold, with temperatures regularly dropping below 10°F, and the wind can be relentless on exposed properties. Any plant palette or irrigation system that works in a Bend subdivision needs to be adapted significantly for Powell Butte conditions.
          </p>
          <p className="mb-8" style={{ lineHeight: 1.8 }}>
            Our design approach starts with a site assessment that accounts for wind exposure, soil type (typically sandy loam over volcanic substrate), existing native vegetation, and water source. We then build a landscape plan that is beautiful, functional, and genuinely low-maintenance once established — because most Powell Butte homeowners want a landscape that works with their rural lifestyle, not one that demands constant attention.
          </p>

          {/* Irrigation section */}
          <h2 className="font-display font-light mb-4" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "oklch(0.15 0.005 0)" }}>Acreage Irrigation in Powell Butte</h2>
          <p className="mb-4" style={{ lineHeight: 1.8 }}>
            Irrigation is the most common service we provide in Powell Butte. Many properties have well water, which requires careful system design to avoid overtaxing the pump and to ensure consistent pressure across multiple zones. We design irrigation systems that work within the constraints of your water source — whether that's a well, a shared water system, or municipal supply.
          </p>
          <p className="mb-8" style={{ lineHeight: 1.8 }}>
            For larger properties, we often combine drip irrigation for garden beds and trees with spray zones for lawn areas and pasture edges. Smart controllers with weather-based scheduling are particularly valuable in Powell Butte, where the difference between a wet spring and a dry July can be dramatic. We install Rachio and Rain Bird smart controllers that adjust automatically based on local weather data.
          </p>

          {/* Pro tip */}
          <div className="p-6 mb-8 border-l-4" style={{ backgroundColor: "oklch(0.97 0.012 85)", borderColor: "oklch(0.46 0.20 25)" }}>
            <p className="font-label text-xs mb-2" style={{ color: "oklch(0.46 0.20 25)", letterSpacing: "0.15em" }}>PRO TIP: WINTERIZATION IN POWELL BUTTE</p>
            <p style={{ lineHeight: 1.8, color: "oklch(0.35 0.005 0)" }}>
              Powell Butte's colder temperatures mean irrigation systems need to be blown out earlier in the fall than in Bend — typically by mid-October. Leaving water in the lines past the first hard freeze can crack PVC pipes and damage valves. We schedule Powell Butte winterizations starting in early October to ensure your system is protected before the first significant cold snap.
            </p>
          </div>

          {/* Why Newport */}
          <h2 className="font-display font-light mb-4" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "oklch(0.15 0.005 0)" }}>Why Powell Butte Property Owners Choose Newport Avenue</h2>
          <p className="mb-4" style={{ lineHeight: 1.8 }}>
            We've been serving rural Central Oregon properties for over 21 years. We understand the difference between designing for a Bend subdivision and designing for a Powell Butte acreage — and we bring that knowledge to every project. Our crews are experienced with large-lot work, well water systems, and the native plant communities of the high desert.
          </p>
          <p className="mb-8" style={{ lineHeight: 1.8 }}>
            We're licensed with the Oregon Landscape Contractors Board (LCB #9153), fully insured, and have a team of 110+ employees. We show up on schedule, communicate throughout the project, and back every hardscape installation with a industry-standard plant and irrigation warranties.
          </p>

          {/* FAQ */}
          <h2 className="font-display font-light mb-6" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "oklch(0.15 0.005 0)" }}>Frequently Asked Questions</h2>
          <div className="space-y-5 mb-12">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} style={{ borderBottom: "1px solid oklch(0.88 0.005 0)", paddingBottom: "1.25rem" }}>
                <p className="font-body mb-2" style={{ fontWeight: 600, color: "oklch(0.22 0.005 0)", fontSize: "0.95rem" }}>{item.question}</p>
                <p className="font-body" style={{ color: "oklch(0.40 0.005 0)", lineHeight: 1.75, fontSize: "0.92rem" }}>{item.answer}</p>
              </div>
            ))}
          </div>

          {/* CTA block */}
          <div className="p-8 text-center mt-4" style={{ backgroundColor: "oklch(0.15 0.005 0)" }}>
            <p className="font-label text-xs mb-3" style={{ color: "oklch(0.46 0.20 25)", letterSpacing: "0.18em" }}>FREE CONSULTATION · NO OBLIGATION</p>
            <h3 className="font-display text-white mb-4" style={{ fontSize: "1.6rem" }}>Get a Free Quote for Your Powell Butte Property</h3>
            <p className="font-body mb-6" style={{ color: "oklch(0.72 0.005 0)", lineHeight: 1.7 }}>
              We'll visit your property, assess your site conditions, and deliver a detailed written proposal — at no cost, no pressure.
            </p>
            <Link href="/contact"><span className="btn-red inline-block">Schedule Your Free Consultation →</span></Link>
            <p className="mt-4 text-sm" style={{ color: "oklch(0.55 0.005 0)" }}>Or call us: (541) 617-8873</p>
            <div className="flex flex-wrap justify-center gap-6 mt-6">
              <span style={{ color: "oklch(0.55 0.005 0)", fontSize: "0.75rem" }}>✓ Licensed &amp; Insured · LCB #9153</span>
              <span style={{ color: "oklch(0.55 0.005 0)", fontSize: "0.75rem" }}>✓ 21+ Years Serving Central Oregon</span>
              <span style={{ color: "oklch(0.55 0.005 0)", fontSize: "0.75rem" }}>✓ 90-Day Plant Warranty · 1-Year Irrigation</span>
            </div>
          </div>

          {/* Related links */}
          <div className="mt-12 pt-10" style={{ borderTop: "1px solid oklch(0.88 0.005 0)" }}>
            <p className="font-label mb-2" style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.62rem", letterSpacing: "0.18em" }}>YOU MIGHT ALSO LIKE</p>
            <h2 className="font-display font-light mb-6" style={{ fontSize: "clamp(1.3rem, 2vw, 1.8rem)", color: "oklch(0.15 0.005 0)" }}>More Service Area Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/landscaping/bend">
                <span style={{ display: "block", padding: "1.1rem 1.25rem", backgroundColor: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none" }}>
                  <div className="font-body" style={{ color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.3rem" }}>Bend</div>
                  <div className="font-body" style={{ color: "oklch(0.50 0.008 30)", fontSize: "0.75rem", fontWeight: 300, lineHeight: 1.5 }}>Full-service landscaping across Bend's neighborhoods and subdivisions.</div>
                </span>
              </Link>
              <Link href="/landscaping/redmond">
                <span style={{ display: "block", padding: "1.1rem 1.25rem", backgroundColor: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none" }}>
                  <div className="font-body" style={{ color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.3rem" }}>Redmond</div>
                  <div className="font-body" style={{ color: "oklch(0.50 0.008 30)", fontSize: "0.75rem", fontWeight: 300, lineHeight: 1.5 }}>Landscaping and irrigation for Redmond's growing residential communities.</div>
                </span>
              </Link>
              <Link href="/service-areas/eagle-crest-landscaping">
                <span style={{ display: "block", padding: "1.1rem 1.25rem", backgroundColor: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none" }}>
                  <div className="font-body" style={{ color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.3rem" }}>Eagle Crest</div>
                  <div className="font-body" style={{ color: "oklch(0.50 0.008 30)", fontSize: "0.75rem", fontWeight: 300, lineHeight: 1.5 }}>Resort-community landscaping and irrigation for Eagle Crest homeowners.</div>
                </span>
              </Link>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
