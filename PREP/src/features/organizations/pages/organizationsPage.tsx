import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { OrganizationList } from "../components/organizationList";
import { getOrganizations } from "../services/organization";
import type { Organization } from "../types/organization";

export default function OrganizationsPage() {
  const navigate = useNavigate();

  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadOrganizations() {
      try {
        const response = await getOrganizations();
        setOrganizations(response);
      } finally {
        setIsLoading(false);
      }
    }

    loadOrganizations();
  }, []);

  return (
    <div className="mx-auto overflow-scroll bg-amber-100  w-full max-w-6xl px-4 py-10">
      <div className="mb-8  flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold light:text-neutral-900 dark:text-white">
            Organizations
          </h1>
          <p className="mt-2 text-sm light:text-neutral-500 dark:text-neutral-400">
            Discover organizations working on challenges and creating impact.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/organizations/create")}
          className="shrink-0 rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white dark:bg-white dark:text-neutral-900"
        >
          Create organization
        </button>
      </div>

      {isLoading ? (
        <p className="text-sm light:text-neutral-500 dark:text-neutral-400">
          Loading organizations...
        </p>
      ) : (
        <OrganizationList
          organizations={organizations}
          onSelectOrganization={(organization) =>
            navigate(`/organizations/${organization.id}`)
          }
        />
      )}
    </div>
  );
}