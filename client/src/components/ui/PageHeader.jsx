// client/src/components/ui/PageHeader.jsx
import { Fragment } from "react";
import { cn } from "../../utils/cn";

export default function PageHeader({
  title,
  description,
  eyebrow,
  breadcrumbs,
  actions,
  className = "",
}) {
  return (
    <header
      className={cn(
        "flex flex-col gap-4 border-b border-[var(--neutral-200)] pb-6 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className="flex flex-col gap-2">
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
          {title}
        </h1>

        {description && (
          <p className="max-w-2xl text-base text-[var(--primary-600)]">
            {description}
          </p>
        )}
      </div>

      {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
    </header>
  );
}
