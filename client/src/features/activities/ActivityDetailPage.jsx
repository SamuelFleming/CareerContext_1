import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";
import {
  deleteActivity,
  getActivity,
  updateActivity,
} from "../../services/activityService";
import ActivityParentContext from "./components/ActivityParentContext";
import ActivitySkillsTechnologiesSummary from "./components/ActivitySkillsTechnologiesSummary";
import ActivityEditorCard from "./components/ActivityEditorCard";
import ActivityPolishedSummary from "./components/ActivityPolishedSummary";
import ActivityDeleteConfirm from "./components/ActivityDeleteConfirm";
import {
  activityToForm,
  buildActivityPayload,
} from "./components/activityFormUtils";

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
  return message.includes("not found") || message.includes("invalid activity");
}

export default function ActivityDetailPage() {
  const { activityId } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState(null);
  const [parentExperience, setParentExperience] = useState(null);
  const [form, setForm] = useState(activityToForm());

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [isNotFound, setIsNotFound] = useState(false);

  const activitySave = useSaveStatus();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const parentExperiencePath = parentExperience?.id
    ? `/experiences/${parentExperience.id}`
    : "/experiences";

  const loadActivity = useCallback(async () => {
    if (!activityId) {
      return;
    }

    setIsLoading(true);
    setLoadError("");
    setIsNotFound(false);

    try {
      const response = await getActivity(activityId);
      const data = response.data || {};

      setActivity(data.activity || null);
      setParentExperience(data.parentExperience || null);
      setForm(activityToForm(data.activity));
    } catch (error) {
      if (isNotFoundError(error)) {
        setIsNotFound(true);
      } else {
        setLoadError(error.message || "Unable to load activity.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [activityId]);

  useEffect(() => {
    loadActivity();
  }, [loadActivity]);

  useEffect(() => {
    if (activitySave.status === "saved") {
      return activitySave.resetSaved();
    }
  }, [activitySave.status, activitySave.resetSaved]);

  const handleFormChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSave = async () => {
    if (!activityId || !form.title.trim()) {
      await activitySave.runSave(async () => {
        throw new Error("Title is required.");
      });
      return;
    }

    await activitySave.runSave(async () => {
      const response = await updateActivity(activityId, buildActivityPayload(form));
      const updated = response.data?.activity;

      if (updated) {
        setActivity(updated);
        setForm(activityToForm(updated));
      }
    });
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    setDeleteError("");

    try {
      await deleteActivity(activityId);
      navigate(parentExperiencePath);
    } catch (error) {
      setDeleteError(error.message || "Unable to delete activity.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8">
        <PageHeader
          eyebrow="Evidence"
          title="Activity"
          description="Loading activity detail…"
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
          title="Activity not found"
          description="This activity may have been deleted or the link is invalid."
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
          title="Activity"
          description="Could not load this activity."
        />
        <div
          role="alert"
          className="rounded-md border border-[var(--error-100)] bg-[var(--error-100)]/40 px-4 py-3 text-sm text-[var(--error-600)]"
        >
          {loadError}
        </div>
        <Button type="button" onClick={loadActivity}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Evidence"
        title={activity?.title || "Activity"}
        description="Edit reusable evidence content for this activity."
        breadcrumbs={[
          { label: "Experiences" },
          { label: parentExperience?.title || "Experience" },
          { label: activity?.title || "Activity" },
        ]}
        actions={
          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              size="sm"
              onClick={handleSave}
              disabled={activitySave.status === "saving" || !form.title.trim()}
            >
              {activitySave.status === "saving" ? "Saving…" : "Save changes"}
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
                Delete activity
              </Button>
            )}
            <Link to={parentExperiencePath}>
              <Button type="button" size="sm" variant="secondary">
                Back to experience
              </Button>
            </Link>
          </div>
        }
      />

      {showDeleteConfirm && (
        <ActivityDeleteConfirm
          activityTitle={activity?.title}
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
        <ActivityParentContext parentExperience={parentExperience} />

        <ActivitySkillsTechnologiesSummary activity={activity} />

        <ActivityEditorCard
          form={form}
          onChange={handleFormChange}
          saveStatus={activitySave.status}
          saveError={activitySave.error}
          disabled={activitySave.status === "saving"}
        />

        <ActivityPolishedSummary polishedSummary={activity?.polishedSummary} />
      </div>
    </div>
  );
}
