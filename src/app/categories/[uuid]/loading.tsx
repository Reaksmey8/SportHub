import { CardGridSkeleton } from "@/components/ui/CardGridSkeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
      <div className="mb-8 space-y-3">
        <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-zinc-800" />
        <div className="h-9 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-zinc-800" />
        <div className="h-4 w-full max-w-2xl animate-pulse rounded bg-slate-200 dark:bg-zinc-800" />
      </div>
      <CardGridSkeleton
        variant="event"
        count={4}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2"
      />
    </div>
  );
}
