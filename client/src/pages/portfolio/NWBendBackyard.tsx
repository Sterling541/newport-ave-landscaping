import PortfolioProjectLayout from "@/components/PortfolioProjectLayout";

export default function NWBendBackyard() {
  return (
    <PortfolioProjectLayout
      title="NW Bend Backyard Landscaping"
      subtitle="OUTDOOR ENTERTAINMENT SPACE"
      heroImage="/manus-storage/nw-bend-backyard-01_e6d82c48.jpg"
      canonicalPath="/portfolio/nw-bend-backyard"
      description={`The owners wanted to reinvent their yard to be an ideal entertainment and relaxation space. The original space was sage brush, rabbit brush, and small boulder outcroppings — a typical Central Oregon blank slate.\n\nWe installed a pondless water feature with a 40-foot long stream containing mossy boulders to enhance the audible environment. Then we added a 3-hole synthetic grass putting green with fringe to increase entertainment value.\n\nA decomposed granite pathway winds through the space, connecting the various zones. Landscape lighting was integrated throughout, and drought-tolerant plantings were selected to create a lush feel without excessive water use. The result is a backyard that truly lives up to the Central Oregon lifestyle.`}
      details={[
        { label: "LOCATION", value: "Northwest Bend, OR" },
        { label: "PROJECT TYPE", value: "Outdoor Entertainment Space" },
        { label: "SERVICES", value: "Pondless Water Feature, Putting Green, DG Pathway, Landscape Lighting, Plantings" },
        { label: "WATER FEATURE", value: "40ft stream with mossy boulders" },
        { label: "PUTTING GREEN", value: "3-hole synthetic grass with fringe" },
      ]}
      images={[
        { src: "/manus-storage/nw-bend-backyard-01_e6d82c48.jpg", alt: "NW Bend Backyard After" },
        { src: "/manus-storage/nw-bend-backyard-02_2ad725ef.jpeg", alt: "NW Bend Water Feature Pathway" },
      ]}
      prevProject={{ title: "East Bend Landscape Install", href: "/portfolio/east-bend-landscape" }}
      nextProject={{ title: "Paver Patio & Gas Firepit", href: "/portfolio/paver-patio-firepit" }}
      relatedProjects={[
        { title: "Broken Top Water Feature", href: "/portfolio/broken-top-water-feature", image: "/manus-storage/brokentop-water-fire-01_54836cf3.jpg" },
        { title: "SW Bend Backyard", href: "/portfolio/sw-bend-backyard", image: "/manus-storage/sw-bend-01_45e68c0e.jpg" },
        { title: "Paver Patio & Gas Firepit", href: "/portfolio/paver-patio-firepit", image: "/manus-storage/paver-patio-and-gas-firepit-02_298e674d.jpg" },
      ]}
    />
  );
}
