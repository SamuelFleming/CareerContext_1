# CareerContext — Flows to Screens

## Purpose

This document maps user journeys to the screens required to support them.

The intended design sequence is:

```text
Flows
→ Screens
→ Screen data needs
→ Data model
→ API contract
```

The API should not be designed from entities alone. It should be justified by the screens and user paths the product needs to support.

---

# MVP Screen Set

## Public and Auth Screens

| Screen | Purpose |
|---|---|
| 1. Landing Page | Explain the product and route users to login/register |
| 2. Register | Create a new user account |
| 3. Login | Authenticate an existing user |

## Core App Screens

| Screen | Purpose |
|---|---|
| 4. Dashboard | Workspace overview and quick actions |
| 5. Profile / Core Context | Manage profile, career context, and core resume Markdown |
| 6. Experiences Index | Browse and create experiences |
| 7. Experience Detail | View/edit one experience, activities, and related journal notes |
| 8. Activity Detail | View/edit one reusable evidence item |
| 9. Journal | Capture rough professional notes |
| 10. Opportunities Index | Browse and create opportunities |
| 11. Opportunity Detail | Run extraction, evaluation, and document generation |
| 12. Document Detail | Edit generated or uploaded Markdown documents |
| 13. Opportunity Compare | Compare selected opportunities |

---

# Flow 1 — New User Onboarding

## Goal

A new user creates an account and provides enough context for the app to become useful.

## Happy Path

```text
Landing Page
→ Register
→ Profile / Core Context
→ Dashboard
```

## Steps

1. User lands on the public page.
2. User registers.
3. User is redirected to Profile / Core Context.
4. User enters profile basics, Core Context Markdown, and optional Core Resume Markdown.
5. User saves.
6. User lands on Dashboard.

## Screens Involved

| Step | Screen |
|---|---|
| Product discovery | Landing Page |
| Account creation | Register |
| Initial profile setup | Profile / Core Context |
| Post-setup workspace | Dashboard |

## Data Created/Updated

- User
- Core Context Markdown
- Core Resume Markdown

## Required API Support

- Register user
- Authenticate user
- Fetch current user/profile
- Update profile/core context/core resume

---

# Flow 2 — Existing User Login

## Goal

An existing user signs in and returns to their workspace.

## Happy Path

```text
Landing Page
→ Login
→ Dashboard
```

## Required Screens

- Landing Page
- Login
- Dashboard

## Data Read

- User profile summary
- Recent experiences
- Recent opportunities
- Recent documents
- Recent journal entries

## Required API Support

- Login
- Fetch current user
- Fetch dashboard summary

---

# Flow 3 — Core Context Maintenance

## Goal

The user updates the career narrative that informs evaluations and generated documents.

## Happy Path

```text
Dashboard
→ Profile / Core Context
→ Save
```

## Data Updated

- Profile basics
- `coreContextMd`
- `coreResumeMd`

## Required API Support

- Fetch profile
- Update profile
- Update core context
- Update core resume

---

# Flow 4 — Experience Capture

## Goal

The user creates a major experience container such as a job, project, course, or personal project.

## Happy Path

```text
Dashboard
→ Experiences Index
→ Create Experience
→ Experience Detail
```

## Data Created

- Experience

## Required API Support

- List experiences
- Create experience
- Fetch experience
- Update experience

---

# Flow 5 — Activity Capture

## Goal

The user adds a structured, reusable evidence item under an Experience.

## Happy Path

```text
Experience Detail
→ Create Activity
→ Activity Detail
→ Save
→ Experience Detail
```

## Data Created

- Activity linked to Experience

## Required API Support

- List activities for experience
- Create activity
- Fetch activity
- Update activity
- Delete activity

---

# Flow 6 — Journal Capture

## Goal

The user quickly captures rough professional notes without needing to structure them yet.

## Happy Path

```text
Dashboard
→ Journal
→ New Journal Entry
→ Save
```

Alternative context-specific path:

