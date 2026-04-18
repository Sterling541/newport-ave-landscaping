import { Helmet } from "react-helmet-async";
import { BreadcrumbSchema, FAQSchema } from "@/components/SchemaMarkup";
import { Link } from "wouter";

export default function BendWateringRestrictions() {
  const faqs = [
    { question: "What are the City of Bend's watering restrictions?", answer: "The City of Bend enforces an odd/even watering schedule year-round. Even-numbered addresses water on even days, and odd-numbered addresses water on odd days. Watering is only permitted between 5 PM and 9 AM. Day 31 of any month is open for all addresses to water." },
    { question: "What are the allowed watering hours in Bend?", answer: "Watering is strictly prohibited between 9 AM and 5 PM every day, year-round. This is to minimize water loss due to evaporation during the hottest parts of the day." },
    { question: "Are there fines for violating Bend's watering rules?", answer: "Yes, the City of Bend issues fines for violations of its watering restrictions. These fines are designed to encourage compliance and support the city's water conservation goals." },
    { question: "Can I get a temporary variance for new sod or seed?", answer: "Yes, temporary variances are available for new sod or seed. You can apply for a variance by calling the City of Bend at 541-317-3000 ext. 2." },
    { question: "What is the City of Bend's Turf Replacement Rebate program?", answer: "The City of Bend offers a Turf Replacement Rebate of $3 per square foot, up to a maximum of $3,000. The 2026 season opened on April 1st. To qualify, you must be a City of Bend water customer, the project must include an entire irrigation zone, and at least 75% healthy turf is required. The project must be completed by October 15th. Applications can be sent to conservation@bendoregon.gov or mailed to 21051 NE Talus Place, Bend OR 97701. Funds are limited and awarded on a first-come, first-served basis." },
    { question: "What are WaterWise Communities?", answer: "WaterWise Communities is a program offering a 50% match up to $10,000 for HOAs and commercial properties. This program includes landscape evaluations, irrigation evaluations, and project support to help these communities conserve water. Participants must be City of Bend water customers." },
    { question: "Does the City of Bend offer free sprinkler inspections?", answer: "Yes, the City of Bend provides free sprinkler inspections. Trained staff conduct visual inspections, review watering schedules, perform system tests, and recommend improved watering schedules to help residents optimize their irrigation systems." },
    { question: "How does Newport Avenue Landscaping help with Bend's watering restrictions?", answer: "Newport Avenue Landscaping offers a range of services that align with Bend's watering restrictions and conservation efforts. These include xeriscape and turf conversion (which can help qualify for rebates), smart irrigation and drip system installations, spring activation with an audit, irrigation repair, and landscape design focused on water efficiency." }
  ];

  return (
    <>
      <Helmet>
        <title>Bend Oregon Watering Restrictions: The Complete Guide | Newport Avenue Landscaping</title>
        <meta name="description" content="Complete guide to City of Bend's odd/even watering schedule, irrigation hours (5pm–9am), violation fines, and how to avoid them. Tie in Newport Ave irrigation repair, spring activation, and smart controller services." />
        <link rel="canonical" href="https://newportavelandscaping.com/resources/bend-oregon-watering-restrictions" />
      </Helmet>
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://newportavelandscaping.com" },
        { name: "Resources", url: "https://newportavelandscaping.com/resources" },
        { name: "Bend Oregon Watering Restrictions", url: "https://newportavelandscaping.com/resources/bend-oregon-watering-restrictions" },
      ]} />
      <FAQSchema faqs={faqs} />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <div className="bg-[oklch(0.25_0.05_145)] text-white py-16">
          <div className="max-w-4xl mx-auto px-4">
            <nav className="text-sm text-green-300 mb-4">
              <Link href="/">Home</Link> / <Link href="/resources">Resources</Link> / Bend Oregon Watering Restrictions
            </nav>
            <h1 className="text-4xl font-bold mb-4">Bend Oregon Watering Restrictions: The Complete Guide</h1>
            <p className="text-xl text-gray-200">Navigate Bend's odd/even watering schedule, irrigation hours, and how Newport Avenue Landscaping can help you comply and conserve.</p>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <p className="mb-6">Bend, Oregon, is renowned for its natural beauty and commitment to sustainability. A crucial part of maintaining our high desert ecosystem and ensuring a sustainable water supply for future generations is adhering to the City of Bend's watering restrictions. These rules are designed to promote efficient water use, especially for outdoor irrigation, which accounts for a significant portion of residential water consumption. Understanding and following these guidelines not only helps conserve a vital resource but also allows residents to avoid potential fines.</p>

          <h2 className="text-3xl font-bold mb-4">Understanding Bend's Year-Round Watering Schedule</h2>
          <p className="mb-6">The City of Bend implements a year-round odd/even watering schedule, a straightforward system designed to distribute water demand and reduce strain on the municipal water supply. This schedule applies to all outdoor irrigation, including lawns, gardens, and landscaping. All information regarding watering restrictions and rebates is sourced from the City of Bend's official website.</p>

          <h3 className="text-2xl font-bold mb-3">Odd/Even Day Watering</h3>
          <ul className="list-disc list-inside mb-6 ml-4">
            <li><strong>Even-numbered addresses:</strong> Water on even-numbered calendar days (e.g., April 2, April 4, April 6).</li>
            <li><strong>Odd-numbered addresses:</strong> Water on odd-numbered calendar days (e.g., April 1, April 3, April 5).</li>
            <li><strong>Day 31:</strong> On months with 31 days, the 31st is an open watering day for all addresses.</li>
          </ul>

          <h3 className="text-2xl font-bold mb-3">Permitted Watering Hours</h3>
          <p className="mb-6">To maximize water absorption and minimize evaporation, the City of Bend restricts watering to specific hours:</p>
          <ul className="list-disc list-inside mb-6 ml-4">
            <li><strong>Allowed:</strong> 5:00 PM to 9:00 AM (the following morning).</li>
            <li><strong>Prohibited:</strong> 9:00 AM to 5:00 PM.</li>
          </ul>
          <p className="mb-6">Adhering to these hours is critical, as watering during the hottest part of the day leads to significant water loss through evaporation, making your irrigation less effective and wasting precious resources.</p>

          <h2 className="text-3xl font-bold mb-4">Violations and How to Avoid Fines</h2>
          <p className="mb-6">The City of Bend takes its watering restrictions seriously, and violations can result in fines. These penalties are in place to ensure compliance and support the city's overarching water conservation goals. The best way to avoid fines is to simply follow the odd/even schedule and permitted watering hours.</p>

          <h3 className="text-2xl font-bold mb-3">Temporary Variances</h3>
          <p className="mb-6">For residents installing new sod or seed, a temporary variance may be available to allow for more frequent watering during the establishment period. To inquire about or apply for a temporary variance, contact the City of Bend at <a href="tel:5413173000" className="text-blue-600 hover:underline">541-317-3000 ext. 2</a>.</p>

          <div className="bg-[oklch(0.25_0.05_145)] text-white rounded-xl p-8 my-10">
            <h3 className="text-2xl font-bold mb-2">Ready to Get Started?</h3>
            <p className="text-gray-200 mb-6">Newport Avenue Landscaping handles the entire project — design, installation, and rebate documentation. Serving Bend, Redmond, Sisters, and all of Deschutes County.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/contact" className="btn-red text-center px-6 py-3 rounded-lg font-bold">GET MY FREE QUOTE</a>
              <a href="tel:5416178873" className="border border-white text-white px-6 py-3 rounded-lg font-bold text-center hover:bg-white hover:text-[oklch(0.25_0.05_145)] transition-colors">(541) 617-8873</a>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-4">Newport Avenue Landscaping: Your Partner in Water Conservation</h2>
          <p className="mb-6">At Newport Avenue Landscaping, we are committed to helping Bend residents and businesses create beautiful, sustainable landscapes that thrive within the city's watering guidelines. Our services are designed to not only ensure compliance but also to significantly reduce your outdoor water consumption, saving you money and contributing to a healthier environment.</p>

          <h3 className="text-2xl font-bold mb-3">How We Help You Conserve Water:</h3>
          <ul className="list-disc list-inside mb-6 ml-4">
            <li><strong>Xeriscape & Turf Conversion:</strong> We specialize in transforming water-intensive lawns into stunning, low-water landscapes. This not only drastically cuts down on your water use but can also help you qualify for the City of Bend's Turf Replacement Rebate program. Learn more about our <Link href="/services/xeriscaping" className="text-blue-600 hover:underline">xeriscape services</Link>.</li>
            <li><strong>Smart Irrigation & Drip Systems:</strong> Upgrade to modern irrigation technology with smart controllers that adjust watering based on weather, soil conditions, and plant needs. Drip irrigation delivers water directly to plant roots, minimizing waste. Explore our <Link href="/services/irrigation" className="text-blue-600 hover:underline">irrigation solutions</Link>.</li>
            <li><strong>Spring Activation & Audits:</strong> As spring arrives, ensure your irrigation system is running efficiently. Our spring activation service includes a thorough audit to identify leaks, inefficiencies, and areas for improvement, helping you start the season water-wise.</li>
            <li><strong>Irrigation Repair:</strong> A leaky or malfunctioning irrigation system can waste thousands of gallons of water. Our expert team provides prompt and effective <Link href="/services/irrigation" className="text-blue-600 hover:underline">irrigation repair services</Link> to keep your system operating at peak efficiency.</li>
            <li><strong>Landscape Design for Water Efficiency:</strong> Our <Link href="/services/landscape-design" className="text-blue-600 hover:underline">landscape design services</Link> prioritize native and drought-tolerant plants, strategic plant placement, and efficient irrigation to create beautiful, sustainable outdoor spaces that require less water.</li>
            <li><strong>Ongoing Maintenance:</strong> A water-wise landscape requires proper care to stay efficient and beautiful. Our <Link href="/maintenance" className="text-blue-600 hover:underline">maintenance services</Link> include regular irrigation check-ups, pruning, and other tasks to ensure your landscape thrives while conserving water.</li>
          </ul>

          <h2 className="text-3xl font-bold mb-4">City of Bend Water Conservation Programs & Rebates</h2>
          <p className="mb-6">Beyond the watering restrictions, the City of Bend offers several programs and incentives to encourage water conservation among its residents and businesses. These initiatives are part of the city's ambitious goal to reduce water use by 7.9 billion gallons by 2040, a target that can be met if individuals save just 17 gallons per day.</p>

          <h3 className="text-2xl font-bold mb-3">Turf Replacement Rebate Program</h3>
          <p className="mb-6">The City of Bend's Turf Replacement Rebate program provides a significant incentive for homeowners to convert water-guzzling lawns into more water-efficient landscapes. As of April 1st, the 2026 season is open for applications.</p>
          <ul className="list-disc list-inside mb-6 ml-4">
            <li><strong>Rebate Amount:</strong> $3 per square foot, up to a maximum of $3,000.</li>
            <li><strong>Eligibility:</strong> Must be a City of Bend water customer.</li>
            <li><strong>Project Scope:</strong> Must include the entire irrigation zone being converted.</li>
            <li><strong>Turf Health:</strong> Requires 75% or more healthy turf prior to conversion.</li>
            <li><strong>Completion Deadline:</strong> Projects must be completed by October 15th.</li>
            <li><strong>Application:</strong> Submit applications to <a href="mailto:conservation@bendoregon.gov" className="text-blue-600 hover:underline">conservation@bendoregon.gov</a> or mail to 21051 NE Talus Place, Bend OR 97701.</li>
            <li><strong>Important Note:</strong> Funds are limited and awarded on a first-come, first-served basis, so early application is encouraged.</li>
          </ul>

          <h3 className="text-2xl font-bold mb-3">WaterWise Communities Program</h3>
          <p className="mb-6">This program supports larger-scale water conservation efforts for Homeowners Associations (HOAs) and commercial properties.</p>
          <ul className="list-disc list-inside mb-6 ml-4">
            <li><strong>Rebate Amount:</strong> 50% match up to $10,000.</li>
            <li><strong>Services Included:</strong> Landscape evaluation, irrigation evaluation, and project support.</li>
            <li><strong>Eligibility:</strong> Must be a City of Bend water customer.</li>
          </ul>

          <h3 className="text-2xl font-bold mb-3">Free Sprinkler Inspections</h3>
          <p className="mb-6">To help residents optimize their irrigation systems, the City of Bend offers free sprinkler inspections. Trained staff will:</p>
          <ul className="list-disc list-inside mb-6 ml-4">
            <li>Conduct a visual inspection of your system.</li>
            <li>Review your current watering schedule.</li>
            <li>Perform a system test to identify inefficiencies.</li>
            <li>Provide recommendations for an improved watering schedule.</li>
          </ul>
          <p className="mb-6">This valuable service can help you identify and fix issues that lead to water waste, ensuring your landscape gets the water it needs without over-irrigating.</p>

          <h2 className="text-3xl font-bold mb-4">The Bigger Picture: Bend's Water Conservation Goals</h2>
          <p className="mb-6">The City of Bend's watering restrictions are not just about rules and regulations; they are a critical component of a larger strategy to ensure a sustainable water future for our community. The city has set an ambitious goal to reduce water use by 7.9 billion gallons by the year 2040. This long-term vision is essential for preserving the health of the Deschutes River, protecting our local aquifer, and ensuring that Bend remains a vibrant and livable city for generations to come.</p>
          <p className="mb-6">Achieving this goal requires a collective effort from all residents and businesses. The city estimates that if each individual saves just 17 gallons of water per day, we can meet this target. This highlights the significant impact that small, everyday changes in our water use habits can have on the overall health of our water system. By embracing water-wise practices in our homes and landscapes, we are not just complying with regulations; we are actively participating in the stewardship of our most precious natural resource.</p>

          <h2 className="text-3xl font-bold mb-4">Common Watering Mistakes to Avoid</h2>
          <p className="mb-6">Even with the best intentions, it's easy to make common watering mistakes that can lead to wasted water and an unhealthy landscape. Here are a few pitfalls to avoid:</p>
          <ul className="list-disc list-inside mb-6 ml-4">
            <li><strong>Watering too frequently for short periods:</strong> This encourages shallow root growth, making your lawn and plants more susceptible to drought and disease. It's better to water deeply and less often.</li>
            <li><strong>Watering the pavement:</strong> Misaligned sprinkler heads that water sidewalks, driveways, and patios are a major source of water waste. Regularly check your sprinklers to ensure they are only watering your landscape.</li>
            <li><strong>Ignoring the weather:</strong> Watering on a fixed schedule without accounting for rainfall or cooler temperatures can lead to overwatering. A smart irrigation controller can automatically adjust your watering schedule based on local weather conditions.</li>
            <li><strong>Not knowing your soil type:</strong> Different soil types absorb water at different rates. Clay soils, for example, absorb water slowly, while sandy soils absorb it quickly. Understanding your soil type can help you determine the best watering schedule for your landscape.</li>
          </ul>

          <h2 className="text-3xl font-bold mb-4">FAQs About Bend's Watering Restrictions</h2>
          {/* FAQ */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="group border-b border-gray-200 pb-4">
                <summary className="flex justify-between items-center cursor-pointer text-lg font-semibold text-gray-800 hover:text-[oklch(0.25_0.05_145)]">
                  {faq.question}
                  <span className="ml-2 transform transition-transform duration-200 group-open:rotate-180">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </span>
                </summary>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-3">References</h3>
            <p className="text-gray-600">All information regarding watering restrictions, rebates, and conservation programs is sourced from the official City of Bend website. For more details, please visit: <a href="https://www.bendoregon.gov/government/departments/utility/water/water-conservation" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">City of Bend Water Conservation</a>.</p>
          </div>

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
      {/* ── Pricing Disclaimer ── */}
      <section style={{ background: `linear-gradient(rgba(0,0,0,0.60), rgba(0,0,0,0.60)), url(https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/landscaping-native_fa3d1cfe.jpg) center/cover no-repeat`, padding: "1.25rem 0" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ color: "oklch(0.50 0.008 0)", fontSize: "0.70rem", lineHeight: 1.6, fontWeight: 300, margin: 0 }}>
            <strong style={{ color: "oklch(0.62 0.008 0)", fontWeight: 500 }}>Pricing Disclaimer:</strong> All prices shown are typical market ranges for general planning purposes only and do not constitute a binding quote or guarantee of cost. Actual costs depend on site conditions, property size, scope of work, and materials. Advertised flat rates are firm as stated. All other estimates require a free on-site assessment. <a href="/contact" style={{ color: "oklch(0.72 0.12 25)", textDecoration: "underline" }}>Contact us for a written estimate.</a>
          </p>
        </div>
      </section>
    </>
  );
}