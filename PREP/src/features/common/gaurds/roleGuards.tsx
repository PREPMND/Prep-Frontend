import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../auth/store/authStore";
import { useMyRole } from "../../profile/hooks/useMyRole";

interface RoleGuardProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

export function RoleGuard({
  allowedRoles,
  children,
}: RoleGuardProps) {
  const user = useAuthStore((state) => state.user);

  const { data: roleData, isLoading } = useMyRole(user?.id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const hasRole = roleData?.some((role) =>
    allowedRoles.includes(role.role.name),
  );

  if (!hasRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}