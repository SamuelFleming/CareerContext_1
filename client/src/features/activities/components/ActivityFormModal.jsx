import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import { ActivityEditorFields } from "./ActivityEditorFields";

export default function ActivityFormModal({
  isOpen,
  mode = "edit",
  form,
  onChange,
  onClose,
  onSubmit,
  isSubmitting = false,
  submitError = "",
}) {
  const isCreate = mode === "create";
  const title = isCreate ? "Add activity" : "Edit activity";
  const submitLabel = isCreate ? "Create activity" : "Save changes";
  const submittingLabel = isCreate ? "Creating…" : "Saving…";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
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
            {isSubmitting ? submittingLabel : submitLabel}
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
      <ActivityEditorFields
        form={form}
        onChange={onChange}
        disabled={isSubmitting}
        descriptionHelperText={
          isCreate
            ? "Optional. Stored as rawDescription Markdown."
            : "Stored as Markdown in rawDescription."
        }
        descriptionMinRows={isCreate ? 10 : 12}
      />
    </Modal>
  );
}
