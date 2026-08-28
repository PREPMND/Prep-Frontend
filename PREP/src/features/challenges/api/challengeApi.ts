import { apiClient } from "../../../services/api/apiClient";
import type {
  CreateChallengePayload,
  CreateChallengeResponse,
} from "../types/challenge";

export async function createChallenge(
  payload: CreateChallengePayload,
): Promise<CreateChallengeResponse> {
  const response = await apiClient.post<CreateChallengeResponse>(
    "/challenges",
    payload,
  );

  return response.data;
}

export async function linkChallengeDuplicate(
  challengeId: string,
  originalChallengeId: string,
) {
  const response = await apiClient.patch(
    `/challenges/${challengeId}/duplicate`,
    {
      originalChallengeId,
    },
  );

  return response.data;
}