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
      heroImage="/manus-storage/safe-hero-lawn-service_fcba45d8.jpg"
      heroPosition="center 40%"
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
      galleryImages={[
        { src: "/manus-storage/safe-hero-lawn-service_fcba45d8.jpg", alt: "Lawn mowing service on manicured residential lawn in Bend Oregon" },
        { src: "/manus-storage/svc-lawn-service-2_db85e3e7.jpg", alt: "Lawn care crew maintaining landscape in Central Oregon" },
        { src: "/manus-storage/safe-hero-aeration_742c2b11.jpg", alt: "Freshly mowed and edged lawn in Bend Oregon neighborhood" },
      ]}
      schemaUrl="/services/lawn-service"
      schemaName="Lawn Maintenance Service"
      schemaDescription="Weekly and bi-weekly lawn maintenance in Bend, Oregon. Mowing, edging, blowing, fertilization, and weed control."
      faqs={[
          { question: "How much does lawn service cost in Bend, Oregon?", answer: "Residential lawn maintenance in Bend, OR starts at $55–$75 per visit for a typical 5,000–10,000 sq ft yard on a weekly or bi-weekly schedule. Larger properties (10,000–20,000 sq ft) typically run $75–$120 per visit. Pricing depends on lot size, terrain, frequency, and add-on services. Newport Avenue Landscaping provides free quotes — call (541) 617-8873 or submit a request online." },
          { question: "What is included in Newport Avenue Landscaping's lawn maintenance service?", answer: "Our standard lawn maintenance visits include mowing at the correct height for your grass type, string trimming around all obstacles (fences, beds, trees), edging along driveways, sidewalks, and curbs, and blowing all clippings off hard surfaces. We also offer add-on services: fertilization programs, pre-emergent and post-emergent weed control, aeration, overseeding, and fungus treatment." },
          { question: "Do you offer weekly lawn service in Bend and Redmond, Oregon?", answer: "Yes — Newport Avenue Landscaping provides weekly and bi-weekly residential lawn maintenance throughout Bend, Redmond, Tumalo, Sisters, and Sunriver. We run dedicated crews in each area on consistent day routes so you always know when to expect us. We are fully licensed (LCB #9153), insured, and have served Central Oregon homeowners since 2005." },
          { question: "What type of grass grows best in Bend, Oregon?", answer: "Central Oregon's high desert climate (elevation 3,600 ft, 11 inches of annual rainfall) is best suited to cool-season grasses. Kentucky bluegrass and tall fescue are the most common choices in Bend — they green up well in spring and fall but need consistent irrigation during our dry summers (June–September). We recommend against warm-season grasses like Bermuda or zoysia, which do not survive Bend winters." },
          { question: "When should I start lawn service in Bend each spring?", answer: "In Bend, lawn service typically begins in late April or early May, once nighttime temperatures stay consistently above 35°F and grass begins active growth. We recommend a spring cleanup visit in April (dethatching, fertilization, pre-emergent weed control) followed by regular mowing starting in May. Our crews are fully booked by mid-April each year — we recommend scheduling your spring service in February or March." },
          { question: "Do you treat lawn fungus in Bend, Oregon?", answer: "Yes — lawn fungus is common in Central Oregon due to irrigation patterns and temperature swings. We treat necrotic ring spot, dollar spot, and other fungal diseases with targeted fungicide applications. Our technicians identify the specific fungus type before treating to ensure the right product is used. Early treatment in spring and fall prevents spread and protects your lawn investment." },
      ]}
    />
  );
}
