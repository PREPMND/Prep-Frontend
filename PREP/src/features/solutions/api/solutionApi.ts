import { useQuery } from "@tanstack/react-query";
import {apiClientSolution} from "../../../services/api/apiClient"; // use your actual axios instance
import type { CreateSolutionPayload, Solution } from "../types";

export function useChallengeSolutions(challengeId?: string) {
  return useQuery({
    queryKey: ["challenge-solutions", challengeId],

    queryFn: async () => {
      const response = await apiClientSolution.get(
        `/solutions/challenge/${challengeId}`,
      );

      return response.data;
    },

    enabled: !!challengeId,
  });
}

export async function createSolution(
  payload: CreateSolutionPayload,
): Promise<Solution> {
  const response = await apiClientSolution.post<Solution>(
    "/solutions",
    payload,
  );

  return response.data;
}

export function getChallengeSolutions(challengeId: string) {
  return apiClientSolution.get(`/solutions/challenge/${challengeId}`);
}