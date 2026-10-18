import type { OrganizationApplicationStatus } from "../../../contracts/organizations/organization-application-status.enum";
import type { OrganizationType } from "../../../contracts/organizations/organization-type.enum";

/**
 * What the applicant-facing endpoints return.
 *
 * Mirrors `ApplicantApplicationView` in organization-service. Reviewer-private
 * fields (assigned reviewer, decider, internal notes) are absent here because
 * the server does not send them on these routes -- this type is not what keeps
 * them private, but it should not invite code that expects them.
 */
export interface OrganizationApplication {
  id: string;
  status: OrganizationApplicationStatus;
  organizationName: string;
  organizationType: OrganizationType;
  description: string | null;
  website: string | null;
  officialEmail: string | null;
  contactPhone: string | null;
  contactPersonName: string | null;
  locationId: string | null;
  focusAreas: string[] | null;
  capabilities: string[] | null;
  relevantExperience: string | null;
  proposedContribution: string | null;
  supportingDocumentMediaIds: string[] | null;
  informationRequest: string | null;
  informationRequestedAt: string | null;
  decisionReason: string | null;
  decidedAt: string | null;
  organizationId: string | null;
  submissionCount: number;
  firstSubmittedAt: string | null;
  lastSubmittedAt: string | null;
  createdAt: string;
  updatedAt: string;
  /** Transitions the server will accept from the applicant right now. */
  availableActions: OrganizationApplicationStatus[];
  editable: boolean;
}

/** The full record, as returned to reviewers only. */
export interface OrganizationApplicationForReview
  extends Omit<OrganizationApplication, "availableActions" | "editable"> {
  applicantUserId: string;
  reviewerUserId: string | null;
  decidedByUserId: string | null;
}

export interface OrganizationApplicationNote {
  id: string;
  applicationId: string;
  authorUserId: string;
  body: string;
  createdAt: string;
}

export interface ApplicationTimelineEvent {
  id: string;
  action: string;
  fromStatus: string | null;
  toStatus: string | null;
  createdAt: string;
}

export interface CreateOrganizationApplicationPayload {
  organizationName: string;
  organizationType: OrganizationType;
  description?: string;
  website?: string;
  officialEmail?: string;
  contactPhone?: string;
  contactPersonName?: string;
  locationId?: string;
  focusAreas?: string[];
  capabilities?: string[];
  relevantExperience?: string;
  proposedContribution?: string;
  supportingDocumentMediaIds?: string[];
}

export type UpdateOrganizationApplicationPayload =
  Partial<CreateOrganizationApplicationPayload>;

export interface ApplicationQueueQuery {
  status?: OrganizationApplicationStatus;
  organizationType?: OrganizationType;
  search?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedApplications {
  items: OrganizationApplicationForReview[];
  total: number;
  page: number;
  limit: number;
}
