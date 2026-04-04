import CityPageLayout, { type CityService } from "@/components/CityPageLayout";

const SunriverPage = () => {
  const services: CityService[] = [
    {
      icon: "maintenance",
      name: "Custom Landscape Design",
      description: "We craft bespoke landscape designs that integrate seamlessly with Sunriver's natural aesthetic and HOA guidelines. Our designs enhance property value and outdoor enjoyment for both residents and vacationers.",
    },
    {
      icon: "sprinklers",
      name: "Efficient Irrigation Systems",
      description: "Given Sunriver's high-desert climate, water-wise irrigation is crucial for maintaining lush landscapes. We design, install, and maintain efficient systems tailored to Sunriver's specific environmental needs, ensuring optimal plant health with minimal water usage.",
    },
    {
      icon: "design",
      name: "Year-Round Property Maintenance",
      description: "From spring clean-ups to winter preparation, our comprehensive maintenance services keep Sunriver properties immaculate throughout the seasons. We ensure landscapes remain vibrant and well-kept, meeting the high expectations of this resort community.",
    },
    {
      icon: "outdoor",
      name: "Outdoor Living Spaces",
      description: "Enhance your Sunriver experience with custom outdoor living areas, including patios, fire pits, and entertainment zones. We create inviting spaces perfect for enjoying the unique outdoor lifestyle of this resort community.",
    },
    {
      icon: "architecture",
      name: "Native & Drought-Tolerant Plantings",
      description: "We specialize in selecting and installing plants that thrive in Sunriver's specific climate and soil conditions. Our focus on native and drought-tolerant species ensures beautiful, sustainable landscapes that require less water and maintenance.",
    },
    {
      icon: "commercial",
      name: "HOA Compliance & Consulting",
      description: "Navigating Sunriver's HOA regulations can be complex; we offer expert consulting and ensure all landscape projects meet community standards. Our experience guarantees a smooth process and results that exceed expectations while adhering to guidelines.",
    },
  ];

  const whyUs = [
    "Deep understanding of Sunriver's unique resort environment and HOA requirements",
    "Expertise in designing and maintaining landscapes that complement the ponderosa pine forest setting",
    "Commitment to water-wise and sustainable landscaping practices ideal for the high-desert climate",
    "Proven track record of delivering high-quality results for vacation rentals and full-time residences",
    "Dedicated team familiar with the specific needs of Sunriver's discerning property owners",
    "Comprehensive year-round services to keep properties pristine in every season",
  ];

  const nearbyAreas = [
    { label: "Bend", href: "/landscaping/bend" },
    { label: "La Pine", href: "/landscaping/la-pine" },
    { label: "Sisters", href: "/landscaping/sisters" },
    { label: "Redmond", href: "/landscaping/redmond" },
    { label: "Tumalo", href: "/landscaping/tumalo" },
  ];

  return (
    <CityPageLayout
      city="Sunriver"
      region="Central Oregon"
      heroImage="https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportLandscapingRVParkDay2Photos25_79f2b575.jpg"
      heroPosition="center 60%"
      tagline="Elevating Sunriver Outdoor Living"
      seoTitle="Landscaping Company Sunriver Oregon | Newport Avenue Landscaping"
      seoDescription="Sunriver's trusted landscaping company. Lawn care, irrigation, landscape design & HOA-compliant landscaping in Sunriver, OR. Licensed & Bonded LCB #9153. Free estimates."
      canonicalPath="/landscaping/sunriver"
      intro="Newport Avenue Landscaping is proud to serve the discerning community of Sunriver, bringing unparalleled expertise to its unique resort environment. We specialize in creating and maintaining landscapes that complement Sunriver's natural beauty, from vacation rentals to full-time residences, ensuring every property reflects the area's high standards."
      communityNote="Sunriver's distinctive ponderosa pine forest setting, coupled with its focus on vacation rentals and HOA-managed properties, demands a sophisticated approach to landscaping. Our team understands the specific requirements for maintaining pristine outdoor spaces that thrive in this high-desert resort climate."
      services={services}
      whyUs={whyUs}
      nearbyAreas={nearbyAreas}
      ctaNote="Ready to transform your Sunriver property? Contact Newport Avenue Landscaping today for a consultation and discover the difference professional care can make in this unique resort community."
      faqs={[
        {
          question: "Does Newport Avenue Landscaping serve Sunriver, Oregon?",
          answer: "Yes. Newport Avenue Landscaping serves Sunriver and the surrounding resort communities. We specialize in HOA-compliant landscaping, vacation rental property maintenance, irrigation, and landscape design for Sunriver's unique ponderosa pine environment.",
        },
        {
          question: "Do you handle HOA landscaping requirements in Sunriver?",
          answer: "Yes — we are experienced with Sunriver's HOA guidelines and ensure all landscape work meets community standards. We handle the approval process and coordinate with HOA management on your behalf.",
        },
      ]}
    />
  );
};

export default SunriverPage;
