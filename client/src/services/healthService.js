// client/src/services/healthService.js
import { apiRequest } from "./apiClient";

export function getApiHealth() {
  return apiRequest("/api/health");
}
