// client/src/features/dashboard/components/RecentFeedsPanel.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Activity, Target } from "lucide-react";
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

const ENTITY_LABELS = {
  experience: "Experience",
  activity: "Activity",
  journal: "Journal",
};

function recentActivityRowClass(entityType) {
  switch (entityType) {
    case "activity":
      return "border-[var(--accent-200)] bg-[var(--accent-100)]/50 hover:bg-[var(--accent-100)]";
    case "journal":
      return "border-[var(--neutral-200)] bg-[var(--neutral-100)] hover:bg-[var(--neutral-000)]";
    case "experience":
    default:
      return "border-[var(--neutral-200)] bg-[var(--neutral-000)] hover:bg-[var(--neutral-050)]";
  }
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
          ENTITY_LABELS[item.entityType] || ENTITY_LABELS.experience;
        const rowClass = cn(
          "block rounded-md border px-3 py-2 transition-colors",
          recentActivityRowClass(item.entityType)
        );

        return (
          <li key={`${item.entityType}-${item.id}`}>
            {item.href ? (
              <Link to={item.href} className={rowClass}>
                <p className="text-sm font-medium text-[var(--primary-900)]">
                  {item.title}
                </p>
                <p className="mt-0.5 text-xs text-[var(--primary-600)]">
                  {entityLabel}
                  {updatedLabel ? ` · Updated ${updatedLabel}` : ""}
                </p>
              </Link>
            ) : (
              <div className={rowClass}>
                <p className="text-sm font-medium text-[var(--primary-900)]">
                  {item.title}
                </p>
                <p className="mt-0.5 text-xs text-[var(--primary-600)]">
                  {entityLabel}
                  {updatedLabel ? ` · Updated ${updatedLabel}` : ""}
                </p>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function RecentOpportunitiesView({ recentOpportunities }) {
  const items = recentOpportunities?.items || [];

  if (items.length === 0) {
    return (
      <p className="text-sm text-[var(--primary-600)]">
        {recentOpportunities?.message ||
          "Opportunity tracking arrives in Phase 3."}
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li
          key={item.id}
          className="rounded-md border border-[var(--neutral-200)] bg-[var(--neutral-000)] px-3 py-2"
        >
          <p className="text-sm font-medium text-[var(--primary-900)]">
            {item.title}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default function RecentFeedsPanel({ evidencePanel }) {
  const [activeView, setActiveView] = useState(
    evidencePanel?.defaultView === "recentOpportunities"
      ? "recentOpportunities"
      : "recentActivity"
  );

  const views = [
    { id: "recentActivity", label: "Recent Activity", icon: Activity },
    { id: "recentOpportunities", label: "Opportunities", icon: Target },
  ];

  return (
    <Card className="flex min-h-[220px] flex-col">
      <CardHeader className="mb-0 gap-4">
        <div
          className="flex rounded-md border border-[var(--neutral-200)] p-1"
          role="tablist"
          aria-label="Recent feeds"
        >
          {views.map((view) => {
            const Icon = view.icon;

            return (
              <button
                key={view.id}
                type="button"
                role="tab"
                aria-selected={activeView === view.id}
                onClick={() => setActiveView(view.id)}
                className={cn(
                  "flex-1 rounded px-2 py-2 text-sm font-medium transition-colors",
                  activeView === view.id
                    ? "bg-[var(--accent-100)] text-[var(--accent-600)]"
                    : "text-[var(--primary-600)] hover:text-[var(--primary-800)]"
                )}
              >
                <span className="inline-flex items-center justify-center gap-1.5">
                  <Icon size={14} aria-hidden="true" />
                  <span className="hidden sm:inline">{view.label}</span>
                  <span className="sm:hidden">
                    {view.id === "recentActivity" ? "Activity" : "Opportunities"}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col justify-center pt-4">
        {activeView === "recentActivity" ? (
          <RecentActivityView recentActivity={evidencePanel?.recentActivity} />
        ) : (
          <RecentOpportunitiesView
            recentOpportunities={evidencePanel?.recentOpportunities}
          />
        )}
      </CardContent>
    </Card>
  );
}
