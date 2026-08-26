import type { ReactNode } from "react";
import { useEffect } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useAuthStore } from "../store/authStore";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const { isLoading } = useCurrentUser();
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  return (<div>{children}</div>);
}