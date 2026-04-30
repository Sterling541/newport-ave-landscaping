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
      heroImage="/manus-storage/safe-hero-snow-removal_64a25ebe.jpg"
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
        { src: "/manus-storage/safe-hero-snow-removal_64a25ebe.jpg", alt: "Snow removal crew clearing driveway in Bend Oregon winter" },
        { src: "/manus-storage/svc-snow-removal-2_0476600c.jpg", alt: "Commercial snow plowing service in Central Oregon" },
        { src: "/manus-storage/svc-snow-removal-3_a6dd06ac.jpg", alt: "Residential snow removal and de-icing in Bend Oregon" },
      ]}
      schemaUrl="/services/snow-removal"
      canonicalUrl="https://www.newportavelandscaping.com/resources/snow-removal-bend-oregon"
      schemaName="Snow Removal"
      schemaDescription="Residential and commercial snow removal in Bend, Oregon. Driveway plowing, walkway clearing, and de-icing."
      faqs={[
          { question: "Do you offer residential snow removal in Bend, Oregon?", answer: "Yes — Newport Avenue Landscaping provides residential snow removal for driveways, walkways, and entryways throughout Bend, Redmond, and surrounding Central Oregon communities. We offer seasonal contracts (priority scheduling, predictable costs) and per-event service. We are fully licensed (LCB #9153), insured, and have served Bend homeowners since 2005. Call (541) 617-8873 to get on our route before the season fills." },
          { question: "How much does snow removal cost in Bend, Oregon?", answer: "Per-event residential driveway clearing in Bend starts at $65–$120 for a standard single-car driveway, depending on snowfall depth and driveway length. Seasonal contracts are priced by property square footage and service scope — most residential seasonal contracts run $400–$900 for a full Bend winter. Commercial properties and HOAs are priced by lot size and service frequency. Contact Newport Avenue Landscaping for a free custom quote." },
          { question: "When does Newport Avenue Landscaping start snow removal after a storm?", answer: "For seasonal contract customers, we begin service when snowfall reaches our trigger depth (typically 2 inches) and work continuously until all contracted properties are cleared. We operate 24/7 during active snow events, including overnight and early morning service so driveways are clear before the morning commute. Contract customers receive priority over per-event calls during heavy storm periods." },
          { question: "What de-icing products do you use on pavers and concrete in Bend?", answer: "We tailor de-icing products to your surface type. Rock salt (sodium chloride) is cost-effective but can damage concrete, pavers, and nearby plants. For paver patios, stamped concrete, and landscaped areas, we use calcium chloride or magnesium chloride blends that work at lower temperatures (down to -25°F) with less surface and plant damage. We also use sand for traction on steep driveways and icy walkways." },
          { question: "Do you offer commercial snow removal in Bend and Redmond?", answer: "Yes — Newport Avenue Landscaping provides commercial snow removal for office parks, retail centers, HOAs, and multi-family properties throughout Bend, Redmond, and Deschutes County. We use a fleet of plows, skid steers, and salt spreaders to handle large parking lots and access roads. We offer seasonal contracts with guaranteed response times and 24/7 emergency service during major storm events." },
          { question: "How early should I schedule snow removal service in Bend?", answer: "We recommend scheduling your seasonal snow removal contract in September or October, before the first snowfall. Our route capacity fills quickly each fall — clients who wait until November or December often cannot be accommodated. Per-event service is available on a first-come, first-served basis but response times are longer during major storms. Call (541) 617-8873 in early fall to secure your spot." },
      ]}
    />
  );
}
