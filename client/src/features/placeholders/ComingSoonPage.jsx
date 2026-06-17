// client/src/features/placeholders/ComingSoonPage.jsx
import { Link } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";
import { useJournalDrawer } from "../../contexts/JournalDrawerContext";

export default function ComingSoonPage({
  title,
  description,
  showJournalAction = false,
}) {
  const { openJournal } = useJournalDrawer();

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title={title}
        description={
          description ||
          "This workspace is planned for a later phase. Dashboard and Profile are fully available in Phase 1."
        }
      />

      <div className="rounded-lg border border-dashed border-[var(--neutral-300)] bg-[var(--neutral-000)] px-6 py-8">
        <p className="text-sm text-[var(--primary-600)]">
          You can continue building your career evidence from Dashboard and
          Profile while this area is under construction.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/dashboard">
            <Button variant="secondary" size="sm">
              Back to Dashboard
            </Button>
          </Link>
          {showJournalAction && (
            <Button variant="primary" size="sm" onClick={openJournal}>
              Open quick journal
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
