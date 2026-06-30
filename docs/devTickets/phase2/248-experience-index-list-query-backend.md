---
phase: 2
status: implemented
source: large-feature plan — Experience Index filter/search/sort/pagination
---
# Ticket 248 — Experience Index List Query (Backend)

## Status

**Implemented** — 2026-06-30

## Phase

Phase 2 — Experience Evidence

## Depends on

- **206** — List query standard (shared `listQuery.js`, API-009 baseline)
- **202** — Experience backend CRUD
- **235** — Experience skills & technologies on list items (fields already on API-009 response)
- **247** — OpenAPI maintenance workflow

## Related screen(s)

- **Screen 6** — Experience Index (`/experiences`)

## Related docs

- `docs/core-scope/05_data_model.md` — Experience fields
- `docs/core-scope/06_screen_catalogue_and_data_requirements.md` — Screen 6
- `docs/core-scope/08_api_contract.md` — API-009
- `docs/devTickets/phase2/206-list-query-standard.md`

## Objective

Extend **API-009** (`GET /api/experiences`) so the Experience Index can scale to large evidence libraries. Ticket **206** shipped pagination, basic search, single `type` filter, and core sort fields; this ticket adds **date**, **skills/technologies**, **duration**, **activity count**, and **type** query capabilities that deliver direct user value.

## Query capabilities — MVP (this ticket)

### Already implemented (verify + document; extend where noted)

| Capability | Param(s) | Behaviour | Business / user value |
|------------|----------|-----------|------------------------|
| **Pagination** | `limit`, `offset` | Default `20`, max `100`; standard `meta` envelope | Keeps the index fast as the library grows; avoids loading hundreds of cards at once |
| **Text search** | `search` | Case-insensitive match on `title`, `organisation`, `role` | Quick recall by employer, role, or experience name — the most common “where was that?” lookup |
| **Type filter** | `type` | Single enum value (`job`, `project`, …) | Focus on jobs vs courses vs projects when browsing or tailoring evidence for an application |
| **Sort** | `sort`, `order` | Allowlisted fields; default `updatedAt` desc | **Recently updated** supports ongoing capture; **dateStart** supports career-timeline narrative |

### New in this ticket

| Capability | Param(s) | Behaviour | Business / user value |
|------------|----------|-----------|------------------------|
| **Extended text search** | `search` (extended) | Also match any `skills[]` or `technologies[]` element (case-insensitive partial) | Find evidence by capability (“Angular”, “stakeholder communication”) without remembering which job title contained it |
| **Multi-type filter** | `type` | Comma-separated values, e.g. `type=job,project` — OR semantics; invalid token → `400` | Compare or narrow to several experience kinds at once (e.g. paid work + personal projects) |
| **Timeline filter** | `dateFrom`, `dateTo` | ISO date strings (`YYYY-MM-DD`). Experience **overlaps** the inclusive range when: effective start ≤ `dateTo` AND (effective end ≥ `dateFrom` OR open-ended). Effective start = `dateStart`; effective end = `dateEnd` unless `isCurrent` or `dateEnd` is null (open-ended). Experiences with **no `dateStart`** are excluded when either date param is set | Answer “what was I doing in 2023?” or isolate a career phase when matching opportunity windows |
| **Current-role filter** | `isCurrent` | `true` \| `false`. `true` → `isCurrent: true`; `false` → `isCurrent: false` | Surface active employment/education vs historical entries when updating a resume or cover letter |
| **Skill filter** | `skill` | Case-insensitive partial match on any `skills[]` element. Comma-separated → OR (match any listed term) | Target experiences that demonstrate a specific competency for fit evaluation or document generation |
| **Technology filter** | `technology` | Same semantics as `skill` on `technologies[]` | Find stack-specific evidence (e.g. all `.NET` or `React` experiences) for technical roles |
| **Additional sort fields** | `sort` | Add `type`, `dateEnd` to allowlist (keep existing: `updatedAt`, `createdAt`, `title`, `dateStart`) | **type** groups the list by evidence category; **dateEnd** supports “most recently finished” ordering alongside timeline start |
| **Duration sort/filter** | `sort=duration`, `minDuration`, `maxDuration` | Tenure in whole months from `dateStart` to effective end; undated experiences excluded when duration filter active | Highlight long engagements or short contracts |
| **Activity count sort** | `sort=activityCount` | Sort by non-archived activity count per experience (aggregation) | Find experiences with the richest evidence base when choosing what to expand or cite |

### Example requests

```http
GET /api/experiences?search=angular&sort=dateStart&order=desc&limit=20&offset=0

GET /api/experiences?type=job,project&isCurrent=true&sort=updatedAt&order=desc

GET /api/experiences?dateFrom=2023-01-01&dateTo=2023-12-31&sort=dateStart&order=asc

GET /api/experiences?skill=stakeholder&technology=react&limit=20&offset=0

GET /api/experiences?minDuration=12&sort=duration&order=desc

GET /api/experiences?sort=activityCount&order=desc&limit=10
```

Combined filters use **AND** semantics (all active filters must match). `search` OR-clauses remain internal to the search predicate.

## Future query ideas (document only)

| Idea | Param(s) (suggested) | Business / user value |
|------|----------------------|------------------------|
| **Overview search** | extend `search` to `overviewRaw` | Deep text discovery in narrative summaries (heavier; consider length limits) |
| **Facet / autocomplete** | `GET /api/experiences/facets` or dashboard term list | Pick from the user’s own vocabulary instead of free-typing skill names |
| **Archived visibility** | `includeArchived=true` | Audit deleted evidence (low priority for MVP) |
| **Full-text / Atlas Search** | — | Better relevance at very large scale (**206** explicitly deferred) |

## Completion notes

**Completed:** 2026-06-30

### Implementation summary

- Extended `listQuery.js` with date, boolean, comma-separated, duration, and regex-escape parsers; strict sort validation when `strictSort: true`.
- `experienceService.listExperiences` builds a shared MongoDB filter; uses aggregation when `sort` is `duration` or `activityCount`, or when `minDuration` / `maxDuration` filters are active.
- Duration computed via `$dateDiff` in months; activity counts via `$lookup` on non-archived activities.
- Updated `08_api_contract.md` API-009 and OpenAPI path/parameters.

### Files changed

- `server/src/utils/listQuery.js`
- `server/src/services/experienceService.js`
- `docs/core-scope/08_api_contract.md`
- `server/src/openapi/openapi.base.json`
- `server/src/openapi/paths/experiences.json`

### Checks run

- `npm run openapi:validate` — passed

## Acceptance criteria

- [x] `GET /api/experiences` supports `dateFrom`, `dateTo`, `isCurrent`, `skill`, `technology`, and comma-separated `type` with correct AND-combined filtering.
- [x] `search` matches `title`, `organisation`, `role`, and any skill or technology term.
- [x] `sort` accepts `type`, `dateEnd`, `duration`, and `activityCount` in addition to existing fields.
- [x] `minDuration` and `maxDuration` filter by tenure in whole months.
- [x] Invalid query params return `400` without leaking other users’ data.
- [x] Pagination `meta` remains correct when filters reduce `total`.
- [x] `08_api_contract.md` and OpenAPI reflect live behaviour.
- [x] Future query ideas documented in contract (short “planned extensions” list).
