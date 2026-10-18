// GENERATED FILE -- DO NOT EDIT.
// Source of truth: PREP/shared/prep-contracts
// Regenerate with: npm run sync:contracts
/**
 * Kinds of organization that can participate in PREP.
 *
 * Values are append-only: they are persisted in the `organizations.type`
 * Postgres enum column.
 *
 * Naming note: the product brief refers to UNIVERSITY, RESEARCH_INSTITUTION and
 * GOVERNMENT_DEPARTMENT. Those concepts already existed here under the names
 * EDUCATIONAL_INSTITUTION, RESEARCH_ORGANIZATION and GOVERNMENT, so they are NOT
 * duplicated -- a second member meaning the same thing is exactly the divergence
 * this package exists to prevent. `ORGANIZATION_TYPE_ALIASES` maps the brief's
 * vocabulary onto the stored one.
 */
export enum OrganizationType {
  EDUCATIONAL_INSTITUTION = 'educational_institution',
  RESEARCH_ORGANIZATION = 'research_organization',
  GOVERNMENT = 'government',
  PRIVATE_COMPANY = 'private_company',
  NGO = 'ngo',

  /** Added for the independent, non-government platform model. */
  STARTUP = 'startup',
  COMMUNITY_ORGANIZATION = 'community_organization',
  OTHER = 'other',
}

/** Alternate names accepted from callers, mapped to the canonical member. */
export const ORGANIZATION_TYPE_ALIASES: Readonly<Record<string, OrganizationType>> = {
  university: OrganizationType.EDUCATIONAL_INSTITUTION,
  research_institution: OrganizationType.RESEARCH_ORGANIZATION,
  government_department: OrganizationType.GOVERNMENT,
};

export const ORGANIZATION_TYPES: readonly OrganizationType[] =
  Object.values(OrganizationType);

/**
 * Government participation is optional on PREP. Nothing in the platform may
 * require a GOVERNMENT organization to exist for a flow to complete; this list
 * is the set of types that can carry the platform on their own.
 */
export const NON_GOVERNMENT_ORGANIZATION_TYPES: readonly OrganizationType[] =
  ORGANIZATION_TYPES.filter((type) => type !== OrganizationType.GOVERNMENT);

export function resolveOrganizationType(
  value: string,
): OrganizationType | undefined {
  if ((ORGANIZATION_TYPES as string[]).includes(value)) {
    return value as OrganizationType;
  }

  return ORGANIZATION_TYPE_ALIASES[value];
}

export const ORGANIZATION_TYPE_LABELS: Readonly<Record<OrganizationType, string>> = {
  [OrganizationType.EDUCATIONAL_INSTITUTION]: 'University / Educational institution',
  [OrganizationType.RESEARCH_ORGANIZATION]: 'Research institution',
  [OrganizationType.GOVERNMENT]: 'Government department',
  [OrganizationType.PRIVATE_COMPANY]: 'Private company',
  [OrganizationType.NGO]: 'NGO',
  [OrganizationType.STARTUP]: 'Startup',
  [OrganizationType.COMMUNITY_ORGANIZATION]: 'Community organization',
  [OrganizationType.OTHER]: 'Other',
};
