import {
  hasSkillTechnologyTerms,
  toDisplayChips,
  TERM_KIND,
} from "../../../utils/skillTechnologyChipUtils";

export const AI_ONE_LINE_PLACEHOLDER =
  "AI one-line summary will be generated from your overview and activities — coming in a later phase.";

/**
 * @deprecated Scaffold-only — removed in ticket **237** when live chips ship.
 * Use `toDisplayChips` from `utils/skillTechnologyChipUtils.js` for persisted data.
 */
const SCAFFOLD_CHIPS_BY_TYPE = {
  job: [
    { label: "React", variant: "accent" },
    { label: "Node.js", variant: "accent" },
    { label: "Stakeholder management", variant: "neutral" },
    { label: "TypeScript", variant: "success" },
  ],
  project: [
    { label: "REST APIs", variant: "accent" },
    { label: "MongoDB", variant: "success" },
    { label: "Problem solving", variant: "neutral" },
  ],
  course: [
    { label: "Algorithms", variant: "accent" },
    { label: "Research", variant: "neutral" },
    { label: "Academic writing", variant: "warning" },
  ],
  certification: [
    { label: "Cloud architecture", variant: "accent" },
    { label: "Security", variant: "success" },
    { label: "Compliance", variant: "neutral" },
  ],
  personal_project: [
    { label: "Vite", variant: "accent" },
    { label: "Tailwind CSS", variant: "accent" },
    { label: "Self-directed learning", variant: "warning" },
  ],
  other: [
    { label: "Collaboration", variant: "neutral" },
    { label: "Documentation", variant: "accent" },
    { label: "Communication", variant: "warning" },
  ],
};

const DEFAULT_SCAFFOLD_CHIPS = [
  { label: "React", variant: "accent" },
  { label: "Leadership", variant: "neutral" },
  { label: "MongoDB", variant: "success" },
];

const TECH_VARIANTS = new Set(["accent", "success"]);

/** @deprecated Scaffold fallback until **237** */
export function getScaffoldSkillChips(experience) {
  return SCAFFOLD_CHIPS_BY_TYPE[experience?.type] || DEFAULT_SCAFFOLD_CHIPS;
}

function scaffoldToRankedItems(experience, limit) {
  return getScaffoldSkillChips(experience)
    .slice(0, limit)
    .map((chip, index) => ({
      label: chip.label,
      kind: TECH_VARIANTS.has(chip.variant) ? TERM_KIND.TECHNOLOGY : TERM_KIND.SKILL,
      rank: index + 1,
      variant: chip.variant,
    }));
}

/**
 * Ranked display items for detail widget. Uses live entity data when present;
 * falls back to scaffold mocks until **237** removes mock fallback.
 */
export function getTopRankedSkillsAndTechnologies(experience, limit = 5) {
  if (hasSkillTechnologyTerms(experience)) {
    return toDisplayChips(experience, { limit });
  }

  return scaffoldToRankedItems(experience, limit);
}

/**
 * Summary card chips: live data when present, else scaffold.
 */
export function getSummaryCardChips(experience) {
  const live = toDisplayChips(experience);

  if (live.length > 0) {
    return live.map(({ label, variant }) => ({ label, variant }));
  }

  return getScaffoldSkillChips(experience);
}
