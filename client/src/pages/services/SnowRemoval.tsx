import ServicePageLayout from "@/components/ServicePageLayout";

const relatedLinks = [
  { label: "Commercial Maintenance", href: "/services/commercial-maintenance" },
  { label: "Lawn Service", href: "/services/lawn-service" },
  { label: "Sprinkler Blowout", href: "/services/sprinkler-blowout" },
];

const resourceLinks = [
  {
    label: "Snow Removal in Bend, OR",
    href: "/resources/snow-removal-bend-oregon",
    description: "What commercial and residential snow removal costs in Central Oregon.",
  },
];

export default function SnowRemoval() {
  return (
    <ServicePageLayout
      category="Maintenance Services"
      title="Snow Removal"
      subtitle="Bend, Oregon"
      seoTitle="Snow Removal Bend Oregon | Residential & Commercial Snow Plowing | Newport Avenue"
      seoDescription="Residential and commercial snow removal in Bend, Oregon. Driveway plowing, walkway clearing, and de-icing. Seasonal contracts and on-call service. LCB #9153."
      heroImage="https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/safe-hero-snow-removal-8bvRUVNaktQ64hEuSg9a2q.webp"
      heroPosition="center 50%"
      intro="Inevitably, Central Oregon gets snow each year — sometimes a foot and sometimes seven. Regardless, we can help you alleviate snow problems by plowing your driveway or your commercial parking lot, letting you or your customers get to where you need to go while removing some of the risk of traversing in snowy conditions."
      pricing={[
        { label: "Pricing", value: "Custom quote (residential & commercial)" },
        { label: "Trigger Depth", value: "2 inches or more" },
      ]}
      sections={[
        {
          heading: "Snow Removal Service",
          body: "We'll fire up the plows if it has snowed at least two inches. Our service covers driveways, parking lots, main sidewalks, and walkways — plus de-icing treatment where needed.",
          list: [
            "Plowing snow on driveways and parking lots",
            "Plowing on main sidewalks and walkways",
            "Laying down salt or deicer on walkways",
          ],
        },
        {
          heading: "Residential & Commercial",
          body: [
            "Cost varies between residential and commercial accounts and depends on the amount of time needed to clear the snow. Given the customization required for each property, please contact us for a quote.",
            "We have the equipment to handle residential driveways and commercial parking lots of any size throughout Central Oregon.",
          ],
          accent: true,
        },
        {
          heading: "City of Bend Snow Removal Policy",
          body: [
            "Please be advised that the City of Bend has a residential and commercial snow removal policy in which residents have 24 hours to remove fallen snow and businesses have six hours.",
            "Don't risk a fine or a slip-and-fall liability — let our team handle it promptly and professionally.",
          ],
        },
      ]}
      relatedLinks={relatedLinks}
      resourceLinks={resourceLinks}
      galleryImages={[
        { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/safe-hero-snow-removal-8bvRUVNaktQ64hEuSg9a2q.webp", alt: "Snow removal crew clearing driveway in Bend Oregon winter" },
        { src: "/manus-storage/svc-snow-removal-2_b13465fa.jpg", alt: "Commercial snow plowing service in Central Oregon" },
        { src: "/manus-storage/svc-snow-removal-3_05b59986.jpg", alt: "Residential snow removal and de-icing in Bend Oregon" },
      ]}
      schemaUrl="/services/snow-removal"
      schemaName="Snow Removal"
      schemaDescription="Residential and commercial snow removal in Bend, Oregon. Driveway plowing, walkway clearing, and de-icing."
      faqs={[
          { question: "Do you do residential snow removal in Bend?", answer: "Yes — we offer residential snow removal for driveways, walkways, and entryways in Bend and surrounding areas. We offer both seasonal contracts and per-event service. Seasonal contracts provide priority scheduling and predictable costs." },
          { question: "How much does snow removal cost in Bend?", answer: "Residential snow removal pricing depends on driveway size and service type. Per-event driveway clearing typically starts at $50–$100 for a standard residential driveway. Seasonal contracts are priced based on your property's square footage and the scope of service. Contact us for a custom quote." },
          { question: "When do you start snow removal after a storm?", answer: "For seasonal contract customers, we begin service when snowfall reaches a trigger depth (typically 2 inches) and continue until all contracted areas are cleared. We work through the night and early morning to ensure driveways and walkways are clear before the morning commute." },
          { question: "Do you use salt or sand for de-icing?", answer: "We use a combination of products depending on conditions and surface type. Concrete and pavers can be damaged by rock salt, so we use calcium chloride or magnesium chloride blends that are effective at lower temperatures and less damaging to surfaces. We also use sand for traction on steep driveways." },
      ]}
    />
  );
}
