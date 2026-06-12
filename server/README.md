# CareerContext Server

Express API for the CareerContext project. High-level product and API documentation lives in [`../docs/`](../docs/), including the [API contract](../docs/08_api_contract.md).

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
```

```bash
node server.js
```

Base URL: `http://localhost:3006/api`

## Endpoint implementation log

Status key: **Implemented** · **Stub (501)** · **Not routed**

Last updated: Dev ticket **007.2 — CoreContext Model and Profile Refactor**

| Method | Endpoint | Status | Auth | Notes |
|--------|----------|--------|------|-------|
| GET | `/api` | Implemented | No | API root message |
| GET | `/api/health` | Implemented | No | Health check |
| POST | `/api/auth/register` | Implemented | No | Creates user + CoreContext, returns JWT |
| POST | `/api/auth/login` | Implemented | No | Returns JWT |
| GET | `/api/auth/me` | Implemented | Yes | Current user summary |
| GET | `/api/dashboard` | Implemented | Yes | Dashboard summary; profile from CoreContext |
| GET | `/api/profile` | Implemented | Yes | Returns `user`, `coreContext`, and resume fields |
| PUT | `/api/profile` | Implemented | Yes | Update CoreContext: `fullName`, `mobile`, `location`, `headline` |
| PUT | `/api/profile/core-context` | Implemented | Yes | Update `rawSummaryMd`, sets `summaryUpdatedAt` |
| PUT | `/api/profile/core-resume` | Implemented | Yes | Update `coreResumeMd`, sets `coreResumeUpdatedAt` |
| GET | `/api/experiences` | Stub (501) | No | List experiences |
| POST | `/api/experiences` | Stub (501) | No | Create experience |
| GET | `/api/experiences/:experienceId` | Stub (501) | No | Get experience |
| PUT | `/api/experiences/:experienceId` | Stub (501) | No | Update experience |
| DELETE | `/api/experiences/:experienceId` | Stub (501) | No | Delete experience |
| GET | `/api/experiences/:experienceId/workspace` | Stub (501) | No | Experience workspace |
| GET | `/api/experiences/:experienceId/activities` | Stub (501) | No | List activities |
| POST | `/api/experiences/:experienceId/activities` | Stub (501) | No | Create activity |
| POST | `/api/experiences/:experienceId/polish` | Stub (501) | No | AI polish experience |
| GET | `/api/activities/:activityId` | Stub (501) | No | Get activity |
| PUT | `/api/activities/:activityId` | Stub (501) | No | Update activity |
| DELETE | `/api/activities/:activityId` | Stub (501) | No | Delete activity |
| POST | `/api/activities/:activityId/polish` | Stub (501) | No | AI polish activity |
| GET | `/api/opportunities` | Stub (501) | No | List opportunities |
| POST | `/api/opportunities` | Stub (501) | No | Create opportunity |
| POST | `/api/opportunities/compare` | Stub (501) | No | Compare opportunities |
| GET | `/api/opportunities/:opportunityId` | Stub (501) | No | Get opportunity |
| PUT | `/api/opportunities/:opportunityId` | Stub (501) | No | Update opportunity |
| DELETE | `/api/opportunities/:opportunityId` | Stub (501) | No | Delete opportunity |
| GET | `/api/opportunities/:opportunityId/workspace` | Stub (501) | No | Opportunity workspace |
| POST | `/api/opportunities/:opportunityId/extract` | Stub (501) | No | AI extract job summary |
| POST | `/api/opportunities/:opportunityId/evaluate` | Stub (501) | No | AI evaluate fit |
| POST | `/api/opportunities/:opportunityId/generate-cover-letter` | Stub (501) | No | Generate cover letter |
| GET | `/api/documents` | Stub (501) | No | List documents |
| POST | `/api/documents` | Stub (501) | No | Create document |
| GET | `/api/documents/:documentId` | Stub (501) | No | Get document |
| PUT | `/api/documents/:documentId` | Stub (501) | No | Update document |
| DELETE | `/api/documents/:documentId` | Stub (501) | No | Delete document |

## Profile endpoints (007 / 007.2)

All profile routes require `Authorization: Bearer <token>`. Structured career context lives on the `CoreContext` model (one per user via `userId`). `email` remains on `User`. Resume Markdown remains on `User` until a future Document migration.

### Manual test flow

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
| 2026-06-12 | 007.2 | Added `CoreContext` model; refactored profile/dashboard to use structured Core Context + `rawSummaryMd` |
| 2026-06-12 | 007 | Implemented profile endpoints; extended `User` model with headline and context timestamps |
