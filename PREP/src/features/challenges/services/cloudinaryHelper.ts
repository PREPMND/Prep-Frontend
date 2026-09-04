export function getCloudinaryUrl(
  url: string,
  width?: number,
): string {
  if (!url.includes("res.cloudinary.com")) {
    return url;
  }

  const transformation = width
    ? `f_auto,q_auto,c_limit,w_${width}`
    : "f_auto,q_auto,c_limit";

  if (url.includes("/image/upload/")) {
    return url.replace(
      "/image/upload/",
      `/image/upload/${transformation}/`,
    );
  }

  return url;
}