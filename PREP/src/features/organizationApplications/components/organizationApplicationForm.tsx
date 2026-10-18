import { useState } from "react";

import {
  ORGANIZATION_TYPE_LABELS,
  ORGANIZATION_TYPES,
  OrganizationType,
} from "../../../contracts/organizations/organization-type.enum";

import type {
  CreateOrganizationApplicationPayload,
  OrganizationApplication,
} from "../types/organizationApplication";

export interface OrganizationApplicationFormProps {
  initial?: OrganizationApplication;
  submitLabel: string;
  pending: boolean;
  disabled?: boolean;
  errorMessage?: string | null;
  onSubmit: (payload: CreateOrganizationApplicationPayload) => void;
  /** Rendered next to the save button, e.g. a "Submit for review" action. */
  secondaryAction?: React.ReactNode;
}

type FieldErrors = Partial<
  Record<keyof CreateOrganizationApplicationPayload, string>
>;

const inputClass =
  "w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:border-neutral-400 disabled:opacity-60 dark:border-neutral-800 dark:bg-[#111317] dark:text-neutral-100";

const labelClass =
  "mb-1.5 block text-sm font-medium text-neutral-800 dark:text-neutral-200";

const helpClass = "mt-1 text-xs text-neutral-500 dark:text-neutral-400";

/**
 * The organization application form, used for both creating and editing.
 *
 * Client-side validation here is a convenience only -- the server validates the
 * same fields and owns the completeness rule for submission. The form asks for
 * what a reviewer needs and nothing more; it deliberately collects no
 * registration numbers, tax identifiers or personal documents.
 */
