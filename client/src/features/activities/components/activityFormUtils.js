export const emptyActivityEditForm = {
  title: "",
  rawDescription: "",
};

export function activityToForm(activity = {}) {
  return {
    title: activity.title || "",
    rawDescription: activity.rawDescription || "",
  };
}

export function buildActivityPayload(form) {
  return {
    title: form.title.trim(),
    rawDescription: form.rawDescription,
  };
}
