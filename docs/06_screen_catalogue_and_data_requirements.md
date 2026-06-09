# CareerContext — 06 Screen Catalogue and Screen Data Requirements

## Purpose

This document is the implementation-facing screen catalogue for CareerContext.

It is intentionally more discrete than the earlier flow notes. Each screen has a stable number, a short purpose, its route suggestion, the data it needs, and the API endpoints expected to serve it.

The screen numbers in this document should be used for:

- development progress tracking
- UI design tracking
- frontend route planning
- API justification
- testing checklists
- GitHub issues or project board items

## Design Rule

API endpoints should be justified by the screens and workflows they serve.

```text
Flows
→ Screens
→ Screen data needs
→ API contract
```

---

# Screen Registry

| Screen No. | Screen Name | Suggested Route | Auth Required | Primary Purpose |
|---:|---|---|---|---|
| 1 | Landing Page | `/` | No | Explain the product and route users to login/register |
| 2 | Login | `/login` | No | Authenticate an existing user |
| 3 | Register | `/register` | No | Create a new account |
| 4 | Dashboard | `/dashboard` | Yes | Provide the user's workspace overview |
| 5 | Profile / Core Context | `/profile` | Yes | Manage user profile, core context, and core resume content |
| 6 | Experience Index | `/experiences` | Yes | Browse and create experiences |
| 7 | Experience Detail | `/experiences/:experienceId` | Yes | Manage one experience, its activities, and its journal entries |
| 8 | Activity Detail | `/activities/:activityId` | Yes | Manage one reusable evidence item |
| 9 | Journal | `/journal` | Yes | Capture and manage rough professional notes |
| 10 | Opportunities Index | `/opportunities` | Yes | Browse, create, and select opportunities |
| 11 | Opportunities Detail | `/opportunities/:opportunityId` | Yes | Manage one opportunity and run AI workflows |
| 12 | Document Detail | `/documents/:documentId` | Yes | View and edit document content |
| 13 | Opportunity Compare | `/opportunities/compare` | Yes | Compare selected opportunities |

## Activity Index Decision

The Activity Index is not a separate MVP screen. It is treated as a section inside **7. Experience Detail**.

Reason:

- Activities are always most useful in the context of a parent Experience.
- A separate global Activity Index can be added later if search/discovery across all activities becomes important.

---

# 1. Landing Page

## Description

Public marketing/product entry screen. It explains CareerContext as an AI-assisted career evidence workspace and encourages the user to register or login.

## Data Requirements

Static content only.

## UI Actions

| Action | Result |
|---|---|
| Click Login | Navigate to Screen 2 |
| Click Register | Navigate to Screen 3 |

## API Endpoints

None.

---

# 2. Login

## Description

Allows an existing user to authenticate and enter the application.

## Data Requirements

| Field | Type | Source |
|---|---|---|
| email | string | user input |
| password | string | user input |

## UI Actions

| Action | Endpoint | Result |
|---|---|---|
| Submit login form | `POST /api/auth/login` | Receive JWT/user payload |
| Validate current session after load | `GET /api/auth/me` | Confirm authenticated user |

## API Endpoints

- `POST /api/auth/login`
- `GET /api/auth/me`

---

# 3. Register

## Description

Allows a new user to create an account.

## Data Requirements

| Field | Type | Source |
|---|---|---|
| name | string | user input |
| email | string | user input |
| password | string | user input |

## UI Actions

| Action | Endpoint | Result |
|---|---|---|
| Submit register form | `POST /api/auth/register` | Create user, return JWT/user payload |
| Validate current session after registration | `GET /api/auth/me` | Confirm authenticated user |

## API Endpoints

- `POST /api/auth/register`
- `GET /api/auth/me`

---

# 4. Dashboard

## Description

The authenticated user's home screen. It provides a fast overview of profile completion, recent evidence, recent opportunities, and generated documents.

## Data Requirements

