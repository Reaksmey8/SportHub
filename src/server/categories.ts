import { SportCategory } from "@/types/category";

// 1. The base URL of the sports REST API
const BASE_URL = "https://sport-api.eunglyzhia.com/api/v1";

/**
 * 2. Fetch all categories from the API.
 */
export async function getAllCategories(): Promise<SportCategory[]> {
  const response = await fetch(`${BASE_URL}/categories`, {
    cache: "no-store", // Always fetch fresh data on the server
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch categories. HTTP Status: ${response.status}`);
  }

  const data: SportCategory[] = await response.json();
  return data;
}

/**
 * 3. Fetch a single category by its UUID.
 */
export async function getCategoryByUuid(uuid: string): Promise<SportCategory> {
  const response = await fetch(`${BASE_URL}/categories/${uuid}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch category (${uuid}). HTTP Status: ${response.status}`);
  }

  const data: SportCategory = await response.json();
  return data;
}
