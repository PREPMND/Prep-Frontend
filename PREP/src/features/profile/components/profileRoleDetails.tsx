import type { Role } from "../../../constants/roles";

interface ProfileRoleProps {
  // FIX: Allow undefined for loading states
  roleData: string[] | undefined;
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

  return (
    <div className="space-y-4 mt-8">
      {roleData.map((r) => {
        const details = roleDetails[r as Role];
        if (!details) return null;

        return (
          <section
            key={r}
            className="rounded-xl border p-5 border-neutral-200 light:bg-white dark:border-neutral-800  dark:bg-gradient"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Platform role
            </p>
            <h2 className="mt-2 font-semibold text-neutral-900 dark:text-white">
              {details.title}
            </h2>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              {details.description}
            </p>
          </section>
        );
      })}
    </div>
  );
}
