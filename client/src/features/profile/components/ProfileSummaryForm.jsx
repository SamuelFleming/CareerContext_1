// client/src/features/profile/components/ProfileSummaryForm.jsx
import Card, {
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

const saveStatusText = {
  idle: null,
  saving: "Saving…",
  saved: "Saved",
  error: "Save failed",
};

export default function ProfileSummaryForm({
  email,
  fullName,
  mobile,
  location,
  headline,
  onChange,
  onSave,
  saveStatus = "idle",
  saveError = "",
}) {
  const statusMessage = saveStatusText[saveStatus];

  return (
    <Card className="flex flex-col gap-6">
      <CardHeader className="mb-0 flex-row items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <CardTitle>Basic profile</CardTitle>
          <CardDescription>
            Structured details that head your living CV and profile surfaces.
          </CardDescription>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <Button
            type="button"
            size="sm"
            onClick={onSave}
            disabled={saveStatus === "saving"}
          >
            {saveStatus === "saving" ? "Saving…" : "Save profile"}
          </Button>
          {statusMessage && saveStatus !== "error" && (
            <p
              className="text-xs text-[var(--success-600)]"
              role="status"
              aria-live="polite"
            >
              {statusMessage}
            </p>
          )}
        </div>
      </CardHeader>

      {saveError && (
        <div
          role="alert"
          className="rounded-md border border-[var(--error-100)] bg-[var(--error-100)]/40 px-4 py-3 text-sm text-[var(--error-600)]"
        >
          {saveError}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Full name"
          placeholder="Alex Morgan"
          value={fullName}
          onChange={(event) => onChange("fullName", event.target.value)}
        />
        <Input
          label="Headline"
          placeholder="Software Developer · Project Lead"
          value={headline}
          onChange={(event) => onChange("headline", event.target.value)}
        />
        <Input
          label="Email"
          type="email"
          value={email}
          readOnly
          disabled
          helperText="Account email is managed through authentication."
        />
        <Input
          label="Mobile"
          type="tel"
          placeholder="+61 400 000 000"
          value={mobile}
          onChange={(event) => onChange("mobile", event.target.value)}
        />
        <Input
          label="Location"
          placeholder="Brisbane, AU"
          value={location}
          onChange={(event) => onChange("location", event.target.value)}
          className="sm:col-span-2"
        />
      </div>
    </Card>
  );
}
