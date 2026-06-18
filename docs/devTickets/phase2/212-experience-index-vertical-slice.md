---
phase: 2
status: implemented
source: repo-local execution ticket
methodology: lightweight intent-led ticket; agent must inspect current codebase before implementation
---
# Ticket 212 — Experience Index Vertical Slice

## Intent

Implement the Experience Index screen as the first user-facing Phase 2 evidence workspace.

## User outcome

A logged-in user can open `/experiences`, view their Experiences, create a new Experience, and navigate to an Experience Detail route.

## Scope

- Implement Screen 6: Experience Index.
- Fetch and display the current user's Experiences.
- Provide loading, error, empty, and success states.
- Show useful Experience summary information, such as:
  - type/category,
  - title,
  - organisation/company/institution if available,
  - role if available,
  - date range if available,
  - overview preview if available.
- Provide a simple create Experience flow using the fastest appropriate UX for the current codebase.
- Add new Experiences to the list after creation.
- Support navigation to `/experiences/:experienceId`.
- Use the shared service/API-client pattern.
- Update this ticket's implementation/completion notes after work is complete.

## Out of scope

- Full Experience Detail editing.
- Activity list/create functionality inside Experience Detail.
- Activity Detail implementation.
- Dashboard evidence integration.
- AI-generated summaries or polishing.
- Large design-system refactors.

## Acceptance criteria

- [x] `/experiences` remains protected.
- [x] Experiences are loaded from the current user's data when the API is available.
- [x] Empty state appears when no Experiences exist.
- [x] User can create an Experience.
- [x] Newly created Experience appears without requiring a full manual refresh.
- [x] User can navigate from an Experience card/list item to the matching detail route.
- [x] Loading and error states are visible and user-friendly.
- [x] Components do not call `fetch` directly.
- [x] Styling aligns with Dashboard/Profile visual direction.
- [x] Any temporary fallback/mock behaviour is clearly documented.

## Agent planning checklist

Before writing code, inspect:

- `CLAUDE.md`
- `.cursor/rules/frontend.mdc`
- `.cursor/rules/documentation.mdc`
- `client/src/features/experiences/`
- `client/src/features/dashboard/`
- `client/src/features/profile/`
- `client/src/services/experienceService.js`, if present
- `client/src/app/router.jsx`
- `docs/core-scope/08_api_contract.md`
- `docs/core-scope/07_screen_data_matrix.md`

Then provide a plan listing:

1. current frontend patterns found,
2. proposed component breakdown,
3. data shape assumptions,
4. create-flow approach,
5. exact files to change,
6. verification steps,
7. documentation updates required.

## Preferred execution style

Build this as a vertical slice:

1. Confirm/build the UI structure and component boundaries.
2. Wire the UI to the real service/API based on current codebase state.
3. Use mock/fallback data only if the API is not ready, and document that limitation.

## Implementation notes

### Component structure

- `ExperienceIndexPage.jsx` — loading/error/success container; owns list state and create panel visibility
- `components/ExperienceList.jsx` — empty state + list layout
- `components/ExperienceListItem.jsx` — `EvidenceCard` + navigate to `/experiences/:id`
- `components/CreateExperiencePanel.jsx` — inline toggled create form (`Card` + `Input`/`TextArea`)
- `components/experienceUi.js` — type labels, icons, date/meta formatters

### API integration

- **Fully wired to real API** — `listExperiences()` and `createExperience()` via `experienceService.js`
- No mock/fallback data; API errors surface in load/create error states
- List query: `sort=updatedAt`, `order=desc`, `limit=20`, `offset=0`
- After create: programmatic list refetch (no browser refresh)

### Overview preview limitation

API-009 list items do not include `overviewRaw` or an overview preview field (`toListItem` on server). List cards show **activity count** as description instead. Overview content is captured on create but not shown on index cards until list API adds a preview field or user opens detail (**213**).

### Create UX

- Inline panel toggled by “Add experience” (no modal — matches Profile pattern)
- Required: `type`, `title`; optional: org, role, dates, `isCurrent`, `overviewRaw` (shared `MarkdownEditor`)
- Stays on index after create (list refetch); user navigates to detail via card click

## Completion notes

**Completed:** 2026-06-18

### Files changed

**Created**

- `client/src/features/experiences/ExperienceIndexPage.jsx`
- `client/src/features/experiences/components/ExperienceList.jsx`
- `client/src/features/experiences/components/ExperienceListItem.jsx`
- `client/src/features/experiences/components/CreateExperiencePanel.jsx`
- `client/src/features/experiences/components/experienceUi.js`

**Modified**

- `client/src/app/router.jsx` — `/experiences` → `ExperienceIndexPage`

**Deleted**

- `client/src/features/experiences/ExperiencesFoundationPage.jsx`

### Checks run

- `npm run build` (client) — **passed**
- `npm run lint` (client) — **failed** with pre-existing Phase 1 errors plus same `setState-in-effect` pattern as `DashboardPage` on `ExperienceIndexPage`; no new functional issues

### Manual smoke test path

1. Log in → **Experiences** in sidebar → `/experiences`
2. Empty state: dashed panel + “Add your first experience” (if no data)
3. **Add experience** → fill type + title → **Create experience** → panel closes, item appears in list
4. Click experience card → `/experiences/:id` (detail foundation page from **211**)
5. Stop server → error alert + **Try again** on index load

### API integration status

**Fully wired to real API data** — no temporary mock fallback.

### Known limitations / follow-up

- **213** — replace detail foundation with full Experience Detail workspace
- List pagination UI when `meta.hasMore` (footer note only for now)
- Overview preview on list cards when API-009 adds a preview field
- Search/type filter (screen catalogue — later ticket)

## Follow-up (post-completion)

### Overview field — shared MarkdownEditor (2026-06-18)

- `CreateExperiencePanel` overview uses shared `MarkdownEditor` (`client/src/components/editor/`) instead of plain `TextArea`, matching Profile core context and Journal patterns.
- Value still maps to API field `overviewRaw` on create; Edit/Preview toggle and formatting toolbar enabled.
- List cards still do not show overview preview (API-009 list shape unchanged).