| Data | Purpose |
|---|---|
| profile summary | Personalise screen and show core context/resume status |
| recent experiences | Let user continue building evidence |
| recent opportunities | Let user continue application work |
| recent documents | Let user continue editing outputs |
| recent journal entries | Encourage ongoing professional journaling |
| counts/statuses | Show workspace progress |

## UI Actions

| Action | Endpoint | Result |
|---|---|---|
| Load dashboard | `GET /api/dashboard` | Fetch summary payload |
| Open profile | none | Navigate to Screen 5 |
| Open experience | none | Navigate to Screen 7 |
| Open opportunity | none | Navigate to Screen 11 |
| Open document | none | Navigate to Screen 12 |

## API Endpoints

Preferred:

- `GET /api/dashboard`

Fallback MVP option:

- `GET /api/profile`
- `GET /api/experiences?limit=5`
- `GET /api/opportunities?limit=5`
- `GET /api/documents?limit=5`
- `GET /api/journal?limit=5`

---

# 5. Profile / Core Context

## Description

Profile and strategic career context editor. This is where the user maintains their current career narrative, target direction, and core resume content.

## Data Requirements

| Data | Purpose |
|---|---|
| name | Basic identity |
| email | Read-only account identity |
| headline | Quick profile label |
| coreContextMd | User-authored career narrative and direction |
| coreResumeMd | Resume source content used in AI workflows |
| coreContextUpdatedAt | Shows whether strategic context may be stale |

## UI Actions

| Action | Endpoint | Result |
|---|---|---|
| Load profile | `GET /api/profile` | Populate form/editor |
| Save profile fields | `PUT /api/profile` | Update basic profile |
| Save core context | `PUT /api/profile/core-context` | Update core context Markdown |
| Save core resume | `PUT /api/profile/core-resume` | Update core resume Markdown |

## API Endpoints

- `GET /api/profile`
- `PUT /api/profile`
- `PUT /api/profile/core-context`
- `PUT /api/profile/core-resume`

---

# 6. Experience Index

## Description

List screen for all Experiences. It allows the user to browse, filter, create, and open major experience containers.

## Data Requirements

| Data | Purpose |
|---|---|
| experience list | Display experience cards/table |
| type | Filter/group by job, project, course, etc. |
| activityCount | Show amount of evidence under each experience |
| updatedAt | Sort by recent work |
| dateStart/dateEnd/isCurrent | Timeline context |

## UI Actions

| Action | Endpoint | Result |
|---|---|---|
| Load experiences | `GET /api/experiences` | Display list |
| Search/filter experiences | `GET /api/experiences?search=&type=` | Display filtered list |
| Create experience | `POST /api/experiences` | Create and navigate to Screen 7 |
| Delete/archive experience | `DELETE /api/experiences/:experienceId` | Remove from list |

## API Endpoints

- `GET /api/experiences`
- `POST /api/experiences`
- `DELETE /api/experiences/:experienceId`

---

# 7. Experience Detail

## Description

Detail/workspace screen for a single Experience. It manages the Experience overview, the embedded Activity Index, and related Journal Entries.

## Data Requirements

| Data | Purpose |
|---|---|
| experience | Header, overview editor, metadata |
| activities | Embedded Activity Index for this Experience |
| journal entries | Rough notes related to this Experience |
| polished overview | AI-improved experience summary |

## UI Actions

| Action | Endpoint | Result |
|---|---|---|
| Load experience workspace | `GET /api/experiences/:experienceId/workspace` | Fetch experience + activities + journal entries |
| Update experience | `PUT /api/experiences/:experienceId` | Save overview/metadata |
| Create activity | `POST /api/experiences/:experienceId/activities` | Add evidence item |
| Open activity | none | Navigate to Screen 8 |
| Create journal entry | `POST /api/journal` | Add rough note linked to this Experience |
| Polish experience | `POST /api/experiences/:experienceId/polish` | Generate polished overview Markdown |

## API Endpoints

