---
phase: 2
status: planned
source: large-feature plan — Configure Swagger Environment for API
---
# Ticket 246 — OpenAPI Initial API Snapshot

## Status

**Planned**

## Phase

Cross-cutting infrastructure (prerequisite for Phase 3+ backend work)

## Depends on

- **245** — Swagger environment setup (file layout, UI mount, shared components)

## Related screen(s)

- Screens 2–8 (implemented endpoints only)

## Related docs

- `docs/core-scope/08_api_contract.md` — source for paths, envelopes, field names
- `docs/core-scope/05_data_model.md` — entity field names for schemas
- `server/src/middleware/evidence/validateExperienceBody.js` — request body allowlists
- `server/src/middleware/evidence/validateActivityBody.js` — request body allowlists
- `server/src/utils/listQuery.js` — list query params

## Objective

Populate the OpenAPI spec with **implemented endpoints only** — an accurate snapshot of what the server exposes today. Swagger is the testable operational mirror; planned/stub routes remain in `08_api_contract.md` only.

Swagger shows:

- Live endpoint list with methods and paths
- Request body/query/param structures
- Response envelopes and representative schemas
- Auth requirements per operation

**Do not** add 501 stubs, not-routed journal routes, or polish endpoints until their handlers are live.

## Current state (implemented vs contract)

| Domain | Route module | In OpenAPI (**246**) | In contract only |
|--------|--------------|----------------------|------------------|
| Health | `routes/index.js` | `GET /api`, `GET /api/health` | — |
| Auth | `authRoutes.js` | API-001–003 | — |
| Dashboard | `dashboardRoutes.js` | API-004 | — |
| Profile | `profileRoutes.js` | API-005–008 | — |
| Experiences | `experienceRoutes.js` | API-009–016 (not polish) | API-017 polish — 501 stub |
| Activities | `activityRoutes.js` | API-018–020 (not polish) | API-021 polish — 501 stub |
| Journal | not mounted | — | API-022–027 |
| Opportunities | `opportunityRoutes.js` | — | API-028–037 — 501 stubs |
| Documents | `documentRoutes.js` | — | API-038–042 — 501 stubs |

When a stub becomes live (Phase 3+), add its path fragment to OpenAPI in the same ticket.

## Scope

### Path fragments to create

Under `server/src/openapi/paths/`:

| File | Operations |
|------|------------|
| `health.json` | `GET /`, `GET /health` (done in **245**) |
| `auth.json` | API-001–003 |
| `dashboard.json` | API-004 |
| `profile.json` | API-005–008 |
| `experiences.json` | API-009–016 (exclude API-017 polish until implemented) |
| `activities.json` | API-018–020 (exclude API-021 polish until implemented) |

**Excluded from OpenAPI** (contract only until implemented): journal, opportunities, documents, polish routes.

### Per-operation minimum

Each operation must include:

- `summary` and `description` (brief)
- `tags`
- `x-api-id` matching registry (e.g. `API-009`)
- `security` — `[]` for public auth routes; `bearerAuth` for protected
- `parameters` — path params (`experienceId`, `activityId`, etc.) and list query params where applicable
- `requestBody` — for POST/PUT with JSON schema from validators/contract
- `responses` — at minimum `200`/`201`, `400`, `401` (reference shared `ErrorResponse`), `404` where applicable

### Shared schemas to add (in `openapi.base.json` components)

Derive from live models and contract — keep MVP depth (not every nested field on first pass):

- `User`, `CoreContext`, `ProfileResponse` (API-005 shape)
- `DashboardResponse` (identity, profileCompleteness, interactiveCv, evidencePanel — post-**242**)
- `Experience`, `Activity` — fields exposed in list/detail JSON (`id`, titles, dates, overview fields, skills, technologies, etc.)
- `ExperienceWorkspace`, `ListMeta`, envelope wrappers
- `RegisterRequest`, `LoginRequest`, `AuthTokenResponse`
- Auth error codes: `AUTH_REQUIRED`, `TOKEN_EXPIRED`, `TOKEN_INVALID` (enum on error `code`)

### List endpoints

Document standard query params per **206**:

- `limit`, `offset`, `sort`, `order`, `search`
- Entity filters documented in `08_api_contract.md` per endpoint (e.g. experience `type`, activity filters)

### Adding endpoints later

When a handler ships (e.g. Phase 3 opportunities), add the matching `paths/<domain>.json` fragment in the **same ticket** as the route implementation. Update `08_api_contract.md` when design intent changes.

## Out of scope

- Stub, not-routed, or 501-only routes (documented in `08_api_contract.md` only)
- Perfect parity with every example block in `08_api_contract.md` (aim for accurate shapes, not copy-paste bloat)
- Frontend TypeScript codegen from OpenAPI
- Automated spec generation from code

## Files (likely)

| File | Action |
|------|--------|
| `server/src/openapi/paths/*.json` | Create per implemented domain |
| `server/src/openapi/openapi.base.json` | Extend `components.schemas` |

## Technical tasks

- [ ] Audit live route handlers vs contract registry; note any status mismatches in ticket completion notes
- [ ] Add path fragments for all **implemented** endpoints with request/response schemas
- [ ] Cross-check field names against `05_data_model.md` and validators
- [ ] Test Try it out flow: register → copy token → authorize → GET profile, GET experiences

## Acceptance criteria

- [ ] Swagger UI lists implemented operations only: API-001–016, API-018–020 (exclude polish, journal, opportunities, documents)
- [ ] List endpoints show pagination query parameters and `ListMeta` in responses
- [ ] JWT bearer Try it out works for at least: `GET /api/profile`, `GET /api/experiences`, `GET /api/dashboard`
- [ ] Request bodies for create/update experience and activity match validator allowlists
- [ ] `401` responses document contract error envelope with `code` enum
- [ ] No stub or 501-only routes appear in OpenAPI

## Verification

1. Register via Swagger Try it out → Authorize with returned token
2. `GET /api/experiences` returns documented list envelope
3. `POST /api/experiences` with minimal valid body → `201`
4. Confirm `/api/opportunities` and polish routes are **absent** from `/api/docs/openapi.json`
5. Compare one experience field set against `Experience` model `toJSON` output manually

## Dependencies for downstream

- **247** — workflow rules assume this snapshot exists as the maintenance baseline
- Phase 3 tickets (**DOC-001**, opportunities) must update corresponding path fragments when stubs become live
