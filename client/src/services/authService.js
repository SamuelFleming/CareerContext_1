// client/src/services/authService.js
import {
  apiRequest,
  clearStoredToken,
  getStoredToken,
  setStoredToken,
} from "./apiClient";

export { clearStoredToken, getStoredToken, setStoredToken };

export function register({ name, email, password }) {
  return apiRequest("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

export function login({ email, password }) {
  return apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function getCurrentUser() {
  return apiRequest("/api/auth/me");
}
