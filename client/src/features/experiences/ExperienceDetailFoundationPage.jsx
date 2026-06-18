// client/src/features/experiences/ExperienceDetailFoundationPage.jsx
import { Link, useParams } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";

export default function ExperienceDetailFoundationPage() {
  const { experienceId } = useParams();

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Experience"
        description="Experience detail workspace foundation. Full editing and activities arrive in ticket 213."
        eyebrow="Phase 2 foundation"
        breadcrumbs={[
          { label: "Experiences", to: "/experiences" },
          { label: experienceId || "…" },
        ]}
      />

      <div className="rounded-lg border border-dashed border-[var(--neutral-300)] bg-[var(--neutral-000)] px-6 py-8">
        <p className="text-sm text-[var(--primary-600)]">
          Route is active for experience{" "}
          <span className="font-mono text-[var(--primary-800)]">
            {experienceId}
          </span>
          . Data loading and editing will be added in the Experience Detail
          vertical slice.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/experiences">
            <Button variant="secondary" size="sm">
              Back to Experiences
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="secondary" size="sm">
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
