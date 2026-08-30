import { apiClient } from "../../../services/api/apiClient";

import type {
  CreateOrganizationPayload,
  Organization,
  OrganizationMembership,
  RequestOrganizationMembershipPayload,
  UpdateOrganizationPayload,
} from "../types/organization";

export async function createOrganization(
  payload: CreateOrganizationPayload,
): Promise<Organization> {
  const response = await apiClient.post<Organization>(
    "/organizations",
    payload,
  );

  return response.data;
}

export async function getOrganizations(): Promise<Organization[]> {
  const response = await apiClient.get<Organization[]>("/organizations");

  return response.data;
}

export async function getOrganizationById(
  organizationId: string,
): Promise<Organization> {
  const response = await apiClient.get<Organization>(
    `/organizations/${organizationId}`,
  );

  return response.data;
}

export async function getMyMemberships(): Promise<OrganizationMembership[]> {
  const response = await apiClient.get<OrganizationMembership[]>(
    "/organizations/me/memberships",
  );

  return response.data;
}

export async function updateOrganization(
  organizationId: string,
  payload: UpdateOrganizationPayload,
): Promise<Organization> {
  const response = await apiClient.patch<Organization>(
    `/organizations/${organizationId}`,
    payload,
  );

  return response.data;
}

export async function requestToJoinOrganization(
  organizationId: string,
  payload: RequestOrganizationMembershipPayload,
): Promise<OrganizationMembership> {
  const response = await apiClient.post<OrganizationMembership>(
    `/organizations/${organizationId}/join`,
    payload,
  );

  return response.data;
}

export async function leaveOrganization(
  organizationId: string,
): Promise<{ message: string }> {
  const response = await apiClient.patch<{ message: string }>(
    `/organizations/${organizationId}/leave`,
  );

  return response.data;
}