import { Helmet } from "react-helmet-async";
import { BreadcrumbSchema, FAQSchema } from "@/components/SchemaMarkup";
import { Link } from "wouter";

export default function WaterWiseCommunitiesBend() {
  const faqs = [
    {
      question: "What is the WaterWise Communities program in Bend?",
      answer:
        "The WaterWise Communities program is a City of Bend rebate program for homeowner associations, community associations, and commercial properties. The City provides a 50% match of project costs — up to $10,000 — for landscape conversions, irrigation system upgrades, and other water-saving improvements. Each project includes a landscape evaluation, irrigation evaluation, and support from City staff throughout the process.",
    },
    {
      question: "Who is eligible for the WaterWise Communities program?",
      answer:
        "Eligibility requires that you are a current City of Bend Water Services customer. The program is designed for commercial-scale customers including HOAs, community associations, parks, schools, and commercial properties. Individual residential customers should look at the Turf Replacement Rebate program instead, which offers $3 per square foot up to $3,000.",
    },
    {
      question: "How much can my HOA receive from the WaterWise Communities program?",
      answer:
        "The City of Bend will match 50% of your project costs, up to a maximum of $10,000. For example, if your HOA spends $15,000 on a qualifying landscape conversion and irrigation upgrade, the City would rebate $7,500. If you spend $20,000 or more, you receive the maximum $10,000 rebate. Projects must be completed by October 31 and all documentation submitted to receive the rebate check within 60 days of final approval.",
    },
    {
      question: "What types of projects qualify for WaterWise Communities funding?",
      answer:
        "Qualifying project types include landscape conversions (replacing water-intensive turf with drought-tolerant, low-water plantings), system efficiency upgrades (replacing outdated irrigation heads, adding smart controllers, converting to drip irrigation), and other water-saving improvements identified during the City's evaluation. Newport Avenue Landscaping can help you identify the highest-impact improvements for your property during a free consultation.",
    },
    {
      question: "How does Newport Avenue Landscaping help HOAs with the WaterWise Communities program?",
      answer:
        "Newport Avenue serves as your landscape contractor throughout the entire WaterWise Communities process. We help you plan your project scope, attend the pre-construction meeting with City staff, complete all work within the required 90-day window, and provide all documentation needed for your rebate application. We have experience with the City of Bend's evaluation process and can design projects that maximize both water savings and rebate eligibility.",
    },
    {
      question: "How long does the WaterWise Communities project have to be maintained?",
      answer:
        "Completed projects must be maintained and comply with all program terms and conditions for five years following receipt of the rebate. This means the new landscape must be kept healthy and the irrigation system must remain operational and efficient. Newport Avenue offers ongoing maintenance programs that can keep your HOA landscape in compliance throughout the five-year requirement period.",
    },
    {
      question: "How do we apply for the WaterWise Communities program?",
      answer:
        "Submit a completed WaterWise Communities Program Application to the City of Bend Water Services Department. You can email it to conservation@bendoregon.gov, mail it to 21051 NE Talus Place, Bend OR 97701, or deliver it in person Monday–Friday 9am–4pm. After submission, City staff will contact you to schedule a system evaluation and pre-construction meeting. Newport Avenue can attend this meeting with you as your contractor.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>WaterWise Communities Bend Oregon: HOA Landscape Rebate Up to $10,000 | Newport Avenue</title>
        <meta
          name="description"
          content="City of Bend's WaterWise Communities program offers HOAs and commercial properties a 50% match up to $10,000 for landscape conversions and irrigation upgrades. Newport Avenue Landscaping is your qualified contractor. LCB #9153."
        />
        <link
          rel="canonical"
          href="https://newportavelandscaping.com/resources/waterwise-communities-bend-hoa"
        />
      </Helmet>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://newportavelandscaping.com" },
          { name: "Resources", url: "https://newportavelandscaping.com/resources" },
          {
            name: "WaterWise Communities Bend HOA",
            url: "https://newportavelandscaping.com/resources/waterwise-communities-bend-hoa",
          },
        ]}
      />
      <FAQSchema faqs={faqs} />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <div className="bg-[oklch(0.25_0.05_145)] text-white py-16">
          <div className="max-w-4xl mx-auto px-4">
            <nav className="text-sm text-green-300 mb-4">
              <Link href="/">Home</Link>
              {" / "}
              <Link href="/resources">Resources</Link>
              {" / WaterWise Communities Bend HOA"}
            </nav>
            <h1 className="text-4xl font-bold mb-4">
              WaterWise Communities Program: How Bend HOAs Can Get Up to $10,000 for Landscape Upgrades
            </h1>
            <p className="text-xl text-gray-200">
              The City of Bend matches 50% of your project costs — up to $10,000 — for qualifying
              landscape conversions and irrigation upgrades. Newport Avenue Landscaping is your
              experienced local contractor.
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Intro */}
          <section className="mb-10">
            <p className="text-lg text-gray-700 mb-4">
              Managing a homeowner association or commercial property in Bend means managing water
              costs — and those costs are rising. Outdoor irrigation accounts for the majority of
              water use on most HOA and commercial properties, and outdated systems or water-thirsty
              turf can mean thousands of dollars in unnecessary utility bills every year.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              The City of Bend's{" "}
              <strong>WaterWise Communities program</strong> was designed specifically for this
              situation. It provides a 50% match of your project costs — up to $10,000 — for
              qualifying landscape conversions and irrigation system upgrades. Combined with the
              long-term reduction in water bills, the WaterWise Communities program makes
              water-efficient landscaping one of the best financial decisions an HOA board can make.
            </p>
            <p className="text-lg text-gray-700">
              Newport Avenue Landscaping has helped Bend-area HOAs and commercial properties design,
              install, and document water-wise landscape projects. We understand the City's
              evaluation process and can help you maximize both the water savings and the rebate
              amount your project qualifies for.
            </p>
          </section>

          {/* Program Details */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              WaterWise Communities Program: Key Facts
            </h2>
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-bold text-gray-900">Rebate Amount</p>
                  <p className="text-gray-700">50% match of project costs, up to $10,000</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Who Qualifies</p>
                  <p className="text-gray-700">HOAs, community associations, commercial properties</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Eligibility Requirement</p>
                  <p className="text-gray-700">Must be a City of Bend water customer</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Project Deadline</p>
                  <p className="text-gray-700">All projects must be completed by October 31</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Rebate Payment</p>
                  <p className="text-gray-700">Within 60 days of final approval</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Maintenance Requirement</p>
                  <p className="text-gray-700">5 years of compliance required after rebate</p>
                </div>
              </div>
            </div>
            <p className="text-gray-700">
              The program is administered by the City of Bend Water Services Department. For
              questions, contact the Water Conservation team at{" "}
              <a href="mailto:conservation@bendoregon.gov" className="text-green-700 underline">
                conservation@bendoregon.gov
              </a>{" "}
              or call 541-317-3000 ext. 2.
            </p>
          </section>

          {/* What Projects Qualify */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What Types of Projects Qualify?
            </h2>
            <p className="text-gray-700 mb-4">
              The WaterWise Communities program funds three main categories of improvement:
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="font-bold text-gray-900">Landscape Conversions</h3>
                <p className="text-gray-700">
                  Replacing water-intensive Kentucky bluegrass or fescue turf with drought-tolerant,
                  low-water plantings. This is typically the highest-impact project for water
                  savings — turf uses far more water per square foot than any other landscape
                  element. Conversions can include xeriscape designs, native plant installations,
                  decorative gravel and rock landscapes, or mixed perennial and shrub plantings.
                </p>
              </div>
              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="font-bold text-gray-900">System Efficiency Upgrades</h3>
                <p className="text-gray-700">
                  Upgrading outdated irrigation equipment to modern, water-efficient systems.
                  This includes replacing spray heads with rotary nozzles (which apply water more
                  slowly and reduce runoff), converting overhead irrigation to drip systems in
                  planting beds, installing smart weather-based controllers, adding pressure
                  regulators, and upgrading to high-efficiency rotors.
                </p>
              </div>
              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="font-bold text-gray-900">Water-Saving Upgrades</h3>
                <p className="text-gray-700">
                  Other improvements identified during the City's evaluation that reduce water
                  consumption. This can include centralized water management systems, soil moisture
                  sensors, flow meters, and other technology that improves irrigation efficiency
                  across a large property.
                </p>
              </div>
            </div>
          </section>

          {/* Mid-page CTA */}
          <div className="bg-[oklch(0.25_0.05_145)] text-white rounded-xl p-8 my-10">
            <h3 className="text-2xl font-bold mb-2">
              Ready to Start Your WaterWise Communities Project?
            </h3>
            <p className="text-gray-200 mb-6">
              Newport Avenue Landscaping handles the entire process — project planning, City
              evaluation attendance, installation, and rebate documentation. Serving Bend, Redmond,
              Sisters, Sunriver, and all of Deschutes County.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/contact"
                className="btn-red text-center px-6 py-3 rounded-lg font-bold"
              >
                GET MY FREE QUOTE
              </a>
              <a
                href="tel:5416178873"
                className="border border-white text-white px-6 py-3 rounded-lg font-bold text-center hover:bg-white hover:text-[oklch(0.25_0.05_145)] transition-colors"
              >
                (541) 617-8873
              </a>
            </div>
          </div>

          {/* Step by Step Process */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How the WaterWise Communities Process Works
            </h2>
            <p className="text-gray-700 mb-6">
              The City of Bend has structured the program to ensure projects are well-planned and
              properly executed. Here is the complete process from application to rebate check:
            </p>
            <ol className="space-y-4">
              {[
                {
                  step: "1. Determine Eligibility",
                  desc: "Confirm your property is served by City of Bend Water Services. Review the program terms and conditions on the City of Bend website.",
                },
                {
                  step: "2. Plan Your Project",
                  desc: "Define your water-saving goals. Newport Avenue can help you identify the highest-impact improvements and create a landscape plan with dimensions, proposed changes, and plant species.",
                },
                {
                  step: "3. Submit Application",
                  desc: "Complete the WaterWise Communities Program Application and submit to conservation@bendoregon.gov or mail to 21051 NE Talus Place, Bend OR 97701.",
                },
                {
                  step: "4. System Evaluation",
                  desc: "City staff will assess your site conditions, identify water-saving opportunities, and work with you to define the specific project scope.",
                },
                {
                  step: "5. Sign Service Agreement",
                  desc: "The service agreement serves as your approval to proceed. Do not begin construction before receiving this approval.",
                },
                {
                  step: "6. Pre-Construction Meeting",
                  desc: "Schedule a meeting with your contractor (Newport Avenue) and City staff. This can be combined with the system evaluation.",
                },
                {
                  step: "7. Complete the Project",
                  desc: "Complete all work within 90 days of receiving approval to proceed. All projects must be finished by October 31.",
                },
                {
                  step: "8. Follow-Up Evaluation",
                  desc: "City staff will verify all conditions are met, including diagnostic testing of the irrigation system and review of water consumption data.",
                },
                {
                  step: "9. Submit Documentation",
                  desc: "Provide receipts, invoices, and a W-9 (required for rebates over $600) to the City of Bend.",
                },
                {
                  step: "10. Receive Rebate",
                  desc: "Rebate check is issued within 60 days of final approval and receipt of all documentation.",
                },
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-bold text-gray-900">{item.step}</p>
                    <p className="text-gray-700">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* How Newport Ave Helps */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How Newport Avenue Landscaping Helps HOAs
            </h2>
            <p className="text-gray-700 mb-4">
              Newport Avenue Landscaping has been serving Bend-area HOAs and commercial properties
              for over 21 years. We understand that HOA boards need a contractor who is reliable,
              communicates clearly, and delivers projects on time and within budget. Our WaterWise
              Communities services include:
            </p>
            <ul className="space-y-2 text-gray-700">
              {[
                "Free consultation to identify the highest-impact water-saving improvements for your property",
                "Landscape design services to plan the conversion layout, plant selection, and irrigation design",
                "Attendance at the City of Bend pre-construction meeting as your contractor",
                "Complete installation of landscape conversions, drip systems, smart controllers, and rotary nozzle upgrades",
                "All project documentation (receipts, invoices, before/after photos) organized for your rebate application",
                "Ongoing maintenance programs to keep your landscape in compliance for the required 5-year period",
                "Spring irrigation activation and fall winterization to protect your system investment",
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-green-700 font-bold mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Related Services */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  label: "Xeriscape & Water-Wise Landscaping",
                  href: "/services/xeriscaping",
                  desc: "Full xeriscape design and installation for HOA common areas.",
                },
                {
                  label: "Irrigation Systems",
                  href: "/services/irrigation",
                  desc: "Smart controllers, drip conversion, and system efficiency upgrades.",
                },
                {
                  label: "Commercial Landscaping",
                  href: "/services/commercial",
                  desc: "Full-service commercial landscape maintenance and installation.",
                },
                {
                  label: "Landscape Design",
                  href: "/services/landscape-design",
                  desc: "Custom design plans for HOA common areas and commercial properties.",
                },
              ].map((link, i) => (
                <Link key={i} href={link.href}>
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-green-600 hover:shadow-md transition-all cursor-pointer">
                    <p className="font-bold text-green-700">{link.label} →</p>
                    <p className="text-sm text-gray-600 mt-1">{link.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-gray-200 pb-6">
                  <h3 className="font-bold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom CTA */}
          <div className="bg-gray-50 rounded-xl p-8 mt-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Newport Avenue Landscaping
            </h2>
            <p className="text-gray-600 mb-6">
              LCB #9153 · Serving Bend, Redmond, Sisters, Sunriver &amp; all of Deschutes County ·
              (541) 617-8873
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="btn-red px-8 py-3 rounded-lg font-bold"
              >
                SCHEDULE FREE CONSULTATION
              </a>
              <a
                href="tel:5416178873"
                className="border-2 border-gray-800 text-gray-800 px-8 py-3 rounded-lg font-bold hover:bg-gray-800 hover:text-white transition-colors"
              >
                (541) 617-8873
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* ── Pricing Disclaimer ── */}
      <section style={{ background: `linear-gradient(rgba(0,0,0,0.60), rgba(0,0,0,0.60)), url(https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/maintenance-hero-bg_3219f29e.jpeg) center/cover no-repeat`, padding: "1.25rem 0" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ color: "oklch(0.50 0.008 0)", fontSize: "0.70rem", lineHeight: 1.6, fontWeight: 300, margin: 0 }}>
            <strong style={{ color: "oklch(0.62 0.008 0)", fontWeight: 500 }}>Pricing Disclaimer:</strong> All prices shown are typical market ranges for general planning purposes only and do not constitute a binding quote or guarantee of cost. Actual costs depend on site conditions, property size, scope of work, and materials. Advertised flat rates are firm as stated. All other estimates require a free on-site assessment. <a href="/contact" style={{ color: "oklch(0.72 0.12 25)", textDecoration: "underline" }}>Contact us for a written estimate.</a>
          </p>
        </div>
      </section>
    </>
  );
}
