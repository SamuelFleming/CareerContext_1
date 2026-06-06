# CareerContext — Data Model

## Purpose of This Document

This document defines the initial data model for the CareerContext MVP.

The model is designed for a MERN stack application using MongoDB and Mongoose. It is intentionally practical rather than final. The model should evolve as the flows, screens, and API contract become clearer.

The API contract should not be derived from this document alone. It should be derived from:

```text
Flows
→ Screens
→ Screen data needs
→ Data model
→ API contract
```

---

# Modelling Principles

### 1. User-Owned Data

Almost every major entity belongs to a User. This keeps the MVP simple and avoids complex access rules.

### 2. Raw and Polished Data Should Coexist

The app should preserve rough user input as well as AI-polished content. This supports:

- transparency
- review
- future reprocessing
- user trust
- portfolio explainability

### 3. Activities Are the Core Evidence Unit

**Activities** are the **most important unit** for reuse in evaluations, cover letters, resume bullets, and interview preparation.

### 4. Journal Entries Should Lower Capture Friction

Journal Entries should allow users to capture messy notes without needing to decide immediately how they fit into the broader career profile. This implies a mechanism of being able to allocate entries to particular Experience and/or Activities. Note:


### 5. Generated Documents Should Link Back to Evidence

Documents should be traceable to the Experiences, Activities, Opportunities, and AI runs that informed them.

### 6. AI Runs Should Be Logged

AI interactions should be recorded for debugging, traceability, and portfolio demonstration.

---

# Entity Relationship Overview

```text
User
  ├── Profile / Core Context
  ├── Documents
  ├── Experiences
  │     ├── Activities
  │     └── Journal Entries
  ├── Opportunities
  │     ├── Evaluations
  │     └── Generated Documents
  └── AiRuns
```

## Relationship Summary

| Entity | Relationship |
|---|---|
| User | Has one profile and many experiences, opportunities, documents, journal entries, and AI runs |
| Experience | Belongs to one user and has many activities and journal entries |
| Activity | Belongs to one experience and one user |
| JournalEntry | Belongs to one user and may link to an experience and/or activity |
| Opportunity | Belongs to one user and may have evaluations and documents |
| Evaluation | Belongs to one user and one opportunity |
| Document | Belongs to one user and may link to an opportunity |
| AiRun | Belongs to one user and may link to an opportunity, experience, activity, document, or journal entry |

---

# Entity Definitions

## User

Represents an authenticated person using the app.

### Fields

```js
{
  _id,
  email,
  passwordHash,
  name,
  headline,
  coreContext,
  currentRole,
  targetRole,
  targetTechnologies,
  careerInterests,
  coreResumeDocumentId,
  createdAt,
  updatedAt
}
```

### Notes

`coreContext` should remain flexible and user-authored. It may be a long text field in the MVP.

The fields `currentRole`, `targetRole`, `targetTechnologies`, and `careerInterests` can support UI widgets and filtering, but the main narrative should live in `coreContext`.

---

## Experience

Represents a major block of career, project, academic, or professional context.

### Fields

```js
{
  _id,
  userId,
  type,
  title,
  organisation,
  role,
  dateStart,
  dateEnd,
  isCurrent,
  overviewRaw,
  overviewPolished,
  technologies,
  skills,
  sourceDocumentIds,
  createdAt,
  updatedAt
}
```

### Type Options

```text
job
project
course
certification
volunteering
personal_project
other
```

### Notes

An Experience should provide context for Activities.

For MVP simplicity, different kinds of experience can share one schema and be distinguished by `type`.

Later, specific subtypes can be added if required.

---

## Activity

Represents a specific reusable piece of career evidence inside an Experience.

### Fields

```js
{
  _id,
  userId,
  experienceId,
  title,
  rawDescription,
  polishedSummary,
  bulletPoints,
  technologies,
  skills,
  outcomes,
  senioritySignals,
  evidenceStrength,
  linkedJournalEntryIds,
  createdAt,
  updatedAt
}
```

