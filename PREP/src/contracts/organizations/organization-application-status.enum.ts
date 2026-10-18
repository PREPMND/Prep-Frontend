// GENERATED FILE -- DO NOT EDIT.
// Source of truth: PREP/shared/prep-contracts
// Regenerate with: npm run sync:contracts
/**
 * Review lifecycle of a request to bring an organization onto PREP.
 *
 * An application is a separate record from the organization it may eventually
 * create. A SUBMITTED or even APPROVED application is not itself an organization,
 * and never implies verification by itself.
 *
 * Append-only (`organization_applications.status` enum column).
 */
export enum OrganizationApplicationStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  IN_REVIEW = 'in_review',
  NEEDS_INFORMATION = 'needs_information',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  WITHDRAWN = 'withdrawn',
}

/** Who is permitted to drive a given transition. */
export enum OrganizationApplicationActor {
  /** The user who owns the application. */
  APPLICANT = 'applicant',
  /** A platform user holding `organization_application:review`. */
  REVIEWER = 'reviewer',
}

export interface OrganizationApplicationTransition {
  readonly to: OrganizationApplicationStatus;
  readonly actor: OrganizationApplicationActor;
}

/**
 * The single authoritative transition table.
 *
 * It encodes both *legality* (which target states exist at all) and *authority*
 * (who may move there), so a reviewer action and an applicant action can never be
 * confused for one another. Anything not listed here is rejected.
 */
export const ORGANIZATION_APPLICATION_TRANSITIONS: Readonly<
  Record<
    OrganizationApplicationStatus,
    readonly OrganizationApplicationTransition[]
  >
> = {
  [OrganizationApplicationStatus.DRAFT]: [
    {
      to: OrganizationApplicationStatus.SUBMITTED,
      actor: OrganizationApplicationActor.APPLICANT,
    },
    {
      to: OrganizationApplicationStatus.WITHDRAWN,
      actor: OrganizationApplicationActor.APPLICANT,
    },
  ],
  [OrganizationApplicationStatus.SUBMITTED]: [
    {
      to: OrganizationApplicationStatus.IN_REVIEW,
      actor: OrganizationApplicationActor.REVIEWER,
    },
    {
      to: OrganizationApplicationStatus.WITHDRAWN,
      actor: OrganizationApplicationActor.APPLICANT,
    },
  ],
  [OrganizationApplicationStatus.IN_REVIEW]: [
    {
      to: OrganizationApplicationStatus.NEEDS_INFORMATION,
      actor: OrganizationApplicationActor.REVIEWER,
    },
    {
      to: OrganizationApplicationStatus.APPROVED,
      actor: OrganizationApplicationActor.REVIEWER,
    },
    {
      to: OrganizationApplicationStatus.REJECTED,
      actor: OrganizationApplicationActor.REVIEWER,
    },
  ],
  [OrganizationApplicationStatus.NEEDS_INFORMATION]: [
    {
      to: OrganizationApplicationStatus.SUBMITTED,
      actor: OrganizationApplicationActor.APPLICANT,
    },
    {
      to: OrganizationApplicationStatus.WITHDRAWN,
      actor: OrganizationApplicationActor.APPLICANT,
    },
  ],
  [OrganizationApplicationStatus.REJECTED]: [
    // Resubmission after a rejection is allowed; the decision stays in history.
    {
      to: OrganizationApplicationStatus.SUBMITTED,
      actor: OrganizationApplicationActor.APPLICANT,
    },
  ],
  [OrganizationApplicationStatus.WITHDRAWN]: [
    {
      to: OrganizationApplicationStatus.DRAFT,
      actor: OrganizationApplicationActor.APPLICANT,
    },
  ],
  // Terminal: an approved application has produced an organization. Further
  // changes belong to the organization record, not to the application.
  [OrganizationApplicationStatus.APPROVED]: [],
};

/** Statuses whose submitted content an applicant may still edit. */
export const EDITABLE_APPLICATION_STATUSES: readonly OrganizationApplicationStatus[] =
  [
    OrganizationApplicationStatus.DRAFT,
    OrganizationApplicationStatus.NEEDS_INFORMATION,
  ];

