import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import type { Role } from "../../../constants/roles";

interface ProfileRoleProps {
  roleData: string[] | undefined;
}

interface RoleCardProps {
  title: string;
  description: string;
  scope?: "Platform role" | "Organization role";
  organizationName?: string;
}

const roleDetails: Partial<Record<Role, RoleCardProps>> = {
  USER: {
    title: "User",
    description: "Access the platform and participate in available activities.",
  },
  STUDENT: {
    title: "Student",
    description: "Participate as a student on the platform and in relevant organizations.",
  },
  RESEARCHER: {
    title: "Researcher",
    description: "Contribute research and expertise to the platform.",
  },
  FACULTY: {
    title: "Faculty",
    description: "Participate as a faculty member and contribute academic expertise.",
  },
  UNIVERSITY_ADMIN: {
    title: "University Administrator",
    description: "Manage university-related activities and responsibilities.",
  },
  INDUSTRY_MEMBER: {
    title: "Industry Member",
    description: "Participate as an industry representative.",
  },
  INDUSTRY_MENTOR: {
    title: "Industry Mentor",
    description: "Mentor and support participants through industry experience.",
  },
  INDUSTRY_ADMIN: {
    title: "Industry Administrator",
    description: "Manage industry organization responsibilities.",
  },
  NGO_MEMBER: {
    title: "NGO Member",
    description: "Participate as a member of an NGO.",
  },
  NGO_ADMIN: {
    title: "NGO Administrator",
    description: "Manage NGO-related responsibilities.",
  },
  COMMUNITY_MEMBER: {
    title: "Community Member",
    description: "Participate in community initiatives and activities.",
  },
  VOLUNTEER: {
    title: "Volunteer",
    description: "Contribute to initiatives as a volunteer.",
  },
  EXPERT: {
    title: "Expert",
    description: "Contribute specialized knowledge and expertise.",
  },
  MENTOR: {
    title: "Mentor",
    description: "Guide and support other participants.",
  },
  SOLUTION_REVIEWER: {
    title: "Solution Reviewer",
    description: "Review and provide feedback on submitted solutions.",
  },
  EVALUATOR: {
    title: "Evaluator",
    description: "Evaluate relevant submissions and activities.",
  },
  MODERATOR: {
    title: "Moderator",
    description: "Help maintain and moderate platform activities.",
  },
  CONTENT_VERIFIER: {
    title: "Content Verifier",
    description: "Verify content and information on the platform.",
  },
  OFFICER: {
    title: "Officer",
    description: "Carry out assigned organizational or platform responsibilities.",
  },
  DEPARTMENT_OFFICER: {
    title: "Department Officer",
    description: "Manage responsibilities within an assigned department.",
  },
  FIELD_OFFICER: {
    title: "Field Officer",
    description: "Carry out responsibilities in the field.",
  },
  GOVERNMENT_REVIEWER: {
    title: "Government Reviewer",
    description: "Review relevant government-related activities or submissions.",
  },
  PROJECT_LEAD: {
    title: "Project Lead",
    description: "Lead and coordinate assigned projects.",
  },
  EVENT_MANAGER: {
    title: "Event Manager",
    description: "Plan and manage events and related activities.",
  },
  ADMIN: {
    title: "Administrator",
    description: "Manage authorized platform or organizational operations.",
  },
  SUPER_ADMIN: {
    title: "Super Administrator",
    description: "Manage platform-wide administration and system operations.",
  },
};

function RoleCard({
  title,
  description,
  scope = "Platform role",
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
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    rotateX.set((mouseY / rect.height - 0.5) * -12);
    rotateY.set((mouseX / rect.width - 0.5) * 12);
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
          dark:bg-gradient-to-r dark:from-neutral-900 dark:from-65%
          dark:via-80% dark:via-neutral-950 dark:to-mauve-800 dark:to-100%
          shadow-[0_20px_45px_rgba(0,0,0,.12),inset_0_1px_0_rgba(255,255,255,.7)]
          dark:shadow-[0_20px_45px_rgba(0,0,0,.45),inset_0_1px_0_rgba(255,255,255,.06)]"
      >
        <div
          className="pointer-events-none"
          style={{ transform: "translateZ(20px)" }}
        >
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            {scope}
          </p>

          <h2 className="mt-2 font-semibold text-neutral-900 dark:text-white">
            {title}
          </h2>

          {organizationName && (
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              {organizationName}
            </p>
          )}

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
        <h2 className="text-sm font-semibold">Roles</h2>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Role information is loading.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-8 space-y-4">
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
    </section>
  );
}