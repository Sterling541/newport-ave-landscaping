import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import { BreadcrumbSchema } from "@/components/SchemaMarkup";
import { Link } from "wouter";

export default function BrokenTopNeighborhood() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.97 0.003 0)" }}>
      <SEO
        title="Landscaping Broken Top Bend Oregon | Newport Ave Landscaping"
        description="Discover premium landscaping services in Broken Top, Bend, Oregon. Newport Ave Landscaping specializes in high-end installations, water features, and estate maintenance."
        canonical="https://newportavelandscaping.com/service-areas/broken-top-landscaping"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Service Areas", url: "/service-areas" },
        { name: "Broken Top Landscaping", url: "/service-areas/broken-top-landscaping" },
      ]} />
      <Navbar />
      <div style={{ paddingTop: "328px" }}>
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
              SERVICE AREA &middot; 2026
            </p>
            <h1 className="font-display text-white" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", maxWidth: "700px", margin: "0 auto" }}>
              Landscaping Broken Top Bend Oregon: Elevating Estate Aesthetics
            </h1>
          </div>
        </div>

        {/* Article body */}
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: "oklch(0.25 0.005 0)" }}>
            <p className="mb-6">
              Nestled in the high desert landscape of Bend, Oregon, the Broken Top community stands as a beacon of luxury and natural beauty. With its challenging golf course, expansive estate lots, and breathtaking views of the Cascade Mountains, Broken Top demands a level of landscaping that not only complements its architectural grandeur but also thrives in Central Oregon\'s unique climate. Newport Ave Landscaping, with over 21 years of experience serving Bend and surrounding areas like Redmond, Sisters, and Sunriver, is the trusted partner for homeowners seeking unparalleled outdoor living spaces. Our licensed and bonded team (LCB #9153) understands the intricate balance required to create and maintain landscapes that reflect the premium standards of this exclusive gated community.
            </p>

            <h2 className="text-3xl font-display mb-4 mt-8">Premium Landscape Standards for Broken Top Estates</h2>
            <p className="mb-6">
              Broken Top isn\'t just a neighborhood; it\'s a lifestyle. The community\'s stringent aesthetic guidelines and the discerning tastes of its residents necessitate landscape designs that are both innovative and harmonious with the natural surroundings. At Newport Ave Landscaping, we specialize in crafting bespoke outdoor environments that enhance curb appeal, provide privacy, and offer year-round enjoyment. From meticulously manicured lawns to sophisticated hardscaping, our designs integrate seamlessly with the high desert environment, respecting the local ecosystem while delivering luxurious appeal. We consider factors like Bend\'s 3,600ft elevation, Zone 6b climate, and volcanic pumice soil to ensure the longevity and vitality of every plant and feature.
            </p>

            <h2 className="text-3xl font-display mb-4 mt-8">Golf Course Adjacency and Large Estate Lots</h2>
            <p className="mb-6">
              Many Broken Top properties boast enviable positions along the championship golf course, offering stunning vistas that become an extension of your backyard. This unique adjacency requires careful planning to maintain views while ensuring privacy and adhering to community regulations. Our expertise extends to designing landscapes for these large estate lots, creating expansive outdoor living areas that might include multi-tiered patios, outdoor kitchens, and serene garden spaces. We understand how to maximize the potential of these generous plots, transforming them into private oases that complement the grandeur of the golf course and the surrounding natural beauty of Central Oregon.
            </p>

            <h2 className="text-3xl font-display mb-4 mt-8">Iconic Water Features: The Newport Ave Signature</h2>
            <p className="mb-6">
              Water features are a hallmark of luxury landscaping, and Newport Ave Landscaping has a proven track record of creating breathtaking installations. We are particularly proud of our work on the famous Broken Top water feature and sunken fire pit project, a testament to our design prowess and technical skill. Whether you envision a cascading waterfall, a tranquil koi pond, or a contemporary fountain, our team can design and install a water feature that adds a dynamic element of sound and visual interest to your estate. These features not only enhance the aesthetic appeal but also provide a soothing ambiance, perfect for relaxation and entertaining.
            </p>

            <h2 className="text-3xl font-display mb-4 mt-8">High-End Installation Services and Craftsmanship</h2>
            <p className="mb-6">
              Our commitment to excellence is evident in every installation. We utilize only the highest quality materials and employ skilled craftsmen to ensure that every aspect of your landscape project, from irrigation systems to intricate stonework, is executed to perfection. Our services include comprehensive hardscaping with premium pavers and natural stone, custom outdoor lighting, sophisticated planting schemes, and efficient irrigation solutions designed for the arid Central Oregon climate. We pride ourselves on precision and durability, ensuring your investment stands the test of time and the elements.
            </p>

            <div className="bg-gray-100 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-display mb-2">PRO TIP: Water Conservation in High Desert Landscapes</h3>
              <p>
                Given Bend\'s high desert environment and the importance of water conservation, consider drought-tolerant native plants and efficient drip irrigation systems for your Broken Top landscape. This not only reduces water usage but also helps your garden thrive in the volcanic pumice soil and Zone 6b climate. Newport Ave Landscaping can guide you in selecting the best plants and irrigation methods for sustainable beauty.
              </p>
            </div>

            <h2 className="text-3xl font-display mb-4 mt-8">Comprehensive Maintenance Programs for Large Properties</h2>
            <p className="mb-6">
              Maintaining a large estate landscape in Broken Top requires consistent care and specialized knowledge. Newport Ave Landscaping offers tailored maintenance programs designed to preserve the beauty and health of your outdoor investment. Our services range from seasonal clean-ups and pruning to fertilization, pest management, and irrigation system checks. We ensure that your property remains pristine year-round, allowing you to enjoy your landscape without the burden of upkeep. Our service area extends beyond Bend to include Redmond, Sisters, Sunriver, Tumalo, Prineville, and La Pine, ensuring comprehensive coverage for Central Oregon\'s finest properties.
            </p>

            <h2 className="text-3xl font-display mb-4 mt-8">Understanding Landscaping Costs in Bend, Oregon</h2>
            <p className="mb-6">
              The cost of landscaping in Broken Top, Bend, Oregon, can vary significantly based on the scope and complexity of the project, as well as the materials chosen. For high-end installations and custom designs typical of this community, homeowners can expect to invest anywhere from <strong className="text-primary">$15,000 to $150,000+</strong> for a full landscape overhaul, with smaller projects like a significant water feature or patio ranging from <strong className="text-primary">$5,000 to $30,000</strong>. Maintenance programs for large estates typically run from <strong className="text-primary">$300 to $1,500+</strong> per month, depending on frequency and services included. These figures are general estimates for the Central Oregon market and can fluctuate based on current material costs and labor availability. We provide detailed, transparent quotes after a thorough on-site consultation.
            </p>

            <div className="bg-primary-light text-white p-8 text-center rounded-lg mt-12">
              <h3 className="text-3xl font-display mb-4">Ready to Transform Your Broken Top Estate?</h3>
              <p className="mb-6 text-lg">
                Elevate your outdoor living with Newport Ave Landscaping. Contact us today for a personalized consultation and discover why we are the premier choice for landscaping in Broken Top, Bend, Oregon.
              </p>
              <Link href="/contact" className="inline-block bg-white text-primary font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition duration-300">
                Get Your Free Consultation
              </Link>
              <p className="mt-4 text-sm">
                Call us directly: (541) 617-8873
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
