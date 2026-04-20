/* ============================================================
   SERVICES / INSTALL PAGE — Newport Ave Landscaping
   Design: Dark charcoal + cream. Serif display headings.
   Full residential + commercial install services.
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
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

const residentialServices = [
  {
    title: "Custom Design & Build",
    href: "/services/landscape-design",
    description: "Work with our award-winning design team to bring your outdoor oasis to life. We handle everything from initial concept through final installation, with a 5-year warranty on main irrigation components for Priority Membership clients.",
    image: "/manus-storage/NewportLandscapingRVParkDay2Photos2_8e8d0bb1.jpg",
  },
  {
    title: "Patio Pavers & Walkways",
    href: "/services/pavers",
    description: "We are your one-stop shop for all outdoor paving needs — driveways, walkways, patios, pool decks, and more. We work with natural stone, concrete pavers, flagstone, and brick to create surfaces that last decades.",
    image: "/manus-storage/GLLPatio10_2ffabcfb.jpg",
  },
  {
    title: "Sprinklers & Irrigation",
    href: "/services/irrigation",
    description: "With a full-time team dedicated exclusively to sprinkler installation and maintenance, we design and install efficient irrigation systems that keep your landscape thriving while conserving water.",
    image: "/manus-storage/water-feature-sunset_f7b219d3.jpg",
  },
  {
    title: "Water Features",
    href: "/services/water-features",
    description: "Ponds, streams, pondless waterfalls, fountains, and any other water feature you can dream up. Our water feature specialists create living, breathing focal points that transform any outdoor space.",
    image: "/manus-storage/century-drive-01_cfe36a70.jpg",
  },
  {
    title: "Outdoor Living Areas",
    href: "/services/outdoor-living",
    description: "From outdoor kitchens and fire features to pergolas and covered patios — we design and build complete outdoor living spaces that extend your home and create unforgettable entertaining areas.",
    image: "/manus-storage/petrosa-backyard-01_45e0b956.jpg",
  },
  {
    title: "Fire Features",
    href: "/services/fire-features",
    description: "Gas fire pits, wood-burning fireplaces, fire bowls, and custom built-in fire features. We integrate fire into your landscape design to create warmth, ambiance, and year-round outdoor enjoyment.",
    image: "/manus-storage/petrosa-backyard-01_45e0b956.jpg",
  },
  {
    title: "Retaining Walls",
    href: "/services/retaining-walls",
    description: "Structural and decorative retaining walls in natural stone, concrete block, and timber. We solve drainage and grade challenges while adding beautiful architectural elements to your landscape.",
    image: "/manus-storage/awbrey-patio-wall-01_bde91632.jpg",
  },
  {
    title: "Landscape Lighting",
    href: "/services/landscape-lighting",
    description: "Professional low-voltage LED landscape lighting that highlights your home's architecture, illuminates pathways, and creates dramatic nighttime ambiance. Energy-efficient and built to last.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/maintenance-hero-bg_3219f29e.jpeg",
  },
  {
    title: "Xeriscaping",
    href: "/services/xeriscaping",
    description: "Water-wise landscaping designed specifically for Central Oregon's high desert climate. Beautiful, low-maintenance landscapes using native plants, decorative rock, and efficient irrigation.",
    image: "/manus-storage/awbrey-patio-wall-01_bde91632.jpg",
  },
  {
    title: "Drainage Solutions",
    href: "/services/drainage",
    description: "French drains, dry creek beds, catch basins, and grading solutions to protect your property from water damage. We solve drainage problems permanently and beautifully.",
    image: "/manus-storage/water-feature-sunset_f7b219d3.jpg",
  },
];

const commercialServices = [
  {
    title: "Commercial Landscape Maintenance",
    description: "Reliable, professional maintenance for office parks, retail centers, and commercial properties. We understand the higher standard commercial clients demand.",
  },
  {
    title: "Landscape Design & Consultation",
    description: "Master planning and design consultation for commercial developments, HOA communities, and large-scale projects. We work with architects and developers from concept through completion.",
  },
  {
    title: "Water Consultation & Management",
    description: "Irrigation audits, water management plans, and smart controller upgrades to reduce water usage and operating costs for commercial properties.",
  },
  {
    title: "Snow & Ice Management",
    description: "Commercial snow plowing, de-icing, and ice management for parking lots, walkways, and access roads. Priority scheduling for commercial maintenance clients.",
  },
];

export default function Services() {
  return (
    <div style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
      <SEO
        title="Landscaping Services Bend Oregon | Design, Install & Maintenance"
        description="Full-service landscaping in Bend, OR: custom design & build, pavers, irrigation, xeriscaping, water features, outdoor living, lighting & snow removal. LCB #9153. Free estimates."
        canonical="/services"
      />
      <Navbar />

      {/* ── Hero ── */}
      <section
        className="relative flex items-end"
        style={{
          height: "clamp(280px, 38vw, 440px)", marginTop: "204px",
          backgroundColor: "oklch(0.12 0.005 0)",
          backgroundImage: "url(/manus-storage/NinesProject3_602cdeb8.jpg",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(0deg, oklch(0.10 0.005 0 / 0.92) 0%, oklch(0 0 0 / 0.30) 70%)" }}
        />
        <div className="container relative pb-14" style={{ paddingTop: "clamp(200px, 22vw, 280px)" }}>
          <div className="font-label mb-3 flex items-center gap-3" style={{ color: "oklch(0.72 0.12 25)" }}>
            <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
            Installation &amp; Design
          </div>
          <h1
            className="font-display font-light text-white"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)", lineHeight: 1.0 }}
          >
            Complete Landscaping<br />
            <em style={{ color: "oklch(0.75 0.10 25)" }}>Services</em>
          </h1>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="py-16" style={{ backgroundColor: "oklch(1 0 0)" }}>
        <div className="container">
          <div className="max-w-3xl">
            <FadeIn>
              <div className="font-label mb-4 flex items-center gap-3" style={{ color: "oklch(0.46 0.20 25)" }}>
                <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
                Award-Winning Design &amp; Build
              </div>
              <h2
                className="font-display font-light mb-5"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", color: "oklch(0.15 0.005 0)", lineHeight: 1.1 }}
              >
                From Concept to Completion —<br />
                <em style={{ color: "oklch(0.46 0.20 25)" }}>No Job Too Big or Small</em>
              </h2>
              <p
                className="font-body mb-5"
                style={{ color: "oklch(0.38 0.008 0)", lineHeight: 1.8, fontWeight: 300 }}
              >
                Newport Avenue Landscaping handles every aspect of landscape installation — from award-winning custom design to the final walkthrough. Our team of 150+ professionals has completed thousands of projects across Central Oregon, from intimate residential gardens to large commercial developments and government contracts.
              </p>
              <p
                className="font-body"
                style={{ color: "oklch(0.38 0.008 0)", lineHeight: 1.8, fontWeight: 300 }}
              >
                Our work has been published twice in <em>Architectural Digest</em> and we've designed outdoor living spaces for celebrities, athletes, and executives worldwide. Whatever your vision, our team has the expertise to bring it to life.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Residential Services ── */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
        <div className="container">
          <FadeIn>
            <div className="font-label mb-4 flex items-center gap-3" style={{ color: "oklch(0.46 0.20 25)" }}>
              <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
              Residential
            </div>
            <h2
              className="font-display font-light mb-14"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "oklch(0.15 0.005 0)", lineHeight: 1.1 }}
            >
              Residential Landscaping<br />
              <em style={{ color: "oklch(0.46 0.20 25)" }}>Installation Services</em>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {residentialServices.map((service, i) => (
              <FadeIn key={service.title} delay={(i % 4) * 0.08}>
                <Link href={service.href}>
                  <div
                    className="flex gap-0 overflow-hidden group cursor-pointer transition-shadow hover:shadow-md"
                    style={{ backgroundColor: "oklch(1 0 0)" }}
                  >
                    <div
                      className="flex-shrink-0 w-2"
                      style={{ backgroundColor: i % 3 === 0 ? "oklch(0.46 0.20 25)" : i % 3 === 1 ? "oklch(0.15 0.005 0)" : "oklch(0.72 0.12 25)" }}
                    />
                    <div className="p-7 flex-1">
                      <h3
                        className="font-display font-light mb-3 group-hover:text-[oklch(0.46_0.20_25)] transition-colors"
                        style={{ fontSize: "1.2rem", color: "oklch(0.15 0.005 0)" }}
                      >
                        {service.title}
                      </h3>
                      <p
                        className="font-body"
                        style={{ color: "oklch(0.45 0.008 0)", lineHeight: 1.75, fontWeight: 300, fontSize: "0.92rem" }}
                      >
                        {service.description}
                      </p>
                      <div className="mt-3 font-label text-[oklch(0.46_0.20_25)] flex items-center gap-1" style={{ fontSize: "0.65rem" }}>
                        Learn More →
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Commercial Services ── */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.15 0.005 0)" }}>
        <div className="container">
          <FadeIn>
            <div className="font-label mb-4 flex items-center gap-3" style={{ color: "oklch(0.72 0.12 25)" }}>
              <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
              Commercial &amp; HOA
            </div>
            <h2
              className="font-display font-light text-white mb-14"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", lineHeight: 1.1 }}
            >
              Commercial Landscaping<br />
              <em style={{ color: "oklch(0.75 0.10 25)" }}>Services</em>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {commercialServices.map((service, i) => (
              <FadeIn key={service.title} delay={i * 0.1}>
                <div className="p-8" style={{ backgroundColor: "oklch(0.20 0.005 0)" }}>
                  <div
                    className="w-8 h-1 mb-5"
                    style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
                  />
                  <h3
                    className="font-display font-light text-white mb-3"
                    style={{ fontSize: "1.25rem" }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="font-body"
                    style={{ color: "oklch(0.65 0.008 0)", lineHeight: 1.75, fontWeight: 300, fontSize: "0.92rem" }}
                  >
                    {service.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* License callout */}
          <FadeIn delay={0.2}>
            <div
              className="mt-10 p-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
              style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
            >
              <div>
                <div className="font-display font-light text-white mb-1" style={{ fontSize: "1.1rem" }}>
                  Licensed, Bonded &amp; Insured
                </div>
                <div className="font-body" style={{ color: "oklch(0.92 0.05 25)", fontSize: "0.88rem", fontWeight: 300 }}>
                  LCB # 9153 — "All Phase" license with the Oregon Landscape Contractors Board
                </div>
              </div>
              <Link
                href="/contact"
                className="btn-red flex-shrink-0"
                style={{ backgroundColor: "oklch(0.15 0.005 0)", letterSpacing: "0.12em" }}
              >
                REQUEST A BID
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-20" style={{ backgroundColor: "oklch(1 0 0)" }}>
        <div className="container">
          <FadeIn>
            <div className="font-label mb-4 flex items-center gap-3" style={{ color: "oklch(0.46 0.20 25)" }}>
              <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
              How It Works
            </div>
            <h2
              className="font-display font-light mb-14"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "oklch(0.15 0.005 0)", lineHeight: 1.1 }}
            >
              Our Process
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Consultation", desc: "We meet at your property to understand your vision, needs, and budget." },
              { step: "02", title: "Design", desc: "Our award-winning designers create a detailed plan tailored to your space." },
              { step: "03", title: "Installation", desc: "Our experienced crews bring the design to life with precision craftsmanship." },
              { step: "04", title: "Walkthrough", desc: "We review every detail together and ensure you're completely satisfied." },
            ].map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.1}>
                <div className="p-7" style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
                  <div
                    className="font-display font-light mb-4"
                    style={{ fontSize: "3rem", color: "oklch(0.46 0.20 25 / 0.25)", lineHeight: 1 }}
                  >
                    {item.step}
                  </div>
                  <h3
                    className="font-display font-light mb-2"
                    style={{ fontSize: "1.1rem", color: "oklch(0.15 0.005 0)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="font-body"
                    style={{ color: "oklch(0.45 0.008 0)", fontSize: "0.88rem", lineHeight: 1.7, fontWeight: 300 }}
                  >
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 text-center" style={{ backgroundColor: "oklch(0.46 0.20 25)" }}>
        <div className="container">
          <FadeIn>
            <h2
              className="font-display font-light text-white mb-4"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
            >
              Start Your Project Today
            </h2>
            <p
              className="font-body mb-8 mx-auto"
              style={{ color: "oklch(0.92 0.05 25)", fontWeight: 300, maxWidth: "480px" }}
            >
              Fill out our project form and one of our landscape consultants will be in touch to schedule your free consultation.
            </p>
            <Link
              href="/contact"
              className="btn-red"
              style={{ backgroundColor: "oklch(0.15 0.005 0)", letterSpacing: "0.12em" }}
            >
              GET A FREE QUOTE
            </Link>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
