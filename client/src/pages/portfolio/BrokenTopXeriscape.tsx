import PortfolioProjectLayout from "@/components/PortfolioProjectLayout";

export default function BrokenTopXeriscape() {
  return (
    <PortfolioProjectLayout
      title="Broken Top Xeriscape"
      subtitle="XERISCAPE RENOVATION"
      heroImage="https://newportavelandscaping.com/wp-content/uploads/2022/05/Bend-OR-Brokentop-Xeriscape-After-Picture.jpg"
      description={`Complete landscape renovation inspired by the concept of order versus chaos — man versus nature. The client, a very talented painter, was inspired by landscapes of chaos, which became the design philosophy for this project.\n\nThe large turf area in the back of this Brokentop residence was removed and replaced with usable patio space. All sprinklers and irrigation in the backyard were removed and retrofitted with a low-water drip irrigation system.\n\nNative and drought-tolerant plants were selected to create a dynamic, textured landscape that feels wild and intentional at the same time — a true reflection of the client's artistic vision and Central Oregon's natural environment.`}
      details={[
        { label: "LOCATION", value: "Broken Top, Bend, OR" },
        { label: "PROJECT TYPE", value: "Xeriscape / Complete Renovation" },
        { label: "SERVICES", value: "Turf Removal, Drip Irrigation, Patio Installation, Native Plantings" },
        { label: "CONCEPT", value: "Order vs. Chaos — Man vs. Nature" },
      ]}
      images={[
        { src: "https://newportavelandscaping.com/wp-content/uploads/2022/05/Bend-OR-Brokentop-Xeriscape-After-Picture.jpg", alt: "Broken Top Xeriscape After" },
        { src: "https://newportavelandscaping.com/wp-content/uploads/2022/05/bend-oregon-brokentop-xeriscape-backyard-before-pic2.png", alt: "Broken Top Xeriscape Before" },
      ]}
      prevProject={{ title: "Broken Top Water Feature", href: "/portfolio/broken-top-water-feature" }}
      nextProject={{ title: "Century Drive Landscape Enhancement", href: "/portfolio/century-drive" }}
      relatedProjects={[
        { title: "Awbrey Butte Xeriscape", href: "/portfolio/awbrey-butte-xeriscape", image: "https://newportavelandscaping.com/wp-content/uploads/2022/05/awbrey-butte-xeriscape-landscaping-renovation-day-shot.jpg" },
        { title: "East Bend Landscape Install", href: "/portfolio/east-bend-landscape", image: "https://newportavelandscaping.com/wp-content/uploads/2022/05/east-bend-landscape-install-finished-paver-driveway.jpg" },
        { title: "SW Bend Backyard", href: "/portfolio/sw-bend-backyard", image: "https://newportavelandscaping.com/wp-content/uploads/2022/05/south-west-bend-oregon-campground-backyard-full-view-2.jpg" },
      ]}
    />
  );
}
