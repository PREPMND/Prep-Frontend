import { useNavigate, useParams } from "react-router-dom";
import { useChallengeSolutions } from "../api/solutionApi";
import { useMedia } from "../../challenges/hooks/useMedia";
export default function ChallengeSolutionsPage() {
    const { id: challengeId } = useParams();
    const navigate = useNavigate();

    const {
        data: solutions = [],
        isLoading,
    } = useChallengeSolutions(challengeId);

    if (isLoading) {
        return <div className="app-container py-10">Loading solutions...</div>;
    }
    console.log("yes")

    function SolutionMedia({
        mediaIds,
    }: {
        mediaIds?: string[];
    }) {
        const { data: media = [] } = useMedia(mediaIds ?? []);
        console.log(media)
        if (!mediaIds?.length) {
            return (
                <div className="mt-4 flex h-40 items-center justify-center rounded-lg bg-neutral-100 text-neutral-400 dark:bg-neutral-800">
                    No media attached
                </div>
            );
        }

        if (!media.length) {
            return (
                <div className="mt-4 flex h-40 items-center justify-center rounded-lg bg-neutral-100 text-neutral-400 dark:bg-neutral-800">
                    Loading media...
                </div>
            );
        }

        return (
            <div className="mt-4 flex gap-3 overflow-x-auto">
                {media.map((item) => {
                    if (item.mimeType.startsWith("image/")) {
                        return (
                            <img
                                key={item.id}
                                src={item.url}
                                alt={item.originalName}
                                className="h-52 w-72 shrink-0 rounded-lg object-cover"
                            />
                        );
                    }

                    return (
                        <a
                            key={item.id}
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex h-20 min-w-48 items-center rounded-lg border px-4 text-sm"
                        >
                            📎 {item.originalName}
                        </a>
                    );
                })}
            </div>
        );
    }
    return (
        <main className="app-container py-10">
            <div className="mx-auto max-w-4xl">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">
                        Solutions
                    </h1>

                    <button
                        type="button"
                        onClick={() =>
                            navigate(`/challenge/${challengeId}/solutions/create`)
                        }
                        className="rounded-3xl bg-emerald-500 px-5 py-2 font-semibold text-white hover:bg-emerald-600"
                    >
                        Submit Solution
                    </button>
                </div>

                {solutions.length === 0 ? (
                    <p className="mt-8 text-neutral-500">
                        No solutions submitted yet.
                    </p>
                ) : (
                    <div className="mt-8 space-y-4">
                        {solutions.map((solution) => (
                            <div
                                key={solution.id}
                                className="rounded-xl border p-5"
                            >
                                <h2 className="text-xl font-bold">
                                    {solution.title}
                                </h2>


                                <p className="mt-3 text-neutral-600 dark:text-neutral-300">
                                    {solution.description}
                                </p>

                                <SolutionMedia mediaIds={solution.mediaIds} />

                                <p className="mt-4 text-sm text-neutral-500">
                                    Status: {solution.status}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}