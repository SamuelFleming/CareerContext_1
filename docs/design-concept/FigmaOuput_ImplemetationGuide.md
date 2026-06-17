# CareerContext Design System - Implementation Guide

## What Was Created

### Design Specification
- **`DESIGN_SYSTEM.md`** — Complete color palette, typography, component specs, interaction patterns, accessibility guidelines

### Design Tokens
- **`src/styles/theme.css`** — CSS custom properties: colors, typography, spacing, border radius, transitions, dark mode support
- **`src/styles/fonts.css`** — Google Fonts: Crimson Pro (serif headings), Inter (body), JetBrains Mono (code)

### Component Library (`src/app/components/careercontext/`)

| Component | Variants |
|---|---|
| Button | primary, secondary, ghost, destructive · sm/default/lg |
| Card | default, evidence, interactive · with CardHeader/CardTitle/CardContent sub-components |
| Input | label, error, helper text support |
| TextArea | label, error, helper text support |
| PageHeader | breadcrumbs + actions slot |
| SkillChip | 4 color variants |
| EvidenceCard | icon, title, meta, description, tags, onClick |

All components: TypeScript · Tailwind CSS v4 · Accessible · Responsive

---

## How to Use

### Import
(tsx)
```tsx
import {
  Button, Card, CardHeader, CardTitle, CardContent,
  Input, TextArea, PageHeader, SkillChip, EvidenceCard,
} from "./components/careercontext";
Quick Examples
/* Button */
<Button variant="primary" size="default">Save Changes</Button>
<Button variant="secondary">Cancel</Button>

/* Card */
<Card variant="evidence">
  <CardHeader>
    <CardTitle>My Experience</CardTitle>
    <CardDescription>Jun 2025 - Present</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Details about the experience...</p>
  </CardContent>
</Card>

/* Evidence Card */
<EvidenceCard
  icon={Briefcase}
  title="Full-Stack Developer Intern"
  meta="TechCorp • Jun 2025 - Present"
  description="Led development of internal dashboard..."
  tags={["React", "Node.js", "Leadership"]}
  onClick={() => navigate('/experience/123')}
/>

/* Page Header */
<PageHeader
  title="Experience Detail"
  description="Manage activities and evidence for this experience"
  breadcrumbs={[
    { label: "Dashboard", onClick: () => navigate('/') },
    { label: "Experiences", onClick: () => navigate('/experiences') },
    { label: "Current Experience" }
  ]}
  actions={
    <Button variant="primary">
      <Plus className="w-4 h-4" /> Add Activity
    </Button>
  }
/>
```

### Color Palette Quick Reference
```markdown
- Primary:   #1a1f2e (900) → #8896b2 (400)
- Accent:    #5b6fd8 (600) → #e8ebfc (100)
- Neutral:   #ffffff (000) → #8b92a0 (500)
- Evidence:  #f9f3f0 (warm), #e6ddd7 (border)
- Success:   #2d844e (600), #e6f4ea (100)
- Warning:   #d97706 (600), #fef3c7 (100)
- Error:     #c92a2a (600), #fee2e2 (100)
```

### Typography Quick Reference
```
Heading:  Crimson Pro (serif)
Body:     Inter (sans-serif)
Mono:     JetBrains Mono

Display (h1):  30px (--text-3xl)
Section (h2):  24px (--text-2xl)
Subsection:    20px (--text-xl)
Body:          16px (--text-base)
Small:         14px (--text-sm)
```

## Key UX Metaphors
### Evidence Filesystem
```
Dashboard
  └─ Experiences (Cards with folder icon)
      └─ [Experience Detail] (EvidenceCards for activities)
          └─ Activities
          └─ Journal Entries
```
### Journal Drawer
- Literal binder spine fixed to right edge
- Slides in on click, warm paper background
- Quick-capture interface, globally available

## Next Steps for MERN Stack
1. Copy src/styles/theme.css, src/styles/fonts.css, and src/app/components/careercontext/ to your React frontend
2. Adapt showcase screens into real pages (Dashboard → CV dashboard mockup, Experience Detail → PageHeader + EvidenceCards)
3. Connect to Express API: add React Context/Redux, API calls, loading/error states
4. Next Steps for Figma

Use DESIGN_SYSTEM.md to build:
- Component library matching coded components
- Screen mockups for all 13 planned screens
- User flows: evidence capture → organization → document generation
- Prototypes for the interactive CV dashboard concept