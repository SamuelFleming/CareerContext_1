// client/src/features/landing/components/InteractiveCvPreview.jsx
import { Briefcase, GraduationCap, Target, FileText } from "lucide-react";
import Card, {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/Card";
import SkillChip from "../../../components/ui/SkillChip";
import EvidenceCard from "../../../components/ui/EvidenceCard";

/**
 * Visual mock only — a fake mini CV / workspace preview for the landing page.
 */
export default function InteractiveCvPreview() {
  return (
    <Card className="flex flex-col gap-5 bg-gradient-to-br from-[var(--accent-100)] to-[var(--neutral-000)] p-6 shadow-[var(--shadow-lg)]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-600)]">
          Living CV
        </p>
        <h3 className="mt-1 font-[var(--font-heading)] text-2xl font-bold text-[var(--primary-900)]">
          Alex Morgan
        </h3>
        <p className="text-sm text-[var(--primary-600)]">
          Software Developer · Project Lead · Computing Graduate
        </p>
      </div>

      <Card variant="default" className="p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--primary-500)]">
          Core context
        </p>
        <p className="mt-1 text-sm leading-relaxed text-[var(--primary-700)]">
          Full-stack developer who turns ambiguous problems into shipped,
          measurable products. Strong in React, Node, and team leadership.
        </p>
      </Card>

      <div className="flex flex-wrap gap-2">
        <SkillChip>React</SkillChip>
        <SkillChip>Node.js</SkillChip>
        <SkillChip variant="neutral">Leadership</SkillChip>
        <SkillChip variant="success">MongoDB</SkillChip>
      </div>

      <div className="flex flex-col gap-3">
        <EvidenceCard
          icon={Briefcase}
          title="Full-Stack Developer Intern"
          meta="TechCorp · Jun 2025 – Present"
          description="Led an internal dashboard rebuild, cutting report time by 60%."
          tags={["React", "Node.js"]}
        />
        <EvidenceCard
          icon={GraduationCap}
          title="Capstone: Career Evidence Engine"
          meta="University · 2025"
          description="Designed an AI-assisted system for structuring career evidence."
          tags={["AI", "MERN"]}
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Card variant="default" className="p-4">
          <CardHeader className="mb-2 flex-row items-center gap-2">
            <Target size={18} className="text-[var(--accent-600)]" aria-hidden="true" />
            <CardTitle className="text-base">Opportunity match</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <span className="font-semibold text-[var(--success-600)]">87%</span> fit
            for “Frontend Engineer”
          </CardContent>
        </Card>

        <Card variant="default" className="p-4">
          <CardHeader className="mb-2 flex-row items-center gap-2">
            <FileText size={18} className="text-[var(--accent-600)]" aria-hidden="true" />
            <CardTitle className="text-base">Document</CardTitle>
          </CardHeader>
          <CardDescription>Tailored cover letter · draft ready</CardDescription>
        </Card>
      </div>
    </Card>
  );
}
