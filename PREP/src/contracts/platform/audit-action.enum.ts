// GENERATED FILE -- DO NOT EDIT.
// Source of truth: PREP/shared/prep-contracts
// Regenerate with: npm run sync:contracts
/**
 * Auditable actions.
 *
 * Audit records are append-only and must never carry passwords, tokens, secrets
 * or personal data beyond the actor and target identifiers.
 *
 * Append-only (`audit_events.action` enum column).
 */
export enum AuditAction {
  APPLICATION_CREATED = 'organization_application.created',
  APPLICATION_UPDATED = 'organization_application.updated',
  APPLICATION_SUBMITTED = 'organization_application.submitted',
  APPLICATION_WITHDRAWN = 'organization_application.withdrawn',
  APPLICATION_REOPENED = 'organization_application.reopened',
  APPLICATION_REVIEW_STARTED = 'organization_application.review_started',
  APPLICATION_INFORMATION_REQUESTED = 'organization_application.information_requested',
  APPLICATION_APPROVED = 'organization_application.approved',
  APPLICATION_REJECTED = 'organization_application.rejected',
  APPLICATION_NOTE_ADDED = 'organization_application.note_added',

  ORGANIZATION_CREATED = 'organization.created',
  ORGANIZATION_VERIFICATION_CHANGED = 'organization.verification_changed',

  MEMBERSHIP_CREATED = 'organization_membership.created',
  MEMBERSHIP_ROLE_CHANGED = 'organization_membership.role_changed',
}

/** What kind of record an audit event points at. */
export enum AuditTargetType {
  ORGANIZATION_APPLICATION = 'organization_application',
  ORGANIZATION = 'organization',
  ORGANIZATION_MEMBERSHIP = 'organization_membership',
}

/** Whether the actor acted as themselves or as a platform reviewer. */
export enum AuditActorContext {
  APPLICANT = 'applicant',
  REVIEWER = 'reviewer',
  SYSTEM = 'system',
}
