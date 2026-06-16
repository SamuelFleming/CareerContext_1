# CareerContext — Next Dev Tickets

Suggested upcoming work after **008.1**.

## Phase 1 — Auth and Profile (remaining)

| Ticket | Title | Priority | Type | Notes |
|--------|-------|----------|------|-------|
| **008.3** | Core resume `MarkdownEditor` | High | UI | Swap `TextArea` in `CoreResumeEditor`; no API change |
| **008.4** | Core resume input mode scaffold | Medium | UI | Markdown vs Upload toggle; upload is placeholder only |
| — | Resume migration to Document model | Low | Backend | See **DOC-002**; blocked on refactor triggers + DOC-001 |

**Completed in Phase 1:** Profile API (007 / 007.2), Profile UI (008), Dashboard (006.x), Markdown editor widget (008.1).

**Documented (no code):** **008.2** — Core resume → Document refactor plan.

## Phase 3 — Documents (future)

| Ticket | Title | Priority | Notes |
|--------|-------|----------|-------|
| **DOC-001** | Document model + CRUD backend | High | Replace 501 stubs; align with `05_data_model` |
| **DOC-002** | Migrate core resume to `core_resume` Document | Low | Trigger per **008.2**; depends on DOC-001 |

## Phase 2 — Experience Evidence

| Ticket | Title | Priority | Notes |
|--------|-------|----------|-------|
| — | Experience CRUD backend | High | Replace 501 stubs for `/api/experiences` |
| — | Activity CRUD backend | High | Nested under experiences |
| — | Dashboard CV from real data | Medium | Replace `phase1DashboardMocks` |

## Phase 4 — AI Workflows (future)

| Ticket | Title | Priority | Notes |
|--------|-------|----------|-------|
| — | AI summarisation of `rawSummaryMd` | Low | Add polished summary fields on CoreContext when ready |
