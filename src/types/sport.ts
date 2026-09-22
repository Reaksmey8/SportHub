export interface SportCategoryRef {
  name: string;
}

export interface Sport {
  id: number;
  uuid: string;
  name: string;
  category?: SportCategoryRef | null;
  description: string;
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
  disabled?: boolean;
}

export interface CreateSportPayload {
  name: string;
  categoryName?: string;
  description: string;
  imageUrls?: string[];
}
