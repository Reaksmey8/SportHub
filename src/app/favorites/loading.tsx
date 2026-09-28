import { CardGridSkeleton } from "@/components/ui/CardGridSkeleton";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
      <SectionTitle
        badge="SAVED ITEMS"
        title="Your Favorites"
        subtitle="Manage and explore your personal saved sports and live events."
      />
      <div className="space-y-8">
        <CardGridSkeleton
          variant="sport"
          count={3}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        />
        <CardGridSkeleton
          variant="event"
          count={3}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        />
      </div>
    </div>
  );
}
