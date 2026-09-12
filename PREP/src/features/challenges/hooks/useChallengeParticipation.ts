import { useMutation, useQuery } from "@tanstack/react-query";

import {
  requestChallengeParticipation,
  getChallengeParticipations,
  acceptChallengeParticipation,
  rejectChallengeParticipation,
} from "../api/challengeApi";

import type {
  CreateChallengeParticipationPayload,
} from "../types/challenge";

export function useRequestChallengeParticipation(
  challengeId: string,
) {
  return useMutation({
    mutationFn: (
      payload: CreateChallengeParticipationPayload,
    ) =>
      requestChallengeParticipation(
        challengeId,
        payload,
      ),
  });
}

export function useChallengeParticipations(
  challengeId: string,
) {
  return useQuery({
    queryKey: [
      "challenge-participations",
      challengeId,
    ],
    queryFn: () =>
      getChallengeParticipations(challengeId),
    enabled: !!challengeId,
  });
}

export function useAcceptChallengeParticipation() {
  return useMutation({
    mutationFn: (
      participationId: string,
    ) =>
      acceptChallengeParticipation(
        participationId,
      ),
  });
}

export function useRejectChallengeParticipation() {
  return useMutation({
    mutationFn: (
      participationId: string,
    ) =>
      rejectChallengeParticipation(
        participationId,
      ),
  });
}