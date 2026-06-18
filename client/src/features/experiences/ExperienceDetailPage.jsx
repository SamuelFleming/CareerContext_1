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
import ExperienceEditorCard from "./components/ExperienceEditorCard";
import ExperiencePolishedOverview from "./components/ExperiencePolishedOverview";
import ExperienceDeleteConfirm from "./components/ExperienceDeleteConfirm";
import ExperienceActivitySection from "./components/ExperienceActivitySection";
import {
  buildExperiencePayload,
  experienceToForm,
  emptyActivityForm,
} from "./components/experienceFormUtils";
import { formatExperienceMeta } from "./components/experienceUi";

const WORKSPACE_QUERY = {
  limit: 20,
  offset: 0,
  sort: "updatedAt",
  order: "desc",
};

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

export default function ExperienceDetailPage() {
  const { experienceId } = useParams();
  const navigate = useNavigate();

  const [experience, setExperience] = useState(null);
  const [form, setForm] = useState(experienceToForm());
  const [activities, setActivities] = useState([]);
  const [activitiesHasMore, setActivitiesHasMore] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [isNotFound, setIsNotFound] = useState(false);

  const experienceSave = useSaveStatus();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const [isCreateActivityOpen, setIsCreateActivityOpen] = useState(false);
  const [activityForm, setActivityForm] = useState(emptyActivityForm);
  const [isCreatingActivity, setIsCreatingActivity] = useState(false);
  const [createActivityError, setCreateActivityError] = useState("");

  const loadWorkspace = useCallback(async () => {
    if (!experienceId) {
      return;
    }

    setIsLoading(true);
    setLoadError("");
    setIsNotFound(false);

    try {
      const response = await getExperienceWorkspace(experienceId, WORKSPACE_QUERY);
      const data = response.data || {};

      setExperience(data.experience || null);
      setForm(experienceToForm(data.experience));
      setActivities(data.activities || []);
      setActivitiesHasMore(Boolean(data.activitiesMeta?.hasMore));
    } catch (error) {
      if (isNotFoundError(error)) {
        setIsNotFound(true);
      } else {
        setLoadError(error.message || "Unable to load experience.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [experienceId]);

  const reloadActivities = useCallback(async () => {
    if (!experienceId) {
      return;
    }

    const response = await listActivitiesForExperience(
      experienceId,
      WORKSPACE_QUERY
    );

    setActivities(response.data || []);
    setActivitiesHasMore(Boolean(response.meta?.hasMore));
  }, [experienceId]);

  useEffect(() => {
    loadWorkspace();
  }, [loadWorkspace]);

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

  const handleSave = async () => {
    if (!experienceId || !form.title.trim()) {
      experienceSave.runSave(async () => {
        throw new Error("Title is required.");
      });
      return;
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
      await createActivityForExperience(experienceId, {
        title: activityForm.title.trim(),
        rawDescription: activityForm.rawDescription,
      });

      setIsCreateActivityOpen(false);
      setActivityForm(emptyActivityForm);
      await reloadActivities();
    } catch (error) {
      setCreateActivityError(error.message || "Unable to create activity.");
    } finally {
      setIsCreatingActivity(false);
    }
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
      <PageHeader
        eyebrow="Evidence"
        title={experience?.title || "Experience"}
        description={experience ? formatExperienceMeta(experience) : undefined}
        breadcrumbs={[
          { label: "Experiences" },
          { label: experience?.title || "Detail" },
        ]}
        actions={
          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              size="sm"
              onClick={handleSave}
              disabled={experienceSave.status === "saving" || !form.title.trim()}
            >
              {experienceSave.status === "saving" ? "Saving…" : "Save changes"}
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

      <div className="flex flex-col gap-6">
        <ExperienceEditorCard
          form={form}
          onChange={handleFormChange}
          saveStatus={experienceSave.status}
          saveError={experienceSave.error}
          disabled={experienceSave.status === "saving"}
        />

        <ExperiencePolishedOverview
          overviewPolished={experience?.overviewPolished}
        />

        <ExperienceActivitySection
          activities={activities}
          hasMore={activitiesHasMore}
          isCreateOpen={isCreateActivityOpen}
          createForm={activityForm}
          onCreateFieldChange={handleActivityFieldChange}
          onOpenCreate={handleOpenCreateActivity}
          onCloseCreate={handleCloseCreateActivity}
          onCreateSubmit={handleCreateActivity}
          isCreating={isCreatingActivity}
          createError={createActivityError}
        />
      </div>
    </div>
  );
}
