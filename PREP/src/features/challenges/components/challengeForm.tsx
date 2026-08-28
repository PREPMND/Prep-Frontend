import { useState } from "react";
import { uploadMedia } from "../../../services/api/media";
import { createChallenge } from "../api/challengeApi";
import {
  CHALLENGE_CATEGORIES,
  CHALLENGE_SUBCATEGORIES,
  type ChallengeCategory,
  type ChallengeSubcategory,
  type CreateChallengePayload,
} from "../types/challenge";

export function ChallengeForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState<ChallengeCategory | "">("");
  const [subcategory, setSubcategory] = useState<ChallengeSubcategory | "">("");
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      console.log(response);
    } catch (error) {
      console.error("Failed to submit challenge:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          className="mt-2 w-full rounded-xl border border-neutral-200 bg-transparent px-4 py-3 text-sm outline-none focus:border-neutral-400 dark:border-neutral-800"
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
          className="mt-2 w-full rounded-xl border border-neutral-200 bg-transparent px-4 py-3 text-sm outline-none focus:border-neutral-400 dark:border-neutral-800"
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
          onChange={(event) =>
            setSubcategory(event.target.value as ChallengeSubcategory | "")
          }
          className="mt-2 w-full rounded-xl border border-neutral-200 bg-transparent px-4 py-3 text-sm outline-none dark:border-neutral-800"
        >
          <option value="">Select a subcategory</option>
          {Object.values(CHALLENGE_SUBCATEGORIES).map((value) => (
            <option key={value} value={value}>
              {value.replaceAll("_", " ")}
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
        className="w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-neutral-900"
      >
        {isSubmitting ? "Submitting challenge..." : "Submit challenge"}
      </button>
    </form>
  );
}