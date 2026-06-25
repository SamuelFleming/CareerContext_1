---
phase: 2
status: implemented
source: large-feature plan — Configure Swagger Environment for API
---
# Ticket 245 — Swagger Environment Setup

## Status

**Implemented** — 2026-06-23

## Phase

Cross-cutting infrastructure (prerequisite for Phase 3+ backend work)

## Depends on

- Phase 2 backend (**200**–**206**) — complete
- Ticket **240** — JWT error envelope (for shared 401 schema)

## Related screen(s)

- N/A — developer tooling (supports all screens using the API)

## Related docs

- `docs/core-scope/08_api_contract.md` — API design intent (full registry)
- `server/README.md` — local run + Swagger URLs

## Objective

Add a **local-development Swagger UI** that serves an OpenAPI 3.x document describing **implemented** CareerContext API endpoints. Developers can browse live routes, inspect request/response shapes, and use **Try it out** with JWT bearer auth.

### Dual sources of truth (established 2026-06-23)

| Source | Represents |
|--------|------------|
| **OpenAPI / Swagger** | Current API state — implemented handlers only |
| **08 API contract** | API design intent — planned + implemented |

## Implementation notes

- Packages: `swagger-ui-express`
- Spec layout: `server/src/openapi/openapi.base.json` + `paths/*.json` merged by `loadOpenApiSpec.js`
- Mount: `GET /api/docs` (UI), `GET /api/docs/openapi.json` (raw spec)
- Gating: enabled unless `SWAGGER_ENABLED=false` or `NODE_ENV=production`
- Initial path fragment: `paths/health.json` only; full implemented snapshot in **246**
- `npm run openapi:validate` loads and validates spec merge

## Technical tasks

- [x] Install `swagger-ui-express`
- [x] Create base OpenAPI structure with shared components and bearer auth
- [x] Implement spec loader (merge base + `paths/*.json`)
- [x] Mount `/api/docs` and `/api/docs/openapi.json` with dev gating
- [x] Document local usage in `server/README.md`
- [x] Update `08_api_contract.md` with dual-source-of-truth section
- [x] Verify UI loads at `http://localhost:3006/api/docs` with server running

## Acceptance criteria

- [x] `npm install` in `server/` succeeds with new dependencies
- [x] With `SWAGGER_ENABLED` unset or `true`, `GET /api/docs` serves Swagger UI locally
- [x] `GET /api/docs/openapi.json` returns valid OpenAPI 3.x JSON
- [x] Bearer auth scheme is defined; Try it out can attach `Authorization: Bearer <token>`
- [x] Swagger UI is **not** mounted when `SWAGGER_ENABLED=false` or `NODE_ENV=production`
- [x] `loadOpenApiSpec` throws clearly on invalid/missing fragment files
- [x] No changes to existing API route behaviour
- [x] OpenAPI includes **implemented endpoints only** (stubs/planned routes excluded)

## Dependencies for downstream

- **246** — populate path fragments for all live handlers (auth, profile, dashboard, evidence)
- **247** — Cursor rules/commands for maintenance workflow
