import React from "react";
import { favoritesApi } from "@/services/api/favorites";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";
import { Favorite } from "@/types/favorite";
import { Heart, Trophy, Calendar } from "lucide-react";

export default async function FavoritesPage() {
  let favorites: Favorite[] = [];
  let error: string | null = null;

  try {
    const data = await favoritesApi.getFavorites();
    favorites = Array.isArray(data) ? data : [];
  } catch (err) {
    error = err instanceof Error ? err.message : "Unable to load favorites.";
  }

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        badge="SAVED ITEMS"
        title="Your Favorites"
        subtitle="Saved sports and events from your personal sports feed."
      />

      {error ? (
        <ErrorState
          title="Error Loading Favorites"
          message={error}
        />
      ) : favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((fav, index) => (
            <div
              key={fav.uuid || fav.id || index}
              className="p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                  <Heart className="w-5 h-5 fill-rose-500" />
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400">
                  ID: {fav.id}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                {fav.sportUuid ? "Sport Favorite" : fav.eventUuid ? "Event Favorite" : "Favorite Item"}
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 truncate mb-4">
                {fav.sportUuid && (
                  <span className="flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5 text-emerald-500" />
                    Sport UUID: {fav.sportUuid}
                  </span>
                )}
                {fav.eventUuid && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-teal-500" />
                    Event UUID: {fav.eventUuid}
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Favorites Yet"
          message="You have not added any sports or events to your favorites."
          actionLabel="Explore Sports"
          actionHref="/sports"
        />
      )}
    </div>
  );
}

