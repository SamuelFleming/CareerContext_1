# CareerContext

An AI-assisted career evidence workspace built as a MERN stack portfolio project. CareerContext helps users capture, organise, and reuse professional experience — starting with core profile context, an Interactive CV dashboard, and Markdown-first editing — with later phases planned for structured experiences, opportunities, and generated documents.

**Phase 1 (Auth and Profile) is complete.** Experience Evidence is next.

## Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite, React Router, Tailwind CSS 4 |
| Backend | Node.js, Express 5, JWT auth |
| Database | MongoDB, Mongoose |
| Markdown | `react-markdown`, `remark-gfm` |

## Repository layout

```text
CareerContext1/
  client/          React SPA (Vite)
  server/          Express API
  docs/            Product, data model, API contract, dev tickets
  devCompletion.md Phase 1 completion registry
  devTickets_next.md Upcoming work
```

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ (LTS recommended)
- [MongoDB](https://www.mongodb.com/) running locally, or a MongoDB Atlas connection string

## Quick start

### 1. API server

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=3006
MONGO_URI=mongodb://127.0.0.1:27017/careercontext
JWT_SECRET=your-dev-secret
JWT_EXPIRES_IN=1h
```

```bash
node server.js
```

API base URL: `http://localhost:3006/api`

See [`server/README.md`](server/README.md) for the endpoint implementation log and manual `curl` examples.

### 2. Client

```bash
cd client
npm install
```

Create `client/.env` (optional — defaults to port 3006):

```env
VITE_API_BASE_URL=http://localhost:3006
```

```bash
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

See [`client/README.md`](client/README.md) for frontend structure and routes.

### 3. Smoke test

1. Register a new account.
2. Land on **Dashboard** (Interactive CV + profile completeness).
3. Open **Profile / Core Context** — edit summary, context, and resume (Markdown editor).
4. Refresh — data should persist.
5. Log out — protected routes should redirect to login.

## Phase 1 — what's implemented

### Screens

- Landing, Login, Register
- Dashboard (Interactive CV)
- Profile / Core Context
- Global journal capture drawer
- Coming-soon placeholders for Experiences, Journal index, Opportunities, Documents

### API (live)

- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- `GET /api/dashboard`
- `GET /api/profile`, `PUT /api/profile`, `PUT /api/profile/core-context`, `PUT /api/profile/core-resume`

Experience, Opportunity, Document, and Journal CRUD routes exist as **501 stubs** for Phase 2+.

## Documentation

| Resource | Description |
|----------|-------------|
| [`docs/00_documentation_index.md`](docs/00_documentation_index.md) | Documentation map |
| [`docs/08_api_contract.md`](docs/08_api_contract.md) | API shapes and conventions |
| [`docs/05_data_model.md`](docs/05_data_model.md) | MongoDB / Mongoose model |
| [`devCompletion.md`](devCompletion.md) | Completed dev tickets |
| [`devTickets_next.md`](devTickets_next.md) | Next phase backlog |

## Development notes

- JWT is stored in `localStorage` (`careercontext_auth_token`) for local development.
- Profile completeness is calculated server-side and shared between Dashboard and Profile.
- Dashboard skill chips and experience cards use Phase 1 mock data until Experience APIs land.
- Core resume is stored on `User` for MVP; see [`docs/devTickets/008.2-core-resume-document-refactor-plan.md`](docs/devTickets/008.2-core-resume-document-refactor-plan.md) for the future Document migration plan.

## License

ISC (see `server/package.json`).
