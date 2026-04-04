import PortfolioProjectLayout from "@/components/PortfolioProjectLayout";

export default function NWBendLighting() {
  return (
    <PortfolioProjectLayout
      title="NW Bend Landscape Lighting"
      subtitle="OUTDOOR LIGHTING · WATER FEATURES"
      heroImage="https://newportavelandscaping.com/wp-content/uploads/2022/05/nw-bend-landscape-lighting-bend-oregon-night.jpg"
      description={`This NW Bend property had a beautiful stream feature that the clients simply couldn't enjoy after dark. Our goal was to bring the water feature to life at night and illuminate the surrounding landscape to create a stunning evening ambiance.\n\nWe installed 4 uplights to accent the water feature itself, casting dramatic light across the moving water and boulders. Three well lights were positioned to highlight the surrounding trees, creating depth and dimension in the landscape. Finally, 12 stair fixtures from Unique Lighting Systems were installed — a fixture that will develop a beautiful patina finish over time.\n\nThe result is a completely transformed evening experience. What was once invisible after sunset is now a focal point the entire neighborhood admires.`}
      details={[
        { label: "LOCATION", value: "NW Bend, Bend, OR" },
        { label: "PROJECT TYPE", value: "Landscape Lighting Installation" },
        { label: "SERVICES", value: "Uplighting, Well Lights, Stair Fixtures, Low-Voltage Wiring" },
        { label: "TIME TO COMPLETION", value: "1 week" },
        { label: "MATERIALS", value: "4 Uplights, 3 Well Lights, 12 Unique Lighting Systems Stair Fixtures" },
      ]}
      images={[
        {
          src: "https://newportavelandscaping.com/wp-content/uploads/2022/05/nw-bend-landscape-lighting-bend-oregon-night.jpg",
          alt: "NW Bend landscape lighting illuminating water feature and trees at night — Bend, Oregon",
        },
        {
          src: "https://newportavelandscaping.com/wp-content/uploads/2022/05/nw-bend-landscape-lighting-stair-fixtures-bend-oregon.jpg",
          alt: "Unique Lighting Systems stair fixtures installed at NW Bend property — Bend, OR",
        },
      ]}
      prevProject={{ title: "NW Bend Backyard", href: "/portfolio/nw-bend-backyard" }}
      nextProject={{ title: "Westside Outdoor Living Space", href: "/portfolio/westside-outdoor-living" }}
      relatedProjects={[
        {
          title: "Broken Top Water Feature & Fire Pit",
          href: "/portfolio/broken-top-water-feature",
          image: "https://newportavelandscaping.com/wp-content/uploads/2022/05/Brokentop-Water-Feature-and-Sunken-Fire-Pit-After-Picture.jpg",
        },
        {
          title: "NW Bend Backyard",
          href: "/portfolio/nw-bend-backyard",
          image: "https://newportavelandscaping.com/wp-content/uploads/2022/05/NW-Bend-Backyard-After-Picture.jpg",
        },
        {
          title: "Westside Outdoor Living Space",
          href: "/portfolio/westside-outdoor-living",
          image: "https://newportavelandscaping.com/wp-content/uploads/2022/05/westside-outdoor-living-space-bend-oregon-after.jpg",
        },
      ]}
    />
  );
}
