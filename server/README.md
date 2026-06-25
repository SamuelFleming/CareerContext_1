# CareerContext Server

Express API for the CareerContext project. Product and API documentation lives in [`../docs/`](../docs/).

## Running locally

```bash
cd server
npm install
```

Create a `server/.env` with at least:

```env
PORT=3006
MONGO_URI=mongodb://127.0.0.1:27017/careercontext
JWT_SECRET=your-dev-secret
JWT_EXPIRES_IN=1h

# Optional — Swagger UI (defaults to on when NODE_ENV is not production)
SWAGGER_ENABLED=true
```

```bash
node server.js
```

Base URL: `http://localhost:3006/api`

## API documentation

| Source | Purpose |
|--------|---------|
| **Swagger UI** — `http://localhost:3006/api/docs` | **Implemented endpoints only** — browse, inspect schemas, Try it out with JWT |
| **Raw OpenAPI JSON** — `http://localhost:3006/api/docs/openapi.json` | Machine-readable spec (`server/src/openapi/`) |
| **API contract** — [`docs/core-scope/08_api_contract.md`](../docs/core-scope/08_api_contract.md) | **Full API design intent** — registry, planned endpoints, conventions |

Swagger is disabled when `SWAGGER_ENABLED=false` or `NODE_ENV=production`.

Validate the spec loads without error:

```bash
npm run openapi:validate
```

## Dashboard (`GET /api/dashboard`)

Returns `identity`, `profileCompleteness`, `interactiveCv`, `evidencePanel`, and `phasePlaceholders`.

- **Profile completeness** — calculated by `profileCompletenessService.js` (same rules as `GET /api/profile`).
- **Interactive CV** — live highlights and skills from evidence data (ticket **242**).
- **Not included** — core resume preview, quick actions.

## Profile endpoints

All profile routes require `Authorization: Bearer <token>`. Structured career context lives on the `CoreContext` model (one per user via `userId`). `email` remains on `User`. Resume Markdown remains on `User` until a future Document migration.

### Manual test flow

Use Swagger UI (`/api/docs`) or curl:

```bash
# 1. Register (or login)
curl -s -X POST http://localhost:3006/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Sam Fleming","email":"sam@example.com","password":"password123"}'

# 2. GET profile (use token from step 1)
curl -s http://localhost:3006/api/profile \
  -H "Authorization: Bearer <token>"

# 3. PUT profile (structured Core Context fields)
curl -s -X PUT http://localhost:3006/api/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"fullName":"Sam Fleming","mobile":"+61 400 000 000","location":"Brisbane, AU","headline":"Full-stack developer"}'

# 4. PUT core context (raw summary Markdown)
curl -s -X PUT http://localhost:3006/api/profile/core-context \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"rawSummaryMd":"I am currently working in a full-stack role..."}'

# 5. GET dashboard
curl -s http://localhost:3006/api/dashboard \
  -H "Authorization: Bearer <token>"

# 6. PUT core resume
curl -s -X PUT http://localhost:3006/api/profile/core-resume \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"coreResumeMd":"# Resume\n\n..."}'
```

## Changelog

| Date | Ticket | Change |
|------|--------|--------|
| 2026-06-23 | 245 | Swagger UI at `/api/docs`; OpenAPI spec in `src/openapi/`; implemented-endpoints-only standard |
| 2026-06-12 | 006.3/006.4 | Dashboard API + UI; shared profile completeness |
| 2026-06-12 | 007.2 | Added `CoreContext` model; refactored profile/dashboard to use structured Core Context + `rawSummaryMd` |
| 2026-06-12 | 007 | Implemented profile endpoints; extended `User` model with headline and context timestamps |
