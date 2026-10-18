import { useState } from "react";

import {
  ORGANIZATION_APPLICATION_STATUS_LABELS,
  OrganizationApplicationStatus,
} from "../../../contracts/organizations/organization-application-status.enum";
import {
  ORGANIZATION_TYPE_LABELS,
  ORGANIZATION_TYPES,
  OrganizationType,
} from "../../../contracts/organizations/organization-type.enum";

import { ApplicationStatusBadge } from "../components/applicationStatusBadge";
import {
  useApplicationForReview,
  useApplicationNotes,
  useApplicationQueue,
  useApplicationStats,
  useReviewActions,
} from "../hooks/useOrganizationApplications";
import { describeApiError, isPermissionDenied } from "../utils/apiError";

const QUEUE_STATUSES = [
  OrganizationApplicationStatus.SUBMITTED,
  OrganizationApplicationStatus.IN_REVIEW,
  OrganizationApplicationStatus.NEEDS_INFORMATION,
  OrganizationApplicationStatus.APPROVED,
  OrganizationApplicationStatus.REJECTED,
];

type PendingAction = "approve" | "reject" | "request-information" | null;

/**
 * Reviewer queue and decision surface.
 *
 * The counts come from `/admin/organization-applications/stats`, which is a
 * GROUP BY over real rows -- there are no placeholder metrics here. If the
 * caller lacks `organization_application:review` the backend returns 403 and
 * this renders a permission-denied state rather than an empty dashboard.
 */
