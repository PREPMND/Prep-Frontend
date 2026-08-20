import type { Role } from "../src/constants/roles";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}