// client/src/services/activityService.js
import { apiRequest } from "./apiClient";

/**
 * GET /api/activities/:activityId (API-018)
 * @returns {Promise<{ data: { activity: Object, parentExperience: { id, title } } }>}
 */
export function getActivity(activityId) {
  return apiRequest(`/api/activities/${activityId}`);
}

/**
 * PUT /api/activities/:activityId (API-019)
 * @returns {Promise<{ message: string, data: { activity: Object } }>}
 */
export function updateActivity(activityId, payload) {
  return apiRequest(`/api/activities/${activityId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

/**
 * DELETE /api/activities/:activityId (API-020) — soft archive on server
 * @returns {Promise<{ message: string }>}
 */
export function deleteActivity(activityId) {
  return apiRequest(`/api/activities/${activityId}`, {
    method: "DELETE",
  });
}
