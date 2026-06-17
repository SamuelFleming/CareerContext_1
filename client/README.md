# CareerContext — Client

React single-page application for [CareerContext](../README.md). Built with Vite, React Router, and Tailwind CSS. Talks to the Express API in [`../server`](../server).

## Prerequisites

- Node.js 18+
- API server running (see [`../server/README.md`](../server/README.md))

## Setup

```bash
cd client
npm install
```

Optional environment file — `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:3006
```

If omitted, the client defaults to `http://localhost:3006` (see `src/services/apiClient.js`).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

## Routes (Phase 1)

| Path | Screen | Auth |
|------|--------|------|
| `/` | Landing | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/dashboard` | Interactive CV dashboard | Protected |
| `/profile` | Profile / Core Context | Protected |
| `/experiences` | Coming soon (Phase 2) | Protected |
| `/journal` | Coming soon (Phase 5 index) | Protected |
| `/opportunities` | Coming soon (Phase 3) | Protected |
| `/documents` | Coming soon (Phase 3) | Protected |

Protected routes use `ProtectedRoute` → `ProtectedLayout` → `AppShell` (sidebar, top bar, journal drawer).

## Project structure

```text
src/
  app/              Router definition
  components/
    editor/         MarkdownEditor, MarkdownPreview (008.1)
    layout/         AppShell, PublicLayout, ProtectedLayout
    navigation/     Sidebar, TopNav, NavItem, JournalDrawer
    ui/             Button, Card, Input, PageHeader, …
  contexts/         JournalDrawerContext
  features/
    auth/           Login, Register, auth context
    dashboard/      Dashboard page + Interactive CV widgets
    landing/        Marketing landing page
    placeholders/   Coming-soon pages for future phases
    profile/        Profile editors + freshness widget
  services/         API clients (auth, profile, dashboard)
  styles/           Theme tokens, Tailwind globals, fonts
```

## API integration

All authenticated requests send `Authorization: Bearer <token>` from `localStorage`.

| Service | Endpoints used |
|---------|----------------|
| `authService.js` | `/api/auth/register`, `/api/auth/login`, `/api/auth/me` |
| `profileService.js` | `/api/profile`, `/api/profile/core-context`, `/api/profile/core-resume` |
| `dashboardService.js` | `/api/dashboard` |

## Notable UI features

- **Interactive CV** — Dashboard hero card with identity, summary preview, Phase 1 mock competencies/experiences.
- **Profile completeness** — Shared score from API on Dashboard and Profile.
- **MarkdownEditor** — Edit/Preview toggle + toolbar for career summary, core resume, and journal notes.
- **Journal drawer** — Global “Capture Evidence” spine and sidebar action (local draft until journal API).
- **Responsive shell** — Desktop sidebar; mobile hamburger menu (009).

## Styling

Design tokens live in `src/styles/theme.css`. Components use Tailwind utilities with CSS variables (`--primary-*`, `--accent-*`, `--evidence-warm`, etc.). See [`../docs/StylingExamples/FigmaOutput_DesignSystem.md`](../docs/StylingExamples/FigmaOutput_DesignSystem.md) for the design reference.

## Related docs

- [Root README](../README.md) — full-stack quick start
- [Server README](../server/README.md) — API endpoint log
- [API contract](../docs/08_api_contract.md)
- [Dev completion registry](../devCompletion.md)
