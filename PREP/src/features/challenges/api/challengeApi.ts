import {  apiClientChallenge } from "../../../services/api/apiClient";
import type {
  Challenge,
  ChallengeParticipation,
  CreateChallengeParticipationPayload,
  CreateChallengePayload,
  CreateChallengeResponse,
} from "../types/challenge";

export async function createChallenge(
  payload: CreateChallengePayload,
): Promise<CreateChallengeResponse> {
  const response = await apiClientChallenge.post<CreateChallengeResponse>(
    "/challenges",
    payload,
  );

  return response.data;
}

export async function linkChallengeDuplicate(
  challengeId: string,
  originalChallengeId: string,
) {
  const response = await apiClientChallenge.patch(
    `/challenges/${challengeId}/duplicate`,
    {
      originalChallengeId,
    },
  );

  return response.data;
}

export async function getChallengeById(
    challengeId: string,
): Promise<Challenge> {
    const response = await apiClientChallenge.get<Challenge>(
        `/challenges/${challengeId}`,
    );

    return response.data;
}


export async function requestChallengeParticipation(
  challengeId: string,
  payload: CreateChallengeParticipationPayload,
): Promise<ChallengeParticipation> {
  const response =
    await apiClientChallenge.post<ChallengeParticipation>(
      `/challenges/${challengeId}/participations`,
      payload,
    );

  return response.data;
}

export async function getChallengeParticipations(
  challengeId: string,
): Promise<ChallengeParticipation[]> {
  const response =
    await apiClientChallenge.get<ChallengeParticipation[]>(
      `/challenges/${challengeId}/participations`,
    );

  return response.data;
}

export async function acceptChallengeParticipation(
  participationId: string,
): Promise<ChallengeParticipation> {
  const response =
    await apiClientChallenge.patch<ChallengeParticipation>(
      `/challenges/participations/${participationId}/accept`,
    );

  return response.data;
}

export async function rejectChallengeParticipation(
  participationId: string,
): Promise<ChallengeParticipation> {
  const response =
    await apiClientChallenge.patch<ChallengeParticipation>(
      `/challenges/participations/${participationId}/reject`,
    );

  return response.data;
}

export async function getChallenges(): Promise<Challenge[]> {
  const response = await apiClientChallenge.get<Challenge[]>(
    "/challenges",
  );

  return response.data;
}

export async function getMyChallengeParticipations() {
    const response = await apiClientChallenge.get(
        "/challenges/my-participations",
    );

    return response.data;
}