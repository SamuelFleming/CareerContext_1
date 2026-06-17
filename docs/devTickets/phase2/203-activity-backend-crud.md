# 203 — Activity Backend CRUD

## Status

**Planned**

## Phase

Phase 2 — Experience Evidence

## Related Screen

```
7. Experience Detail (activity list + create)
8. Activity Detail
```

## Depends On

- **200** — Phase 2 planning and data contract review
- **201** — Experience and Activity models
- **202** — Experience backend CRUD (parent ownership checks)

## Related Docs

- `docs/core-scope/08_api_contract.md` — API-015, API-016, API-018 through API-020

## Objective

Implement authenticated CRUD for Activities, replacing 501 scaffold responses.

## Endpoints

| ID | Method | Endpoint |
|----|--------|----------|
| API-015 | GET | `/api/experiences/:experienceId/activities` |
| API-016 | POST | `/api/experiences/:experienceId/activities` |
| API-018 | GET | `/api/activities/:activityId` |
| API-019 | PUT | `/api/activities/:activityId` |
| API-020 | DELETE | `/api/activities/:activityId` |

Out of scope: polish (`API-021`).

## Files

```
server/src/models/Activity.js
server/src/models/Experience.js
server/src/services/activityService.js
server/src/controllers/activityController.js
server/src/routes/activityRoutes.js
server/src/routes/experienceRoutes.js
```

## Auth

Apply `authenticateWithJwt` to activity routes (`activityRoutes.js`). Nested list/create routes on `experienceRoutes.js` inherit auth once **202** adds `router.use(authenticateWithJwt)`.

## Delete Semantics

Same as **202**: `DELETE` soft-archives (`isArchived`, `archivedAt`). List/get exclude archived by default.

## Parent Experience Guard

Before list or create under `/api/experiences/:experienceId/activities`:

1. Resolve parent experience by `experienceId` + `userId`
2. Return `404` if missing, invalid id, or not owned
3. Only then list/create child activities

## Create Request Example

```json
{
  "title": "OMS Joint Applicant Unlink Screen",
  "rawDescription": "Built Angular frontend components and .NET API endpoints..."
}
```

## Update Request Example

```json
{
  "title": "OMS Joint Applicant Unlink Screen",
  "rawDescription": "Updated raw notes...",
  "polishedSummary": "Updated polished summary..."
}
```

## Get Activity Response

Include parent context for Screen 8 breadcrumbs (per API contract):

```json
{
  "data": {
    "activity": {
      "id": "activityId",
      "experienceId": "experienceId",
      "title": "...",
      "rawDescription": "...",
      "polishedSummary": "..."
    },
    "parentExperience": {
      "id": "experienceId",
      "title": "QLD Digital Graduate Developer"
    }
  }
}
```

## Field Naming Note

Use **`rawDescription`** and **`polishedSummary`** — not `rawContentMd` or `polishedContentMd`.

## Response Conventions

Same as **202** — follow Phase 1 controller/service error and envelope patterns.

## Technical Tasks

- [ ] Create `activityService.js`
- [ ] Implement list activities for owned experience
- [ ] Implement create activity under owned experience (set both `userId` and `experienceId`)
- [ ] Implement get activity by id (owned; include `parentExperience`)
- [ ] Implement update activity (owned)
- [ ] Implement archive activity (owned)
- [ ] Wire controllers; replace `notImplemented` stubs for CRUD only
- [ ] Keep polish endpoint as 501

## Acceptance Criteria

- [ ] User can list activities for their own non-archived experience
- [ ] User cannot list activities for another user's experience
- [ ] User can create activity under their own experience
- [ ] User can get/update/archive their own activity
- [ ] User cannot access or mutate another user's activity
- [ ] Activity responses include `experienceId`
- [ ] `GET /api/activities/:activityId` includes `parentExperience` summary
- [ ] Unauthenticated requests return `401`
- [ ] Manual API tests pass
