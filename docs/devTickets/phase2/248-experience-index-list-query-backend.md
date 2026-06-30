---
phase: 2
status: planned
source: large-feature plan — Experience Index filter/search/sort/pagination
---
# Ticket 248 — Experience Index List Query (Backend)

## Status

**Planned**

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

Extend **API-009** (`GET /api/experiences`) so the Experience Index can scale to large evidence libraries. Ticket **206** shipped pagination, basic search, single `type` filter, and core sort fields; this ticket adds **date**, **skills/technologies**, and **type** query capabilities that deliver direct user value, and documents further query ideas for later work.

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

### Example requests

```http
GET /api/experiences?search=angular&sort=dateStart&order=desc&limit=20&offset=0

GET /api/experiences?type=job,project&isCurrent=true&sort=updatedAt&order=desc

GET /api/experiences?dateFrom=2023-01-01&dateTo=2023-12-31&sort=dateStart&order=asc

GET /api/experiences?skill=stakeholder&technology=react&limit=20&offset=0
```

Combined filters use **AND** semantics (all active filters must match). `search` OR-clauses remain internal to the search predicate.

## Future query ideas (document only — not this ticket)

Capture in **249** frontend notes and `08_api_contract.md` “future” subsection; implement in later tickets if prioritised.

| Idea | Param(s) (suggested) | Business / user value |
|------|----------------------|------------------------|
| **Duration sort/filter** | `sort=duration`, `minDuration`, `maxDuration` (months) | Highlight long engagements or short contracts; derived from `dateStart`/`dateEnd`/`isCurrent` |
| **Activity count sort** | `sort=activityCount` | Find experiences with the richest evidence base when choosing what to expand or cite |
| **Overview search** | extend `search` to `overviewRaw` | Deep text discovery in narrative summaries (heavier; consider length limits) |
| **Facet / autocomplete** | `GET /api/experiences/facets` or dashboard term list | Pick from the user’s own vocabulary instead of free-typing skill names |
| **Archived visibility** | `includeArchived=true` | Audit deleted evidence (low priority for MVP) |
| **Full-text / Atlas Search** | — | Better relevance at very large scale (**206** explicitly deferred) |

## Scope

### `server/src/services/experienceService.js`

- Extend `listExperiences` filter/sort construction per table above.
- Extract date-overlap and multi-value param parsing into small helpers in `listQuery.js` **only if** it keeps `experienceService` readable (avoid premature abstraction).

### `server/src/utils/listQuery.js`

- Add parsers as needed, e.g. `parseDateParam`, `parseCommaSeparated`, `parseBooleanQuery`.
- Reuse across future list endpoints where sensible.

### `docs/core-scope/08_api_contract.md`

- Expand API-009 query parameter table and examples.

### `server/src/openapi/`

- Add query parameters to `paths/experiences.json` (API-009 `GET`).
- Add shared parameter components in `openapi.base.json` if reused.

## Files (expected)

| File | Change |
|------|--------|
| `server/src/services/experienceService.js` | Extended filters, search, sort allowlist |
| `server/src/utils/listQuery.js` | Shared query parsers (if needed) |
| `docs/core-scope/08_api_contract.md` | API-009 query docs + future ideas |
| `server/src/openapi/paths/experiences.json` | New query params |
| `server/src/openapi/openapi.base.json` | Shared param components |

## Technical tasks

- [ ] Extend `search` to include `skills` and `technologies` array matching.
- [ ] Support comma-separated `type` with validation against `EXPERIENCE_TYPES`.
- [ ] Implement `dateFrom` / `dateTo` overlap filter with documented null-date exclusion.
- [ ] Implement `isCurrent` boolean filter.
- [ ] Implement `skill` and `technology` filters (comma-separated OR).
- [ ] Add `type` and `dateEnd` to `EXPERIENCE_SORT_FIELDS`.
- [ ] Return `400` with clear messages for invalid dates, types, or sort fields.
- [ ] Update `08_api_contract.md` API-009 section.
- [ ] Update OpenAPI per **247**; run `npm run openapi:validate`.

## Out of scope

- Frontend UI (**249**).
- Cursor-based pagination.
- Duration / `activityCount` sort (future).
- Database index optimisation beyond existing `{ userId, type }` / `{ userId, isArchived }` unless profiling shows need (note in completion if added).
- Changes to list item shape (`toListItem`) beyond what **235** already exposes.

## Acceptance criteria

- [ ] `GET /api/experiences` supports `dateFrom`, `dateTo`, `isCurrent`, `skill`, `technology`, and comma-separated `type` with correct AND-combined filtering.
- [ ] `search` matches `title`, `organisation`, `role`, and any skill or technology term.
- [ ] `sort` accepts `type` and `dateEnd` in addition to existing fields.
- [ ] Invalid query params return `400` without leaking other users’ data.
- [ ] Pagination `meta` remains correct when filters reduce `total`.
- [ ] `08_api_contract.md` and OpenAPI reflect live behaviour.
- [ ] Future query ideas documented in contract (short “planned extensions” list).

## Verification

1. Seed or use existing user with varied experiences (types, dates, skills, technologies).
2. Exercise each new param alone and in combination; confirm `meta.total` and result sets.
3. Confirm date overlap edge cases: open-ended current role, null `dateStart` excluded when date filter active.
4. `npm run openapi:validate` in `server/`.
5. Spot-check `/api/docs` for API-009 parameters.

## Agent planning checklist

Before coding, inspect:

- `server/src/services/experienceService.js` — current `listExperiences`
- `server/src/utils/listQuery.js`
- `server/src/models/Experience.js` — `EXPERIENCE_TYPES`, date fields
- `docs/core-scope/08_api_contract.md` — API-009
- `server/src/openapi/paths/experiences.json`
