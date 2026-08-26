import { ProfileHeader } from "../components/ProfileHeader";
import { ProfileForm } from "../components/profileForm";
import { useAuthStore } from "../../auth/store/authStore";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return null;
  }

  return (
    <main className="app-container py-10">
      <div className="mx-auto max-w-2xl">
        <ProfileHeader user={user} />
        <ProfileForm user={user} />
      </div>
    </main>
  );
}