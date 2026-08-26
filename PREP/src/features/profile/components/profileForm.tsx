import { useState } from "react";
import type { User } from "../../../types/user";
import { useUpdateProfile } from "../hooks/useUpdateProfile";

interface ProfileFormProps {
  user: User;
}

export function ProfileForm({
  user,
}: ProfileFormProps) {
  const updateProfile = useUpdateProfile();

  const [firstName, setFirstName] = useState(
    user.firstName ?? "",
  );
  const [lastName, setLastName] = useState(
    user.lastName ?? "",
  );
  const [bio, setBio] = useState(user.bio ?? "");

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    updateProfile.mutate({
      firstName,
      lastName,
      bio,
    });
  };
  const styleInput="w-full rounded-lg border light:border-neutral-300 light:bg-white dark:border-neutral-700 dark:bg-neutral-900 px-4 py-3 outline-none
w-full rounded-lg border light:border-neutral-300 light:bg-white dark:border-neutral-700 dark:bg-neutral-900 px-4 py-3 outline-none
w-full rounded-lg border light:border-neutral-300 light:bg-white dark:border-neutral-700 dark:bg-neutral-900 px-4 py-3 outline-none"
  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 flex flex-col gap-5"
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          First name
        </label>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          maxLength={100}
          className={styleInput}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Last name
        </label>
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          maxLength={100}
          className={styleInput}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Bio
        </label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxLength={500}
          rows={4}
          className={styleInput}
        />
      </div>

      <button
        type="submit"
        disabled={updateProfile.isPending}
        className="w-fit rounded-lg bg-neutral-800 px-5 py-3 text-white dark:bg-neutral-100 dark:text-neutral-900 disabled:opacity-50"
      >
        {updateProfile.isPending
          ? "Saving..."
          : "Save changes"}
      </button>
    </form>
  );
}