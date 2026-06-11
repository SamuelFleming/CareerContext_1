// client/src/components/ui/Input.jsx
import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../../utils/cn";

const fieldClass =
  "w-full rounded-md border bg-[var(--neutral-000)] text-[var(--primary-900)] " +
  "px-4 py-3 outline-none transition-all duration-200 " +
  "placeholder:text-[var(--neutral-400)] " +
  "focus:border-[var(--accent-600)] focus:ring-[3px] focus:ring-[var(--accent-200)]";

export default function Input({
  label,
  error,
  helperText,
  id,
  className = "",
  type,
  showPasswordToggle = true,
  ...props
}) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordField = type === "password" && showPasswordToggle;
  const inputType = isPasswordField && isPasswordVisible ? "text" : type;
  const describedBy = error
    ? `${inputId}-error`
    : helperText
      ? `${inputId}-helper`
      : undefined;

  const inputClassName = cn(
    fieldClass,
    error
      ? "border-[var(--error-600)] focus:border-[var(--error-600)] focus:ring-[var(--error-100)]"
      : "border-[var(--neutral-300)]",
    isPasswordField && "pr-11",
    className
  );

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-[var(--primary-800)]"
        >
          {label}
        </label>
      )}

      {isPasswordField ? (
        <div className="relative">
          <input
            id={inputId}
            type={inputType}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={describedBy}
            className={inputClassName}
            {...props}
          />
          <button
            type="button"
            onClick={() => setIsPasswordVisible((visible) => !visible)}
            disabled={props.disabled}
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5",
              "text-[var(--primary-500)] transition-colors",
              "hover:text-[var(--accent-600)] focus-visible:outline-none",
              "focus-visible:ring-2 focus-visible:ring-[var(--accent-200)]",
              "disabled:pointer-events-none disabled:opacity-50"
            )}
          >
            {isPasswordVisible ? (
              <EyeOff size={18} aria-hidden="true" />
            ) : (
              <Eye size={18} aria-hidden="true" />
            )}
          </button>
        </div>
      ) : (
        <input
          id={inputId}
          type={type}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={describedBy}
          className={inputClassName}
          {...props}
        />
      )}

      {error ? (
        <p id={`${inputId}-error`} className="text-sm text-[var(--error-600)]">
          {error}
        </p>
      ) : (
        helperText && (
          <p
            id={`${inputId}-helper`}
            className="text-sm text-[var(--primary-600)]"
          >
            {helperText}
          </p>
        )
      )}
    </div>
  );
}
