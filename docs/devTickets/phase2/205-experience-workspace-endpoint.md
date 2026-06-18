# 205 — Experience Workspace Endpoint

## Status

**Implemented**

## Phase

Phase 2 — Experience Evidence

## Related Screen

```
7. Experience Detail
```

## Depends On

- **202** — Experience backend CRUD
- **203** — Activity backend CRUD
- **204** — Experience and Activity middleware and validation (recommended before or in parallel)

## Related Docs

- `docs/core-scope/08_api_contract.md` — API-014

## Objective

Implement `GET /api/experiences/:experienceId/workspace` for Screen 7 initial load.

## Endpoint

| ID | Method | Endpoint |
|----|--------|----------|
| API-014 | GET | `/api/experiences/:experienceId/workspace` |

## Response Shape

```json
{
  "data": {
    "experience": {},
    "activities": [],
    "activitiesMeta": {
      "count": 0,
      "total": 0,
      "limit": 20,
      "offset": 0,
      "hasMore": false
    },
    "journalEntries": [],
    "journalMeta": {
      "count": 0,
      "total": 0,
      "limit": 20,
      "offset": 0,
      "hasMore": false
    }
  }
}
```

Activities honour list query params (`limit`, `offset`, `sort`, `order`, `search`) per **206**.

## Scope

- Load owned, non-archived experience
- Include paginated non-archived activities for that experience (default `limit=20`)
- Return `journalEntries: []` as empty array until Phase 5 Journal API exists

## Middleware (from **204**)

Recommended route stack:

```text
authenticateWithJwt
→ validateObjectIdParam('experienceId')
→ loadOwnedExperience
→ getExperienceWorkspace controller
```

## Acceptance Criteria

- [x] Authenticated user receives workspace for owned experience
- [x] `404` for invalid id, not found, or not owned
- [x] `activities` populated from Activity collection
- [x] `journalEntries` is empty array (placeholder for Phase 5)
