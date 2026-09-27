export type CommentEntityType = "sport" | "event" | "category";

export interface Comment {
  id: string;
  entityType: CommentEntityType;
  entityUuid: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: string;
}
