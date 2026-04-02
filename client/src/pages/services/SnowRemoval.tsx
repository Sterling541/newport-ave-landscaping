import ServicePageLayout from "@/components/ServicePageLayout";

const relatedLinks = [
  { label: "Commercial Maintenance", href: "/services/commercial-maintenance" },
  { label: "Lawn Service", href: "/services/lawn-service" },
  { label: "Sprinkler Blowout", href: "/services/sprinkler-blowout" },
];

export default function SnowRemoval() {
  return (
    <ServicePageLayout
      category="Maintenance Services"
      title="Snow Removal"
      subtitle="Bend, Oregon"
      heroImage="https://newportavelandscaping.com/wp-content/uploads/2022/08/winter-snow-blowing-in-central-oregon.jpg"
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
    />
  );
}
