import ServicePageLayout from "@/components/ServicePageLayout";

const relatedLinks = [
  { label: "Fire Pits & Fireplaces", href: "/services/fire-features" },
  { label: "Paver Patios & Walkways", href: "/services/pavers" },
  { label: "Water Features", href: "/services/water-features" },
  { label: "Landscape Design", href: "/services/landscape-design" },
];

const resourceLinks = [
  {
    label: "Fire Pit & Patio Cost Guide",
    href: "/resources/fire-pit-patio-cost-bend-oregon",
    description: "Budgeting for a fire pit or outdoor fireplace in Central Oregon.",
  },
  {
    label: "How Much Do Pavers Cost in Bend, OR?",
    href: "/resources/paver-patio-cost-bend-oregon",
    description: "2024 pricing guide: materials, labor, and what affects your total.",
  },
  {
    label: "Landscape Design Cost in Bend, OR",
    href: "/resources/landscape-design-cost-bend-oregon",
    description: "What landscape design and installation costs in Central Oregon.",
  },
];

export default function OutdoorLiving() {
  return (
    <ServicePageLayout
      category="Installation Services"
      title="Outdoor Kitchens"
      subtitle="& Living Spaces"
      heroImage="https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/GnijvQODFDMrKxrg.jpg"
      heroPosition="center 50%"
      intro="Outdoor kitchens and fireplaces have become the focal point of the outdoor living area. If you want to improve the value and sale-ability of your home, or create a more usable and functional backyard, an outdoor living area can do wonders. Your dreams are the limit."
      pricing={[
        { label: "Average Outdoor Kitchen", value: "$15,000 – $25,000" },
        { label: "Gourmet / Custom", value: "Up to $65,000+" },
        { label: "Most Lavish Build to Date", value: "$150,000+" },
        { label: "Design Consultation", value: "Complimentary" },
      ]}
      sections={[
        {
          heading: "Outdoor Living Space Options",
          body: "You could have a pizza oven, fireplace, smoker combo, or a hydraulic TV system that lifts out of your retaining wall. You could include a deluxe pergola with a ceiling fan and state-of-the-art sound system. Really, your dreams are the limit.",
          list: [
            "Custom outdoor kitchens with pizza ovens, grills, and smokers",
            "Ice makers, wine coolers, and refrigeration",
            "Pergolas with ceiling fans and sound systems",
            "Hydraulic TV lift systems",
            "Outdoor fireplaces and fire pits",
            "Shade structures and covered patios",
            "Outdoor bars and entertainment areas",
          ],
        },
        {
          heading: "Design & Build Process",
          body: [
            "Our designers will help you design an outdoor kitchen and living space that fits your needs and lifestyle. We can design and build a custom outdoor kitchen with a pizza oven, ice makers, wine coolers, sound systems, and other amenities — or go for a more basic pre-built kitchen.",
            "Our design/build process makes planning, budgeting, and building your outdoor kitchen easy and efficient. We handle everything from initial concept through final installation.",
          ],
          accent: true,
        },
        {
          heading: "Increase Your Home's Value",
          body: [
            "A well-designed outdoor living space is one of the highest-return investments you can make in your home. In Central Oregon's outdoor-focused culture, a premium outdoor kitchen and living area can significantly increase your property's appeal and market value.",
            "Whether you're planning to sell or simply want to enjoy your home more fully, an outdoor living space transforms how you use your property — extending your livable square footage into the beautiful Central Oregon outdoors.",
          ],
        },
      ]}
      relatedLinks={relatedLinks}
      resourceLinks={resourceLinks}
    />
  );
}
