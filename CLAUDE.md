

## 'CareerContext' - The Project Identity
> an AI-assisted career evidence system that helps users capture, organise, retrieve, and reuse their professional, academic, and project experience to evaluate job opportunities and generate tailored application documents.

### The Problem : How do prefessionals manage their career content?
* Strong job applications require more than a resume, they need tailored evidence: relevant experience, project details, technologies used, responsibilities, outcomes, and a clear career narrative.

* This information is usually scattered across mutliple different items, and even when AI tools can write good cover letters, the difficulty lies in consistently providing them with accurate, relevant, reusable career content.

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

## Current Development Status

| Phase | Focus | Status |
|-------|-------|--------|
| **Phase 1** | Auth, Profile, Dashboard shell | **Complete** — see `docs/devTickets/devCompletion.md` |
| **Phase 2** | Experience Evidence (backend + frontend) | **Backend complete** (tickets **200**–**206**); **frontend in progress** (tickets **211**–**215**) |
| **Phase 3+** | Opportunities, Documents, Journal, AI | Planned — do not implement early |

**Active work queue:** `docs/devTickets/devTickets_next.md`

**Phase 2 frontend tickets** (execute in order):

1. **211** — Evidence frontend foundation (routes, services, placeholders)
2. **212** — Experience Index vertical slice (Screen 6)
3. **213** — Experience Detail vertical slice (Screen 7)
4. **214** — Activity Detail vertical slice (Screen 8)
5. **215** — Dashboard evidence integration (replace Phase 1 mocks)

Backend APIs for Experience and Activity CRUD, workspace, and list pagination are ready. Wire the frontend against `docs/core-scope/08_api_contract.md` — do not assume mocks unless a ticket explicitly allows temporary fallback.

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
- Avoid implementing future phases early.
- If the codebase differs from the ticket, pause and report the mismatch in the plan.
- Apply the relevant Cursor rules when editing code:
  - `client/**/*` → `.cursor/rules/frontend.mdc`
  - `server/**/*` → `.cursor/rules/backend.mdc`
  - `docs/**/*` → `.cursor/rules/documentation.mdc`

## Agent workflow - Ticket methodology

Development should remain ticket-led. Tickets ideally should contain:

- status
- intent/objective
- scope / out of scope
- acceptance criteria
- agent planning checklist
- implementation notes
- completion notes

When prompted with a dev ticket:

1. Confirm the ticket exists — read the relevant `docs/devTickets/phase{N}/` file.
2. Read `CLAUDE.md` and check `docs/devTickets/devTickets_next.md` for queue position and dependencies.
3. Apply relevant `.cursor/rules/*.mdc` rules for the files you will touch.
4. Inspect current frontend, backend, service, model, route, and API contract files before writing code.
5. Plan the implementation scoped to the ticket, including:
   - writing the ticket (if prompted and/or it does not exist), or
   - updating the ticket with implementation notes.
6. Implement the smallest vertical slice that satisfies acceptance criteria.
7. Run available checks/builds where practical (`npm run dev` / `npm run build` in `client`, `node server.js` smoke paths in `server`).
8. Update ticket completion notes, `devCompletion.md` (if fully done), `devTickets_next.md`, and any required contract/doc updates.

**IMPORTANT**: Plan first. Do not jump straight into broad edits, specify any uncertainty or decision making.

## Sources of Truth

### Project/Solution Concepts
All high-level project specifications live in `docs/core-scope/` — start at [00_documentation_index.md](docs/core-scope/00_documentation_index.md). High-level ideation is in files 01–04; technical specs in 05 (data model), 06 (screen catalogue), 07 (screen-to-endpoint matrix), 08 (API contract).

### Design System
Artifacts for the design concept and UI themes are capture in `docs/design-concept/`. This includes the 
- [Design System](docs/design-concept/FigmaOutput_DesignSystem.md), 
- [Design Concept Examples](docs/design-concept/DesignConcept.pdf)

### Development
Development artifacts are maintained in the `docs/devTickets/`. This includes evolutionary grouping of tickets in 'phases' (Phases initially scoped in the [screen data matrix : development phase suggestions](docs/core-scope/07_screen_data_matrix.md#mvp-development-phase-suggestions)) such as Phase 1 (`docs/devTickets/phase1/`) and Phase 2 (`docs/devTickets/phase2/`). Also, dev completion registry in maintined in the form of [devCompletion.md](docs/devTickets/devCompletion.md) and [devTickets_next.md](docs/devTickets/devTickets_next.md).

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

If build, lint, or test scripts exist, prefer running the relevant available scripts for the area changed. If a script does not exist, report that clearly rather than inventing one.

Client build check:

```bash
cd client
npm run build
```