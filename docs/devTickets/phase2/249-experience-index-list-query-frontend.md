---
phase: 2
status: planned
source: large-feature plan — Experience Index filter/search/sort/pagination
---
# Ticket 249 — Experience Index List Query (Frontend)

## Status

**Planned**

## Phase

Phase 2 — Experience Evidence

## Depends on

- **248** — Experience Index list query backend (API-009 extended params)
- **212** — Experience Index vertical slice (page shell, list, create flow)
- **231** — Experience card visual polish
- **234** — Term chip patterns (optional reuse for skill/tech filter UX)

## Related screen(s)

- **Screen 6** — Experience Index (`/experiences`)

## Related docs

- `docs/core-scope/06_screen_catalogue_and_data_requirements.md` — Screen 6
- `docs/core-scope/08_api_contract.md` — API-009
- `docs/design-concept/FigmaOutput_DesignSystem.md`
- `docs/devTickets/phase2/248-experience-index-list-query-backend.md`

## Objective

Wire Screen 6 to the full API-009 query surface so users can **filter**, **search**, **sort**, and **paginate** experiences. Replace the placeholder “pagination will arrive in a later ticket” message with working controls aligned with existing evidence UI patterns (see `ExperienceActivitySection` toolbar).

## User-facing capabilities (maps to API-009)

| UI control | API param(s) | Business / user value |
|------------|--------------|------------------------|
| **Search box** | `search` | Fast lookup by title, organisation, role, skill, or technology |
| **Type filter** | `type` (multi-select → comma-separated) | Narrow to jobs, projects, courses, etc. |
| **Date range** | `dateFrom`, `dateTo` | Focus on a career period (e.g. graduate year, contract era) |
| **Current only toggle** | `isCurrent=true` | Show active roles/education when updating “current” resume content |
| **Skill filter** | `skill` | Find experiences demonstrating a competency |
| **Technology filter** | `technology` | Find stack-specific evidence |
| **Sort dropdown** | `sort`, `order` | Recently updated (default), timeline (start/end), title, type |
| **Pagination** | `limit`, `offset` | Browse large libraries page by page |

Default load (no user filters): `sort=updatedAt`, `order=desc`, `limit=20`, `offset=0` — same as today.

### Sort options (recommended labels)

| Label | `sort` | `order` |
|-------|--------|---------|
| Recently updated (default) | `updatedAt` | `desc` |
| Oldest updated | `updatedAt` | `asc` |
| Start date (newest first) | `dateStart` | `desc` |
| Start date (oldest first) | `dateStart` | `asc` |
| End date (newest first) | `dateEnd` | `desc` |
| Title A–Z | `title` | `asc` |
| Type | `type` | `asc` |

## Scope

### State and data loading

- `ExperienceIndexPage` owns query state and triggers `listExperiences(params)` when filters, sort, or page change.
- Debounce search input (~300ms) to limit API calls.
- Reset `offset` to `0` when any filter or sort changes (not when paginating).
- Track `meta.total`, `meta.hasMore`, current page derived from `offset` / `limit`.

### UI components

- **`ExperienceListToolbar`** (new) — search, filters, sort; layout similar to activity toolbar in `ExperienceActivitySection.jsx`.
- **`ExperienceList`** — pagination footer (prev/next + “Showing X–Y of Z”); distinguish **empty library** vs **no matches for filters**.
- Reuse existing `selectClass` / `Input` / `Button` patterns; match design tokens.

### Service layer

- Extend `experienceService.js` JSDoc for new query params (`dateFrom`, `dateTo`, `isCurrent`, `skill`, `technology`, multi `type`).

### Create flow

- After successful create, refetch with **current** query state (not hard-coded defaults).

## Files (expected)

| File | Change |
|------|--------|
| `client/src/features/experiences/ExperienceIndexPage.jsx` | Query state, debounced fetch, wire toolbar |
| `client/src/features/experiences/components/ExperienceListToolbar.jsx` | **New** — filter/search/sort controls |
| `client/src/features/experiences/components/ExperienceList.jsx` | Pagination UI; filtered empty state |
| `client/src/features/experiences/components/experienceUi.js` | Type options, sort option constants (if not colocated in toolbar) |
| `client/src/services/experienceService.js` | JSDoc for extended params |

## Technical tasks

- [ ] Add query state object and debounced `loadExperiences` in `ExperienceIndexPage`.
- [ ] Build toolbar with search, type multi-select (or multi checkbox/select), date range inputs, current toggle, skill/technology inputs, sort select.
- [ ] Implement pagination controls using `meta.total`, `limit`, `offset`.
- [ ] Empty state: “No experiences match your filters” with **Clear filters** action when filters active.
- [ ] Loading: avoid full-page flash on filter change — prefer inline loading on list region if straightforward.
- [ ] Preserve error + retry behaviour from **212**.
- [ ] Remove placeholder `hasMore` footnote text.

## Out of scope

- URL query-string sync (`/experiences?search=…`) — valuable follow-up for shareable views; not required for MVP.
- Skill/technology autocomplete from user vocabulary (needs facet API — see **248** future ideas).
- Duration filter/sort UI (future ticket).
- Client-side-only filtering of fetched pages (all filtering must be server-side).
- Archive/delete from index (no API change in this batch).

## Future UI ideas (document only)

| Idea | Depends on | User value |
|------|------------|------------|
| **URL-synced query state** | — | Bookmarkable filtered views; back/forward navigation |
| **Duration filter** | Backend duration params | “Show roles longer than 12 months” |
| **Sort by activity count** | Backend `sort=activityCount` | Surface evidence-rich experiences |
| **Chip autocomplete for skill/tech** | Facet endpoint or profile term list | Faster, consistent filtering |
| **Saved filter presets** | Local storage or user prefs | Repeatable workflows per opportunity type |

## Acceptance criteria

- [ ] User can search experiences; results update from API `search` param.
- [ ] User can filter by one or more experience types.
- [ ] User can filter by date range and/or current-only toggle.
- [ ] User can filter by skill and/or technology (text inputs).
- [ ] User can change sort order via dropdown; list refetches.
- [ ] User can paginate when `meta.total` > `limit` (prev/next or equivalent).
- [ ] Filtered empty state differs from zero-experiences empty state; clear filters works.
- [ ] Creating an experience refreshes the list respecting active query state.
- [ ] No direct `fetch` in components; params passed via `experienceService`.
- [ ] Styling consistent with Dashboard / Experience Detail evidence toolbars.

## Verification

1. With 25+ experiences (or lower `limit` in dev): confirm pagination across pages.
2. Apply each filter alone and in combination; counts match API via network tab.
3. Search for a skill only present on one experience; confirm match.
4. Date range: confirm overlap behaviour matches backend (**248**).
5. `npm run build` and `npm run lint` in `client/` (note pre-existing lint issues if unchanged).

## Agent planning checklist

Before coding, inspect:

- `client/src/features/experiences/ExperienceIndexPage.jsx`
- `client/src/features/experiences/components/ExperienceList.jsx`
- `client/src/features/experiences/components/ExperienceActivitySection.jsx` — toolbar pattern
- `client/src/services/experienceService.js`
- `docs/devTickets/phase2/248-experience-index-list-query-backend.md` — param semantics
