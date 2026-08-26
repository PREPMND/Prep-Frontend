import { useQuery } from "@tanstack/react-query";
import { getMyRole } from "../api/roleApi";

export function useMyRole(userId?: string) {
  return useQuery({
    queryKey: ["my-role", userId],
    queryFn: () => getMyRole(userId!),
    enabled: !!userId,
  });
}