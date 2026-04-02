import PortfolioProjectLayout from "@/components/PortfolioProjectLayout";

export default function AwbreyGlennFlagstone() {
  return (
    <PortfolioProjectLayout
      title="Awbrey Glenn Flagstone Patio & Walkway"
      subtitle="HARDSCAPE INSTALLATION"
      heroImage="https://newportavelandscaping.com/wp-content/uploads/2022/05/awbrey-glen-flagstone-front-walkway-after-photo-1.jpg"
      description={`This Awbrey Glenn property needed a complete front yard hardscape upgrade. The client wanted a natural, elegant flagstone walkway and patio that would complement the home's architecture and the surrounding high-desert landscape.\n\nWe designed and installed a custom flagstone walkway leading from the driveway to the front entry, with a matching patio area for outdoor seating. The irregular flagstone pattern was carefully laid to create a natural, organic feel while maintaining structural integrity.\n\nNative drought-tolerant plantings were added along the edges to soften the hardscape and integrate it seamlessly with the surrounding landscape.`}
      details={[
        { label: "LOCATION", value: "Awbrey Glenn, Bend, OR" },
        { label: "PROJECT TYPE", value: "Hardscape / Flagstone Installation" },
        { label: "SERVICES", value: "Flagstone Patio, Walkway Design, Native Plantings" },
      ]}
      images={[
        { src: "https://newportavelandscaping.com/wp-content/uploads/2022/05/awbrey-glen-flagstone-front-walkway-after-photo-1.jpg", alt: "Awbrey Glenn Flagstone Walkway After" },
        { src: "https://newportavelandscaping.com/wp-content/uploads/2022/05/awbrey-glen-flagstone-front-walkway-before-photo-1.jpg", alt: "Awbrey Glenn Flagstone Walkway Before" },
      ]}
      prevProject={{ title: "Awbrey Butte Xeriscape", href: "/portfolio/awbrey-butte-xeriscape" }}
      nextProject={{ title: "Backyard Landscape Renovation", href: "/portfolio/backyard-renovation" }}
      relatedProjects={[
        { title: "Paver Patio & Gas Firepit", href: "/portfolio/paver-patio-firepit", image: "https://newportavelandscaping.com/wp-content/uploads/2022/05/bend-oregon-paver-patio-gas-firepit-photo-2.jpg" },
        { title: "SW Bend Backyard", href: "/portfolio/sw-bend-backyard", image: "https://newportavelandscaping.com/wp-content/uploads/2022/05/south-west-bend-oregon-campground-backyard-full-view-2.jpg" },
        { title: "NW Bend Backyard", href: "/portfolio/nw-bend-backyard", image: "https://newportavelandscaping.com/wp-content/uploads/2022/05/NW-Bend-Backyard-After-Picture.jpg" },
      ]}
    />
  );
}
