---
phase: 2
status: implemented
source: repo-local execution ticket
methodology: lightweight intent-led ticket; agent must inspect current codebase before implementation
---
# Ticket 214 — Activity Detail Vertical Slice

## Intent

Implement the Activity Detail screen for editing a reusable evidence Activity.

## User outcome

A logged-in user can open an Activity, edit its evidence content, see its parent Experience context, and return to the parent Experience.

## Scope

- Implement Screen 8: Activity Detail at `/activities/:activityId`.
- Fetch and display Activity by ID.
- Show Activity title and parent Experience context/link when available.
- Support editing/saving Activity title and evidence content.
- Show raw content Markdown and polished content Markdown if available.
- If polished content is empty, show a clear empty state.
- Include a disabled or clearly labelled "AI polish coming later" affordance.
- Support deleting the Activity with confirmation.
- Support navigation back to parent Experience.
- Reuse the existing Markdown editor if available; otherwise use the closest current textarea/Markdown pattern and leave a TODO.
- Handle loading, error, not-found, deleted, and success states.
- Update this ticket's implementation/completion notes after work is complete.

## Out of scope

- Implementing AI polishing.
- Dashboard evidence integration.
- Major Activity model redesign.
- Full Experience Detail rework beyond what is needed for navigation compatibility.
- Opportunity or Document work.

## Acceptance criteria

- [x] `/activities/:activityId` remains protected.
- [x] Screen fetches Activity by ID.
- [x] Parent Experience context is visible or linked when available.
- [x] User can update Activity title/content.
- [x] User can delete Activity with a confirmation step.
- [x] User can navigate back to the parent Experience.
- [x] Empty polished-content state exists.
- [x] Future AI polish action is visible but disabled or marked as coming later.
- [x] Components do not call `fetch` directly.
- [x] Any API/model mismatch is documented.

## Implementation notes

### Load strategy

- Single `getActivity(activityId)` (API-018) returns `{ activity, parentExperience }`.
- Save: `updateActivity` (API-019) with `title`, `rawDescription`.
- Delete: `deleteActivity` (API-020) → navigate to `/experiences/:parentExperienceId`.

### Component structure

- `ActivityDetailPage.jsx` — container
- `ActivityParentContext.jsx` — parent experience link
- `ActivityEditorCard.jsx` — title + `rawDescription` via `MarkdownEditor`
- `ActivityPolishedSummary.jsx` — read-only `polishedSummary` + disabled AI CTA
- `ActivityDeleteConfirm.jsx` — inline delete confirmation
- `activityFormUtils.js` — form mapping and payload builder

### Markdown editor

- `rawDescription`: shared `MarkdownEditor`
- `polishedSummary`: read-only `MarkdownPreview`; AI polish disabled (API-021 is 501)

### API contract mismatches

| Item | Contract | Implementation | Impact |
|------|----------|----------------|--------|
| DELETE message | `"Activity deleted"` | `"Activity archived"` | None for UI |
| Invalid id | — | `400 Invalid activity ID` | Shown as not-found UI |
| Polish | API-021 documented | `501 notImplemented` | Disabled button only |

## Completion notes

**Completed:** 2026-06-18

### Files changed

**Created**

- `client/src/features/activities/ActivityDetailPage.jsx`
- `client/src/features/activities/components/activityFormUtils.js`
- `client/src/features/activities/components/ActivityParentContext.jsx`
- `client/src/features/activities/components/ActivityEditorCard.jsx`
- `client/src/features/activities/components/ActivityPolishedSummary.jsx`
- `client/src/features/activities/components/ActivityDeleteConfirm.jsx`

**Modified**

- `client/src/app/router.jsx` — `/activities/:activityId` → `ActivityDetailPage`

**Deleted**

- `client/src/features/activities/ActivityDetailFoundationPage.jsx`

### Checks run

- `npm run build` (client) — **passed**
- `npm run lint` (client) — **failed** with pre-existing Phase 1 errors plus same `setState-in-effect` pattern on detail page (matches Experience Detail)

### Manual smoke test path

1. Log in → `/experiences` → open an experience
2. On Experience Detail → click an activity → `/activities/:id`
3. Verify parent context card + **Back to experience** in header
4. Edit title + raw Markdown → **Save changes** → reload → persisted
5. Polished summary: empty state or preview when present; AI button disabled
6. **Back to experience** → `/experiences/:parentId`
7. Return to activity → **Delete activity** → confirm → parent experience; activity removed from list
8. Invalid activity id → not-found UI

### API integration status

**Fully wired to real API** — `getActivity`, `updateActivity`, `deleteActivity`. No mock fallback.

### Known limitations / follow-up

- **215** — dashboard evidence integration
- Manual edit of `polishedSummary` not exposed (AI-only workflow later)
- API-021 polish not wired
