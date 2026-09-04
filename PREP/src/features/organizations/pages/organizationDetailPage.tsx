import { useParams } from "react-router-dom";

import {
  useLeaveOrganization,
  useMyMemberships,
  useOrganization,
  useRequestToJoinOrganization,
} from "../hooks/useOrganization";
import {
  ORGANIZATION_MEMBERSHIP_STATUSES,
  type OrganizationMemberRole,
} from "../types/organization";
import { OrganizationMembers } from "../components/organizationMembers";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "../../common/toastProvider";
export default function OrganizationDetailPage() {
  const { id } = useParams<{ id: string }>();

  const {
    data: organization,
    isLoading,
  } = useOrganization(id);

  const { data: memberships = [] } = useMyMemberships();

  const joinMutation = useRequestToJoinOrganization(id ?? "");
  const leaveMutation = useLeaveOrganization(id ?? "");
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [joinRole, setJoinRole] =
    useState<OrganizationMemberRole>("student");
  const [joinMessage, setJoinMessage] = useState("");

  const { showToast } = useToast();
  const membership = memberships.find(
    (item) => item.organizationId === id,
  );

  function handleJoin() {
    setIsJoinOpen(true);
  }

  function submitJoinRequest() {
    if (!id) return;

    joinMutation.mutate(
      {
        role: joinRole,
        message: joinMessage.trim() || undefined,
      },
      {
        onSuccess: () => {
          setIsJoinOpen(false);
          setJoinMessage("");
          showToast("Membership request sent");
        },
        onError: () => {
          showToast("Failed to send membership request");
        },
      },
    );
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
      <div className="rounded-2xl border p-6 text-white light:border-neutral-200 light:bg-white dark:border-neutral-900 dark:bg-[#181a1f] sm:p-8">
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
              className="shrink-0 rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50 light:dark:bg-white dark:text-neutral-900"
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
          <div className="mt-8 border-t pt-6 light:border-pink-200 dark:border-pink-800">
            <button
              type="button"
              onClick={handleLeave}
              disabled={leaveMutation.isPending}
              className="text-sm font-medium px-3 flex justify-center mx-auto bg-neutral-800 py-2 hover:bg-pink-100 hover:text-red-800 transition-all duration-300 ease-in-out rounded-lg!  light:text-red-600 border border-red-500! disabled:opacity-50 dark:text-red-400"
            >
              {leaveMutation.isPending
                ? "Leaving..."
                : "Leave organization"}
            </button>
          </div>
        )}
      </div>
      {isJoinOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-950">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
              Request to join
            </h2>

            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              Tell the organization how you want to participate.
            </p>

            <div className="mt-6">
              <label className="text-sm font-medium text-neutral-900 dark:text-white">
                Join as
              </label>

              <select
                value={joinRole}
                onChange={(event) =>
                  setJoinRole(
                    event.target.value as OrganizationMemberRole,
                  )
                }
                className="mt-2 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2.5 text-sm dark:border-neutral-700 dark:bg-neutral-900"
              >
                <option value="student">Student</option>
                <option value="researcher">Researcher</option>
                <option value="faculty">Faculty</option>
                <option value="university_admin">University Admin</option>
                <option value="institutional_admin">Institutional Admin</option>
                <option value="industry_member">Industry Member</option>
                <option value="industry_mentor">Industry Mentor</option>
                <option value="industry_admin">Industry Admin</option>
                <option value="ngo_member">NGO Member</option>
                <option value="ngo_admin">NGO Admin</option>
                <option value="community_member">Community Member</option>
                <option value="volunteer">Volunteer</option>
                <option value="expert">Expert</option>
                <option value="mentor">Mentor</option>
                <option value="solution_reviewer">Solution Reviewer</option>
                <option value="evaluator">Evaluator</option>
                <option value="officer">Officer</option>
                <option value="department_officer">Department Officer</option>
                <option value="field_officer">Field Officer</option>
                <option value="government_reviewer">Government Reviewer</option>
                <option value="project_lead">Project Lead</option>
                <option value="event_manager">Event Manager</option>
                <option value="member">Member</option>
              </select>
            </div>

            <div className="mt-5">
              <label className="text-sm font-medium text-neutral-900 dark:text-white">
                Message
              </label>

              <textarea
                value={joinMessage}
                onChange={(event) => setJoinMessage(event.target.value)}
                placeholder="Why do you want to join?"
                rows={4}
                className="mt-2 w-full resize-none rounded-xl border border-neutral-300 bg-white px-3 py-3 text-sm dark:border-neutral-700 dark:bg-neutral-900"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsJoinOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={submitJoinRequest}
                disabled={joinMutation.isPending}
                className="rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50 light:dark:bg-white dark:text-neutral-900"
              >
                {joinMutation.isPending ? "Sending..." : "Send request"}
              </button>
            </div>
          </div>
        </div>
        {isJoinOpen && (
        <Link
          to={`/organizations/${organization.id}/membership-requests`}
          className="..."
        >
          Manage membership requests
        </Link>
      )}
      )}

    </div>
  );
}