import ServicePageLayout from "@/components/ServicePageLayout";

const relatedLinks = [
  { label: "Irrigation Installation", href: "/services/irrigation" },
  { label: "Sprinkler Repair & Backflow", href: "/services/sprinkler-repair" },
  { label: "Spring Activation", href: "/services/sprinkler-activation" },
  { label: "Lawn Service", href: "/services/lawn-service" },
];

const resourceLinks = [
  {
    label: "How to Winterize Your Sprinklers in Bend",
    href: "/resources/sprinkler-winterization-guide-bend-oregon",
    description: "Step-by-step guide to blowout and winterization before the first freeze.",
  },
  {
    label: "Sprinkler System Cost in Bend, OR",
    href: "/resources/sprinkler-system-cost-bend-oregon",
    description: "Full pricing breakdown for irrigation systems in Central Oregon.",
  },
];

export default function SprinklerBlowout() {
  return (
    <ServicePageLayout
      category="Irrigation Services"
      title="Sprinkler Blowout"
      subtitle="Winterization Service"
      seoTitle="Sprinkler Blowout Bend Oregon | Winterization Service | Newport Avenue Landscaping"
      seoDescription="Professional sprinkler blowout and winterization in Bend, Oregon. $140/tech hour. Protect your irrigation system before the first freeze. Schedule early. LCB #9153."
      heroImage="https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/safe-hero-sprinkler-blowout-ka6aHMQ4D2ZdLaTeYmGKem.webp"
      heroPosition="center 40%"
      intro="Winterizing your sprinkler system is a must in Central Oregon. With the different sprinkler system setups, piping and air pressures, we suggest letting a professional handle it. We take the time to ensure the system is fully winterized — protecting your investment from freeze damage and costly spring repairs."
      pricing={[
        { label: "Standard 8-Zone System", value: "$140" },
        { label: "Each Additional Zone", value: "+ $5" },
        { label: "Season", value: "October – Thanksgiving" },
      ]}
      sections={[
        {
          heading: "Sprinkler Winterizing Explained",
          body: [
            "Our blowout service is thorough and methodical. We don't just blow air through the lines — we investigate your entire system to ensure every drop of water is removed before the ground freezes.",
            "For residential jobs, we don't need to get into your garage. We can do everything outside your home as we turn off your water supply via your water main.",
          ],
          list: [
            "Investigating the type of system, number of zones, drain and zone valves, water mains, etc.",
            "Calibrating the machinery for your specific sprinkler system",
            "Blowing out each zone of the sprinkler system",
            "Shutting off your main backflow to minimize damage to city sewer systems and water lines (required by law)",
          ],
        },
        {
          heading: "Scheduling — We Fill Up Fast",
          body: [
            "Blowouts start the first week in October and run through Thanksgiving. We fill up FAST. Get your name on the annual list or schedule your blowout early.",
            "We do things differently from other blowout companies across Central Oregon. Instead of making individual appointments, we start our season in Sunriver and work North to Redmond. This allows us to take advantage of the elevation changes across Central Oregon and maximize the number of blowouts we can complete in the season.",
            "When we complete the service, we leave a door hanger on your door letting you know service has been completed.",
          ],
        },
        {
          heading: "When to Winterize Your System",
          body: [
            "We suggest winterizing your sprinkler system no later than December 1st in Bend, Oregon. According to the Bureau of the Interior, the average low temperature for Bend starts dropping below freezing in September. However, the daily average temperature stays above freezing until November.",
            "Given the elevation change throughout Central Oregon — from 2,200 feet in Madras to 4,200 feet in La Pine — the date the ground freezes will fluctuate. Just be sure no water is left in your sprinkler system by the time the ground starts to freeze.",
            "If you play the averages, your best bet to avoid freezing ground is October through about November 15th.",
          ],
        },
      ]}
      relatedLinks={relatedLinks}
      resourceLinks={resourceLinks}
      galleryImages={[
        { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/safe-hero-sprinkler-blowout-ka6aHMQ4D2ZdLaTeYmGKem.webp", alt: "Sprinkler winterization blowout service in Bend Oregon" },
        { src: "/manus-storage/svc-sprinkler-blowout-2_42cdf7de.jpg", alt: "Irrigation system blowout with air compressor in Central Oregon" },
        { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/safe-hero-sprinkler-blowout-ka6aHMQ4D2ZdLaTeYmGKem.webp", alt: "Fall sprinkler blowout and winterization service in Bend Oregon" },
      ]}
      schemaUrl="/services/sprinkler-blowout"
      schemaName="Sprinkler Winterization"
      schemaDescription="Professional sprinkler blowout and winterization service in Bend, Oregon. $140/tech hour. Schedule before the first freeze."
      faqs={[
          { question: "How much does a sprinkler blowout cost in Bend?", answer: "Sprinkler winterization in Bend is billed at $140 per tech hour with a one-hour minimum. Most residential blowouts take 30–60 minutes depending on the number of zones. We use commercial-grade compressors to ensure every zone is fully cleared of water." },
          { question: "When should I winterize my sprinkler system in Bend?", answer: "In Central Oregon, the first hard freeze (below 28°F) typically arrives in late October or early November. We recommend scheduling your blowout in September or October to beat the rush. Once nighttime temperatures consistently drop below freezing, any water left in your pipes can expand and crack them — repairs cost far more than a blowout." },
          { question: "What happens if I skip the blowout?", answer: "Water left in irrigation pipes and heads during a freeze expands and can crack PVC pipe, split poly tubing, break spray heads, and damage valve bodies. A single freeze event can cause $500–$3,000 in repair costs. A blowout costs a fraction of that and takes less than an hour." },
          { question: "Do you also do spring activation?", answer: "Yes — we offer sprinkler system spring startup and activation at the same $140/tech hour rate. We check all zones, test heads, adjust coverage, inspect the backflow preventer, and program your controller for the season. Scheduling spring activation and fall blowout together saves time and ensures your system runs perfectly all season." },
          { question: "Can I blow out my own sprinklers?", answer: "It is possible but not recommended. Homeowners often use undersized compressors that cannot fully clear all zones, leaving water in the lines. Over-pressurizing can also damage heads and valves. Our commercial compressors deliver the correct CFM for complete evacuation without equipment damage." },
      ]}
    />
  );
}
