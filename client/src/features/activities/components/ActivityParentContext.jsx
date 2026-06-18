import { Link } from "react-router-dom";
import { Briefcase } from "lucide-react";
import Card, { CardContent, CardDescription, CardTitle } from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

export default function ActivityParentContext({ parentExperience }) {
  if (!parentExperience?.id) {
    return (
      <Card className="border-dashed border-[var(--neutral-300)]">
        <CardContent className="text-sm text-[var(--primary-600)]">
          Parent experience context is unavailable.{" "}
          <Link
            to="/experiences"
            className="font-medium text-[var(--accent-600)] hover:text-[var(--accent-500)]"
          >
            Browse experiences
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="evidence" className="flex flex-col gap-2">
      <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Briefcase
            size={20}
            className="mt-0.5 shrink-0 text-[var(--accent-600)]"
            aria-hidden="true"
          />
          <div>
            <CardTitle className="text-base">Parent experience</CardTitle>
            <CardDescription className="mt-1">
              This activity belongs to{" "}
              <span className="font-medium text-[var(--primary-800)]">
                {parentExperience.title}
              </span>
            </CardDescription>
          </div>
        </div>
        <Link to={`/experiences/${parentExperience.id}`}>
          <Button type="button" size="sm" variant="secondary">
            Back to experience
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
