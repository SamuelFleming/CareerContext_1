# CareerContext — Dev Completion Registry

Tracks completed backend and full-stack development tickets.

| Ticket | Title | Phase | Completed | Notes |
|--------|-------|-------|-----------|-------|
| CC-004 | Auth backend (User model, register/login/me) | Phase 1 | 2026-06-12 | JWT auth, User model |
| 007 | Profile and Core Context Backend | Phase 1 | 2026-06-12 | Profile endpoints on User model |
| 007.2 | CoreContext model and profile refactor | Phase 1 | 2026-06-12 | Dedicated `CoreContext` model; dashboard uses CoreContext for profile summary |
| 008 | Profile / Core Context UI wiring | Phase 1 | 2026-06-12 | Screen 5 wired to profile API with CoreContext fields |
| 006.1 | Dashboard audit and target-state discovery | Phase 1 | 2026-06-12 | Interactive CV layout; collapsible evidence panel |
| 006.3 | Dashboard API endpoint | Phase 1 | 2026-06-12 | `GET /api/dashboard` with 006.2 contract |
| 006.4 | Dashboard API integration | Phase 1 | 2026-06-12 | Screen 4 wired to dashboard API |
| 008.1 | Reusable Markdown editor widget | Phase 1 | 2026-06-16 | Shared `MarkdownEditor` on Profile + Journal drawer |
| 008.2 | Core resume → Document refactor plan | Phase 1 | 2026-06-16 | Documentation only; migration deferred to DOC-002 |
| 008.3 | Core resume MarkdownEditor | Phase 1 | 2026-06-16 | `CoreResumeEditor` uses shared `MarkdownEditor` |
| 008.4 | Core resume input mode scaffold | Phase 1 | 2026-06-16 | Markdown vs Upload toggle; upload placeholder only |
| 009 | Shared authenticated app layout polish | Phase 1 | 2026-06-16 | NavItem, mobile shell, user identity, placeholder routes |
| 010 | Phase 1 stabilisation and QA pass | Phase 1 | 2026-06-16 | API smoke tests passed; checklist reconciled |
| 200 | Phase 2 planning and data contract review | Phase 2 | 2026-06-18 | Data model and API contract aligned for evidence |
| 201 | Experience and Activity models | Phase 2 | 2026-06-18 | Mongoose models with raw/polished fields |
| 202 | Experience backend CRUD | Phase 2 | 2026-06-18 | API-009–013 |
| 203 | Activity backend CRUD | Phase 2 | 2026-06-18 | API-018–020 |
| 204 | Experience and Activity middleware and validation | Phase 2 | 2026-06-18 | Evidence middleware chain |
| 205 | Experience workspace endpoint | Phase 2 | 2026-06-18 | API-014 workspace payload |
| 206 | List query standard | Phase 2 | 2026-06-18 | Shared pagination/filter/search via `listQuery.js` |
| 211 | Evidence frontend foundation | Phase 2 | 2026-06-18 | Routes, services, foundation placeholder pages |
| 212 | Experience Index vertical slice | Phase 2 | 2026-06-18 | Screen 6 — list, create, navigate to detail |
| 213 | Experience Detail vertical slice | Phase 2 | 2026-06-18 | Screen 7 — workspace, edit/delete, activity create |
| 214 | Activity Detail vertical slice | Phase 2 | 2026-06-18 | Screen 8 — edit/delete, parent context, polish scaffold |
| 215 | Dashboard evidence integration | Phase 2 | 2026-06-18 | Real evidence counts + recent activity in Evidence Panel |
| 231 | Experience card visual polish + AI scaffold | Phase 2 | 2026-06-19 | `TypeChip`, `ExperienceSummaryCard` on index; `skillChipVariantsMock` |
| 235 | Experience skills & technologies CRUD | Phase 2 | 2026-06-19 | `TermChipInput` on create/edit; API-009 list includes fields |
| 236 | Activity skills & technologies CRUD | Phase 2 | 2026-06-20 | `TermChipInput` on create/edit; API-016/018/019 doc sync |
| 237 | Live skills & technologies chips | Phase 2 | 2026-06-20 | Live chips on index/detail/activity surfaces; mock fallback removed |
| 238 | Evidence modals & activity detail redesign | Phase 2 | 2026-06-20 | Modal create/edit; activity detail header + widget layout |
| 239 | Scrollable markdown preview and card restyle | Phase 2 | 2026-06-22 | Separate preview components; bounded previews; neutral/accent detail card styling |
| 240 | Backend JWT expiry responses | Phase 2 | 2026-06-23 | Auth middleware returns `AUTH_REQUIRED` / `TOKEN_EXPIRED` / `TOKEN_INVALID` with contract envelope |
| 241 | Frontend session expiry handling | Phase 2 | 2026-06-23 | `ApiError`, `AuthSessionBridge`, login session-expired banner; global 401 intercept |
| 242 | Dashboard API: live Interactive CV payload | Phase 2 | 2026-06-23 | Live highlightExperiences, topSkillsAndTechnologies, competencies scaffold envelope |
| 243 | Dashboard Interactive CV UI | Phase 2 | 2026-06-23 | Landing-style CV card, live chips, competency scaffold tooltips, clickable highlights |
| 244 | Dashboard evidence panel restructure | Phase 2 | 2026-06-23 | EvidenceSummaryCard + RecentFeedsPanel; entity-type row tints |
| 245 | Swagger environment setup | Phase 2 | 2026-06-23 | OpenAPI infra at `/api/docs`; implemented-endpoints-only standard; dual source of truth with `08_api_contract.md` |
| 246 | OpenAPI initial API snapshot | Phase 2 | 2026-06-25 | Added implemented-endpoint path fragments (API-001–016, API-018–020); excluded stubs/polish/journal from Swagger |

