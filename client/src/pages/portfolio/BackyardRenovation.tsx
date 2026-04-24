import PortfolioProjectLayout from "@/components/PortfolioProjectLayout";

export default function BackyardRenovation() {
  return (
    <PortfolioProjectLayout
      title="Backyard Landscape Renovation"
      subtitle="FULL LANDSCAPE RENOVATION"
      heroImage="/manus-storage/se-bend-renovation-01_487ce10e.jpg"
      canonicalPath="/portfolio/backyard-renovation"
      description={`This Southeast Bend backyard was completely transformed from a neglected, overgrown space into a beautiful, functional outdoor living area.\n\nThe existing lawn was removed and replaced with a combination of hardscape and drought-tolerant plantings. We installed a new paver patio, updated the irrigation system, and added landscape lighting to extend the usability of the space into the evening hours.\n\nThe client now has a stunning backyard retreat that requires minimal maintenance while providing maximum enjoyment throughout the Central Oregon seasons.`}
      details={[
        { label: "LOCATION", value: "Southeast Bend, OR" },
        { label: "PROJECT TYPE", value: "Full Landscape Renovation" },
        { label: "SERVICES", value: "Paver Patio, Irrigation Update, Landscape Lighting, Plantings" },
      ]}
      images={[
        { src: "/manus-storage/se-bend-renovation-01_487ce10e.jpg", alt: "Backyard Renovation After" },
        { src: "/manus-storage/se-bend-renovation-09_00307bc7.jpg", alt: "Backyard Renovation Before" },
      ]}
      prevProject={{ title: "Awbrey Glenn Flagstone Patio", href: "/portfolio/awbrey-glenn-flagstone" }}
      nextProject={{ title: "Broken Top Water Feature", href: "/portfolio/broken-top-water-feature" }}
      relatedProjects={[
        { title: "SW Bend Backyard", href: "/portfolio/sw-bend-backyard", image: "/manus-storage/sw-bend-01_45e68c0e.jpg" },
        { title: "NW Bend Backyard", href: "/portfolio/nw-bend-backyard", image: "/manus-storage/nw-bend-backyard-01_e6d82c48.jpg" },
        { title: "East Bend Landscape Install", href: "/portfolio/east-bend-landscape", image: "/manus-storage/east-bend-install-01_5ad4daf3.jpg" },
      ]}
    />
  );
}
