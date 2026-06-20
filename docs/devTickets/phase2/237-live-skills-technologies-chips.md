---
phase: 2
status: implemented
source: large-feature plan — enterable skills & technologies
---
# Ticket 237 — Live Skills & Technologies Chips in Evidence UI

## Status

**Implemented** — 2026-06-20

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

- [x] Experience index cards show user's technologies/skills when present; no mock chips
- [x] Experience detail skills widget shows live top 5 by array order; empty state when none
- [x] API-009 list items include `skills` and `technologies` (if index cards depend on list endpoint)
- [x] Activity surfaces show live chips where scoped (if implemented in ticket)
- [x] `npm run build` passes

## Completion notes

**Completed:** 2026-06-20

### Files changed

**Created**

- `client/src/features/activities/components/ActivitySkillsTechnologiesSummary.jsx` — read-only chip card on activity detail

**Modified**

- `client/src/features/experiences/components/ExperienceSummaryCard.jsx` — live chips via `SkillTechnologyChipList`; no mock fallback
- `client/src/features/experiences/components/ExperienceSkillsTechnologiesWidget.jsx` — live ranked list from `toDisplayChips`
- `client/src/features/experiences/components/ExperienceActivityListItem.jsx` — up to 3 technology tags on list cards
- `client/src/features/activities/ActivityDetailPage.jsx` — skills/technologies summary above editor
- `client/src/features/experiences/components/skillChipVariantsMock.js` — mock chip data removed; `AI_ONE_LINE_PLACEHOLDER` retained
- `docs/core-scope/08_api_contract.md` — API-015 list item example includes skills/technologies

**Verified unchanged (from **235**)**

- `server/src/services/experienceService.js` — `toListItem` already includes skills/technologies
- API-009 list example already documented

### Checks run

- `npm run build` (client) — **passed**

### Follow-up

- **238** (Phase 4) — AI-derived skills and technologies

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
