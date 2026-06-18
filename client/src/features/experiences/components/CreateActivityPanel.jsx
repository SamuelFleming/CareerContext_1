import Card, {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import MarkdownEditor from "../../../components/editor/MarkdownEditor";
import Button from "../../../components/ui/Button";

export default function CreateActivityPanel({
  form,
  onChange,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitError = "",
}) {
  return (
    <Card className="flex flex-col gap-6">
      <CardHeader className="mb-0 flex-row items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <CardTitle>Add activity</CardTitle>
          <CardDescription>
            A reusable evidence item under this experience. Full editing on the
            activity detail screen.
          </CardDescription>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </CardHeader>

      {submitError && (
        <div
          role="alert"
          className="rounded-md border border-[var(--error-100)] bg-[var(--error-100)]/40 px-4 py-3 text-sm text-[var(--error-600)]"
        >
          {submitError}
        </div>
      )}

      <CardContent className="flex flex-col gap-4">
        <Input
          label="Title"
          placeholder="OMS Joint Applicant Unlink Screen"
          value={form.title}
          onChange={(event) => onChange("title", event.target.value)}
          disabled={isSubmitting}
          required
        />

        <MarkdownEditor
          label="Description (optional)"
          placeholder="What you did, technologies, outcomes…"
          helperText="Stored as rawDescription Markdown."
          value={form.rawDescription}
          onChange={(value) => onChange("rawDescription", value)}
          disabled={isSubmitting}
          minRows={8}
        />

        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting || !form.title.trim()}
          >
            {isSubmitting ? "Creating…" : "Create activity"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
