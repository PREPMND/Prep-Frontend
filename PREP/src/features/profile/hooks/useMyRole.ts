import { useQuery } from "@tanstack/react-query";
import { getMyRole } from "../api/roleApi";

export function useMyRole() {
  return useQuery({
    queryKey: ["my-role"],
    queryFn: getMyRole,
  });
}