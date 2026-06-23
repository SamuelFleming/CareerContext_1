---
phase: 4
status: planned
source: parent spec 4xx — AI-derived skills & technologies
---
# Ticket 401 — AI-Derived Skills & Technologies (Backend)

## Status

**Planned**

## Phase

Phase 4 — AI Workflows

## Depends on

- [**4xx**](4xx-ai-derived-skills-technologies-spec.md) — Parent spec
- Phase 2 **203** — Activity backend
- Phase 2 **202** — Experience backend
- Phase 2 **242** — Dashboard `interactiveCv` shape (`topSkillsAndTechnologies`, `coreCompetencies` scaffold)

## Related screen(s)

- Screen 4 — Dashboard (API-004 `interactiveCv`)
- Screen 7 — Experience Detail (API-012, API-017 polish adjacent)
- Screen 8 — Activity Detail (API-019, API-021 polish adjacent)

## Related docs

- `docs/core-scope/05_data_model.md` — `skills`, `technologies` on Experience / Activity
- `docs/core-scope/08_api_contract.md` — API-004, API-012, API-019, dashboard `coreCompetencies`
- `server/src/services/dashboardService.js` — `buildTopSkillsAndTechnologies`, `buildCoreCompetenciesScaffold`

## Objective

Implement backend AI workflows to **suggest** skills and technologies from evidence text, support **user-confirmed persistence**, and **derive profile-level core competencies** for the dashboard — without breaking manual entry from Phase 2.

## User outcome

The API can propose ranked skill/technology terms from activity and experience content; after user acceptance, terms persist on entities; the dashboard can return **live** `coreCompetencies` instead of scaffold mock data.

## Scope

### AI extraction endpoints (suggest-only)

| ID (proposed) | Method | Endpoint | Purpose |
|---------------|--------|----------|---------|
| API-4xx-A | POST | `/api/activities/:activityId/extract-terms` | Suggest skills/technologies from `rawDescription` |
| API-4xx-B | POST | `/api/experiences/:experienceId/extract-terms` | Suggest rollup from `overviewRaw` + child activity terms |

**Response (suggest):**

```json
{
  "data": {
    "skills": ["Leadership"],
    "technologies": ["React", "Node.js"],
    "meta": {
      "source": "ai",
      "model": "…",
      "generatedAt": "…"
    }
  }
}
```

- Does **not** auto-persist — client merges after user review.
- Ownership: `authenticateWithJwt` + `loadOwnedActivity` / `loadOwnedExperience`.

### Persist path

- Reuse existing `PUT` on Activity (**API-019**) and Experience (**API-012**) after user confirms merged arrays.
- Optional: `POST …/accept-terms` if merge logic must be server-side — prefer client merge + PUT unless complexity warrants otherwise.

### Merge policy (server-side validation)

- Reject payloads that drop user-entered terms without an explicit replace flag (if supported).
- Normalise duplicates case-insensitively; preserve display casing from first occurrence (match **242** aggregation rules).
- Classify each suggested term as `skill` or `technology` in suggest response.

### Profile / dashboard competency derivation

Extend `GET /api/dashboard` (API-004) `interactiveCv.coreCompetencies`:

| `status` | Meaning |
|----------|---------|
| `scaffold` | No AI run yet or insufficient profile/evidence (keep current mock or empty) |
| `live` | AI-derived from `rawSummaryMd` + aggregated evidence |

```json
"coreCompetencies": {
  "status": "live",
  "source": "ai",
  "message": null,
  "items": [{ "label": "Full-stack delivery" }, { "label": "Team leadership" }],
  "derivedAt": "2026-…"
}
```

- `topSkillsAndTechnologies` remains **frequency aggregation** from persisted entity arrays (**242**) — not replaced by AI in this ticket unless product decides to blend; document decision in completion notes.

### AI service layer

- Logic in `server/src/services/ai/` (e.g. `termExtractionService.js`, `profileCompetencyService.js`).
- Thin controllers; reuse `serviceError` patterns.
- Env-gated model key; graceful error when AI unavailable.

### Contract updates

- Register new endpoints in `08_api_contract.md`.
- Document `coreCompetencies.status: "live"` shape on API-004.

## Out of scope

- Frontend suggest/review UI (**402**)
- Opportunity extraction / matching (Phase 3)
- Rich term schema (`source` per array item in MongoDB)
- Journal term extraction (Phase 5)
- Auto-persist without user confirmation
- Replacing `topSkillsAndTechnologies` aggregation with a different algorithm (unless trivial extension)

## Technical tasks

- [ ] Add AI term extraction service(s) for Activity and Experience
- [ ] Add suggest endpoints with ownership middleware
- [ ] Implement merge/normalisation helpers aligned with **242** rules
- [ ] Add profile competency derivation for dashboard `coreCompetencies`
- [ ] Update `dashboardService.buildCoreCompetenciesScaffold` → live path when AI data exists
- [ ] Update `08_api_contract.md`

## Acceptance criteria

- [ ] Activity suggest endpoint returns classified skills/technologies from owned activity text
- [ ] Experience suggest endpoint returns rollup from overview + activities
- [ ] Suggest endpoints do not mutate DB without a separate PUT
- [ ] Dashboard returns `coreCompetencies.status: "live"` when derivation succeeds
- [ ] Manual terms on entities remain intact after suggest + accept flow
- [ ] API contract documents new endpoints and dashboard envelope

## Likely touched files

- `server/src/services/ai/` (new)
- `server/src/services/dashboardService.js`
- `server/src/routes/activityRoutes.js`, `experienceRoutes.js`
- `server/src/controllers/activityController.js`, `experienceController.js`
- `docs/core-scope/08_api_contract.md`

## Completion notes

_(empty — fill when implemented)_
