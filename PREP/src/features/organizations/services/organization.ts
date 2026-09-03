import { apiClientOrganization } from "../../../services/api/apiClient";

import type {
  CreateOrganizationPayload,
  Organization,
  OrganizationMemberRole,
  OrganizationMembership,
  RequestOrganizationMembershipPayload,
  UpdateOrganizationMemberPayload,
  UpdateOrganizationPayload,
} from "../types/organization";

export async function createOrganization(
  payload: CreateOrganizationPayload,
): Promise<Organization> {
  const response = await apiClientOrganization.post<Organization>(
    "/organizations",
    payload,
  );

  return response.data;
}

export async function getOrganizations(): Promise<Organization[]> {
  const response =
    await apiClientOrganization.get<Organization[]>("/organizations");

  return response.data;
}

export async function getOrganizationById(
  organizationId: string,
): Promise<Organization> {
  const response = await apiClientOrganization.get<Organization>(
    `/organizations/${organizationId}`,
  );

  return response.data;
}

export async function getMyMemberships(): Promise<OrganizationMembership[]> {
  const response = await apiClientOrganization.get<OrganizationMembership[]>(
    "/organizations/me/memberships",
  );

  return response.data;
}

export async function getOrganizationMembers(
  organizationId: string,
): Promise<OrganizationMembership[]> {
  const response = await apiClientOrganization.get<OrganizationMembership[]>(
    `/organizations/${organizationId}/members`,
  );

  return response.data;
}

export async function updateOrganization(
  organizationId: string,
  payload: UpdateOrganizationPayload,
): Promise<Organization> {
  const response = await apiClientOrganization.patch<Organization>(
    `/organizations/${organizationId}`,
    payload,
  );

  return response.data;
}

export async function updateMemberRole(
  organizationId: string,
  userId: string,
  payload: UpdateOrganizationMemberPayload,
): Promise<OrganizationMembership> {
  const response = await apiClientOrganization.patch<OrganizationMembership>(
    `/organizations/${organizationId}/members/${userId}`,
    payload,
  );

  return response.data;
}

export async function removeMember(
  organizationId: string,
  userId: string,
): Promise<void> {
  await apiClientOrganization.delete(
    `/organizations/${organizationId}/members/${userId}`,
  );
}

export async function requestToJoinOrganization(
  organizationId: string,
  payload: RequestOrganizationMembershipPayload,
): Promise<OrganizationMembership> {
  const response = await apiClientOrganization.post<OrganizationMembership>(
    `/organizations/${organizationId}/join`,
    payload,
  );

  return response.data;
}

export async function approveMembershipRequest(
  organizationId: string,
  userId: string,
): Promise<OrganizationMembership> {
  const response = await apiClientOrganization.patch<OrganizationMembership>(
    `/organizations/${organizationId}/members/${userId}/approve`,
  );
  console.log(response)
  return response.data;
}

export async function rejectMembershipRequest(
  organizationId: string,
  userId: string,
): Promise<OrganizationMembership> {
  const response = await apiClientOrganization.patch<OrganizationMembership>(
    `/organizations/${organizationId}/members/${userId}/reject`,
  );

  return response.data;
}

export async function leaveOrganization(
  organizationId: string,
): Promise<{ message: string }> {
  const response = await apiClientOrganization.patch<{ message: string }>(
    `/organizations/${organizationId}/leave`,
  );

  return response.data;
}


export async function updateOrganizationMemberRole(
  organizationId: string,
  userId: string,
  payload: { role: OrganizationMemberRole },
): Promise<OrganizationMembership> {
  const response = await apiClientOrganization.patch<OrganizationMembership>(
    `/organizations/${organizationId}/members/${userId}`,
    payload,
  );

  return response.data;
}

export async function removeOrganizationMember(
  organizationId: string,
  userId: string,
): Promise<void> {
  await apiClientOrganization.delete(
    `/organizations/${organizationId}/members/${userId}`,
  );
}