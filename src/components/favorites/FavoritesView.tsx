"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Sport } from "@/types/sport";
import { Event } from "@/types/event";
import { SportCard } from "@/components/cards/SportCard";
import { EventCard } from "@/components/cards/EventCard";
import { useFavorites } from "@/context/FavoritesContext";
import { Heart, Trophy, Calendar, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface FavoritesViewProps {
  initialSports: Sport[];
  initialEvents: Event[];
}

type TabType = "all" | "sports" | "events";

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  initialSports,
  initialEvents,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const { isSportFavorited, isEventFavorited } = useFavorites();

  // Filter in real time using the live FavoritesContext
  const activeSports = useMemo(
    () => initialSports.filter((s) => isSportFavorited(s.uuid)),
    [initialSports, isSportFavorited]
  );

  const activeEvents = useMemo(
    () => initialEvents.filter((e) => isEventFavorited(e.uuid)),
    [initialEvents, isEventFavorited]
  );

  const totalCount = activeSports.length + activeEvents.length;

  if (totalCount === 0) {
    return (
      <div className="text-center py-16 px-4 max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center border border-rose-500/20 shadow-inner">
          <Heart className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          No Favorites Yet
        </h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
          You haven&apos;t saved any sports or events yet. Tap the{" "}
          <span className="inline-flex items-center text-rose-500 font-semibold mx-1">
            <Heart className="w-3.5 h-3.5 fill-rose-500 mr-0.5 inline" /> heart
          </span>{" "}
          button on any card while browsing to save it here!
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/sports"
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-500 hover:bg-emerald-600 text-slate-950 transition-colors shadow-md shadow-emerald-500/10"
          >
            Explore Sports
          </Link>
          <Link
            href="/events"
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 transition-colors border border-slate-200 dark:border-zinc-700"
          >
            Browse Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Filter Tabs */}
      <div className="flex items-center justify-center sm:justify-start gap-2 border-b border-slate-200 dark:border-zinc-800 pb-4">
        <button
          onClick={() => setActiveTab("all")}
          className={cn(
            "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5",
            activeTab === "all"
              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md"
              : "text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800/60"
          )}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>All Items</span>
          <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-500 text-white font-mono">
            {totalCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("sports")}
          className={cn(
            "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5",
            activeTab === "sports"
              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md"
              : "text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800/60"
          )}
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>Sports</span>
          <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-emerald-500 text-slate-950 font-mono">
            {activeSports.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("events")}
          className={cn(
            "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5",
            activeTab === "events"
              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md"
              : "text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800/60"
          )}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Events</span>
          <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-teal-500 text-slate-950 font-mono">
            {activeEvents.length}
          </span>
        </button>
      </div>

      {/* Grid Display */}
      {activeTab === "all" && (
        <div className="space-y-10">
          {activeSports.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Trophy className="w-4 h-4 text-emerald-500" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Favorite Sports ({activeSports.length})
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeSports.map((sport) => (
                  <SportCard key={sport.uuid || sport.id} sport={sport} />
                ))}
              </div>
            </div>
          )}

          {activeEvents.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Calendar className="w-4 h-4 text-teal-500" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Favorite Events ({activeEvents.length})
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeEvents.map((event) => (
                  <EventCard key={event.uuid || event.id} event={event} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "sports" && (
        <div>
          {activeSports.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeSports.map((sport) => (
                <SportCard key={sport.uuid || sport.id} sport={sport} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 dark:text-zinc-400 py-8 text-center">
              No favorite sports saved yet.
            </p>
          )}
        </div>
      )}

      {activeTab === "events" && (
        <div>
          {activeEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeEvents.map((event) => (
                <EventCard key={event.uuid || event.id} event={event} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 dark:text-zinc-400 py-8 text-center">
              No favorite events saved yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
