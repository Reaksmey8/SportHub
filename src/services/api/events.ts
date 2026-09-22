import { apiClient } from "./client";
import { Event, CreateEventPayload } from "@/types/event";

export const eventsApi = {
  /**
   * Fetch all events
   * GET /events
   */
  getEvents: async (): Promise<Event[]> => {
    return apiClient<Event[]>("/events");
  },

  /**
   * Fetch a single event by UUID
   * GET /events/{uuid}
   */
  getEventByUuid: async (uuid: string): Promise<Event> => {
    return apiClient<Event>(`/events/${uuid}`);
  },

  /**
   * Create a new event
   * POST /events
   */
  createEvent: async (payload: CreateEventPayload): Promise<Event> => {
    return apiClient<Event>("/events", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /**
   * Update an existing event
   * PATCH /events/{uuid}
   */
  updateEvent: async (
    uuid: string,
    payload: Partial<CreateEventPayload>
  ): Promise<Event> => {
    return apiClient<Event>(`/events/${uuid}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  /**
   * Delete an event
   * DELETE /events/{uuid}
   */
  deleteEvent: async (uuid: string): Promise<void> => {
    return apiClient<void>(`/events/${uuid}`, {
      method: "DELETE",
    });
  },
};

