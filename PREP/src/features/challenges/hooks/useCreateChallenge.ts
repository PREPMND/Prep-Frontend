import { useMutation } from "@tanstack/react-query";
import { createChallenge } from "../api/challengeApi";

export function useCreateChallenge() {
  return useMutation({
    mutationFn: createChallenge,
  });
}