import { Suspense, lazy } from "react";
import HeroSection from "../components/HomePage/HeroSection";
import FeaturesSection from "../components/HomePage/FeaturesSection";
import ProductCardSkeleton from "../components/Skeletons/ProductCardSkeleton";

const PrincipalProductsSection = lazy(() =>
  import("../components/HomePage/PrincipalProductsSection")
);
  
export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <Suspense fallback={<ProductCardSkeleton />}>
        <PrincipalProductsSection/>
      </Suspense>
      <FeaturesSection />
    </main>
  );
}
