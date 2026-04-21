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
      seoTitle="Commercial Landscaping Bend Oregon | HOA & Office Park Maintenance | Newport Avenue"
      seoDescription="Commercial landscape maintenance for HOAs, office parks, and retail properties in Bend, Oregon. Weekly service, seasonal cleanups, and irrigation management. LCB #9153."
      heroImage="https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/hoa-central-oregon-aerial-FqxDA5HTtAdmvC4C8zTkoF.webp"
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
      galleryImages={[
        { src: "/manus-storage/safe-hero-lawn-service_fcba45d8.jpg", alt: "Commercial landscape maintenance crew in Central Oregon" },
        { src: "/manus-storage/safe-hero-lawn-service_fcba45d8.jpg", alt: "HOA common area landscaping maintenance in Bend Oregon" },
        { src: "/manus-storage/svc-commercial-maintenance-3_53381b96.jpg", alt: "Commercial property landscape maintenance in Central Oregon" },
      ]}
      schemaUrl="/services/commercial-maintenance"
      schemaName="Commercial Landscape Maintenance"
      schemaDescription="Commercial landscape maintenance for HOAs, office parks, and retail properties in Bend, Oregon."
      faqs={[
          { question: "Do you do commercial landscape maintenance in Bend?", answer: "Yes — Newport Avenue Landscaping provides full-service commercial landscape maintenance for HOAs, office parks, retail centers, medical facilities, and multi-family properties throughout Bend and Central Oregon. We offer customized maintenance programs with consistent crews and detailed service reports." },
          { question: "What is included in commercial landscape maintenance?", answer: "Our commercial programs typically include weekly or bi-weekly mowing and trimming, edging and blowing, seasonal color rotations, irrigation management and repairs, fertilization and weed control, fall cleanup, and snow removal. We tailor programs to each property's specific needs and budget." },
          { question: "How do you handle HOA landscape maintenance?", answer: "We work closely with HOA boards and property managers to develop maintenance specifications that meet community standards. We provide detailed service logs, respond quickly to resident concerns, and attend HOA meetings when requested. Our goal is to be a transparent, reliable partner for your community." },
          { question: "Do you provide snow removal for commercial properties in Bend?", answer: "Yes — we offer commercial snow removal and de-icing services for parking lots, walkways, and entryways. We use a combination of plowing, blowing, and de-icing treatments appropriate for Central Oregon conditions. Commercial snow removal contracts are available for the season." },
      ]}
    />
  );
}
