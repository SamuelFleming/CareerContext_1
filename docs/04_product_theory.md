# CareerContext — Product Theory

## Purpose of This Document

This document captures the conceptual theory behind CareerContext.

The goal is to explain the rationale of the solution concepts as a theoretical foundation for the data model, screen design, API contract, AI prompting, and portfolio story. CareerContext should not become a generic cover letter generator. It should be understood as a **career evidence system**.

---

## Central Product Thesis

CareerContext is built on the idea that strong job applications depend on reusable career evidence. The application CareerContext should help a user collect, organise, refine, retrieve, and apply that evidence.

The central product thesis is:

> CareerContext helps a user collect career evidence and later project it toward a specific opportunity.

This means generated documents should not be created from generic AI assumptions. They should be grounded in the user's actual profile, core career context, experiences, activities (including raw work notes), and selected opportunity.

---

## The Core Relationship

The main relationship in the application is:

```text
Core Context
→ Experiences
→ Activities
→ Journal Entries
→ Opportunities
→ Evaluations
→ Documents
```

Each concept plays a different role.

| Concept | Role in the Product |
|---|---|
| Core Context | The user's current career narrative and intended direction |
| Experience | A major container of professional, academic, or project-based evidence |
| Activity | A specific reusable proof point inside an experience |
| Journal Entry | Raw time-based notes that may later become structured evidence |
| Opportunity | An external target with requirements, expectations, and signals |
| Evaluation | AI-supported reasoning about the fit between user evidence and an opportunity |
| Document | A generated or uploaded artefact derived from user evidence and opportunity needs |

---

# The Evidence Model

## Evidence Is Built in Layers

CareerContext treats user experience as layered evidence.

```text
Raw Notes / Journal Entries
→ Activities
→ Experiences
→ Career Profile
```

Each layer has a different purpose.

## Raw Notes (Journal Entries)

Raw notes are the user's least structured input. They may include:

- work notes
- rough reflections
- task descriptions
- code snippets and implementation details
- problems solved
- project observations
- etc

Raw notes are valuable because they capture detail close to when the work happened. For the purpose of the app, the idea is for raw notes to be abstracted as '**Journal Entries**' which are essentially timestamped captures of raw professional context.
> The ratioale for 'Journal' Entries are primarily a UI feature to encourage consistent usage of the app as a workspace for career (activity/experience) evidence - the relational concept for these is intended to be fairly basic (for instance, no dumping of journal enties and the ML/AI calssification/extraction into existsing vs new activities => that would be an out of scope concpet)

They exist because users should not need to perfectly structure their experience upfront. A user should be able to dump messy notes and organise them later. A Journal Entry can be:

- specific to an Experience (required)
- attached to an existing Activity
- converted into a new Activity
- used as supporting evidence for an Activity
- ignored or archived
- used to help generate polished summaries

## Activities

Activities are the most important reusable evidence unit in the application. An Activity represents a specific piece of work, contribution, responsibility, achievement, or learning.

Examples:
- Implemented an Angular upgrade
- Designed an idempotent SQL migration script
- Built .NET API endpoints for an internal system
- Led backend architecture for a university-industry project
- Created a MERN stack booking interface
- Created an experience collation app to support my Job hunt
- Produced project documentation
- Coordinated a technical team decision
- Kaggle Competition

Activities should be specific enough to use in a cover letter, resume bullet, interview answer, or job fit evaluation.

## Experiences

Experiences are larger containers that group Activities.

Examples:

- QLD Digital Graduate Developer
- BEDA Events Calendar Project (University Project for Real-world client)
- IFN666 Campsite Booking Interface (University Project taken beyond as a portfolio project)
- Spotify SongMap (a half-finished, but vital learning university project)
- University course work
- Personal portfolio projects
- Kaggle Competitions

An Experience gives context to Activities by answering:

- Where did this happen?
- What was my role?
- What period did it occur in?
- What technologies were involved?
- What was the broader purpose?

## Core Context

Core Context is the user's career narrative.

It should explain:

- where the user is currently at
- what the user is currently doing
- what they are trying to move toward
- what kind of work they want more of
- what technologies or domains they are interested in
- what role direction they are pursuing
- what constraints or preferences matter

Core Context is not the same as a resume. It is more personal, strategic, and directional.

It gives AI the user's current positioning.

Example:

> I am dual bachelor qualified in Computer Science and Business Management, currently completing a master's degree and working in a full-stack .NET public sector role. I am interested in modern web technologies, AI-first development, and roles with more autonomy, ownership, and technical growth.

---

# The Opportunity Model

An Opportunity is an external target.

It may be:

