/* ============================================================
   FLOATING CTA — Sunlit Craftsman Design
   Sticky phone + start service buttons for mobile
   ============================================================ */
import { Phone } from "lucide-react";
import { useState, useEffect } from "react";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 md:hidden transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <a
        href="tel:5416178873"
        className="w-12 h-12 flex items-center justify-center shadow-lg"
        style={{ backgroundColor: "oklch(0.22 0.06 152)", color: "oklch(0.97 0.012 85)" }}
        aria-label="Call us"
      >
        <Phone size={20} />
      </a>
      <button
        onClick={() =>
          document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
        }
        className="btn-terracotta shadow-lg text-xs px-4 py-3"
        style={{ writingMode: "horizontal-tb" }}
      >
        Start Service
      </button>
    </div>
  );
}
