import { useQuery } from "@tanstack/react-query";
import { getChallengeById } from "../api/challengeApi";

export function useChallengeDetails(challengeId?: string) {
  return useQuery({
    queryKey: ["challenge", challengeId],
    queryFn: () => getChallengeById(challengeId!),
    enabled: !!challengeId,
  });
}