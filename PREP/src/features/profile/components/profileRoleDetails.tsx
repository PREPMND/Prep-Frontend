import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import type { Role } from "../../../constants/roles";

interface ProfileRoleProps {
  roleData: string[] | undefined;
}

interface RoleCardProps {
  title: string;
  description: string;
}

const roleDetails: Record<Role, RoleCardProps> = {
  CITIZEN: {
    title: "Citizen",
    description: "Report and track issues in your community.",
  },
  STUDENT: {
    title: "Student",
    description:
      "Access university resources, view courses, and track academic progress.",
  },
  UNIVERSITY_ADMIN: {
    title: "University Administrator",
    description:
      "Manage university settings, academic records, and institutional tools.",
  },
  ADMIN: {
    title: "Admin",
    description: "Institutional or organizational administrator.",
  },
  OFFICER: {
    title: "Government Officer",
    description: "Manage and respond to assigned incidents.",
  },
  SUPER_ADMIN: {
    title: "Super Administrator",
    description: "Manage the platform, users, and system operations.",
  },
};

export function ProfileRole({ roleData }: ProfileRoleProps) {
  if (!roleData || roleData.length === 0) {
    return (
      <section className="mt-8 mx-auto text-center mb-12">
        <h2 className="text-sm font-semibold">Platform role</h2>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Role information is loading.
        </p>
      </section>
    );
  }

  return (
    <div className="space-y-4 mt-8">
      {roleData.map((role) => {
        const details = roleDetails[role as Role];

        if (!details) return null;

        return (
          <RoleCard
            key={role}
            title={details.title}
            description={details.description}
          />
        );
      })}
    </div>
  );
}