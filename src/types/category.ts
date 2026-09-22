import { Sport } from "./sport";

export interface SportCategory {
  id: number;
  uuid: string;
  name: string;
  description: string;
  sports?: Sport[] | number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryPayload {
  name: string;
  description: string;
}

