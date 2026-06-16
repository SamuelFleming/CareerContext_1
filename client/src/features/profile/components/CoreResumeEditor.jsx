// client/src/features/profile/components/CoreResumeEditor.jsx
import { useState } from "react";
import Card, {
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/ui/Card";
import MarkdownEditor from "../../../components/editor/MarkdownEditor";
import "../../../components/editor/markdownEditor.css";
import Button from "../../../components/ui/Button";
import { cn } from "../../../utils/cn";
import CoreResumeUploadPlaceholder from "./CoreResumeUploadPlaceholder";

const saveStatusText = {
  idle: null,
  saving: "Saving…",
  saved: "Saved",
  error: "Save failed",
};

const INPUT_MODES = [
  { id: "markdown", label: "Write in Markdown" },
  { id: "upload", label: "Upload file" },
];

export default function CoreResumeEditor({
  coreResumeMd,
  onChange,
  onSave,
  saveStatus = "idle",
  saveError = "",
}) {
  const [inputMode, setInputMode] = useState("markdown");
  const statusMessage = saveStatusText[saveStatus];
  const isEmpty = !coreResumeMd?.trim();
  const isMarkdownMode = inputMode === "markdown";

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
            disabled={saveStatus === "saving" || !isMarkdownMode}
            title={
              !isMarkdownMode
                ? "Switch to Write in Markdown to save resume content"
                : undefined
            }
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

      <div
        className="markdown-editor__mode-toggle w-fit"
        role="tablist"
        aria-label="Core resume input mode"
      >
        {INPUT_MODES.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={inputMode === id}
            className={cn(
              "markdown-editor__mode-button",
              inputMode === id && "markdown-editor__mode-button--active"
            )}
            onClick={() => setInputMode(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {isMarkdownMode ? (
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
      ) : (
        <CoreResumeUploadPlaceholder />
      )}
    </Card>
  );
}
