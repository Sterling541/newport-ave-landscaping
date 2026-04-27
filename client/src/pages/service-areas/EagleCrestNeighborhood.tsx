import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { BreadcrumbSchema, FAQSchema } from "@/components/SchemaMarkup";
import { Link } from "wouter";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/awbrey-butte-hero-KAx3sqK4wSeVZyqPrSPZMP.webp";

const FAQ_ITEMS = [
  {
    question: "Do you provide landscaping services at Eagle Crest Resort in Redmond, Oregon?",
    answer: "Yes — Newport Avenue Landscaping serves Eagle Crest Resort homeowners and vacation property owners. We provide irrigation installation and repair, drought-tolerant landscaping, xeriscape design, seasonal maintenance, and spring/fall cleanups for residential properties throughout the Eagle Crest community.",
  },
  {
    question: "What are the HOA landscaping requirements at Eagle Crest?",
    answer: "Eagle Crest has an Architectural Review Committee (ARC) that governs plant palettes, hardscape materials, and overall landscape aesthetics. Requirements typically emphasize drought-tolerant, fire-wise plantings that complement the high-desert setting. We've worked within Eagle Crest's ARC guidelines for years and handle the review and approval process as part of every project.",
  },
  {
    question: "Can you repair or replace the irrigation system at my Eagle Crest vacation home?",
    answer: "Absolutely. Irrigation repair and system upgrades are among the most common services we provide at Eagle Crest. Many vacation properties have older systems that need valve replacements, head adjustments, or smart controller upgrades. We also offer seasonal activation and winterization services so your system is protected even when you're not there.",
  },
  {
    question: "What plants work best in Eagle Crest's high-desert climate?",
    answer: "Eagle Crest sits in the high desert at roughly 2,900 feet elevation with hot, dry summers and cold winters. The best plants for the area are drought-tolerant natives and adapted species: sagebrush, rabbitbrush, native grasses like blue grama and Idaho fescue, lavender, penstemon, yarrow, and ornamental grasses. We design landscapes that look intentional and beautiful with minimal water once established.",
  },
  {
    question: "Do you offer fire-wise landscaping at Eagle Crest?",
    answer: "Yes. Eagle Crest sits within Oregon's Wildland-Urban Interface (WUI) zone, making fire-wise landscaping both a safety priority and increasingly a regulatory requirement. We design and install defensible space landscapes that meet Oregon's 30-foot zone requirements, remove flammable vegetation, and replace it with fire-resistant native plants and hardscape elements.",
  },
  {
    question: "Can you manage my Eagle Crest property while I'm away?",
    answer: "Yes. We offer seasonal maintenance agreements for vacation and second-home properties at Eagle Crest, including irrigation monitoring, spring activation, fall winterization, lawn care, and seasonal cleanups. We can coordinate access with your property manager and send you photo updates after each visit.",
  },
];

