import ServicePageLayout from "@/components/ServicePageLayout";

const resourceLinks = [
  {
    label: "Xeriscape Cost in Bend, OR",
    href: "/resources/xeriscape-cost-bend-oregon",
    description: "What water-wise landscaping costs in Central Oregon.",
  },
  {
    label: "Best Plants for Xeriscaping in Central Oregon",
    href: "/resources/best-plants-xeriscape-central-oregon",
    description: "Native and drought-tolerant plants that thrive in Bend's climate.",
  },
  {
    label: "Bend Turf Rebate Program",
    href: "/resources/bend-turf-rebate-program",
    description: "How to get rebates for replacing grass with drought-tolerant landscaping.",
  },
];

export default function Xeriscaping() {
  return (
    <ServicePageLayout
      category="LANDSCAPING SERVICES"
      title="Xeriscaping"
      subtitle="Water-Wise Landscaping for Central Oregon"
      seoTitle="Xeriscape Landscaping Bend Oregon | Water-Wise & Drought-Tolerant Design | Newport Avenue"
      seoDescription="Water-wise xeriscape landscaping in Bend, Oregon. Drought-tolerant plants, decorative rock, and low-maintenance designs for Central Oregon's climate. LCB #9153."
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
      resourceLinks={resourceLinks}
      schemaUrl="/services/xeriscaping"
      schemaName="Xeriscape Landscaping"
      schemaDescription="Water-wise xeriscape landscaping in Bend, Oregon. Drought-tolerant plants, decorative rock, and low-maintenance designs."
      faqs={[
          { question: "How much does xeriscaping cost in Bend?", answer: "Xeriscape projects in Bend typically cost $3,000–$20,000 depending on the size of the area, the extent of existing lawn removal, soil amendment needs, and plant and rock material choices. While the upfront cost is comparable to traditional landscaping, xeriscapes save significantly on water bills and maintenance costs over time." },
          { question: "How much water does xeriscaping save?", answer: "A well-designed xeriscape in Central Oregon can reduce outdoor water use by 50–75% compared to a traditional lawn. In Bend, where summer water bills can run $100–$200/month for irrigation, that represents $600–$1,500 in annual savings. Many Bend homeowners recoup the cost of xeriscaping within 3–5 years through water savings alone." },
          { question: "Does xeriscaping look good or does it just look like rocks?", answer: "Modern xeriscape design is beautiful — it is nothing like the gravel-and-cactus stereotype. In Bend, we use a rich palette of ornamental grasses, drought-tolerant perennials (lavender, salvia, yarrow, penstemon), native shrubs, and decorative boulders to create landscapes that look lush and intentional. Many of our xeriscape projects are the most visually striking yards in their neighborhoods." },
          { question: "Will the City of Bend give me a rebate for xeriscaping?", answer: "Bend's water utility has offered lawn conversion rebates in the past to encourage water-wise landscaping. Rebate programs change year to year — we recommend checking with the City of Bend Water Conservation office for current incentives. We can help you document your project for rebate applications." },
          { question: "What plants work best for xeriscaping in Bend?", answer: "Top performers for Bend xeriscapes include lavender, Russian sage, blue oat grass, Karl Foerster feather reed grass, penstemon, yarrow, sedum, Apache plume, rabbitbrush, and native bunchgrasses. We select plants based on your specific sun exposure, soil type, and aesthetic preferences." },
      ]}
    />
  );
}
