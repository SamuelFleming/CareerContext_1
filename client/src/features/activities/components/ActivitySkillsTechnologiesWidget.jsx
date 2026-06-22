import Card, {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/Card";
import SkillChip from "../../../components/ui/SkillChip";
import {
  hasSkillTechnologyTerms,
  toDisplayChips,
} from "../../../utils/skillTechnologyChipUtils";

export default function ActivitySkillsTechnologiesWidget({ activity }) {
  const hasTerms = hasSkillTechnologyTerms(activity);
  const rankedItems = toDisplayChips(activity, { limit: 5 });

  return (
    <Card variant="evidence" className="flex h-full flex-col gap-4">
      <CardHeader className="mb-0">
        <CardTitle className="text-lg">Skills &amp; technologies</CardTitle>
        <CardDescription>
          {hasTerms
            ? "Tagged on this activity. Use Edit to update."
            : "No skills or technologies captured yet. Use Edit to add terms."}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        {!hasTerms ? (
          <p className="text-sm text-[var(--primary-600)]">
            No skills or technologies captured yet.
          </p>
        ) : (
          <ol className="flex flex-col gap-2">
            {rankedItems.map((item) => (
              <li
                key={`${item.kind}-${item.label}`}
                className="flex items-center gap-3 text-sm text-[var(--primary-700)]"
              >
                <span className="w-5 shrink-0 font-semibold text-[var(--primary-500)]">
                  {item.rank}.
                </span>
                <SkillChip variant={item.variant}>{item.label}</SkillChip>
                <span className="text-xs uppercase tracking-wide text-[var(--primary-500)]">
                  {item.kind === "technology" ? "Technology" : "Skill"}
                </span>
              </li>
            ))}
          </ol>
        )}
      </CardContent>
    </Card>
  );
}
