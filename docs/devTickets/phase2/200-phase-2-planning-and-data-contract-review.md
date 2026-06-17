# 200 — Phase 2 Planning and Data Contract Review

## Objective

Review existing docs and current implementation before Experience Evidence development starts.

## References Used

- `docs/core-scope/05_data_model.md`
- `docs/core-scope/06_screen_catalogue_and_data_requirements.md`
- `docs/core-scope/07_screen_data_matrix.md`
- `docs/core-scope/08_api_contract.md`
- `docs/core-scope/04_product_theory.md`
- `client/src/app/router.jsx`
- `server/src/routes/experienceRoutes.js`
- `server/src/routes/activityRoutes.js`
- `server/src/services/dashboardService.js`

## Phase 2 MVP Decisions (Confirmed)

### Experience fields

Final MVP field set for `Experience`:

- `id`
- `userId`
- `type` (`job | project | course | certification | personal_project | other`)
- `title`
- `organisation` (optional)
- `role`
- `dateStart`
- `dateEnd` (optional)
- `isCurrent`
- `overviewRaw`
- `overviewPolished` (optional)
- `technologies` (array)
- `skills` (array)
- `createdAt`
- `updatedAt`

Note: `sourceDocumentIds` remains deferred (not required for initial Phase 2 CRUD).

### Activity fields

Final MVP field set for `Activity`:

- `id`
- `userId`
- `experienceId`
- `title`
- `rawDescription`
- `polishedSummary` (optional)
- `technologies` (array)
- `skills` (array)
- `outcomes` (optional)
- `evidenceStrength` (optional, `low | medium | high`)
- `linkedJournalEntryIds` (optional array)
- `createdAt`
- `updatedAt`

## Delete Behaviour (Decided)

Phase 2 deletes use `DELETE` endpoints but should be implemented as **soft archive** (not hard delete) for consistency with existing docs and future evidence traceability.

Implementation recommendation:

- Add `isArchived` (boolean, default `false`) and `archivedAt` (nullable date) for `Experience` and `Activity`.
- Filter archived records out by default in list endpoints.
- Allow explicit inclusion via query flag later if needed (for recovery/admin workflows).

## Route Params (Confirmed)

- `:experienceId`
- `:activityId`

## Frontend Routes (Confirmed)

- `/experiences`
- `/experiences/:experienceId`
- `/activities/:activityId`

Current state:

- `/experiences` exists as a placeholder in router.
- `/experiences/:experienceId` and `/activities/:activityId` are not yet wired in the client router and should be added in Phase 2 UI tasks.

## Phase 2 Endpoint List (Confirmed)

### Experience endpoints

- `GET /api/experiences`
- `POST /api/experiences`
- `GET /api/experiences/:experienceId`
- `PUT /api/experiences/:experienceId`
- `DELETE /api/experiences/:experienceId` (archive semantics)
- `GET /api/experiences/:experienceId/workspace`
- `GET /api/experiences/:experienceId/activities`
- `POST /api/experiences/:experienceId/activities`

### Activity endpoints

- `GET /api/activities/:activityId`
- `PUT /api/activities/:activityId`
- `DELETE /api/activities/:activityId` (archive semantics)

### Deferred from initial CRUD cut

- `POST /api/experiences/:experienceId/polish`
- `POST /api/activities/:activityId/polish`

These belong to AI workflow scope and can remain Phase 4 unless intentionally pulled forward.

## Dashboard Evidence Source (Decision for Later Wiring)

Dashboard evidence counts/recent evidence should be computed server-side in `GET /api/dashboard` from persisted evidence collections:

- `experiences` count from non-archived `Experience` by `userId`
- `activities` count from non-archived `Activity` by `userId`
- `journalEntries` count from non-archived `JournalEntry` by `userId` (when Journal is implemented)
- recent evidence list from most recent `Experience`/`Activity` updates (and journal later)

Current implementation uses placeholders in `server/src/services/dashboardService.js`; Phase 2 should replace the placeholder counts with real Experience/Activity values.

## Documentation Review Notes

During the docs reorg review, broken relative links were found and fixed in:

- `docs/core-scope/05_data_model.md`
- `docs/core-scope/08_api_contract.md`
- `docs/core-scope/00_documentation_index.md`

All now point to `docs/devTickets/phase1/008.2-core-resume-document-refactor-plan.md` and the moved dev ticket index files.