export default function EagleCrestNeighborhood() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.985 0.006 80)" }}>
      <SEO
        title="Eagle Crest Landscaping & Irrigation | Newport Avenue Landscaping"
        description="Expert landscaping and irrigation for Eagle Crest Resort homeowners in Redmond, Oregon. Drought-tolerant design, HOA compliance, fire-wise landscaping, and vacation property maintenance. LCB #9153."
        canonical="https://newportavelandscaping.com/service-areas/eagle-crest-landscaping"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Service Areas", url: "/service-areas" },
        { name: "Eagle Crest Landscaping", url: "/service-areas/eagle-crest-landscaping" },
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
            backgroundPosition: "center 35%",
          }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "oklch(0 0 0 / 0.55)" }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.7rem", letterSpacing: "0.18em" }}>
              RESORT COMMUNITY LANDSCAPING &middot; REDMOND, OREGON
            </p>
            <h1 className="font-display text-white" style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", maxWidth: "760px", margin: "0 auto", lineHeight: 1.15 }}>
              Eagle Crest Landscaping
            </h1>
            <p className="mt-4 font-body" style={{ color: "oklch(0.88 0.006 75)", fontSize: "1.05rem", maxWidth: "580px", margin: "1rem auto 0" }}>
              HOA-compliant, fire-wise landscaping &amp; irrigation for Eagle Crest Resort homeowners and vacation property owners.
            </p>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="container py-16 max-w-3xl mx-auto">
        <div style={{ color: "oklch(0.25 0.005 0)" }}>

          {/* Intro */}
          <p className="mb-6" style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "oklch(0.35 0.005 0)" }}>
            Eagle Crest Resort is a master-planned resort community in Redmond, Oregon, set on 1,700 acres of high-desert terrain along the Deschutes River canyon rim. The community includes golf courses, resort amenities, and a mix of primary residences, vacation homes, and investment properties. The landscape is quintessential Central Oregon — juniper, sagebrush, native grasses, and dramatic rimrock views — and maintaining it well requires understanding both the HOA's design standards and the demands of the high-desert climate.
          </p>
          <p className="mb-8" style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "oklch(0.35 0.005 0)" }}>
            Newport Avenue Landscaping has served Eagle Crest homeowners for over 21 years. We know the ARC requirements, the irrigation challenges of the rocky terrain, and the fire-wise standards that are increasingly important in this WUI-zone community. Whether you live at Eagle Crest full-time or own a vacation property there, we provide the same level of service and attention to detail.
          </p>

          {/* Services */}
          <h2 className="font-display font-light mb-4" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "oklch(0.15 0.005 0)" }}>Services We Provide at Eagle Crest</h2>
          <ul className="list-disc pl-5 mb-8 space-y-2" style={{ lineHeight: 1.8 }}>
            <li>Irrigation installation, repair, and smart controller upgrades</li>
            <li>Spring irrigation activation and fall winterization</li>
            <li>Drought-tolerant and native plant landscaping</li>
            <li>Fire-wise landscaping and defensible space creation</li>
            <li>HOA/ARC design review and approval coordination</li>
            <li>Custom paver patios, walkways, and outdoor living spaces</li>
            <li>Retaining walls and erosion control</li>
            <li>Seasonal maintenance and spring/fall cleanups</li>
            <li>Vacation property maintenance programs</li>
            <li>Landscape lighting for safety and ambiance</li>
          </ul>

          {/* HOA section */}
          <h2 className="font-display font-light mb-4" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "oklch(0.15 0.005 0)" }}>Navigating Eagle Crest's ARC Requirements</h2>
          <p className="mb-4" style={{ lineHeight: 1.8 }}>
            Eagle Crest's Architectural Review Committee (ARC) maintains design standards that govern plant selection, hardscape materials, and overall landscape aesthetics throughout the community. The standards are designed to preserve the resort's natural high-desert character and ensure visual consistency across the development.
          </p>
          <p className="mb-8" style={{ lineHeight: 1.8 }}>
            We've worked within these guidelines for years and handle the full ARC review and approval process as part of every project. We know which plant species are approved, which hardscape materials are preferred, and how to design a landscape that passes ARC review on the first submission. You won't need to navigate the paperwork alone.
          </p>

          {/* Fire-wise section */}
          <h2 className="font-display font-light mb-4" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "oklch(0.15 0.005 0)" }}>Fire-Wise Landscaping at Eagle Crest</h2>
          <p className="mb-4" style={{ lineHeight: 1.8 }}>
            Eagle Crest sits within Oregon's Wildland-Urban Interface (WUI) zone — the transition area between developed land and wildland vegetation where wildfire risk is highest. This means fire-wise landscaping isn't just a good idea at Eagle Crest; it's increasingly a regulatory requirement, and Deschutes County is actively working on defensible space ordinances that will affect WUI-zone properties.
          </p>
          <p className="mb-8" style={{ lineHeight: 1.8 }}>
            Our fire-wise landscaping services at Eagle Crest include removing flammable juniper and dry grasses within the 30-foot defensible space zone, replacing them with fire-resistant natives and hardscape elements, and designing landscapes that slow fire spread while still looking beautiful. We include a defensible space assessment with every new landscape project at Eagle Crest.
          </p>

          {/* Vacation property section */}
          <div className="p-6 mb-8 border-l-4" style={{ backgroundColor: "oklch(0.97 0.012 85)", borderColor: "oklch(0.46 0.20 25)" }}>
            <p className="font-label text-xs mb-2" style={{ color: "oklch(0.46 0.20 25)", letterSpacing: "0.15em" }}>VACATION PROPERTY OWNERS</p>
            <p style={{ lineHeight: 1.8, color: "oklch(0.35 0.005 0)" }}>
              If you own a vacation home or investment property at Eagle Crest, we offer seasonal maintenance programs that keep your landscape looking great year-round — even when you're not there. We handle spring irrigation activation, fall winterization, seasonal cleanups, and ongoing lawn care, and we coordinate with your property manager for access. We can send you photo updates after each visit so you always know the condition of your property.
            </p>
          </div>

          {/* Why Newport */}
          <h2 className="font-display font-light mb-4" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "oklch(0.15 0.005 0)" }}>Why Eagle Crest Homeowners Choose Newport Avenue</h2>
          <p className="mb-4" style={{ lineHeight: 1.8 }}>
            We've served Eagle Crest homeowners for over 21 years — long enough to have worked on the same properties through multiple ownership cycles. We know the terrain, the ARC requirements, and the irrigation challenges of the rocky high-desert soil. Our crews are experienced, our communication is consistent, and we back every hardscape installation with a industry-standard plant and irrigation warranties.
          </p>
          <p className="mb-8" style={{ lineHeight: 1.8 }}>
            We're licensed with the Oregon Landscape Contractors Board (LCB #9153), fully insured, and have a team of 150+ employees. Large enough to handle any scope, local enough to care about every detail.
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
            <h3 className="font-display text-white mb-4" style={{ fontSize: "1.6rem" }}>Get a Free Quote for Your Eagle Crest Property</h3>
            <p className="font-body mb-6" style={{ color: "oklch(0.72 0.005 0)", lineHeight: 1.7 }}>
              We'll visit your property, review the ARC requirements, and deliver a detailed written proposal — at no cost, no pressure.
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
              <Link href="/landscaping/redmond">
                <span style={{ display: "block", padding: "1.1rem 1.25rem", backgroundColor: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none" }}>
                  <div className="font-body" style={{ color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.3rem" }}>Redmond</div>
                  <div className="font-body" style={{ color: "oklch(0.50 0.008 30)", fontSize: "0.75rem", fontWeight: 300, lineHeight: 1.5 }}>Full-service landscaping across Redmond's growing residential communities.</div>
                </span>
              </Link>
              <Link href="/service-areas/powell-butte-landscaping">
                <span style={{ display: "block", padding: "1.1rem 1.25rem", backgroundColor: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none" }}>
                  <div className="font-body" style={{ color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.3rem" }}>Powell Butte</div>
                  <div className="font-body" style={{ color: "oklch(0.50 0.008 30)", fontSize: "0.75rem", fontWeight: 300, lineHeight: 1.5 }}>Acreage irrigation and high-desert landscaping for Powell Butte properties.</div>
                </span>
              </Link>
              <Link href="/service-areas/awbrey-butte-landscaping">
                <span style={{ display: "block", padding: "1.1rem 1.25rem", backgroundColor: "oklch(1 0 0)", borderLeft: "3px solid oklch(0.46 0.20 25)", textDecoration: "none" }}>
                  <div className="font-body" style={{ color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.3rem" }}>Awbrey Butte</div>
                  <div className="font-body" style={{ color: "oklch(0.50 0.008 30)", fontSize: "0.75rem", fontWeight: 300, lineHeight: 1.5 }}>Hillside design and fire-wise landscaping for Bend's most dramatic neighborhood.</div>
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
