// server/src/services/activityService.js

const Activity = require('../models/Activity');
const Experience = require('../models/Experience');
const { createServiceError } = require('../utils/serviceError');
const { parseListQuery, buildListMeta } = require('../utils/listQuery');

const ACTIVITY_SORT_FIELDS = ['updatedAt', 'createdAt', 'title'];

const toActivity = (activity) => activity.toJSON();

const toParentExperience = (experience) => ({
  id: experience._id.toString(),
  title: experience.title,
});

const listActivitiesForExperience = async (experience, query = {}) => {
  const { limit, offset, sortObject, search } = parseListQuery(query, {
    allowedSortFields: ACTIVITY_SORT_FIELDS,
    defaultSort: 'updatedAt',
    defaultOrder: 'desc',
  });

  const filter = {
    userId: experience.userId,
    experienceId: experience._id,
    isArchived: false,
  };

  if (search) {
    const pattern = new RegExp(search, 'i');
    filter.$or = [{ title: pattern }, { rawDescription: pattern }];
  }

  const [activities, total] = await Promise.all([
    Activity.find(filter).sort(sortObject).skip(offset).limit(limit),
    Activity.countDocuments(filter),
  ]);

  const items = activities.map(toActivity);

  return {
    items,
    meta: buildListMeta({
      count: items.length,
      total,
      limit,
      offset,
    }),
  };
};

const createActivityForExperience = async (experience, validatedBody) => {
  const activity = new Activity({
    userId: experience.userId,
    experienceId: experience._id,
    ...validatedBody,
  });

  await activity.save();

  return toActivity(activity);
};

const getActivityById = async (activity) => {
  const experience = await Experience.findOne({
    _id: activity.experienceId,
    userId: activity.userId,
    isArchived: false,
  });

  if (!experience) {
    throw createServiceError(404, 'Experience not found');
  }

  return {
    activity: toActivity(activity),
    parentExperience: toParentExperience(experience),
  };
};

const updateActivity = async (activity, validatedBody) => {
  Object.assign(activity, validatedBody);
  await activity.save();

  return toActivity(activity);
};

const archiveActivity = async (activity) => {
  activity.isArchived = true;
  activity.archivedAt = new Date();

  await activity.save();
};

module.exports = {
  listActivitiesForExperience,
  createActivityForExperience,
  getActivityById,
  updateActivity,
  archiveActivity,
};