/** Statuses that occupy a review queue. */
export const OPEN_REVIEW_STATUSES: readonly OrganizationApplicationStatus[] = [
  OrganizationApplicationStatus.SUBMITTED,
  OrganizationApplicationStatus.IN_REVIEW,
  OrganizationApplicationStatus.NEEDS_INFORMATION,
];

export const TERMINAL_APPLICATION_STATUSES: readonly OrganizationApplicationStatus[] =
  [OrganizationApplicationStatus.APPROVED];

export function isApplicationEditable(
  status: OrganizationApplicationStatus,
): boolean {
  return EDITABLE_APPLICATION_STATUSES.includes(status);
}

export function allowedTransitions(
  from: OrganizationApplicationStatus,
): readonly OrganizationApplicationTransition[] {
  return ORGANIZATION_APPLICATION_TRANSITIONS[from] ?? [];
}

export function transitionsFor(
  from: OrganizationApplicationStatus,
  actor: OrganizationApplicationActor,
): readonly OrganizationApplicationStatus[] {
  return allowedTransitions(from)
    .filter((transition) => transition.actor === actor)
    .map((transition) => transition.to);
}

export type TransitionCheck =
  | { readonly ok: true }
  | { readonly ok: false; readonly reason: string };

/**
 * Pure transition check shared by the service and the UI.
 *
 * The backend calls `assertApplicationTransition` (which throws) before writing;
 * the frontend calls this to decide which actions to offer. Both therefore agree
 * by construction.
 */
export function checkApplicationTransition(
  from: OrganizationApplicationStatus,
  to: OrganizationApplicationStatus,
  actor: OrganizationApplicationActor,
): TransitionCheck {
  if (from === to) {
    return { ok: false, reason: `Application is already ${from}.` };
  }

  const transitions = allowedTransitions(from);

  if (transitions.length === 0) {
    return {
      ok: false,
      reason: `An application that is ${from} can no longer change status.`,
    };
  }

  const match = transitions.find((transition) => transition.to === to);

  if (!match) {
    const legal = transitions.map((transition) => transition.to).join(', ');

    return {
      ok: false,
      reason: `Cannot move an application from ${from} to ${to}. Allowed: ${legal}.`,
    };
  }

  if (match.actor !== actor) {
    return {
      ok: false,
      reason: `Moving an application from ${from} to ${to} is a ${match.actor} action.`,
    };
  }

  return { ok: true };
}

/** Thrown by `assertApplicationTransition`; services map it to HTTP 409. */
export class InvalidApplicationTransitionError extends Error {
  constructor(
    readonly from: OrganizationApplicationStatus,
    readonly to: OrganizationApplicationStatus,
    readonly actor: OrganizationApplicationActor,
    reason: string,
  ) {
    super(reason);
    this.name = 'InvalidApplicationTransitionError';
  }
}

export function assertApplicationTransition(
  from: OrganizationApplicationStatus,
  to: OrganizationApplicationStatus,
  actor: OrganizationApplicationActor,
): void {
  const result = checkApplicationTransition(from, to, actor);

  if (!result.ok) {
    throw new InvalidApplicationTransitionError(from, to, actor, result.reason);
  }
}

export const ORGANIZATION_APPLICATION_STATUS_LABELS: Readonly<
  Record<OrganizationApplicationStatus, string>
> = {
  [OrganizationApplicationStatus.DRAFT]: 'Draft',
  [OrganizationApplicationStatus.SUBMITTED]: 'Submitted',
  [OrganizationApplicationStatus.IN_REVIEW]: 'In review',
  [OrganizationApplicationStatus.NEEDS_INFORMATION]: 'More information needed',
  [OrganizationApplicationStatus.APPROVED]: 'Approved',
  [OrganizationApplicationStatus.REJECTED]: 'Rejected',
  [OrganizationApplicationStatus.WITHDRAWN]: 'Withdrawn',
};
