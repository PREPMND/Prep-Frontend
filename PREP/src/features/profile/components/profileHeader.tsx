import { useRef } from "react";
import type { User } from "../../../types/user";
import {useUploadMediaMutation} from "../../../services/api/media"
import { useUpdateProfile } from "../hooks/useUpdateProfile";

interface ProfileHeaderProps {
  user: User;
}

export function ProfileHeader({
  user,
}: ProfileHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMedia = useUploadMediaMutation();
  const updateProfile = useUpdateProfile();

  const name = [user.firstName, user.lastName]
    .filter(Boolean)
    .join(" ");

  function handleAvatarClick() {
    fileInputRef.current?.click();
  }

  function handleAvatarChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    uploadMedia.mutate(
      {
        file,
        purpose: "avatar",
      },
      {
        onSuccess: (media) => {
          updateProfile.mutate({
            avatar: media.url,
          });
        },
      },
    );
  }

  return (
    <div className="flex w-full md:w-[80%] mx-auto justify-evenly items-center gap-4 *:select-none">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleAvatarChange}
      />

      <div
        onClick={handleAvatarClick}
        className="relative flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-neutral-200 text-xl font-semibold light:text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={name || "Profile"}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="bg-mauve-200 hover:scale-105 hover:bg-mauve-500 transition-all duration-300 ease-in-out w-full h-full overflow-hidden text-mauve-800 flex justify-center items-center text-3xl font-[Saira] font-semibold">
            {name?.charAt(0).toUpperCase() ||
              user.email.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/40 transition-all duration-200">
          <span className="opacity-0 hover:opacity-100 text-white text-sm font-semibold">
            Change
          </span>
        </div>

        {uploadMedia.isPending && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-sm">
            Uploading...
          </div>
        )}
      </div>

      <div className="flex gap-3 flex-col">
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