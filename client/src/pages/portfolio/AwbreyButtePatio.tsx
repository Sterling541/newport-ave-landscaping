import PortfolioProjectLayout from "@/components/PortfolioProjectLayout";

export default function AwbreyButtePatio() {
  return (
    <PortfolioProjectLayout
      title="Awbrey Butte Patio Extension and Wall"
      subtitle="HARDSCAPE · OUTDOOR LIVING"
      heroImage="/manus-storage/awbrey-patio-wall-01_bde91632.jpg"
      canonicalPath="/portfolio/awbrey-butte-patio"
      description={`The client wanted the existing patio extended, high spots from tree roots repaired, and a wall built for privacy and continuity. They also wanted their hot tub better incorporated into the backyard.\n\nWe excavated and extended the current patio using Vista pavers in a Walnut blend. We then built approximately 30 linear feet of freestanding wall using "Chateau Wall" blocks (made by Western Interlock) in a walnut blend to enclose the new patio and add a sense of privacy and security.\n\nWe were initially concerned that the back of the curved wall would have unattractive gaps, but the end product came out looking fantastic. Finally, a concrete hot tub pad was poured and all electrical was extended — we always recommend pouring a concrete pad rather than setting a spa directly on pavers.`}
      details={[
        { label: "LOCATION", value: "Awbrey Butte, Bend, OR" },
        { label: "PROJECT TYPE", value: "Patio Extension & Retaining Wall" },
        { label: "SERVICES", value: "Paver Installation, Freestanding Wall, Hot Tub Pad, Electrical Extension" },
        { label: "TIME TO COMPLETION", value: "1 week" },
        { label: "MATERIALS", value: "Walnut Vista Pavers, Walnut Chateau Wall Blocks (Western Interlock), Concrete" },
        { label: "INVESTMENT", value: "$12,000 – $15,000" },
      ]}
      images={[
        {
          src: "/manus-storage/awbrey-patio-wall-01_bde91632.jpg",
          alt: "Awbrey Butte patio extension with Walnut Vista pavers and Chateau Wall — Bend, Oregon",
        },
        {
          src: "/manus-storage/awbrey-patio-wall-02_066fe2ff.jpg",
          alt: "Freestanding Chateau Wall and hot tub concrete pad — Awbrey Butte, Bend, OR",
        },
        {
          src: "/manus-storage/awbrey-butte-freestanding-wall-pavers-patio-extension_6654682c.jpg",
          alt: "Awbrey Butte freestanding wall and paver patio extension — Bend, OR",
        },
        {
          src: "/manus-storage/M-Wall-3_94c5f5e0.jpg",
          alt: "Masonry wall detail — Awbrey Butte patio project, Bend, OR",
        },
      ]}
      prevProject={{ title: "Awbrey Butte Xeriscape", href: "/portfolio/awbrey-butte-xeriscape" }}
      nextProject={{ title: "Awbrey Glenn Flagstone Patio", href: "/portfolio/awbrey-glenn-flagstone" }}
      relatedProjects={[
        {
          title: "Paver Patio & Gas Firepit",
          href: "/portfolio/paver-patio-firepit",
          image: "/manus-storage/paver-patio-and-gas-firepit-03_efd36531.jpg",
        },
        {
          title: "Awbrey Glenn Flagstone Patio",
          href: "/portfolio/awbrey-glenn-flagstone",
          image: "/manus-storage/awbrey-glen-flagstone-05_c7fe894d.jpg",
        },
        {
          title: "Westside Outdoor Living Space",
          href: "/portfolio/westside-outdoor-living",
          image: "/manus-storage/westside-living-01_30518074.jpg",
        },
      ]}
    />
  );
}
