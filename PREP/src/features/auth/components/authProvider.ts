import type { ReactNode } from "react";
//import { useCurrentUser } from "../hooks/useCurrentUser";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  //useCurrentUser();

  return children;
}