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
  STUDENT: 'student',
  RESEARCHER: 'researcher',
  FACULTY: 'faculty',

  UNIVERSITY_ADMIN: 'university_admin',
  INSTITUTIONAL_ADMIN: 'institutional_admin',

  INDUSTRY_MEMBER: 'industry_member',
  INDUSTRY_MENTOR: 'industry_mentor',
  INDUSTRY_ADMIN: 'industry_admin',

  NGO_MEMBER: 'ngo_member',
  NGO_ADMIN: 'ngo_admin',

  COMMUNITY_MEMBER: 'community_member',
  VOLUNTEER: 'volunteer',

  EXPERT: 'expert',
  MENTOR: 'mentor',
  SOLUTION_REVIEWER: 'solution_reviewer',
  EVALUATOR: 'evaluator',

  OFFICER: 'officer',
  DEPARTMENT_OFFICER: 'department_officer',
  FIELD_OFFICER: 'field_officer',
  GOVERNMENT_REVIEWER: 'government_reviewer',

  PROJECT_LEAD: 'project_lead',
  EVENT_MANAGER: 'event_manager',

  MEMBER: 'member',
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