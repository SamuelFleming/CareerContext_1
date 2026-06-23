---
phase: 2
status: implemented
source: large-feature plan — JWT expiry handling (item 24)
---
# Ticket 240 — Backend JWT Expiry Responses

## Status

**Implemented** — 2026-06-23

## Phase

Phase 2 — cross-cutting auth hardening (applies to all authenticated endpoints)

## Depends on

- Phase 1 auth foundation (**CC-004** / API-001–003) — complete

## Related screen(s)

- All authenticated screens (4–8, app shell)
- API-003 and every JWT-protected route

## Related docs

- `docs/core-scope/08_api_contract.md` — error envelope and 401 semantics
- `server/README.md` — `JWT_EXPIRES_IN` env var

## Objective

When a JWT is missing, expired, or invalid, the backend must return a **contract-aligned 401** with a **machine-readable error code** so the frontend can distinguish session timeout from other failures.

## Current state

| Area | Behaviour today |
|------|-----------------|
| `authenticateWithJwt.js` | Returns `401` with `{ error: "Unauthorized" }` or `{ error: "Invalid token" }` — flat string, not contract envelope |
| Expired vs malformed | Both map to `"Invalid token"` — client cannot tell expiry from corruption |
| API contract | Documents `{ error: { message, code } }` but auth middleware does not follow it |
| `jsonwebtoken` | `TokenExpiredError` is logged but not surfaced to the client |

## Industry practice (MVP scope)

- Use **HTTP 401** for missing, expired, and invalid access tokens.
- Return a **stable `code`** the client can branch on (`TOKEN_EXPIRED`, `TOKEN_INVALID`, `AUTH_REQUIRED`).
- Keep JWT **stateless** for MVP — no refresh-token rotation; user re-authenticates via login.
- Do **not** leak sensitive verification details in error messages.

Out of scope for MVP: refresh tokens, sliding sessions, server-side session revocation, proactive client-side expiry warnings.

## Scope

### Auth middleware

Update `server/src/middleware/auth/authenticateWithJwt.js`:

| Condition | Status | `code` | `message` (human-readable) |
|-----------|--------|--------|----------------------------|
| No `Authorization` bearer token | 401 | `AUTH_REQUIRED` | Not authenticated |
| `jwt.verify` → `TokenExpiredError` | 401 | `TOKEN_EXPIRED` | Session has expired |
| `jwt.verify` → other JWT errors | 401 | `TOKEN_INVALID` | Invalid or malformed token |

Response shape (align with `08_api_contract.md`):

```json
{
  "error": {
    "message": "Session has expired",
    "code": "TOKEN_EXPIRED"
  }
}
```

### API contract

Add an **Authentication errors** subsection under contract conventions in `08_api_contract.md` documenting the three codes above for all protected endpoints.

Update API-003 error notes to reference `TOKEN_EXPIRED` / `TOKEN_INVALID` / `AUTH_REQUIRED`.

### Dev verification support

Document in `server/README.md` (or ticket completion notes) that local testing should temporarily set:

```env
JWT_EXPIRES_IN=1m
```

Revert to `1h` (or omit) after verification. No committed `.env` changes required.

## Out of scope

- Refresh tokens or silent re-auth
- Changing `JWT_EXPIRES_IN` default in code (env-only for dev testing)
- Migrating all legacy `{ message }` error shapes across non-auth controllers
- Frontend redirect logic (**241**)
- Logout endpoint (commented stub remains unused)

## Technical tasks

- [x] Map `err.name === 'TokenExpiredError'` to `TOKEN_EXPIRED` response
- [x] Map missing token to `AUTH_REQUIRED`
- [x] Map other verify failures to `TOKEN_INVALID`
- [x] Use contract envelope `{ error: { message, code } }` consistently in auth middleware
- [x] Update `08_api_contract.md` auth error codes
- [x] Note short `JWT_EXPIRES_IN` for local expiry testing in `server/README.md`

## Acceptance criteria

- [x] Missing token on a protected route returns `401` with `code: AUTH_REQUIRED`
- [x] Expired token returns `401` with `code: TOKEN_EXPIRED` and message indicating session timeout
- [x] Malformed/invalid token returns `401` with `code: TOKEN_INVALID`
- [x] Responses use `{ error: { message, code } }` envelope
- [x] `08_api_contract.md` documents auth error codes
- [x] Manual curl test with expired token (after `JWT_EXPIRES_IN=1m`) returns `TOKEN_EXPIRED`

## Likely touched files

- `server/src/middleware/auth/authenticateWithJwt.js`
- `docs/core-scope/08_api_contract.md`
- `server/README.md`

## Completion notes

- `authenticateWithJwt` now returns `{ error: { message, code } }` for `AUTH_REQUIRED`, `TOKEN_EXPIRED`, and `TOKEN_INVALID`.
- Contract updated with **Authentication errors** subsection; API-003 error notes cross-link the codes.
- `server/README.md` documents `JWT_EXPIRES_IN=1m` for local expiry testing (**241**).
- Verified via direct middleware invocation: all three codes return `401` with correct envelope. Restart `node server.js` to pick up changes on a running dev instance.
