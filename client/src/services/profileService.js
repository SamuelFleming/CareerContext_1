// client/src/services/profileService.js
import { apiRequest } from "./apiClient";

/**
 * GET /api/profile response shape:
 * {
 *   data: {
 *     user: { id, email },
 *     coreContext: { fullName, mobile, location, headline, rawSummaryMd, summaryUpdatedAt },
 *     coreResumeMd,
 *     coreResumeUpdatedAt
 *   }
 * }
 */
export function getProfile() {
  return apiRequest("/api/profile");
}

export function updateProfile(payload) {
  return apiRequest("/api/profile", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function updateCoreContext(rawSummaryMd) {
  return apiRequest("/api/profile/core-context", {
    method: "PUT",
    body: JSON.stringify({ rawSummaryMd }),
  });
}

export function updateCoreResume(coreResumeMd) {
  return apiRequest("/api/profile/core-resume", {
    method: "PUT",
    body: JSON.stringify({ coreResumeMd }),
  });
}
