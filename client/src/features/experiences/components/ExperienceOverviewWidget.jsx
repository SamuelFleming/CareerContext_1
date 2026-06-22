import Card, {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/Card";
import MarkdownContentPreview from "../../../components/editor/MarkdownContentPreview";

function resolveOverviewDisplay(overviewPolished = "", overviewRaw = "") {
  const polished = overviewPolished?.trim() ?? "";
  const raw = overviewRaw?.trim() ?? "";

  if (polished) {
    return {
      source: "polished",
      value: polished,
      label: "AI-polished overview",
      description: "Showing AI-refined summary. Edit updates the raw overview.",
    };
  }

  if (raw) {
    return {
      source: "raw",
      value: raw,
      label: "Raw overview",
      description: "Showing your authored notes. AI polish will appear here when available.",
    };
  }

  return {
    source: "empty",
    value: "",
    label: null,
    description: "Add an overview via Edit, or generate a polished summary in a later phase.",
  };
}

export default function ExperienceOverviewWidget({
  overviewRaw = "",
  overviewPolished = "",
}) {
  const display = resolveOverviewDisplay(overviewPolished, overviewRaw);

  return (
    <Card variant="default" className="flex h-full min-h-[24rem] flex-col gap-4">
      <CardHeader className="mb-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <CardTitle className="text-lg">Overview</CardTitle>
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
          placeholder="No overview yet. Use Edit to add notes about this experience."
        />
      </CardContent>
    </Card>
  );
}
