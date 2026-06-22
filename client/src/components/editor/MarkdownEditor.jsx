// client/src/components/editor/MarkdownEditor.jsx
import { useId, useRef, useState } from "react";
import {
  Bold,
  Code,
  Heading2,
  Italic,
  List,
  ListOrdered,
} from "lucide-react";
import { cn } from "../../utils/cn";
import MarkdownPreview from "./MarkdownPreview";
import { applyToolbarAction } from "./markdownToolbar";
import "./markdownEditor.css";

const fieldClass =
  "w-full resize-y rounded-md border bg-[var(--neutral-000)] " +
  "text-[var(--primary-900)] px-4 py-3 outline-none transition-all duration-200 " +
  "placeholder:text-[var(--neutral-400)] " +
  "focus:border-[var(--accent-600)] focus:ring-[3px] focus:ring-[var(--accent-200)]";

const TOOLBAR_ACTIONS = [
  { action: "bold", label: "Bold", icon: Bold, markup: "**" },
  { action: "italic", label: "Italic", icon: Italic, markup: "*" },
  { action: "heading", label: "Heading", icon: Heading2, markup: "##" },
  { action: "bullet", label: "Bullet list", icon: List, markup: "-" },
  { action: "numbered", label: "Numbered list", icon: ListOrdered, markup: "1." },
  { action: "code", label: "Code block", icon: Code, markup: "```" },
];

export default function MarkdownEditor({
  label,
  value = "",
  onChange,
  placeholder = "",
  helperText,
  minRows = 10,
  disabled = false,
  previewEnabled = true,
  error,
  name,
  id,
  className = "",
  toolbarEnabled = true,
  previewMaxHeight,
}) {
  const generatedId = useId();
  const editorId = id || generatedId;
  const textareaRef = useRef(null);
  const [mode, setMode] = useState("edit");

  const describedBy = error
    ? `${editorId}-error`
    : helperText
      ? `${editorId}-helper`
      : undefined;

  const minHeight = `calc(${minRows} * 1.5rem + 1.5rem)`;
  const effectivePreviewMaxHeight = previewMaxHeight || minHeight;
  const isPreviewMode = previewEnabled && mode === "preview";
  const isEditMode = !isPreviewMode;

  const handleChange = (event) => {
    onChange?.(event.target.value);
  };

  const handleToolbarAction = (action) => {
    const textarea = textareaRef.current;
    if (!textarea || disabled) {
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const result = applyToolbarAction(action, value, start, end);

    onChange?.(result.value);

    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(result.selectionStart, result.selectionEnd);
    });
  };

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-start justify-between gap-3">
        {label ? (
          <label
            htmlFor={editorId}
            className="text-sm font-medium text-[var(--primary-800)]"
          >
            {label}
          </label>
        ) : (
          <span />
        )}

        {previewEnabled && (
          <div
            className="markdown-editor__mode-toggle"
            role="tablist"
            aria-label="Markdown editor mode"
          >
            <button
              type="button"
              role="tab"
              aria-selected={isEditMode}
              className={cn(
                "markdown-editor__mode-button",
                isEditMode && "markdown-editor__mode-button--active"
              )}
              onClick={() => setMode("edit")}
              disabled={disabled}
            >
              Edit
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={isPreviewMode}
              className={cn(
                "markdown-editor__mode-button",
                isPreviewMode && "markdown-editor__mode-button--active"
              )}
              onClick={() => setMode("preview")}
              disabled={disabled}
            >
              Preview
            </button>
          </div>
        )}
      </div>

      {isEditMode && toolbarEnabled && (
        <div className="markdown-editor__toolbar" role="toolbar" aria-label="Formatting">
          {TOOLBAR_ACTIONS.map(({ action, label: actionLabel, icon: Icon, markup }) => (
            <button
              key={action}
              type="button"
              className="markdown-editor__toolbar-button"
              title={`${actionLabel} (${markup})`}
              aria-label={actionLabel}
              disabled={disabled}
              onClick={() => handleToolbarAction(action)}
            >
              <Icon size={16} aria-hidden="true" />
            </button>
          ))}
        </div>
      )}

      {isEditMode ? (
        <textarea
          ref={textareaRef}
          id={editorId}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={describedBy}
          className={cn(
            fieldClass,
            toolbarEnabled && "markdown-editor__textarea--with-toolbar",
            error
              ? "border-[var(--error-600)] focus:border-[var(--error-600)] focus:ring-[var(--error-100)]"
              : "border-[var(--neutral-300)]"
          )}
          style={{ minHeight }}
        />
      ) : (
        <MarkdownPreview
          value={value}
          placeholder={placeholder || "Nothing to preview yet."}
          minHeight={minHeight}
          maxHeight={effectivePreviewMaxHeight}
        />
      )}

      {error ? (
        <p id={`${editorId}-error`} className="text-sm text-[var(--error-600)]">
          {error}
        </p>
      ) : (
        helperText && (
          <p
            id={`${editorId}-helper`}
            className="text-sm text-[var(--primary-600)]"
          >
            {helperText}
          </p>
        )
      )}
    </div>
  );
}
