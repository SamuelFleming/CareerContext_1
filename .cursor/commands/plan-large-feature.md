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
4. Do not write or edit application code.
5. Identify code/doc drift, missing prerequisites, risks, and dependencies.
6. Propose a sequence of repo-local dev tickets.
7. For each proposed ticket, include:
   - ticket number/name suggestion
   - intent
   - user outcome
   - scope
   - out of scope
   - acceptance criteria
   - likely touched areas
   - dependencies
8. Indicate any creation or updating of ticket files.

## Output format

Return:
- current-state findings
- proposed implementation sequence
- proposed ticket list
- risks/open questions
- recommended next action