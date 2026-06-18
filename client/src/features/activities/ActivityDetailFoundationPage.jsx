// client/src/features/activities/ActivityDetailFoundationPage.jsx
import { Link, useParams } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";

export default function ActivityDetailFoundationPage() {
  const { activityId } = useParams();

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Activity"
        description="Reusable evidence item foundation. Full editing arrives in ticket 214."
        eyebrow="Phase 2 foundation"
      />

      <div className="rounded-lg border border-dashed border-[var(--neutral-300)] bg-[var(--neutral-000)] px-6 py-8">
        <p className="text-sm text-[var(--primary-600)]">
          Route is active for activity{" "}
          <span className="font-mono text-[var(--primary-800)]">
            {activityId}
          </span>
          . Parent experience context and content editing will be added in the
          Activity Detail vertical slice.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/experiences">
            <Button variant="secondary" size="sm">
              Experiences
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
