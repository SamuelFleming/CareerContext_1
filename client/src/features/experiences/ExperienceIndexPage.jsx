import { useCallback, useEffect, useRef, useState } from "react";
import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";
import {
  createExperience,
  listExperiences,
} from "../../services/experienceService";
import ExperienceList from "./components/ExperienceList";
import ExperienceListToolbar from "./components/ExperienceListToolbar";
import ExperienceCreateModal from "./components/ExperienceCreateModal";
import { buildExperiencePayload } from "./components/experienceFormUtils";
import { emptyCreateForm } from "./components/experienceUi";
import {
  buildExperienceListParams,
  DEFAULT_EXPERIENCE_LIST_QUERY,
  EXPERIENCE_LIST_PAGE_SIZE,
  hasActiveExperienceListFilters,
  parseExperienceListSortValue,
} from "./components/experienceListQuery";

const SEARCH_DEBOUNCE_MS = 300;

export default function ExperienceIndexPage() {
  const [query, setQuery] = useState(DEFAULT_EXPERIENCE_LIST_QUERY);
  const [searchInput, setSearchInput] = useState("");
  const [experiences, setExperiences] = useState([]);
  const [total, setTotal] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isListLoading, setIsListLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState(emptyCreateForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const hasLoadedOnceRef = useRef(false);
  const searchDebounceRef = useRef(null);

  const loadExperiences = useCallback(async (listQuery) => {
    const isSubsequentLoad = hasLoadedOnceRef.current;

    if (isSubsequentLoad) {
      setIsListLoading(true);
    } else {
      setIsInitialLoading(true);
    }

    setLoadError("");

    try {
      const response = await listExperiences(buildExperienceListParams(listQuery));

      setExperiences(response.data || []);
      setTotal(response.meta?.total ?? 0);
      hasLoadedOnceRef.current = true;
    } catch (error) {
      setLoadError(error.message || "Unable to load experiences.");
    } finally {
      setIsInitialLoading(false);
      setIsListLoading(false);
    }
  }, []);

  useEffect(() => {
    loadExperiences(query);
  }, [query, loadExperiences]);

  useEffect(() => {
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }

    searchDebounceRef.current = setTimeout(() => {
      setQuery((current) => {
        if (current.search === searchInput) {
          return current;
        }

        return { ...current, search: searchInput, offset: 0 };
      });
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      if (searchDebounceRef.current) {
        clearTimeout(searchDebounceRef.current);
      }
    };
  }, [searchInput]);

  const updateQuery = (patch) => {
    setQuery((current) => ({ ...current, ...patch, offset: 0 }));
  };

  const handleSortChange = (sortValue) => {
    const { sort, order } = parseExperienceListSortValue(sortValue);
    updateQuery({ sort, order });
  };

  const handleTypeToggle = (typeValue) => {
    setQuery((current) => {
      const types = current.types.includes(typeValue)
        ? current.types.filter((type) => type !== typeValue)
        : [...current.types, typeValue];

      return { ...current, types, offset: 0 };
    });
  };

  const handlePageChange = (nextPage) => {
    setQuery((current) => ({
      ...current,
      offset: Math.max(0, nextPage) * current.limit,
    }));
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setQuery({ ...DEFAULT_EXPERIENCE_LIST_QUERY });
  };

  const handleCreateFieldChange = (field, value) => {
    setCreateForm((current) => {
      const next = { ...current, [field]: value };

      if (field === "isCurrent" && value) {
        next.dateEnd = "";
      }

      return next;
    });
  };

  const handleOpenCreate = () => {
    setSubmitError("");
    setIsCreateOpen(true);
  };

  const handleCloseCreate = () => {
    if (isSubmitting) {
      return;
    }

    setIsCreateOpen(false);
    setSubmitError("");
    setCreateForm(emptyCreateForm);
  };

  const handleCreateSubmit = async () => {
    if (!createForm.title.trim()) {
      setSubmitError("Title is required.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await createExperience(buildExperiencePayload(createForm));
      setIsCreateOpen(false);
      setCreateForm(emptyCreateForm);
      await loadExperiences(query);
    } catch (error) {
      setSubmitError(error.message || "Unable to create experience.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasActiveFilters = hasActiveExperienceListFilters(query);
  const currentPage = Math.floor(query.offset / query.limit);

  if (isInitialLoading) {
    return (
      <div className="flex flex-col gap-8">
        <PageHeader
          eyebrow="Evidence"
          title="Experiences"
          description="Loading your career evidence containers…"
        />
        <p className="text-sm text-[var(--primary-600)]">Loading experiences…</p>
      </div>
    );
  }

  if (loadError && !hasLoadedOnceRef.current) {
    return (
      <div className="flex flex-col gap-8">
        <PageHeader
          eyebrow="Evidence"
          title="Experiences"
          description="Browse and create jobs, projects, courses, and other evidence containers."
        />
        <div
          role="alert"
          className="rounded-md border border-[var(--error-100)] bg-[var(--error-100)]/40 px-4 py-3 text-sm text-[var(--error-600)]"
        >
          {loadError}
        </div>
        <Button type="button" onClick={() => loadExperiences(query)}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Evidence"
        title="Experiences"
        description="Browse and create jobs, projects, courses, and other evidence containers."
        actions={
          <Button type="button" size="sm" onClick={handleOpenCreate}>
            Add experience
          </Button>
        }
      />

      <ExperienceCreateModal
        isOpen={isCreateOpen}
        form={createForm}
        onChange={handleCreateFieldChange}
        onClose={handleCloseCreate}
        onSubmit={handleCreateSubmit}
        isSubmitting={isSubmitting}
        submitError={submitError}
      />

      <ExperienceListToolbar
        query={query}
        searchInput={searchInput}
        onSearchInputChange={setSearchInput}
        onSortChange={handleSortChange}
        onTypeToggle={handleTypeToggle}
        onCurrentFilterChange={(value) => updateQuery({ isCurrent: value })}
        onDateFromChange={(value) => updateQuery({ dateFrom: value })}
        onDateToChange={(value) => updateQuery({ dateTo: value })}
        onSkillsChange={(values) => updateQuery({ skills: values })}
        onTechnologiesChange={(values) => updateQuery({ technologies: values })}
        onMinDurationChange={(value) => updateQuery({ minDuration: value })}
        onMaxDurationChange={(value) => updateQuery({ maxDuration: value })}
        onClearFilters={handleClearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {loadError && (
        <div
          role="alert"
          className="rounded-md border border-[var(--error-100)] bg-[var(--error-100)]/40 px-4 py-3 text-sm text-[var(--error-600)]"
        >
          {loadError}
        </div>
      )}

      <ExperienceList
        experiences={experiences}
        onAddExperience={handleOpenCreate}
        total={total}
        page={currentPage}
        pageSize={query.limit || EXPERIENCE_LIST_PAGE_SIZE}
        onPageChange={handlePageChange}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={handleClearFilters}
        isLoading={isListLoading}
      />
    </div>
  );
}
