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

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center bg-black/50 px-4 sm:items-center">
      <div className="w-full max-w-md rounded-t-3xl bg-white p-6 shadow-2xl dark:bg-neutral-900 sm:rounded-3xl">

        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold">
              Join this challenge
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              Choose how you would like to contribute.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="text-xl text-neutral-500"
          >
            ×
          </button>
        </div>

        {/* PARTICIPATION TYPE */}

        <div className="mt-6">
          <p className="text-sm font-semibold">
            Participate as
          </p>

          <div className="mt-3 grid grid-cols-2 gap-3">

            <button
              type="button"
              onClick={() =>
                setParticipantType("individual")
              }
              className={`rounded-2xl border p-4 text-left transition ${
                participantType === "individual"
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30"
                  : "border-neutral-200 dark:border-neutral-700"
              }`}
            >
              <p className="font-semibold">
                Individual
              </p>

              <p className="mt-1 text-xs text-neutral-500">
                Participate personally
              </p>
            </button>

            <button
              type="button"
              disabled={!hasOrganization}
              onClick={() =>
                setParticipantType("organization")
              }
              className={`rounded-2xl border p-4 text-left transition ${
                participantType === "organization"
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30"
                  : "border-neutral-200 dark:border-neutral-700"
              } ${
                !hasOrganization
                  ? "cursor-not-allowed opacity-40"
                  : ""
              }`}
            >
              <p className="font-semibold">
                Organization
              </p>

              <p className="mt-1 text-xs text-neutral-500">
                Participate as your organization
              </p>
            </button>

          </div>

          {!hasOrganization && (
            <p className="mt-2 text-xs text-neutral-500">
              You are not currently associated with an organization.
            </p>
          )}
        </div>

        {/* ROLE */}

        <div className="mt-6">
          <p className="text-sm font-semibold">
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
                onClick={() => setRole(item.value)}
                className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                  role === item.value
                    ? "border-emerald-500 bg-emerald-50 font-semibold dark:bg-emerald-950/30"
                    : "border-neutral-200 dark:border-neutral-700"
                }`}
              >
                {item.label}
              </button>
            ))}

          </div>
        </div>

        {/* MESSAGE */}

        <div className="mt-6">
          <label className="text-sm font-semibold">
            Message
            <span className="ml-1 font-normal text-neutral-500">
              (optional)
            </span>
          </label>

          <textarea
            value={message}
            onChange={(event) =>
              setMessage(event.target.value)
            }
            placeholder="Tell them briefly how you can contribute..."
            rows={3}
            className="mt-2 w-full resize-none rounded-xl border border-neutral-200 bg-transparent px-4 py-3 text-sm outline-none focus:border-emerald-500 dark:border-neutral-700"
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