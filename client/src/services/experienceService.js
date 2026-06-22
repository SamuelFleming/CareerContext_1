// client/src/services/experienceService.js
import { apiRequest } from "./apiClient";

function toQueryString(params = {}) {
  const qs = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      qs.set(key, String(value));
    }
  }

  const serialized = qs.toString();
  return serialized ? `?${serialized}` : "";
}

/**
 * GET /api/experiences (API-009)
 * @param {Object} [params] - type, search, sort, order, limit, offset
 * @returns {Promise<{ data: Array, meta: { count, total, limit, offset, hasMore } }>}
 */
export function listExperiences(params = {}) {
  return apiRequest(`/api/experiences${toQueryString(params)}`);
}

/**
 * POST /api/experiences (API-010)
 * @param {Object} payload - type, title, organisation?, role?, dateStart?, dateEnd?, isCurrent?, overviewRaw?, technologies?, skills?
 * @returns {Promise<{ message: string, data: { experience: { id: string } } }>}
 */
export function createExperience(payload) {
  return apiRequest("/api/experiences", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * GET /api/experiences/:experienceId (API-011)
 * @returns {Promise<{ data: { experience: Object } }>}
 */
export function getExperience(experienceId) {
  return apiRequest(`/api/experiences/${experienceId}`);
}

/**
 * PUT /api/experiences/:experienceId (API-012)
 * @returns {Promise<{ message: string, data: { experience: Object } }>}
 */
export function updateExperience(experienceId, payload) {
  return apiRequest(`/api/experiences/${experienceId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

/**
 * DELETE /api/experiences/:experienceId (API-013) — soft archive on server
 * @returns {Promise<{ message: string }>}
 */
export function deleteExperience(experienceId) {
  return apiRequest(`/api/experiences/${experienceId}`, {
    method: "DELETE",
  });
}

/**
 * GET /api/experiences/:experienceId/workspace (API-014)
 * @param {Object} [params] - limit, offset, sort, order (activities slice)
 * @returns {Promise<{ data: { experience, activities, activitiesMeta, journalEntries, journalMeta } }>}
 */
export function getExperienceWorkspace(experienceId, params = {}) {
  return apiRequest(
    `/api/experiences/${experienceId}/workspace${toQueryString(params)}`
  );
}

/**
 * GET /api/experiences/:experienceId/activities (API-015)
 * @param {Object} [params] - search, sort, order, limit, offset
 * @returns {Promise<{ data: Array, meta: { count, total, limit, offset, hasMore } }>}
 */
export function listActivitiesForExperience(experienceId, params = {}) {
  return apiRequest(
    `/api/experiences/${experienceId}/activities${toQueryString(params)}`
  );
}

/**
 * POST /api/experiences/:experienceId/activities (API-016)
 * @param {Object} payload - title, rawDescription?, polishedSummary?, technologies?, skills?, outcomes?
 * @returns {Promise<{ message: string, data: { activity: { id: string } } }>}
 */
export function createActivityForExperience(experienceId, payload) {
  return apiRequest(`/api/experiences/${experienceId}/activities`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
