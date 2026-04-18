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
      heroImage="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=80"
      heroPosition="center 60%"
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
      schemaUrl="/services/irrigation"
      schemaName="Sprinkler System Installation"
      schemaDescription="Professional irrigation system design and installation in Bend, Oregon. Smart controllers, drip irrigation, and full lawn sprinkler systems."
      faqs={[
          { question: "How much does a sprinkler system cost in Bend, Oregon?", answer: "A residential sprinkler system in Bend typically costs $3,500–$12,000 installed, depending on yard size, number of zones, and controller type. Smart Wi-Fi controllers add $200–$500 but pay for themselves in water savings within 1–2 seasons. We provide detailed quotes after a free on-site assessment." },
          { question: "When is the best time to install a sprinkler system in Bend?", answer: "Spring (April–June) and fall (August–September) are the ideal installation windows in Central Oregon. Spring installation means your system is ready before summer heat arrives. Fall installation takes advantage of cooler weather and softer ground. We also install systems year-round when conditions allow." },
          { question: "Do I need a permit for a sprinkler system in Bend?", answer: "Most residential sprinkler system installations in Bend do not require a permit, but systems connecting to the municipal water supply require a backflow prevention device that must be tested annually. We handle all backflow preventer installation and can coordinate the required annual testing." },
          { question: "What is drip irrigation and should I use it?", answer: "Drip irrigation delivers water directly to plant root zones through low-flow emitters, reducing evaporation by 30–50% compared to spray heads. It is ideal for garden beds, shrubs, trees, and xeriscape plantings. We typically combine drip zones with traditional spray zones in a single system to serve both lawn and planting areas efficiently." },
          { question: "How long does sprinkler system installation take?", answer: "Most residential installations in Bend take 1–2 days. We trench, lay pipe, install heads and valves, program the controller, and walk you through operation before we leave. Larger commercial or multi-zone residential systems may take 2–4 days." },
      ]}
    />
  );
}
