---
phase: 2
status: implemented
source: UAT styling pass — markdown preview behavior and detail card visual balance
---
# Ticket 239 — Scrollable Markdown Preview & Detail Card Restyle

## Status

**Implemented** — 2026-06-22

## Phase

Phase 2 — Experience Evidence (ongoing)

## Depends on

- **238** — Evidence modals & activity detail redesign

## Related screen(s)

- Screen 7 — Experience Detail
- Screen 8 — Activity Detail
- Shared markdown editor surfaces using Edit/Preview toggle

## Objective

Make markdown preview surfaces scroll within bounded heights and rebalance detail card colors so yellow is reserved for experience-context cards.

## Scope

### 1) Markdown preview behavior

- Keep editor preview (`MarkdownEditor` Preview tab) bounded and scrollable
- Keep default read-only markdown previews bounded and scrollable
- Split markdown preview UI into two components:
  - `MarkdownPreview` for editor toggle preview
  - `MarkdownContentPreview` for default/read-only content cards

### 2) Detail card styling

- Experience/Activity markdown summary cards use white/neutral surface
- Experience/Activity skills cards use purple/accent surface
- Parent experience card on Activity Detail remains yellow/evidence style
- Apply consistent vertical limits across markdown and skills cards on Experience/Activity detail pages

## Acceptance criteria

- [x] Editor preview mode scrolls within height limits
- [x] Default markdown previews scroll within height limits
- [x] Markdown editor preview and default preview use separate UI components
- [x] Experience/Activity markdown summary cards are neutral (non-yellow)
- [x] Experience/Activity skills cards use accent/purple styling
- [x] Parent experience card remains yellow
- [x] `npm run build` passes

## Files changed

**Created**

- `client/src/components/editor/MarkdownContentPreview.jsx`

**Modified**

- `client/src/components/editor/MarkdownPreview.jsx`
- `client/src/components/editor/MarkdownEditor.jsx`
- `client/src/components/editor/markdownEditor.css`
- `client/src/components/ui/Card.jsx`
- `client/src/features/experiences/components/ExperienceOverviewWidget.jsx`
- `client/src/features/activities/components/ActivitySummaryWidget.jsx`
- `client/src/features/experiences/components/ExperienceSkillsTechnologiesWidget.jsx`
- `client/src/features/activities/components/ActivitySkillsTechnologiesWidget.jsx`
- `client/src/features/experiences/components/ExperiencePolishedOverview.jsx`

## Checks run

- `npm run build` (client) — **passed**
