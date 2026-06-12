# CareerContext — 07 Screen Data Matrix

## Purpose

This document provides a compact view of which API endpoints serve each numbered screen.

Use this as the main frontend/API integration checklist.

---

# Screen-to-Endpoint Matrix

| Screen No. | Screen | Data Load Endpoints | Mutation / Action Endpoints |
|---:|---|---|---|
| 1 | Landing Page | none | none |
| 2 | Login | `GET /api/auth/me` | `POST /api/auth/login` |
| 3 | Register | `GET /api/auth/me` | `POST /api/auth/register` |
| 4 | Dashboard | `GET /api/dashboard` | none |
| 5 | Profile / Core Context | `GET /api/profile` | `PUT /api/profile`, `PUT /api/profile/core-context`, `PUT /api/profile/core-resume` |
| 6 | Experience Index | `GET /api/experiences` | `POST /api/experiences`, `DELETE /api/experiences/:experienceId` |
| 7 | Experience Detail | `GET /api/experiences/:experienceId/workspace`, `GET /api/experiences/:experienceId`, `GET /api/experiences/:experienceId/activities`, `GET /api/journal?experienceId=` | `PUT /api/experiences/:experienceId`, `POST /api/experiences/:experienceId/activities`, `POST /api/journal`, `POST /api/experiences/:experienceId/polish` |
| 8 | Activity Detail | `GET /api/activities/:activityId`, `GET /api/journal?activityId=` | `PUT /api/activities/:activityId`, `DELETE /api/activities/:activityId`, `POST /api/activities/:activityId/polish` |
| 9 | Journal | `GET /api/journal`, `GET /api/journal/:journalEntryId`, `GET /api/experiences?select=id,title`, `GET /api/activities?experienceId=&select=id,title` | `POST /api/journal`, `PUT /api/journal/:journalEntryId`, `DELETE /api/journal/:journalEntryId`, `POST /api/journal/:journalEntryId/convert-to-activity` |
| 10 | Opportunities Index | `GET /api/opportunities` | `POST /api/opportunities`, `DELETE /api/opportunities/:opportunityId` |
| 11 | Opportunities Detail | `GET /api/opportunities/:opportunityId/workspace`, `GET /api/opportunities/:opportunityId`, `GET /api/documents?opportunityId=` | `PUT /api/opportunities/:opportunityId`, `POST /api/opportunities/:opportunityId/extract`, `POST /api/opportunities/:opportunityId/evaluate`, `POST /api/opportunities/:opportunityId/generate-cover-letter` |
| 12 | Document Detail | `GET /api/documents/:documentId` | `PUT /api/documents/:documentId`, `DELETE /api/documents/:documentId` |
| 13 | Opportunity Compare | `GET /api/opportunities?ids=` | `POST /api/opportunities/compare`, `POST /api/documents` |

---

# Endpoint-to-Screen Matrix

