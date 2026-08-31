import { generateMedia } from "../../challenges/api/mediaApi";

export async function generateChallengeImage(
  title: string,
  description: string,
) {
  return generateMedia(title, description);
}