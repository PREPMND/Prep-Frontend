import type { User } from "../../types/user";

export interface LoginPayload {
  identifier: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  username: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export type UserRole =| "user" | "dev"| "officer"| "super_admin";

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