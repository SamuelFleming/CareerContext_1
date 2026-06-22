# CareerContext — Next Dev Tickets

Phase 1 (Auth and Profile) is **complete**. Phase 2 backend (**200**–**206**) is **complete**. Phase 2 frontend evidence work is **ongoing** — see [`devCompletion.md`](./devCompletion.md).

## Phase 2 — Experience Evidence (ongoing)

Tickets live in `docs/devTickets/phase2/`.

| Ticket | Title | Priority | Status |
|--------|-------|----------|--------|
| **211** | Evidence frontend foundation | High | Done |
| **212** | Experience Index vertical slice (Screen 6) | High | Done |
| **213** | Experience Detail vertical slice (Screen 7) | High | Done |
| **214** | Activity Detail vertical slice (Screen 8) | High | Done |
| **215** | Dashboard evidence integration | Medium | Done |
| **231** | Experience card visual polish + AI scaffold | Medium | Done — index cards only |
| **232** | Experience Detail page redesign | Medium | Done — header, widgets, modal edit, activity grid |
| **233** | Experience overview AI priority display | Low | Done — polished over raw in overview widget |
| **234** | Skills & technologies UI foundation | High | Done — `TermChipInput`, chip utils, `SkillTechnologyChipList` |
| **235** | Experience skills & technologies CRUD | High | Done — create/edit forms + API-009 list fields |
| **236** | Activity skills & technologies CRUD | High | Done — create/edit forms + API-016/018/019 doc sync |
| **237** | Live skills & technologies chips | Medium | Done — live chips on evidence surfaces; mock fallback removed |
| **238** | Evidence modals & activity detail redesign | Medium | Done — modal create/edit; activity detail widgets |
| **239** | Scrollable markdown preview and card restyle | Medium | Done — bounded markdown preview + neutral/accent detail cards |
| **240** | Backend JWT expiry responses | High | Done — contract-aligned 401 codes (`TOKEN_EXPIRED`, etc.) |
| **241** | Frontend session expiry handling | High | Planned — global 401 intercept, login re-prompt, no "Request failed" UX |

### JWT expiry handling (240–241)

Cross-cutting auth hardening from local dev UAT: expired tokens currently leave protected routes open and surface generic **"Request failed"** errors. **240** (backend codes/envelope) is **done**; implement **241** (frontend intercept + graceful redirect). Verify end-to-end locally with `JWT_EXPIRES_IN=1m` in `server/.env`.

### Skills & technologies batch (234–237)

Manual entry and live chip display for Experience and Activity — **complete**. AI derivation spec backlogged in Phase 4 (`phase4/4xx-ai-derived-skills-technologies-spec.md`).

### Phase 2 backend (complete)

| Ticket | Title | Notes |
|--------|-------|-------|
| **200** | Phase 2 planning and data contract review | Done |
| **201** | Experience and Activity models | Done |
| **202** | Experience backend CRUD | Done |
| **203** | Activity backend CRUD | Done |
| **204** | Experience and Activity middleware and validation | Done |
| **205** | Experience workspace endpoint | Done |
| **206** | List query standard (filter/search/sort/pagination) | Done |

## Phase 3 — Opportunities and Documents

| Ticket | Title | Priority | Notes |
|--------|-------|----------|-------|
| **DOC-001** | Document model + CRUD backend | High | Replace 501 stubs |
| **DOC-002** | Migrate core resume to `core_resume` Document | Low | Per **008.2** triggers |
| — | Opportunities Index UI (Screen 10) | Medium | Replace coming-soon page |
| — | Documents UI (Screen 12) | Medium | Replace coming-soon page |

## Phase 5 — Journal

| Ticket | Title | Priority | Notes |
|--------|-------|----------|-------|
| — | Journal API + Screen 9 | Medium | Replace `/journal` coming-soon; persist drawer drafts |

## Phase 4 — AI Workflows (future)

| Ticket | Title | Priority | Notes |
|--------|-------|----------|-------|
| — | AI summarisation of `rawSummaryMd` | Low | Polished summary fields on CoreContext |
| **4xx** | AI-derived skills & technologies (spec) | Low | Spec only — see `phase4/4xx-ai-derived-skills-technologies-spec.md`; implement in Phase 4 |
