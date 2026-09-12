import HeroSection from "./sections/HeroSection";
import BrandStorySection from "./sections/BrandStorySection";
import DesignerSection from "./sections/DesignerSection";
import CollectionsSection from "./sections/CollectionsSection";
import FeaturedProducts from "./sections/FeaturedProducts";
import LoungeSection from "./sections/LoungeSection";
import ReviewSection from "./sections/ReviewSection";

export const revalidate = 3600; // Revalidate every hour

export default function Home() {
  return (
    <main className="flex flex-col overflow-x-hidden bg-[#fdfbf7]">
      <HeroSection />
      <BrandStorySection />
      <DesignerSection />
      <CollectionsSection />
      <FeaturedProducts />
      <LoungeSection />
      <ReviewSection />
    </main>
  );
}
