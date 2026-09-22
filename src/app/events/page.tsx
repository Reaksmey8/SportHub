import React from "react";
import { eventsApi } from "@/services/api/events";
import { EventCard } from "@/components/cards/EventCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";
import { Event } from "@/types/event";

export default async function EventsPage() {
  let events: Event[] = [];
  let error: string | null = null;

  try {
    const data = await eventsApi.getEvents();
    events = Array.isArray(data) ? data : [];
  } catch (err) {
    error = err instanceof Error ? err.message : "Unable to load events from API.";
  }

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        badge="CALENDAR & FIXTURES"
        title="Sports Events"
        subtitle="Discover tournaments, matches, and community athletic events happening nationwide."
      />

      {error ? (
        <ErrorState
          title="Error Loading Events"
          message={error}
        />
      ) : events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.uuid || event.id} event={event} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Events Found"
          message="There are currently no events available from the backend API."
        />
      )}
    </div>
  );
}

