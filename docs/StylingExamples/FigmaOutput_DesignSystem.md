# CareerContext Design System

>
 **Design Philosophy**: CareerContext should feel like a living CV, evidence archive, and AI application workspace — not a form-based CRUD app and not just a document generator.

## Visual Language

### Core Principles

1. **Workspace-like**: The app feels like a professional workspace, not a traditional web app
2. **Document-inspired**: Surfaces and cards evoke the quality of CV paper and professional documents
3. **Professional but not corporate**: Warm, approachable, human — avoid cold SaaS aesthetics
4. **Subtle AI accent**: Intelligence feels helpful and unobtrusive, not flashy
5. **Evidence-first**: Content is the hero, UI fades into the background

---

## Color Palette

### Primary Colors

```css
/* Warm Professional - Primary Brand */
--primary-900: #1a1f2e;        /* Deep navy-charcoal, primary text */
--primary-800: #2c3449;        /* Headings, strong emphasis */
--primary-700: #3d4963;        /* Body text, interactive elements */
--primary-600: #4f5e7d;        /* Secondary text */
--primary-500: #6b7a99;        /* Muted text, borders */
--primary-400: #8896b2;        /* Disabled states */

/* Warm Accent - AI & Interactive */
--accent-600: #5b6fd8;         /* Primary interactive (AI features, links) */
--accent-500: #7284e0;         /* Hover states */
--accent-400: #8a9ae8;         /* Active states */
--accent-300: #a1aff0;         /* Subtle backgrounds */
--accent-200: #c5cef7;         /* Very subtle backgrounds */
--accent-100: #e8ebfc;         /* Lightest accent touch */

/* Warm Neutrals - Document/Paper Quality */
--neutral-000: #ffffff;        /* Pure white, cards */
--neutral-050: #fafbfc;        /* Slight off-white, background */
--neutral-100: #f4f5f7;        /* Subtle surface variation */
--neutral-200: #e8eaed;        /* Borders, dividers */
--neutral-300: #d4d7dd;        /* Input borders */
--neutral-400: #b4b9c3;        /* Placeholder text */
--neutral-500: #8b92a0;        /* Subtle text */

/* Evidence Card Accent */
--evidence-warm: #f9f3f0;      /* Warm paper background for evidence cards */
--evidence-border: #e6ddd7;    /* Subtle border for evidence cards */

/* Semantic Colors */
--success-600: #2d844e;        /* Success states */
--success-100: #e6f4ea;        /* Success backgrounds */

--warning-600: #d97706;        /* Warning states */
--warning-100: #fef3c7;        /* Warning backgrounds */

--error-600: #c92a2a;          /* Error states */
--error-100: #fee2e2;          /* Error backgrounds */

--info-600: #1971c2;           /* Info states */
--info-100: #e7f5ff;           /* Info backgrounds */
```
### Color Usage Guidelines

Backgrounds: Use --neutral-050 for main background, --neutral-000 for cards
Text:
Primary: --primary-900
Secondary: --primary-600
Muted: --neutral-500
Interactive elements: --accent-600 for primary actions
Evidence cards: Use --evidence-warm background with --evidence-border
AI features: Subtle --accent-300 backgrounds with --accent-600 accents

## Typography

### Font Families
```css
/* Headings - Professional Serif for CV-like quality */
--font-heading: 'Crimson Pro', 'Georgia', serif;

/* Body - Clean Sans-serif for workspace readability */
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Monospace - Technical evidence */
--font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
Type Scale
--text-xs: 0.75rem;      /* 12px - labels, captions */
--text-sm: 0.875rem;     /* 14px - secondary text */
--text-base: 1rem;       /* 16px - body text */
--text-lg: 1.125rem;     /* 18px - emphasized body */
--text-xl: 1.25rem;      /* 20px - h3 */
--text-2xl: 1.5rem;      /* 24px - h2 */
--text-3xl: 1.875rem;    /* 30px - h1 */
--text-4xl: 2.25rem;     /* 36px - display (dashboard name) */
--text-5xl: 3rem;        /* 48px - hero */

--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;

--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```
### Typography Usage

Dashboard / CV-like Headers

```css
.dashboard-name {
  font-family: var(--font-heading);
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  color: var(--primary-900);
  line-height: var(--leading-tight);
}

.section-heading {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  color: var(--primary-800);
  line-height: var(--leading-snug);
}
Body Text

.body-text {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  color: var(--primary-700);
  line-height: var(--leading-normal);
}

.body-secondary {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--font-normal);
  color: var(--primary-600);
  line-height: var(--leading-normal);
}
```

