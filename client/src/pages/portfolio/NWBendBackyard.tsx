import PortfolioProjectLayout from "@/components/PortfolioProjectLayout";

export default function NWBendBackyard() {
  return (
    <PortfolioProjectLayout
      title="NW Bend Backyard Landscaping"
      subtitle="OUTDOOR ENTERTAINMENT SPACE"
      heroImage="https://newportavelandscaping.com/wp-content/uploads/2022/05/NW-Bend-Backyard-After-Picture.jpg"
      description={`The owners wanted to reinvent their yard to be an ideal entertainment and relaxation space. The original space was sage brush, rabbit brush, and small boulder outcroppings — a typical Central Oregon blank slate.\n\nWe installed a pondless water feature with a 40-foot long stream containing mossy boulders to enhance the audible environment. Then we added a 3-hole synthetic grass putting green with fringe to increase entertainment value.\n\nA decomposed granite pathway winds through the space, connecting the various zones. Landscape lighting was integrated throughout, and drought-tolerant plantings were selected to create a lush feel without excessive water use. The result is a backyard that truly lives up to the Central Oregon lifestyle.`}
      details={[
        { label: "LOCATION", value: "Northwest Bend, OR" },
        { label: "PROJECT TYPE", value: "Outdoor Entertainment Space" },
        { label: "SERVICES", value: "Pondless Water Feature, Putting Green, DG Pathway, Landscape Lighting, Plantings" },
        { label: "WATER FEATURE", value: "40ft stream with mossy boulders" },
        { label: "PUTTING GREEN", value: "3-hole synthetic grass with fringe" },
      ]}
      images={[
        { src: "https://newportavelandscaping.com/wp-content/uploads/2022/05/NW-Bend-Backyard-After-Picture.jpg", alt: "NW Bend Backyard After" },
        { src: "https://newportavelandscaping.com/wp-content/uploads/2022/05/nw-bend-backyard-install-pondless-water-feature-pathway-with-lighting-1.jpeg", alt: "NW Bend Water Feature Pathway" },
      ]}
      prevProject={{ title: "East Bend Landscape Install", href: "/portfolio/east-bend-landscape" }}
      nextProject={{ title: "Paver Patio & Gas Firepit", href: "/portfolio/paver-patio-firepit" }}
      relatedProjects={[
        { title: "Broken Top Water Feature", href: "/portfolio/broken-top-water-feature", image: "https://newportavelandscaping.com/wp-content/uploads/2022/05/Brokentop-Water-Feature-and-Sunken-Fire-Pit-After-Picture.jpg" },
        { title: "SW Bend Backyard", href: "/portfolio/sw-bend-backyard", image: "https://newportavelandscaping.com/wp-content/uploads/2022/05/south-west-bend-oregon-campground-backyard-full-view-2.jpg" },
        { title: "Paver Patio & Gas Firepit", href: "/portfolio/paver-patio-firepit", image: "https://newportavelandscaping.com/wp-content/uploads/2022/05/bend-oregon-paver-patio-gas-firepit-photo-2.jpg" },
      ]}
    />
  );
}
