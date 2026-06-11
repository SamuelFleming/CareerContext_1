// client/src/components/ui/TextArea.jsx
import { useId } from "react";
import { cn } from "../../utils/cn";

const fieldClass =
  "w-full min-h-[120px] resize-y rounded-md border bg-[var(--neutral-000)] " +
  "text-[var(--primary-900)] px-4 py-3 outline-none transition-all duration-200 " +
  "placeholder:text-[var(--neutral-400)] " +
  "focus:border-[var(--accent-600)] focus:ring-[3px] focus:ring-[var(--accent-200)]";

export default function TextArea({
  label,
  error,
  helperText,
  id,
  className = "",
  ...props
}) {
  const generatedId = useId();
  const textAreaId = id || generatedId;
  const describedBy = error
    ? `${textAreaId}-error`
    : helperText
      ? `${textAreaId}-helper`
      : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={textAreaId}
          className="text-sm font-medium text-[var(--primary-800)]"
        >
          {label}
        </label>
      )}

      <textarea
        id={textAreaId}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={describedBy}
        className={cn(
          fieldClass,
          error
            ? "border-[var(--error-600)] focus:border-[var(--error-600)] focus:ring-[var(--error-100)]"
            : "border-[var(--neutral-300)]",
          className
        )}
        {...props}
      />

      {error ? (
        <p
          id={`${textAreaId}-error`}
          className="text-sm text-[var(--error-600)]"
        >
          {error}
        </p>
      ) : (
        helperText && (
          <p
            id={`${textAreaId}-helper`}
            className="text-sm text-[var(--primary-600)]"
          >
            {helperText}
          </p>
        )
      )}
    </div>
  );
}
