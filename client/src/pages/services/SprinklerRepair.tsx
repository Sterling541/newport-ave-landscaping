import ServicePageLayout from "@/components/ServicePageLayout";

const relatedLinks = [
  { label: "Irrigation Installation", href: "/services/irrigation" },
  { label: "Sprinkler Blowout", href: "/services/sprinkler-blowout" },
  { label: "Spring Activation", href: "/services/sprinkler-activation" },
  { label: "Commercial Maintenance", href: "/services/commercial-maintenance" },
];

const resourceLinks = [
  {
    label: "Sprinkler Repair in Bend, OR",
    href: "/resources/irrigation-repair-bend-oregon",
    description: "Common sprinkler issues, repair costs, and when to call a pro.",
  },
  {
    label: "Sprinkler System Cost in Bend, OR",
    href: "/resources/sprinkler-system-cost-bend-oregon",
    description: "Full pricing breakdown for irrigation systems in Central Oregon.",
  },
];

export default function SprinklerRepair() {
  return (
    <ServicePageLayout
      category="Irrigation Services"
      title="Sprinkler Repair"
      subtitle="& Backflow Testing"
      seoTitle="Sprinkler Repair Bend Oregon | Irrigation Repair & Troubleshooting | Newport Avenue"
      seoDescription="Expert sprinkler repair and troubleshooting in Bend, Oregon. $140/tech hour. Broken heads, valve failures, controller issues, and backflow testing. Same-week scheduling. LCB #9153."
      heroImage="https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/svc-sprinkler-repair-1_aad8a8ac.jpg"
      heroPosition="center 50%"
      intro="Since 2005, we've repaired, renovated, and installed over 10,000 sprinkler systems throughout Central Oregon. If you're having a problem with your sprinkler system, one of our full-time irrigation specialists can come out today and take a look. Consultations are always free."
      pricing={[
        { label: "Repair Rate", value: "$140 / man hour (1 hr min) + materials" },
        { label: "Backflow Testing", value: "$140" },
        { label: "Emergency Service", value: "No extra cost" },
        { label: "Consultations", value: "Always Free" },
      ]}
      sections={[
        {
          heading: "Sprinkler System & Head Repair",
          body: [
            "We employ multiple fully licensed irrigation technicians and teams to handle all sprinkler system repairs and offer 24-hour emergency service at no extra cost.",
            "If you think you are having a sprinkler system or irrigation emergency, please call immediately. We've seen even small water leaks cause property damage resulting in tens of thousands of dollars of repair. It's better to catch things as early as possible.",
            "While we can usually service your irrigation system the same day, during certain times of the year we can get backed up. April–May and October–November are our heavy irrigation seasons.",
          ],
        },
        {
          heading: "Backflow Testing",
          body: [
            "Your backflow is the gateway to water and the beginning of your sprinkler system. The backflow prevents contaminants from flowing back into your potable (drinkable) water system.",
            "The City of Bend requires all residents to have their backflow inspected annually. One of our certified technicians can test your backflow and — unlike other competitors — shoulder the burden of filing the necessary paperwork with the City of Bend.",
          ],
          accent: true,
        },
        {
          heading: "Common Repairs We Handle",
          body: "Our irrigation technicians are trained to diagnose and repair a wide range of sprinkler system issues:",
          list: [
            "Broken or misaligned sprinkler heads",
            "Zone valve failures and solenoid replacement",
            "Controller and timer malfunctions",
            "Underground pipe breaks and leaks",
            "Backflow device repair and replacement",
            "Pressure regulation issues",
            "Wiring and electrical faults",
            "System winterization damage",
          ],
        },
      ]}
      relatedLinks={relatedLinks}
      resourceLinks={resourceLinks}
      galleryImages={[
        { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/svc-sprinkler-repair-1_aad8a8ac.jpg", alt: "Sprinkler repair technician inspecting irrigation head in Bend Oregon" },
        { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/svc-sprinkler-repair-2_bbe39e75.jpg", alt: "Irrigation system repair and backflow testing in Central Oregon" },
        { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/svc-sprinkler-repair-3_63450c26.jpg", alt: "Repaired residential sprinkler system running in Bend Oregon" },
      ]}
      schemaUrl="/services/sprinkler-repair"
      schemaName="Sprinkler System Repair"
      schemaDescription="Expert sprinkler repair, troubleshooting, and backflow testing in Bend, Oregon. $140/tech hour. Same-week scheduling available."
      faqs={[
          { question: "How much does sprinkler repair cost in Bend?", answer: "Newport Avenue Landscaping charges $140 per tech hour for sprinkler repair, troubleshooting, backflow testing, and irrigation service calls, with a one-hour minimum. Parts and materials are billed separately. Most repair visits are completed in 1–2 hours. We provide a clear estimate before starting any work." },
          { question: "What are the most common sprinkler problems in Central Oregon?", answer: "The most common issues we see in Bend include broken or clogged spray heads (often from lawn mowers or freeze damage), stuck or leaking valves, controller programming errors, broken lateral lines from digging or frost heaving, and backflow preventer failures. Most repairs can be completed in a single visit." },
          { question: "How do I know if my sprinkler system has a leak?", answer: "Signs of a sprinkler leak include unexpectedly high water bills, soggy or waterlogged areas in your yard, dry patches despite regular watering, and visible water pooling near valve boxes. If you notice any of these, call us for a diagnostic visit — catching leaks early prevents significant water waste and lawn damage." },
          { question: "Do you do backflow preventer testing in Bend?", answer: "Yes — we test, repair, and certify backflow prevention assemblies for both residential and commercial properties in Bend and throughout Deschutes County. Oregon law requires annual backflow testing on irrigation systems connected to the municipal water supply. We provide certified test reports that can be submitted to the City of Bend." },
          { question: "Can you repair any brand of sprinkler system?", answer: "Yes — our technicians are trained on all major irrigation brands including Rain Bird, Hunter, Toro, Orbit, Rainmaster, and Weathermatic. We stock common replacement parts on our service vehicles to handle most repairs in a single visit." },
      ]}
    />
  );
}
