import { CardGridSkeleton } from "@/components/ui/CardGridSkeleton";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
      <SectionTitle
        badge="ALL EVENTS"
        title="Live & Upcoming Events"
        subtitle="Explore upcoming tournaments, championships, and athletic matchups from leagues across the country."
      />
      <CardGridSkeleton
        variant="event"
        count={6}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      />
    </div>
  );
}
