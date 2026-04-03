import CityPageLayout from "@/components/CityPageLayout";

export default function CityPage() {
  return (
    <CityPageLayout
      city="Prineville"
      region="Central Oregon"
      heroImage="https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportLandscapingRVParkPhotos50_5ba97805.jpg"
      heroPosition="center 40%"
      tagline="Prineville's Trusted Landscape Partner"
      intro="Newport Avenue Landscaping proudly extends its comprehensive landscaping services to the vibrant community of Prineville. We understand the unique blend of rural charm and emerging tech presence that defines this Crook County seat, offering tailored solutions that enhance both residential and commercial properties."
      communityNote="Prineville's drier climate and ranching heritage present distinct landscaping challenges and opportunities. Our expertise in drought-tolerant designs and robust outdoor spaces is perfectly suited to the working-class and growing tech communities here."
      services={[
        {
          icon: "leaf",
          name: "Drought-Tolerant Design",
          description: "Given Prineville's drier climate, we specialize in creating beautiful, sustainable landscapes that thrive with minimal water. Our designs incorporate native and adapted plants, ensuring your property remains vibrant and resilient.",
        },
        {
          icon: "droplets",
          name: "Efficient Irrigation Systems",
          description: "Water conservation is key in Prineville, and our advanced irrigation systems are designed for maximum efficiency. We install and maintain smart systems that deliver water precisely where and when it's needed, reducing waste and promoting healthy growth.",
        },
        {
          icon: "wrench",
          name: "Hardscaping & Outdoor Living",
          description: "Enhance your Prineville property with custom hardscaping features like patios, walkways, and retaining walls. We create durable and aesthetically pleasing outdoor living spaces that complement the rugged beauty of the high desert.",
        },
        {
          icon: "flame",
          name: "Fire-Wise Landscaping",
          description: "Protecting your Prineville home from wildfire risks is paramount. Our fire-wise landscaping strategies help create defensible spaces around your property, using strategic plant selection and layout to minimize fuel.",
        },
        {
          icon: "sun",
          name: "Property Maintenance",
          description: "From regular upkeep to seasonal cleanups, our team provides comprehensive property maintenance services for Prineville residents and businesses. We ensure your landscape remains healthy, tidy, and attractive throughout the year.",
        },
        {
          icon: "snowflake",
          name: "Winterization Services",
          description: "Prepare your Prineville landscape for the colder months with our expert winterization services. We protect your irrigation systems and sensitive plantings, ensuring they withstand the winter and flourish in the spring.",
        },
      ]}
      whyUs={[
        "Deep understanding of Prineville's unique climate and soil conditions",
        "Expertise in water-wise and sustainable landscaping practices",
        "Proven track record with both residential and commercial properties",
        "Dedicated to enhancing the natural beauty of Crook County",
        "Reliable service tailored to the working-class and growing tech communities",
        "Strong commitment to customer satisfaction and long-term landscape health",
      ]}
      nearbyAreas={[
        "Bend",
        "Redmond",
        "Sisters",
        "Tumalo",
        "Powell Butte",
        "Post",
      ]}
      ctaNote="Ready to transform your Prineville property? Contact Newport Avenue Landscaping today for a personalized consultation and discover how we can bring your outdoor vision to life in Prineville."
    />
  );
}
