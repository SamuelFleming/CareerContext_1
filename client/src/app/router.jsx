// client/src/app/router.jsx
import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "../components/layout/PublicLayout";
import ProtectedLayout from "../components/layout/ProtectedLayout";

import LandingPage from "../features/landing/LandingPage";
import LoginPage from "../features/auth/LoginPage";
import RegisterPage from "../features/auth/RegisterPage";
import ProtectedRoute from "../features/auth/ProtectedRoute";
import DashboardPage from "../features/dashboard/DashboardPage";
import ProfilePage from "../features/profile/ProfilePage";
import ExperienceIndexPage from "../features/experiences/ExperienceIndexPage";
import ExperienceDetailFoundationPage from "../features/experiences/ExperienceDetailFoundationPage";
import ActivityDetailFoundationPage from "../features/activities/ActivityDetailFoundationPage";
import ComingSoonPage from "../features/placeholders/ComingSoonPage";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
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
    element: (
      <ProtectedRoute>
        <ProtectedLayout />
      </ProtectedRoute>
    ),
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
        path: "/experiences",
        element: <ExperienceIndexPage />,
      },
      {
        path: "/experiences/:experienceId",
        element: <ExperienceDetailFoundationPage />,
      },
      {
        path: "/activities/:activityId",
        element: <ActivityDetailFoundationPage />,
      },
      {
        path: "/journal",
        element: (
          <ComingSoonPage
            title="Journal"
            description="The full journal workspace arrives in Phase 5. Use quick capture from the sidebar or the spine on the right."
            showJournalAction
          />
        ),
      },
      {
        path: "/opportunities",
        element: (
          <ComingSoonPage
            title="Opportunities"
            description="Opportunity evaluation and comparison arrive in Phase 3."
          />
        ),
      },
      {
        path: "/documents",
        element: (
          <ComingSoonPage
            title="Documents"
            description="Generated and uploaded documents arrive in Phase 3."
          />
        ),
      },
    ],
  },
]);
