import { Helmet } from "react-helmet-async";
import { BreadcrumbSchema, FAQSchema } from "@/components/SchemaMarkup";
import { Link } from "wouter";

export default function WaterWiseLandscapingBend() {
  const faqs = [
    {
      question: "What is water-wise landscaping?",
      answer: "Water-wise landscaping, often referred to as xeriscaping, is a method of designing and maintaining landscapes that minimizes the need for supplemental irrigation. It focuses on selecting drought-tolerant plants, improving soil health, efficient irrigation techniques like drip systems, and thoughtful design to create beautiful and sustainable outdoor spaces, especially crucial in arid and semi-arid regions like Bend, Oregon."
    },
    {
      question: "Why is water conservation important in Bend, Oregon?",
      answer: "Bend, Oregon, is situated in a high desert climate, receiving only about 14 inches of annual rainfall. Water conservation is vital to preserve this precious resource, protect local ecosystems, and ensure a sustainable water supply for the community's growing population. By adopting water-wise practices, residents can significantly reduce their water consumption, which also translates to lower utility bills."
    },
    {
      question: "What are the City of Bend's watering rules?",
      answer: "The City of Bend enforces year-round watering rules to promote conservation. These rules stipulate watering on odd/even days, between 5 AM and 9 AM only. Even-numbered house addresses water on even calendar days, and odd-numbered addresses water on odd calendar days. The 31st day of any month is open for all. Watering is strictly prohibited between 9 AM and 5 PM. Violations can result in fines. Temporary variances for new sod or seed are available by calling 541-317-3000 ext. 2. [1]"
    },
    {
      question: "How can I get a rebate for converting my lawn to a water-wise landscape?",
      answer: "The City of Bend offers a Turf Replacement Rebate program, providing $3 per square foot, up to a maximum of $3,000. To qualify, you must be a City of Bend water customer, the project must include an entire irrigation zone, and the area being converted must have 75% or more healthy turf. The 2026 season opened on April 1st, and projects must be completed by October 15th. Funds are limited and available on a first-come, first-served basis. Applications can be submitted to conservation@bendoregon.gov or 21051 NE Talus Place, Bend OR 97701. [2]"
    },
    {
      question: "What are WaterWise Communities and how can my HOA or commercial property benefit?",
      answer: "WaterWise Communities is a program offered by the City of Bend that provides a 50% match, up to $10,000, for Homeowners Associations (HOAs) and commercial properties. This program includes a comprehensive landscape evaluation, irrigation evaluation, and project support to help these larger properties implement water-saving measures. Participants must be City of Bend water customers to qualify. [3]"
    },
    {
      question: "Does Newport Avenue Landscaping help with water-wise landscape design and installation?",
      answer: "Absolutely! Newport Avenue Landscaping specializes in water-wise solutions, including xeriscape design, turf conversion, and the installation of smart irrigation and drip systems. We can help you navigate the City of Bend's rebate programs, design a beautiful and efficient landscape, and handle the entire installation process, ensuring your outdoor space is both stunning and sustainable."
    },
    {
      question: "What is xeriscaping and how does it differ from traditional landscaping?",
      answer: "Xeriscaping is a specific approach to water-wise landscaping that emphasizes seven key principles: planning and design, soil improvement, appropriate plant selection, efficient irrigation, mulching, limited turf areas, and appropriate maintenance. Unlike traditional landscaping, which often relies on water-intensive lawns and plants, xeriscaping focuses on native and drought-tolerant species, minimizing the need for supplemental watering and creating a more resilient landscape."
    },
    {
      question: "Can I still have a beautiful garden with water-wise landscaping?",
      answer: "Yes, absolutely! Water-wise landscaping does not mean sacrificing beauty. With careful plant selection, thoughtful design, and the incorporation of various textures, colors, and hardscaping elements, you can create a vibrant, attractive, and thriving garden that requires significantly less water. Many native and drought-tolerant plants offer stunning blooms and foliage, providing year-round interest."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Water-Wise Landscaping in Bend Oregon: Save Water, Save Money, Save Your Lawn | Newport Avenue Landscaping</title>
        <meta name="description" content="Discover water-wise landscaping in Bend Oregon. Learn what it is, why it matters in Bend's high desert climate (14 inches annual rainfall), and how to design a beautiful low-water landscape. Explore xeriscape, drip irrigation, and smart controller services from Newport Avenue Landscaping." />
        <link rel="canonical" href="https://newportavelandscaping.com/resources/water-wise-landscaping-bend-oregon" />
      </Helmet>
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://newportavelandscaping.com" },
        { name: "Resources", url: "https://newportavelandscaping.com/resources" },
        { name: "Water-Wise Landscaping in Bend Oregon", url: "https://newportavelandscaping.com/resources/water-wise-landscaping-bend-oregon" },
      ]} />
      <FAQSchema faqs={faqs} />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <div className="bg-[oklch(0.25_0.05_145)] text-white py-16">
          <div className="max-w-4xl mx-auto px-4">
            <nav className="text-sm text-green-300 mb-4">
              <Link href="/">Home</Link> / <Link href="/resources">Resources</Link> / Water-Wise Landscaping in Bend Oregon
            </nav>
            <h1 className="text-4xl font-bold mb-4">Water-Wise Landscaping in Bend Oregon: Save Water, Save Money, Save Your Lawn</h1>
            <p className="text-xl text-gray-200">Transform your outdoor space into a beautiful, sustainable, and water-efficient oasis with expert guidance from Newport Avenue Landscaping.</p>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Intro */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Embrace Sustainable Beauty in Bend's High Desert</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Bend, Oregon, is renowned for its stunning natural beauty, vibrant outdoor lifestyle, and unique high desert climate. While the sunshine and dry air are part of its charm, they also present a significant challenge for traditional landscaping. With an average of just 14 inches of annual rainfall, maintaining lush, water-intensive lawns and gardens can be both costly and environmentally unsustainable. This is where <strong className="text-[oklch(0.25_0.05_145)]">water-wise landscaping</strong>, often called xeriscaping, becomes not just an option, but a smart and responsible choice for homeowners and businesses alike.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              At Newport Avenue Landscaping, we believe that a beautiful landscape doesn't have to come at the expense of water conservation. Our expertise in water-wise design and installation helps you create an outdoor space that thrives in Bend's unique environment, reduces your water bills, and contributes to the community's sustainability goals. From drought-tolerant plant palettes to efficient irrigation systems, we guide you through every step of transforming your yard into a water-efficient masterpiece.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The City of Bend has set an ambitious goal to reduce water use by 7.9 billion gallons by 2040. If every individual saves just 17 gallons per day, this goal can be met [4]. Your commitment to water-wise landscaping is a direct contribution to this vital community effort, ensuring a healthy and vibrant Bend for generations to come.
            </p>
          </section>

          {/* What is Water-Wise Landscaping? */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Exactly is Water-Wise Landscaping (Xeriscaping)?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Water-wise landscaping is a comprehensive approach to creating and maintaining a landscape that minimizes the need for supplemental water from irrigation. It's far more than just planting cacti; it's about intelligent design and plant selection tailored to your local climate. The term "xeriscape" (from the Greek "xeros" meaning dry) perfectly encapsulates this philosophy, focusing on seven core principles:
            </p>
            <ol className="list-decimal list-inside text-gray-700 leading-relaxed mb-4 pl-4">
              <li><strong className="text-[oklch(0.25_0.05_145)]">Planning and Design:</strong> Creating a functional and aesthetically pleasing layout that zones plants by water needs.</li>
              <li><strong className="text-[oklch(0.25_0.05_145)]">Soil Improvement:</strong> Enhancing soil with organic matter to improve water retention and drainage.</li>
              <li><strong className="text-[oklch(0.25_0.05_145)]">Appropriate Plant Selection:</strong> Choosing native and drought-tolerant plants that thrive in Bend's climate.</li>
              <li><strong className="text-[oklch(0.25_0.05_145)]">Efficient Irrigation:</strong> Utilizing drip irrigation and smart controllers to deliver water precisely where and when it's needed.</li>
              <li><strong className="text-[oklch(0.25_0.05_145)]">Mulching:</strong> Applying organic or inorganic mulches to reduce evaporation and suppress weeds.</li>
              <li><strong className="text-[oklch(0.25_0.05_145)]">Limited Turf Areas:</strong> Reducing the size of high-water-use lawns and replacing them with more efficient alternatives.</li>
              <li><strong className="text-[oklch(0.25_0.05_145)]">Appropriate Maintenance:</strong> Practicing smart watering, weeding, and pruning techniques.
              </li>
            </ol>
            <p className="text-gray-700 leading-relaxed">
              By integrating these principles, Newport Avenue Landscaping helps you achieve a vibrant landscape that requires minimal water, less maintenance, and looks beautiful year-round.
            </p>
          </section>

          {/* Key facts / rules */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Navigating Bend's Watering Rules and Rebates</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Understanding and adhering to the City of Bend's watering regulations is crucial for every homeowner. These rules are designed to ensure equitable water use and promote conservation across the community.
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">City of Bend Watering Rules [1]</h3>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 pl-4">
              <li><strong className="text-[oklch(0.25_0.05_145)]">Odd/Even Days:</strong> Even-numbered house addresses water on even calendar days; odd-numbered addresses water on odd calendar days.</li>
              <li><strong className="text-[oklch(0.25_0.05_145)]">Day 31:</strong> The 31st day of any month is open for all addresses to water.</li>
              <li><strong className="text-[oklch(0.25_0.05_145)]">Time Restrictions:</strong> Watering is permitted only between 5 AM and 9 AM.</li>
              <li><strong className="text-[oklch(0.25_0.05_145)]">Prohibited Times:</strong> Watering is strictly prohibited between 9 AM and 5 PM.</li>
              <li><strong className="text-[oklch(0.25_0.05_145)]">Fines:</strong> Violations of these rules can result in fines.</li>
              <li><strong className="text-[oklch(0.25_0.05_145)]">Temporary Variances:</strong> For new sod or seed, temporary variances are available by calling 541-317-3000 ext. 2.</li>
            </ul>

            <p className="text-gray-700 leading-relaxed mb-4">
              Beyond compliance, the City of Bend also incentivizes water conservation through valuable rebate programs, making the transition to a water-wise landscape more affordable.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-3">Turf Replacement Rebate Program [2]</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Ready to say goodbye to your thirsty lawn? The City of Bend's Turf Replacement Rebate offers significant financial assistance:
            </p>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 pl-4">
              <li><strong className="text-[oklch(0.25_0.05_145)]">Rebate Amount:</strong> $3 per square foot, up to a maximum of $3,000.</li>
              <li><strong className="text-[oklch(0.25_0.05_145)]">Eligibility:</strong> Must be a City of Bend water customer.</li>
              <li><strong className="text-[oklch(0.25_0.05_145)]">Project Scope:</strong> Must include the entire irrigation zone being converted.</li>
              <li><strong className="text-[oklch(0.25_0.05_145)]">Turf Condition:</strong> Requires 75% or more healthy turf in the area to be replaced.</li>
              <li><strong className="text-[oklch(0.25_0.05_145)]">2026 Season:</strong> Opened April 1st.</li>
              <li><strong className="text-[oklch(0.25_0.05_145)]">Completion Deadline:</strong> Projects must be completed by October 15th.</li>
              <li><strong className="text-[oklch(0.25_0.05_145)]">Application:</strong> Email conservation@bendoregon.gov or mail to 21051 NE Talus Place, Bend OR 97701.</li>
              <li><strong className="text-[oklch(0.25_0.05_145)]">Important:</strong> Funds are limited and allocated on a first-come, first-served basis.
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mb-3">WaterWise Communities Program [3]</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              For larger properties, HOAs, and commercial entities, the WaterWise Communities program provides substantial support:
            </p>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 pl-4">
              <li><strong className="text-[oklch(0.25_0.05_145)]">Matching Funds:</strong> 50% match, up to $10,000.</li>
              <li><strong className="text-[oklch(0.25_0.05_145)]">Services Included:</strong> Landscape evaluation, irrigation evaluation, and project support.</li>
              <li><strong className="text-[oklch(0.25_0.05_145)]">Eligibility:</strong> Must be a City of Bend water customer.</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mb-3">Free Sprinkler Inspections [5]</h3>
            <p className="text-gray-700 leading-relaxed">
              Even the most efficient irrigation systems can develop issues over time. The City of Bend offers free sprinkler inspections by trained staff. They conduct visual inspections, review schedules, perform system tests, and provide recommendations for improved watering schedules. This service is invaluable for optimizing your existing system and identifying potential water waste.
            </p>
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

          {/* Designing Your Water-Wise Landscape */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Designing Your Ideal Water-Wise Landscape</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Creating a water-wise landscape is an art and a science. It involves thoughtful planning to ensure both beauty and efficiency. Here are key considerations for designing your low-water landscape in Bend:
            </p>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 pl-4">
              <li><strong className="text-[oklch(0.25_0.05_145)]">Zone by Water Needs:</strong> Group plants with similar water requirements together. This allows for more efficient irrigation and prevents over or under-watering.</li>
              <li><strong className="text-[oklch(0.25_0.05_145)]">Choose Native & Drought-Tolerant Plants:</strong> Select plants that are naturally adapted to Bend's climate. Oregon grape, serviceberry, sagebrush, and various ornamental grasses are excellent choices that require minimal water once established.</li>
              <li><strong className="text-[oklch(0.25_0.05_145)]">Incorporate Hardscaping:</strong> Patios, walkways, decks, and decorative gravel can reduce the need for planted areas, further conserving water.</li>
              <li><strong className="text-[oklch(0.25_0.05_145)]">Utilize Mulch:</strong> A layer of organic mulch (like bark chips) or inorganic mulch (like gravel) helps retain soil moisture, regulate soil temperature, and suppress weeds.</li>
              <li><strong className="text-[oklch(0.25_0.05_145)]">Smart Irrigation:</strong> Install drip irrigation for planting beds and consider smart controllers that adjust watering schedules based on weather conditions. This precision watering minimizes waste.</li>
              <li><strong className="text-[oklch(0.25_0.05_145)]">Consider Turf Alternatives:</strong> If you desire a green space, explore low-water turf varieties or replace traditional lawns with groundcovers, meadows, or permeable pavers.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Newport Avenue Landscaping's <Link href="/services/landscape-design" className="text-[oklch(0.25_0.05_145)] hover:underline">landscape design</Link> experts can help you conceptualize and plan a water-wise landscape that reflects your aesthetic preferences while maximizing water efficiency.
            </p>
          </section>

          {/* How Newport Ave Helps */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Newport Avenue Landscaping: Your Partner in Water Conservation</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              At Newport Avenue Landscaping, we are committed to helping Bend residents and businesses create stunning, sustainable, and water-efficient outdoor spaces. Our comprehensive services are designed to support every aspect of your water-wise journey:
            </p>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 pl-4">
              <li><strong className="text-[oklch(0.25_0.05_145)]">Xeriscape & Turf Conversion:</strong> We specialize in transforming water-intensive lawns into beautiful, low-water landscapes. Our designs not only enhance curb appeal but also help you qualify for the City of Bend's Turf Replacement Rebate program. Learn more about our <Link href="/services/xeriscaping" className="text-[oklch(0.25_0.05_145)] hover:underline">xeriscape services</Link>.</li>
              <li><strong className="text-[oklch(0.25_0.05_145)]">Smart Irrigation & Drip Installation:</strong> Precision watering is key to water conservation. We design and install state-of-the-art drip irrigation systems and smart controllers that deliver water directly to plant roots, minimizing waste and optimizing plant health. Explore our <Link href="/services/irrigation" className="text-[oklch(0.25_0.05_145)] hover:underline">irrigation solutions</Link>.</li>
              <li><strong className="text-[oklch(0.25_0.05_145)]">Spring Activation + Audit:</strong> As the watering season begins, our team can perform a thorough spring activation and audit of your irrigation system to ensure it's running efficiently and identify any potential leaks or inefficiencies. This proactive approach saves water and prevents costly repairs.</li>
              <li><strong className="text-[oklch(0.25_0.05_145)]">Irrigation Repair:</strong> A malfunctioning irrigation system can waste thousands of gallons of water. Our experienced technicians provide prompt and reliable <Link href="/services/irrigation" className="text-[oklch(0.25_0.05_145)] hover:underline">irrigation repair services</Link> to fix leaks, replace broken components, and restore your system's efficiency.</li>
              <li><strong className="text-[oklch(0.25_0.05_145)]">Landscape Design:</strong> Our award-winning <Link href="/services/landscape-design" className="text-[oklch(0.25_0.05_145)] hover:underline">landscape design</Link> team works with you to create a personalized water-wise plan that integrates seamlessly with your home's architecture and your lifestyle, ensuring a beautiful and sustainable outcome.</li>
              <li><strong className="text-[oklch(0.25_0.05_145)]">Ongoing Maintenance:</strong> Even water-wise landscapes benefit from proper care. Our <Link href="/maintenance" className="text-[oklch(0.25_0.05_145)] hover:underline">maintenance services</Link> ensure your landscape remains healthy and beautiful with minimal water use.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              By partnering with Newport Avenue Landscaping, you're not just investing in a beautiful yard; you're investing in a sustainable future for Bend.
            </p>
          </section>

          {/* FAQ */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions About Water-Wise Landscaping</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{faq.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* References */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">References</h2>
            <ol className="list-decimal list-inside text-gray-700 leading-relaxed pl-4">
              <li><a href="https://www.bendoregon.gov/city-projects/water-conservation/watering-rules" target="_blank" rel="noopener noreferrer" className="text-[oklch(0.25_0.05_145)] hover:underline">City of Bend: Watering Rules</a></li>
              <li><a href="https://www.bendoregon.gov/city-projects/water-conservation/turf-replacement-rebate" target="_blank" rel="noopener noreferrer" className="text-[oklch(0.25_0.05_145)] hover:underline">City of Bend: Turf Replacement Rebate</a></li>
              <li><a href="https://www.bendoregon.gov/city-projects/water-conservation/waterwise-communities" target="_blank" rel="noopener noreferrer" className="text-[oklch(0.25_0.05_145)] hover:underline">City of Bend: WaterWise Communities</a></li>
              <li><a href="https://www.bendoregon.gov/city-projects/water-conservation/water-conservation-plan" target="_blank" rel="noopener noreferrer" className="text-[oklch(0.25_0.05_145)] hover:underline">City of Bend: Water Conservation Plan</a></li>
              <li><a href="https://www.bendoregon.gov/city-projects/water-conservation/free-sprinkler-inspections" target="_blank" rel="noopener noreferrer" className="text-[oklch(0.25_0.05_145)] hover:underline">City of Bend: Free Sprinkler Inspections</a></li>
            </ol>
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
      {/* ── Pricing Disclaimer ── */}
      <section style={{ background: `linear-gradient(rgba(0,0,0,0.60), rgba(0,0,0,0.60)), url(/manus-storage/maintenance-hero-bg_3219f29e_7ba0517e.webp) center/cover no-repeat`, padding: "1.25rem 0" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ color: "oklch(0.50 0.008 0)", fontSize: "0.70rem", lineHeight: 1.6, fontWeight: 300, margin: 0 }}>
            <strong style={{ color: "oklch(0.62 0.008 0)", fontWeight: 500 }}>Pricing Disclaimer:</strong> All prices shown are typical market ranges for general planning purposes only and do not constitute a binding quote or guarantee of cost. Actual costs depend on site conditions, property size, scope of work, and materials. Advertised flat rates are firm as stated. All other estimates require a free on-site assessment. <a href="/contact" style={{ color: "oklch(0.72 0.12 25)", textDecoration: "underline" }}>Contact us for a written estimate.</a>
          </p>
        </div>
      </section>
    </>
  );
}