- a job advertisement
- an internship
- a graduate program
- a freelance role / job for bid
- a contract opportunity
- an internal role
- a speculative company target

The Opportunity contains the external language of the market.

This includes:

- required skills
- desired skills
- responsibilities
- seniority signals
- domain expectations
- cultural signals
- technology stack
- application instructions
- company language

CareerContext should translate this external opportunity into structured requirements so it can be compared against the user's internal evidence.

---

# The Evaluation Model

An Evaluation compares the user's stored evidence against an Opportunity.

Evaluation should not simply ask: "Is this user good?"

It should ask:

- What evidence supports this application?
- Which Activities best match the opportunity?
- Which Experiences are most relevant?
- What parts of the user's Core Context align with this role?
- What gaps or weak areas exist?
- What positioning strategy would make sense?
- Is this role worth applying for?
- What should the user emphasise?

An Evaluation is therefore a reasoning artefact.

It should produce outputs such as:

- fit summary
- strengths
- gaps
- relevant evidence
- suggested application angle
- recommended activities to mention
- possible risks
- confidence level

---

# The Document Model

A Document is a concrete output.

Documents may include:

- uploaded core resume
- generated cover letter
- targeted resume summary
- resume bullet suggestions
- opportunity evaluation report
- application notes

The key theory is:

> A generated document is a projection of selected user evidence toward a specific opportunity.

For example, a cover letter should be generated from:

```text
Core Context
+ selected Experiences
+ selected Activities
+ relevant Journal-derived evidence
+ Opportunity requirements
```

The generated document should not invent unsupported claims.

---

# The AI Transformation Model

AI is used to transform content between states.

```text
Raw → Structured
Structured → Retrieved
Retrieved → Evaluated
Evaluated → Generated
Generated → Reviewed
Reviewed → Stored
```

Raw to Structured

- AI takes messy user input and suggests structured summaries, skills, technologies, outcomes, and reusable bullets.

Structured to Retrieved

- AI or search logic identifies which stored Activities and Experiences are most relevant to an Opportunity.

Retrieved to Evaluated

- reasons over the retrieved evidence and opportunity requirements to assess fit.

Evaluated to Generated

- AI drafts cover letters and other documents using the user's evidence and the opportunity profile.

Generated to Reviewed

- The user reviews, edits, accepts, rejects, or regenerates the output.

Reviewed to Stored

- Approved content is stored as a Document or updated profile evidence.

---

## Human-in-the-Loop Principle

CareerContext should keep the user in control.

AI can suggest, polish, retrieve, evaluate, and generate. However, the user should approve meaningful changes before they become part of the persistent profile.

This matters because career evidence is personal and reputational.

The app should preserve:

- raw input
- AI suggestions
- approved/polished content
- generated documents
- source evidence links

---

## Evidence Grounding Principle

Generated content should be grounded in stored evidence.

The app should aim to show:

- which Experiences were used
- which Activities were used
- which Opportunity requirements were targeted
- whether claims are directly supported or inferred

This gives the product a stronger trust model and a better portfolio story.

---

# Professional Journal Principle

CareerContext should encourage ongoing experience capture, not just one-off job application work. The more the user journals and stores Activities, the more useful the solution becomes, and it's focus shifts from Job hunt to management/viewership of their professional state.

This creates an evolutionary loop:

```text
User captures more work
→ The evidence base improves
→ Opportunity evaluations become stronger
→ Generated documents become more accurate
→ User gets more value
→ User is encouraged to keep capturing work
```

This is why the Journal feature matters. It lowers the friction of capturing experience before the user knows how that experience will be useful.

---

# Product Boundary

CareerContext is not:

- a generic chatbot
- a generic resume builder
- a job board scraper
- a full applicant tracking system
- a replacement for user judgement

CareerContext is:

- a career evidence workspace
- a professional journal
- an AI-assisted application companion
- a context management layer for job applications
- a portfolio demonstration of AI-first software design

---

# Design Implications

This product theory implies several design decisions:

1. **Activities should be treated as first-class entities.**
   - They are the most reusable career evidence unit.

2. **Journal Entries should remain separate from Activities.**
   - They support low-friction capture before structure exists - but they should be bound to experiences.

3. **Core Context should live on the user profile.**
   - It gives AI strategic context for evaluations and documents, and should be content the user is responsible for keeping up to date.

4. **Opportunities should be structured after capture.**
   - Raw job descriptions need to become comparable requirement objects.

5. **Documents should link back to source evidence.**
   - This supports trust, explainability, and future editing.

6. **AI outputs should be reviewable.**
   - The user remains responsible for final career claims.

7. **The API contract should be derived from flows and screens.**
   - Endpoints should exist because the UX requires them, not because entities exist in isolation.
