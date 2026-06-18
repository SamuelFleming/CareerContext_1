import { Sparkles } from "lucide-react";
import Card, {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import MarkdownPreview from "../../../components/editor/MarkdownPreview";

export default function ExperiencePolishedOverview({ overviewPolished = "" }) {
  const hasPolished = Boolean(overviewPolished?.trim());

  return (
    <Card variant="evidence" className="flex flex-col gap-4">
      <CardHeader className="mb-0 flex-row items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <CardTitle>Polished overview</CardTitle>
          <CardDescription>
            AI-refined summary for reuse in applications. Generated content will
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
          <MarkdownPreview value={overviewPolished} minHeight="8rem" />
        ) : (
          <p className="text-sm text-[var(--primary-600)]">
            No polished overview yet. Write your raw overview above; AI polish
            will be available in a later ticket.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
