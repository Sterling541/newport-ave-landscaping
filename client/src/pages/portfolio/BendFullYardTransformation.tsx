import PortfolioProjectLayout from "@/components/PortfolioProjectLayout";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx";

export default function BendFullYardTransformation() {
  return (
    <PortfolioProjectLayout
      title="Bend Full Yard Transformation"
      subtitle="LANDSCAPE DESIGN & INSTALLATION"
      heroImage={"/manus-storage/proj-bend-after-backyard1_c8556c78_33f6b99d.webp"}
      canonicalPath="/portfolio/bend-full-yard-transformation"
      description={`This Bend property was completely reimagined from a sparse, underutilized front and backyard into a lush, layered outdoor retreat that feels like a private garden sanctuary.\n\nIn the backyard, we installed a sweeping paver patio and curved walkway using Belgard-style pavers, surrounded by raised planting beds bordered with natural stone. The plantings were chosen for four-season interest — a golden Japanese maple anchors the space, with hostas, lavender, ornamental grasses, and perennials filling in the beds with texture and color. Deck steps were upgraded with a clean metal handrail for both safety and style.\n\nThe front yard received an equally dramatic transformation. We replaced the tired lawn with a xeriscape-inspired design featuring natural stone borders, boulders, a dry creek bed, and a curated mix of drought-tolerant wildflowers, ornamental grasses, and native plantings. The result is a front yard that requires minimal water and maintenance while delivering maximum curb appeal through every season.`}
      details={[
        { label: "LOCATION", value: "Bend, OR" },
        { label: "PROJECT TYPE", value: "Full Landscape Design & Installation" },
        { label: "SERVICES", value: "Paver Patio, Walkway, Raised Planting Beds, Xeriscape Front Yard, Boulders, Dry Creek Bed, Plantings" },
        { label: "HIGHLIGHTS", value: "Japanese Maple, Hostas, Lavender, Ornamental Grasses, Native Wildflowers" },
      ]}
      images={[
        { src: "/manus-storage/proj-bend-after-backyard1_c8556c78_33f6b99d.webp", alt: "Backyard after — lush paver path with Japanese maple and hostas" },
        { src: "/manus-storage/proj-bend-after-front1_027d16d2_4737b672.webp", alt: "Front yard after — xeriscape with stone borders and wildflowers" },
        { src: "/manus-storage/proj-bend-after2_eaaa27a2_576b4995.webp", alt: "Backyard after — raised planting beds and curved walkway" },
        { src: "/manus-storage/proj-bend-after3_12e1d334_1f1cdda9.webp", alt: "Backyard after — paver patio with ornamental plantings" },
        { src: "/manus-storage/proj-bend-after4_e16ee193_9e39b091.webp", alt: "Backyard after — lavender and perennial beds" },
        { src: "/manus-storage/proj-bend-after5_7cc88a97_a63a7faa.webp", alt: "Backyard after — full view of completed landscape" },
        { src: "/manus-storage/proj-bend-after6_d8661826_2b4cda81.webp", alt: "Backyard after — evening view of completed landscape" },
        { src: "/manus-storage/proj-bend-before-front_aa7b6108_60883f10.webp", alt: "Front yard before — sparse lawn and minimal plantings" },
        { src: "/manus-storage/proj-bend-before-backyard_fd4380dc_c05bd661.webp", alt: "Backyard before — bare patio and sparse plantings" },
        { src: "/manus-storage/proj-bend-before2_b4305fd6_1e5958b8.webp", alt: "Property before — side view" },
        { src: "/manus-storage/proj-bend-before3_01ddc0f3_811cb8b9.webp", alt: "Property before — another angle" },
        { src: "/manus-storage/proj-bend-before4_aaf7a2b1_7c964659.webp", alt: "Property before — backyard angle" },
        { src: "/manus-storage/proj-bend-before5_3693a70a_c5418418.webp", alt: "Property before — additional view" },
        { src: "/manus-storage/proj-bend-before6_020fe1f0_3d932b4c.webp", alt: "Property before — final before angle" },
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
