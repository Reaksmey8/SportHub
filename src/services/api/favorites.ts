import { apiClient, API_BASE_URL } from "./client";
import { Favorite, CreateFavoritePayload } from "@/types/favorite";

/**
 * Note on Favorites URL discrepancy in Postman:
 * The Postman collection listed `http://localhost:8080/api/v1/favorites` for favorites
 * while others use `{{base_url}}`.
 * We default to the central API_BASE_URL, but allow overriding with NEXT_PUBLIC_FAVORITES_API_URL.
 */
const FAVORITES_BASE =
  process.env.NEXT_PUBLIC_FAVORITES_API_URL || API_BASE_URL;

export const favoritesApi = {
  /**
   * Fetch all favorites
   * GET /favorites
   */
  getFavorites: async (): Promise<Favorite[]> => {
    return apiClient<Favorite[]>(`${FAVORITES_BASE}/favorites`);
  },

  /**
   * Add a favorite
   * POST /favorites
   */
  createFavorite: async (payload: CreateFavoritePayload): Promise<Favorite> => {
    return apiClient<Favorite>(`${FAVORITES_BASE}/favorites`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /**
   * Remove a favorite
   * DELETE /favorite/{uuid} (Notice singular '/favorite/' per Postman collection)
   */
  deleteFavorite: async (uuid: string): Promise<void> => {
    return apiClient<void>(`${FAVORITES_BASE}/favorite/${uuid}`, {
      method: "DELETE",
    });
  },
};
