import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";
import {
  deleteExperience,
  getExperienceWorkspace,
  listActivitiesForExperience,
  updateExperience,
  createActivityForExperience,
} from "../../services/experienceService";
import ExperienceDeleteConfirm from "./components/ExperienceDeleteConfirm";
import ExperienceActivitySection from "./components/ExperienceActivitySection";
import ExperienceDetailHeader from "./components/ExperienceDetailHeader";
import ExperienceEditModal from "./components/ExperienceEditModal";
import ExperienceSkillsTechnologiesWidget from "./components/ExperienceSkillsTechnologiesWidget";
import ExperienceOverviewWidget from "./components/ExperienceOverviewWidget";
import {
  ACTIVITY_PAGE_SIZE,
  filterActivitiesByUpdatedDateRange,
  paginateActivities,
} from "./components/activityListUtils";
import {
  buildExperiencePayload,
  experienceToForm,
  emptyActivityForm,
} from "./components/experienceFormUtils";
import { buildActivityPayload } from "../activities/components/activityFormUtils";
import ActivityFormModal from "../activities/components/ActivityFormModal";

const DATE_FILTER_FETCH_LIMIT = 100;

function useSaveStatus() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const resetSaved = useCallback(() => {
    const timer = setTimeout(() => setStatus("idle"), 2500);
    return () => clearTimeout(timer);
  }, []);

  const runSave = useCallback(async (saveFn) => {
    setStatus("saving");
    setError("");

    try {
      await saveFn();
      setStatus("saved");
      return true;
    } catch (saveError) {
      setStatus("error");
      setError(saveError.message || "Unable to save changes.");
      return false;
    }
  }, []);

  return { status, error, runSave, resetSaved };
}

function isNotFoundError(error) {
  const message = error?.message?.toLowerCase() || "";
  return message.includes("not found") || message.includes("invalid experience");
}

function parseSortValue(value) {
  const [sort, order] = value.split(":");
  return { sort, order };
}

