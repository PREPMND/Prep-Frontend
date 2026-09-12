import { useState } from "react";

import {
  type ChallengeParticipationRole,
  ChallengeParticipationRoleConst,
  type CreateChallengeParticipationPayload,
} from "../types/challenge";

interface ChallengeParticipationModalProps {
  isOpen: boolean;
  isSubmitting: boolean;
  hasOrganization: boolean;
  onClose: () => void;
  onSubmit: (
    payload: CreateChallengeParticipationPayload,
  ) => void;
}

export default function ChallengeParticipationModal({
  isOpen,
  isSubmitting,
  hasOrganization,
  onClose,
  onSubmit,
}: ChallengeParticipationModalProps) {
  const [participantType, setParticipantType] =
    useState<"individual" | "organization">(
      "individual",
    );

  const [role, setRole] =
    useState<ChallengeParticipationRole>(
      ChallengeParticipationRoleConst.SOLUTION_DEVELOPMENT,
    );

  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  function handleSubmit() {
    onSubmit({
      participantType,
      role,
      message: message.trim() || undefined,
    });
  }

  function handleBackdropClick() {
    if (!isSubmitting) {
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-black/50 px-4 py-4 sm:items-center"
      onClick={handleBackdropClick}
    >
      <div
        className="w-full max-w-md rounded-t-3xl light:bg-white p-6 shadow-2xl dark:bg-neutral-900 sm:rounded-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold light:text-neutral-900 dark:text-white">
              Join this challenge
            </h2>

            <p className="mt-1 text-sm light:text-neutral-500 dark:text-neutral-400">
              Choose how you would like to contribute.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="text-xl light:text-neutral-500 dark:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ×
          </button>
        </div>

        {/* PARTICIPATION TYPE */}
        <div className="mt-6">
          <p className="text-sm font-semibold light:text-neutral-900 dark:text-white">
            Participate as
          </p>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() =>
                setParticipantType("individual")
              }
              disabled={isSubmitting}
              className={`rounded-2xl border p-4 text-left transition ${
                participantType === "individual"
                  ? "border-emerald-500 light:bg-emerald-50 dark:bg-emerald-950/30"
                  : "light:border-neutral-200 light:bg-white dark:border-neutral-700 dark:bg-neutral-900"
              }`}
            >
              <p className="font-semibold light:text-neutral-900 dark:text-white">
                Individual
              </p>

              <p className="mt-1 text-xs light:text-neutral-500 dark:text-neutral-400">
                Participate personally
              </p>
            </button>

            <button
              type="button"
              disabled={
                !hasOrganization || isSubmitting
              }
              onClick={() =>
                setParticipantType("organization")
              }
              className={`rounded-2xl border p-4 text-left transition ${
                participantType === "organization"
                  ? "border-emerald-500 light:bg-emerald-50 dark:bg-emerald-950/30"
                  : "light:border-neutral-200 light:bg-white dark:border-neutral-700 dark:bg-neutral-900"
              } ${
                !hasOrganization
                  ? "cursor-not-allowed opacity-40"
                  : ""
              }`}
            >
              <p className="font-semibold light:text-neutral-900 dark:text-white">
                Organization
              </p>

              <p className="mt-1 text-xs light:text-neutral-500 dark:text-neutral-400">
                Participate as your organization
              </p>
            </button>
          </div>

          {!hasOrganization && (
            <p className="mt-2 text-xs light:text-neutral-500 dark:text-neutral-400">
              You are not currently associated with an
              organization.
            </p>
          )}
        </div>

        {/* ROLE */}
        <div className="mt-6">
          <p className="text-sm font-semibold light:text-neutral-900 dark:text-white">
            How do you want to contribute?
          </p>

          <div className="mt-3 grid gap-2">
            {[
              {
                value:
                  ChallengeParticipationRoleConst.SOLUTION_DEVELOPMENT,
                label: "Solution Development",
              },
              {
                value:
                  ChallengeParticipationRoleConst.FUNDING,
                label: "Funding",
              },
              {
                value:
                  ChallengeParticipationRoleConst.IMPLEMENTATION,
                label: "Implementation",
              },
              {
                value:
                  ChallengeParticipationRoleConst.EXPERTISE,
                label: "Expertise",
              },
              {
                value:
                  ChallengeParticipationRoleConst.VALIDATION,
                label: "Validation",
              },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                disabled={isSubmitting}
                onClick={() => setRole(item.value)}
                className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                  role === item.value
                    ? "border-emerald-500 light:bg-emerald-50 font-semibold dark:bg-emerald-950/30"
                    : "light:border-neutral-200 light:bg-white dark:border-neutral-700 dark:bg-neutral-900"
                } disabled:cursor-not-allowed disabled:opacity-60`}
              >
                <span className="light:text-neutral-900 dark:text-white">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* MESSAGE */}
        <div className="mt-6">
          <label className="text-sm font-semibold light:text-neutral-900 dark:text-white">
            Message

            <span className="ml-1 font-normal light:text-neutral-500 dark:text-neutral-400">
              (optional)
            </span>
          </label>

          <textarea
            value={message}
            disabled={isSubmitting}
            onChange={(event) =>
              setMessage(event.target.value)
            }
            placeholder="Tell them briefly how you can contribute..."
            rows={3}
            className="mt-2 w-full resize-none rounded-xl border light:border-neutral-200 light:bg-transparent light:text-neutral-900 px-4 py-3 text-sm outline-none focus:border-emerald-500 dark:border-neutral-700 dark:bg-transparent dark:text-white disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        {/* SUBMIT */}
        <button
          type="button"
          disabled={isSubmitting}
          onClick={handleSubmit}
          className="mt-6 w-full rounded-2xl bg-emerald-500 px-4 py-3 font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? "Joining..."
            : "Request to Join"}
        </button>
      </div>
    </div>
  );
}