import type { User } from "../../../types/user";

interface ProfileHeaderProps {
  user: User;
}

export function ProfileHeader({
  user,
}: ProfileHeaderProps) {
  const name = [user.firstName, user.lastName]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex items-center gap-4 *:select-none">
      <div className="flex h-16 w-16 bg-amber-200  items-center justify-center overflow-hidden rounded-full bg-neutral-200 text-xl font-semibold light:text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={name || "Profile"}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="bg-amber-100 w-full h-full overflow-hidden text-neutral-800 flex justify-center items-center text-3xl font-[Saira] font-semibold ">
            {name?.charAt(0).toUpperCase() ||
            user.email.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <div>
        <h1 className="text-xl font-semibold">
          {name || "Your Profile"}
        </h1>
        <p className="text-sm hover:underline light:text-neutral-500 dark:text-neutral-400">
          {user.email}
        </p>
      </div>
    </div>
  );
}