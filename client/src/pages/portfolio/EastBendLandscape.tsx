import PortfolioProjectLayout from "@/components/PortfolioProjectLayout";

export default function EastBendLandscape() {
  return (
    <PortfolioProjectLayout
      title="East Bend Landscape Install"
      subtitle="NEW CONSTRUCTION LANDSCAPE"
      heroImage="https://newportavelandscaping.com/wp-content/uploads/2022/05/east-bend-landscape-install-finished-paver-driveway.jpg"
      description={`New construction landscape installation on the East side of Bend. The original space was sage brush and juniper trees — a blank slate with enormous potential.\n\nWe cleared the area and installed approximately 12,000 sq ft of turf grass, 50+ maple trees, fruit trees, a plunge pool, landscape lighting, a sound system, a sandy beach area, a playground area, and even a goat and chicken area.\n\nThis project is a testament to what's possible when a client has a vision and trusts their landscaping team to execute it at the highest level. The result is a fully self-contained outdoor lifestyle property unlike anything else in Central Oregon.`}
      details={[
        { label: "LOCATION", value: "East Bend, OR" },
        { label: "PROJECT TYPE", value: "New Construction Landscape" },
        { label: "TIME TO COMPLETION", value: "15 weeks" },
        { label: "TURF INSTALLED", value: "~12,000 sq ft" },
        { label: "TREES PLANTED", value: "50+ maple trees + fruit trees" },
        { label: "SERVICES", value: "Plunge Pool, Landscape Lighting, Sound System, Beach Area, Playground, Animal Area" },
      ]}
      images={[
        { src: "https://newportavelandscaping.com/wp-content/uploads/2022/05/east-bend-landscape-install-finished-paver-driveway.jpg", alt: "East Bend Paver Driveway" },
        { src: "https://newportavelandscaping.com/wp-content/uploads/2022/05/east-bend-landscape-install-finished-backyard-aeriel-view2-1.jpg", alt: "East Bend Backyard Aerial View" },
      ]}
      prevProject={{ title: "Century Drive Landscape Enhancement", href: "/portfolio/century-drive" }}
      nextProject={{ title: "NW Bend Backyard Landscaping", href: "/portfolio/nw-bend-backyard" }}
      relatedProjects={[
        { title: "SW Bend Backyard", href: "/portfolio/sw-bend-backyard", image: "https://newportavelandscaping.com/wp-content/uploads/2022/05/south-west-bend-oregon-campground-backyard-full-view-2.jpg" },
        { title: "Awbrey Butte Xeriscape", href: "/portfolio/awbrey-butte-xeriscape", image: "https://newportavelandscaping.com/wp-content/uploads/2022/05/awbrey-butte-xeriscape-landscaping-renovation-day-shot.jpg" },
        { title: "Broken Top Xeriscape", href: "/portfolio/broken-top-xeriscape", image: "https://newportavelandscaping.com/wp-content/uploads/2022/05/Bend-OR-Brokentop-Xeriscape-After-Picture.jpg" },
      ]}
    />
  );
}