- `GET /api/experiences/:experienceId/workspace`
- `GET /api/experiences/:experienceId`
- `PUT /api/experiences/:experienceId`
- `POST /api/experiences/:experienceId/activities`
- `GET /api/experiences/:experienceId/activities`
- `POST /api/journal`
- `GET /api/journal?experienceId=:experienceId`
- `POST /api/experiences/:experienceId/polish`

---

# 8. Activity Detail

## Description

Detail/editor screen for a single Activity. Activities are reusable evidence items used later in evaluations and generated documents.

## Data Requirements

| Data | Purpose |
|---|---|
| activity | Main evidence editor |
| parent experience summary | Context and breadcrumb |
| linked journal entries | Supporting raw notes |
| polishedSummary/polishedContent | AI-improved reusable summary |

## UI Actions

| Action | Endpoint | Result |
|---|---|---|
| Load activity | `GET /api/activities/:activityId` | Populate editor |
| Save activity | `PUT /api/activities/:activityId` | Persist changes |
| Delete activity | `DELETE /api/activities/:activityId` | Remove evidence item |
| Polish activity | `POST /api/activities/:activityId/polish` | Generate polished summary/content |
| Load linked journal | `GET /api/journal?activityId=:activityId` | Show supporting notes |

## API Endpoints

- `GET /api/activities/:activityId`
- `PUT /api/activities/:activityId`
- `DELETE /api/activities/:activityId`
- `POST /api/activities/:activityId/polish`
- `GET /api/journal?activityId=:activityId`

---

# 9. Journal

## Description

Professional journal workspace for rough notes. Journal Entries should lower friction for capturing work before it is fully structured.

## Data Requirements

| Data | Purpose |
|---|---|
| journal entries | Timeline/list |
| experience options | Required/primary linking target |
| activity options | Optional linking target |
| tags/status | Filtering and organisation |

## UI Actions

| Action | Endpoint | Result |
|---|---|---|
| Load journal | `GET /api/journal` | Display entries |
| Filter journal | `GET /api/journal?experienceId=&activityId=&status=` | Display filtered entries |
| Create journal entry | `POST /api/journal` | Save rough note |
| Update journal entry | `PUT /api/journal/:journalEntryId` | Save changes |
| Delete/archive journal entry | `DELETE /api/journal/:journalEntryId` | Remove/archive note |
| Convert to activity | `POST /api/journal/:journalEntryId/convert-to-activity` | Create Activity from note |

## API Endpoints

- `GET /api/journal`
- `POST /api/journal`
- `GET /api/journal/:journalEntryId`
- `PUT /api/journal/:journalEntryId`
- `DELETE /api/journal/:journalEntryId`
- `POST /api/journal/:journalEntryId/convert-to-activity`
- `GET /api/experiences?select=id,title`
- `GET /api/activities?experienceId=:experienceId&select=id,title`

---

# 10. Opportunities Index

## Description

List screen for saved Opportunities. It supports creating opportunities, opening opportunities, filtering by status, and selecting opportunities for comparison.

## Data Requirements

| Data | Purpose |
|---|---|
| opportunity list | Display saved jobs |
| status | Pipeline/filtering |
| hasEvaluation | Show whether role has been assessed |
| documentCount | Show generated outputs |
| selected opportunity ids | Support comparison flow |

## UI Actions

| Action | Endpoint | Result |
|---|---|---|
| Load opportunities | `GET /api/opportunities` | Display list |
| Filter opportunities | `GET /api/opportunities?status=&search=` | Display filtered list |
| Create opportunity | `POST /api/opportunities` | Create and navigate to Screen 11 |
| Delete/archive opportunity | `DELETE /api/opportunities/:opportunityId` | Remove/archive opportunity |
| Select opportunities for compare | none | Update client state |
| Compare selected | none | Navigate to Screen 13 with selected ids |

## API Endpoints

- `GET /api/opportunities`
- `POST /api/opportunities`
- `DELETE /api/opportunities/:opportunityId`

---

# 11. Opportunities Detail

## Description

Workspace screen for one Opportunity. It supports editing the job description, AI extraction, AI fit evaluation, and document generation.

