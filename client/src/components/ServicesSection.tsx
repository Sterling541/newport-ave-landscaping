/* ============================================================
   SERVICES SECTION — Brand Refresh
   White/light-gray background, brand red accents, charcoal text
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { Droplets, Palette, Layers, Scissors, Waves, Flame, Building2, Users } from "lucide-react";

const services = [
  {
    icon: Droplets,
    title: "Sprinklers & Irrigation",
    description:
      "A dedicated full-time team focused exclusively on sprinkler installation, repair, and maintenance. We design custom systems for every property — residential, commercial, and HOA.",
    link: "#contact",
  },
  {
    icon: Palette,
    title: "Custom Design & Build",
    description:
      "Work with our award-winning designers to bring your outdoor vision to life. We offer a 5-year installation warranty — the only company in Central Oregon to do so.",
    link: "#contact",
  },
  {
    icon: Layers,
    title: "Patio Pavers & Walkways",
    description:
      "Your one-stop shop for all outdoor paving needs — driveways, walkways, flagstone patios, and decorative paver installations for homes and commercial properties.",
    link: "#contact",
  },
  {
    icon: Building2,
    title: "Commercial Landscape Installation",
    description:
      "Large-scale commercial landscape installation for business campuses, retail centers, multi-family developments, and government properties throughout Central Oregon.",
    link: "#contact",
  },
  {
    icon: Users,
    title: "HOA & Community Maintenance",
    description:
      "Comprehensive landscape maintenance programs for HOA communities, apartment complexes, and commercial properties — keeping common areas pristine year-round.",
    link: "#contact",
  },
  {
    icon: Scissors,
    title: "Residential Maintenance",
    description:
      "Weekly lawn care, spring/fall clean-ups, aeration, and seasonal maintenance plans so you can spend your weekends making memories.",
    link: "#contact",
  },
  {
    icon: Waves,
    title: "Water Features",
    description:
      "Ponds, streams, koi ponds, bubbling fountains — any water feature you can dream up, crafted by Central Oregon's most trusted pond contractors.",
    link: "#contact",
  },
  {
    icon: Flame,
    title: "Outdoor Living Areas",
    description:
      "Fire pits, outdoor kitchens, pergolas, and custom living spaces designed for entertaining and relaxation in your private outdoor sanctuary.",
    link: "#contact",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 100);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  const Icon = service.icon;

  return (
    <div
      ref={ref}
      className="service-card group relative overflow-hidden"
      style={{
        backgroundColor: "oklch(1 0 0)",
        border: "1px solid oklch(0.90 0.003 0)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s ease, transform 0.7s ease`,
      }}
    >
      {/* Top accent bar — brand red */}
      <div
        className="h-1 w-full"
        style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
      />

      <div className="p-8">
        {/* Icon */}
        <div
          className="w-12 h-12 flex items-center justify-center mb-5 transition-colors duration-300"
          style={{
            backgroundColor: "oklch(0.96 0.03 25)",
            color: "oklch(0.46 0.20 25)",
          }}
        >
          <Icon size={22} strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h3
          className="font-display font-semibold mb-3"
          style={{ fontSize: "1.4rem", color: "oklch(0.22 0.005 0)" }}
        >
          {service.title}
        </h3>

        {/* Description */}
        <p
          className="font-body text-sm leading-relaxed mb-6"
          style={{ color: "oklch(0.45 0.005 0)" }}
        >
          {service.description}
        </p>

        {/* CTA */}
        <button
          onClick={() =>
            document
              .querySelector(service.link)
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="font-label text-xs flex items-center gap-2 transition-colors duration-200"
          style={{ color: "oklch(0.46 0.20 25)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "oklch(0.38 0.20 25)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "oklch(0.46 0.20 25)")
          }
        >
          Learn More
          <span className="text-base leading-none">→</span>
        </button>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTitleVisible(true);
      },
      { threshold: 0.2 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      className="py-24"
      style={{ backgroundColor: "oklch(0.985 0.003 0)" }}
    >
      <div className="container">
        {/* Section header */}
        <div
          ref={titleRef}
          className="max-w-2xl mb-16"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div
            className="font-label mb-4 flex items-center gap-3"
            style={{ color: "oklch(0.46 0.20 25)" }}
          >
            <span
              className="inline-block w-8 h-px"
              style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
            />
            What We Do
          </div>
          <h2
            className="font-display font-light mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "oklch(0.22 0.005 0)", lineHeight: 1.1 }}
          >
            Complete Landscaping
            <br />
            <em style={{ color: "oklch(0.46 0.20 25)", fontStyle: "italic" }}>
              Services for Every Vision
            </em>
          </h2>
          <p
            className="font-body leading-relaxed"
            style={{ color: "oklch(0.45 0.005 0)" }}
          >
            From initial design consultation to final installation, our expert
            team handles every aspect of your outdoor transformation. No project
            is too large or too small.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {/* Additional services list — charcoal band */}
        <div
          className="mt-12 p-8"
          style={{
            backgroundColor: "oklch(0.22 0.005 0)",
            color: "oklch(0.90 0.003 0)",
          }}
        >
          <div className="font-label mb-4" style={{ color: "oklch(0.85 0.10 25)" }}>
            Also Available
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {[
              "Snow Removal",
              "Xeriscaping",
              "Landscape Lighting",
              "Retaining Walls",
              "Drainage Solutions",
              "Aeration Services",
              "Sprinkler Activation",
              "Sprinkler Blowout",
              "Government Contracts",
              "Multi-Family Communities",
              "Apartment Complex Maintenance",
              "Commercial Property Maintenance",
            ].map((item) => (
              <span
                key={item}
                className="font-body text-sm flex items-center gap-2"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full inline-block"
                  style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
                />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
