// client/src/features/auth/AuthSessionBridge.jsx
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { setUnauthorizedHandler } from "../../services/apiClient";
import { useAuth } from "./authContext";

export default function AuthSessionBridge() {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleSessionExpired } = useAuth();
  const isRedirectingRef = useRef(false);
  const locationRef = useRef(location);

  locationRef.current = location;

  useEffect(() => {
    if (location.pathname === "/login") {
      isRedirectingRef.current = false;
    }
  }, [location.pathname]);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      if (isRedirectingRef.current) {
        return;
      }

      isRedirectingRef.current = true;
      handleSessionExpired();

      navigate("/login", {
        replace: true,
        state: {
          from: locationRef.current,
          reason: "session_expired",
        },
      });
    });

    return () => setUnauthorizedHandler(null);
  }, [handleSessionExpired, navigate]);

  return null;
}
