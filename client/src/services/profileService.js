// client/src/services/profileService.js
import { apiRequest } from "./apiClient";

export function getProfile() {
  return apiRequest("/api/profile");
}

export function updateProfile(payload) {
  return apiRequest("/api/profile", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}