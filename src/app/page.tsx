import { Suspense } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { SportsSection } from "@/components/home/SportsSection";
import { FeaturedEvents } from "@/components/home/FeaturedEvents";
import { SportCategories } from "@/components/home/SportCategories";
import { CallToAction } from "@/components/home/CallToAction";
import { CardGridSkeleton } from "@/components/ui/CardGridSkeleton";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <HeroSection />
      <Suspense
        fallback={
          <section className="relative bg-slate-100/50 py-16 transition-colors duration-300 dark:bg-zinc-950/50 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <SectionTitle
                badge="CATEGORIES & DISCIPLINES"
                title="Explore Sports"
                subtitle="Discover active sports, tournaments, and stories powered by the SportsHub live API."
              />
              <CardGridSkeleton
                variant="sport"
                count={8}
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
              />
            </div>
          </section>
        }
      >
        <SportsSection />
      </Suspense>
      <Suspense
        fallback={
          <section className="relative bg-slate-50 py-16 transition-colors duration-300 dark:bg-zinc-950 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <SectionTitle
                badge="LIVE & UPCOMING EVENTS"
                title="Featured Events"
                subtitle="Explore live tournaments, competitive clashes, and athletic events happening across the country."
              />
              <CardGridSkeleton
                variant="event"
                count={6}
                className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              />
            </div>
          </section>
        }
      >
        <FeaturedEvents />
      </Suspense>
      <Suspense
        fallback={
          <section className="relative bg-slate-100/50 py-16 transition-colors duration-300 dark:bg-zinc-950/50 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <SectionTitle
                badge="ORGANIZED DISCIPLINES"
                title="Sport Categories"
                subtitle="Discover sports categorized by discipline, from football and cycling to swimming and combat arts."
              />
              <CardGridSkeleton
                variant="category"
                count={6}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              />
            </div>
          </section>
        }
      >
        <SportCategories />
      </Suspense>
      <CallToAction />
    </div>
  );
}
