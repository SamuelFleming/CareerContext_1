# 204 — Experience and Activity Middleware and Validation

## Status

**Planned**

## Phase

Phase 2 — Experience Evidence

## Depends On

- **202** — Experience backend CRUD
- **203** — Activity backend CRUD

## Objective

Extract repeated request validation, param checks, and ownership loading from services/controllers into reusable Express middleware. Establish a standard pattern for evidence entity routes before workspace and UI work expand the surface area.

## Why Now

Tickets **202** and **203** intentionally inlined validation and ownership checks inside services (`createServiceError`, `assertValidObjectId`, `findOwnedExperience`, `findOwnedActivity`). That was appropriate for fast CRUD delivery, but the same logic now appears in multiple places and will grow with **205** (workspace) and Screen 6–8 routes.

Centralising middleware now:

- keeps controllers thin
- makes ownership failures consistent (`400` invalid id vs `404` not found)
- prepares for UI tickets that hit the same params repeatedly
- mirrors existing cross-cutting middleware (`authenticateWithJwt`, `mediaTypeValidator`)

## Proposed Middleware

### 1. `validateObjectIdParam(paramName, label?)`

**File:** `server/src/middleware/validateObjectIdParam.js`

Factory middleware for route params such as `:experienceId` and `:activityId`.

| Input | Result |
|-------|--------|
| Missing / invalid ObjectId | `400` `{ message: 'Invalid experience ID' }` |
| Valid | `next()` |

**Use on:**

- `GET/PUT/DELETE /api/experiences/:experienceId`
- `GET/POST /api/experiences/:experienceId/activities`
- `GET/PUT/DELETE /api/activities/:activityId`
- `GET /api/experiences/:experienceId/workspace` (**205**)

### 2. `loadOwnedExperience`

**File:** `server/src/middleware/evidence/loadOwnedExperience.js`

After auth + valid `:experienceId`:

1. Load non-archived `Experience` where `_id = experienceId` and `userId = req.user.userId`
2. On miss → `404` `{ message: 'Experience not found' }`
3. On hit → attach `req.experience` and call `next()`

**Use on:** experience detail mutations, nested activity list/create, workspace (**205**).

**Benefit:** removes duplicate `findOwnedExperience` calls from services; services accept `experience` document or id as needed.

### 3. `loadOwnedActivity`

**File:** `server/src/middleware/evidence/loadOwnedActivity.js`

Same pattern for `:activityId` → `req.activity`.

**Use on:** `GET/PUT/DELETE /api/activities/:activityId`, polish (Phase 4).

### 4. `validateExperienceBody(mode)`

**File:** `server/src/middleware/evidence/validateExperienceBody.js`

`mode`: `'create' | 'update'`

Validates `req.body` shape before controller:

| Create | Update |
|--------|--------|
| `type` required, enum | at least one allowed field |
| `title` required, non-empty | per-field type checks |
| optional dates, arrays, booleans | reject unknown keys (optional strict mode) |

Returns `400` with specific messages (same rules as current `experienceService`).

### 5. `validateActivityBody(mode)`

**File:** `server/src/middleware/evidence/validateActivityBody.js`

Same pattern for Activity create/update (`title` required on create; `evidenceStrength` enum; string arrays).

### 6. Shared service utilities (optional small refactor)

**File:** `server/src/utils/serviceError.js`

Extract `createServiceError` used across profile, experience, and activity services.

**File:** `server/src/utils/parseRequestFields.js` (optional)

Shared `parseOptionalDate`, `parseStringArray` helpers currently duplicated between experience and activity services.

## Suggested Route Stacks

```text
# Experience CRUD
authenticateWithJwt
→ validateObjectIdParam('experienceId')   # detail routes only
→ validateExperienceBody('create'|'update')  # POST/PUT only
→ mediaTypeValidator                    # POST/PUT only
→ controller

# Nested activities
authenticateWithJwt
→ validateObjectIdParam('experienceId')
→ loadOwnedExperience                   # list/create
→ validateActivityBody('create')        # POST only
→ mediaTypeValidator                    # POST only
→ controller

# Activity CRUD
authenticateWithJwt
→ validateObjectIdParam('activityId')
→ loadOwnedActivity                     # get/update/delete
→ validateActivityBody('update')        # PUT only
→ mediaTypeValidator                    # PUT only
→ controller
```

## Out of Scope

- Journal middleware (Phase 5)
- Opportunity/Document validators (Phase 3)
- Zod/Joi dependency — keep lightweight manual validators consistent with Phase 1 unless team decides otherwise
- Changing API response envelopes

## Refactor Targets (after middleware exists)

| Current location | Move to |
|------------------|---------|
| `experienceService.assertValidObjectId` | `validateObjectIdParam` |
| `experienceService.findOwnedExperience` | `loadOwnedExperience` + slimmer service |
| `activityService.findOwnedActivity` | `loadOwnedActivity` |
| Create/update field validation in services | `validateExperienceBody` / `validateActivityBody` |

Services should retain business rules (e.g. `activityCount` aggregation, archive side effects) while HTTP input validation moves to middleware.

## Files (planned)

```
server/src/middleware/validateObjectIdParam.js
server/src/middleware/evidence/loadOwnedExperience.js
server/src/middleware/evidence/loadOwnedActivity.js
server/src/middleware/evidence/validateExperienceBody.js
server/src/middleware/evidence/validateActivityBody.js
server/src/utils/serviceError.js
server/src/routes/experienceRoutes.js          # wire stacks
server/src/routes/activityRoutes.js            # wire stacks
server/src/services/experienceService.js       # slim after refactor
server/src/services/activityService.js         # slim after refactor
```

## Acceptance Criteria

- [ ] Invalid `:experienceId` / `:activityId` returns `400` before service layer
- [ ] Not-found / not-owned records return `404` via ownership loaders
- [ ] Create/update validation errors return `400` with same messages as **202**/**203**
- [ ] Controllers no longer duplicate param validation logic
- [ ] Existing manual API behaviour unchanged (regression check against **202**/**203** flows)
- [ ] Route stack documented in this ticket and referenced from **205**

## Implementation Note

Do **not** block **205** on full strict-mode body validation if timeboxed — minimum viable **204** is `validateObjectIdParam` + `loadOwnedExperience` + `loadOwnedActivity`.
