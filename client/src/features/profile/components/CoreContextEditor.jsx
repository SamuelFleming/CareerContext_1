// client/src/features/profile/components/CoreContextEditor.jsx
import { Sparkles } from "lucide-react";
import Card, {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/Card";
import TextArea from "../../../components/ui/TextArea";
import Button from "../../../components/ui/Button";

const saveStatusText = {
  idle: null,
  saving: "Saving…",
  saved: "Saved",
  error: "Save failed",
};

export default function CoreContextEditor({
  rawSummaryMd,
  onChange,
  onSave,
  saveStatus = "idle",
  saveError = "",
}) {
  const statusMessage = saveStatusText[saveStatus];
  const isEmpty = !rawSummaryMd?.trim();

  return (
    <Card variant="evidence" className="flex flex-col gap-6">
      <CardHeader className="mb-0 flex-row items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-600)]">
            Strategic narrative
          </p>
          <CardTitle>Core context</CardTitle>
          <CardDescription>
            Your reusable career story — the foundation for opportunity evaluation
            and generated documents.
          </CardDescription>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <Button
            type="button"
            size="sm"
            onClick={onSave}
            disabled={saveStatus === "saving"}
          >
            {saveStatus === "saving" ? "Saving…" : "Save context"}
          </Button>
          {statusMessage && saveStatus !== "error" && (
            <p
              className="text-xs text-[var(--success-600)]"
              role="status"
              aria-live="polite"
            >
              {statusMessage}
            </p>
          )}
        </div>
      </CardHeader>

      {saveError && (
        <div
          role="alert"
          className="rounded-md border border-[var(--error-100)] bg-[var(--error-100)]/40 px-4 py-3 text-sm text-[var(--error-600)]"
        >
          {saveError}
        </div>
      )}

      {isEmpty && (
        <CardContent className="rounded-md border border-dashed border-[var(--accent-400)]/40 bg-[var(--accent-100)]/30 p-4">
          <div className="flex gap-3">
            <Sparkles
              size={20}
              className="mt-0.5 shrink-0 text-[var(--accent-600)]"
              aria-hidden="true"
            />
            <div className="text-sm text-[var(--primary-700)]">
              <p className="font-medium text-[var(--primary-900)]">
                What belongs in core context?
              </p>
              <p className="mt-1 text-[var(--primary-600)]">
                Describe your current role, target direction, strengths, and the
                kind of work you want next. Write in your own words — this raw
                summary can be refined by AI workflows later.
              </p>
            </div>
          </div>
        </CardContent>
      )}

      <TextArea
        label="Career summary"
        placeholder="I am a full-stack developer currently working in public sector systems. I am targeting mid-level product engineering roles where I can..."
        helperText="Markdown supported. This is saved as your raw summary."
        value={rawSummaryMd}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-[220px]"
      />
    </Card>
  );
}
