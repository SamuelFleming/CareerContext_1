// client/src/features/landing/components/FeatureGrid.jsx
import {
  UserCircle,
  Briefcase,
  Activity,
  Target,
  FileText,
  BookOpen,
} from "lucide-react";
import Card, { CardTitle, CardDescription } from "../../../components/ui/Card";

const features = [
  {
    icon: UserCircle,
    title: "Core context",
    description: "Maintain your reusable profile, skills, and resume material.",
  },
  {
    icon: Briefcase,
    title: "Experiences",
    description: "Organise projects, study, work, and volunteering evidence.",
  },
  {
    icon: Activity,
    title: "Activities",
    description: "Break experience into reusable proof points and examples.",
  },
  {
    icon: Target,
    title: "Opportunities",
    description: "Evaluate jobs and match them against your evidence base.",
  },
  {
    icon: FileText,
    title: "Documents",
    description: "Generate tailored resumes, cover letters, and responses.",
  },
  {
    icon: BookOpen,
    title: "Journal",
    description: "Capture rough notes before they become structured evidence.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {features.map(({ icon: Icon, title, description }) => (
        <Card key={title} variant="interactive" className="flex flex-col gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[var(--accent-100)] text-[var(--accent-600)]">
            <Icon size={22} aria-hidden="true" />
          </span>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </Card>
      ))}
    </section>
  );
}
