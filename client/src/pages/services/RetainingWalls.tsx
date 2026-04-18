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
  {
    label: "Retaining Wall Cost Guide",
    href: "/resources/retaining-wall-cost-bend",
    description: "Detailed pricing breakdown for retaining wall installation in Bend.",
  },
];

const faqs = [
  {
    question: "How much does a retaining wall cost in Bend, Oregon?",
    answer:
      "Retaining wall costs in Bend vary by material and wall height. Basalt boulder walls typically run $45–$85 per square face foot installed. Concrete block systems (Allan Block, Versa-Lok) range from $35–$65 per square face foot. Natural flagstone and dry-stack walls are $50–$90 per square face foot. A typical residential retaining wall project in Bend runs $4,000–$18,000 depending on length, height, and site conditions. Contact us for a free site assessment and estimate.",
  },
  {
    question: "Do I need a permit for a retaining wall in Bend?",
    answer:
      "In Bend, retaining walls over 4 feet in height (measured from the bottom of the footing) typically require a building permit from the City of Bend Development Services. Walls under 4 feet generally do not require a permit, but must still comply with setback requirements. Newport Avenue handles permit coordination as part of our project management — you don't need to navigate the city process yourself.",
  },
  {
    question: "What is the best material for a retaining wall in Central Oregon?",
    answer:
      "Basalt boulder is the most popular and durable choice for Central Oregon. It's locally quarried, blends naturally with the high-desert landscape, handles freeze-thaw cycles exceptionally well, and requires virtually no maintenance. Concrete block systems are better suited for taller walls requiring precise engineering tolerances or where a more formal aesthetic is desired. We'll recommend the right material after assessing your site, slope, and design goals.",
  },
  {
    question: "How long does retaining wall installation take?",
    answer:
      "A typical residential retaining wall project in Bend takes 2–5 days from mobilization to completion, depending on wall length, height, and access. Larger terracing projects or walls requiring permits may take 1–3 weeks including the permit review period. We provide a detailed project timeline during your estimate.",
  },
  {
    question: "Can a retaining wall fix my drainage problems?",
    answer:
      "A properly engineered retaining wall includes drainage behind the wall — typically a gravel backfill layer and perforated drain pipe — that prevents hydrostatic pressure from building up and damaging the wall. This drainage system also helps redirect water away from your foundation. However, if you have active surface drainage problems (pooling, erosion, water near your foundation), a retaining wall alone may not be sufficient — we often combine retaining walls with French drains or grading corrections for a complete solution.",
  },
];

