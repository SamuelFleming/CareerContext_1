# 204 — Experience Workspace Endpoint

## Status

**Planned**

## Phase

Phase 2 — Experience Evidence

## Related Screen

```
7. Experience Detail
```

## Depends On

- **202** — Experience backend CRUD
- **203** — Activity backend CRUD

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
    "journalEntries": []
  }
}
```

## Scope

- Load owned, non-archived experience
- Include non-archived activities for that experience
- Return `journalEntries: []` as empty array until Phase 5 Journal API exists

## Acceptance Criteria

- [ ] Authenticated user receives workspace for owned experience
- [ ] `404` for invalid id, not found, or not owned
- [ ] `activities` populated from Activity collection
- [ ] `journalEntries` is empty array (placeholder for Phase 5)
