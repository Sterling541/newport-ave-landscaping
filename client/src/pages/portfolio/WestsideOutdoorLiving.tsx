import PortfolioProjectLayout from "@/components/PortfolioProjectLayout";

export default function WestsideOutdoorLiving() {
  return (
    <PortfolioProjectLayout
      title="Westside Outdoor Living Space"
      subtitle="OUTDOOR LIVING · WATER FEATURES · HARDSCAPE"
      heroImage="/manus-storage/westside-living-01_30518074.jpg"
      canonicalPath="/portfolio/westside-outdoor-living"
      description={`The original space was a steep hill with nothing more than some sage, rabbit brush, and boulder outcroppings. The owners wanted to reinvent the space to provide room to entertain and to further enjoy the stunning view of the Deschutes River.\n\nWe started by creating a pondless water feature — grading the hill and installing a 40-foot long stream with mossy boulders. We then stripped, pressure-treated, reinforced, and refinished the existing deck with Belgard Rustic Lafitt pavers. The deck and patio closest to the river were covered with cedar (tongue and groove), and recessed lighting and infrared heaters were installed. New powder-coated cable wire railing was installed around the deck, and a hot tub was sunk into the new deck.\n\nOnce the hot tub was in, we laid a new patio around it using Belgard Mega Arbel pavers with natural edges for a rustic look. A boulder bridge was installed over the stream to transition the patio to the new deck. The outdoor fireplace and chimney came next — an Isokern natural gas fire chimney covered in Sebastian veneer and 2" mahogany flagstone.\n\nLandscape lighting was the finishing touch: 50 FX Luminaire landscape lights capable of changing color and brightness via a smartphone app. Finally, the entire area was replanted with over 250 new trees, shrubs, and perennials, and re-barked with dark hemlock. The final product was stunning.`}
      details={[
        { label: "LOCATION", value: "Westside, Bend, OR" },
        { label: "PROJECT TYPE", value: "Full Outdoor Living Transformation" },
        { label: "SERVICES", value: "Water Feature, Deck Refinishing, Patio Installation, Outdoor Fireplace, Landscape Lighting, Planting" },
        { label: "TIME TO COMPLETION", value: "16 weeks" },
        { label: "MATERIALS", value: "Belgard Rustic Lafitt Pavers, Cedar, Infrared Heaters, Powder-Coated Wire Cable, Belgard Mega Arbel Pavers, Isokern Natural Gas Chimney, 50 FX Luminaire Lights, 250+ Plants, Dark Hemlock Bark, Mossy Boulders" },
      ]}
      images={[
        {
          src: "/manus-storage/westside-living-01_30518074.jpg",
          alt: "Westside outdoor living space with cedar deck, water feature, and outdoor fireplace — Bend, Oregon",
        },
        {
          src: "/manus-storage/westside-living-30_8585dac7.jpg",
          alt: "Before: steep hillside with sage and rabbit brush — Westside Bend, Oregon",
        },
        {
          src: "/manus-storage/westside-living-10_cf34e1da.jpg",
          alt: "Isokern natural gas fireplace with Sebastian veneer and mahogany flagstone — Bend, OR",
        },
      ]}
      prevProject={{ title: "NW Bend Landscape Lighting", href: "/portfolio/nw-bend-lighting" }}
      nextProject={{ title: "Century Drive Landscape Enhancement", href: "/portfolio/century-drive" }}
      relatedProjects={[
        {
          title: "Broken Top Water Feature & Fire Pit",
          href: "/portfolio/broken-top-water-feature",
          image: "/manus-storage/brokentop-water-fire-01_54836cf3.jpg",
        },
        {
          title: "Paver Patio & Gas Firepit",
          href: "/portfolio/paver-patio-firepit",
          image: "/manus-storage/paver-patio-and-gas-firepit-03_efd36531.jpg",
        },
        {
          title: "Awbrey Butte Patio Extension",
          href: "/portfolio/awbrey-butte-patio",
          image: "/manus-storage/awbrey-patio-wall-01_bde91632.jpg",
        },
      ]}
    />
  );
}
