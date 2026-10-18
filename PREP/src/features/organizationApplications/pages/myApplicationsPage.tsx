import { Link } from "react-router-dom";

import { ApplicationStatusBadge } from "../components/applicationStatusBadge";
import { useMyApplications } from "../hooks/useOrganizationApplications";
import { describeApiError } from "../utils/apiError";
import { ORGANIZATION_TYPE_LABELS } from "../../../contracts/organizations/organization-type.enum";
import { OrganizationApplicationStatus } from "../../../contracts/organizations/organization-application-status.enum";

/** The applicant's own applications, with status and anything awaiting them. */
export default function MyApplicationsPage() {
  const { data, isLoading, isError, error } = useMyApplications();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">
            My organization applications
          </h1>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            Track where each application stands and respond to anything a
            reviewer has asked for.
          </p>
        </div>
        <Link
          to="/organization-applications/new"
          className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-neutral-900"
        >
          New application
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-3" aria-busy="true" aria-live="polite">
          {[0, 1, 2].map((row) => (
            <div
              key={row}
              className="h-24 animate-pulse rounded-2xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900"
            />
          ))}
        </div>
      ) : isError ? (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 px-4 py-6 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300"
        >
          {describeApiError(error)}
        </div>
      ) : !data || data.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 px-4 py-12 text-center dark:border-neutral-700">
          <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
            No applications yet
          </p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-400">
            Register your organization to request participation in challenges
            and collaborate on solutions.
          </p>
          <Link
            to="/organization-applications/new"
            className="mt-5 inline-block rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-neutral-900"
          >
            Start an application
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {data.map((application) => (
            <li
              key={application.id}
              className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-[#181a1f]"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <Link
                    to={`/organization-applications/${application.id}`}
                    className="truncate text-base font-medium text-neutral-900 hover:underline dark:text-white"
                  >
                    {application.organizationName}
                  </Link>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    {ORGANIZATION_TYPE_LABELS[application.organizationType] ??
                      application.organizationType}
                    {application.lastSubmittedAt
                      ? ` -- submitted ${new Date(
                          application.lastSubmittedAt,
                        ).toLocaleDateString()}`
                      : " -- not submitted"}
                  </p>
                </div>
                <ApplicationStatusBadge status={application.status} />
              </div>

              {application.status ===
              OrganizationApplicationStatus.NEEDS_INFORMATION ? (
                <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-200">
                  <span className="font-medium">A reviewer needs more: </span>
                  {application.informationRequest}
                </div>
              ) : null}

              {application.status === OrganizationApplicationStatus.REJECTED &&
              application.decisionReason ? (
                <div className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
                  <span className="font-medium">Decision: </span>
                  {application.decisionReason}
                </div>
              ) : null}

              {application.status === OrganizationApplicationStatus.APPROVED &&
              application.organizationId ? (
                <Link
                  to={`/organizations/${application.organizationId}`}
                  className="mt-4 inline-block text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400"
                >
                  Open your organization
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
