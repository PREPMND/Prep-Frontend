import { useParams } from "react-router-dom";
import { useChallengeDetails } from "../hooks/useChallengeDetails";

export default function ChallengeDetailPage() {
  const { id } = useParams();

  const { data: challenge, isLoading } = useChallengeDetails(id);
  console.log(challenge);
  
  if (isLoading) return <div>Loading...</div>;
  if (!challenge) return <div>Challenge not found.</div>;

  return (
    <main className="app-container py-10">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm text-neutral-500">
          {challenge.category?.replaceAll("_", " ")}
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          {challenge.title}
        </h1>

        <p className="mt-6 text-neutral-700 dark:text-neutral-300">
          {challenge.description}
        </p>

        {challenge.location && (
          <p className="mt-8 text-sm text-neutral-500">
            📍 {challenge.location}
          </p>
        )}
      </div>
    </main>
  );
}