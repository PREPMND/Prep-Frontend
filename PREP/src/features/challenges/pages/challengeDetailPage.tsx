import { useState } from "react";
import { useParams } from "react-router-dom";
import { useChallengeDetails } from "../hooks/useChallengeDetails";
import { useMedia } from "../hooks/useMedia";
export default function ChallengeDetailPage() {
  const { id } = useParams();

  const { data: challenge, isLoading } = useChallengeDetails(id);

  const { data: media = [] } = useMedia(
    challenge?.mediaIds ?? [],
  );

  const [imageLoaded, setImageLoaded] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (!challenge) return <div>Challenge not found.</div>;

  return (
    <main className="app-container py-10">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm text-neutral-500">
          {challenge.category?.replaceAll("_", " ").toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase())}
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          {challenge.title.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase())}
        </h1>

        <p className="mt-6 text-neutral-700 dark:text-neutral-300">
          {challenge.description.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase())}
        </p>

        {challenge.location && (
          <p className="mt-8 text-sm text-neutral-500">
            📍 {challenge.location}
          </p>
        )}
        {media.length > 0 && (
          <div className="mt-1 overflow-x-auto snap-x snap-mandatory scrollbar-hide overflow-y-hidden scrollbar-thin scrollbar-thumb-amber-400">
            <div className="flex">
              {media.map((item) => (
                <div
                key={item.id }
                  className={`h- object-cover w-full shrink-0 overflow-y-hidden rounded-lg light:bg-neutral-200 dark:bg-neutral-800 ${!imageLoaded ? "animate-pulse" : ""
                    }`}
                >
                  <img
                    src={item.url}
                    alt={item.originalName}
                    onLoad={() => setImageLoaded(true)}
                    className="h-40 w-full rounded-lg object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}