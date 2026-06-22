import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import ExperienceEditorCard from "./ExperienceEditorCard";

export default function ExperienceCreateModal({
  isOpen,
  form,
  onChange,
  onClose,
  onSubmit,
  isSubmitting = false,
  submitError = "",
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add experience"
      panelClassName="max-w-3xl"
      footer={
        <div className="flex flex-wrap justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={onSubmit}
            disabled={isSubmitting || !form.title.trim()}
          >
            {isSubmitting ? "Creating…" : "Create experience"}
          </Button>
        </div>
      }
    >
      {submitError && (
        <div
          role="alert"
          className="mb-4 rounded-md border border-[var(--error-100)] bg-[var(--error-100)]/40 px-4 py-3 text-sm text-[var(--error-600)]"
        >
          {submitError}
        </div>
      )}
      <ExperienceEditorCard
        form={form}
        onChange={onChange}
        disabled={isSubmitting}
        overviewHelperText="Optional. Stored as Markdown in overviewRaw."
        embedded
      />
    </Modal>
  );
}
