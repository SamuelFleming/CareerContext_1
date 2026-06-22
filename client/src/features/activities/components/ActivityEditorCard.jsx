import Card, {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/Card";
import { ActivityEditorFields } from "./ActivityEditorFields";

const saveStatusText = {
  idle: null,
  saving: "Saving…",
  saved: "Saved",
  error: "Save failed",
};

export default function ActivityEditorCard({
  form,
  onChange,
  saveStatus = "idle",
  saveError = "",
  disabled = false,
}) {
  const statusMessage = saveStatusText[saveStatus];

  return (
    <Card className="flex flex-col gap-6">
      <CardHeader className="mb-0">
        <CardTitle>Activity evidence</CardTitle>
        <CardDescription>
          Reusable career evidence content for applications and evaluations.
        </CardDescription>
        {statusMessage && saveStatus !== "error" && (
          <p
            className="text-xs text-[var(--success-600)]"
            role="status"
            aria-live="polite"
          >
            {statusMessage}
          </p>
        )}
      </CardHeader>

      {saveError && (
        <div
          role="alert"
          className="mx-6 rounded-md border border-[var(--error-100)] bg-[var(--error-100)]/40 px-4 py-3 text-sm text-[var(--error-600)]"
        >
          {saveError}
        </div>
      )}

      <CardContent className="flex flex-col gap-4">
        <ActivityEditorFields form={form} onChange={onChange} disabled={disabled} />
      </CardContent>
    </Card>
  );
}
