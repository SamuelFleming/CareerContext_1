import Card, { CardContent, CardTitle } from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

export default function ActivityDeleteConfirm({
  activityTitle,
  onConfirm,
  onCancel,
  isDeleting = false,
  error = "",
}) {
  return (
    <Card className="border-[var(--error-100)] bg-[var(--error-100)]/20">
      <CardContent className="flex flex-col gap-4">
        <CardTitle className="text-lg text-[var(--error-600)]">
          Delete this activity?
        </CardTitle>
        <p className="text-sm text-[var(--primary-700)]">
          <span className="font-medium">{activityTitle || "This activity"}</span>{" "}
          will be archived and removed from active evidence lists.
        </p>

        {error && (
          <div
            role="alert"
            className="rounded-md border border-[var(--error-100)] bg-[var(--neutral-000)] px-4 py-3 text-sm text-[var(--error-600)]"
          >
            {error}
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting…" : "Confirm delete"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onCancel}
            disabled={isDeleting}
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
