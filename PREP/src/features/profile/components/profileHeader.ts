import type { User } from "../../../types/user";
import { createElement } from "react";

interface ProfileHeaderProps {
  user: User;
}

export function ProfileHeader({
  user,
}: ProfileHeaderProps) {
  const name = [user.firstName, user.lastName]
    .filter(Boolean)
    .join(" ");

  return createElement(
    "div",
    { className: "flex items-center gap-4" },
    createElement(
      "div",
      {
        className:
          "flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-neutral-200 text-xl font-semibold light:text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200",
      },
      user.avatar
        ? createElement("img", {
            src: user.avatar,
            alt: name || "Profile",
            className: "h-full w-full object-cover",
          })
        : name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase(),
    ),
    createElement(
      "div",
      null,
      createElement("h1", { className: "text-xl font-semibold" }, name || "Your Profile"),
      createElement(
        "p",
        { className: "text-sm light:text-neutral-500 dark:text-neutral-400" },
        user.email,
      ),
    ),
  );
}