import { Locate, MapPin } from "lucide-react";
import { useChallenges } from "../hooks/useChallenges";
import { useMedia } from "../hooks/useMedia";
import type { Challenge } from "../types/challenge";
import { useState } from "react";
import { PcHomeBar } from "../../common/pcHomeBar";

export function ChallengeFeed() {
    const { data: challenges, isLoading } = useChallenges();

    if (isLoading) {
        return <div>Loading challenges...</div>;
    }

    return (

        <div className="flex h-screen w-screen overflow-hidden">
            <div className="flex-1 h-full overflow-y-auto scrollbar-none pt-3 pb-4 px-4 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {challenges?.map((challenge) => (
                    <ChallengeCard key={challenge.id} challenge={challenge} />
                ))}
            </div>
            <div className="w-64 hidden sm:block h-full bg-gradient-to-r border-l-2 border-l-lime-200 rounded-l-3xl from-neutral-950 via-neutral-950 to-neutral-900 dark:text-white text-mist-50  overflow-y-auto pt-3 pb-4 px-4 border-gray-200">
                <PcHomeBar />
            </div>
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
        <div>
            <article
                className="mt-2 cursor-pointer rounded-xl flex flex-col border border-neutral-200 light:bg-white py-2 px-4
            text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white h-[400px]"
            >
                <p className="text-xs text-center  font-semibold h-[5%] text-neutral-500 dark:text-mauve-300">
                    {challenge.category ? challenge.category?.replaceAll("_", " ").toUpperCase() : 'UNCLASSIFIED'}
                </p>
                <h2 className="mt-1 h-[2lh] min-h-0 font-semibold text-[16px]! text-neutral-900 dark:text-white line-clamp-2 break-words">
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
                {media.length == 0 && (
                    <div
                        className={`h-40 w-full shrink-0 overflow-y-hidden rounded-lg light:bg-neutral-200 dark:bg-neutral-800 ${!imageLoaded ? "animate-pulse" : ""
                            }`}
                    >
                        <img
                            src='https://i.pinimg.com/736x/45/f1/59/45f15919a520c9daa7b5db47df6b3c3a.jpg'
                            alt={challenge.category || ''}
                            onLoad={() => setImageLoaded(true)}
                            className="h-40 w-full rounded-lg object-cover"
                        />
                    </div>
                )}
                <p className="mt-1 line-clamp-4 text-sm text-neutral-600 dark:text-neutral-400">
                    {challenge.description}
                </p>
                {challenge.location && (
                    <p className="group mt-auto place-content-end  flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                        <MapPin
                            size={12}
                            className="transition-all duration-300 ease-in-out group-hover:scale-130 group-hover:text-amber-400"
                        />
                        <span className="transition-colors duration-300 ease-in-out group-hover:text-amber-400 group-hover:underline">
                            {challenge.location}
                        </span>
                    </p>
                )}
            </article>

        </div>
    );
}