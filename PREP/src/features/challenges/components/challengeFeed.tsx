import { Locate, MapPin } from "lucide-react";
import { useChallenges } from "../hooks/useChallenges";
import { useMedia } from "../hooks/useMedia";
import type { Challenge } from "../types/challenge";
import { useState } from "react";

export function ChallengeFeed() {
    const { data: challenges, isLoading } = useChallenges();

    if (isLoading) {
        return <div>Loading challenges...</div>;
    }

    return (
        <div className="grid pt-3 pb-4 px-5 grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {challenges?.map((challenge) => (
                <ChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                />
            ))}
        </div>
    );
}

function ChallengeCard({
    challenge,
}: {
    challenge: Challenge;
}) {
    const { data: media = [] } = useMedia(challenge.mediaIds ?? []);
    const [imageLoaded, setImageLoaded] = useState(false);
    return (
        <article
            className="mt-2 cursor-pointer rounded-xl flex flex-col border border-neutral-200 light:bg-white py-2 px-4
        text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
        >
            <p className="text-xs font-semibold h-[5%] text-neutral-500 dark:text-neutral-200">
                {challenge.category?challenge.category?.replaceAll("_", " ").toUpperCase():'UNCLASSIFIED'}
            </p>

            <h2 className="mt-1 line-clamp-2 h-[16%]  font-semibold text-lg! text-neutral-900 dark:text-white">
                {challenge.title.toUpperCase()}
            </h2>

            {media.length > 0 && (
                <div className="mt-1 overflow-x-auto snap-x snap-mandatory scrollbar-hide overflow-y-hidden scrollbar-thin scrollbar-thumb-amber-400">
                    <div className="flex">
                        {media.map((item) => (
                            <div
                                className={`h-40 w-full shrink-0 overflow-y-hidden rounded-lg light:bg-neutral-200 dark:bg-neutral-800 ${!imageLoaded ? "animate-pulse" : ""
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

            <p className="mt-1 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
                {challenge.description}
            </p>

            {challenge.location && (
                <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400 flex gap-2 items-center ">
                    <MapPin size={12} />
                    <div className="hover:underline transition-colors duration-300 ease-in-out hover:text-amber-50 ">{challenge.location}</div>
                </p>
            )}
        </article>
    );
}