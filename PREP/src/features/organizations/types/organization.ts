export const ORGANIZATION_TYPES = {
  NGO: "ngo",
  GOVERNMENT: "government",
  COMMUNITY: "community",
  EDUCATIONAL_INSTITUTION: "educational_institution",
  CORPORATE: "corporate",
  OTHER: "other",
} as const;

export type OrganizationType =
  (typeof ORGANIZATION_TYPES)[keyof typeof ORGANIZATION_TYPES];

export const ORGANIZATION_VERIFICATION_STATUSES = {
  PENDING: "pending",
  VERIFIED: "verified",
  REJECTED: "rejected",
} as const;

export type OrganizationVerificationStatus =
  (typeof ORGANIZATION_VERIFICATION_STATUSES)[keyof typeof ORGANIZATION_VERIFICATION_STATUSES];

export const ORGANIZATION_MEMBER_ROLES = {
  ADMIN: "admin",
  MEMBER: "member",
} as const;

export type OrganizationMemberRole =
  (typeof ORGANIZATION_MEMBER_ROLES)[keyof typeof ORGANIZATION_MEMBER_ROLES];

export const ORGANIZATION_MEMBERSHIP_STATUSES = {
  PENDING: "pending",
  ACTIVE: "active",
  REJECTED: "rejected",
  LEFT: "left",
} as const;

export type OrganizationMembershipStatus =
  (typeof ORGANIZATION_MEMBERSHIP_STATUSES)[keyof typeof ORGANIZATION_MEMBERSHIP_STATUSES];

export interface Organization {
  id: string;
  name: string;
  type: OrganizationType;
  verificationStatus: OrganizationVerificationStatus;
  officialEmail: string | null;
  website: string | null;
  locationId: string | null;
  description: string | null;
  logoMediaId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationMembership {
  id: string;
  organizationId: string;
  userId: string;
  role: OrganizationMemberRole;
  status: OrganizationMembershipStatus;
  message: string | null;
  joinedAt: string | null;
  leftAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrganizationPayload {
  name: string;
  type: OrganizationType;
  officialEmail?: string;
  website?: string;
  locationId?: string;
  description?: string;
  logoMediaId?: string;
}

export interface UpdateOrganizationPayload {
  name?: string;
  officialEmail?: string;
  website?: string;
  locationId?: string;
  description?: string;
  logoMediaId?: string;
}

export interface UpdateOrganizationMemberPayload {
  role: OrganizationMemberRole;
}

export interface RequestOrganizationMembershipPayload {
  message?: string;
}