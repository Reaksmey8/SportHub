import React from "react";
import { eventsApi } from "@/services/api/events";
import { EventCard } from "@/components/cards/EventCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";
import { Event } from "@/types/event";

export const FeaturedEvents: React.FC = async () => {
  let events: Event[] = [];
  let error: string | null = null;

  try {
    const data = await eventsApi.getEvents();
    events = Array.isArray(data) ? data.slice(0, 6) : [];
  } catch (err) {
    error = err instanceof Error ? err.message : "Unable to load events.";
  }

  return (
    <section id="events" className="py-16 sm:py-24 bg-slate-50 dark:bg-zinc-950 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="LIVE & UPCOMING EVENTS"
          title="Featured Events"
          subtitle="Explore live tournaments, competitive clashes, and athletic events happening across the country."
          action={{ label: "View All Events", href: "/events" }}
        />

        {error ? (
          <ErrorState
            title="Failed to load events"
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
            title="No events found"
            message="There are currently no events available from the backend API."
            actionLabel="View Events Page"
            actionHref="/events"
          />
        )}
      </div>
    </section>
  );
};

