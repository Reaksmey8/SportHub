import { Sport } from "@/types/sport";

// 1. The base URL of your sports REST API
const BASE_URL = "https://sport-api.eunglyzhia.com/api/v1";

/**
 * 2. Function to fetch all sports from the API.
 * Beginner-friendly standard Next.js fetch.
 */
export async function getAllSports(): Promise<Sport[]> {
  const response = await fetch(`${BASE_URL}/sports`, {
    cache: "no-store", // Fetch fresh data on every request
  });

  // If status is not 200-299, throw an error
  if (!response.ok) {
    throw new Error(`Failed to fetch sports. HTTP Status: ${response.status}`);
  }

  // Convert the response to JSON data and return it
  const data: Sport[] = await response.json();
  return data;
}

/**
 * 3. Function to fetch a single sport by its UUID.
 */
export async function getSportByUuid(uuid: string): Promise<Sport> {
  const response = await fetch(`${BASE_URL}/sports/${uuid}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch sport (${uuid}). HTTP Status: ${response.status}`);
  }

  const data: Sport = await response.json();
  return data;
}
