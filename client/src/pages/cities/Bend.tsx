import CityPageLayout from "@/components/CityPageLayout";

export default function BendPage() {
  return (
    <CityPageLayout
      city="Bend"
      region="Central Oregon"
      heroImage="https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportAveLandcaping-9_97b731b0.jpg"
      heroPosition="center 40%"
      tagline="Outdoor Living Experts"
      intro="Newport Avenue Landscaping has been Bend's premier landscaping company since 2005. From the high-desert neighborhoods of Awbrey Butte and Broken Top to the newer developments of NorthWest Crossing and Discovery West, our crews maintain and build some of the most beautiful outdoor spaces in the city."
      communityNote="Bend's unique high-desert climate — hot, dry summers and cold winters — demands a landscaping partner who truly understands the environment. We design with drought-tolerant natives, install smart irrigation systems, and build outdoor living spaces that take full advantage of Central Oregon's 300 days of sunshine."
      services={[
        {
          icon: "leaf",
          name: "Residential Lawn & Landscape Maintenance",
          description: "Weekly lawn service, pruning, fertilization, weed control, and seasonal clean-ups for Bend homes. We service neighborhoods from Broken Top to SE Bend.",
        },
        {
          icon: "droplets",
          name: "Irrigation Installation & Repair",
          description: "Full sprinkler system design, installation, spring activation, blowout, and year-round repair for Bend's sandy soils and dry summers.",
        },
        {
          icon: "wrench",
          name: "Landscape Design & Installation",
          description: "Custom landscape design, grading, planting, sod installation, and hardscape construction for new builds and full renovations throughout Bend.",
        },
        {
          icon: "flame",
          name: "Fire Pits, Fireplaces & Outdoor Living",
          description: "Custom outdoor kitchens, fire pits, pergolas, and living spaces that make the most of Bend's spectacular outdoor lifestyle.",
        },
        {
          icon: "sun",
          name: "Xeriscaping & Native Plantings",
          description: "Water-wise landscape design using drought-tolerant plants suited to Bend's high-desert climate — beautiful and sustainable.",
        },
        {
          icon: "snowflake",
          name: "Snow Removal",
          description: "Commercial and residential snow plowing, de-icing, and ice management for Bend properties throughout the winter season.",
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
      nearbyAreas={["Tumalo", "Redmond", "Sisters", "Sunriver", "Powell Butte", "Eagle Crest"]}
      ctaNote="We respond within one business day and provide free on-site estimates for all Bend properties. Ask about our seasonal maintenance programs."
    />
  );
}
