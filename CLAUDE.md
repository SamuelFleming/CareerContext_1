

## 'CareerContext' - The Project Identity
> **Problem**: *How do prefessionals manage tailored evidence of their professional capabilities?*


### The Solution - A Career Evidence Workspace
CareerContext is an AI-assisted career evidence and job application workspace that helps users store, organise, retrieve, and reuse their professional, academic, and project experience.

The product acts as a persistent personal career context layer: instead of repeatedly re-explaining experience to an AI assistant, users build a reusable evidence base made of profile context, experiences, activities, opportunities, and generated documents.

[ Expanded product scope lives in `docs/core-scope/`, especially documents 01, 02, 03, and 04. Start with `docs/core-scope/00_documentation_index.md` when unsure where to look. ]

### MVP Scope Summary 
The MVP focuses on four core capabilities:

1. **Profile and Core Context**
   - Store basic user profile information.
   - Store a user-written career context summary.
   - Upload or paste a core resume.

2. **Experience and Activity Capture**
   - Register experiences such as jobs, projects, courses, and certifications.
   - Add activities, achievements, responsibilities, notes, and technologies.
   - Support rough journal-style entries that can later be added/converted to structured activities.

3. **Opportunity Management**
   - Add job opportunities by pasting job descriptions. Store role, company, origin/source, and opportunity notes.
   - Use AI to extract requirements, skills, responsibilities, and role signals.

4. **AI-Assisted Information Management, Evaluations and Documents**
   - Utilise AI to refine/cleanup structured evidence
   - Evaluate user fit against an opportunity.
   - Identify relevant experiences and activities.
   - Compare multiple opportunities.
   - Generate cover letter drafts and targeted resume content.

#### Out of Scope for Initial MVP

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

- Prefer small (preferably ticket-aligned) changes over broad un-guided refactors.
- Check `docs/devTickets/devTickets_next.md` before introducing new feature scope.
- Keep backend, frontend, and docs aligned when adding or changing API behaviour.
- Do not invent new endpoint shapes without checking `docs/core-scope/08_api_contract.md`.
- Do not replace established architecture unless the user explicitly asks for a refactor.
- Avoid implementing future phases early.
- If the codebase differs from the ticket, pause and report the mismatch in the response.
- Do not run git operations (commit, push, branch, stash, etc.) unless the user explicitly requests them.
- Apply the relevant Cursor rules when editing code:
  - `client/**/*` → `.cursor/rules/frontend.mdc`
  - `server/**/*` → `.cursor/rules/backend.mdc`
  - `docs/**/*` → `.cursor/rules/documentation.mdc`

## Agent workflow

Before acting, classify the task:

1. **Plan Large Feature** — inspect repo/docs, create or update repo-local tickets, no application code changes.
2. **Develop Large Feature** — create tickets first, get plan approval, then implement one ticket at a time with completion notes.
3. **Implement Dev Ticket** — read the repo-local ticket, inspect code, plan, implement, update completion notes.
4. **Small Change** — make the smallest safe change.
5. **Audit / Diagnose** — inspect and report findings before changing code.

For multi-file work, plan first. Large-feature work must be ticket-scoped before application code changes. If docs, tickets, and code disagree, report the mismatch before broad edits. If highly uncertain on task classification, ask the user to specify the workflow mode.

## Sources of Truth

### Project/Solution Concepts
All high-level project specifications live in `docs/core-scope/` — start at [00_documentation_index.md](docs/core-scope/00_documentation_index.md). High-level ideation is in files 01–04; technical specs in 05 (data model), 06 (screen catalogue), 07 (screen-to-endpoint matrix), 08 (API contract).

### Design System
Artifacts for the design concept and UI themes are capture in `docs/design-concept/`. This includes the 
- Design System:`docs/design-concept/FigmaOutput_DesignSystem.md`, 
- Design Concept Examples: `docs/design-concept/DesignConcept.pdf`

### Development
- Development artifacts are maintained in the `docs/devTickets/`. This includes evolutionary grouping of tickets in 'phases' (Phases initially scoped in the `docs/core-scope/07_screen_data_matrix.md#mvp-development-phase-suggestions`). 
- Dev completion registry in maintained in the form of `docs/devTickets/devCompletion.md` and (`docs/devTickets/devTickets_next.md`.

## Common commands

Use the commands that exist in the current repo. Common defaults are:

Server:

```bash
cd server
npm install
node server.js
```

Client:

```bash
cd client
npm install
npm run dev
```