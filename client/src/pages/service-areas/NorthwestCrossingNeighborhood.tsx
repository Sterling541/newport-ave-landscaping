import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import { BreadcrumbSchema } from "@/components/SchemaMarkup";
import { Link } from "wouter";

export default function NorthwestCrossingNeighborhood() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.97 0.003 0)" }}>
      <SEO
        title="Landscaping in Northwest Crossing Bend Oregon | Newport Ave Landscaping"
        description="Expert landscaping services in Northwest Crossing, Bend, Oregon. Specializing in NWX ARC approval, HOA-compliant designs, and sustainable solutions for your home."
        canonical="https://newportavelandscaping.com/service-areas/northwest-crossing-landscaping"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Service Areas", url: "/service-areas" },
        { name: "Northwest Crossing Landscaping", url: "/service-areas/northwest-crossing-landscaping" },
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
              Expert Landscaping Services in Northwest Crossing, Bend Oregon
            </h1>
          </div>
        </div>

        {/* Article body */}
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: "oklch(0.25 0.005 0)" }}>
            <p className="mb-6">
              Welcome to Newport Ave Landscaping, your trusted partner for exceptional landscaping services in Bend, Oregon, with a specialized focus on the unique charm and requirements of the Northwest Crossing neighborhood. Nestled in the high desert at an elevation of approximately 3,600 feet, Northwest Crossing presents a distinct set of challenges and opportunities for creating beautiful, sustainable outdoor spaces. Our team understands the local climate, the volcanic pumice soil, and the specific aesthetic guidelines that make NWX so desirable. With over 21 years of experience serving Central Oregon, including communities like Redmond, Sisters, Sunriver, Tumalo, Prineville, and La Pine, we are intimately familiar with what it takes to design, install, and maintain landscapes that thrive here.
            </p>

            <h2 className="text-2xl font-bold mb-4">Understanding Northwest Crossing's Unique Landscape & Design Aesthetic</h2>
            <p className="mb-6">
              Northwest Crossing is renowned for its distinctive craftsman and modern architectural styles, which extend to its outdoor living spaces. The neighborhood's design aesthetic emphasizes natural materials, clean lines, and a harmonious integration with the surrounding high desert environment. This means landscaping in NWX isn't just about curb appeal; it's about creating a cohesive look that complements your home and adheres to community standards. Given Bend's Zone 6b climate, characterized by hot, dry summers and cold winters, selecting the right plants is crucial. We specialize in drought-tolerant, native, and adapted species that can withstand these conditions while enhancing the beauty of your property.
            </p>

            <h2 className="text-2xl font-bold mb-4">Navigating the NWX ARC Approval Process for Landscape Changes</h2>
            <p className="mb-6">
              One of the most critical aspects of any landscape project in Northwest Crossing is the Architectural Review Committee (ARC) approval process. The NWX ARC ensures that all exterior modifications, including landscaping, maintain the neighborhood's high standards and aesthetic integrity. This process can be complex, requiring detailed plans and adherence to specific guidelines. Newport Ave Landscaping has extensive experience working with the NWX ARC. We can guide you through every step, from initial design concepts to final submission, ensuring your project meets all requirements and receives timely approval. Our goal is to make this process as smooth and stress-free as possible for you.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="font-bold text-yellow-800">PRO TIP: NWX ARC Submissions</p>
              <p className="text-yellow-700">When preparing your landscape plans for NWX ARC review, always include detailed plant lists (botanical and common names), irrigation plans, material samples, and clear site diagrams. Early consultation with Newport Ave Landscaping can help streamline this process significantly, avoiding common pitfalls and delays.</p>
            </div>

            <h2 className="text-2xl font-bold mb-4">HOA-Compliant Plant Selections for Sustainable NWX Gardens</h2>
            <p className="mb-6">
              Choosing the right plants is paramount for a successful and HOA-compliant landscape in Northwest Crossing. Our expertise lies in identifying species that not only thrive in Bend's unique climate but also align with the NWX aesthetic and water conservation principles. We recommend a variety of native and adapted plants such as various types of sage (Salvia spp.), ornamental grasses like Blue Fescue (Festuca glauca), Lavender (Lavandula spp.), and certain conifer varieties that add texture and year-round interest. These selections are typically low-maintenance, water-wise, and contribute to the overall ecological health of the Central Oregon environment, often reducing long-term irrigation costs which can range from $2,000 to $5,000 for a new system, or $200-$500 for seasonal adjustments.
            </p>

            <h2 className="text-2xl font-bold mb-4">Comprehensive Landscaping Services for Northwest Crossing Homes</h2>
            <p className="mb-6">
              Newport Ave Landscaping offers a full spectrum of services tailored to the needs of Northwest Crossing homeowners. From routine maintenance to complex installations, we ensure your landscape remains pristine and vibrant. Our services include:
            </p>
            <ul className="list-disc list-inside mb-6 ml-4">
              <li><strong>Regular Landscape Maintenance:</strong> Mowing, pruning, weeding, and general upkeep to keep your property looking its best. Monthly maintenance packages typically range from $150-$400 depending on property size and complexity.</li>
              <li><strong>Efficient Irrigation Systems:</strong> Design, installation, and repair of water-efficient irrigation systems, crucial for the high desert climate.</li>
              <li><strong>Seasonal Cleanups:</strong> Spring and fall cleanups to prepare your landscape for changing seasons, including leaf removal and debris hauling.</li>
              <li><strong>Hardscaping & Outdoor Living:</strong> Creation of patios, walkways, fire pits, and other features that enhance usability and appeal, with projects ranging from $5,000 to $30,000+.</li>
              <li><strong>New Landscape Design & Installation:</strong> From concept to completion, we create custom landscapes that reflect your vision and adhere to NWX guidelines.</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">Why Choose Newport Ave Landscaping for Your NWX Home?</h2>
            <p className="mb-6">
              Choosing Newport Ave Landscaping means partnering with a team that not only understands the art and science of landscaping but also the specific nuances of the Northwest Crossing community. We are a licensed and bonded company (LCB #9153), with a proven track record of over 21 years in Central Oregon. Our deep local knowledge, commitment to quality, and meticulous attention to detail ensure that your landscape project, whether it's a small enhancement or a complete overhaul, is handled with the utmost professionalism. We pride ourselves on creating beautiful, sustainable, and HOA-compliant outdoor spaces that enhance your home's value and your quality of life. Our service area extends beyond Bend to include Redmond, Sisters, Sunriver, Tumalo, Prineville, and La Pine, but our roots run deep in Bend.
            </p>

            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6 text-center">
              <h3 className="text-xl font-bold text-green-800 mb-2">Ready to Transform Your Northwest Crossing Landscape?</h3>
              <p className="text-green-700 mb-4">
                Contact Newport Ave Landscaping today for a personalized consultation. Let us help you create the outdoor oasis you've always dreamed of, perfectly suited for your NWX home.
              </p>
              <Link href="/contact">
                <span className="inline-block bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300">
                  Get Your Free Estimate Today
                </span>
              </Link>
              <p className="text-green-700 mt-2">Or call us directly at <a href="tel:+15416178873" className="underline">(541) 617-8873</a></p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}