export default function ApplicationReviewQueuePage() {
  const [status, setStatus] = useState<OrganizationApplicationStatus>(
    OrganizationApplicationStatus.SUBMITTED,
  );
  const [organizationType, setOrganizationType] = useState<
    OrganizationType | ""
  >("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const queue = useApplicationQueue({
    status,
    organizationType: organizationType || undefined,
    search: search.trim() || undefined,
    page,
    limit: 20,
  });

  const stats = useApplicationStats();

  if (queue.isError && isPermissionDenied(queue.error)) {
    return (
      <div className="mx-auto w-full max-w-5xl px-4 py-16 text-center">
        <h1 className="text-xl font-semibold text-neutral-900 dark:text-white">
          You do not have review access
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-neutral-500 dark:text-neutral-400">
          Reviewing organization applications requires the
          <code className="mx-1 rounded bg-neutral-100 px-1 py-0.5 text-xs dark:bg-neutral-800">
            organization_application:review
          </code>
          platform permission. Ask a platform administrator if you need it.
        </p>
      </div>
    );
  }

  const totalPages = queue.data
    ? Math.max(1, Math.ceil(queue.data.total / queue.data.limit))
    : 1;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">
        Organization applications
      </h1>
      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
        Review submissions, ask for what is missing, and decide.
      </p>

      {/* Real counts, grouped by status in the database. */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {QUEUE_STATUSES.map((queueStatus) => (
          <button
            key={queueStatus}
            type="button"
            onClick={() => {
              setStatus(queueStatus);
              setPage(1);
              setSelectedId(null);
            }}
            aria-pressed={status === queueStatus}
            className={`rounded-xl border px-3 py-3 text-left ${
              status === queueStatus
                ? "border-neutral-900 dark:border-white"
                : "border-neutral-200 dark:border-neutral-800"
            }`}
          >
            <span className="block text-xs text-neutral-500 dark:text-neutral-400">
              {ORGANIZATION_APPLICATION_STATUS_LABELS[queueStatus]}
            </span>
            <span className="mt-1 block text-lg font-semibold text-neutral-900 dark:text-white">
              {stats.isLoading ? "--" : (stats.data?.[queueStatus] ?? 0)}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <input
          aria-label="Search by organization name"
          placeholder="Search organization name"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          className="min-w-56 flex-1 rounded-lg border border-neutral-200 px-3 py-2 text-sm dark:border-neutral-800 dark:bg-[#111317]"
        />
        <select
          aria-label="Filter by organization type"
          value={organizationType}
          onChange={(event) => {
            setOrganizationType(event.target.value as OrganizationType | "");
            setPage(1);
          }}
          className="rounded-lg border border-neutral-200 px-3 py-2 text-sm dark:border-neutral-800 dark:bg-[#111317]"
        >
          <option value="">All types</option>
          {ORGANIZATION_TYPES.map((type) => (
            <option key={type} value={type}>
              {ORGANIZATION_TYPE_LABELS[type]}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div>
          {queue.isLoading ? (
            <div className="space-y-3" aria-busy="true">
              {[0, 1, 2, 3].map((row) => (
                <div
                  key={row}
                  className="h-20 animate-pulse rounded-xl bg-neutral-100 dark:bg-neutral-900"
                />
              ))}
            </div>
          ) : queue.isError ? (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-6 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300"
            >
              {describeApiError(queue.error)}
            </div>
          ) : !queue.data || queue.data.items.length === 0 ? (
            <div className="rounded-xl border border-dashed border-neutral-300 px-4 py-12 text-center text-sm text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
              Nothing {ORGANIZATION_APPLICATION_STATUS_LABELS[
                status
              ].toLowerCase()} right now.
            </div>
          ) : (
            <>
              <ul className="space-y-3">
                {queue.data.items.map((application) => (
                  <li key={application.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(application.id)}
                      aria-pressed={selectedId === application.id}
                      className={`w-full rounded-xl border px-4 py-3 text-left ${
                        selectedId === application.id
                          ? "border-neutral-900 dark:border-white"
                          : "border-neutral-200 dark:border-neutral-800"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-neutral-900 dark:text-white">
                            {application.organizationName}
                          </p>
                          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                            {ORGANIZATION_TYPE_LABELS[
                              application.organizationType
                            ] ?? application.organizationType}
                            {application.lastSubmittedAt
                              ? ` -- ${new Date(
                                  application.lastSubmittedAt,
                                ).toLocaleDateString()}`
                              : ""}
                          </p>
                        </div>
                        <ApplicationStatusBadge status={application.status} />
                      </div>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex items-center justify-between text-sm">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((current) => current - 1)}
                  className="rounded-lg border border-neutral-200 px-3 py-1.5 disabled:opacity-40 dark:border-neutral-800"
                >
                  Previous
                </button>
                <span className="text-neutral-500 dark:text-neutral-400">
                  Page {queue.data.page} of {totalPages} ({queue.data.total})
                </span>
                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => setPage((current) => current + 1)}
                  className="rounded-lg border border-neutral-200 px-3 py-1.5 disabled:opacity-40 dark:border-neutral-800"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>

        <div>
          {selectedId ? (
            <ApplicationReviewPanel applicationId={selectedId} />
          ) : (
            <div className="rounded-xl border border-dashed border-neutral-300 px-4 py-12 text-center text-sm text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
              Select an application to review it.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** Detail, reviewer-private notes and the decision actions. */
function ApplicationReviewPanel({
  applicationId,
}: {
  applicationId: string;
}) {
  const { data, isLoading, isError, error } =
    useApplicationForReview(applicationId);
  const notes = useApplicationNotes(applicationId);
  const review = useReviewActions(applicationId);

  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");

  if (isLoading) {
    return (
      <div
        className="h-96 animate-pulse rounded-xl bg-neutral-100 dark:bg-neutral-900"
        aria-busy="true"
      />
    );
  }

  if (isError || !data) {
    return (
      <div
        role="alert"
        className="rounded-xl border border-red-200 bg-red-50 px-4 py-6 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300"
      >
        {describeApiError(error)}
      </div>
    );
  }

  const actionError = [
    review.startReview.error,
    review.approve.error,
    review.reject.error,
    review.requestInformation.error,
  ].find(Boolean);

  const canStartReview =
    data.status === OrganizationApplicationStatus.SUBMITTED;
  const canDecide = data.status === OrganizationApplicationStatus.IN_REVIEW;

  const closeDialog = () => {
    setPendingAction(null);
    setReason("");
  };

  return (
    <div className="rounded-xl border border-neutral-200 p-5 dark:border-neutral-800">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-base font-semibold text-neutral-900 dark:text-white">
          {data.organizationName}
        </h2>
        <ApplicationStatusBadge status={data.status} />
      </div>

      <dl className="mt-4 space-y-2 text-sm">
        <Row label="Type">
          {ORGANIZATION_TYPE_LABELS[data.organizationType] ??
            data.organizationType}
        </Row>
        <Row label="Contact">{data.contactPersonName ?? "--"}</Row>
        <Row label="Email">{data.officialEmail ?? "--"}</Row>
        <Row label="Website">{data.website ?? "--"}</Row>
        <Row label="Focus areas">
          {data.focusAreas?.join(", ") || "--"}
        </Row>
        <Row label="Capabilities">
          {data.capabilities?.join(", ") || "--"}
        </Row>
        <Row label="Submissions">{data.submissionCount}</Row>
      </dl>

      {data.description ? (
        <p className="mt-4 whitespace-pre-line text-sm text-neutral-700 dark:text-neutral-300">
          {data.description}
        </p>
      ) : null}

      {data.proposedContribution ? (
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase text-neutral-500">
            Proposed contribution
          </p>
          <p className="mt-1 whitespace-pre-line text-sm text-neutral-700 dark:text-neutral-300">
            {data.proposedContribution}
          </p>
        </div>
      ) : null}

      {data.supportingDocumentMediaIds?.length ? (
        <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
          {data.supportingDocumentMediaIds.length} supporting document
          {data.supportingDocumentMediaIds.length === 1 ? "" : "s"} attached.
          Attaching a document is not itself verification.
        </p>
      ) : null}

      {actionError ? (
        <div
          role="alert"
          className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300"
        >
          {describeApiError(actionError)}
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-2">
        {canStartReview ? (
          <button
            type="button"
            onClick={() => review.startReview.mutate()}
            disabled={review.startReview.isPending}
            className="rounded-lg bg-neutral-900 px-3 py-2 text-sm font-medium text-white disabled:opacity-60 dark:bg-white dark:text-neutral-900"
          >
            {review.startReview.isPending ? "Starting..." : "Start review"}
          </button>
        ) : null}

        {canDecide ? (
          <>
            <button
              type="button"
              onClick={() => setPendingAction("approve")}
              className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white"
            >
              Approve
            </button>
            <button
              type="button"
              onClick={() => setPendingAction("reject")}
              className="rounded-lg border border-red-300 px-3 py-2 text-sm font-medium text-red-700 dark:border-red-800 dark:text-red-400"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={() => setPendingAction("request-information")}
              className="rounded-lg border border-neutral-300 px-3 py-2 text-sm font-medium dark:border-neutral-700"
            >
              Request information
            </button>
          </>
        ) : null}
      </div>

      {!canStartReview && !canDecide ? (
        <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
          No reviewer action is available while this application is{" "}
          {ORGANIZATION_APPLICATION_STATUS_LABELS[data.status].toLowerCase()}.
        </p>
      ) : null}

      {/* Reviewer-private notes. Served only to holders of the review permission. */}
      <section className="mt-6 border-t border-neutral-200 pt-5 dark:border-neutral-800">
        <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
          Internal notes
        </h3>
        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
          Not visible to the applicant.
        </p>

        {notes.data && notes.data.length > 0 ? (
          <ul className="mt-3 space-y-2">
            {notes.data.map((entry) => (
              <li
                key={entry.id}
                className="rounded-lg bg-neutral-50 px-3 py-2 text-sm dark:bg-neutral-900"
              >
                <p className="text-neutral-700 dark:text-neutral-300">
                  {entry.body}
                </p>
                <p className="mt-1 text-xs text-neutral-400">
                  {new Date(entry.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
            No notes yet.
          </p>
        )}

        <div className="mt-3 flex gap-2">
          <input
            aria-label="Add an internal note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Add a note"
            className="flex-1 rounded-lg border border-neutral-200 px-3 py-2 text-sm dark:border-neutral-800 dark:bg-[#111317]"
          />
          <button
            type="button"
            disabled={!note.trim() || review.addNote.isPending}
            onClick={() =>
              review.addNote.mutate(note.trim(), {
                onSuccess: () => setNote(""),
              })
            }
            className="rounded-lg border border-neutral-300 px-3 py-2 text-sm font-medium disabled:opacity-50 dark:border-neutral-700"
          >
            Add
          </button>
        </div>
      </section>

      {/* Consequential actions are confirmed, and carry a reason. */}
      {pendingAction ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="review-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        >
          <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-[#181a1f]">
            <h2
              id="review-dialog-title"
              className="text-base font-semibold text-neutral-900 dark:text-white"
            >
              {pendingAction === "approve"
                ? `Approve ${data.organizationName}?`
                : pendingAction === "reject"
                  ? `Reject ${data.organizationName}?`
                  : "Request more information"}
            </h2>

            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              {pendingAction === "approve"
                ? "This creates the organization as verified and makes the applicant its administrator."
                : pendingAction === "reject"
                  ? "The applicant will see your reason and may resubmit."
                  : "The applicant will see this message and can update their application."}
            </p>

            <label
              htmlFor="review-reason"
              className="mt-4 block text-sm font-medium text-neutral-800 dark:text-neutral-200"
            >
              {pendingAction === "request-information"
                ? "What do you need?"
                : "Reason"}
              {pendingAction === "approve" ? (
                <span className="font-normal"> (optional)</span>
              ) : null}
            </label>
            <textarea
              id="review-reason"
              rows={4}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm dark:border-neutral-800 dark:bg-[#111317]"
            />
            {pendingAction !== "approve" && reason.trim().length < 10 ? (
              <p className="mt-1 text-xs text-neutral-500">
                At least 10 characters.
              </p>
            ) : null}

            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeDialog}
                className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={
                  pendingAction !== "approve" && reason.trim().length < 10
                }
                onClick={() => {
                  if (pendingAction === "approve") {
                    review.approve.mutate(reason.trim() || undefined, {
                      onSuccess: closeDialog,
                    });
                  } else if (pendingAction === "reject") {
                    review.reject.mutate(reason.trim(), {
                      onSuccess: closeDialog,
                    });
                  } else {
                    review.requestInformation.mutate(reason.trim(), {
                      onSuccess: closeDialog,
                    });
                  }
                }}
                className="rounded-lg bg-neutral-900 px-3 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-white dark:text-neutral-900"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <dt className="w-32 shrink-0 text-neutral-500 dark:text-neutral-400">
        {label}
      </dt>
      <dd className="min-w-0 break-words text-neutral-800 dark:text-neutral-200">
        {children}
      </dd>
    </div>
  );
}
