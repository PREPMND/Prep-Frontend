import type { Role } from "../constants/roles";

export interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
  avatar?: string;
  isEmailVerified: boolean;
  createdAt?: string;
}