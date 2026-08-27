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