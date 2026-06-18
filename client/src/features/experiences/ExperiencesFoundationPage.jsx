// client/src/features/experiences/ExperiencesFoundationPage.jsx
import { Link } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";

export default function ExperiencesFoundationPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Experiences"
        description="Your career evidence containers — jobs, projects, courses, and more. The full Experience Index arrives in the next ticket."
        eyebrow="Phase 2 foundation"
      />

      <div className="rounded-lg border border-dashed border-[var(--neutral-300)] bg-[var(--neutral-000)] px-6 py-8">
        <p className="text-sm text-[var(--primary-600)]">
          Routes and API services are in place. Ticket 212 will wire the list,
          create flow, and navigation to individual experiences.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/dashboard">
            <Button variant="secondary" size="sm">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
