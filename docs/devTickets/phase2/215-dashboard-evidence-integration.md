---
phase: 2
status: complete
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

### Backend (`server/src/services/dashboardService.js`)

- Added `buildEvidencePanel(userId)` using `Experience` and `Activity` models.
- Counts non-archived records (`userId`, `isArchived: false`) for experiences and activities; `journalEntries` remains `0` (journal not implemented).
- Recent activity merges up to 10 experiences and 10 activities by `updatedAt`, sorts descending, caps at 10 items total.
- Each recent item: `{ id, entityType, title, updatedAt, href }` with `href` as `/experiences/:id` or `/activities/:id`.
- `evidenceSummary.status`: `empty` | `ready`; `recentActivity.status`: `empty` | `ready`.
- `phasePlaceholders.experienceEvidence` updated from `planned` to `available`.
- Phase 1 Interactive CV mocks (`PHASE1_CORE_COMPETENCIES`, `PHASE1_HIGHLIGHT_EXPERIENCES`) unchanged.

### Frontend

- `EvidencePanel.jsx`: Evidence Summary tab shows count cards (Experiences, Activities, Journal) or empty message; Recent Activity tab shows linked list with entity type and formatted `updatedAt`.
- `DashboardPage.jsx`: `emptyDashboard.evidencePanel` aligned to new shape for loading fallback.
- `dashboardService.js`: JSDoc updated for `evidencePanel` response fields.

### Response shape change (API-004 `evidencePanel`)

| Field | Before | After |
|-------|--------|-------|
| `evidenceSummary.status` | `placeholder` | `empty` \| `ready` |
| `evidenceSummary.message` | static placeholder text | `null` when counts exist; empty-state copy otherwise |
| `evidenceSummary.counts` | always zeros | real DB counts |
| `recentActivity.status` | `placeholder` | `empty` \| `ready` |
| `recentActivity.items[]` | always `[]` | up to 10 merged recent experiences/activities |
| `recentActivity.items[].entityType` | n/a | `experience` \| `activity` |
| `recentActivity.items[].href` | n/a | client route path |
| `phasePlaceholders.experienceEvidence` | `planned` | `available` |

`08_api_contract.md` example still shows Phase 1 placeholder values; follow-up doc sync optional.

## Completion notes

### Files changed

- `server/src/services/dashboardService.js`
- `client/src/features/dashboard/components/EvidencePanel.jsx`
- `client/src/features/dashboard/DashboardPage.jsx`
- `client/src/services/dashboardService.js`
- `docs/devTickets/phase2/215-dashboard-evidence-integration.md`

### Checks run

- `cd client && npm run build` — passed
- `cd client && npm run lint` — failed on pre-existing Phase 1 / data-loading issues (not introduced by this ticket); no new lint errors in `EvidencePanel.jsx`
- Server: no `lint`/`test` scripts; `node server.js` loads updated service (manual smoke test)

### Manual smoke test

**Prerequisites:** Server (`node server.js`) and client (`npm run dev`) running; logged-in user.

**No-evidence state**

1. Use a fresh account or archive/delete all experiences and activities for the user.
2. Open `/dashboard`.
3. Confirm Phase 1 layout unchanged: Interactive CV card, profile completeness prompt, evidence panel tabs.
4. **Evidence Summary** tab: empty message — *"No experiences yet. Add evidence from the Experiences workspace."* (no count cards).
5. **Recent Activity** tab: *"Your latest captured evidence will appear here."*
6. Interactive CV still shows Phase 1 mock competencies/highlights (not evidence-driven).

**With-evidence state**

1. Create at least one experience via `/experiences` (optionally add activities on the detail page).
2. Return to `/dashboard` (refresh if already open).
3. **Evidence Summary** tab: three count cards — Experiences and Activities match created totals; Journal shows `0`.
4. **Recent Activity** tab: list of titles sorted by most recently updated; each row shows entity type and date; click navigates to `/experiences/:id` or `/activities/:id`.
5. Edit an experience or activity title, reload dashboard — recent list order/counts update accordingly.

### Known limitations / follow-up

- Journal count fixed at `0` until journal backend exists.
- Recent feed is a simple merged `updatedAt` list (no ranking, filtering, or pagination).
- `08_api_contract.md` API-004 example not updated in this ticket (ticket-scoped doc change only).
