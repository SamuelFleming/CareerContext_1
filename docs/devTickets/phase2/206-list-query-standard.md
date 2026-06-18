# 206 — List Query Standard (Filter, Search, Sort, Pagination)

## Status

**Implemented** (Experience + Activity lists and workspace slice; Dashboard caps documented for follow-on)

## Phase

Phase 2 — Experience Evidence (foundation); applies cross-phase to Journal, Opportunities, Documents

## Depends On

- **202** — Experience backend CRUD
- **203** — Activity backend CRUD
- **205** — Experience workspace endpoint

## Objective

Prevent unbounded list payloads as entity counts grow. Standardise how all multi-record `GET` endpoints accept filter/search/sort/pagination query params and return list metadata.

## Problem

Without pagination:

- `GET /api/experiences` could return hundreds of experience cards
- `GET /api/experiences/:id/activities` and workspace `activities` could return thousands of evidence items
- `GET /api/dashboard` must never become a dump of all user evidence

Screen-level convenience endpoints (workspace, dashboard) should return **bounded previews** or **paginated slices**, not full collections.

## Shared List Query Params

Applied to list endpoints unless noted otherwise:

| Param | Type | Default | Notes |
|-------|------|---------|-------|
| `limit` | integer | `20` | Max `100` |
| `offset` | integer | `0` | For skip-based pagination |
| `sort` | string | entity-specific | Must be in allowed sort fields |
| `order` | `asc` \| `desc` | `desc` | Sort direction |
| `search` | string | — | Case-insensitive text match on entity-specific fields |

### Standard list response envelope

```json
{
  "data": [],
  "meta": {
    "count": 0,
    "total": 0,
    "limit": 20,
    "offset": 0,
    "hasMore": false
  }
}
```

| Field | Meaning |
|-------|---------|
| `count` | Items in this response |
| `total` | Matching records in DB (before pagination) |
| `limit` | Page size used |
| `offset` | Skip used |
| `hasMore` | `offset + count < total` |

## Implementation

**Shared utility:** `server/src/utils/listQuery.js`

- `parseListQuery(query, options)`
- `buildListMeta({ count, total, limit, offset })`

## Endpoint Adjustments

### API-009 — `GET /api/experiences`

**Filters:** `type` (experience enum)

**Search:** `title`, `organisation`, `role`

**Sort fields:** `updatedAt`, `createdAt`, `title`, `dateStart`

**Example:**

```http
GET /api/experiences?type=job&search=angular&sort=updatedAt&order=desc&limit=20&offset=0
```

### API-015 — `GET /api/experiences/:experienceId/activities`

**Search:** `title`, `rawDescription`

**Sort fields:** `updatedAt`, `createdAt`, `title`

**Example:**

```http
GET /api/experiences/:experienceId/activities?limit=20&offset=0&sort=updatedAt&order=desc
```

### API-014 — `GET /api/experiences/:experienceId/workspace`

Returns one experience plus a **paginated activities slice** (same query params as API-015).

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

`journalEntries` remains `[]` until Phase 5; `journalMeta` is a placeholder using the same pagination shape.

**UI guidance:** Screen 7 loads workspace for header + first activity page; use API-015 with `offset` for “load more” or infinite scroll.

### API-004 — `GET /api/dashboard` (follow-on — not in this ticket’s code)

Dashboard is **not** a list endpoint. When wiring real evidence (replacing Phase 1 mocks):

| Field | Rule |
|-------|------|
| `evidenceSummary.counts` | `countDocuments` only — no entity arrays |
| `interactiveCv.highlightExperiences` | Cap at **5** (e.g. most recently updated) |
| `evidencePanel.recentActivity.items` | Cap at **10** (mixed recent Experience/Activity updates) |

Never return full experience or activity collections from dashboard.

## Future Endpoints (apply same standard)

| Endpoint | Filters (planned) | Search (planned) |
|----------|-------------------|------------------|
| `GET /api/journal` | `experienceId`, `activityId`, `status` | `title`, `content`, `tags` |
| `GET /api/opportunities` | `status` | `title`, `company` |
| `GET /api/documents` | `opportunityId`, `type`, `status` | `title` |

## Out of Scope

- Cursor-based pagination (offset is sufficient for MVP)
- Full-text search indexes / Atlas Search
- `select` field projection (deferred; noted in API-009 example)

## Acceptance Criteria

- [x] Shared `listQuery` utility exists
- [x] `GET /api/experiences` supports `limit`, `offset`, `sort`, `order`, `search`, `type` with full `meta`
- [x] `GET /api/experiences/:experienceId/activities` supports pagination + search + sort with full `meta`
- [x] Workspace returns paginated `activities` + `activitiesMeta`
- [x] `08_api_contract.md` documents list query conventions
- [ ] Dashboard real-data wiring uses capped previews only (separate UI ticket)

## Related Docs

- `docs/core-scope/08_api_contract.md` — List Query Conventions section
- `docs/devTickets/phase2/205-experience-workspace-endpoint.md`
