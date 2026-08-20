import type { Role } from "@/";

export interface User {
  id: string;
  username: string;
  email: string;
  phone?: string;
  name: string;
  role: Role;
  avatar?: string;
  isEmailVerified: boolean;
  createdAt?: string;
}