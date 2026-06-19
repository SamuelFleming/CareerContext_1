---
phase: 2
status: planned
source: backlog from ticket 232
---
# Ticket 233 — Experience Overview AI Priority Display

## Status

**Planned** — backlog from **232**

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

- [ ] Widget shows `overviewPolished` when present
- [ ] Widget falls back to `overviewRaw` when polished is empty
- [ ] Empty state when both are empty
- [ ] Label or helper text indicates which source is displayed

## Notes

Current **232** implementation shows `overviewRaw` only and references this ticket in widget copy.
