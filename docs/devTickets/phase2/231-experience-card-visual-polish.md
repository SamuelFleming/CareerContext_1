---
phase: 2
status: implemented
source: repo-local execution ticket
methodology: lightweight intent-led ticket; agent must inspect current codebase before implementation
---
# Ticket 231 — Experience Card Visual Polish and AI Scaffold

## Status

**Implemented** — 2026-06-19

## Phase

Phase 2 — Experience Evidence (frontend polish)

## Depends on

- **212** — Experience Index vertical slice (Screen 6)
- **213** — Experience Detail vertical slice (Screen 7)

## Related screen(s)

- Screen 6 — Experience Index (`/experiences`)
- Screen 7 — Experience Detail (`/experiences/:experienceId`)

## Related docs

- `docs/core-scope/05_data_model.md` — Experience `skills`, `technologies`, `overviewPolished`
- `docs/core-scope/06_screen_catalogue_and_data_requirements.md`
- `docs/design-concept/FigmaOutput_DesignSystem.md` — SkillChip variants
- `client/src/features/landing/components/InteractiveCvPreview.jsx` — chip variant reference

## Objective

Improve the visual hierarchy and vanity of experience summary surfaces on the Experiences index and Experience Detail pages. Reorganise card content into a clearer top-to-bottom topology and scaffold future AI features (one-line overview, extracted skills/technologies) with placeholder content — **no backend or API changes in this ticket**.

## User outcome

A logged-in user sees richer, more scannable experience cards: title and type chip together, dates and role/org on separate lines, a placeholder AI summary line, activity count, and sample skill/technology chips that preview a future extraction workflow.

## Current state (code inspection — 2026-06-19)

| Area | Finding |
|------|---------|
| `ExperienceListItem.jsx` | Renders `EvidenceCard` then places `SkillChip` (type label) **below** the card — type chip is detached from title. |
| `experienceUi.js` | `formatExperienceMeta` collapses type, org/role, and dates into a **single** meta line — opposite of desired layout. |
| `EvidenceCard.jsx` | Generic surface: `title`, `meta`, `description`, optional `tags`. No slot for title+chip row or AI scaffold line. |
| `SkillChip.jsx` | Variants: `accent`, `neutral`, `success`, `warning`. Landing mock maps accent→tech, neutral→skill, success→tech highlight. |
| `ExperienceDetailPage.jsx` | `PageHeader` uses `formatExperienceMeta` in `description`; no shared summary card topology with index. |
| `Experience` model | `skills`, `technologies`, `overviewPolished` exist on full entity; **list** `toListItem` omits them (by design in **212**). |
| AI polish | `ExperiencePolishedOverview` already scaffolds full polished overview; this ticket adds a **one-line** summary scaffold on summary surfaces only. |

## Target card topology (index + detail header)

Top to bottom:

1. **Title | [TypeChip]** — inline flex row; type chip on the card next to title.
2. **`{Start} – {End}`** — date range line (unchanged formatter: `formatExperienceDateRange`).
3. **`{role} at {organisation}`** — or `{role}` only when org is empty.
4. **(Scaffold) one-line AI overview** — placeholder copy; disabled/“coming later” affordance; not wired to API.
5. **`n activities`** — unchanged activity count line.
6. **(Scaffold) SkillChips** — placeholder chips using variant semantics (see below); section label optional (“Skills & technologies — AI extraction coming later”).

## SkillChip variant semantics (scaffold)

Align with landing `InteractiveCvPreview` patterns:

| Variant | Scaffold meaning | Example labels |
|---------|------------------|----------------|
| `accent` (default) | Technology | React, Node.js |
| `neutral` | Skill | Leadership, Stakeholder management |
| `success` | Top / highlighted technology | MongoDB |
| `warning` | Top / highlighted skill | (reserved for “top skill” emphasis) |

Scaffold data lives in **client constants** keyed by experience `type` (or a single shared placeholder set) — not persisted. When Phase 4 AI extraction lands, replace constants with `experience.skills` / `experience.technologies` from API.

## Scope

