import { useState } from "react";

import { createOrganization } from "../services/organizations";
import {
  ORGANIZATION_TYPES,
  type OrganizationType,
} from "../types/organization";

export function CreateOrganizationForm() {
  const [name, setName] = useState("");
  const [type, setType] = useState<OrganizationType | "">("");
  const [description, setDescription] = useState("");
  const [officialEmail, setOfficialEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!type) return;

    try {
      setIsSubmitting(true);

      await createOrganization({
        name,
        type,
        description: description || undefined,
        officialEmail: officialEmail || undefined,
        website: website || undefined,
      });

      setName("");
      setType("");
      setDescription("");
      setOfficialEmail("");
      setWebsite("");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="organization-name"
          className="text-sm font-medium light:text-neutral-900 dark:text-white"
        >
          Organization name
        </label>
        <input
          id="organization-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          className="mt-2 w-full rounded-xl border light:border-neutral-200 dark:border-neutral-800 light:bg-white dark:bg-[#181a1f] px-4 py-3 text-sm outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="organization-type"
          className="text-sm font-medium light:text-neutral-900 dark:text-white"
        >
          Organization type
        </label>
        <select
          id="organization-type"
          value={type}
          onChange={(event) =>
            setType(event.target.value as OrganizationType | "")
          }
          required
          className="mt-2 w-full rounded-xl border light:border-neutral-200 dark:border-neutral-800 light:bg-white dark:bg-[#181a1f] px-4 py-3 text-sm outline-none"
        >
          <option value="">Select a type</option>
          {Object.values(ORGANIZATION_TYPES).map((value) => (
            <option key={value} value={value}>
              {value
                .replaceAll("_", " ")
                .replace(/\b\w/g, (letter) => letter.toUpperCase())}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="organization-description"
          className="text-sm font-medium light:text-neutral-900 dark:text-white"
        >
          Description
        </label>
        <textarea
          id="organization-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={4}
          className="mt-2 w-full resize-none rounded-xl border light:border-neutral-200 dark:border-neutral-800 light:bg-white dark:bg-[#181a1f] px-4 py-3 text-sm outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="organization-email"
          className="text-sm font-medium light:text-neutral-900 dark:text-white"
        >
          Official email
        </label>
        <input
          id="organization-email"
          type="email"
          value={officialEmail}
          onChange={(event) => setOfficialEmail(event.target.value)}
          className="mt-2 w-full rounded-xl border light:border-neutral-200 dark:border-neutral-800 light:bg-white dark:bg-[#181a1f] px-4 py-3 text-sm outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="organization-website"
          className="text-sm font-medium light:text-neutral-900 dark:text-white"
        >
          Website
        </label>
        <input
          id="organization-website"
          type="url"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          className="mt-2 w-full rounded-xl border light:border-neutral-200 dark:border-neutral-800 light:bg-white dark:bg-[#181a1f] px-4 py-3 text-sm outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !type}
        className="w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-neutral-900"
      >
        {isSubmitting ? "Creating..." : "Create organization"}
      </button>
    </form>
  );
}