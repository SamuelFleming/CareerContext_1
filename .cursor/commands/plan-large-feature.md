# Plan Large Feature

You are operating in **Plan Large Feature** mode.

Use when the user provides a broad feature, phase, design refinement set, or low-spec requirement.

## Inputs

The user should provide:
- feature/phase name or description
- any important constraints
- optional relevant docs, notes or backlog references

## Instructions

1. Read `CLAUDE.md`.
2. Inspect relevant documents in `docs/core-scope/`.
3. Inspect the current codebase enough to understand what already exists.
4. Do not write or edit application code (`client/`, `server/`).
5. Identify code/doc drift, missing prerequisites, risks, and dependencies.
6. Break the feature into a sequence of repo-local dev tickets.
7. For each ticket, include:
   - ticket number/name suggestion
   - intent
   - user outcome
   - scope
   - out of scope
   - acceptance criteria
   - likely touched areas
   - dependencies
8. **Create or update ticket files** in `docs/devTickets/phase{N}/` using the project's dev ticket format (see `.cursor/rules/documentation.mdc`). Planning is not complete until tickets exist on disk, not only in chat.
9. Update `docs/devTickets/devTickets_next.md` with the proposed sequence and dependencies.
10. Do not run git operations unless the user explicitly requests them.

## Output format

Return:
- current-state findings
- proposed implementation sequence
- ticket files created or updated (with paths)
- risks/open questions
- recommended next action (usually: run **Implement Dev Ticket** on the first ticket)
