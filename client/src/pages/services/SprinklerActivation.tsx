import ServicePageLayout from "@/components/ServicePageLayout";

const relatedLinks = [
  { label: "Irrigation Installation", href: "/services/irrigation" },
  { label: "Sprinkler Blowout", href: "/services/sprinkler-blowout" },
  { label: "Sprinkler Repair & Backflow", href: "/services/sprinkler-repair" },
  { label: "Lawn Service", href: "/services/lawn-service" },
];

const resourceLinks = [
  {
    label: "Sprinkler System Cost in Bend, OR",
    href: "/resources/sprinkler-system-cost-bend-oregon",
    description: "Full pricing breakdown for irrigation systems in Central Oregon.",
  },
  {
    label: "How to Winterize Your Sprinklers in Bend",
    href: "/resources/sprinkler-winterization-guide-bend-oregon",
    description: "Step-by-step guide to blowout and winterization before the first freeze.",
  },
];

export default function SprinklerActivation() {
  return (
    <ServicePageLayout
      category="Irrigation Services"
      title="Spring Sprinkler"
      subtitle="System Activation"
      seoTitle="Sprinkler Activation Bend Oregon | Spring Sprinkler Startup Service | Newport Avenue"
      seoDescription="Spring sprinkler system startup and activation in Bend, Oregon. Zone checks, head adjustments, and controller programming. $140/tech hour. Schedule now. LCB #9153."
      heroImage="/manus-storage/safe-hero-sprinkler-activation_6c04210c.jpg"
      heroPosition="center 40%"
      intro="April marks the beginning of the watering season here in Central Oregon. At the beginning of each season, it is always wise to inspect, flush, and optimize your sprinkler system to ensure it is ready to perform at its best. We will send one of our certified Irrigation Technicians to analyze and activate your sprinkler system."
      pricing={[
        { label: "Activation Service", value: "$140 / technician hour + materials" },
        { label: "Backflow Testing", value: "$140" },
        { label: "Emergency Service", value: "No extra cost" },
      ]}
      sections={[
        {
          heading: "What's Included in Activation",
          body: "Your irrigation system will be completely flushed, optimized, and adjusted. Rest assured that when we have completed the process, you will have a finely tuned machine — optimized for water conservation, coverage, and lawn health.",
          list: [
            "Backflow turned on and tested",
            "Timer(s) adjusted for seasonal watering schedules",
            "Each sprinkler head inspected and adjusted",
            "Full system flush and pressure check",
            "Leak and break detection",
            "Water conservation optimization",
          ],
        },
        {
          heading: "Backflow Testing",
          body: [
            "The City of Bend requires all residents to have their backflow inspected annually. The backflow prevents contaminants from flowing back into your potable (drinkable) water system.",
            "One of our certified technicians can test your backflow and — unlike other competitors — shoulder the burden of filing the necessary paperwork with the City of Bend. The backflow testing service is $140.",
          ],
          accent: true,
        },
        {
          heading: "Annual Activation List",
          body: [
            "If you want to schedule the service every season, get placed on our annual Sprinkler System Activation list. Just contact us and we will make you a regular.",
            "While we can usually service your irrigation system the same day, during certain times of the year we can get backed up. April–May are our heaviest irrigation activation months — so get on the list early.",
          ],
        },
      ]}
      relatedLinks={relatedLinks}
      resourceLinks={resourceLinks}
      galleryImages={[
        { src: "/manus-storage/svc-sprinkler-activation-1_fd7a0b4a.jpg", alt: "Irrigation technician activating backflow preventer at a Bend Oregon home" },
        { src: "/manus-storage/svc-sprinkler-activation-2_719721d0.jpg", alt: "Technician programming sprinkler controller for spring season in Central Oregon" },
        { src: "/manus-storage/svc-sprinkler-activation-3_b2b5cdfb.jpg", alt: "Residential sprinkler system running after spring activation in Bend Oregon" },
      ]}
      schemaUrl="/services/sprinkler-activation"
      schemaName="Sprinkler System Spring Activation"
      schemaDescription="Spring sprinkler system startup and activation in Bend, Oregon. Zone checks, head adjustments, controller programming. $140/tech hour."
      faqs={[
          { question: "When should I turn on my sprinklers in Bend, Oregon?", answer: "In Central Oregon, we recommend activating your irrigation system in late April or early May, after the last hard frost date has passed. Bend's average last frost is around April 20–25, but late freezes can occur into early May in lower elevations and rural areas. Turning on your system too early risks freeze damage to above-ground components including backflow preventers and spray heads. Newport Avenue Landscaping monitors local frost forecasts and can advise on the optimal activation date for your specific property. Call (541) 617-8873 to get on our spring schedule." },
          { question: "What is included in a spring sprinkler activation in Bend?", answer: "Newport Avenue Landscaping's spring activation service includes: turning on and testing the backflow preventer, pressurizing all zones and checking for leaks or broken heads, inspecting and adjusting every spray head and rotor for proper coverage, flushing the system, programming your controller for the season with zone-by-zone run times optimized for Central Oregon's climate, and a full pressure check. We leave you with a fully operational, water-efficient system ready for summer. Most residential activations take 45–90 minutes." },
          { question: "How much does spring sprinkler startup cost in Bend, Oregon?", answer: "Spring sprinkler activation is billed at $140 per technician hour with a one-hour minimum. Most residential activations take 45–90 minutes, so the typical cost is $140–$210. If repairs are needed (broken heads, stuck valves, damaged pipe), those are quoted separately before any work begins. Backflow testing is an additional $140 if required. Newport Avenue Landscaping is LCB licensed (#9153) and provides a written summary of all work completed." },
          { question: "My sprinklers were not blown out last fall — what should I do in spring?", answer: "If your system was not properly winterized before Bend's first freeze, there is a real risk of cracked pipes, split fittings, or damaged spray heads from ice expansion. Do not pressurize the system until it has been inspected. Newport Avenue Landscaping will perform a pre-activation inspection, identify any freeze damage, provide a repair quote, and then activate the system once repairs are complete. Catching freeze damage early prevents a small repair from becoming a major excavation job." },
          { question: "Do I need backflow testing every year in Bend?", answer: "Yes — the City of Bend requires annual backflow preventer testing for all irrigation systems connected to the municipal water supply. This is required by Oregon law (OAR 333-061-0070) to protect the public water supply from contamination. Newport Avenue Landscaping is certified to perform backflow testing and files the required paperwork directly with the City of Bend Water Services on your behalf. Backflow testing is $140 and is often combined with spring activation for convenience." },
          { question: "Can I get on an annual sprinkler activation schedule in Bend?", answer: "Yes — Newport Avenue Landscaping offers an annual activation list for Bend and Central Oregon homeowners who want their system turned on automatically each spring without having to call. We contact you in March to confirm your appointment and handle scheduling, backflow testing, and any needed repairs. This is especially valuable during our busiest months (April–May) when our schedule fills up fast. Call (541) 617-8873 or contact us online to be added to the annual list." },
      ]}
    />
  );
}
