# CareerContext — 08 API Contract

## Purpose

This document defines the first implementation API contract for CareerContext.

It is designed to be used as a backend development checklist and a frontend integration reference.


Key:
* [Endpoint Registry](#endpoint-registry)
* [ Auth Endpoints ](#auth-endpoints)
* [ Dashboard Endpoint ](#dashboard-endpoint)
* [ Profile Endpoints ](#profile-endpoints)
* [ Experience Endpoints ](#experience-endpoints)
* [ Activity Endpoints ](#activity-endpoints)
* [ Journal Endpoints ](#journal-endpoints)
* [ Opportunity Endpoints ](#opportunity-endpoints)
* [ Document Endpoints ](#document-endpoints)

## Contract Conventions

### Base URL

```text
/api
```

### Authentication

All endpoints are authenticated unless explicitly marked public.

Authenticated endpoints use the current user from the JWT/session. The client should not send `userId` for normal user-owned resources.

### Response Envelope

Successful responses should generally use:

```json
{
  "message": "Human readable result",
  "data": {}
}
```

List responses should generally use:

```json
{
  "data": [],
  "meta": {
    "count": 0,
    "total": 0,
    "limit": 20,
    "offset": 0,
    "hasMore": false
  }
}
```

### List Query Conventions

Multi-record `GET` endpoints support bounded result sets. See ticket **206** and `server/src/utils/listQuery.js`.

| Param | Default | Max | Purpose |
|-------|---------|-----|---------|
| `limit` | `20` | `100` | Page size |
| `offset` | `0` | — | Skip (offset pagination) |
| `sort` | entity default | — | Sort field (allowlisted per endpoint) |
| `order` | `desc` | — | `asc` or `desc` |
| `search` | — | — | Case-insensitive match on entity-specific text fields |

Entity-specific filters (e.g. `type`, `status`, `experienceId`) are documented per endpoint.

**Dashboard (`GET /api/dashboard`) is not a list endpoint.** It returns capped previews and aggregate counts only — never full entity collections. See **206** for dashboard caps when wiring real evidence data.

Error responses should generally use:

```json
{
  "error": {
    "message": "Error message",
    "code": "ERROR_CODE"
  }
}
```

### Common Status Codes

| Status | Meaning |
|---:|---|
| 200 | Successful read/update/action |
| 201 | Successful creation |
| 400 | Invalid request body or query |
| 401 | Not authenticated |
| 403 | Authenticated but not allowed |
| 404 | Resource not found or not owned by user |
| 409 | Conflict, usually duplicate email |
| 500 | Unexpected server error |

---

# Endpoint Registry

| ID | Method | Endpoint | Screens | Purpose |
|---|---|---|---|---|
| API-001 | POST | `/api/auth/register` | 3 | Register user |
| API-002 | POST | `/api/auth/login` | 2 | Login user |
| API-003 | GET | `/api/auth/me` | 2, 3, app shell | Get current user |
| API-004 | GET | `/api/dashboard` | 4 | Get dashboard summary |
| API-005 | GET | `/api/profile` | 5 | Get profile/core context |
| API-006 | PUT | `/api/profile` | 5 | Update profile fields |
| API-007 | PUT | `/api/profile/core-context` | 5 | Update core context |
| API-008 | PUT | `/api/profile/core-resume` | 5 | Update core resume |
| API-009 | GET | `/api/experiences` | 6 | List experiences |
| API-010 | POST | `/api/experiences` | 6 | Create experience |
| API-011 | GET | `/api/experiences/:experienceId` | 7 | Get experience |
| API-012 | PUT | `/api/experiences/:experienceId` | 7 | Update experience |
| API-013 | DELETE | `/api/experiences/:experienceId` | 6, 7 | Delete/archive experience |
| API-014 | GET | `/api/experiences/:experienceId/workspace` | 7 | Get experience workspace |
| API-015 | GET | `/api/experiences/:experienceId/activities` | 7 | List activities for experience |
| API-016 | POST | `/api/experiences/:experienceId/activities` | 7 | Create activity |
| API-017 | POST | `/api/experiences/:experienceId/polish` | 7 | AI-polish experience |
| API-018 | GET | `/api/activities/:activityId` | 8 | Get activity |
| API-019 | PUT | `/api/activities/:activityId` | 8 | Update activity |
| API-020 | DELETE | `/api/activities/:activityId` | 8 | Delete/archive activity |
| API-021 | POST | `/api/activities/:activityId/polish` | 8 | AI-polish activity |
| API-022 | GET | `/api/journal` | 7, 8, 9 | List journal entries |
| API-023 | POST | `/api/journal` | 7, 9 | Create journal entry |
| API-024 | GET | `/api/journal/:journalEntryId` | 9 | Get journal entry |
| API-025 | PUT | `/api/journal/:journalEntryId` | 9 | Update journal entry |
| API-026 | DELETE | `/api/journal/:journalEntryId` | 9 | Delete/archive journal entry |
| API-027 | POST | `/api/journal/:journalEntryId/convert-to-activity` | 9 | Convert journal entry to activity |
| API-028 | GET | `/api/opportunities` | 10, 13 | List opportunities |
| API-029 | POST | `/api/opportunities` | 10 | Create opportunity |
| API-030 | GET | `/api/opportunities/:opportunityId` | 11 | Get opportunity |
| API-031 | PUT | `/api/opportunities/:opportunityId` | 11 | Update opportunity |
| API-032 | DELETE | `/api/opportunities/:opportunityId` | 10, 11 | Delete/archive opportunity |
| API-033 | GET | `/api/opportunities/:opportunityId/workspace` | 11 | Get opportunity workspace |
| API-034 | POST | `/api/opportunities/:opportunityId/extract` | 11 | AI-extract job summary |
| API-035 | POST | `/api/opportunities/:opportunityId/evaluate` | 11 | AI-evaluate fit |
| API-036 | POST | `/api/opportunities/:opportunityId/generate-cover-letter` | 11 | Generate cover letter document |
| API-037 | POST | `/api/opportunities/compare` | 13 | Compare opportunities |
| API-038 | GET | `/api/documents` | 11 | List documents |
| API-039 | POST | `/api/documents` | 13 | Create document |
| API-040 | GET | `/api/documents/:documentId` | 12 | Get document |
| API-041 | PUT | `/api/documents/:documentId` | 12 | Update document |
| API-042 | DELETE | `/api/documents/:documentId` | 12 | Delete/archive document |

---

# Auth Endpoints

## API-001 — Register User

```http
POST /api/auth/register
```

Public: yes

### Request

```json
{
  "name": "Sam Fleming",
  "email": "sam@example.com",
  "password": "password123"
}
```

### Success: 201

```json
{
  "message": "User registered",
  "data": {
    "token": "jwt-token",
    "user": {
      "id": "userId",
      "name": "Sam Fleming",
      "email": "sam@example.com"
    }
  }
}
```

### Error Statuses

- 400 invalid input
- 409 email already exists
- 500 server error

---

## API-002 — Login User

```http
POST /api/auth/login
```

Public: yes

### Request

```json
{
  "email": "sam@example.com",
  "password": "password123"
}
```

### Success: 200

```json
{
  "message": "Login successful",
  "data": {
    "token": "jwt-token",
    "user": {
      "id": "userId",
      "name": "Sam Fleming",
      "email": "sam@example.com"
    }
  }
}
```

### Error Statuses

- 400 invalid input
- 401 invalid credentials
- 500 server error

---

## API-003 — Get Current User

```http
GET /api/auth/me
```

### Success: 200

```json
{
  "data": {
    "user": {
      "id": "userId",
      "name": "Sam Fleming",
      "email": "sam@example.com",
      "headline": "Full-stack developer"
    }
  }
}
```

### Error Statuses

- 401 not authenticated

---

# Dashboard Endpoint

## API-004 — Get Dashboard Summary

```http
GET /api/dashboard
```

### Success: 200

```json
{
  "data": {
    "identity": {
      "fullName": "Sam Fleming",
      "headline": "Full-stack developer",
      "email": "sam@example.com",
      "mobile": "+61 400 000 000",
      "location": "Brisbane, AU"
    },
    "profileCompleteness": {
      "score": 60,
      "completed": 3,
      "total": 5,
      "status": "in_progress",
      "showPrompt": true,
      "checks": [
        { "key": "fullName", "label": "Full name", "done": true },
        { "key": "headline", "label": "Headline", "done": true },
        { "key": "location", "label": "Location", "done": false },
        { "key": "rawSummaryMd", "label": "Career summary", "done": true },
        { "key": "coreResumeMd", "label": "Core resume", "done": false }
      ],
      "missing": ["location", "coreResumeMd"],
      "nextAction": {
        "label": "Add your location",
        "to": "/profile"
      }
    },
    "interactiveCv": {
      "summaryPreview": "I am currently working in a full-stack .NET public sector role...",
      "summaryUpdatedAt": "2026-06-08T00:00:00.000Z",
      "reviewSuggested": false,
      "coreCompetencies": ["React", "Node.js", "Leadership", "Express"],
      "highlightExperiences": [
        {
          "id": "mock-exp-1",
          "type": "job",
          "title": "Full-Stack Developer Intern",
          "meta": "TechCorp · Jun 2025 – Present",
          "description": "Led an internal dashboard rebuild used by 40+ staff.",
          "tags": ["React", "Node.js", "Leadership"]
        }
      ]
    },
    "evidencePanel": {
      "defaultView": "evidenceSummary",
      "evidenceSummary": {
        "status": "placeholder",
        "message": "Experience evidence comes next.",
        "counts": {
          "experiences": 0,
          "activities": 0,
          "journalEntries": 0
        }
      },
      "recentActivity": {
        "status": "placeholder",
        "message": "Your latest captured evidence will appear here.",
        "items": []
      }
    },
    "phasePlaceholders": {
      "experienceEvidence": "planned",
      "opportunities": "planned",
      "documents": "planned"
    }
  }
}
```

### Error Statuses

- 401 not authenticated

---

# Profile Endpoints

## API-005 — Get Profile

```http
GET /api/profile
```

### Success: 200

```json
{
  "data": {
    "user": {
      "id": "userId",
      "email": "sam@example.com"
    },
    "coreContext": {
      "fullName": "Sam Fleming",
      "mobile": "+61 400 000 000",
      "location": "Brisbane, AU",
      "headline": "Full-stack developer",
      "rawSummaryMd": "I am currently...",
      "summaryUpdatedAt": "2026-06-08T00:00:00.000Z"
    },
    "coreResumeMd": "# Resume...",
    "coreResumeUpdatedAt": "2026-06-08T00:00:00.000Z",
    "profileCompleteness": {
      "score": 60,
      "completed": 3,
      "total": 5,
      "status": "in_progress",
      "showPrompt": true,
      "checks": [
        { "key": "fullName", "label": "Full name", "done": true },
        { "key": "headline", "label": "Headline", "done": true },
        { "key": "location", "label": "Location", "done": false },
        { "key": "rawSummaryMd", "label": "Career summary", "done": true },
        { "key": "coreResumeMd", "label": "Core resume", "done": false }
      ],
      "missing": ["location", "coreResumeMd"],
      "nextAction": {
        "label": "Add your location",
        "to": "/profile"
      }
    }
  }
}
```

## API-006 — Update Profile

```http
PUT /api/profile
```

### Request

```json
{
  "fullName": "Sam Fleming",
  "mobile": "+61 400 000 000",
  "location": "Brisbane, AU",
  "headline": "Full-stack developer"
}
```

### Success: 200

```json
{
  "message": "Profile updated",
  "data": {
    "coreContext": {
      "fullName": "Sam Fleming",
      "mobile": "+61 400 000 000",
      "location": "Brisbane, AU",
      "headline": "Full-stack developer",
      "rawSummaryMd": "I am currently...",
      "summaryUpdatedAt": "2026-06-08T00:00:00.000Z"
    }
  }
}
```

## API-007 — Update Core Context

```http
PUT /api/profile/core-context
```

### Request

```json
{
  "rawSummaryMd": "I am currently working in a full-stack .NET public sector role..."
}
```

### Success: 200

```json
{
  "message": "Core context updated",
  "data": {
    "rawSummaryMd": "I am currently working in a full-stack .NET public sector role...",
    "summaryUpdatedAt": "2026-06-08T00:00:00.000Z"
  }
}
```

## API-008 — Update Core Resume

```http
PUT /api/profile/core-resume
```

### Request

```json
{
  "coreResumeMd": "# Resume\n\n..."
}
```

### Success: 200

```json
{
  "message": "Core resume updated",
  "data": {
    "coreResumeMd": "# Resume\n\n..."
  }
}
```

### Implementation notes

- **MVP:** Resume body is stored on `User.coreResumeMd` (not `Document`).
- **UI:** Screen 5 uses `MarkdownEditor` (**008.3**) with optional upload-mode scaffold (**008.4**); upload does not call this endpoint until Document APIs exist.
- **Future:** When refactor triggers in [`008.2-core-resume-document-refactor-plan.md`](../devTickets/phase1/008.2-core-resume-document-refactor-plan.md) are met, core resume migrates to `Document { type: 'core_resume' }` and `User.coreResumeDocumentId`. This endpoint may become a thin wrapper over document update during a deprecation window.

---

## API-009 — List Experiences

```http
GET /api/experiences?type=job&search=angular&sort=updatedAt&order=desc&limit=20&offset=0
```

### Success: 200

```json
{
  "data": [
    {
      "id": "experienceId",
      "type": "job",
      "title": "QLD Digital Graduate Developer",
      "organisation": "Blue Card Services",
      "role": "Full Stack Developer",
      "dateStart": "2025-01-01",
      "dateEnd": null,
      "isCurrent": true,
      "activityCount": 4,
      "updatedAt": "2026-06-08T00:00:00.000Z"
    }
  ],
  "meta": {
    "count": 1,
    "total": 1,
    "limit": 20,
    "offset": 0,
    "hasMore": false
  }
}
```

## API-010 — Create Experience

```http
POST /api/experiences
```

### Request

```json
{
  "type": "job",
  "title": "QLD Digital Graduate Developer",
  "organisation": "Blue Card Services",
  "role": "Full Stack Developer",
  "dateStart": "2025-01-01",
  "dateEnd": null,
  "isCurrent": true,
  "overviewRaw": "Working across Angular, .NET and SQL..."
}
```

### Success: 201

```json
{
  "message": "Experience created",
  "data": {
    "experience": {
      "id": "experienceId"
    }
  }
}
```

## API-011 — Get Experience

```http
GET /api/experiences/:experienceId
```

### Success: 200

```json
{
  "data": {
    "experience": {
      "id": "experienceId",
      "type": "job",
      "title": "QLD Digital Graduate Developer",
      "organisation": "Blue Card Services",
      "role": "Full Stack Developer",
      "overviewRaw": "Working across Angular, .NET and SQL...",
      "overviewPolished": "Contributed to public sector systems..."
    }
  }
}
```

## API-012 — Update Experience

```http
PUT /api/experiences/:experienceId
```

### Request

```json
{
  "title": "QLD Digital Graduate Developer",
  "overviewRaw": "Updated raw overview...",
  "overviewPolished": "Updated polished overview..."
}
```

### Success: 200

```json
{
  "message": "Experience updated",
  "data": {
    "experience": {}
  }
}
```

## API-013 — Delete Experience

```http
DELETE /api/experiences/:experienceId
```

### Success: 200

```json
{
  "message": "Experience deleted"
}
```

## API-014 — Get Experience Workspace

```http
GET /api/experiences/:experienceId/workspace?limit=20&offset=0&sort=updatedAt&order=desc
```

### Success: 200

```json
{
  "data": {
    "experience": {},
    "activities": [],
    "activitiesMeta": {
      "count": 0,
      "total": 0,
      "limit": 20,
      "offset": 0,
      "hasMore": false
    },
    "journalEntries": [],
    "journalMeta": {
      "count": 0,
      "total": 0,
      "limit": 20,
      "offset": 0,
      "hasMore": false
    }
  }
}
```

Activities in workspace use the same pagination query params as API-015. Use API-015 directly for additional pages.

## API-015 — List Activities for Experience

```http
GET /api/experiences/:experienceId/activities?search=angular&sort=updatedAt&order=desc&limit=20&offset=0
```

### Success: 200

```json
{
  "data": [],
  "meta": {
    "count": 0,
    "total": 0,
    "limit": 20,
    "offset": 0,
    "hasMore": false
  }
}
```

## API-016 — Create Activity

```http
POST /api/experiences/:experienceId/activities
```

### Request

```json
{
  "title": "OMS Joint Applicant Unlink Screen",
  "rawDescription": "Built Angular frontend components and .NET endpoints..."
}
```

### Success: 201

```json
{
  "message": "Activity created",
  "data": {
    "activity": {
      "id": "activityId"
    }
  }
}
```

## API-017 — Polish Experience

```http
POST /api/experiences/:experienceId/polish
```

### Request

```json
{
  "instructions": "Keep it concise and suitable for job applications."
}
```

### Success: 200

```json
{
  "message": "Experience polished",
  "data": {
    "overviewPolished": "Contributed to full-stack public sector systems using Angular, .NET APIs, and SQL."
  }
}
```

---

# Activity Endpoints

## API-018 — Get Activity

```http
GET /api/activities/:activityId
```

### Success: 200

```json
{
  "data": {
    "activity": {
      "id": "activityId",
      "experienceId": "experienceId",
      "title": "OMS Joint Applicant Unlink Screen",
      "rawDescription": "Built Angular frontend components...",
      "polishedSummary": "Implemented an internal operational workflow..."
    },
    "parentExperience": {
      "id": "experienceId",
      "title": "QLD Digital Graduate Developer"
    }
  }
}
```

## API-019 — Update Activity

```http
PUT /api/activities/:activityId
```

### Request

```json
{
  "title": "OMS Joint Applicant Unlink Screen",
  "rawDescription": "Updated raw notes...",
  "polishedSummary": "Updated polished summary..."
}
```

### Success: 200

```json
{
  "message": "Activity updated",
  "data": {
    "activity": {}
  }
}
```

## API-020 — Delete Activity

```http
DELETE /api/activities/:activityId
```

### Success: 200

```json
{
  "message": "Activity deleted"
}
```

## API-021 — Polish Activity

```http
POST /api/activities/:activityId/polish
```

### Request

```json
{
  "instructions": "Turn this into reusable career evidence."
}
```

### Success: 200

```json
{
  "message": "Activity polished",
  "data": {
    "polishedSummary": "Implemented an internal operational workflow spanning Angular UI components and .NET API integration."
  }
}
```

---

# Journal Endpoints

## API-022 — List Journal Entries

```http
GET /api/journal?experienceId=experienceId&activityId=activityId&status=raw&limit=20
```

### Success: 200

```json
{
  "data": [],
  "meta": { "count": 0 }
}
```

## API-023 — Create Journal Entry

```http
POST /api/journal
```

### Request

```json
{
  "experienceId": "experienceId",
  "activityId": null,
  "title": "Notes on SQL ref data change",
  "content": "Worked through idempotent SQL scripts...",
  "tags": ["SQL", "migration"]
}
```

### Success: 201

```json
{
  "message": "Journal entry created",
  "data": {
    "journalEntry": {
      "id": "journalEntryId"
    }
  }
}
```

## API-024 — Get Journal Entry

```http
GET /api/journal/:journalEntryId
```

### Success: 200

```json
{
  "data": {
    "journalEntry": {}
  }
}
```

## API-025 — Update Journal Entry

```http
PUT /api/journal/:journalEntryId
```

### Request

```json
{
  "title": "Updated title",
  "content": "Updated journal content...",
  "tags": ["SQL"],
  "status": "linked"
}
```

### Success: 200

```json
{
  "message": "Journal entry updated",
  "data": {
    "journalEntry": {}
  }
}
```

## API-026 — Delete Journal Entry

```http
DELETE /api/journal/:journalEntryId
```

### Success: 200

```json
{
  "message": "Journal entry deleted"
}
```

## API-027 — Convert Journal Entry to Activity

```http
POST /api/journal/:journalEntryId/convert-to-activity
```

### Request

```json
{
  "experienceId": "experienceId",
  "instructions": "Turn this into a reusable job application activity."
}
```

### Success: 201

```json
{
  "message": "Journal entry converted to activity",
  "data": {
    "activity": {
      "id": "activityId",
      "title": "SQL Ref Data Changes",
      "rawDescription": "...",
      "polishedSummary": "..."
    },
    "journalEntry": {
      "id": "journalEntryId",
      "status": "converted"
    }
  }
}
```

---

# Opportunity Endpoints

## API-028 — List Opportunities

```http
GET /api/opportunities?status=evaluated&search=react&ids=id1,id2&limit=20
```

### Success: 200

```json
{
  "data": [
    {
      "id": "opportunityId",
      "title": "Mid-Level Full Stack Developer",
      "company": "Example Company",
      "status": "evaluated",
      "hasExtractedSummary": true,
      "hasEvaluation": true,
      "documentCount": 1,
      "updatedAt": "2026-06-08T00:00:00.000Z"
    }
  ],
  "meta": { "count": 1 }
}
```

## API-029 — Create Opportunity

```http
POST /api/opportunities
```

### Request

```json
{
  "title": "Mid-Level Full Stack Developer",
  "company": "Example Company",
  "url": "https://example.com/job",
  "origin": "LinkedIn",
  "rawDescription": "We are looking for a full stack developer..."
}
```

### Success: 201

```json
{
  "message": "Opportunity created",
  "data": {
    "opportunity": {
      "id": "opportunityId"
    }
  }
}
```

## API-030 — Get Opportunity

```http
GET /api/opportunities/:opportunityId
```

### Success: 200

```json
{
  "data": {
    "opportunity": {
      "id": "opportunityId",
      "title": "Mid-Level Full Stack Developer",
      "company": "Example Company",
      "url": "https://example.com/job",
      "origin": "LinkedIn",
      "rawDescription": "We are looking for...",
      "extractedSummary": "## Role Summary...",
      "status": "extracted"
    }
  }
}
```

## API-031 — Update Opportunity

```http
PUT /api/opportunities/:opportunityId
```

### Request

```json
{
  "title": "Updated title",
  "company": "Updated Company",
  "status": "applied",
  "rawDescription": "Updated description..."
}
```

### Success: 200

```json
{
  "message": "Opportunity updated",
  "data": {
    "opportunity": {}
  }
}
```

## API-032 — Delete Opportunity

```http
DELETE /api/opportunities/:opportunityId
```

### Success: 200

```json
{
  "message": "Opportunity deleted"
}
```

## API-033 — Get Opportunity Workspace

```http
GET /api/opportunities/:opportunityId/workspace
```

### Success: 200

```json
{
  "data": {
    "opportunity": {},
    "latestEvaluation": {},
    "documents": [],
    "contextPreview": {
      "summaryUpdatedAt": "2026-06-08T00:00:00.000Z",
      "experienceCount": 3,
      "activityCount": 12
    }
  }
}
```

## API-034 — Extract Opportunity

```http
POST /api/opportunities/:opportunityId/extract
```

### Request

```json
{
  "instructions": "Extract key responsibilities, technologies, seniority and role expectations."
}
```

### Success: 200

```json
{
  "message": "Opportunity extracted",
  "data": {
    "extractedSummary": "## Key Responsibilities\n\n- ...",
    "status": "extracted"
  }
}
```

## API-035 — Evaluate Opportunity Fit

```http
POST /api/opportunities/:opportunityId/evaluate
```

### Request

```json
{
  "instructions": "Focus on fit for a mid-level full-stack developer role."
}
```

### Success: 200

```json
{
  "message": "Opportunity evaluated",
  "data": {
    "evaluation": {
      "id": "evaluationId",
      "summary": "## Fit Summary\n\nThis opportunity appears to align...",
      "type": "opportunity_fit"
    },
    "opportunity": {
      "id": "opportunityId",
      "status": "evaluated"
    }
  }
}
```

## API-036 — Generate Cover Letter

```http
POST /api/opportunities/:opportunityId/generate-cover-letter
```

### Request

```json
{
  "instructions": "Write in a professional but natural tone."
}
```

### Success: 201

```json
{
  "message": "Cover letter generated",
  "data": {
    "document": {
      "id": "documentId",
      "type": "cover_letter",
      "title": "Cover Letter — Mid-Level Full Stack Developer",
      "content": "Dear Hiring Manager...",
      "status": "draft"
    }
  }
}
```

## API-037 — Compare Opportunities

```http
POST /api/opportunities/compare
```

### Request

```json
{
  "opportunityIds": ["id1", "id2", "id3"],
  "instructions": "Compare these based on fit, growth, and alignment with my target direction."
}
```

### Success: 200

```json
{
  "message": "Opportunities compared",
  "data": {
    "comparison": "## Opportunity Comparison\n\n..."
  }
}
```

---

# Document Endpoints

## API-038 — List Documents

```http
GET /api/documents?opportunityId=opportunityId&type=cover_letter&limit=20
```

### Success: 200

```json
{
  "data": [],
  "meta": { "count": 0 }
}
```

## API-039 — Create Document

```http
POST /api/documents
```

### Request

```json
{
  "opportunityId": "opportunityId",
  "type": "application_notes",
  "title": "Application Notes",
  "content": "Notes...",
  "status": "draft"
}
```

### Success: 201

```json
{
  "message": "Document created",
  "data": {
    "document": {
      "id": "documentId"
    }
  }
}
```

## API-040 — Get Document

```http
GET /api/documents/:documentId
```

### Success: 200

```json
{
  "data": {
    "document": {
      "id": "documentId",
      "opportunityId": "opportunityId",
      "type": "cover_letter",
      "title": "Cover Letter",
      "content": "Dear Hiring Manager...",
      "status": "draft"
    },
    "linkedOpportunity": {
      "id": "opportunityId",
      "title": "Mid-Level Full Stack Developer",
      "company": "Example Company"
    }
  }
}
```

## API-041 — Update Document

```http
PUT /api/documents/:documentId
```

### Request

```json
{
  "title": "Updated Cover Letter",
  "content": "Updated content...",
  "status": "final"
}
```

### Success: 200

```json
{
  "message": "Document updated",
  "data": {
    "document": {}
  }
}
```

## API-042 — Delete Document

```http
DELETE /api/documents/:documentId
```

### Success: 200

```json
{
  "message": "Document deleted"
}
```

---

# Implementation Notes

## Delete vs Archive

The contract uses `DELETE` for simplicity. During implementation, services may soft-delete/archive instead of permanently deleting, especially for Documents, Opportunities, and Journal Entries.

## AI Output Persistence

For MVP speed, AI workflow endpoints may directly persist output and return the persisted result. A later human-in-the-loop refinement could return a suggested draft first and persist only after approval.

## Workspace Endpoints

Workspace endpoints are convenience endpoints for screen-level data loading. They do not replace CRUD endpoints.

Recommended MVP workspace endpoints:

- `GET /api/experiences/:experienceId/workspace`
- `GET /api/opportunities/:opportunityId/workspace`

- `GET /api/dashboard` (implemented — Screen 4 dashboard payload)

## Profile Completeness

`profileCompleteness` is calculated server-side by `profileCompletenessService.js` and returned on both:

- `GET /api/profile`
- `GET /api/dashboard`

Rules (5 equal fields, 20% each):

| Field | Source | Complete when |
|-------|--------|---------------|
| Full name | `CoreContext.fullName` | non-empty trimmed string |
| Headline | `CoreContext.headline` | non-empty trimmed string |
| Location | `CoreContext.location` | non-empty trimmed string |
| Career summary | `CoreContext.rawSummaryMd` | non-empty trimmed string |
| Core resume | `User.coreResumeMd` | non-empty trimmed string |

`score` = `Math.round((completed / total) * 100)`. `showPrompt` is `true` while any field is incomplete.

## Dashboard Phase 1 Mocks

Until Experience APIs exist, `interactiveCv.coreCompetencies` and `interactiveCv.highlightExperiences` are populated from `server/src/constants/phase1DashboardMocks.js`. The client mirrors these as a UI fallback in `client/src/features/dashboard/phase1MockData.js` when the API returns empty arrays.

## Core Resume and Documents

Core resume is profile-owned for Phase 1 (`User.coreResumeMd`, API-008). Document CRUD (API-038+) is stubbed. See **008.2** for migration plan and **DOC-001** / **DOC-002** for future implementation tickets.

Core resume preview and quick-action widgets are **not** part of the Dashboard UI.

## Field Naming Note

The reviewed data model currently uses names such as `overviewRaw`, `overviewPolished`, `rawDescription`, `polishedSummary`, `rawDescription`, `content`, and `summary`.

The frontend may treat these fields as Markdown content even when the property name does not include `Md`.
