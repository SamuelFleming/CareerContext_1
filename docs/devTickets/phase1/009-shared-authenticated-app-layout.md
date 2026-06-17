# 009 — Shared Authenticated App Layout and Navigation Polish

## Status

**Implemented**

## Phase

Phase 1 — Auth and Profile (capstone UI polish)

## Related Screens

```
2. Login
3. Register
4. Dashboard
5. Profile / Core Context
```

## Depends On

- **CC-004** — Auth backend
- **006.4** — Dashboard UI
- **008** — Profile UI
- **008.1** — Journal drawer (global capture)

## Objective

Refine the shared authenticated app layout so Dashboard and Profile feel like one product, with clear navigation, user identity, logout, active routes, placeholder future screens, and responsive shell behaviour.

---

## Reconciliation: Original Ticket vs Codebase (pre-009)

| Topic | Original ticket | Actual codebase before 009 | Resolution |
|-------|-----------------|---------------------------|------------|
| Top bar name | `TopBar.jsx` | `TopNav.jsx` (public + protected variants) | Keep **`TopNav.jsx`**; document alias in ticket |
| Sidebar file | `Sidebar.jsx` | `SideBar.jsx` (casing mismatch with import) | Standardise on **`Sidebar.jsx`** |
| `NavItem.jsx` | Create new | Inline `NavLink` / `span` in Sidebar | Extract **`NavItem.jsx`** |
| Journal nav | Listed as primary nav item | Global **JournalDrawer** spine only; no `/journal` route | Journal nav **opens drawer** (functional capture); `/journal` placeholder route for Screen 9 |
| Login screen # | Ticket typo "2. Login, 2. Register" | Screens 2 & 3 in docs | Align with screen catalogue |
| User identity | Required in shell | Logout only; no name/email in chrome | Add user block in **TopNav** from `useAuth().user` |
| Active route | Required | Sidebar only; TopNav links not active-styled | **`NavItem`** active styles; TopNav duplicates removed on desktop |
| Mobile | Responsive shell | Sidebar `hidden md:flex`; no mobile menu | Hamburger + slide-over sidebar |
| Placeholder routes | Disabled or placeholder | Non-clickable "Soon" spans | **ComingSoonPage** at `/experiences`, `/opportunities`, `/documents`, `/journal` |
| Phase 1 endpoints | Auth + profile + dashboard | Also **`GET /api/dashboard`** implemented | No change — out of scope for 009 |

---

## Implementation

```
client/src/components/layout/AppShell.jsx
client/src/components/layout/ProtectedLayout.jsx   # unchanged wrapper
client/src/components/navigation/Sidebar.jsx
client/src/components/navigation/TopNav.jsx
client/src/components/navigation/NavItem.jsx
client/src/components/navigation/navConfig.js
client/src/contexts/JournalDrawerContext.jsx
client/src/components/navigation/JournalDrawer.jsx   # uses context
client/src/features/placeholders/ComingSoonPage.jsx
client/src/app/router.jsx
```

### Primary navigation (Phase 1)

| Item | Behaviour |
|------|-----------|
| Dashboard | `/dashboard` — live |
| Profile / Core Context | `/profile` — live |
| Experiences | `/experiences` — Coming soon page |
| Journal | Opens global capture drawer; `/journal` — coming soon full screen |
| Opportunities | `/opportunities` — Coming soon page |
| Documents | `/documents` — Coming soon page |

---

## Acceptance Criteria

- [x] Dashboard and Profile share the same authenticated layout (`AppShell` via `ProtectedLayout`)
- [x] Navigation clearly shows active route (`NavItem` + `NavLink`)
- [x] Logout available in protected top bar
- [x] User identity (name + email) shown in protected chrome
- [x] Placeholder nav items route to safe coming-soon pages (no broken app)
- [x] Journal capture reachable from sidebar (opens drawer)
- [x] Mobile hamburger opens sidebar overlay
- [x] Layout extensible for Phase 2+ screens without rewrite
- [x] Styling consistent with existing Profile/Dashboard theme

## Out of Scope

- Full Screen 9 Journal index
- Experience / Opportunity / Document APIs
- Breadcrumbs, notifications, settings

## Suggested Commit Message

```
feat(shell): polish authenticated layout and navigation (009)
```
