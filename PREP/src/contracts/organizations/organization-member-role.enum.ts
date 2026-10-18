// GENERATED FILE -- DO NOT EDIT.
// Source of truth: PREP/shared/prep-contracts
// Regenerate with: npm run sync:contracts
/**
 * A user's role *inside one organization*.
 *
 * This is scoped to a single organization and is NOT a platform role. Holding
 * ORGANIZATION_ADMIN in one organization grants nothing in another organization
 * and nothing at platform level -- see `PlatformRole` / `PlatformPermission`.
 *
 * Append-only (`organization_memberships.role` enum column). The sector-specific
 * admin roles below predate the independent-platform model and are retained so
 * existing rows keep working; new code should prefer ORGANIZATION_ADMIN and
 * MEMBER, and should test authority with `isOrganizationAdminRole()` rather than
 * comparing against a single member.
 */
export enum OrganizationMemberRole {
  STUDENT = 'student',
  RESEARCHER = 'researcher',
  FACULTY = 'faculty',

  UNIVERSITY_ADMIN = 'university_admin',
  INSTITUTIONAL_ADMIN = 'institutional_admin',

  INDUSTRY_MEMBER = 'industry_member',
  INDUSTRY_MENTOR = 'industry_mentor',
  INDUSTRY_ADMIN = 'industry_admin',

  NGO_MEMBER = 'ngo_member',
  NGO_ADMIN = 'ngo_admin',

  COMMUNITY_MEMBER = 'community_member',
  VOLUNTEER = 'volunteer',

  EXPERT = 'expert',
  MENTOR = 'mentor',
  SOLUTION_REVIEWER = 'solution_reviewer',
  EVALUATOR = 'evaluator',

  OFFICER = 'officer',
  DEPARTMENT_OFFICER = 'department_officer',
  FIELD_OFFICER = 'field_officer',
  GOVERNMENT_REVIEWER = 'government_reviewer',

  PROJECT_LEAD = 'project_lead',
  EVENT_MANAGER = 'event_manager',

  MEMBER = 'member',

  /**
   * Type-neutral organization administrator. Granted to the applicant when their
   * organization application is approved.
   */
  ORGANIZATION_ADMIN = 'organization_admin',

  /** Type-neutral contributor, usable by any organization type. */
  CONTRIBUTOR = 'contributor',
}

/**
 * Every role that carries administrative authority within its organization.
 *
 * Authorization code must consult this set instead of checking a single role, or
 * a university whose admin holds `university_admin` would be denied the authority
 * an `organization_admin` has.
 */
export const ORGANIZATION_ADMIN_ROLES: readonly OrganizationMemberRole[] = [
  OrganizationMemberRole.ORGANIZATION_ADMIN,
  OrganizationMemberRole.UNIVERSITY_ADMIN,
  OrganizationMemberRole.INSTITUTIONAL_ADMIN,
  OrganizationMemberRole.INDUSTRY_ADMIN,
  OrganizationMemberRole.NGO_ADMIN,
];

export function isOrganizationAdminRole(
  role: OrganizationMemberRole,
): boolean {
  return ORGANIZATION_ADMIN_ROLES.includes(role);
}

/** Role granted to the applicant when their application is approved. */
export const DEFAULT_APPROVED_APPLICANT_ROLE =
  OrganizationMemberRole.ORGANIZATION_ADMIN;
