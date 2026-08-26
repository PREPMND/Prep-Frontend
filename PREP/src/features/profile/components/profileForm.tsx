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
  const styleInput="w-full font-bold m-auto rounded-xl border light:border-neutral-300 light:bg-white  light:text-neutral-900 light:placeholder:text-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:border-blue-400 dark:focus:ring-blue-400/20";

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 w-[80%] mx-auto flex flex-col *:mb-2"
    >
      <div className="flex flex-col ">
        <label className="mb-2 text-sm font-medium">
          First name
        </label>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          maxLength={100}
          className={styleInput}
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium">
          Last name
        </label>
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          maxLength={100}
          className={styleInput}
        />
      </div>

      <div className="flex flex-col">
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
        className="active:scale-[0.97] mt-4 transiti bg-neutral-700 w-[40%] m-auto hover:shadow-md hover:shadow-gray-200 hover:bg-mauve-300 !rounded-xl px-3 py-[10px] hover:text-black hover:font-bold "
      >
        {updateProfile.isPending
          ? "Saving..."
          : "Save changes"}
      </button>
    </form>
  );
}