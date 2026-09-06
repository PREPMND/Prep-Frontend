import { apiClientMedia } from "../../../services/api/apiClient";
import type { Media } from "./mediaApi";

export async function generateChallengeImage(
  title: string,
  description: string,
): Promise<Media> {
  console.log("Generating image with title:", title, "and description:", description);
  const response = await apiClientMedia.post<Media>(
    "/media/generate",
    {
      title,
      description,
    },
  );

  return response.data;
}