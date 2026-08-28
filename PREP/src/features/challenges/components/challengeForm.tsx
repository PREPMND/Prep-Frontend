"use client";

import { useState } from "react";

import { createChallenge } from "../services/challenges";
import { uploadMedia } from "../../../services/api/media";

import {
CHALLENGE_CATEGORIES,
type ChallengeCategory,
type CreateChallengePayload,
} from "../types/challenge";

export function ChallengeForm() {
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [location, setLocation] = useState("");
const [category, setCategory] = useState<ChallengeCategory | "">("");
const [files, setFiles] = useState<File[]>([]);
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (
event: React.FormEvent<HTMLFormElement>,
) => {
event.preventDefault();

```
try {
  setIsSubmitting(true);

  const mediaIds: string[] = [];

  for (const file of files) {
    const uploadedMedia = await uploadMedia(
      file,
      "challenge_evidence",
    );

    // Replace with the actual MediaService upload response field.
    if (uploadedMedia?.id) {
      mediaIds.push(uploadedMedia.id);
    }
  }

  const payload: CreateChallengePayload = {
    title,
    description,
    location: location || undefined,
    category: category || undefined,
    mediaIds,
  };

  const response = await createChallenge(payload);

  console.log("Challenge created:", response);
} catch (error) {
  console.error("Failed to submit challenge:", error);
} finally {
  setIsSubmitting(false);
}
```

};

return ( <form onSubmit={handleSubmit} className="space-y-6"> <div> <label htmlFor="title" className="text-sm font-medium">
What is the problem? </label>

```
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
      Category{" "}
      <span className="text-neutral-400">(optional)</span>
    </label>

    <select
      id="category"
      value={category}
      onChange={(event) =>
        setCategory(event.target.value as ChallengeCategory)
      }
      className="mt-2 w-full rounded-xl border border-neutral-200 bg-transparent px-4 py-3 text-sm outline-none dark:border-neutral-800"
    >
      <option value="">Let the platform suggest a category</option>

      {Object.entries(CHALLENGE_CATEGORIES).map(
        ([key, value]) => (
          <option key={value} value={value}>
            {key.replaceAll("_", " ")}
          </option>
        ),
      )}
    </select>
  </div>

  <div>
    <label htmlFor="evidence" className="text-sm font-medium">
      Add evidence{" "}
      <span className="text-neutral-400">(optional)</span>
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
```

);
}