## Spacing & Layout
Spacing Scale
```css
--spacing-0: 0;
--spacing-1: 0.25rem;    /* 4px */
--spacing-2: 0.5rem;     /* 8px */
--spacing-3: 0.75rem;    /* 12px */
--spacing-4: 1rem;       /* 16px */
--spacing-5: 1.25rem;    /* 20px */
--spacing-6: 1.5rem;     /* 24px */
--spacing-8: 2rem;       /* 32px */
--spacing-10: 2.5rem;    /* 40px */
--spacing-12: 3rem;      /* 48px */
--spacing-16: 4rem;      /* 64px */
--spacing-20: 5rem;      /* 80px */
--spacing-24: 6rem;      /* 96px */
```

### Layout Principles

- Ample whitespace: Like a well-formatted CV or document
- Content max-width: 1200px for main content, 800px for reading content
- Consistent padding: Cards use --spacing-6 (24px) padding
- Grid gaps: Use --spacing-6 for card grids, --spacing-4 for list items


## Components
### Card Component
```css
.card {
  background: var(--neutral-000);
  border: 1px solid var(--neutral-200);
  border-radius: 8px;
  padding: var(--spacing-6);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02);
  transition: all 0.2s ease;
}

.card:hover {
  border-color: var(--neutral-300);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.03);
}

.card--evidence {
  background: var(--evidence-warm);
  border-color: var(--evidence-border);
}

.card--clickable { cursor: pointer; }

.card--clickable:hover {
  border-color: var(--accent-400);
}
```
Variants: Default · Evidence · Interactive

### Button Component
```css
.button-primary {
  background: var(--accent-600);
  color: white;
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.button-primary:hover {
  background: var(--accent-500);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(91, 111, 216, 0.2);
}

.button-secondary {
  background: var(--neutral-000);
  color: var(--primary-800);
  border: 1px solid var(--neutral-300);
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.button-secondary:hover {
  background: var(--neutral-100);
  border-color: var(--neutral-400);
}

.button-ghost {
  background: transparent;
  color: var(--accent-600);
  border: none;
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  padding: var(--spacing-3) var(--spacing-4);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.button-ghost:hover {
  background: var(--accent-100);
  color: var(--accent-500);
}
```

### Input Components
```css
.input {
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--primary-900);
  background: var(--neutral-000);
  border: 1px solid var(--neutral-300);
  border-radius: 6px;
  padding: var(--spacing-3) var(--spacing-4);
  transition: all 0.2s ease;
  outline: none;
}

.input:focus {
  border-color: var(--accent-600);
  box-shadow: 0 0 0 3px var(--accent-200);
}

.input::placeholder { color: var(--neutral-400); }

.textarea {
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--primary-900);
  background: var(--neutral-000);
  border: 1px solid var(--neutral-300);
  border-radius: 6px;
  padding: var(--spacing-4);
  min-height: 120px;
  resize: vertical;
  transition: all 0.2s ease;
  outline: none;
}

.textarea:focus {
  border-color: var(--accent-600);
  box-shadow: 0 0 0 3px var(--accent-200);
}
```
### Skill Chip Component
```css
.skill-chip {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--accent-600);
  background: var(--accent-100);
  border: 1px solid var(--accent-200);
  border-radius: 999px;
  padding: var(--spacing-2) var(--spacing-4);
  cursor: pointer;
  transition: all 0.2s ease;
}

.skill-chip:hover {
  background: var(--accent-200);
  border-color: var(--accent-300);
  transform: translateY(-1px);
}
```

### Page Header Component
```css
.page-header {
  padding: var(--spacing-8) 0 var(--spacing-6) 0;
  border-bottom: 1px solid var(--neutral-200);
  margin-bottom: var(--spacing-8);
}

.page-header__breadcrumb {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--primary-600);
  margin-bottom: var(--spacing-3);
}

.page-header__title {
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--primary-900);
  margin-bottom: var(--spacing-2);
}

.page-header__description {
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--primary-600);
  max-width: 600px;
}
```

## Special UI Elements
### Journal Drawer

