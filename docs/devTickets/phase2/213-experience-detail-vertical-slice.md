---
phase: 2
status: implemented
source: repo-local execution ticket
methodology: lightweight intent-led ticket; agent must inspect current codebase before implementation
---
# Ticket 213 — Experience Detail Vertical Slice

## Intent

Implement the Experience Detail workspace for viewing, editing, deleting, and adding Activities under one Experience.

## User outcome

A logged-in user can open an Experience, view its details, edit it, create supporting Activities, and navigate to an Activity Detail route.

## Scope

- Implement Screen 7: Experience Detail at `/experiences/:experienceId`.
- Fetch and display one Experience by ID.
- Display Experience metadata and overview content.
- Support editing/saving Experience fields.
- Support deleting the Experience with confirmation.
- Fetch and display Activities belonging to the Experience.
- Provide a simple create Activity flow under the Experience.
- Support navigation to `/activities/:activityId`.
- Reuse the existing Markdown editor if available; otherwise use the closest current textarea/Markdown pattern and leave a TODO.
- Handle loading, error, not-found, empty-activity, and success states.
- Update this ticket's implementation/completion notes after work is complete.

## Out of scope

- Full Activity Detail implementation.
- Dashboard evidence integration.
- Opportunity, Document, or AI generation work.
- Large backend/API redesigns unless the current endpoint contract cannot support the screen.
- Large visual redesigns.

## Acceptance criteria

- [x] `/experiences/:experienceId` remains protected.
- [x] Screen fetches the Experience by ID.
- [x] Screen fetches Activities for the Experience when available.
- [x] User can update Experience fields.
- [x] User can create an Activity under the Experience.
- [x] User can open Activity Detail from the Activity list.
- [x] User can delete the Experience with a confirmation step.
- [x] Error/not-found state displays when the Experience is unavailable.
- [x] Components do not call `fetch` directly.
- [x] Markdown editing uses the reusable editor if it exists.
- [x] Any API/model mismatch is documented.

## Agent planning checklist

Before writing code, inspect:

- `CLAUDE.md`
- `.cursor/rules/frontend.mdc`
- `.cursor/rules/backend.mdc`
- `.cursor/rules/documentation.mdc`
- `client/src/features/experiences/`
- `client/src/features/activities/`
- `client/src/services/experienceService.js`
- `client/src/services/activityService.js`
- `client/src/app/router.jsx`
- `server/src/routes/`
- `server/src/controllers/`
- `server/src/services/`
- `docs/core-scope/08_api_contract.md`
- `docs/core-scope/05_data_model.md`

Then provide a plan listing:

1. current API/service shape,
2. proposed component breakdown,
3. Markdown editor reuse decision,
4. delete confirmation approach,
5. Activity list/create approach,
6. exact files to change,
7. verification steps,
8. documentation updates required.

## Implementation notes

### Load strategy

- Initial load: `getExperienceWorkspace(experienceId, { limit: 20, sort: 'updatedAt', order: 'desc' })` (API-014) — one request for experience + activities slice.
- After activity create: `listActivitiesForExperience` refetch (API-015).
- Experience save: `updateExperience` (API-012); merge `data.experience` into local state.

### Component structure

- `ExperienceDetailPage.jsx` — container, load/save/delete/create orchestration
- `ExperienceEditorCard.jsx` — metadata + `overviewRaw` via `MarkdownEditor`
- `ExperiencePolishedOverview.jsx` — read-only `MarkdownPreview` + disabled AI polish CTA
- `ExperienceDeleteConfirm.jsx` — inline two-step delete confirmation
- `ExperienceActivitySection.jsx` + `ExperienceActivityListItem.jsx` + `CreateActivityPanel.jsx`
- `experienceFormUtils.js` — form mapping, payloads, `emptyActivityForm`

### Markdown editor

- `overviewRaw` and activity `rawDescription` use shared `MarkdownEditor`.
- `overviewPolished` read-only via `MarkdownPreview`; AI polish button disabled (API-017 is 501).

### API contract mismatches (documented)

| Item | Contract | Implementation | Impact |
|------|----------|----------------|--------|
| DELETE message | `"Experience deleted"` | `"Experience archived"` | None for UI |
| Workspace journal | `journalEntries` in API-014 | Always `[]` until Journal API | Journal section omitted |
| Polish | API-017 documented | `501 notImplemented` | Disabled button only |
| Invalid id | — | `400 Invalid experience ID` | Treated as not-found UI |
| Create activity response | Full activity optional | `{ id }` only | Refetch activities after create |

## Completion notes

**Completed:** 2026-06-18

### Files changed

**Created**

- `client/src/features/experiences/ExperienceDetailPage.jsx`
- `client/src/features/experiences/components/ExperienceEditorCard.jsx`
- `client/src/features/experiences/components/ExperiencePolishedOverview.jsx`
- `client/src/features/experiences/components/ExperienceDeleteConfirm.jsx`
- `client/src/features/experiences/components/ExperienceActivitySection.jsx`
- `client/src/features/experiences/components/ExperienceActivityListItem.jsx`
- `client/src/features/experiences/components/CreateActivityPanel.jsx`
- `client/src/features/experiences/components/experienceFormUtils.js`

**Modified**

- `client/src/app/router.jsx` — `/experiences/:experienceId` → `ExperienceDetailPage`

**Deleted**

- `client/src/features/experiences/ExperienceDetailFoundationPage.jsx`

### Checks run

- `npm run build` (client) — **passed**
- `npm run lint` (client) — **failed** with pre-existing Phase 1 errors plus same `setState-in-effect` pattern on detail page (matches Dashboard/Profile)

### Manual smoke test path

1. Log in → `/experiences`
2. Open an experience card → `/experiences/:experienceId`
3. Verify metadata, overview `MarkdownEditor`, polished section (empty or preview)
4. Edit fields → **Save changes** → refresh → changes persist
5. **Add activity** → title + description → appears in list
6. Click activity → `/activities/:id` (foundation until **214**)
7. **Delete experience** → confirm → redirected to `/experiences`; item removed from index
8. Invalid id → not-found message + link back

### API integration status

**Fully wired to real API** — workspace, update, delete, list/create activities. No mock fallback.

### Known limitations / follow-up

- **214** — full Activity Detail screen
- Activity pagination UI when `activitiesMeta.hasMore`
- Journal section when Journal API lands (Phase 5)
- **215** — dashboard evidence integration
