---
phase: 2
status: planned
source: repo-local execution ticket
methodology: lightweight intent-led ticket; agent must inspect current codebase before implementation
---
# Ticket 211 — Evidence Frontend Foundation

## Intent

Prepare the frontend foundation for Phase 2 Experience Evidence without building the full screens yet.

## User outcome

A logged-in user can navigate to Phase 2 evidence routes and see safe placeholder/foundation pages while the app has service-layer support ready for Experience and Activity API integration.

## Scope

- Add or confirm protected frontend routes for:
  - `/experiences`
  - `/experiences/:experienceId`
  - `/activities/:activityId`
- Create or update frontend service files for Experience and Activity API access.
- Ensure services use the shared API client/auth-token pattern.
- Add lightweight placeholder pages only where needed for route safety.
- Align with existing routing, layout, service, and feature-folder conventions.
- Update this ticket's implementation/completion notes after work is complete.

## Out of scope

- Full Experience Index UI.
- Full Experience Detail UI.
- Full Activity Detail UI.
- Dashboard evidence integration.
- Backend model/controller/service refactors unless required to resolve route/service contract mismatch.
- AI polish/generation features.

## Acceptance criteria

- `/experiences` is a protected route.
- `/experiences/:experienceId` is a protected route.
- `/activities/:activityId` is a protected route.
- Experience service exists or is updated and uses the shared API client.
- Activity service exists or is updated and uses the shared API client.
- No hardcoded API calls are introduced inside React components.
- Placeholder pages, if used, follow existing app layout/visual direction.
- Any API contract mismatch is documented in this ticket.

## Agent planning checklist

Before writing code, inspect:

- `CLAUDE.md`
- `.cursor/rules/frontend.mdc`
- `.cursor/rules/documentation.mdc`
- `client/src/app/router.jsx`
- `client/src/services/`
- `client/src/features/`
- `docs/core-scope/08_api_contract.md`
- `docs/core-scope/05_data_model.md`
- existing server route/controller files if endpoint shapes are unclear

Then provide a plan listing:

1. files inspected,
2. files to create/modify,
3. current API/service assumptions,
4. smallest safe implementation path,
5. verification steps,
6. documentation updates required.

## Implementation notes

_To be completed by the agent after codebase inspection._

## Completion notes

_To be completed after implementation._

Include:

- files changed,
- checks/builds run,
- manual smoke test path,
- known limitations or follow-up tickets.
