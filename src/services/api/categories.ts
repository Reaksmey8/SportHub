import { apiClient } from "./client";
import { SportCategory, CreateCategoryPayload } from "@/types/category";

export const categoriesApi = {
  /**
   * Fetch all sport categories
   * GET /sport_categories
   */
  getCategories: async (): Promise<SportCategory[]> => {
    return apiClient<SportCategory[]>("/sport_categories");
  },

  /**
   * Fetch a single sport category by UUID
   * GET /sport_categories/{uuid}
   */
  getCategoryByUuid: async (uuid: string): Promise<SportCategory> => {
    return apiClient<SportCategory>(`/sport_categories/${uuid}`);
  },

  /**
   * Create a new sport category
   * POST /sport_categories
   */
  createCategory: async (
    payload: CreateCategoryPayload
  ): Promise<SportCategory> => {
    return apiClient<SportCategory>("/sport_categories", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /**
   * Update an existing sport category
   * PATCH /sport_categories/{uuid}
   */
  updateCategory: async (
    uuid: string,
    payload: Partial<CreateCategoryPayload>
  ): Promise<SportCategory> => {
    return apiClient<SportCategory>(`/sport_categories/${uuid}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  /**
   * Delete a sport category
   * DELETE /sport_categories/{uuid}
   */
  deleteCategory: async (uuid: string): Promise<void> => {
    return apiClient<void>(`/sport_categories/${uuid}`, {
      method: "DELETE",
    });
  },
};

