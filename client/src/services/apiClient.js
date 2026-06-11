// client/src/services/apiClient.js
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3006";

export const AUTH_TOKEN_KEY = "careercontext_auth_token";

export function getStoredToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setStoredToken(token) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearStoredToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

function getErrorMessage(responseBody) {
  if (typeof responseBody === "string") {
    return responseBody;
  }

  if (responseBody.message) {
    return responseBody.message;
  }

  if (Array.isArray(responseBody.errors) && responseBody.errors.length > 0) {
    return responseBody.errors.map((error) => error.message).join(" ");
  }

  return "Request failed";
}

export async function apiRequest(path, options = {}) {
  const token = getStoredToken();

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");

  const responseBody = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    throw new Error(getErrorMessage(responseBody));
  }

  return responseBody;
}
