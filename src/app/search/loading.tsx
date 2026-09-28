import { CardGridSkeleton } from "@/components/ui/CardGridSkeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-2xl space-y-4 text-center">
        <div className="mx-auto h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-zinc-800" />
        <div className="mx-auto h-9 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-zinc-800" />
        <div className="mx-auto h-4 w-full max-w-xl animate-pulse rounded bg-slate-200 dark:bg-zinc-800" />
      </div>
      <div className="space-y-6">
        <CardGridSkeleton
          variant="sport"
          count={4}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        />
        <CardGridSkeleton
          variant="event"
          count={3}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        />
        <CardGridSkeleton
          variant="category"
          count={3}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        />
      </div>
    </div>
  );
}
