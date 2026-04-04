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
    />
  );
}
