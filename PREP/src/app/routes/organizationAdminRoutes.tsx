import { useParams } from "react-router-dom";
import { OrganizationAdminGuard } from "../../features/organizations/";

interface OrganizationAdminRouteProps {
  children: React.ReactNode;
}

export function OrganizationAdminRoute({
  children,
}: OrganizationAdminRouteProps) {
  const { id } = useParams();

  if (!id) {
    return null;
  }

  return (
    <OrganizationAdminGuard organizationId={id}>
      {children}
    </OrganizationAdminGuard>
  );
}