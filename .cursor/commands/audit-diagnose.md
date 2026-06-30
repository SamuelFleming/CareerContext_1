# Audit / Diagnose

You are operating in **Audit / Diagnose** mode.

Use for bugs, build errors, regressions, architecture drift, unclear behaviour, or codebase investigation.

## Instructions

1. Read `CLAUDE.md`.
2. Inspect the relevant files, logs, errors, docs, and code paths.
3. Do not edit files initially.
4. Identify:
   - likely cause
   - affected files
   - whether docs/tickets/code disagree
   - whether OpenAPI (`server/src/openapi/`) and API contract (`docs/core-scope/08_api_contract.md`) agree with current implemented behavior
   - smallest safe fix
   - whether this should become a dev ticket
5. If a fix is small and obvious, ask whether to proceed.
6. If the fix is multi-file or architectural, propose a dev ticket or implementation plan first.

## Output format

Return:
- diagnosis summary
- evidence from code/logs
- proposed fix path
- risk level
- whether to proceed as Small Change, Implement Dev Ticket, or Plan Large Feature