import CityPageLayout from "@/components/CityPageLayout";

export default function SistersPage() {
  return (
    <CityPageLayout
      city="Sisters"
      region="Central Oregon"
      heroImage="https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportAveLandcaping-9_97b731b0.jpg"
      heroPosition="center 40%"
      tagline="Mountain Landscape Artisans"
      intro="In the charming mountain town of Sisters, Newport Avenue Landscaping crafts bespoke outdoor spaces that harmonize with the natural beauty of the Cascade foothills. We specialize in creating stunning landscapes for resort and vacation homes, ensuring every design reflects the rustic elegance and serene environment of this unique community."
      communityNote="Sisters' distinct character, marked by its majestic ponderosa pines and upscale vacation properties, demands a nuanced approach to landscaping. Our expertise lies in designing and maintaining environments that thrive in the high-desert mountain climate while preserving the town's beloved natural aesthetic."
      services={[
        {
          icon: "leaf",
          name: "Custom Landscape Design",
          description: "We design custom landscapes that blend seamlessly with Sisters' natural environment, incorporating native plants and rustic elements. Our designs enhance the beauty of your mountain retreat, from cozy cabins to expansive vacation homes.",
        },
        {
          icon: "droplets",
          name: "Efficient Irrigation Systems",
          description: "Given Sisters' high-desert climate, efficient water management is crucial for healthy landscapes. We install and maintain smart irrigation systems tailored to conserve water and nourish your plants effectively.",
        },
        {
          icon: "wrench",
          name: "Property Landscape Maintenance",
          description: "For both full-time residents and vacation homeowners in Sisters, we offer comprehensive landscape maintenance services. Our team ensures your property remains pristine and inviting year-round, reflecting the high standards of the community.",
        },
        {
          icon: "flame",
          name: "Outdoor Living & Fire Features",
          description: "Enhance your Sisters outdoor experience with custom patios, fire pits, and outdoor kitchens, perfect for enjoying cool mountain evenings. We create inviting spaces for relaxation and entertainment, extending your living area into the natural surroundings.",
        },
        {
          icon: "sun",
          name: "Native Plant & Tree Installation",
          description: "We specialize in selecting and installing native plants and trees, including the iconic ponderosa pines, that thrive in Sisters' unique ecosystem. Our installations focus on sustainability and enhancing the natural appeal of your property.",
        },
        {
          icon: "snowflake",
          name: "Winterization & Snow Management",
          description: "Prepare your Sisters property for the colder months with our expert winterization services, protecting your landscape from harsh conditions. We also offer snow management solutions to keep your pathways and driveways clear and safe.",
        },
      ]}
      whyUs={[
        "Deep understanding of Sisters' unique mountain climate and ecology",
        "Expertise in designing for rustic, natural, and upscale aesthetics",
        "Specialization in resort and vacation home landscaping needs",
        "Commitment to sustainable practices and native plant integration",
        "Proven track record of enhancing property value and curb appeal in Sisters",
        "Personalized service that respects the serene and natural character of the community",
      ]}
      nearbyAreas={[
        "Bend",
        "Redmond",
        "Sunriver",
        "Black Butte Ranch",
        "Camp Sherman",
        "Tumalo",
      ]}
      ctaNote="Ready to transform your Sisters property into a mountain oasis? Contact Newport Avenue Landscaping today for a personalized consultation and discover the difference our expertise can make in this beautiful community."
    />
  );
}
