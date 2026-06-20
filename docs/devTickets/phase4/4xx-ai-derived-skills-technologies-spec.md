---
phase: 4
status: planned
source: large-feature plan — future AI integration (spec only)
---
# Ticket 238 — AI-Derived Skills & Technologies (Specification)

## Status

**Planned** — specification only; **no implementation** in Phase 2

## Phase

Phase 4 — AI Workflows

## Depends on

- **234**–**237** — Manual entry and live chip display (Phase 2)
- Future taxonomy / document-model design (not formalised)

## Objective

Document how AI will **derive, classify, rank, and persist** skills and technologies at Activity, Experience, and (later) Profile levels — without implementing AI in this ticket.

## Background

Product intent (unofficial): maintain a reusable career context layer where terms can be extracted from evidence text and ranked for reuse in evaluations and documents. Manual entry (**235**–**237**) establishes the field shape; AI will augment—not replace—user-authored terms.

## Proposed behaviour (future)

### Extraction sources

| Level | Primary inputs | Output fields |
|-------|----------------|---------------|
| Activity | `rawDescription`, optional journal links | `skills[]`, `technologies[]` |
| Experience | `overviewRaw`, child activities | `skills[]`, `technologies[]` (rollup) |
| Profile / CoreContext | `rawSummaryMd`, aggregated evidence | TBD — separate ticket |

### Merge policy (draft)

1. **User-entered terms are authoritative** — AI must not silently delete manual tags.
2. AI may **suggest** new terms (review UI) or **append** with `source: ai` metadata in a later schema extension.
3. **Ranking**: array order reflects significance; AI reorder proposes ranked lists user can accept.
4. **Classification**: heuristic or model assigns `technology` vs `skill` bucket before chip variant mapping.

### API sketch (not implemented)

- `POST /api/activities/:activityId/extract-terms` — returns suggested `{ skills, technologies }`
- `POST /api/experiences/:experienceId/extract-terms` — rollup from overview + activities
- Persist via existing PUT endpoints after user confirmation, or dedicated accept endpoint

### Schema extensions (future — not Phase 2)

Possible evolution beyond `string[]`:

```js
// Illustrative only — not MVP
{
  label: "React",
  kind: "technology",
  source: "manual" | "ai",
  rank: 1,
  confidence: 0.92
}
```

Defer structured term objects until document-model / taxonomy phase.

### UI affordances (future)

- “Suggest from description” on Activity and Experience forms
- Diff/review panel: proposed vs current chips
- Experience detail widget: badge for AI-suggested vs manual (transparency)

## Out of scope (this ticket)

- Any server or client implementation
- OpenAI / model integration
- Profile-level skills
- Opportunity requirement matching

## Acceptance criteria (when implemented in Phase 4)

- [ ] Spec reviewed and linked from Phase 4 queue
- [ ] Child implementation tickets created before coding
- [ ] Manual terms preserved per merge policy

## Deliverable for Phase 2 planning

This file satisfies the planning requirement to **provide specs for a future AI task**. Implementation tickets to be created when Phase 4 starts (e.g. **238.1** Activity extraction, **238.2** Experience rollup).

## Open questions

1. Should AI overwrite array order or only append?
2. Is a shared taxonomy service required before extraction?
3. Do Opportunity `extractedSkills` fields share the same term normalisation?

## Notes

Phase 2 tickets **234**–**237** use simple `string[]` on Experience and Activity per `05_data_model.md`. No schema migration required for manual entry.
