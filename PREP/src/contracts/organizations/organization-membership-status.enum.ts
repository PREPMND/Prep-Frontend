// GENERATED FILE -- DO NOT EDIT.
// Source of truth: PREP/shared/prep-contracts
// Regenerate with: npm run sync:contracts
/**
 * State of a user's membership in one organization.
 *
 * Append-only (`organization_memberships.status` enum column).
 */
export enum OrganizationMembershipStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  REJECTED = 'rejected',
  LEFT = 'left',

  /** Membership disabled because the organization was suspended. */
  SUSPENDED = 'suspended',
}

export function isActiveMembership(
  status: OrganizationMembershipStatus,
): boolean {
  return status === OrganizationMembershipStatus.ACTIVE;
}
