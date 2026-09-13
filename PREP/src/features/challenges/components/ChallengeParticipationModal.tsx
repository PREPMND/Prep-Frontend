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
  onSubmit: (payload: CreateChallengeParticipationPayload) => void;
}

export default function ChallengeParticipationModal({
  isOpen,
  isSubmitting,
  hasOrganization,
  onClose,
  onSubmit,
}: ChallengeParticipationModalProps) {
  const [participantType, setParticipantType] = useState<"individual" | "organization">("individual");

  const [role, setRole] = useState<ChallengeParticipationRole>(
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

  const roles = [
    {
      value: ChallengeParticipationRoleConst.SOLUTION_DEVELOPMENT,
      label: "Solution Development",
    },
    {
      value: ChallengeParticipationRoleConst.FUNDING,
      label: "Funding",
    },
    {
      value: ChallengeParticipationRoleConst.IMPLEMENTATION,
      label: "Implementation",
    },
    {
      value: ChallengeParticipationRoleConst.EXPERTISE,
      label: "Expertise",
    },
    {
      value: ChallengeParticipationRoleConst.VALIDATION,
      label: "Validation",
    },
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[90] overflow-y-auto bg-black/50 light:bg-black/50 dark:bg-black/70 scrollbar-thumb-amber-400"
    >
      <div className="flex min-h-full items-end justify-center px-4 py-4 sm:items-center sm:py-8">
        <div
          onClick={(event) => event.stopPropagation()}
          className="w-full max-w-md max-h-[calc(100vh-2rem)] overflow-y-auto rounded-3xl light:bg-white dark:bg-neutral-900 light:text-neutral-900 dark:text-neutral-100 shadow-2xl sm:max-h-[calc(100vh-4rem)]"
        >
          <div className="p-6">

            {/* HEADER */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold">Join this challenge</h2>

                <p className="mt-1 text-sm light:text-neutral-500 dark:text-neutral-400">
                  Choose how you would like to contribute.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex h-8 w-8 items-center justify-center rounded-full text-xl transition light:text-neutral-500 light:hover:bg-neutral-100 light:hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                ×
              </button>
            </div>

            {/* PARTICIPATION TYPE */}
            <div className="mt-6">
              <p className="text-sm font-semibold">Participate as</p>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setParticipantType("individual")}
                  className={`rounded-2xl border p-4 text-left transition ${
                    participantType === "individual"
                      ? "border-emerald-500 light:bg-emerald-50 dark:bg-emerald-950/40"
                      : "light:border-neutral-200 light:bg-white light:hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                  }`}
                >
                  <p className="font-semibold">Individual</p>

                  <p className="mt-1 text-xs light:text-neutral-500 dark:text-neutral-400">
                    Participate personally
                  </p>
                </button>

                <button
                  type="button"
                  disabled={!hasOrganization}
                  onClick={() => setParticipantType("organization")}
                  className={`rounded-2xl border p-4 text-left transition ${
                    participantType === "organization"
                      ? "border-emerald-500 light:bg-emerald-50 dark:bg-emerald-950/40"
                      : "light:border-neutral-200 light:bg-white light:hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                  } ${!hasOrganization ? "cursor-not-allowed opacity-40" : ""}`}
                >
                  <p className="font-semibold">Organization</p>

                  <p className="mt-1 text-xs light:text-neutral-500 dark:text-neutral-400">
                    Participate as your organization
                  </p>
                </button>
              </div>

              {!hasOrganization && (
                <p className="mt-2 text-xs light:text-neutral-500 dark:text-neutral-400">
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
                {roles.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setRole(item.value)}
                    className={`rounded-xl border font-[400]! px-4 py-[10px] rounded-2xl! text-left text-[16px]! transition ${
                      role === item.value
                        ? "border-emerald-500 font-[600] light:bg-emerald-50 dark:bg-emerald-950/40"
                        : "light:border-neutral-200 light:bg-white light:hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* MESSAGE */}
            <div className="mt-6 ">
              <label className="text-sm  font-semibold">
                Message

                <span className="ml-1 font-normal light:text-neutral-500 dark:text-neutral-400">
                  (optional)
                </span>
              </label>

              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Tell them briefly how you can contribute..."
                rows={3}
                className="mt-2 min-h-36 max-h-64 w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none transition light:border-neutral-200 light:bg-white light:text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white focus:border-emerald-500"
              />
            </div>

            {/* SUBMIT */}
            <div className="w-full flex justify-center mx-auto mt-2">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  className="mt-6 w-[70%] rounded-3xl! font-semibold! bg-emerald-500 px-4 py-3  text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Joining..." : "Request to Join"}
                </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}