## 239 — Summary

- Introduced `MarkdownContentPreview` for read-only markdown display while keeping `MarkdownPreview` for editor toggle preview.
- Added bounded, scrollable markdown preview behavior for both editor preview mode and default markdown view cards.
- Restyled detail cards: markdown summary cards now neutral/white, skills cards now accent/purple, and parent experience card remains evidence yellow.

## 238 — Summary

- Experience create, activity create, and activity edit use modals (`max-w-3xl`, tightened metadata fields).
- Activity Detail mirrors Experience Detail: header with parent context line + AI scaffold; skills/tech + AI summary widgets.
- Removed inline create panels and duplicate back navigation on activity detail.

## 237 — Summary

- Experience index cards and detail widget show persisted `skills` / `technologies` via shared chip utils — no mock fallback.
- Activity list items show up to 3 technology tags; activity detail has read-only chip summary when terms exist.
- `skillChipVariantsMock.js` retains only `AI_ONE_LINE_PLACEHOLDER`; API-015 list example documented.

## 236 — Summary

- Activity create (experience detail) and edit (activity detail) support `technologies` and `skills` via `TermChipInput`.
- `buildActivityPayload` / `activityToForm` send and reload normalized string arrays; backend validation unchanged.
- API contract examples updated for API-016, API-018, API-019.

## 235 — Summary

- Experience create (index) and edit (detail modal) support `technologies` and `skills` via `TermChipInput`.
- `buildExperiencePayload` sends normalized string arrays; backend validation unchanged.
- API-009 `toListItem` now includes skills/technologies for index card live chips.

## 234 — Summary

- Shared chip utils: variant by kind/rank, `normalizeTermList`, `toDisplayChips`.
- `TermChipInput` — add/remove terms with accent (tech) and neutral (skill) preview chips.
- Mock module refactored to delegate to utils; scaffold fallback kept until **237**.

## 233 — Summary

- `ExperienceOverviewWidget` shows `overviewPolished` when non-empty, else `overviewRaw`.
- Source badge: “AI-polished overview” or “Raw overview”; empty state when both blank.
- Edit modal unchanged — still edits `overviewRaw`.

## 232 — Summary

- `ExperienceDetailHeader` with **231** topology and PageHeader styling.
- Skills/technologies widget (top 5 ranked) + overview Markdown preview widget.
- **Edit** opens modal with `ExperienceEditorCard`; inline details card removed.
- Activities: 2-column grid, 8 per page, sort + client-side date filter on `updatedAt`.
- Backlog **233** for AI overview display priority.

## 231 — Summary

- `ExperienceSummaryCard` on Experience Index with topology: title + `TypeChip`, dates, role/org, AI one-line placeholder, activity count, scaffold `SkillChip` variants.
- `TypeChip` UI primitive separate from `SkillChip`; mock chip data in `skillChipVariantsMock.js` (no API changes).
- Experience Detail unchanged — summary card deferred to backlog.

## 215 — Summary

