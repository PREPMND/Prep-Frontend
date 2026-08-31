import { useQuery } from "@tanstack/react-query";
import { getMediaById } from "../api/mediaApi";

import { useQuery } from "@tanstack/react-query";
import { getMediaByIds } from "../services/media";

export function useMedia(mediaIds: string[] = []) {
  return useQuery({
    queryKey: ["media", mediaIds],
    queryFn: () => getMediaByIds(mediaIds),
    enabled: mediaIds.length > 0,
  });
}
