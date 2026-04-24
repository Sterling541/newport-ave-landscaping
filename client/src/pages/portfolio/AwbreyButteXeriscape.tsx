import PortfolioProjectLayout from "@/components/PortfolioProjectLayout";

export default function AwbreyButteXeriscape() {
  return (
    <PortfolioProjectLayout
      title="Awbrey Butte Xeriscape"
      subtitle="LANDSCAPE RENOVATION"
      heroImage="/manus-storage/awbrey-xeriscape-01_16545639.jpg"
      canonicalPath="/portfolio/awbrey-butte-xeriscape"
      description={`This Awbrey Butte property underwent a complete xeriscape transformation. The client wanted a low-water, low-maintenance landscape that still looked lush and beautiful year-round.\n\nWe removed the existing lawn and replaced it with drought-tolerant native plants, decorative rock, and a drip irrigation system designed to minimize water usage while keeping the landscape thriving through Central Oregon's dry summers.\n\nThe result is a stunning, sustainable landscape that complements the natural high-desert environment of Bend, Oregon — and significantly reduces the client's water bill.`}
      details={[
        { label: "LOCATION", value: "Awbrey Butte, Bend, OR" },
        { label: "PROJECT TYPE", value: "Xeriscape / Landscape Renovation" },
        { label: "SERVICES", value: "Xeriscape Design, Drip Irrigation, Rock Installation, Native Plantings" },
      ]}
      images={[
        { src: "/manus-storage/awbrey-xeriscape-01_16545639.jpg", alt: "Awbrey Butte Xeriscape After" },
        { src: "/manus-storage/awbrey-xeriscape-02_3e6c0ad3.jpg", alt: "Awbrey Butte Xeriscape Night Shot" },
      ]}
      prevProject={{ title: "SW Bend Backyard Landscaping", href: "/portfolio/sw-bend-backyard" }}
      nextProject={{ title: "Awbrey Glenn Flagstone Patio", href: "/portfolio/awbrey-glenn-flagstone" }}
      relatedProjects={[
        { title: "Broken Top Xeriscape", href: "/portfolio/broken-top-xeriscape", image: "/manus-storage/brokentop-xeriscape-01_064e5008.jpg" },
        { title: "East Bend Landscape Install", href: "/portfolio/east-bend-landscape", image: "/manus-storage/east-bend-install-01_5ad4daf3.jpg" },
        { title: "NW Bend Backyard", href: "/portfolio/nw-bend-backyard", image: "/manus-storage/nw-bend-backyard-01_e6d82c48.jpg" },
      ]}
    />
  );
}
