import { useQuery } from "@tanstack/react-query";
import { getMediaById } from "../services/media";

export function useMedia(mediaId?: string) {
  return useQuery({
    queryKey: ["media", mediaId],
    queryFn: () => getMediaById(mediaId!),
    enabled: !!mediaId,
  });
}