// client/src/features/dashboard/components/ProfileCompletenessPrompt.jsx
import { Link } from "react-router-dom";
import Card, {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

export default function ProfileCompletenessPrompt({ profileCompleteness }) {
  if (!profileCompleteness?.showPrompt) {
    return null;
  }

  const { score, status, nextAction } = profileCompleteness;

  return (
    <Card className="border-[var(--accent-200)] bg-[var(--accent-100)]/30">
      <CardHeader>
        <CardTitle className="text-lg">Complete your profile</CardTitle>
        <CardDescription>
          A stronger core context improves AI workflows and application prep.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-[var(--primary-800)]">
              {status === "empty" ? "Just getting started" : "In progress"}
            </span>
            <span className="text-[var(--primary-600)]">{score}%</span>
          </div>
          <div
            className="h-2 overflow-hidden rounded-full bg-[var(--neutral-200)]"
            role="progressbar"
            aria-valuenow={score}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Profile completion"
          >
            <div
              className="h-full rounded-full bg-[var(--accent-600)] transition-all duration-300"
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        {nextAction && (
          <Link to={nextAction.to}>
            <Button type="button" size="sm">
              {nextAction.label}
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
