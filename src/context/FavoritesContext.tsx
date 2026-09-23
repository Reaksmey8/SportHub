"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { Favorite } from "@/types/favorite";

const LOCAL_STORAGE_KEY = "sportshub_favorites_v1";

interface CachedFavorites {
  sports: string[];
  events: string[];
}

interface FavoritesContextType {
  isSportFavorited: (uuid: string) => boolean;
  isEventFavorited: (uuid: string) => boolean;
  toggleSportFavorite: (uuid: string) => Promise<boolean>;
  toggleEventFavorite: (uuid: string) => Promise<boolean>;
  removeSportFavorite: (uuid: string) => Promise<void>;
  removeEventFavorite: (uuid: string) => Promise<void>;
  clearAllFavorites: () => Promise<void>;
  totalFavoritesCount: number;
  loading: boolean;
  refetchFavorites: () => Promise<void>;
}

const defaultContext: FavoritesContextType = {
  isSportFavorited: () => false,
  isEventFavorited: () => false,
  toggleSportFavorite: async () => false,
  toggleEventFavorite: async () => false,
  removeSportFavorite: async () => {},
  removeEventFavorite: async () => {},
  clearAllFavorites: async () => {},
  totalFavoritesCount: 0,
  loading: false,
  refetchFavorites: async () => {},
};

