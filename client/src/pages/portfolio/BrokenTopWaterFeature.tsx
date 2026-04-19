import PortfolioProjectLayout from "@/components/PortfolioProjectLayout";

export default function BrokenTopWaterFeature() {
  return (
    <PortfolioProjectLayout
      title="Broken Top Water Feature & Sunken Fire Pit"
      subtitle="WATER FEATURE & OUTDOOR LIVING"
      heroImage="/manus-storage/brokentop-water-fire-01_54836cf3.jpg"
      description={`This Broken Top residence received a dramatic outdoor transformation centered around two focal points: a custom water feature and a sunken fire pit area.\n\nThe pondless water feature creates a soothing, naturalistic sound environment with carefully selected boulders and aquatic plantings. The sunken fire pit area was excavated and finished with natural stone seating, creating an intimate gathering space that feels like a natural amphitheater.\n\nLandscape lighting was integrated throughout to ensure the space is equally stunning after dark, making it a year-round entertainment destination.`}
      details={[
        { label: "LOCATION", value: "Broken Top, Bend, OR" },
        { label: "PROJECT TYPE", value: "Water Feature & Outdoor Living" },
        { label: "SERVICES", value: "Pondless Water Feature, Sunken Fire Pit, Natural Stone, Landscape Lighting" },
      ]}
      images={[
        { src: "/manus-storage/brokentop-water-fire-01_54836cf3.jpg", alt: "Broken Top Water Feature After" },
        { src: "/manus-storage/brokentop-water-fire-14_0ef431c5.jpg", alt: "Broken Top Water Feature Before" },
      ]}
      prevProject={{ title: "Backyard Landscape Renovation", href: "/portfolio/backyard-renovation" }}
      nextProject={{ title: "Broken Top Xeriscape", href: "/portfolio/broken-top-xeriscape" }}
      relatedProjects={[
        { title: "NW Bend Backyard", href: "/portfolio/nw-bend-backyard", image: "/manus-storage/nw-bend-backyard-01_e6d82c48.jpg" },
        { title: "Paver Patio & Gas Firepit", href: "/portfolio/paver-patio-firepit", image: "/manus-storage/paver-patio-and-gas-firepit-02_298e674d.jpg" },
        { title: "SW Bend Backyard", href: "/portfolio/sw-bend-backyard", image: "/manus-storage/sw-bend-01_45e68c0e.jpg" },
      ]}
    />
  );
}
