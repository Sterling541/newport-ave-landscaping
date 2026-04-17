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
      seoTitle="Outdoor Kitchen Bend Oregon | Outdoor Living Spaces & Covered Patios | Newport Avenue"
      seoDescription="Custom outdoor kitchens, living spaces, and covered patios in Bend, Oregon. Design and installation by Newport Avenue Landscaping. Free consultations. LCB #9153."
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
      schemaUrl="/services/outdoor-living"
      schemaName="Outdoor Living Spaces"
      schemaDescription="Custom outdoor kitchens, living spaces, and covered patios in Bend, Oregon. Design and installation by Newport Avenue Landscaping."
      faqs={[
          { question: "How much does an outdoor kitchen cost in Bend?", answer: "Outdoor kitchen projects in Bend range from $8,000 for a basic built-in grill with counter space to $40,000+ for a fully equipped outdoor kitchen with refrigeration, sink, pizza oven, and bar seating. The wide range reflects differences in appliance quality, countertop materials, and the complexity of the structure. We design to your budget and lifestyle." },
          { question: "What outdoor living features are most popular in Bend?", answer: "The most popular outdoor living additions in Bend include covered pergolas and shade structures (essential for our sunny summers), outdoor kitchens and grilling stations, fire pits and fireplaces for cool evenings, paver patios with seating walls, and integrated landscape lighting. Many clients combine several of these into a complete outdoor room." },
          { question: "How long does outdoor living space construction take?", answer: "A typical outdoor living project in Bend takes 2–6 weeks from start to finish, depending on scope. Simple paver patios with a fire pit take 1–2 weeks. Full outdoor kitchens with structural pergolas and electrical work take 4–8 weeks. We provide a detailed schedule before work begins." },
          { question: "Do outdoor kitchens hold up to Central Oregon weather?", answer: "Yes — when properly designed and built with appropriate materials. We use stainless steel appliances rated for outdoor use, weather-resistant cabinetry, and sealed countertops that handle freeze-thaw cycles. Covered structures protect appliances from direct precipitation. We have built outdoor kitchens throughout Bend that have performed flawlessly for 10+ years." },
      ]}
    />
  );
}