export default function ExperienceDetailPage() {
  const { experienceId } = useParams();
  const navigate = useNavigate();

  const [experience, setExperience] = useState(null);
  const [form, setForm] = useState(experienceToForm());
  const [activities, setActivities] = useState([]);
  const [activitiesTotal, setActivitiesTotal] = useState(0);
  const [hasAnyActivities, setHasAnyActivities] = useState(false);

  const [activityPage, setActivityPage] = useState(0);
  const [activitySort, setActivitySort] = useState("updatedAt");
  const [activityOrder, setActivityOrder] = useState("desc");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [isNotFound, setIsNotFound] = useState(false);

  const experienceSave = useSaveStatus();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const [isCreateActivityOpen, setIsCreateActivityOpen] = useState(false);
  const [activityForm, setActivityForm] = useState(emptyActivityForm);
  const [isCreatingActivity, setIsCreatingActivity] = useState(false);
  const [createActivityError, setCreateActivityError] = useState("");

  const isDateFilterActive = Boolean(dateFrom || dateTo);

  const loadActivities = useCallback(async () => {
    if (!experienceId) {
      return;
    }

    if (isDateFilterActive) {
      const response = await listActivitiesForExperience(experienceId, {
        sort: activitySort,
        order: activityOrder,
        limit: DATE_FILTER_FETCH_LIMIT,
        offset: 0,
      });

      const filtered = filterActivitiesByUpdatedDateRange(
        response.data || [],
        dateFrom,
        dateTo
      );

      setActivities(
        paginateActivities(filtered, activityPage, ACTIVITY_PAGE_SIZE)
      );
      setActivitiesTotal(filtered.length);

      const unfilteredTotal = response.meta?.total ?? response.data?.length ?? 0;
      if (unfilteredTotal > 0) {
        setHasAnyActivities(true);
      }
      return;
    }

    const response = await listActivitiesForExperience(experienceId, {
      sort: activitySort,
      order: activityOrder,
      limit: ACTIVITY_PAGE_SIZE,
      offset: activityPage * ACTIVITY_PAGE_SIZE,
    });

    const total = response.meta?.total ?? response.data?.length ?? 0;

    setActivities(response.data || []);
    setActivitiesTotal(total);
    if (total > 0) {
      setHasAnyActivities(true);
    }
  }, [
    experienceId,
    isDateFilterActive,
    dateFrom,
    dateTo,
    activityPage,
    activitySort,
    activityOrder,
  ]);

  const loadWorkspace = useCallback(async () => {
    if (!experienceId) {
      return;
    }

    setIsLoading(true);
    setLoadError("");
    setIsNotFound(false);

    try {
      const response = await getExperienceWorkspace(experienceId, {
        limit: ACTIVITY_PAGE_SIZE,
        offset: 0,
        sort: activitySort,
        order: activityOrder,
      });
      const data = response.data || {};

      setExperience(data.experience || null);
      setForm(experienceToForm(data.experience));
    } catch (error) {
      if (isNotFoundError(error)) {
        setIsNotFound(true);
      } else {
        setLoadError(error.message || "Unable to load experience.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [experienceId, activitySort, activityOrder]);

  useEffect(() => {
    loadWorkspace();
  }, [loadWorkspace]);

  useEffect(() => {
    if (!isLoading && !loadError && !isNotFound) {
      loadActivities();
    }
  }, [loadActivities, isLoading, loadError, isNotFound]);

  useEffect(() => {
    if (experienceSave.status === "saved") {
      return experienceSave.resetSaved();
    }
  }, [experienceSave.status, experienceSave.resetSaved]);

  const handleFormChange = (field, value) => {
    setForm((current) => {
      const next = { ...current, [field]: value };

      if (field === "isCurrent" && value) {
        next.dateEnd = "";
      }

      return next;
    });
  };

  const handleOpenEdit = () => {
    setForm(experienceToForm(experience));
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    if (experienceSave.status === "saving") {
      return;
    }

    setIsEditOpen(false);
    setForm(experienceToForm(experience));
  };

  const handleSave = async () => {
    if (!experienceId || !form.title.trim()) {
      await experienceSave.runSave(async () => {
        throw new Error("Title is required.");
      });
      return false;
    }

    const saved = await experienceSave.runSave(async () => {
      const response = await updateExperience(
        experienceId,
        buildExperiencePayload(form)
      );
      const updated = response.data?.experience;

      if (updated) {
        setExperience(updated);
        setForm(experienceToForm(updated));
      }
    });

    if (saved) {
      setIsEditOpen(false);
    }

    return saved;
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    setDeleteError("");

    try {
      await deleteExperience(experienceId);
      navigate("/experiences");
    } catch (error) {
      setDeleteError(error.message || "Unable to delete experience.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleOpenCreateActivity = () => {
    setCreateActivityError("");
    setIsCreateActivityOpen(true);
  };

  const handleCloseCreateActivity = () => {
    if (isCreatingActivity) {
      return;
    }

    setIsCreateActivityOpen(false);
    setCreateActivityError("");
    setActivityForm(emptyActivityForm);
  };

  const handleActivityFieldChange = (field, value) => {
    setActivityForm((current) => ({ ...current, [field]: value }));
  };

  const handleCreateActivity = async () => {
    if (!activityForm.title.trim()) {
      setCreateActivityError("Title is required.");
      return;
    }

    setIsCreatingActivity(true);
    setCreateActivityError("");

    try {
      await createActivityForExperience(experienceId, buildActivityPayload(activityForm));

      setIsCreateActivityOpen(false);
      setActivityForm(emptyActivityForm);
      setActivityPage(0);
      await loadActivities();
    } catch (error) {
      setCreateActivityError(error.message || "Unable to create activity.");
    } finally {
      setIsCreatingActivity(false);
    }
  };

  const handleSortChange = (value) => {
    const { sort, order } = parseSortValue(value);
    setActivitySort(sort);
    setActivityOrder(order);
    setActivityPage(0);
  };

  const handleDateFromChange = (value) => {
    setDateFrom(value);
    setActivityPage(0);
  };

  const handleDateToChange = (value) => {
    setDateTo(value);
    setActivityPage(0);
  };

  const handleClearDateFilter = () => {
    setDateFrom("");
    setDateTo("");
    setActivityPage(0);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8">
        <PageHeader
          eyebrow="Evidence"
          title="Experience"
          description="Loading experience workspace…"
        />
        <p className="text-sm text-[var(--primary-600)]">Loading…</p>
      </div>
    );
  }

  if (isNotFound) {
    return (
      <div className="flex flex-col gap-8">
        <PageHeader
          eyebrow="Evidence"
          title="Experience not found"
          description="This experience may have been deleted or the link is invalid."
        />
        <Link to="/experiences">
          <Button variant="secondary" size="sm">
            Back to Experiences
          </Button>
        </Link>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex flex-col gap-8">
        <PageHeader
          eyebrow="Evidence"
          title="Experience"
          description="Could not load this experience workspace."
        />
        <div
          role="alert"
          className="rounded-md border border-[var(--error-100)] bg-[var(--error-100)]/40 px-4 py-3 text-sm text-[var(--error-600)]"
        >
          {loadError}
        </div>
        <Button type="button" onClick={loadWorkspace}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <ExperienceDetailHeader
        experience={experience}
        activityCount={activitiesTotal}
        breadcrumbs={[
          { label: "Experiences" },
          { label: experience?.title || "Detail" },
        ]}
        actions={
          <div className="flex flex-wrap gap-3">
            <Button type="button" size="sm" onClick={handleOpenEdit}>
              Edit
            </Button>
            {!showDeleteConfirm && (
              <Button
                type="button"
                size="sm"
                variant="destructive"
                onClick={() => {
                  setDeleteError("");
                  setShowDeleteConfirm(true);
                }}
              >
                Delete experience
              </Button>
            )}
            <Link to="/experiences">
              <Button type="button" size="sm" variant="secondary">
                All experiences
              </Button>
            </Link>
          </div>
        }
      />

      <ExperienceEditModal
        isOpen={isEditOpen}
        form={form}
        onChange={handleFormChange}
        onClose={handleCloseEdit}
        onSave={handleSave}
        saveStatus={experienceSave.status}
        saveError={experienceSave.error}
      />

      {showDeleteConfirm && (
        <ExperienceDeleteConfirm
          experienceTitle={experience?.title}
          onConfirm={handleDeleteConfirm}
          onCancel={() => {
            setShowDeleteConfirm(false);
            setDeleteError("");
          }}
          isDeleting={isDeleting}
          error={deleteError}
        />
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <ExperienceSkillsTechnologiesWidget experience={experience} />
        </div>
        <div className="lg:col-span-2">
          <ExperienceOverviewWidget
            overviewRaw={experience?.overviewRaw}
            overviewPolished={experience?.overviewPolished}
          />
        </div>
      </div>

      <ActivityFormModal
        isOpen={isCreateActivityOpen}
        mode="create"
        form={activityForm}
        onChange={handleActivityFieldChange}
        onClose={handleCloseCreateActivity}
        onSubmit={handleCreateActivity}
        isSubmitting={isCreatingActivity}
        submitError={createActivityError}
      />

      <ExperienceActivitySection
        activities={activities}
        total={activitiesTotal}
        page={activityPage}
        pageSize={ACTIVITY_PAGE_SIZE}
        sort={activitySort}
        order={activityOrder}
        dateFrom={dateFrom}
        dateTo={dateTo}
        isDateFilterActive={isDateFilterActive}
        onOpenCreate={handleOpenCreateActivity}
        onSortChange={handleSortChange}
        onDateFromChange={handleDateFromChange}
        onDateToChange={handleDateToChange}
        onClearDateFilter={handleClearDateFilter}
        onPageChange={setActivityPage}
        showFilters={hasAnyActivities}
      />
    </div>
  );
}