export function OrganizationApplicationForm({
  initial,
  submitLabel,
  pending,
  disabled = false,
  errorMessage,
  onSubmit,
  secondaryAction,
}: OrganizationApplicationFormProps) {
  const [organizationName, setOrganizationName] = useState(
    initial?.organizationName ?? "",
  );
  const [organizationType, setOrganizationType] = useState<OrganizationType>(
    initial?.organizationType ?? OrganizationType.PRIVATE_COMPANY,
  );
  const [description, setDescription] = useState(initial?.description ?? "");
  const [website, setWebsite] = useState(initial?.website ?? "");
  const [officialEmail, setOfficialEmail] = useState(
    initial?.officialEmail ?? "",
  );
  const [contactPersonName, setContactPersonName] = useState(
    initial?.contactPersonName ?? "",
  );
  const [contactPhone, setContactPhone] = useState(initial?.contactPhone ?? "");
  const [focusAreas, setFocusAreas] = useState(
    (initial?.focusAreas ?? []).join(", "),
  );
  const [capabilities, setCapabilities] = useState(
    (initial?.capabilities ?? []).join(", "),
  );
  const [relevantExperience, setRelevantExperience] = useState(
    initial?.relevantExperience ?? "",
  );
  const [proposedContribution, setProposedContribution] = useState(
    initial?.proposedContribution ?? "",
  );

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const toList = (value: string) =>
    value
      .split(",")
      .map((entry) => entry.trim())
      .filter((entry) => entry.length > 0);

  const validate = (): FieldErrors => {
    const errors: FieldErrors = {};

    if (organizationName.trim().length < 2) {
      errors.organizationName = "Enter the organization's name.";
    }

    if (officialEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(officialEmail)) {
      errors.officialEmail = "Enter a valid email address.";
    }

    if (website && !/^https?:\/\//i.test(website)) {
      errors.website = "Include http:// or https://";
    }

    return errors;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const errors = validate();
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    onSubmit({
      organizationName: organizationName.trim(),
      organizationType,
      description: description.trim() || undefined,
      website: website.trim() || undefined,
      officialEmail: officialEmail.trim() || undefined,
      contactPersonName: contactPersonName.trim() || undefined,
      contactPhone: contactPhone.trim() || undefined,
      focusAreas: toList(focusAreas),
      capabilities: toList(capabilities),
      relevantExperience: relevantExperience.trim() || undefined,
      proposedContribution: proposedContribution.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {errorMessage ? (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300"
        >
          {errorMessage}
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="organizationName">
            Organization name
          </label>
          <input
            id="organizationName"
            className={inputClass}
            value={organizationName}
            disabled={disabled}
            aria-invalid={!!fieldErrors.organizationName}
            aria-describedby={
              fieldErrors.organizationName
                ? "organizationName-error"
                : undefined
            }
            onChange={(event) => setOrganizationName(event.target.value)}
          />
          {fieldErrors.organizationName ? (
            <p
              id="organizationName-error"
              className="mt-1 text-xs text-red-600 dark:text-red-400"
            >
              {fieldErrors.organizationName}
            </p>
          ) : null}
        </div>

        <div>
          <label className={labelClass} htmlFor="organizationType">
            Organization type
          </label>
          <select
            id="organizationType"
            className={inputClass}
            value={organizationType}
            disabled={disabled}
            onChange={(event) =>
              setOrganizationType(event.target.value as OrganizationType)
            }
          >
            {ORGANIZATION_TYPES.map((type) => (
              <option key={type} value={type}>
                {ORGANIZATION_TYPE_LABELS[type]}
              </option>
            ))}
          </select>
          <p className={helpClass}>
            Government participation is optional on PREP -- companies,
            startups, universities, NGOs and community groups can take part on
            their own.
          </p>
        </div>

        <div>
          <label className={labelClass} htmlFor="officialEmail">
            Official contact email
          </label>
          <input
            id="officialEmail"
            type="email"
            className={inputClass}
            value={officialEmail}
            disabled={disabled}
            aria-invalid={!!fieldErrors.officialEmail}
            onChange={(event) => setOfficialEmail(event.target.value)}
          />
          {fieldErrors.officialEmail ? (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
              {fieldErrors.officialEmail}
            </p>
          ) : null}
        </div>

        <div>
          <label className={labelClass} htmlFor="contactPersonName">
            Contact person
          </label>
          <input
            id="contactPersonName"
            className={inputClass}
            value={contactPersonName}
            disabled={disabled}
            onChange={(event) => setContactPersonName(event.target.value)}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="contactPhone">
            Contact phone <span className="font-normal">(optional)</span>
          </label>
          <input
            id="contactPhone"
            className={inputClass}
            value={contactPhone}
            disabled={disabled}
            onChange={(event) => setContactPhone(event.target.value)}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="website">
            Website <span className="font-normal">(optional)</span>
          </label>
          <input
            id="website"
            className={inputClass}
            placeholder="https://"
            value={website}
            disabled={disabled}
            aria-invalid={!!fieldErrors.website}
            onChange={(event) => setWebsite(event.target.value)}
          />
          {fieldErrors.website ? (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
              {fieldErrors.website}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="description">
            What does your organization do?
          </label>
          <textarea
            id="description"
            rows={4}
            className={inputClass}
            value={description}
            disabled={disabled}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="focusAreas">
            Focus areas
          </label>
          <input
            id="focusAreas"
            className={inputClass}
            placeholder="water, sanitation, air quality"
            value={focusAreas}
            disabled={disabled}
            onChange={(event) => setFocusAreas(event.target.value)}
          />
          <p className={helpClass}>Comma separated.</p>
        </div>

        <div>
          <label className={labelClass} htmlFor="capabilities">
            Capabilities you can offer
          </label>
          <input
            id="capabilities"
            className={inputClass}
            placeholder="lab testing, field survey, funding"
            value={capabilities}
            disabled={disabled}
            onChange={(event) => setCapabilities(event.target.value)}
          />
          <p className={helpClass}>Comma separated.</p>
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="relevantExperience">
            Relevant experience <span className="font-normal">(optional)</span>
          </label>
          <textarea
            id="relevantExperience"
            rows={3}
            className={inputClass}
            value={relevantExperience}
            disabled={disabled}
            onChange={(event) => setRelevantExperience(event.target.value)}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="proposedContribution">
            What would you contribute to PREP?
          </label>
          <textarea
            id="proposedContribution"
            rows={3}
            className={inputClass}
            value={proposedContribution}
            disabled={disabled}
            onChange={(event) => setProposedContribution(event.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={pending || disabled}
          className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60 dark:bg-white dark:text-neutral-900"
        >
          {pending ? "Saving..." : submitLabel}
        </button>
        {secondaryAction}
      </div>

      <p className={helpClass}>
        Saving a draft or submitting does not verify your organization. A
        reviewer decides, and you will see the outcome here.
      </p>
    </form>
  );
}
