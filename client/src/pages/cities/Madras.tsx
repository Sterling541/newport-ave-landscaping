import CityPageLayout from "@/components/CityPageLayout";

export default function MadrasPage() {
  return (
    <CityPageLayout
      city="Madras"
      region="Central Oregon"
      heroImage="https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEHxx/NewportLandscapingRVParkDay2Photos57_ce65cd27.jpg"
      heroPosition="center 60%"
      tagline="Cultivating Madras's Green Spaces"
      intro="Newport Avenue Landscaping proudly serves the vibrant community of Madras, bringing expert landscape design and maintenance to its diverse residential, commercial, and agricultural properties. Our team understands the unique environmental factors of Jefferson County, ensuring every project thrives in Madras's distinct climate."
      communityNote="Madras, as the seat of Jefferson County, experiences a warmer and drier climate compared to other Central Oregon cities, influencing plant selection and irrigation strategies. The community's agricultural roots and growing residential and commercial sectors demand versatile and resilient landscaping solutions."
      services={[
        {
          icon: "leaf",
          name: "Custom Landscape Design",
          description: "We create bespoke landscape designs that complement Madras's unique agricultural heritage and warmer climate. Our designs focus on drought-tolerant plants and efficient irrigation systems to ensure beauty and sustainability.",
        },
        {
          icon: "droplets",
          name: "Efficient Irrigation Systems",
          description: "Given Madras's drier conditions, water-wise irrigation is paramount. We design, install, and maintain efficient systems that conserve water while keeping your landscapes lush and healthy, perfectly suited for the local environment.",
        },
        {
          icon: "wrench",
          name: "Comprehensive Landscape Maintenance",
          description: "From regular lawn care to seasonal clean-ups, our maintenance services keep Madras properties looking their best year-round. We tailor our approach to address the specific needs of both residential and commercial landscapes in this growing community.",
        },
        {
          icon: "flame",
          name: "Outdoor Living Spaces",
          description: "Enhance your Madras property with custom outdoor living areas, including patios, fire pits, and pergolas. We design spaces that allow you to fully enjoy the warmer climate and beautiful Central Oregon surroundings.",
        },
        {
          icon: "sun",
          name: "Drought-Tolerant Plantings",
          description: "Specializing in plant selections that thrive in Madras's warmer and drier conditions, we create beautiful, sustainable landscapes. Our expertise ensures your garden remains vibrant with minimal water usage, reflecting the local ecosystem.",
        },
        {
          icon: "snowflake",
          name: "Seasonal Color & Enhancements",
          description: "Keep your Madras landscape vibrant throughout the seasons with our expert planting and enhancement services. We select flowers and foliage that flourish in the local climate, adding continuous beauty to your property.",
        },
      ]}
      whyUs={[
        "Deep understanding of Madras's unique climate and soil conditions",
        "Expertise in water-wise and drought-tolerant landscaping solutions",
        "Tailored designs that respect Madras's agricultural and growing community character",
        "Commitment to sustainable practices for a thriving environment",
        "Reliable and professional service for both residential and commercial clients",
        "Strong local reputation built on quality and customer satisfaction in Jefferson County",
      ]}
      nearbyAreas={[
        "Redmond",
        "Prineville",
        "Culver",
        "Metolius",
        "Terrebonne",
      ]}
      ctaNote="Ready to transform your Madras property? Contact Newport Avenue Landscaping today for a personalized consultation and discover how we can enhance your outdoor space in Jefferson County."
    />
  );
}
