export const ROLES = {
  CITIZEN: "citizen",
  DEV:"dev",
  OFFICER: "officer",
  ADMIN: "admin",
  SUPER_ADMIN:"super_admin"
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];