import ServicePageLayout from "@/components/ServicePageLayout";

const relatedLinks = [
  { label: "Outdoor Living Spaces", href: "/services/outdoor-living" },
  { label: "Paver Patios & Walkways", href: "/services/pavers" },
  { label: "Water Features", href: "/services/water-features" },
  { label: "Landscape Design", href: "/services/landscape-design" },
];

export default function FireFeatures() {
  return (
    <ServicePageLayout
      category="Installation Services"
      title="Fire Pits"
      subtitle="& Outdoor Fireplaces"
      heroImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80"
      heroPosition="center 60%"
      intro="Family gatherings. Ghost stories. Roasting marshmallows with the kids. Dreaming up the future with a good glass of wine. Memories, all made around a fire. Fire pits are one of those must-haves — the non-negotiables of your backyard. The place where everyone gathers to laugh, dream, and stay warm. We'll build it, just to your specifications."
      pricing={[
        { label: "Fire Pit Starting Cost", value: "$2,200" },
        { label: "Full Fireplace with Chimney", value: "Up to $35,000+" },
        { label: "Design Consultation", value: "Complimentary" },
      ]}
      sections={[
        {
          heading: "Fire Pit & Fireplace Options",
          body: "You dream it, we will build it. Fire pits can be made to burn propane, natural gas, or wood and can be built out of just about any natural or manufactured brick, stone, or pavers.",
          list: [
            "Propane, natural gas, or wood-burning fire pits",
            "Above-ground fire features",
            "Full outdoor fireplaces with chimneys",
            "Fireplaces with integrated smokers or brick ovens",
            "Sunken fire pits",
            "Fire pit surrounded by water feature",
            "Custom stone and paver designs",
          ],
        },
        {
          heading: "Built to Last",
          body: [
            "We only use the best materials because of our five-year warranty. Building options typically depend on the size of your yard, your view, and your yard's topography.",
            "Similarly, fireplaces can be built to burn propane, natural gas, or wood and can use any brick, stone, or pavers. Fireplaces can include amenities like smokers, brick ovens, or other options as part of the build.",
          ],
          accent: true,
        },
        {
          heading: "Design Consultation",
          body: [
            "We can meet with you this week and help you start discovering your options. Our designers will walk your property, discuss your vision, and provide a detailed proposal with material options and pricing.",
            "The first step is a complimentary on-site consultation — give us a call today and we'll get something on the calendar before our schedule fills up.",
          ],
        },
      ]}
      relatedLinks={relatedLinks}
    />
  );
}
