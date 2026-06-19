import Card, {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/Card";
import SkillChip from "../../../components/ui/SkillChip";
import { getTopRankedSkillsAndTechnologies } from "./skillChipVariantsMock";

export default function ExperienceSkillsTechnologiesWidget({ experience }) {
  const rankedItems = getTopRankedSkillsAndTechnologies(experience, 5);

  return (
    <Card variant="evidence" className="flex h-full flex-col gap-4">
      <CardHeader className="mb-0">
        <CardTitle className="text-lg">Skills &amp; technologies</CardTitle>
        <CardDescription>
          Top ranked items for this experience — AI extraction coming in a later
          phase.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        {rankedItems.length === 0 ? (
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
