// Mirrors server/src/constants/phase1DashboardMocks.js for Phase 1 UI fallback.

export const PHASE1_CORE_COMPETENCIES = [
  "React",
  "Node.js",
  "Leadership",
  "Express",
];

export const PHASE1_HIGHLIGHT_EXPERIENCES = [
  {
    id: "mock-exp-1",
    type: "job",
    title: "Full-Stack Developer Intern",
    meta: "TechCorp · Jun 2025 – Present",
    description: "Led an internal dashboard rebuild used by 40+ staff.",
    tags: ["React", "Node.js", "Leadership"],
  },
  {
    id: "mock-exp-2",
    type: "project",
    title: "Capstone Project",
    meta: "University · 2025",
    description: "Built a MERN application for structuring career evidence.",
    tags: ["MongoDB", "AI"],
  },
];

export function resolvePhase1InteractiveCv(interactiveCv = {}) {
  return {
    ...interactiveCv,
    coreCompetencies:
      interactiveCv.coreCompetencies?.length > 0
        ? interactiveCv.coreCompetencies
        : PHASE1_CORE_COMPETENCIES,
    highlightExperiences:
      interactiveCv.highlightExperiences?.length > 0
        ? interactiveCv.highlightExperiences
        : PHASE1_HIGHLIGHT_EXPERIENCES,
  };
}
