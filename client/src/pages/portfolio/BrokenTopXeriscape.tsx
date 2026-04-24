import PortfolioProjectLayout from "@/components/PortfolioProjectLayout";

export default function BrokenTopXeriscape() {
  return (
    <PortfolioProjectLayout
      title="Broken Top Xeriscape"
      subtitle="XERISCAPE RENOVATION"
      heroImage="/manus-storage/brokentop-xeriscape-01_064e5008.jpg"
      canonicalPath="/portfolio/broken-top-xeriscape"
      description={`Complete landscape renovation inspired by the concept of order versus chaos — man versus nature. The client, a very talented painter, was inspired by landscapes of chaos, which became the design philosophy for this project.\n\nThe large turf area in the back of this Brokentop residence was removed and replaced with usable patio space. All sprinklers and irrigation in the backyard were removed and retrofitted with a low-water drip irrigation system.\n\nNative and drought-tolerant plants were selected to create a dynamic, textured landscape that feels wild and intentional at the same time — a true reflection of the client's artistic vision and Central Oregon's natural environment.`}
      details={[
        { label: "LOCATION", value: "Broken Top, Bend, OR" },
        { label: "PROJECT TYPE", value: "Xeriscape / Complete Renovation" },
        { label: "SERVICES", value: "Turf Removal, Drip Irrigation, Patio Installation, Native Plantings" },
        { label: "CONCEPT", value: "Order vs. Chaos — Man vs. Nature" },
      ]}
      images={[
        { src: "/manus-storage/brokentop-xeriscape-01_064e5008.jpg", alt: "Broken Top Xeriscape After" },
        { src: "/manus-storage/brokentop-xeriscape-14_b3866afa.png", alt: "Broken Top Xeriscape Before" },
        { src: "/manus-storage/bend-oregon-brokentop-xeriscape-finished-backyard_b47de221.png", alt: "Broken Top xeriscape finished backyard — Bend, OR" },
      ]}
      prevProject={{ title: "Broken Top Water Feature", href: "/portfolio/broken-top-water-feature" }}
      nextProject={{ title: "Century Drive Landscape Enhancement", href: "/portfolio/century-drive" }}
      relatedProjects={[
        { title: "Awbrey Butte Xeriscape", href: "/portfolio/awbrey-butte-xeriscape", image: "/manus-storage/awbrey-xeriscape-01_16545639.jpg" },
        { title: "East Bend Landscape Install", href: "/portfolio/east-bend-landscape", image: "/manus-storage/east-bend-install-01_5ad4daf3.jpg" },
        { title: "SW Bend Backyard", href: "/portfolio/sw-bend-backyard", image: "/manus-storage/sw-bend-01_45e68c0e.jpg" },
      ]}
    />
  );
}
