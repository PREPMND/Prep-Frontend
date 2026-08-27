import type { Role } from "../../../constants/roles";
import { useState } from "react";
interface ProfileRoleProps {
  // FIX: Allow undefined for loading states
  roleData: string[] | undefined;
}


type Direction = "top" | "right" | "bottom" | "left";

function getDirection(
  event: React.MouseEvent<HTMLElement>,
): Direction {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = event.clientX - rect.left - rect.width / 2;
  const y = event.clientY - rect.top - rect.height / 2;

  if (Math.abs(x / rect.width) > Math.abs(y / rect.height)) {
    return x > 0 ? "right" : "left";
  }

  return y > 0 ? "bottom" : "top";
}
const roleDetails: Record<
  Role,
  { title: string; description: string }
> = {
  CITIZEN: {
    title: "Citizen",
    description: "Report and track issues in your community."
  },
  STUDENT: {
    title: "Student",
    description: "Access university resources, view courses, and track academic progress."
  },
  UNIVERSITY_ADMIN: {
    title: "University Administrator",
    description: "Manage university settings, academic records, and institutional tools."
  },
  ADMIN: {
    title: "Admin", description: "Institutional or Organizational admin"
  },
  OFFICER: {
    title: "Government Officer", description: "Manage and respond to assigned incidents."
  },
  SUPER_ADMIN: {
    title: "Super Administrator", description: "Manage the platform, users, and system operations."
  },
};

export function ProfileRole({ roleData }: ProfileRoleProps) {
  if (!roleData || roleData.length === 0) {
    console.log(roleData)
    return (
      <section className="mt-8 mx-auto text-center mb-12">
        <h2 className="text-sm font-semibold">Platform role</h2>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Role information is loading.
        </p>
      </section>
    );
  }

  <DirectionalRoleCard key={r}>
    <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
      Platform role
    </p>

    <h2 className="mt-2 font-semibold text-neutral-900 dark:text-white">
      {details.title}
    </h2>

    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
      {details.description}
    </p>
  </DirectionalRoleCard>
  );
}
