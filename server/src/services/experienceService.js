// server/src/services/experienceService.js

const mongoose = require('mongoose');
const Experience = require('../models/Experience');
const Activity = require('../models/Activity');
const activityService = require('./activityService');
const { createServiceError } = require('../utils/serviceError');
const { parseListQuery, buildListMeta } = require('../utils/listQuery');

const { EXPERIENCE_TYPES } = Experience;

const EXPERIENCE_SORT_FIELDS = ['updatedAt', 'createdAt', 'title', 'dateStart'];

const toExperience = (experience) => experience.toJSON();

const toListItem = (experience, activityCount = 0) => {
  const json = toExperience(experience);

  return {
    id: json.id,
    type: json.type,
    title: json.title,
    organisation: json.organisation,
    role: json.role,
    dateStart: json.dateStart,
    dateEnd: json.dateEnd,
    isCurrent: json.isCurrent,
    activityCount,
    updatedAt: json.updatedAt,
  };
};

const getActivityCountsByExperienceIds = async (experienceIds) => {
  if (!experienceIds.length) {
    return new Map();
  }

  const counts = await Activity.aggregate([
    {
      $match: {
        experienceId: { $in: experienceIds },
        isArchived: false,
      },
    },
    {
      $group: {
        _id: '$experienceId',
        count: { $sum: 1 },
      },
    },
  ]);

  return new Map(counts.map(({ _id, count }) => [_id.toString(), count]));
};

const listExperiences = async (userId, query = {}) => {
  if (!mongoose.isValidObjectId(userId)) {
    throw createServiceError(400, 'Invalid user ID');
  }

  const { type } = query;
  const { limit, offset, sortObject, search } = parseListQuery(query, {
    allowedSortFields: EXPERIENCE_SORT_FIELDS,
    defaultSort: 'updatedAt',
    defaultOrder: 'desc',
  });

  const filter = {
    userId,
    isArchived: false,
  };

  if (type !== undefined && type !== '') {
    if (!EXPERIENCE_TYPES.includes(type)) {
      throw createServiceError(400, 'Invalid experience type');
    }

    filter.type = type;
  }

  if (search) {
    const pattern = new RegExp(search, 'i');
    filter.$or = [{ title: pattern }, { organisation: pattern }, { role: pattern }];
  }

  const [experiences, total] = await Promise.all([
    Experience.find(filter).sort(sortObject).skip(offset).limit(limit),
    Experience.countDocuments(filter),
  ]);

  const activityCounts = await getActivityCountsByExperienceIds(
    experiences.map((experience) => experience._id)
  );

  const items = experiences.map((experience) =>
    toListItem(experience, activityCounts.get(experience._id.toString()) || 0)
  );

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

const createExperience = async (userId, validatedBody) => {
  const experience = new Experience({
    userId,
    ...validatedBody,
  });

  await experience.save();

  return toExperience(experience);
};

const getExperienceById = async (experience) => toExperience(experience);

const updateExperience = async (experience, validatedBody) => {
  Object.assign(experience, validatedBody);
  await experience.save();

  return toExperience(experience);
};

const archiveExperience = async (experience) => {
  experience.isArchived = true;
  experience.archivedAt = new Date();

  await experience.save();
};

const getExperienceWorkspace = async (experience, query = {}) => {
  const listQuery = parseListQuery(query, {
    allowedSortFields: ['updatedAt', 'createdAt', 'title'],
    defaultSort: 'updatedAt',
    defaultOrder: 'desc',
  });

  const { items: activities, meta: activitiesMeta } =
    await activityService.listActivitiesForExperience(experience, query);

  return {
    experience: toExperience(experience),
    activities,
    activitiesMeta,
    journalEntries: [],
    journalMeta: buildListMeta({
      count: 0,
      total: 0,
      limit: listQuery.limit,
      offset: listQuery.offset,
    }),
  };
};

module.exports = {
  listExperiences,
  createExperience,
  getExperienceById,
  updateExperience,
  archiveExperience,
  getExperienceWorkspace,
};
