import type { Role } from "../../../constants/roles";

interface ProfileRoleProps {
  role?: string[];
}

const roleDetails: Record<
  Role,
  { title: string; description: string }
> = {
  CITIZEN: {
    title: "Citizen",
    description: "Report and track issues in your community.",
  },
  ADMIN: {
    title: "Admin",
    description: "Instituional or Organizational admin",
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

export function ProfileRole( {role} : ProfileRoleProps) {
  if (!role) {
    return (
      <section className="mt-8 mx-auto text-center mb-12">
        <h2 className="text-sm font-semibold">
          Platform role
        </h2>
        <p className="mt-1 text-sm light:text-neutral-500 dark:text-neutral-400">
          Role information is loading.
        </p>
      </section>
    );
  }
  

  return (
    <section className="mt-8 rounded-xl border p-5 light:border-neutral-200 light:bg-white dark:border-neutral-800 dark:bg-neutral-900/60">
      <p className="text-xs font-medium uppercase tracking-wider light:text-neutral-500 dark:text-neutral-400">
        Platform role
      </p>

      <h2 className="mt-2 font-semibold">
      </h2>

      <p className="mt-1 text-sm light:text-neutral-600 dark:text-neutral-400">
      </p>
    </section>
  );
}