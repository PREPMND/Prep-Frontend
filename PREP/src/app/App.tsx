import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../features/auth/pages/loginPage";
import RegisterPage from "../features/auth/pages/registerPage";
import DashboardPage from "../features/dashboard/pages/dashboardPage";
import { AuthGuard } from "../features/auth/components/authGuard";

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