// client/src/components/ui/EvidenceCard.jsx
import { cn } from "../../utils/cn";
import SkillChip from "./SkillChip";

/**
 * Foundational evidence surface used across Experiences, Activities,
 * Opportunity matching, dashboard previews, and the landing page mock.
 */
export default function EvidenceCard({
  icon: Icon,
  title,
  meta,
  description,
  tags = [],
  onClick,
  className = "",
}) {
  const isClickable = typeof onClick === "function";

  return (
    <article
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        isClickable
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onClick(event);
              }
            }
          : undefined
      }
      className={cn(
        "rounded-lg border border-[var(--evidence-border)] border-l-4 border-l-[var(--accent-600)] " +
          "bg-[var(--evidence-warm)] p-6 transition-all duration-200",
        isClickable &&
          "cursor-pointer hover:-translate-y-0.5 hover:border-l-[var(--accent-500)] " +
            "hover:shadow-[var(--shadow-accent)] focus-visible:outline-none " +
            "focus-visible:ring-2 focus-visible:ring-[var(--accent-200)]",
        className
      )}
    >
      <div className="flex items-start gap-3">
        {Icon && (
          <span className="mt-0.5 text-[var(--accent-600)]" aria-hidden="true">
            <Icon size={24} />
          </span>
        )}

        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-[var(--primary-900)]">
            {title}
          </h3>

          {meta && (
            <p className="mt-1 text-sm text-[var(--primary-600)]">{meta}</p>
          )}

          {description && (
            <p className="mt-2 text-sm leading-relaxed text-[var(--primary-700)]">
              {description}
            </p>
          )}

          {tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <SkillChip key={tag} variant="neutral">
                  {tag}
                </SkillChip>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
