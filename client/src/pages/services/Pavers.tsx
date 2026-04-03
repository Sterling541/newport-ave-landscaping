import ServicePageLayout from "@/components/ServicePageLayout";

const relatedLinks = [
  { label: "Outdoor Living Spaces", href: "/services/outdoor-living" },
  { label: "Fire Pits & Fireplaces", href: "/services/fire-features" },
  { label: "Water Features", href: "/services/water-features" },
  { label: "Landscape Design", href: "/services/landscape-design" },
];

export default function Pavers() {
  return (
    <ServicePageLayout
      category="Installation Services"
      title="Paver Patios"
      subtitle="& Walkways"
      heroImage="https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/DsCDLoIMQbfZSjuQ.jpg"
      heroPosition="center 50%"
      intro="Paver patios and paver walkways are one of our favorite landscaping projects to design and build. Not only do you get instant aesthetic results, but you also get a product that, if built correctly, will last a lifetime and will vastly improve the value of your home."
      pricing={[
        { label: "Typical Range", value: "$3,000 – $50,000" },
        { label: "Design Consultation", value: "Complimentary" },
        { label: "Warranty", value: "5 Years" },
      ]}
      sections={[
        {
          heading: "5 Benefits of Patio Pavers",
          body: "Patio pavers offer a combination of durability, aesthetics, and value that no other hardscape material can match:",
          list: [
            "Durability and Longevity — patio pavers withstand harsh weather conditions, heavy foot traffic, and the test of time. Concrete pavers are manufactured to be strong and durable, making them a wise investment.",
            "Low Maintenance — pavers require minimal upkeep. They are easy to clean with simple washing and occasional sealing, and individual pavers can be replaced if damaged.",
            "Aesthetic Appeal — with a variety of materials, colors, textures, and patterns to choose from, pavers can enhance the visual appeal of your home's outdoor area.",
            "Increase in Property Value — a well-designed patio made with high-quality pavers can add significant value to your property.",
            "Versatility — patio pavers can be used in a variety of outdoor applications, from patios and walkways to driveways and pool decks.",
          ],
        },
        {
          heading: "Custom Patio Design",
          body: [
            "At Newport Avenue Landscaping, your outdoor living space should reflect your personal style and be the epitome of durability. We specialize in custom paver designs tailored to your unique vision in Bend, Oregon.",
            "Our team of experts leverages sophisticated patio design techniques to create a seamless extension of your home that thrives through the seasons. By integrating durability into the heart of our design process, we guarantee an outdoor living space that is not only visually stunning but also stands the test of time.",
          ],
          accent: true,
        },
        {
          heading: "Paver Materials & Options",
          body: "Paver patios and walkways are the foundation of your outdoor living area. Our experienced team will guide you through hundreds of options:",
          list: [
            "Natural flagstone and bluestone",
            "Concrete pavers in hundreds of colors and textures",
            "Tumbled and antiqued pavers for a classic look",
            "Large-format modern pavers",
            "Permeable pavers for drainage management",
            "Retaining wall systems",
          ],
        },
        {
          heading: "Quality & Warranty",
          body: [
            "All hardscapes are built to the highest industry and personal standards. Our landscape construction employees train every winter to stay up-to-date on the latest paver patio and driveway installation techniques and technologies.",
            "We are so confident in the outcome of what we build that we offer a five-year warranty on all paver patios, retaining walls, and hardscape projects — the only landscape company in Bend to do so.",
          ],
        },
      ]}
      relatedLinks={relatedLinks}
    />
  );
}
