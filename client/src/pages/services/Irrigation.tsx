import ServicePageLayout from "@/components/ServicePageLayout";

const relatedLinks = [
  { label: "Sprinkler Blowout", href: "/services/sprinkler-blowout" },
  { label: "Sprinkler Repair & Backflow", href: "/services/sprinkler-repair" },
  { label: "Spring Activation", href: "/services/sprinkler-activation" },
  { label: "Landscape Design", href: "/services/landscape-design" },
];

const resourceLinks = [
  {
    label: "Sprinkler System Cost in Bend, OR",
    href: "/resources/sprinkler-system-cost-bend-oregon",
    description: "What a new irrigation system costs in Central Oregon — full pricing breakdown.",
  },
  {
    label: "How to Winterize Your Sprinklers in Bend",
    href: "/resources/sprinkler-winterization-guide-bend-oregon",
    description: "Step-by-step guide to blowout and winterization before the first freeze.",
  },
  {
    label: "Sprinkler Repair in Bend, OR",
    href: "/resources/irrigation-repair-bend-oregon",
    description: "Common sprinkler issues, repair costs, and when to call a pro.",
  },
];

export default function Irrigation() {
  return (
    <ServicePageLayout
      category="Irrigation Services"
      title="Sprinkler System"
      subtitle="Design & Installation"
      seoTitle="Sprinkler System Installation Bend Oregon | Irrigation Design & Install | Newport Avenue"
      seoDescription="Professional irrigation system design and installation in Bend, Oregon. Smart controllers, drip irrigation, and full lawn sprinkler systems. $1,600–$2,000/zone. LCB #9153."
      heroImage="/manus-storage/safe-hero-irrigation-wide_7d00acf6.jpg"
      heroPosition="center 40%"
      intro="Our teams of sprinkler system experts are up-to-date on all certifications and are licensed as landscape construction professionals with the Oregon Landscape Contractors Board. We have installed thousands of sprinkler systems in Central Oregon and have innovated ways to save water and save you time and money when it comes to getting water to your landscape. We offer free proposals and advice."
      pricing={[
        { label: "Repair Rate", value: "$140 / man hour + materials" },
        { label: "Consultations", value: "Always Free" },
      ]}
      sections={[
        {
          heading: "New Sprinkler System Installs",
          body: "Our certified irrigation teams handle new sprinkler system installations for residential and commercial properties throughout Central Oregon. We design each system to maximize water efficiency, minimize waste, and ensure complete coverage for your specific landscape.",
        },
        {
          heading: "Sprinkler System Design",
          body: "We are the 'go-to' designers and installers for the older mill-site homes here in Bend, Oregon. Lots of these homes have old rusted galvanized pipes, old outdated utility lines, and confusing layouts. We can help minimize the cost and guesswork that goes into designing a system for your home or small commercial property.",
        },
        {
          heading: "Sprinkler System Renovation",
          body: "With rapidly advancing sprinkler system technologies, a lot of homes that are even less than a decade old in Central Oregon have sprinkler systems that use an unnecessary amount of water. Our irrigation technicians are trained to analyze your water needs and system's output, and then either adjust your system for optimum water use, or provide you with a proposal to renovate your system with the newest technologies for up to 75% water and resource savings.",
        },
        {
          heading: "Sprinkler System Repair",
          body: "We have a team of irrigation technicians who are knowledgeable and up-to-date on all new technology. They are quick to troubleshoot issues and repair irrigation breaks. We charge $140 per technician hour to repair irrigation and sprinkler systems in Bend, Oregon plus material costs.",
        },
        {
          heading: "What's Included",
          body: "Every new installation and repair comes with our thorough process:",
          list: [
            "Full system design with zone mapping and water pressure analysis",
            "Licensed installation by Oregon LCB-certified technicians",
            "Backflow prevention device installation and testing",
            "Smart controller setup and programming",
            "Water conservation optimization for Central Oregon climate",
            "Post-installation walkthrough and owner education",
          ],
        },
      ]}
      relatedLinks={relatedLinks}
      resourceLinks={resourceLinks}
      galleryImages={[
        { src: "/manus-storage/svc-irrigation-1_1909ca75.jpg", alt: "Irrigation system installation in Central Oregon landscape" },
        { src: "/manus-storage/safe-hero-irrigation-wide_7d00acf6.jpg", alt: "Drip irrigation install in xeriscape garden in Bend Oregon" },
        { src: "/manus-storage/svc-irrigation-3_461a9fab.jpg", alt: "Completed sprinkler system running on residential lawn in Central Oregon" },
      ]}
      schemaUrl="/services/irrigation"
      schemaName="Sprinkler System Installation"
      schemaDescription="Professional irrigation system design and installation in Bend, Oregon. Smart controllers, drip irrigation, and full lawn sprinkler systems."
      faqs={[
          { question: "How much does a sprinkler system cost in Bend, Oregon?", answer: "A new residential sprinkler system in Bend, OR typically costs $4,500–$14,000 installed, depending on yard size, number of zones, water pressure, and controller type. A typical 5-zone system for a 6,000 sq ft property runs $5,500–$8,000. Smart Wi-Fi controllers (Rain Bird, Hunter, Rachio) add $250–$600 but typically pay for themselves in water savings within 1–2 seasons. Newport Avenue Landscaping provides free on-site estimates — call (541) 617-8873." },
          { question: "When is the best time to install a sprinkler system in Bend?", answer: "Spring (April–June) is the most popular installation window in Central Oregon — ground thaws in late March and systems can be fully operational before summer heat arrives in July. Fall (August–September) is also excellent: cooler temps, softer ground, and shorter lead times. We install systems year-round except when the ground is frozen (typically December–February). Book early — our spring schedule fills by March." },
          { question: "Do I need a permit for a sprinkler system in Bend, Oregon?", answer: "Most residential sprinkler system installations in Bend do not require a building permit. However, any system connecting to Bend's municipal water supply requires a licensed backflow prevention device (RPZ or double-check valve) that must be tested annually by a certified tester. Newport Avenue Landscaping handles all backflow preventer installation and can schedule your annual required test. We are Oregon LCB licensed (#9153)." },
          { question: "How much does sprinkler repair cost in Bend?", answer: "Newport Avenue Landscaping charges $140 per technician hour for sprinkler system repair in Bend, plus materials. Most standard repairs (broken head, leaking valve, controller issue) take 1–2 hours. Larger repairs involving pipe breaks, zone valve replacement, or backflow preventer work may take 2–4 hours. We diagnose the issue before starting work and give you a clear estimate." },
          { question: "What is drip irrigation and is it worth it in Central Oregon?", answer: "Drip irrigation delivers water directly to plant root zones through low-flow emitters, reducing evaporation by 30–50% compared to spray heads. In Central Oregon's dry climate (11 inches of annual rainfall), drip is highly effective for garden beds, shrubs, trees, and xeriscape plantings. We typically combine drip zones with traditional spray zones in a single system. Drip zones can reduce your summer water bill by $30–$80 per month on a typical Bend property." },
          { question: "Do you install sprinkler systems in Redmond and Sisters, Oregon?", answer: "Yes — Newport Avenue Landscaping installs and repairs irrigation systems throughout Central Oregon including Bend, Redmond, Sisters, Sunriver, Tumalo, and La Pine. We are a licensed Oregon LCB contractor (#9153) with irrigation-certified technicians. We also perform annual sprinkler blowouts (winterization) and spring activations throughout the region each year." },
      ]}
    />
  );
}
