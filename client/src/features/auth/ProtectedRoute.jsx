// client/src/features/auth/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "./authContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-[var(--neutral-050)]">
        <p className="text-sm text-[var(--primary-600)]">Loading workspace...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
