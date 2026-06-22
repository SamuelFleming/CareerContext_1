---
phase: 2
status: implemented
source: large-feature plan — JWT expiry handling (item 24)
---
# Ticket 241 — Frontend Session Expiry Handling

## Status

**Implemented** — 2026-06-23

## Phase

Phase 2 — cross-cutting auth hardening (applies to all authenticated screens)

## Depends on

- **240** — Backend JWT expiry responses (stable `401` codes and envelope)

## Related screen(s)

- Screen 2 — Login (re-auth destination)
- Screens 4–8 — any screen that fetches while token is stale
- App shell / `ProtectedRoute`

## Related docs

- `docs/core-scope/06_screen_catalogue_and_data_requirements.md` — session validation via API-003
- `docs/core-scope/08_api_contract.md` — error envelope
- `.cursor/rules/frontend.mdc` — `apiClient` as single HTTP entry point

## Objective

When the API returns `401` because the JWT expired (or is no longer valid), the frontend must **clear the stale session**, **redirect to login**, and **avoid showing generic “Request failed” errors** on protected screens.

## Current state

| Area | Behaviour today |
|------|-----------------|
| `apiClient.getErrorMessage` | Reads `message` only; auth middleware returns `{ error: "…" }` string → falls back to **"Request failed"** |
| `apiClient` | No status/code awareness; throws plain `Error` |
| `AuthContext` | Validates token only on **initial mount** via `GET /api/auth/me`; `isAuthenticated` stays `true` after expiry |
| `ProtectedRoute` | Gates on `isAuthenticated` — stale token keeps routes open |
| Screen pages | Catch errors locally → show `error.message` ("Request failed") in alert banners |
| `LoginPage` | Supports `location.state.from` redirect after login; no session-expired notice |

## Industry practice (MVP scope)

- **Centralise 401 handling** in the API client (interceptor pattern) — do not fix per screen.
- On session-related `401`: clear stored token, reset auth state, redirect to login.
- Show a **neutral informational message** on login ("Your session expired. Please sign in again.") — not a red form-error for user fault.
- Preserve **return URL** (`state.from`) so post-login navigation resumes the workspace.
- Exclude **login/register** requests from the global handler (wrong password must stay on the form).
- Guard against **duplicate redirects** when multiple API calls fail in parallel.

Out of scope for MVP: refresh tokens, modal re-login overlay, toast library, proactive expiry countdown.

## Scope

### 1) Structured API errors (`apiClient.js`)

- Parse error body per contract: `error.message`, nested `error.code`, legacy `message`, and flat `error` string fallback.
- Throw a typed error (e.g. `ApiError`) exposing `status`, `code`, and `message`.
- Register an optional `onUnauthorized` callback (set once from auth layer).
- When `status === 401` and path is **not** `/api/auth/login` or `/api/auth/register`:
  - Invoke `onUnauthorized` with `{ code, message }`
  - Still throw so callers can skip redundant UI error if they choose

### 2) Auth session bridge

- Extend `authContext.jsx` with `handleSessionExpired` (clear token, `setUser(null)`).
- Add a small bridge component (e.g. `AuthSessionBridge`) rendered **inside** `RouterProvider` that:
  - Registers `onUnauthorized` with `apiClient`
  - Calls `handleSessionExpired` + `navigate('/login', { replace: true, state: { from: currentLocation, reason: 'session_expired' } })`
  - Uses a ref guard so parallel 401s trigger only one redirect

Wire bridge in `App.jsx` or top-level layout inside the router tree.

### 3) Login UX

- `LoginPage`: when `location.state?.reason === 'session_expired'`, show an **info** banner (distinct from `formError` styling) with copy such as: "Your session expired. Please sign in again."
- After successful login, continue using existing `state.from` redirect.

### 4) Screen error hygiene

- Ensure session expiry does **not** surface as a page-level error banner on the screen being left (redirect should win).
- No per-screen 401 special-casing required if global handler runs first; optionally document that screens should not treat `ApiError` with `code === 'TOKEN_EXPIRED'` as a load failure.

### 5) Local verification (with **240**)

Manual test procedure (document in completion notes):

1. Set `JWT_EXPIRES_IN=1m` in `server/.env`; restart server.
2. Log in via client; navigate to Dashboard or Experiences.
3. Wait >1 minute; trigger a fetch (refresh page or navigate).
4. Expect: redirect to Login with session-expired info message — **not** "Request failed" on a protected page.
5. Log in again; confirm redirect back to prior route when applicable.
6. Restore `JWT_EXPIRES_IN=1h`.

## Out of scope

- Refresh / silent token renewal
- Changing backend middleware (**240**)
- Per-screen duplicate 401 handlers
- Automated E2E tests (manual local verification sufficient for MVP)

## Technical tasks

- [x] Add `ApiError` (or equivalent) and improve `getErrorMessage` parsing
- [x] Add `setUnauthorizedHandler` / `onUnauthorized` hook in `apiClient`
- [x] Implement `AuthSessionBridge` with navigate + deduped redirect
- [x] Extend `authContext` with `handleSessionExpired`
- [x] Update `LoginPage` session-expired info banner
- [x] Wire bridge in app shell
- [x] Run manual expiry test with `JWT_EXPIRES_IN=1m`

## Acceptance criteria

- [x] Expired JWT during an authenticated session redirects to Login without "Request failed" on the protected screen
- [x] Login shows a clear session-expired message (info, not login-form validation error)
- [x] Stale token is removed from `localStorage`
- [x] `isAuthenticated` becomes `false` after expiry handling
- [x] Wrong password on login still shows form error and does **not** trigger global redirect loop
- [x] Successful re-login returns user to `state.from` when present
- [x] `npm run build` passes
- [x] Manual test with `JWT_EXPIRES_IN=1m` documented in completion notes

## Likely touched files

- `client/src/services/apiClient.js`
- `client/src/features/auth/authContext.jsx`
- `client/src/features/auth/LoginPage.jsx`
- `client/src/features/auth/AuthSessionBridge.jsx` (new)
- `client/src/app/router.jsx`

## Completion notes

- `apiClient` exports `ApiError`, parses `{ error: { message, code } }`, and registers `setUnauthorizedHandler`.
- On session `401` (all paths except login/register), handler runs then request returns a non-settling promise so screen `catch` blocks do not flash errors.
- `AuthSessionBridge` in router `RootLayout` clears session, dedupes redirects, and navigates to `/login` with `reason: session_expired` and preserved `from`.
- `LoginPage` shows info banner using `--info-100` / `--info-600` tokens.
- `handleSessionExpired` also sets `isLoading: false` so login remains usable after `/api/auth/me` expiry on load.
- **Manual verification:** set `JWT_EXPIRES_IN=1m`, restart server, log in, wait >1 min, refresh or navigate — expect login info banner and no protected-page error. Restore `JWT_EXPIRES_IN=1h` after testing.