### Notes

Activities are the main evidence units used by AI when evaluating opportunities and generating documents.

`evidenceStrength` can be a simple enum or numeric value later. In the MVP, it may be omitted or manually assigned.

### Evidence Strength Options

```text
low
medium
high
```

---

## JournalEntry

Represents rough timestamped notes that may later become structured evidence.

### Fields

```js
{
  _id,
  userId,
  experienceId,
  activityId,
  title,
  content,
  tags,
  codeSnippets,
  sourceDate,
  convertedToActivityId,
  status,
  createdAt,
  updatedAt
}
```

### Status Options

```text
raw
reviewed
linked
converted
archived
```

### Notes

A JournalEntry may link to:

- no Experience yet
- one Experience
- one Activity
- a future converted Activity

This flexibility allows low-friction capture.

---

## Opportunity

Represents a job or professional opportunity being considered by the user.

### Fields

```js
{
  _id,
  userId,
  title,
  company,
  role,
  url,
  origin,
  rawDescription,
  extractedRequirements,
  extractedSkills,
  extractedResponsibilities,
  seniorityLevel,
  workMode,
  location,
  status,
  createdAt,
  updatedAt
}
```

### Status Options

```text
saved
extracted
evaluated
applied
interviewing
rejected
archived
```

### Seniority Options

```text
graduate
junior
mid
senior
lead
unknown
```

### Work Mode Options

```text
onsite
hybrid
remote
unknown
```

### Notes

The raw job description should always be preserved.

Extracted fields are AI-assisted and should be reviewable/editable.

---

## Evaluation

Represents an AI-supported assessment of the user's fit for an Opportunity.

### Fields

```js
{
  _id,
  userId,
  opportunityId,
  summary,
  fitScore,
  strengths,
  gaps,
  recommendedPositioning,
  relevantExperienceIds,
  relevantActivityIds,
  evidenceNotes,
  confidence,
  aiRunId,
  createdAt,
  updatedAt
}
```

### Notes

The MVP may store only the latest evaluation on the Opportunity, but a separate Evaluation entity is cleaner because it supports versioning and comparison later.

`fitScore` should be treated as directional, not mathematically objective.

---

## Document

Represents uploaded, generated, or edited written artefacts.

### Fields

```js
{
  _id,
  userId,
  opportunityId,
  type,
  title,
  content,
  filePath,
  mimeType,
  version,
  status,
  sourceExperienceIds,
  sourceActivityIds,
  sourceJournalEntryIds,
  sourceEvaluationId,
  aiRunId,
  createdAt,
  updatedAt
}
```

### Type Options

```text
core_resume
cover_letter
targeted_resume
resume_summary
resume_bullets
application_notes
evaluation_report
other
```

### Status Options

```text
draft
final
archived
```

### Notes

For MVP, generated documents can be stored as plain text or Markdown.

PDF/DOCX export can be deferred.

---

## AiRun

Represents one AI interaction.

### Fields

```js
{
  _id,
  userId,
  type,
  targetEntityType,
  targetEntityId,
  opportunityId,
  inputSummary,
  promptVersion,
  model,
  output,
  status,
  errorMessage,
  createdAt
}
```

### Type Options

```text
experience_polish
activity_polish
journal_to_activity
opportunity_extract
fit_evaluation
cover_letter_generation
opportunity_compare
resume_summary_generation
other
```

### Status Options

```text
requested
completed
failed
rejected
accepted
```

### Notes

The app does not need to store every full prompt in MVP, but it should at least store:

- AI run type
- target entity
- model
- output
- status
- created date

This helps debugging and demonstrates AI workflow design.

---

# Suggested Mongoose Model Files

```text
server/src/models/User.js
server/src/models/Experience.js
server/src/models/Activity.js
server/src/models/JournalEntry.js
server/src/models/Opportunity.js
server/src/models/Evaluation.js
server/src/models/Document.js
server/src/models/AiRun.js
```

---

# Suggested Indexes

## User

