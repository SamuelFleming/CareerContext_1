// client/src/services/dashboardService.js
import { apiRequest } from "./apiClient";

/**
 * GET /api/dashboard (API-004)
 * @returns {Promise<{ data: {
 *   identity, profileCompleteness, interactiveCv,
 *   evidencePanel: {
 *     evidenceSummary: { status, message, counts: { experiences, activities, journalEntries } },
 *     recentActivity: { status, message, items: Array<{ id, entityType, title, updatedAt, href }> }
 *   },
 *   phasePlaceholders
 * } }>}
 */
export function getDashboard() {
  return apiRequest("/api/dashboard");
}
