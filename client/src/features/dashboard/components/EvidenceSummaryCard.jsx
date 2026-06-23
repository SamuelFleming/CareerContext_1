// client/src/features/dashboard/components/EvidenceSummaryCard.jsx
import Card, { CardHeader, CardContent } from "../../../components/ui/Card";

export default function EvidenceSummaryCard({ evidenceSummary }) {
  const counts = evidenceSummary?.counts || {};
  const hasCounts =
    (counts.experiences ?? 0) > 0 ||
    (counts.activities ?? 0) > 0 ||
    (counts.journalEntries ?? 0) > 0;

  return (
    <Card className="flex flex-col p-4">
      <CardHeader className="mb-2">
        <h3 className="text-sm font-semibold text-[var(--primary-900)]">
          Evidence Summary
        </h3>
      </CardHeader>

      <CardContent className="pt-0">
        {!hasCounts ? (
          <p className="text-sm text-[var(--primary-600)]">
            {evidenceSummary?.message ||
              "No experiences yet. Add evidence from the Experiences workspace."}
          </p>
        ) : (
          <dl className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <div className="rounded-md border border-[var(--neutral-200)] bg-[var(--neutral-000)] px-3 py-2">
              <dt className="text-[10px] font-medium uppercase tracking-wide text-[var(--primary-600)]">
                Experiences
              </dt>
              <dd className="mt-0.5 text-xl font-semibold text-[var(--primary-900)]">
                {counts.experiences ?? 0}
              </dd>
            </div>
            <div className="rounded-md border border-[var(--neutral-200)] bg-[var(--neutral-000)] px-3 py-2">
              <dt className="text-[10px] font-medium uppercase tracking-wide text-[var(--primary-600)]">
                Activities
              </dt>
              <dd className="mt-0.5 text-xl font-semibold text-[var(--primary-900)]">
                {counts.activities ?? 0}
              </dd>
            </div>
            <div className="rounded-md border border-[var(--neutral-200)] bg-[var(--neutral-000)] px-3 py-2">
              <dt className="text-[10px] font-medium uppercase tracking-wide text-[var(--primary-600)]">
                Journal
              </dt>
              <dd className="mt-0.5 text-xl font-semibold text-[var(--primary-900)]">
                {counts.journalEntries ?? 0}
              </dd>
            </div>
          </dl>
        )}
      </CardContent>
    </Card>
  );
}