```css
/* Closed / spine state */
.journal-spine {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: var(--primary-800);
  color: white;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  padding: var(--spacing-6) var(--spacing-3);
  border-radius: 8px 0 0 8px;
  cursor: pointer;
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.journal-spine:hover {
  background: var(--accent-600);
  transform: translateY(-50%) translateX(-4px);
}

/* Open state */
.journal-drawer {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 480px;
  background: var(--evidence-warm);
  border-left: 3px solid var(--primary-800);
  box-shadow: -4px 0 16px rgba(0, 0, 0, 0.1);
  padding: var(--spacing-8);
  overflow-y: auto;
  transition: transform 0.3s ease;
}

.journal-drawer--closed { transform: translateX(100%); }

.journal-drawer__header {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--primary-900);
  margin-bottom: var(--spacing-6);
}

```


### Evidence Card (Specialized)

```css
.evidence-card {
  background: var(--evidence-warm);
  border: 1px solid var(--evidence-border);
  border-left: 4px solid var(--accent-600);
  border-radius: 8px;
  padding: var(--spacing-6);
  transition: all 0.2s ease;
}

.evidence-card:hover {
  border-left-color: var(--accent-500);
  box-shadow: 0 4px 12px rgba(91, 111, 216, 0.08);
  transform: translateY(-2px);
}

.evidence-card__title {
  font-family: var(--font-body);
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--primary-900);
  margin-bottom: var(--spacing-2);
}

.evidence-card__meta {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--primary-600);
  margin-bottom: var(--spacing-4);
}

.evidence-card__tags {
  display: flex;
  gap: var(--spacing-2);
  flex-wrap: wrap;
}
```

## Interaction Patterns
### Hover States
- Cards: Subtle lift (2px translateY) + enhanced shadow
- Buttons: Color shift + slight lift (1px translateY)
- Links: Color change to --accent-500
- Evidence cards: Border color shift + shadow
- Focus States
- Inputs: Border color to --accent-600 + 3px shadow ring
- Buttons: 3px shadow ring in accent color
- Interactive cards: 2px solid accent border

### Transitions
```css
--transition-fast: 0.15s ease;
--transition-base: 0.2s ease;
--transition-slow: 0.3s ease;
--transition-drawer: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```
## Icons
### Library: Lucide React

- Navigation: 20px / --primary-600
- Actions: 16px / button text color
- Evidence types: 24px / --accent-600
- Status indicators: 16px / semantic colors
- Responsive Breakpoints
```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
```
- Cards stack on mobile (<768px)
- Journal drawer becomes bottom sheet on mobile
- Navigation collapses to hamburger on mobile


## Animation & Motion
```css
@keyframes cardEntrance {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.card--animated { animation: cardEntrance 0.3s ease; }

@keyframes drawerSlide {
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
}
```

### Accessibility
Body text: Min 7:1 contrast (AAA)
Secondary text: Min 4.5:1 (AA)
Interactive elements: Min 4.5:1 (AA)
All interactive elements must have visible focus states (3px solid ring)
Logical tab order; Escape closes drawers/modals
Usage Examples
```html
/* Dashboard evidence card */
<section className="dashboard-section">
  <h2 className="section-heading">Experience Evidence</h2>
  <div className="evidence-grid">
    <div className="evidence-card card--clickable">
      <h3 className="evidence-card__title">Full-Stack Developer Intern</h3>
      <p className="evidence-card__meta">TechCorp • Jun 2025 - Present</p>
      <div className="evidence-card__tags">
        <span className="skill-chip">React</span>
        <span className="skill-chip">Node.js</span>
        <span className="skill-chip">MongoDB</span>
      </div>
    </div>
  </div>
</section>

/* Page header */
<header className="page-header">
  <nav className="page-header__breadcrumb">
    Dashboard / Experiences / Full-Stack Developer Intern
  </nav>
  <h1 className="page-header__title">Full-Stack Developer Intern</h1>
  <p className="page-header__description">
    Manage activities, journal entries, and evidence files for this experience.
  </p>
</header>

/* Journal drawer */
<button className="journal-spine" onClick={openJournal}>+ Capture Evidence</button>
<div className="journal-drawer">
  <h2 className="journal-drawer__header">Quick Journal Entry</h2>
  <input className="input" placeholder="Title" />
  <textarea className="textarea" placeholder="Markdown notes..." />
  <button className="button-primary">Save to Evidence</button>
</div>
```
## Design Token Summary
- Professional serif headings for CV-like quality
- Warm, approachable color palette (not cold corporate)
- Document-inspired surfaces (paper-like evidence cards)
- Subtle AI accents (intelligent but not flashy)
- Physical metaphors (journal drawer, binder spine)
- Ample whitespace (readable, not cramped)
- Consistent interaction patterns (predictable, accessible)

---