- Create `TypeChip` (`client/src/components/ui/TypeChip.jsx`) — distinct from `SkillChip`; used for experience `type` enum labels.
- Add formatters in `experienceUi.js`: `formatExperienceRoleLine`, keep/split date range; deprecate combined meta for card surfaces (PageHeader may keep a shortened meta or adopt summary component).
- Create shared `ExperienceSummaryCard` (or `ExperienceSummaryHeader`) in `features/experiences/components/` — implements topology above; used by list item and detail page.
- Update `ExperienceListItem` — remove detached type chip; use shared summary component inside evidence styling.
- Update `ExperienceDetailPage` — add summary card at top of workspace (below `PageHeader`, above `ExperienceEditorCard`) with same topology.
- Scaffold constants file e.g. `experienceAiScaffold.js` — placeholder one-liner + chip sets per type.
- Optional: lightly extend `EvidenceCard` only if reuse is cleaner than a dedicated summary component — prefer **dedicated summary component** to avoid over-generalising `EvidenceCard`.

## Out of scope

- Backend changes (`toListItem`, new API fields, AI endpoints).
- Persisting or editing scaffold skills/technologies.
- Real AI one-line summary generation (Phase 4).
- Activity card changes (**214** scope).
- Dashboard evidence card updates (**215**).
- Pagination, search, or filter UI.
- Replacing `ExperiencePolishedOverview` full-overview scaffold.

## Acceptance criteria

- [x] Experience index cards show layout: title + inline TypeChip, dates, role/org line, AI one-line placeholder, activity count, scaffold SkillChips.
- [x] Type chip is **on** the card, adjacent to title (not below the card).
- [x] Role line shows `{role} at {organisation}` or `{role}` only when organisation is empty.
- [x] AI one-line and SkillChip sections clearly indicate future implementation (helper text or muted placeholder styling).
- [ ] ~~Experience Detail page shows the **same topology** in a summary section above the editor.~~ **Deferred** — reverted; separate backlog.
- [x] `TypeChip` is separate from `SkillChip` in `components/ui/`.
- [x] No `fetch` in presentational components; no API contract changes.
- [x] Client build passes (`npm run build` in `client/`).

## Implementation plan

### 1. UI primitives

**`TypeChip.jsx`**

- Small rounded pill for categorical labels (experience type).
- Styling: subtler than `SkillChip` — e.g. uppercase tracking, `neutral` palette, smaller padding — so it reads as metadata, not a skill.
- Props: `children`, optional `className`.

**`SkillChip.jsx`** (minimal touch, if needed)

- No new variants required for MVP scaffold — use existing `accent`, `neutral`, `success`, `warning` with documented semantic mapping in `experienceAiScaffold.js`.
- Only extend variants if design review shows `warning` is unused for top-skill emphasis.

### 2. Formatters (`experienceUi.js`)

```js
formatExperienceDateRange(experience)     // existing — line 2
formatExperienceRoleLine(experience)    // new — "Role at Org" | "Role" | null
formatExperienceActivityLine(experience) // rename/clarify formatExperienceDescription
```

Remove use of `formatExperienceMeta` on card surfaces; optionally keep for `PageHeader.description` as a single-line breadcrumb helper or switch header to title-only + rely on summary card.

### 3. Scaffold data (`experienceAiScaffold.js`)

```js
export const AI_ONE_LINE_PLACEHOLDER =
  "AI one-line summary will be generated from your overview and activities — coming in a later phase.";

export function getScaffoldSkillChips(experience) {
  // Return { technologies: [{ label, variant }], skills: [...] }
  // Static per-type or generic set; 2–4 chips total for visual balance
}
```

### 4. Shared summary component

**`ExperienceSummaryCard.jsx`**

- Props: `experience` (list or full shape), `onClick?` (index navigates; detail omits).
- Structure:
  - Evidence-warm card shell (reuse `EvidenceCard` border/left-accent classes via `cn`, or wrap `EvidenceCard` with custom children slot — **recommended: own article element** copying evidence tokens for layout control).
  - Row 1: icon (optional, keep type icon) + title + `TypeChip`.
  - Lines 2–5: date, role, AI placeholder (italic/muted), activity count.
  - Row 6: flex-wrap `SkillChip` group + small caption “Extracted skills & technologies — coming later”.
- Accessible: clickable on index (`role="button"`, keyboard) matching current `EvidenceCard` behaviour.

### 5. Wire index

**`ExperienceListItem.jsx`**

- Replace `EvidenceCard` + external `SkillChip` with `<ExperienceSummaryCard experience={...} onClick={...} />`.

### 6. Wire detail

