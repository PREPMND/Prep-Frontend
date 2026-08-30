import { useParams } from "react-router-dom";

import {
  useLeaveOrganization,
  useMyMemberships,
  useOrganization,
  useRequestToJoinOrganization,
} from "../hooks/useOrganization";
import {
  ORGANIZATION_MEMBERSHIP_STATUSES,
} from "../types/organization";
import { OrganizationMembers } from "../components/organizationMembers";

export default function OrganizationDetailPage() {
  const { id } = useParams<{ id: string }>();

  const {
    data: organization,
    isLoading,
  } = useOrganization(id);

  const { data: memberships = [] } = useMyMemberships();

  const joinMutation = useRequestToJoinOrganization(id ?? "");
  const leaveMutation = useLeaveOrganization(id ?? "");

  const membership = memberships.find(
    (item) => item.organizationId === id,
  );

  function handleJoin() {
    if (!id) return;
    joinMutation.mutate({});
  }

  function handleLeave() {
    if (!id) return;
    leaveMutation.mutate();
  }

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-10">
        <p className="text-sm light:text-neutral-500 dark:text-neutral-400">
          Loading organization...
        </p>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-10">
        <p className="text-sm light:text-neutral-500 dark:text-neutral-400">
          Organization not found.
        </p>
      </div>
    );
  }

  const isPending =
    membership?.status === ORGANIZATION_MEMBERSHIP_STATUSES.PENDING;

  const isActive =
    membership?.status === ORGANIZATION_MEMBERSHIP_STATUSES.ACTIVE;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <div className="rounded-2xl border p-6 light:border-neutral-200 light:bg-white dark:border-neutral-800 dark:bg-[#181a1f] sm:p-8">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl light:bg-neutral-100 dark:bg-neutral-800">
              <span className="text-2xl font-semibold">
                {organization.name.charAt(0).toUpperCase()}
              </span>
            </div>

            <div>
              <h1 className="text-2xl font-semibold light:text-neutral-900 dark:text-white">
                {organization.name}
              </h1>

              <p className="mt-1 text-sm light:text-neutral-500 dark:text-neutral-400">
                {organization.type
                  .replaceAll("_", " ")
                  .replace(/\b\w/g, (letter) => letter.toUpperCase())}
              </p>
            </div>
            
          </div>

          {!membership && (
            <button
              type="button"
              onClick={handleJoin}
              disabled={joinMutation.isPending}
              className="shrink-0 rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50 dark:bg-white dark:text-neutral-900"
            >
              {joinMutation.isPending
                ? "Requesting..."
                : "Request to join"}
            </button>
          )}

          {isPending && (
            <span className="shrink-0 rounded-xl px-4 py-2.5 text-sm light:bg-neutral-100 light:text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
              Request pending
            </span>
          )}

          {isActive && (
            <span className="shrink-0 rounded-xl px-4 py-2.5 text-sm light:bg-neutral-100 light:text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
              Member
            </span>
          )}
        </div>

        {organization.description && (
          <div className="mt-8 border-t pt-6 light:border-neutral-200 dark:border-neutral-800">
            <h2 className="font-medium light:text-neutral-900 dark:text-white">
              About
            </h2>

            <p className="mt-3 whitespace-pre-wrap text-sm leading-6 light:text-neutral-600 dark:text-neutral-400">
              {organization.description}
            </p>
          </div>
        )}

        {(organization.officialEmail || organization.website) && (
          <div className="mt-8 border-t pt-6 light:border-neutral-200 dark:border-neutral-800">
            <h2 className="font-medium light:text-neutral-900 dark:text-white">
              Contact
            </h2>

            <div className="mt-3 space-y-2 text-sm">
              {organization.officialEmail && (
                <p className="light:text-neutral-600 dark:text-neutral-400">
                  {organization.officialEmail}
                </p>
              )}

              {organization.website && (
                <a
                  href={organization.website}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4 light:text-neutral-700 dark:text-neutral-300"
                >
                  Visit website
                </a>
              )}
            </div>
          </div>
        )}
        <OrganizationMembers organizationId={organization.id} />

        {isActive && (
          <div className="mt-8 border-t pt-6 light:border-neutral-200 dark:border-neutral-800">
            <button
              type="button"
              onClick={handleLeave}
              disabled={leaveMutation.isPending}
              className="text-sm font-medium text-red-600 disabled:opacity-50 dark:text-red-400"
            >
              {leaveMutation.isPending
                ? "Leaving..."
                : "Leave organization"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}