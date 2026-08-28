import { useState } from "react";
import { uploadMedia } from "../../../services/api/media";
import { createChallenge, linkChallengeDuplicate } from "../api/challengeApi";
import {
    CHALLENGE_CATEGORIES,
    type ChallengeCategory,
    type ChallengeSubcategory,
    type CreateChallengePayload,
    type CreateChallengeResponse,
} from "../types/challenge";
import { CATEGORY_SUBCATEGORIES } from "../constants/challengeCategory";
import { SimilarChallenges } from "./similarChallenge";

export function ChallengeForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState<ChallengeCategory | "">("");
    const [subcategory, setSubcategory] = useState<ChallengeSubcategory | "">("");
    const [files, setFiles] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submittedChallenge, setSubmittedChallenge] =
        useState<CreateChallengeResponse | null>(null);

    const [isLinkingDuplicate, setIsLinkingDuplicate] = useState(false);
    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        try {
            setIsSubmitting(true);

            const uploadedMedia = await Promise.all(
                files.map((file) => uploadMedia(file, "challenge_evidence")),
            );

            const mediaIds = uploadedMedia.map((media) => media.id);

            const payload: CreateChallengePayload = {
                title,
                description,
                location: location || undefined,
                category: category || undefined,
                subcategory: subcategory || undefined,
                mediaIds: mediaIds.length ? mediaIds : undefined,
            };

            const response = await createChallenge(payload);

            setSubmittedChallenge(response);

            console.log(response);
        } catch (error) {
            console.error("Failed to submit challenge:", error);
        } finally {
            setIsSubmitting(false);
        }
    };
    const availableSubcategories = category
        ? CATEGORY_SUBCATEGORIES[category]
        : [];

    const style='mt-2 w-full rounded-xl border border-neutral-200 light:bg-transparent dark:bg-neutral-800 px-4 py-3 text-sm outline-none focus:border-neutral-400 dark:border-neutral-800'
    if (submittedChallenge) {
        return (
            <div className="space-y-5 light:text-neutral-900 dark:bg-neutral-700 dark:text-">
                <div className="rounded-xl border border-neutral-200 p-5 dark:border-neutral-800">
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">
                        Challenge submitted successfully
                    </p>
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                        Your challenge has been submitted and will enter the review workflow.
                    </p>
                </div>

                {submittedChallenge.possibleDuplicates.length > 0 && (
                    <SimilarChallenges
                        challenges={submittedChallenge.possibleDuplicates}
                        isLinking={isLinkingDuplicate}
                        onSelectSameIssue={async (originalChallengeId) => {
                            try {
                                setIsLinkingDuplicate(true);

                                await linkChallengeDuplicate(
                                    submittedChallenge.challenge.id,
                                    originalChallengeId,
                                );

                                setSubmittedChallenge((current) =>
                                    current
                                        ? {
                                            ...current,
                                            possibleDuplicates: [],
                                        }
                                        : null,
                                );
                            } catch (error) {
                                console.error("Failed to link duplicate challenge:", error);
                            } finally {
                                setIsLinkingDuplicate(false);
                            }
                        }}
                    />
                )}
            </div>
        );
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="title" className="text-sm font-medium">
                    What is the problem?
                </label>
                <input
                    id="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    maxLength={200}
                    required
                    placeholder="For example, damaged roads in our village"
                    className={style}
                />
            </div>

            <div>
                <label htmlFor="description" className="text-sm font-medium">
                    Describe the challenge
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    required
                    rows={6}
                    placeholder="Describe what is happening, who is affected, and any important details."
                    className="mt-2 w-full resize-none rounded-xl border border-neutral-200 bg-transparent px-4 py-3 text-sm outline-none focus:border-neutral-400 dark:border-neutral-800"
                />
            </div>

            <div>
                <label htmlFor="location" className="text-sm font-medium">
                    Where is this happening?
                </label>
                <input
                    id="location"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    placeholder="Village, district, or locality"
                    className={style}
                />
            </div>

            <div>
                <label htmlFor="category" className="text-sm font-medium">
                    Category <span className="text-neutral-400">(optional)</span>
                </label>
                <select
                    id="category"
                    value={category}
                    onChange={(event) => {
                        setCategory(event.target.value as ChallengeCategory | "");
                        setSubcategory("");
                    }}
                    className="mt-2 w-full rounded-xl border border-neutral-200 bg-transparent px-4 py-3 text-sm outline-none dark:border-neutral-800"
                >
                    <option value="">Let the platform categorize it</option>
                    {Object.values(CHALLENGE_CATEGORIES).map((value) => (
                        <option key={value} value={value}>
                            {value.replaceAll("_", " ")}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="subcategory" className="text-sm font-medium">
                    Subcategory <span className="text-neutral-400">(optional)</span>
                </label>

                <select
                    id="subcategory"
                    value={subcategory}
                    disabled={!category}
                    onChange={(event) =>
                        setSubcategory(event.target.value as ChallengeSubcategory | "")
                    }
                    className="mt-2 w-full rounded-xl border border-neutral-200 light:bg-transparent dark:bg-neutral-700 dark:text-white px-4 py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800"
                >
                    <option value="">
                        {category
                            ? "Select a subcategory"
                            : "Select a category first"}
                    </option>

                    {availableSubcategories.map((value) => (
                        <option key={value} value={value}>
                            {value
                                .replaceAll("_", " ")
                                .replace(/\b\w/g, (letter) => letter.toUpperCase())}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="evidence" className="text-sm font-medium">
                    Add evidence <span className="text-neutral-400">(optional)</span>
                </label>
                <p className="mt-1 text-xs text-neutral-500">
                    Photos, documents, or videos can help explain the challenge.
                </p>
                <input
                    id="evidence"
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.png,.webp,.pdf,.mp4,.mov"
                    onChange={(event) =>
                        setFiles(Array.from(event.target.files ?? []))
                    }
                    className="mt-3 block text-sm"
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl light:bg-neutral-800 bg-neutral-900 px-4 py-3 text-sm font-medium light:text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-neutral-900"
            >
                {isSubmitting ? "Submitting challenge..." : "Submit challenge"}
            </button>
        </form>
    );
}