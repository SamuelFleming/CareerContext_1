import { Fragment } from "react";
import { cn } from "../../../utils/cn";
import TypeChip from "../../../components/ui/TypeChip";
import { AI_ONE_LINE_PLACEHOLDER } from "./skillChipVariantsMock";
import {
  formatExperienceActivityLine,
  formatExperienceDateRange,
  formatExperienceRoleLine,
  formatExperienceType,
} from "./experienceUi";

export default function ExperienceDetailHeader({
  experience,
  activityCount,
  breadcrumbs,
  eyebrow = "Evidence",
  actions,
  className = "",
}) {
  if (!experience) {
    return null;
  }

  const dateRange = formatExperienceDateRange(experience);
  const roleLine = formatExperienceRoleLine(experience);
  const activityLine = formatExperienceActivityLine(experience, activityCount);

  return (
    <header
      className={cn(
        "flex flex-col gap-4 border-b border-[var(--neutral-200)] pb-6 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className="flex min-w-0 flex-col gap-2">
        {breadcrumbs?.length > 0 && (
          <nav aria-label="Breadcrumb" className="text-sm text-[var(--primary-600)]">
            {breadcrumbs.map((crumb, index) => (
              <Fragment key={crumb.label ?? index}>
                {index > 0 && <span className="mx-1.5 opacity-60">/</span>}
                <span>{crumb.label ?? crumb}</span>
              </Fragment>
            ))}
          </nav>
        )}

        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-600)]">
            {eyebrow}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h1 className="font-[var(--font-heading)] text-3xl font-bold text-[var(--primary-900)]">
            {experience.title}
          </h1>
          <TypeChip>{formatExperienceType(experience.type)}</TypeChip>
        </div>

        {dateRange && (
          <p className="text-base text-[var(--primary-600)]">{dateRange}</p>
        )}

        {roleLine && (
          <p className="text-base text-[var(--primary-700)]">{roleLine}</p>
        )}

        <p className="max-w-2xl text-base italic leading-relaxed text-[var(--primary-500)]">
          {AI_ONE_LINE_PLACEHOLDER}
        </p>

        <p className="text-base text-[var(--primary-700)]">{activityLine}</p>
      </div>

      {actions && (
        <div className="flex flex-wrap items-center gap-3">{actions}</div>
      )}
    </header>
  );
}
