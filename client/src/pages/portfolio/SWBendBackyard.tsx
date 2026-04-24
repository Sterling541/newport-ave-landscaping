import PortfolioProjectLayout from "@/components/PortfolioProjectLayout";

export default function SWBendBackyard() {
  return (
    <PortfolioProjectLayout
      title="SW Bend Backyard Landscaping"
      subtitle="OUTDOOR LIVING — CAMPGROUND THEME"
      heroImage="/manus-storage/sw-bend-01_45e68c0e.jpg"
      canonicalPath="/portfolio/sw-bend-backyard"
      description={`This new construction home on Bend, Oregon's SW side had a blank slate with tons of potential. The owners wanted to feel like they were camping right in their very own backyard.\n\nTo build this environment, we installed an open beam pergola using cedar stained a grayish/blue color to match the existing trim. Corbels were modeled after the corbels on the roof of the home. A new patio was installed using natural flagstone, and a custom fire pit was built as the centerpiece.\n\nThe planting palette was selected to evoke the feeling of a mountain campsite — native grasses, conifers, and ground covers that thrive in Central Oregon's climate. The result is a backyard that genuinely feels like an escape, right at home.`}
      details={[
        { label: "LOCATION", value: "Southwest Bend, OR" },
        { label: "PROJECT TYPE", value: "New Construction Landscape" },
        { label: "THEME", value: "Campground / Mountain Retreat" },
        { label: "SERVICES", value: "Cedar Pergola, Flagstone Patio, Fire Pit, Native Plantings" },
        { label: "PERGOLA MATERIAL", value: "Cedar stained grayish/blue" },
      ]}
      images={[
        { src: "/manus-storage/sw-bend-01_45e68c0e.jpg", alt: "SW Bend Backyard Full View" },
        { src: "/manus-storage/se-bend-renovation-01_487ce10e.jpg", alt: "SW Bend Backyard Detail" },
      ]}
      prevProject={{ title: "Paver Patio & Gas Firepit", href: "/portfolio/paver-patio-firepit" }}
      nextProject={{ title: "Awbrey Butte Xeriscape", href: "/portfolio/awbrey-butte-xeriscape" }}
      relatedProjects={[
        { title: "NW Bend Backyard", href: "/portfolio/nw-bend-backyard", image: "/manus-storage/nw-bend-backyard-01_e6d82c48.jpg" },
        { title: "Backyard Landscape Renovation", href: "/portfolio/backyard-renovation", image: "/manus-storage/se-bend-renovation-01_487ce10e.jpg" },
        { title: "East Bend Landscape Install", href: "/portfolio/east-bend-landscape", image: "/manus-storage/east-bend-install-01_5ad4daf3.jpg" },
      ]}
    />
  );
}
