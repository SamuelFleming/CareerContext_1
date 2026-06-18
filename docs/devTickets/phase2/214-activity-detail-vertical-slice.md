---
phase: 2
status: planned
source: repo-local execution ticket
methodology: lightweight intent-led ticket; agent must inspect current codebase before implementation
---
# Ticket 214 — Activity Detail Vertical Slice

## Intent

Implement the Activity Detail screen for editing a reusable evidence Activity.

## User outcome

A logged-in user can open an Activity, edit its evidence content, see its parent Experience context, and return to the parent Experience.

## Scope

- Implement Screen 8: Activity Detail at `/activities/:activityId`.
- Fetch and display Activity by ID.
- Show Activity title and parent Experience context/link when available.
- Support editing/saving Activity title and evidence content.
- Show raw content Markdown and polished content Markdown if available.
- If polished content is empty, show a clear empty state.
- Include a disabled or clearly labelled "AI polish coming later" affordance.
- Support deleting the Activity with confirmation.
- Support navigation back to parent Experience.
- Reuse the existing Markdown editor if available; otherwise use the closest current textarea/Markdown pattern and leave a TODO.
- Handle loading, error, not-found, deleted, and success states.
- Update this ticket's implementation/completion notes after work is complete.

## Out of scope

- Implementing AI polishing.
- Dashboard evidence integration.
- Major Activity model redesign.
- Full Experience Detail rework beyond what is needed for navigation compatibility.
- Opportunity or Document work.

## Acceptance criteria

- `/activities/:activityId` remains protected.
- Screen fetches Activity by ID.
- Parent Experience context is visible or linked when available.
- User can update Activity title/content.
- User can delete Activity with a confirmation step.
- User can navigate back to the parent Experience.
- Empty polished-content state exists.
- Future AI polish action is visible but disabled or marked as coming later.
- Components do not call `fetch` directly.
- Any API/model mismatch is documented.

## Agent planning checklist

Before writing code, inspect:

- `CLAUDE.md`
- `.cursor/rules/frontend.mdc`
- `.cursor/rules/backend.mdc`
- `.cursor/rules/documentation.mdc`
- `client/src/features/activities/`
- `client/src/features/experiences/`
- `client/src/services/activityService.js`
- `client/src/services/experienceService.js`
- `client/src/app/router.jsx`
- `server/src/routes/`
- `server/src/controllers/`
- `server/src/services/`
- `docs/core-scope/08_api_contract.md`
- `docs/core-scope/05_data_model.md`

Then provide a plan listing:

1. current Activity model/service/API findings,
2. proposed component breakdown,
3. parent Experience linking approach,
4. Markdown editor reuse decision,
5. delete/back-navigation behaviour,
6. exact files to change,
7. verification steps,
8. documentation updates required.

## Implementation notes

_To be completed by the agent after codebase inspection._

## Completion notes

_To be completed after implementation._

Include:

- files changed,
- checks/builds run,
- manual smoke test path from Experience Detail to Activity Detail and back,
- API/model mismatches or assumptions,
- known limitations or follow-up tickets.
