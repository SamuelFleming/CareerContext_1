# 008 — Profile / Core Context Screen (UI Wiring)

## Status

**Implemented**

## Objective

Implement Screen 5: **Profile / Core Context** with live backend integration.

This screen lets the user maintain structured profile details (`CoreContext`), their raw career summary Markdown, and core resume Markdown.

## Phase

```
Phase 1 — Auth and Profile
```

## Related Screens

```
4. Dashboard
5. Profile / Core Context
```

## Endpoints

```
GET /api/profile
PUT /api/profile
PUT /api/profile/core-context
PUT /api/profile/core-resume
```

## Scope

Create the first meaningful authenticated user workspace screen after Dashboard, wired to the **007.2** `CoreContext` data model.

## Technical Tasks

Create or update:

```
features/profile/ProfilePage.jsx
features/profile/components/ProfileSummaryForm.jsx
features/profile/components/CoreContextEditor.jsx
features/profile/components/CoreResumeEditor.jsx
features/profile/components/ProfileFreshnessWidget.jsx
services/profileService.js
```

Screen sections:

```
Basic Profile (CoreContext structured fields)
Core Context (raw summary Markdown)
Core Resume
Context Freshness / Last Updated
```

## Data Fields

### User (read-only identity)

```
user.id
user.email          // readonly in UI
```

### CoreContext (structured profile + summary)

```
coreContext.fullName
coreContext.mobile
coreContext.location
coreContext.headline
coreContext.rawSummaryMd
coreContext.summaryUpdatedAt
```

### Resume (still on User for MVP)

```
coreResumeMd
coreResumeUpdatedAt
```

### Profile completeness (from API)

```
profileCompleteness.score
profileCompleteness.completed
profileCompleteness.total
profileCompleteness.status
profileCompleteness.showPrompt
profileCompleteness.checks[]
profileCompleteness.missing[]
profileCompleteness.nextAction
```

Calculated by `profileCompletenessService.js` — same object shape as `GET /api/dashboard`.

## API Mapping

| UI section | Load from | Save via |
|---|---|---|
| Basic Profile | `GET /api/profile` → `coreContext` + `user.email` | `PUT /api/profile` with `{ fullName, mobile, location, headline }` |
| Core Context summary | `GET /api/profile` → `coreContext.rawSummaryMd` | `PUT /api/profile/core-context` with `{ rawSummaryMd }` |
| Core Resume | `GET /api/profile` → `coreResumeMd` | `PUT /api/profile/core-resume` with `{ coreResumeMd }` |

## UX Notes

- Visually continue the theme established in Dashboard (PageHeader, Card, accent tokens).
- Core Context should feel important — it is the strategic career narrative for future AI workflows.
- Core Context uses **`MarkdownEditor`** (**008.1**).
- Core Resume: **`MarkdownEditor`** (**008.3**) + upload/markdown mode scaffold (**008.4**). Storage stays on `User` per **008.2**.
- Useful widgets:
  - Last updated badges (`summaryUpdatedAt`, `coreResumeUpdatedAt`)
  - Profile completion indicator from `profileCompleteness` (matches Dashboard score)
  - Core Context guidance card
  - Per-section save status (idle / saving / saved / error)

## Acceptance Criteria

- `/profile` is protected (existing `ProtectedRoute` + app shell).
- Screen fetches profile on load via `GET /api/profile`.
- User can update `fullName`, `mobile`, `location`, `headline` via `PUT /api/profile`.
- User can update Core Context summary via `PUT /api/profile/core-context` (`rawSummaryMd`).
- User can update Core Resume via `PUT /api/profile/core-resume` (`coreResumeMd`).
- `user.email` is displayed read-only.
- Save success and error states are visible per section.
- Last-updated timestamps are displayed when available.
- Screen uses the authenticated app layout.
- Styling is consistent with Dashboard.
- Refreshing the page preserves saved profile data.
- Empty states guide the user on what to write.
- `ProfileFreshnessWidget` displays `profileCompleteness` from `GET /api/profile`.
- Profile completeness score matches Dashboard after saves (shared backend rules).

## Out of Scope

- AI summarisation or polishing of `rawSummaryMd`
- Resume migration to `Document` model (**008.2** documents plan; **DOC-002** implements)
- Core resume `MarkdownEditor` and upload scaffold (**008.3**, **008.4** — implemented)
- Auto-save / debounced save
- Markdown preview rendering

## Depends On

- **007** — Profile endpoints
- **007.2** — `CoreContext` model and refactored profile API shape
- **008.1** — `MarkdownEditor` for raw summary field (`CoreContextEditor`)
- **008.2** — Core resume → Document refactor plan (documentation)
