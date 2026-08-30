import { useEffect, useState } from "react";

import { getMyMemberships, getOrganizationById } from "../services/organization";
import type {
  Organization,
  OrganizationMembership,
} from "../types/organization";
import { OrganizationList } from "./organizationList";

export function MyOrganizations() {
  const [memberships, setMemberships] = useState<OrganizationMembership[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadOrganizations() {
      try {
        const membershipsResponse = await getMyMemberships();

        setMemberships(membershipsResponse);

        const organizationsResponse = await Promise.all(
          membershipsResponse.map((membership) =>
            getOrganizationById(membership.organizationId),
          ),
        );

        setOrganizations(organizationsResponse);
      } finally {
        setIsLoading(false);
      }
    }

    loadOrganizations();
  }, []);

  if (isLoading) {
    return (
      <p className="text-sm light:text-neutral-500 dark:text-neutral-400">
        Loading organizations...
      </p>
    );
  }

  const membershipByOrganizationId = new Map(
    memberships.map((membership) => [membership.organizationId, membership]),
  );

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-lg font-semibold light:text-neutral-900 dark:text-white">
          My organizations
        </h2>
        <p className="mt-1 text-sm light:text-neutral-500 dark:text-neutral-400">
          Organizations you're connected with.
        </p>
      </div>

      <OrganizationList organizations={organizations} />

      {organizations.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {organizations.map((organization) => {
            const membership = membershipByOrganizationId.get(
              organization.id,
            );

            return (
              <span
                key={organization.id}
                className="text-xs light:text-neutral-500 dark:text-neutral-400"
              >
                {organization.name}: {membership?.role}
              </span>
            );
          })}
        </div>
      )}
    </section>
  );
}