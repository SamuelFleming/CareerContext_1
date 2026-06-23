---
phase: 2
status: planned
source: large-feature plan — Phase 2 Dashboard Enhancements
---
# Ticket 242 — Dashboard API: Live Interactive CV Payload

## Status

**Planned**

## Phase

Phase 2 — Dashboard enhancements

## Depends on

- **215** — Dashboard evidence integration (complete)
- **237** — Live skills & technologies on evidence entities (complete)

## Related screen(s)

- Screen 4 — Dashboard (`GET /api/dashboard`, API-004)

## Related docs

- `docs/core-scope/08_api_contract.md` — API-004
- `docs/core-scope/06_screen_catalogue_and_data_requirements.md` — Dashboard data needs
- `server/src/constants/phase1DashboardMocks.js` — current mock source

## Objective

Extend `GET /api/dashboard` so `interactiveCv` returns **real evidence-backed data** for experience highlights and aggregated skills/technologies, while **explicitly scaffolding** profile-level core competencies for future AI derivation.

## User outcome

The dashboard API supplies enough structured data for the Interactive CV to show the user’s actual top experiences and top skills/technologies — without returning full Experience documents.

## Current state

| Field | Today |
|-------|--------|
| `interactiveCv.highlightExperiences` | Always `PHASE1_HIGHLIGHT_EXPERIENCES` mock |
| `interactiveCv.coreCompetencies` | Flat string array mock — no scaffold metadata |
| Skills/technologies on CV | Not exposed at profile/CV level |
| Experience/Activity `skills` / `technologies` | Persisted on entities (**235**–**237**) but not aggregated for dashboard |

## Scope

### `highlightExperiences[]` (live when user has evidence)

Query non-archived experiences for the user, sort by `updatedAt` desc, cap at **3** (dashboard preview — not a full index).

Each item — card slice only:

| Field | Source |
|-------|--------|
| `id` | Experience id |
| `type` | `experience.type` |
| `title` | `experience.title` |
| `meta` | Organisation + date range (reuse server-side formatting or mirror index card logic) |
| `descriptionPreview` | Truncated `overviewPolished` or `overviewRaw` (~120 chars) |
| `skills` | Experience `skills` array |
| `technologies` | Experience `technologies` array |
| `href` | `/experiences/:id` |

When user has **no** experiences: return `[]` (no Phase 1 mock fallback from API).

### `topSkillsAndTechnologies[]` (live aggregation)

- Collect `skills` and `technologies` from **all** non-archived experiences and activities for the user.
- Deduplicate case-insensitively; preserve display casing from first occurrence.
- Rank by **frequency** across entities; tie-break alphabetically.
- Return top **5** as `{ label, kind: 'skill' | 'technology' }` (or parallel arrays — pick one shape and document in API-004).
- Empty array when no terms exist.

### `coreCompetencies` (explicit AI scaffold envelope)

Replace flat string array with a documented scaffold shape, e.g.:

```json
"coreCompetencies": {
  "status": "scaffold",
  "source": "dashboard_mock",
  "message": "Profile-level competencies will be AI-derived in a future phase.",
  "items": [
    { "label": "React" },
    { "label": "Node.js" }
  ]
}
```

- Items remain obviously placeholder (served from `phase1DashboardMocks.js` or renamed constant).
- `status: "live"` reserved for Phase 4 AI — do not implement now.

### Evidence panel minor adjustments (support **244**)

- Cap `recentActivity.items` at **4** (was 10).
- Add scaffold block:

```json
"recentOpportunities": {
  "status": "not_implemented",
  "message": "Opportunity tracking arrives in Phase 3.",
  "items": []
}
```

- Set `defaultView` to `"recentActivity"`.

### Documentation

- Update API-004 in `08_api_contract.md` with new `interactiveCv` and `evidencePanel` shapes.
- Note deprecation of flat `coreCompetencies: string[]`.

## Out of scope

- Opportunity CRUD or real recent-opportunity data
- AI derivation of competencies or ranked skills
- Full Experience/Activity entity payloads on dashboard
- Journal recent items (journal API not implemented)
- Frontend UI changes (**243**, **244**)

## Technical tasks

- [ ] Add `buildHighlightExperiences(userId)` in `dashboardService.js`
- [ ] Add `buildTopSkillsAndTechnologies(userId)` aggregation helper
- [ ] Refactor `coreCompetencies` to scaffold envelope
- [ ] Cap recent activity at 4; add `recentOpportunities` scaffold
- [ ] Remove API use of `PHASE1_HIGHLIGHT_EXPERIENCES` for users with real data; return `[]` when empty
- [ ] Update `08_api_contract.md` API-004

## Acceptance criteria

- [ ] `highlightExperiences` returns up to 3 real experiences with card-slice fields when evidence exists
- [ ] `highlightExperiences` returns `[]` when user has no experiences (no mock highlights in API)
- [ ] `topSkillsAndTechnologies` returns up to 5 aggregated terms from persisted skills/technologies
- [ ] `coreCompetencies` uses scaffold envelope with `status: "scaffold"` and mock items
- [ ] `recentActivity.items` capped at 4
- [ ] `recentOpportunities` scaffold present with `status: "not_implemented"`
- [ ] API-004 contract updated

## Likely touched files

- `server/src/services/dashboardService.js`
- `server/src/constants/phase1DashboardMocks.js` (rename or restrict to competencies scaffold)
- `docs/core-scope/08_api_contract.md`

## Completion notes

_(empty — fill when implemented)_
