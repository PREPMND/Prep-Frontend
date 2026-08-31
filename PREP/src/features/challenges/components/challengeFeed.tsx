import { useChallenges } from "../hooks/useChallenges";

export function ChallengeFeed() {
  const { data: challenges, isLoading } = useChallenges();

  if (isLoading) {
    return <div>Loading challenges...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {challenges?.map((challenge) => (
        <article
          key={challenge.id}
          className="h-[] rounded-xl border border-neutral-200 light:bg-white p-5
            text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
        >
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {challenge.category?.replaceAll("_", " ")}
          </p>

          <h2 className="mt-2 font-semibold text-neutral-900 dark:text-white">
            {challenge.title}
          </h2>

          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            {challenge.description}
          </p>

          {challenge.location && (
            <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
              {challenge.location}
            </p>
          )}
        </article>
      ))}
    </div>
  );
}