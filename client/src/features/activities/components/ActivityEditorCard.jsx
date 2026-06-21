import Card, {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import TermChipInput from "../../../components/ui/TermChipInput";
import MarkdownEditor from "../../../components/editor/MarkdownEditor";
import { TERM_KIND } from "../../../utils/skillTechnologyChipUtils";

const saveStatusText = {
  idle: null,
  saving: "Saving…",
  saved: "Saved",
  error: "Save failed",
};

export default function ActivityEditorCard({
  form,
  onChange,
  saveStatus = "idle",
  saveError = "",
  disabled = false,
}) {
  const statusMessage = saveStatusText[saveStatus];

  return (
    <Card className="flex flex-col gap-6">
      <CardHeader className="mb-0">
        <CardTitle>Activity evidence</CardTitle>
        <CardDescription>
          Reusable career evidence content for applications and evaluations.
        </CardDescription>
        {statusMessage && saveStatus !== "error" && (
          <p
            className="text-xs text-[var(--success-600)]"
            role="status"
            aria-live="polite"
          >
            {statusMessage}
          </p>
        )}
      </CardHeader>

      {saveError && (
        <div
          role="alert"
          className="mx-6 rounded-md border border-[var(--error-100)] bg-[var(--error-100)]/40 px-4 py-3 text-sm text-[var(--error-600)]"
        >
          {saveError}
        </div>
      )}

      <CardContent className="flex flex-col gap-4">
        <Input
          label="Title"
          placeholder="OMS Joint Applicant Unlink Screen"
          value={form.title}
          onChange={(event) => onChange("title", event.target.value)}
          disabled={disabled}
          required
        />

        <TermChipInput
          label="Technologies"
          kind={TERM_KIND.TECHNOLOGY}
          values={form.technologies}
          onChange={(values) => onChange("technologies", values)}
          disabled={disabled}
          helperText="Tools, frameworks, and platforms used in this activity."
        />

        <TermChipInput
          label="Skills"
          kind={TERM_KIND.SKILL}
          values={form.skills}
          onChange={(values) => onChange("skills", values)}
          disabled={disabled}
          helperText="Capabilities and competencies demonstrated in this activity."
        />

        <MarkdownEditor
          label="Raw description"
          placeholder="What you did, technologies used, outcomes achieved…"
          helperText="Stored as Markdown in rawDescription. Use Save in the page header to persist."
          value={form.rawDescription}
          onChange={(value) => onChange("rawDescription", value)}
          disabled={disabled}
          minRows={12}
        />
      </CardContent>
    </Card>
  );
}
