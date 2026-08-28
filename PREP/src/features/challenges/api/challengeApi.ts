import { apiClient } from "../../../";
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