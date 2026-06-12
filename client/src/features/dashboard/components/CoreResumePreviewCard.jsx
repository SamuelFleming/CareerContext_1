// client/src/features/dashboard/components/CoreResumePreviewCard.jsx
import { Link } from "react-router-dom";
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
  }).format(new Date(value));
}

export default function CoreResumePreviewCard({ coreResumePreview }) {
  const updatedLabel = formatTimestamp(coreResumePreview?.updatedAt);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Core resume</CardTitle>
        <CardDescription>
          Source resume content for tailoring applications.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        {coreResumePreview?.exists && coreResumePreview.previewMd ? (
          <>
            <pre className="max-h-32 overflow-hidden whitespace-pre-wrap rounded-md border border-[var(--neutral-200)] bg-[var(--neutral-100)] p-3 font-mono text-xs leading-relaxed text-[var(--primary-700)]">
              {coreResumePreview.previewMd}
            </pre>
            {updatedLabel && (
              <p className="text-xs text-[var(--primary-600)]">
                Last updated {updatedLabel}
              </p>
            )}
          </>
        ) : (
          <p className="text-sm text-[var(--primary-600)]">
            No core resume saved yet. Add Markdown resume content on your
            profile.
          </p>
        )}

        <Link
          to="/profile"
          className="text-sm font-medium text-[var(--accent-600)] hover:text-[var(--accent-500)]"
        >
          {coreResumePreview?.exists ? "Edit resume" : "Add resume"}
        </Link>
      </CardContent>
    </Card>
  );
}
