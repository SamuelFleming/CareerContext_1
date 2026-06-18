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

## Phase 2 backend — Summary

- Experience and Activity CRUD, workspace, and list pagination are implemented and contract-documented.
- Frontend tickets **211**–**215** are next — see `docs/devTickets/devTickets_next.md`.

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
