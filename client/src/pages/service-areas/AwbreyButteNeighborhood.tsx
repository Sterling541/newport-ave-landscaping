
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import { BreadcrumbSchema } from "@/components/SchemaMarkup";
import { Link } from "wouter";

export default function AwbreyButteNeighborhood() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.97 0.003 0)" }}>
      <SEO
        title="Awbrey Butte Landscaping in Bend, Oregon | Newport Ave Landscaping"
        description="Transform your Awbrey Butte home with expert landscaping in Bend, Oregon. We specialize in hillside designs, fire-wise solutions, and HOA compliance for stunning views."
        canonical="https://newportavelandscaping.com/service-areas/awbrey-butte-landscaping"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Service Areas", url: "/service-areas" },
        { name: "Awbrey Butte Landscaping", url: "/service-areas/awbrey-butte-landscaping" },
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
              NEIGHBORHOOD LANDSCAPING &middot; 2026
            </p>
            <h1 className="font-display text-white" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", maxWidth: "700px", margin: "0 auto" }}>
              Expert Landscaping Services for Awbrey Butte, Bend Oregon
            </h1>
          </div>
        </div>

        {/* Article body */}
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: "oklch(0.25 0.005 0)" }}>
            <p className="mb-6">
              Awbrey Butte, nestled in the heart of Bend, Oregon, offers some of the most dramatic views and unique landscaping challenges in Central Oregon. Homeowners here enjoy stunning vistas of the Cascade Mountains and the Deschutes River, but also contend with specific environmental factors like steep hillside lots, prevalent juniper and pine trees, and the region's characteristic rocky volcanic soil. At Newport Avenue Landscaping, we understand the distinct needs of this high desert environment, situated at an elevation of approximately 3,600 feet in USDA Zone 6b. Our 21+ years of experience in Bend, Redmond, Sisters, and surrounding areas, combined with our licensed and bonded status (LCB #9153), make us the premier choice for creating beautiful, functional, and sustainable outdoor spaces that thrive on Awbrey Butte.
            </p>

            <h2 className="text-2xl font-bold mb-4">Understanding Awbrey Butte's Unique Landscape</h2>
            <p className="mb-6">
              The topography of Awbrey Butte presents both opportunities and obstacles for landscaping. The dramatic slopes offer incredible panoramic views but require specialized design and construction techniques to prevent erosion and ensure stability. The underlying volcanic pumice soil, while well-draining, is nutrient-poor and often mixed with significant rock, demanding careful soil amendment and plant selection. The native juniper and pine trees, while beautiful, can contribute to fire risk if not managed properly, especially given that much of Awbrey Butte lies within a Wildland-Urban Interface (WUI) zone. Our team at Newport Avenue Landscaping is adept at working with these natural elements, designing landscapes that complement the existing environment while addressing practical concerns.
            </p>

            <h2 className="text-2xl font-bold mb-4">Navigating HOA Regulations and Design Aesthetics</h2>
            <p className="mb-6">
              Many properties on Awbrey Butte are part of Homeowners Associations (HOAs) with specific guidelines regarding landscape design, plant palettes, and exterior aesthetics. Adhering to these regulations is crucial for a smooth project and maintaining neighborhood harmony. Our design process always includes a thorough review of your HOA's covenants, conditions, and restrictions (CC&Rs) to ensure full compliance. We specialize in creating designs that not only meet these requirements but also enhance the natural beauty of the area, often incorporating native and drought-tolerant plants that blend seamlessly with the high desert surroundings. Our goal is to craft a landscape that reflects your personal style while respecting the community's standards.
            </p>

            <h2 className="text-2xl font-bold mb-4">Specialized Services for Awbrey Butte Homes</h2>
            <p className="mb-6">
              Newport Avenue Landscaping offers a comprehensive suite of services tailored to the unique demands of Awbrey Butte properties:
            </p>
            <ul className="list-disc list-inside mb-6 ml-4">
              <li><strong>Hillside & Slope Design:</strong> Expert solutions for erosion control, terracing, retaining walls, and planting on steep grades.</li>
              <li><strong>Fire-Wise Landscaping:</strong> Strategic plant selection, defensible space creation, and fuel reduction to protect your home in WUI zones.</li>
              <li><strong>Drought-Tolerant & Native Plantings:</strong> Beautiful, low-maintenance landscapes that thrive in Bend's climate and conserve water.</li>
              <li><strong>Custom Hardscaping:</strong> Patios, walkways, and outdoor living spaces designed to integrate with your home's architecture and the natural terrain.</li>
              <li><strong>Efficient Irrigation Systems:</strong> Smart irrigation solutions optimized for water conservation and plant health in volcanic soil.</li>
              <li><strong>Landscape Lighting:</strong> Enhancing safety, security, and the dramatic beauty of your property after dark.</li>
            </ul>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
              <p className="font-bold">PRO TIP: Fire-Wise Landscaping</p>
              <p>When planning your Awbrey Butte landscape, prioritize fire-wise principles. Create a defensible space around your home by removing flammable vegetation, especially juniper and dry grasses, and choosing fire-resistant plants. This is not just a recommendation; it's a critical safety measure for homes in Bend's WUI zones. Consult with us for a comprehensive fire-wise assessment and design.</p>
            </div>

            <h2 className="text-2xl font-bold mb-4">Cost Considerations for Landscaping Awbrey Butte</h2>
            <p className="mb-6">
              Landscaping costs in Bend, Oregon, particularly on Awbrey Butte, can vary significantly based on the complexity of the design, site preparation required for slopes, material choices, and the scope of work. For basic xeriscaping or simple plantings on flat ground, homeowners might expect to pay between $5,000 to $15,000. However, projects involving extensive hillside work, retaining walls, custom hardscaping, advanced irrigation, and fire-wise defensible space design typically range from $25,000 to $75,000 or more. High-end, comprehensive landscape transformations with premium materials and intricate features can exceed $100,000. We provide detailed, transparent estimates after a thorough site evaluation to ensure you understand all aspects of your investment.
            </p>

            <h2 className="text-2xl font-bold mb-4">Our Portfolio: Awbrey Butte Transformations</h2>
            <p className="mb-6">
              Over two decades, Newport Avenue Landscaping has completed numerous successful projects across Bend, including many stunning transformations on Awbrey Butte. Our portfolio showcases how we've turned challenging hillside lots into breathtaking outdoor living spaces, integrated fire-wise strategies without compromising aesthetics, and designed landscapes that perfectly complement the architectural styles of Awbrey Butte homes. While we can't display specific client projects here, we'd be delighted to share examples of our work during a personalized consultation, demonstrating our expertise in handling steep grades, volcanic soil, and HOA requirements. We pride ourselves on delivering exceptional results that stand the test of time and the Central Oregon climate.
            </p>

            <p className="mb-6">
              Ready to transform your Awbrey Butte property? Newport Avenue Landscaping is here to bring your vision to life. With our deep understanding of the local environment, commitment to quality, and over 21 years of experience, we are the trusted partner for landscaping Awbrey Butte Bend Oregon. Contact us today for a consultation and let's create an outdoor space that you'll love for years to come.
            </p>

            {/* CTA BLOCK at bottom */}
            <div className="text-center py-10 px-6 bg-gray-100 rounded-lg">
              <h3 className="text-3xl font-display mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>
                Enhance Your Awbrey Butte Home Today!
              </h3>
              <p className="text-lg mb-6" style={{ color: "oklch(0.25 0.005 0)" }}>
                Newport Avenue Landscaping offers expert design and installation for the unique challenges of Awbrey Butte. Let's create your dream landscape.
              </p>
              <Link href="/contact">
                <span className="inline-block bg-green-700 text-white font-bold py-3 px-8 rounded-full hover:bg-green-800 transition duration-300">
                  Get a Free Consultation
                </span>
              </Link>
              <p className="text-sm mt-4" style={{ color: "oklch(0.25 0.005 0)" }}>
                Call us: (541) 617-8873
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
