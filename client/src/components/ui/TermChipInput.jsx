import { useId, useState } from "react";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";
import Button from "./Button";
import SkillChip from "./SkillChip";
import {
  entryChipVariantForKind,
  normalizeTermList,
  TERM_KIND,
} from "../../utils/skillTechnologyChipUtils";

const fieldClass =
  "min-w-0 flex-1 rounded-md border border-[var(--neutral-300)] bg-[var(--neutral-000)] " +
  "px-4 py-3 text-[var(--primary-900)] outline-none transition-all duration-200 " +
  "placeholder:text-[var(--neutral-400)] " +
  "focus:border-[var(--accent-600)] focus:ring-[3px] focus:ring-[var(--accent-200)] " +
  "disabled:cursor-not-allowed disabled:opacity-50";

export default function TermChipInput({
  label,
  kind = TERM_KIND.TECHNOLOGY,
  values = [],
  onChange,
  disabled = false,
  helperText,
  placeholder,
  className = "",
}) {
  const inputId = useId();
  const listId = `${inputId}-chips`;
  const [draft, setDraft] = useState("");

  const normalizedValues = normalizeTermList(values);
  const chipVariant = entryChipVariantForKind(kind);
  const addLabel = kind === TERM_KIND.TECHNOLOGY ? "Add technology" : "Add skill";

  const handleAdd = () => {
    const trimmed = draft.trim();

    if (!trimmed) {
      return;
    }

    const next = normalizeTermList([...normalizedValues, trimmed]);

    if (next.length === normalizedValues.length) {
      setDraft("");
      return;
    }

    onChange(next);
    setDraft("");
  };

  const handleRemove = (index) => {
    onChange(normalizedValues.filter((_, itemIndex) => itemIndex !== index));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-[var(--primary-800)]">
          {label}
        </label>
      )}

      {normalizedValues.length > 0 && (
        <div
          id={listId}
          className="flex flex-wrap gap-2"
          role="list"
          aria-label={`${label || kind} terms`}
        >
          {normalizedValues.map((term, index) => (
            <span key={`${term}-${index}`} role="listitem" className="inline-flex">
              <SkillChip
                variant={chipVariant}
                className="gap-1.5 pr-2"
                aria-label={`${term}, remove`}
              >
                {term}
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  disabled={disabled}
                  className={cn(
                    "inline-flex rounded-full p-0.5 text-current transition-opacity",
                    "hover:opacity-80 focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-[var(--accent-200)] disabled:pointer-events-none disabled:opacity-50"
                  )}
                  aria-label={`Remove ${term}`}
                >
                  <X size={14} aria-hidden="true" />
                </button>
              </SkillChip>
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
        <input
          id={inputId}
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={
            placeholder ||
            (kind === TERM_KIND.TECHNOLOGY
              ? "e.g. React, .NET"
              : "e.g. Leadership, Problem solving")
          }
          aria-describedby={helperText ? `${inputId}-helper` : undefined}
          className={fieldClass}
        />
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={handleAdd}
          disabled={disabled || !draft.trim()}
          className="shrink-0"
        >
          {addLabel}
        </Button>
      </div>

      {helperText && (
        <p id={`${inputId}-helper`} className="text-sm text-[var(--primary-600)]">
          {helperText}
        </p>
      )}
    </div>
  );
}
