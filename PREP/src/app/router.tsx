import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../features/auth/pages/loginPage";
import RegisterPage from "../features/auth/pages/registerPage";
import { AuthGuard } from "../features/auth/components/authGuard";
import DashboardPage from "../features/dashboard/pages/dashboardPage";
import VerifyEmail from "../features/auth/pages/verfiyEmail";
import AuthLayout from "../layouts/authLayout";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
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
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },

]);