// client/src/components/navigation/JournalDrawer.jsx
import { useEffect, useState } from "react";
import { BookOpen, X } from "lucide-react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import MarkdownEditor from "../editor/MarkdownEditor";
import { useJournalDrawer } from "../../contexts/JournalDrawerContext";
import { cn } from "../../utils/cn";

const emptyEntry = {
  title: "",
  notesMd: "",
};

/**
 * Global journal / binder drawer for quick evidence capture.
 * Uses the shared MarkdownEditor widget; persistence via journal API is Phase 5.
 */
export default function JournalDrawer() {
  const { isOpen, closeJournal, openJournal } = useJournalDrawer();
  const [entry, setEntry] = useState(emptyEntry);
  const [draftNotice, setDraftNotice] = useState("");

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    closeJournal();
    setDraftNotice("");
  };

  const handleSaveDraft = () => {
    if (!entry.title.trim() && !entry.notesMd.trim()) {
      return;
    }

    setDraftNotice("Draft captured locally — journal API persistence comes next.");
    setEntry(emptyEntry);
  };

  const canSaveDraft = Boolean(entry.title.trim() || entry.notesMd.trim());

  return (
    <>
      {/* Closed state: binder spine fixed to the right edge */}
      {!isOpen && (
        <button
          type="button"
          onClick={openJournal}
          aria-label="Open journal to capture evidence"
          className={cn(
            "fixed right-0 top-1/2 z-40 -translate-y-1/2",
            "flex items-center gap-2 rounded-l-lg px-3 py-6",
            "bg-[var(--primary-800)] text-white shadow-[var(--shadow-lg)]",
            "font-[var(--font-heading)] text-lg font-semibold",
            "transition-all duration-300 hover:-translate-x-1 hover:bg-[var(--accent-600)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-200)]"
          )}
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          + Capture Evidence
        </button>
      )}

      {/* Backdrop */}
      <div
        onClick={handleClose}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-40 bg-[var(--primary-900)]/30 transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      {/* Open state: drawer slides in from the right */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Journal"
        aria-hidden={!isOpen}
        className={cn(
          "fixed right-0 top-0 bottom-0 z-50 flex flex-col gap-6 overflow-y-auto",
          "border-l-[3px] border-[var(--primary-800)] bg-[var(--evidence-warm)] p-8",
          "shadow-[var(--shadow-lg)] transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{ width: "min(100vw, 480px)" }}
      >
        <header className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2">
            <BookOpen size={22} className="text-[var(--primary-800)]" aria-hidden="true" />
            <h2 className="font-[var(--font-heading)] text-2xl font-bold text-[var(--primary-900)]">
              Journal
            </h2>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close journal"
            className="rounded-md p-1 text-[var(--primary-600)] transition-colors hover:bg-[var(--neutral-200)] hover:text-[var(--primary-900)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-200)]"
          >
            <X size={20} />
          </button>
        </header>

        <p className="text-sm text-[var(--primary-600)]">
          Capture a rough note now — structure it into evidence later.
        </p>

        {draftNotice && (
          <p
            className="rounded-md border border-[var(--success-100)] bg-[var(--success-100)]/50 px-4 py-3 text-sm text-[var(--success-600)]"
            role="status"
            aria-live="polite"
          >
            {draftNotice}
          </p>
        )}

        <div className="flex flex-col gap-4">
          <Input
            label="Title"
            placeholder="e.g. Led incident response during outage"
            value={entry.title}
            onChange={(event) =>
              setEntry((current) => ({ ...current, title: event.target.value }))
            }
          />

          <MarkdownEditor
            label="Notes"
            name="journalNotesMd"
            placeholder={
              "What happened, what you did, and the impact...\n\n- Context\n- Action\n- Result"
            }
            helperText="Use Edit/Preview to write and review Markdown before saving."
            value={entry.notesMd}
            onChange={(value) =>
              setEntry((current) => ({ ...current, notesMd: value }))
            }
            minRows={10}
            previewEnabled
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--primary-800)]">
              Suggested destination
            </label>
            <div className="rounded-md border border-dashed border-[var(--neutral-300)] bg-[var(--neutral-050)] px-4 py-3 text-sm text-[var(--primary-500)]">
              AI will suggest an Experience or Activity (coming soon)
            </div>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-end gap-3 pt-4">
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveDraft}
            disabled={!canSaveDraft}
          >
            Save Draft
          </Button>
        </div>
      </aside>
    </>
  );
}
