import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addApplicationNote,
  approveApplication,
  createApplication,
  getApplicationForReview,
  getApplicationNotes,
  getApplicationQueue,
  getApplicationStats,
  getMyApplication,
  getMyApplicationTimeline,
  getMyApplications,
  rejectApplication,
  reopenApplication,
  requestApplicationInformation,
  startApplicationReview,
  submitApplication,
  updateApplication,
  withdrawApplication,
} from "../services/organizationApplication";

import type {
  ApplicationQueueQuery,
  CreateOrganizationApplicationPayload,
  UpdateOrganizationApplicationPayload,
} from "../types/organizationApplication";

const KEYS = {
  mine: ["organization-applications", "mine"] as const,
  one: (id: string) => ["organization-applications", id] as const,
  timeline: (id: string) =>
    ["organization-applications", id, "timeline"] as const,
  queue: (query: ApplicationQueueQuery) =>
    ["organization-applications", "queue", query] as const,
  stats: ["organization-applications", "stats"] as const,
  notes: (id: string) => ["organization-applications", id, "notes"] as const,
};

// --- Applicant ---------------------------------------------------------------

export function useMyApplications() {
  return useQuery({
    queryKey: KEYS.mine,
    queryFn: getMyApplications,
  });
}

export function useMyApplication(applicationId?: string) {
  return useQuery({
    queryKey: KEYS.one(applicationId ?? ""),
    queryFn: () => getMyApplication(applicationId!),
    enabled: !!applicationId,
  });
}

export function useMyApplicationTimeline(applicationId?: string) {
  return useQuery({
    queryKey: KEYS.timeline(applicationId ?? ""),
    queryFn: () => getMyApplicationTimeline(applicationId!),
    enabled: !!applicationId,
  });
}

export function useCreateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateOrganizationApplicationPayload) =>
      createApplication(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEYS.mine });
    },
  });
}

export function useUpdateApplication(applicationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateOrganizationApplicationPayload) =>
      updateApplication(applicationId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEYS.one(applicationId) });
      queryClient.invalidateQueries({ queryKey: KEYS.mine });
    },
  });
}

/**
 * Applicant status actions.
 *
 * Each invalidates the application and its timeline rather than writing an
 * optimistic status, because the server decides whether a transition is legal
 * and what the resulting state is.
 */
export function useApplicationActions(applicationId: string) {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: KEYS.one(applicationId) });
    queryClient.invalidateQueries({ queryKey: KEYS.timeline(applicationId) });
    queryClient.invalidateQueries({ queryKey: KEYS.mine });
  };

  const submit = useMutation({
    mutationFn: () => submitApplication(applicationId),
    onSuccess: invalidate,
  });

  const withdraw = useMutation({
    mutationFn: () => withdrawApplication(applicationId),
    onSuccess: invalidate,
  });

  const reopen = useMutation({
    mutationFn: () => reopenApplication(applicationId),
    onSuccess: invalidate,
  });

  return { submit, withdraw, reopen };
}

// --- Reviewer ----------------------------------------------------------------

export function useApplicationQueue(query: ApplicationQueueQuery) {
  return useQuery({
    queryKey: KEYS.queue(query),
    queryFn: () => getApplicationQueue(query),
  });
}

export function useApplicationStats() {
  return useQuery({
    queryKey: KEYS.stats,
    queryFn: getApplicationStats,
  });
}

export function useApplicationForReview(applicationId?: string) {
  return useQuery({
    queryKey: ["organization-applications", "review", applicationId],
    queryFn: () => getApplicationForReview(applicationId!),
    enabled: !!applicationId,
  });
}

export function useApplicationNotes(applicationId?: string) {
  return useQuery({
    queryKey: KEYS.notes(applicationId ?? ""),
    queryFn: () => getApplicationNotes(applicationId!),
    enabled: !!applicationId,
  });
}

/** Reviewer decision actions for one application. */
export function useReviewActions(applicationId: string) {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({
      queryKey: ["organization-applications", "review", applicationId],
    });
    queryClient.invalidateQueries({ queryKey: KEYS.stats });
    queryClient.invalidateQueries({
      queryKey: ["organization-applications", "queue"],
    });
  };

  const startReview = useMutation({
    mutationFn: () => startApplicationReview(applicationId),
    onSuccess: invalidate,
  });

  const requestInformation = useMutation({
    mutationFn: (message: string) =>
      requestApplicationInformation(applicationId, message),
    onSuccess: invalidate,
  });

  const approve = useMutation({
    mutationFn: (reason?: string) => approveApplication(applicationId, reason),
    onSuccess: () => {
      invalidate();
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });

  const reject = useMutation({
    mutationFn: (reason: string) => rejectApplication(applicationId, reason),
    onSuccess: invalidate,
  });

  const addNote = useMutation({
    mutationFn: (body: string) => addApplicationNote(applicationId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEYS.notes(applicationId) });
    },
  });

  return { startReview, requestInformation, approve, reject, addNote };
}
