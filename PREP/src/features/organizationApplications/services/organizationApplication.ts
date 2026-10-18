import { apiClientOrganization } from "../../../services/api/apiClient";

import type {
  ApplicationQueueQuery,
  ApplicationTimelineEvent,
  CreateOrganizationApplicationPayload,
  OrganizationApplication,
  OrganizationApplicationForReview,
  OrganizationApplicationNote,
  PaginatedApplications,
  UpdateOrganizationApplicationPayload,
} from "../types/organizationApplication";

/**
 * Applicant-facing calls (`/organization-applications`).
 *
 * No call sends an applicant id or a status: the server takes the applicant from
 * the access token and owns every status change.
 */

export async function createApplication(
  payload: CreateOrganizationApplicationPayload,
): Promise<OrganizationApplication> {
  const response = await apiClientOrganization.post<OrganizationApplication>(
    "/organization-applications",
    payload,
  );

  return response.data;
}

export async function getMyApplications(): Promise<OrganizationApplication[]> {
  const response = await apiClientOrganization.get<OrganizationApplication[]>(
    "/organization-applications/me",
  );

  return response.data;
}

export async function getMyApplication(
  applicationId: string,
): Promise<OrganizationApplication> {
  const response = await apiClientOrganization.get<OrganizationApplication>(
    `/organization-applications/${applicationId}`,
  );

  return response.data;
}

export async function getMyApplicationTimeline(
  applicationId: string,
): Promise<ApplicationTimelineEvent[]> {
  const response = await apiClientOrganization.get<ApplicationTimelineEvent[]>(
    `/organization-applications/${applicationId}/timeline`,
  );

  return response.data;
}

export async function updateApplication(
  applicationId: string,
  payload: UpdateOrganizationApplicationPayload,
): Promise<OrganizationApplication> {
  const response = await apiClientOrganization.patch<OrganizationApplication>(
    `/organization-applications/${applicationId}`,
    payload,
  );

  return response.data;
}

export async function submitApplication(
  applicationId: string,
): Promise<OrganizationApplication> {
  const response = await apiClientOrganization.post<OrganizationApplication>(
    `/organization-applications/${applicationId}/submit`,
  );

  return response.data;
}

export async function withdrawApplication(
  applicationId: string,
): Promise<OrganizationApplication> {
  const response = await apiClientOrganization.post<OrganizationApplication>(
    `/organization-applications/${applicationId}/withdraw`,
  );

  return response.data;
}

export async function reopenApplication(
  applicationId: string,
): Promise<OrganizationApplication> {
  const response = await apiClientOrganization.post<OrganizationApplication>(
    `/organization-applications/${applicationId}/reopen`,
  );

  return response.data;
}

/**
 * Reviewer-facing calls (`/admin/organization-applications`).
 *
 * These require the `organization_application:review` platform permission. The
 * UI hides them from users who lack it, but the backend is what enforces it --
 * a hidden button is not an authorization control.
 */

export async function getApplicationQueue(
  query: ApplicationQueueQuery,
): Promise<PaginatedApplications> {
  const response = await apiClientOrganization.get<PaginatedApplications>(
    "/admin/organization-applications",
    { params: query },
  );

  return response.data;
}

export async function getApplicationStats(): Promise<Record<string, number>> {
  const response = await apiClientOrganization.get<Record<string, number>>(
    "/admin/organization-applications/stats",
  );

  return response.data;
}

export async function getApplicationForReview(
  applicationId: string,
): Promise<OrganizationApplicationForReview> {
  const response =
    await apiClientOrganization.get<OrganizationApplicationForReview>(
      `/admin/organization-applications/${applicationId}`,
    );

  return response.data;
}

export async function getApplicationNotes(
  applicationId: string,
): Promise<OrganizationApplicationNote[]> {
  const response = await apiClientOrganization.get<
    OrganizationApplicationNote[]
  >(`/admin/organization-applications/${applicationId}/notes`);

  return response.data;
}

export async function addApplicationNote(
  applicationId: string,
  body: string,
): Promise<OrganizationApplicationNote> {
  const response =
    await apiClientOrganization.post<OrganizationApplicationNote>(
      `/admin/organization-applications/${applicationId}/notes`,
      { body },
    );

  return response.data;
}

export async function startApplicationReview(
  applicationId: string,
): Promise<OrganizationApplicationForReview> {
  const response =
    await apiClientOrganization.post<OrganizationApplicationForReview>(
      `/admin/organization-applications/${applicationId}/start-review`,
    );

  return response.data;
}

export async function requestApplicationInformation(
  applicationId: string,
  message: string,
): Promise<OrganizationApplicationForReview> {
  const response =
    await apiClientOrganization.post<OrganizationApplicationForReview>(
      `/admin/organization-applications/${applicationId}/request-information`,
      { message },
    );

  return response.data;
}

export async function approveApplication(
  applicationId: string,
  reason?: string,
): Promise<{
  application: OrganizationApplicationForReview;
  organization: { id: string; name: string };
}> {
  const response = await apiClientOrganization.post<{
    application: OrganizationApplicationForReview;
    organization: { id: string; name: string };
  }>(`/admin/organization-applications/${applicationId}/approve`, { reason });

  return response.data;
}

export async function rejectApplication(
  applicationId: string,
  reason: string,
): Promise<OrganizationApplicationForReview> {
  const response =
    await apiClientOrganization.post<OrganizationApplicationForReview>(
      `/admin/organization-applications/${applicationId}/reject`,
      { reason },
    );

  return response.data;
}
