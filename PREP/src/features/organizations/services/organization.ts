import { apiClientOrganization } from "../../../services/api/apiClient";
import { apiClientOrganization } from "../../../services/api/apiClientOrganization";

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
  const response = await apiClientOrganization.post<Organization>(
    "/organizations",
    payload,
  );

  return response.data;
}

export async function getOrganizations(): Promise<Organization[]> {
  const response = await apiClientOrganization.get<Organization[]>("/organizations");

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

export async function leaveOrganization(
  organizationId: string,
): Promise<{ message: string }> {
  const response = await apiClientOrganization.patch<{ message: string }>(
    `/organizations/${organizationId}/leave`,
  );

  return response.data;
}