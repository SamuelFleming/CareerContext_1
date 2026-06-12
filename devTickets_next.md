# CareerContext — Next Dev Tickets

Suggested upcoming backend and full-stack work after **007.2**.

## Phase 1 — Auth and Profile (remaining)

| Ticket | Title | Priority | Notes |
|--------|-------|----------|-------|
| — | Wire ProfilePage to profile API | High | Load/save `user`, `coreContext`, and resume fields |
| — | Wire DashboardPage to dashboard API | Medium | Use `profile.fullName`, `headline`, completeness flags |
| — | Resume migration to Document model | Low | Out of scope for 007.2; keep `coreResumeMd` on User for now |

## Phase 2 — Experience Evidence

| Ticket | Title | Priority | Notes |
|--------|-------|----------|-------|
| 008+ | Experience CRUD backend | High | Replace 501 stubs for `/api/experiences` |
| — | Activity CRUD backend | High | Nested under experiences |

## Phase 4 — AI Workflows (future)

| Ticket | Title | Priority | Notes |
|--------|-------|----------|-------|
| — | AI summarisation of `rawSummaryMd` | Low | Add polished summary fields on CoreContext when ready |
