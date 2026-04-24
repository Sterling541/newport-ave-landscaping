import PortfolioProjectLayout from "@/components/PortfolioProjectLayout";

export default function CenturyDrive() {
  return (
    <PortfolioProjectLayout
      title="Century Drive Landscape Enhancement"
      subtitle="LANDSCAPE ENHANCEMENT"
      heroImage="/manus-storage/century-drive-01_cfe36a70.jpg"
      canonicalPath="/portfolio/century-drive"
      description={`This older home had been completely renovated — but the landscaping remained untouched. The client wanted to update the landscaping to match the quality of the newly renovated home.\n\nWe started by updating the existing water feature in the front yard, as the liner had a bad leak and the aesthetic needed refreshing. In the rear of the house, we built a half-circle bench and matching fire pit. We then built a walkway using natural flagstone connecting the fire pit to the back door.\n\nThe project brought the outdoor spaces up to the same standard as the beautifully renovated interior, creating a cohesive property that feels complete from every angle.`}
      details={[
        { label: "LOCATION", value: "Century Drive, Bend, OR" },
        { label: "PROJECT TYPE", value: "Landscape Enhancement" },
        { label: "SERVICES", value: "Water Feature Repair, Fire Pit, Flagstone Walkway, Bench Installation" },
      ]}
      images={[
        { src: "/manus-storage/century-drive-01_cfe36a70.jpg", alt: "Century Drive Water Feature" },
      ]}
      prevProject={{ title: "Broken Top Xeriscape", href: "/portfolio/broken-top-xeriscape" }}
      nextProject={{ title: "East Bend Landscape Install", href: "/portfolio/east-bend-landscape" }}
      relatedProjects={[
        { title: "Broken Top Water Feature", href: "/portfolio/broken-top-water-feature", image: "/manus-storage/brokentop-water-fire-01_54836cf3.jpg" },
        { title: "Paver Patio & Gas Firepit", href: "/portfolio/paver-patio-firepit", image: "/manus-storage/paver-patio-and-gas-firepit-02_298e674d.jpg" },
        { title: "NW Bend Backyard", href: "/portfolio/nw-bend-backyard", image: "/manus-storage/nw-bend-backyard-01_e6d82c48.jpg" },
      ]}
    />
  );
}
