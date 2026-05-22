import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import HowItWorks from "@/components/landing/HowItWorks";
import CTASection from "@/components/landing/CTASection";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />

      <HeroSection />

      {/* Divider gradient */}
      <div className="h-px bg-gradient-to-r from-transparent via-border-glass to-transparent" />

      <FeaturesGrid />

      {/* Divider gradient */}
      <div className="h-px bg-gradient-to-r from-transparent via-border-glass to-transparent" />

      <HowItWorks />

      {/* Divider gradient */}
      <div className="h-px bg-gradient-to-r from-transparent via-border-glass to-transparent" />

      <CTASection />

      <Footer />
    </div>
  );
}
