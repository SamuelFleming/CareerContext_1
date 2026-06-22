import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import ExperienceEditorCard from "./ExperienceEditorCard";

export default function ExperienceEditModal({
  isOpen,
  form,
  onChange,
  onClose,
  onSave,
  saveStatus = "idle",
  saveError = "",
}) {
  const isSaving = saveStatus === "saving";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit experience details"
      panelClassName="max-w-3xl"
      footer={
        <div className="flex flex-wrap justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={onSave}
            disabled={isSaving || !form.title.trim()}
          >
            {isSaving ? "Saving…" : "Save changes"}
          </Button>
        </div>
      }
    >
      <ExperienceEditorCard
        form={form}
        onChange={onChange}
        saveStatus={saveStatus}
        saveError={saveError}
        disabled={isSaving}
        overviewHelperText="Raw overview (overviewRaw). Saved with the button below."
        embedded
      />
    </Modal>
  );
}
