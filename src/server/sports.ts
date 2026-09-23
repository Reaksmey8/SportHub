import { Sport } from "@/types/sport";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://sport-api.eunglyzhia.com/api/v1";

export async function getSports(): Promise<Sport[]> {
  const response = await fetch(`${BASE_URL}/sports`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch sports: ${response.statusText || response.status}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data : data.data || [];
}

export async function getSportByUuid(uuid: string): Promise<Sport> {
  const response = await fetch(`${BASE_URL}/sports/${uuid}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch sport: ${response.statusText || response.status}`);
  }

  const data = await response.json();
  return data.data !== undefined ? data.data : data;
}

// Alias for convenience so both getSports and getAllSports work
export const getAllSports = getSports;

export const sportsApi = {
  getSports,
  getSportByUuid,
};
