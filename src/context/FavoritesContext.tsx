"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useAuth } from "@/context/AuthContext";

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

// Generates account-isolated storage key
export function getFavoritesStorageKey(userId?: string | null): string {
  return userId ? `sportshub_favorites_user_${userId}` : `sportshub_favorites_guest`;
}

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, mounted: authMounted } = useAuth();
  const [sportUuids, setSportUuids] = useState<Set<string>>(new Set());
  const [eventUuids, setEventUuids] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // 1. Whenever the authenticated user changes, load that user's private favorites
  useEffect(() => {
    if (!authMounted) return;
    const storageKey = getFavoritesStorageKey(user?.id);
    try {
      const cached = localStorage.getItem(storageKey);
      if (cached) {
        const parsed: CachedFavorites = JSON.parse(cached);
        setSportUuids(new Set(Array.isArray(parsed.sports) ? parsed.sports : []));
        setEventUuids(new Set(Array.isArray(parsed.events) ? parsed.events : []));
      } else {
        setSportUuids(new Set());
        setEventUuids(new Set());
      }
    } catch {
      setSportUuids(new Set());
      setEventUuids(new Set());
    } finally {
      setLoading(false);
    }
  }, [user?.id, authMounted]);

  // 2. Save favorites specifically under the active user's key
  const saveToStorage = useCallback(
    (sports: Set<string>, events: Set<string>) => {
      try {
        const storageKey = getFavoritesStorageKey(user?.id);
        const data: CachedFavorites = {
          sports: Array.from(sports),
          events: Array.from(events),
        };
        localStorage.setItem(storageKey, JSON.stringify(data));
      } catch {
        // ignore storage errors
      }
    },
    [user?.id]
  );

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

      const updated = new Set(sportUuids);
      if (nextFavorited) {
        updated.add(uuid);
      } else {
        updated.delete(uuid);
      }
      setSportUuids(updated);
      saveToStorage(updated, eventUuids);

      // Background sync to backend API proxy (non-blocking)
      try {
        fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sportUuid: uuid }),
        }).catch(() => {});
      } catch {
        // silent
      }

      return nextFavorited;
    },
    [sportUuids, eventUuids, saveToStorage]
  );

  const toggleEventFavorite = useCallback(
    async (uuid: string): Promise<boolean> => {
      if (!uuid) return false;

      const wasFavorited = eventUuids.has(uuid);
      const nextFavorited = !wasFavorited;

      const updated = new Set(eventUuids);
      if (nextFavorited) {
        updated.add(uuid);
      } else {
        updated.delete(uuid);
      }
      setEventUuids(updated);
      saveToStorage(sportUuids, updated);

      try {
        fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventUuid: uuid }),
        }).catch(() => {});
      } catch {
        // silent
      }

      return nextFavorited;
    },
    [eventUuids, sportUuids, saveToStorage]
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
    setSportUuids(new Set());
    setEventUuids(new Set());
    saveToStorage(new Set(), new Set());
  }, [saveToStorage]);

  const refetchFavorites = useCallback(async () => {
    const storageKey = getFavoritesStorageKey(user?.id);
    try {
      const cached = localStorage.getItem(storageKey);
      if (cached) {
        const parsed: CachedFavorites = JSON.parse(cached);
        setSportUuids(new Set(Array.isArray(parsed.sports) ? parsed.sports : []));
        setEventUuids(new Set(Array.isArray(parsed.events) ? parsed.events : []));
      }
    } catch {
      // ignore
    }
  }, [user?.id]);

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
        refetchFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export function useFavorites(): FavoritesContextType {
  return useContext(FavoritesContext) || defaultContext;
}
