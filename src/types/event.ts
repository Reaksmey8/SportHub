

export interface EventCategoryRef {
  name: string;
}

export interface Event {
  id: number;
  uuid: string;
  name: string;
  description: string;
  category?: EventCategoryRef | null;
  imageUrls: string[];
  locationName: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updateAt: string;
}

export interface CreateEventPayload {
  name: string;
  description: string;
  categoryName?: string;
  imageUrls?: string[];
  locationName?: string;
  latitude?: number;
  longitude?: number;
}