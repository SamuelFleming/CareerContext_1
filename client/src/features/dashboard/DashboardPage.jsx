// client/src/features/dashboard/DashboardPage.jsx
import { Briefcase, GraduationCap, Activity } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader";
import Card, {
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/Card";
import EvidenceCard from "../../components/ui/EvidenceCard";
import SkillChip from "../../components/ui/SkillChip";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Dashboard"
        title="Your Career Context"
        description="A living overview of your profile, evidence, opportunities, and generated documents."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card className="flex flex-col gap-5">
          <CardHeader>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-600)]">
              Interactive CV
            </p>
            <CardTitle className="text-2xl">Samuel Example</CardTitle>
            <p className="text-sm text-[var(--primary-600)]">
              Software Developer · Project Lead · Computing Student
            </p>
          </CardHeader>

          <div className="flex flex-wrap gap-2">
            <SkillChip>React</SkillChip>
            <SkillChip>Node.js</SkillChip>
            <SkillChip variant="neutral">Leadership</SkillChip>
            <SkillChip variant="success">Express</SkillChip>
          </div>

          <div className="flex flex-col gap-3">
            <EvidenceCard
              icon={Briefcase}
              title="Full-Stack Developer Intern"
              meta="TechCorp · Jun 2025 – Present"
              description="Led an internal dashboard rebuild used by 40+ staff."
              tags={["React", "Node.js", "Leadership"]}
            />
            <EvidenceCard
              icon={GraduationCap}
              title="Capstone Project"
              meta="University · 2025"
              description="Built a MERN application for structuring career evidence."
              tags={["MongoDB", "AI"]}
            />
          </div>
        </Card>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Evidence Summary</CardTitle>
            </CardHeader>
            <CardContent>
              Experiences, activities, and journal entries will appear here.
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center gap-2">
              <Activity size={18} className="text-[var(--accent-600)]" aria-hidden="true" />
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              Your latest captured evidence will appear here.
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
