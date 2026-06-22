---
phase: 2
status: implemented
source: UX follow-up — modal-first evidence editing
---
# Ticket 238 — Evidence Modals & Activity Detail Redesign

## Status

**Implemented** — 2026-06-20

## Phase

Phase 2 — Experience Evidence (ongoing)

## Depends on

- **232** — Experience Detail modal edit pattern
- **236** — Activity form fields

## Related screen(s)

- Screen 6 — Experience Index (create modal)
- Screen 7 — Experience Detail (activity create modal)
- Screen 8 — Activity Detail (edit modal + widget layout)

## Objective

Unify create/edit flows behind modals; align Activity Detail topology with Experience Detail; tighten modal form layouts.

## Scope

### Modals

- Experience create (index) → `ExperienceCreateModal`
- Activity create (experience detail) → `ActivityFormModal` (create mode)
- Activity edit (activity detail) → `ActivityFormModal` (edit mode)

### Activity Detail redesign

- `ActivityDetailHeader` with parent context line `{Title} (TYPE) | {dates}`, AI one-line scaffold, Edit/Delete actions
- Remove parent experience card and duplicate “Back to experience” button
- Side-by-side widgets: Skills & technologies | AI summary (polished → raw fallback)
- Edit opens modal (no inline editor)

### Modal layout tightening

- Experience fields: type narrow + title row; org/role row; start/end dates adjacent
- Modal width `max-w-3xl`; markdown editors keep large minRows

### Backend

- API-018 `parentExperience` includes `type`, `dateStart`, `dateEnd`, `isCurrent` for header context line

## Acceptance criteria

- [x] Experience create uses modal on index
- [x] Activity create uses modal on experience detail
- [x] Activity edit uses modal on activity detail
- [x] Activity detail matches experience detail widget topology
- [x] No duplicate back/add CTAs on activity detail
- [x] Tighter modal field layout; large markdown inputs preserved
- [x] `npm run build` passes

## Files

**Created:** `ExperienceCreateModal`, `ActivityFormModal`, `ActivityEditorFields`, `ActivityDetailHeader`, `ActivitySkillsTechnologiesWidget`, `ActivitySummaryWidget`

**Modified:** `ExperienceEditorCard`, `ExperienceIndexPage`, `ExperienceDetailPage`, `ExperienceActivitySection`, `ActivityDetailPage`, `experienceUi.js`, `activityService.js`, `08_api_contract.md`

**Removed:** `CreateExperiencePanel`, `CreateActivityPanel`, `ActivityParentContext`, `ActivitySkillsTechnologiesSummary`, `ActivityPolishedSummary`
