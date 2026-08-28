"use client";

import { useState } from "react";
import { createChallenge } from "../services/challenges";
import { uploadMedia } from "../../../services/api/media";
import {
CHALLENGE_CATEGORIES,
CHALLENGE_SUBCATEGORIES,
type ChallengeCategory,
type ChallengeSubcategory,
type CreateChallengePayload,
} from "../types/challenge";

const subcategoriesByCategory: Partial<
Record<ChallengeCategory, ChallengeSubcategory[]>

> = {
> infrastructure_transport: [
> "roads",
> "bridges",
> "public_transport",
> "traffic_infrastructure",
> "public_infrastructure",
> ],
> water_sanitation: [
> "drinking_water",
> "water_supply",
> "drainage",
> "sanitation",
> "waste_management",
> ],
> healthcare: [
> "healthcare_access",
> "healthcare_facilities",
> "maternal_child_health",
> "disease_prevention",
> "mental_health",
> ],
> education_skills: [
> "school_infrastructure",
> "education_access",
> "education_quality",
> "digital_education",
> "skill_development",
> ],
> agriculture_rural: [
> "farming",
> "irrigation",
> "livestock",
> "rural_infrastructure",
> "farmer_support",
> ],
> environment_climate: [
> "pollution",
> "forest_biodiversity",
> "climate_resilience",
> "natural_resources",
> ],
> public_safety: [
> "road_safety",
> "disaster_management",
> "community_safety",
> "emergency_response",
> ],
> government_public_services: [
> "public_service_access",
> "governance_grievances",
> "digital_government",
> "civic_services",
> ],
> economy_livelihoods: [
> "employment",
> "entrepreneurship",
> "local_livelihoods",
> "financial_inclusion",
> ],
> energy_utilities: [
> "electricity",
> "renewable_energy",
> "energy_access",
> ],
> social_inclusion: [
> "disability_inclusion",
> "women_empowerment",
> "senior_citizens",
> "marginalized_communities",
> ],
> };

const formatLabel = (value: string) =>
value
.replaceAll("_", " ")
.replace(/\b\w/g, (letter) => letter.toUpperCase());

export function ChallengeForm() {
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [location, setLocation] = useState("");
const [category, setCategory] = useState<ChallengeCategory | "">("");
const [subcategory, setSubcategory] = useState<ChallengeSubcategory | "">("");
const [files, setFiles] = useState<File[]>([]);
const [isSubmitting, setIsSubmitting] = useState(false);

const availableSubcategories = category
? subcategoriesByCategory[category] ?? []
: [];

const handleCategoryChange = (value: ChallengeCategory | "") => {
setCategory(value);
setSubcategory("");
};

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

    if (uploadedMedia?.id) {
      mediaIds.push(uploadedMedia.id);
    }
  }

  const payload: CreateChallengePayload = {
    title,
    description,
    location: location || undefined,
    category: category || undefined,
    subcategory: subcategory || undefined,
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

  <div className="grid gap-4 sm:grid-cols-2">
    <div>
      <label htmlFor="category" className="text-sm font-medium">
        Category{" "}
        <span className="text-neutral-400">(optional)</span>
      </label>

      <select
        id="category"
        value={category}
        onChange={(event) =>
          handleCategoryChange(
            event.target.value as ChallengeCategory | "",
          )
        }
        className="mt-2 w-full rounded-xl border border-neutral-200 bg-transparent px-4 py-3 text-sm outline-none dark:border-neutral-800"
      >
        <option value="">Let the platform categorize it</option>

        {Object.values(CHALLENGE_CATEGORIES).map((value) => (
          <option key={value} value={value}>
            {formatLabel(value)}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label htmlFor="subcategory" className="text-sm font-medium">
        Subcategory{" "}
        <span className="text-neutral-400">(optional)</span>
      </label>

      <select
        id="subcategory"
        value={subcategory}
        disabled={!category}
        onChange={(event) =>
          setSubcategory(
            event.target.value as ChallengeSubcategory | "",
          )
        }
        className="mt-2 w-full rounded-xl border border-neutral-200 bg-transparent px-4 py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800"
      >
        <option value="">
          {category
            ? "Select a subcategory"
            : "Select a category first"}
        </option>

        {availableSubcategories.map((value) => (
          <option key={value} value={value}>
            {formatLabel(value)}
          </option>
        ))}
      </select>
    </div>
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

    {files.length > 0 && (
      <p className="mt-2 text-xs text-neutral-500">
        {files.length} file{files.length > 1 ? "s" : ""} selected
      </p>
    )}
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
