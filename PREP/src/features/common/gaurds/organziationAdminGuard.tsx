import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../auth/store/authStore";
import { useMyRole } from "../../profile/hooks/useMyRole";

interface OrganizationAdminGuardProps {
    organizationId: string;
    children: React.ReactNode;
}

export function OrganizationAdminGuard({
    organizationId,
    children,
}: OrganizationAdminGuardProps) {
    const user = useAuthStore((state) => state.user);
    const { data: roleData, isLoading } = useMyRole(user?.id);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const hasAccess = roleData?.some(
        (role) =>
            role.role.name === "SUPER_ADMIN" ||
            (role.role.name === "UNIVERSITY_ADMIN" &&
                role.organizationId === organizationId),
    );

    if (!hasAccess) {
        return <Navigate to="/" replace />;
    }

    return children;
}