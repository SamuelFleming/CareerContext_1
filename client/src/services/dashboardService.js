// client/src/services/dashboardService.js
import { apiRequest } from "./apiClient";

/**
 * GET /api/dashboard (API-004)
 * @returns {Promise<{ data: {
 *   identity: { fullName, headline, email, mobile, location },
 *   profileCompleteness,
 *   interactiveCv: {
 *     summaryPreview: string | null,
 *     summaryUpdatedAt: string | null,
 *     reviewSuggested: boolean,
 *     coreCompetencies: {
 *       status: 'scaffold' | 'live',
 *       source?: string,
 *       message?: string,
 *       items: Array<{ label: string }>
 *     },
 *     topSkillsAndTechnologies: Array<{ label: string, kind: 'skill' | 'technology' }>,
 *     highlightExperiences: Array<{
 *       id: string,
 *       type: string,
 *       title: string,
 *       meta: string | null,
 *       descriptionPreview: string | null,
 *       skills: string[],
 *       technologies: string[],
 *       href: string
 *     }>
 *   },
 *   evidencePanel: {
 *     defaultView: string,
 *     evidenceSummary: { status, message, counts: { experiences, activities, journalEntries } },
 *     recentActivity: { status, message, items: Array<{ id, entityType, title, updatedAt, href }> },
 *     recentOpportunities?: { status, message, items: [] }
 *   },
 *   phasePlaceholders
 * } }>}
 */
export function getDashboard() {
  return apiRequest("/api/dashboard");
}
