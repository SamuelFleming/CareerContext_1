---
phase: 2
status: planned
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

- `/experiences` remains protected.
- Experiences are loaded from the current user's data when the API is available.
- Empty state appears when no Experiences exist.
- User can create an Experience.
- Newly created Experience appears without requiring a full manual refresh.
- User can navigate from an Experience card/list item to the matching detail route.
- Loading and error states are visible and user-friendly.
- Components do not call `fetch` directly.
- Styling aligns with Dashboard/Profile visual direction.
- Any temporary fallback/mock behaviour is clearly documented.

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

_To be completed by the agent after codebase inspection._

## Completion notes

_To be completed after implementation._

Include:

- files changed,
- checks/builds run,
- manual smoke test path,
- whether API integration is real or temporarily mocked/fallback,
- known limitations or follow-up tickets.
