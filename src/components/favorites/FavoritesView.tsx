"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Sport } from "@/types/sport";
import { Event } from "@/types/event";
import { SportCard } from "@/components/cards/SportCard";
import { EventCard } from "@/components/cards/EventCard";
import { useFavorites } from "@/context/FavoritesContext";
import {
  Heart,
  Trophy,
  Calendar,
  Sparkles,
  Trash2,
  AlertTriangle,
  X,
  CheckCircle2,
} from "lucide-react";
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
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const {
    isSportFavorited,
    isEventFavorited,
    removeSportFavorite,
    removeEventFavorite,
    clearAllFavorites,
  } = useFavorites();

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

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3000);
  };

  const handleDeleteSport = async (sport: Sport) => {
    await removeSportFavorite(sport.uuid);
    showToast(`Removed "${sport.name}" from favorites.`);
  };

  const handleDeleteEvent = async (event: Event) => {
    await removeEventFavorite(event.uuid);
    showToast(`Removed "${event.name}" from favorites.`);
  };

  const handleClearAll = async () => {
    await clearAllFavorites();
    setShowClearConfirm(false);
    showToast("Cleared all items from your favorites.");
  };

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
    <div className="space-y-8 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900/95 dark:bg-zinc-900/95 text-white border border-slate-700/60 shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-medium line-clamp-1 max-w-[280px] sm:max-w-md">
            {toastMessage}
          </span>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Confirmation Modal for Clear All */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center border border-rose-500/20">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Clear all favorites?
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                This will remove all {totalCount} saved sports and events from your
                personal favorites list.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleClearAll}
                className="flex-1 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-500/20 transition-colors"
              >
                Yes, Delete All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Tabs & Clear Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-zinc-800 pb-4">
        {/* Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setActiveTab("all")}
            className={cn(
              "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 shrink-0",
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
              "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 shrink-0",
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
              "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 shrink-0",
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

        {/* Clear All Action */}
        <button
          onClick={() => setShowClearConfirm(true)}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:text-white hover:bg-rose-500 dark:hover:bg-rose-600 border border-rose-500/30 hover:border-rose-500 transition-all duration-200 self-end sm:self-auto"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear All ({totalCount})</span>
        </button>
      </div>

      {/* Grid Display */}
      {activeTab === "all" && (
        <div className="space-y-12">
          {activeSports.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-emerald-500" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Favorite Sports ({activeSports.length})
                  </h3>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeSports.map((sport) => (
                  <div key={sport.uuid || sport.id} className="relative group/card">
                    <SportCard sport={sport} />
                    {/* Explicit Delete Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDeleteSport(sport);
                      }}
                      className="absolute top-3 right-14 z-20 p-2 rounded-full bg-white/95 dark:bg-zinc-900/95 text-slate-500 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 border border-slate-200/80 dark:border-zinc-700/60 shadow-md backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95"
                      title="Delete from favorites"
                      aria-label={`Delete ${sport.name} from favorites`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeEvents.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-teal-500" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Favorite Events ({activeEvents.length})
                  </h3>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeEvents.map((event) => (
                  <div key={event.uuid || event.id} className="relative group/card">
                    <EventCard event={event} />
                    {/* Explicit Delete Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDeleteEvent(event);
                      }}
                      className="absolute top-3 right-14 z-20 p-2 rounded-full bg-white/95 dark:bg-zinc-900/95 text-slate-500 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 border border-slate-200/80 dark:border-zinc-700/60 shadow-md backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95"
                      title="Delete from favorites"
                      aria-label={`Delete ${event.name} from favorites`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
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
                <div key={sport.uuid || sport.id} className="relative group/card">
                  <SportCard sport={sport} />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDeleteSport(sport);
                    }}
                    className="absolute top-3 right-14 z-20 p-2 rounded-full bg-white/95 dark:bg-zinc-900/95 text-slate-500 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 border border-slate-200/80 dark:border-zinc-700/60 shadow-md backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95"
                    title="Delete from favorites"
                    aria-label={`Delete ${sport.name} from favorites`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
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
                <div key={event.uuid || event.id} className="relative group/card">
                  <EventCard event={event} />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDeleteEvent(event);
                    }}
                    className="absolute top-3 right-14 z-20 p-2 rounded-full bg-white/95 dark:bg-zinc-900/95 text-slate-500 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 border border-slate-200/80 dark:border-zinc-700/60 shadow-md backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95"
                    title="Delete from favorites"
                    aria-label={`Delete ${event.name} from favorites`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
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
