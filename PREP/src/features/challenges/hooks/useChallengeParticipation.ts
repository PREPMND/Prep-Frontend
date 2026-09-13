import { useMutation, useQuery } from "@tanstack/react-query";

import {
  requestChallengeParticipation,
  getChallengeParticipations,
  acceptChallengeParticipation,
  rejectChallengeParticipation,
  getMyChallengeParticipations,
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
export function useMyChallengeParticipations() {
  return useQuery({
    queryKey: ["my-challenge-participations"],

    queryFn: () =>
      getMyChallengeParticipations(),
    staleTime: 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000,
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