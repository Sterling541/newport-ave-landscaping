/* ============================================================
   HOME PAGE — Newport Ave Landscaping
   Southview-Inspired Editorial Design
   Assembles all sections in order
   ============================================================ */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import MembershipSection from "@/components/MembershipSection";
import CTABanner from "@/components/CTABanner";
import ReviewsSection from "@/components/ReviewsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(1 0 0)" }}>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <AboutSection />
      <PortfolioSection />
      <MembershipSection />
      <CTABanner />
      <ReviewsSection />
      <ContactSection />
      <Footer />
      <FloatingCTA />
    </div>
  );
}
