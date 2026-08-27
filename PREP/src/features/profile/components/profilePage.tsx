import { ProfileHeader } from "../components/profileHeader";
import { ProfileForm } from "../components/profileForm";
import { useAuthStore } from "../../auth/store/authStore";
import { ProfileRole } from "./profileRoleDetails";
import { useMyRole } from "../hooks/useMyRole";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const {data:roleData}=useMyRole(user?.id);
  console.log(roleData)
  
  if (!user) {
    return null;
  }
  
  return (
    <main className="app-container py-10">
      <div className="mx-auto max-w-2xl">
        <ProfileHeader user={user} />
        <ProfileRole roleData={data}/>
        <ProfileForm user={user} />
      </div>
    </main>
  );
}