const FavoritesContext = createContext<FavoritesContextType>(defaultContext);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sportUuids, setSportUuids] = useState<Set<string>>(new Set());
  const [eventUuids, setEventUuids] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // 1. Load cached favorites on initial mount for 0ms lag
  useEffect(() => {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        const parsed: CachedFavorites = JSON.parse(cached);
        if (Array.isArray(parsed.sports)) setSportUuids(new Set(parsed.sports));
        if (Array.isArray(parsed.events)) setEventUuids(new Set(parsed.events));
      }
    } catch {
      // ignore JSON parse errors
    }
  }, []);

  const saveToStorage = (sports: Set<string>, events: Set<string>) => {
    try {
      const data: CachedFavorites = {
        sports: Array.from(sports),
        events: Array.from(events),
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore storage quota errors
    }
  };

  // 2. Fetch fresh favorites from the API proxy
  const fetchFavorites = useCallback(async () => {
    try {
      const res = await fetch("/api/favorites", { cache: "no-store" });
      if (!res.ok) return;

      const items: Favorite[] = await res.json();
      if (!Array.isArray(items)) return;

      const activeSports = new Set<string>();
      const activeEvents = new Set<string>();

      items.forEach((item) => {
        // Must be active and not deleted
        if (item.isFavorite !== false && !item.isDeleted) {
          if (item.sportUuid && item.sportUuid.trim()) {
            activeSports.add(item.sportUuid.trim());
          }
          if (item.eventUuid && item.eventUuid.trim()) {
            activeEvents.add(item.eventUuid.trim());
          }
        }
      });

      setSportUuids(activeSports);
      setEventUuids(activeEvents);
      saveToStorage(activeSports, activeEvents);
    } catch (err) {
      console.error("Error fetching favorites from API:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const isSportFavorited = useCallback(
    (uuid: string) => {
      if (!uuid) return false;
      return sportUuids.has(uuid);
    },
    [sportUuids]
  );

  const isEventFavorited = useCallback(
    (uuid: string) => {
      if (!uuid) return false;
      return eventUuids.has(uuid);
    },
    [eventUuids]
  );

  const toggleSportFavorite = useCallback(
    async (uuid: string): Promise<boolean> => {
      if (!uuid) return false;

      const wasFavorited = sportUuids.has(uuid);
      const nextFavorited = !wasFavorited;

      // Optimistic update
      const updated = new Set(sportUuids);
      if (nextFavorited) {
        updated.add(uuid);
      } else {
        updated.delete(uuid);
      }
      setSportUuids(updated);
      saveToStorage(updated, eventUuids);

      try {
        const res = await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sportUuid: uuid }),
        });

        if (!res.ok) {
          throw new Error("Failed to toggle sport favorite");
        }

        const data = await res.json();
        const serverState = data.isFavorite ?? nextFavorited;

        const confirmed = new Set(updated);
        if (serverState) {
          confirmed.add(uuid);
        } else {
          confirmed.delete(uuid);
        }
        setSportUuids(confirmed);
        saveToStorage(confirmed, eventUuids);
        return serverState;
      } catch (err) {
        console.error("Reverting optimistic favorite update:", err);
        // Rollback
        setSportUuids(sportUuids);
        saveToStorage(sportUuids, eventUuids);
        return wasFavorited;
      }
    },
    [sportUuids, eventUuids]
  );

  const toggleEventFavorite = useCallback(
    async (uuid: string): Promise<boolean> => {
      if (!uuid) return false;

      const wasFavorited = eventUuids.has(uuid);
      const nextFavorited = !wasFavorited;

      // Optimistic update
      const updated = new Set(eventUuids);
      if (nextFavorited) {
        updated.add(uuid);
      } else {
        updated.delete(uuid);
      }
      setEventUuids(updated);
      saveToStorage(sportUuids, updated);

      try {
        const res = await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventUuid: uuid }),
        });

        if (!res.ok) {
          throw new Error("Failed to toggle event favorite");
        }

        const data = await res.json();
        const serverState = data.isFavorite ?? nextFavorited;

        const confirmed = new Set(updated);
        if (serverState) {
          confirmed.add(uuid);
        } else {
          confirmed.delete(uuid);
        }
        setEventUuids(confirmed);
        saveToStorage(sportUuids, confirmed);
        return serverState;
      } catch (err) {
        console.error("Reverting optimistic favorite update:", err);
        // Rollback
        setEventUuids(eventUuids);
        saveToStorage(sportUuids, eventUuids);
        return wasFavorited;
      }
    },
    [eventUuids, sportUuids]
  );

  const removeSportFavorite = useCallback(
    async (uuid: string) => {
      if (!uuid) return;
      if (sportUuids.has(uuid)) {
        await toggleSportFavorite(uuid);
      }
    },
    [sportUuids, toggleSportFavorite]
  );

  const removeEventFavorite = useCallback(
    async (uuid: string) => {
      if (!uuid) return;
      if (eventUuids.has(uuid)) {
        await toggleEventFavorite(uuid);
      }
    },
    [eventUuids, toggleEventFavorite]
  );

  const clearAllFavorites = useCallback(async () => {
    const currentSports = Array.from(sportUuids);
    const currentEvents = Array.from(eventUuids);

    // Optimistically clear immediately
    setSportUuids(new Set());
    setEventUuids(new Set());
    saveToStorage(new Set(), new Set());

    try {
      await Promise.all([
        ...currentSports.map((uuid) =>
          fetch("/api/favorites", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sportUuid: uuid }),
          })
        ),
        ...currentEvents.map((uuid) =>
          fetch("/api/favorites", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ eventUuid: uuid }),
          })
        ),
      ]);
    } catch (err) {
      console.error("Error clearing all favorites:", err);
      // Re-fetch to get consistent state
      fetchFavorites();
    }
  }, [sportUuids, eventUuids, fetchFavorites]);

  const totalFavoritesCount = useMemo(
    () => sportUuids.size + eventUuids.size,
    [sportUuids.size, eventUuids.size]
  );

  return (
    <FavoritesContext.Provider
      value={{
        isSportFavorited,
        isEventFavorited,
        toggleSportFavorite,
        toggleEventFavorite,
        removeSportFavorite,
        removeEventFavorite,
        clearAllFavorites,
        totalFavoritesCount,
        loading,
        refetchFavorites: fetchFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export function useFavorites(): FavoritesContextType {
  return useContext(FavoritesContext) || defaultContext;
}
