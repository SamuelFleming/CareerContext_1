

## 'CareerContext' - The Project Identity
> an AI-assisted career evidence system that helps users capture, organise, retrieve, and reuse their professional, academic, and project experience to evaluate job opportunities and generate tailored application documents.

[Please refer to `docs/core-scope/` documents 01, 02, 03 and 04 for expanded more information on the project Identity. [00_documentation_index.md](docs/core-scope/00_documentation_index.md)]

### The Problem : How do prefessionals manage their career content?
* Strong job applications require more than a resume, they need tailored evidence: relevant experience, project details, technologies used, responsibilities, outcomes, and a clear career narrative.

* The problem is that this information is usually scattered across: resumes, rough work notes, university documents, GitHub repositories, cover letter drafts, LLM conversations, job descriptions, the person's  memory etc. Even when AI tools can write good cover letters, the difficult part is consistently providing them with accurate, relevant, reusable context.

### The Solution - A Career Evidence Workspace
CareerContext is an AI-assisted career evidence and job application workspace that helps users store, organise, retrieve, and reuse their professional, academic, and project experience.

It acts as a persistent personal career context layer that can evaluate job opportunities and generate grounded application documents such as cover letters and targeted resume content.

### MVP Scope Summary 
The MVP focuses on four core capabilities:

1. **Profile and Core Context**
   - Store basic user profile information.
   - Store a user-written career context summary.
   - Upload or paste a core resume.

2. **Experience and Activity Capture**
   - Create experiences such as jobs, projects, courses, and certifications.
   - Add activities, achievements, responsibilities, notes, and technologies.
   - Support rough journal-style entries that can later be converted into structured activities.

3. **Opportunity Management**
   - Add job opportunities by pasting job descriptions.
   - Store role, company, origin/source, and opportunity notes.
   - Use AI to extract requirements, skills, responsibilities, and role signals.

4. **AI-Assisted Information Management, Evaluations and Documents**
   - Evaluate user fit against an opportunity.
   - Identify relevant experiences and activities.
   - Compare multiple opportunities.
   - Generate cover letter drafts and targeted resume content.

### Out of Scope for Initial MVP

The first MVP will not focus on:
- production deployment
- job board scraping
- payment systems
- complex document formatting
- multi-user collaboration
- browser extensions
- full applicant tracking workflows
- advanced analytics dashboards


## The Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite, React Router, Tailwind CSS 4 |
| Backend | Node.js, Express 5, JWT auth |
| Database | MongoDB, Mongoose |
| Markdown | `react-markdown`, `remark-gfm` |

## Working Rules

- Prefer small, ticket-aligned changes over broad un-guided refactors.
- Check `docs/devTickets/devTickets_next.md` before introducing new feature scope.
- Keep backend, frontend, and docs aligned when adding or changing API behaviour.
- Do not invent new endpoint shapes without checking `docs/core-scope/08_api_contract.md`.
- Do not replace established architecture unless the user explicitly asks for a refactor.

## Sources of Truth

### Project/Solution Concepts
All high-level project specifications live in `docs/core-concepts/` which includes various numbered .md files ([00_documentation_index.md](docs/core-scope/00_documentation_index.md)). Please see high-level project ideation (written before development) in files 01, 02, 03 and 04, and then more technically oriented documents are maintained in 05, 06, 07, 08.

### Design System
Artifacts for the design concept and UI themes are capture in `docs/design-concept/`. This includes the 
- [Design System](docs/design-concept/FigmaOutput_DesignSystem.md), 
- [Design Concept Examples](docs/design-concept/DesignConcept.pdf)

### Development
Development artifacts are maintained in the `docs/devTickets/`. This includes evolutionary grouping of tickets in 'phases' (Phases initially scoped in the [screen data matrix : development phase suggestions](docs/core-scope/07_screen_data_matrix.md#mvp-development-phase-suggestions)) such as Phase 1 (`docs/devTickets/phase1/`) and Phase 2 (`docs/devTickets/phase2/`). Also, dev completion registry in maintined in the form of [devCompletion.md](docs/devTickets/devCompletion.md) and [devTickets_next.md](docs/devTickets/devTickets_next.md).