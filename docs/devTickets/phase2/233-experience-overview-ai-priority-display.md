---
phase: 2
status: implemented
source: backlog from ticket 232
---
# Ticket 233 — Experience Overview AI Priority Display

## Status

**Implemented** — 2026-06-19

## Depends on

- **232** — Experience Detail overview widget
- Phase 4 AI polish workflow (API-017 or equivalent for experiences)

## Objective

Define and implement display priority for the Experience Detail **Overview** widget:

1. When `overviewPolished` exists and is non-empty → show polished Markdown (AI-refined).
2. Otherwise → show `overviewRaw` (user-authored rough notes).

## Scope

- Update `ExperienceOverviewWidget` to accept `overviewPolished` and apply priority logic.
- Optional subtle label: “AI-polished overview” vs “Raw overview” for transparency.
- Wire save/preview from polish endpoint when Phase 4 lands.
- No change to edit modal behaviour — users still edit `overviewRaw` unless product decides otherwise.

## Out of scope

- Implementing AI polish generation (Phase 4)
- Replacing full `ExperiencePolishedOverview` card unless merged into this widget

## Acceptance criteria

- [x] Widget shows `overviewPolished` when present
- [x] Widget falls back to `overviewRaw` when polished is empty
- [x] Empty state when both are empty
- [x] Label or helper text indicates which source is displayed

## Completion notes

**Completed:** 2026-06-19

### Files changed

- `client/src/features/experiences/components/ExperienceOverviewWidget.jsx` — `resolveOverviewDisplay` priority logic, source label badge, helper copy
- `client/src/features/experiences/ExperienceDetailPage.jsx` — passes `overviewPolished`

### Checks run

- `npm run build` (client) — **passed**

### Follow-up

- Phase 4: wire AI polish endpoint to populate `overviewPolished` and refresh widget after generation
