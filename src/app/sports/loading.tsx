import { CardGridSkeleton } from "@/components/ui/CardGridSkeleton";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
      <SectionTitle
        badge="ALL SPORTS"
        title="Sports Directory"
        subtitle="Browse all sports disciplines and coverage provided directly by the backend API."
      />
      <CardGridSkeleton
        variant="sport"
        count={8}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      />
    </div>
  );
}