| Endpoint | Method | Used By Screens | Purpose |
|---|---:|---|---|
| `/api/auth/register` | POST | 3 | Create user account |
| `/api/auth/login` | POST | 2 | Authenticate user |
| `/api/auth/me` | GET | 2, 3, app shell | Validate current authenticated user |
| `/api/dashboard` | GET | 4 | Load dashboard summary |
| `/api/profile` | GET | 4, 5, AI workflows | Load profile/core context |
| `/api/profile` | PUT | 5 | Update Core Context structured fields |
| `/api/profile/core-context` | PUT | 5 | Update Core Context raw summary Markdown |
| `/api/profile/core-resume` | PUT | 5 | Update core resume Markdown |
| `/api/experiences` | GET | 4, 6, 9, AI workflows | List user's experiences |
| `/api/experiences` | POST | 6 | Create experience |
| `/api/experiences/:experienceId` | GET | 7 | Load one experience |
| `/api/experiences/:experienceId` | PUT | 7 | Update experience |
| `/api/experiences/:experienceId` | DELETE | 6, 7 | Delete/archive experience |
| `/api/experiences/:experienceId/workspace` | GET | 7 | Load experience with activities/journal |
| `/api/experiences/:experienceId/activities` | GET | 7 | Load activities under experience |
| `/api/experiences/:experienceId/activities` | POST | 7 | Create activity under experience |
| `/api/experiences/:experienceId/polish` | POST | 7 | AI-polish experience overview |
| `/api/activities/:activityId` | GET | 8 | Load activity detail |
| `/api/activities/:activityId` | PUT | 8 | Update activity |
| `/api/activities/:activityId` | DELETE | 8 | Delete/archive activity |
| `/api/activities/:activityId/polish` | POST | 8 | AI-polish activity content |
| `/api/journal` | GET | 7, 8, 9 | List journal entries |
| `/api/journal` | POST | 7, 9 | Create journal entry |
| `/api/journal/:journalEntryId` | GET | 9 | Load one journal entry |
| `/api/journal/:journalEntryId` | PUT | 9 | Update journal entry |
| `/api/journal/:journalEntryId` | DELETE | 9 | Delete/archive journal entry |
| `/api/journal/:journalEntryId/convert-to-activity` | POST | 9 | Convert note into Activity |
| `/api/opportunities` | GET | 4, 10, 13 | List opportunities |
| `/api/opportunities` | POST | 10 | Create opportunity |
| `/api/opportunities/:opportunityId` | GET | 11 | Load one opportunity |
| `/api/opportunities/:opportunityId` | PUT | 11 | Update opportunity |
| `/api/opportunities/:opportunityId` | DELETE | 10, 11 | Delete/archive opportunity |
| `/api/opportunities/:opportunityId/workspace` | GET | 11 | Load opportunity with docs/evaluations |
| `/api/opportunities/:opportunityId/extract` | POST | 11 | AI-extract opportunity summary |
| `/api/opportunities/:opportunityId/evaluate` | POST | 11 | AI-evaluate fit |
| `/api/opportunities/:opportunityId/generate-cover-letter` | POST | 11 | Generate cover letter Document |
| `/api/opportunities/compare` | POST | 13 | Compare selected opportunities |
| `/api/documents` | GET | 4, 11 | List documents |
| `/api/documents` | POST | 13 | Create document manually or save report |
| `/api/documents/:documentId` | GET | 12 | Load document detail |
| `/api/documents/:documentId` | PUT | 12 | Update document content/status |
| `/api/documents/:documentId` | DELETE | 12 | Delete/archive document |

---

# MVP Development Phase Suggestions

## Phase 1 — Auth and Profile

Screens:

- 2. Login
- 3. Register
- 4. Dahsboard (evolutionary through phases)
- 5. Profile / Core Context

Endpoints:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/profile`
- `PUT /api/profile`
- `PUT /api/profile/core-context`
- `PUT /api/profile/core-resume`

## Phase 2 — Experience Evidence

Screens:

- 6. Experience Index
- 7. Experience Detail
- 8. Activity Detail

Endpoints:

- `GET /api/experiences`
- `POST /api/experiences`
- `GET /api/experiences/:experienceId`
- `PUT /api/experiences/:experienceId`
- `DELETE /api/experiences/:experienceId`
- `GET /api/experiences/:experienceId/activities`
- `POST /api/experiences/:experienceId/activities`
- `GET /api/activities/:activityId`
- `PUT /api/activities/:activityId`
- `DELETE /api/activities/:activityId`

## Phase 3 — Opportunities and Documents

Screens:

- 10. Opportunities Index
- 11. Opportunities Detail
- 12. Document Detail

Endpoints:

- `GET /api/opportunities`
- `POST /api/opportunities`
- `GET /api/opportunities/:opportunityId`
- `PUT /api/opportunities/:opportunityId`
- `DELETE /api/opportunities/:opportunityId`
- `GET /api/documents`
- `POST /api/documents`
- `GET /api/documents/:documentId`
- `PUT /api/documents/:documentId`
- `DELETE /api/documents/:documentId`

## Phase 4 — AI Workflows

Screens:

- 7. Experience Detail
- 8. Activity Detail
- 11. Opportunities Detail
- 13. Opportunity Compare

Endpoints:

- `POST /api/experiences/:experienceId/polish`
- `POST /api/activities/:activityId/polish`
- `POST /api/opportunities/:opportunityId/extract`
- `POST /api/opportunities/:opportunityId/evaluate`
- `POST /api/opportunities/:opportunityId/generate-cover-letter`
- `POST /api/opportunities/compare`

## Phase 5 — Journal

Screens:

- 7. Experience Detail
- 8. Activity Detail
- 9. Journal

Endpoints:

- `GET /api/journal`
- `POST /api/journal`
- `GET /api/journal/:journalEntryId`
- `PUT /api/journal/:journalEntryId`
- `DELETE /api/journal/:journalEntryId`
- `POST /api/journal/:journalEntryId/convert-to-activity`

---

# Notes

- The matrix is intentionally discrete and redundant. It is meant to support rapid full-stack implementation.
- Some endpoints appear in multiple screens because the same resource supports multiple workflows.
- Workspace endpoints are optional but useful when a screen needs multiple related collections.
