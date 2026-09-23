import { Event } from "@/types/event";

// 1. The base URL of the sports REST API
const BASE_URL = "https://sport-api.eunglyzhia.com/api/v1";

/**
 * 2. Fetch all events from the API.
 */
export async function getAllEvents(): Promise<Event[]> {
  const response = await fetch(`${BASE_URL}/events`, {
    cache: "no-store", // Always fetch fresh data on the server
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch events. HTTP Status: ${response.status}`);
  }

  const data: Event[] = await response.json();
  return data;
}

/**
 * 3. Fetch a single event by its UUID.
 */
export async function getEventByUuid(uuid: string): Promise<Event> {
  const response = await fetch(`${BASE_URL}/events/${uuid}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch event (${uuid}). HTTP Status: ${response.status}`);
  }

  const data: Event = await response.json();
  return data;
}
