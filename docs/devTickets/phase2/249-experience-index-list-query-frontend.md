---
phase: 2
status: implemented
source: large-feature plan — Experience Index filter/search/sort/pagination
---
# Ticket 249 — Experience Index List Query (Frontend)

## Status

**Implemented** — 2026-06-30

## Phase

Phase 2 — Experience Evidence

## Depends on

- **248** — Experience Index list query backend (API-009 extended params)
- **212** — Experience Index vertical slice (page shell, list, create flow)
- **231** — Experience card visual polish
- **234** — Term chip patterns (optional reuse for skill/tech filter UX)

## Related screen(s)

- **Screen 6** — Experience Index (`/experiences`)

## Objective

Wire Screen 6 to the full API-009 query surface so users can **filter**, **search**, **sort**, and **paginate** experiences.

## Completion notes

**Completed:** 2026-06-30

### Implementation summary

- `experienceListQuery.js` — default query state, sort options, API param builder, active-filter detection.
- `ExperienceListToolbar` — search (debounced), type checkboxes, timeline dates, current status, skill/technology, duration months, sort.
- `ExperienceIndexPage` — owns query state; initial full-page load vs inline list refresh on filter changes.
- `ExperienceList` — prev/next pagination, filtered vs empty-library states, clear filters.
- Create flow refetches with active query state.

### Files changed

- `client/src/features/experiences/ExperienceIndexPage.jsx`
- `client/src/features/experiences/components/ExperienceListToolbar.jsx` (new)
- `client/src/features/experiences/components/ExperienceList.jsx`
- `client/src/features/experiences/components/experienceListQuery.js` (new)
- `client/src/services/experienceService.js`

### Checks run

- `npm run build` (client) — passed

## Acceptance criteria

- [x] User can search experiences; results update from API `search` param.
- [x] User can filter by one or more experience types.
- [x] User can filter by date range and/or current-only toggle.
- [x] User can filter by skill and/or technology (text inputs).
- [x] User can change sort order via dropdown; list refetches.
- [x] User can paginate when `meta.total` > `limit` (prev/next or equivalent).
- [x] Filtered empty state differs from zero-experiences empty state; clear filters works.
- [x] Creating an experience refreshes the list respecting active query state.
- [x] No direct `fetch` in components; params passed via `experienceService`.
- [x] Styling consistent with Dashboard / Experience Detail evidence toolbars.
