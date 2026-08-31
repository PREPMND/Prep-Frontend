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

export async function getMediaByIds(
    mediaIds: string[],
): Promise<Media[]> {
    return Promise.all(
        mediaIds.map((mediaId) => getMediaById(mediaId)),
    );
}

export async function generateMedia(
    title: string,
    description: string,
): Promise<Media> {
    const response = await apiClientMedia.post<Media>(
        "/media/generate",
        {
            title,
            description,
        },
    );

    return response.data;
}