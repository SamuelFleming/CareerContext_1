---
phase: 2
status: implemented
source: large-feature plan — enterable skills & technologies
---
# Ticket 235 — Experience Skills & Technologies CRUD

## Status

**Implemented** — 2026-06-19

## Phase

Phase 2 — Experience Evidence (ongoing)

## Depends on

- **234** — Skills & technologies UI foundation (`TermChipInput`)
- Backend **201**, **202**, **204** — models and validation already support fields

## Related screen(s)

- Screen 6 — Experience Index (create flow)
- Screen 7 — Experience Detail (edit modal)

## Related API

- API-010 — Create experience
- API-011 — Get experience
- API-012 — Update experience
- API-014 — Workspace (returns full experience)

## Objective

Let users **create and update** `skills` and `technologies` on Experience entities through existing CRUD flows.

## User outcome

A user can add technologies (e.g. React, .NET) and skills (e.g. Stakeholder management) when creating or editing an experience; values persist and reload on detail view.

## Current state

- Mongoose `Experience` has `skills: [String]`, `technologies: [String]` — default `[]`
- `validateExperienceBody` accepts both on create and update
- `experienceFormUtils` / `buildExperiencePayload` **omit** both fields
- `ExperienceEditorCard`, `CreateExperiencePanel` have no entry UI
- `08_api_contract.md` examples for API-010/011/012 **omit** skills/technologies (doc drift)

## Scope

### Frontend

- Extend `emptyExperienceForm`, `experienceToForm`, `buildExperiencePayload` with `skills`, `technologies` (string arrays)
- Add two `TermChipInput` fields to `ExperienceEditorCard` (technologies + skills)
- Add same fields to `CreateExperiencePanel` on Experience Index
- Ensure `ExperienceDetailPage` edit modal save sends arrays via `updateExperience`
- Ensure `ExperienceIndexPage` create sends arrays via `createExperience`

### Backend

- **No schema changes** — already implemented
- Optional small change: include `skills` and `technologies` in API-009 `toListItem` if needed for index card chips (**237** may depend on this — coordinate or add here)

### Documentation

- Update `08_api_contract.md` request/response examples for API-010, API-011, API-012 to include `skills` and `technologies`

## Out of scope

- Activity-level entry (**236**)
- Replacing mock chips on index/detail display (**237**)
- AI derivation
- Ranking significance beyond array order (first = most important for display util)

## Acceptance criteria

- [x] User can add/remove technologies and skills on Experience create (index)
- [x] User can add/remove technologies and skills on Experience edit (detail modal)
- [x] Save persists via existing PUT/POST; reload shows saved values
- [x] Empty arrays allowed; invalid payloads rejected by existing server validation
- [x] `08_api_contract.md` examples updated for experience endpoints
- [x] `npm run build` passes

## Completion notes

**Completed:** 2026-06-19

### Files changed

**Modified**

- `client/src/features/experiences/components/experienceFormUtils.js` — form fields + payload
- `client/src/features/experiences/components/experienceUi.js` — `emptyCreateForm`
- `client/src/features/experiences/components/ExperienceEditorCard.jsx` — `TermChipInput` fields
- `client/src/features/experiences/components/CreateExperiencePanel.jsx` — `TermChipInput` fields
- `client/src/features/experiences/ExperienceIndexPage.jsx` — uses `buildExperiencePayload`
- `client/src/services/experienceService.js` — JSDoc
- `server/src/services/experienceService.js` — `toListItem` includes skills/technologies
- `docs/core-scope/08_api_contract.md` — API-009/010/011/012 examples

### Checks run

- `npm run build` (client) — **passed**

### Follow-up

- **236** — Activity skills/technologies CRUD
- **237** — remove mock chip fallback; detail widget reads live data from entity

## Likely files

| File | Action |
|------|--------|
| `client/src/features/experiences/components/experienceFormUtils.js` | Modify |
| `client/src/features/experiences/components/ExperienceEditorCard.jsx` | Modify |
| `client/src/features/experiences/components/CreateExperiencePanel.jsx` | Modify |
| `client/src/features/experiences/ExperienceIndexPage.jsx` | Verify payload |
| `client/src/features/experiences/ExperienceDetailPage.jsx` | Verify payload |
| `server/src/services/experienceService.js` | Optional — `toListItem` includes skills/technologies |
| `docs/core-scope/08_api_contract.md` | Modify examples |

## Verification

1. Create experience with skills + technologies → open detail → values present in edit modal
2. Edit existing experience → add term → save → refresh → persisted
3. API smoke: POST/PUT body `{ "skills": ["Leadership"], "technologies": ["React"] }`
