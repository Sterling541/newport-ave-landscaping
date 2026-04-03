/* ============================================================
   ABOUT PAGE — Newport Ave Landscaping
   Design: Dark charcoal + cream. Serif display headings.
   Founder story, timeline, management team.
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";

const TEAM_PHOTO = "https://newportavelandscaping.com/wp-content/uploads/2022/08/Newport-Landscaping-2022-Ariel-Dawn-Photography14-683x1024.jpg";
const FOUNDER_PHOTO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/sterling-portrait-enhanced_f22e8cfa.jpg";

const timeline = [
  {
    year: "2005",
    title: "TURF Launched",
    description:
      "Sterling West finished school at OSU and with an unbridled entrepreneurial spirit, borrowed his Dad's old farm truck and started a lawn maintenance company called TURF.",
  },
  {
    year: "2011",
    title: "TURF Overgrown",
    description:
      "TURF had grown to 8 employees and over 250 weekly maintenance accounts. Customers continued to ask for landscape construction, so we started hiring experts.",
  },
  {
    year: "2012",
    title: "Newport Ave Landscaping",
    description:
      "TURF changes to Newport Ave Landscaping — initially located at Newport Ave and 14th — and offers clients both maintenance and design & build service.",
  },
  {
    year: "2022",
    title: "Most Qualified in Central Oregon",
    description:
      "Growth doubles each year and Newport Ave Landscaping becomes the most qualified full-service landscape firm in Central Oregon with a team of 150+ professionals.",
  },
];

const team = [
  { name: "Jana", role: "General Manager", photo: "https://newportavelandscaping.com/wp-content/uploads/2022/08/Jana-General-Manager-683x1024.jpg" },
  { name: "Mykiah", role: "Front Office", photo: "https://newportavelandscaping.com/wp-content/uploads/2022/08/Mykiah-Front-Office-1-683x1024.jpg" },
  { name: "Aurora", role: "Project Manager", photo: "https://newportavelandscaping.com/wp-content/uploads/2022/08/Aurora-Project-Manager-683x1024.jpg" },
  { name: "Chris", role: "Project Manager", photo: "https://newportavelandscaping.com/wp-content/uploads/2022/08/Newport-Landscaping-2022-Ariel-Dawn-Photography17-683x1024.jpg" },
  { name: "Annelie", role: "Lead Landscape Designer", photo: "https://newportavelandscaping.com/wp-content/uploads/2022/08/Annelie-Lead-Landscape-Designer-683x1024.jpg" },
  { name: "Milton", role: "Maintenance Dept. Manager", photo: "https://newportavelandscaping.com/wp-content/uploads/2022/08/Milton-Maintenance-Dept.-Manager-1-683x1024.jpg" },
  { name: "Francis", role: "Irrigation Technician", photo: "https://newportavelandscaping.com/wp-content/uploads/2022/08/Francis-Irrigation-Technition-1-1-683x1024.jpg" },
  { name: "John", role: "Landscape Consultant", photo: "https://newportavelandscaping.com/wp-content/uploads/2022/08/John-Landscape-Consultant-1-683x1024.jpg" },
  { name: "Nathan", role: "Landscape Consultant", photo: "https://newportavelandscaping.com/wp-content/uploads/2022/08/Nathan-Landscaping-Consultant-1-683x1024.jpg" },
  { name: "Jesus", role: "Construction Foreman", photo: "https://newportavelandscaping.com/wp-content/uploads/2022/08/Jesus-Construction-Foreman-1-683x1024.jpg" },
  { name: "Patrick", role: "Construction Foreman", photo: "https://newportavelandscaping.com/wp-content/uploads/2022/08/Patrick-Construction-Foreman-1-683x1024.jpg" },
  { name: "Tommy", role: "Construction Foreman", photo: "https://newportavelandscaping.com/wp-content/uploads/2022/08/Tommy-Construction-Foreman-683x1024.jpg" },
  { name: "Miguel", role: "Construction Foreman", photo: "https://newportavelandscaping.com/wp-content/uploads/2022/08/Miguel-Construction-Foreman-1-683x1024.jpg" },
  { name: "Miguel Jr.", role: "Construction Foreman", photo: "https://newportavelandscaping.com/wp-content/uploads/2022/08/Miguel-Jr.-Construction-Foreman-1-683x1024.jpg" },
  { name: "Neri", role: "Maintenance Lead", photo: "https://newportavelandscaping.com/wp-content/uploads/2022/08/Newport-Landscaping-2022-Ariel-Dawn-Photography14-683x1024.jpg" },
];

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

export default function About() {
  return (
    <div style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
      <Navbar />

      {/* ── Hero ── */}
      <section
        className="relative flex items-end"
        style={{
          height: "clamp(320px, 45vw, 520px)",
          backgroundColor: "oklch(0.12 0.005 0)",
        }}
      >
        <img
          src={TEAM_PHOTO}
          alt="Newport Ave Landscaping team"
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center top", opacity: 0.75,
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(0deg, oklch(0.10 0.005 0 / 0.75) 0%, oklch(0 0 0 / 0.10) 60%)" }}
        />
        <div className="container relative pb-14" style={{ paddingTop: "clamp(200px, 22vw, 280px)" }}>
          <div className="font-label mb-3 flex items-center gap-3" style={{ color: "oklch(0.72 0.12 25)" }}>
            <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
            Our Story
          </div>
          <h1
            className="font-display font-light text-white"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)", lineHeight: 1.0 }}
          >
            About Newport Ave<br />
            <em style={{ color: "oklch(0.75 0.10 25)" }}>Landscaping</em>
          </h1>
        </div>
      </section>

      {/* ── Founder Story ── */}
      <section className="py-24" style={{ backgroundColor: "oklch(1 0 0)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="font-label mb-4 flex items-center gap-3" style={{ color: "oklch(0.46 0.20 25)" }}>
                <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
                Our Founder
              </div>
              <h2
                className="font-display font-light mb-6"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "oklch(0.15 0.005 0)", lineHeight: 1.1 }}
              >
                3rd Generation<br />
                <em style={{ color: "oklch(0.46 0.20 25)" }}>Landscape Professional</em>
              </h2>
              <div className="space-y-5 font-body" style={{ color: "oklch(0.38 0.008 0)", lineHeight: 1.8, fontWeight: 300 }}>
                <p>
                  My grandfather founded and operated the largest landscaping company in Orange County, California in 1960 — Orange County Landscaping, Inc. After college, I noticed a void of high-quality landscapers in Bend. As a 3rd generation landscape construction professional, I founded Newport Ave Landscaping with the intention of setting a new standard of service and workmanship in the industry.
                </p>
                <p>
                  Today, we've grown to become Central Oregon's most qualified full-service landscape firm. Our work has been published twice in <em>Architectural Digest</em> magazine, and we've designed outdoor living spaces for top executives, athletes, and celebrities — including Shaun White, Mark Hoppus (Blink-182), Steven Tyler (Aerosmith), Rihanna, Kim Kardashian, Triple D, Candy Spelling, and more.
                </p>
                <p>
                  I encourage you to look at the testimonials on this website and reviews on Google, Bing, Home Advisor, and the BBB. Thank you for considering Newport Ave Landscaping.
                </p>
              </div>
              <div
                className="mt-8 pt-6 flex items-center gap-4"
                style={{ borderTop: "1px solid oklch(0.90 0.010 85)" }}
              >
                <div>
                  <div className="font-display font-medium" style={{ color: "oklch(0.15 0.005 0)", fontSize: "1.05rem" }}>
                    Sterling West
                  </div>
                  <div className="font-label" style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.72rem" }}>
                    President &amp; Principal Designer
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="relative overflow-hidden" style={{ borderRadius: "1.5rem 0 1.5rem 0" }}>
                <img
                  src={FOUNDER_PHOTO}
                  alt="Sterling West — Founder of Newport Ave Landscaping"
                  style={{ width: "100%", height: "480px", objectFit: "cover", objectPosition: "center top", display: "block" }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 p-6"
                  style={{ background: "linear-gradient(0deg, oklch(0.10 0.005 0 / 0.85) 0%, transparent 100%)" }}
                >
                  <div className="font-display font-medium text-white" style={{ fontSize: "1.1rem" }}>Sterling West</div>
                  <div className="font-label" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.72rem" }}>Founder &amp; President</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.15 0.005 0)" }}>
        <div className="container">
          <FadeIn>
            <div className="font-label mb-4 flex items-center gap-3" style={{ color: "oklch(0.72 0.12 25)" }}>
              <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
              Our History
            </div>
            <h2
              className="font-display font-light text-white mb-14"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", lineHeight: 1.1 }}
            >
              Two Decades of<br />
              <em style={{ color: "oklch(0.75 0.10 25)" }}>Growth &amp; Excellence</em>
            </h2>
          </FadeIn>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-0 top-0 bottom-0 hidden md:block"
              style={{ width: "2px", backgroundColor: "oklch(0.46 0.20 25 / 0.35)", left: "80px" }}
            />
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <FadeIn key={item.year} delay={i * 0.1}>
                  <div className="flex gap-8 items-start">
                    <div
                      className="hidden md:flex flex-shrink-0 w-20 h-20 rounded-full items-center justify-center font-display font-light text-white"
                      style={{
                        backgroundColor: "oklch(0.46 0.20 25)",
                        fontSize: "1.1rem",
                        minWidth: "80px",
                      }}
                    >
                      {item.year}
                    </div>
                    <div className="pt-2">
                      <div className="font-label mb-1 md:hidden" style={{ color: "oklch(0.46 0.20 25)" }}>
                        {item.year}
                      </div>
                      <h3
                        className="font-display font-light text-white mb-2"
                        style={{ fontSize: "1.3rem" }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="font-body"
                        style={{ color: "oklch(0.70 0.008 0)", fontWeight: 300, lineHeight: 1.7, maxWidth: "560px" }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
        <div className="container">
          <FadeIn>
            <div className="font-label mb-4 flex items-center gap-3" style={{ color: "oklch(0.46 0.20 25)" }}>
              <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
              The People Behind the Work
            </div>
            <h2
              className="font-display font-light mb-14"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "oklch(0.15 0.005 0)", lineHeight: 1.1 }}
            >
              Our Management<br />
              <em style={{ color: "oklch(0.46 0.20 25)" }}>Team</em>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {team.map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.05}>
                <div
                  className="text-center overflow-hidden"
                  style={{ backgroundColor: "oklch(1 0 0)", borderRadius: "1rem 0 1rem 0" }}
                >
                  {/* Real headshot photo */}
                  <div style={{ height: "180px", overflow: "hidden" }}>
                    <img
                      src={member.photo}
                      alt={`${member.name} — ${member.role}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
                    />
                  </div>
                  <div className="p-4">
                    <div
                      className="font-display font-medium mb-1"
                      style={{ fontSize: "0.95rem", color: "oklch(0.15 0.005 0)" }}
                    >
                      {member.name}
                    </div>
                    <div
                      className="font-label"
                      style={{ fontSize: "0.65rem", color: "oklch(0.46 0.20 25)" }}
                    >
                      {member.role}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Plus crew callout */}
          <FadeIn>
            <div
              className="p-8 text-center"
              style={{ backgroundColor: "oklch(0.15 0.005 0)" }}
            >
              <div
                className="font-display font-light text-white mb-2"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                150<span style={{ color: "oklch(0.72 0.12 25)" }}>+</span>
              </div>
              <div className="font-label" style={{ color: "oklch(0.60 0.008 0)" }}>
                Incredibly Hard-Working Landscapers in the Field Every Day
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-20 text-center"
        style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
      >
        <div className="container">
          <FadeIn>
            <h2
              className="font-display font-light text-white mb-4"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
            >
              Ready to Transform Your Landscape?
            </h2>
            <p
              className="font-body mb-8 mx-auto"
              style={{ color: "oklch(0.92 0.05 25)", fontWeight: 300, maxWidth: "480px" }}
            >
              Let's start a conversation about your outdoor vision. Our team is ready to bring it to life.
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
