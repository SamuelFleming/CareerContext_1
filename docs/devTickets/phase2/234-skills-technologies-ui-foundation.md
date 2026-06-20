---
phase: 2
status: planned
source: large-feature plan — enterable skills & technologies
---
# Ticket 234 — Skills & Technologies UI Foundation

## Status

**Planned**

## Phase

Phase 2 — Experience Evidence (ongoing)

## Depends on

- **231** — Experience card chip scaffold (variant semantics reference)
- **232** — Experience Detail skills widget

## Related screen(s)

- Screen 6 — Experience Index
- Screen 7 — Experience Detail
- Screen 8 — Activity Detail

## Related docs

- `docs/core-scope/05_data_model.md` — `skills`, `technologies` on Experience and Activity
- `docs/design-concept/FigmaOutput_DesignSystem.md` — SkillChip component
- `client/src/features/landing/components/InteractiveCvPreview.jsx` — variant reference

## Objective

Establish shared UI primitives and chip styling rules for **manual** skills and technologies entry and display — replacing ad-hoc mock helpers with a consistent, live-data-ready pattern.

## User outcome

Users see a consistent visual language: technologies and skills render as distinct chip variants everywhere; forms use the same tag-entry control for both entity types.

## Current state (code inspection)

| Area | Finding |
|------|---------|
| `SkillChip.jsx` | Variants: `accent`, `neutral`, `success`, `warning` — no `kind` prop |
| `skillChipVariantsMock.js` | Mock data + `getTopRankedSkillsAndTechnologies`; fallback when entity arrays empty |
| `TypeChip.jsx` | Separate categorical chip (experience type) — do not conflate |
| Data model | `skills` / `technologies` already `[String]` on Experience and Activity (**201**) |
| Backend validation | `parseStringArray` accepts `string[]` on create/update (**204**) |
| Forms | No entry UI; `experienceFormUtils` / `activityFormUtils` omit both fields |

## Chip variant semantics (MVP — manual entry)

| Kind | Default variant | First item emphasis (ranked lists) |
|------|-----------------|-------------------------------------|
| Technology | `accent` | `success` (top technology) |
| Skill | `neutral` | `warning` (top skill) |

Landing mock and **231** scaffold already follow this pattern. Formalise in a shared util, not scattered mocks.

## Scope

- Create `client/src/utils/skillTechnologyChipUtils.js` (or `features/experiences/components/` if preferred colocation):
  - `technologyChipVariant(index)` / `skillChipVariant(index)`
  - `normalizeTermList(terms)` — trim, dedupe case-insensitive, drop empty
  - `toDisplayChips({ technologies, skills, limit? })` — `{ label, kind, variant }[]`
- Create `TermChipInput.jsx` in `components/ui/`:
  - Props: `label`, `kind` (`technology` \| `skill`), `values` (string[]), `onChange`, `disabled`, `helperText`
  - UX: text input + Add button (or Enter); chips removable; no autocomplete/taxonomy yet
  - Renders added terms as `SkillChip` with correct variant
- Optional: `SkillTechnologyChipList.jsx` — read-only chip row/group for display surfaces
- Add short design note to ticket completion or `docs/design-concept/` — **only** chip kind→variant table (avoid large doc dump)
- Deprecate mock-only helpers in `skillChipVariantsMock.js` — keep `AI_ONE_LINE_PLACEHOLDER` there or move to separate constant file

## Out of scope

- Persisting data (ticket **235** / **236**)
- AI extraction or ranking inference
- Taxonomy / enum enforcement / autocomplete
- Profile-level skills (CoreContext) — future phase
- Dashboard Interactive CV competencies (Phase 1 mocks)

## Acceptance criteria

- [ ] `TermChipInput` supports add/remove of string terms with accessible labels
- [ ] Technology chips use `accent`; skill chips use `neutral` in entry preview
- [ ] Shared util maps entity `{ technologies, skills }` to display chips with correct variants
- [ ] No new global state libraries
- [ ] Component follows existing `Button` / `Input` / `SkillChip` patterns

## Likely files

| File | Action |
|------|--------|
| `client/src/components/ui/TermChipInput.jsx` | Create |
| `client/src/utils/skillTechnologyChipUtils.js` | Create |
| `client/src/features/experiences/components/skillChipVariantsMock.js` | Refactor — move chip logic to util; retain AI placeholder only |

## Verification

1. Storybook not required — manual test in isolation or via **235** forms
2. `npm run build` (client)

## Agent planning checklist

Before implementation, inspect `SkillChip`, `Input`, `skillChipVariantsMock.js`, and `InteractiveCvPreview.jsx`.
