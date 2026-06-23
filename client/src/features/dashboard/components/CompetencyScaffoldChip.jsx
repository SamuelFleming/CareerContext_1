// client/src/features/dashboard/components/CompetencyScaffoldChip.jsx
import { cn } from "../../../utils/cn";

const DEFAULT_HINT =
  "Profile-level competencies will be AI-derived in a future phase. These preview labels are placeholder data.";

export default function CompetencyScaffoldChip({
  label,
  hint = DEFAULT_HINT,
  className = "",
}) {
  return (
    <span className={cn("group relative inline-flex", className)}>
      <span
        tabIndex={0}
        className={
          "inline-flex items-center rounded-full border border-dashed px-4 py-1.5 " +
          "border-[var(--primary-400)] bg-[var(--neutral-100)]/80 text-sm font-medium " +
          "text-[var(--primary-600)] transition-colors " +
          "group-hover:border-[var(--accent-400)] group-hover:bg-[var(--accent-100)]/40 " +
          "group-focus-within:border-[var(--accent-400)] group-focus-within:ring-2 " +
          "group-focus-within:ring-[var(--accent-200)]"
        }
      >
        {label}
      </span>

      <span
        role="tooltip"
        className={
          "pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-56 -translate-x-1/2 " +
          "rounded-md border border-[var(--neutral-200)] bg-[var(--neutral-000)] px-3 py-2 " +
          "text-xs leading-relaxed text-[var(--primary-700)] shadow-[var(--shadow-md)] " +
          "opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
        }
      >
        {hint}
      </span>
    </span>
  );
}
