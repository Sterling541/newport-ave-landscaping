/* ============================================================
   STATS SECTION — Brand Refresh
   Brand red accent band with white numbers
   ============================================================ */
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "21+", label: "Years in Business" },
  { value: "500+", label: "Projects Completed" },
  { value: "5-yr", label: "Installation Warranty" },
  { value: "100%", label: "Licensed & Insured" },
];

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="py-12"
      style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
    >
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
              }}
            >
              <div
                className="font-display font-semibold mb-1"
                style={{ fontSize: "2.8rem", color: "oklch(1 0 0)", lineHeight: 1 }}
              >
                {stat.value}
              </div>
              <div
                className="font-label"
                style={{ color: "oklch(1 0 0 / 0.80)", fontSize: "0.65rem" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
