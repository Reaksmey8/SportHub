import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { Event } from "@/types/event";
import { FavoriteButton } from "@/components/ui/FavoriteButton";

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const imageUrl = event.imageUrls?.[0];
  const categoryName = event.category?.name || "Event";

  const formattedDate = event.createdAt
    ? new Date(event.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Upcoming";

  return (
    <article className="group flex flex-col justify-between rounded-2xl overflow-hidden bg-white dark:bg-zinc-900/60 hover:bg-slate-50/80 dark:hover:bg-zinc-900/90 border border-slate-200/90 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-sm dark:shadow-none">
      <div>
        {/* Event Banner */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-zinc-800">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={event.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-emerald-500/20 to-teal-500/10 text-emerald-500">
              <Calendar className="w-12 h-12 opacity-50" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent dark:from-zinc-950/80" />
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-emerald-500/90 text-black backdrop-blur-md shadow-sm">
              {categoryName}
            </span>
          </div>
          <FavoriteButton
            type="event"
            uuid={event.uuid}
            size="sm"
            className="absolute top-3 right-3 z-10"
          />
        </div>

        {/* Event Content */}
        <div className="p-5">
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-zinc-400 mb-2.5">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500" />
              <span>{formattedDate}</span>
            </div>
            {event.locationName && (
              <>
                <span>•</span>
                <div className="flex items-center gap-1 truncate max-w-[140px]">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500 shrink-0" />
                  <span className="truncate">{event.locationName}</span>
                </div>
              </>
            )}
          </div>

          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
            {event.name}
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-slate-200 dark:border-zinc-800/60 text-xs">
        <span className="text-slate-500 dark:text-zinc-400 font-medium truncate max-w-[160px]">
          {event.locationName || "Sports Venue"}
        </span>
        <Link
          href={`/events/${event.uuid}`}
          className="inline-flex items-center gap-1.5 font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors shrink-0"
        >
          <span>View Event</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
};
