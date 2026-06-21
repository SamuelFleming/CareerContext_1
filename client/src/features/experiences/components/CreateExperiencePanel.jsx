import Card, {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import TermChipInput from "../../../components/ui/TermChipInput";
import MarkdownEditor from "../../../components/editor/MarkdownEditor";
import Button from "../../../components/ui/Button";
import { TERM_KIND } from "../../../utils/skillTechnologyChipUtils";
import { EXPERIENCE_TYPE_OPTIONS } from "./experienceUi";

const selectClass =
  "w-full rounded-md border border-[var(--neutral-300)] bg-[var(--neutral-000)] " +
  "px-4 py-3 text-[var(--primary-900)] outline-none transition-all duration-200 " +
  "focus:border-[var(--accent-600)] focus:ring-[3px] focus:ring-[var(--accent-200)]";

export default function CreateExperiencePanel({
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
          <CardTitle>Add experience</CardTitle>
          <CardDescription>
            Create a container for related activities and evidence. You can add
            more detail on the experience workspace next.
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
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="experience-type"
            className="text-sm font-medium text-[var(--primary-800)]"
          >
            Type
          </label>
          <select
            id="experience-type"
            className={selectClass}
            value={form.type}
            onChange={(event) => onChange("type", event.target.value)}
            disabled={isSubmitting}
          >
            {EXPERIENCE_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Title"
            placeholder="QLD Digital Graduate Developer"
            value={form.title}
            onChange={(event) => onChange("title", event.target.value)}
            disabled={isSubmitting}
            required
          />
          <Input
            label="Organisation"
            placeholder="Company, institution, or context"
            value={form.organisation}
            onChange={(event) => onChange("organisation", event.target.value)}
            disabled={isSubmitting}
          />
          <Input
            label="Role"
            placeholder="Your role or focus"
            value={form.role}
            onChange={(event) => onChange("role", event.target.value)}
            disabled={isSubmitting}
          />
          <Input
            label="Start date"
            type="date"
            value={form.dateStart}
            onChange={(event) => onChange("dateStart", event.target.value)}
            disabled={isSubmitting}
          />
          <Input
            label="End date"
            type="date"
            value={form.dateEnd}
            onChange={(event) => onChange("dateEnd", event.target.value)}
            disabled={isSubmitting || form.isCurrent}
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-[var(--primary-700)]">
          <input
            type="checkbox"
            checked={form.isCurrent}
            onChange={(event) => onChange("isCurrent", event.target.checked)}
            disabled={isSubmitting}
            className="h-4 w-4 rounded border-[var(--neutral-300)] text-[var(--accent-600)] focus:ring-[var(--accent-200)]"
          />
          This is a current experience
        </label>

        <TermChipInput
          label="Technologies"
          kind={TERM_KIND.TECHNOLOGY}
          values={form.technologies}
          onChange={(values) => onChange("technologies", values)}
          disabled={isSubmitting}
          helperText="Optional. Tools and platforms for this experience."
        />

        <TermChipInput
          label="Skills"
          kind={TERM_KIND.SKILL}
          values={form.skills}
          onChange={(values) => onChange("skills", values)}
          disabled={isSubmitting}
          helperText="Optional. Capabilities demonstrated in this experience."
        />

        <MarkdownEditor
          label="Overview (optional)"
          placeholder="Rough notes about this experience — you can refine this later."
          helperText="Stored as Markdown in overviewRaw. AI polish arrives in a later phase."
          value={form.overviewRaw}
          onChange={(value) => onChange("overviewRaw", value)}
          disabled={isSubmitting}
          minRows={8}
        />

        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting || !form.title.trim()}
          >
            {isSubmitting ? "Creating…" : "Create experience"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
