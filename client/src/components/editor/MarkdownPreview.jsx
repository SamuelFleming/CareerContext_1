// client/src/components/editor/MarkdownPreview.jsx
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "../../utils/cn";
import "./markdownEditor.css";

export default function MarkdownPreview({
  value = "",
  placeholder = "Nothing to preview yet.",
  className = "",
  minHeight,
  maxHeight,
}) {
  const trimmed = value?.trim() ?? "";
  const isEmpty = !trimmed;

  return (
    <div
      className={cn(
        "markdown-editor__preview",
        isEmpty && "markdown-editor__preview--empty",
        className
      )}
      style={{
        ...(minHeight ? { minHeight } : {}),
        ...(maxHeight ? { maxHeight } : {}),
      }}
      aria-live="polite"
    >
      {isEmpty ? (
        <p>{placeholder}</p>
      ) : (
        <div className="markdown-editor__preview-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{trimmed}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
