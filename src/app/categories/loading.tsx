import { CardGridSkeleton } from "@/components/ui/CardGridSkeleton";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
      <SectionTitle
        badge="ALL CATEGORIES"
        title="Sport Categories"
        subtitle="Discover sports grouped by discipline, from team tournaments and athletics to aquatic competitions."
      />
      <CardGridSkeleton
        variant="category"
        count={6}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      />
    </div>
  );
}
