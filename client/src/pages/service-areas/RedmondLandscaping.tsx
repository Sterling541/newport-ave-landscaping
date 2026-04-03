import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import { BreadcrumbSchema } from "@/components/SchemaMarkup";
import { Link } from "wouter";

export default function RedmondLandscaping() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.97 0.003 0)" }}>
      <SEO
        title="Landscaping Redmond Oregon | Newport Ave Landscaping"
        description="Newport Ave Landscaping offers expert landscaping services in Redmond, Oregon. Specializing in new construction, commercial properties, and adapting to Redmond's unique climate and soils. Licensed & Bonded, LCB #9153."
        canonical="https://newportavelandscaping.com/service-areas/redmond-landscaping"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Service Areas", url: "/service-areas" },
        { name: "Redmond Landscaping", url: "/service-areas/redmond-landscaping" },
      ]} />
      <Navbar />
      <div style={{ paddingTop: "328px" }}>
        {/* Hero banner */}
        <div
          className="relative flex items-center justify-center"
          style={{
            height: "380px",
            backgroundImage: "url(https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/ITP_7404_28389405.jpg)",
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
              Expert Landscaping Services in Redmond, Oregon
            </h1>
          </div>
        </div>

        {/* Article body */}
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: "oklch(0.25 0.005 0)" }}>
            <p className="mb-4">
              Redmond, Oregon, a vibrant and rapidly expanding city just north of Bend, presents unique opportunities and challenges for homeowners and businesses looking to enhance their outdoor spaces. As Redmond continues its impressive growth, particularly in residential and commercial development, the demand for high-quality, climate-appropriate landscaping services has never been greater. Newport Ave Landscaping, with over 21 years of experience serving Central Oregon, is your trusted partner for creating beautiful, sustainable, and functional landscapes that thrive in Redmond's distinct environment.
            </p>
            <p className="mb-8">
              Our deep understanding of the local microclimate, soil conditions, and aesthetic preferences allows us to design, install, and maintain landscapes that not only look stunning but also stand the test of time. From new construction landscaping to revitalizing existing commercial properties, we bring unparalleled expertise and a commitment to excellence to every project in Redmond.
            </p>

            <h2 className="text-3xl font-display mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>Redmond's Dynamic Growth and Unique Landscaping Needs</h2>
            <p className="mb-4">
              Redmond's landscape is evolving at a rapid pace, characterized by a faster-growing residential market and a surge in new construction. This growth brings with it a need for landscaping solutions that are both aesthetically pleasing and practical for modern living. New homes often require complete landscape design and installation from scratch, integrating elements like irrigation systems, drought-tolerant plantings, and functional outdoor living areas. Commercial properties, too, are seeking professional landscaping to create inviting entrances, enhance curb appeal, and provide pleasant outdoor spaces for employees and clients.
            </p>
            <p className="mb-8">
              Newport Ave Landscaping specializes in working with both residential and commercial clients in Redmond, understanding the specific requirements of each. We collaborate closely with builders and property managers to ensure that new landscapes are seamlessly integrated with the architectural vision and meet all local regulations, contributing to Redmond's overall beauty and sustainability.
            </p>

            <h2 className="text-3xl font-display mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>Navigating Redmond's Microclimate: Wind, Cold, and Soil</h2>
            <p className="mb-4">
              While part of Central Oregon's high desert at an elevation of approximately 3,000 feet, Redmond experiences a slightly different microclimate compared to its southern neighbor, Bend. It tends to be windier and often colder, especially during winter months. This necessitates careful plant selection and landscape design to ensure resilience against the elements. Our team is intimately familiar with the USDA Plant Hardiness Zone 6b classification for this region, guiding our choices for trees, shrubs, and perennials that can withstand Redmond's specific conditions.
            </p>
            <p className="mb-8">
              Furthermore, Redmond's soil, like much of Central Oregon, is characterized by volcanic pumice. This fast-draining, nutrient-poor soil requires specific amendments and irrigation strategies to support healthy plant growth. Our local knowledge of Redmond's soils and growing conditions means we can recommend the best practices for soil preparation, fertilization, and water management, ensuring your landscape thrives despite these challenges.
            </p>

            <h2 className="text-3xl font-display mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>Comprehensive Landscaping Services for Redmond Homes and Businesses</h2>
            <p className="mb-4">
              Newport Ave Landscaping offers a full spectrum of services tailored to the needs of Redmond residents and businesses. Our offerings include:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li><b>Landscape Design & Installation:</b> From initial concept to final planting, we create custom designs that reflect your vision and complement Redmond's natural beauty.</li>
              <li><b>Irrigation Systems:</b> Efficient and smart irrigation solutions designed to conserve water while keeping your landscape lush, crucial in our high desert environment.</li>
              <li><b>Hardscaping:</b> Patios, walkways, retaining walls, and outdoor living spaces crafted with durable materials that enhance functionality and aesthetic appeal.</li>
              <li><b>Lawn Care & Maintenance:</b> Regular mowing, fertilization, aeration, and seasonal clean-ups to keep your lawn healthy and vibrant.</li>
              <li><b>Tree & Shrub Care:</b> Expert pruning, planting, and removal services to maintain the health and appearance of your woody plants.</li>
              <li><b>Commercial Landscaping:</b> Tailored maintenance programs and design services for businesses, ensuring a professional and welcoming exterior.</li>
            </ul>
            <p className="mb-8">
              We pride ourselves on our meticulous attention to detail and our ability to deliver exceptional results, whether it's a small residential project or a large-scale commercial development.
            </p>

            <div className="bg-gray-100 p-6 rounded-lg mb-8" style={{ borderLeft: "4px solid oklch(0.72 0.12 25)" }}>
              <p className="font-bold mb-2">PRO TIP: Choosing Drought-Tolerant Plants for Redmond</p>
              <p>
                Given Redmond's windier and drier conditions, prioritizing drought-tolerant and native plant species is a smart investment. Consider plants like Lavender, Russian Sage, Penstemon, and various ornamental grasses. These not only conserve water but are also better adapted to the local climate and volcanic soils, requiring less maintenance and thriving with minimal intervention. Consult with our experts for a personalized plant palette that will flourish in your Redmond landscape.
              </p>
            </div>

            <h2 className="text-3xl font-display mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>Investing in Your Redmond Landscape: Costs and Value</h2>
            <p className="mb-4">
              Understanding the investment required for quality landscaping is key. While costs can vary significantly based on project scope, materials, and complexity, here are some general ranges for common landscaping services in the Central Oregon market, including Redmond:
            </p>
            <table className="min-w-full divide-y divide-gray-200 mb-8">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Typical Cost Range (Redmond/Central Oregon)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Basic Lawn Mowing (per visit)</td>
                  <td className="px-6 py-4 whitespace-nowrap">$50 - $90</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">New Landscape Design (per project)</td>
                  <td className="px-6 py-4 whitespace-nowrap">$500 - $3,000+</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Irrigation System Installation (per zone)</td>
                  <td className="px-6 py-4 whitespace-nowrap">$300 - $600</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Paver Patio Installation (per sq ft)</td>
                  <td className="px-6 py-4 whitespace-nowrap">$15 - $30</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Tree Planting (per tree, incl. tree)</td>
                  <td className="px-6 py-4 whitespace-nowrap">$150 - $800+</td>
                </tr>
              </tbody>
            </table>
            <p className="mb-8">
              These figures are estimates and can fluctuate based on specific site conditions, material choices, and the complexity of the design. We provide detailed, transparent quotes after an on-site consultation to ensure you have a clear understanding of your investment.
            </p>

            <h2 className="text-3xl font-display mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>Local Expertise and Responsive Service in Redmond</h2>
            <p className="mb-4">
              Newport Ave Landscaping is not just another landscaping company; we are an integral part of the Central Oregon community. Our 21+ years of experience in areas like Bend, Sisters, Sunriver, Tumalo, Prineville, La Pine, Madras, and of course, Redmond, means we possess an unmatched local knowledge base. We understand the nuances of Redmond's specific neighborhoods, the challenges posed by the Deschutes River's proximity, and the best practices for maintaining landscapes in this high desert environment.
            </p>
            <p className="mb-8">
              As a Licensed & Bonded contractor (LCB #9153), we adhere to the highest standards of professionalism and quality. Our responsive team is dedicated to providing timely service and clear communication, ensuring your landscaping project in Redmond is a smooth and enjoyable experience. When you choose Newport Ave Landscaping, you're choosing a partner committed to bringing your outdoor vision to life with local expertise and unwavering dedication.
            </p>

            {/* CTA BLOCK at bottom */}
            <div className="text-center mt-12 p-8 rounded-lg" style={{ backgroundColor: "oklch(0.9 0.05 25)" }}>
              <h3 className="text-2xl font-display mb-4" style={{ color: "oklch(0.25 0.005 0)" }}>Ready to Transform Your Redmond Landscape?</h3>
              <p className="mb-6">
                Whether you're planning a new landscape for your Redmond home or business, or need expert maintenance for an existing property, Newport Ave Landscaping is here to help. Contact us today for a consultation and let's create an outdoor space you'll love.
              </p>
              <Link href="/contact">
                <a className="inline-block bg-green-700 text-white font-bold py-3 px-8 rounded-full hover:bg-green-800 transition duration-300">
                  Get a Free Estimate
                </a>
              </Link>
              <p className="mt-4 text-sm" style={{ color: "oklch(0.4 0.005 0)" }}>
                Call us at (541) 617-8873 or fill out our online contact form.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}