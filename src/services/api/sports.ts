import { apiClient } from "./client";
import { Sport, CreateSportPayload } from "@/types/sport";

export const sportsApi = {
  /**
   * Fetch all sports
   * GET /api/v1/sports
   */
  getSports: async (): Promise<Sport[]> => {
    return apiClient<Sport[]>("/sports");
  },

  /**
   * Fetch a single sport by UUID
   * GET /api/v1/sports/{uuid}
   */
  getSportByUuid: async (uuid: string): Promise<Sport> => {
    return apiClient<Sport>(`/sports/${uuid}`);
  },

  /**
   * Create a new sport
   * POST /api/v1/sports
   */
  createSport: async (payload: CreateSportPayload): Promise<Sport> => {
    return apiClient<Sport>("/sports", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /**
   * Update an existing sport
   * PATCH /api/v1/sports/{uuid}
   */
  updateSport: async (
    uuid: string,
    payload: Partial<CreateSportPayload>
  ): Promise<Sport> => {
    return apiClient<Sport>(`/sports/${uuid}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  /**
   * Delete a sport
   * DELETE /api/v1/sports/{uuid}
   */
  deleteSport: async (uuid: string): Promise<void> => {
    return apiClient<void>(`/sports/${uuid}`, {
      method: "DELETE",
    });
  },
};

