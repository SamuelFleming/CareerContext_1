---
phase: 2
status: planned
source: large-feature plan — enterable skills & technologies
---
# Ticket 237 — Live Skills & Technologies Chips in Evidence UI

## Status

**Planned**

## Phase

Phase 2 — Experience Evidence (ongoing)

## Depends on

- **234** — Chip utils and display components
- **235** — Experience CRUD (data on entities)
- **236** — Activity CRUD (data on activities)

## Related screen(s)

- Screen 6 — Experience Index cards
- Screen 7 — Experience Detail skills widget + summary chips (if any)
- Screen 8 — Activity Detail (optional read-only chip row)

## Objective

Replace scaffold/mock chip data with **live** `skills` and `technologies` from persisted entities across evidence surfaces.

## User outcome

Chips on experience cards and widgets reflect what the user entered — not static mock data. Empty states are clear when no terms exist.

## Current state

| Surface | Current behaviour |
|---------|-------------------|
| `ExperienceSummaryCard` | `getScaffoldSkillChips` — always shows mock when no live data |
| `ExperienceSkillsTechnologiesWidget` | `getTopRankedSkillsAndTechnologies` — mock fallback |
| `ExperienceActivityListItem` | No skill/tech chips |
| `ActivityDetailPage` | No chip display |
| API-009 list | `toListItem` **omits** skills/technologies — index cards cannot show live data without backend tweak |

## Scope

### Display wiring

- `ExperienceSummaryCard` — use `toDisplayChips` from **234** util; remove mock fallback on product surfaces
- `ExperienceSkillsTechnologiesWidget` — live ranked list (array order = rank); empty state when both arrays empty
- Optional: `ExperienceActivityListItem` — show up to 2–3 technology chips from activity (truncate)
- Optional: `ActivityDetailPage` — read-only chip section above or below editor (skills + technologies)

### Backend (minimal)

- Add `skills` and `technologies` to `toListItem` in `experienceService.js` for API-009 index cards
- Document API-009 list item shape in `08_api_contract.md`

### Cleanup

- Remove or restrict `skillChipVariantsMock.js` mock chip sets — retain only non-chip scaffolds (e.g. AI one-line placeholder) or delete mock chip data entirely
- Update helper copy: remove “AI extraction coming later” where live manual data exists; keep subtle note that AI ranking is future (**238**)

## Out of scope

- Landing page `InteractiveCvPreview` mocks (marketing)
- Dashboard Phase 1 competency mocks (**215**)
- Profile/CoreContext skills
- AI-derived terms

## Acceptance criteria

- [ ] Experience index cards show user's technologies/skills when present; no mock chips
- [ ] Experience detail skills widget shows live top 5 by array order; empty state when none
- [ ] API-009 list items include `skills` and `technologies` (if index cards depend on list endpoint)
- [ ] Activity surfaces show live chips where scoped (if implemented in ticket)
- [ ] `npm run build` passes

## Likely files

| File | Action |
|------|--------|
| `client/src/features/experiences/components/ExperienceSummaryCard.jsx` | Modify |
| `client/src/features/experiences/components/ExperienceSkillsTechnologiesWidget.jsx` | Modify |
| `client/src/features/experiences/components/ExperienceActivityListItem.jsx` | Optional modify |
| `client/src/features/activities/ActivityDetailPage.jsx` | Optional modify |
| `client/src/features/experiences/components/skillChipVariantsMock.js` | Remove mock chip data |
| `server/src/services/experienceService.js` | Modify `toListItem` |
| `docs/core-scope/08_api_contract.md` | API-009 list item fields |

## Verification

1. Experience with entered skills/tech → index card shows live chips
2. Experience with empty arrays → no chips, appropriate empty/helper copy
3. Detail widget matches stored order
