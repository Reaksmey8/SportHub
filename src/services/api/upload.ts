import { apiClient } from "./client";

export interface UploadResponse {
  url?: string;
  urls?: string[];
  [key: string]: unknown;
}

export const uploadApi = {
  /**
   * Upload a single image/file using multipart/form-data
   * POST /upload (field: "file")
   */
  uploadFile: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    return apiClient<UploadResponse>("/upload", {
      method: "POST",
      body: formData,
    });
  },

  /**
   * Upload multiple images/files using multipart/form-data
   * POST /upload (field: "files")
   */
  uploadFiles: async (files: File[]): Promise<UploadResponse> => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    return apiClient<UploadResponse>("/upload", {
      method: "POST",
      body: formData,
    });
  },
};

