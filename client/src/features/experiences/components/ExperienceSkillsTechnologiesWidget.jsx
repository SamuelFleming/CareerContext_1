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

export default function ExperienceSkillsTechnologiesWidget({ experience }) {
  const hasTerms = hasSkillTechnologyTerms(experience);
  const rankedItems = toDisplayChips(experience, { limit: 5 });

  return (
    <Card variant="accentSoft" className="flex h-full min-h-[24rem] flex-col gap-4">
      <CardHeader className="mb-0">
        <CardTitle className="text-lg">Skills &amp; technologies</CardTitle>
        <CardDescription>
          {hasTerms
            ? "Top items by your entered order. AI-assisted ranking arrives in a later phase."
            : "Add technologies and skills when editing this experience."}
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
