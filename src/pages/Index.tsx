import HeroSection from "./_components/HeroSection.tsx";
import ProductSection from "./_components/ProductSection.tsx";
import CalculatorSection from "./_components/CalculatorSection.tsx";
import ManufacturingSection from "./_components/ManufacturingSection.tsx";
import BlockExplodeSection from "./_components/BlockExplodeSection.tsx";
import StatsSection from "./_components/StatsSection.tsx";
import Footer from "./_components/Footer.tsx";
import Navbar from "./_components/Navbar.tsx";

export default function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Continuous gradient background spanning the entire page */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.95 0.04 250) 0%, oklch(0.98 0.008 250) 20%, oklch(0.99 0.003 250) 45%, oklch(0.98 0.01 60) 75%, oklch(0.96 0.03 55) 100%)",
        }}
      />
      {/* Fixed bright white light ray in bottom-right corner */}
      <div
        className="fixed bottom-0 right-0 -z-10 pointer-events-none"
        style={{
          width: "min(900px, 70vw)",
          height: "min(900px, 70vh)",
          background:
            "radial-gradient(ellipse at 100% 100%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 15%, rgba(255,255,255,0.35) 35%, rgba(255,255,255,0.08) 60%, transparent 80%)",
        }}
      />
      <div
        className="fixed bottom-0 right-0 -z-10 pointer-events-none"
        style={{
          width: "min(600px, 50vw)",
          height: "min(600px, 50vh)",
          background:
            "conic-gradient(from 200deg at 100% 100%, rgba(255,255,255,0.9) 0deg, rgba(255,255,255,0.6) 25deg, rgba(255,255,255,0) 60deg, rgba(255,255,255,0) 300deg, rgba(255,255,255,0.5) 340deg, rgba(255,255,255,0.9) 360deg)",
        }}
      />
      <Navbar />
      <HeroSection />
      <StatsSection />
      <BlockExplodeSection />
      <ProductSection />
      <CalculatorSection />
      <ManufacturingSection />
      <Footer />
    </div>
  );
}
