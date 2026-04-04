import CityPageLayout from "@/components/CityPageLayout";
import { CityService } from "@/components/CityPageLayout";

const services: CityService[] = [
  {
    icon: "leaf",
    name: "Landscape Design & Installation",
    description: "For Tumalo's expansive properties, our landscape design integrates seamlessly with the natural high desert environment. We create custom outdoor spaces that enhance both beauty and functionality for your acreage.",
  },
  {
    icon: "droplets",
    name: "Irrigation & Water Management",
    description: "Given Tumalo's irrigation district, efficient water use is paramount. We design and install smart irrigation systems, ensuring your large property thrives while conserving precious resources.",
  },
  {
    icon: "wrench",
    name: "Property Maintenance",
    description: "Maintaining larger properties in Tumalo requires specialized care. Our comprehensive maintenance services keep your acreage, from lawns to gardens, looking pristine year-round.",
  },
  {
    icon: "flame",
    name: "Outdoor Living Spaces",
    description: "Extend your living space into Tumalo's beautiful outdoors with custom patios, fire pits, and outdoor kitchens. We craft inviting areas perfect for enjoying the rural tranquility and starry nights.",
  },
  {
    icon: "sun",
    name: "Native & Drought-Tolerant Planting",
    description: "We select native and drought-tolerant plants that flourish in Tumalo's high desert climate and complement its rural charm. Our planting schemes are designed for beauty and sustainability on larger lots.",
  },
  {
    icon: "snowflake",
    name: "Water Features & Ponds",
    description: "Enhance your Tumalo property with the serene sounds and visual appeal of custom water features. From naturalistic ponds to elegant fountains, we create unique aquatic elements for your rural oasis.",
  },
];

const TumaloPage = () => {
  return (
    <CityPageLayout
      city="Tumalo"
      region="Central Oregon"
      heroImage="https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportAveLandcaping-9_97b731b0.jpg"
      heroPosition="center 40%"
      tagline="Acreage & Farmstead Landscaping"
      seoTitle="Landscaping Company Tumalo Oregon | Newport Avenue Landscaping"
      seoDescription="Tumalo, Oregon's trusted landscaping company. Lawn care, irrigation, acreage landscaping & xeriscaping in Tumalo, OR. Licensed & Bonded LCB #9153. Free estimates."
      canonicalPath="/landscaping/tumalo"
      intro="Newport Avenue Landscaping proudly serves the rural community of Tumalo, just north of Bend. We specialize in creating and maintaining beautiful, functional landscapes for acreage properties and hobby farms, understanding the unique needs of this agricultural-influenced area."
      communityNote="Tumalo's landscape is characterized by larger lots, often with irrigation needs due to its district, and a blend of residential and agricultural aesthetics. Our expertise in water management and diverse planting suits the high desert climate and varied property types."
      services={services}
      whyUs={[
        "Expertise in large property and acreage landscaping",
        "Specialized knowledge of Tumalo's irrigation district needs",
        "Sustainable and water-wise landscape solutions",
        "Dedicated to preserving Tumalo's rural charm",
        "Proven track record with hobby farms and residential estates",
      ]}
      nearbyAreas={[
        { label: "Bend", href: "/landscaping/bend" },
        { label: "Redmond", href: "/landscaping/redmond" },
        { label: "Sisters", href: "/landscaping/sisters" },
        { label: "Powell Butte", href: "/service-areas/powell-butte-lawn-care" },
        { label: "Couch Market", href: "/service-areas" },
      ]}
      ctaNote="Ready to transform your Tumalo acreage? Contact Newport Avenue Landscaping today for a personalized consultation and discover the potential of your property."
      faqs={[
        {
          question: "Does Newport Avenue Landscaping serve Tumalo, Oregon?",
          answer: "Yes. Newport Avenue Landscaping serves Tumalo and surrounding rural Central Oregon communities. We specialize in large-lot and acreage landscaping, irrigation district management, and farmstead landscape design.",
        },
        {
          question: "Do you handle large acreage landscaping in Tumalo?",
          answer: "Yes — acreage and large-lot landscaping is one of our specialties. We design and maintain landscapes for hobby farms, rural estates, and large residential properties throughout Tumalo and the Tumalo irrigation district.",
        },
      ]}
    />
  );
};

export default TumaloPage;
