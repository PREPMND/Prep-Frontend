import { useQuery } from "@tanstack/react-query";
import {  getMediaByIds } from "../api/mediaApi";



export function useMedia(mediaIds: string[] = []) {
  return useQuery({
    queryKey: ["media", mediaIds],
    queryFn: () => getMediaByIds(mediaIds),
    enabled: mediaIds.length > 0,
  });
}