```text
Experience Detail
→ Journal Panel
→ New Journal Entry
→ Save
```

## Data Created

- Journal Entry

## Required API Support

- List journal entries
- Create journal entry
- Update journal entry
- Delete journal entry

---

# Flow 7 — Journal to Activity

## Goal

The user converts rough journal content into a structured reusable Activity.

## Happy Path

```text
Journal
→ Journal Entry
→ Convert to Activity
→ Review Suggested Activity
→ Activity Detail
```

## Data Created/Updated

- Activity created
- Journal Entry linked or marked as converted

## Required API Support

- Fetch journal entry
- Convert journal entry to activity
- Create/update activity
- Update journal status/link

## MVP Note

This flow can be deferred until after manual Activity creation works.

---

# Flow 8 — Opportunity Capture

## Goal

The user saves a job opportunity for later evaluation and document generation.

## Happy Path

```text
Dashboard
→ Opportunities Index
→ Create Opportunity
→ Opportunity Detail
```

## Data Created

- Opportunity with raw job description Markdown

## Required API Support

- List opportunities
- Create opportunity
- Fetch opportunity
- Update opportunity

---

# Flow 9 — Opportunity Extraction

## Goal

The user asks AI to convert a raw job description into an organised Markdown summary.

## Happy Path

```text
Opportunity Detail
→ Extract with AI
→ Review Extracted Summary
→ Save
```

## Data Updated

- `extractedSummaryMd` on Opportunity
- Optional AI Run log

## Required API Support

- Fetch opportunity
- Run opportunity extraction
- Save extracted summary
- Optional AI run logging

---

# Flow 10 — Fit Evaluation

## Goal

The user evaluates how well their profile and evidence match an Opportunity.

## Happy Path

```text
Opportunity Detail
→ Evaluate Fit
→ Review Evaluation
→ Save Evaluation
```

## Data Used

- Core Context Markdown
- Core Resume Markdown
- Experiences
- Activities
- Opportunity raw/extracted content

## Data Created/Updated

- `evaluationMd` on Opportunity, or separate Evaluation record later
- Opportunity status
- Optional AI Run log

## Required API Support

- Fetch opportunity context bundle
- Run fit evaluation
- Save evaluation

---

# Flow 11 — Cover Letter Generation

## Goal

The user generates a cover letter draft grounded in stored evidence and opportunity details.

## Happy Path

```text
Opportunity Detail
→ Generate Cover Letter
→ Document Detail
→ Edit
→ Save
```

## Data Created

- Document with `type = cover_letter`
- Optional AI Run log

## Required API Support

- Generate cover letter for opportunity
- Create document
- Fetch document
- Update document

---

# Flow 12 — Opportunity Comparison

## Goal

The user compares two or more opportunities to decide which to prioritise.

## Happy Path

```text
Opportunities Index
→ Select Opportunities
→ Opportunity Compare
→ Review Comparison
```

## Data Used

- Selected opportunities
- Extracted summaries
- Evaluations
- Core Context

## Required API Support

- Fetch selected opportunities
- Run opportunity comparison

## MVP Note

This can wait until the single-opportunity evaluation flow is useful.

---

# MVP Flow Priority

## Build First

1. Register/Login
2. Profile / Core Context
3. Experience CRUD
4. Activity CRUD
5. Opportunity CRUD
6. Opportunity Detail
7. Document Detail

## Build Second

1. Opportunity extraction
2. Fit evaluation
3. Cover letter generation
4. Dashboard summary

## Build Third

1. Journal capture
2. Journal to Activity conversion
3. Activity/Experience polishing
4. Opportunity comparison

---

# Design Implication

The API contract should include both:

1. **CRUD endpoints** for simple entity management.
2. **Workflow endpoints** for product actions such as evaluation and document generation.

Some screens may justify screen-serving endpoints, especially:

```text
GET /api/dashboard
GET /api/experiences/:id/workspace
GET /api/opportunities/:id/workspace
```

These are not mandatory at the start, but they can reduce frontend complexity once screens become richer.
