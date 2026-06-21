import {
  Award,
  Briefcase,
  FolderKanban,
  GraduationCap,
  Layers,
  Sparkles,
} from "lucide-react";

export const EXPERIENCE_TYPE_OPTIONS = [
  { value: "job", label: "Job" },
  { value: "project", label: "Project" },
  { value: "course", label: "Course" },
  { value: "certification", label: "Certification" },
  { value: "personal_project", label: "Personal project" },
  { value: "other", label: "Other" },
];

const TYPE_LABELS = Object.fromEntries(
  EXPERIENCE_TYPE_OPTIONS.map(({ value, label }) => [value, label])
);

export const EXPERIENCE_TYPE_ICONS = {
  job: Briefcase,
  project: FolderKanban,
  course: GraduationCap,
  certification: Award,
  personal_project: Sparkles,
  other: Layers,
};

export function formatExperienceType(type) {
  return TYPE_LABELS[type] || type || "Experience";
}

function formatDatePart(value) {
  if (!value) {
    return null;
  }

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function formatExperienceDateRange({ dateStart, dateEnd, isCurrent }) {
  const start = formatDatePart(dateStart);
  const end = isCurrent ? "Present" : formatDatePart(dateEnd);

  if (start && end) {
    return `${start} – ${end}`;
  }

  if (start) {
    return start;
  }

  if (end) {
    return end;
  }

  return null;
}

export function formatExperienceMeta(experience) {
  const parts = [
    formatExperienceType(experience.type),
    [experience.organisation, experience.role].filter(Boolean).join(" · ") || null,
    formatExperienceDateRange(experience),
  ].filter(Boolean);

  return parts.join(" · ");
}

export function formatExperienceRoleLine({ role, organisation }) {
  const trimmedRole = role?.trim();
  const trimmedOrg = organisation?.trim();

  if (trimmedRole && trimmedOrg) {
    return `${trimmedRole} at ${trimmedOrg}`;
  }

  if (trimmedRole) {
    return trimmedRole;
  }

  if (trimmedOrg) {
    return trimmedOrg;
  }

  return null;
}

export function formatExperienceActivityLine(experience, activityCountOverride) {
  const count =
    typeof activityCountOverride === "number"
      ? activityCountOverride
      : experience?.activityCount ?? 0;

  if (count > 0) {
    return `${count} ${count === 1 ? "activity" : "activities"}`;
  }

  return "No activities yet";
}

/** @deprecated Use split formatters on summary card surfaces. */
export function formatExperienceDescription(experience) {
  return formatExperienceActivityLine(experience);
}

export const emptyCreateForm = {
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
