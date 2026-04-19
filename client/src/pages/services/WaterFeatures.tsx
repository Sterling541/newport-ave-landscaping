import ServicePageLayout from "@/components/ServicePageLayout";

const relatedLinks = [
  { label: "Fire Pits & Fireplaces", href: "/services/fire-features" },
  { label: "Outdoor Living Spaces", href: "/services/outdoor-living" },
  { label: "Paver Patios & Walkways", href: "/services/pavers" },
  { label: "Landscape Design", href: "/services/landscape-design" },
];

const resourceLinks = [
  {
    label: "Water Feature Cost in Bend, OR",
    href: "/resources/water-feature-cost-bend-oregon",
    description: "Pricing for ponds, waterfalls, and water features in Central Oregon.",
  },
  {
    label: "Fire Pit & Patio Cost Guide",
    href: "/resources/fire-pit-patio-cost-bend-oregon",
    description: "Budgeting for outdoor living features in Bend.",
  },
];

export default function WaterFeatures() {
  return (
    <ServicePageLayout
      category="Installation Services"
      title="Water Features"
      subtitle="Bend, Oregon"
      seoTitle="Water Features Bend Oregon | Ponds, Waterfalls & Koi Ponds | Newport Avenue"
      seoDescription="Custom ponds, waterfalls, and water features in Bend, Oregon. Design, installation, and maintenance by Newport Avenue Landscaping. Transform your outdoor space. LCB #9153."
      heroImage="https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/water-feature-sunset_f7b219d3.jpg"
      heroPosition="center 40%"
      intro="Want to take your yard to the next level? Add sound. Water features don't just look nice — they bring the relaxation factor to the next level by adding another sense: sound. Did you know the optimal sound of falling water is 24 inches? The further the water falls, the higher the volume. Now, tell us another landscaper that thinks about those details when designing your stream, pond, or water feature."
      pricing={[
        { label: "Starting Cost", value: "$2,500" },
        { label: "Custom Ponds & Waterfalls", value: "Up to $100,000+" },
        { label: "Consultations", value: "Free" },
      ]}
      sections={[
        {
          heading: "Water Feature Options",
          body: "Streams, ponds, waterfalls — water features can be anything dealing with water. Some of the more interesting projects we've built have included lighting in the stream or a fire pit surrounded by a pond. Honestly, we can build just about anything you can dream up.",
          list: [
            "Pondless waterfalls",
            "Streams and natural-looking ponds",
            "Bubbling rocks, fountains, and urns",
            "Bubbling boulder features",
            "Rain water storage systems",
            "Fire pit surrounded by water feature",
            "Illuminated stream features",
          ],
        },
        {
          heading: "Water Feature Services",
          body: "Beyond installation, we offer a full range of water feature services:",
          list: [
            "Water Feature Design",
            "Water Feature Maintenance",
            "Water Feature Repair",
            "Troubleshooting Water Features",
            "Find and Correct Leaks",
            "On-site Consultations",
            "Winter Prep and Shutdown",
            "Custom Rehabilitation",
            "Repair or Replace Existing Pond",
          ],
          accent: true,
        },
        {
          heading: "The Sound of Relaxation",
          body: [
            "Our designers think about every detail — including acoustics. The optimal sound of falling water is achieved at 24 inches of drop. We design your water feature not just for visual impact but for the sensory experience it creates in your outdoor living space.",
            "Whether you want a subtle bubbling boulder in a garden corner or a dramatic multi-tier waterfall as the centerpiece of your backyard, our team has the experience and creativity to bring your vision to life.",
          ],
        },
      ]}
      relatedLinks={relatedLinks}
      resourceLinks={resourceLinks}
      schemaUrl="/services/water-features"
      schemaName="Water Features"
      schemaDescription="Custom ponds, waterfalls, and water features in Bend, Oregon. Design, installation, and maintenance by Newport Avenue Landscaping."
      portfolioProjects={[
        {
          title: "Westside Outdoor Living Space",
          href: "/portfolio/westside-outdoor-living",
          image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/hero-general-landscaping-4aSCqCE9AiuALjqtgLL6bj.webp",
          category: "OUTDOOR LIVING · WATER FEATURES",
        },
        {
          title: "Broken Top Water Feature & Sunken Fire Pit",
          href: "/portfolio/broken-top-water-feature",
          image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/century-drive-01_cfe36a70.jpg",
          category: "WATER FEATURES · FIRE FEATURES",
        },
        {
          title: "NW Bend Backyard Landscaping",
          href: "/portfolio/nw-bend-backyard",
          image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/petrosa-backyard-01_45e0b956.jpg",
          category: "DESIGN & BUILD · WATER FEATURES",
        },
      ]}
      faqs={[
          { question: "How much does a water feature cost in Bend?", answer: "Water features in Bend range from $1,500 for a simple pondless waterfall to $15,000+ for a large koi pond with waterfalls and extensive landscaping. A medium-sized pondless waterfall with natural stone typically costs $3,000–$6,000 installed. Koi ponds with filtration systems start around $5,000 and scale up with size and complexity." },
          { question: "What type of water feature is best for Central Oregon?", answer: "Pondless waterfalls are extremely popular in Bend because they provide the soothing sound of moving water without the maintenance of a full pond. They are also safer for households with young children. Koi ponds are a beautiful focal point for larger properties. Bubbling rock features and container water gardens are lower-maintenance options for smaller spaces." },
          { question: "Do water features work in Central Oregon winters?", answer: "Most water features in Bend need to be winterized before hard freezes. Pondless waterfalls can often run through mild winters but should be shut down when temperatures consistently drop below freezing. Koi ponds require special preparation to protect fish through winter. We provide winterization services and can advise on the best approach for your specific feature." },
          { question: "How much maintenance does a water feature require?", answer: "Maintenance requirements vary by type. Pondless waterfalls need occasional cleaning of the basin and pump (a few hours per year). Koi ponds require regular water testing, filter cleaning, feeding, and seasonal care. We offer water feature maintenance programs to keep your feature running cleanly and efficiently." },
      ]}
    />
  );
}
