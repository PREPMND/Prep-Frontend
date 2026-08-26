import type { Role } from "../constants/roles";

export interface User {
  id: string;
  email: string;

  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  bio: string | null;

  isEmailVerified: boolean;
  createdAt: string;
}