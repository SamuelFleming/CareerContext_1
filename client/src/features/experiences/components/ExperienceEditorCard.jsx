import Card, {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import MarkdownEditor from "../../../components/editor/MarkdownEditor";
import { EXPERIENCE_TYPE_OPTIONS } from "./experienceUi";

const selectClass =
  "w-full rounded-md border border-[var(--neutral-300)] bg-[var(--neutral-000)] " +
  "px-4 py-3 text-[var(--primary-900)] outline-none transition-all duration-200 " +
  "focus:border-[var(--accent-600)] focus:ring-[3px] focus:ring-[var(--accent-200)]";

const saveStatusText = {
  idle: null,
  saving: "Saving…",
  saved: "Saved",
  error: "Save failed",
};

function ExperienceEditorFields({
  form,
  onChange,
  disabled,
  overviewHelperText,
  overviewMinRows = 10,
}) {
  return (
    <>
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="detail-experience-type"
          className="text-sm font-medium text-[var(--primary-800)]"
        >
          Type
        </label>
        <select
          id="detail-experience-type"
          className={selectClass}
          value={form.type}
          onChange={(event) => onChange("type", event.target.value)}
          disabled={disabled}
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
          value={form.title}
          onChange={(event) => onChange("title", event.target.value)}
          disabled={disabled}
          required
        />
        <Input
          label="Organisation"
          value={form.organisation}
          onChange={(event) => onChange("organisation", event.target.value)}
          disabled={disabled}
        />
        <Input
          label="Role"
          value={form.role}
          onChange={(event) => onChange("role", event.target.value)}
          disabled={disabled}
        />
        <Input
          label="Start date"
          type="date"
          value={form.dateStart}
          onChange={(event) => onChange("dateStart", event.target.value)}
          disabled={disabled}
        />
        <Input
          label="End date"
          type="date"
          value={form.dateEnd}
          onChange={(event) => onChange("dateEnd", event.target.value)}
          disabled={disabled || form.isCurrent}
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-[var(--primary-700)]">
        <input
          type="checkbox"
          checked={form.isCurrent}
          onChange={(event) => onChange("isCurrent", event.target.checked)}
          disabled={disabled}
          className="h-4 w-4 rounded border-[var(--neutral-300)] text-[var(--accent-600)] focus:ring-[var(--accent-200)]"
        />
        This is a current experience
      </label>

      <MarkdownEditor
        label="Overview"
        placeholder="Rough notes about this experience — stored as Markdown."
        helperText={overviewHelperText}
        value={form.overviewRaw}
        onChange={(value) => onChange("overviewRaw", value)}
        disabled={disabled}
        minRows={overviewMinRows}
      />
    </>
  );
}

export default function ExperienceEditorCard({
  form,
  onChange,
  saveStatus = "idle",
  saveError = "",
  disabled = false,
  overviewHelperText = "Raw overview (overviewRaw). Use Save in the page header to persist changes.",
  embedded = false,
}) {
  const statusMessage = saveStatusText[saveStatus];

  const errorAlert = saveError ? (
    <div
      role="alert"
      className={
        embedded
          ? "rounded-md border border-[var(--error-100)] bg-[var(--error-100)]/40 px-4 py-3 text-sm text-[var(--error-600)]"
          : "mx-6 rounded-md border border-[var(--error-100)] bg-[var(--error-100)]/40 px-4 py-3 text-sm text-[var(--error-600)]"
      }
    >
      {saveError}
    </div>
  ) : null;

  if (embedded) {
    return (
      <div className="flex flex-col gap-4">
        {errorAlert}
        <ExperienceEditorFields
          form={form}
          onChange={onChange}
          disabled={disabled}
          overviewHelperText={overviewHelperText}
          overviewMinRows={8}
        />
      </div>
    );
  }

  return (
    <Card className="flex flex-col gap-6">
      <CardHeader className="mb-0">
        <CardTitle>Experience details</CardTitle>
        <CardDescription>
          Metadata and raw overview for this evidence container.
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

      {errorAlert}

      <CardContent className="flex flex-col gap-4">
        <ExperienceEditorFields
          form={form}
          onChange={onChange}
          disabled={disabled}
          overviewHelperText={overviewHelperText}
        />
      </CardContent>
    </Card>
  );
}
