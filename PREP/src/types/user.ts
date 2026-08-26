import type { Role } from "../constants/roles";

export interface User {
  id: string;
  username: string;
  email: string;
  role: Role;

  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  bio: string | null;

  isVerified: boolean;
  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}