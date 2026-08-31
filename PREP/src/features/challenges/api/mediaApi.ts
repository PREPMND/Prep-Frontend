import { apiClientMedia } from "../../../services/api/apiClient";

export interface Media {
  id: string;
  originalName: string;
  filename: string;
  mimeType: string;
  size: number;
  storageKey: string;
  url: string;
  uploadedBy: string;
  purpose: string | null;
  createdAt: string;
}

export async function getMediaById(
  mediaId: string,
): Promise<Media> {
  const response = await apiClientMedia.get<Media>(
    `/media/${mediaId}`,
  );

  return response.data;
}