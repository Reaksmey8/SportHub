import React from "react";
import { sportsApi } from "@/services/api/sports";
import { SportCard } from "@/components/cards/SportCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";
import { Sport } from "@/types/sport";

export const SportsSection: React.FC = async () => {
  let sports: Sport[] = [];
  let error: string | null = null;

  try {
    const data = await sportsApi.getSports();
    sports = Array.isArray(data) ? data.slice(0, 8) : [];
  } catch (err) {
    error = err instanceof Error ? err.message : "Unable to load sports.";
  }

  return (
    <section id="sports" className="py-16 sm:py-24 bg-slate-100/50 dark:bg-zinc-950/50 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="CATEGORIES & DISCIPLINES"
          title="Explore Sports"
          subtitle="Discover active sports, tournaments, and stories powered by the SportsHub live API."
        />

        {error ? (
          <ErrorState
            title="Failed to load sports"
            message={error}
          />
        ) : sports.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {sports.map((sport) => (
              <SportCard key={sport.uuid || sport.id} sport={sport} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No sports found"
            message="There are currently no sports available from the backend API."
            actionLabel="Refresh"
            actionHref="#sports"
          />
        )}
      </div>
    </section>
  );
};
