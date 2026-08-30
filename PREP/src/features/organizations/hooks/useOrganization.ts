import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  approveMembershipRequest,
  getMyMemberships,
  getOrganizationById,
  getOrganizationMembers,
  getOrganizations,
  leaveOrganization,
  rejectMembershipRequest,
  requestToJoinOrganization,
  updateMemberRole,
} from "../services/organization";

import type {
  RequestOrganizationMembershipPayload,
  UpdateOrganizationMemberPayload,
} from "../types/organization";

export function useOrganization(organizationId?: string) {
  return useQuery({
    queryKey: ["organization", organizationId],
    queryFn: () => getOrganizationById(organizationId!),
    enabled: !!organizationId,
  });
}
export function useOrganizations() {
  return useQuery({
    queryKey: ["organizations"],
    queryFn: getOrganizations,
  });
}
export function useMyMemberships() {
  return useQuery({
    queryKey: ["my-memberships"],
    queryFn: getMyMemberships,
  });
}

export function useOrganizationMembers(organizationId?: string) {
  return useQuery({
    queryKey: ["organization-members", organizationId],
    queryFn: () => getOrganizationMembers(organizationId!),
    enabled: !!organizationId,
  });
}

export function useRequestToJoinOrganization(organizationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RequestOrganizationMembershipPayload) =>
      requestToJoinOrganization(organizationId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-memberships"],
      });
    },
  });
}

export function useLeaveOrganization(organizationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => leaveOrganization(organizationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-memberships"],
      });

      queryClient.invalidateQueries({
        queryKey: ["organization-members", organizationId],
      });
    },
  });
}

export function useUpdateMemberRole(organizationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      payload,
    }: {
      userId: string;
      payload: UpdateOrganizationMemberPayload;
    }) => updateMemberRole(organizationId, userId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["organization-members", organizationId],
      });
    },
  });
}

export function useApproveMembershipRequest(organizationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) =>
      approveMembershipRequest(organizationId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["organization-members", organizationId],
      });
    },
  });
}

export function useRejectMembershipRequest(organizationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) =>
      rejectMembershipRequest(organizationId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["organization-members", organizationId],
      });
    },
  });
}