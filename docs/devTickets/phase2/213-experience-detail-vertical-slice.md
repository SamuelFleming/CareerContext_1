---
phase: 2
status: planned
source: repo-local execution ticket
methodology: lightweight intent-led ticket; agent must inspect current codebase before implementation
---
# Ticket 213 — Experience Detail Vertical Slice

## Intent

Implement the Experience Detail workspace for viewing, editing, deleting, and adding Activities under one Experience.

## User outcome

A logged-in user can open an Experience, view its details, edit it, create supporting Activities, and navigate to an Activity Detail route.

## Scope

- Implement Screen 7: Experience Detail at `/experiences/:experienceId`.
- Fetch and display one Experience by ID.
- Display Experience metadata and overview content.
- Support editing/saving Experience fields.
- Support deleting the Experience with confirmation.
- Fetch and display Activities belonging to the Experience.
- Provide a simple create Activity flow under the Experience.
- Support navigation to `/activities/:activityId`.
- Reuse the existing Markdown editor if available; otherwise use the closest current textarea/Markdown pattern and leave a TODO.
- Handle loading, error, not-found, empty-activity, and success states.
- Update this ticket's implementation/completion notes after work is complete.

## Out of scope

- Full Activity Detail implementation.
- Dashboard evidence integration.
- Opportunity, Document, or AI generation work.
- Large backend/API redesigns unless the current endpoint contract cannot support the screen.
- Large visual redesigns.

## Acceptance criteria

- `/experiences/:experienceId` remains protected.
- Screen fetches the Experience by ID.
- Screen fetches Activities for the Experience when available.
- User can update Experience fields.
- User can create an Activity under the Experience.
- User can open Activity Detail from the Activity list.
- User can delete the Experience with a confirmation step.
- Error/not-found state displays when the Experience is unavailable.
- Components do not call `fetch` directly.
- Markdown editing uses the reusable editor if it exists.
- Any API/model mismatch is documented.

## Agent planning checklist

Before writing code, inspect:

- `CLAUDE.md`
- `.cursor/rules/frontend.mdc`
- `.cursor/rules/backend.mdc`
- `.cursor/rules/documentation.mdc`
- `client/src/features/experiences/`
- `client/src/features/activities/`
- `client/src/services/experienceService.js`
- `client/src/services/activityService.js`
- `client/src/app/router.jsx`
- `server/src/routes/`
- `server/src/controllers/`
- `server/src/services/`
- `docs/core-scope/08_api_contract.md`
- `docs/core-scope/05_data_model.md`

Then provide a plan listing:

1. current API/service shape,
2. proposed component breakdown,
3. Markdown editor reuse decision,
4. delete confirmation approach,
5. Activity list/create approach,
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
- manual smoke test path from `/experiences` to detail,
- API/model mismatches or assumptions,
- known limitations or follow-up tickets.
