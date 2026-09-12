import { useMutation } from '@tanstack/react-query';

import {
  requestChallengeParticipation,
} from '../api/challenge.api';

import type {
  CreateChallengeParticipationPayload,
} from '../types/challenge';

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