- `dashboardService.buildEvidencePanel()` — real experience/activity counts and merged recent-activity feed (up to 10 items).
- `EvidencePanel.jsx` — Evidence Summary count cards and Recent Activity linked list.
- Interactive CV competencies/highlights still use Phase 1 mocks (`phase1DashboardMocks`) by design.

## 214 — Summary

- `ActivityDetailPage` at `/activities/:activityId` — get/update/delete via `activityService`.
- Parent experience context card, raw Markdown editor, polished summary empty state, disabled AI polish affordance.

## 213 — Summary

- `ExperienceDetailPage` at `/experiences/:experienceId` — workspace load, metadata edit, delete with confirm.
- Activity list/create under experience; navigation to Activity Detail.

## 212 — Summary

- `ExperienceIndexPage` at `/experiences` — list/create experiences via `experienceService`.
- `ExperienceListItem` + `ExperienceSummaryCard` (after **231**); loading, error, and empty states.

## 211 — Summary

- Protected routes: `/experiences`, `/experiences/:experienceId`, `/activities/:activityId`.
- `experienceService.js` (API-009–016) and `activityService.js` (API-018–020); no polish wrappers.
- Foundation placeholder pages in `features/experiences/` and `features/activities/`; no API calls in components.
- Experiences nav item active (removed “Soon” badge).

## Phase 2 — Summary

- Backend **200**–**206** complete; frontend **211**–**215**, **231**–**233** complete.
- Broader next phase: Opportunities, Documents, Journal — see `docs/devTickets/devTickets_next.md`.

## Phase 2 backend — Summary

## 010 — Summary

- Phase 1 auth, profile, and dashboard flows verified via API smoke test.
- Dashboard **no longer** shows core resume preview (by design); Core Context summary preview in Interactive CV.
- Ready to proceed to Phase 2 (Experience Evidence).

## 009 — Summary

- `NavItem` + `navConfig` centralise primary navigation.
- `TopNav` shows user name/email, mobile menu, active links on small screens.
- `Sidebar` mobile overlay; Journal opens global drawer via `JournalDrawerContext`.
- Placeholder routes: `/experiences`, `/journal`, `/opportunities`, `/documents`.

## 008.4 — Summary

- `CoreResumeEditor` mode toggle: **Write in Markdown** | **Upload file**.
- `CoreResumeUploadPlaceholder` — Phase 3 messaging; disabled choose file; no API calls.
- Save disabled on Upload tab; markdown content preserved when switching modes.

## 008.3 — Summary

- `CoreResumeEditor` uses `MarkdownEditor` (Edit/Preview + toolbar) for `coreResumeMd`.
- API unchanged: `PUT /api/profile/core-resume`.

## 008.2 — Summary

- Core resume stays on `User.coreResumeMd` until refactor triggers (versioning, export, opportunity-linked docs, etc.).
- Future: `Document { type: 'core_resume' }` + `User.coreResumeDocumentId`.
- **008.3** / **008.4** improve Profile UX without changing storage.

## 008.1 — Summary

- `client/src/components/editor/` — `MarkdownEditor`, `MarkdownPreview`, toolbar helpers, themed CSS.
- Edit/Preview toggle + formatting toolbar; renders via `react-markdown` + `remark-gfm`.
- **Profile:** `CoreContextEditor` raw summary field.
- **Journal:** `JournalDrawer` notes field (local draft until journal API lands).

## 006.3 / 006.4 — Summary

- `GET /api/dashboard` returns Interactive CV payload with identity, summary preview, Phase 1 mock competencies/experiences, evidence panel placeholders.
- `profileCompletenessService.js` shared between Dashboard and Profile (`GET /api/profile` includes `profileCompleteness`).
- Dashboard UI: `InteractiveCvCard`, `ProfileCompletenessPrompt`, `EvidencePanel`. No core resume preview or quick actions.
- Phase 1 mocks: `server/src/constants/phase1DashboardMocks.js` (+ client fallback in `phase1MockData.js`).

## 007.2 — Summary

- Added `server/src/models/CoreContext.js` with one-to-one `userId` relationship.
- Moved structured profile fields and `rawSummaryMd` off `User` onto `CoreContext`.
- `User` retains auth identity (`email`, `name`) and resume fields (`coreResumeMd`, `coreResumeUpdatedAt`).
- Profile and dashboard endpoints read/write via `CoreContext`.
- Core Context auto-created on registration and on first profile access for legacy users (with migration from deprecated User fields).
