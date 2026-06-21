import { useCallback, useEffect, useState } from "react";
import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";
import {
  createExperience,
  listExperiences,
} from "../../services/experienceService";
import ExperienceList from "./components/ExperienceList";
import CreateExperiencePanel from "./components/CreateExperiencePanel";
import { buildExperiencePayload } from "./components/experienceFormUtils";
import { emptyCreateForm } from "./components/experienceUi";

export default function ExperienceIndexPage() {
  const [experiences, setExperiences] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState(emptyCreateForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const loadExperiences = useCallback(async () => {
    setIsLoading(true);
    setLoadError("");

    try {
      const response = await listExperiences({
        sort: "updatedAt",
        order: "desc",
        limit: 20,
        offset: 0,
      });

      setExperiences(response.data || []);
      setHasMore(Boolean(response.meta?.hasMore));
    } catch (error) {
      setLoadError(error.message || "Unable to load experiences.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadExperiences();
  }, [loadExperiences]);

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
      await loadExperiences();
    } catch (error) {
      setSubmitError(error.message || "Unable to create experience.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
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

  if (loadError) {
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
        <Button type="button" onClick={loadExperiences}>
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

      {isCreateOpen && (
        <CreateExperiencePanel
          form={createForm}
          onChange={handleCreateFieldChange}
          onSubmit={handleCreateSubmit}
          onCancel={handleCloseCreate}
          isSubmitting={isSubmitting}
          submitError={submitError}
        />
      )}

      <ExperienceList
        experiences={experiences}
        onAddExperience={handleOpenCreate}
        hasMore={hasMore}
      />
    </div>
  );
}