```js
email: unique
```

## Experience

```js
userId
userId + type
userId + technologies
```

## Activity

```js
userId
experienceId
userId + technologies
userId + skills
```

## JournalEntry

```js
userId
experienceId
activityId
userId + createdAt
tags
```

## Opportunity

```js
userId
userId + status
userId + company
userId + createdAt
```

## Document

```js
userId
opportunityId
userId + type
```

## AiRun

```js
userId
targetEntityType + targetEntityId
opportunityId
createdAt
```

---

# MVP Data Model Decisions

## Keep Experience as One Flexible Model

Do not create separate Job, Project, and Course collections in the MVP.

Use:

```js
type: "job" | "project" | "course" | "certification" | "personal_project" | "other"
```

This keeps the implementation fast.

## Keep Core Context on User

Core Context should initially live directly on the User/Profile model.

It can be extracted into a separate Profile model later if profile complexity grows.

## Keep Journal Entries Separate

Journal Entries should not be collapsed into Activities.

The distinction is useful:

- JournalEntry = raw capture
- Activity = structured reusable evidence

## Use Separate Evaluation Entity

Even though Evaluation could be embedded on Opportunity, a separate entity better supports:

- history
- regeneration
- comparison
- traceability

## Use Document for Both Uploaded and Generated Content

A single Document model can represent:

- uploaded resume
- generated cover letter
- targeted resume content
- evaluation report

This keeps document handling consistent.

---

# Example Object Shapes

## Activity Example

```json
{
  "title": "OMS Joint Applicant Unlink Screen",
  "rawDescription": "Built Angular frontend components and .NET endpoints connecting to data access API.",
  "polishedSummary": "Implemented an internal operational workflow screen for unlinking joint applicants, spanning Angular UI components, .NET business API endpoints, and integration with the data access layer.",
  "bulletPoints": [
    "Built Angular components for an internal operational workflow.",
    "Implemented .NET API endpoints connecting business logic to the data access layer."
  ],
  "technologies": ["Angular", ".NET", "REST API"],
  "skills": ["frontend development", "backend integration", "internal systems"]
}
```

## Opportunity Example

```json
{
  "title": "Mid-Level Full Stack Developer",
  "company": "Example Company",
  "url": "https://example.com/job",
  "origin": "LinkedIn",
  "rawDescription": "We are looking for a full stack developer...",
  "extractedSkills": ["React", "Node.js", "MongoDB", "REST APIs"],
  "seniorityLevel": "mid",
  "status": "extracted"
}
```

## Evaluation Example

```json
{
  "summary": "This opportunity appears to align strongly with the user's full-stack experience and interest in modern web development.",
  "fitScore": 78,
  "strengths": [
    "Relevant full-stack API and frontend experience",
    "Evidence of technical leadership through university-industry project work"
  ],
  "gaps": [
    "Limited direct commercial MERN stack experience"
  ],
  "recommendedPositioning": "Emphasise transferable full-stack experience, recent MERN project work, and AI-first development interest."
}
```

---

# Future Data Model Enhancements

Future versions may add:

- Skill taxonomy
- Technology taxonomy
- Company entity
- Application entity
- Interview entity
- Contact/recruiter entity
- Vector embedding records
- Document chunk records
- Resume versioning
- Export metadata
- User preferences
- Prompt template versioning

---

# Open Questions

These should be resolved during solution design:

1. ~~Should `CoreContext` eventually become its own collection?~~
2. ~~Should Journal Entries support multiple Activity links?~~
3. ~~Should Activities support direct links to Documents?~~
4. ~~Should generated Documents store full source snapshots or only IDs?~~
5. ~~Should evaluations be regenerated each time an Opportunity changes?~~
6. Should AI outputs be stored before or only after user approval?
7. Should job application status live on Opportunity or a separate Application entity?
8. How much resume parsing is needed for MVP?
9. Should code snippets be stored as plain embedded objects or separate entities?
10. Should the MVP include embeddings/vector search or simple keyword/context selection first?
