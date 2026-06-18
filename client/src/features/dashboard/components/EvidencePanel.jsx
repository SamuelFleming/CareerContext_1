// client/src/features/dashboard/components/EvidencePanel.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Activity } from "lucide-react";
import Card, { CardHeader, CardContent } from "../../../components/ui/Card";
import { cn } from "../../../utils/cn";

function formatUpdatedAt(value) {
  if (!value) {
    return null;
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
  }).format(new Date(value));
}

function EvidenceSummaryView({ evidenceSummary }) {
  const counts = evidenceSummary?.counts || {};
  const hasCounts =
    (counts.experiences ?? 0) > 0 ||
    (counts.activities ?? 0) > 0 ||
    (counts.journalEntries ?? 0) > 0;

  if (!hasCounts) {
    return (
      <p className="text-sm text-[var(--primary-600)]">
        {evidenceSummary?.message ||
          "No experiences yet. Add evidence from the Experiences workspace."}
      </p>
    );
  }

  return (
    <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <div className="rounded-md border border-[var(--neutral-200)] bg-[var(--neutral-000)] px-4 py-3">
        <dt className="text-xs font-medium uppercase tracking-wide text-[var(--primary-600)]">
          Experiences
        </dt>
        <dd className="mt-1 text-2xl font-semibold text-[var(--primary-900)]">
          {counts.experiences ?? 0}
        </dd>
      </div>
      <div className="rounded-md border border-[var(--neutral-200)] bg-[var(--neutral-000)] px-4 py-3">
        <dt className="text-xs font-medium uppercase tracking-wide text-[var(--primary-600)]">
          Activities
        </dt>
        <dd className="mt-1 text-2xl font-semibold text-[var(--primary-900)]">
          {counts.activities ?? 0}
        </dd>
      </div>
      <div className="rounded-md border border-[var(--neutral-200)] bg-[var(--neutral-000)] px-4 py-3">
        <dt className="text-xs font-medium uppercase tracking-wide text-[var(--primary-600)]">
          Journal
        </dt>
        <dd className="mt-1 text-2xl font-semibold text-[var(--primary-900)]">
          {counts.journalEntries ?? 0}
        </dd>
      </div>
    </dl>
  );
}

function RecentActivityView({ recentActivity }) {
  const items = recentActivity?.items || [];

  if (items.length === 0) {
    return (
      <p className="text-sm text-[var(--primary-600)]">
        {recentActivity?.message ||
          "Your latest captured evidence will appear here."}
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => {
        const updatedLabel = formatUpdatedAt(item.updatedAt);
        const entityLabel =
          item.entityType === "activity" ? "Activity" : "Experience";

        return (
          <li key={`${item.entityType}-${item.id}`}>
            {item.href ? (
              <Link
                to={item.href}
                className="block rounded-md border border-transparent px-2 py-2 transition-colors hover:border-[var(--neutral-200)] hover:bg-[var(--neutral-000)]"
              >
                <p className="text-sm font-medium text-[var(--primary-900)]">
                  {item.title}
                </p>
                <p className="mt-0.5 text-xs text-[var(--primary-600)]">
                  {entityLabel}
                  {updatedLabel ? ` · Updated ${updatedLabel}` : ""}
                </p>
              </Link>
            ) : (
              <div className="px-2 py-2">
                <p className="text-sm font-medium text-[var(--primary-900)]">
                  {item.title}
                </p>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function EvidencePanel({ evidencePanel }) {
  const [activeView, setActiveView] = useState(
    evidencePanel?.defaultView || "evidenceSummary"
  );

  const views = [
    { id: "evidenceSummary", label: "Evidence Summary" },
    { id: "recentActivity", label: "Recent Activity" },
  ];

  return (
    <Card className="flex min-h-[220px] flex-col">
      <CardHeader className="mb-0 gap-4">
        <div
          className="flex rounded-md border border-[var(--neutral-200)] p-1"
          role="tablist"
          aria-label="Evidence panel views"
        >
          {views.map((view) => (
            <button
              key={view.id}
              type="button"
              role="tab"
              aria-selected={activeView === view.id}
              onClick={() => setActiveView(view.id)}
              className={cn(
                "flex-1 rounded px-3 py-2 text-sm font-medium transition-colors",
                activeView === view.id
                  ? "bg-[var(--accent-100)] text-[var(--accent-600)]"
                  : "text-[var(--primary-600)] hover:text-[var(--primary-800)]"
              )}
            >
              {view.id === "recentActivity" ? (
                <span className="inline-flex items-center justify-center gap-1.5">
                  <Activity size={14} aria-hidden="true" />
                  {view.label}
                </span>
              ) : (
                view.label
              )}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col justify-center pt-4">
        {activeView === "evidenceSummary" ? (
          <EvidenceSummaryView evidenceSummary={evidencePanel?.evidenceSummary} />
        ) : (
          <RecentActivityView recentActivity={evidencePanel?.recentActivity} />
        )}
      </CardContent>
    </Card>
  );
}
