import HeroSection from "../components/HomePage/HeroSection";
import PrincipalProductsSection from "../components/HomePage/PrincipalProductsSection";
import FeaturesSection from "../components/HomePage/FeaturesSection";
  
export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <PrincipalProductsSection />
      <FeaturesSection />
    </main>
  );
}
