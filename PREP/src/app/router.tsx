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
import { ChallengeFeed } from "../features/challenges/components/challengeFeed";
import ChallengeDetailPage from "../features/challenges/pages/challengeDetailPage";
import ChallengeLayout from "../layouts/challengeLayout";
import { RoleGuard } from "../features/common/gaurds/roleGuards";
import { StudentDashboard } from "../features/dashboard/student";
import { InstitutionalAdminDashBoard } from "../features/dashboard/institutionalAdmin";
import { SuperAdminDashboard } from "../features/dashboard/superAdmin";

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
        element: <ChallengeLayout />,
        children: [

          {
            path: "/profile",
            element: <ProfilePage />,
          },
          {
            path: "/challenges/submit",
            element: <ChallengePage />,
          },
          {
            path: "/",
            element: <ChallengeFeed />
          },
          {
            path: "/challenge/:id",
            element: <ChallengeDetailPage />,
          },
          {
            path: "/dashboard",
            element: <DashboardPage />,
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
  {
    path: "/dashboard/super-admin",
    element: (
      <RoleGuard allowedRoles={["SUPER_ADMIN"]}>
        <SuperAdminDashboard />
      </RoleGuard>
    ),
  },
  {
    path: "/dashboard/university",
    element: (
      <RoleGuard allowedRoles={["UNIVERSITY_ADMIN"]}>
        <InstitutionalAdminDashBoard/>
      </RoleGuard>
    ),
  },
  {
    path: "/dashboard/student",
    element: (
      <RoleGuard allowedRoles={["STUDENT"]}>
        <StudentDashboard />
      </RoleGuard>
    ),
  },

]);