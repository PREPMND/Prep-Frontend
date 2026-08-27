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

function RoleCard({ title, description }: RoleCardProps) {
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
    const rect =cardRef.current.getBoundingClientRect();
    const mouseX =event.clientX - rect.left;
    const mouseY =event.clientY - rect.top;

    rotateX.set(
      (mouseY /rect.height-0.5)*-12,
    );
    rotateY.set(
      (mouseX /rect.width-0.5)*12,
    );
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
        className="rounded-xl border p-5 border-neutral-200 bg-white
          dark:border-neutral-800
          dark:bg-gradient-to-r dark:from-neutral-900
          dark:via-neutral-950 dark:to-mauve-800
          shadow-[0_20px_45px_rgba(0,0,0,.12),inset_0_1px_0_rgba(255,255,255,.7)]
          dark:shadow-[0_20px_45px_rgba(0,0,0,.45),inset_0_1px_0_rgba(255,255,255,.06)]"
      >
        <div
          className="pointer-events-none"
          style={{ transform: "translateZ(20px)" }}
        >
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Platform role
          </p>

          <h2 className="mt-2 font-semibold text-neutral-900 dark:text-white">
            {title}
          </h2>

          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            {description}
          </p>
        </div>
      </motion.section>
    </div>
  );
}


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