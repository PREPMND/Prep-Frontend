import { useQuery } from "@tanstack/react-query";
import { getChallengeById } from "../services/challenge";

export function useChallenge(challengeId?: string) {
  return useQuery({
    queryKey: ["challenge", challengeId],
    queryFn: () => getChallengeById(challengeId!),
    enabled: !!challengeId,
  });
}