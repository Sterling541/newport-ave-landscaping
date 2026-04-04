import ServicePageLayout from "@/components/ServicePageLayout";

const relatedLinks = [
  { label: "Landscape Design", href: "/services/landscape-design" },
  { label: "Paver Patios & Walkways", href: "/services/pavers" },
  { label: "Outdoor Living Spaces", href: "/services/outdoor-living" },
  { label: "Irrigation Installation", href: "/services/irrigation" },
];

const resourceLinks = [
  {
    label: "Landscape Lighting Cost in Bend, OR",
    href: "/resources/outdoor-lighting-cost-bend-oregon",
    description: "What outdoor and landscape lighting installation costs in Central Oregon.",
  },
  {
    label: "Landscape Lighting Ideas for Bend Homes",
    href: "/resources/landscape-lighting-bend-oregon",
    description: "Design ideas, fixture types, and tips for Central Oregon properties.",
  },
];

export default function LandscapeLighting() {
  return (
    <ServicePageLayout
      category="Installation Services"
      title="Landscape Lighting"
      subtitle="Bend, Oregon"
      heroImage="https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/RDRaedrdxFWkLZJv.jpg"
      heroPosition="center 60%"
      intro="Our landscape lighting expert is up to date on all certifications and is licensed as a landscape construction professional with the Oregon Landscape Contractors Board. Landscape lighting has become so popular that we are now installing 7–10 landscape lighting systems every month. We offer free proposals and advice."
      sections={[
        {
          heading: "New Landscape Lighting Installs",
          body: [
            "Our certified lighting technicians design and install custom landscape lighting systems for residential and commercial properties throughout Central Oregon.",
            "We offer free proposals and advice — and can put together a comprehensive landscape lighting design, including a breakdown of materials, a wire-run diagram, and a how-to guide.",
          ],
        },
        {
          heading: "FX Luminaire — The Best in the Business",
          body: [
            "For new installs we have decided to only install FX Luminaire lighting systems. In our professional opinion, FX Luminaire has the best value for your money and is currently leading the way in lighting technology.",
            "The LED bulbs are rated to last for over 10 years and only use 4.0 Watts of electricity per fixture on average — compared to a 2-year lifespan and 20 watts per bulb on a halogen system.",
            "FX Luminaire has developed the technology and is the only company to offer a lighting fixture that you can group with other fixtures and dim. This makes lighting 1000x more fun and the possibilities endless!",
          ],
          accent: true,
        },
        {
          heading: "Landscape Lighting Renovation",
          body: [
            "With rapidly advancing landscape lighting technologies, a lot of homes that are even less than a decade old in Central Oregon have lighting systems that are out of date.",
            "We can come analyze and renovate your system for better aesthetics and wattage/money savings. Our Bend, Oregon landscape lighting technicians are familiar with and will repair most outdoor lighting brands used in Central Oregon.",
          ],
        },
        {
          heading: "What We Light",
          body: "Our lighting designs enhance every aspect of your outdoor space:",
          list: [
            "Trees and specimen plants (uplighting)",
            "Pathways and walkways",
            "Driveways and entry features",
            "Patios and outdoor living areas",
            "Water features and ponds",
            "Architectural features and facades",
            "Steps and retaining walls",
            "Garden beds and borders",
          ],
        },
      ]}
      relatedLinks={relatedLinks}
      resourceLinks={resourceLinks}
      schemaUrl="/services/landscape-lighting"
      schemaName="Landscape Lighting"
      schemaDescription="Professional landscape lighting design and installation in Bend, Oregon. LED path lights, uplighting, and outdoor living illumination."
      faqs={[
          { question: "How much does landscape lighting cost in Bend?", answer: "Residential landscape lighting projects in Bend typically range from $1,500–$8,000 depending on the number of fixtures, the areas being lit, and the complexity of the installation. LED systems have higher upfront costs than halogen but use 75% less energy and last 25x longer, making them the better long-term investment." },
          { question: "What types of landscape lighting do you install?", answer: "We install a full range of outdoor lighting including path and walkway lights, uplighting for trees and architectural features, downlighting from trees or structures, deck and step lighting, pond and water feature lighting, and security lighting. All installations use commercial-grade LED fixtures designed for outdoor use in Central Oregon's climate." },
          { question: "Do landscape lights work in Central Oregon winters?", answer: "Yes — quality outdoor LED fixtures are rated for temperatures well below Central Oregon's winter lows. We use fixtures with IP65 or higher weatherproofing ratings that handle snow, ice, and temperature swings without issue. Proper installation with conduit and waterproof connections ensures reliable year-round performance." },
          { question: "Can I add lighting to an existing landscape?", answer: "Absolutely — we install landscape lighting on existing properties all the time. We can work around established plants and hardscapes with minimal disruption. Low-voltage LED systems are particularly easy to add to existing landscapes without major trenching." },
      ]}
    />
  );
}
