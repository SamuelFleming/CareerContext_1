// Phase 1 dashboard mock data — single source of truth until Experience APIs land.

const PHASE1_CORE_COMPETENCIES = ['React', 'Node.js', 'Leadership', 'Express'];

const PHASE1_HIGHLIGHT_EXPERIENCES = [
  {
    id: 'mock-exp-1',
    type: 'job',
    title: 'Full-Stack Developer Intern',
    meta: 'TechCorp · Jun 2025 – Present',
    description: 'Led an internal dashboard rebuild used by 40+ staff.',
    tags: ['React', 'Node.js', 'Leadership'],
  },
  {
    id: 'mock-exp-2',
    type: 'project',
    title: 'Capstone Project',
    meta: 'University · 2025',
    description: 'Built a MERN application for structuring career evidence.',
    tags: ['MongoDB', 'AI'],
  },
];

module.exports = {
  PHASE1_CORE_COMPETENCIES,
  PHASE1_HIGHLIGHT_EXPERIENCES,
};
