export const ACTIVITY_PAGE_SIZE = 8;

export function filterActivitiesByUpdatedDateRange(activities, dateFrom, dateTo) {
  if (!dateFrom && !dateTo) {
    return activities;
  }

  const fromTime = dateFrom ? new Date(dateFrom).getTime() : null;
  const toTime = dateTo ? new Date(`${dateTo}T23:59:59.999`).getTime() : null;

  return activities.filter((activity) => {
    const updatedTime = new Date(activity.updatedAt).getTime();

    if (Number.isNaN(updatedTime)) {
      return false;
    }

    if (fromTime !== null && updatedTime < fromTime) {
      return false;
    }

    if (toTime !== null && updatedTime > toTime) {
      return false;
    }

    return true;
  });
}

export function paginateActivities(activities, page, pageSize = ACTIVITY_PAGE_SIZE) {
  const offset = page * pageSize;
  return activities.slice(offset, offset + pageSize);
}
