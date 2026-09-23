import React from "react";
import { favoritesApi } from "@/services/api/favorites";
import { sportsApi } from "@/services/api/sports";
import { eventsApi } from "@/services/api/events";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ErrorState } from "@/components/ui/ErrorState";
import { FavoritesView } from "@/components/favorites/FavoritesView";
import { Sport } from "@/types/sport";
import { Event } from "@/types/event";

export const dynamic = "force-dynamic";

export default async function FavoritesPage() {
  let error: string | null = null;
  let sports: Sport[] = [];
  let events: Event[] = [];

  try {
    const rawFavorites = await favoritesApi.getFavorites();
    const activeFavorites = Array.isArray(rawFavorites)
      ? rawFavorites.filter((f) => f.isFavorite !== false && !f.isDeleted)
      : [];

    const sportUuids = Array.from(
      new Set(
        activeFavorites
          .map((f) => f.sportUuid?.trim())
          .filter((uuid): uuid is string => Boolean(uuid))
      )
    );

    const eventUuids = Array.from(
      new Set(
        activeFavorites
          .map((f) => f.eventUuid?.trim())
          .filter((uuid): uuid is string => Boolean(uuid))
      )
    );

    // Resolve sports and events in parallel using allSettled to ensure resilience
    const [sportsResults, eventsResults] = await Promise.all([
      Promise.allSettled(sportUuids.map((uuid) => sportsApi.getSportByUuid(uuid))),
      Promise.allSettled(eventUuids.map((uuid) => eventsApi.getEventByUuid(uuid))),
    ]);

    sports = sportsResults
      .filter((r): r is PromiseFulfilledResult<Sport> => r.status === "fulfilled" && Boolean(r.value))
      .map((r) => r.value);

    events = eventsResults
      .filter((r): r is PromiseFulfilledResult<Event> => r.status === "fulfilled" && Boolean(r.value))
      .map((r) => r.value);
  } catch (err) {
    error = err instanceof Error ? err.message : "Unable to load saved favorites.";
  }

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        badge="SAVED ITEMS"
        title="Your Favorites"
        subtitle="Manage and explore your saved sports, competitions, and live events."
      />

      {error ? (
        <ErrorState
          title="Error Loading Favorites"
          message={error}
        />
      ) : (
        <FavoritesView initialSports={sports} initialEvents={events} />
      )}
    </div>
  );
}
