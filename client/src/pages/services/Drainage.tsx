import ServicePageLayout from "@/components/ServicePageLayout";

const relatedLinks = [
  { label: "Irrigation Systems", href: "/services/irrigation" },
  { label: "Retaining Walls", href: "/services/retaining-walls" },
  { label: "Landscape Design", href: "/services/landscape-design" },
];

const resourceLinks = [
  {
    label: "Drainage Solutions Cost in Bend",
    href: "/resources/drainage-solutions-cost-bend",
    description: "What drainage installation and correction costs in Central Oregon.",
  },
];

export default function Drainage() {
  return (
    <ServicePageLayout
      category="Design & Installation"
      title="Drainage Solutions"
      subtitle="Bend, Oregon"
      heroImage="https://newportavelandscaping.com/wp-content/uploads/2022/08/irrigation-sprinkler-system-bend-oregon.jpg"
      heroPosition="center 60%"
      intro="Water in the wrong place destroys landscapes, damages foundations, and creates liability. Newport Avenue diagnoses and corrects drainage problems throughout Central Oregon — from simple surface grading to engineered French drain systems and dry creek beds that double as landscape features."
      pricing={[
        { label: "Pricing", value: "Custom quote — contact us for an assessment" },
        { label: "Systems", value: "French drains, dry creek beds, catch basins, channel drains" },
        { label: "Service Area", value: "Bend, Redmond, Sisters, Sunriver & all of Central Oregon" },
      ]}
      sections={[
        {
          heading: "Drainage Assessment & Design",
          body: "We start every drainage project with a thorough site assessment — identifying where water enters, where it pools, and where it needs to go. Many drainage problems in Central Oregon stem from improper grading during original construction, or from irrigation systems that deliver more water than the soil can absorb.",
          list: [
            "Site assessment and water flow mapping",
            "Soil percolation testing",
            "Grading analysis and correction",
            "Integration with existing irrigation and landscape",
          ],
        },
        {
          heading: "French Drains & Subsurface Systems",
          body: [
            "A French drain is a perforated pipe surrounded by gravel that intercepts groundwater or surface runoff and redirects it to a safe discharge point. Properly installed, a French drain is invisible in the landscape and lasts for decades.",
            "We size and route French drain systems based on your site's specific water volume and soil conditions — not a one-size-fits-all approach.",
          ],
          accent: true,
        },
        {
          heading: "Dry Creek Beds & Surface Drainage",
          body: [
            "Dry creek beds solve drainage problems while adding a natural, attractive landscape feature. We design creek beds using locally sourced river rock and basalt that look like they belong in the Central Oregon landscape — because they do.",
            "Surface channel drains and catch basins are used where concentrated water flow requires a more engineered solution, such as driveway aprons, patio edges, and downspout discharge areas.",
          ],
        },
        {
          heading: "Foundation & Slope Protection",
          body: "Water pooling near your foundation is one of the most damaging and expensive problems a homeowner can face. We correct negative grade (ground that slopes toward the house), install window well drains, and route downspout extensions to keep water moving away from your structure.",
          list: [
            "Negative grade correction",
            "Downspout extension and discharge routing",
            "Window well drain installation",
            "Sump pump discharge management",
          ],
        },
      ]}
      relatedLinks={relatedLinks}
      resourceLinks={resourceLinks}
      schemaUrl="/services/drainage"
      schemaName="Drainage Solutions"
      schemaDescription="Drainage solutions and installation in Bend, Oregon. French drains, dry creek beds, catch basins, and grading correction for residential and commercial properties."
    />
  );
}
