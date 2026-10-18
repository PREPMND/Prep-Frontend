import { useMutation } from "@tanstack/react-query";
import { createSolution } from "../api/solutionApi";

export function useCreateSolution() {
  return useMutation({
    mutationFn: createSolution,
  });
}