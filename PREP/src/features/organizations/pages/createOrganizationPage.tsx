import { CreateOrganizationForm } from "../components/CreateOrganizationForm";

export default function CreateOrganizationPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold light:text-neutral-900 dark:text-white">
          Create an organization
        </h1>
        <p className="mt-2 text-sm light:text-neutral-500 dark:text-neutral-400">
          Create a space for your organization to collaborate on challenges and
          solutions.
        </p>
      </div>

      <div className="rounded-2xl border light:border-neutral-200 dark:border-neutral-800 light:bg-white dark:bg-[#181a1f] p-6">
        <CreateOrganizationForm />
      </div>
    </div>
  );
}