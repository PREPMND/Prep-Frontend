import {
  ORGANIZATION_APPLICATION_STATUS_LABELS,
  OrganizationApplicationStatus,
} from "../../../contracts/organizations/organization-application-status.enum";

const TONE: Record<OrganizationApplicationStatus, string> = {
  [OrganizationApplicationStatus.DRAFT]:
    "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
  [OrganizationApplicationStatus.SUBMITTED]:
    "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
  [OrganizationApplicationStatus.IN_REVIEW]:
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300",
  [OrganizationApplicationStatus.NEEDS_INFORMATION]:
    "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300",
  [OrganizationApplicationStatus.APPROVED]:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  [OrganizationApplicationStatus.REJECTED]:
    "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
  [OrganizationApplicationStatus.WITHDRAWN]:
    "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400",
};

/**
 * Status chip.
 *
 * Both the label and the set of statuses come from the shared contract, so a new
 * status added in the backend shows up here as a real label rather than a raw
 * enum string.
 */
export function ApplicationStatusBadge({
  status,
}: {
  status: OrganizationApplicationStatus;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        TONE[status] ?? TONE[OrganizationApplicationStatus.DRAFT]
      }`}
    >
      {ORGANIZATION_APPLICATION_STATUS_LABELS[status] ?? status}
    </span>
  );
}
