import { HeroSection } from "@/components/home/HeroSection";
import { SportsSection } from "@/components/home/SportsSection";
import { FeaturedEvents } from "@/components/home/FeaturedEvents";
import { SportCategories } from "@/components/home/SportCategories";
import { CallToAction } from "@/components/home/CallToAction";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <HeroSection />
      <SportsSection />
      <FeaturedEvents />
      <SportCategories />
      <CallToAction />
    </div>
  );
}
