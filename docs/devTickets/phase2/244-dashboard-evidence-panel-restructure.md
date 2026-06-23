---
phase: 2
status: planned
source: large-feature plan — Phase 2 Dashboard Enhancements
---
# Ticket 244 — Dashboard Evidence Panel Restructure

## Status

**Planned**

## Phase

Phase 2 — Dashboard enhancements

## Depends on

- **215** — Dashboard evidence integration (complete)
- **242** — Dashboard API adjustments (`recentOpportunities` scaffold, 4-item cap) — can proceed in parallel if frontend handles missing field gracefully, but **242** should land first

## Related screen(s)

- Screen 4 — Dashboard (right column)

## Related docs

- `docs/devTickets/phase1/006.2-dashboard-requirements-and-data-contract.md` — original panel contract
- `docs/devTickets/phase2/215-dashboard-evidence-integration.md`

## Objective

Restructure the dashboard right column so **Evidence Summary is always visible**, and a **toggle below** switches between **Recent Activity** and a scaffolded **Recent Opportunities** view — with clearer entity-type styling on activity rows.

## User outcome

The user always sees evidence counts at a glance; recent updates and (future) opportunities share one toggle slot; recent activity rows are easier to scan by entity type.

## Current state

| Area | Today |
|------|--------|
| Right column | Profile completeness → single toggled `EvidencePanel` |
| Toggle views | Evidence Summary ↔ Recent Activity |
| Recent activity | Up to 10 items; text-only entity label; no colour differentiation |
| Opportunities | Not represented |

## Target layout (right column, top → bottom)

1. **Complete your profile** — unchanged (`ProfileCompletenessPrompt`)
2. **Evidence Summary** — standalone card, same approximate height/size as current summary view (`min-h-[220px]` or equivalent)
3. **Recent feeds toggle** — tabs: **Recent Activity** | **Recent Opportunities** (scaffold)

Evidence Summary must **not** be inside the toggle.

## Scope

### Component split

- Extract `EvidenceSummaryCard.jsx` from current summary view (counts grid + empty state).
- Refactor `EvidencePanel.jsx` → `RecentFeedsPanel.jsx` (or rename) with two tabs only:
  - `recentActivity`
  - `recentOpportunities`

### Recent Activity enhancements

- Display **4 items** max (API cap from **242**).
- Sort remains latest-first (API responsibility).
- **Entity visual differentiator** — subtle background/border tint per `entityType`:
  - `experience` — neutral / white surface
  - `activity` — accent-tinted surface (`accent-100` or similar)
  - `journal` — reserved styling for when journal exists (can show placeholder row styling in docs only, or neutral variant until Phase 5)
- Must **not** use experience-card yellow (`--evidence-warm`) — keep rows compact list items, not `EvidenceCard`.

### Recent Opportunities scaffold

- Tab label: “Recent Opportunities”
- When `recentOpportunities.status === 'not_implemented'` (from API): show clear empty/scaffold message, e.g. “Opportunity tracking arrives in Phase 3.”
- No links, no fake opportunity rows unless API sends explicit scaffold items (default empty).

### Dashboard page wiring

- Update `DashboardPage.jsx` grid right column:

```text
ProfileCompletenessPrompt
EvidenceSummaryCard
RecentFeedsPanel
```

- Default toggle view: `recentActivity`.

### API contract

- Consume `evidencePanel.recentOpportunities` from **242**.
- Update client `emptyDashboard.evidencePanel` and JSDoc.

## Out of scope

- Opportunity backend or Screen 10 UI
- Journal API / recent journal items
- Interactive CV changes (**243**)
- Changing Profile completeness prompt behaviour
- Full dashboard grid redesign (left CV column untouched)

## Technical tasks

- [ ] Create `EvidenceSummaryCard.jsx`
- [ ] Refactor toggle panel to Recent Activity / Recent Opportunities
- [ ] Add entity-type row styling in recent activity list
- [ ] Wire scaffold empty state for opportunities
- [ ] Update `DashboardPage.jsx` layout
- [ ] Update `dashboardService.js` JSDoc / fallback state

## Acceptance criteria

- [ ] Evidence Summary always visible below profile prompt; not inside toggle
- [ ] Toggle switches between Recent Activity and Recent Opportunities only
- [ ] Recent Activity shows up to 4 items with distinct styling per entity type (not experience-card yellow)
- [ ] Recent Opportunities tab shows “not implemented” / Phase 3 scaffold message
- [ ] Profile completeness prompt unchanged
- [ ] `npm run build` passes

## Likely touched files

- `client/src/features/dashboard/DashboardPage.jsx`
- `client/src/features/dashboard/components/EvidencePanel.jsx` (split/refactor)
- `client/src/features/dashboard/components/EvidenceSummaryCard.jsx` (new)
- `client/src/services/dashboardService.js`

## Completion notes

_(empty — fill when implemented)_
