import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getOrganizationById,
  leaveOrganization,
  requestToJoinOrganization,
} from "../services/organization";
import type { Organization } from "../types/organization";

export default function OrganizationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [organization, setOrganization] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function loadOrganization() {
      try {
        const response = await getOrganizationById(id);
        setOrganization(response);
      } finally {
        setIsLoading(false);
      }
    }

    loadOrganization();
  }, [id]);

  async function handleJoin() {
    if (!id) return;

    try {
      setIsJoining(true);
      await requestToJoinOrganization(id, {});
    } finally {
      setIsJoining(false);
    }
  }

  async function handleLeave() {
    if (!id) return;

    try {
      setIsLeaving(true);
      await leaveOrganization(id);
      navigate("/organizations");
    } finally {
      setIsLeaving(false);
    }
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

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <div className="rounded-2xl border light:border-neutral-200 dark:border-neutral-800 light:bg-white dark:bg-[#181a1f] p-6 sm:p-8">
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

          <button
            type="button"
            onClick={handleJoin}
            disabled={isJoining}
            className="shrink-0 rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50 dark:bg-white dark:text-neutral-900"
          >
            {isJoining ? "Requesting..." : "Request to join"}
          </button>
        </div>

        {organization.description && (
          <div className="mt-8 border-t light:border-neutral-200 dark:border-neutral-800 pt-6">
            <h2 className="font-medium light:text-neutral-900 dark:text-white">
              About
            </h2>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-6 light:text-neutral-600 dark:text-neutral-400">
              {organization.description}
            </p>
          </div>
        )}

        {(organization.officialEmail || organization.website) && (
          <div className="mt-8 border-t light:border-neutral-200 dark:border-neutral-800 pt-6">
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
                  className="light:text-neutral-700 dark:text-neutral-300 underline underline-offset-4"
                >
                  Visit website
                </a>
              )}
            </div>
          </div>
        )}

        <div className="mt-8 border-t light:border-neutral-200 dark:border-neutral-800 pt-6">
          <button
            type="button"
            onClick={handleLeave}
            disabled={isLeaving}
            className="text-sm font-medium text-red-600 disabled:opacity-50 dark:text-red-400"
          >
            {isLeaving ? "Leaving..." : "Leave organization"}
          </button>
        </div>
      </div>
    </div>
  );
}