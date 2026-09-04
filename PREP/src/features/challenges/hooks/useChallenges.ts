import { useQuery } from "@tanstack/react-query";
import { getChallenges } from "../api/challengeApi";

export function useChallenges() {
  return useQuery({
    queryKey: ["challenges"],
    queryFn: getChallenges,
  });
}