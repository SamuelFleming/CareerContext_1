import { Sparkles } from "lucide-react";
import Card, {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import MarkdownPreview from "../../../components/editor/MarkdownPreview";

export default function ActivityPolishedSummary({ polishedSummary = "" }) {
  const hasPolished = Boolean(polishedSummary?.trim());

  return (
    <Card variant="evidence" className="flex flex-col gap-4">
      <CardHeader className="mb-0 flex-row items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <CardTitle>Polished summary</CardTitle>
          <CardDescription>
            AI-refined evidence for reuse in applications. Generated content will
            appear here in a later phase.
          </CardDescription>
        </div>
        <Button type="button" size="sm" variant="secondary" disabled>
          <Sparkles size={16} aria-hidden="true" />
          AI polish — coming later
        </Button>
      </CardHeader>

      <CardContent>
        {hasPolished ? (
          <MarkdownPreview value={polishedSummary} minHeight="8rem" />
        ) : (
          <p className="text-sm text-[var(--primary-600)]">
            No polished summary yet. Write your raw description above; AI polish
            will be available in a later ticket.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
