"use client";

import { useEffect, useState } from "react";
import { sportsApi } from "@/services/api/sports";
import { Sport } from "@/types/sport";
import { SportCard } from "@/components/cards/SportCard";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Sport[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const savedFavorites = Object.keys(localStorage)
        .filter((key) => key.startsWith("favorite-sport-"))
        .filter((key) => localStorage.getItem(key) === "true")
        .map((key) => key.replace("favorite-sport-", ""));

      const sports = await Promise.all(
        savedFavorites.map((uuid) => sportsApi.getSportByUuid(uuid))
      );

      setFavorites(sports);
    };

    loadFavorites();
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-6 py-14">
      <h1 className="text-3xl font-bold mb-8">
        My Favorites
      </h1>

      {favorites.length === 0 ? (
        <p className="text-slate-500">
          You don't have any favorite sports yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favorites.map((sport) => (
            <SportCard key={sport.uuid} sport={sport} />
          ))}
        </div>
      )}
    </main>
  );
}