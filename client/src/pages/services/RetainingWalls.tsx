import ServicePageLayout from "@/components/ServicePageLayout";

const relatedLinks = [
  { label: "Landscape Design", href: "/services/landscape-design" },
  { label: "Pavers & Patios", href: "/services/pavers" },
  { label: "Drainage Solutions", href: "/services/drainage" },
];

const resourceLinks = [
  {
    label: "Boulder Landscaping Cost in Bend",
    href: "/resources/boulder-landscaping-cost-bend-oregon",
    description: "What retaining walls and boulder work costs in Central Oregon.",
  },
];

export default function RetainingWalls() {
  return (
    <ServicePageLayout
      category="Design & Installation"
      title="Retaining Walls"
      subtitle="Bend, Oregon"
      heroImage="https://newportavelandscaping.com/wp-content/uploads/2022/08/retaining-wall-landscape-design-bend-oregon.jpg"
      heroPosition="center 50%"
      intro="Central Oregon's terrain demands more than beauty — it demands structure. Newport Avenue designs and builds retaining walls that solve real slope, erosion, and drainage problems while dramatically elevating the visual appeal of your property. From natural basalt boulders to precision-cut concrete block, we engineer walls that last decades."
      pricing={[
        { label: "Pricing", value: "Custom quote — contact us for an estimate" },
        { label: "Materials", value: "Basalt boulder, concrete block, natural stone, timber" },
        { label: "Service Area", value: "Bend, Redmond, Sisters, Sunriver & all of Central Oregon" },
      ]}
      sections={[
        {
          heading: "Retaining Wall Design & Engineering",
          body: "Every retaining wall we build starts with a site assessment. We evaluate slope grade, soil composition, drainage patterns, and load requirements before recommending a material and design. Improperly built walls fail — ours don't.",
          list: [
            "Site assessment and slope analysis",
            "Engineered drainage behind wall to prevent hydrostatic pressure",
            "Proper footing depth for Central Oregon freeze-thaw cycles",
            "Permit coordination when required",
          ],
        },
        {
          heading: "Materials We Work With",
          body: [
            "Basalt boulder walls are the most popular choice in Central Oregon — they blend naturally with the high desert landscape and require minimal maintenance. We source locally quarried basalt for an authentic look that complements ponderosa pine and sage.",
            "Concrete block (Allan Block, Versa-Lok, and similar systems) offers precise engineering tolerances for taller walls and terraced applications. Natural flagstone and timber are also available depending on your design goals.",
          ],
          accent: true,
        },
        {
          heading: "Terracing & Multi-Level Landscapes",
          body: [
            "Sloped lots in Bend's west side neighborhoods — Awbrey Butte, NorthWest Crossing, Broken Top — often require multi-level terracing to create usable outdoor living space. We design terraced systems that integrate planting beds, steps, lighting, and irrigation into a cohesive landscape.",
            "Terracing can transform an unusable hillside into your best outdoor room.",
          ],
        },
        {
          heading: "Erosion Control & Slope Stabilization",
          body: "Beyond aesthetics, retaining walls prevent soil erosion, protect foundations, and redirect water away from structures. If you're seeing soil movement, cracking hardscape, or water pooling near your home, a properly engineered retaining wall is often the solution.",
          list: [
            "Slope stabilization for hillside properties",
            "Foundation protection from soil movement",
            "Integration with drainage systems",
            "Erosion control on bare slopes",
          ],
        },
      ]}
      relatedLinks={relatedLinks}
      resourceLinks={resourceLinks}
      schemaUrl="/services/retaining-walls"
      schemaName="Retaining Walls"
      schemaDescription="Retaining wall design and installation in Bend, Oregon. Basalt boulder, concrete block, and natural stone walls for residential and commercial properties."
    />
  );
}
