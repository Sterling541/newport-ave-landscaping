import PortfolioProjectLayout from "@/components/PortfolioProjectLayout";

export default function PaverPatioFirepit() {
  return (
    <PortfolioProjectLayout
      title="Paver Patio & Gas Firepit"
      subtitle="OUTDOOR LIVING SPACE"
      heroImage="/manus-storage/paver-patio-and-gas-firepit-02_298e674d.jpg"
      description={`The client wanted to turn their backyard into a functional retreat. The existing backyard was bark with a drip system and a few shrubs and trees — functional but uninspiring.\n\nWe started by removing the existing bark and cleaning up the yard. We built a solar radiating planter bed, installed a decomposed granite pathway, and installed a Belgard paver patio. We then built a natural gas fire pit with a custom stone surround.\n\nThe combination of the warm paver tones, the crackling gas fire, and the carefully selected plantings creates an outdoor space that feels like a true extension of the home — a place to gather, relax, and enjoy the Central Oregon evenings.`}
      details={[
        { label: "LOCATION", value: "Bend, OR" },
        { label: "PROJECT TYPE", value: "Outdoor Living Space" },
        { label: "PATIO MATERIAL", value: "Belgard Pavers" },
        { label: "SERVICES", value: "Paver Patio, Gas Fire Pit, DG Pathway, Planter Beds, Plantings" },
      ]}
      images={[
        { src: "/manus-storage/paver-patio-and-gas-firepit-02_298e674d.jpg", alt: "Paver Patio Gas Firepit Photo 2" },
        { src: "/manus-storage/paver-patio-and-gas-firepit-01_04c71c72.jpg", alt: "Paver Patio Gas Firepit Photo 1" },
      ]}
      prevProject={{ title: "NW Bend Backyard Landscaping", href: "/portfolio/nw-bend-backyard" }}
      nextProject={{ title: "SW Bend Backyard Landscaping", href: "/portfolio/sw-bend-backyard" }}
      relatedProjects={[
        { title: "Broken Top Water Feature", href: "/portfolio/broken-top-water-feature", image: "/manus-storage/brokentop-water-fire-01_54836cf3.jpg" },
        { title: "SW Bend Backyard", href: "/portfolio/sw-bend-backyard", image: "/manus-storage/sw-bend-01_45e68c0e.jpg" },
        { title: "Awbrey Glenn Flagstone", href: "/portfolio/awbrey-glenn-flagstone", image: "/manus-storage/awbrey-glen-flagstone-01_cd6f3008.jpg" },
      ]}
    />
  );
}
