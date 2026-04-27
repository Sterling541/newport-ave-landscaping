import CityPageLayout from "@/components/CityPageLayout";

export default function SunriverPage() {
  return (
    <CityPageLayout
      city="Sunriver"
      region="Central Oregon"
      heroImage="/manus-storage/NewportAveLandcaping-9_97b731b0_1204d3ca.webp"
      heroPosition="center 40%"
      tagline="Elevate Your Sunriver Landscape: Expert Design, Installation, and Maintenance for High-Desert Living"
      seoTitle="Sunriver Landscaping Oregon | Premier Sunriver Lawn Care & Design"
      seoDescription="Newport Avenue Landscaping offers premier landscaping and lawn care in Sunriver, Oregon. Expert design, installation, and maintenance tailored for high-desert conditions. LCB#9153. Free estimates."
      canonicalPath="/landscaping/sunriver"
      intro="Newport Avenue Landscaping has proudly served the Sunriver community for many years, bringing our expertise in high-desert landscaping to this unique resort town. Sunriver is unlike any other community in Central Oregon -- a master-planned resort destination with a mix of full-time residents, vacation homeowners, and short-term rental properties that all demand exceptional outdoor spaces. We understand the distinct challenges and opportunities presented by Sunriver's environment, from the bustling Sunriver Resort and Caldera Springs to the numerous vacation rental properties and the Sunriver Business Park. Our deep roots in Central Oregon mean we are intimately familiar with the local aesthetic, the Sunriver Owners Association's landscape standards, and the specific needs of properties in this ponderosa pine-forested setting. We are dedicated to enhancing the natural beauty of Sunriver, creating outdoor spaces that thrive amidst its iconic pines and sandy soils, and providing unparalleled service to both full-time residents and vacation homeowners who need a landscaping partner they can trust to maintain their property even when they are not there. All work is performed by our own licensed crew — we never use subcontractors — and every installation project is backed by our 1-year workmanship warranty on hardscape installations and a 90-day plant warranty on all plantings."
      communityNote="Sunriver's climate, characterized by USDA Zone 5b/6a, presents unique considerations for landscaping due to its higher elevation, colder temperatures, and significant snowfall compared to Bend. At roughly 4,200 feet elevation, Sunriver sits in a natural frost pocket that can see temperatures 5–10 degrees colder than Bend on clear nights, and the growing season is typically 6–8 weeks shorter. The presence of frost pockets and a notably shorter growing season demands careful plant selection and strategic design to ensure year-round beauty and resilience. The sandy volcanic soil prevalent in Sunriver requires specific amendments and irrigation strategies to support healthy plant growth and conserve water effectively. Sunriver's ponderosa pine forest setting also creates a unique design context -- the best Sunriver landscapes work with the trees rather than against them, using shade-tolerant understory plants, natural mulch, and design elements that complement the forest character. The Sunriver Owners Association (SROA) also has landscape standards that govern certain aspects of property maintenance and design, and our team is experienced with navigating these requirements. For vacation rental properties specifically, we offer maintenance programs designed to keep your property looking great between guest stays, with flexible scheduling that works around your rental calendar."
      services={[
        { icon: "maintenance", name: "Sunriver Lawn & Landscape Maintenance", description: "Keep your Sunriver property pristine with our comprehensive lawn and landscape maintenance services, tailored to the short growing season and specific needs of high-elevation resort living. We ensure your outdoor spaces, from vacation rentals to private residences, always look their best. Our team handles everything from seasonal cleanups to regular mowing and pruning, allowing you to enjoy the beauty of Sunriver without the upkeep.", href: "/services/lawn-service" },
        { icon: "sprinklers", name: "Sunriver Irrigation Systems & Repair", description: "Efficient irrigation is crucial in Sunriver's sandy volcanic soils and dry climate. We design, install, and maintain smart irrigation systems that conserve water while ensuring your landscape thrives, addressing the unique challenges of frost pockets and varying property types. Our solutions are designed for optimal performance in Sunriver's specific environmental conditions.", href: "/services/irrigation" },
        { icon: "design", name: "Custom Sunriver Landscape Design", description: "Transform your Sunriver outdoor space with a custom landscape design that harmonizes with the natural beauty of the area and withstands its challenging climate. From rustic mountain retreats to modern resort aesthetics, we create personalized designs for homes and vacation properties alike. Our designs consider Sunriver's heavy snow loads and short growing season, ensuring long-term success.", href: "/services/landscape-design" },
        { icon: "outdoor", name: "Sunriver Outdoor Living & Fire Features", description: "Extend your living space into the beautiful Sunriver outdoors with custom patios, outdoor kitchens, and cozy fire features perfect for chilly evenings. We specialize in creating inviting and functional outdoor environments that enhance your enjoyment of Sunriver's unique setting. Our installations are built to endure the local climate, providing lasting enjoyment for years to come.", href: "/services/fire-features" },
        { icon: "architecture", name: "Sustainable Sunriver Xeriscaping", description: "Embrace water-wise landscaping with our xeriscaping solutions, ideal for Sunriver's dry climate and sandy soils. We design beautiful, low-maintenance landscapes using native and drought-tolerant plants that thrive with minimal irrigation. This approach not only conserves water but also reduces maintenance, making it perfect for both full-time residents and vacation property owners.", href: "/services/xeriscaping" },
        { icon: "commercial", name: "Sunriver Commercial Landscaping & Snow Removal", description: "Newport Avenue Landscaping provides comprehensive commercial landscaping services for Sunriver businesses, including the Sunriver Business Park and resort properties. We also offer reliable snow removal to ensure safe and accessible premises throughout the heavy winter months. Our team understands the importance of maintaining an attractive and functional commercial landscape in a resort community.", href: "/services/snow-removal" },
      ]}
      whyUs={[
        "Over 21 years of dedicated landscaping experience in Central Oregon, including extensive work in Sunriver's unique environment.",
        "Proudly licensed, bonded, and insured with Oregon Landscape Contractor Bond #9153 (LCB #9153), ensuring professional and reliable service.",
        "A robust team of 150+ in-house staff, guaranteeing consistent quality and efficient project completion without relying on subcontractors.",
        "Deep, localized knowledge of Sunriver's specific climate, soil conditions, and architectural styles, enabling tailored and effective solutions.",
        "Commitment to transparent communication and client satisfaction, from initial consultation to project completion.",
        "Offering complimentary, no-obligation estimates for all landscaping projects in Sunriver, providing clear cost breakdowns upfront."
      ]}
      nearbyAreas={[
        { label: "Bend", href: "/landscaping/bend" },
        { label: "La Pine", href: "/landscaping/la-pine" },
        { label: "Deschutes River Woods", href: "/landscaping/deschutes-river-woods" },
        { label: "Crosswater", href: "/landscaping/crosswater" },
        { label: "Caldera Springs", href: "/landscaping/caldera-springs" },
        { label: "Sisters", href: "/landscaping/sisters" },
        { label: "Redmond", href: "/landscaping/redmond" }
      ]}
      neighborhoodSections={[
        {
          name: "Sunriver Resort & SHARC Area",
          description: "The Sunriver Resort core and the SHARC (Sunriver Homeowners Aquatic & Recreation Center) area represent the heart of the Sunriver community. Properties in this zone are highly visible and must be maintained to the Sunriver Owners Association's standards. Newport Avenue provides both installation and ongoing maintenance for resort-adjacent properties, understanding the SROA's landscape requirements and the high aesthetic bar set by the resort itself.",
          highlights: [
            "SROA-compliant landscape design and installation",
            "Resort-quality outdoor living spaces",
            "Year-round maintenance programs for full-time residents",
            "Vacation rental turnover-ready maintenance scheduling",
            "Snow removal for resort-adjacent commercial and residential properties",
          ],
          projectNote: "Recent project: Full landscape renovation for a resort-adjacent home — natural basalt patio, ponderosa pine-compatible plantings, and drip irrigation system.",
        },
        {
          name: "Caldera Springs",
          slug: "/landscaping/caldera-springs",
          description: "Caldera Springs is Sunriver's premium resort neighborhood, featuring luxury homes, a private pool and spa complex, and a distinctive architectural character that blends Pacific Northwest lodge aesthetics with modern design. The neighborhood's HOA has specific landscape standards that emphasize natural materials, native plantings, and designs that complement the ponderosa pine forest setting. Newport Avenue has completed multiple projects in Caldera Springs and understands the community's design review process.",
          highlights: [
            "Caldera Springs HOA-compliant landscape design",
            "Luxury outdoor living spaces with natural stone",
            "Native and adapted plant palettes for forest setting",
            "Vacation property maintenance programs",
            "Irrigation system installation and smart controller upgrades",
          ],
          projectNote: "Recent project: Luxury landscape package at Caldera Springs — natural basalt flagstone patio, outdoor fire feature, native plant borders, and smart irrigation system with remote monitoring.",
        },
        {
          name: "Crosswater",
          slug: "/landscaping/crosswater",
          description: "Crosswater is Sunriver's most exclusive neighborhood, featuring large custom homes on the Deschutes River and Crosswater Golf Course. The community's HOA has strict landscape standards that reflect the golf course and river setting — natural materials, low-profile plantings that don't obstruct course views, and irrigation systems that meet the community's water conservation standards. Newport Avenue's experience with golf course-adjacent properties makes us well-suited for Crosswater projects.",
          highlights: [
            "Crosswater HOA-compliant landscape design",
            "Golf course-adjacent turf and irrigation management",
            "Deschutes River-adjacent riparian-sensitive landscaping",
            "Luxury outdoor living spaces with river and course views",
            "Vacation property maintenance for absentee owners",
          ],
          projectNote: "Recent project: Backyard renovation at Crosswater — natural stone patio, outdoor kitchen, and low-profile plantings that preserve the golf course view corridor.",
        },
        {
          name: "Vacation Rental Properties",
          description: "Sunriver has one of the highest concentrations of vacation rental properties in Oregon, with thousands of homes available for short-term rental through platforms like VRBO and Airbnb. Vacation rental owners face unique landscaping challenges: properties must look great for guests year-round, maintenance must be scheduled around rental calendars, and the landscape must be durable enough to handle high foot traffic and varying levels of guest care. Newport Avenue offers flexible maintenance programs specifically designed for vacation rental owners — we work around your rental calendar, provide photo documentation after each visit, and can coordinate with your property manager.",
          highlights: [
            "Flexible maintenance scheduling around rental calendars",
            "Photo documentation after each maintenance visit",
            "Coordination with property managers and rental platforms",
            "Durable, low-maintenance landscape design for high-traffic properties",
            "Seasonal cleanup programs between rental seasons",
          ],
          projectNote: "We currently maintain over 40 vacation rental properties in Sunriver — contact us to discuss a maintenance program tailored to your rental schedule.",
        },
      ]}
      ctaNote="Ready to transform your Sunriver landscape? Contact Newport Avenue Landscaping today for a free, no-obligation estimate. We pride ourselves on quick response times and offer seasonal programs perfectly suited to Sunriver's climate, ensuring your property looks its best year-round. Let us bring our local expertise to your outdoor vision."
      faqs={[
        { question: "How much does landscaping cost in Sunriver, Oregon?", answer: "Landscaping costs in Sunriver vary based on project scope and materials, reflecting the unique challenges of the local environment. For general lawn care, services typically range from $97 per visit, while comprehensive cleanups start around $600. Irrigation system installations, crucial for Sunriver's sandy soils, usually fall between $1,600-$2,000 per zone, depending on complexity. Full landscape design and installation projects, especially for larger properties or resort-style homes, can range from $15,000 to $80,000+, ensuring a tailored and high-quality outdoor space."
        },
        { question: "What landscaping services does Newport Avenue offer in Sunriver?", answer: "Newport Avenue Landscaping provides a full spectrum of services specifically designed for Sunriver properties. This includes expert landscape design and installation, comprehensive lawn and garden maintenance, and efficient irrigation system design, repair, and winterization. We also specialize in creating stunning outdoor living spaces with custom patios and fire features, sustainable xeriscaping solutions, and essential commercial landscaping, including reliable snow removal for businesses and resort properties. Our offerings are tailored to meet the unique demands of Sunriver's climate and aesthetic."
        },
        { question: "Is Newport Avenue Landscaping licensed and insured in Oregon?", answer: "Yes. Newport Avenue Landscaping holds Oregon Landscape Contractor Bond #9153 (LCB #9153). We are fully licensed, bonded, and insured for all residential and commercial landscaping work in Sunriver and throughout Central Oregon. Our commitment to compliance and safety ensures peace of mind for all our clients, knowing their projects are handled by a reputable and legally operating company."
        },
        { question: "Do you offer free estimates in Sunriver, Oregon?", answer: "Absolutely! Newport Avenue Landscaping is pleased to offer free, no-obligation estimates for all landscaping projects in Sunriver. We typically respond to inquiries within 24-48 hours to schedule a convenient site visit. During this visit, our experts will assess your property, discuss your vision, and provide a detailed proposal tailored to your specific needs and the unique characteristics of your Sunriver landscape."
        },
        { question: "What areas of Sunriver do you serve?", answer: "We proudly serve all key areas within Sunriver, including the Sunriver Resort, SHARC, and Caldera Springs. Our services extend to vacation rental properties, full-time resident homes, and businesses within the Sunriver Business Park. We also cater to properties in nearby communities such as Crosswater and Deschutes River Woods, ensuring comprehensive coverage for the greater Sunriver area."
        },
        { question: "How does Sunriver's heavy snow and short growing season impact landscaping?", answer: "Sunriver's heavy snowfall and short growing season necessitate specialized landscaping approaches to ensure plant survival and year-round appeal. We select cold-hardy, snow-tolerant plants and implement strategic design elements to protect landscapes from winter damage. Our maintenance programs include specific winter preparations and spring revitalization to maximize the brief but vibrant growing season, ensuring your Sunriver landscape remains beautiful and resilient despite the challenging climate. This includes proper pruning, mulching, and irrigation adjustments."
        },
      ]}
      mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11774.2!2d-121.4432!3d43.8793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54b8c8b8b8b8b8b8%3A0x1088e7acc720d1b4!2sSunriver%2C%20OR!5e0!3m2!1sen!2sus!4v1713400000003"
/>
  );
}