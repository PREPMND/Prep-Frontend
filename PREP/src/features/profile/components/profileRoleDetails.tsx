import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import type { Role } from "../../../constants/roles";
import { useOrganization } from "../../organizations/hooks/useOrganization";

interface RoleAssignment {
  id: string;
  roleId: string;
  organizationId: string | null;
  role: {
    name: string;
  };
}

interface ProfileRoleProps {
  roleData: RoleAssignment[] | undefined;
}

interface RoleCardProps {
  title: string;
  description: string;
  organization?: string;
}

const roleDetails: Record<Role, Omit<RoleCardProps, "organization">> = {
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

function RoleCard({ title, description, organization }: RoleCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springConfig = {
    stiffness: 150,
    damping: 15,
    mass: 0.6,
  };

  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    rotateX.set((mouseY / rect.height - 0.5) * -12);
    rotateY.set((mouseX / rect.width - 0.5) * 12);
  };

  return (
    <div className="[perspective:1000px]">
      <motion.section
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => {
          rotateX.set(0);
          rotateY.set(0);
        }}
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformStyle: "preserve-3d",
        }}
        className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900"
      >
        <div
          className="pointer-events-none"
          style={{ transform: "translateZ(20px)" }}
        >
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            {organization ? "Organization role" : "Platform role"}
          </p>

          <h2 className="mt-2 font-semibold text-neutral-900 dark:text-white">
            {title}
          </h2>

          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            {description}
          </p>

          {organization && (
            <p className="mt-3 text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {organization}
            </p>
          )}
        </div>
      </motion.section>
    </div>
  );
}

export function ProfileRole({ roleData }: ProfileRoleProps) {
  const { data: organizations = [] } = useOrganization();

  if (!roleData || roleData.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 space-y-4">
      {roleData.map((assignment) => {
        const roleName = assignment.role.name as Role;
        const details = roleDetails[roleName];

        if (!details) return null;

        const organization = assignment.organizationId
          ? organizations.find((org) => org.id === assignment.organizationId)
              ?.name
          : undefined;

        return (
          <RoleCard
            key={assignment.id}
            title={details.title}
            description={details.description}
            organization={organization}
          />
        );
      })}
    </div>
  );
}