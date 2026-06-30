import { EXPERIENCE_TYPE_OPTIONS } from "./experienceUi";

export const EXPERIENCE_LIST_PAGE_SIZE = 20;

export const DEFAULT_EXPERIENCE_LIST_QUERY = {
  search: "",
  types: [],
  dateFrom: "",
  dateTo: "",
  isCurrent: "",
  skills: [],
  technologies: [],
  minDuration: "",
  maxDuration: "",
  sort: "updatedAt",
  order: "desc",
  limit: EXPERIENCE_LIST_PAGE_SIZE,
  offset: 0,
};

export const EXPERIENCE_LIST_SORT_OPTIONS = [
  { value: "updatedAt:desc", label: "Recently updated", sort: "updatedAt", order: "desc" },
  { value: "updatedAt:asc", label: "Oldest updated", sort: "updatedAt", order: "asc" },
  { value: "dateStart:desc", label: "Start date (newest first)", sort: "dateStart", order: "desc" },
  { value: "dateStart:asc", label: "Start date (oldest first)", sort: "dateStart", order: "asc" },
  { value: "dateEnd:desc", label: "End date (newest first)", sort: "dateEnd", order: "desc" },
  { value: "title:asc", label: "Title A–Z", sort: "title", order: "asc" },
  { value: "type:asc", label: "Type", sort: "type", order: "asc" },
  { value: "duration:desc", label: "Longest tenure", sort: "duration", order: "desc" },
  { value: "duration:asc", label: "Shortest tenure", sort: "duration", order: "asc" },
  { value: "activityCount:desc", label: "Most activities", sort: "activityCount", order: "desc" },
  { value: "activityCount:asc", label: "Fewest activities", sort: "activityCount", order: "asc" },
];

export const EXPERIENCE_CURRENT_FILTER_OPTIONS = [
  { value: "", label: "All experiences" },
  { value: "true", label: "Current only" },
  { value: "false", label: "Not current" },
];

export const toolbarFieldClass =
  "rounded-md border border-[var(--neutral-300)] bg-[var(--neutral-000)] px-3 py-2 text-sm " +
  "text-[var(--primary-900)] outline-none focus:border-[var(--accent-600)] " +
  "focus:ring-[2px] focus:ring-[var(--accent-200)]";

export function formatExperienceListSortValue(sort, order) {
  return `${sort}:${order}`;
}

export function parseExperienceListSortValue(value) {
  const [sort, order] = value.split(":");

  const match = EXPERIENCE_LIST_SORT_OPTIONS.find(
    (option) => option.sort === sort && option.order === order
  );

  if (match) {
    return { sort: match.sort, order: match.order };
  }

  return { sort: "updatedAt", order: "desc" };
}

export function buildExperienceListParams(query) {
  const params = {
    sort: query.sort,
    order: query.order,
    limit: query.limit,
    offset: query.offset,
  };

  const search = query.search?.trim();

  if (search) {
    params.search = search;
  }

  if (query.types?.length) {
    params.type = query.types.join(",");
  }

  if (query.dateFrom) {
    params.dateFrom = query.dateFrom;
  }

  if (query.dateTo) {
    params.dateTo = query.dateTo;
  }

  if (query.isCurrent === "true") {
    params.isCurrent = true;
  } else if (query.isCurrent === "false") {
    params.isCurrent = false;
  }

  if (query.skills?.length) {
    params.skill = query.skills.join(",");
  }

  if (query.technologies?.length) {
    params.technology = query.technologies.join(",");
  }

  if (query.minDuration !== "" && query.minDuration != null) {
    params.minDuration = Number(query.minDuration);
  }

  if (query.maxDuration !== "" && query.maxDuration != null) {
    params.maxDuration = Number(query.maxDuration);
  }

  return params;
}

export function hasActiveExperienceListFilters(query) {
  return Boolean(
    query.search?.trim() ||
      query.types?.length ||
      query.dateFrom ||
      query.dateTo ||
      query.isCurrent === "true" ||
      query.isCurrent === "false" ||
      query.skills?.length ||
      query.technologies?.length ||
      (query.minDuration !== "" && query.minDuration != null) ||
      (query.maxDuration !== "" && query.maxDuration != null) ||
      query.sort !== DEFAULT_EXPERIENCE_LIST_QUERY.sort ||
      query.order !== DEFAULT_EXPERIENCE_LIST_QUERY.order
  );
}

export { EXPERIENCE_TYPE_OPTIONS };
