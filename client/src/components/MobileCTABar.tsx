/* ============================================================
   MOBILE CTA BAR — Fixed bottom bar on mobile devices
   
   Shows a phone button + "Get Free Quote" button at the bottom
   of the screen on mobile. Hidden on md+ screens.
   ============================================================ */
import { Phone, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

export default function MobileCTABar() {
  const [, navigate] = useLocation();

  const goToContact = () => {
    navigate("/contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="md:hidden"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        backgroundColor: "oklch(0.13 0.006 30)",
        borderTop: "2px solid oklch(0.46 0.20 25)",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.75rem 1rem",
        boxShadow: "0 -4px 24px oklch(0 0 0 / 0.35)",
        /* Safe area for iPhone home indicator */
        paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))",
      }}
    >
      {/* Phone button */}
      <a
        href="tel:5416178873"
        aria-label="Call Newport Avenue Landscaping"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          padding: "0.7rem 1.1rem",
          backgroundColor: "oklch(0.22 0.008 30)",
          border: "1px solid oklch(0.35 0.008 30)",
          borderRadius: "8px",
          textDecoration: "none",
          flexShrink: 0,
          color: "oklch(0.92 0.01 75)",
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.62rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        <Phone size={14} style={{ color: "oklch(0.65 0.18 25)" }} />
        (541) 617-8873
      </a>

      {/* Get Quote button — fills remaining width */}
      <button
        onClick={goToContact}
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          padding: "0.7rem 1rem",
          backgroundColor: "oklch(0.46 0.20 25)",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          color: "oklch(1 0 0)",
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.62rem",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        Get Free Quote
        <ArrowRight size={13} />
      </button>
    </div>
  );
}
