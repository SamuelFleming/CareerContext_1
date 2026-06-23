---
phase: 4
status: planned
source: parent spec 4xx — AI-derived skills & technologies
---
# Ticket 402 — AI-Derived Skills & Technologies (Frontend)

## Status

**Planned**

## Phase

Phase 4 — AI Workflows

## Depends on

- [**401**](401-ai-derived-skills-technologies-backend.md) — Suggest endpoints + live dashboard `coreCompetencies`
- Phase 2 **234**–**237** — Chip components and manual CRUD
- Phase 2 **243** — Dashboard Interactive CV + `CompetencyScaffoldChip` scaffold UX

## Related screen(s)

| Screen | Route | What changes when **401** ships |
|--------|-------|--------------------------------|
| **4 — Dashboard** | `/dashboard` | `coreCompetencies` scaffold → live AI chips; optional source transparency on `topSkillsAndTechnologies` |
| **6 — Experience Index** | `/experiences` | Index cards may show AI-augmented chips (if API list includes terms post-accept) |
| **7 — Experience Detail** | `/experiences/:id` | Skills widget + create/edit modal: “Suggest from overview” + review panel |
| **8 — Activity Detail** | `/activities/:id` | Skills widget + edit: “Suggest from description” + review panel |

## Related docs

- `docs/design-concept/FigmaOutput_DesignSystem.md` — `SkillChip`, chip variants
- `client/src/utils/skillTechnologyChipUtils.js`
- `client/src/features/dashboard/components/InteractiveCvCard.jsx`
- `client/src/features/dashboard/components/CompetencyScaffoldChip.jsx`
- `client/src/features/experiences/components/ExperienceSkillsTechnologiesWidget.jsx`
- `client/src/features/activities/components/ActivitySkillsTechnologiesWidget.jsx`

## Objective

Wire **401** suggest/accept flows into evidence and dashboard UI so users can review AI-proposed skills and technologies, persist accepted terms, and see **live profile competencies** on the Interactive CV.

## User outcome

Users trigger AI suggestions from activity/experience content, review diffs against manual chips, accept merges into persisted evidence, and see dashboard core competencies replace the dashed scaffold preview.

## Scope

### Screen 8 — Activity Detail

- “Suggest from description” action near skills/technologies editor (disabled when `rawDescription` empty).
- Call `POST /api/activities/:activityId/extract-terms`.
- Review panel: proposed chips vs current (`TermChipInput` / `SkillTechnologyChipList`).
- Accept → merge client-side per merge policy → `PUT` activity (**API-019**).
- Loading/error states; do not hide AI failures.

### Screen 7 — Experience Detail

- Same pattern on experience create/edit modal and/or `ExperienceSkillsTechnologiesWidget`.
- Call `POST /api/experiences/:experienceId/extract-terms`.
- Accept → `PUT` experience (**API-012**).

### Screen 6 — Experience Index (read-only)

- No new suggest actions on index (keep index lightweight).
- Cards continue showing live `skills` / `technologies` from API-009 after user accepts AI terms on detail.
- Optional: subtle indicator on chips that include AI-sourced terms — only if **401** exposes per-term metadata in list payloads; otherwise defer.

### Screen 4 — Dashboard Interactive CV

- When `coreCompetencies.status === 'live'`: remove scaffold styling (`CompetencyScaffoldChip`, dashed “Preview” label).
- Render live items with standard `SkillChip` (or ranked variants per design).
- Remove hover “placeholder” tooltip for live competencies.
- Keep `topSkillsAndTechnologies` section as-is (**242** live aggregation) unless **401** adds metadata worth displaying.
- Empty/error: fall back to message from API envelope; never client mock fallback.

### Shared UI (evidence flows)

- Reusable `SuggestTermsReviewPanel` (or similar) colocated under `features/` or `components/` — used by Activity and Experience.
- Reuse **234** chip utils for variant mapping.
- AI polish buttons (**API-017**, **API-021**) remain separate — do not conflate polish with term extraction.

### Services

- `activityService.js` — `suggestActivityTerms(activityId)`
- `experienceService.js` — `suggestExperienceTerms(experienceId)`
- Update `dashboardService.js` JSDoc for `coreCompetencies.status: 'live'`

## Out of scope

- Backend AI implementation (**401**)
- Opportunity / document surfaces
- Profile page (`/profile`) competency editing — dashboard CV is the profile-level display for **402**
- Journal drawer term extraction
- New chip component system (extend **234** primitives)
- Experience index inline suggest / bulk extract

## Technical tasks

- [ ] Add service methods for suggest endpoints
- [ ] Build shared suggest/review panel component
- [ ] Wire Activity Detail suggest + accept flow
- [ ] Wire Experience Detail suggest + accept flow
- [ ] Update `InteractiveCvCard` for live `coreCompetencies`
- [ ] Retire or gate `CompetencyScaffoldChip` to scaffold-only path
- [ ] Update `DashboardPage` empty/fallback shapes if needed

## Acceptance criteria

- [ ] User can request AI term suggestions on Activity Detail and review before save
- [ ] User can request AI term suggestions on Experience Detail and review before save
- [ ] Manual chips are preserved unless user explicitly accepts removals in review UI
- [ ] Dashboard shows live core competencies when API returns `status: "live"`
- [ ] Scaffold preview UX hidden when live competencies present
- [ ] Experience index cards reflect persisted terms after accept (no mock chips)
- [ ] `npm run build` passes

## Likely touched files

- `client/src/features/activities/ActivityDetailPage.jsx` (+ modals/widgets)
- `client/src/features/experiences/ExperienceDetailPage.jsx` (+ modals/widgets)
- `client/src/features/dashboard/components/InteractiveCvCard.jsx`
- `client/src/features/dashboard/components/CompetencyScaffoldChip.jsx`
- `client/src/services/activityService.js`
- `client/src/services/experienceService.js`
- `client/src/services/dashboardService.js`
- New: `client/src/features/evidence/components/SuggestTermsReviewPanel.jsx` (path TBD)

## Completion notes

_(empty — fill when implemented)_
