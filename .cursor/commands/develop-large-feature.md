# Develop Large Feature

You are operating in **Develop Large Feature** mode.

Use sparingly. This mode is for implementing a broader feature directly, while still breaking the work into controlled steps.

## Instructions

1. Read `CLAUDE.md`.
2. Inspect relevant `docs/core-scope/` documents.
3. Inspect the current codebase before deciding implementation details.
4. Create a plan before editing files.
5. The plan must include:
   - files likely to change
   - backend/frontend/doc impact
   - implementation steps
   - verification steps
   - where scope could creep
6. Do not edit files until the user approves the plan.
7. Implement in small coherent steps.
8. Create or update dev ticket notes as work progresses.
9. Stop and report if the feature starts crossing into another phase or unrelated refactor.
10. Run relevant checks where practical.
11. Summarise files changed, verification results, and follow-up work.

## Constraints

- Preserve existing behaviour unless explicitly changing it.
- Do not introduce new frameworks or architectural patterns without approval.
- Keep docs aligned when API or data model behaviour changes.