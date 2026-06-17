# 202 — Experience Backend CRUD

## Status

**Implemented**

## Phase

Phase 2 — Experience Evidence

## Related Screen

```
6. Experience Index
7. Experience Detail (partial — workspace deferred to **204**)
```

## Depends On

- **200** — Phase 2 planning and data contract review
- **201** — Experience and Activity models

## Related Docs

- `docs/core-scope/08_api_contract.md` — API-009 through API-013

## Objective

Implement authenticated CRUD for Experiences, replacing 501 scaffold responses.

## Endpoints

| ID | Method | Endpoint |
|----|--------|----------|
| API-009 | GET | `/api/experiences` |
| API-010 | POST | `/api/experiences` |
| API-011 | GET | `/api/experiences/:experienceId` |
| API-012 | PUT | `/api/experiences/:experienceId` |
| API-013 | DELETE | `/api/experiences/:experienceId` |

Out of scope for this ticket: workspace (`API-014`), nested activities (`API-015`/`016`), polish (`API-017`).

## Files

```
server/src/models/Experience.js
server/src/services/experienceService.js
server/src/controllers/experienceController.js
server/src/routes/experienceRoutes.js
```

## Auth

Apply `authenticateWithJwt` to all experience routes (use `router.use(authenticateWithJwt)` like `profileRoutes.js`). Routes currently have **no auth middleware**.

## Delete Semantics

`DELETE` performs a **soft archive**:

- Set `isArchived: true` and `archivedAt: new Date()`
- Do not remove the document from MongoDB
- List/get endpoints exclude archived records by default
- Response message: `"Experience archived"` (or `"Experience deleted"` if you prefer user-facing wording — align with API contract note on delete vs archive)

## List Behaviour (`GET /api/experiences`)

- Return only non-archived experiences for `req.user.userId`
- Support optional query params (implement if low-cost; otherwise document as follow-up):
  - `type` — filter by experience type
  - `search` — case-insensitive match on `title`, `organisation`, `role`
  - `limit` — cap results (sensible default, e.g. 50)
- Include `activityCount` per list item (count non-archived activities for that experience — requires Activity model from **201**)
- Response envelope:

```json
{
  "data": [ /* experience list items */ ],
  "meta": { "count": 0 }
}
```

## Create Request Example

```json
{
  "type": "job",
  "title": "QLD Digital Graduate Developer",
  "organisation": "Blue Card Services",
  "role": "Full Stack Developer",
  "dateStart": "2025-01-01",
  "dateEnd": null,
  "isCurrent": true,
  "overviewRaw": "Working across Angular, .NET and SQL..."
}
```

## Update Request Example

```json
{
  "title": "QLD Digital Graduate Developer",
  "overviewRaw": "Updated raw overview...",
  "overviewPolished": "Updated polished overview..."
}
```

## Response Conventions

Follow Phase 1 controller patterns (`profileController`, `dashboardController`):

- Success read: `{ data: { experience } }` or `{ data: [...], meta }`
- Success create: `201` with `{ message, data: { experience: { id } } }`
- Success update: `200` with `{ message, data: { experience } }`
- Errors: `{ message }` with appropriate status (400 validation, 401 unauthenticated, 404 not found / not owned, 500 unexpected)

Use `createServiceError(statusCode, message)` pattern from `profileService.js`.

## Ownership Rules

- All queries filter by `userId` from JWT
- Invalid ObjectId → `400`
- Record not found or not owned → `404` (do not leak existence across users)

## Technical Tasks

- [x] Add `router.use(authenticateWithJwt)` to experience routes
- [x] Create `experienceService.js` with list, create, getById, update, archive
- [x] Wire controller methods to service (replace `notImplemented` stubs for CRUD only)
- [x] Validate required fields on create (`type`, `title`)
- [x] Validate `type` enum
- [x] Exclude archived records from list/get
- [x] Compute `activityCount` on list items
- [x] Return consistent error responses

## Acceptance Criteria

- [x] `GET /api/experiences` returns only the current user's non-archived experiences
- [x] `POST /api/experiences` creates an experience for the current user
- [x] `GET /api/experiences/:experienceId` returns one owned experience
- [x] `PUT /api/experiences/:experienceId` updates one owned experience
- [x] `DELETE /api/experiences/:experienceId` archives one owned experience (soft delete)
- [x] Another user cannot access or mutate someone else's experience
- [x] Unauthenticated requests return `401`
- [x] Manual API tests pass
- [x] Polish and workspace endpoints remain 501 until their tickets
