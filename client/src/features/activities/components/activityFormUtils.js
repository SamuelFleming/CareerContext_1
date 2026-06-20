import { normalizeTermList } from "../../../utils/skillTechnologyChipUtils";

export const emptyActivityEditForm = {
  title: "",
  rawDescription: "",
  technologies: [],
  skills: [],
};

export function activityToForm(activity = {}) {
  return {
    title: activity.title || "",
    rawDescription: activity.rawDescription || "",
    technologies: normalizeTermList(activity.technologies),
    skills: normalizeTermList(activity.skills),
  };
}

export function buildActivityPayload(form) {
  return {
    title: form.title.trim(),
    rawDescription: form.rawDescription,
    technologies: normalizeTermList(form.technologies),
    skills: normalizeTermList(form.skills),
  };
}
