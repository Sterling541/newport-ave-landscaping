/* ============================================================
   HOME PAGE — Newport Avenue Landscaping
   Studio Job-Inspired Editorial Experience
   ============================================================ */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import MembershipSection from "@/components/MembershipSection";
import MembershipBanner from "@/components/MembershipBanner";
import CTABanner from "@/components/CTABanner";
import ReviewsSection from "@/components/ReviewsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import PhotoGallery from "@/components/PhotoGallery";
import WhoWeServe from "@/components/WhoWeServe";
import ServiceAreaBand from "@/components/ServiceAreaBand";
import MarqueeBand from "@/components/MarqueeBand";
import BlueSpruceCursor from "@/components/BlueSpruceCursor";
import BotanicalBand from "@/components/BotanicalBand";
import LightingSection from "@/components/LightingSection";
import OutdoorRoomsSection from "@/components/OutdoorRoomsSection";

export default function Home() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "oklch(0.10 0.008 200)",
        overflowX: "hidden",
      }}
    >
      {/* Custom blue spruce cursor — mounts once, hides default cursor */}
      <BlueSpruceCursor />

      <Navbar />

      {/* Hero — photos bleed 120px below into StatsSection */}
      <HeroSection />

      {/* StatsSection receives the bleed — sits under hero photo edge */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <StatsSection />
      </div>

      {/* Red scrolling marquee band */}
      <MarqueeBand />

      {/* Botanical divider — Studio Job-style texture band */}
      <BotanicalBand />

      <WhoWeServe />
      <ServicesSection />

      {/* Belgard-style interactive outdoor rooms section */}
      <OutdoorRoomsSection />

      {/* Botanical divider before portfolio */}
      <BotanicalBand label="PORTFOLIO" />

      <AboutSection />
      <PortfolioSection />
      <PhotoGallery />

      {/* Scroll-triggered landscape lighting section */}
      <LightingSection />

      <MembershipBanner />
      <MembershipSection />
      <CTABanner />
      <ReviewsSection />
      <ServiceAreaBand />
      <ContactSection />
      <Footer />
      <FloatingCTA />
    </div>
  );
}
