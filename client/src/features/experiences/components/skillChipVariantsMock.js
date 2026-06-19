export const AI_ONE_LINE_PLACEHOLDER =
  "AI one-line summary will be generated from your overview and activities — coming in a later phase.";

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

export function getScaffoldSkillChips(experience) {
  return SCAFFOLD_CHIPS_BY_TYPE[experience?.type] || DEFAULT_SCAFFOLD_CHIPS;
}

const TECH_VARIANTS = new Set(["accent", "success"]);

function toRankedItem(label, kind, rank) {
  const variant =
    kind === "technology"
      ? rank === 1
        ? "success"
        : "accent"
      : rank === 1
        ? "warning"
        : "neutral";

  return { label, kind, rank, variant };
}

export function getTopRankedSkillsAndTechnologies(experience, limit = 5) {
  const technologies = (experience?.technologies || [])
    .filter(Boolean)
    .map((label, index) => toRankedItem(label, "technology", index + 1));

  const skills = (experience?.skills || [])
    .filter(Boolean)
    .map((label, index) => toRankedItem(label, "skill", index + 1));

  const fromEntity = [...technologies, ...skills].slice(0, limit);

  if (fromEntity.length > 0) {
    return fromEntity;
  }

  return getScaffoldSkillChips(experience)
    .slice(0, limit)
    .map((chip, index) => ({
      label: chip.label,
      kind: TECH_VARIANTS.has(chip.variant) ? "technology" : "skill",
      rank: index + 1,
      variant: chip.variant,
    }));
}
