import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PortfolioGrid from "@/components/PortfolioGrid";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <PortfolioGrid />
      <CTASection />
      <Footer />
    </main>
  );
}
