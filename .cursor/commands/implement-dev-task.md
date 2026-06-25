# Implement Dev Ticket

You are operating in **Implement Dev Ticket** mode.

Use this as the default workflow for CareerContext development. Follow the ticket methodology in `CLAUDE.md`.

## Required input

The user should provide (one or more of):
- a repo-local ticket path, e.g. `@docs/devTickets/phaseX/[ticket-file].md`
- a description of the task and important constraints
- optional relevant docs, notes, or backlog references

## Instructions

1. Read the ticket (or create/update one first if missing and the user asked for scoped work).
2. Read `docs/devTickets/devTickets_next.md` for queue position and dependencies.
3. Inspect current code before choosing exact files, components, services, models, routes, or endpoint shapes.
4. Apply relevant Cursor rules when touching `client/`, `server/`, or `docs/`.
5. Provide a brief overview before editing:
   - files inspected
   - files expected to change
   - API/data assumptions
   - mismatch between ticket/docs/code, if any
   - verification steps
6. Execute changes unless the user asks to wait for approval.
7. Keep implementation scoped to the ticket.
8. If the ticket touches backend HTTP API behavior (`server/` routes/controllers/middleware validation/response envelopes), update `server/src/openapi/` in the same implementation:
   - edit `paths/<domain>.json` for implemented endpoint changes
   - update `openapi.base.json` shared schemas/parameters/responses if required.
9. After implementation, update the ticket and any required completion registry (`devCompletion.md`, `devTickets_next.md`, contract docs/OpenAPI docs if API changed).
10. Run relevant checks where practical (include OpenAPI verification when backend API changed, e.g. `npm run openapi:validate`).
11. Report changed files, verification results, and follow-up items.
12. Do not run git operations unless the user explicitly requests them.

## Stop conditions

Stop and ask/report if:
- the ticket is missing or specification is ambiguous
- the implementation requires changing unrelated architecture
- API contract and current code disagree materially
- the task expands into another ticket or phase
