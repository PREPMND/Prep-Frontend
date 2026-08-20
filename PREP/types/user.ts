import type { Role } from "../src/es";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}