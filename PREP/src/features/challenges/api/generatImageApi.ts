export async function generateChallengeImage(
  title: string,
  description: string,
): Promise<string> {
  const response = await fetch("/api/generate-image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate challenge image");
  }

  const data = await response.json();

  return data.image;
}