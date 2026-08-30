import type { Organization } from "../types/organization";
import { OrganizationCard } from "./organizationCard";
import { useNavigate } from "react-router-dom";
interface OrganizationListProps {
  organizations: Organization[];
  onSelectOrganization?: (organization: Organization) => void;
}

export function OrganizationList({
  organizations,
  onSelectOrganization,
}: OrganizationListProps) {
  if (!organizations.length) {
    return (
      <p className="py-8 text-center text-sm light:text-neutral-500 dark:text-neutral-400">
        No organizations found.
      </p>
    );
  }

  function handleClick(){
    
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {organizations.map((organization) => (
        <OrganizationCard

          key={organization.id}
          organization={organization}
          onClick={() => onSelectOrganization?.(organization)}
        />
      ))}
    </div>
  );
}