import Card, {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/Card";
import MarkdownPreview from "../../../components/editor/MarkdownPreview";

export default function ExperienceOverviewWidget({ overviewRaw = "" }) {
  return (
    <Card variant="evidence" className="flex h-full flex-col gap-4">
      <CardHeader className="mb-0">
        <CardTitle className="text-lg">Overview</CardTitle>
        <CardDescription>
          Raw overview for now. AI-polished overview priority display is tracked in
          backlog ticket 233.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <MarkdownPreview
          value={overviewRaw}
          minHeight="12rem"
          placeholder="No overview yet. Use Edit to add notes about this experience."
        />
      </CardContent>
    </Card>
  );
}
