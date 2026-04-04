import ServicePageLayout from "@/components/ServicePageLayout";

const relatedLinks = [
  { label: "Lawn Service", href: "/services/lawn-service" },
  { label: "Aeration Services", href: "/services/aeration" },
  { label: "Snow Removal", href: "/services/snow-removal" },
  { label: "Irrigation Installation", href: "/services/irrigation" },
];

const resourceLinks = [
  {
    label: "Commercial Landscaping in Bend, OR",
    href: "/resources/commercial-landscaping-bend-oregon",
    description: "What commercial property maintenance costs and what to expect.",
  },
  {
    label: "Lawn Maintenance Cost in Bend, OR",
    href: "/resources/lawn-maintenance-cost-bend-oregon",
    description: "What lawn care and maintenance services cost in Central Oregon.",
  },
  {
    label: "Snow Removal in Bend, OR",
    href: "/resources/snow-removal-bend-oregon",
    description: "What commercial and residential snow removal costs in Central Oregon.",
  },
];

export default function CommercialMaintenance() {
  return (
    <ServicePageLayout
      category="Commercial Services"
      title="Commercial Landscape"
      subtitle="Maintenance"
      heroImage="https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/ambqMQAjmNxaGfTz.jpg"
      heroPosition="center 60%"
      intro="We provide lawn care for over 400 commercial properties in Bend, Oregon and the surrounding areas. We work with businesses, property management companies, HOAs, and private investors and have relationships with most of the major players in property management throughout Central Oregon. References provided upon request."
      sections={[
        {
          heading: "Commercial Capabilities",
          body: "Our commercial maintenance teams are equipped to handle properties of any size and complexity:",
          list: [
            "Homeowner Associations (HOA)",
            "Commercial Properties",
            "Resort Destinations",
            "Public Parks",
            "Malls & Shopping Centers",
            "Streetscapes",
            "Slopes & Hillsides",
            "Master Planned Communities",
          ],
        },
        {
          heading: "HOA Landscape Management",
          body: [
            "We specialize in HOA landscape management throughout Central Oregon. Our teams understand the unique requirements of community associations — consistent appearance standards, responsive communication, and reliable scheduling.",
            "With a team of 150+ professionals, we have the capacity to maintain large HOA communities without sacrificing quality or attention to detail.",
          ],
          accent: true,
        },
        {
          heading: "Commercial Services Offered",
          body: "Our commercial maintenance program includes a full suite of services:",
          list: [
            "Weekly mowing and edging",
            "Shrub and tree pruning",
            "Weed control and pre-emergent application",
            "Seasonal fertilization programs",
            "Irrigation monitoring and management",
            "Seasonal color installation",
            "Snow and ice management",
            "Water consultation and conservation management",
          ],
        },
        {
          heading: "Why Choose Newport Avenue?",
          body: [
            "Since 2005, we've built lasting relationships with property managers, HOA boards, and commercial property owners across Central Oregon. Our reputation is built on reliability, quality, and responsive communication.",
            "With 150+ team members and a fleet of professional equipment, we have the scale to handle your largest properties while maintaining the attention to detail that smaller companies can't match.",
          ],
        },
      ]}
      relatedLinks={relatedLinks}
      resourceLinks={resourceLinks}
    />
  );
}
