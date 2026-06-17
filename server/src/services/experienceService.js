// server/src/services/experienceService.js

const mongoose = require('mongoose');
const Experience = require('../models/Experience');
const Activity = require('../models/Activity');
const { createServiceError } = require('../utils/serviceError');

const { EXPERIENCE_TYPES } = Experience;

const DEFAULT_LIST_LIMIT = 50;
const MAX_LIST_LIMIT = 100;

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

const listExperiences = async (userId, { type, search, limit } = {}) => {
  if (!mongoose.isValidObjectId(userId)) {
    throw createServiceError(400, 'Invalid user ID');
  }

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

  if (search !== undefined && search.trim() !== '') {
    const pattern = new RegExp(search.trim(), 'i');
    filter.$or = [{ title: pattern }, { organisation: pattern }, { role: pattern }];
  }

  let parsedLimit = DEFAULT_LIST_LIMIT;

  if (limit !== undefined && limit !== '') {
    parsedLimit = Number.parseInt(limit, 10);

    if (Number.isNaN(parsedLimit) || parsedLimit < 1) {
      throw createServiceError(400, 'limit must be a positive integer');
    }

    parsedLimit = Math.min(parsedLimit, MAX_LIST_LIMIT);
  }

  const experiences = await Experience.find(filter)
    .sort({ updatedAt: -1 })
    .limit(parsedLimit);

  const activityCounts = await getActivityCountsByExperienceIds(
    experiences.map((experience) => experience._id)
  );

  return experiences.map((experience) =>
    toListItem(experience, activityCounts.get(experience._id.toString()) || 0)
  );
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

module.exports = {
  listExperiences,
  createExperience,
  getExperienceById,
  updateExperience,
  archiveExperience,
};
