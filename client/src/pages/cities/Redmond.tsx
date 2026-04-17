import CityPageLayout from "@/components/CityPageLayout";

export default function RedmondPage() {
  return (
    <CityPageLayout
      city="Redmond"
      region="Central Oregon"
      heroImage="https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportAveLandcaping-9_97b731b0.jpg"
      heroPosition="center 40%"
      tagline="Redmond's City-Preferred Landscape Contractor"
      seoTitle="Landscaping Redmond Oregon | Lawn Care, Irrigation & Design | Newport Avenue"
      seoDescription="Redmond Oregon's top-rated landscaping company. City of Redmond Preferred Vendor. Lawn care, irrigation installation, landscape design, xeriscaping & snow removal since 2005. LCB #9153. Free estimates."
      canonicalPath="/landscaping/redmond"
      intro="Newport Avenue Landscaping is proud to be one of only two contractors selected as a City of Redmond Preferred Landscape Vendor — a rigorous vetting process that recognizes our commitment to quality, reliability, and professionalism. We have proudly served the rapidly growing community of Redmond since 2005, bringing expert landscape design and installation to its newer subdivisions and established neighborhoods. We specialize in creating beautiful, functional outdoor spaces that thrive in Redmond's unique high-desert environment, perfectly complementing both modern homes and properties with agricultural roots."
      communityNote="Redmond's landscape character is defined by its dry high-desert climate and a surge of new construction, demanding resilient and water-wise landscaping solutions. As a City of Redmond Preferred Vendor, our expertise in adapting to these conditions is officially recognized — ensuring vibrant, sustainable outdoor living areas for every property type."
      services={[
        {
          icon: "maintenance",
          name: "Landscape Design & Build",
          description: "In Redmond's burgeoning neighborhoods, our design and build services craft custom landscapes that enhance curb appeal and outdoor living. We focus on drought-tolerant plantings and efficient layouts perfect for new constructions and existing homes alike.",
        },
        {
          icon: "sprinklers",
          name: "Irrigation Systems",
          description: "Efficient irrigation is crucial for Redmond's dry climate, and we design and install smart systems that conserve water while keeping your landscape lush. From drip systems for new subdivisions to optimizing existing agricultural setups, we ensure your plants receive precise hydration.",
        },
        {
          icon: "design",
          name: "Property Maintenance",
          description: "Keep your Redmond property looking its best with our comprehensive landscape maintenance programs, tailored for both residential and commercial needs. We handle everything from seasonal clean-ups in newer developments to ongoing care for larger properties with agricultural ties.",
        },
        {
          icon: "outdoor",
          name: "Outdoor Living Spaces",
          description: "Extend your living space outdoors in Redmond with custom patios, fire pits, and outdoor kitchens, perfect for enjoying the high-desert evenings. We create inviting areas for relaxation and entertainment that complement Redmond's lifestyle.",
        },
        {
          icon: "architecture",
          name: "Hardscaping & Patios",
          description: "Our hardscaping solutions, including durable patios and walkways, are designed to withstand Redmond's climate while adding functional beauty to your property. We use materials that blend seamlessly with the high-desert aesthetic and new construction styles.",
        },
        {
          icon: "commercial",
          name: "Water Features",
          description: "Introduce tranquility to your Redmond landscape with custom water features, from serene ponds to elegant fountains. These features provide a refreshing contrast to the dry environment and enhance any outdoor space.",
        },
      ]}
      whyUs={[
        "🏛️ One of only 2 City of Redmond Preferred Landscape Vendors — a rigorous city-vetted distinction",
        "Serving Redmond since 2005 — 21+ years of high-desert landscaping expertise",
        "Deep understanding of Redmond's high-desert climate, soil conditions, and water restrictions",
        "Expertise in water-wise and sustainable landscaping for new constructions and established properties",
        "Licensed & Bonded (LCB #9153) — fully insured for residential and commercial work",
        "Strong relationships with local suppliers for quality materials suited to Redmond's environment",
      ]}
      nearbyAreas={[
        { label: "Bend", href: "/landscaping/bend" },
        { label: "Sisters", href: "/landscaping/sisters" },
        { label: "Tumalo", href: "/landscaping/tumalo" },
        { label: "Prineville", href: "/landscaping/prineville" },
        { label: "Terrebonne", href: "/service-areas/terrebonne" },
        { label: "Madras", href: "/landscaping/madras" },
      ]}
      ctaNote="Ready to work with Redmond's city-preferred landscape contractor? Contact Newport Avenue Landscaping today for a free consultation and let us bring your outdoor vision to life."
      faqs={[
        {
          question: "Is Newport Avenue Landscaping a City of Redmond preferred vendor?",
          answer: "Yes — Newport Avenue Landscaping is one of only two contractors officially selected as a City of Redmond Preferred Landscape Vendor. This designation is awarded through a rigorous vetting process and recognizes our track record of quality, professionalism, and reliability serving Redmond properties.",
        },
        {
          question: "Does Newport Avenue Landscaping serve Redmond, Oregon?",
          answer: "Yes — Newport Avenue Landscaping has served Redmond, Oregon since 2005. We provide full-service landscaping including lawn care, irrigation, landscape design, xeriscaping, paver patios, snow removal, and commercial maintenance throughout Redmond and Jefferson County.",
        },
        {
          question: "How much does lawn care cost in Redmond, Oregon?",
          answer: "Lawn care in Redmond typically runs $50–$110 per visit for a standard residential property. Monthly maintenance programs are available. We provide free estimates for all Redmond properties.",
        },
        {
          question: "Do you install irrigation systems in Redmond, OR?",
          answer: "Yes. We design and install complete sprinkler and drip irrigation systems in Redmond. We also offer spring activation, fall blowout, and year-round repair services. Redmond's sandy high-desert soils require efficient irrigation — we design systems specifically for the local climate.",
        },
      ]}
    />
  );
}
