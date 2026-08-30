import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../features/auth/pages/loginPage";
import RegisterPage from "../features/auth/pages/registerPage";
import { AuthGuard } from "../features/auth/components/authGuard";
import DashboardPage from "../features/dashboard/pages/dashboardPage";
import VerifyEmail from "../features/auth/pages/verfiyEmail";
import AuthLayout from "../layouts/authLayout";
import ProfilePage from "../features/profile/components/profilePage";
import ProfileLayout from "../layouts/profileLayout";
import { ChallengePage } from "../features/challenges/pages/challengePage";
import OrganizationDetailPage from "../features/organizations/pages/organizationDetailPage";
import CreateOrganizationPage from "../features/organizations/pages/createOrganizationPage";
import OrganizationsPage from "../features/organizations/pages/organizationsPage";

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
        element: <ProfileLayout />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
          {
            path: "/profile",
            element: <ProfilePage />,
          },
          {
            path: "/challenges/submit",
            element: <ChallengePage />,
          },


        ],
      },
    ],
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
  {
    element: <AuthGuard />,
    children: [
      {
        path: "/organizations",
        element: <OrganizationsPage />,
      },
      {
        path: "/organizations/create",
        element: <CreateOrganizationPage />,
      },
      {
        path: "/organizations/:id",
        element: <OrganizationDetailPage />,
      },
    ],
  },

]);