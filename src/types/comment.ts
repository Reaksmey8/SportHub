export interface Comment {
  id: number;
  uuid: string;
  eventUuid: string;
  comment: string;
  createdAt: string;
}

export interface CreateCommentPayload {
  eventUuid: string;
  comment: string;
}

