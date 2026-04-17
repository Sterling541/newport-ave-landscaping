import CityPageLayout from "@/components/CityPageLayout";

export default function BendPage() {
  return (
    <CityPageLayout
      city="Bend"
      region="Central Oregon"
      heroImage="https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportAveLandcaping-9_97b731b0.jpg"
      heroPosition="center 40%"
      tagline="Outdoor Living Experts"
      seoTitle="Landscaping Bend Oregon | Lawn Care, Design & Irrigation | Newport Avenue"
      seoDescription="Bend Oregon's #1 landscaping company since 2005. Lawn care, landscape design, irrigation installation, xeriscaping, paver patios & snow removal. Serving all Bend neighborhoods. LCB #9153. Free estimates."
      canonicalPath="/landscaping/bend"
      intro="Newport Avenue Landscaping has been Bend's premier landscaping company since 2005. From the high-desert neighborhoods of Awbrey Butte and Broken Top to the newer developments of NorthWest Crossing and Discovery West, our crews maintain and build some of the most beautiful outdoor spaces in the city."
      communityNote="Bend's unique high-desert climate — hot, dry summers and cold winters — demands a landscaping partner who truly understands the environment. We design with drought-tolerant natives, install smart irrigation systems, and build outdoor living spaces that take full advantage of Central Oregon's 300 days of sunshine."
      services={[
        {
          icon: "maintenance",
          name: "Residential Lawn & Landscape Maintenance",
          description: "Weekly lawn service, pruning, fertilization, weed control, and seasonal clean-ups for Bend homes. We service neighborhoods from Broken Top to SE Bend.",
          href: "/services/lawn-service",
        },
        {
          icon: "sprinklers",
          name: "Irrigation Installation & Repair",
          description: "Full sprinkler system design, installation, spring activation, blowout, and year-round repair for Bend's sandy soils and dry summers.",
          href: "/services/irrigation",
        },
        {
          icon: "design",
          name: "Landscape Design & Installation",
          description: "Custom landscape design, grading, planting, sod installation, and hardscape construction for new builds and full renovations throughout Bend.",
          href: "/services/landscape-design",
        },
        {
          icon: "outdoor",
          name: "Fire Pits, Fireplaces & Outdoor Living",
          description: "Custom outdoor kitchens, fire pits, pergolas, and living spaces that make the most of Bend's spectacular outdoor lifestyle.",
          href: "/services/fire-features",
        },
        {
          icon: "architecture",
          name: "Xeriscaping & Native Plantings",
          description: "Water-wise landscape design using drought-tolerant plants suited to Bend's high-desert climate — beautiful and sustainable.",
          href: "/services/xeriscaping",
        },
        {
          icon: "commercial",
          name: "Snow Removal",
          description: "Commercial and residential snow plowing, de-icing, and ice management for Bend properties throughout the winter season.",
          href: "/services/snow-removal",
        },
      ]}
      whyUs={[
        "Bend's largest and most established landscaping company — in business since 2005",
        "150+ in-house professionals — no subcontractors, ever",
        "Deep knowledge of Bend's neighborhoods, soils, and climate",
        "Full-service: design, installation, maintenance, and irrigation under one roof",
        "Licensed, Bonded & Insured — LCB #9153",
        "References available from hundreds of Bend homeowners and HOAs",
      ]}
      nearbyAreas={[
        { label: "Tumalo", href: "/landscaping/tumalo" },
        { label: "Redmond", href: "/landscaping/redmond" },
        { label: "Sisters", href: "/landscaping/sisters" },
        { label: "Sunriver", href: "/landscaping/sunriver" },
        { label: "Powell Butte", href: "/service-areas/powell-butte-lawn-care" },
        { label: "Awbrey Butte", href: "/service-areas/awbrey-butte-landscaping" },
        { label: "NorthWest Crossing", href: "/service-areas/northwest-crossing-landscaping" },
        { label: "Broken Top", href: "/service-areas/broken-top-landscaping" },
        { label: "Discovery West", href: "/service-areas/discovery-west-landscaping" },
      ]}
      ctaNote="We respond within one business day and provide free on-site estimates for all Bend properties. Ask about our seasonal maintenance programs."
      faqs={[
        {
          question: "How much does landscaping cost in Bend, Oregon?",
          answer: "Landscaping costs in Bend vary widely by project type. Basic lawn maintenance starts around $50–$120 per visit. A full landscape design and installation for a typical Bend home ranges from $15,000 to $80,000+. Irrigation systems run $4,000–$12,000 installed. Paver patios average $18–$35 per square foot. We provide free on-site estimates for all projects.",
        },
        {
          question: "What landscaping services does Newport Avenue offer in Bend?",
          answer: "We offer a complete range of landscaping services in Bend including lawn care and maintenance, irrigation installation and repair, landscape design and installation, xeriscaping, paver patios and walkways, outdoor living spaces, fire pits and fireplaces, landscape lighting, water features, snow removal, and commercial maintenance.",
        },
        {
          question: "Is Newport Avenue Landscaping licensed and insured in Oregon?",
          answer: "Yes. Newport Avenue Landscaping holds Oregon Landscape Contractor Bond #9153 (LCB #9153). We are fully licensed, bonded, and insured for all residential and commercial landscaping work in Bend and throughout Central Oregon.",
        },
        {
          question: "Do you offer free estimates for landscaping in Bend?",
          answer: "Yes — we offer free on-site estimates for all landscaping projects in Bend, Oregon. We typically respond within one business day and can schedule a site visit at your convenience.",
        },
        {
          question: "What neighborhoods in Bend do you serve?",
          answer: "We serve every neighborhood in Bend including Awbrey Butte, Broken Top, NorthWest Crossing, Discovery West, Old Bend, Bend Country Club, Southeast Bend, Southwest Bend, Northeast Bend, River West, Brookswood, Larkspur, Shevlin Meadows, Deschutes River Woods, and all surrounding areas.",
        },
      ]}
    />
  );
}
