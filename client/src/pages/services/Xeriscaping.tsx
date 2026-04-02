import ServicePageLayout from "@/components/ServicePageLayout";

export default function Xeriscaping() {
  return (
    <ServicePageLayout
      category="LANDSCAPING SERVICES"
      title="Xeriscaping"
      subtitle="Water-Wise Landscaping for Central Oregon"
      heroImage="https://newportavelandscaping.com/wp-content/uploads/2022/05/awbrey-butte-xeriscape-landscaping-renovation-day-shot.jpg"
      intro="Xeriscaping is the art of creating beautiful, sustainable landscapes that thrive with minimal water. In Central Oregon's high-desert climate, xeriscaping isn't just an environmental choice — it's a smart investment that reduces your water bill, lowers maintenance requirements, and creates a landscape that looks stunning year-round without constant irrigation."
      sections={[
        {
          heading: "What Is Xeriscaping?",
          body: "Xeriscaping replaces water-intensive lawns and plants with drought-tolerant natives, decorative rock, efficient drip irrigation, and thoughtful hardscape. The result is a landscape that looks lush and intentional while using 50–70% less water than a traditional lawn.",
          accent: false,
        },
        {
          heading: "Our Xeriscaping Services",
          body: "Newport Avenue Landscaping designs and installs complete xeriscape transformations across Bend, Redmond, Sisters, and the surrounding Central Oregon area.",
          list: [
            "Drought-tolerant plant selection and installation",
            "Drip irrigation design and installation",
            "Decorative rock, gravel, and mulch installation",
            "Lawn removal and conversion",
            "Soil amendment and preparation",
            "Hardscape integration (patios, pathways, boulders)",
            "Retaining walls and grading",
            "Landscape lighting for xeriscape areas",
          ],
        },
        {
          heading: "Benefits of Xeriscaping",
          body: "Beyond water savings, a well-designed xeriscape offers significant advantages for Central Oregon homeowners and businesses.",
          list: [
            "Reduce water usage by 50–70%",
            "Lower monthly water bills significantly",
            "Minimal ongoing maintenance required",
            "Thrives in Central Oregon's climate naturally",
            "Increases property value and curb appeal",
            "Environmentally responsible landscaping",
            "Year-round visual interest with seasonal color",
            "Supports native wildlife and pollinators",
          ],
          accent: true,
        },
        {
          heading: "Our Process",
          body: [
            "Every xeriscape project begins with a site assessment and design consultation. We evaluate your soil, sun exposure, existing plants, and irrigation to develop a plan that maximizes beauty while minimizing water use.",
            "We then present a detailed design with plant selections, hardscape elements, and irrigation specifications. Once approved, our crew handles every aspect of the installation — from soil prep to final planting and irrigation programming.",
          ],
        },
      ]}
      relatedLinks={[
        { label: "Landscape Design", href: "/services/landscape-design" },
        { label: "Irrigation Installation", href: "/services/irrigation" },
        { label: "Pavers & Walkways", href: "/services/pavers" },
        { label: "Retaining Walls & Drainage", href: "/services" },
      ]}
    />
  );
}
