# CareerContext — Solution Technology

## Technical Direction

CareerContext will be implemented as a MERN stack application.

The initial focus is local development, rapid implementation, and strong portfolio storytelling rather than deployment.

## Stack

### Frontend

- React (and appropriate libaries)
- React Router
- CSS Modules, SCSS, Tailwind, or custom CSS system
- Optional UI support:
  - Framer Motion for interface polish
  - React Hook Form for forms
  - Zod for validation

### Backend

- Node.js
- Express
- REST API
- JWT authentication
- bcrypt password hashing
- Multer or equivalent for file uploads if needed

### Database

- MongoDB
- Mongoose

### AI Layer

- OpenAI API or equivalent LLM provider
- Server-side AI service module
- Prompt templates stored in backend
- JSON outputs for structured AI responses
- AI run logging for traceability

### Local Development

- No deployment required for first MVP
- Local MongoDB or MongoDB Atlas development database
- `.env` for API keys and database connection strings
- Optional Docker Compose later, but not required for immediate MVP

---

# Suggested Repository Structure

```text
careercontext/
  client/
    src/
      app/
      components/
      features/
        auth/
        dashboard/
        profile/
        experiences/
        activities/
        journal/
        opportunities/
        documents/
        ai/
      layouts/
      routes/
      services/
      styles/
      utils/
  server/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      services/
      prompts/
      utils/
    uploads/
  docs/
    00_documentation_index.md
    01_idea_high_level_why.md
    01_1_portfolio_story.md
    02_solution_high_level.md
    03_solution_technology.md
  README.md
```

---

# Backend Architecture

Use a simple but clean Route → Controller → Service → Model structure.

## Example

```text
routes/opportunityRoutes.js
  → controllers/opportunityController.js
    → services/opportunityService.js
      → models/Opportunity.js
```

AI logic should live in dedicated AI services rather than directly inside controllers.

## AI Service Example

```text
services/ai/
  aiClient.js
  promptBuilder.js
  experiencePolisher.js
  opportunityExtractor.js
  fitEvaluator.js
  coverLetterGenerator.js
```

---

# Initial (Simplified) Data Model
The simpler MVP model could be


## User

```js
{
  email,
  passwordHash,
  name,
  coreContextMd,
  coreResumeMd
}
```

## Experience

```js
{
  userId,
  type,
  title,
  organisation,
  role,
  dateStart,
  dateEnd,
  rawOverviewMd,
  polishedOverviewMd
}
```

## Activity

```js
{
  userId,
  experienceId,
  title,
  rawContentMd,
  polishedContentMd
}
```

## JournalEntry

```js
{
  userId,
  experienceId,
  activityId,
  title,
  contentMd
}
```

## Opportunity

```js
{
  userId,
  title,
  company,
  url,
  rawDescriptionMd,
  extractedSummaryMd,
  evaluationMd,
  status
}
```

## Document

```js
{
  userId,
  opportunityId,
  type,
  title,
  contentMd,
  status
}
```

## AiRun

```js
{
  userId,
  opportunityId,
  type,
  inputSummary,
  output,
  model,
  status,
  createdAt
}
```

---

# API Areas

## Auth

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

## Profile

```text
GET  /api/profile
PUT  /api/profile
PUT  /api/profile/core-context
```

## Experiences

```text
GET    /api/experiences
POST   /api/experiences
GET    /api/experiences/:id
PUT    /api/experiences/:id
DELETE /api/experiences/:id
```

## Activities

```text
GET    /api/experiences/:experienceId/activities
POST   /api/experiences/:experienceId/activities
PUT    /api/activities/:id
DELETE /api/activities/:id
```

## Journal

```text
GET    /api/journal
POST   /api/journal
GET    /api/journal/:id
PUT    /api/journal/:id
DELETE /api/journal/:id
POST   /api/journal/:id/convert-to-activity
```

## Opportunities

```text
GET    /api/opportunities
POST   /api/opportunities
GET    /api/opportunities/:id
PUT    /api/opportunities/:id
DELETE /api/opportunities/:id
POST   /api/opportunities/:id/extract
POST   /api/opportunities/:id/evaluate
```

## Documents

```text
GET    /api/documents
POST   /api/documents
GET    /api/documents/:id
PUT    /api/documents/:id
DELETE /api/documents/:id
POST   /api/opportunities/:id/generate-cover-letter
```

## AI

```text
POST /api/ai/polish-experience
POST /api/ai/polish-activity
POST /api/ai/extract-opportunity
POST /api/ai/evaluate-fit
POST /api/ai/generate-cover-letter
POST /api/ai/compare-opportunities
```

These may be direct endpoints or internal service functions triggered by domain endpoints.

---

# UX Direction

The project should feel more like a career workspace than a form-heavy admin system.

## UX Principles

- Make rough input easy.
- Let users dump messy notes without pressure.
- Show polished AI output beside raw input.
- Treat experiences and activities as reusable cards.
- Make AI reasoning visible.
- Keep generated documents editable.
- Use custom widgets to make the app feel distinctive.
- Prioritise speed and usefulness over perfect design.

---

# Screen Index

## Public Screens

### 1. Landing Page

Purpose:
- Explain the product.
- Encourage sign-up/login.

Data:
- Static content.

Components:
- Hero
- Product summary
- Feature cards
- CTA buttons

---

## Auth Screens

### 2. Login

Data:
- email
- password

Actions:
- login
- redirect to dashboard

### 3. Register

Data:
- name
- email
- password

Actions:
- create account
- redirect to profile setup

---

## App Screens

### 4. Dashboard

Purpose:
- User's home base.

