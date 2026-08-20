import { createBrowserRouter } from "react-router-dom";

import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import { AuthGuard } from "../features/auth/components/AuthGuard";

const DashboardPage = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold">
      PREP Dashboard
    </h1>

    <p className="mt-2">
      You are authenticated.
    </p>
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/register",
    element: <RegisterPage />,
  },

  {
    element: <AuthGuard />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
    ],
  },
]);