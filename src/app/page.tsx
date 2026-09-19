import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import TrustedBrands from "@/components/sections/TrustedBrands";
import WorkspaceShowcase from "@/components/sections/WorkspaceShowcase";
import Capabilities from "@/components/sections/Capabilities";
import HowItWorks from "@/components/sections/HowItWorks";
import CinematicSection from "@/components/sections/CinematicSection";
import Integrations from "@/components/sections/Integrations";
import Pricing from "@/components/sections/Pricing";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-blue-500/25 selection:text-white flex flex-col transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustedBrands />
        <WorkspaceShowcase />
        <Capabilities />
        <HowItWorks />
        <CinematicSection />
        <Integrations />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
