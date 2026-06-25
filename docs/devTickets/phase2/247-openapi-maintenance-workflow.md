---
phase: 2
status: planned
source: large-feature plan — Configure Swagger Environment for API
---
# Ticket 247 — OpenAPI Maintenance Workflow (Cursor Rules & Commands)

## Status

**Planned**

## Phase

Cross-cutting infrastructure — developer workflow

## Depends on

- **245** — Swagger environment
- **246** — Initial API snapshot (rules must reference real paths)

## Related screen(s)

- N/A — agent/developer workflow

## Related docs

- `.cursor/rules/backend.mdc`
- `.cursor/rules/documentation.mdc`
- `.cursor/commands/implement-dev-task.md`
- `.cursor/commands/small-change.md`
- `.cursor/commands/develop-large-feature.md`
- `.cursor/commands/audit-diagnose.md`
- `docs/core-scope/08_api_contract.md` — API design intent

## Objective

Ensure backend API changes keep **both** sources of truth in sync:

| Source | When to update |
|--------|----------------|
| **OpenAPI** (`server/src/openapi/`) | Handler ships or changes — **implemented endpoints only** |
| **API contract** (`08_api_contract.md`) | Design intent changes — new planned endpoints, conventions, cross-phase registry |

Cursor rules and commands encode this as part of definition of done for server work.

## Scope

### `.cursor/rules/backend.mdc`

Add section **OpenAPI / Swagger maintenance**:

- OpenAPI spec lives in `server/src/openapi/`; UI at `/api/docs` when enabled
- OpenAPI documents **implemented endpoints only** — do not add stubs or planned routes
- **Handler change** (routes, validation, response shape, status codes, auth) → update matching `server/src/openapi/paths/<domain>.json` and shared schemas in `openapi.base.json`
- **New planned endpoint** → add to `08_api_contract.md` first; add OpenAPI path when handler ships
- **New registry ID** → assign in contract; use `x-api-id` in OpenAPI when implemented
- OpenAPI must accurately reflect live behaviour; contract documents design intent — both are maintained, neither replaces the other
- Verification: `npm run openapi:validate` or load `/api/docs/openapi.json` after backend edits

Add to **Do not**:

- Ship backend route/handler changes without updating OpenAPI when **245** is implemented
- Document endpoints only in `server/README.md` tables (README links to Swagger instead)

### `.cursor/rules/documentation.mdc`

Add bullet under **Contract alignment**:

- When `08_api_contract.md` changes for a **planned** endpoint, OpenAPI is unchanged until the handler ships.
- When an endpoint is **implemented or changed**, update OpenAPI in the same ticket; update the contract when design intent or registry changes.

### `.cursor/commands/implement-dev-task.md`

Add step after implementation (before completion report):

- **OpenAPI:** If the ticket touches `server/` routes, controllers, middleware validation, or response envelopes, update `server/src/openapi/` to match. Include Swagger verification in the report.

Update step 8 (completion registry) to mention OpenAPI alongside contract docs.

### `.cursor/commands/small-change.md`

Under **Escalation**, add:

- Backend change affecting HTTP API without OpenAPI update → recommend completing the OpenAPI fragment before finishing.

Under **Instructions**, add:

- If editing `server/src/routes/**` or validation middleware with API impact, update the corresponding OpenAPI path file in the same change.

### `.cursor/commands/develop-large-feature.md`

Under **Constraints**:

- Backend tickets in a large feature must include OpenAPI path updates in scope; plan should list affected `server/src/openapi/paths/*.json` files per ticket.

### `.cursor/commands/audit-diagnose.md`

Under diagnosis checklist:

- When investigating API drift, compare live handler, `08_api_contract.md` (intent), and `server/src/openapi/paths/` (implemented snapshot).

### `CLAUDE.md` (optional, minimal)

Under **Working Rules** or **Sources of Truth**, one line:

- Live OpenAPI mirror: `server/src/openapi/` → `/api/docs` (dev); keep in sync with backend changes.

### `server/README.md`

Add **Maintaining the API spec** subsection:

- Which files to edit per route module
- When to update `08_api_contract.md` vs OpenAPI only
- Link to ticket **247** conventions

## Out of scope

- Pre-commit hooks or CI validation (future enhancement)
- OpenAPI linting with Spectral (future)
- Frontend rule changes (client consumes API but does not own spec)

## Files (likely)

| File | Action |
|------|--------|
| `.cursor/rules/backend.mdc` | Add OpenAPI maintenance section |
| `.cursor/rules/documentation.mdc` | Contract alignment bullet |
| `.cursor/commands/implement-dev-task.md` | OpenAPI verification step |
| `.cursor/commands/small-change.md` | API + OpenAPI coupling |
| `.cursor/commands/develop-large-feature.md` | Plan OpenAPI per ticket |
| `.cursor/commands/audit-diagnose.md` | Drift triangulation |
| `CLAUDE.md` | Optional one-line pointer |
| `server/README.md` | Maintainer guide |

## Technical tasks

- [ ] Update `backend.mdc` with maintenance rules and anti-patterns
- [ ] Update all four workflow commands listed above
- [ ] Update `documentation.mdc` contract alignment
- [ ] Add maintainer notes to `server/README.md`
- [ ] Optionally add one line to `CLAUDE.md`

## Acceptance criteria

- [ ] `backend.mdc` explicitly requires OpenAPI updates for backend API changes
- [ ] `implement-dev-task` command includes OpenAPI as part of done checklist
- [ ] `small-change` escalates or requires OpenAPI sync for route edits
- [ ] `develop-large-feature` requires OpenAPI files in per-ticket scope
- [ ] `audit-diagnose` mentions contract vs OpenAPI vs code comparison
- [ ] `server/README.md` documents how to maintain spec files
- [ ] No contradictory guidance (e.g. README still saying manual tables are source of truth)

## Verification

- Read updated rules/commands — confirm an agent implementing a hypothetical new `POST /api/documents` would be instructed to edit `paths/documents.json` and `08_api_contract.md`
- Grep `.cursor/` for "OpenAPI" — all backend workflow entry points covered

## Dependencies for downstream

- All future Phase 3+ backend tickets inherit these rules automatically once **247** is implemented
- Consider a future ticket for CI `openapi:validate` on PRs (not in this batch)
