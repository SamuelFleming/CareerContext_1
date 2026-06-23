// client/src/services/apiClient.js
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3006";

const PUBLIC_AUTH_PATHS = new Set(["/api/auth/login", "/api/auth/register"]);

export const AUTH_TOKEN_KEY = "careercontext_auth_token";

export class ApiError extends Error {
  constructor(message, { status, code } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

let unauthorizedHandler = null;

export function setUnauthorizedHandler(handler) {
  unauthorizedHandler = handler;
}

export function getStoredToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setStoredToken(token) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearStoredToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

function parseErrorDetails(responseBody) {
  if (typeof responseBody === "string") {
    return { message: responseBody, code: undefined };
  }

  if (responseBody?.error) {
    if (typeof responseBody.error === "string") {
      return { message: responseBody.error, code: undefined };
    }

    return {
      message: responseBody.error.message,
      code: responseBody.error.code,
    };
  }

  if (responseBody?.message) {
    return { message: responseBody.message, code: undefined };
  }

  if (Array.isArray(responseBody?.errors) && responseBody.errors.length > 0) {
    return {
      message: responseBody.errors.map((error) => error.message).join(" "),
      code: undefined,
    };
  }

  return { message: "Request failed", code: undefined };
}

function shouldHandleUnauthorized(path, status) {
  return status === 401 && !PUBLIC_AUTH_PATHS.has(path);
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
    const { message, code } = parseErrorDetails(responseBody);
    const errorMessage = message || "Request failed";

    if (shouldHandleUnauthorized(path, response.status) && unauthorizedHandler) {
      unauthorizedHandler({ code, message: errorMessage });

      return new Promise(() => {});
    }

    throw new ApiError(errorMessage, {
      status: response.status,
      code,
    });
  }

  return responseBody;
}
