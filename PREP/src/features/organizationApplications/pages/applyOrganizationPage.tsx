import { useNavigate } from "react-router-dom";

import { OrganizationApplicationForm } from "../components/organizationApplicationForm";
import { useCreateApplication } from "../hooks/useOrganizationApplications";
import { describeApiError } from "../utils/apiError";

/**
 * Start an organization application.
 *
 * Creates a draft and hands off to the application's own page, where it can be
 * edited and submitted. Nothing is submitted for review from here, so a person
 * can stop halfway without losing what they typed.
 */
export default function ApplyOrganizationPage() {
  const navigate = useNavigate();
  const createApplication = useCreateApplication();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">
          Register your organization
        </h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Tell us about your organization and what it can contribute. You can
          save a draft and finish later; a reviewer looks at it once you submit.
        </p>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-[#181a1f]">
        <OrganizationApplicationForm
          submitLabel="Save draft"
          pending={createApplication.isPending}
          errorMessage={
            createApplication.isError
              ? describeApiError(createApplication.error)
              : null
          }
          onSubmit={(payload) =>
            createApplication.mutate(payload, {
              onSuccess: (application) =>
                navigate(`/organization-applications/${application.id}`),
            })
          }
        />
      </div>
    </div>
  );
}
