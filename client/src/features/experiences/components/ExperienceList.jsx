import Button from "../../../components/ui/Button";
import ExperienceListItem from "./ExperienceListItem";

function ExperienceListPagination({
  total,
  page,
  pageSize,
  onPageChange,
  isLoading,
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const showingFrom = total === 0 ? 0 : page * pageSize + 1;
  const showingTo = Math.min(total, (page + 1) * pageSize);

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-[var(--primary-600)]">
        Showing {showingFrom}–{showingTo} of {total} experiences
      </p>
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 0 || isLoading}
        >
          Previous
        </Button>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={() => onPageChange(page + 1)}
          disabled={page + 1 >= totalPages || isLoading}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default function ExperienceList({
  experiences,
  onAddExperience,
  total = 0,
  page = 0,
  pageSize = 20,
  onPageChange,
  hasActiveFilters = false,
  onClearFilters,
  isLoading = false,
}) {
  if (!isLoading && experiences.length === 0) {
    if (hasActiveFilters) {
      return (
        <div className="rounded-lg border border-[var(--neutral-200)] bg-[var(--neutral-000)] px-6 py-8">
          <p className="text-sm text-[var(--primary-600)]">
            No experiences match your filters. Try adjusting search or filter criteria.
          </p>
          <div className="mt-6">
            <Button type="button" size="sm" variant="secondary" onClick={onClearFilters}>
              Clear filters
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-lg border border-dashed border-[var(--neutral-300)] bg-[var(--neutral-000)] px-6 py-8">
        <p className="text-sm text-[var(--primary-600)]">
          No experiences yet. Add a job, project, course, or other evidence container to start
          building your career record.
        </p>
        <div className="mt-6">
          <Button type="button" size="sm" onClick={onAddExperience}>
            Add your first experience
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col gap-3">
      {total > 0 && (
        <ExperienceListPagination
          total={total}
          page={page}
          pageSize={pageSize}
          onPageChange={onPageChange}
          isLoading={isLoading}
        />
      )}

      {isLoading && (
        <div
          className="absolute inset-0 z-10 flex items-start justify-center rounded-lg bg-[var(--neutral-000)]/70 pt-8"
          aria-live="polite"
          aria-busy="true"
        >
          <p className="text-sm text-[var(--primary-600)]">Updating list…</p>
        </div>
      )}

      <ul className="flex flex-col gap-4">
        {experiences.map((experience) => (
          <li key={experience.id}>
            <ExperienceListItem experience={experience} />
          </li>
        ))}
      </ul>
    </div>
  );
}
