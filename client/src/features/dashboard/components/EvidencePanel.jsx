// client/src/features/dashboard/components/EvidencePanel.jsx
import { useState } from "react";
import { Activity } from "lucide-react";
import Card, {
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/Card";
import { cn } from "../../../utils/cn";

export default function EvidencePanel({ evidencePanel }) {
  const [activeView, setActiveView] = useState(
    evidencePanel?.defaultView || "evidenceSummary"
  );

  const views = [
    { id: "evidenceSummary", label: "Evidence Summary" },
    { id: "recentActivity", label: "Recent Activity" },
  ];

  const activeContent = evidencePanel?.[activeView];

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
        {activeContent?.items?.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {activeContent.items.map((item) => (
              <li key={item.id} className="text-sm text-[var(--primary-700)]">
                {item.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-[var(--primary-600)]">
            {activeContent?.message}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
