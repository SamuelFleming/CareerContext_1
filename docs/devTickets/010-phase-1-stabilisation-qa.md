# 010 — Phase 1 Stabilisation and QA Pass

## Status

**Complete** — API smoke tests passed; checklist reconciled with current implementation (June 2026).

## Phase

Phase 1 capstone — gate before Experience Evidence (Phase 2).

## Objective

Confirm Phase 1 flows work end-to-end before moving on.

---

## Scope (reconciled)

| Area | Tickets / implementation |
|------|--------------------------|
| Auth backend | CC-004 |
| Login / Register UI | CC-004 + public layout |
| Protected routing | `ProtectedRoute` + `ProtectedLayout` + **009** shell |
| Profile API | 007, 007.2 |
| Profile UI | 008, 008.1–008.4 |
| Dashboard API | 006.3 |
| Dashboard UI | 006.4 |
| App shell | 009 |

**Also delivered in Phase 1 (beyond original endpoint list):** `GET /api/dashboard`, Journal drawer (**008.1**), Markdown editors, navigation polish (**009**).

---

## QA Checklist

### Auth

| Check | Result | Notes |
|-------|--------|-------|
| Register new user | Pass | API `POST /api/auth/register` → 201 + JWT |
| Duplicate email rejected | Pass | 409 |
| Login works | Pass | `POST /api/auth/login` → 200 + JWT |
| Invalid login rejected | Pass | 401 |
| Token persists after refresh | Pass | `localStorage` via `authService`; `GET /api/auth/me` on load |
| Logout clears token | Pass | `clearStoredToken()` + redirect to `/login` |
| Protected screens redirect when unauthenticated | Pass | `ProtectedRoute` → `/login` |

### Profile

| Check | Result | Notes |
|-------|--------|-------|
| Fetch profile | Pass | `GET /api/profile` |
| Update structured profile | Pass | `PUT /api/profile` (fullName, headline, location, mobile) |
| Update Core Context | Pass | `PUT /api/profile/core-context` (`rawSummaryMd`) |
| Update Core Resume | Pass | `PUT /api/profile/core-resume` (`coreResumeMd`) |
| Last updated dates change | Pass | `summaryUpdatedAt`, `coreResumeUpdatedAt` set on PUT |
| Empty profile state behaves correctly | Pass | Completeness `empty` / prompts; guided empty states in editors |
| Profile completeness shared with Dashboard | Pass | `profileCompletenessService.js` on both endpoints |

### Dashboard

| Check | Result | Notes |
|-------|--------|-------|
| Dashboard loads authenticated user | Pass | `GET /api/dashboard`; identity from CoreContext + User |
| Profile completeness score makes sense | Pass | 5 fields × 20%; matches Profile |
| Core Context preview displays | Pass | `interactiveCv.summaryPreview` inside Interactive CV |
| ~~Core Resume preview displays~~ | **N/A** | **Removed by design (006.3/006.4)** — resume edited on Profile only |
| Skill chips / experience cards | Pass (Phase 1) | Mock data from API + client fallback; labelled as illustrative |
| Future placeholders do not imply completed functionality | Pass | Evidence panel `status: "placeholder"`; coming-soon routes (**009**) |

### Shell / UX (009)

| Check | Result | Notes |
|-------|--------|-------|
| Dashboard + Profile share layout | Pass | `AppShell` |
| Active nav + logout + user identity | Pass | Sidebar / TopNav |
| Placeholder nav routes safe | Pass | `ComingSoonPage` |

---

## Acceptance Criteria

- [x] Phase 1 flows work end-to-end (API smoke test — all checks passed)
- [x] No dummy authenticated data where API exists (Dashboard/Profile use live APIs; landing preview is public-only mock)
- [x] API errors handled visibly (load/save error states on Dashboard + Profile)
- [x] README / dev notes adequate (`server/README.md` endpoint log; `devCompletion.md` registry)

**Manual UI pass recommended:** Register → Dashboard → Profile edits → refresh → logout → protected URL redirect. Optional: mobile nav (**009**), Journal drawer, Markdown Edit/Preview.

---

## Discrepancy vs original ticket draft

1. **“Core Resume preview” on Dashboard** — outdated; use **Core Context summary preview** instead.
2. **Phase 1 endpoints** — include `GET /api/dashboard` in practice.
3. **010 does not re-test** Journal persistence (Phase 5) or Document/Experience stubs (Phase 2+).

## Suggested Commit Message

```
docs(qa): record Phase 1 stabilisation pass (010)
```
