import ServicePageLayout from "@/components/ServicePageLayout";

const relatedLinks = [
  { label: "Commercial Maintenance", href: "/services/commercial-maintenance" },
  { label: "Aeration Services", href: "/services/aeration" },
  { label: "Irrigation Installation", href: "/services/irrigation" },
  { label: "Snow Removal", href: "/services/snow-removal" },
];

const resourceLinks = [
  {
    label: "Lawn Maintenance Cost in Bend, OR",
    href: "/resources/lawn-maintenance-cost-bend-oregon",
    description: "What lawn care and maintenance services cost in Central Oregon.",
  },
  {
    label: "When to Aerate Your Lawn in Bend",
    href: "/resources/when-to-aerate-lawn-bend-oregon",
    description: "Best timing for aeration in Central Oregon's high desert climate.",
  },
  {
    label: "Sod Installation Cost in Bend",
    href: "/resources/sod-installation-cost-bend-oregon",
    description: "Pricing for sod installation and lawn renovation in Bend.",
  },
];

export default function LawnService() {
  return (
    <ServicePageLayout
      category="Maintenance Services"
      title="Residential Lawn Service"
      subtitle="Bend, Oregon"
      seoTitle="Lawn Care Bend Oregon | Weekly Lawn Mowing & Maintenance Service | Newport Avenue"
      seoDescription="Weekly lawn mowing, edging, and maintenance in Bend, Oregon. From $97/service. Fertilization, weed control, and seasonal cleanups. Serving Bend since 2010. LCB #9153."
      heroImage="https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/QuZbCMdvWnmWDtAV.jpg"
      heroPosition="center 60%"
      intro="Since 2005, we've provided lawn care and landscape maintenance for thousands of homes located throughout Bend, Redmond, Sisters, and the broader Central Oregon area. From La Pine to Madras and from Prineville to Sisters, our gardeners can be seen beautifying landscapes."
      pricing={[
        { label: "Service Rate", value: "$95 / man hour" },
        { label: "Contract", value: "Seasonal (March – November)" },
        { label: "Frequency", value: "Weekly" },
      ]}
      sections={[
        {
          heading: "One Premium Weekly Service",
          body: [
            "We only offer one — the best — weekly lawn and landscape maintenance service to ensure your home stays looking its best.",
            "Broken Top, Awbrey Butte, NorthWest Crossing, Discovery West — all communities that expect the best. On any given weekday our trucks are seen not only in these neighborhoods but throughout Central Oregon where people really care about their yard.",
          ],
        },
        {
          heading: "What's Included",
          body: "Our all-inclusive weekly lawn service covers everything your property needs:",
          list: [
            "Weekly mowing",
            "Weekly hardscape blowing (patios, walkways, small driveways, decks, etc.)",
            "Weekly trash & debris removal",
            "Weekly sprinkler system monitoring",
            "Bi-weekly edging",
            "Bi-weekly pruning (trees, shrubs, hedges, etc.)",
            "Pre/post emergent weed control",
            "Seasonal plant fertilization",
            "Three seasonal lawn fertilizations",
          ],
          accent: false,
        },
        {
          heading: "Why Weekly Only?",
          body: [
            "Three words: Standard of Quality.",
            "We simply cannot be proud of the way your yard looks if we come out every two, three, or four weeks. Grass and weeds grow too fast in the summer.",
            "At the end of the day, we would rather work with customers that want the best for their yards and homes. That is our philosophy — and that attitude has helped us thrive since 2005.",
          ],
          accent: true,
        },
        {
          heading: "Service Area",
          body: "We service residential properties throughout Central Oregon:",
          list: [
            "Bend — all neighborhoods including Broken Top, Awbrey Butte, NW Crossing, Discovery West",
            "Redmond",
            "Sisters",
            "Sunriver",
            "La Pine",
            "Madras",
            "Prineville",
          ],
        },
      ]}
      relatedLinks={relatedLinks}
      resourceLinks={resourceLinks}
      schemaUrl="/services/lawn-service"
      schemaName="Lawn Maintenance Service"
      schemaDescription="Weekly and bi-weekly lawn maintenance in Bend, Oregon. Mowing, edging, blowing, fertilization, and weed control."
      faqs={[
          { question: "How much does lawn service cost in Bend, Oregon?", answer: "Residential lawn maintenance in Bend typically starts at $45–$65 per visit for a standard-sized yard, with pricing based on lot size, frequency, and services included. We offer weekly and bi-weekly schedules. Commercial properties are priced by square footage and scope. Contact us for a free quote." },
          { question: "What is included in your lawn maintenance service?", answer: "Our standard lawn maintenance includes mowing at the correct height for your grass type, string trimming around obstacles and edges, edging along hard surfaces, and blowing clippings off driveways and walkways. We also offer add-on services including fertilization, weed control, aeration, and overseeding." },
          { question: "Do you offer year-round lawn service in Bend?", answer: "Yes — we offer year-round maintenance programs. In summer, we focus on mowing, watering, and fertilization. In fall, we add leaf cleanup and aeration. In winter, we offer cleanup and preparation services. Spring service includes dethatching, fertilization, and pre-emergent weed control." },
          { question: "What type of grass grows best in Bend?", answer: "Central Oregon's high desert climate is best suited to cool-season grasses. Kentucky bluegrass and tall fescue are the most common lawn grasses in Bend. They thrive in our spring and fall conditions but require supplemental irrigation during our dry summers. We can advise on the best grass mix for your specific site conditions and water budget." },
      ]}
    />
  );
}
