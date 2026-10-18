// GENERATED FILE -- DO NOT EDIT.
// Source of truth: PREP/shared/prep-contracts
// Regenerate with: npm run sync:contracts
/**
 * Platform-level role, carried in the `role` claim of the access token and
 * mirrored from `auth-service`'s `User.role` column.
 *
 * Deliberately separate from `OrganizationMemberRole`. Being an administrator of
 * an organization must never grant any of these; being a SUPER_ADMIN here is not
 * a membership in any organization either. Keeping the two vocabularies apart is
 * what stops organization-level authority from escalating to platform authority.
 *
 * Append-only -- these values appear in already-issued JWTs.
 */
export enum PlatformRole {
  USER = 'user',
  DEV = 'dev',
  OFFICER = 'officer',
  SUPER_ADMIN = 'super_admin',
}

/**
 * Platform permissions, as named in `authorization-service`'s `Permission` table.
 *
 * These are checked at platform scope (a user-role row with a null
 * organizationId), never per organization.
 */
export const PlatformPermission = {
  /** Open applications, record notes, request information, decide. */
  ORGANIZATION_APPLICATION_REVIEW: 'organization_application:review',
  /** Change an organization's verification status, suspend, reactivate. */
  ORGANIZATION_VERIFICATION_MANAGE: 'organization_verification:manage',
  /** Read the platform audit trail. */
  AUDIT_READ: 'audit:read',
} as const;

export type PlatformPermission =
  (typeof PlatformPermission)[keyof typeof PlatformPermission];

export const PLATFORM_PERMISSIONS: readonly PlatformPermission[] =
  Object.values(PlatformPermission);

/**
 * How a platform permission is actually granted.
 *
 * There is no role-name shortcut. `auth-service` issues access tokens carrying
 * `roles: [{ roleId, organizationId }]` -- role *ids*, not names -- so no
 * service can decide platform authority from the token alone.
 *
 * A platform permission is held when `authorization-service` has a `user_roles`
 * row for the user with a **null `organizationId`** whose role maps to that
 * permission. SUPER_ADMIN gets all of them because its seed entry is
 * `Object.values(PERMISSIONS)`; run the authorization-service seed so the rows
 * exist.
 */
export const PLATFORM_PERMISSION_GRANT_NOTE =
  'Granted via a user_roles row with a null organizationId; see authorization-service seeds.';
