---
phase: 2
status: planned
source: large-feature plan — Phase 2 Dashboard Enhancements
---
# Ticket 243 — Dashboard Interactive CV UI

## Status

**Planned**

## Phase

Phase 2 — Dashboard enhancements

## Depends on

- **242** — Dashboard API: live Interactive CV payload

## Related screen(s)

- Screen 4 — Dashboard (Interactive CV card, left column)

## Related docs

- `docs/design-concept/FigmaOutput_DesignSystem.md`
- `client/src/features/landing/components/InteractiveCvPreview.jsx` — visual reference
- `client/src/utils/skillTechnologyChipUtils.js` — chip display (**234**)

## Objective

Wire the Interactive CV card to **live API data**, align its visual design with the **landing-page Living CV**, make experience highlights **clickable**, and present **core competencies** as an obvious AI scaffold with hover affordance.

## User outcome

The dashboard Interactive CV feels like the landing-page preview but shows the user’s real summary, live top skills/technologies, clickable experience highlights, and clearly labelled placeholder competencies pending AI.

## Current state

| Area | Today |
|------|--------|
| `InteractiveCvCard.jsx` | Plain white `Card`; `resolvePhase1InteractiveCv` falls back to client mocks |
| Experience highlights | Static mock cards, not clickable |
| Skills on CV | Mock “Core competencies” chips only |
| Profile summary | Flat section — landing uses nested bordered card (“Core context”) |
| Landing CV | Purple gradient shell, nested profile card, chip row, evidence cards |

## Scope

### Live data wiring

- Consume **242** fields: `highlightExperiences`, `topSkillsAndTechnologies`, scaffold `coreCompetencies`.
- Remove client-side mock fallback for `highlightExperiences` in `phase1MockData.js` / `resolvePhase1InteractiveCv` — trust API empty arrays.
- Update `dashboardService.js` JSDoc and `DashboardPage` `emptyDashboard.interactiveCv` shape.

### Experience highlights — clickable

- Wrap each highlight in `Link` to `experience.href` (or navigate via `EvidenceCard` + router).
- Reuse shared `EvidenceCard`; pass skills/technologies as `tags` or use `SkillTechnologyChipList` for consistency.
- Preserve keyboard focus and hover states already on `EvidenceCard`.

### Skills & technologies section (live)

- Add section **below** core competencies (or between profile and competencies — match landing chip placement):
  - Heading: e.g. “Skills & technologies”
  - Render top 5 from API via `SkillTechnologyChipList` / `toDisplayChips`
  - Empty state when no terms: short prompt to add skills on experiences

### Core competencies — AI scaffold UX

- Render only when `coreCompetencies.status === 'scaffold'`.
- Visual treatment: dashed border, muted/scaffold styling, optional “Preview” or “Coming later” micro-label — must be **obviously dummy**, not live data.
- **Hover / focus popover**: small dialog/tooltip on chip hover explaining profile-level AI derivation is planned (Phase 4); no modal library required — lightweight CSS or small dashboard-local component.
- Chips non-destructive (no navigation).

### Landing-page visual alignment

Apply to outer Interactive CV card (keep dashboard content):

| Landing element | Dashboard adaptation |
|-----------------|----------------------|
| `bg-gradient-to-br from accent-100 to neutral-000` + shadow | Outer CV card gradient |
| Nested “Core context” card | Wrap profile summary in nested `Card variant="default"` with landing typography/border |
| Chip row styling | Use existing `SkillChip` / `SkillTechnologyChipList` variants matching landing |
| Section labels | Keep dashboard labels (“Profile”, not “Core context”) per product copy |

Do **not** copy landing-only content (fake name, opportunity/document mini-cards).

### Cleanup

- Retire or narrow `PHASE1_HIGHLIGHT_EXPERIENCES` client mirror if unused.
- Keep competencies mock readable only via API scaffold envelope.

## Out of scope

- Backend/API changes (**242**)
- Evidence panel layout (**244**)
- Profile page edits
- Real AI competency derivation
- Opportunity/document mini-cards on dashboard CV

## Technical tasks

- [ ] Update `InteractiveCvCard.jsx` layout and styling
- [ ] Wire live highlights, top terms, scaffold competencies
- [ ] Add competency hover popover component (dashboard-local is fine)
- [ ] Make experience cards navigable
- [ ] Update `phase1MockData.js` / remove highlight fallback
- [ ] Update `DashboardPage.jsx` and `dashboardService.js` JSDoc

## Acceptance criteria

- [ ] Experience highlight cards show API data and navigate to `/experiences/:id` on click
- [ ] Top 5 skills/technologies reflect persisted evidence (not mocks)
- [ ] Core competencies appear as obvious scaffold with hover explanation dialog
- [ ] Interactive CV uses landing-style gradient and nested profile card; dashboard-specific content retained
- [ ] Empty states shown when no experiences or no skills (no silent mock fallback)
- [ ] `npm run build` passes

## Likely touched files

- `client/src/features/dashboard/components/InteractiveCvCard.jsx`
- `client/src/features/dashboard/DashboardPage.jsx`
- `client/src/features/dashboard/phase1MockData.js`
- `client/src/services/dashboardService.js`
- `client/src/features/dashboard/components/` (optional `CompetencyScaffoldChip.jsx` or similar)

## Completion notes

_(empty — fill when implemented)_
