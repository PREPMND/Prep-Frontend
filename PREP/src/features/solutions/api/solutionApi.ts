import { useQuery } from "@tanstack/react-query";
import {apiClientSolution} from "../../../services/api/apiClient"; // use your actual axios instance

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