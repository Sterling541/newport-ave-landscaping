import { Helmet } from "react-helmet-async";
import { BreadcrumbSchema, FAQSchema } from "@/components/SchemaMarkup";
import { Link } from "wouter";

export default function BendTurfReplacementRebate() {
  const faqs = [
    { question: "What is the City of Bend Turf Replacement Rebate program?", answer: "The City of Bend Turf Replacement Rebate program offers financial incentives to City of Bend water customers who convert portions of their existing lawns to water-efficient landscapes. You can receive $3 per square foot, up to a maximum of $3,000, for replacing healthy turf with xeriscape or other water-wise landscaping." },
    { question: "Am I eligible for the turf replacement rebate?", answer: "To be eligible, you must be a City of Bend water customer. The area you plan to convert must have at least 75% healthy turf, and the conversion must include an entire irrigation zone. The 2026 season is open, but funds are limited and available on a first-come, first-served basis." },
    { question: "How much can I receive from the rebate program?", answer: "The rebate offers $3 per square foot of converted turf, with a maximum rebate of $3,000 per eligible project. This means you can convert up to 1,000 square feet of lawn to receive the full $3,000." },
    { question: "When does the 2026 turf replacement rebate season open and close?", answer: "The 2026 season for the City of Bend Turf Replacement Rebate opened on April 1st. Projects must be completed by October 15th. Due to limited funds, it is recommended to apply early." },
    { question: "How can Newport Avenue Landscaping help with my rebate project?", answer: "Newport Avenue Landscaping provides comprehensive services to simplify your turf replacement project. We offer expert consultation and design for xeriscapes, assistance with rebate qualification, professional installation of water-wise landscapes and drip irrigation, and support with documentation for your rebate application. We also offer ongoing maintenance services." },
    { question: "What are the City of Bend's general watering rules?", answer: "The City of Bend has year-round watering rules: odd-numbered houses water on odd days, even-numbered houses water on even days. Day 31 is open for all. Watering is only permitted between 5 PM and 9 AM. Watering is prohibited between 9 AM and 5 PM, with fines for violations. Temporary variances for new sod/seed are available by calling 541-317-3000 ext. 2." },
    { question: "What other water conservation programs does the City of Bend offer?", answer: "In addition to the Turf Replacement Rebate, the City of Bend offers the WaterWise Communities program, providing a 50% match up to $10,000 for HOAs and commercial properties, and Free Sprinkler Inspections to help optimize irrigation systems." }
  ];

  return (
    <>
      <Helmet>
        <title>City of Bend Turf Replacement Rebate: Get $3,000 for Lawn Conversion | Newport Avenue Landscaping</title>
        <meta name="description" content="Complete guide to the City of Bend's $3/sq ft turf replacement rebate (up to $3,000). 2026 season is OPEN. How to qualify, apply, and use Newport Ave to handle the entire project. Tie in xeriscape, drip irrigation, and landscape design services." />
        <link rel="canonical" href="https://newportavelandscaping.com/resources/bend-turf-replacement-rebate" />
      </Helmet>
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://newportavelandscaping.com" },
        { name: "Resources", url: "https://newportavelandscaping.com/resources" },
        { name: "City of Bend Turf Replacement Rebate", url: "https://newportavelandscaping.com/resources/bend-turf-replacement-rebate" },
      ]} />
      <FAQSchema faqs={faqs} />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <div className="bg-[oklch(0.25_0.05_145)] text-white py-16">
          <div className="max-w-4xl mx-auto px-4">
            <nav className="text-sm text-green-300 mb-4">
              <Link href="/">Home</Link> / <Link href="/resources">Resources</Link> / City of Bend Turf Replacement Rebate
            </nav>
            <h1 className="text-4xl font-bold mb-4">City of Bend Turf Replacement Rebate: How to Get $3,000 for Your Lawn Conversion</h1>
            <p className="text-xl text-gray-200">Unlock up to $3,000 to transform your thirsty lawn into a beautiful, water-wise landscape with the City of Bend's Turf Replacement Rebate program.</p>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Intro */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Transform Your Lawn, Save Water, and Get Paid!</h2>
            <p className="text-lg text-gray-700 mb-4">Are you a City of Bend water customer looking to reduce your outdoor water use, enhance your home's curb appeal, and save money in the process? The City of Bend's Turf Replacement Rebate program offers an incredible opportunity to do just that. By converting a portion of your existing lawn to a water-efficient landscape, you can receive up to $3,000 in rebates, making sustainable landscaping more accessible than ever.</p>
            <p className="text-lg text-gray-700 mb-4">Newport Avenue Landscaping is here to guide you through every step of the process, from initial design to final installation and rebate application. We specialize in creating stunning xeriscape designs, installing efficient drip irrigation systems, and ensuring your project meets all City of Bend requirements to maximize your rebate.</p>
          </section>

          {/* Key facts / rules */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Understanding the City of Bend Turf Replacement Rebate</h2>
            <p className="text-lg text-gray-700 mb-4">The City of Bend is committed to conserving water, with a goal to reduce water use by 7.9 billion gallons by 2040. Programs like the Turf Replacement Rebate are crucial to achieving this. Here's what you need to know about the program:</p>
            <ul className="list-disc list-inside text-lg text-gray-700 mb-4">
              <li><strong>Rebate Amount:</strong> $3 per square foot of converted turf.</li>
              <li><strong>Maximum Rebate:</strong> Up to $3,000 per eligible project.</li>
              <li><strong>2026 Season:</strong> The program is currently OPEN, having started on April 1st. Funds are limited and available on a first-come, first-served basis, so early application is encouraged.</li>
              <li><strong>Eligibility:</strong> You must be a City of Bend water customer.</li>
              <li><strong>Project Scope:</strong> The conversion must include an entire irrigation zone.</li>
              <li><strong>Existing Turf Condition:</strong> At least 75% healthy turf is required in the area to be converted.</li>
              <li><strong>Completion Deadline:</strong> Projects must be completed by October 15th.</li>
            </ul>
            <p className="text-lg text-gray-700">For official application and detailed guidelines, contact conservation@bendoregon.gov or visit the City of Bend offices at 21051 NE Talus Place, Bend OR 97701.</p>
          </section>

          {/* Mid-page CTA callout */}
          <div className="bg-[oklch(0.25_0.05_145)] text-white rounded-xl p-8 my-10">
            <h3 className="text-2xl font-bold mb-2">Ready to Get Started?</h3>
            <p className="text-gray-200 mb-6">Newport Avenue Landscaping handles the entire project — design, installation, and rebate documentation. Serving Bend, Redmond, Sisters, and all of Deschutes County.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/contact" className="btn-red text-center px-6 py-3 rounded-lg font-bold">GET MY FREE QUOTE</a>
              <a href="tel:5416178873" className="border border-white text-white px-6 py-3 rounded-lg font-bold text-center hover:bg-white hover:text-[oklch(0.25_0.05_145)] transition-colors">(541) 617-8873</a>
            </div>
          </div>

          {/* More sections */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Beyond the Rebate: The Benefits of Water-Wise Landscaping</h2>
            <p className="text-lg text-gray-700 mb-4">Converting your turf isn't just about the rebate; it's an investment in a more sustainable, beautiful, and low-maintenance landscape. Water-wise landscaping, often referred to as xeriscaping, utilizes drought-tolerant plants, efficient irrigation methods, and thoughtful design to create vibrant outdoor spaces that thrive in Bend's climate.</p>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Xeriscape and Turf Conversion</h3>
            <p className="text-lg text-gray-700 mb-4">Xeriscaping is a landscaping method that reduces or eliminates the need for supplemental water from irrigation. By choosing native and drought-tolerant plants, you can significantly cut down on water consumption while still enjoying a lush and attractive yard. Our <Link href="/services/xeriscape" className="text-blue-600 hover:underline">xeriscape services</Link> focus on creating designs that are both aesthetically pleasing and environmentally responsible, helping you qualify for the rebate and enjoy long-term water savings.</p>

            <h3 className="text-2xl font-bold text-gray-900 mb-3">Smart Irrigation and Drip Systems</h3>
            <p className="text-lg text-gray-700 mb-4">Efficient irrigation is key to any water-wise landscape. Drip irrigation systems deliver water directly to the plant roots, minimizing evaporation and runoff. Smart irrigation controllers adjust watering schedules based on weather conditions, ensuring your plants receive exactly the right amount of water. Newport Avenue Landscaping specializes in <Link href="/services/irrigation" className="text-blue-600 hover:underline">smart irrigation and drip installation</Link>, optimizing your water use and further reducing your utility bills.</p>

            <h3 className="text-2xl font-bold text-gray-900 mb-3">Landscape Design for Sustainability</h3>
            <p className="text-lg text-gray-700 mb-4">A well-executed landscape design is the foundation of a successful turf conversion. Our <Link href="/services/landscape-design" className="text-blue-600 hover:underline">landscape design experts</Link> work with you to create a plan that integrates beautiful, low-water plants, functional outdoor living spaces, and efficient irrigation. We consider factors like sun exposure, soil type, and your aesthetic preferences to craft a landscape that is both stunning and sustainable.</p>
          </section>

          {/* How Newport Ave helps */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Newport Avenue Landscaping Simplifies Your Rebate Project</h2>
            <p className="text-lg text-gray-700 mb-4">Navigating rebate programs and undertaking a significant landscape transformation can seem daunting. That's where Newport Avenue Landscaping comes in. We offer comprehensive services to make your turf replacement project seamless and stress-free:</p>
            <ul className="list-disc list-inside text-lg text-gray-700 mb-4">
              <li><strong>Expert Consultation & Design:</strong> We'll assess your property, discuss your vision, and create a custom xeriscape design that maximizes water efficiency and aesthetic appeal.</li>
              <li><strong>Rebate Qualification Assistance:</strong> We understand the City of Bend's requirements and will help ensure your project meets all criteria for the $3/sq ft rebate.</li>
              <li><strong>Professional Installation:</strong> Our experienced team handles all aspects of the conversion, from turf removal to plant installation and drip irrigation setup.</li>
              <li><strong>Documentation Support:</strong> We assist with gathering the necessary documentation for your rebate application, making the process straightforward.</li>
              <li><strong>Ongoing Maintenance & Support:</strong> Beyond installation, we offer <Link href="/services/maintenance" className="text-blue-600 hover:underline">maintenance services</Link>, including spring activation and irrigation audits, to keep your new landscape thriving.</li>
            </ul>
            <p className="text-lg text-gray-700">Let us help you turn your lawn into a beautiful, water-saving oasis while securing your City of Bend rebate.</p>
          </section>

          {/* Additional Water-Wise Programs */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Other City of Bend Water-Wise Initiatives</h2>
            <p className="text-lg text-gray-700 mb-4">The City of Bend offers several other programs to encourage water conservation:</p>
            <ul className="list-disc list-inside text-lg text-gray-700 mb-4">
              <li><strong>WaterWise Communities:</strong> This program offers a 50% match up to $10,000 for HOAs and commercial properties, including landscape and irrigation evaluations and project support.</li>
              <li><strong>Free Sprinkler Inspections:</strong> City of Bend staff provide free visual inspections, schedule reviews, system tests, and improved schedule recommendations to optimize your irrigation system.</li>
            </ul>
            <p className="text-lg text-gray-700">These initiatives, combined with the turf replacement rebate, demonstrate Bend's commitment to a sustainable water future. Remember the City of Bend watering rules: odd/even days, 5pm–9am only, year-round. Even house numbers water on even days, odd on odd days. Day 31 is open for all. Watering is prohibited 9am–5pm, with fines for violations. Temporary variances are available for new sod/seed by calling 541-317-3000 ext. 2.</p>
          </section>

          {/* FAQ */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions About the Bend Turf Replacement Rebate</h2>
            {/* FAQs will be dynamically rendered from the 'faqs' array */}
          </section>

          {/* Bottom CTA */}
          <div className="bg-gray-50 rounded-xl p-8 mt-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Newport Avenue Landscaping</h2>
            <p className="text-gray-600 mb-6">LCB #9153 · Serving Bend, Redmond, Sisters, Sunriver & all of Deschutes County · (541) 617-8873</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-red px-8 py-3 rounded-lg font-bold">SCHEDULE FREE CONSULTATION</a>
              <a href="tel:5416178873" className="border-2 border-gray-800 text-gray-800 px-8 py-3 rounded-lg font-bold hover:bg-gray-800 hover:text-white transition-colors">(541) 617-8873</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}