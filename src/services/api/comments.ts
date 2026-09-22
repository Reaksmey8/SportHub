import { apiClient } from "./client";
import { Comment, CreateCommentPayload } from "@/types/comment";

export const commentsApi = {
  /**
   * Fetch all comments
   * GET /comments
   */
  getComments: async (): Promise<Comment[]> => {
    return apiClient<Comment[]>("/comments");
  },

  /**
   * Fetch comments for a specific event by event UUID
   * GET /comments/events/{uuid}
   */
  getCommentsByEventUuid: async (eventUuid: string): Promise<Comment[]> => {
    return apiClient<Comment[]>(`/comments/events/${eventUuid}`);
  },

  /**
   * Post a new comment
   * POST /comments
   */
  createComment: async (payload: CreateCommentPayload): Promise<Comment> => {
    return apiClient<Comment>("/comments", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /**
   * Delete a comment
   * DELETE /comments/{uuid}
   */
  deleteComment: async (uuid: string): Promise<void> => {
    return apiClient<void>(`/comments/${uuid}`, {
      method: "DELETE",
    });
  },
};

