import PortfolioProjectLayout from "@/components/PortfolioProjectLayout";

export default function EastBendLandscape() {
  return (
    <PortfolioProjectLayout
      title="East Bend Landscape Install"
      subtitle="NEW CONSTRUCTION LANDSCAPE"
      heroImage="/manus-storage/east-bend-install-01_5ad4daf3.jpg"
      canonicalPath="/portfolio/east-bend-landscape"
      description={`New construction landscape installation on the East side of Bend. The original space was sage brush and juniper trees — a blank slate with enormous potential.\n\nWe cleared the area and installed approximately 12,000 sq ft of turf grass, 50+ maple trees, fruit trees, a plunge pool, landscape lighting, a sound system, a sandy beach area, a playground area, and even a goat and chicken area.\n\nThis project is a testament to what's possible when a client has a vision and trusts their landscaping team to execute it at the highest level. The result is a fully self-contained outdoor lifestyle property unlike anything else in Central Oregon.`}
      details={[
        { label: "LOCATION", value: "East Bend, OR" },
        { label: "PROJECT TYPE", value: "New Construction Landscape" },
        { label: "TIME TO COMPLETION", value: "15 weeks" },
        { label: "TURF INSTALLED", value: "~12,000 sq ft" },
        { label: "TREES PLANTED", value: "50+ maple trees + fruit trees" },
        { label: "SERVICES", value: "Plunge Pool, Landscape Lighting, Sound System, Beach Area, Playground, Animal Area" },
      ]}
      images={[
        { src: "/manus-storage/east-bend-install-01_5ad4daf3.jpg", alt: "East Bend Paver Driveway" },
        { src: "/manus-storage/east-bend-install-18_830937d4.jpg", alt: "East Bend Backyard Aerial View" },
        { src: "/manus-storage/292769550_5337859476252106_6704842826268024670_n_b9b2c245.jpg", alt: "East Bend landscape install — Bend, OR" },
        { src: "/manus-storage/east-bend-landscape-install-finished-backyard-aeriel-view2_3758f2f5.jpg", alt: "East Bend landscape install finished backyard aerial view — Bend, OR" },
        { src: "/manus-storage/east-bend-landscaping-redesign_b5a16c50.jpg", alt: "East Bend landscaping redesign — Bend, OR" },
        { src: "/manus-storage/south-east-bend-oregon-backyard-landscape-renovation-after-photo-1_43e52905.jpg", alt: "South East Bend backyard landscape renovation after — Bend, OR" },
      ]}
      prevProject={{ title: "Century Drive Landscape Enhancement", href: "/portfolio/century-drive" }}
      nextProject={{ title: "NW Bend Backyard Landscaping", href: "/portfolio/nw-bend-backyard" }}
      relatedProjects={[
        { title: "SW Bend Backyard", href: "/portfolio/sw-bend-backyard", image: "/manus-storage/sw-bend-01_45e68c0e.jpg" },
        { title: "Awbrey Butte Xeriscape", href: "/portfolio/awbrey-butte-xeriscape", image: "/manus-storage/awbrey-xeriscape-01_16545639.jpg" },
        { title: "Broken Top Xeriscape", href: "/portfolio/broken-top-xeriscape", image: "/manus-storage/brokentop-xeriscape-01_064e5008.jpg" },
      ]}
    />
  );
}
