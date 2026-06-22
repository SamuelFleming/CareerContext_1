import Card, {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/Card";
import MarkdownContentPreview from "../../../components/editor/MarkdownContentPreview";

function resolveSummaryDisplay(polishedSummary = "", rawDescription = "") {
  const polished = polishedSummary?.trim() ?? "";
  const raw = rawDescription?.trim() ?? "";

  if (polished) {
    return {
      source: "polished",
      value: polished,
      label: "AI-polished summary",
      description: "Showing AI-refined summary. Edit updates the raw description.",
    };
  }

  if (raw) {
    return {
      source: "raw",
      value: raw,
      label: "Raw description",
      description: "Showing your authored notes until AI polish is available.",
    };
  }

  return {
    source: "empty",
    value: "",
    label: null,
    description: "No description yet. Use Edit to add activity evidence.",
  };
}

export default function ActivitySummaryWidget({
  rawDescription = "",
  polishedSummary = "",
}) {
  const display = resolveSummaryDisplay(polishedSummary, rawDescription);

  return (
    <Card variant="default" className="flex h-full min-h-[24rem] flex-col gap-4">
      <CardHeader className="mb-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <CardTitle className="text-lg">AI summary</CardTitle>
          {display.label && (
            <span className="rounded-full border border-[var(--neutral-300)] bg-[var(--neutral-100)] px-2.5 py-0.5 text-xs font-medium text-[var(--primary-600)]">
              {display.label}
            </span>
          )}
        </div>
        <CardDescription>{display.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <MarkdownContentPreview
          value={display.value}
          minHeight="12rem"
          maxHeight="16rem"
          placeholder="No summary yet. Use Edit to describe what you did in this activity."
        />
      </CardContent>
    </Card>
  );
}
