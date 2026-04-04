import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import { BreadcrumbSchema } from "@/components/SchemaMarkup";
import { Link } from "wouter";

export default function SunriverLandscaping() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.97 0.003 0)" }}>
      <SEO
        title="Landscaping Sunriver Oregon: Expert Services for High Desert Homes | Newport Ave Landscaping"
        description="Discover expert landscaping services in Sunriver, Oregon. Newport Ave Landscaping specializes in SROA compliance, vacation rental maintenance, pine needle cleanup, and high desert plant palettes. Licensed & Bonded, LCB #9153."
        canonical="https://newportavelandscaping.com/service-areas/sunriver-landscaping"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Service Areas", url: "/service-areas" },
        { name: "Sunriver Landscaping", url: "/service-areas/sunriver-landscaping" },
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
              SERVICE AREA &middot; 2024
            </p>
            <h1 className="font-display text-white" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", maxWidth: "700px", margin: "0 auto" }}>
              Expert Landscaping Services in Sunriver, Oregon
            </h1>
          </div>
        </div>

        {/* Article body */}
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: "oklch(0.25 0.005 0)" }}>
            <p className="mb-4">
              Sunriver, Oregon, is a unique high desert community nestled at an elevation of approximately 4,164 feet, offering unparalleled natural beauty but also presenting distinct challenges for landscaping. From the specific architectural and aesthetic guidelines set by the Sunriver Owners Association (SROA) to the arid climate and volcanic pumice soil, maintaining a vibrant and healthy landscape here requires specialized knowledge and experience. Newport Ave Landscaping, with over 21 years of experience serving Central Oregon, including Sunriver, understands these nuances. We are a Licensed & Bonded company (LCB #9153) dedicated to providing exceptional landscaping services that not only enhance your property's beauty but also thrive in this unique environment.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Navigating SROA Landscape Requirements</h2>
            <p className="mb-4">
              The Sunriver Owners Association (SROA) plays a crucial role in maintaining the distinctive character of the community. Their comprehensive landscape guidelines are designed to preserve the natural high desert aesthetic, promote fire safety, and ensure architectural harmony. For homeowners and vacation rental property owners, understanding and adhering to these regulations is paramount. Newport Ave Landscaping has extensive experience working within SROA guidelines, ensuring your landscape designs and maintenance practices are fully compliant. We assist with everything from approved plant lists and native species selection to proper spacing, fire-wise landscaping, and the timely removal of noxious weeds. Our goal is to create a beautiful outdoor space that respects Sunriver's natural environment and meets all regulatory standards.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Specialized Maintenance for Vacation Rental Properties</h2>
            <p className="mb-4">
              Vacation rental properties in Sunriver require a different level of landscaping attention compared to primary residences. Consistent curb appeal is essential for attracting guests and maintaining positive reviews. Properties often sit vacant between bookings, making efficient irrigation and robust plant choices critical. Newport Ave Landscaping offers tailored maintenance plans for vacation rentals, ensuring your property always looks its best. This includes regular lawn care, seasonal cleanups, irrigation system checks and adjustments, and prompt pine needle cleanup &ndash; a common and necessary task in Sunriver to prevent fire hazards and maintain a tidy appearance. We work with property managers and owners to schedule services efficiently, minimizing disruption to guests and maximizing your property's appeal.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Mastering the High Desert Plant Palette</h2>
            <p className="mb-4">
              The Central Oregon high desert, characterized by its Zone 6b climate, hot summers, cold winters, and fast-draining volcanic pumice soil, demands a specific approach to plant selection. Choosing the right plants is key to a sustainable and low-maintenance landscape. We specialize in designing and installing landscapes that feature drought-tolerant, native, and adapted species that thrive in these conditions. Think Ponderosa pines, various junipers, sagebrush, bitterbrush, and a variety of ornamental grasses and perennials that can withstand the region's climate extremes. Our expertise ensures your landscape is not only beautiful but also resilient, requiring less water and fewer resources in the long run. We help you create a landscape that truly belongs in Sunriver.
            </p>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 my-6" role="alert">
              <p className="font-bold">PRO TIP: Efficient Irrigation for Vacant Properties</p>
              <p>For Sunriver properties that may sit vacant for extended periods, consider smart irrigation systems with remote monitoring capabilities. These systems allow you to adjust watering schedules from anywhere, detect leaks, and ensure your landscape receives optimal hydration without waste. This is particularly crucial in Central Oregon's arid climate, where water conservation is key, and can save you significant costs and prevent plant loss.</p>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Pine Needle Cleanup and Fire-Wise Landscaping</h2>
            <p className="mb-4">
              Pine needle accumulation is a constant in Sunriver, and while it contributes to the natural aesthetic, excessive buildup poses a significant fire risk. Regular pine needle cleanup is not just about aesthetics; it's a critical component of fire-wise landscaping, often mandated by SROA. Newport Ave Landscaping provides thorough pine needle removal services, clearing roofs, gutters, and landscape beds to reduce fuel loads. We also advise on and implement other fire-wise practices, such as creating defensible space around your home, selecting fire-resistant plants, and maintaining proper spacing between vegetation. Protecting your property and the surrounding forest is a top priority.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Newport Ave Landscaping's Sunriver Service Schedule</h2>
            <p className="mb-4">
              Newport Ave Landscaping is committed to providing reliable and consistent service to our Sunriver clients. Our service schedule is designed to accommodate the unique needs of the community, including seasonal demands and vacation rental turnovers. We offer flexible scheduling for regular maintenance, seasonal cleanups (spring and fall), irrigation system winterization and spring startup, and on-demand services like pine needle cleanup. Our team is familiar with the routes and access points within Sunriver, ensuring efficient and timely service. We proudly serve Sunriver, along with other Central Oregon communities like Bend, Redmond, Sisters, Tumalo, Prineville, and La Pine. Contact us today at (541) 617-8873 to discuss your Sunriver landscaping needs and schedule a consultation.
            </p>

            {/* CTA Block */}
            <div className="bg-green-700 text-white p-8 text-center mt-12 rounded-lg">
              <h3 className="text-3xl font-bold mb-4">Ready for a Beautiful, Compliant Sunriver Landscape?</h3>
              <p className="text-lg mb-6">
                Let Newport Ave Landscaping transform your outdoor space into a thriving, SROA-compliant oasis. With over two decades of experience in Central Oregon, we're your trusted partner for all landscaping needs.
              </p>
              <Link href="/contact">
                <span className="inline-block bg-white text-green-700 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition duration-300">
                  Get Your Free Consultation Today
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
