import { Fragment } from "react";
import { cn } from "../../../utils/cn";
import { AI_ONE_LINE_PLACEHOLDER } from "../../experiences/components/skillChipVariantsMock";

export default function ActivityDetailHeader({
  activityTitle,
  breadcrumbs,
  eyebrow = "Evidence",
  actions,
  className = "",
}) {
  return (
    <header
      className={cn(
        "flex flex-col gap-4 border-b border-[var(--neutral-200)] pb-6",
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

        <h1 className="font-[var(--font-heading)] text-3xl font-bold text-[var(--primary-900)]">
          {activityTitle || "Activity"}
        </h1>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p className="min-w-0 flex-1 text-base italic leading-relaxed text-[var(--primary-500)]">
            {AI_ONE_LINE_PLACEHOLDER}
          </p>

          {actions && (
            <div className="flex shrink-0 flex-wrap items-center gap-3">{actions}</div>
          )}
        </div>
      </div>
    </header>
  );
}
