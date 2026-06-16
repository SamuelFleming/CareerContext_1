// client/src/features/profile/components/CoreResumeUploadPlaceholder.jsx
import { FileUp } from "lucide-react";
import Button from "../../../components/ui/Button";

export default function CoreResumeUploadPlaceholder() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium text-[var(--primary-800)]">Upload resume</p>

      <div
        role="region"
        aria-label="Resume file upload — coming soon"
        className="flex flex-col items-center gap-4 rounded-md border border-dashed border-[var(--neutral-300)] bg-[var(--neutral-050)] px-6 py-10 text-center"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-100)] text-[var(--accent-600)]">
          <FileUp size={24} aria-hidden="true" />
        </div>

        <div className="flex max-w-sm flex-col gap-2">
          <p className="text-sm font-medium text-[var(--primary-900)]">
            Upload PDF or DOCX
          </p>
          <p className="text-sm text-[var(--primary-600)]">
            File upload will be available when Document storage lands in Phase 3.
            Uploaded files will be stored as a{" "}
            <span className="font-medium">core_resume</span> Document with a file
            reference and imported Markdown content.
          </p>
        </div>

        <Button type="button" variant="secondary" size="sm" disabled>
          Choose file
        </Button>

        <p className="text-xs text-[var(--primary-500)]">
          For now, switch to <span className="font-medium">Write in Markdown</span>{" "}
          to edit and save your core resume.
        </p>
      </div>
    </div>
  );
}
