---
phase: 2
status: planned
source: repo-local execution ticket
methodology: lightweight intent-led ticket; agent must inspect current codebase before implementation
---
# Ticket 215 — Dashboard Evidence Integration

## Intent

Lightly upgrade the Dashboard so it recognises real Phase 2 Experience Evidence data without redesigning the Dashboard.

## User outcome

A logged-in user can return to the Dashboard and see that their captured Experiences and Activities are reflected in evidence summary/recent activity areas.

## Scope

- Preserve Phase 1 Dashboard behaviour and visual direction.
- Add real evidence counts if the backend can safely provide them:
  - Experience count,
  - Activity count.
- Add recent evidence activity if feasible:
  - recently updated Experiences and/or Activities.
- Update frontend Dashboard widgets to consume the new fields.
- Preserve existing empty/placeholder states when no evidence exists.
- Keep the implementation light-touch and Phase 2-focused.
- Update this ticket's implementation/completion notes after work is complete.

## Out of scope

- Dashboard redesign.
- Interactive CV redesign.
- Opportunity, Document, or AI generation work.
- Advanced analytics.
- Complex evidence ranking.
- Full activity feed system.
- Major backend refactor beyond the dashboard response fields required.

## Acceptance criteria

- Dashboard does not regress from Phase 1.
- Evidence Summary can show real Experience count when available.
- Evidence Summary can show real Activity count when available.
- Recent Activity can show recent Experiences and/or Activities when feasible.
- Empty state remains clear when no evidence exists.
- Frontend remains visually consistent with existing Dashboard/Profile direction.
- Backend and frontend response shapes are documented if changed.
- Any API/model mismatch is documented.

## Agent planning checklist

Before writing code, inspect:

- `CLAUDE.md`
- `.cursor/rules/frontend.mdc`
- `.cursor/rules/backend.mdc`
- `.cursor/rules/documentation.mdc`
- `server/src/`
- `client/src/features/dashboard/`
- `client/src/services/`
- `docs/core-scope/08_api_contract.md`
- `docs/core-scope/07_screen_data_matrix.md`

Then provide a plan listing:

1. whether a backend change is needed,
2. proposed dashboard response shape,
3. frontend widgets affected,
4. exact files to change,
5. how Phase 1 behaviour will be preserved,
6. verification steps,
7. documentation updates required.

## Implementation notes

_To be completed by the agent after codebase inspection._

## Completion notes

_To be completed after implementation._

Include:

- files changed,
- backend/frontend checks run,
- manual smoke test for no-evidence and with-evidence states,
- response shape changes,
- known limitations or follow-up tickets.
