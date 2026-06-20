/**
 * Skills and technologies chip variant semantics (MVP manual entry).
 *
 * | Kind        | Default variant | First item (ranked lists) |
 * |-------------|-----------------|---------------------------|
 * | technology  | accent          | success                   |
 * | skill       | neutral         | warning                   |
 */

export const TERM_KIND = {
  TECHNOLOGY: "technology",
  SKILL: "skill",
};

export function technologyChipVariant(index = 0) {
  return index === 0 ? "success" : "accent";
}

export function skillChipVariant(index = 0) {
  return index === 0 ? "warning" : "neutral";
}

export function chipVariantForKind(kind, index = 0) {
  return kind === TERM_KIND.TECHNOLOGY
    ? technologyChipVariant(index)
    : skillChipVariant(index);
}

/** Flat variant for term entry forms (no rank emphasis). */
export function entryChipVariantForKind(kind) {
  return kind === TERM_KIND.TECHNOLOGY ? "accent" : "neutral";
}

export function normalizeTermList(terms) {
  if (!Array.isArray(terms)) {
    return [];
  }

  const seen = new Set();
  const normalized = [];

  for (const term of terms) {
    if (typeof term !== "string") {
      continue;
    }

    const trimmed = term.trim();

    if (!trimmed) {
      continue;
    }

    const key = trimmed.toLowerCase();

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    normalized.push(trimmed);
  }

  return normalized;
}

export function toDisplayChip(label, kind, index = 0) {
  return {
    label,
    kind,
    variant: chipVariantForKind(kind, index),
    rank: index + 1,
  };
}

/**
 * Map entity technology/skill arrays to ranked display chips.
 * Technologies are listed first, then skills (array order = rank).
 */
export function toDisplayChips(
  { technologies = [], skills = [] } = {},
  { limit } = {}
) {
  const techItems = normalizeTermList(technologies).map((label, index) =>
    toDisplayChip(label, TERM_KIND.TECHNOLOGY, index)
  );

  const skillItems = normalizeTermList(skills).map((label, index) =>
    toDisplayChip(label, TERM_KIND.SKILL, index)
  );

  const combined = [...techItems, ...skillItems];

  if (typeof limit === "number" && limit >= 0) {
    return combined.slice(0, limit);
  }

  return combined;
}

export function hasSkillTechnologyTerms({ technologies = [], skills = [] } = {}) {
  return (
    normalizeTermList(technologies).length > 0 ||
    normalizeTermList(skills).length > 0
  );
}
