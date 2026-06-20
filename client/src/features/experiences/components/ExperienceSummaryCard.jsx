import { cn } from "../../../utils/cn";
import TypeChip from "../../../components/ui/TypeChip";
import SkillTechnologyChipList from "../../../components/ui/SkillTechnologyChipList";
import { AI_ONE_LINE_PLACEHOLDER } from "./skillChipVariantsMock";
import {
  hasSkillTechnologyTerms,
  toDisplayChips,
} from "../../../utils/skillTechnologyChipUtils";
import {
  EXPERIENCE_TYPE_ICONS,
  formatExperienceActivityLine,
  formatExperienceDateRange,
  formatExperienceRoleLine,
  formatExperienceType,
} from "./experienceUi";

export default function ExperienceSummaryCard({
  experience,
  activityCount,
  onClick,
  className = "",
}) {
  const Icon =
    EXPERIENCE_TYPE_ICONS[experience.type] || EXPERIENCE_TYPE_ICONS.job;
  const dateRange = formatExperienceDateRange(experience);
  const roleLine = formatExperienceRoleLine(experience);
  const activityLine = formatExperienceActivityLine(experience, activityCount);
  const chips = toDisplayChips(experience);
  const hasChips = hasSkillTechnologyTerms(experience);
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
        <span className="mt-0.5 text-[var(--accent-600)]" aria-hidden="true">
          <Icon size={24} />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h3 className="text-lg font-semibold text-[var(--primary-900)]">
              {experience.title}
            </h3>
            <TypeChip>{formatExperienceType(experience.type)}</TypeChip>
          </div>

          {dateRange && (
            <p className="mt-1 text-sm text-[var(--primary-600)]">{dateRange}</p>
          )}

          {roleLine && (
            <p className="mt-1 text-sm text-[var(--primary-700)]">{roleLine}</p>
          )}

          <p className="mt-2 text-sm italic leading-relaxed text-[var(--primary-500)]">
            {AI_ONE_LINE_PLACEHOLDER}
          </p>

          <p className="mt-2 text-sm text-[var(--primary-700)]">{activityLine}</p>

          {hasChips && (
            <div className="mt-4 flex flex-col gap-2">
              <SkillTechnologyChipList chips={chips} />
              <p className="text-xs text-[var(--primary-500)]">
                AI-assisted ranking and extraction — coming in a later phase.
              </p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
