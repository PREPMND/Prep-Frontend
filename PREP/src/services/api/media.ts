import { apiClientMedia } from "./apiClient";

export async function uploadMedia(
file: File,
purpose = "challenge_evidence",
) {
const formData = new FormData();

formData.append("file", file);
formData.append("purpose", purpose);

const response = await apiClientMedia.post(
"/media/upload",
formData,
);

return response.data;
}
