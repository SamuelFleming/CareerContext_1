import SkillChip from "./SkillChip";
import { toDisplayChips } from "../../utils/skillTechnologyChipUtils";

export default function SkillTechnologyChipList({
  technologies = [],
  skills = [],
  chips,
  limit,
  className = "",
  emptyMessage,
}) {
  const items =
    chips ||
    toDisplayChips({ technologies, skills }, { limit });

  if (items.length === 0) {
    return emptyMessage ? (
      <p className="text-sm text-[var(--primary-600)]">{emptyMessage}</p>
    ) : null;
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`.trim()}>
      {items.map((chip) => (
        <SkillChip key={`${chip.kind}-${chip.label}`} variant={chip.variant}>
          {chip.label}
        </SkillChip>
      ))}
    </div>
  );
}