**`ExperienceDetailPage.jsx`**

- After `PageHeader`, render `<ExperienceSummaryCard experience={experience} />` (non-clickable).
- Trim `PageHeader.description` to avoid duplicating dates/role (e.g. remove description or show only type).

### 7. Files expected to change

| File | Action |
|------|--------|
| `client/src/components/ui/TypeChip.jsx` | **Create** |
| `client/src/features/experiences/components/experienceAiScaffold.js` | **Create** |
| `client/src/features/experiences/components/ExperienceSummaryCard.jsx` | **Create** |
| `client/src/features/experiences/components/experienceUi.js` | **Modify** — split formatters |
| `client/src/features/experiences/components/ExperienceListItem.jsx` | **Modify** — use summary card |
| `client/src/features/experiences/ExperienceDetailPage.jsx` | **Modify** — add summary card |
| `docs/devTickets/devTickets_next.md` | **Modify** — queue entry |
| `docs/devTickets/phase2/README.md` | **Modify** — ticket link |

**Not expected to change:** `server/`, `08_api_contract.md`, `EvidenceCard.jsx` (unless trivial `children` slot added — prefer no change).

### 8. Verification steps

1. `cd client && npm run build`
2. Log in → `/experiences` — confirm card layout matches topology; type chip inline with title.
3. Create experience with role only (no org) — role line shows role without “at”.
4. Create experience with role + org — shows “Role at Organisation”.
5. Open `/experiences/:id` — summary section matches index topology above editor.
6. Confirm scaffold AI line and chips visible with “coming later” messaging.
7. Keyboard: Enter/Space on index card still navigates to detail.

### 9. Documentation updates (post-implementation)

- Mark acceptance criteria `[x]`, set Status to **Implemented**.
- Add completion notes to this ticket (files changed, checks run).
- Update `devCompletion.md` when shipped.
- Update `devTickets_next.md` status to Done.

## API / data assumptions

- List items continue to use API-009 shape (`id`, `type`, `title`, `organisation`, `role`, dates, `activityCount`) — sufficient for layout.
- Full workspace experience includes `skills`, `technologies`, `overviewPolished` but this ticket **does not read them** for display (scaffold only).
- Future ticket: extend list item or add `summaryLine` field when AI pipeline exists; wire chips from `experience.skills` / `experience.technologies` on detail first.

## Mismatches / risks

| Item | Notes |
|------|-------|
| `devTickets_next.md` may still list **212** as “Next” | Codebase already has **212**/**213** implemented; **231** is polish on top — no blocker. |
| `EvidenceCard` meta pattern | Intentionally bypassed for experiences; dashboard/landing mocks unchanged. |
| Duplicate header info on detail | Mitigate by simplifying `PageHeader.description` when summary card is present. |

## Completion notes

**Completed:** 2026-06-19

### Files changed

**Created**

- `client/src/components/ui/TypeChip.jsx` — categorical pill for experience type
- `client/src/features/experiences/components/skillChipVariantsMock.js` — placeholder AI line + per-type SkillChip sets
- `client/src/features/experiences/components/ExperienceSummaryCard.jsx` — summary topology for index cards

**Modified**

- `client/src/features/experiences/components/experienceUi.js` — `formatExperienceRoleLine`, `formatExperienceActivityLine`
- `client/src/features/experiences/components/ExperienceListItem.jsx` — uses `ExperienceSummaryCard`

**Note:** Experience Detail summary card was added then reverted — detail layout left for separate backlog work.

### Checks run

- `npm run build` (client) — **passed**

### Manual smoke test path

1. Log in → **Experiences** → cards show title + inline type chip, dates, role line, AI placeholder, activity count, scaffold chips
2. Click card → detail page uses original `PageHeader` meta layout (no summary card)
3. Keyboard Enter/Space on index card navigates to detail

### Known limitations / follow-up

- Scaffold chips and one-line summary are static client placeholders — Phase 4 AI should wire `skills`, `technologies`, and generated summary from API
- Experience Detail summary topology deferred to user backlog
- `formatExperienceMeta` still used on detail `PageHeader.description`

## Follow-up (post-completion)

### Detail page reverted (2026-06-19)

- `ExperienceSummaryCard` removed from `ExperienceDetailPage`; index-only scope retained.
- Mock file renamed `experienceAiScaffold.js` → `skillChipVariantsMock.js`.
