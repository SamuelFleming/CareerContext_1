import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import TermChipInput from "../../../components/ui/TermChipInput";
import { TERM_KIND } from "../../../utils/skillTechnologyChipUtils";
import {
  EXPERIENCE_CURRENT_FILTER_OPTIONS,
  EXPERIENCE_LIST_SORT_OPTIONS,
  EXPERIENCE_TYPE_OPTIONS,
  formatExperienceListSortValue,
  toolbarFieldClass,
} from "./experienceListQuery";

export default function ExperienceListToolbar({
  query,
  searchInput,
  onSearchInputChange,
  onSortChange,
  onTypeToggle,
  onCurrentFilterChange,
  onDateFromChange,
  onDateToChange,
  onSkillsChange,
  onTechnologiesChange,
  onMinDurationChange,
  onMaxDurationChange,
  onClearFilters,
  hasActiveFilters = false,
}) {
  const sortValue = formatExperienceListSortValue(query.sort, query.order);
  const hasDateRange = Boolean(query.dateFrom || query.dateTo);

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-[var(--neutral-200)] bg-[var(--neutral-000)] p-3">
      <Input
        label="Search"
        type="search"
        placeholder="Title, organisation, role, skill, or technology"
        value={searchInput}
        onChange={(event) => onSearchInputChange(event.target.value)}
        className="py-2"
      />

      <div className="flex flex-col gap-2 lg:flex-row lg:flex-wrap lg:items-end">
        <div className="flex min-w-[11rem] flex-col gap-1">
          <label htmlFor="experience-sort" className="text-sm font-medium text-[var(--primary-800)]">
            Sort
          </label>
          <select
            id="experience-sort"
            className={toolbarFieldClass}
            value={sortValue}
            onChange={(event) => onSortChange(event.target.value)}
          >
            {EXPERIENCE_LIST_SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex min-w-[9rem] flex-col gap-1">
          <label
            htmlFor="experience-current-filter"
            className="text-sm font-medium text-[var(--primary-800)]"
          >
            Status
          </label>
          <select
            id="experience-current-filter"
            className={toolbarFieldClass}
            value={query.isCurrent}
            onChange={(event) => onCurrentFilterChange(event.target.value)}
          >
            {EXPERIENCE_CURRENT_FILTER_OPTIONS.map((option) => (
              <option key={option.value || "all"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="experience-date-from"
            className="text-sm font-medium text-[var(--primary-800)]"
          >
            Period from
          </label>
          <input
            id="experience-date-from"
            type="date"
            className={toolbarFieldClass}
            value={query.dateFrom}
            onChange={(event) => onDateFromChange(event.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="experience-date-to"
            className="text-sm font-medium text-[var(--primary-800)]"
          >
            Period to
          </label>
          <input
            id="experience-date-to"
            type="date"
            className={toolbarFieldClass}
            value={query.dateTo}
            onChange={(event) => onDateToChange(event.target.value)}
          />
        </div>

        <div className="flex w-24 flex-col gap-1">
          <label
            htmlFor="experience-min-duration"
            className="text-sm font-medium text-[var(--primary-800)]"
          >
            Min months
          </label>
          <input
            id="experience-min-duration"
            type="number"
            min="0"
            className={toolbarFieldClass}
            placeholder="0"
            value={query.minDuration}
            onChange={(event) => onMinDurationChange(event.target.value)}
          />
        </div>

        <div className="flex w-24 flex-col gap-1">
          <label
            htmlFor="experience-max-duration"
            className="text-sm font-medium text-[var(--primary-800)]"
          >
            Max months
          </label>
          <input
            id="experience-max-duration"
            type="number"
            min="0"
            className={toolbarFieldClass}
            placeholder="Any"
            value={query.maxDuration}
            onChange={(event) => onMaxDurationChange(event.target.value)}
          />
        </div>

        {hasActiveFilters && (
          <Button type="button" size="sm" variant="secondary" onClick={onClearFilters}>
            Clear filters
          </Button>
        )}
      </div>

      {hasDateRange && (
        <p className="text-xs text-[var(--primary-500)]">
          Shows experiences whose dates overlap the period — still active on or after{" "}
          <span className="font-medium">Period from</span>, and started on or before{" "}
          <span className="font-medium">Period to</span>.
        </p>
      )}

      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
        <TermChipInput
          label="Skills"
          kind={TERM_KIND.SKILL}
          values={query.skills}
          onChange={onSkillsChange}
          className="gap-1.5"
        />
        <TermChipInput
          label="Technologies"
          kind={TERM_KIND.TECHNOLOGY}
          values={query.technologies}
          onChange={onTechnologiesChange}
          className="gap-1.5"
        />
      </div>

      <fieldset className="flex flex-col gap-1 border-0 p-0">
        <legend className="mb-1 text-sm font-medium text-[var(--primary-800)]">Type</legend>
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {EXPERIENCE_TYPE_OPTIONS.map(({ value, label }) => {
            const checked = query.types.includes(value);

            return (
              <label
                key={value}
                className="flex cursor-pointer items-center gap-1.5 text-sm text-[var(--primary-700)]"
              >
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 rounded border-[var(--neutral-300)] text-[var(--accent-600)] focus:ring-[var(--accent-200)]"
                  checked={checked}
                  onChange={() => onTypeToggle(value)}
                />
                {label}
              </label>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
