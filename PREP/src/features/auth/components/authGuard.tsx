import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export function AuthGuard() {
  const {
    isAuthenticated,
    isLoading,
  } = useAuthStore();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...  
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}