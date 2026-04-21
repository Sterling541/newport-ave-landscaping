import ServicePageLayout from "@/components/ServicePageLayout";

const relatedLinks = [
  { label: "Lawn Service", href: "/services/lawn-service" },
  { label: "Aeration Services", href: "/services/aeration" },
  { label: "Snow Removal", href: "/services/snow-removal" },
  { label: "Spring Activation", href: "/services/sprinkler-activation" },
  { label: "Sprinkler Blowout", href: "/services/sprinkler-blowout" },
];

const resourceLinks = [
  {
    label: "Commercial Landscaping in Bend, OR",
    href: "/resources/commercial-landscaping-bend-oregon",
    description: "What commercial property maintenance costs and what to expect in Central Oregon.",
  },
  {
    label: "HOA Landscaping in Bend, OR",
    href: "/resources/bend-hoa-landscaping",
    description: "How HOA landscape contracts work and what to look for in a provider.",
  },
  {
    label: "Commercial Landscaping Cost in Bend, OR",
    href: "/resources/commercial-landscaping-cost-bend-oregon",
    description: "Pricing breakdown for commercial maintenance programs in Central Oregon.",
  },
];

export default function CommercialHOAMaintenance() {
  return (
    <ServicePageLayout
      category="Maintenance Services"
      title="Commercial & HOA"
      subtitle="Landscape Maintenance"
      seoTitle="Commercial & HOA Landscape Maintenance Bend Oregon | Newport Avenue Landscaping"
      seoDescription="Ongoing commercial and HOA landscape maintenance in Bend, Oregon. Weekly mowing, seasonal cleanups, irrigation management, and snow removal for office parks, retail centers, and master-planned communities. LCB #9153."
      heroImage="https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/hoa-central-oregon-aerial-FqxDA5HTtAdmvC4C8zTkoF.webp"
      heroPosition="center 55%"
      intro="Newport Avenue Landscaping maintains over 400 commercial properties across Bend and Central Oregon — from single-tenant office buildings to large master-planned communities. We partner with property managers, HOA boards, and commercial owners who need a reliable, professional team that shows up on schedule, communicates clearly, and delivers consistent results year-round."
      pricing={[
        { label: "Commercial Maintenance", value: "Custom bid — contact us" },
        { label: "HOA Community Programs", value: "Annual contract — contact us" },
        { label: "Seasonal Cleanup Add-ons", value: "Quoted per property" },
      ]}
      sections={[
        {
          heading: "What's Included in Our Maintenance Programs",
          body: "Every commercial and HOA maintenance contract is tailored to the property, but our standard programs cover all the essentials to keep your grounds looking sharp throughout the year:",
          list: [
            "Weekly or bi-weekly mowing, edging, and blowing",
            "Shrub and ornamental tree pruning",
            "Weed control and pre-emergent applications",
            "Seasonal fertilization and soil health programs",
            "Irrigation system monitoring and minor repairs",
            "Seasonal color rotations and annual bed maintenance",
            "Fall cleanup and leaf removal",
            "Snow and ice management (commercial contracts available)",
          ],
        },
        {
          heading: "HOA Landscape Management",
          body: [
            "Homeowner Associations in Central Oregon trust Newport Avenue because we understand the unique pressures of community management — consistent appearance standards, responsive communication with boards and residents, and the ability to scale service as communities grow.",
            "We attend HOA board meetings when requested, provide detailed service logs, and respond quickly to resident concerns. Our dedicated account managers ensure nothing falls through the cracks.",
          ],
          accent: true,
        },
        {
          heading: "Property Types We Serve",
          body: "Our commercial maintenance teams are equipped and staffed to handle properties of any size and complexity:",
          list: [
            "Homeowner Associations (HOA) and master-planned communities",
            "Office parks and corporate campuses",
            "Retail centers and shopping plazas",
            "Medical facilities and professional buildings",
            "Resort destinations and vacation rental communities",
            "Multi-family apartment and condominium complexes",
            "Public parks and streetscapes",
            "Slopes, hillsides, and challenging terrain",
          ],
        },
        {
          heading: "Why Property Managers Choose Newport Avenue",
          body: [
            "Since 2005, we've built lasting relationships with the major property management companies throughout Central Oregon. Our reputation is built on three things: we show up when we say we will, we do what we say we'll do, and we communicate proactively when anything changes.",
            "With 150+ team members and a full fleet of commercial-grade equipment, we have the capacity to handle your largest properties without sacrificing the attention to detail that sets us apart. References from current commercial clients are available upon request.",
          ],
        },
      ]}
      relatedLinks={relatedLinks}
      resourceLinks={resourceLinks}
      galleryImages={[
        { src: "/manus-storage/svc-commercial-maintenance-1_e6aa6c1e.jpg", alt: "Commercial landscape maintenance crew mowing and trimming office park in Bend Oregon" },
        { src: "/manus-storage/svc-commercial-maintenance-2_1c6f0968.jpg", alt: "Newport Avenue team maintaining commercial property grounds in Central Oregon" },
        { src: "/manus-storage/svc-commercial-maintenance-3_0862cdb4.jpg", alt: "HOA community entrance landscaping maintained by Newport Avenue in Bend Oregon" },
      ]}
      schemaUrl="/maintenance/commercial-hoa"
      schemaName="Commercial & HOA Landscape Maintenance"
      schemaDescription="Ongoing commercial and HOA landscape maintenance in Bend, Oregon. Weekly mowing, seasonal cleanups, irrigation management, and snow removal."
      faqs={[
        {
          question: "Do you offer ongoing commercial landscape maintenance contracts in Bend?",
          answer: "Yes — we specialize in annual commercial landscape maintenance contracts for office parks, retail centers, HOAs, and multi-family properties throughout Bend and Central Oregon. We build a custom maintenance program around your property's specific needs and budget, then assign a consistent crew and account manager to your account.",
        },
        {
          question: "How do you handle HOA landscape maintenance?",
          answer: "We work directly with HOA boards and property managers to develop maintenance specifications that meet community standards. We provide detailed service logs after every visit, respond quickly to resident concerns, and attend board meetings when requested. Our goal is to be a transparent, reliable partner — not just a vendor.",
        },
        {
          question: "What is included in a commercial landscape maintenance program?",
          answer: "Our commercial programs typically include weekly or bi-weekly mowing and trimming, edging and blowing, seasonal color rotations, irrigation monitoring and minor repairs, fertilization and weed control, fall cleanup, and snow removal. We tailor every program to the property and review it annually with the client.",
        },
        {
          question: "Do you provide snow removal for commercial properties?",
          answer: "Yes — we offer commercial snow removal and de-icing for parking lots, walkways, and entryways throughout Central Oregon. Seasonal commercial snow contracts are available and highly recommended given Bend's unpredictable winter weather. We use a combination of plowing, blowing, and de-icing treatments appropriate for each property type.",
        },
        {
          question: "How do I get a bid for commercial landscape maintenance?",
          answer: "Contact us through our website or call our office to schedule a property walkthrough. We'll assess the scope of work, discuss your expectations and budget, and provide a written proposal within a few business days. For large HOA or multi-property portfolios, we can often provide a preliminary range estimate before the walkthrough.",
        },
      ]}
    />
  );
}
