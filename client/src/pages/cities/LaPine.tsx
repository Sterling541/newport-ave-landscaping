import CityPageLayout from "@/components/CityPageLayout";

const LaPinePage = () => {
  return (
    <CityPageLayout
      city="La Pine"
      region="Central Oregon"
      heroImage="https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportAveLandcaping-9_97b731b0.jpg"
      heroPosition="center 40%"
      tagline="Colder Climate Landscape Experts"
      seoTitle="Landscaping Company La Pine Oregon | Newport Avenue Landscaping"
      seoDescription="La Pine, Oregon's trusted landscaping company. Lawn care, irrigation, winter-hardy landscape design & rural property landscaping in La Pine, OR. Licensed & Bonded LCB #9153."
      canonicalPath="/landscaping/la-pine"
      intro="Newport Avenue Landscaping proudly serves the unique landscape needs of La Pine, bringing expertise tailored to its high elevation and colder winters. We understand the challenges and opportunities presented by rural lots and modest properties, ensuring beautiful and resilient outdoor spaces for every home. Our commitment extends to creating inviting environments that complement the active outdoor lifestyle cherished by La Pine's residents."
      communityNote="La Pine's distinct character, marked by its high elevation, colder winters, and prevalence of rural lots, demands a specialized approach to landscaping. Our team is adept at designing and maintaining landscapes that thrive in this environment, from winter-hardy plantings to efficient irrigation solutions for diverse property types."
      services={[
        {
          icon: "snowflake",
          name: "Winter-Hardy Landscaping",
          description: "We specialize in selecting and installing plants that can withstand La Pine's colder winters and high elevation. Our designs focus on resilience and beauty, ensuring your landscape remains vibrant year-round.",
        },
        {
          icon: "leaf",
          name: "Rural Property Design",
          description: "Understanding the unique needs of rural lots, we create expansive and functional landscapes that blend seamlessly with the natural surroundings. From large acreage to more modest properties, we design spaces for enjoyment and sustainability.",
        },
        {
          icon: "droplets",
          name: "Efficient Irrigation Systems",
          description: "Given the varied property types in La Pine, we design and install irrigation systems that are both water-efficient and effective. This ensures proper hydration for your landscape while conserving precious resources.",
        },
        {
          icon: "sun",
          name: "Outdoor Living Spaces",
          description: "Enhance your outdoor recreation with custom patios, fire pits, and gathering areas perfect for La Pine's active community. We create inviting spaces for relaxation and entertainment, extending your home's living area.",
        },
        {
          icon: "wrench",
          name: "Property Maintenance & Care",
          description: "Our comprehensive maintenance services keep your La Pine property looking its best throughout the seasons. We handle everything from pruning and fertilization to seasonal clean-ups, tailored to the local climate.",
        },
        {
          icon: "flame",
          name: "Fire-Resistant Landscaping",
          description: "With La Pine's natural setting, we incorporate fire-wise landscaping principles into our designs to protect your home. We help you choose appropriate plants and materials to create defensible space.",
        },
      ]}
      whyUs={[
        "Deep understanding of La Pine's unique climate and soil conditions",
        "Expertise in designing for rural lots and diverse property sizes",
        "Commitment to sustainable and water-wise landscaping practices",
        "Dedicated to enhancing outdoor living for retirees and recreation enthusiasts",
        "Proven track record of creating resilient and beautiful landscapes in colder climates",
        "Personalized service that respects La Pine's community character",
      ]}
      nearbyAreas={[
        { label: "Bend", href: "/landscaping/bend" },
        { label: "Sunriver", href: "/landscaping/sunriver" },
        { label: "Gilchrist", href: "/service-areas" },
        { label: "Crescent", href: "/service-areas" },
        { label: "Redmond", href: "/landscaping/redmond" },
      ]}
      ctaNote="Ready to transform your La Pine property? Contact Newport Avenue Landscaping today for a consultation tailored to your unique needs and the beautiful Central Oregon environment."
      faqs={[
        {
          question: "Does Newport Avenue Landscaping serve La Pine, Oregon?",
          answer: "Yes. Newport Avenue Landscaping serves La Pine and the surrounding high-elevation communities of southern Deschutes County. We specialize in cold-climate landscaping, winter-hardy plant selection, rural property design, and irrigation systems suited to La Pine's unique environment.",
        },
        {
          question: "What landscaping challenges are unique to La Pine, Oregon?",
          answer: "La Pine sits at roughly 4,200 feet elevation and experiences colder winters than Bend, with frost possible in any month. This requires cold-hardy plant selections, proper irrigation winterization, and designs that account for heavy snow loads. Our team has extensive experience with La Pine's specific climate conditions.",
        },
      ]}
    />
  );
};

export default LaPinePage;
