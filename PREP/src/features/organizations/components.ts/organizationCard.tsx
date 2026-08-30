import type { Organization } from "../types/organization";

interface OrganizationCardProps {
  organization: Organization;
  onClick?: () => void;
}

export function OrganizationCard({
  organization,
  onClick,
}: OrganizationCardProps) {
  return (
    <article
      onClick={onClick}
      className="cursor-pointer rounded-2xl border light:border-neutral-200 dark:border-neutral-800 light:bg-white dark:bg-[#181a1f] p-5 transition-colors light:hover:border-neutral-300 dark:hover:border-neutral-700"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl light:bg-neutral-100 dark:bg-neutral-800">
          <span className="text-lg font-semibold">
            {organization.name.charAt(0).toUpperCase()}
          </span>
        </div>

        <div className="min-w-0">
          <h3 className="truncate font-medium light:text-neutral-900 dark:text-white">
            {organization.name}
          </h3>

          <p className="mt-1 text-sm light:text-neutral-500 dark:text-neutral-400">
            {organization.type.replaceAll("_", " ")}
          </p>
        </div>
      </div>

      {organization.description && (
        <p className="mt-4 line-clamp-3 text-sm light:text-neutral-600 dark:text-neutral-400">
          {organization.description}
        </p>
      )}
    </article>
  );
}