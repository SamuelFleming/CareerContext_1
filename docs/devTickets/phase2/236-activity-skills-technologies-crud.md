---
phase: 2
status: implemented
source: large-feature plan — enterable skills & technologies
---
# Ticket 236 — Activity Skills & Technologies CRUD

## Status

**Implemented** — 2026-06-20

## Phase

Phase 2 — Experience Evidence (ongoing)

## Depends on

- **234** — Skills & technologies UI foundation
- Backend **201**, **203**, **204** — models and validation already support fields

## Related screen(s)

- Screen 7 — Create activity under experience
- Screen 8 — Activity Detail

## Related API

- API-016 — Create activity for experience
- API-018 — Get activity
- API-019 — Update activity

## Objective

Let users **create and update** `skills` and `technologies` on Activity entities.

## User outcome

A user can tag an activity with relevant technologies and skills when creating it under an experience or editing on the Activity Detail page.

## Current state

- Mongoose `Activity` has `skills`, `technologies` — default `[]`
- `validateActivityBody` accepts both on create and update
- `activityFormUtils` / `buildActivityPayload` **omit** both fields
- `ActivityEditorCard`, `CreateActivityPanel` have no entry UI
- Activity list/detail API returns full `toJSON()` including arrays (when populated)
- `08_api_contract.md` API-016/018/019 examples omit skills/technologies

## Scope

### Frontend

- Extend `emptyActivityEditForm`, `emptyActivityForm`, `activityToForm`, `buildActivityPayload`
- Add `TermChipInput` fields to `ActivityEditorCard`
- Add fields to `CreateActivityPanel` on Experience Detail
- Wire create/update handlers in `ActivityDetailPage` and `ExperienceDetailPage`

### Documentation

- Update `08_api_contract.md` examples for API-016, API-018, API-019

## Out of scope

- Experience-level entry (**235**)
- Live chip display on cards (**237**)
- AI extraction
- `outcomes`, `evidenceStrength` fields

## Acceptance criteria

- [x] User can add/remove technologies and skills when creating activity under experience
- [x] User can add/remove on Activity Detail edit + save
- [x] Values persist and reload correctly
- [x] `08_api_contract.md` activity examples include `skills` and `technologies`
- [x] `npm run build` passes

## Completion notes

**Completed:** 2026-06-20

### Files changed

**Modified**

- `client/src/features/activities/components/activityFormUtils.js` — form fields + payload
- `client/src/features/experiences/components/experienceFormUtils.js` — `emptyActivityForm` fields
- `client/src/features/activities/components/ActivityEditorCard.jsx` — `TermChipInput` fields
- `client/src/features/experiences/components/CreateActivityPanel.jsx` — `TermChipInput` fields
- `client/src/features/experiences/ExperienceDetailPage.jsx` — uses `buildActivityPayload` on create
- `docs/core-scope/08_api_contract.md` — API-016/018/019 examples

### Checks run

- `npm run build` (client) — **passed**

### Follow-up

- **237** — live chip display on cards; remove mock fallback

## Likely files

| File | Action |
|------|--------|
| `client/src/features/activities/components/activityFormUtils.js` | Modify |
| `client/src/features/activities/components/ActivityEditorCard.jsx` | Modify |
| `client/src/features/experiences/components/CreateActivityPanel.jsx` | Modify |
| `client/src/features/activities/ActivityDetailPage.jsx` | Verify payload |
| `client/src/features/experiences/ExperienceDetailPage.jsx` | Verify create-activity payload |
| `docs/core-scope/08_api_contract.md` | Modify examples |

## Verification

1. Create activity with skills/technologies from experience detail → open activity detail → values shown in form
2. Edit activity → save → reload → persisted
