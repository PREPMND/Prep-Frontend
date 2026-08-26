import type { ReactNode } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";

interface AuthInitializerProps {
  children: ReactNode;
}

export function AuthInitializer({
  children,
}: AuthInitializerProps) {
  useCurrentUser();

  return <>{children}</>;
}