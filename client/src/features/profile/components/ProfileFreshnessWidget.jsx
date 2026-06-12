// client/src/features/profile/components/ProfileFreshnessWidget.jsx
import { CheckCircle2, Circle, Clock } from "lucide-react";
import Card, {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/Card";

function formatTimestamp(value) {
  if (!value) {
    return null;
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function getCompletion(profile) {
  const coreContext = profile.coreContext || {};
  const checks = [
    { label: "Full name", done: Boolean(coreContext.fullName?.trim()) },
    { label: "Headline", done: Boolean(coreContext.headline?.trim()) },
    { label: "Location", done: Boolean(coreContext.location?.trim()) },
    { label: "Career summary", done: Boolean(coreContext.rawSummaryMd?.trim()) },
    { label: "Core resume", done: Boolean(profile.coreResumeMd?.trim()) },
  ];

  const completed = checks.filter((item) => item.done).length;

  return { checks, completed, total: checks.length };
}

export default function ProfileFreshnessWidget({ profile }) {
  const { checks, completed, total } = getCompletion(profile);
  const percent = Math.round((completed / total) * 100);
  const summaryUpdated = formatTimestamp(profile.coreContext?.summaryUpdatedAt);
  const resumeUpdated = formatTimestamp(profile.coreResumeUpdatedAt);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile freshness</CardTitle>
        <CardDescription>
          Keep your core context current so AI workflows draw on accurate career
          evidence.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-[var(--primary-800)]">
              Profile completion
            </span>
            <span className="text-[var(--primary-600)]">
              {completed}/{total} ({percent}%)
            </span>
          </div>
          <div
            className="h-2 overflow-hidden rounded-full bg-[var(--neutral-200)]"
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Profile completion"
          >
            <div
              className="h-full rounded-full bg-[var(--accent-600)] transition-all duration-300"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        <ul className="flex flex-col gap-2">
          {checks.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-2 text-sm text-[var(--primary-700)]"
            >
              {item.done ? (
                <CheckCircle2
                  size={16}
                  className="shrink-0 text-[var(--success-600)]"
                  aria-hidden="true"
                />
              ) : (
                <Circle
                  size={16}
                  className="shrink-0 text-[var(--neutral-400)]"
                  aria-hidden="true"
                />
              )}
              {item.label}
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-2 border-t border-[var(--neutral-200)] pt-4 text-sm">
          <div className="flex items-start gap-2 text-[var(--primary-700)]">
            <Clock size={16} className="mt-0.5 shrink-0 text-[var(--accent-600)]" />
            <div>
              <p className="font-medium text-[var(--primary-800)]">Career summary</p>
              <p className="text-[var(--primary-600)]">
                {summaryUpdated ? `Last updated ${summaryUpdated}` : "Not saved yet"}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2 text-[var(--primary-700)]">
            <Clock size={16} className="mt-0.5 shrink-0 text-[var(--accent-600)]" />
            <div>
              <p className="font-medium text-[var(--primary-800)]">Core resume</p>
              <p className="text-[var(--primary-600)]">
                {resumeUpdated ? `Last updated ${resumeUpdated}` : "Not saved yet"}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
