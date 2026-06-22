import Button from "../../../components/ui/Button";
import ExperienceActivityListItem from "./ExperienceActivityListItem";

const SORT_OPTIONS = [
  { value: "updatedAt:desc", label: "Recently updated" },
  { value: "updatedAt:asc", label: "Oldest updated" },
  { value: "createdAt:desc", label: "Recently created" },
  { value: "title:asc", label: "Title A–Z" },
];

const selectClass =
  "rounded-md border border-[var(--neutral-300)] bg-[var(--neutral-000)] px-3 py-2 text-sm " +
  "text-[var(--primary-900)] outline-none focus:border-[var(--accent-600)] " +
  "focus:ring-[2px] focus:ring-[var(--accent-200)]";

export default function ExperienceActivitySection({
  activities,
  total = 0,
  page = 0,
  pageSize = 8,
  sort = "updatedAt",
  order = "desc",
  dateFrom = "",
  dateTo = "",
  isDateFilterActive = false,
  onOpenCreate,
  onSortChange,
  onDateFromChange,
  onDateToChange,
  onClearDateFilter,
  onPageChange,
  showFilters = false,
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const showingFrom = total === 0 ? 0 : page * pageSize + 1;
  const showingTo = Math.min(total, (page + 1) * pageSize);
  const sortValue = `${sort}:${order}`;
  const showToolbarAdd = showFilters;

  return (
    <section className="flex flex-col gap-4">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="flex min-w-0 flex-col gap-1">
          <h2 className="text-lg font-semibold text-[var(--primary-900)]">Activities</h2>
          <p className="text-sm text-[var(--primary-600)]">
            Reusable evidence items linked to this experience.
          </p>
        </div>
        {showToolbarAdd && (
          <Button
            type="button"
            size="sm"
            className="shrink-0 self-start"
            onClick={onOpenCreate}
          >
            Add activity
          </Button>
        )}
      </header>

      {showFilters && (
        <div className="flex flex-col gap-3 rounded-lg border border-[var(--neutral-200)] bg-[var(--neutral-000)] p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-end">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="activity-sort"
                className="text-sm font-medium text-[var(--primary-800)]"
              >
                Sort
              </label>
              <select
                id="activity-sort"
                className={selectClass}
                value={sortValue}
                onChange={(event) => onSortChange(event.target.value)}
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="activity-date-from"
                className="text-sm font-medium text-[var(--primary-800)]"
              >
                Updated from
              </label>
              <input
                id="activity-date-from"
                type="date"
                className={selectClass}
                value={dateFrom}
                onChange={(event) => onDateFromChange(event.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="activity-date-to"
                className="text-sm font-medium text-[var(--primary-800)]"
              >
                Updated to
              </label>
              <input
                id="activity-date-to"
                type="date"
                className={selectClass}
                value={dateTo}
                onChange={(event) => onDateToChange(event.target.value)}
              />
            </div>

            {isDateFilterActive && (
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={onClearDateFilter}
              >
                Clear dates
              </Button>
            )}
          </div>

          {isDateFilterActive && (
            <p className="text-xs text-[var(--primary-500)]">
              Date filter applies to loaded activities by last updated date. Server-side
              date-range querying is planned for a future ticket.
            </p>
          )}
        </div>
      )}

      {activities.length > 0 ? (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {activities.map((activity) => (
            <li key={activity.id}>
              <ExperienceActivityListItem activity={activity} />
            </li>
          ))}
        </ul>
      ) : isDateFilterActive ? (
        <p className="rounded-lg border border-[var(--neutral-200)] bg-[var(--neutral-000)] px-6 py-6 text-sm text-[var(--primary-600)]">
          No activities match this date range.
        </p>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed border-[var(--neutral-300)] bg-[var(--neutral-000)] px-6 py-10 text-center">
          <div className="flex max-w-md flex-col gap-2">
            <p className="text-base font-medium text-[var(--primary-800)]">
              No activities yet
            </p>
            <p className="text-sm text-[var(--primary-600)]">
              Add achievements, responsibilities, or project work as reusable evidence for
              this experience.
            </p>
          </div>
          <Button type="button" size="sm" onClick={onOpenCreate}>
            Add your first activity
          </Button>
        </div>
      )}

      {total > 0 && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--primary-600)]">
            Showing {showingFrom}–{showingTo} of {total} activities
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => onPageChange(page - 1)}
              disabled={page === 0}
            >
              Previous
            </Button>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => onPageChange(page + 1)}
              disabled={page + 1 >= totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
