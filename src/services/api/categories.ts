import { apiClient } from "./client";
import { SportCategory, CreateCategoryPayload } from "@/types/category";

export const categoriesApi = {
  /**
   * Fetch all sport categories
   * GET /categories
   */
  getCategories: async (): Promise<SportCategory[]> => {
    return apiClient<SportCategory[]>("/categories");
  },

  /**
   * Fetch a single sport category by UUID
   * GET /categories/{uuid}
   */
  getCategoryByUuid: async (uuid: string): Promise<SportCategory> => {
    return apiClient<SportCategory>(`/categories/${uuid}`);
  },

  /**
   * Create a new sport category
   * POST /categories
   */
  createCategory: async (
    payload: CreateCategoryPayload
  ): Promise<SportCategory> => {
    return apiClient<SportCategory>("/categories", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /**
   * Update an existing sport category
   * PATCH /categories/{uuid}
   */
  updateCategory: async (
    uuid: string,
    payload: Partial<CreateCategoryPayload>
  ): Promise<SportCategory> => {
    return apiClient<SportCategory>(`/categories/${uuid}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  /**
   * Delete a sport category
   * DELETE /categories/{uuid}
   */
  deleteCategory: async (uuid: string): Promise<void> => {
    return apiClient<void>(`/categories/${uuid}`, {
      method: "DELETE",
    });
  },
};
