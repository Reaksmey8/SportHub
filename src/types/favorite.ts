export interface Favorite {
  id: string | number;
  uuid: string | null;
  sportUuid?: string;
  eventUuid?: string;
  isDeleted?: boolean;
  isFavorite?: boolean;
}

export interface CreateFavoritePayload {
  sportUuid?: string;
  eventUuid?: string;
}

