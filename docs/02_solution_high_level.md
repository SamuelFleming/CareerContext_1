# CareerContext — High-Level Solution

## Solution Summary

CareerContext is a MERN stack application where users build a persistent career profile made up of core context, experiences, activities, journal entries, opportunities, and generated documents.

AI is used to assist with:

- cleaning rough user-entered experience notes
- extracting structured information from job descriptions
- identifying relevant experiences for a job
- evaluating fit
- comparing opportunities
- generating cover letter and resume content

The database remains the source of truth. AI acts as an assistant layer over the user's stored career evidence.

---

## MVP Scope

### Included in MVP

- User registration and login
- User profile basics
- Core Context editor
- Core resume upload or paste
- Experience CRUD
- Activity CRUD
- Journal entry capture
- Opportunity CRUD
- AI-assisted opportunity extraction
- AI-assisted experience/activity polishing
- AI fit evaluation
- AI cover letter generation
- Saved generated documents
- Basic opportunity comparison

### Excluded from MVP

- Deployment
- Payment
- Admin dashboard
- Real job board scraping
- Production-grade document formatting
- Multi-user sharing
- Complex permissions
- Advanced analytics
- Mobile app

---

## Key Concepts

## User

A person using the app to manage career context and job applications.

## Core Context

A user-written unstructured profile summary describing:

- where the user is currently at in their career
- what the user is currently doing
- what the user is trying to move toward
- preferred technologies
- desired role direction
- professional interests
- career aspirations
- constraints or preferences

Example:

> I am dual bachelor qualified in Computer Science and Business Management, currently finishing a master's degree and working in a full-stack .NET public sector role. I am interested in modern web technologies, AI-first software development, and roles with more autonomy and ownership.

Core Context is intentionally user-authored. AI may help polish or summarise it later, but the MVP should preserve the user's own voice and intent.

## Experience

A major container of professional or academic experience.

Examples:

- QLD Digital Graduate Developer
- BEDA Events Calendar Project
- IFN666 Campsite Booking Interface
- Spotify SongMap
- University course or certification

## Activity

A structured piece of evidence belonging to an experience.

Examples:

- Angular upgrade
- SQL migration scripts
- API endpoint implementation
- technical leadership
- architecture design
- project documentation
- frontend component development

## Journal Entry

A rough, timestamped note that may contain unstructured content, technical details, code snippets, progress notes, or reflections.

Journal entries can later be linked to activities or transformed into polished activity summaries.

## Opportunity

A job, internship, contract, or other professional opportunity the user is considering.

## Document

A stored piece of written content such as:

- core resume
- cover letter
- targeted resume summary
- generated application notes
- opportunity evaluation report

---

# Core Flows

## Flow 1 — Profile Setup Happy Path

1. User signs up.
2. User creates basic profile.
3. User writes Core Context.
4. User uploads or pastes core resume.
5. App stores profile and resume.
6. User lands on dashboard.

### Value Delivered

The app now has enough basic context to support future experience capture and job evaluation.

---

## Flow 2 — Experience Capture Happy Path

1. User creates an Experience.
2. User enters rough overview, role, dates, organisation, and technologies.
3. User adds one or more Activities.
4. User optionally adds Journal Entries.
5. User asks AI to polish rough experience/activity notes.
6. User reviews AI output.
7. User saves approved version.

### Value Delivered

The user begins building a reusable career evidence base.

---

## Flow 3 — Journal to Activity Happy Path

1. User creates a rough Journal Entry.
2. Journal Entry may include messy notes, task details, code snippets, links, or reflections.
3. User selects "Convert to Activity" or "Attach to Existing Activity".
4. AI suggests:
   - activity title
   - polished summary
   - skills
   - technologies
   - outcomes
   - possible resume bullets
5. User reviews and saves.

### Value Delivered

The app supports professional journaling without forcing the user to structure everything upfront.

---

## Flow 4 — Opportunity Capture Happy Path

1. User creates an Opportunity.
2. User pastes a job description.
3. User optionally adds company, role title, URL, and origin/source.
4. AI extracts:
   - required skills
   - desired skills
   - responsibilities
   - seniority level
   - keywords
   - likely role focus
5. User reviews and saves extracted opportunity profile.

### Value Delivered

The job description becomes structured and usable for comparison, evaluation, and document generation.

---

## Flow 5 — Fit Evaluation Happy Path

1. User opens an Opportunity.
2. User selects "Evaluate Fit".
3. App sends the opportunity, Core Context, resume summary, experiences, and activities to AI.
4. AI produces:
   - fit summary
   - strongest matching experiences
   - strongest activities
   - gaps or weak areas
   - positioning strategy
   - suggested application angle
5. User saves the evaluation.

### Value Delivered

The user gets a grounded view of whether the role is worth applying for and how to position themselves.

---

## Flow 6 — Cover Letter Happy Path

1. User opens an Opportunity.
2. User selects "Generate Cover Letter".
3. App retrieves relevant Core Context, experience, activity, and opportunity data.
4. AI generates a draft cover letter.
5. User edits the letter.
6. User saves the document against the opportunity.

### Value Delivered

The user receives a tailored document grounded in their stored experience.

---

## Flow 7 — Opportunity Comparison Happy Path

1. User selects two or more Opportunities.
2. User selects "Compare".
3. AI compares opportunities based on:
   - experience fit
   - technology alignment
   - career direction
   - growth potential
   - application strength
   - gaps
4. User receives a comparison summary.

### Value Delivered

The user can prioritise applications more intelligently.

---

# Authentication and Roles

## MVP Roles

### Guest

Can view landing page and product explanation only.

### Authenticated User

Can manage their own:

- profile
- core context
- documents
- experiences
- activities
- journal entries
- opportunities
- AI-generated outputs

## Not Included in MVP

- Admin role
- organisation role
- shared workspaces
- public profiles

---

# Critical State Changes

## User

```text
Unauthenticated → Registered → Authenticated
```

## Profile

```text
Incomplete → Basic Profile Created → Core Context Added → Resume Added
```

## Experience

```text
Draft → AI Polished → User Approved → Active
```

## Activity

```text
Raw → AI Structured → User Approved → Linked to Experience
```

## Journal Entry

```text
Captured → Reviewed → Linked to Activity OR Converted to Activity
```

## Opportunity

```text
Saved → Extracted → Evaluated → Applied / Archived
```

## Document

```text
Generated Draft → Edited → Final / Archived
```

## AI Output

```text
Requested → Generated → Reviewed → Accepted / Rejected / Regenerated
```

---

# The Role of AI

AI is not the system of record.

The database stores the user's approved career data. AI helps transform and reason over that data.

## AI Responsibilities

1. **Extract**
   - Turn raw job descriptions into structured opportunity data.

2. **Polish**
   - Turn rough notes into clearer experience and activity summaries.

3. **Structure**
   - Identify skills, technologies, outcomes, responsibilities, and role signals.

4. **Retrieve**
   - Help identify which experiences and activities are relevant to an opportunity.

5. **Evaluate**
   - Compare the user's profile against job requirements.

6. **Generate**
   - Draft cover letters, resume summaries, and application notes.

7. **Explain**
   - Show why certain experiences were selected.

## AI Guardrails

The system should aim to:

- avoid inventing experience details
- distinguish between known evidence and inferred positioning
- show which experiences informed a generated document
- allow the user to approve or reject AI outputs
- store generated outputs as drafts, not final truth
- preserve raw user input alongside AI-polished versions
