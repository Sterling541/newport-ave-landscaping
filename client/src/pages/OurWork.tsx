/* ============================================================
   OUR WORK — Newport Avenue Landscaping
   Real project galleries with lightbox viewer
   Three projects: Suchy Backyard, Hosmer Lake Dr, McGrath Road
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import SEO from "@/components/SEO";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ── Project photo CDN URLs ──────────────────────────────────
const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx";

// Petrosa Neighborhood Backyard — Corten steel fireplace, pergola, outdoor kitchen, in-ground trampoline, Italian cypress
const PETROSA_PHOTOS = [
  "/manus-storage/petrosa-backyard-01_45e0b956.jpg",
  "/manus-storage/petrosa-backyard-02_e4d24c37.jpg",
  "/manus-storage/petrosa-backyard-03_70996f36.jpg",
  "/manus-storage/petrosa-backyard-04_b94208cb.jpg",
  "/manus-storage/petrosa-backyard-05_df6a3572.jpg",
  "/manus-storage/petrosa-backyard-06_95beb7e7.jpg",
  "/manus-storage/petrosa-backyard-07_26d3455b.jpg",
  "/manus-storage/petrosa-backyard-08_c7721a1d.jpg",
  "/manus-storage/petrosa-backyard-09_c21fbf7f.jpg",
  "/manus-storage/petrosa-backyard-10_63e34f09.jpg",
  "/manus-storage/petrosa-backyard-11_c584f553.jpg",
  "/manus-storage/petrosa-backyard-12_06c11ebb.jpg",
  "/manus-storage/petrosa-backyard-13_02ddc7f3.jpg",
  "/manus-storage/petrosa-backyard-14_a9263fc3.jpg",
  "/manus-storage/petrosa-backyard-15_a5692d82.jpg",
  "/manus-storage/petrosa-backyard-16_9892773d.jpg",
  "/manus-storage/petrosa-backyard-17_466b129d.jpg",
  "/manus-storage/petrosa-backyard-18_ce32158e.jpg",
  "/manus-storage/petrosa-backyard-19_317c6f7d.jpg",
];

const HOSMER_PHOTOS = [
  `${CDN}/OAhyShvnyMXUNJqn_48bbbd7f.webp`,
  `${CDN}/ydYuxCwLwzvNoXNQ_3efeb5bf.webp`,
  `${CDN}/UWAoTStKXXBmOBMu_b0d59ac5.webp`,
  `${CDN}/XdRaSxrsEsCUxGCF_5ab35a5d.webp`,
  `${CDN}/QfQcioagkxhCEHdy_d82c4087.webp`,
  `${CDN}/QuZbCMdvWnmWDtAV_0d002a48.webp`,
  `${CDN}/CzvUNmVAPgQRRbCL_a1b2c3d4.webp`,
  `${CDN}/lVVEgyfcxeKKnmyY_2a04bfb2.webp`,
  `${CDN}/zCMVyaDdngZZHvwY_66d79f05.webp`,
  `${CDN}/oFCNJlnwxjSikzrO_14283c30.webp`,
  `${CDN}/CIvaeoiJEjdrssec_e7b2c3a1.webp`,
  `${CDN}/woXXsjlTaYTOCsnM_2e95a253.webp`,
  `${CDN}/lqqurINoAUnLOUdf_2f92d950.webp`,
  `${CDN}/TBxIerDoaHLuautE_76db8efa.webp`,
  `${CDN}/ImggzCVNnPnepqYO_4a2ec446.webp`,
  `${CDN}/owHRteEIGGvRycKl_a2397b3c.webp`,
  `${CDN}/KLMrOoOjCHESBbXd_ce79ee9e.webp`,
];

const MCGRATH_PHOTOS = [
  `${CDN}/DsCDLoIMQbfZSjuQ_b5c6d7e8.webp`,
  `${CDN}/iLQzysWAIpshLExs_cd686ebc.webp`,
  `${CDN}/GnijvQODFDMrKxrg_bdc4efee.webp`,
  `${CDN}/uTOcvbcZVEyEexUs_42a3a31f.webp`,
  `${CDN}/RDRaedrdxFWkLZJv_d329d41b.webp`,
  `${CDN}/retHcMWUuJjuarBk_5cb6b5e7.webp`,
  `${CDN}/ambqMQAjmNxaGfTz_ddd94228.webp`,
  `${CDN}/znXAXegIgUZJRcee_2ed965e4.webp`,
  `${CDN}/EyuWkxTqMKjupGHj_c9d0e1f2.webp`,
  `${CDN}/YvOMYOfUTJLIYxhZ_1a5428d7.webp`,
  `${CDN}/PtamSQtLZMVcIwap_033c59df.webp`,
  `${CDN}/fCBGPaTPIXfgNAhf_92fdbfd4.webp`,
  `${CDN}/VErORHNoPueeEPkG_77c55752.webp`,
  `${CDN}/fcRknhIBupDkiSPP_b43c1c38.webp`,
  `${CDN}/cgCFmZdHHBxadBtL_a351e89a.webp`,
  `${CDN}/iIASQJimTxkHYTiX_097a34ca.webp`,
  `${CDN}/veogFfZmynMseowj_8f8ae20b.webp`,
  `${CDN}/tHsXSKcevhyhsRjZ_a22ce559.webp`,
  `${CDN}/hIxjTkMgIukczrmz_89b818ae.webp`,
  `${CDN}/CrNsPnwGSyMrKqea_c9d4e5f2.webp`,
];

// Awbrey Butte Loop — luxury outdoor living: pond, fire pit, pergola, xeriscape
const AWBREY_LOOP_PHOTOS = [
  "/manus-storage/awbrey-butte-loop-02_77381709.jpg",
  "/manus-storage/awbrey-butte-loop-06_d22e4bae.jpg",
  "/manus-storage/awbrey-butte-loop-04_9bb6a696.jpg",
  "/manus-storage/awbrey-butte-loop-11_dc6042fc.jpg",
  "/manus-storage/awbrey-butte-loop-01_a3d27fee.jpg",
  "/manus-storage/awbrey-butte-loop-03_bab48f19.jpg",
  "/manus-storage/awbrey-butte-loop-05_eadee38f.jpg",
  "/manus-storage/awbrey-butte-loop-07_583d02af.jpg",
  "/manus-storage/awbrey-butte-loop-08_194d2baf.jpg",
  "/manus-storage/awbrey-butte-loop-09_28d05fd8.jpg",
  "/manus-storage/awbrey-butte-loop-10_0e84f541.jpg",
];

// East Bend Entrance — brick paver driveway & planting refresh (unblurred originals)
const EAST_BEND_ENTRANCE_PHOTOS = [
  "/manus-storage/east-bend-entrance-after1-orig_b00f7ed0.jpg",
  "/manus-storage/east-bend-entrance-after2-orig_dc2b274b.jpg",
  "/manus-storage/east-bend-entrance-after3-orig_39af61e3.jpg",
  "/manus-storage/east-bend-entrance-after4-orig_6389cc1c.jpg",
  "/manus-storage/east-bend-entrance-before1-orig_70eb636f.jpg",
  "/manus-storage/east-bend-entrance-before2-orig_34328cb6.jpg",
  "/manus-storage/east-bend-entrance-before3-orig_2cd94772.jpg",
];

// Boulder Terracing & Planting — hillside transformation
const BOULDER_TERRACE_PHOTOS = [
  "/manus-storage/boulder-terrace-after1_f09941f2.jpg",
  "/manus-storage/boulder-terrace-after2_88fb51db.jpg",
  "/manus-storage/boulder-terrace-after3_b8280194.jpg",
  "/manus-storage/boulder-terrace-before1_ebbc75ec.jpg",
  "/manus-storage/boulder-terrace-before2_756e950c.jpg",
];

// Awbrey Butte Patio Extension & Wall — real project photos from old site
const AWBREY_PHOTOS = [
  "/manus-storage/awbrey-patio-wall-01_bde91632.jpg",
  "/manus-storage/awbrey-patio-wall-02_066fe2ff.jpg",
];

// Scraped project photo arrays — all CDN hosted (v2 re-upload)
const EAST_BEND_INSTALL_PHOTOS = [
  "/manus-storage/east-bend-install-01_5ad4daf3.jpg",
  "/manus-storage/east-bend-install-02_a655850b.jpg",
  "/manus-storage/east-bend-install-03_629df888.jpg",
  "/manus-storage/east-bend-install-04_e94e5508.jpg",
  "/manus-storage/east-bend-install-05_b8fd5e93.jpg",
  "/manus-storage/east-bend-install-06_c2e79a8c.jpg",
  "/manus-storage/east-bend-install-07_c39645a1.jpg",
  "/manus-storage/east-bend-install-08_862c8788.jpg",
  "/manus-storage/east-bend-install-09_b4426ba9.jpg",
  "/manus-storage/east-bend-install-10_37c44e64.jpg",
  "/manus-storage/east-bend-install-11_76015e72.jpg",
  "/manus-storage/east-bend-install-12_f30097ff.jpg",
  "/manus-storage/east-bend-install-13_f24364e1.jpg",
  "/manus-storage/east-bend-install-14_8925bfd0.jpg",
  "/manus-storage/east-bend-install-15_3e9c1653.jpg",
  "/manus-storage/east-bend-install-16_b02b3390.jpg",
  "/manus-storage/east-bend-install-17_e2746fdb.jpg",
  "/manus-storage/east-bend-install-18_830937d4.jpg",
  "/manus-storage/east-bend-install-19_5fd174fe.jpg",
  "/manus-storage/east-bend-install-20_fed68b71.jpg",
];
const BROKENTOP_XERISCAPE_PHOTOS = [
  "/manus-storage/brokentop-xeriscape-01_064e5008.jpg",
  "/manus-storage/brokentop-xeriscape-02_78f39ca1.jpg",
  "/manus-storage/brokentop-xeriscape-03_9aa08ebf.png",
  "/manus-storage/brokentop-xeriscape-04_a28dabea.png",
  "/manus-storage/brokentop-xeriscape-05_df5ce552.png",
  "/manus-storage/brokentop-xeriscape-06_7dc058bc.png",
  "/manus-storage/brokentop-xeriscape-07_52f943ae.png",
  "/manus-storage/brokentop-xeriscape-08_cbf027d6.png",
  "/manus-storage/brokentop-xeriscape-09_98d0f4b4.png",
  "/manus-storage/brokentop-xeriscape-10_0c7e1c22.png",
  "/manus-storage/brokentop-xeriscape-11_6fb5c8a6.png",
  "/manus-storage/brokentop-xeriscape-12_7ce71878.png",
  "/manus-storage/brokentop-xeriscape-13_3a18dc79.png",
  "/manus-storage/brokentop-xeriscape-14_b3866afa.png",
  "/manus-storage/brokentop-xeriscape-15_0d312e39.png",
];
const WESTSIDE_LIVING_PHOTOS = [
  "/manus-storage/westside-living-01_30518074.jpg",
  "/manus-storage/westside-living-02_766cedd3.jpg",
  "/manus-storage/westside-living-03_c052c1f3.jpg",
  "/manus-storage/westside-living-04_def5ab02.jpg",
  "/manus-storage/westside-living-05_f408d2f1.jpg",
  "/manus-storage/westside-living-06_f7789a0f.jpg",
  "/manus-storage/westside-living-07_01eadf0c.jpg",
  "/manus-storage/westside-living-08_2a46b630.jpg",
  "/manus-storage/westside-living-09_f28e9bc5.jpg",
  "/manus-storage/westside-living-10_cf34e1da.jpg",
  "/manus-storage/westside-living-11_48ba0ef6.jpg",
  "/manus-storage/westside-living-12_44c2b821.jpg",
  "/manus-storage/westside-living-13_4cf401fd.jpg",
  "/manus-storage/westside-living-14_74305879.jpg",
  "/manus-storage/westside-living-15_e82ad57c.jpg",
  "/manus-storage/westside-living-16_43b0ff12.jpg",
  "/manus-storage/westside-living-17_0ed2cd5b.jpg",
  "/manus-storage/westside-living-18_ab8bc7ea.jpg",
  "/manus-storage/westside-living-19_da5f8be9.jpg",
  "/manus-storage/westside-living-20_96bb0468.jpg",
  "/manus-storage/westside-living-21_f94f2d03.jpg",
  "/manus-storage/westside-living-22_97e05a15.jpg",
  "/manus-storage/westside-living-23_ad87cbb5.jpg",
  "/manus-storage/westside-living-24_f121a949.jpg",
  "/manus-storage/westside-living-25_6c65477d.jpg",
  "/manus-storage/westside-living-26_ce4deda1.jpg",
  "/manus-storage/westside-living-27_39cc50d1.jpg",
  "/manus-storage/westside-living-28_6a9678a7.jpg",
  "/manus-storage/westside-living-29_dea598a5.jpg",
  "/manus-storage/westside-living-30_8585dac7.jpg",
  "/manus-storage/westside-living-31_cca555bd.jpg",
  "/manus-storage/westside-living-32_7c7d3dc2.jpg",
  "/manus-storage/westside-living-33_e329b1ed.jpg",
  "/manus-storage/westside-living-34_8d738214.jpg",
  "/manus-storage/westside-living-35_6f81d6b1.jpg",
  "/manus-storage/westside-living-36_661e4b57.jpg",
  "/manus-storage/westside-living-37_9e472fca.jpg",
  "/manus-storage/westside-living-38_879e47b0.jpg",
  "/manus-storage/westside-living-39_1b19c957.jpg",
  "/manus-storage/westside-living-40_c93c2494.jpg",
  "/manus-storage/westside-living-41_4de0f99c.jpg",
  "/manus-storage/westside-living-42_19287fd6.jpg",
  "/manus-storage/westside-living-43_a712bdbd.jpg",
  "/manus-storage/westside-living-44_03614f4c.jpg",
  "/manus-storage/westside-living-45_0add2ae2.jpg",
];
const BROKENTOP_WATER_PHOTOS = [
  "/manus-storage/brokentop-water-fire-01_54836cf3.jpg",
  "/manus-storage/brokentop-water-fire-02_134681f3.jpg",
  "/manus-storage/brokentop-water-fire-03_1a01310b.jpg",
  "/manus-storage/brokentop-water-fire-04_da851a88.jpg",
  "/manus-storage/brokentop-water-fire-05_4960ee13.jpg",
  "/manus-storage/brokentop-water-fire-06_f7a4a262.jpg",
  "/manus-storage/brokentop-water-fire-07_abbe3729.jpg",
  "/manus-storage/brokentop-water-fire-08_57622b20.jpg",
  "/manus-storage/brokentop-water-fire-09_2d7ee26b.jpg",
  "/manus-storage/brokentop-water-fire-10_d443b121.jpg",
  "/manus-storage/brokentop-water-fire-11_9d010029.jpg",
  "/manus-storage/brokentop-water-fire-12_c7714a35.jpg",
  "/manus-storage/brokentop-water-fire-13_d7406c16.jpg",
  "/manus-storage/brokentop-water-fire-14_0ef431c5.jpg",
  "/manus-storage/brokentop-water-fire-15_70afe976.jpg",
];
const SE_BEND_RENOVATION_PHOTOS = [
  "/manus-storage/se-bend-renovation-01_487ce10e.jpg",
  "/manus-storage/se-bend-renovation-02_58539b7c.jpg",
  "/manus-storage/se-bend-renovation-03_2655ed14.jpg",
  "/manus-storage/se-bend-renovation-04_ac2da515.jpg",
  "/manus-storage/se-bend-renovation-05_a4312b27.jpg",
  "/manus-storage/se-bend-renovation-06_2e46ffd5.jpg",
  "/manus-storage/se-bend-renovation-07_e464a327.jpg",
  "/manus-storage/se-bend-renovation-08_73430a2d.jpg",
  "/manus-storage/se-bend-renovation-09_00307bc7.jpg",
  "/manus-storage/se-bend-renovation-10_314ef27b.jpg",
  "/manus-storage/se-bend-renovation-11_881a4589.jpg",
];
const CENTURY_DRIVE_PHOTOS = [
  "/manus-storage/century-drive-01_cfe36a70.jpg",
  "/manus-storage/century-drive-02_d76a3b88.jpg",
  "/manus-storage/century-drive-03_9e185d2e.jpg",
  "/manus-storage/century-drive-04_54fc5151.jpg",
  "/manus-storage/century-drive-05_b611a5c3.jpg",
  "/manus-storage/century-drive-06_5d88b339.jpg",
];
const SW_BEND_PHOTOS = [
  "/manus-storage/sw-bend-01_45e68c0e.jpg",
  "/manus-storage/sw-bend-02_cc6b0a9c.jpg",
  "/manus-storage/sw-bend-03_aac64ee5.jpg",
  "/manus-storage/sw-bend-04_29b628f8.jpg",
  "/manus-storage/sw-bend-05_6b63c948.jpg",
  "/manus-storage/sw-bend-06_7f450347.jpg",
];
const NW_BEND_BACKYARD_PHOTOS = [
  "/manus-storage/nw-bend-backyard-01_e6d82c48.jpg",
  "/manus-storage/nw-bend-backyard-02_2ad725ef.jpeg",
  "/manus-storage/nw-bend-backyard-03_5bb54e6f.jpeg",
];
const AWBREY_XERISCAPE_PHOTOS = [
  "/manus-storage/awbrey-xeriscape-01_16545639.jpg",
  "/manus-storage/awbrey-xeriscape-02_3e6c0ad3.jpg",
  "/manus-storage/awbrey-xeriscape-03_86641cb3.jpg",
  "/manus-storage/awbrey-xeriscape-04_1c1c3ef1.jpg",
];
const PAVER_FIREPIT_PHOTOS = [
  "/manus-storage/paver-patio-and-gas-firepit-01_04c71c72.jpg",
  "/manus-storage/paver-patio-and-gas-firepit-02_298e674d.jpg",
  "/manus-storage/paver-patio-and-gas-firepit-03_efd36531.jpg",
];
const NW_BEND_LIGHTING_PHOTOS = [
  "/manus-storage/nw-bend-lighting-01_32b779e7.jpg",
  "/manus-storage/nw-bend-lighting-02_04d49052.jpg",
  "/manus-storage/nw-bend-lighting-03_184e42f9.jpg",
];
const AWBREY_GLEN_FLAGSTONE_PHOTOS = [
  "/manus-storage/awbrey-glen-flagstone-01_cd6f3008.jpg",
  "/manus-storage/awbrey-glen-flagstone-02_30a36d99.jpg",
  "/manus-storage/awbrey-glen-flagstone-03_15d430c7.jpg",
  "/manus-storage/awbrey-glen-flagstone-04_0526eac4.jpg",
  "/manus-storage/awbrey-glen-flagstone-05_c7fe894d.jpg",
  "/manus-storage/awbrey-glen-flagstone-06_45542287.jpg",
  "/manus-storage/awbrey-glen-flagstone-07_86c32051.jpg",
  "/manus-storage/awbrey-glen-flagstone-08_1542adba.jpg",
  "/manus-storage/awbrey-glen-flagstone-09_22e513b4.jpg",
  "/manus-storage/awbrey-glen-flagstone-10_cc601ce6.jpg",
  "/manus-storage/awbrey-glen-flagstone-11_27ea6a40.jpg",
  "/manus-storage/awbrey-glen-flagstone-12_e8184000.jpg",
];
// Legacy portfolio thumbnail grid (CDN-hosted)
const LEGACY_PROJECTS = [
  { title: "Bend Full Yard Transformation", category: "Design & Build · Xeriscape · Pavers", img: `${CDN}/proj-bend-after-backyard1_c8556c78.jpg`, href: "/portfolio/bend-full-yard-transformation" },
  { title: "Broken Top Water Feature & Sunken Fire Pit", category: "Water Features · Fire Features", img: "/manus-storage/brokentop-water-fire-01_54836cf3.jpg", href: "/portfolio/broken-top-water-feature" },
  { title: "NW Bend Backyard Landscaping", category: "Design & Build · Water Features", img: "/manus-storage/nw-bend-backyard-01_e6d82c48.jpg", href: "/portfolio/nw-bend-backyard" },
  { title: "East Bend Landscape Install", category: "Design & Build · Irrigation", img: "/manus-storage/east-bend-install-01_5ad4daf3.jpg", href: "/portfolio/east-bend-landscape" },
  { title: "Paver Patio & Gas Firepit", category: "Pavers · Fire Features", img: "/manus-storage/paver-patio-and-gas-firepit-03_efd36531.jpg", href: "/portfolio/paver-patio-firepit" },
  { title: "Awbrey Butte Xeriscape", category: "Xeriscaping · Design & Build", img: "/manus-storage/awbrey-xeriscape-01_16545639.jpg", href: "/portfolio/awbrey-butte-xeriscape" },
  { title: "Century Drive Landscape Enhancement", category: "Design & Build · Planting", img: "/manus-storage/century-drive-01_cfe36a70.jpg", href: "/portfolio/century-drive" },
  { title: "Broken Top Xeriscape", category: "Xeriscaping · Design & Build", img: "/manus-storage/brokentop-xeriscape-01_064e5008.jpg", href: "/portfolio/broken-top-xeriscape" },
  { title: "Awbrey Glenn Flagstone Patio & Walkway", category: "Pavers · Walkways", img: "/manus-storage/awbrey-glen-flagstone-05_c7fe894d.jpg", href: "/portfolio/awbrey-glenn-flagstone" },
  { title: "SW Bend Backyard Landscaping", category: "Outdoor Living · Design & Build", img: "/manus-storage/sw-bend-01_45e68c0e.jpg", href: "/portfolio/sw-bend-backyard" },
  { title: "Backyard Landscape Renovation", category: "Full Renovation · Design & Build", img: "/manus-storage/se-bend-renovation-01_487ce10e.jpg", href: "/portfolio/backyard-renovation" },
  { title: "Awbrey Butte Patio Extension & Wall", category: "Pavers · Retaining Walls · Outdoor Living", img: "/manus-storage/awbrey-patio-wall-01_bde91632.jpg", href: "/portfolio/awbrey-butte-patio" },
  { title: "NW Bend Landscape Lighting", category: "Landscape Lighting · Water Features", img: "/manus-storage/nw-bend-lighting-01_32b779e7.jpg", href: "/portfolio/nw-bend-lighting" },
  { title: "Westside Outdoor Living Space", category: "Outdoor Living · Water Features · Fire Features", img: "/manus-storage/westside-living-01_ed5d815c.jpg", href: "/portfolio/westside-outdoor-living" },
];

const PROJECTS = [
  {
    id: "suchy",
    name: "Petrosa Neighborhood Backyard",
    location: "Bend, Oregon",
    description: "A stunning full backyard transformation in Bend's Petrosa neighborhood — custom Corten steel fireplace, cedar pergola with outdoor kitchen, in-ground trampoline, Italian cypress privacy trees, irrigated lawn, and extensive planting design. One of Newport Ave's most complete outdoor living projects.",
    tags: ["Outdoor Living", "Corten Steel Fireplace", "Pergola", "Outdoor Kitchen", "Planting Design", "Irrigation"],
    photos: PETROSA_PHOTOS,
  },
  {
    id: "hosmer",
    name: "Westgate Neighborhood Landscape",
    location: "Bend, Oregon",
    description: "Expansive residential landscape installation with natural stone features, irrigated lawn, and seamlessly integrated water-wise plantings.",
    tags: ["Landscape Installation", "Irrigation", "Stone Work"],
    photos: HOSMER_PHOTOS,
  },
  {
    id: "mcgrath",
    name: "East Bend Design & Build",
    location: "Bend, Oregon",
    description: "A large-scale design & build project in East Bend showcasing paver patios, retaining walls, fire feature, and full irrigation system installation.",
    tags: ["Design & Build", "Pavers", "Fire Feature", "Irrigation"],
    photos: MCGRATH_PHOTOS,
  },
  {
    id: "awbrey",
    name: "Awbrey Butte Outdoor Living",
    location: "Bend, Oregon",
    description: "A luxury outdoor living transformation in Awbrey Butte — one of Bend's most prestigious neighborhoods. Custom patio design, premium hardscape, and integrated plantings that complement the elevated terrain and mountain views.",
    tags: ["Outdoor Living", "Luxury Residential", "Hardscape", "Awbrey Butte"],
    photos: AWBREY_PHOTOS,
  },
  {
    id: "east-bend-entrance",
    name: "East Bend Entrance Redesign",
    location: "East Bend, Oregon",
    description: "A complete front entrance transformation — brick paver driveway and landing, new planting beds with ornamental shrubs and grasses, and landscape lighting. The result is a welcoming, low-maintenance entrance that dramatically improves curb appeal.",
    tags: ["Pavers", "Planting Design", "Curb Appeal", "Landscape Lighting"],
    photos: EAST_BEND_ENTRANCE_PHOTOS,
  },
  {
    id: "awbrey-loop",
    name: "Awbrey Butte Luxury Outdoor Living",
    location: "Awbrey Butte, Bend, Oregon",
    description: "A complete luxury outdoor living transformation in Awbrey Butte — natural rock pond with waterfall, flagstone fire pit patio, cedar pergola with hot tub, synthetic lawn, landscape lighting, and a full xeriscape front yard with ornamental grasses and boulders. Panoramic views of Bend from every angle.",
    tags: ["Water Feature", "Fire Pit", "Pergola", "Xeriscape", "Landscape Lighting", "Awbrey Butte"],
    photos: AWBREY_LOOP_PHOTOS,
  },
  {
    id: "boulder-terrace",
    name: "Boulder Terracing & Hillside Planting",
    location: "Bend, Oregon",
    description: "A dramatic hillside transformation — natural boulder terracing, concrete stair installation, and a full planting design with native shrubs, ornamental grasses, and perennials. The steep slope was converted from bare dirt and overgrown juniper into a stunning, low-water landscape.",
    tags: ["Boulder Terracing", "Retaining Walls", "Planting Design", "Concrete Steps"],
    photos: BOULDER_TERRACE_PHOTOS,
  },
  {
    id: "east-bend-install",
    name: "East Bend Landscape Install",
    location: "East Bend, Oregon",
    description: "A full-scale landscape installation in East Bend featuring custom paver work, irrigated lawn areas, planting beds, and a complete irrigation system. One of Newport Ave's most comprehensive design-build projects.",
    tags: ["Design & Build", "Irrigation", "Pavers", "Planting"],
    photos: EAST_BEND_INSTALL_PHOTOS,
  },
  {
    id: "westside-outdoor-living",
    name: "Westside Outdoor Living Space",
    location: "West Bend, Oregon",
    description: "A full outdoor living transformation on Bend's west side — custom pavilion construction, stone fireplace, pondless stream water feature, paver patio, and extensive planting design. One of Newport Ave's most complete outdoor living projects.",
    tags: ["Outdoor Living", "Water Feature", "Fire Feature", "Pavilion", "Pavers"],
    photos: WESTSIDE_LIVING_PHOTOS,
  },
  {
    id: "brokentop-water-fire",
    name: "Broken Top Water Feature & Sunken Fire Pit",
    location: "Broken Top, Bend, Oregon",
    description: "A stunning backyard transformation in the Broken Top neighborhood — custom pondless water feature with natural boulders and a sunken flagstone fire pit surrounded by lush plantings. Before and after photos show the dramatic scope of the project.",
    tags: ["Water Feature", "Fire Pit", "Broken Top", "Hardscape"],
    photos: BROKENTOP_WATER_PHOTOS,
  },
  {
    id: "se-bend-renovation",
    name: "SE Bend Backyard Landscape Renovation",
    location: "Southeast Bend, Oregon",
    description: "A complete backyard renovation in Southeast Bend — new paver patio, custom fire pit, planting design, and full irrigation. The project transformed a bare backyard into a fully functional outdoor living space with before and after documentation.",
    tags: ["Full Renovation", "Pavers", "Fire Pit", "Irrigation"],
    photos: SE_BEND_RENOVATION_PHOTOS,
  },
  {
    id: "brokentop-xeriscape",
    name: "Broken Top Xeriscape",
    location: "Broken Top, Bend, Oregon",
    description: "A comprehensive xeriscape renovation in Broken Top — complete removal of traditional lawn replaced with drought-tolerant native plantings, decorative rock, and a redesigned driveway approach. Water-wise and low-maintenance.",
    tags: ["Xeriscaping", "Design & Build", "Broken Top", "Water-Wise"],
    photos: BROKENTOP_XERISCAPE_PHOTOS,
  },
  {
    id: "awbrey-glen-flagstone",
    name: "Awbrey Glenn Flagstone Patio & Walkway",
    location: "Awbrey Glenn, Bend, Oregon",
    description: "A flagstone patio rebuild and front walkway installation in Awbrey Glenn. The project included demolition of the existing concrete, custom flagstone patio construction, a new front walkway, and a backyard stream feature. Before and after photos document the full transformation.",
    tags: ["Pavers", "Flagstone", "Walkways", "Water Feature", "Awbrey Glenn"],
    photos: AWBREY_GLEN_FLAGSTONE_PHOTOS,
  },
  {
    id: "century-drive",
    name: "Century Drive Landscape Enhancement",
    location: "Bend, Oregon",
    description: "A landscape enhancement along Century Drive featuring a pondless stream water feature, new planting beds, and a refreshed front yard design. The project added a natural water element that complements the existing landscape.",
    tags: ["Water Feature", "Planting Design", "Landscape Enhancement"],
    photos: CENTURY_DRIVE_PHOTOS,
  },
  {
    id: "sw-bend-backyard",
    name: "SW Bend Backyard Landscaping",
    location: "Southwest Bend, Oregon",
    description: "A complete backyard landscaping project in Southwest Bend — custom outdoor living area, planting design, and hardscape installation that transformed a bare lot into a fully usable outdoor space.",
    tags: ["Outdoor Living", "Design & Build", "Planting"],
    photos: SW_BEND_PHOTOS,
  },
  {
    id: "nw-bend-backyard",
    name: "NW Bend Backyard Landscaping",
    location: "Northwest Bend, Oregon",
    description: "A backyard landscape installation in Northwest Bend featuring a pondless water feature with pathway lighting, creating a serene outdoor retreat with natural stone and lush plantings.",
    tags: ["Water Feature", "Landscape Lighting", "Design & Build"],
    photos: NW_BEND_BACKYARD_PHOTOS,
  },
  {
    id: "awbrey-xeriscape",
    name: "Awbrey Butte Xeriscape",
    location: "Awbrey Butte, Bend, Oregon",
    description: "A xeriscape renovation in Awbrey Butte converting a traditional lawn to a drought-tolerant landscape with ornamental grasses, native shrubs, and decorative rock. Designed for Central Oregon's high-desert climate.",
    tags: ["Xeriscaping", "Awbrey Butte", "Water-Wise", "Design & Build"],
    photos: AWBREY_XERISCAPE_PHOTOS,
  },
  {
    id: "paver-firepit",
    name: "Paver Patio & Gas Firepit",
    location: "Bend, Oregon",
    description: "A custom paver patio installation with an integrated gas fire pit. Clean lines, quality materials, and a design built for Central Oregon's outdoor lifestyle.",
    tags: ["Pavers", "Fire Features", "Outdoor Living"],
    photos: PAVER_FIREPIT_PHOTOS,
  },
  {
    id: "nw-bend-lighting",
    name: "NW Bend Landscape Lighting",
    location: "Northwest Bend, Oregon",
    description: "A landscape lighting installation in Northwest Bend that transforms the property at night. Path lighting, uplighting, and accent fixtures create a dramatic and welcoming nighttime landscape.",
    tags: ["Landscape Lighting", "Water Features"],
    photos: NW_BEND_LIGHTING_PHOTOS,
  },
  {
    id: "awbrey-patio-wall",
    name: "Awbrey Butte Patio Extension & Wall",
    location: "Awbrey Butte, Bend, Oregon",
    description: "A patio extension and freestanding retaining wall installation in Awbrey Butte. The project expanded the existing outdoor living area with premium pavers and a custom wall that defines the space.",
    tags: ["Pavers", "Retaining Walls", "Outdoor Living", "Awbrey Butte"],
    photos: AWBREY_PHOTOS,
  },
];

interface LightboxState { projectId: string; index: number; isLegacy?: boolean; }

export default function OurWork() {
  const [, navigate] = useLocation();
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const [activeTab, setActiveTab] = useState<"featured" | "legacy">("featured");
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedProjects((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const openLightbox = (projectId: string, index: number, isLegacy = false) => {
    setLightbox({ projectId, index, isLegacy });
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightbox(null);
    document.body.style.overflow = "";
  };

  const navigateLightbox = (dir: 1 | -1) => {
    if (!lightbox) return;
    if (lightbox.isLegacy) {
      const newIndex = (lightbox.index + dir + LEGACY_PROJECTS.length) % LEGACY_PROJECTS.length;
      setLightbox({ ...lightbox, index: newIndex });
    } else {
      const project = PROJECTS.find((p) => p.id === lightbox.projectId)!;
      const newIndex = (lightbox.index + dir + project.photos.length) % project.photos.length;
      setLightbox({ ...lightbox, index: newIndex });
    }
  };

  const currentLightboxPhoto = lightbox
    ? lightbox.isLegacy
      ? LEGACY_PROJECTS[lightbox.index]?.img
      : PROJECTS.find((p) => p.id === lightbox.projectId)?.photos[lightbox.index]
    : null;

  const displayedProjects = activeProject
    ? PROJECTS.filter((p) => p.id === activeProject)
    : PROJECTS;

  return (
     <div style={{ backgroundColor: "oklch(0.12 0.005 0)" }}>
      <SEO
        title="Our Work | Landscaping Portfolio Bend Oregon | Newport Avenue"
        description="Browse Newport Avenue Landscaping's project portfolio — paver patios, custom backyard designs, water features & commercial installs in Bend, OR. Real photos from real Central Oregon projects."
        canonical="/our-work"
      />
      <Navbar />
      {/* ── Hero ── */}
      <section
        className="relative flex items-end"
        style={{
          height: "clamp(280px, 38vw, 440px)", marginTop: "204px",
          backgroundImage: `url(${MCGRATH_PHOTOS[4]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, oklch(0.10 0.005 0 / 0.95) 0%, oklch(0 0 0 / 0.35) 70%)" }} />
        <div className="container relative pb-14" style={{ paddingTop: "clamp(200px, 22vw, 280px)" }}>
          <div className="font-label mb-3 flex items-center gap-3" style={{ color: "oklch(0.72 0.14 240)" }}>
            <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.65 0.16 240)" }} />
            Portfolio
          </div>
          <h1 className="font-display font-light text-white" style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)", lineHeight: 1.0 }}>
            Our Work<br />
            <em style={{ color: "oklch(0.72 0.14 240)" }}>Central Oregon</em>
          </h1>
          <p className="font-body mt-4" style={{ color: "oklch(0.72 0.008 0)", fontWeight: 300, maxWidth: "520px" }}>
            Real projects. Real craftsmanship. Browse our portfolio of residential and commercial landscaping work across Central Oregon.
          </p>
        </div>
      </section>

      {/* ── Tab switcher ── */}
      <section className="py-8 border-b" style={{ borderColor: "oklch(0.22 0.005 0)", backgroundColor: "oklch(0.15 0.005 0)" }}>
        <div className="container flex flex-wrap items-center gap-4">
          <button
            onClick={() => setActiveTab("featured")}
            className="font-nav px-6 py-2.5 transition-all duration-200"
            style={{
              borderRadius: "1.2rem 0.15rem 1.2rem 0.15rem",
              backgroundColor: activeTab === "featured" ? "oklch(0.38 0.14 240)" : "transparent",
              color: activeTab === "featured" ? "oklch(1 0 0)" : "oklch(0.65 0.008 0)",
              border: activeTab === "featured" ? "1.5px solid oklch(0.55 0.16 240)" : "1.5px solid oklch(0.35 0.005 0)",
              fontSize: "0.65rem",
            }}
          >
            Featured Projects
          </button>
          <button
            onClick={() => setActiveTab("legacy")}
            className="font-nav px-6 py-2.5 transition-all duration-200"
            style={{
              borderRadius: "1.2rem 0.15rem 1.2rem 0.15rem",
              backgroundColor: activeTab === "legacy" ? "oklch(0.38 0.14 240)" : "transparent",
              color: activeTab === "legacy" ? "oklch(1 0 0)" : "oklch(0.65 0.008 0)",
              border: activeTab === "legacy" ? "1.5px solid oklch(0.55 0.16 240)" : "1.5px solid oklch(0.35 0.005 0)",
              fontSize: "0.65rem",
            }}
          >
            More Projects
          </button>

          {activeTab === "featured" && (
            <div className="flex flex-wrap gap-2 ml-4">
              <button
                onClick={() => setActiveProject(null)}
                className="font-nav px-4 py-1.5 transition-all duration-200"
                style={{
                  borderRadius: "1.2rem 0.15rem 1.2rem 0.15rem",
                  backgroundColor: !activeProject ? "oklch(0.22 0.005 0)" : "transparent",
                  color: !activeProject ? "oklch(0.90 0.003 0)" : "oklch(0.55 0.005 0)",
                  border: "1px solid oklch(0.28 0.005 0)",
                  fontSize: "0.60rem",
                }}
              >
                All
              </button>
              {PROJECTS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActiveProject(p.id === activeProject ? null : p.id)}
                  className="font-nav px-4 py-1.5 transition-all duration-200"
                  style={{
                    borderRadius: "1.2rem 0.15rem 1.2rem 0.15rem",
                    backgroundColor: activeProject === p.id ? "oklch(0.22 0.005 0)" : "transparent",
                    color: activeProject === p.id ? "oklch(0.90 0.003 0)" : "oklch(0.55 0.005 0)",
                    border: "1px solid oklch(0.28 0.005 0)",
                    fontSize: "0.60rem",
                  }}
                >
                  {p.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Featured Project Galleries ── */}
      {activeTab === "featured" && displayedProjects.map((project, pi) => (
        <section key={project.id} className="py-16" style={{ backgroundColor: pi % 2 === 0 ? "oklch(0.12 0.005 0)" : "oklch(0.15 0.005 0)" }}>
          <div className="container">
            <FadeIn>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <span className="font-label block mb-2" style={{ color: "oklch(0.65 0.16 240)" }}>{project.location}</span>
                  <h2 className="font-display font-light text-white" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", lineHeight: 1.1 }}>
                    {project.name}
                  </h2>
                  <p className="font-body mt-2 max-w-2xl" style={{ color: "oklch(0.60 0.005 0)", fontSize: "0.95rem" }}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tags.map((tag) => (
                      <span key={tag} className="font-label px-3 py-1" style={{ backgroundColor: "oklch(0.38 0.14 240 / 0.22)", color: "oklch(0.72 0.14 240)", borderRadius: "1.2rem 0.15rem 1.2rem 0.15rem", fontSize: "0.58rem", border: "1px solid oklch(0.55 0.16 240 / 0.30)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="font-label shrink-0" style={{ color: "oklch(0.45 0.005 0)", fontSize: "0.65rem" }}>
                  {project.photos.length} photos
                </div>
              </div>
            </FadeIn>

            {(() => {
              const isExpanded = expandedProjects.has(project.id);
              const visiblePhotos = isExpanded ? project.photos : project.photos.slice(0, 4);
              return (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {visiblePhotos.map((url, idx) => (
                      <FadeIn key={idx} delay={idx * 0.03} className={idx === 0 ? "col-span-2" : ""}>
                        <button
                          onClick={() => openLightbox(project.id, idx)}
                          className="photo-card group w-full"
                          style={{
                            aspectRatio: idx === 0 ? "16/9" : "4/3",
                            display: "block",
                          }}
                        >
                          <img
                            src={url}
                            alt={`${project.name} — photo ${idx + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" style={{ backgroundColor: "oklch(0.22 0.10 240 / 0.55)" }}>
                            <span className="font-label text-white" style={{ letterSpacing: "0.15em", fontSize: "0.65rem" }}>View</span>
                          </div>
                        </button>
                      </FadeIn>
                    ))}
                  </div>
                  {project.photos.length > 4 && (
                    <div className="text-center mt-6">
                      <button
                        onClick={() => toggleExpand(project.id)}
                        className="font-label transition-all duration-200"
                        style={{
                          padding: "0.6rem 1.8rem",
                          border: "1.5px solid oklch(0.55 0.16 240 / 0.50)",
                          borderRadius: "12px 0 12px 0",
                          color: "oklch(0.72 0.14 240)",
                          backgroundColor: "transparent",
                          fontSize: "0.62rem",
                          letterSpacing: "0.12em",
                          cursor: "pointer",
                        }}
                      >
                        {isExpanded ? `SHOW LESS` : `VIEW ALL ${project.photos.length} PHOTOS`}
                      </button>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </section>
      ))}

      {/* ── Legacy Portfolio Grid ── */}
      {activeTab === "legacy" && (
        <section className="py-16" style={{ backgroundColor: "oklch(0.12 0.005 0)" }}>
          <div className="container">
            <FadeIn>
              <h2 className="font-display font-light text-white mb-2" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}>
                More Projects
              </h2>
              <p className="font-body mb-10" style={{ color: "oklch(0.55 0.005 0)", fontSize: "0.95rem" }}>
                A selection of additional residential and commercial projects across Central Oregon.
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {LEGACY_PROJECTS.map((project, i) => (
                <FadeIn key={project.title} delay={i * 0.05}>
                  <button
                    onClick={() => project.href ? (navigate(project.href), window.scrollTo({ top: 0, behavior: "smooth" })) : openLightbox("legacy", i, true)}
                    className="photo-card group w-full"
                    style={{ aspectRatio: "4/3", display: "block" }}
                  >
                    <img
                      src={project.img}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0.3"; }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: "linear-gradient(0deg, oklch(0.10 0.005 0 / 0.88) 0%, transparent 100%)" }}>
                      <div className="font-label mb-0.5" style={{ color: "oklch(0.72 0.14 240)", fontSize: "0.58rem" }}>{project.category}</div>
                      <div className="font-display font-light text-white" style={{ fontSize: "0.9rem", lineHeight: 1.2 }}>{project.title}</div>
                    </div>
                  </button>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BEFORE / AFTER TRANSFORMATIONS ── */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.97 0.010 85)" }}>
        <div className="container">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="font-label mb-3 flex items-center justify-center gap-3" style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.62rem", letterSpacing: "0.18em" }}>
                <span className="inline-block w-8 h-px" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
                TRANSFORMATIONS
                <span className="inline-block w-8 h-px" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
              </div>
              <h2 className="font-display font-light" style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", color: "oklch(0.12 0.005 0)", lineHeight: 1.1 }}>
                Before &amp; After
                <br />
                <em style={{ color: "oklch(0.46 0.20 25)", fontStyle: "italic" }}>Real Central Oregon Projects</em>
              </h2>
              <p className="font-body mt-4 mx-auto" style={{ color: "oklch(0.45 0.005 0)", maxWidth: "520px", fontSize: "0.92rem", lineHeight: 1.7 }}>
                Drag the slider to see the full transformation. Every project is completed by our in-house crew — no subcontractors.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeIn delay={0.05}>
              <BeforeAfterSlider
                beforeSrc="/manus-storage/east-bend-entrance-before1_de65af94.jpg"
                afterSrc="/manus-storage/east-bend-entrance-after3_502aa04a.jpg"
                beforeAlt="Front entrance before renovation — old brick steps and bare plantings"
                afterAlt="Finished brick paver driveway and entrance with new planting beds"
                caption="East Bend Entrance — brick paver driveway, new planting beds, and landscape lighting"
              />
            </FadeIn>
            <FadeIn delay={0.10}>
              <BeforeAfterSlider
                beforeSrc="/manus-storage/boulder-terrace-before1_ebbc75ec.jpg"
                afterSrc="/manus-storage/boulder-terrace-after2_88fb51db.jpg"
                beforeAlt="Bare hillside with overgrown juniper before terracing"
                afterAlt="Finished boulder terracing with native plantings and concrete steps"
                caption="Boulder Terracing — steep hillside transformed with natural boulders, concrete steps, and native plantings"
              />
            </FadeIn>
            <FadeIn delay={0.15}>
              <BeforeAfterSlider
                beforeSrc="/manus-storage/east-bend-entrance-before2_b434a90a.jpg"
                afterSrc="/manus-storage/east-bend-entrance-after4_3bee0d76.jpg"
                beforeAlt="Side view of old entrance before renovation"
                afterAlt="Completed entrance with illuminated concrete retaining wall and ornamental grasses"
                caption="East Bend Entrance — illuminated address wall, ornamental grasses, and modern concrete hardscape"
              />
            </FadeIn>
            <FadeIn delay={0.20}>
              <BeforeAfterSlider
                beforeSrc="/manus-storage/boulder-terrace-before2_756e950c.jpg"
                afterSrc="/manus-storage/boulder-terrace-after3_b8280194.jpg"
                beforeAlt="Overgrown juniper and bare dirt hillside before landscaping"
                afterAlt="Full hillside view after boulder terracing and planting installation"
                caption="Hillside Planting — full-slope transformation with lavender, ornamental shrubs, and boulder accents"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* —— Nursery Video —— */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.12 0.005 0)" }}>
        <div className="container">
          <FadeIn>
            <div className="text-center mb-10">
              <div className="font-label mb-3 flex items-center justify-center gap-3" style={{ color: "oklch(0.65 0.16 240)", fontSize: "0.62rem", letterSpacing: "0.18em" }}>
                <span className="inline-block w-8 h-px" style={{ backgroundColor: "oklch(0.65 0.16 240)" }} />
                OUR NURSERY
                <span className="inline-block w-8 h-px" style={{ backgroundColor: "oklch(0.65 0.16 240)" }} />
              </div>
              <h2 className="font-display font-light text-white" style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", lineHeight: 1.1 }}>
                Grown in Central Oregon
                <br />
                <em style={{ color: "oklch(0.72 0.14 240)", fontStyle: "italic" }}>Our On-Site Nursery</em>
              </h2>
              <p className="font-body mt-4 mx-auto" style={{ color: "oklch(0.60 0.005 0)", maxWidth: "520px", fontSize: "0.92rem", lineHeight: 1.7 }}>
                We grow and source plants suited to Central Oregon's high-desert climate. Our nursery stock is selected for drought tolerance, cold hardiness, and long-term performance in your landscape.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mx-auto overflow-hidden" style={{ maxWidth: "800px", borderRadius: "1.2rem 0.15rem 1.2rem 0.15rem", border: "1.5px solid oklch(0.55 0.16 240 / 0.30)" }}>
              <video
                src="/manus-storage/73c43880b1eb4aea940e8e3d5ab3bcdf_2569730c.mov"
                controls
                playsInline
                muted
                className="w-full"
                style={{ display: "block", maxHeight: "520px", objectFit: "cover" }}
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* —— CTA —— */}
      <section className="py-20 text-center" style={{ background: "linear-gradient(135deg, oklch(0.16 0.08 240) 0%, oklch(0.26 0.10 240) 50%, oklch(0.20 0.07 240) 100%)" }}>
        <div className="container">
          <FadeIn>
            <div className="font-label mb-4 flex items-center justify-center gap-3" style={{ color: "oklch(0.65 0.16 240)" }}>
              <span className="inline-block h-px w-8" style={{ backgroundColor: "oklch(0.65 0.16 240)" }} />
              START YOUR PROJECT
              <span className="inline-block h-px w-8" style={{ backgroundColor: "oklch(0.65 0.16 240)" }} />
            </div>
            <h2 className="font-display font-light text-white mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
              Ready to Create Your Dream Yard?
            </h2>
            <p className="font-body mb-8 mx-auto" style={{ color: "oklch(0.80 0.06 240)", fontWeight: 300, maxWidth: "480px" }}>
              Let's start a conversation about your outdoor vision. Our award-winning design team is ready.
            </p>
            <Link href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "oklch(0.12 0.06 240)",
                backgroundColor: "oklch(0.65 0.16 240)",
                padding: "0.85rem 2.2rem",
                borderRadius: "1.8rem 0.2rem 1.8rem 0.2rem",
                textDecoration: "none",
              }}
            >
              Get a Free Quote
            </Link>
          </FadeIn>
        </div>
      </section>

      <Footer />

      {/* ── Lightbox ── */}
      {lightbox && currentLightboxPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "oklch(0 0 0 / 0.92)" }}
          onClick={closeLightbox}
        >
          <button onClick={closeLightbox} className="absolute top-5 right-5 text-white p-2 hover:opacity-70 transition-opacity z-10" aria-label="Close">
            <X size={28} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }} className="absolute left-4 text-white p-3 hover:opacity-70 transition-opacity z-10" aria-label="Previous">
            <ChevronLeft size={36} />
          </button>
          <img
            src={currentLightboxPhoto}
            alt="Project photo"
            className="max-h-[88vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
            style={{ borderRadius: "1.2rem 0.15rem 1.2rem 0.15rem" }}
          />
          <button onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }} className="absolute right-4 text-white p-3 hover:opacity-70 transition-opacity z-10" aria-label="Next">
            <ChevronRight size={36} />
          </button>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-label text-white" style={{ letterSpacing: "0.12em", fontSize: "0.65rem" }}>
            {lightbox.index + 1} / {lightbox.isLegacy ? LEGACY_PROJECTS.length : PROJECTS.find((p) => p.id === lightbox.projectId)?.photos.length}
          </div>
        </div>
      )}
    </div>
  );
}
