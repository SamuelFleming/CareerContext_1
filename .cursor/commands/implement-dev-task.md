# Implement Dev Ticket

You are operating in **Implement Dev Ticket** mode.

Use this as the default workflow for CareerContext development.

## Required input

The user should provide 

The user should provide (AND/OR):
- Ideally, a repo-local ticket path, usually
    - `@docs/devTickets/phaseX/[ticket-file].md`
- or:
   - description of the task
   - any important constraints
   - optional relevant docs, notes or backlog references

## Instructions

1. Read the ticket/specification of task
2. Read `docs/devTickets/devTickets_next.md` if this ticket already exists
3. Idenitfy 
4. Inspect current code before choosing exact files, components, services, models, routes, or endpoint shapes.
5. Apply relevant Cursor rules:
   - frontend rules when touching `client/**/*`
   - backend rules when touching `server/**/*`
   - documentation rules when touching `docs/**/*`
6. Provide brief overview of what changes will occur, including:
   - files inspected
   - files expected to change
   - API/data assumptions
   - mismatch between ticket/docs/code, if any
   - verification steps
8. Execute changes unless the user asks to wait for their approval.
9. Keep implementation scoped to the ticket.
10. After implementation, update the ticket.md and any required completion registry.
11. Run relevant checks where practical.
12. Report changed files, verification results, and follow-up items.

## Stop conditions

Stop and ask/report if:
- the ticket is missing or specification is ambiguous
- the implementation requires changing unrelated architecture
- API contract and current code disagree materially
- the task expands into another ticket or phase