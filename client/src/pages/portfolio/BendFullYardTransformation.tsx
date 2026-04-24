import PortfolioProjectLayout from "@/components/PortfolioProjectLayout";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx";

export default function BendFullYardTransformation() {
  return (
    <PortfolioProjectLayout
      title="Bend Full Yard Transformation"
      subtitle="LANDSCAPE DESIGN & INSTALLATION"
      heroImage={`${CDN}/proj-bend-after-backyard1_c8556c78.jpg`}
      canonicalPath="/portfolio/bend-full-yard-transformation"
      description={`This Bend property was completely reimagined from a sparse, underutilized front and backyard into a lush, layered outdoor retreat that feels like a private garden sanctuary.\n\nIn the backyard, we installed a sweeping paver patio and curved walkway using Belgard-style pavers, surrounded by raised planting beds bordered with natural stone. The plantings were chosen for four-season interest — a golden Japanese maple anchors the space, with hostas, lavender, ornamental grasses, and perennials filling in the beds with texture and color. Deck steps were upgraded with a clean metal handrail for both safety and style.\n\nThe front yard received an equally dramatic transformation. We replaced the tired lawn with a xeriscape-inspired design featuring natural stone borders, boulders, a dry creek bed, and a curated mix of drought-tolerant wildflowers, ornamental grasses, and native plantings. The result is a front yard that requires minimal water and maintenance while delivering maximum curb appeal through every season.`}
      details={[
        { label: "LOCATION", value: "Bend, OR" },
        { label: "PROJECT TYPE", value: "Full Landscape Design & Installation" },
        { label: "SERVICES", value: "Paver Patio, Walkway, Raised Planting Beds, Xeriscape Front Yard, Boulders, Dry Creek Bed, Plantings" },
        { label: "HIGHLIGHTS", value: "Japanese Maple, Hostas, Lavender, Ornamental Grasses, Native Wildflowers" },
      ]}
      images={[
        { src: `${CDN}/proj-bend-after-backyard1_c8556c78.jpg`, alt: "Backyard after — lush paver path with Japanese maple and hostas" },
        { src: `${CDN}/proj-bend-after-front1_027d16d2.jpg`, alt: "Front yard after — xeriscape with stone borders and wildflowers" },
        { src: `${CDN}/proj-bend-after2_eaaa27a2.jpg`, alt: "Backyard after — raised planting beds and curved walkway" },
        { src: `${CDN}/proj-bend-after3_12e1d334.jpg`, alt: "Backyard after — paver patio with ornamental plantings" },
        { src: `${CDN}/proj-bend-after4_e16ee193.jpg`, alt: "Backyard after — lavender and perennial beds" },
        { src: `${CDN}/proj-bend-after5_7cc88a97.jpg`, alt: "Backyard after — full view of completed landscape" },
        { src: `${CDN}/proj-bend-after6_d8661826.jpg`, alt: "Backyard after — evening view of completed landscape" },
        { src: `${CDN}/proj-bend-before-front_aa7b6108.jpg`, alt: "Front yard before — sparse lawn and minimal plantings" },
        { src: `${CDN}/proj-bend-before-backyard_fd4380dc.jpg`, alt: "Backyard before — bare patio and sparse plantings" },
        { src: `${CDN}/proj-bend-before2_b4305fd6.jpg`, alt: "Property before — side view" },
        { src: `${CDN}/proj-bend-before3_01ddc0f3.jpg`, alt: "Property before — another angle" },
        { src: `${CDN}/proj-bend-before4_aaf7a2b1.jpg`, alt: "Property before — backyard angle" },
        { src: `${CDN}/proj-bend-before5_3693a70a.jpg`, alt: "Property before — additional view" },
        { src: `${CDN}/proj-bend-before6_020fe1f0.jpg`, alt: "Property before — final before angle" },
      ]}
      prevProject={{ title: "Awbrey Butte Xeriscape", href: "/portfolio/awbrey-butte-xeriscape" }}
      nextProject={{ title: "SW Bend Backyard", href: "/portfolio/sw-bend-backyard" }}
      relatedProjects={[
        { title: "NW Bend Backyard", href: "/portfolio/nw-bend-backyard", image: "/manus-storage/nw-bend-backyard-01_e6d82c48.jpg" },
        { title: "Broken Top Water Feature", href: "/portfolio/broken-top-water-feature", image: "/manus-storage/brokentop-water-fire-01_54836cf3.jpg" },
        { title: "East Bend Landscape Install", href: "/portfolio/east-bend-landscape", image: "/manus-storage/east-bend-install-01_5ad4daf3.jpg" },
      ]}
    />
  );
}
