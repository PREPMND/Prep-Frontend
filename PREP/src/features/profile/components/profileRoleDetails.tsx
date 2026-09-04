import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import type { Organization } from "../../organizations/types/organization";

interface Role {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}

interface RoleAssignment {
  id: string;
  roleId: string;
  organizationId: string | null;
  createdAt: string;
  role: Role;
}

interface ProfileRoleProps {
  roleData: RoleAssignment[] | undefined;
  organizations?: Organization[];
}

interface RoleCardProps {
  title: string;
  description: string;
  organizationName?: string;
}

function formatRoleName(roleName: string) {
  return roleName
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function RoleCard({
  title,
  description,
  organizationName,
}: RoleCardProps) {
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

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    rotateX.set(((event.clientY - rect.top) / rect.height - 0.5) * -12);
    rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * 12);
  };

  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div className="[perspective:1000px]">
      <motion.section
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformStyle: "preserve-3d",
        }}
        className="rounded-xl border border-neutral-200 bg-white p-5 shadow-[0_20px_45px_rgba(0,0,0,.12),inset_0_1px_0_rgba(255,255,255,.7)] dark:border-neutral-800 dark:bg-gradient-to-r dark:from-neutral-900 dark:from-65% dark:via-neutral-950 dark:via-80% dark:to-mauve-800 dark:to-100% dark:shadow-[0_20px_45px_rgba(0,0,0,.45),inset_0_1px_0_rgba(255,255,255,.06)]"
      >
        <div
          className="pointer-events-none"
          style={{ transform: "translateZ(20px)" }}
        >
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            {organizationName ? "Organization role" : "Platform role"}
          </p>

          <h2 className="mt-2 font-semibold text-neutral-900 dark:text-white">
            {title}
          </h2>

          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            {description.replace(/\b\w/g, (letter) => letter.toUpperCase())}
          </p>

          {organizationName && (
            <p className="mt-3 text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {organizationName.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase())}
            </p>
          )}
        </div>
      </motion.section>
    </div>
  );
}

export function ProfileRole({
  roleData,
  organizations = [],
}: ProfileRoleProps) {
  if (!roleData || roleData.length === 0) {
    return (
      <section className="mx-auto mt-8 mb-12 text-center">
        <h2 className="text-sm font-semibold">Roles</h2>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          No roles assigned yet.
        </p>
      </section>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      {roleData.map((assignment) => {
        const organization = assignment.organizationId
          ? organizations.find(
              (item) => item.id === assignment.organizationId,
            )
          : undefined;

        return (
          <RoleCard
            key={assignment.id}
            title={formatRoleName(assignment.role.name)}
            description={assignment.role.description}
            organizationName={organization?.name}
          />
        );
      })}
    </div>
  );
}