export default function RetainingWalls() {
  return (
    <ServicePageLayout
      category="Design & Installation"
      title="Retaining Walls"
      subtitle="Bend, Oregon"
      seoTitle="Retaining Wall Installation Bend Oregon | Basalt Boulder & Block Walls | Newport Avenue"
      seoDescription="Retaining wall design and installation in Bend, Oregon. Basalt boulder, concrete block, and natural stone walls. Engineered for Central Oregon's freeze-thaw climate. Free estimates. LCB #9153."
      heroImage="https://newportavelandscaping.com/wp-content/uploads/2022/08/retaining-wall-landscape-design-bend-oregon.jpg"
      heroPosition="center 50%"
      intro="Central Oregon's terrain demands more than beauty — it demands structure. Newport Avenue designs and builds retaining walls that solve real slope, erosion, and drainage problems while dramatically elevating the visual appeal of your property. From natural basalt boulders to precision-cut concrete block, we engineer walls that last decades in Bend's demanding freeze-thaw climate."
      pricing={[
        { label: "Basalt Boulder", value: "$45–$85 per sq. face ft. installed" },
        { label: "Concrete Block", value: "$35–$65 per sq. face ft. installed" },
        { label: "Natural Flagstone", value: "$50–$90 per sq. face ft. installed" },
        { label: "Service Area", value: "Bend, Redmond, Sisters, Sunriver & all of Central Oregon" },
      ]}
      sections={[
        {
          heading: "Retaining Wall Design & Engineering",
          body: "Every retaining wall we build starts with a thorough site assessment. We evaluate slope grade, soil composition, drainage patterns, and load requirements before recommending a material and design. Improperly built walls fail — ours don't. We engineer proper drainage behind every wall to prevent the hydrostatic pressure that causes premature failure, and we set footings at the correct depth for Central Oregon's freeze-thaw cycles.",
          list: [
            "Site assessment and slope analysis",
            "Engineered drainage behind wall to prevent hydrostatic pressure",
            "Proper footing depth for Central Oregon freeze-thaw cycles",
            "Permit coordination for walls over 4 feet",
          ],
        },
        {
          heading: "Materials We Work With",
          body: [
            "Basalt boulder walls are the most popular choice in Central Oregon — they blend naturally with the high desert landscape, handle freeze-thaw cycles better than most manufactured products, and require minimal maintenance over their lifetime. We source locally quarried basalt for an authentic look that complements ponderosa pine, sage, and the natural rock outcroppings throughout the region.",
            "Concrete block systems (Allan Block, Versa-Lok, and similar engineered systems) offer precise tolerances for taller walls and terraced applications where consistent coursing and structural predictability are required. Natural flagstone and dry-stack stone are also available for projects where a more organic, handcrafted aesthetic is the priority.",
          ],
          accent: true,
        },
        {
          heading: "Terracing & Multi-Level Landscapes",
          body: [
            "Sloped lots in Bend's west side neighborhoods — Awbrey Butte, NorthWest Crossing, Broken Top — often require multi-level terracing to create usable outdoor living space. A hillside that seems unusable can become your best outdoor room with a well-designed terracing system.",
            "We design terraced systems that integrate planting beds, steps, landscape lighting, and irrigation into a cohesive landscape. Each terrace level is engineered independently to handle its specific load and drainage requirements, with the entire system designed to work together as a unified landscape.",
          ],
        },
        {
          heading: "Erosion Control & Slope Stabilization",
          body: "Beyond aesthetics, retaining walls prevent soil erosion, protect foundations, and redirect water away from structures. If you're seeing soil movement, cracking hardscape, or water pooling near your home, a properly engineered retaining wall is often the most cost-effective long-term solution. We specialize in combining retaining walls with French drain systems and surface grading corrections to address the root cause of erosion — not just the symptoms.",
          list: [
            "Slope stabilization for hillside properties",
            "Foundation protection from soil movement and hydrostatic pressure",
            "Integration with French drain and drainage systems",
            "Erosion control on bare slopes and cut banks",
          ],
        },
      ]}
      faqs={faqs}
      relatedLinks={relatedLinks}
      resourceLinks={resourceLinks}
      schemaUrl="/services/retaining-walls"
      schemaName="Retaining Wall Installation"
      schemaDescription="Retaining wall design and installation in Bend, Oregon. Basalt boulder, concrete block, and natural stone walls engineered for Central Oregon's freeze-thaw climate."
      portfolioProjects={[
        {
          title: "Awbrey Butte Patio Extension & Freestanding Wall",
          href: "/portfolio/awbrey-butte-patio",
          image: "https://newportavelandscaping.com/wp-content/uploads/2022/09/awbrey-butte-freestanding-wall-pavers-patio-extension.jpg",
          category: "RETAINING WALLS · PAVERS",
        },
        {
          title: "Broken Top Retaining Wall & Xeriscape",
          href: "/portfolio/broken-top-xeriscape",
          image: "https://newportavelandscaping.com/wp-content/uploads/2022/05/Bend-OR-Brokentop-Xeriscape-After-Picture.jpg",
          category: "RETAINING WALLS · XERISCAPE",
        },
        {
          title: "SW Bend Backyard Landscaping",
          href: "/portfolio/sw-bend-backyard",
          image: "https://newportavelandscaping.com/wp-content/uploads/2022/05/south-west-bend-oregon-campground-backyard-full-view-2.jpg",
          category: "DESIGN & BUILD · WALLS",
        },
      ]}
    />
  );
}
