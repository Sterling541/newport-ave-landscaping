import ServicePageLayout from "@/components/ServicePageLayout";

const relatedLinks = [
  { label: "Lawn Service", href: "/services/lawn-service" },
  { label: "Commercial Maintenance", href: "/services/commercial-maintenance" },
  { label: "Irrigation Installation", href: "/services/irrigation" },
  { label: "Snow Removal", href: "/services/snow-removal" },
];

const resourceLinks = [
  {
    label: "When to Aerate Your Lawn in Bend",
    href: "/resources/when-to-aerate-lawn-bend-oregon",
    description: "Best timing for aeration in Central Oregon's high desert climate.",
  },
  {
    label: "Lawn Maintenance Cost in Bend, OR",
    href: "/resources/lawn-maintenance-cost-bend-oregon",
    description: "What lawn care and maintenance services cost in Central Oregon.",
  },
];

export default function Aeration() {
  return (
    <ServicePageLayout
      category="Maintenance Services"
      title="Aeration Services"
      subtitle="Bend, Oregon"
      seoTitle="Lawn Aeration Bend Oregon | Core Aeration & Overseeding | Newport Avenue"
      seoDescription="Professional lawn aeration and overseeding in Bend, Oregon. Relieve soil compaction, improve water penetration, and thicken your turf. From $97/service. LCB #9153."
      heroImage="/manus-storage/safe-hero-aeration_742c2b11.jpg"
      heroPosition="center 40%"
      intro="Aeration is the process of taking small plugs or cores — usually one to six inches long — out of the lawn. Over time, the soil under your grass compacts, making it difficult for the lawn roots to breathe, feed, and grow. Plug Aeration is used to increase the health of the lawn by decompacting the soil and also helps manage or eradicate fungus and other lawn diseases."
      pricing={[
        { label: "Starting Rate", value: "$195 (first hour)" },
        { label: "Additional Time", value: "$95 / man hour" },
        { label: "Recommended Frequency", value: "Twice per season" },
      ]}
      sections={[
        {
          heading: "What Is Aeration?",
          body: "Aeration is essential to maintaining a healthy lawn. As lawns age, soil compacts, reducing the pores or pockets of oxygen needed for roots to breathe, absorb nutrients and water, and grow. Soil compaction also reduces micro-organism abundance and health.",
        },
        {
          heading: "Benefits of Aeration",
          body: "Core Aeration provides four key benefits for your Central Oregon lawn:",
          list: [
            "Reduces the density of the soil — a nice lawn starts with the soil base. Before grass is planted, the soil is compacted to make a firm base for planting. As time increases, settling and water further compact the soil making root growth more difficult.",
            "Reduces thatch build-up — thatch is a layer of organic matter that accumulates on a lawn around the base of the grass. Thatch acts like a sponge and keeps moisture from getting to the roots; it also enables fungus, dandelions, clover, and crab grass to more easily infect your lawn.",
            "Reduces the amount of water and fertilizer needed — as plugs are taken from the soil, space is opened enabling water, nutrients, and fertilizer to more easily reach the roots.",
            "Eradicates or helps manage fungus and other lawn diseases.",
          ],
        },
        {
          heading: "Our Aeration Process",
          body: [
            "On our first trip to your home, we'll check the soil to understand your lawn's soil density and composition. This gives us a better understanding of how many passes we will need to make with the Aerator or if your lawn even needs aeration.",
            "Next, we'll identify your sprinkler head locations so we don't puncture them with the Aerator. We'll flag each head as necessary and then go to work aerating.",
            "After the Aeration, if you're interested, we can re-seed your lawn (recommended) for the cost of the seed. Seed typically costs $15–$150/bag depending on the type of grass seed and size of the bag.",
          ],
          accent: true,
        },
        {
          heading: "How Often Should You Aerate?",
          body: [
            "Especially for older lawns, aerating is highly recommended twice per season — once in the Spring and once in the Fall. Over the course of a Spring and Summer season, root growth and soil compaction increase, thus necessitating an Aeration in the Fall.",
            "Additionally, the Winter brings snow, rain, and further thatch buildup. By the time Spring rolls around, we want to provide optimal growing conditions for the lawn; thus the need for Aeration in the Spring.",
            "In Bend, Oregon we have a lot of ponderosa and lodgepole pine trees which produce needles which in turn alters the pH of your lawn's soil — another reason regular aeration is especially important here.",
          ],
        },
      ]}
      relatedLinks={relatedLinks}
      resourceLinks={resourceLinks}
      galleryImages={[
        { src: "/manus-storage/svc-aeration-1_afc106ab.jpg", alt: "Lawn aeration service on residential property in Bend Oregon" },
        { src: "/manus-storage/svc-aeration-2_a1ab0a1c.jpg", alt: "Core aeration machine on green lawn in Central Oregon" },
        { src: "/manus-storage/safe-hero-aeration_742c2b11.jpg", alt: "Lawn aeration and overseeding service in Bend Oregon" },
      ]}
      schemaUrl="/services/aeration"
      schemaName="Lawn Aeration Service"
      schemaDescription="Core aeration and overseeding in Bend, Oregon. Improve soil compaction, water penetration, and lawn health."
      ctaSecondaryHref="/maintenance/sign-up"
      ctaSecondaryLabel="SIGN UP FOR MAINTENANCE"
      faqs={[
          { question: "When is the best time to aerate a lawn in Bend, Oregon?", answer: "The best time to aerate in Central Oregon is early fall (late August through September), when cool-season grasses like Kentucky bluegrass and tall fescue are actively growing and can recover quickly before winter. Spring aeration (late April through May) is also effective after the ground thaws. Avoid aerating during summer heat stress (July–August) or when the ground is frozen. Newport Avenue Landscaping schedules aeration appointments throughout the Bend area — call (541) 617-8873 to book." },
          { question: "How much does lawn aeration cost in Bend, Oregon?", answer: "Core aeration in Bend, OR typically costs $85–$175 for a standard residential lawn (5,000–10,000 sq ft). Larger properties (10,000–20,000 sq ft) run $150–$275. We recommend combining aeration with overseeding for maximum benefit — the open cores provide ideal seed-to-soil contact for germination. Aeration + overseeding packages start at $175 for most Bend residential lawns." },
          { question: "How often should I aerate my lawn in Central Oregon?", answer: "Most Bend lawns benefit from annual core aeration, especially those with heavy clay or volcanic soil, high foot traffic, or thinning grass. Lawns with sandy or loamy soil may only need aeration every 2 years. Signs your Bend lawn needs aeration: water pools on the surface after irrigation, soil feels hard when you push a screwdriver in, or grass is thin despite regular fertilization and watering." },
          { question: "What is the difference between core aeration and spike aeration?", answer: "Core aeration (also called plug aeration) removes small 2–3 inch plugs of soil from the lawn, creating open channels for air, water, and nutrients to reach root zones. Spike aeration simply punches holes without removing soil — this can actually increase compaction over time by compressing soil sideways. Newport Avenue Landscaping uses core aeration equipment exclusively for the best long-term results." },
          { question: "Should I overseed after aeration in Bend?", answer: "Yes — overseeding immediately after aeration is highly recommended for Bend lawns. The open aeration holes provide direct seed-to-soil contact, dramatically improving germination rates compared to overseeding on an un-aerated lawn. We recommend a Kentucky bluegrass or tall fescue blend suited to Central Oregon's climate. Keep the seeded area consistently moist for 2–3 weeks after seeding for best results." },
          { question: "Do you offer aeration services in Redmond and Sisters, Oregon?", answer: "Yes — Newport Avenue Landscaping provides lawn aeration and overseeding throughout Central Oregon including Bend, Redmond, Tumalo, Sisters, and Sunriver. We are a licensed Oregon LCB contractor (#9153) with dedicated lawn care crews serving the entire Deschutes County area. Contact us in August or early September to schedule your fall aeration appointment before our schedule fills." },
      ]}
    />
  );
}
