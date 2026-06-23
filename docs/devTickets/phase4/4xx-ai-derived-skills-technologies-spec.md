---
phase: 4
status: planned
source: large-feature plan — AI-derived skills & technologies (parent spec)
---
# Ticket 4xx — AI-Derived Skills & Technologies (Parent Spec)

## Status

**Planned** — specification / planning index; **no implementation** until Phase 4 execution

## Phase

Phase 4 — AI Workflows

## Depends on

- Phase 2 **234**–**237** — Manual `skills[]` / `technologies[]` on Experience and Activity
- Phase 2 **242**–**243** — Dashboard Interactive CV live aggregation + `coreCompetencies` scaffold envelope

## Child implementation tickets

| Ticket | Area | Summary |
|--------|------|---------|
| [**401**](401-ai-derived-skills-technologies-backend.md) | Backend | AI extraction, merge policy, profile competency derivation, API contract |
| [**402**](402-ai-derived-skills-technologies-frontend.md) | Frontend | Review/suggest UI on evidence screens + live dashboard competencies |

Implement **401** before **402**.

## Objective

Define how AI **derives, classifies, ranks, and persists** skills and technologies across the career evidence layer — building on manual entry and the dashboard scaffolds introduced in Phase 2.

## Current state (post Phase 2)

| Surface | Skills/technologies today | AI readiness |
|---------|---------------------------|--------------|
| **Activity** | Manual `skills[]`, `technologies[]` on create/edit | Text source: `rawDescription` |
| **Experience** | Manual arrays on create/edit; live chips on index/detail | Text source: `overviewRaw` + child activities |
| **Dashboard `topSkillsAndTechnologies`** | **Live** — frequency-ranked top 5 from all evidence (**242**) | No AI; aggregation only |
| **Dashboard `coreCompetencies`** | **Scaffold** — `status: "scaffold"`, mock labels (**242**–**243**) | Target for profile-level AI derivation |
| **Opportunity matching** | Not implemented | Out of scope for **401**/**402** |

Manual terms are **authoritative**. AI must suggest or append — not silently replace user-entered tags.

## Proposed behaviour (summary)

### Extraction levels

| Level | Primary inputs | Output |
|-------|----------------|--------|
| Activity | `rawDescription` | Suggested `skills[]`, `technologies[]` |
| Experience | `overviewRaw`, child activity terms | Suggested rollup + reorder |
| Profile / Dashboard CV | `rawSummaryMd`, aggregated evidence | `interactiveCv.coreCompetencies` → `status: "live"` |

### Merge policy (MVP Phase 4)

1. User-entered terms are never deleted by AI without explicit user action.
2. AI suggestions are returned for **review** before persist (no silent overwrite).
3. Classification: assign `technology` vs `skill` before chip display.
4. Ranking: array order = significance; AI may propose reorder user accepts.
5. Defer structured term objects (`source`, `confidence`) until a taxonomy ticket — Phase 4 may stay on `string[]` with metadata in API response only.

### API direction (detail in **401**)

- `POST /api/activities/:activityId/extract-terms` (suggest)
- `POST /api/experiences/:experienceId/extract-terms` (rollup suggest)
- Profile competency derivation feeding `GET /api/dashboard` `coreCompetencies` envelope
- Persist via existing PUT endpoints after user confirmation

### UI direction (detail in **402**)

- “Suggest from description” on Activity and Experience edit surfaces
- Review/diff panel for proposed vs current chips
- Dashboard: replace scaffold competencies with live AI-derived chips (remove dashed preview styling)
- Transparency affordance: AI-suggested vs manual where useful

## Out of scope (parent)

- Opportunity requirement extraction / matching
- Shared taxonomy service (unless spun out as separate ticket)
- Schema migration to rich term objects (optional later)
- Journal-derived terms (Phase 5)

## Open questions

1. Should AI reorder existing manual terms or only append?
2. Shared term normalisation with Opportunity `extractedSkills` (Phase 3)?
3. Minimum confidence threshold before showing a suggestion?

## Notes

Phase 2 ticket **237** removed mock chip fallbacks on evidence surfaces. Dashboard **243** keeps competency scaffold visually distinct until **402** ships.
