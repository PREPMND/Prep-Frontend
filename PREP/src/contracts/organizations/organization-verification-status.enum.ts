// GENERATED FILE -- DO NOT EDIT.
// Source of truth: PREP/shared/prep-contracts
// Regenerate with: npm run sync:contracts
/**
 * Whether PREP has verified an organization.
 *
 * This is deliberately NOT derived from an application being submitted or even
 * approved-in-form: an organization is VERIFIED only when a reviewer has recorded
 * that decision. Completing a form never makes an organization appear verified.
 *
 * Values are append-only (`organizations.verificationStatus` enum column).
 */
export enum OrganizationVerificationStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',

  /** Verification withdrawn by a platform administrator; history is retained. */
  SUSPENDED = 'suspended',
}

/** Statuses in which an organization may act on the platform. */
export const ACTIVE_ORGANIZATION_VERIFICATION_STATUSES: readonly OrganizationVerificationStatus[] =
  [OrganizationVerificationStatus.VERIFIED];

export function canOrganizationParticipate(
  status: OrganizationVerificationStatus,
): boolean {
  return ACTIVE_ORGANIZATION_VERIFICATION_STATUSES.includes(status);
}
