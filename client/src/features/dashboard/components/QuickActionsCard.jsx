// client/src/features/dashboard/components/QuickActionsCard.jsx
import { Link } from "react-router-dom";
import Card, {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import { cn } from "../../../utils/cn";

export default function QuickActionsCard({ quickActions = [] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick actions</CardTitle>
        <CardDescription>Jump to the next useful workspace task.</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        {quickActions.map((action) =>
          action.enabled ? (
            <Link key={action.label} to={action.to}>
              <Button type="button" variant="secondary" className="w-full justify-start">
                {action.label}
              </Button>
            </Link>
          ) : (
            <Button
              key={action.label}
              type="button"
              variant="secondary"
              disabled
              className={cn("w-full justify-between")}
            >
              <span>{action.label}</span>
              {action.badge && (
                <span className="text-xs font-normal text-[var(--primary-500)]">
                  {action.badge}
                </span>
              )}
            </Button>
          )
        )}
      </CardContent>
    </Card>
  );
}
