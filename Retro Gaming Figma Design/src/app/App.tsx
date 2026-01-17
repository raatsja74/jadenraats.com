import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { PortfolioGrid } from "./components/PortfolioGrid";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-background font-['Inter',sans-serif]">
      <Navigation />
      <HeroSection />
      <PortfolioGrid />
      <CTASection />
      <Footer />
    </div>
  );
}
