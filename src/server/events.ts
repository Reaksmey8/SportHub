

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllEvents(): Promise<Event[]> {
  const response = await fetch(`${BASE_URL}/events`, {
    cache: "no-store",
  });

  if (!response.ok){
    throw new Error(`Failed to fetch event: ${response.statusText}`);
  }

  const data: Event[] = await response.json();
  return data;
}

export async function getEventByUuid(uuid: string): Promise<Event> {
  const response = await fetch(`${BASE_URL}/events/${uuid}`, {
    cache: "no-store",
  });

  if (!response.ok){
    throw new Error(`Failed to fetch event: ${response.status}`);
  }

  const data: Event = await response.json();
  return data;
}