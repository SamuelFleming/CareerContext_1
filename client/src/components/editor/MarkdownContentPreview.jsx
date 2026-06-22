import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "../../utils/cn";
import "./markdownEditor.css";

export default function MarkdownContentPreview({
  value = "",
  placeholder = "Nothing to display yet.",
  className = "",
  minHeight,
  maxHeight,
}) {
  const trimmed = value?.trim() ?? "";
  const isEmpty = !trimmed;

  return (
    <div
      className={cn(
        "markdown-content__preview",
        isEmpty && "markdown-content__preview--empty",
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
