---
phase: 2
status: implemented
source: repo-local execution ticket
methodology: lightweight intent-led ticket; agent must inspect current codebase before implementation
---
# Ticket 211 — Evidence Frontend Foundation

## Intent

Prepare the frontend foundation for Phase 2 Experience Evidence without building the full screens yet.

## User outcome

A logged-in user can navigate to Phase 2 evidence routes and see safe placeholder/foundation pages while the app has service-layer support ready for Experience and Activity API integration.

## Scope

- Add or confirm protected frontend routes for:
  - `/experiences`
  - `/experiences/:experienceId`
  - `/activities/:activityId`
- Create or update frontend service files for Experience and Activity API access.
- Ensure services use the shared API client/auth-token pattern.
- Add lightweight placeholder pages only where needed for route safety.
- Align with existing routing, layout, service, and feature-folder conventions.
- Update this ticket's implementation/completion notes after work is complete.

## Out of scope

- Full Experience Index UI.
- Full Experience Detail UI.
- Full Activity Detail UI.
- Dashboard evidence integration.
- Backend model/controller/service refactors unless required to resolve route/service contract mismatch.
- AI polish/generation features.

## Acceptance criteria

- [x] `/experiences` is a protected route.
- [x] `/experiences/:experienceId` is a protected route.
- [x] `/activities/:activityId` is a protected route.
- [x] Experience service exists or is updated and uses the shared API client.
- [x] Activity service exists or is updated and uses the shared API client.
- [x] No hardcoded API calls are introduced inside React components.
- [x] Placeholder pages, if used, follow existing app layout/visual direction.
- [x] Any API contract mismatch is documented in this ticket.

## Agent planning checklist

Before writing code, inspect:

- `CLAUDE.md`
- `.cursor/rules/frontend.mdc`
- `.cursor/rules/documentation.mdc`
- `client/src/app/router.jsx`
- `client/src/services/`
- `client/src/features/`
- `docs/core-scope/08_api_contract.md`
- `docs/core-scope/05_data_model.md`
- existing server route/controller files if endpoint shapes are unclear

Then provide a plan listing:

1. files inspected,
2. files to create/modify,
3. current API/service assumptions,
4. smallest safe implementation path,
5. verification steps,
6. documentation updates required.

## Implementation notes

### Files created

- `client/src/services/experienceService.js` — API-009–016 wrappers (no polish)
- `client/src/services/activityService.js` — API-018–020 wrappers (no polish)
- `client/src/features/experiences/ExperiencesFoundationPage.jsx`
- `client/src/features/experiences/ExperienceDetailFoundationPage.jsx`
- `client/src/features/activities/ActivityDetailFoundationPage.jsx`

### Files modified

- `client/src/app/router.jsx` — foundation pages for three evidence routes
- `client/src/components/navigation/navConfig.js` — Experiences nav: `kind: "link"`, removed `soon` badge

### Service assumptions

- List endpoints return `{ data: [], meta }` with `data` as array at root (not nested under `experiences`).
- Create endpoints return minimal `{ id }` in `data.experience` / `data.activity` — **212** must refetch or navigate with id.
- Workspace (API-014) returns `experience`, paginated `activities` + `activitiesMeta`, and empty `journalEntries` stub until Journal API (Phase 5).
- Activity GET (API-018) returns `{ data: { activity, parentExperience } }`.
- Polish endpoints (API-017, API-021) omitted from services — server returns 501.

### API contract mismatches (documented, no 211 blocker)

| Item | Contract (`08_api_contract.md`) | Implementation | Impact |
|------|--------------------------------|----------------|--------|
| DELETE messages | `"Experience deleted"` / `"Activity deleted"` | `"Experience archived"` / `"Activity archived"` | None — clients ignore message text |
| Workspace journal | `journalEntries` populated when linked | Always `[]` until Journal API | **213** should handle empty journal gracefully |
| Polish | API-017, API-021 documented | `501 notImplemented` | Out of scope; **214** shows disabled affordance |

## Completion notes

**Completed:** 2026-06-18

### Files changed

See implementation notes above. No backend or API contract doc changes.

### Checks run

- `npm run build` (client) — **passed**
- `npm run lint` (client) — **failed** with 8 pre-existing errors in Phase 1 files (`JournalDrawer.jsx`, `NavItem.jsx`, `authContext.jsx`, `DashboardPage.jsx`, `EvidencePanel.jsx`, `ProfilePage.jsx`); **no lint issues in 211 files**

### Manual smoke test path

1. Log in → sidebar **Experiences** (no “Soon” badge) → `/experiences` foundation page
2. Navigate to `/experiences/test-id` → detail foundation shows param id
3. Navigate to `/activities/test-id` → activity foundation shows param id
4. Unauthenticated visit to `/experiences` → redirects to login

### Known limitations / follow-up

- Foundation pages do not call services yet — **212** wires `listExperiences` / `createExperience` on `/experiences`
- **213** replaces `ExperienceDetailFoundationPage` with full Screen 7
- **214** replaces `ActivityDetailFoundationPage` with full Screen 8
- **215** dashboard evidence integration unchanged
