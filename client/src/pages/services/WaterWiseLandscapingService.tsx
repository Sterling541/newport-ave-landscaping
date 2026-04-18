import ServicePageLayout from "@/components/ServicePageLayout";

export default function WaterWiseLandscapingService() {
  return (
    <ServicePageLayout
      category="Water Conservation"
      title="Water-Wise Landscaping"
      subtitle="Drought-tolerant design, efficient irrigation, and turf replacement — built for Bend's high desert climate."
      seoTitle="Water-Wise Landscaping Bend Oregon | Xeriscape & Turf Replacement | Newport Avenue"
      seoDescription="Expert water-wise landscaping in Bend, OR. Xeriscape conversions, drip irrigation, smart controllers, and City of Bend Turf Replacement Rebate assistance. LCB #9153. Call (541) 617-8873."
      heroImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80"
      heroPosition="center"
      schemaName="Water-Wise Landscaping Services"
      schemaDescription="Newport Avenue Landscaping provides water-wise landscaping services in Bend, Oregon including xeriscape design, turf replacement, drip irrigation installation, smart controller upgrades, and City of Bend Turf Replacement Rebate assistance."
      schemaUrl="/services/water-wise-landscaping"
      intro="Bend's high desert climate averages only 12 inches of rain per year — yet most conventional lawns require 30–40 inches of water annually to stay green. Water-wise landscaping bridges that gap with drought-tolerant plants, efficient drip irrigation, and smart design that looks beautiful while using a fraction of the water. Newport Avenue Landscaping has been designing and installing water-wise landscapes across Bend and Central Oregon for over 21 years."
      sections={[
        {
          heading: "City of Bend Watering Rules",
          body: [
            "The City of Bend enforces year-round outdoor watering restrictions. Understanding these rules is the first step toward a water-efficient landscape.",
            "Watering is permitted only between 5:00 PM and 9:00 AM — never during the heat of the day. Properties with even-numbered addresses water on even calendar days; odd-numbered addresses water on odd days. In months with 31 days, the 31st is an open watering day for all addresses. Violations can result in fines.",
            "Newport Avenue designs and programs all irrigation systems to comply with these restrictions automatically. Our smart controller installations can be set to the correct schedule on day one, so you never have to think about it.",
          ],
          accent: false,
        },
        {
          heading: "City of Bend Turf Replacement Rebate — 2026 Season Open",
          body: [
            "The City of Bend's Turf Replacement Rebate program is currently open for the 2026 season (opened April 1). The program pays $3 per square foot of qualifying turf removed and replaced with water-wise landscaping, up to a maximum of $3,000.",
            "To qualify, you must be a City of Bend water customer, remove at least 200 square feet of irrigated turf, and replace it with drought-tolerant plants and/or permeable hardscape. The new landscape must be maintained for three years.",
            "Newport Avenue handles the entire rebate process — we design the project to meet all eligibility requirements, complete the installation, and provide all documentation needed for your application. Many clients recover $1,500–$3,000 toward their project cost.",
          ],
          accent: true,
        },
        {
          heading: "Xeriscape Design & Turf Conversion",
          body: [
            "A full xeriscape conversion replaces water-intensive Kentucky bluegrass or tall fescue with a designed landscape of drought-tolerant shrubs, ornamental grasses, native perennials, and decorative rock or mulch. The result is a landscape that requires 50–75% less water than a conventional lawn.",
            "Our design process starts with a site analysis — sun exposure, soil type, slope, and existing irrigation — followed by a plant palette selected for Bend's Zone 6b climate and your aesthetic preferences. We handle everything from sod removal and soil amendment to planting, mulching, and irrigation conversion.",
          ],
        },
        {
          heading: "Drip Irrigation Installation & Conversion",
          body: [
            "Drip irrigation delivers water directly to the root zone of each plant, eliminating the evaporation and runoff losses of overhead spray systems. Converting your planting beds from spray heads to drip can reduce water use in those zones by 30–50%.",
            "Newport Avenue installs pressure-compensating drip systems with individual emitters for each plant, ensuring uniform coverage regardless of slope or pressure variation. We also install inline drip tubing for groundcover areas and shrub beds.",
          ],
        },
        {
          heading: "Smart Irrigation Controllers",
          body: [
            "A smart weather-based controller adjusts your watering schedule automatically based on local weather data, soil moisture, and evapotranspiration rates. On a day it rains, the system skips the scheduled run. On a hot, dry day, it may add a few minutes. The result is the right amount of water, every time.",
            "We install and program Rachio, Hunter Hydrawise, and Rain Bird smart controllers. All systems are configured to comply with City of Bend odd/even watering rules and the 5pm–9am time window from day one.",
          ],
        },
        {
          heading: "Drought-Tolerant Plant Selection for Bend",
          body: [
            "Choosing the right plants is the foundation of a water-wise landscape. Bend's Zone 6b climate, alkaline soils, and low humidity favor a specific palette of plants that thrive with minimal supplemental water once established.",
            "Our go-to water-wise plants for Bend include: Penstemon (native, hummingbird magnet), Salvia (long-blooming, deer-resistant), Lavender (fragrant, full sun), Blue Oat Grass and Feather Reed Grass (ornamental grasses), Rabbitbrush (native, golden fall color), Kinnikinnick (native groundcover), Sedum and Stonecrop (succulent groundcovers), and Serviceberry and Chokecherry (native shrubs with wildlife value).",
          ],
        },
        {
          heading: "WaterWise Communities Program for HOAs",
          body: [
            "The City of Bend's WaterWise Communities program offers HOAs and commercial properties a 50% match of project costs — up to $10,000 — for qualifying landscape conversions and irrigation upgrades. Newport Avenue has experience working with HOA boards through the City's evaluation and approval process.",
            "If you manage an HOA or commercial property in Bend, contact us to discuss how we can design a project that maximizes your WaterWise Communities rebate while delivering a landscape your community will be proud of.",
          ],
        },
      ]}
      pricing={[
        { label: "Turf Replacement Rebate (City of Bend)", value: "$3/sq ft, up to $3,000" },
        { label: "WaterWise Communities Rebate (HOA/Commercial)", value: "50% match, up to $10,000" },
        { label: "Xeriscape conversion (installed)", value: "$8–$18/sq ft depending on scope" },
        { label: "Drip irrigation conversion (per zone)", value: "$350–$650/zone" },
        { label: "Smart controller installation", value: "$350–$650 installed" },
        { label: "Spring irrigation activation + audit", value: "$140/tech hour" },
      ]}
      relatedLinks={[
        { label: "Irrigation Systems", href: "/services/irrigation" },
        { label: "Xeriscape & Drought-Tolerant Landscaping", href: "/services/xeriscaping" },
        { label: "Landscape Design", href: "/services/landscape-design" },
        { label: "Commercial Landscaping", href: "/services/commercial" },
      ]}
      resourceLinks={[
        {
          label: "Bend Watering Restrictions Guide",
          href: "/resources/bend-watering-restrictions",
          description: "Complete guide to City of Bend outdoor watering rules, odd/even schedule, and fines.",
        },
        {
          label: "City of Bend Turf Replacement Rebate",
          href: "/resources/bend-turf-replacement-rebate",
          description: "How to qualify, apply, and maximize the $3/sq ft rebate for turf removal.",
        },
        {
          label: "Water-Wise Landscaping in Bend",
          href: "/resources/water-wise-landscaping-bend-oregon",
          description: "Complete guide to xeriscape design, drought-tolerant plants, and irrigation efficiency.",
        },
        {
          label: "WaterWise Communities Program for HOAs",
          href: "/resources/waterwise-communities-bend-hoa",
          description: "How Bend HOAs and commercial properties can get up to $10,000 in rebates.",
        },
      ]}
      faqs={[
        {
          question: "What is water-wise landscaping?",
          answer: "Water-wise landscaping is a design approach that minimizes or eliminates the need for supplemental irrigation by selecting drought-tolerant plants, improving soil, and using efficient irrigation methods like drip systems. In Bend's high desert climate, a well-designed water-wise landscape can use 50–75% less water than a conventional lawn while remaining beautiful year-round.",
        },
        {
          question: "What are the City of Bend's outdoor watering rules?",
          answer: "The City of Bend enforces year-round watering restrictions. Watering is only permitted between 5:00 PM and 9:00 AM. Properties with even-numbered addresses water on even calendar days; odd-numbered addresses water on odd days. The 31st of any month is an open day for all. Violations can result in fines. Newport Avenue programs all irrigation systems to comply automatically.",
        },
        {
          question: "How does the City of Bend Turf Replacement Rebate work?",
          answer: "The City pays $3 per square foot of qualifying irrigated turf that you remove and replace with drought-tolerant landscaping, up to a maximum of $3,000. You must be a City of Bend water customer, remove at least 200 square feet, and maintain the new landscape for three years. The 2026 season is currently open. Newport Avenue handles the entire process including documentation for your rebate application.",
        },
        {
          question: "How much does a xeriscape conversion cost in Bend?",
          answer: "A professionally designed and installed xeriscape conversion in Bend typically costs $8–$18 per square foot depending on the scope, plant selection, and whether irrigation conversion is included. After applying the City of Bend Turf Replacement Rebate ($3/sq ft, up to $3,000), many projects have a net cost of $5–$15 per square foot. The long-term water savings typically pay back the investment within 3–5 years.",
        },
        {
          question: "What plants work best in a water-wise Bend landscape?",
          answer: "The best water-wise plants for Bend's Zone 6b climate include Penstemon, Salvia, Lavender, Blue Oat Grass, Feather Reed Grass, Rabbitbrush, Kinnikinnick, Sedum, Serviceberry, and Chokecherry. These plants are adapted to Bend's alkaline soils, cold winters, and dry summers. Newport Avenue selects plants based on your specific site conditions, sun exposure, and aesthetic preferences.",
        },
        {
          question: "Can Newport Avenue help my HOA with the WaterWise Communities program?",
          answer: "Yes. The City of Bend's WaterWise Communities program offers HOAs and commercial properties a 50% match of project costs up to $10,000. Newport Avenue can design your project, attend the City's pre-construction evaluation meeting, complete all installation, and provide documentation for your rebate application. Contact us to schedule a free consultation.",
        },
        {
          question: "What areas does Newport Avenue serve for water-wise landscaping?",
          answer: "Newport Avenue Landscaping serves Bend, Redmond, Sisters, Sunriver, Tumalo, Prineville, La Pine, Madras, and all of Deschutes and Jefferson Counties. Call (541) 617-8873 or use our online form to schedule a free consultation.",
        },
      ]}
    />
  );
}
