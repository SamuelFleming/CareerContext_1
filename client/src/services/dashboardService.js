// client/src/services/dashboardService.js
import { apiRequest } from "./apiClient";

export function getDashboard() {
  return apiRequest("/api/dashboard");
}
