export async function generateChallengeImage(
  title: string,
  description: string,
): Promise<Media> {
  const response = await apiClientMedi.post<Media>(
    "/media/generate",
    {
      title,
      description,
    },
  );

  return response.data;
}