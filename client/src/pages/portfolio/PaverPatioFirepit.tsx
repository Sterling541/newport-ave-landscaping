import PortfolioProjectLayout from "@/components/PortfolioProjectLayout";

export default function PaverPatioFirepit() {
  return (
    <PortfolioProjectLayout
      title="Paver Patio & Gas Firepit"
      subtitle="OUTDOOR LIVING SPACE"
      heroImage="https://newportavelandscaping.com/wp-content/uploads/2022/05/bend-oregon-paver-patio-gas-firepit-photo-2.jpg"
      description={`The client wanted to turn their backyard into a functional retreat. The existing backyard was bark with a drip system and a few shrubs and trees — functional but uninspiring.\n\nWe started by removing the existing bark and cleaning up the yard. We built a solar radiating planter bed, installed a decomposed granite pathway, and installed a Belgard paver patio. We then built a natural gas fire pit with a custom stone surround.\n\nThe combination of the warm paver tones, the crackling gas fire, and the carefully selected plantings creates an outdoor space that feels like a true extension of the home — a place to gather, relax, and enjoy the Central Oregon evenings.`}
      details={[
        { label: "LOCATION", value: "Bend, OR" },
        { label: "PROJECT TYPE", value: "Outdoor Living Space" },
        { label: "PATIO MATERIAL", value: "Belgard Pavers" },
        { label: "SERVICES", value: "Paver Patio, Gas Fire Pit, DG Pathway, Planter Beds, Plantings" },
      ]}
      images={[
        { src: "https://newportavelandscaping.com/wp-content/uploads/2022/05/bend-oregon-paver-patio-gas-firepit-photo-2.jpg", alt: "Paver Patio Gas Firepit Photo 2" },
        { src: "https://newportavelandscaping.com/wp-content/uploads/2022/05/bend-oregon-paver-patio-gas-firepit-photo-1.jpg", alt: "Paver Patio Gas Firepit Photo 1" },
      ]}
      prevProject={{ title: "NW Bend Backyard Landscaping", href: "/portfolio/nw-bend-backyard" }}
      nextProject={{ title: "SW Bend Backyard Landscaping", href: "/portfolio/sw-bend-backyard" }}
      relatedProjects={[
        { title: "Broken Top Water Feature", href: "/portfolio/broken-top-water-feature", image: "https://newportavelandscaping.com/wp-content/uploads/2022/05/Brokentop-Water-Feature-and-Sunken-Fire-Pit-After-Picture.jpg" },
        { title: "SW Bend Backyard", href: "/portfolio/sw-bend-backyard", image: "https://newportavelandscaping.com/wp-content/uploads/2022/05/south-west-bend-oregon-campground-backyard-full-view-2.jpg" },
        { title: "Awbrey Glenn Flagstone", href: "/portfolio/awbrey-glenn-flagstone", image: "https://newportavelandscaping.com/wp-content/uploads/2022/05/awbrey-glen-flagstone-front-walkway-after-photo-1.jpg" },
      ]}
    />
  );
}
