import type { Role } from "../../../constants/roles";

interface ProfileRoleProps {
  role?: Role;
}

const roleDetails: Record<
  Role,
  { title: string; description: string }
> = {
  citizen: {
    title: "Citizen",
    description: "Report and track issues in your community.",
  },
  admin:{
    title: "Admin",
    description: "Report and track issues in your community.",
  },
  dev: {
    title: "Developer",
    description: "Build and contribute to platform solutions.",
  },
  officer: {
    title: "Government Officer",
    description: "Manage and respond to assigned incidents.",
  },
  super_admin: {
    title: "Super Administrator",
    description: "Manage the platform, users, and system operations.",
  },
};

export function ProfileRole({ role }: ProfileRoleProps) {
  if (!role) {
    return (
      <section className="mt-8">
        <h2 className="text-sm font-semibold">
          Platform role
        </h2>
        <p className="mt-1 text-sm light:text-neutral-500 dark:text-neutral-400">
          Role information is loading.
        </p>
      </section>
    );
  }

  const details = roleDetails[role];

  return (
    <section className="mt-8 rounded-xl border p-5 light:border-neutral-200 light:bg-white dark:border-neutral-800 dark:bg-neutral-900/60">
      <p className="text-xs font-medium uppercase tracking-wider light:text-neutral-500 dark:text-neutral-400">
        Platform role
      </p>

      <h2 className="mt-2 font-semibold">
        {details.title}
      </h2>

      <p className="mt-1 text-sm light:text-neutral-600 dark:text-neutral-400">
        {details.description}
      </p>
    </section>
  );
}