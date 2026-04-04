import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import { BreadcrumbSchema } from "@/components/SchemaMarkup";
import { Link } from "wouter";

export default function SnowRemovalBend() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.97 0.003 0)" }}>
      <SEO
        title="Snow Removal Services in Bend, Oregon | Newport Ave Landscaping"
        description="Ensure your Bend, Oregon property is clear and safe this winter with professional snow removal services from Newport Ave Landscaping. We handle residential and commercial snow clearing, de-icing, and offer flexible contracts. Licensed & Bonded (LCB #9153)."
        canonical="https://newportavelandscaping.com/resources/snow-removal-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Resources", url: "/resources" },
        { name: "Snow Removal Bend Oregon", url: "/resources/snow-removal-bend-oregon" },
      ]} />
      <Navbar />
      <div style={{ paddingTop: "204px" }}>
        {/* Hero banner */}
        <div
          className="relative flex items-center justify-center"
          style={{
            height: "380px",
            backgroundImage: "url(https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/ITP_7558_e52a40c9.jpg",
            backgroundSize: "cover",
            backgroundPosition: "center 50%",
          }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "oklch(0 0 0 / 0.55)" }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.7rem", letterSpacing: "0.18em" }}>
              WINTER SERVICES &middot; 2026
            </p>
            <h1 className="font-display text-white" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", maxWidth: "700px", margin: "0 auto" }}>
              Professional Snow Removal Services in Bend, Oregon
            </h1>
          </div>
        </div>

        {/* Article body */}
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: "oklch(0.25 0.005 0)" }}>
            <p className="mb-6">
              Winter in Bend, Oregon, brings breathtaking beauty, but also the challenge of significant snowfall. With an average of 25-30 inches of snow annually, navigating driveways, walkways, and commercial properties can become a daunting task. At Newport Ave Landscaping, we understand the unique demands of Bend's high desert climate, situated at an elevation of 3,600ft. Our professional snow removal services ensure your property remains safe and accessible throughout the winter months, protecting both your family and your landscape.
            </p>

            <h2 className="font-display text-2xl mt-10 mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>
              Residential vs. Commercial Snow Removal: Tailored Solutions
            </h2>
            <p className="mb-6">
              Whether you own a home in a charming Bend neighborhood like Old Mill District or a business in the bustling downtown area, your snow removal needs are distinct. For residential clients, we focus on clearing driveways, sidewalks, and entryways, ensuring safe passage for residents and visitors. Our team is mindful of your delicate landscape plants, often growing in volcanic pumice soil, taking care to prevent damage during clearing. For commercial properties, including those in Redmond, Sisters, or Sunriver, our services extend to parking lots, loading docks, and access roads, minimizing business disruption and ensuring compliance with safety regulations. We recognize that a clear, safe commercial property is crucial for your customers and employees, especially during heavy snowfalls that can impact the entire Central Oregon region.
            </p>

            <h2 className="font-display text-2xl mt-10 mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>
              Flexible Contracts: Per-Push or Seasonal
            </h2>
            <p className="mb-6">
              Newport Ave Landscaping offers flexible snow removal contracts to suit your budget and needs. Our <strong>per-push service</strong> is ideal for those who prefer to pay only when snow accumulation reaches a certain threshold, typically 2-4 inches. This option provides cost-effectiveness for milder winters. For consistent peace of mind, our <strong>seasonal contracts</strong> offer comprehensive snow removal throughout the entire winter season, regardless of snowfall frequency. This ensures your property is always clear, often with guaranteed response times. We work with clients across our service area, including Tumalo, Prineville, and La Pine, to determine the best contract type for their specific situation.
            </p>

            <div className="bg-gray-100 p-6 rounded-lg my-8" style={{ borderLeft: "4px solid oklch(0.72 0.12 25)" }}>
              <h3 className="font-display text-xl mb-2" style={{ color: "oklch(0.25 0.005 0)" }}>
                PRO TIP: Protecting Your Landscape from Snow Damage
              </h3>
              <p>
                Heavy snow can be detrimental to landscape plants, especially in Bend's Zone 6b climate. Before winter sets in, consider wrapping delicate shrubs or using stakes to support branches. During snow removal, ensure snow is piled away from sensitive plantings and tree trunks. Our team is trained to identify vulnerable areas and implement strategies to protect your valuable landscaping, which is often a significant investment in our high desert environment.
              </p>
            </div>

            <h2 className="font-display text-2xl mt-10 mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>
              De-Icing Solutions for Enhanced Safety
            </h2>
            <p className="mb-6">
              Beyond snow removal, ice can pose a significant hazard, particularly on shaded surfaces or during freeze-thaw cycles common near the Deschutes River. Newport Ave Landscaping provides effective de-icing services using environmentally friendly products that are safe for pets, plants, and concrete. Our de-icing treatments help prevent ice formation and melt existing ice, drastically reducing the risk of slips and falls. This is an essential service for both residential and commercial properties, ensuring maximum safety for everyone on your premises.
            </p>

            <h2 className="font-display text-2xl mt-10 mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>
              Timing, Response Guarantees, and Why Your Landscaper is Key
            </h2>
            <p className="mb-6">
              When snow hits, timely response is critical. Newport Ave Landscaping, with over 21 years of experience serving Central Oregon, offers reliable timing and response guarantees for our seasonal contract clients. We monitor weather forecasts closely to deploy our teams efficiently, often before the heaviest snowfall, ensuring your property is clear when you need it most. Choosing a landscaper like us for snow removal offers a distinct advantage: we already know the layout of your property, the location of delicate plants, and your specific needs. This intimate knowledge, combined with our status as a Licensed & Bonded company (LCB #9153), means a seamless transition from fall cleanup to winter readiness, and back to spring landscaping. We serve all of Central Oregon, including Madras, and are committed to maintaining the beauty and functionality of your outdoor spaces year-round.
            </p>

            <div className="bg-gray-50 p-8 text-center rounded-lg mt-12 mb-8">
              <h3 className="font-display text-3xl mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>
                Ready for a Worry-Free Winter?
              </h3>
              <p className="text-lg mb-6">
                Don't let Bend's winter weather catch you off guard. Contact Newport Ave Landscaping today for a personalized snow removal plan tailored to your residential or commercial property. We're here to keep your pathways clear and safe.
              </p>
              <Link href="/contact">
                <span className="inline-block bg-green-700 text-white font-bold py-3 px-8 rounded-full hover:bg-green-800 transition duration-300">
                  Get a Free Estimate
                </span>
              </Link>
              <p className="text-sm mt-4" style={{ color: "oklch(0.4 0.005 0)" }}>
                Call us at (541) 617-8873
              </p>
            </div>
          {/* ── You might also like / Related Services ── */}
            <div className="mt-12 pt-10" style={{ borderTop: "1px solid oklch(0.88 0.005 0)" }}>
              <p className="font-label mb-2" style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.62rem", letterSpacing: "0.18em" }}>
                YOU MIGHT ALSO LIKE
              </p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: "clamp(1.3rem, 2vw, 1.8rem)", color: "oklch(0.15 0.005 0)" }}>
                More Helpful Guides
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/lawn-maintenance-cost-bend-oregon">
                  <span
                    style={{
                      display: "block",
                      padding: "1.1rem 1.25rem",
                      backgroundColor: "oklch(1 0 0)",
                      borderLeft: "3px solid oklch(0.46 0.20 25)",
                      textDecoration: "none",
                    }}
                  >
                    <div className="font-body" style={{ color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.3rem" }}>
                      Lawn Maintenance Cost in Bend
                    </div>
                    <div className="font-body" style={{ color: "oklch(0.50 0.008 30)", fontSize: "0.75rem", fontWeight: 300, lineHeight: 1.5 }}>
                      What lawn care and maintenance services cost in Central Oregon.
                    </div>
                  </span>
                </Link>
                <Link href="/resources/commercial-landscaping-bend-oregon">
                  <span
                    style={{
                      display: "block",
                      padding: "1.1rem 1.25rem",
                      backgroundColor: "oklch(1 0 0)",
                      borderLeft: "3px solid oklch(0.46 0.20 25)",
                      textDecoration: "none",
                    }}
                  >
                    <div className="font-body" style={{ color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.3rem" }}>
                      Commercial Landscaping in Bend
                    </div>
                    <div className="font-body" style={{ color: "oklch(0.50 0.008 30)", fontSize: "0.75rem", fontWeight: 300, lineHeight: 1.5 }}>
                      What commercial property maintenance costs and what to expect.
                    </div>
                  </span>
                </Link>
                <Link href="/resources/sprinkler-winterization-guide-bend-oregon">
                  <span
                    style={{
                      display: "block",
                      padding: "1.1rem 1.25rem",
                      backgroundColor: "oklch(1 0 0)",
                      borderLeft: "3px solid oklch(0.46 0.20 25)",
                      textDecoration: "none",
                    }}
                  >
                    <div className="font-body" style={{ color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.3rem" }}>
                      Sprinkler Winterization Guide
                    </div>
                    <div className="font-body" style={{ color: "oklch(0.50 0.008 30)", fontSize: "0.75rem", fontWeight: 300, lineHeight: 1.5 }}>
                      Step-by-step blowout and winterization guide for Bend homeowners.
                    </div>
                  </span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}