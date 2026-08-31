import { generateMedia } from "../../../services/api/media";

export async function generateChallengeImage(
  title: string,
  description: string,
) {
  return generateMedia(title, description);
}