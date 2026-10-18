import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ORGANIZATION_APPLICATION_STATUS_LABELS,
  OrganizationApplicationStatus,
} from "../../../contracts/organizations/organization-application-status.enum";

import { ApplicationStatusBadge } from "../components/applicationStatusBadge";
import { OrganizationApplicationForm } from "../components/organizationApplicationForm";
import {
  useApplicationActions,
  useMyApplication,
  useMyApplicationTimeline,
  useUpdateApplication,
} from "../hooks/useOrganizationApplications";
import { describeApiError } from "../utils/apiError";

/**
 * One of the applicant's applications: edit it, submit it, see where it stands.
 *
 * Which actions appear is driven by `availableActions`, which the server derives
 * from the shared transition table. The UI therefore cannot offer a button the
 * backend would refuse, and a new transition does not need a change here.
 */
export default function ApplicationDetailPage() {
  const { applicationId } = useParams<{ applicationId: string }>();

  const { data, isLoading, isError, error } = useMyApplication(applicationId);
  const timeline = useMyApplicationTimeline(applicationId);
  const updateApplication = useUpdateApplication(applicationId ?? "");
  const actions = useApplicationActions(applicationId ?? "");

  const [confirming, setConfirming] =
    useState<null | "submit" | "withdraw">(null);

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-10" aria-busy="true">
        <div className="h-8 w-64 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="mt-6 h-72 animate-pulse rounded-2xl bg-neutral-100 dark:bg-neutral-900" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 px-4 py-6 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300"
        >
          {describeApiError(error)}
        </div>
        <Link
          to="/organization-applications"
          className="mt-4 inline-block text-sm font-medium hover:underline"
        >
          Back to my applications
        </Link>
      </div>
    );
  }

  const canSubmit = data.availableActions.includes(
    OrganizationApplicationStatus.SUBMITTED,
  );
  const canWithdraw = data.availableActions.includes(
    OrganizationApplicationStatus.WITHDRAWN,
  );
  const canReopen = data.availableActions.includes(
    OrganizationApplicationStatus.DRAFT,
  );

  const actionError =
    actions.submit.isError || actions.withdraw.isError || actions.reopen.isError
      ? describeApiError(
          actions.submit.error ??
            actions.withdraw.error ??
            actions.reopen.error,
        )
      : updateApplication.isError
        ? describeApiError(updateApplication.error)
        : null;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <Link
        to="/organization-applications"
        className="text-sm text-neutral-500 hover:underline dark:text-neutral-400"
      >
        &larr; My applications
      </Link>

      <div className="mt-4 mb-8 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">
            {data.organizationName}
          </h1>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            {data.submissionCount === 0
              ? "Not submitted yet."
              : `Submitted ${data.submissionCount} time${
                  data.submissionCount === 1 ? "" : "s"
                }.`}
          </p>
        </div>
        <ApplicationStatusBadge status={data.status} />
      </div>

      {data.status === OrganizationApplicationStatus.NEEDS_INFORMATION &&
      data.informationRequest ? (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-200">
          <p className="font-medium">A reviewer has asked for more</p>
          <p className="mt-1">{data.informationRequest}</p>
          <p className="mt-2 text-xs">
            Update the form below, then submit again.
          </p>
        </div>
      ) : null}

      {data.decisionReason ? (
        <div className="mb-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
          <p className="font-medium">
            Decision: {ORGANIZATION_APPLICATION_STATUS_LABELS[data.status]}
          </p>
          <p className="mt-1">{data.decisionReason}</p>
        </div>
      ) : null}

      {data.status === OrganizationApplicationStatus.APPROVED &&
      data.organizationId ? (
        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
          <p className="font-medium">Approved</p>
          <p className="mt-1">
            Your organization is on PREP and you are its administrator.
          </p>
          <Link
            to={`/organizations/${data.organizationId}`}
            className="mt-2 inline-block font-medium hover:underline"
          >
            Open your organization
          </Link>
        </div>
      ) : null}

      {actionError ? (
        <div
          role="alert"
          className="mb-6 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300"
        >
          {actionError}
        </div>
      ) : null}

      <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-[#181a1f]">
        {!data.editable ? (
          <p className="mb-5 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
            This application is {ORGANIZATION_APPLICATION_STATUS_LABELS[
              data.status
            ].toLowerCase()}{" "}
            and cannot be edited right now.
          </p>
        ) : null}

        <OrganizationApplicationForm
          initial={data}
          submitLabel="Save changes"
          pending={updateApplication.isPending}
          disabled={!data.editable}
          onSubmit={(payload) => updateApplication.mutate(payload)}
          secondaryAction={
            <div className="flex flex-wrap gap-3">
              {canSubmit ? (
                <button
                  type="button"
                  onClick={() => setConfirming("submit")}
                  disabled={actions.submit.isPending}
                  className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 disabled:opacity-60 dark:border-neutral-700 dark:text-neutral-200"
                >
                  {actions.submit.isPending
                    ? "Submitting..."
                    : "Submit for review"}
                </button>
              ) : null}

              {canWithdraw ? (
                <button
                  type="button"
                  onClick={() => setConfirming("withdraw")}
                  disabled={actions.withdraw.isPending}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-500 hover:text-neutral-800 disabled:opacity-60 dark:text-neutral-400 dark:hover:text-neutral-200"
                >
                  Withdraw
                </button>
              ) : null}

              {canReopen ? (
                <button
                  type="button"
                  onClick={() => actions.reopen.mutate()}
                  disabled={actions.reopen.isPending}
                  className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium disabled:opacity-60 dark:border-neutral-700"
                >
                  Reopen as draft
                </button>
              ) : null}
            </div>
          }
        />
      </div>

      {/* Confirmation for the two consequential applicant actions. */}
      {confirming ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        >
          <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-[#181a1f]">
            <h2
              id="confirm-title"
              className="text-base font-semibold text-neutral-900 dark:text-white"
            >
              {confirming === "submit"
                ? "Submit for review?"
                : "Withdraw this application?"}
            </h2>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              {confirming === "submit"
                ? "A reviewer will look at it. You will not be able to edit it while it is in review."
                : "You can reopen it as a draft later."}
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirming(null)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirming === "submit") {
                    actions.submit.mutate();
                  } else {
                    actions.withdraw.mutate();
                  }
                  setConfirming(null);
                }}
                className="rounded-lg bg-neutral-900 px-3 py-2 text-sm font-medium text-white dark:bg-white dark:text-neutral-900"
              >
                {confirming === "submit" ? "Submit" : "Withdraw"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold text-neutral-800 dark:text-neutral-200">
          History
        </h2>
        {timeline.isLoading ? (
          <div className="h-16 animate-pulse rounded-xl bg-neutral-100 dark:bg-neutral-900" />
        ) : timeline.data && timeline.data.length > 0 ? (
          <ol className="space-y-2">
            {timeline.data.map((event) => (
              <li
                key={event.id}
                className="flex items-center justify-between rounded-xl border border-neutral-200 px-3 py-2 text-xs dark:border-neutral-800"
              >
                <span className="text-neutral-700 dark:text-neutral-300">
                  {event.action.replace("organization_application.", "")}
                  {event.toStatus ? ` -> ${event.toStatus}` : ""}
                </span>
                <span className="text-neutral-400">
                  {new Date(event.createdAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Nothing yet.
          </p>
        )}
      </section>
    </div>
  );
}
