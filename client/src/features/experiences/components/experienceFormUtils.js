import { normalizeTermList } from "../../../utils/skillTechnologyChipUtils";

export const emptyExperienceForm = {
  type: "job",
  title: "",
  organisation: "",
  role: "",
  dateStart: "",
  dateEnd: "",
  isCurrent: false,
  overviewRaw: "",
  technologies: [],
  skills: [],
};

export function toDateInputValue(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString().slice(0, 10);
}

export function experienceToForm(experience = {}) {
  return {
    type: experience.type || "job",
    title: experience.title || "",
    organisation: experience.organisation || "",
    role: experience.role || "",
    dateStart: toDateInputValue(experience.dateStart),
    dateEnd: toDateInputValue(experience.dateEnd),
    isCurrent: Boolean(experience.isCurrent),
    overviewRaw: experience.overviewRaw || "",
    technologies: normalizeTermList(experience.technologies),
    skills: normalizeTermList(experience.skills),
  };
}

export function buildExperiencePayload(form) {
  return {
    type: form.type,
    title: form.title.trim(),
    organisation: form.organisation.trim(),
    role: form.role.trim(),
    dateStart: form.dateStart || null,
    dateEnd: form.isCurrent ? null : form.dateEnd || null,
    isCurrent: form.isCurrent,
    overviewRaw: form.overviewRaw,
    technologies: normalizeTermList(form.technologies),
    skills: normalizeTermList(form.skills),
  };
}

export const emptyActivityForm = {
  title: "",
  rawDescription: "",
  technologies: [],
  skills: [],
};

export function truncateText(value, maxLength = 160) {
  if (!value?.trim()) {
    return "";
  }

  const trimmed = value.trim();

  if (trimmed.length <= maxLength) {
    return trimmed;
  }

  return `${trimmed.slice(0, maxLength).trimEnd()}…`;
}