## Data Requirements

| Data | Purpose |
|---|---|
| opportunity | Job metadata and raw description |
| extracted summary | AI-structured interpretation of the job |
| latest evaluation | AI fit assessment |
| generated documents | Cover letters/application notes linked to opportunity |
| context/evidence preview | Shows what may be used for generation |

## UI Actions

| Action | Endpoint | Result |
|---|---|---|
| Load opportunity workspace | `GET /api/opportunities/:opportunityId/workspace` | Fetch opportunity + docs + evaluation |
| Save opportunity | `PUT /api/opportunities/:opportunityId` | Update job details |
| Extract opportunity | `POST /api/opportunities/:opportunityId/extract` | Generate extracted summary |
| Evaluate fit | `POST /api/opportunities/:opportunityId/evaluate` | Generate evaluation summary/report |
| Generate cover letter | `POST /api/opportunities/:opportunityId/generate-cover-letter` | Create Document draft |
| Open document | none | Navigate to Screen 12 |

## API Endpoints

- `GET /api/opportunities/:opportunityId/workspace`
- `GET /api/opportunities/:opportunityId`
- `PUT /api/opportunities/:opportunityId`
- `POST /api/opportunities/:opportunityId/extract`
- `POST /api/opportunities/:opportunityId/evaluate`
- `POST /api/opportunities/:opportunityId/generate-cover-letter`
- `GET /api/documents?opportunityId=:opportunityId`

---

# 12. Document Detail

## Description

Document editor for uploaded or generated documents. MVP documents are Markdown-first.

## Data Requirements

| Data | Purpose |
|---|---|
| document | Main editor content |
| linked opportunity | Context/breadcrumb |
| source evaluation | Optional supporting context |
| status | Draft/final/archive handling |

## UI Actions

| Action | Endpoint | Result |
|---|---|---|
| Load document | `GET /api/documents/:documentId` | Populate editor |
| Save document | `PUT /api/documents/:documentId` | Persist edits |
| Delete/archive document | `DELETE /api/documents/:documentId` | Remove/archive document |

## API Endpoints

- `GET /api/documents/:documentId`
- `PUT /api/documents/:documentId`
- `DELETE /api/documents/:documentId`

---

# 13. Opportunity Compare

## Description

Comparison screen for two or more selected Opportunities.

## Data Requirements

| Data | Purpose |
|---|---|
| selected opportunities | Comparison subjects |
| extracted summaries | Role requirement comparison |
| evaluations | Fit comparison |
| core context | Career alignment comparison |
| comparison output | Generated comparison Markdown |

## UI Actions

| Action | Endpoint | Result |
|---|---|---|
| Load selected opportunities | `GET /api/opportunities?ids=id1,id2` | Populate comparison inputs |
| Run comparison | `POST /api/opportunities/compare` | Generate comparison Markdown |
| Save comparison as document | `POST /api/documents` | Persist comparison/report |

## API Endpoints

- `GET /api/opportunities?ids=id1,id2`
- `POST /api/opportunities/compare`
- `POST /api/documents`

---

# Screen Build Checklist

| Screen No. | Screen Name | MVP Priority | Notes |
|---:|---|---|---|
| 1 | Landing Page | Medium | Can be simple initially |
| 2 | Login | High | Required for auth |
| 3 | Register | High | Required for auth |
| 4 | Dashboard | Medium | Can start as simple summary |
| 5 | Profile / Core Context | High | Required for AI usefulness |
| 6 | Experience Index | High | Core evidence management |
| 7 | Experience Detail | High | Core evidence management |
| 8 | Activity Detail | High | Activities are core evidence unit |
| 9 | Journal | Medium | Important UX/product loop, can be basic |
| 10 | Opportunities Index | High | Required for application workflow |
| 11 | Opportunities Detail | High | Main AI workflow screen |
| 12 | Document Detail | High | Needed for generated cover letters |
| 13 | Opportunity Compare | Low/Medium | Useful but can follow core apply flow |
