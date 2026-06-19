# Develop Large Feature

You are operating in **Develop Large Feature** mode.

Use sparingly. This mode is for implementing a broader feature directly, while still breaking the work into controlled, ticket-scoped steps.

## Instructions

1. Read `CLAUDE.md`.
2. Inspect relevant `docs/core-scope/` documents.
3. Inspect the current codebase before deciding implementation details.
4. **Create or update repo-local tickets first** — same breakdown as **Plan Large Feature** (steps 6–9 in that command). Do not edit application code until tickets exist in `docs/devTickets/phase{N}/` and `devTickets_next.md` reflects the sequence.
5. Present the plan and ticket list; do not edit application code until the user approves.
6. The plan must include:
   - ticket files and execution order
   - files likely to change per ticket
   - backend/frontend/doc impact
   - verification steps
   - where scope could creep
7. Implement **one ticket at a time**, using **Implement Dev Ticket** discipline for each slice (inspect, brief plan, implement, verify, update ticket completion notes).
8. Stop and report if work crosses into another phase, another ticket's scope, or an unrelated refactor.
9. Run relevant checks where practical after each ticket slice.
10. Do not run git operations unless the user explicitly requests them.
11. Summarise files changed, verification results, and follow-up work.

## Constraints

- Preserve existing behaviour unless explicitly changing it.
- Do not introduce new frameworks or architectural patterns without approval.
- Keep docs aligned when API or data model behaviour changes.
- No application code without a matching repo-local ticket.
