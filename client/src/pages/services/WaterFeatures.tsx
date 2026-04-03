import ServicePageLayout from "@/components/ServicePageLayout";

const relatedLinks = [
  { label: "Fire Pits & Fireplaces", href: "/services/fire-features" },
  { label: "Outdoor Living Spaces", href: "/services/outdoor-living" },
  { label: "Paver Patios & Walkways", href: "/services/pavers" },
  { label: "Landscape Design", href: "/services/landscape-design" },
];

export default function WaterFeatures() {
  return (
    <ServicePageLayout
      category="Installation Services"
      title="Water Features"
      subtitle="Bend, Oregon"
      heroImage="https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/OAhyShvnyMXUNJqn.jpg"
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
    />
  );
}