Data:
- profile completion status
- recent experiences
- recent opportunities
- recent documents
- suggested next actions

Components:
- Sidebar
- Header
- ProfileCompletionWidget
- RecentExperienceCards
- OpportunityStatusPanel
- QuickActionButtons

---

### 5. Profile / Core Context

Purpose:
- Manage user profile, career state, career direction, and core resume.

Data:
- user profile
- coreContext
- core resume document

Components:
- ProfileForm
- CoreContextEditor
- ResumeUploadCard
- CareerDirectionPanel

---

### 6. Experiences Index

Purpose:
- Browse all experiences.

Data:
- list of experiences
- filters by type, technology, date, keyword

Components:
- ExperienceCard
- ExperienceFilterBar
- CreateExperienceButton

---

### 7. Experience Detail

Purpose:
- View and manage one experience.

Data:
- experience
- activities
- journal entries
- linked documents

Components:
- ExperienceHeader
- ExperienceSummaryPanel
- ActivityList
- JournalPanel
- AIImproveExperienceButton

---

### 8. Activity Detail

Purpose:
- View and edit an activity.

Data:
- activity raw description
- polished summary
- skills
- technologies
- outcomes
- linked journal entries

Components:
- RawActivityEditor
- PolishedActivityPanel
- SkillTagList
- ResumeBulletList
- AIImproveActivityButton

---


### 9. Journal

Purpose:
- Capture rough professional notes.

Data:
- journal entries
- filters by experience, activity, tag, date

Components:
- JournalEntryEditor
- JournalTimeline
- ConvertToActivityButton
- TagFilter

---

### 10. Opportunities Index

Purpose:
- Browse saved opportunities.

Data:
- opportunity list
- statuses
- fit scores if evaluated

Components:
- OpportunityCard
- StatusFilter
- CompareOpportunitiesTray

---

### 11. Opportunity Detail

Purpose:
- Review a job and generate AI outputs.

Data:
- raw job description
- extracted requirements
- fit evaluation
- generated documents

Components:
- OpportunityHeader
- JobDescriptionPanel
- ExtractedRequirementsPanel
- FitEvaluationPanel
- RelevantExperienceWidget
- GenerateCoverLetterButton

---

### 12. Document Detail

Purpose:
- View and edit generated documents.

Data:
- document content
- linked opportunity
- source experiences and activities
- version history

Components:
- DocumentEditor
- SourceEvidencePanel
- VersionSelector
- ExportButton

---

### 13. Opportunity Compare

Purpose:
- Compare selected opportunities.

Data:
- selected opportunities
- extracted requirements
- evaluations
- user core context

Components:
- ComparisonTable
- FitScoreCards
- RecommendationPanel
- CareerAlignmentWidget

---

# Component Hierarchy Examples

## 4. Dashboard

```text
DashboardPage
  AppShell
    Sidebar
    TopBar
    DashboardGrid
      ProfileCompletionWidget
      QuickActionsPanel
      RecentExperiencesPanel
        ExperienceMiniCard
      RecentOpportunitiesPanel
        OpportunityMiniCard
      RecentDocumentsPanel
        DocumentMiniCard
```

## 11. Opportunity Detail

```text
OpportunityDetailPage
  AppShell
    OpportunityHeader
    OpportunityWorkspace
      JobDescriptionPanel
      ExtractedRequirementsPanel
      FitEvaluationPanel
      RelevantExperienceWidget
      DocumentGenerationPanel
```

## 7. Experience Detail

```text
ExperienceDetailPage
  AppShell
    ExperienceHeader
    ExperienceOverviewPanel
    ActivitySection
      ActivityCard
    JournalSection
      JournalEntryCard
      JournalEntryEditor
```

---

# State and Data Binding

## 4. Dashboard

Fetches:

```text
GET /api/profile
GET /api/experiences?limit=5
GET /api/opportunities?limit=5
GET /api/documents?limit=5
```

## 5. Profile Screen

Fetches:

```text
GET /api/profile
```

Updates:

```text
PUT /api/profile
PUT /api/profile/core-context
```

## 6. Experiences Index

Fetches:

```text
GET /api/experiences
```

## 7. Experience Detail

Fetches:

```text
GET /api/experiences/:id
GET /api/experiences/:id/activities
GET /api/journal?experienceId=:id
```

## 11. Opportunity Detail

Fetches:

```text
GET /api/opportunities/:id
GET /api/documents?opportunityId=:id
```

Actions:

```text
POST /api/opportunities/:id/extract
POST /api/opportunities/:id/evaluate
POST /api/opportunities/:id/generate-cover-letter
```

## 12. Document Detail

Fetches:

```text
GET /api/documents/:id
```

Updates:

```text
PUT /api/documents/:id
```

---

# Suggested First Build Order

1. Set up repo structure.
2. Implement Express server.
3. Connect MongoDB.
4. Create User model and authentication.
5. Create Profile and Core Context editor.
6. Create Experience CRUD.
7. Create Activity CRUD.
8. Create Opportunity CRUD.
9. Add AI service skeleton.
10. Add AI experience/activity polishing.
11. Add opportunity extraction.
12. Add fit evaluation.
13. Add cover letter generation.
14. Add document saving.
15. Add dashboard and UX polish.

---

# Future Technical Enhancements

Potential future improvements:

- file upload parsing for resumes and project documents
- embeddings/vector search over experiences and documents
- richer document export to PDF/DOCX
- browser extension for saving jobs
- opportunity status pipeline
- automated application tracker
- analytics over skills and job market alignment
- deployment to Render, Railway, Vercel, or AWS
- Docker Compose for local development
