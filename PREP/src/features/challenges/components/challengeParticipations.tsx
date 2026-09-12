import {
  ChallengeParticipationStatusConst,
  type ChallengeParticipation,
} from "../types/challenge";

interface ChallengeParticipationsProps {
  participations: ChallengeParticipation[];
  isLoading: boolean;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  isUpdating: boolean;
}

export default function ChallengeParticipations({
  participations,
  isLoading,
  onAccept,
  onReject,
  isUpdating,
}: ChallengeParticipationsProps) {
  if (isLoading) {
    return (
      <div className="mt-8">
        Loading participation requests...
      </div>
    );
  }

  if (!participations.length) {
    return null;
  }

  return (
    <section className="mx-auto mt-10 max-w-4xl">
      <h2 className="text-xl font-bold">
        Participation Requests
      </h2>

      <div className="mt-4 space-y-3">
        {participations.map((participation) => (
          <div
            key={participation.id}
            className="rounded-2xl border p-4 light:border-neutral-200 light:bg-white dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold capitalize">
                  {participation.participantType}
                </p>

                <p className="mt-1 text-sm light:text-neutral-500 dark:text-neutral-400">
                  {participation.role.replaceAll("_", " ")}
                </p>

                {participation.message && (
                  <p className="mt-3 text-sm">
                    {participation.message}
                  </p>
                )}

                <p className="mt-3 text-xs light:text-neutral-500 dark:text-neutral-400">
                  Status: {participation.status}
                </p>
              </div>

              {participation.status ===
                ChallengeParticipationStatusConst.PENDING && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={isUpdating}
                    onClick={() =>
                      onAccept(participation.id)
                    }
                    className="rounded-xl bg-emerald-500 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-600 disabled:opacity-60"
                  >
                    Approve
                  </button>

                  <button
                    type="button"
                    disabled={isUpdating}
                    onClick={() =>
                      onReject(participation.id)
                    }
                    className="rounded-xl bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-60"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}