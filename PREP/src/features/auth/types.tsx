export type UserRole =
  | "user"
  | "dev"
  | "officer"
  | "super_admin";

export interface User {
  id: string;
  username: string;
  email: string;

  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  bio: string | null;

  isVerified: boolean;
  isActive: boolean;
  role: UserRole;

  createdAt: string;
  updatedAt: string;
}