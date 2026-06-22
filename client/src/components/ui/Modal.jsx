import { useEffect } from "react";
import { cn } from "../../utils/cn";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  className = "",
  panelClassName = "",
}) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-[var(--primary-900)]/40"
        aria-label="Close dialog"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        className={cn(
          "relative flex max-h-[min(90vh,900px)] w-full max-w-3xl flex-col overflow-hidden " +
            "rounded-lg border border-[var(--neutral-200)] bg-[var(--neutral-000)] shadow-[var(--shadow-lg)]",
          panelClassName
        )}
      >
        {title && (
          <div className="border-b border-[var(--neutral-200)] px-6 py-4">
            <h2
              id="modal-title"
              className="font-[var(--font-heading)] text-xl font-semibold text-[var(--primary-900)]"
            >
              {title}
            </h2>
          </div>
        )}

        <div className={cn("overflow-y-auto px-6 py-4", className)}>{children}</div>

        {footer && (
          <div className="border-t border-[var(--neutral-200)] px-6 py-4">{footer}</div>
        )}
      </div>
    </div>
  );
}
