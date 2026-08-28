import type { PossibleDuplicate } from "../types/challenge";

interface SimilarChallengesProps {
  challenges: PossibleDuplicate[];
  onSelectSameIssue: (challengeId: string) => void;
  isLinking?: boolean;
}

export function SimilarChallenges({
  challenges,
  onSelectSameIssue,
  isLinking = false,
}: SimilarChallengesProps) {
  if (!challenges.length) return null;

  return (
    <section className="mt-10 border-t border-neutral-200 pt-8 dark:border-neutral-800">
      <div className="mb-5">
        <p className="text-sm font-medium text-neutral-900 dark:text-white">
          Similar challenges
        </p>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          A similar challenge may already be under review. Is this the same
          issue?
        </p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-3">
        {challenges.map((challenge) => (
          <article
            key={challenge.challengeId}
            className="w-[280px] shrink-0 rounded-xl border border-neutral-200 p-4 dark:border-neutral-800"
          >
            <h3 className="line-clamp-2 font-medium text-neutral-900 dark:text-white">
              {challenge.title}
            </h3>

            <p className="mt-2 line-clamp-3 text-sm text-neutral-500 dark:text-neutral-400">
              {challenge.description}
            </p>

            {challenge.location && (
              <p className="mt-3 text-xs text-neutral-400">
                {challenge.location}
              </p>
            )}

            <button
              type="button"
              disabled={isLinking}
              onClick={() => onSelectSameIssue(challenge.challengeId)}
              className="mt-4 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm font-medium transition-colors hover:bg-neutral-50 disabled:opacity-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
            >
              {isLinking ? "Linking..." : "This is the same issue"}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}