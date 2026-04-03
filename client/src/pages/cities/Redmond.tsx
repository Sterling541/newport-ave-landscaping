import CityPageLayout from "@/components/CityPageLayout";

export default function RedmondPage() {
  return (
    <CityPageLayout
      city="Redmond"
      region="Central Oregon"
      heroImage="https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportAveLandcaping-9_97b731b0.jpg"
      heroPosition="center 40%"
      tagline="High Desert Landscape Experts"
      intro="Newport Avenue Landscaping proudly serves the rapidly growing community of Redmond, bringing expert landscape design and installation to its newer subdivisions and established neighborhoods. We specialize in creating beautiful, functional outdoor spaces that thrive in Redmond's unique high-desert environment, perfectly complementing both modern homes and properties with agricultural roots."
      communityNote="Redmond's landscape character is defined by its dry high-desert climate and a surge of new construction, demanding resilient and water-wise landscaping solutions. Our expertise in adapting to these conditions ensures vibrant, sustainable outdoor living areas for every property type."
      services={[
        {
          icon: "leaf",
          name: "Landscape Design & Build",
          description: "In Redmond's burgeoning neighborhoods, our design and build services craft custom landscapes that enhance curb appeal and outdoor living. We focus on drought-tolerant plantings and efficient layouts perfect for new constructions and existing homes alike.",
        },
        {
          icon: "droplets",
          name: "Irrigation Systems",
          description: "Efficient irrigation is crucial for Redmond's dry climate, and we design and install smart systems that conserve water while keeping your landscape lush. From drip systems for new subdivisions to optimizing existing agricultural setups, we ensure your plants receive precise hydration.",
        },
        {
          icon: "wrench",
          name: "Property Maintenance",
          description: "Keep your Redmond property looking its best with our comprehensive landscape maintenance programs, tailored for both residential and commercial needs. We handle everything from seasonal clean-ups in newer developments to ongoing care for larger properties with agricultural ties.",
        },
        {
          icon: "flame",
          name: "Outdoor Living Spaces",
          description: "Extend your living space outdoors in Redmond with custom patios, fire pits, and outdoor kitchens, perfect for enjoying the high-desert evenings. We create inviting areas for relaxation and entertainment that complement Redmond's lifestyle.",
        },
        {
          icon: "sun",
          name: "Hardscaping & Patios",
          description: "Our hardscaping solutions, including durable patios and walkways, are designed to withstand Redmond's climate while adding functional beauty to your property. We use materials that blend seamlessly with the high-desert aesthetic and new construction styles.",
        },
        {
          icon: "snowflake",
          name: "Water Features",
          description: "Introduce tranquility to your Redmond landscape with custom water features, from serene ponds to elegant fountains. These features provide a refreshing contrast to the dry environment and enhance any outdoor space.",
        },
      ]}
      whyUs={[
        "Deep understanding of Redmond's high-desert climate and soil conditions",
        "Expertise in water-wise and sustainable landscaping for new constructions",
        "Proven track record in enhancing curb appeal for Redmond homes and businesses",
        "Dedicated to personalized service and client satisfaction in a growing community",
        "Strong relationships with local suppliers for quality materials suited to Redmond",
        "Innovative designs that blend modern aesthetics with Redmond's agricultural heritage",
      ]}
      nearbyAreas={[
        "Bend",
        "Sisters",
        "Tumalo",
        "Prineville",
        "Terrebonne",
      ]}
      ctaNote="Ready to transform your Redmond property? Contact Newport Avenue Landscaping today for a consultation and let us bring your outdoor vision to life in this vibrant city."
    />
  );
}
