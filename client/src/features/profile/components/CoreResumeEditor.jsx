// client/src/features/profile/components/CoreResumeEditor.jsx
import Card, {
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/ui/Card";
import MarkdownEditor from "../../../components/editor/MarkdownEditor";
import Button from "../../../components/ui/Button";

const saveStatusText = {
  idle: null,
  saving: "Saving…",
  saved: "Saved",
  error: "Save failed",
};

export default function CoreResumeEditor({
  coreResumeMd,
  onChange,
  onSave,
  saveStatus = "idle",
  saveError = "",
}) {
  const statusMessage = saveStatusText[saveStatus];
  const isEmpty = !coreResumeMd?.trim();

  return (
    <Card className="flex flex-col gap-6">
      <CardHeader className="mb-0 flex-row items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <CardTitle>Core resume</CardTitle>
          <CardDescription>
            Source resume content for tailoring applications and AI document
            generation.
          </CardDescription>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <Button
            type="button"
            size="sm"
            onClick={onSave}
            disabled={saveStatus === "saving"}
          >
            {saveStatus === "saving" ? "Saving…" : "Save resume"}
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

      <MarkdownEditor
        label="Resume Markdown"
        placeholder={
          "# Your Name\n\n## Experience\n\n- Role at Company — key outcomes...\n\n## Skills\n\n- React, Node.js, ..."
        }
        helperText={
          isEmpty
            ? "Start with headings and bullet points. You can paste an existing resume and refine it here."
            : "Use Edit/Preview to review how your resume will read. Saved as Markdown for AI workflows."
        }
        value={coreResumeMd}
        onChange={onChange}
        minRows={14}
        previewEnabled
      />
    </Card>
  );
}
