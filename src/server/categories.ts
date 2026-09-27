import { SportCategory } from "@/types/category";


const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllCategories(): Promise<SportCategory[]> {
  const response = await fetch(`${BASE_URL}/categories`, {
    cache : "no-store",
  });

  if (!response.ok){
    throw new Error(`Failed to fetch categories: ${response.status}`);
  }

  const data: SportCategory[] = await response.json();
  return data;
}

export async function getCategoryUuid(uuid: string): Promise<SportCategory> {
  const response = await fetch(`${BASE_URL}/categories/${uuid}`, {
    cache : "no-store",
  });

  if (!response.ok){
    throw new Error(`Failed to fetch category: ${response.statusText}`);

  }

  const data: SportCategory = await response.json();
  return data;
}