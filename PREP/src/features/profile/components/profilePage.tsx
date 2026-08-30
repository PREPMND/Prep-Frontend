import { ProfileHeader } from "../components/profileHeader";
import { ProfileForm } from "../components/profileForm";
import { useAuthStore } from "../../auth/store/authStore";
import { ProfileRole } from "./profileRoleDetails";
import { useMyRole } from "../hooks/useMyRole";
import { MyOrganizations } from "../../organizations/components/myOrganizations";
import { useOrganizations } from "../../organizations/hooks/useOrganization";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const { data: roleData } = useMyRole(user?.id);
  const { data: organizations = [] } = useOrganizations();

  if (!user) {
    return null;
  }

  return (
    <main className="app-container py-10">
      <div className="mx-auto max-w-2xl">
        <ProfileHeader user={user} />

        <ProfileRole
          roleData={roleData}
          organizations={organizations}
        />

        <div className="mt-10 mx-auto">
          <MyOrganizations />
        </div>

        <ProfileForm user={user} />
      </div>
    </main>
  );
}