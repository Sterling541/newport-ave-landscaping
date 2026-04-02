import PortfolioProjectLayout from "@/components/PortfolioProjectLayout";

export default function BackyardRenovation() {
  return (
    <PortfolioProjectLayout
      title="Backyard Landscape Renovation"
      subtitle="FULL LANDSCAPE RENOVATION"
      heroImage="https://newportavelandscaping.com/wp-content/uploads/2022/05/south-east-bend-oregon-backyard-landscape-renovation-after-photo-1-2-768x512.jpg"
      description={`This Southeast Bend backyard was completely transformed from a neglected, overgrown space into a beautiful, functional outdoor living area.\n\nThe existing lawn was removed and replaced with a combination of hardscape and drought-tolerant plantings. We installed a new paver patio, updated the irrigation system, and added landscape lighting to extend the usability of the space into the evening hours.\n\nThe client now has a stunning backyard retreat that requires minimal maintenance while providing maximum enjoyment throughout the Central Oregon seasons.`}
      details={[
        { label: "LOCATION", value: "Southeast Bend, OR" },
        { label: "PROJECT TYPE", value: "Full Landscape Renovation" },
        { label: "SERVICES", value: "Paver Patio, Irrigation Update, Landscape Lighting, Plantings" },
      ]}
      images={[
        { src: "https://newportavelandscaping.com/wp-content/uploads/2022/05/south-east-bend-oregon-backyard-landscape-renovation-after-photo-1-2-768x512.jpg", alt: "Backyard Renovation After" },
        { src: "https://newportavelandscaping.com/wp-content/uploads/2022/05/south-east-bend-oregon-backyard-landscape-renovation-before-photo-2-1.jpg", alt: "Backyard Renovation Before" },
      ]}
      prevProject={{ title: "Awbrey Glenn Flagstone Patio", href: "/portfolio/awbrey-glenn-flagstone" }}
      nextProject={{ title: "Broken Top Water Feature", href: "/portfolio/broken-top-water-feature" }}
      relatedProjects={[
        { title: "SW Bend Backyard", href: "/portfolio/sw-bend-backyard", image: "https://newportavelandscaping.com/wp-content/uploads/2022/05/south-west-bend-oregon-campground-backyard-full-view-2.jpg" },
        { title: "NW Bend Backyard", href: "/portfolio/nw-bend-backyard", image: "https://newportavelandscaping.com/wp-content/uploads/2022/05/NW-Bend-Backyard-After-Picture.jpg" },
        { title: "East Bend Landscape Install", href: "/portfolio/east-bend-landscape", image: "https://newportavelandscaping.com/wp-content/uploads/2022/05/east-bend-landscape-install-finished-paver-driveway.jpg" },
      ]}
    />
  );
}
