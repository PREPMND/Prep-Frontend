import { useQuery } from "@tanstack/react-query";
import { getMediaByIds } from "../api/mediaApi";

export function useMedia(mediaIds: string[] = []) {
  const hasItems = mediaIds.length > 0;

  return useQuery({
    queryKey: ["media", hasItems ? mediaIds.join(",") : "empty"],
    queryFn: () => getMediaByIds(mediaIds),
    enabled: hasItems,
    staleTime: 5 * 60 * 1000, 
    refetchOnWindowFocus: false, 
  });
}
