import { ProfileHeader } from "../components/ProfileHeader";
import { ProfileForm } from "../features/profile/components/profileForm";
import { useAuthStore } from "../features/auth/store/authStore";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return null;
  }

  return (
    <main className="relative min-h-screen overflow-hidden light:bg-neutral-50 dark:bg-[#0d1117]">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-[28rem] w-[28rem] rounded-full light:bg-blue-100/60 dark:bg-indigo-950/30 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-[28rem] w-[28rem] rounded-full light:bg-violet-100/50 dark:bg-purple-950/20 blur-3xl" />
      </div>

      <div className="relative app-container py-10 md:py-16">
        <div className="mx-auto max-w-3xl">
          {/* Page heading */}
          <div className="mb-6">
            <p className="text-sm font-medium light:text-blue-600 dark:text-indigo-400">
              ACCOUNT
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight light:text-neutral-900 dark:text-neutral-100">
              Profile settings
            </h1>
            <p className="mt-2 light:text-neutral-500 dark:text-neutral-400">
              Manage your personal information and profile.
            </p>
          </div>

          {/* Profile card */}
          <div className="rounded-xl border light:border-neutral-200 light:bg-white dark:border-white/10 dark:bg-[#161b22]/90 shadow-sm backdrop-blur">
            <div className="border-b light:border-neutral-200 dark:border-white/10 p-6 md:p-8">
              <ProfileHeader user={user} />
            </div>

            <div className="p-6 md:p-8">
              <ProfileForm user={user} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}