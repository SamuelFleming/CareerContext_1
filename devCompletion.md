# CareerContext — Dev Completion Registry

Tracks completed backend and full-stack development tickets.

| Ticket | Title | Phase | Completed | Notes |
|--------|-------|-------|-----------|-------|
| CC-004 | Auth backend (User model, register/login/me) | Phase 1 | 2026-06-12 | JWT auth, User model |
| 007 | Profile and Core Context Backend | Phase 1 | 2026-06-12 | Profile endpoints on User model |
| 007.2 | CoreContext model and profile refactor | Phase 1 | 2026-06-12 | Dedicated `CoreContext` model; dashboard uses CoreContext for profile summary |
| 008 | Profile / Core Context UI wiring | Phase 1 | 2026-06-12 | Screen 5 wired to profile API with CoreContext fields |

## 007.2 — Summary

- Added `server/src/models/CoreContext.js` with one-to-one `userId` relationship.
- Moved structured profile fields and `rawSummaryMd` off `User` onto `CoreContext`.
- `User` retains auth identity (`email`, `name`) and resume fields (`coreResumeMd`, `coreResumeUpdatedAt`).
- Profile and dashboard endpoints read/write via `CoreContext`.
- Core Context auto-created on registration and on first profile access for legacy users (with migration from deprecated User fields).
