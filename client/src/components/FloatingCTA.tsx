/* ============================================================
   FLOATING CTA — Brand Red
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
        style={{ backgroundColor: "oklch(0.46 0.20 25)", color: "oklch(1 0 0)", borderRadius: "50%" }}
        aria-label="Call us"
      >
        <Phone size={20} />
      </a>
      <button
        onClick={() =>
          document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
        }
        className="btn-red shadow-lg text-xs px-4 py-3"
      >
        Start Service
      </button>
    </div>
  );
}
